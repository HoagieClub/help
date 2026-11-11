import { defaultTheme, mergeTheme } from 'evergreen-ui';

import Tab from './Tab';

/**
 * Brand colors come from app/tokens.css so Evergreen and Tailwind agree.
 * Colors that have a token use it; the rest of Evergreen's scales keep their hex values.
 */
const token = (name: string) => `var(--color-${name})`;

export const hoagieUI = mergeTheme(defaultTheme, {
	title: 'default',
	colors: {
		...defaultTheme.colors,
		white: token('surface'),

		gray900: '#000000',
		gray800: '#343434',
		gray700: token('muted'),
		gray600: token('muted'),
		gray500: '#D2D2D2',
		gray400: '#D2D2D2',
		gray300: token('line'),
		gray200: '#F1F1F1',
		gray100: token('surface-gray'),
		gray90: '#FBFBFB',
		gray75: '#FCFCFC',
		gray50: token('surface'),

		blue900: '#0A1433',
		blue800: '#142966',
		blue700: '#1F3D99',
		blue600: '#2952CC',
		blue500: '#3366FF',
		blue400: '#5C85FF',
		blue300: '#85A3FF',
		blue200: '#ADC2FF',
		blue100: '#D6E0FF',
		blue50: '#EBF0FF',
		blue25: '#F3F6FF',

		purple900: token('ink'),
		purple800: '#351E5C',
		purple700: token('muted'),
		purple600: '#6C47AE',
		purple500: '#8F59EF',
		purple400: '#A472FC',
		purple300: '#BFA0F4',
		purple200: '#D1BAF7',
		purple100: '#E9DDFE',
		purple50: '#F5F0FF',
		purple25: '#F9F5FF',

		red700: token('brand-hover'),
		red600: token('brand-hover'),
		red500: token('brand'),
		red300: '#EE9191',
		red200: '#ffafafff',
		red100: token('brand-soft'),
		red25: token('brand-soft'),

		green900: '#10261E',
		green800: '#214C3C',
		green700: token('success'),
		green600: '#429777',
		green500: '#52BD95',
		green400: '#75CAAA',
		green300: '#97D7BF',
		green200: '#BAE5D5',
		green100: token('success-soft'),
		green25: '#F5FBF8',

		orange700: token('warning'),
		orange500: '#FFB020',
		orange100: '#F8E3DA',
		orange25: '#FFFAF2',

		teal800: '#0F5156',
		teal300: '#7CE0E6',
		teal100: '#D3F5F7',

		yellow800: '#66460D',
		yellow300: '#FFD079',
		yellow200: '#FFDFA6',
		yellow100: token('warning-soft'),

		realBlue300: '#85A3FF',

		// Default and muted colors
		muted: '#696f8c',
		default: '#474d66',
		dark: '#101840',
		selected: '#3366FF',
		tint1: '#FAFBFF',
		tint2: '#F9FAFC',
		overlay: 'rgba(67, 90, 111, 0.7)',

		// Tint colors for consistency
		yellowTint: token('warning-soft'),
		greenTint: '#F5FBF8',
		orangeTint: '#FFFAF2',
		redTint: token('brand-soft'),
		blueTint: '#F3F6FF',
		purpleTint: '#E7E4F9',
		tealTint: '#D3F5F7',

		// Borders
		border: {
			default: token('line'),
			muted: '#F1F1F1',
		},

		// Icon colors
		icon: {
			default: token('muted'),
			muted: '#D2D2D2',
			disabled: '#D2D2D2',
			selected: '#3366FF',
		},

		// Text colors based on context
		text: {
			danger: token('brand'),
			success: '#52BD95',
			info: '#3366FF',
		},

		// Additional custom color
		'hoagie-orange': '#DE7548',
	},
	fills: {
		...defaultTheme.fills,
		neutral: {
			color: '#343434',
			backgroundColor: '#F1F1F1',
		},
		blue: {
			color: '#2952CC',
			backgroundColor: '#D6E0FF',
		},
		red: {
			color: token('brand-hover'),
			backgroundColor: token('brand-soft'),
		},
		orange: {
			color: '#BC5E00',
			backgroundColor: '#FFE3C6',
		},
		yellow: {
			color: '#66460D',
			backgroundColor: token('warning-soft'),
		},
		green: {
			color: token('success'),
			backgroundColor: token('success-soft'),
		},
		teal: {
			color: '#0F5156',
			backgroundColor: '#D3F5F7',
		},
		purple: {
			color: '#6C47AE',
			backgroundColor: '#E9DDFE',
		},
	},
	intents: {
		...defaultTheme.intents,
		info: {
			background: '#F3F6FF',
			border: '#3366FF',
			text: '#2952CC',
			icon: '#3366FF',
		},
		success: {
			background: '#F5FBF8',
			border: '#52BD95',
			text: token('success'),
			icon: '#52BD95',
		},
		warning: {
			background: '#FFFAF2',
			border: '#FFB020',
			text: token('warning'),
			icon: '#FFB020',
		},
		danger: {
			background: token('brand-soft'),
			border: token('brand'),
			text: token('danger'),
			icon: token('brand'),
		},
	},
	radii: {
		...defaultTheme.radii,
		0: '0px',
		1: '4px',
		2: '8px',
	},
	shadows: {
		...defaultTheme.shadows,
		0: '0 0 1px rgba(100, 100, 100, 0.3)',
		1: 'var(--shadow-card-hover)',
		2: 'var(--shadow-dropdown)',
		3: '0 0 1px rgba(100, 100, 100, 0.3), 0 8px 10px -4px rgba(100, 100, 100, 0.47)',
		4: '0 0 1px rgba(100, 100, 100, 0.3), 0 16px 24px -8px rgba(100, 100, 100, 0.47)',
		focusRing: '0 0 0 2px #D6E0FF',
	},
	fontFamilies: {
		...defaultTheme.fontFamilies,
		display:
			'"Inter", "SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		ui: '"Inter", "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		mono: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace',
	},
	fontSizes: {
		...defaultTheme.fontSizes,
		0: '10px',
		1: '12px',
		2: '14px',
		3: '16px',
		4: '18px',
		5: '20px',
		6: '24px',
		7: '32px',
		body: '14px',
		caption: '10px',
		heading: '16px',
	},
	fontWeights: {
		...defaultTheme.fontWeights,
		light: 300,
		normal: 400,
		semibold: 500,
		bold: 600,
	},
	components: {
		...defaultTheme.components,
		Tab,
	},
});

