# CNSA Tools Hub

> Central portal for all CNSA educational tools

| Item | Value |
|------|-------|
| **Deploy** | Vercel |
| **URL** | cnsatools.com (password-protected) |
| **GitHub** | github.com/fbwiqb/cnsa-hub |
| **Stack** | Static HTML + Vercel Edge Middleware |
| **Backend** | None |

## Architecture

```
CNSA 허브/
├── index.html          # Hub page - 8 tool cards
├── middleware.js        # Vercel Edge Middleware (password auth)
├── vercel.json          # SPA rewrite rule
└── favicon.png          # CNSA logo
```

## Auth

- Vercel Edge Middleware intercepts `/`
- Password via query param: `/?auth=<password>`
- Cookie `cnsa_auth=verified` (7-day expiry, SameSite=Strict)
- Logout: `/?logout=true` clears cookie

## Linked Services

| Tool | Domain | Project |
|------|--------|---------|
| 제시문 면접 | qbank.cnsatools.com | 면접 아카데미 |
| 면학실 | study.cnsatools.com | 면학 출석 |
| 수행평가 | grade.cnsatools.com | 수행평가 |
| 시뮬레이션 | simul.cnsatools.com | 시뮬레이션 |
| 다했니? | dajandi.cnsatools.com | 다잔디 |
| 문제 은행 | cnsa-problem-bank.vercel.app | riro-web |
| 상담 예약 | GAS 웹앱 (느가부지모하시노) | 06_느가부지모하시노 |
| 학과 검색 | app-sigma-kohl-65.vercel.app | - |
