/**
 * @overview Landing page for the template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import { useUser } from '@auth0/nextjs-auth0';
import {
	Pane,
	majorScale,
	minorScale,
	Heading,
	Spinner,
	ArrowRightIcon,
	ArrowLeftIcon,
	Button,
} from 'evergreen-ui';
import Link from 'next/link';

import AuthButton from '@/lib/hoagie-ui/AuthButton';
import { hoagieTemplate } from '@/lib/hoagie-ui/Theme/themes';

export function Home() {
	const theme = hoagieTemplate;
	const { user, error, isLoading } = useUser();

	let Profile;
	if (isLoading) {
		Profile = <Spinner />;
	} else if (error || !user) {
		Profile = <AuthButton />;
	} else {
		Profile = (
			<Pane>
				<Link href='/feature1'>
					<Button
						height={56}
						width={majorScale(35)}
						backgroundColor={theme.colors.teal100}
						marginBottom={20}
						iconBefore={ArrowRightIcon}
					>
						Call to Action
					</Button>
				</Link>
				<br />
				<AuthButton variant='logout' />
			</Pane>
		);
	}

	return (
		<Pane
			display='flex'
			justifyContent='center'
			alignItems='center'
			marginX={majorScale(1)}
			paddingBottom={majorScale(4)}
			paddingTop={majorScale(8)}
		>
			<Pane
				borderRadius={8}
				textAlign='center'
				elevation={1}
				background='white'
				marginX={20}
				maxWidth='600px'
				width='100%'
				paddingX='10px'
				paddingTop={majorScale(5)}
				paddingBottom={majorScale(7)}
			>
				<ArrowLeftIcon size={48} color='gray800' />
				<Heading size={900} className='hoagie'>
					Hoagie Template App
					<br />
					What will <b>you</b> build?
				</Heading>
				<div>
					<Pane
						display='flex'
						flexDirection='column'
						alignItems='center'
						marginTop='30px'
					>
						{Profile}
						<Link href='https://hoagie.io'>
							<Button
								height={56}
								width={majorScale(35)}
								appearance='default'
								marginTop={20}
								iconBefore={ArrowLeftIcon}
							>
								<Pane display='flex'>
									Back to
									<Pane marginLeft={minorScale(1)} className='hoagie'>
										hoagie<b>platform</b>
									</Pane>
								</Pane>
							</Button>
						</Link>
						<br />
					</Pane>
				</div>
				<div>© 2025 Hoagie Club.</div>
			</Pane>
		</Pane>
	);
}

export default Home;
