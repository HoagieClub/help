'use client';

import React from 'react';

import Image from 'next/image';

// --- Helper Components & Data ---

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
const teamLeads = [
	{
		name: 'Hoagie.io',
		role: 'Team Lead',
		bio: 'Hoagie is an experienced software engineer with a passion for building campus apps for Princeton students.',
		imgSrc: 'https://github.com/HoagieClub/club/raw/refs/heads/source/src/assets/hoagie-hi.svg',
		socials: {
			linkedin: 'https://www.linkedin.com',
		},
	}
];

const teamMembers = [
	// Add your name, role, and image here!
	{
		name: 'Hoagie Member',
		role: 'Frontend Developer',
		imgSrc: 'https://github.com/HoagieClub/club/raw/refs/heads/source/src/assets/hoagie-hi.svg',
		socials: {
			linkedin: 'https://www.linkedin.com',
		},
	},
];

/**
 * Modern "Meet the Team" page component.
 * Features a clean, professional design with interactive cards.
 */
export function App() {
	return (
		<div className='min-h-screen font-sans text-slate-800'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Header */}
				<header className='text-center mb-12'>
					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight'>
						Meet the <span className='text-emerald-600'>HoagieMeal</span> Team
					</h1>
					<p className='mt-4 text-lg text-slate-600 max-w-2xl mx-auto'>
						We&apos;re a passionate group of foodies, developers, and designers
						dedicated to making your dining experience easier and more enjoyable.
					</p>
				</header>

				{/* Team Leadership Section */}
				<section className='mb-16'>
					<h2 className='text-3xl font-bold text-slate-900 mb-12 text-center'>
						Team Leadership
					</h2>
					<div className='grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-lg mx-auto'>
						{teamLeads.map((lead) => (
							<div
								key={lead.name}
								className='bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-in-out'
							>
								<div className='p-8 flex flex-col sm:flex-row items-center'>
									<Image
										src={lead.imgSrc}
										alt={lead.name}
										className='w-32 h-32 rounded-full mb-6 sm:mb-0 sm:mr-8 flex-shrink-0 border-4 border-emerald-200 shadow-md'
										height={0}
										width={0}
									/>
									<div className='text-center sm:text-left'>
										<h3 className='text-2xl font-bold text-slate-900'>
											{lead.name}
										</h3>
										<p className='text-md font-semibold text-emerald-600 mb-2'>
											{lead.role}
										</p>
										<p className='text-slate-600 mb-4'>{lead.bio}</p>
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
									height={0}
									width={0}
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
