# User management dashboard

A **Next.js** project built with **TypeScript**, utilizing the following tools and libraries:

- **React 19.0.0** for building user interfaces.
- **Tailwind CSS** for styling.
- **Radix UI** components for accessible primitives.
- **Lucide React** for icons.
- **ESLint** and **Prettier** for linting and code formatting.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest stable version preferred)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dnaletov/admin-dashboard
   cd admin-dashboard
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

### Environment Variables

To log in to the dashboard, you need to provide login credentials (email and password).

An example file .env.example is included in the root of the repository.
This file contains credentials for logging in as an admin user.

Create a copy of .env.example and rename it to .env:

Update the values if needed. The default file includes:

These credentials will allow you to log in to the dashboard locally.

### Development

To run the development server:

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload when you make
edits.

### Build

To create an optimized production build:

```bash
yarn build
```

### Start

Run the production build:

```bash
yarn start
```

### Linting and Formatting

- Run ESLint:

  ```bash
  yarn lint
  ```

## Features

- Efficient server-side rendering and static site generation with Next.js.
- Modular styling using Tailwind CSS.
- Component-first architecture leveraging Radix UI.
- Clean and consistent codebase with ESLint and Prettier.

---

Created with ❤️ using Next.js
