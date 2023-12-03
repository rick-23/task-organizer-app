## Project description:

This project is intended to help users to create and track tasks.

Feature implemented this far:

- User authentication and authorization system with JWT token and NodeMailer for email authorization (Used by Verification and Forgot Password features).
- CRUD operations on tasks per user

Pending features:

- UI Enhancements and Form Validations
- Email based alerting system on the deadline day for tasks per user.
- Task Filtering and Statistics

## Tech stack

DB: MongoDB
APIs: NextJS and NodeMailer on NodeJS framework
UI: NextJS and ReactJS along with Flowbite, TailwindCSS, Redux, JWT, BCryptJS
Programming languages: TypeScript, JavaScript

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