export const hoagieHelp = mergeTheme(hoagieUI, {
	title: 'help',
	colors: {
		...hoagieUI.colors,
		// red color palette - primary brand color
		red700: token('brand-hover'),
		red600: token('brand-hover'),
		red500: token('brand'),
		red300: '#EE9191',
		red200: '#ffafafff',
		red100: token('brand-soft'),
		red25: token('brand-soft'),

		// Override the selected color to use primary red
		selected: token('brand'),

		// Set the tints for custom theme
		tint1: token('surface-gray'),
		tint2: '#F9FCFC',

		icon: {
			...hoagieUI.colors.icon,
			selected: token('brand'),
		},

		text: {
			...hoagieUI.colors.text,
			info: token('brand'),
		},

		// Add a custom brand color
		'hoagie-red': token('brand'),
	},

	// Have the shadows use our brand color for focus rings
	shadows: {
		...hoagieUI.shadows,
		focusRing: `0 0 0 2px ${token('brand-soft')}`,
	},

	// Have the intents use our teal colors
	intents: {
		...hoagieUI.intents,
		info: {
			background: token('brand-soft'),
			border: token('brand'),
			text: token('brand-hover'),
			icon: token('brand'),
		},
	},

	// Update component-specific styling
	components: {
		...hoagieUI.components,
		// Override Button component styling
		Button: {
			...hoagieUI.components.Button,
			appearances: {
				...hoagieUI.components.Button.appearances,
				primary: {
					...hoagieUI.components.Button.appearances.primary,
					backgroundColor: token('brand'),
					// Use pseudoSelectors instead of _hover
					pseudoSelectors: {
						_hover: {
							backgroundColor: token('brand-hover'),
						},
						_active: {
							backgroundColor: token('brand-hover'),
						},
						_focus: {
							boxShadow: `0 0 0 2px ${token('brand-soft')}`,
						},
					},
				},
			},
		},
		// Override Tab component styling
		Tab: {
			...hoagieUI.components.Tab,
			appearances: {
				...hoagieUI.components.Tab.appearances,
				primary: {
					...hoagieUI.components.Tab.appearances.primary,

					// selectors
					selectors: {
						...hoagieUI.components.Tab.appearances.primary.selectors,
						_before: {
							...hoagieUI.components.Tab.appearances.primary.selectors?._before,
							backgroundColor: token('brand'),
						},
						_hover: {
							color: token('brand-hover'),
						},
						_current: {
							color: token('brand'),
							'&:before': {
								transform: 'scaleY(1)',
							},
							'&:focus': {
								color: token('brand'),
							},
						},
					},
				},
			},
		},
		// Avatar styling is now handled directly in the components
	},
});
