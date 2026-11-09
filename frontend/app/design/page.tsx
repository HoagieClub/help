'use client';

import Link from 'next/link';

import { Button, Card, Heading, Input, Stack, Tag, Text } from '@/components/ui';
import { COLOR_GROUPS, RADIUS_NAMES, SHADOW_NAMES, SPACING_STEPS } from '@/lib/design-tokens';

import { CodeBlock, Example, Section, TokenValue, useMeasuredFontSize } from './design-ui';

/**
 * /design: the HoagieHelp design system in one page.
 * Every token and every components/ui variant, with copy-paste code.
 * Token values are read from app/tokens.css at runtime, so this page never goes out of date.
 */

// Tailwind only generates classes it can see written out in full, so every class used for a
// swatch or sample is listed literally below (never built like `bg-${name}`).
const SWATCH: Record<string, string> = {
	brand: 'bg-brand',
	'brand-hover': 'bg-brand-hover',
	'brand-deep': 'bg-brand-deep',
	'brand-bright': 'bg-brand-bright',
	'brand-soft': 'bg-brand-soft',
	'brand-wash': 'bg-brand-wash',
	'brand-tint': 'bg-brand-tint',
	focus: 'bg-focus',
	ink: 'bg-ink',
	heading: 'bg-heading',
	muted: 'bg-muted',
	placeholder: 'bg-placeholder',
	surface: 'bg-surface',
	'surface-gray': 'bg-surface-gray',
	line: 'bg-line',
	'line-neutral': 'bg-line-neutral',
	'control-border': 'bg-control-border',
	success: 'bg-success',
	'success-soft': 'bg-success-soft',
	warning: 'bg-warning',
	'warning-soft': 'bg-warning-soft',
	danger: 'bg-danger',
	'danger-soft': 'bg-danger-soft',
	'club-purple': 'bg-club-purple',
	'mascot-mint': 'bg-mascot-mint',
	'mascot-orange': 'bg-mascot-orange',
};

const SPACING_BAR: Record<string, string> = {
	'0': 'w-0',
	'1': 'w-1',
	'2': 'w-2',
	'3': 'w-3',
	'4': 'w-4',
	'6': 'w-6',
	'8': 'w-8',
	'10': 'w-10',
	'15': 'w-15',
};

const RADIUS_SAMPLE: Record<string, string> = {
	sm: 'rounded-sm',
	md: 'rounded-md',
	tag: 'rounded-tag',
	card: 'rounded-card',
	pill: 'rounded-pill',
};

const SHADOW_SAMPLE: Record<string, string> = {
	'card-hover': 'shadow-card-hover',
	dropdown: 'shadow-dropdown',
	dialog: 'shadow-dialog',
};

const TYPE_ROWS = [
	{ name: 'display', font: 'Poppins', sample: <Heading variant='display'>Display</Heading> },
	{ name: 'h1', font: 'Poppins', sample: <Heading variant='h1'>Heading 1</Heading> },
	{ name: 'h2', font: 'Poppins', sample: <Heading variant='h2'>Heading 2</Heading> },
	{ name: 'h3', font: 'Poppins', sample: <Heading variant='h3'>Heading 3</Heading> },
	{ name: 'lead', font: 'Inter', sample: <Text variant='lead'>Lead paragraph text</Text> },
	{ name: 'body-lg', font: 'Inter', sample: <Text variant='body-lg'>Large body text</Text> },
	{ name: 'body', font: 'Inter', sample: <Text>Body text, the default</Text> },
	{ name: 'label', font: 'Inter', sample: <Text variant='label'>Form label</Text> },
	{ name: 'small', font: 'Inter', sample: <Text variant='small'>Small text, timestamps</Text> },
	{ name: 'caption', font: 'Inter', sample: <Text variant='caption'>Caption</Text> },
	{
		name: 'eyebrow',
		font: 'JetBrains Mono',
		sample: <Text variant='eyebrow'>STUDY GROUP</Text>,
	},
	{ name: 'code', font: 'JetBrains Mono', sample: <Text variant='code'>npm run lint</Text> },
];

