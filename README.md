# HoagieHelp

Repository for HoagieHelp.

## Getting Started

### Frontend

#### Prerequisites

Before you begin, ensure you have [Yarn](https://yarnpkg.com/) installed. You can install Yarn using corepack following [this guide](https://yarnpkg.com/getting-started/install):

```bash
npm install -g corepack
```

You can set your yarn version to the latest version with:

```bash
yarn set version stable
```

If your yarn version isn't applied globally, you can install a global version of yarn with:

```bash
corepack install --global yarn@4.10.3
```

#### Installation

First, make sure you're in the frontend directory:

```bash
cd frontend
```

To install the necessary dependencies for this project, run:

```bash
yarn
```

#### Running the App

Once the dependencies are installed, you can start the development server by running:

```bash
yarn dev
```

The app will now be running locally, and you can view it in your browser at localhost:3000.

#### Linting

You can run `eslint` to find common errors and bugs in your code with:

```bash
yarn lint
```

To try to automatically fix these errors, run:

```bash
yarn lint:fix
```

#### Formatting

You can run `prettier` to check the styling of your code and ensure consistent formatting:

```bash
yarn format
```

To automatically fix the formatting, run:

```bash
yarn format:fix
```

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
