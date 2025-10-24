import { defaultTheme, mergeTheme } from 'evergreen-ui';

import Tab from './Tab';

export const hoagieUI = mergeTheme(defaultTheme, {
	title: 'default',
	colors: {
		...defaultTheme.colors,
		white: '#FFFFFF',

		gray900: '#000000',
		gray800: '#343434',
		gray700: '#808080',
		gray600: '#808080',
		gray500: '#D2D2D2',
		gray400: '#D2D2D2',
		gray300: '#EEEEEE',
		gray200: '#F1F1F1',
		gray100: '#F7F7F7',
		gray90: '#FBFBFB',
		gray75: '#FCFCFC',
		gray50: '#FFFFFF',

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

		purple900: '#190C30',
		purple800: '#351E5C',
		purple700: '#58427F',
		purple600: '#6C47AE',
		purple500: '#8F59EF',
		purple400: '#A472FC',
		purple300: '#BFA0F4',
		purple200: '#D1BAF7',
		purple100: '#E9DDFE',
		purple50: '#F5F0FF',
		purple25: '#F9F5FF',

		red700: '#7D2828',
		red600: '#A73636',
		red500: '#D14343',
		red300: '#EE9191',
		red100: '#F9DADA',
		red25: '#FDF4F4',

		green900: '#10261E',
		green800: '#214C3C',
		green700: '#317159',
		green600: '#429777',
		green500: '#52BD95',
		green400: '#75CAAA',
		green300: '#97D7BF',
		green200: '#BAE5D5',
		green100: '#DCF2EA',
		green25: '#F5FBF8',

		orange700: '#996A13',
		orange500: '#FFB020',
		orange100: '#F8E3DA',
		orange25: '#FFFAF2',

		teal800: '#0F5156',
		teal300: '#7CE0E6',
		teal100: '#D3F5F7',

		yellow800: '#66460D',
		yellow300: '#FFD079',
		yellow200: '#FFDFA6',
		yellow100: '#FFEFD2',

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
		yellowTint: '#FFEFD2',
		greenTint: '#F5FBF8',
		orangeTint: '#FFFAF2',
		redTint: '#FDF4F4',
		blueTint: '#F3F6FF',
		purpleTint: '#E7E4F9',
		tealTint: '#D3F5F7',

		// Borders
		border: {
			default: '#EEEEEE',
			muted: '#F1F1F1',
		},

		// Icon colors
		icon: {
			default: '#808080',
			muted: '#D2D2D2',
			disabled: '#D2D2D2',
			selected: '#3366FF',
		},

		// Text colors based on context
		text: {
			danger: '#D14343',
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
			color: '#7D2828',
			backgroundColor: '#F9DADA',
		},
		orange: {
			color: '#BC5E00',
			backgroundColor: '#FFE3C6',
		},
		yellow: {
			color: '#66460D',
			backgroundColor: '#FFEFD2',
		},
		green: {
			color: '#317159',
			backgroundColor: '#DCF2EA',
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
			text: '#317159',
			icon: '#52BD95',
		},
		warning: {
			background: '#FFFAF2',
			border: '#FFB020',
			text: '#996A13',
			icon: '#FFB020',
		},
		danger: {
			background: '#FDF4F4',
			border: '#D14343',
			text: '#A73636',
			icon: '#D14343',
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
		1: '0 0 1px rgba(100, 100, 100, 0.3), 0 2px 4px -2px rgba(100, 100, 100, 0.47)',
		2: '0 0 1px rgba(100, 100, 100, 0.3), 0 5px 8px -4px rgba(100, 100, 100, 0.47)',
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

/**
 * hoagieTemplate - Example theme that extends the base hoagieUI theme
 *
 * This template demonstrates how to create a custom theme by extending
 * the base hoagieUI theme with a new color palette. You can use this
 * as a starting point for creating your own branded themes.
 */
export const hoagieTemplate = mergeTheme(hoagieUI, {
	title: 'template',
	colors: {
		...hoagieUI.colors,
		// Teal color palette - primary brand color
		teal900: '#0A2E2F',
		teal800: '#0F5156',
		teal700: '#146D73',
		teal600: '#198A91',
		teal500: '#1EA7AE',
		teal400: '#4BBDC3',
		teal300: '#7CE0E6',
		teal200: '#A9EDF1',
		teal100: '#D3F5F7',
		teal50: '#E9FAFB',
		teal25: '#F4FDFD',

		// Override the selected color to use primary teal
		selected: '#1EA7AE',

		// Set the tints for custom theme
		tint1: '#F4FDFD',
		tint2: '#F9FCFC',

		icon: {
			...hoagieUI.colors.icon,
			selected: '#1EA7AE',
		},

		text: {
			...hoagieUI.colors.text,
			info: '#1EA7AE',
		},

		// Add a custom brand color
		'hoagie-teal': '#1EA7AE',
	},

	// Have the shadows use our brand color for focus rings
	shadows: {
		...hoagieUI.shadows,
		focusRing: '0 0 0 2px #D3F5F7',
	},

	// Have the intents use our teal colors
	intents: {
		...hoagieUI.intents,
		info: {
			background: '#F4FDFD',
			border: '#1EA7AE',
			text: '#0F5156',
			icon: '#1EA7AE',
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
					backgroundColor: '#1EA7AE',
					// Use pseudoSelectors instead of _hover
					pseudoSelectors: {
						_hover: {
							backgroundColor: '#198A91',
						},
						_active: {
							backgroundColor: '#146D73',
						},
						_focus: {
							boxShadow: '0 0 0 2px #D3F5F7',
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

					// color: '#1EA7AE',

					// Use pseudoSelectors instead of _hover
					pseudoSelectors: {
						_hover: {
							color: '#198A91',
						},
						_active: {
							color: '#146D73',
						},
						_current: {
							color: '#1EA7AE',
							fontWeight: '500', // Use string instead of number
						},
					},
				},
			},
		},
		// Avatar styling is now handled directly in the components
	},
});
