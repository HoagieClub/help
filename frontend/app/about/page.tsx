'use client';

import React from 'react';

import { Heading, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import Image from 'next/image';

// --- Helper Components & Data ---

interface member {
	name: string;
	role: string;
	imgSrc: string;
	socials: {
		linkedin: string;
	};
}

// Icon for social media links
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<a
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		className='text-gray-400 hover:text-emerald-500 transition-colors duration-300'
	>
		{children}
	</a>
);

// SVG components for icons
const LinkedinIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
		<rect x='2' y='9' width='4' height='12' />
		<circle cx='4' cy='4' r='2' />
	</svg>
);

// Team data organized for easier management
const teamLeads: member[] = [
	{
		name: 'Spencer Doyle',
		role: 'Team Lead',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D4E03AQFgKlbpu5PV9Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710630696392?e=1762992000&v=beta&t=0BKZ_8Nv9L8OgZbItbsoHfuUL1xlXTTOMDpTzuU5a_w',
		socials: {
			linkedin: 'https://www.linkedin.com/in/spencer-doyle3/',
		},
	},
	{
		name: 'Issac Li',
		role: 'Team Lead',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D5603AQEDK7V3q61jAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690434142044?e=1762992000&v=beta&t=Xf393UgOpXgB_WpSMMNOUZazRfOsF7JMdKaHBvxNqIY',
		socials: {
			linkedin: 'https://www.linkedin.com/in/issactli/',
		},
	},
];

const teamMembers = [
	{
		name: 'Sai Nallani',
		role: 'Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D5603AQHfKe9zKdZkRg/profile-displayphoto-shrink_800_800/B56ZXyDYosGQAg-/0/1743522729003?e=1764201600&v=beta&t=5LkVzORPkckCyP2p8nl-veFY8_kn3VtbWxuri1RhrLg',
		socials: {
			linkedin: 'https://www.linkedin.com/in/sai-nallani-6a5061262/',
		},
	},
	{
		name: 'Hellen Luo',
		role: 'Frontend Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D4E03AQGfbADce0FXwg/profile-displayphoto-shrink_400_400/B4EZUr4FgIHMAg-/0/1740197879737?e=1763596800&v=beta&t=bFaFo8e8mU3Svx6JOKf20ytzoj_uilHr2Dgvl8KFKPU',
		socials: {
			linkedin: 'https://www.linkedin.com/in/hellen-luo',
		},
	},
	{
		name: 'Charles Muehlberger',
		role: 'Frontend Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D5603AQEiL4nYie2M0w/profile-displayphoto-scale_400_400/B56ZosMDtcJQAg-/0/1761677951076?e=1762992000&v=beta&t=PVSCfriKs3Ao9lg2Y1ka0XrTscDyqlXjEYbEX5HqdDE',
		socials: {
			linkedin: 'https://www.linkedin.com/in/charlesmuehl/',
		},
	},
	{
		name: 'Timothy Li',
		role: 'Frontend Developer',
		imgSrc: 'https://avatars.githubusercontent.com/u/214003676?v=4',
		socials: {
			linkedin: 'https://www.linkedin.com/in/timli5823/',
			instagram: 'https://www.instagram.com/timothyli1331/',
		},
	},
	{
		name: 'David Liu',
		role: 'Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D4E03AQHBROhhswIn4g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728969894574?e=1763596800&v=beta&t=01lDxnJDUYtJ6tmMR1JQ9bCmycdyv0rZ7u5w4XnRer8',
		socials: {
			linkedin: 'https://www.linkedin.com/in/david-liu-71398523a/',
		},
	},
	{
		name: 'Maribel Crespo',
		role: 'Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D5603AQHOE2hLdzPWhQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730483078731?e=2147483647&v=beta&t=BgVPzlj748EpPYDDtjMW2NBQpQamT5--CWHtLWh9xHM',
		socials: {
			linkedin: 'https://www.linkedin.com/in/maribel-crespo-134a33284/',
		},
	},
	{
		name: 'Eric Guo',
		role: 'Developer',
		imgSrc: 'https://media.licdn.com/dms/image/v2/D4E03AQHpk81yJQ8N0w/profile-displayphoto-scale_200_200/B4EZlF5PvoIMAY-/0/1757814259175?e=2147483647&v=beta&t=U6aune5Bp3z9pniiLgcrnJ3nQ5cbHddo9Nbyi6NRxR8',
		socials: {
			linkedin: 'https://www.linkedin.com/in/eric-guo1',
		},
	},
	{
		name: 'Adam Belouad',
		role: 'Frontend Developer',
		imgSrc: 'https://i.imgur.com/U5XnPnt.jpeg',
		socials: {
			linkedin: 'https://www.linkedin.com/in/adambelouad/',
		},
	},
];

/**
 * Modern "Meet the Team" page component.
 * Features a clean, professional design with interactive cards.
 */
export function App() {
	const theme = useTheme();
	return (
		<div className='min-h-screen font-sans text-slate-800'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Header */}
				<Pane textAlign='center' marginBottom={majorScale(6)}>
					<Heading
						size={900}
						fontSize='3rem'
						fontWeight={700}
						marginBottom={majorScale(4)}
					>
						Meet the{' '}
						<Text size={900} fontSize='3rem' color={theme.colors.blue500}>
							HoagieSparks
						</Text>{' '}
						Team
					</Heading>
					<Text size={500} display='block' maxWidth={672} marginX='auto'>
						We&apos;re a passionate group of developers and designers dedicated to
						improving your Princeton academic experience.
					</Text>
				</Pane>

				{/* Team Leadership Section */}
				<section className='mb-16'>
					<h2 className='text-3xl font-bold text-slate-900 mb-12 text-center'>
						Team Leadership
					</h2>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto'>
						{teamLeads.map((lead) => (
							<div
								key={lead.name}
								className='bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-in-out'
							>
								<div className='p-8 flex flex-col sm:flex-row items-center'>
									<Pane
										flexShrink={0}
										marginBottom={majorScale(3)}
										marginRight={majorScale(4)}
										width={128}
										height={128}
										borderRadius='50%'
										border={`4px solid ${theme.colors.blue200}`}
										boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
										overflow='hidden'
									>
										<Image
											src={lead.imgSrc}
											alt={lead.name}
											height={128}
											width={128}
											style={{ objectFit: 'cover' }}
										/>
									</Pane>
									<div className='text-center sm:text-left'>
										<h3 className='text-2xl font-bold text-slate-900'>
											{lead.name}
										</h3>
										<p className='text-md font-semibold text-emerald-600 mb-2'>
											{lead.role}
										</p>
										<div className='flex justify-center sm:justify-start space-x-4'>
											<SocialIcon href={lead.socials.linkedin}>
												<LinkedinIcon />
											</SocialIcon>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Team Members Section */}
				<section>
					<h2 className='text-3xl font-bold text-slate-900 mb-12 text-center'>
						Our Amazing Team
					</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
						{teamMembers.map((member) => (
							<div
								key={member.name}
								className='bg-white rounded-xl shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group'
							>
								<Image
									src={member.imgSrc}
									alt={member.name}
									className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-200 group-hover:border-emerald-300 transition-colors duration-300'
									height={128}
									width={128}
									style={{ objectFit: 'cover' }}
								/>
								<h4 className='font-bold text-slate-800 text-lg'>{member.name}</h4>
								<p className='text-emerald-600 text-sm'>{member.role}</p>
								<div className='flex mx-auto w-min mt-2 justify-center sm:justify-start space-x-4'>
									<SocialIcon href={member.socials.linkedin}>
										<LinkedinIcon />
									</SocialIcon>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
