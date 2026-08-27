# Aether Profile

Interactive single-screen portrait experience built with Next.js, TypeScript, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

The development server is started by Next.js. Any `127.0.0.1` address is local-only and is not used in production.

## Production build

```bash
npm run build
npm run start
```

The project requires Node.js 20.9 or newer.

## Deploy on Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep the detected framework preset as **Next.js**.
4. Leave Build Command as `npm run build` and Output Directory empty.
5. Click **Deploy**.

No environment variables or custom `vercel.json` configuration are required for the current project.
