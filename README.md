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

The backend setup depends on the specific Hoagie Club app you're working on. Refer to the app-specific [documentation](https://docs.hoagie.io/) for backend details.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
