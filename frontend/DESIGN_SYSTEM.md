# HoagieHelp design system

So every page looks like HoagieHelp without you having to think about it. To see everything live, run `npm run dev` and open **[localhost:3000/design](http://localhost:3000/design)**. New here? Its **Start here** page is the quickest way in.

The tokens and components come from the **current HoagieHelp designs** in Figma (the Main Q&A, Question View, Ask a Question and User pages, plus the Study Group frames on V2). The HoagieHelp Brand Kit file mirrors them, with one frame per `/design` page:

| Page                        | Brand Kit frame                                                           |
| --------------------------- | ------------------------------------------------------------------------- |
| `/design/colors`            | Foundations / Colors                                                      |
| `/design/type`              | Foundations / Typography                                                  |
| `/design/spacing`           | Foundations / Spacing & radius                                            |
| `/design/logo`              | Foundations / Logo & mascot                                               |
| `/design/components/<name>` | Components / one frame each (pages tagged **Not in Figma yet** have none) |

A bolder rebrand (Poppins, purple headings, mascots) is planned for next semester. It's saved on the local branch `rebrand/brand-kit`.

## What tokens are

A **token** is a named design value: a color, a spacing step, a corner radius, a text style. `brand` is our red (`#F04242`), `4` on the spacing scale is 16px, `card` is an 8px corner.

- All token values live in one file: [`app/tokens.css`](app/tokens.css). It's the only place raw values like `#F04242` or `16px` are allowed.
- The names match the Figma variables, so a value you copy from Figma Dev Mode (`var(--brand)`, `var(--space-3)`) works as-is.
- Tailwind turns each token into classes: `bg-brand`, `text-muted`, `p-4`, `gap-6`, `rounded-card`, `text-h1`, `text-body-sm`, `shadow-card`.

## The five rules

1. **Use components first.** `import { Button, Card, Heading, Input, Stack, Tag, Text } from '@/components/ui';`
2. **Only token classes.** `bg-brand`, `text-muted`, `p-4`. Never a hex code like `#F04242` or a default Tailwind color like `text-gray-500`.
3. **No made-up values.** No `p-[13px]` or `rounded-[10px]`, and only spacing steps 0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 15, 20, 28. If nothing fits, ask before adding a token.
4. **No `style={{}}`.** Use a component prop (`<Stack gap='4'>`, `<Card padding='sm'>`) or a token class.
5. **Figma and code change together.** A new or changed token goes into Figma and `app/tokens.css` in the same PR.

`npm run lint` warns when code breaks rules 2–4. ESLint covers TSX and Stylelint covers `*.module.css`. Each warning says what to use instead.

## Components

Import base pieces from `@/components/ui`. Each has a page on `/design` with every variant.

| Component        | Use it for                                                                  |
| ---------------- | --------------------------------------------------------------------------- |
| `Button`         | Every button: primary, success (Ask Question), secondary, ghost, link.      |
| `BackLink`       | "← Back" above a page title.                                                |
| `FilterGroup`    | A row of filters where one is on (Recent / Popular).                        |
| `IconButton`     | A button that is only an icon (needs a `label` for screen readers).         |
| `UpvoteButton`   | "▲ Upvote (12)" under a post; pair with the `useUpvote` hook.               |
| `Tag`            | Course (red), topic (gray) and category (green) labels.                     |
| `Input`          | Labeled text fields with hint, error, icon, and the round `search` variant. |
| `Textarea`       | Multi-line fields, same states as Input.                                    |
| `Select`         | Dropdowns, same states as Input.                                            |
| `Checkbox`       | A checkbox with its label.                                                  |
| `Tabs`           | Switching between views on one page (Questions / Answers / Comments).       |
| `Avatar`         | Initials in a circle, sm to xl.                                             |
| `Byline`         | Big avatar + name + "Q&A • 2h ago", at the top of a question.               |
| `MetaRow`        | Facts separated by dots: "Sarah Park • 2h ago".                             |
| `Stat`           | A read-only icon + count: "▲ 12", "👁 45 views".                             |
| `ThreadItem`     | One answer or comment: avatar, name, text, actions, nested replies.         |
| `Message`        | Success, error and warning banners.                                         |
| `ExpandableText` | Long text with Read more / Read less.                                       |
| `Spinner`        | Loading.                                                                    |
| `EmptyState`     | A list with nothing in it.                                                  |
| `PageHeader`     | The h1, description and main action at the top of a page.                   |
| `Card`           | White boxes with a light border.                                            |
| `Stack`          | Rows and columns with a gap. Use it instead of margins.                     |
| `Divider`        | A line between sections.                                                    |
| `Text`           | Anything you read.                                                          |
| `Heading`        | Titles and section headings.                                                |
| `Toaster`        | Mounted once in the layout; call `toast()` from `sonner`.                   |

Props only accept the options listed on `/design`; there's no `className` or `style`. If you need a variant that doesn't exist, add it to the component in `components/ui/` in its own PR. Pages marked **Not in Figma yet** on `/design` still need a Figma frame.

## Writing a component

Every component in `components/` follows the same shape, so you can open any file and know where things are.

**Where it goes**

```
components/
  ui/              base pieces: no data, no API calls (Button, Tag, Avatar…)
  question/        question feature (QuestionCard, QuestionPanel, AskQuestionForm)
  answer/  comment/  study-group/  notification/  user/  search/
hooks/             shared hooks (useUpvote, useAction, useDebounce, useSearchQuestions)
lib/format.ts      formatting helpers (formatTimePassed, formatDateTime)
```

One component per `PascalCase.tsx` file, in the folder of the feature it belongs to. No folder per component and no CSS modules.

**What the file looks like**

1. `'use client'` at the top only if the component uses state, effects or event handlers.
2. `export type ThingProps = { … }`: always `type`, always named `<Component>Props`.
3. A short JSDoc comment with an `@example`.
4. `export function Thing({ … }: ThingProps)`: a named export. No `export default`, no `React.FC`.
5. Built only from `@/components/ui` pieces and token classes. No `evergreen-ui`, CSS modules, `style={{}}` or hex colors.
6. No API calls inside components. Data comes in through props; actions go through a hook in `hooks/` (for example `useUpvote`), so loading, rollback and error handling are written once.
7. Icons come from `lucide-react` only.

In `components/` and `hooks/`, `npm run lint` **fails** if a file breaks rules 4–7 or uses hex colors, made-up values or `style={{}}`.

**A worked example to copy:** [`components/comment/CommentItem.tsx`](components/comment/CommentItem.tsx). It's short and shows every rule: a `<Component>Props` type, a JSDoc example, a named export, only `components/ui` pieces, and a hook (`useUpvote`) for the API call. For a form, see [`components/comment/CommentForm.tsx`](components/comment/CommentForm.tsx) (state, a create hook from `hooks/mutations.ts`, and an error `Message`).

## Test your component on the playground

See what you're building before you put it on a real page.

1. `npm run playground` (once). It creates your own test page.
2. `npm run dev`, then open [localhost:3000/playground](http://localhost:3000/playground).
3. In `app/playground/page.tsx`, import your component and render it a few ways (normal, long text, empty). Save, look, adjust, repeat.
4. When it looks right, use it on the real page.

The playground is gitignored, so it never shows up in `git status` and can't be committed or cause merge conflicts. You don't need to delete or exclude anything. To start over: `npm run playground -- --reset`.

## Adding or changing a token

1. Add it in Figma first (or get a designer to).
2. Add it to `app/tokens.css` with the same name, inside `@theme`. Colors are `--color-<name>`, spacing `--spacing-<n>`, radius `--radius-<name>`. Add a short alias under `:root` if Figma uses one (`--brand: var(--color-brand)`).
3. Add the name to `lib/design-tokens.ts` so `cn()` and `/design` know about it.
4. Check it on `/design`.
5. Open one PR that contains the Figma link and the code change.

## Migrating existing code

Every component in `components/` is migrated, and so are the Q&A, question, Ask a Question and Study Groups pages. What's left is the **About** and **User** pages and the shared Hoagie shell in `lib/hoagie-ui/` (the nav bar still uses Evergreen and Poppins; Figma's nav uses Inter). **New code uses `components/ui`.** Pages are migrated **one file at a time when you touch them**; each has a ticket, and `npm run lint` shows what's left as warnings.

Still around for now so old pages keep their look. **Don't use these in new code** (ESLint warns):

- **Tailwind's default palette and spacing** (`text-gray-500`, `mb-12`). The last migration ticket turns them off by uncommenting `--color-*: initial` and `--spacing-*: initial` in `tokens.css`.
- **`p { font-size: 14pt }`** in `lib/hoagie-ui/Theme/theme.css`, which makes any `<p>` without classes about 18.67px. `<Text>` isn't affected, because Tailwind classes are `!important`; `theme.css` loads outside any CSS layer.
- **Evergreen components** (`Pane`, `Text`, `Heading`, `Button` from `evergreen-ui`). Replace them when you touch a page.
- **Off-scale spacing** like `mb-12`, `py-16`, `gap-1.5`: the lint warning names the nearest allowed step.
- **The Evergreen theme** (`lib/hoagie-ui/Theme/themes.tsx`) reads colors from the tokens, so old Evergreen code and new code use the same red and the same page gray.
