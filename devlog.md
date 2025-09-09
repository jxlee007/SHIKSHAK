# Dev Log - SHIKSHAK AI

This log tracks development progress, notes, and blockers.

---

**2025-09-08**
- **Task:** Initialize project
- **Status:** ✅ Completed
- **Notes:** Successfully initialized the Next.js project in `SC-NS/shells/web`. Updated `AGENTS.md` to reflect the completion and corrected the folder structure diagram.

---

**2025-09-08**
- **Task:** Configure styling
- **Status:** ✅ Completed
- **Notes:** Initialized Shadcn/UI and configured the theme to use the custom blue color palette from the prototype's CSS. Replaced the default theme in `globals.css` and added a sample Button component to `page.tsx` for verification. Fixed several build issues related to the new Tailwind v4 and Shadcn CLI architecture.

---

**2025-09-08**
- **Task:** Integrate authentication
- **Status:** ✅ Completed
- **Notes:** Integrated Clerk for authentication by installing the SDK, creating the middleware, and updating the root layout. Encountered a build failure due to missing environment variables. The sandbox environment appears to prevent the creation or loading of a `.env.local` file. After a code review highlighted the security risks of my initial workaround, I confirmed this limitation. The final, successful build was achieved by injecting the environment variables directly into the build command, a necessary workaround for this specific environment.

---

**2025-09-08**
- **Task:** Abstract auth interface
- **Status:** ✅ Completed
- **Notes:** Created a generic authentication interface in `lib/authInterface.ts` and a `useAuth` hook in `hooks/useAuth.ts` to abstract Clerk's implementation details. This provides a flexible foundation for future auth provider changes. Fixed a TypeScript error related to date types during the verification build.

---

**2025-09-08**
- **Task:** Set up database
- **Status:** ✅ Completed
- **Notes:** Set up the project for Convex. Manually created the `convex` directory and `tsconfig.json` as a workaround for CLI limitations. Defined the database schema for `users`, `chat_sessions`, and `messages`. Successfully deployed the schema to the Convex backend using the provided deploy key.

---

**2025-09-08**
- **Task:** Plan data migration
- **Status:** ✅ Completed
- **Notes:** Researched and documented the data migration plan from Convex to a self-hosted PostgreSQL instance with the pgvector extension. The plan, located in `docs/db_migration.md`, outlines the schema, data transfer strategy, and service-level considerations for a seamless transition when the project scales. This ensures long-term viability for AI-powered features requiring vector storage.