const NAV = [
	{ id: 'rules', label: 'The five rules' },
	{ id: 'colors', label: 'Colors' },
	{ id: 'type', label: 'Typography' },
	{ id: 'spacing', label: 'Spacing' },
	{ id: 'radius', label: 'Corners and shadows' },
	{ id: 'button', label: 'Button' },
	{ id: 'tag', label: 'Tag' },
	{ id: 'input', label: 'Input' },
	{ id: 'card', label: 'Card' },
	{ id: 'stack', label: 'Stack' },
	{ id: 'text', label: 'Text and Heading' },
	{ id: 'legacy', label: "Don't use these" },
	{ id: 'p-rule', label: 'Known issue: <p> size' },
];

function Wordmark() {
	return (
		<span className='font-heading text-h1'>
			<span className='text-ink'>hoagie</span>
			<span className='text-brand'>help</span>
		</span>
	);
}

function PRuleDemo() {
	const [rawSize, rawRef] = useMeasuredFontSize();
	const [textSize, textRef] = useMeasuredFontSize();
	return (
		<Stack gap='4'>
			<div className='rounded-md border border-line-neutral p-4'>
				<p ref={rawRef}>A plain &lt;p&gt; with no classes.</p>
				<Text variant='small' tone='muted'>
					Renders at {rawSize || '…'} (from p &#123; font-size: 14pt &#125; in
					lib/hoagie-ui/Theme/theme.css)
				</Text>
			</div>
			<div className='rounded-md border border-line-neutral p-4'>
				<p ref={textRef} className='font-body text-body text-ink'>
					The same text using the body style, as &lt;Text&gt; renders it.
				</p>
				<Text variant='small' tone='muted'>
					Renders at {textSize || '…'} (the body token)
				</Text>
			</div>
		</Stack>
	);
}

