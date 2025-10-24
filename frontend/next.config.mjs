import withPWA from 'next-pwa';

const nextConfig = {
	reactStrictMode: true,
	...withPWA({
		dest: 'public',
		register: true,
		skipWaiting: true,
	}),
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
			},
			{
				protocol: 'https',
				hostname: 'media.licdn.com',
			},
		],
	},
};

export default nextConfig;
