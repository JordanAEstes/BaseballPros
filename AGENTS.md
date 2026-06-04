<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Local Node version note

This project expects the `nvm` Node install at:

```bash
/Users/jordanestes/.nvm/versions/node/v26.3.0/bin
```

Some agent command shells may resolve `node`/`npm` to older installs, including a broken Homebrew Node at `/usr/local/bin/node` or an older `nvm` Node. If Node/npm commands fail with ICU library errors, npm prefix warnings, or unexpected old versions, prefix commands with the Node 26 path:

```bash
PATH=/Users/jordanestes/.nvm/versions/node/v26.3.0/bin:$PATH npm run lint
PATH=/Users/jordanestes/.nvm/versions/node/v26.3.0/bin:$PATH npm run dev
PATH=/Users/jordanestes/.nvm/versions/node/v26.3.0/bin:$PATH npx tsc --noEmit
```
