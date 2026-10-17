# GitHub and Vercel deployment

The website is a React and Vite application with one private contact API.
Vercel builds it from the GitHub repository; the static build output is `dist/`,
and `api/contact.ts` runs as a Vercel Function. No development server needs to
run on the maintainer's computer for the live site to stay available.

## Checks

GitHub Actions runs the test suite, TypeScript check, lint, and production build
on pushes to `main` and pull requests targeting `main`. It installs Node.js 22
dependencies with `npm ci`.

## Publishing updates

Vercel is connected to the GitHub repository and deploys changes pushed to
`main`. Make and review edits with Droid, then commit and push them to publish.
Uncommitted local edits do not change the live site.

`vercel.json` preserves API routes and proxies BotID's challenge routes, then
sends client-side routes to `index.html`, so direct visits and browser refreshes
work on `/about`, `/people`, and `/contact`.

## Local files and secrets

Keep local edits in this folder for Droid. `node_modules/` and `dist/` are
generated locally and excluded from Git; dependencies and production builds
are recreated by GitHub Actions and Vercel.

Do not commit credentials or private environment files. The project `.gitignore`
excludes `.env` files; add any future deployment secrets to Vercel's environment
settings rather than the repository.

## Contact

The Contact page has an on-site form, social links, and the interest form.
Set `CONTACT_RECIPIENT` as a sensitive environment variable scoped only to
production, then redeploy. Never use a `VITE_` prefix or commit the recipient.
FormSubmit handles delivery after its one-time recipient activation; the API
keeps the address out of browser code and responses.

Vercel BotID Basic is explicitly selected on client and server. Leave paid
Deep Analysis disabled. OIDC is required by BotID and is enabled for this
project. Both Basic protection and FormSubmit are free; normal hosting quotas
apply. Preview/local deployments cannot send mail, and missing configuration
leaves the form disabled. `npm run dev` previews layout only; run the mocked
server tests to check forwarding without emailing anyone.

After deployment, check `/api/contact` returns only `{"ready":true}`, verify
normal page routes, and check that an unverified POST cannot reach the provider.
Use a real browser for an authorized delivery test because BotID rejects raw
HTTP clients. A success message confirms provider acceptance, not inbox delivery.
