import logging
from datetime import datetime

import jwt
import requests
from django.conf import settings
from django.core.cache import cache
from django.http import HttpRequest
from jwt.algorithms import RSAAlgorithm
from rest_framework import authentication, exceptions

from hoagiehelp.models import CustomUser

logger = logging.getLogger(__name__)


class Auth0JWTAuthentication(authentication.BaseAuthentication):
	def authenticate(self, request: HttpRequest):
		auth_header = request.headers.get("Authorization")

		if not auth_header:
			return None

		if not auth_header.startswith("Bearer "):
			raise exceptions.AuthenticationFailed("Invalid token header")

		token = auth_header.split(" ")[1]
		try:
			# Verify and decode the token
			payload = self.verify_token(token)

			# Get or create user based on Auth0 subject
			auth0_id = payload["sub"]
			net_id = auth0_id.split("|")[2].split("@")[0]
			name = payload.get("https://hoagie.io/name", "")
			email = payload.get("https://hoagie.io/email", "")

			first_name = name.split(" ")[0]
			# Handle missing last name
			last_name = name.split(" ")[-1] if " " in name else ""

			user, _ = CustomUser.objects.get_or_create(
				net_id=net_id,
				defaults={
					"email": email,
					"first_name": first_name,
					"last_name": last_name,
					"net_id": net_id,
					"username": net_id,
					"class_year": datetime.now().year + 1,
				},
			)

			return (user, payload)

		except jwt.ExpiredSignatureError as e:
			raise exceptions.AuthenticationFailed("Token has expired") from e
		except jwt.InvalidTokenError as e:
			raise exceptions.AuthenticationFailed("Invalid token") from e
		except Exception as e:
			logger.error(f"Authentication error: {str(e)}")
			raise exceptions.AuthenticationFailed("Authentication failed") from e

	def _fetch_jwks(self):
		jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
		jwks = cache.get("auth0_jwks")
		if jwks is None:
			jwks = requests.get(jwks_url, timeout=5).json()
			cache.set("auth0_jwks", jwks, timeout=3600)
		return jwks

	def _find_rsa_key(self, jwks, kid):
		for key in jwks["keys"]:
			if key["kid"] == kid:
				return RSAAlgorithm.from_jwk(key)
		return None

	def verify_token(self, token: str):
		unverified_header = jwt.get_unverified_header(token)
		kid = unverified_header["kid"]

		jwks = self._fetch_jwks()
		rsa_key = self._find_rsa_key(jwks, kid)

		# Key not found so refetch in case Auth0 rotated keys
		if rsa_key is None:
			cache.delete("auth0_jwks")
			jwks = self._fetch_jwks()
			rsa_key = self._find_rsa_key(jwks, kid)

		if rsa_key is None:
			raise exceptions.AuthenticationFailed("Unable to find appropriate key")

		# Verify and decode token
		payload = jwt.decode(
			token,
			rsa_key,
			algorithms=settings.AUTH0_ALGORITHMS,
			audience=settings.AUTH0_AUDIENCE,
			issuer=f"https://{settings.AUTH0_DOMAIN}/",
		)

		return payload
