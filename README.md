# Solview

A responsive Solana NFT viewer built with **Next.js App Router** and **TanStack Query v5**.

This project focuses on clean client-side data architecture, infinite pagination, and UI-driven performance.

---

## Features

- Infinite scroll using `IntersectionObserver`
- Responsive page sizing (`columns × rowsPerPage`)
- Typed infinite queries (TanStack Query v5)
- Discriminated union card states (`loading | success | error`)
- Clear separation between query logic and presentation

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- TanStack Query v5
- Tailwind CSS
- Helius API (Solana)

---

## Getting Started

Install dependencies:

```bash
npm install
npm run dev
