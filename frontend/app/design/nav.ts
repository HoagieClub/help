/**
 * Everything /design shows, in one list. The sidebar, the overview page and the header of each
 * component page all read from here, so a component is described in exactly one place.
 *
 * To add a component page: add an entry to a group below and one to components/registry.tsx.
 */

export type NavItem = {
	href: string;
	label: string;
	/** One line: what you'd use it for. Shown under the page title and on the overview. */
	summary?: string;
	/** A real file that uses it, so new members can see it in context. */
	example?: string;
	/** The component exists in code but not in Figma yet. */
	notInFigma?: boolean;
	/** node-id of its frame in the HoagieHelp Brand Kit, e.g. '27-35'. */
	figma?: string;
};

/** The HoagieHelp Brand Kit in Figma. Every /design page links to its frame there. */
export const BRAND_KIT_URL =
	'https://www.figma.com/design/owWm8GwkMf2pu7zBGahNCZ/HoagieHelp-Brand-Kit';

export function figmaUrl(nodeId: string) {
	return `${BRAND_KIT_URL}?node-id=${nodeId}`;
}

export type NavGroup = { title: string; description: string; items: NavItem[] };

const c = (slug: string) => `/design/components/${slug}`;

export const START_HERE: NavItem = { href: '/design', label: 'Start here' };

