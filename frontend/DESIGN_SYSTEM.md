# HoagieHelp design system

So every page looks like HoagieHelp without you having to think about it. To see everything live, run `npm run dev` and open **[localhost:3000/design](http://localhost:3000/design)**.

| Page                                                  | Figma frame                     |
| ----------------------------------------------------- | ------------------------------- |
| `/design/colors`                                      | Foundations / Colors            |
| `/design/type`                                        | Foundations / Typography        |
| `/design/spacing`                                     | Foundations / Spacing & radius  |
| `/design/logo`                                        | Foundations / Logo & mascot     |
| `/design/components/button`, `tag`, `input`           | Components                      |
| `/design/components/card`, `stack`, `text`, `heading` | (no frame; listed under Layout) |

## What tokens are

A **token** is a named design value: a color, a spacing step, a corner radius, a text style. `brand` is our red (`#D14343`), `4` on the spacing scale is 16px, `card` is a 20px corner.

- All token values live in one file: [`app/tokens.css`](app/tokens.css). It's the only place raw values like `#D14343` or `16px` are allowed.
- The names match the HoagieHelp brand kit in Figma, so a value you copy from Figma Dev Mode (`var(--brand)`, `var(--space-3)`) works as-is.
- Tailwind turns each token into classes: `bg-brand`, `text-muted`, `p-4`, `gap-6`, `rounded-card`, `text-h1`, `shadow-dropdown`.

## The five rules

1. **Use components first.** `import { Button, Card, Heading, Input, Stack, Tag, Text } from '@/components/ui';`
2. **Only token classes.** `bg-brand`, `text-muted`, `p-4`. Never a hex code like `#D14343` or a default Tailwind color like `text-gray-500`.
3. **No made-up values.** No `p-[13px]` or `rounded-[10px]`, and only spacing steps 0, 1, 2, 3, 4, 6, 8, 10, 15. If nothing fits, ask before adding a token.
4. **No `style={{}}`.** Use a component prop (`<Stack gap='4'>`, `<Card padding='sm'>`) or a token class.
5. **Figma and code change together.** A new or changed token goes into Figma and `app/tokens.css` in the same PR.

`npm run lint` warns when code breaks rules 2–4. ESLint covers TSX and Stylelint covers `*.module.css`. Each warning says what to use instead.

## Components

| Component | Use it for                                                   |
| --------- | ------------------------------------------------------------ |
| `Button`  | Every button. `asChild` wraps a `Link` so it looks like one. |
| `Tag`     | Courses, topics, filters, statuses.                          |
| `Input`   | Labeled text fields with hint and error messages.            |
| `Card`    | White boxes with the brand border.                           |
| `Stack`   | Rows and columns with a gap. Use it instead of margins.      |
| `Text`    | Anything you read.                                           |
| `Heading` | Titles and section headings.                                 |

Props only accept the options listed on `/design`; there's no `className` or `style`. If you need a variant that doesn't exist, add it to the component in `components/ui/` in its own PR.

## Writing a component

Every component in `components/` follows the same shape, so you can open any file and know where things are.

**Where it goes**

```
components/
  ui/              base pieces: no data, no API calls (Button, Tag, Avatar…)
  question/        question feature (QuestionPanel, QuestionCard, AskQuestionForm)
  answer/  comment/  study-group/  notification/  user/  search/
hooks/             shared hooks (useHeart, useAction, useDebounce)
lib/format.ts      formatting helpers (formatTimePassed, formatDateTime)
```

One component per `PascalCase.tsx` file, in the folder of the feature it belongs to. No folder per component and no CSS modules.

**What the file looks like**

1. `'use client'` at the top only if the component uses state, effects or event handlers.
2. `export type ThingProps = { … }`: always `type`, always named `<Component>Props`.
3. A short JSDoc comment with an `@example`.
4. `export function Thing({ … }: ThingProps)`: a named export. No `export default`, no `React.FC`.
5. Built only from `@/components/ui` pieces and token classes. No `evergreen-ui`, CSS modules, `style={{}}` or hex colors.
6. No API calls inside components. Data comes in through props; actions go through a hook in `hooks/` (for example `useHeart`), so loading, rollback and error handling are written once.
7. Icons come from `lucide-react` only.

`npm run lint` warns when a file in `components/` or `hooks/` breaks rules 4–7.

## Adding or changing a token

1. Add it in Figma first (or get a designer to).
2. Add it to `app/tokens.css` with the same name, inside `@theme`. Colors are `--color-<name>`, spacing `--spacing-<n>`, radius `--radius-<name>`. Add a short alias under `:root` if Figma uses one (`--brand: var(--color-brand)`).
3. Add the name to `lib/design-tokens.ts` so `cn()` and `/design` know about it.
4. Check it on `/design`.
5. Open one PR that contains the Figma link and the code change.

## Migrating existing code

30 of the 39 `.tsx` files use Evergreen (`evergreen-ui`) and many use hex colors and inline styles. **New code uses `components/ui`.** Old code is migrated **one file at a time when you touch it**, not in one big rewrite. Each file has a migration ticket; `npm run lint` shows what's left.

Still around for now so old pages keep their look. **Don't use these in new code** (ESLint warns):

- **Tailwind's default palette and spacing** (`text-gray-500`, `mb-12`). The last migration ticket turns them off by uncommenting `--color-*: initial` and `--spacing-*: initial` in `tokens.css`.
- **Old shadcn colors** (`bg-background`, `text-foreground`, `bg-card`, `text-primary`, `text-muted-foreground`, `border-border`): deprecated aliases at the bottom of the `@theme` block.
- **`p { font-size: 14pt }`** in `lib/hoagie-ui/Theme/theme.css`, which makes any `<p>` without classes about 18.67px. `<Text>` isn't affected, because Tailwind classes are `!important`; `theme.css` loads outside any CSS layer.
- **Evergreen components** (`Pane`, `Text`, `Heading`, `Button` from `evergreen-ui`). Replace them when you touch a page.
- **Off-scale spacing** like `mb-12`, `py-16`, `gap-1.5`: the lint warning names the nearest allowed step.
- **The Evergreen theme** (`lib/hoagie-ui/Theme/themes.tsx`) reads brand colors from the tokens, so old Evergreen code and new code use the same red.
