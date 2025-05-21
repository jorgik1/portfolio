# Portfolio for developers

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/jorgik1/gatsby-portfolio-dev)

**Live Demo:** [https://yuriy-dev.now.sh/](https://yuriy-dev.now.sh/)

## Project Overview/Purpose

A Gatsby-based personal portfolio website designed for developers to showcase their work and skills. It's built to be easily customizable and deployable.

## Features

*   Fetches and displays project data directly from your GitHub account.
*   Clean and modern design.
*   Responsive layout for optimal viewing on all devices.
*   Contact form for easy communication.
*   PWA Ready for enhanced performance and offline capabilities.
*   SEO friendly.

## Tech Stack

*   **Framework:** [Gatsby](https://www.gatsbyjs.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Styled Components](https://styled-components.com/)
*   **Data:** [GraphQL](https://graphql.org/) (via Gatsby's data layer)
*   **Deployment:** [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/) (formerly ZEIT Now)

## Prerequisites

To work on this project, you'll need the following installed on your local machine:

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
*   [Git](https://git-scm.com/)

It's highly recommended to use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to manage your Node.js versions. This project includes a `.nvmrc` file which specifies the Node.js version to use. If you have NVM installed, you can simply run `nvm use` in the project root to switch to the correct version.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jorgik1/gatsby-portfolio-dev.git
    cd gatsby-portfolio-dev
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer Yarn and have it installed)

3.  **Environment Variables:**
    This project requires a GitHub Personal Access Token (PAT) to fetch your project data from GitHub.

    *   Create a file named `.env.development` in the root of the project.
    *   Generate a new PAT on GitHub:
        *   Go to your GitHub settings: Settings > Developer settings > Personal access tokens.
        *   Click "Generate new token".
        *   Give it a descriptive name (e.g., "PortfolioDevToken").
        *   Select the `public_repo` scope (or `repo` if you have private repositories you want to showcase, though `public_repo` is generally safer for this use case).
        *   Click "Generate token" and copy the token.
    *   Add your token to the `.env.development` file like this:
        ```
        GITHUB_TOKEN=your_github_pat_here
        ```
    *   The `gatsby-source-graphql` plugin uses this token to query the GitHub API. For production builds (e.g., on Netlify/Vercel), you will need to set this environment variable in your build environment settings.

## Running in Development Mode

To start the development server:

```bash
npm start
```

This command will:
*   Start a hot-reloading development server.
*   You can typically access it at `http://localhost:8000`.
*   Changes you make to the code will be reflected live in the browser.

## Available `npm` Scripts

*   `npm start`: Starts the development server.
*   `npm run build`: Builds the static site for production into the `public` folder.
*   `npm run format`: Formats all code using Prettier.
*   `npm run reset`: Removes the `.cache` and `public` directories to clear Gatsby's cache and build artifacts.
*   `npm test`: Runs automated tests (currently under development).

## Folder Structure Overview

```
gatsby-portfolio-dev/
├── .cache/             # Gatsby's internal cache, auto-generated
├── node_modules/       # Project dependencies
├── public/             # Output folder for the production build
├── static/             # Static assets (e.g., favicon, images) copied directly to public
├── src/
│   ├── components/     # Reusable React components (e.g., Header, Footer, ProjectCard)
│   ├── data/           # Configuration files, static JSON data
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # Gatsby page components (e.g., index.js, 404.js)
│   ├── templates/      # Templates for programmatically creating pages (if any)
│   └── theme/          # Global styles, theme configurations
├── .env.development    # Development environment variables (GITIGNORED)
├── .env.production     # Production environment variables (GITIGNORED, example)
├── .gitignore
├── .nvmrc              # Specifies the Node.js version
├── .prettierrc         # Prettier configuration
├── gatsby-browser.js   # Gatsby browser API implementations
├── gatsby-config.js    # Main Gatsby configuration file
├── gatsby-node.js      # Gatsby Node API implementations
├── LICENSE.md
├── package-lock.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:
1.  Open an issue to discuss the changes.
2.  Fork the repository and create a new branch.
3.  Make your changes.
4.  Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
