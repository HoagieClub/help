# HoagieHelp

Repository for HoagieHelp.

## Getting Started

### Frontend

#### Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) 22 (version 22.9.0 or later) installed. npm comes bundled with Node.js, so no separate package manager is needed. You can check your versions with:

```bash
node -v
npm -v
```

#### Installation

First, make sure you're in the frontend directory:

```bash
cd frontend
```

To install the necessary dependencies for this project, run:

```bash
npm install
```

To install the exact versions recorded in `package-lock.json` without modifying it (this is what CI does), run:

```bash
npm ci
```

When adding or removing a dependency, use `npm install <package>` or `npm uninstall <package>` and commit the updated `package.json` and `package-lock.json` together. Please don't use Yarn or pnpm in this project, since they create a separate lockfile that will drift out of sync.

#### Environment Variables

Copy the example environment file and fill in the values:

```bash
cp .env.local.example .env.local
```

#### Running the App

Once the dependencies are installed, you can start the development server by running:

```bash
npm run dev
```

The app will now be running locally, and you can view it in your browser at localhost:3000.

#### Linting

You can run `eslint` to find common errors and bugs in your code with:

```bash
npm run lint
```

To try to automatically fix these errors, run:

```bash
npm run lint:fix
```

#### Formatting

You can run `prettier` to check the styling of your code and ensure consistent formatting:

```bash
npm run format
```

To automatically fix the formatting, run:

```bash
npm run format:fix
```

#### Type Checking

You can run the TypeScript compiler to check for type errors with:

```bash
npm run type-check
```

#### Migrating from Yarn

The frontend previously used Yarn. If you have an existing checkout that was set up with Yarn, follow these steps once after pulling the change that switched to npm:

1. Go to the frontend directory:

   ```bash
   cd frontend
   ```

2. Close VS Code (or any editor running the ESLint extension) and stop any running dev server first. On Windows, these keep native files in `node_modules` locked, which makes deletion fail with an `EPERM` error. Then remove the old Yarn artifacts and your existing `node_modules`:

   ```bash
   rm -rf node_modules .yarn .yarnrc.yml yarn.lock
   ```

   On Windows (PowerShell), use:

   ```powershell
   Remove-Item -Recurse -Force node_modules, .yarn, .yarnrc.yml, yarn.lock -ErrorAction SilentlyContinue
   ```

3. Reinstall dependencies with npm from the committed lockfile:

   ```bash
   npm ci
   ```

4. Use npm for all commands from now on:

   | Yarn                    | npm                         |
   | ----------------------- | --------------------------- |
   | `yarn`                  | `npm install`               |
   | `yarn install --immutable` | `npm ci`                 |
   | `yarn add <pkg>`        | `npm install <pkg>`         |
   | `yarn add -D <pkg>`     | `npm install -D <pkg>`      |
   | `yarn remove <pkg>`     | `npm uninstall <pkg>`       |
   | `yarn dev` / `yarn <script>` | `npm run dev` / `npm run <script>` |

5. (Optional) If you enabled Corepack only for this project and no longer need it, you can disable it with:

   ```bash
   corepack disable
   ```

If you have local branches that changed `yarn.lock`, re-apply those dependency changes with `npm install <package>` after rebasing onto the new main branch instead of resolving `yarn.lock` conflicts.

### Backend

#### Prerequisites

Before you begin, ensure you have [uv](https://docs.astral.sh/uv/) installed. We will be using uv as our package manager for the backend. uv can be installed by running:

```bash
brew install uv
```

#### Installation
Before beginning with the installation, make sure you are in the backend directory by running:

```bash
cd backend
```


After installing uv, create a virtual environment using the following command:

```bash
uv venv --prompt hoagie-help --python 3.12.12 .venv
```

This creates a virtual environment named `hoagie-help` contained within the `.venv` directory. Activate the virtual environment with:

```bash
source .venv/bin/activate
```

To install the relevant backend depedencies, run:
```bash
uv sync
```

This will install all required backend dependencies in the virtual environment.

#### Running the app
```bash
uv run manage.py runserver
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
