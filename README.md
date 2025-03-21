<p align="center"><img src="https://raw.githubusercontent.com/1984vc/website/main/static/images/github-logo.svg" width="100" align="center"></p>

# 1984.vc Website

## Requirements

- Node >20
- pnpm (for building JS assets, and startup-finance submodule)
- hugo

## Development / Contributing

### Setup

1. **Install Dependencies:**  
   or if you're using pnpm:  
   ```bash
   pnpm install
   ```

2. **Tailwind CSS Setup:**  
   - The project uses Tailwind CSS for styling. The configuration is defined in `tailwind.config.js`.  
   - To compile your Tailwind styles, run:  
     ```bash
     bash scripts/tailwind.sh
     ```
   - This script processes your Tailwind configuration and outputs the compiled CSS to the appropriate directory.

3. **Build Process:**  
   - Build the project using the build script:  
     ```bash
     bash scripts/build.sh
     ```

4. **Development Server:**  
   - To run a local development server (if applicable), use the provided serve script:  
     ```bash
     bash scripts/serve.sh
     ```
   - This allows you to preview your changes locally as you develop.

## Custom Sidebar Configuration

This project uses a custom sidebar configuration to organize the navigation differently from the folder structure. This allows for a more flexible organization of content while maintaining stable URLs.

### How It Works

1. The sidebar structure is defined in `data/sidebar.yaml`
2. The sidebar template reads this configuration
3. URLs remain based on the folder structure, but the sidebar organization can be completely customized

### Updating the Sidebar

To update the sidebar structure:

1. Edit the `data/sidebar.yaml` file
2. Add, remove, or reorder sections and items as needed
3. Make sure all URLs point to valid pages in your site

### Validating the Sidebar Configuration

A validation script is provided to ensure all URLs in the sidebar configuration are valid:

```bash
node scripts/validate-sidebar.js
```

For more detailed information about the sidebar configuration, see [docs/sidebar/README.md](docs/sidebar/README.md).

---

## Deployment Process

The project uses GitHub Actions to automate deployments and maintain up-to-date environments.

### Production Deployment

- **Workflow:**  
  Production deployments are handled by the workflow defined in [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml).
  
- **Trigger:**  
  This workflow is triggered upon merging changes to the main branch. It builds, tests, and deploys the project automatically.

### Preview Deployments

- **Workflow:**  
  Preview deployments are managed by [`.github/workflows/deploy-preview.yaml`](.github/workflows/deploy-preview.yaml).
  
- **Purpose:**  
  This workflow is designed to create a staging environment for feature branches and pull requests. This allows you to inspect changes before they are merged into production.

### Automated Updates & Pull Requests

- **Workflow:**  
  Automated updates are handled by [`.github/workflows/pull-latest-and-pr.yaml`](.github/workflows/pull-latest-and-pr.yaml).

- **Function:**  
  This workflow periodically pulls the latest changes from the repository and creates or updates pull requests to ensure that the codebase stays current.
