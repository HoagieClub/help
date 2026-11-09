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

Before you begin, ensure you have [uv](https://docs.astral.sh/uv/) installed. We will be using uv as our package manager for the backend. Install uv using the command for your operating system:

**macOS** (with [Homebrew](https://brew.sh/)):

```bash
brew install uv
```

**Linux** (or macOS without Homebrew):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows** (PowerShell):

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Alternatively, on Windows you can install uv with [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/):

```powershell
winget install --id=astral-sh.uv -e
```

After installing, close and reopen your terminal so `uv` is on your `PATH`, then verify the installation with:

```bash
uv --version
```

See the [uv installation docs](https://docs.astral.sh/uv/getting-started/installation/) for other installation methods.

#### Installation
Before beginning with the installation, make sure you are in the backend directory by running:

```bash
cd backend
```


After installing uv, create a virtual environment using the following command:

```bash
uv venv --prompt hoagie-help --python 3.12.12 .venv
```

This creates a virtual environment named `hoagie-help` contained within the `.venv` directory. If you don't already have Python 3.12.12 installed, uv will download it automatically.

Activate the virtual environment using the command for your shell:

**macOS / Linux:**

```bash
source .venv/bin/activate
```

**Windows (PowerShell):**

```powershell
.venv\Scripts\Activate.ps1
```

If PowerShell blocks the script with an error saying running scripts is disabled on this system, allow locally created scripts for your user account once with `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then try again.

**Windows (Command Prompt):**

```bat
.venv\Scripts\activate.bat
```

**Windows (Git Bash):**

```bash
source .venv/Scripts/activate
```

To deactivate the virtual environment later, run `deactivate`. Activation is optional when using `uv run`, since uv automatically uses the project's `.venv`.

To install the relevant backend dependencies, run:
```bash
uv sync
```

This will install all required backend dependencies in the virtual environment. To also install the development tools (such as `ruff` for linting and formatting), run `uv sync --group dev`.

#### Environment Variables

The backend reads its configuration from a `.env` file in the `backend` directory. Create one by copying the example file:

**macOS / Linux / Git Bash:**

```bash
cp .env.example .env
```

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

**Windows (Command Prompt):**

```bat
copy .env.example .env
```

Then open `.env` and fill in the values:

| Variable | Description |
| --- | --- |
| `SECRET_KEY` | Django's secret key. The example value is fine for local development. |
| `DEBUG` | Set to `True` for local development. |
| `ALLOWED_HOSTS` | Comma-separated hosts Django will serve. Use `localhost,127.0.0.1` locally. This must not be left empty, or every request will fail with `400 Bad Request`. |
| `LOGS` | Set to `True` to print debug logs (including SQL queries) to the console. |
| `DATABASE_URL` | The PostgreSQL connection URL, in the form `postgres://USER:PASSWORD@HOST:PORT/DATABASE`. See [Database](#database) below. |
| `AUTH0_DOMAIN` | Your Auth0 tenant domain. Must match `AUTH0_DOMAIN` in the frontend's env file. |
| `AUTH0_AUDIENCE` | The Auth0 API identifier. Must match `AUTH0_AUDIENCE` in the frontend's env file. |

Ask a team lead for the Auth0 values (and the shared database URL, if you're using it).

#### Database

The backend requires a PostgreSQL database. You can either use the team's shared development database (ask a team lead for its `DATABASE_URL`) or run your own local one.

The easiest way to run a local database on any operating system is with [Docker](https://www.docker.com/products/docker-desktop/):

```bash
docker run --name hoagie-help-db -e POSTGRES_USER=hoagie -e POSTGRES_PASSWORD=hoagie -e POSTGRES_DB=hoagiehelp -p 5432:5432 -d postgres:17
```

Then set the following in your `.env`:

```
DATABASE_URL="postgres://hoagie:hoagie@localhost:5432/hoagiehelp"
```

To start the database again later (for example, after restarting your computer), run `docker start hoagie-help-db`.

If you'd rather not use Docker, you can install PostgreSQL directly from the [official downloads page](https://www.postgresql.org/download/) (installers are available for macOS, Windows, and Linux), create a database, and point `DATABASE_URL` at it.

#### Running Migrations

Before running the server for the first time, create the database tables by applying the migrations:

```bash
uv run manage.py migrate
```

Re-run this command whenever you pull changes that add new files in `hoagiehelp/migrations/`.

> **Note:** If you're connected to the team's shared database, migrations affect everyone using it. Pulled migrations are usually already applied there, so `migrate` will report "No migrations to apply." If you're writing a new migration, test it against a local database first, and coordinate with the team before applying it to the shared one.

#### Running the app

Start the development server with:

```bash
uv run manage.py runserver
```

The API will now be running at localhost:8000. Make sure `HOAGIE_API_URL` in the frontend's env file is set to `http://localhost:8000/` (including the trailing slash) so the frontend can reach it.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
