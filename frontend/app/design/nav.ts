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
		title: 'Not in Figma yet',
		items: [
			{ href: '/design/components/avatar', label: 'Avatar' },
			{ href: '/design/components/byline', label: 'Byline' },
			{ href: '/design/components/textarea', label: 'Textarea' },
			{ href: '/design/components/select', label: 'Select' },
			{ href: '/design/components/checkbox', label: 'Checkbox' },
			{ href: '/design/components/icon-button', label: 'Icon button' },
			{ href: '/design/components/heart-button', label: 'Heart button' },
			{ href: '/design/components/tabs', label: 'Tabs' },
			{ href: '/design/components/spinner', label: 'Spinner' },
			{ href: '/design/components/empty-state', label: 'Empty state' },
			{ href: '/design/components/expandable-text', label: 'Expandable text' },
		],
	},
	{
		title: 'Layout',
		items: [
			{ href: '/design/components/page-header', label: 'Page header' },
			{ href: '/design/components/divider', label: 'Divider' },
			{ href: '/design/components/card', label: 'Card' },
			{ href: '/design/components/stack', label: 'Stack' },
			{ href: '/design/components/text', label: 'Text' },
			{ href: '/design/components/heading', label: 'Heading' },
		],
	},
];
