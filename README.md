# Sudabeh Zolfi Khorram · Portfolio

Product designer for SaaS, fintech and internal tools.

**Live site: [sudabehzolfikhorram.github.io](https://sudabehzolfikhorram.github.io)**

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run cv      # rebuilds public/Sudabeh-Zolfi-Khorram-Resume.pdf
npm run test:assistant  # QA for the assistant’s built-in answers
```

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
The contact form and the "Ask about me" assistant post to the Google Apps Script in `docs/contact-form.gs`.
The assistant answers with Claude from `public/assistant/knowledge.md` once an API key is set, and falls back to the built-in answers in `src/lib/assistant.ts`; see `docs/assistant-setup.md`.
