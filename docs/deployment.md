# GitHub and Vercel deployment

The website is a static React and Vite application. Vercel builds it from the
GitHub repository; the build output is `dist/`. No development server needs to
run on the maintainer's computer for the live site to stay available.

## Checks

GitHub Actions runs the test suite, TypeScript check, lint, and production build
on pushes to `main` and pull requests targeting `main`. It installs Node.js 22
dependencies with `npm ci`.

## Publishing updates

Vercel is connected to the GitHub repository and deploys changes pushed to
`main`. Make and review edits with Droid, then commit and push them to publish.
Uncommitted local edits do not change the live site.

`vercel.json` sends client-side routes to `index.html`, so direct visits and
browser refreshes work on `/about`, `/people`, and `/contact`.

## Local files and secrets

Keep local edits in this folder for Droid. `node_modules/` and `dist/` are
generated locally and excluded from Git; dependencies and production builds
are recreated by GitHub Actions and Vercel.

Do not commit credentials or private environment files. The project `.gitignore`
excludes `.env` files; add any future deployment secrets to Vercel's environment
settings rather than the repository.

## Contact

The site has no contact form or email service. The Contact page links to the
president's email address, LinkedIn, Instagram and the interest form.