export default function DesignPage() {
	return (
		<div className='mx-auto max-w-7xl px-4 py-10'>
			<div className='md:grid md:grid-cols-4 md:gap-8'>
				{/* Sidebar */}
				<nav className='hidden md:block'>
					<div className='sticky top-6'>
						<Stack gap='2'>
							<Wordmark />
							<Text variant='eyebrow' tone='muted'>
								DESIGN SYSTEM
							</Text>
							<Stack as='ul' gap='1'>
								{NAV.map((n) => (
									<li key={n.id}>
										<a href={`#${n.id}`}>
											<Text as='span' variant='label' tone='muted'>
												{n.label}
											</Text>
										</a>
									</li>
								))}
							</Stack>
						</Stack>
					</div>
				</nav>

				{/* Content */}
				<main className='md:col-span-3'>
					<Stack gap='8'>
						<Stack gap='3'>
							<Heading variant='display'>Design system</Heading>
							<Text variant='lead'>
								Everything you need to build a HoagieHelp page that looks right: our
								colors, text styles, spacing and the ready-made components. Copy the
								code under any example.
							</Text>
						</Stack>

						<Section id='rules' title='The five rules'>
							<Stack as='ol' gap='2'>
								<li>
									<Text>
										<b>1. Use components first.</b> Import Button, Tag, Input,
										Card, Stack, Text and Heading from @/components/ui.
									</Text>
								</li>
								<li>
									<Text>
										<b>2. Only token classes.</b> bg-brand, text-muted, p-4,
										rounded-card. Never a hex code like #D14343.
									</Text>
								</li>
								<li>
									<Text>
										<b>3. No made-up values.</b> No p-[13px] or rounded-[10px].
										If the scale doesn&apos;t have it, ask before adding a
										token.
									</Text>
								</li>
								<li>
									<Text>
										<b>4. No style=&#123;&#123;&#125;&#125;.</b> Use a component
										prop or a token class instead.
									</Text>
								</li>
								<li>
									<Text>
										<b>5. Figma and code change together.</b> A new token goes
										into Figma and app/tokens.css in the same PR.
									</Text>
								</li>
							</Stack>
							<CodeBlock
								code={`import { Button, Card, Heading, Stack, Text } from '@/components/ui';

<Card>
  <Stack gap='3'>
    <Heading variant='h3'>COS 226 Midterm Review</Heading>
    <Text tone='muted'>Thursday at 7pm, Frist 302</Text>
    <Button>Join</Button>
  </Stack>
</Card>`}
							/>
						</Section>

						<Section
							id='colors'
							title='Colors'
							intro='Use them as Tailwind classes (bg-brand, text-brand, border-brand) or, in CSS modules, as var(--brand).'
						>
							{COLOR_GROUPS.map((group) => (
								<Stack key={group.title} gap='3'>
									<Heading variant='h3'>{group.title}</Heading>
									<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
										{group.tokens.map((t) => (
											<Stack
												key={t.name}
												direction='row'
												gap='3'
												align='center'
											>
												<div
													className={`h-15 w-15 shrink-0 rounded-md border border-line-neutral ${SWATCH[t.name]}`}
												/>
												<Stack gap='0'>
													<Text variant='label'>{t.name}</Text>
													<TokenValue name={`--color-${t.name}`} />
													<Text variant='small' tone='muted'>
														{t.use}
													</Text>
												</Stack>
											</Stack>
										))}
									</div>
								</Stack>
							))}
						</Section>

						<Section
							id='type'
							title='Typography'
							intro='Poppins 600 for titles and headings, Inter for everything you read, JetBrains Mono for eyebrow labels and code.'
						>
							<Stack gap='2'>
								<Text variant='label'>Wordmark</Text>
								<Wordmark />
								<Text variant='small' tone='muted'>
									“hoagie” in ink + “help” in brand, Poppins 600, lowercase, no
									space.
								</Text>
							</Stack>
							<Stack gap='4'>
								{TYPE_ROWS.map((row) => (
									<div
										key={row.name}
										className='grid grid-cols-1 gap-2 border-t border-line-neutral pt-4 md:grid-cols-3'
									>
										<Stack gap='0'>
											<Text variant='label'>{row.name}</Text>
											<Text variant='small' tone='muted'>
												{row.font} ·{' '}
												<TokenValue name={`--text-${row.name}`} /> /{' '}
												<TokenValue
													name={`--text-${row.name}--line-height`}
												/>{' '}
												/{' '}
												<TokenValue
													name={`--text-${row.name}--font-weight`}
												/>
											</Text>
										</Stack>
										<div className='md:col-span-2'>{row.sample}</div>
									</div>
								))}
							</Stack>
						</Section>

						<Section
							id='spacing'
							title='Spacing'
							intro='A 4px grid. These are the only steps: p-4 is 16px, gap-6 is 24px. Use Stack for space between things.'
						>
							<Stack gap='2'>
								{SPACING_STEPS.map((step) => (
									<Stack key={step} direction='row' gap='4' align='center'>
										<div className='w-10'>
											<Text variant='label'>{step}</Text>
										</div>
										<div className='w-15'>
											<TokenValue name={`--spacing-${step}`} />
										</div>
										<div
											className={`h-4 rounded-sm bg-brand ${SPACING_BAR[step]}`}
										/>
										<Text variant='small' tone='muted'>
											p-{step} · gap-{step} · m-{step}
										</Text>
									</Stack>
								))}
							</Stack>
						</Section>

						<Section id='radius' title='Corners and shadows'>
							<Stack direction='row' gap='6' wrap>
								{RADIUS_NAMES.map((r) => (
									<Stack key={r} gap='2' align='center'>
										<div
											className={`h-15 w-15 border border-line bg-brand-soft ${RADIUS_SAMPLE[r]}`}
										/>
										<Text variant='label'>rounded-{r}</Text>
										<TokenValue name={`--radius-${r}`} />
									</Stack>
								))}
							</Stack>
							<Stack direction='row' gap='8' wrap>
								{SHADOW_NAMES.map((s) => (
									<Stack key={s} gap='2' align='center'>
										<div
											className={`h-15 w-15 rounded-md bg-surface ${SHADOW_SAMPLE[s]}`}
										/>
										<Text variant='label'>shadow-{s}</Text>
									</Stack>
								))}
							</Stack>
						</Section>

						<Section id='button' title='Button'>
							<Example
								title='Variants'
								code={`<Button>Post Question</Button>
<Button variant='secondary'>Cancel</Button>
<Button variant='minimal'>Read more</Button>
<Button variant='destructive'>Delete</Button>`}
							>
								<Stack direction='row' gap='3' wrap>
									<Button>Post Question</Button>
									<Button variant='secondary'>Cancel</Button>
									<Button variant='minimal'>Read more</Button>
									<Button variant='destructive'>Delete</Button>
								</Stack>
							</Example>
							<Example
								title='Disabled'
								code='<Button disabled>Post Question</Button>'
							>
								<Stack direction='row' gap='3' wrap>
									<Button disabled>Post Question</Button>
									<Button variant='secondary' disabled>
										Cancel
									</Button>
								</Stack>
							</Example>
							<Example
								title='As a link (asChild)'
								code={`import Link from 'next/link';

<Button asChild>
  <Link href='/questions/ask'>Ask Question</Link>
</Button>`}
							>
								<Button asChild>
									<Link href='/design#button'>Ask Question</Link>
								</Button>
							</Example>
							<Text variant='small' tone='muted'>
								Press Tab to see the focus ring. Only the md size (40px tall) exists
								for now.
							</Text>
						</Section>

						<Section id='tag' title='Tag'>
							<Example
								title='Variants'
								code={`<Tag variant='label'>COS 226</Tag>
<Tag>python</Tag>
<Tag variant='selected'>Math</Tag>
<Tag variant='success'>Joined</Tag>
<Tag variant='warning'>2 spots left</Tag>`}
							>
								<Stack direction='row' gap='2' wrap>
									<Tag variant='label'>COS 226</Tag>
									<Tag>python</Tag>
									<Tag variant='selected'>Math</Tag>
									<Tag variant='success'>Joined</Tag>
									<Tag variant='warning'>2 spots left</Tag>
								</Stack>
							</Example>
							<Example
								title='Clickable filter'
								code={`<Tag asChild variant={isOn ? 'selected' : 'idle'}>
  <button type='button' onClick={toggle}>Math</button>
</Tag>`}
							>
								<Stack direction='row' gap='2'>
									<Tag asChild variant='selected'>
										<button type='button'>All groups</button>
									</Tag>
									<Tag asChild>
										<button type='button'>Math</button>
									</Tag>
								</Stack>
							</Example>
						</Section>

						<Section id='input' title='Input'>
							<Example
								title='Default, hint and error'
								code={`<Input label='Question title' placeholder='e.g. How do I approach COS 226 graphs?' />
<Input label='Course' hint='Optional' placeholder='e.g. COS 226' />
<Input label='Max participants' type='number' error='Must be at least 2' />
<Input label='Location' disabled value='Frist 302' />`}
							>
								<Stack gap='4'>
									<Input
										label='Question title'
										placeholder='e.g. How do I approach COS 226 graphs?'
									/>
									<Input
										label='Course'
										hint='Optional'
										placeholder='e.g. COS 226'
									/>
									<Input
										label='Max participants'
										type='number'
										defaultValue='1'
										error='Must be at least 2'
									/>
									<Input label='Location' disabled defaultValue='Frist 302' />
								</Stack>
							</Example>
							<Text variant='small' tone='muted'>
								Click into a field to see the focus state.
							</Text>
						</Section>

						<Section id='card' title='Card'>
							<Example
								title='Default and interactive'
								code={`<Card>
  <Stack gap='2'>
    <Heading variant='h3'>COS 226 Midterm Review</Heading>
    <Text tone='muted'>Thursday at 7pm</Text>
  </Stack>
</Card>

<Card interactive padding='sm'>…</Card>`}
							>
								<Stack gap='4'>
									<Card>
										<Stack gap='2'>
											<Heading variant='h3'>COS 226 Midterm Review</Heading>
											<Text tone='muted'>Thursday at 7pm</Text>
										</Stack>
									</Card>
									<Card interactive padding='sm'>
										<Text>Interactive, small padding: hover me.</Text>
									</Card>
								</Stack>
							</Example>
						</Section>

						<Section id='stack' title='Stack'>
							<Example
								title='Column (default) and row'
								code={`<Stack gap='4'>…</Stack>
<Stack direction='row' gap='2' align='center' wrap>…</Stack>`}
							>
								<Stack gap='4'>
									<Stack gap='2'>
										<Heading variant='h3'>Q&amp;A</Heading>
										<Text tone='muted'>Ask questions, help classmates</Text>
									</Stack>
									<Stack direction='row' gap='2' align='center' wrap>
										<Tag variant='label'>COS 226</Tag>
										<Tag>graphs</Tag>
										<Tag>midterm</Tag>
									</Stack>
								</Stack>
							</Example>
							<Text variant='small' tone='muted'>
								gap only takes spacing steps: 0, 1, 2, 3, 4, 6, 8, 10, 15.
							</Text>
						</Section>

						<Section id='text' title='Text and Heading'>
							<Example
								title='Text tones'
								code={`<Text>Default (ink)</Text>
<Text tone='muted'>Muted</Text>
<Text tone='brand'>Brand</Text>
<Text tone='success'>Success</Text>
<Text tone='warning'>Warning</Text>
<Text tone='danger'>Danger</Text>`}
							>
								<Stack gap='1'>
									<Text>Default (ink)</Text>
									<Text tone='muted'>Muted</Text>
									<Text tone='brand'>Brand</Text>
									<Text tone='success'>Success</Text>
									<Text tone='warning'>Warning</Text>
									<Text tone='danger'>Danger</Text>
								</Stack>
							</Example>
							<Example
								title='Heading tones'
								code={`<Heading variant='h1'>Heading color (default)</Heading>
<Heading variant='h1' tone='ink'>Ink</Heading>
<Heading variant='h1' tone='brand'>Brand bright (24px and up)</Heading>`}
							>
								<Stack gap='2'>
									<Heading variant='h1'>Heading color (default)</Heading>
									<Heading variant='h1' tone='ink'>
										Ink
									</Heading>
									<Heading variant='h1' tone='brand'>
										Brand bright (24px and up)
									</Heading>
								</Stack>
							</Example>
							<Text variant='small' tone='muted'>
								Every size is in the Typography section above. Pass as= to change
								the HTML tag without changing the look.
							</Text>
						</Section>

						<Section
							id='legacy'
							title="Don't use these"
							intro='These still work so old pages keep their look, but ESLint warns when new code uses them. They go away once every page is migrated.'
						>
							<Stack gap='2'>
								<Text>
									<b>Tailwind&apos;s default palette:</b> text-gray-500, bg-white,
									text-slate-800, bg-red-500… Use the brand colors above.
								</Text>
								<Text>
									<b>Off-scale spacing:</b> mb-12, py-16, w-24, gap-1.5… Use the
									nearest step (mb-10, py-15, w-15 or a layout class, gap-1 or
									gap-2).
								</Text>
								<Text>
									<b>Old shadcn colors:</b> bg-background, text-foreground,
									bg-card, text-primary, text-muted-foreground, border-border.
								</Text>
								<Text>
									<b>Evergreen components</b> (Pane, Text, Heading, Button from
									evergreen-ui) in new code. Replace them when you touch a page.
								</Text>
							</Stack>
						</Section>

						<Section
							id='p-rule'
							title='Known issue: plain <p> size'
							intro='lib/hoagie-ui/Theme/theme.css sets p { font-size: 14pt }, which is about 18.67px, not 14px. It loads outside any CSS layer. <Text> still gets the right size because our Tailwind classes are marked important, but a <p> without classes picks up 14pt. A migration ticket replaces the rule with the body token.'
						>
							<PRuleDemo />
						</Section>
					</Stack>
				</main>
			</div>
		</div>
	);
}
