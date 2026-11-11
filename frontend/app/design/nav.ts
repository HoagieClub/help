/** Sidebar structure for /design. Route names match the frames in the HoagieHelp Brand Kit in Figma (see DESIGN_SYSTEM.md). */

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
			{ href: '/design/components/back-link', label: 'Back link' },
			{ href: '/design/components/filter-group', label: 'Filter group' },
			{ href: '/design/components/tag', label: 'Tag' },
			{ href: '/design/components/input', label: 'Input' },
			{ href: '/design/components/textarea', label: 'Textarea' },
			{ href: '/design/components/select', label: 'Select' },
			{ href: '/design/components/checkbox', label: 'Checkbox' },
			{ href: '/design/components/tabs', label: 'Tabs' },
			{ href: '/design/components/avatar', label: 'Avatar' },
			{ href: '/design/components/byline', label: 'Byline' },
			{ href: '/design/components/meta-row', label: 'Meta row' },
			{ href: '/design/components/stat', label: 'Stat' },
			{ href: '/design/components/upvote-button', label: 'Upvote button' },
			{ href: '/design/components/thread-item', label: 'Thread item' },
			{ href: '/design/components/question-card', label: 'Question card' },
			{ href: '/design/components/study-group-card', label: 'Study group card' },
		],
	},
	{
		title: 'Not in Figma yet',
		items: [
			{ href: '/design/components/message', label: 'Message' },
			{ href: '/design/components/empty-state', label: 'Empty state' },
			{ href: '/design/components/spinner', label: 'Spinner' },
			{ href: '/design/components/expandable-text', label: 'Expandable text' },
			{ href: '/design/components/icon-button', label: 'Icon button' },
			{ href: '/design/components/divider', label: 'Divider' },
		],
	},
	{
		title: 'Layout',
		items: [
			{ href: '/design/components/page-header', label: 'Page header' },
			{ href: '/design/components/card', label: 'Card' },
			{ href: '/design/components/stack', label: 'Stack' },
			{ href: '/design/components/heading', label: 'Heading' },
			{ href: '/design/components/text', label: 'Text' },
		],
	},
];