export const DESIGN_NAV: NavGroup[] = [
	{
		title: 'Actions',
		description: 'Things people click.',
		items: [
			{
				href: c('button'),
				figma: '27-35',
				label: 'Button',
				summary: 'Any button, or a link that should look like one.',
				example: 'components/question/AskQuestionForm.tsx',
			},
			{
				href: c('back-link'),
				figma: '27-66',
				label: 'Back link',
				summary: '“← Back” above a page title.',
				example: 'components/question/AskQuestionForm.tsx',
			},
			{
				href: c('filter-group'),
				figma: '27-77',
				label: 'Filter group',
				summary: 'A row of options where one is selected (Recent / Popular).',
				example: 'app/questions/page.tsx',
			},
			{
				href: c('upvote-button'),
				figma: '27-175',
				label: 'Upvote button',
				summary: '“▲ Upvote (12)” under a question, answer or comment.',
				example: 'components/comment/CommentItem.tsx',
			},
			{
				href: c('icon-button'),
				figma: '29-189',
				label: 'Icon button',
				summary: 'A button that is only an icon.',
				notInFigma: true,
			},
		],
	},
	{
		title: 'Forms',
		description: 'Getting input from people.',
		items: [
			{
				href: c('input'),
				figma: '28-12',
				label: 'Input',
				summary: 'One line of text, a number, a date, or a search box.',
				example: 'components/question/AskQuestionForm.tsx',
			},
			{
				href: c('textarea'),
				figma: '28-12',
				label: 'Textarea',
				summary: 'Several lines of text, like question details.',
				example: 'components/comment/CommentForm.tsx',
			},
			{
				href: c('select'),
				figma: '28-12',
				label: 'Select',
				summary: 'Pick one option from a list.',
				example: 'components/question/AskQuestionForm.tsx',
			},
			{
				href: c('checkbox'),
				figma: '27-105',
				label: 'Checkbox',
				summary: 'A yes/no choice, like “Post anonymously”.',
				example: 'components/comment/CommentForm.tsx',
			},
		],
	},
	{
		title: 'Text and labels',
		description: 'Words, names and small facts.',
		items: [
			{
				href: c('heading'),
				figma: '26-84',
				label: 'Heading',
				summary: 'Page titles and section titles.',
				example: 'components/answer/AnswerList.tsx',
			},
			{
				href: c('text'),
				figma: '26-84',
				label: 'Text',
				summary: 'Any text that isn’t a heading.',
				example: 'components/question/QuestionPanel.tsx',
			},
			{
				href: c('tag'),
				figma: '27-92',
				label: 'Tag',
				summary: 'Course, topic or category labels.',
				example: 'components/question/QuestionCard.tsx',
			},
			{
				href: c('meta-row'),
				figma: '27-152',
				label: 'Meta row',
				summary: 'Small facts separated by dots: “Sarah Park • 2h ago”.',
				example: 'components/question/QuestionCard.tsx',
			},
			{
				href: c('stat'),
				figma: '27-160',
				label: 'Stat',
				summary: 'An icon with a count: “▲ 12”, “45 views”.',
				example: 'components/question/QuestionCard.tsx',
			},
			{
				href: c('avatar'),
				figma: '27-137',
				label: 'Avatar',
				summary: 'Someone’s initials in a circle.',
				example: 'components/user/UserProfile.tsx',
			},
			{
				href: c('byline'),
				figma: '28-62',
				label: 'Byline',
				summary: 'Who asked a question: big avatar, name, “Q&A • 2h ago”.',
				example: 'components/question/QuestionPanel.tsx',
			},
			{
				href: c('expandable-text'),
				figma: '29-189',
				label: 'Expandable text',
				summary: 'Long text with Read more / Read less.',
				example: 'components/answer/AnswerItem.tsx',
				notInFigma: true,
			},
		],
	},
	{
		title: 'Layout',
		description: 'Putting things on the page.',
		items: [
			{
				href: c('page-header'),
				figma: '29-177',
				label: 'Page header',
				summary: 'The title, description and main button at the top of a page.',
				example: 'app/study-groups/page.tsx',
			},
			{
				href: c('stack'),
				label: 'Stack',
				summary: 'Rows and columns with even gaps. Use it instead of margins.',
				example: 'components/question/QuestionPanel.tsx',
			},
			{
				href: c('card'),
				label: 'Card',
				notInFigma: true,
				summary: 'A white box with a light border.',
				example: 'components/study-group/StudyGroupForm.tsx',
			},
			{
				href: c('tabs'),
				figma: '27-119',
				label: 'Tabs',
				summary: 'Switch between views on one page.',
				example: 'components/user/UserProfile.tsx',
			},
			{
				href: c('divider'),
				figma: '29-189',
				label: 'Divider',
				summary: 'A line between sections.',
				example: 'components/study-group/StudyGroupCard.tsx',
				notInFigma: true,
			},
		],
	},
	{
		title: 'Feedback',
		description: 'Loading, empty and error states.',
		items: [
			{
				href: c('message'),
				figma: '29-189',
				label: 'Message',
				summary: 'A success, error or warning banner.',
				example: 'components/comment/CommentForm.tsx',
				notInFigma: true,
			},
			{
				href: c('spinner'),
				figma: '29-189',
				label: 'Spinner',
				summary: 'Something is loading.',
				example: 'app/questions/page.tsx',
				notInFigma: true,
			},
			{
				href: c('empty-state'),
				figma: '29-189',
				label: 'Empty state',
				summary: 'A list with nothing in it.',
				example: 'components/answer/AnswerList.tsx',
				notInFigma: true,
			},
		],
	},
	{
		title: 'Patterns',
		description: 'Bigger pieces built from the ones above. Read these to learn how to compose.',
		items: [
			{
				href: c('thread-item'),
				figma: '28-74',
				label: 'Thread item',
				summary: 'One answer or comment with its avatar, actions and replies.',
				example: 'components/answer/AnswerItem.tsx',
			},
			{
				href: c('question-card'),
				figma: '29-19',
				label: 'Question card',
				summary: 'A question in a list.',
				example: 'app/questions/page.tsx',
			},
			{
				href: c('study-group-card'),
				figma: '29-131',
				label: 'Study group card',
				summary: 'A study group in a list.',
				example: 'app/study-groups/page.tsx',
			},
		],
	},
	{
		title: 'Foundations',
		description: 'The tokens every component is built from. You rarely need these directly.',
		items: [
			{
				href: '/design/colors',
				figma: '26-2',
				label: 'Colors',
				summary: 'Every color, as bg-… and text-… classes.',
			},
			{
				href: '/design/type',
				figma: '26-84',
				label: 'Typography',
				summary: 'The text sizes, as text-… classes.',
			},
			{
				href: '/design/spacing',
				figma: '26-129',
				label: 'Spacing & radius',
				summary: 'Gaps, padding, corners and shadows.',
			},
			{
				href: '/design/logo',
				figma: '26-226',
				label: 'Logo & mascot',
				summary: 'The wordmark and Hoagie Club mascots.',
			},
		],
	},
];

export const ALL_ITEMS: NavItem[] = DESIGN_NAV.flatMap((group) => group.items);

/** The entry for a URL, plus the ones before and after it (for Previous / Next links). */
export function findItem(href: string) {
	const index = ALL_ITEMS.findIndex((item) => item.href === href);
	return {
		item: ALL_ITEMS[index],
		previous: index > 0 ? ALL_ITEMS[index - 1] : undefined,
		next: index >= 0 && index < ALL_ITEMS.length - 1 ? ALL_ITEMS[index + 1] : undefined,
	};
}
