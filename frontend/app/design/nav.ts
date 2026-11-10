/** Sidebar structure for /design. Route names match the frames in the HoagieHelp Brand Kit in Figma. */

export type NavItem = { href: string; label: string };
export type NavGroup = { title: string; items: NavItem[] };

export const DESIGN_NAV: NavGroup[] = [
	{
		title: 'Start here',
		items: [{ href: '/design', label: 'Overview' }],
	},
	{
		title: 'Foundations',
		items: [
			{ href: '/design/colors', label: 'Colors' },
			{ href: '/design/type', label: 'Typography' },
			{ href: '/design/spacing', label: 'Spacing & radius' },
			{ href: '/design/logo', label: 'Logo & mascot' },
		],
	},
	{
		title: 'Components',
		items: [
			{ href: '/design/components/button', label: 'Button' },
			{ href: '/design/components/tag', label: 'Tag' },
			{ href: '/design/components/input', label: 'Input' },
			{ href: '/design/components/message', label: 'Message' },
			{ href: '/design/components/question-card', label: 'Question card' },
		],
	},
	{
		title: 'Layout',
		items: [
			{ href: '/design/components/card', label: 'Card' },
			{ href: '/design/components/stack', label: 'Stack' },
			{ href: '/design/components/text', label: 'Text' },
			{ href: '/design/components/heading', label: 'Heading' },
		],
	},
];
