# Full Stack AI SaaS App - Detailed Implementation Steps

This document outlines the step-by-step guide to build a full-stack SaaS video calling application powered by AI agents ("Meet AI"), using technologies like Next.js 15, TRPC, OpenAI, Stream SDK, Better Auth, and Polar.

---

## ✅ Project Goals

* AI agents join video calls and participate actively
* Summarization and transcript post-call
* Real-time chat understanding
* SaaS payment model
* Role-based authentication

---

## 1. Initial Setup

### A. Create Project with Next.js

```bash
npx create-next-app@15.3.2 meet-ai --typescript
```

**Options:** Yes to TypeScript, ESLint, Tailwind, src dir, App Router, Turbopack. No to alias.

### B. Confirm Environment

* Node.js >= 18.18
* npm, npx present

### C. Setup IDE & Confirm Project Files

* Visual Studio Code
* Check: `src/app`, `tailwind.config.ts`, etc.

### D. Run App

```bash
npm run dev
```

Go to `http://localhost:3000`

---

## 2. Install UI & Component Libraries

### A. Install Shadcn UI

```bash
npx shadcn-ui@2.5.0 init --base-color neutral --install-legacy-peer-deps
```

### B. Add Full Component Set

```bash
npx shadcn-ui@2.5.0 add all --install-legacy-peer-deps
```

---

## 3. Setup Git & GitHub

### A. Initialize Git & Create First Commit

```bash
git init
git remote add origin <your_repo_url>
git add .
git commit -m "01-setup"
git push -u origin main
```

---

## 4. Database Setup

### A. Create Neon PostgreSQL DB

* Go to [Neon](https://neon.tech) > New Project
* Save your connection string

### B. Add to `.env`

```env
DATABASE_URL="postgresql://..."
```

### C. Install Drizzle ORM

```bash
npm install drizzle-orm@0.43.1 neon@1.1.1 dotenv@16.5.0 --legacy-peer-deps
```

### D. Setup Schema

* `src/database/schema.ts`
* Define tables (e.g. `users`, `sessions`, `accounts`)

### E. Setup Drizzle Config

* `drizzle.config.ts`
* Define schema path, out path, dialect, DB URL

### F. Push Schema to DB

```bash
npx drizzle-kit push
```

---

## 5. Setup Drizzle Studio (Optional)

```bash
npx drizzle-kit studio
```

---

## 6. Auth with Better Auth

### A. Install Better Auth

```bash
npm install better-auth@1.2.8 --legacy-peer-deps
```

### B. Setup `.env`

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

### C. Create Auth Instance

* File: `src/lib/auth.ts`
* Configure with Drizzle adapter

### D. Generate Auth Schema

```bash
npx better-auth-cli@1.2.8 generate
```

* Merge generated schema into `src/database/schema.ts`

### E. Push Auth Tables to DB

```bash
npm run database:push
```

---

## 7. Setup Git Branch for Auth

```bash
git checkout -b 02-auth
git add .
git commit -m "02-auth"
git push --set-upstream origin 02-auth
```

* Create PR and merge it

---

## 8. Summary of Tech Stack

| Layer           | Technology           |
| --------------- | -------------------- |
| Frontend        | Next.js 15, React 19 |
| UI Components   | Shadcn UI, Tailwind  |
| Auth            | Better Auth          |
| Database        | PostgreSQL (Neon)    |
| ORM             | Drizzle ORM          |
| Background Jobs | Inngest              |
| LLM Agent       | OpenAI API           |
| Video/Chat SDK  | Stream               |
| Payments        | Polar                |
| Dev Tools       | Code Rabbit (AI PR)  |

---

This document continues through later steps including agent creation, stream integration, AI workflows, real-time meeting handling, summarization jobs, and Stripe subscription logic. Let me know if you want the rest formatted similarly.

---

# tactiq.io free youtube transcript
# Build and Deploy a SaaS AI Agent Platform | Next.js 15, React, Better Auth, Polar | Full Course 2025
# https://www.youtube.com/watch/xEDCEmqyvC8

00:00:00.719 Welcome to Meet AI, a video calling app
00:00:04.480 powered entirely by AI agents. These
00:00:08.000 aren't just summaries or transcripts.
00:00:10.719 Every meeting here was an actual
00:00:13.040 real-time call with an AI trained for a
00:00:16.160 specific role. Whether it's a language
00:00:18.560 tutor, interview coach, sales assistant,
00:00:21.600 or something completely custom, the AI
00:00:24.240 is there to actively help during the
00:00:26.400 call. To start a new call with an AI
00:00:29.279 agent, I click on the new meeting
00:00:31.559 button. I'm going to name this one
00:00:34.239 startup coaching call. I'll also create
00:00:37.520 a new agent here called Hustle Coach.
00:00:41.040 And just for fun, in the instructions,
00:00:43.680 I'll tell it to be direct, hyperdriven,
00:00:46.559 and a bit over the top, like a founder
00:00:49.280 who just raised a seed round. Once the
00:00:52.559 agent's created, I can select it and I'm
00:00:55.520 ready to start the meeting. With
00:00:57.520 everything set, I click create meeting
00:01:00.239 and land on the new meeting
00:01:02.359 page. Right now, the meeting is
00:01:04.879 scheduled as upcoming, which means I can
00:01:08.080 come back to it later, cancel it, or
00:01:11.439 start the call whenever I'm ready. So,
00:01:14.320 I'll go ahead and hit start. That takes
00:01:17.200 me into a familiar looking lobby just
00:01:19.759 like Zoom or Google Meet where I can
00:01:22.400 check my camera and microphone before
00:01:24.600 joining. Once I enter the call, our new
00:01:27.759 agent, Hustle Coach, shows up right
00:01:30.600 after. This is a live AI in the meeting
00:01:34.159 with me responding in real time powered
00:01:37.200 by Stream Video SDK and Open AI Realtime
00:01:41.360 API.
00:01:42.880 Hey, hustle coach. What makes a good
00:01:45.759 startup idea? All right, listen up. A
00:01:49.439 killer startup idea boils down to three
00:01:52.320 things. Massive market potential, a
00:01:55.119 unique value proposition, and
00:01:57.399 scalability. You want a problem that's
00:01:59.680 begging for disruption and a solution
00:02:02.000 that screens innovation. And don't
00:02:04.640 forget, your model needs to scale like
00:02:07.600 wildfire. If you can pitch it in one
00:02:10.560 sentence and it sounds epic, you're on
00:02:13.200 to something hot. Now go out there and
00:02:15.920 disrupt, disrupt, disrupt. When the call
00:02:19.520 ends, the meeting switches to processing
00:02:22.440 status. Behind the scenes, background
00:02:25.120 jobs kick off automatically, powered by
00:02:28.000 ingest and agent kit. These workflows
00:02:31.360 handle everything. Fetching the
00:02:33.519 transcript, summarizing with AI, and
00:02:36.239 saving the results back to the database.
00:02:38.800 When the meeting is done processing,
00:02:41.040 it's marked as completed, and all the
00:02:43.599 content is ready. First, there's the
00:02:46.000 summary. A clean breakdown of what was
00:02:48.800 discussed, organized by topic, and
00:02:51.400 timestamp. Next is the transcript. It's
00:02:54.640 fully searchable and when you search for
00:02:56.800 a word, it highlights every place it
00:03:00.040 appears. The whole call is also recorded
00:03:03.280 and available to replay. And finally,
00:03:06.720 there's a chat GPT like interface that
00:03:09.599 actually understands the meeting powered
00:03:11.920 by stream chat SDK. You can ask for
00:03:15.560 specifics like who asked for advice and
00:03:19.040 it will give you the answer. Meet AI is
00:03:22.400 a SAS product. So, it runs on a
00:03:25.040 subscription
00:03:26.200 model. Down here, you can see I've hit
00:03:29.200 the limits of the free trial. When I try
00:03:32.400 to create a new meeting, I'm redirected
00:03:34.799 to a page with three upgrade options.
00:03:38.400 I'll go ahead and upgrade. And that
00:03:40.400 takes me through a quick checkout
00:03:42.319 powered by
00:03:46.280 Polar. Authentication is powered by
00:03:49.360 better out a fully free and open-source
00:03:52.720 out solution built for modern web apps.
00:03:56.480 It handles email login, social
00:03:58.879 providers, session management, and even
00:04:01.519 a seamless integration with Polar, our
00:04:04.400 payment
00:04:06.200 infrastructure. Our app is also fully
00:04:09.120 responsive. Every screen adapts cleanly
00:04:12.159 to mobile. Models and dropdowns turn
00:04:15.439 into mobile drawers for a smoother
00:04:17.839 experience on smaller
00:04:22.440 devices. In this course, we won't just
00:04:25.600 write the code. We'll also follow a
00:04:28.400 proper Git workflow throughout the
00:04:30.639 tutorial. Each chapter ends with a new
00:04:33.759 branch and a pull request reviewed
00:04:36.759 automatically using code rabbit AI.
00:04:40.400 Let's quickly go over the test stack.
00:04:42.560 We'll be using Nex.js 15 with React 19
00:04:46.479 together make our full stack framework
00:04:49.360 supporting server components and
00:04:51.440 serverside rendering. TRPC for full
00:04:54.800 stack type safety used together with
00:04:57.280 tanstack query. Drizzle OM with
00:05:00.479 Postgress provided by Neon for the
00:05:02.960 database. Tailwind version 4 for styling
00:05:06.240 combined with Chats UI for accessible
00:05:08.960 and reusable components. Better out for
00:05:11.880 authentication. Polar for payments.
00:05:14.720 Stream for video and chat SDK. Ingest
00:05:18.320 for background jobs. Code rabbit for AI
00:05:21.360 powered code reviews. And finally, Open
00:05:24.720 AI for real-time agents and AIdriven
00:05:28.440 features. And of course, we'll deploy
00:05:31.280 everything to production when it's
00:05:33.199 ready. And now, without further ado,
00:05:36.000 let's get started. In this chapter,
00:05:38.880 we're going to go ahead and set up our
00:05:40.880 project. This will include configuring
00:05:43.120 Nex.js, JS, confirming our environment,
00:05:46.240 installing Shhatzy UI, and finally
00:05:48.960 pushing our project to GitHub to
00:05:50.960 introduce some Git workflows. Let's
00:05:54.000 start with
00:05:55.400 Next.js. From their official
00:05:57.360 installation guide, we can find some
00:05:59.440 system
00:06:00.520 requirements. Let's go ahead and confirm
00:06:02.880 that we have the proper Noode.js
00:06:05.039 version. Purther instructions, it needs
00:06:07.440 to be at least
00:06:08.919 18.18 or higher than that. You can go
00:06:12.319 inside of your terminal and run
00:06:14.840 node-v. If you have a lower version or
00:06:17.759 you've gotten an error running this
00:06:19.600 command, you most likely have to
00:06:21.759 reinstall NodeJS. You can head to
00:06:25.240 nodejs.org and simply install the latest
00:06:27.919 long-term support version, which is in
00:06:30.479 my case
00:06:32.360 22.15.1, the exact same I'm using. After
00:06:36.000 that, you can restart your terminal and
00:06:37.919 run the command again to confirm. And
00:06:40.080 while you're there, it's a good idea to
00:06:42.319 also confirm these two commands, npm and
00:06:45.479 npx. These two commands come alongside
00:06:48.479 node. So you will automatically have
00:06:50.479 them installed, but it's always good to
00:06:52.720 double
00:06:53.880 check. Once you have confirmed those
00:06:56.880 three commands, you are ready to install
00:07:00.319 Next.js.
00:07:02.720 In their automatic installation chapter,
00:07:05.280 they instruct you to use the create next
00:07:07.800 app with the at latest
00:07:11.080 version. The latest version at the time
00:07:14.080 of me building this tutorial is
00:07:18.360 15.3.2. So instead of using at latest,
00:07:21.520 this is what I'm going to do. npx create
00:07:24.880 next app at 15.3.2.
00:07:29.120 The reason I'm doing this is so that you
00:07:31.759 the viewer is completely aware of the
00:07:34.479 version that I am using because I don't
00:07:37.680 know if you found this video 6 months
00:07:39.680 from now or a year from now. In that
00:07:42.400 case, the at latest will be
00:07:45.280 significantly different than the one I
00:07:47.440 am using. So my advice to you, if you
00:07:50.319 want to follow this tutorial exactly as
00:07:53.120 I am, use the exact same versions that
00:07:55.840 I'm using. So I'm going to be using
00:07:58.240 create next app at
00:08:01.400 15.3.2. Let's call our project meet AI.
00:08:05.039 And now we have to select some options.
00:08:07.280 You can use arrow keys to select between
00:08:09.360 yes or no. For TypeScript, select yes.
00:08:12.800 This is crucial. Slint is also yes.
00:08:16.479 Tailwind is also yes. Source directory
00:08:20.400 should also be yes. Make sure to change
00:08:22.560 it if no is default.
00:08:25.520 App router also yes. Turbo pack also
00:08:29.599 yes. And the only option I will leave at
00:08:32.399 no is to customize the import alias. I
00:08:35.519 don't want to customize it. I will leave
00:08:37.519 it the default. Let's wait for the
00:08:40.080 dependencies to
00:08:42.279 install. Once you get the success
00:08:44.800 message, you can go ahead and enter the
00:08:47.120 new directory. Change directory meet AI.
00:08:52.080 And inside you can enter ls command
00:08:55.120 which should list all the files and
00:08:57.120 folders
00:08:58.600 inside. Now that you've done
00:09:01.240 that before we run the project let's
00:09:04.160 quickly set up our IDE. In my case that
00:09:07.279 will be Visual Studio Code. So I'm going
00:09:10.160 to select open and I will select the
00:09:12.720 meet AAI repository. If you get a big
00:09:16.399 prompt asking if you want to trust the
00:09:18.320 authors you can select yes here.
00:09:21.360 Now let's quickly go inside of package
00:09:23.200 JSON and confirm the versions. React 19,
00:09:26.560 next
00:09:27.800 15.3.2, TypeScript 5, and Tailwind
00:09:31.920 version
00:09:32.839 4. Now let's quickly confirm our config
00:09:35.959 files. TS config, host CSS config, next
00:09:41.040 config, and slant config. There is no
00:09:44.399 Tailwind config because thanks to
00:09:46.720 Tailwind version 4, we have one less
00:09:50.240 config file which is absolutely
00:09:54.120 amazing. And also confirm that you have
00:09:56.640 the public folder. Confirm that you have
00:09:58.720 the source folder and inside the app
00:10:01.519 folder with favicon globals layout and
00:10:05.160 page. Once you have confirmed all of
00:10:07.600 that, you are ready to start the app
00:10:10.399 using npm rundev. And you can head to
00:10:13.680 localhost 3000 to see the
00:10:16.120 result. Depending on the light or dark
00:10:18.800 mode, you might see a white or black
00:10:21.880 background. Now, let's go ahead and
00:10:24.000 learn how to change something. Go inside
00:10:26.160 of the AMP folder,
00:10:28.120 page.tsx. And you can remove everything
00:10:30.320 from the return method. And you can
00:10:31.839 remove the image import. And instead,
00:10:34.640 just return a hello
00:10:37.240 world. And there we go. You should see
00:10:39.600 your change the moment you save your
00:10:41.600 file.
00:10:43.600 Now let's quickly try out Tailwind. So
00:10:46.800 I'm going to go ahead and write some
00:10:48.560 class names. Text for Excel font bold
00:10:52.720 and text green 500. And you have
00:10:55.839 probably immediately noticed that I have
00:10:58.320 some help writing this tailwind. I have
00:11:01.240 autocomplete. I have the color helper.
00:11:04.079 And when I hover over classes, I can see
00:11:06.800 the actual CSS. If you're interested in
00:11:10.079 having the same help, go ahead and
00:11:13.279 install the Tailwind CSS
00:11:17.000 IntelliSense, this package right here.
00:11:19.760 It is immensely helpful when writing
00:11:21.959 Tailwind. Go ahead and save this file
00:11:24.640 and immediately you should see your new
00:11:26.959 Tailwind changes.
00:11:29.399 Perfect. What we have to do next is we
00:11:32.240 have to install ChatsN UI. What is
00:11:35.680 Chatnen UI? So it is a set of
00:11:39.040 beautifully designed accessible
00:11:41.200 components and a code distribution
00:11:43.720 platform but it is not a component
00:11:46.480 library. Instead it is how you build
00:11:49.760 your component library. Let's go ahead
00:11:52.320 and add it to our project to understand
00:11:54.480 a bit better. I'm going to click
00:11:57.320 installation next.js and instead of
00:12:00.640 using at latest I'm first going to
00:12:02.720 confirm what is the actual latest
00:12:04.880 version. So you can use the same version
00:12:07.040 as I am. So I will just do d- version
00:12:11.240 here. And there we go.
00:12:14.680 2.5.0. So npx shaden at
00:12:18.839 2.5.0 in it. Make sure you're doing this
00:12:21.680 inside of your
00:12:23.639 project. Go ahead and select neutral for
00:12:26.720 the base color. and go ahead and select
00:12:30.360 d-leacy pure depths as the solution in
00:12:34.800 case some packages fail. Why would any
00:12:37.920 packages fail? Because we are using
00:12:40.240 React 19. React 19 is the latest React
00:12:43.600 version at the time of recording this
00:12:45.760 video, but not all packages have adapted
00:12:48.720 their peer dependencies to support React
00:12:51.600 19. And while they're still probably
00:12:54.720 working inside of React 19, installing
00:12:57.519 them throws warnings in some cases
00:13:00.399 errors which completely break the
00:13:02.160 installation cycle. So you have to
00:13:04.560 override them by using either d-force or
00:13:08.639 d- legacy peraps. In our case, we will
00:13:13.040 use d- legacy peer deps. So select the
00:13:16.639 arrow keys and choose d- legacy pure
00:13:20.720 deps and wait for the installation to
00:13:25.079 complete. Once the installation is
00:13:27.279 completed, you will be able to go back
00:13:29.120 to your project and you will notice some
00:13:31.519 new files here. If you're wondering
00:13:33.920 exactly which files are new, you can
00:13:36.000 click in on this little source control
00:13:38.639 icon and you will see everything that
00:13:41.360 has changed. So some of this was changed
00:13:44.320 by us. For example, this page which now
00:13:47.519 only displays hello world. So obviously
00:13:50.240 we are not interested in this. But we
00:13:52.639 are interested in the new utils file
00:13:55.440 which seems to have added a new function
00:13:58.240 called CN which is actually short for
00:14:00.880 class name or class names which we will
00:14:03.360 be using to safely merge, combine and
00:14:06.480 dynamically add tailor wind classes.
00:14:08.880 It's going to come in very very handy.
00:14:11.040 So that's one of the files that our chat
00:14:13.839 init command has added. Another thing it
00:14:16.880 has modified is our
00:14:19.959 globals.css. What it modified it with is
00:14:22.720 adding an actual theme for our project
00:14:25.920 and we will be able to modify this theme
00:14:28.720 and then our project will look unique
00:14:31.440 later on. And it also installed a couple
00:14:34.480 of packages like class variance
00:14:36.880 authority
00:14:38.279 clsx lucid react uh tailwind merge and I
00:14:43.839 believe one more tailwind animate css
00:14:46.959 everything else was already here but uh
00:14:49.760 it might have moved position like next
00:14:52.399 you can see the next version didn't
00:14:54.000 change it just moved the position so
00:14:56.480 don't worry the next version was not
00:14:58.399 modified and we also have the
00:15:00.240 components.json JSON which you can think
00:15:02.079 of as a config file for chat and UI and
00:15:05.600 I didn't mention but also or did I uh
00:15:08.240 lucid react these are our icons which we
00:15:11.120 will use for the project but we still
00:15:14.079 can't really see any components here and
00:15:16.480 they instruct us to add a button
00:15:18.480 component here. So while we can do that
00:15:21.920 two things that will annoy us throughout
00:15:24.000 this project is first of all remembering
00:15:26.639 what is our version and the second one
00:15:29.519 is remembering to choose d-leacy peer
00:15:33.279 depths every time. So instead how about
00:15:36.320 we add all components at once and then
00:15:39.440 later just get rid of those we don't
00:15:42.480 need. So we only have to remember the
00:15:44.959 chatsen version one more time and we
00:15:47.279 only have to select d- legacy peer deps
00:15:50.399 one more time as well. So I will select
00:15:54.600 this and I will select d- legacy peer
00:15:58.240 deps one last time and let's wait for
00:16:01.680 this to install all
00:16:04.440 dependencies. And there we go. All of
00:16:06.880 these components have now been added to
00:16:09.199 our project.
00:16:11.199 You can go inside of your source
00:16:12.639 components UI and you will see all of
00:16:14.800 them here. And that's the power of
00:16:17.120 shhatsen UI. They are not just added as
00:16:20.320 npm packages. Instead, they are actual
00:16:24.560 coded components inside of your project,
00:16:27.440 which gives you the power to customize
00:16:29.519 every single last bit of them. And
00:16:31.600 that's exactly what we will do in this
00:16:33.959 tutorial. So, let's go and try one
00:16:36.639 component out. Let's go inside of the
00:16:38.800 app folder page. Instead of returning a
00:16:41.600 div, let's return a button from
00:16:43.839 components UI
00:16:46.360 button. In case it's your first time
00:16:48.639 seeing the add sign, it's basically an
00:16:51.480 alias which makes it easier for us
00:16:54.079 instead of doing this all the time. So
00:16:57.759 basically the alias sign moves the
00:17:00.800 import to
00:17:02.360 source if that makes sense. you will see
00:17:05.359 uh it will make more sense later as we
00:17:07.359 work with the project. And now let's go
00:17:10.240 ahead and add click me
00:17:13.559 inside. Once you save this and go ahead
00:17:16.720 and mpm rundev your project
00:17:19.640 again, instead of the hello world, you
00:17:22.240 should now see a click me button. And if
00:17:25.599 you add a variant here like
00:17:27.960 destructive, it will change its color.
00:17:31.120 But the cool thing is if you click
00:17:33.039 command or control and click on the
00:17:35.600 button to enter it or of course manually
00:17:38.640 go inside of source components UI button
00:17:42.160 you will be able to add or change any
00:17:44.640 variant. For example, after link, make
00:17:47.600 sure you have a comma, and add custom
00:17:51.200 text white, background, purple 500,
00:17:55.799 border two, and let's do border red
00:18:00.679 500. Now, let's go back to the page. And
00:18:04.320 what you will notice now is that it has
00:18:06.559 automatically been added to the types
00:18:08.480 here. And there we go. We now have our
00:18:11.760 fun funky new variant. Of course, we
00:18:14.880 just used that for demonstration. You
00:18:16.880 can remove that now. And you can see how
00:18:18.559 you immediately get an error here.
00:18:21.280 Great. So, we now learned how to add
00:18:24.080 Chatsen components and how to use them.
00:18:26.640 And we've also learned the difference
00:18:28.480 between your usual component libraries
00:18:31.200 and Chatzen, which allows us to actually
00:18:33.919 see the code behind each component and
00:18:36.080 modify it to our liking.
00:18:38.799 One more thing we have to do is push
00:18:40.720 this project to
00:18:43.960 GitHub. So before we do that, we have to
00:18:46.880 commit all of our changes. And there's
00:18:49.600 quite a lot of them here. Since I'm
00:18:52.080 using Visual Studio Code, I will click
00:18:54.480 on the source graph here. And I will
00:18:57.200 simply use the plus icon to add or stage
00:19:00.880 all of these changes. This is equivalent
00:19:03.520 to get add dot command. Once all of
00:19:07.360 these have been changed have been staged
00:19:10.400 you will find them under the staged
00:19:13.120 changes
00:19:14.760 accordion and then you have to enter a
00:19:17.679 commit message. In my case I follow the
00:19:21.280 following convention. This is chapter01
00:19:24.840 setup. So I'm going to call this 01
00:19:28.320 setup as well. And I will simply click
00:19:31.039 commit. That's it. I'm not going to
00:19:33.120 touch anything else. We still haven't
00:19:36.240 pushed this to GitHub, but now we are
00:19:38.640 ready to do so. So go ahead and click
00:19:40.880 create new new repository and you will
00:19:43.039 see this screen. I'm to call this meet
00:19:46.240 AI and I will select it to private and I
00:19:49.840 will create a
00:19:52.440 repository. After that I'm going to go
00:19:54.799 ahead and select the second option which
00:19:57.440 is push an existing repository from the
00:20:00.240 command line. So just copy these three
00:20:02.880 lines here. go inside of your terminal.
00:20:05.200 You can shut down the app. You shouldn't
00:20:07.520 have any numbers here or anything
00:20:09.840 because uh nor should you have any
00:20:12.000 numbers here. Basically, it should all
00:20:14.160 be committed. And just paste those three
00:20:20.280 lines. And once you've done that,
00:20:23.360 refresh. And there we go. Your project
00:20:26.080 is now on GitHub. And you are ready to
00:20:28.400 follow the proper Git workflows. And you
00:20:31.039 can create pull requests, branches,
00:20:33.080 everything. Perfect. You can go ahead
00:20:35.520 and check inside of your source app
00:20:37.840 page. And inside of here, you should
00:20:39.840 have a button with click me. Perfect.
00:20:43.039 So, I think that wraps up our setup
00:20:45.120 chapter. We have set up Nex.js. We
00:20:47.600 confirmed our environment. We installed
00:20:50.080 Shatsen UI. And we pushed our project to
00:20:53.039 GitHub. Amazing job, and see you in the
00:20:55.520 next chapter.
00:20:58.559 In this chapter, we're going to go ahead
00:21:00.559 and set up a database and an OM for our
00:21:04.760 project. Let's get started and let's
00:21:07.200 obtain a Postgres database using Neon.
00:21:10.880 You can visit neon.te or you can use the
00:21:14.000 link in the description to let them know
00:21:16.080 you came from this video. Let's go ahead
00:21:19.280 to the Neon homepage and let's quickly
00:21:22.080 create or log in using
00:21:25.080 Google. After you are inside of your
00:21:27.600 dashboard, you will be able to create a
00:21:29.840 new project. I'm going to call this one
00:21:32.720 meet AI and I will set the database name
00:21:36.000 to meet AI as well. Once I create the
00:21:39.760 project, I can click on the connect
00:21:41.440 button and this will help me obtain my
00:21:44.640 database URL connection string.
00:21:48.720 Once you've obtained that, go inside of
00:21:50.799 your project and create a new
00:21:52.960 environment file in the root of your
00:21:55.480 application. Go ahead and create a
00:21:57.440 database URL. And inside of the quotes,
00:22:00.799 simply paste the copied snippet. It goes
00:22:04.000 without saying that you should never
00:22:05.440 share this with anyone. All environment
00:22:08.080 variables that I will be using are for
00:22:10.240 this tutorial and it will be removed
00:22:12.480 after this tutorial. You however should
00:22:15.200 not share this with anyone.
00:22:18.400 Make sure you didn't misspell database
00:22:20.559 URL here. And also do one more thing.
00:22:23.360 Confirm that your environment file is a
00:22:26.240 little grayed out. That means that it's
00:22:28.880 added to Git ignore and that you will
00:22:30.960 not be able to accidentally commit it.
00:22:34.280 Great. After you've added the database
00:22:36.880 URL, it is time for us to set up our
00:22:40.640 Drizzle OM. So, let's go to orm.driel.te
00:22:44.880 theme or use the link in the description
00:22:47.360 to let them know you came from this
00:22:49.960 video. So, let's go to Drizzle ORM here.
00:22:53.520 Let's click get started. New database
00:22:57.799 Neon. And now what we're going to do is
00:23:00.640 we're going to install some packages.
00:23:03.760 What I've prepared here is the versions,
00:23:06.880 right? So, what we're going to do is
00:23:08.720 we're going to prepare and without
00:23:10.320 pressing enter, we're just going to go
00:23:11.840 ahead and get the latest versions of
00:23:13.840 each one. Just in case you're watching
00:23:16.000 in the future, you will know what
00:23:18.799 versions I'm using.
00:23:21.600 So
00:23:23.159 drizzlem04 43.1 neon database serverless
00:23:27.120 is
00:23:32.919 1.1.1.1 and my environment is
00:23:43.240 16.5.0 and I will also add
00:23:48.679 d-leacy-per depths. So this is all in
00:23:51.600 one line and this will basically help me
00:23:54.159 avoid those errors which I was talking
00:23:56.880 about regarding peer dependencies.
00:23:59.760 Please use this line otherwise you will
00:24:02.559 get an error. If you get an error no
00:24:05.520 worries just try again and add- legacy
00:24:09.120 pure
00:24:11.320 depths. After you run this command you
00:24:13.760 should have three new packages. Let's go
00:24:16.400 inside of a package JSON. We can check
00:24:19.279 here as well. Neon database
00:24:22.440 serverless environment and drizzle ORM.
00:24:26.480 There we
00:24:27.960 go. So neon database serverless is
00:24:30.480 version
00:24:31.400 1.0 environment 16.5 and Drizzle OM
00:24:37.080 0.43.1.
00:24:39.080 Perfect. Now let's add Drizzle Kit and
00:24:43.000 TSX as our dev dependencies.
00:24:47.120 So the drizzle kit version I will be
00:24:49.200 using is
00:24:54.919 0.31.1 and the TSX version I will be
00:24:58.640 using is
00:25:02.520 4.19.4 and let's add legacy here deps
00:25:06.880 here as
00:25:08.440 well. This will add these two
00:25:11.720 packages right here in the dev
00:25:14.159 dependencies. We now have Drizzle Kit
00:25:16.880 and
00:25:18.600 TSX. Great. Now we can close all of
00:25:21.919 these. I mean, you didn't even have them
00:25:24.320 open, but I will close them. We've
00:25:27.120 already established step two, adding the
00:25:29.520 connection variable. So, we can go
00:25:31.120 immediately to step three. I'm going to
00:25:33.760 copy this snippet here, and I will go
00:25:35.600 inside of
00:25:36.679 source database folder and inside an
00:25:40.240 index DS. Let's paste this inside. And
00:25:44.080 I'm going to change this to double
00:25:45.679 quotes and I will add an exclamation
00:25:47.360 point here at the end. And I will do
00:25:49.919 export const
00:25:51.880 database. One thing I want you to double
00:25:54.320 check is go inside of your environment,
00:25:57.600 copy this key and paste it here because
00:26:01.440 you would be surprised how easy it is to
00:26:03.919 misspell this and no errors will be
00:26:06.640 thrown if you for example put an I here
00:26:09.120 instead of an L. It just won't work. So,
00:26:12.159 what I recommend is just copy it from
00:26:14.320 here and then paste it here. There we
00:26:16.840 go. And add an exclamation point to get
00:26:19.840 rid of the error. Great. Now, let's go
00:26:23.440 ahead uh and do the following thing. So,
00:26:26.559 in here, we we are okay with using neon
00:26:29.480 http. Uh if you need a synchronous
00:26:31.840 connection, you can use the neon
00:26:33.760 database serverless. We have it
00:26:35.520 installed. So, if you want to uh you can
00:26:38.000 do it like this as
00:26:39.559 well. Great. So now what I want to do is
00:26:43.440 I want to create a table and we can do
00:26:47.440 this exactly. So I'm just going to copy
00:26:49.919 whatever they did. Source databases
00:26:53.799 schema.ts. Let's go inside of
00:26:57.080 schema.ts. There we go. And this really
00:27:00.320 doesn't matter because we will remove it
00:27:02.440 later. But for now, yeah, let's use
00:27:04.880 integer pg table and vchart here.
00:27:08.799 uh and for the id it will be generated
00:27:11.440 always as identity here this will be
00:27:14.400 unique uh and these will be integers and
00:27:17.520 these will be vars with a fixed length
00:27:21.360 once you've done that we have to set up
00:27:23.279 a drizzle config file so we can copy
00:27:26.400 this as well and create drizzle
00:27:29.400 doconfigts in the root of our
00:27:36.679 application there we
00:27:39.200 I'm going to go ahead and just modify
00:27:40.880 these two double quotes. I love using
00:27:43.760 double quotes. There we go. And let's
00:27:46.480 just confirm that this is correct. So my
00:27:50.400 out will be uh slashdrizle. My schema is
00:27:56.000 at source database schemas. Let's double
00:27:59.039 check source database schemas. My
00:28:01.919 dialect is Postgress and my database
00:28:04.960 credentials are correct. And once again,
00:28:07.919 just double check database URL and just
00:28:10.720 add it here. Make sure you have the
00:28:13.360 Drizzle config outside of any folders
00:28:16.919 here. Great. And now what you have to do
00:28:19.520 is you have to apply the changes to the
00:28:21.880 database. The easiest way to do that is
00:28:24.720 by using npx drizzle kit push.
00:28:29.880 Alternatively, there are more advanced
00:28:32.320 methods such as generating the actual
00:28:34.960 migrations and then applying the
00:28:37.320 migrations. But since we are not working
00:28:40.080 in a team, we are working solo. This is
00:28:42.480 just a tutorial. We're going to keep it
00:28:44.640 simple and we will directly push our
00:28:46.720 changes to the database. So let's go
00:28:49.520 ahead and clear this and let's just do a
00:28:52.720 comparison. So if you go inside of your
00:28:54.240 neon now and go inside of your tables
00:28:56.720 here, you will see that for the meet AI,
00:28:59.760 there are zero tables in the public
00:29:01.600 schema. But if I do npx drizzle kit push
00:29:05.520 right here, you can see that it pulled
00:29:08.640 the schema from the database and it
00:29:10.880 applied the changes. So if I try
00:29:13.120 refreshing now, I have the users. The
00:29:16.799 user has an ID, name, age, and email.
00:29:21.360 There we go. Perfect. So, we've added
00:29:25.279 Drizzle OM, we've added the schema, we
00:29:28.559 pushed the schema, and we verified the
00:29:30.480 changes in Neon. But one thing that we
00:29:32.640 didn't do is verify changes in Drizzle
00:29:35.039 Studio. So, let's go ahead and do that.
00:29:39.559 Now, using a similar
00:29:42.600 command, npx
00:29:44.919 drizzle-kit, instead of push, you can
00:29:47.200 type
00:29:48.440 studio. And in here you can click on
00:29:52.440 local.drizle.studio. So you have two
00:29:54.000 options. You can either locally use the
00:29:56.080 drizzle studio like this or you can use
00:29:58.880 them in the neon
00:30:00.919 console. There we go. So these are in
00:30:04.000 sync. They are the same uh studio.
00:30:07.760 Amazing. Right. And now what I want to
00:30:10.880 do is create some scripts just to help
00:30:14.720 us in the future. So let's go inside of
00:30:16.399 package.json JSON here and let's go
00:30:19.360 ahead and add database push and let's
00:30:22.960 map that to
00:30:24.840 drizzle-kit push and database
00:30:30.039 studio will be
00:30:34.760 drizzle-kit studio. So
00:30:37.880 now instead of doing npx I don't have to
00:30:41.679 do that anymore because drizzle kit is a
00:30:44.320 part of our dev dependencies here. So
00:30:47.679 instead I can do npm run database studio
00:30:51.200 like this. It's going to be more
00:30:53.520 generic. So later on if for any reason
00:30:56.399 you replace your database you can keep
00:30:58.720 the uh command that you can keep the
00:31:02.080 familiarity with your command. Right?
00:31:04.320 And we are also not going to have to
00:31:06.799 remember this command anymore. npx drik
00:31:10.000 studio. We can just use our database
00:31:12.480 push then database studio like that.
00:31:16.720 Excellent. So I believe that is it. We
00:31:19.120 have verified the changes in the studio.
00:31:21.120 Now what we have to do is create, review
00:31:23.279 and merge this pull request.
00:31:26.720 Let's go inside of our source control
00:31:28.799 here and under the changes, let's click
00:31:31.919 the big plus button and this will mark
00:31:36.240 them as staged changes and this is zero
00:31:40.240 to database. I believe it is. So I will
00:31:44.080 press commit and since we have already
00:31:46.480 connected with GitHub this time uh what
00:31:49.440 we can do is we can check out to a new
00:31:52.480 branch and I'm going to call this 02
00:31:56.279 database. There we go. So I have
00:31:59.120 committed but I'm in a new database
00:32:01.360 because I didn't push yet. In case you
00:32:03.360 already pushed, no worries, okay? We are
00:32:05.440 just learning the git workflow here. You
00:32:07.519 can do the branch process in another
00:32:09.200 chapter. It's completely fine. No
00:32:10.960 worries. But uh if you didn't push, you
00:32:14.080 can create the new branch using the IDE
00:32:16.799 just like I did. And I will just click
00:32:18.880 publish branch. That's it. And now my
00:32:23.120 branch will be published. So I'm going
00:32:25.360 to go inside of GitHub repository and
00:32:27.519 see what
00:32:29.559 happens. Inside of my GitHub repository,
00:32:32.640 you can see that I have a new branch
00:32:34.320 with recent uh pushes here. So I will
00:32:36.880 click compare and pull request. But just
00:32:39.840 in case you don't have this, you can go
00:32:42.000 inside of pull requests manually, click
00:32:44.240 on new pull request, keep the main as
00:32:47.440 base, and select your new branch here
00:32:50.720 just in case you want to do it manually.
00:32:52.559 And then click create pull request. And
00:32:55.120 I'm going to now click create pull
00:32:59.480 request. Now in here, uh yours will
00:33:03.760 probably look like mine was a second
00:33:06.399 ago. you probably don't have Code
00:33:09.519 Rabbit. So, what is Code Rabbit? Code
00:33:12.320 Rabbit is an AI tool which will uh
00:33:15.440 almost act like a teammate for me and
00:33:18.240 it's going to review all of the changes
00:33:21.039 that I just added here and it's going to
00:33:24.240 give me a summary of what I just did and
00:33:27.919 also some comments, even some
00:33:31.000 potentially breaking issues. So, it's a
00:33:34.080 very useful teammate for us. And we're
00:33:36.880 going to see our code being reviewed by
00:33:39.120 AI for each chapter. So, we know we
00:33:42.640 didn't commit any bugs. And you'd be
00:33:45.640 surprised. In my last tutorial, Code
00:33:48.720 Rabbit caught so many bugs. I was
00:33:52.399 shocked. So, I'm excited to see what it
00:33:55.039 will catch. Now, I'm going to pause the
00:33:57.840 video and play it when it's
00:34:01.880 finished. And here we go, a summary by
00:34:05.200 code rabbit. We introduced some new
00:34:07.279 features. Integrated Drizzle OM and the
00:34:09.839 Neon database support. We added a what
00:34:12.879 is a temporary database schema for users
00:34:15.679 including fields for ID, name, age, and
00:34:18.960 unique email. We've also added some
00:34:21.359 environment variable management for
00:34:23.199 secure database connections. So, no
00:34:25.440 worries. It did not detect a new
00:34:27.520 environment variable. It detected that
00:34:30.480 we're using it for database connections.
00:34:32.639 So no, we did not commit any environment
00:34:36.000 variables here. And we also detected
00:34:38.560 some chores such as new scripts for
00:34:41.359 database migrations and studio access.
00:34:44.879 And we in here we have a more in-depth
00:34:47.280 walk through. Uh specifically we have
00:34:50.280 changes file by file exactly what we
00:34:54.320 modified and how. And we even have a
00:34:57.040 sequence diagram which will in become
00:35:00.079 increasingly useful as we add some
00:35:02.560 complex things. Right now the only
00:35:04.800 sequence it can create is our app
00:35:07.359 connection with the neon database
00:35:09.440 through Drizzle OM. But later on when we
00:35:12.400 add some hooks and components, it will
00:35:15.040 create equally if not even more useful
00:35:17.760 diagrams to help us understand that. And
00:35:21.520 in here we have some actionable
00:35:23.760 comments. As you can see here, it
00:35:26.160 recommends adding an environment
00:35:28.320 variable validation for database
00:35:30.920 URL. Basically, inside of our let me see
00:35:35.520 index here, we put an exclamation point
00:35:38.960 here because we just know that the
00:35:41.599 database URL will exist. But Code Rabbit
00:35:46.000 recommends doing an if clause and
00:35:48.240 throwing an error if it's not set. And
00:35:50.480 then we can use it without uh the
00:35:52.640 exclamation point. It also recommends
00:35:54.800 using the Neon database serverless
00:35:56.680 driver. So in our case, I'm fine the way
00:35:59.760 it is. Uh I'm always open to suggestions
00:36:02.960 like this one. But uh this is how I
00:36:05.680 initially built the project and I didn't
00:36:07.440 have any problems whatsoever. And I
00:36:09.920 think it's okay because with if we are
00:36:12.320 missing the database URL, nothing is
00:36:14.480 going to work either way. So we don't
00:36:16.000 have to put an explicit if clause for
00:36:18.160 that. And as per database uh neon
00:36:20.960 database serverless well using the
00:36:23.760 drizzle you know configuration here we
00:36:26.000 can see it's fine to use neon http
00:36:28.720 serverless is if we want a synchronous
00:36:30.880 connection more specifically if we want
00:36:32.640 to use websockets. Uh but it's
00:36:35.119 completely fine to use neon http for
00:36:37.760 this tutorial. Let's see what else it
00:36:39.920 gave advice for. So in here I think it's
00:36:43.119 the same thing. It's recommending an if
00:36:45.440 check for the database URL. Of course, a
00:36:48.160 good suggestion, but as I said, if this
00:36:50.640 is missing, everything will break
00:36:53.240 anyway. And here's an interesting thing.
00:36:55.680 So, it actually detected that some
00:36:57.920 issues were opened in Drizzle or Drizzle
00:37:00.640 Kit where they had a mismatch between
00:37:03.200 Drizzle Kit and Drizzle OM. So, our
00:37:06.079 Drizzle Kit version is 0.31
00:37:09.440 uh and our Drizzle RM is 0.43. So, it's
00:37:13.280 telling us to be careful here, but it's
00:37:16.000 completely fine. Uh, they don't have to
00:37:18.720 match exactly. Perhaps that was an issue
00:37:21.760 previously in some previous versions,
00:37:23.599 but it's completely fine. You can see
00:37:25.520 it's working with no problems
00:37:27.720 whatsoever. Great. So, I'm ready to
00:37:30.480 merge my pull request. We got a very
00:37:32.720 good review. Uh, and this is how we are
00:37:36.720 going to review our code every time.
00:37:39.920 Great. So once you have merged this, you
00:37:42.720 will see this says merged. And you can
00:37:44.960 now go back to your code and you can
00:37:47.440 change your branch uh back to
00:37:51.960 main like this. And you can press
00:37:56.599 this and click okay. And it should
00:37:59.960 synchronize your branch with main. And
00:38:03.520 when you look at your graph here, you
00:38:05.920 will see that we had our 01 setup commit
00:38:10.480 and then we branched out into a new
00:38:13.359 version uh I mean into a new branch and
00:38:17.119 then we merged that pull request back
00:38:20.320 here. So it's important that next to
00:38:23.440 your main branch here you don't see any
00:38:26.400 numbers. You can click this button as
00:38:27.920 much as you want. It will simply
00:38:29.880 recsynchronize. So, make sure you don't
00:38:32.160 have any weird numbers here or any
00:38:34.400 numbers here. Make sure your graph looks
00:38:36.880 like this. And that means that you are
00:38:39.440 ready to go onto the next chapter.
00:38:42.640 Amazing. So, if you want to have code
00:38:45.680 reviews like this, you can visit coder
00:38:48.359 rabbit.ai or use the link in the
00:38:50.720 description if you want to let them know
00:38:52.400 you came from this video. I highly,
00:38:55.040 highly recommend this, especially if
00:38:56.880 you're working solo and have no one to
00:38:58.880 review your code.
00:39:00.960 There we go. So, let's go ahead and wrap
00:39:03.119 this up and see you in the next
00:39:07.560 chapter. In this chapter, we're going to
00:39:10.079 go ahead and create our authentication
00:39:13.320 setup. We're going to be doing that
00:39:15.440 using better AL. We're going to
00:39:18.240 configure the new ALF schema. We're
00:39:21.040 going to push those changes to Neon
00:39:22.960 database. And we will create a very
00:39:25.520 basic temporary UI which will allow us
00:39:28.400 to create a new user. And we will
00:39:31.040 finally create review and merge the pull
00:39:34.079 request for this chapter. Let's start by
00:39:37.119 adding better out. So you can head to
00:39:40.920 better-al.com or use the link in the
00:39:43.280 description to let them know you came
00:39:45.200 from this
00:39:46.280 video. So we're going to go ahead and
00:39:48.720 click get started right here. And if you
00:39:51.760 want to read more about Better Out, you
00:39:54.160 can read it here. It's an absolutely
00:39:57.200 amazing library. I I have not seen a
00:40:00.640 library as good as this in a while. So,
00:40:03.920 I'm going to go inside of the
00:40:05.200 installation tab here, and we're going
00:40:07.280 to do mpm install better out. And just
00:40:10.560 for this project's longevity sake, I
00:40:13.280 will use an exact version uh
00:40:18.599 1.2.8 like this. And let's see. Uh, I
00:40:22.000 forgot to add d-leacy peer depths. So,
00:40:25.119 of course, we get an error. So, let's
00:40:27.359 repeat this. But let's add d-leacy peer
00:40:31.680 depths. And let me confirm that this was
00:40:33.520 the correct version
00:40:35.400 1.2.8. It is. There we go. So, when I
00:40:37.839 add d- legacy per depths, we have no
00:40:40.960 error
00:40:42.280 whatsoever. Great. Now, let's go ahead
00:40:45.200 and let's add the better secret
00:40:47.760 environment variable here.
00:40:50.400 So I'm going to add this and you can add
00:40:53.520 whatever you want inside or you can use
00:40:55.599 the button generate secret here and just
00:40:58.319 copy whatever is here. It really doesn't
00:41:01.440 matter but it must not be empty. You
00:41:03.760 need to write something inside. For
00:41:05.680 production obviously it would be a good
00:41:08.000 idea that it's something the length of
00:41:10.319 this rather than just you know secret.
00:41:13.440 Uh but for development it doesn't
00:41:15.440 matter. Just make sure it's not empty.
00:41:19.359 Let's also set the better out URL
00:41:23.480 here and we can set it to be localhost
00:41:27.359 3000 under the HTTP
00:41:30.280 protocol. So it's important that you
00:41:32.480 know the protocol of your app and you
00:41:34.480 can find it every time you do npm
00:41:37.640 rundev. In here you can see my protocol
00:41:40.400 is http localhost 3000. So you can copy
00:41:43.680 this and add it here. It needs to
00:41:47.240 match. Great. And now let's go ahead and
00:41:50.240 let's create a better ALF instance. So
00:41:53.440 the place I'm going to do this is inside
00:41:56.800 of source and inside of lib I will
00:42:00.160 create ALF.
00:42:03.160 DS and I will simply import better from
00:42:07.040 better out. And I will export const
00:42:11.000 here. And let's quickly just visit my
00:42:13.920 package JSON just so you can doublech
00:42:16.800 check my versions
00:42:19.240 1.2.8. There we
00:42:21.640 go. Now let's go ahead and configure a
00:42:24.240 database. As you can see, it immediately
00:42:26.319 offers Postgress here, but we will
00:42:28.560 actually be using Drizzle. So it has an
00:42:31.839 option for that as well. Of course, it
00:42:34.319 does. So I'm going to add the Drizzle
00:42:37.280 adapter here from better al adapters.
00:42:41.480 Drizzle and I will import
00:42:44.760 database from at / database which is our
00:42:49.040 Drizzle instance. So this is the exact
00:42:51.359 location that my database is in database
00:42:56.040 index. Now that we have both of them we
00:42:58.880 can add the database option
00:43:01.960 here and we can select the provider to
00:43:04.880 be PG which stands for posgress. Of
00:43:07.599 course, since we are using Posgress,
00:43:09.599 this is the correct
00:43:11.480 option. Let's see what else we have to
00:43:13.839 do. Now, we have to create the database
00:43:17.079 tables. So, better out includes a CLI
00:43:20.000 tool to help manage schema required by
00:43:22.640 the library. So, you have two options to
00:43:25.520 create the actual schema for your
00:43:28.000 authentication.
00:43:29.599 If you want to, you can use npx better
00:43:31.839 al cli generate or you can manually
00:43:35.520 create it by going inside of the
00:43:37.599 database section here and you will see
00:43:40.720 every single database item that we have.
00:43:45.520 What we are going to do is we are going
00:43:47.520 to use the CLI
00:43:50.520 here. So we are just going to use the
00:43:53.119 generate one. We are not going to use
00:43:54.800 the migrate one because we will be
00:43:56.640 pushing directly to the database.
00:44:00.319 Now, for longevity sake, I'm also going
00:44:02.720 to show you the version at the time. It
00:44:05.280 looks like the version uh of better out
00:44:07.839 CLI needs to match the better out. I'm
00:44:11.200 not sure if this is a coincidence, but
00:44:13.280 it makes sense that these two match. So,
00:44:16.640 yes, the version I'm using is 1.2.8. And
00:44:19.680 we don't need d- legacy pure deps here
00:44:22.079 because we're not installing anything.
00:44:23.680 We're just generating. Uh so, let's
00:44:26.560 click generate and let's see what
00:44:27.839 happens. I have to install this package
00:44:29.880 first
00:44:31.960 1.2.8 and let's see what will happen
00:44:34.319 once this
00:44:37.160 completes. So it's asking me do you want
00:44:39.760 to generate the schema to do /all schema
00:44:42.960 ts. I'm going to select yes. I want it
00:44:45.760 to be in a separate file so it doesn't
00:44:47.599 accidentally overwrite whatever I have
00:44:49.839 in my schema. So I will press yes. And
00:44:52.640 there we go. Schema was generated
00:44:55.119 successfully.
00:44:57.040 So now what we're going to do is we're
00:44:59.520 going to go inside of the out schema
00:45:01.040 here. We can remove integer. We don't
00:45:02.960 need
00:45:04.119 it. And now uh what I want to do is I
00:45:07.680 want to copy things just one by one from
00:45:10.079 out schema to my source database schema.
00:45:14.480 So instead of this users, you know, we
00:45:17.359 will have an actual user here. So we can
00:45:19.359 remove this actually. Uh, and we can
00:45:24.359 also add this
00:45:26.920 here. There we go. Uh, and what I would
00:45:30.000 like to do is just fix the indentation
00:45:32.960 of these so it looks a little bit
00:45:36.920 better. There we
00:45:39.960 go. Like
00:45:41.960 that. After we defined our user, let's
00:45:45.839 add our session. So the reason I'm doing
00:45:47.760 it one by one is just so we are a little
00:45:50.079 bit more aware of what we are adding to
00:45:52.319 our
00:45:54.599 schema and I'm just formatting it a
00:45:57.520 little bit. So what do we have so far?
00:45:59.119 We have the user here and we have a
00:46:01.920 session and you can see that session has
00:46:03.680 a relation to the user and once the user
00:46:07.760 it's deleted the session will be deleted
00:46:10.400 as well thanks to the cascade method
00:46:12.480 here. We also know that uh the email has
00:46:15.680 to be unique for example. So that's why
00:46:17.599 we are going one by one just so we're a
00:46:20.000 tiny bit more aware of what's going on
00:46:22.680 here. Now let's copy the account one. So
00:46:25.359 the accounts will be used for social
00:46:27.359 login here. Uh let me go ahead and fix
00:46:30.960 the indentation on this one here. And
00:46:33.920 this one is pretty simple. So it has a
00:46:36.160 relation to user as well.
00:46:40.160 And let's add the verification which
00:46:43.119 looks like to be the last one here. And
00:46:46.720 verification is self-explanatory. If we
00:46:49.440 want to add verification, we have the
00:46:51.359 table for that as well. Uh there we go.
00:46:55.280 So one, two, three, four tables. It
00:47:00.400 looks like we've added here. So let me
00:47:03.359 just confirm here. One, two, three,
00:47:07.040 four. We did not miss any. So we can now
00:47:10.240 go ahead and remove the out- schema. We
00:47:13.119 no longer need that here because we have
00:47:15.680 added it to our schema right here. Uh
00:47:18.800 and it looks just fine. Let's see what
00:47:21.920 else do we have to do now. So the next
00:47:24.880 step here is to migrate. But we are not
00:47:27.599 doing migration. We don't have to do
00:47:29.839 that. We have our script for
00:47:31.839 synchronizing with the database. And
00:47:34.079 that's going to be database push. It's
00:47:36.400 much simpler uh this way. So it looks
00:47:40.240 like uh we can do that already. So let's
00:47:44.560 do it. Let's see if we will encounter
00:47:46.720 any errors or will this work uh by
00:47:50.560 itself. So I'm going to try and do npm
00:47:54.400 run database push. I think we might
00:47:57.200 actually encounter some uh errors here.
00:48:01.599 So actually no errors but we do have a
00:48:03.680 question. Is account table created or
00:48:06.359 renamed? So uh this is asking us a
00:48:10.240 question because we previously had uh
00:48:13.599 the users table which we deleted right.
00:48:17.440 So we have two options here. If you want
00:48:20.319 to you can just nuke the database from
00:48:23.359 neon and just create a new project with
00:48:25.520 the new database and have a clean slate.
00:48:28.440 Right? But what you can also do is just
00:48:31.200 answer to these questions. So I'm going
00:48:33.040 to try answering the questions. If it
00:48:34.800 seems to be okay, no problem. But if you
00:48:38.800 for whatever reason think you've messed
00:48:40.720 this up, you can always just create a
00:48:42.480 new database and just obtain uh a new
00:48:45.839 database URL. Paste the new database
00:48:48.640 URL, run the command again and you won't
00:48:51.200 have these questions. So the account
00:48:53.359 table is a new table. So using the arrow
00:48:55.920 keys, I will select the plus option and
00:48:57.920 press enter. Same for the session. The
00:49:00.400 only thing I will uh say is the users.
00:49:02.880 So the users have actually been renamed
00:49:05.040 here and the verification has been uh
00:49:08.760 added. Now in here uh is email verified
00:49:12.800 column created or renamed. Uh so this is
00:49:17.280 a create created column. Image is the
00:49:20.400 created column. Created at is created
00:49:23.119 updated at is created. Uh and looks like
00:49:26.000 at the end of all of that uh I got some
00:49:29.680 errors. So, I'm not exactly sure if this
00:49:32.079 worked correctly. So, that's why I
00:49:34.559 wanted to tell you you don't have to
00:49:36.160 worry even if you mess this up like I
00:49:38.160 did. What you can do very simply is go
00:49:40.800 inside of your settings here, just
00:49:43.200 delete the
00:49:44.760 project, right? So, you have to learn
00:49:46.960 how to work with your database here. Of
00:49:48.880 course, obviously, this is just for
00:49:50.480 early development phases. You would not
00:49:52.640 consider actually doing this in
00:49:54.640 production. You would have proper
00:49:55.920 migration status, right? But let's just
00:49:58.240 try again. Meet AI 2 for example and
00:50:01.520 let's click create and again let's click
00:50:04.319 connect and copy the snippet and in here
00:50:07.680 let's just paste this
00:50:09.559 here. So just make sure you have the new
00:50:11.920 database URL and you don't have to
00:50:13.440 change anything else. Let's do npm run
00:50:18.319 push now and let's see if we will have
00:50:20.880 any errors. No errors at all because
00:50:23.760 this is a completely clean database. And
00:50:25.920 if you go inside of your tables here now
00:50:27.920 in Meet AI 2, you have account, session,
00:50:31.119 user, and verification. Those four
00:50:33.200 tables which we just added. So even
00:50:35.839 though we could probably work our way
00:50:38.640 around this issue and resolve it, I just
00:50:41.680 want you to see how I actually do these
00:50:44.160 kinds of things. When I develop things,
00:50:45.680 I often get into these kinds of
00:50:47.119 conflicts. Since I'm in early
00:50:48.640 development phases, I can just nuke my
00:50:50.559 database and speed up the process.
00:50:52.319 Again, please only do this in early
00:50:54.480 development phases like this one where
00:50:56.960 we are just learning how all of this
00:50:59.000 works. Excellent. So, we have done the
00:51:03.040 following. We have configured the out
00:51:04.880 schema and we have pushed the changes.
00:51:07.359 Uh I'm not sure if we can mark this as
00:51:10.720 completely integrated. I'm going to
00:51:12.240 check this one last. Let's see what else
00:51:14.079 we have to do. So, we now have to add
00:51:16.720 some authentication methods. We are
00:51:18.800 going to add social providers later. The
00:51:21.119 first one we're going to do is the
00:51:22.480 normal email and password. So let's go
00:51:24.960 inside of the out here and let's add
00:51:28.160 email and password
00:51:30.680 enabled. True. And just like that we
00:51:33.520 have enabled normal email and password.
00:51:36.480 But besides that you have pass key,
00:51:38.559 username, magic link. You have so many
00:51:42.079 different ways of authenticating here.
00:51:45.359 And that's only uh what they provide you
00:51:48.000 with. There's also the community
00:51:49.440 plugins. So it's it's absolutely insane.
00:51:52.319 Now what we have to do is we have to go
00:51:54.079 inside of app folder API out. So let's
00:51:58.480 quickly go ahead and do that. Source app
00:52:01.520 folder let's create a new one called API
00:52:04.319 and inside inside of square brackets
00:52:07.440 out. So we are following instructions
00:52:09.680 exactly as they say which I've messed up
00:52:12.640 my apologies. out without square
00:52:14.880 brackets and then inside of square
00:52:18.680 brackets three dots all. So this is kind
00:52:22.079 of a catch all route and then finally
00:52:24.640 inside of that a reserved file name in
00:52:27.280 nex.js route.ts which represents an API.
00:52:31.599 So we can then copy this and paste it
00:52:33.520 inside. So we are registering our AL
00:52:37.359 client here to post and get route for
00:52:41.280 our localhost 3000/ API/ and then
00:52:45.280 whatever comes after it. This is like a
00:52:48.000 catch all universal
00:52:49.880 route. Excellent. So now that we have
00:52:52.720 that, we also have to create the client
00:52:55.960 instance. Uh so let's go inside of our
00:52:59.359 lib here.
00:53:02.000 The same way we created ALF, we will now
00:53:04.319 do
00:53:06.680 ALF-client.ts like this. And we can just
00:53:09.839 copy this entire thing here and paste
00:53:12.760 it. So the base URL of the server, you
00:53:16.000 can see it says optional if you're using
00:53:18.000 the same domain. So you actually don't
00:53:20.240 need this at
00:53:21.960 all because we are on the same domain.
00:53:26.640 And finally, you now have uh uh you can
00:53:30.960 now Yeah, my apologies. No, I thought
00:53:32.880 that this was an example, but um they
00:53:35.440 are showing you that you can also export
00:53:37.599 individual methods and hooks from create
00:53:40.640 out client instead of exporting the
00:53:43.599 entire AL client, but I'm fine with this
00:53:46.559 way. And there we go. So that's it. You
00:53:49.280 are now ready to use better AL in your
00:53:51.680 application. continue to basic usage to
00:53:54.400 learn how to use the ALF instance uh to
00:53:58.000 sign in users. So let's go inside of the
00:54:00.960 basic usage here. And what we're going
00:54:04.000 to do is inside of
00:54:06.760 page.tsx
00:54:08.760 here, we will just create a very simple
00:54:12.319 uh form here. So I'm going to mark this
00:54:16.880 as use client so I can make it reactive
00:54:19.760 and add some hooks here. And I'm going
00:54:22.960 to add email set email use
00:54:27.640 date. And then I will do the same thing
00:54:30.079 for name. Set name and
00:54:33.640 password. Set password. Obviously uh
00:54:37.280 this is not how we will build forms. But
00:54:39.440 what we we are doing now is just a very
00:54:41.599 very basic confirmation that our uh
00:54:44.800 better out has been integrated properly.
00:54:47.440 So what I'm going to do here is just a
00:54:50.880 div and then I'm going to add an input
00:54:53.920 from components UI input which we have
00:54:56.160 because we added all components from
00:54:57.920 chats UI. I'm going to give this a
00:55:00.920 placeholder of name. This one will be
00:55:04.559 email. This one will be password with a
00:55:07.119 type of
00:55:08.200 password. And I will just go ahead and
00:55:11.040 give this one a value of name. and on
00:55:14.920 change
00:55:16.839 event target
00:55:19.440 uh
00:55:20.359 value. And I will just copy these and
00:55:23.520 add them down here. There we go. Uh
00:55:29.040 oops, I completely forgot to actually
00:55:30.960 wrap this. Uh so this will be set name.
00:55:36.800 This will
00:55:38.119 be set
00:55:42.520 email. This will be set
00:55:48.520 password. The value
00:55:50.839 here will be email and the value here
00:55:54.640 will be
00:55:56.440 password. I will just collapse this so
00:55:59.599 you can see better.
00:56:02.640 Okay, I just collapsed these elements so
00:56:05.680 you can see them
00:56:06.920 better. And let's go ahead and try it
00:56:10.079 out. All we need is a button here which
00:56:12.640 will say create
00:56:20.359 user. So I'm going to do npm rundev and
00:56:24.160 I will visit my localhost 3000 which
00:56:27.119 should now show my very simple form.
00:56:29.760 Here we can give this a class name
00:56:32.640 padding four flex flex column and gap y
00:56:35.760 of four just so they have a little bit
00:56:38.480 more space here. And what I will focus
00:56:41.440 on here is my network tab. I want to see
00:56:44.799 what's going on here as well. So what we
00:56:48.640 want to do now is we want to learn how
00:56:51.119 to use better out here. So let's import
00:56:54.799 out client in here.
00:57:01.760 And let's use the out client in our
00:57:05.680 onsubmit method
00:57:07.720 here. So what I'm going to do is call
00:57:10.799 out
00:57:11.640 client dot sign in and let's see if is
00:57:15.839 that the correct one? My apologies. It
00:57:17.680 is sign
00:57:19.559 up
00:57:21.079 email. And inside of here I have to pass
00:57:24.240 in the email. I have to pass in the
00:57:26.559 name. and I have to pass in the
00:57:28.640 password. So these are the three
00:57:30.319 required ones. You can also pass the
00:57:32.240 image if you want to and the callback
00:57:34.280 URL. And let's also add these right
00:57:40.119 here. So on
00:57:43.319 error, let's do window
00:57:46.040 alert. Something went
00:57:49.240 wrong on success.
00:57:54.079 window
00:57:55.000 alert success just so we are aware of
00:57:58.880 what's going
00:58:00.520 on. Great. So now that we have this
00:58:04.960 um let's go ahead and try submitting. So
00:58:09.720 const on click on
00:58:14.599 submit. So I think by default we should
00:58:17.359 get an error here just by clicking this.
00:58:19.760 Let me try. There we go. something went
00:58:22.799 wrong. Obviously, we get an error
00:58:24.960 because we have an invalid email because
00:58:26.799 the email was not passed at all. So, I'm
00:58:29.599 going to set my name to be Antonio, my
00:58:31.920 email to be Antonio at uh
00:58:35.079 demo.com. And let's use the password to
00:58:37.920 be
00:58:39.000 password. One hint, your password needs
00:58:41.839 to be I think at least eight characters,
00:58:45.040 otherwise it will throw an error. So, if
00:58:46.720 I just do one to three and click create
00:58:48.480 user again, we have an error here.
00:58:51.040 password is too short. So try 1 2 3 4 5
00:58:54.640 6 7 8 and let's see again something went
00:58:58.799 wrong. Let's see what exactly it
00:59:02.119 is. There we go. So uh this one wasn't
00:59:06.000 exactly clear from the return here from
00:59:08.960 the network tab. But if you go inside of
00:59:11.359 your terminal, you will see some errors.
00:59:14.000 Server error, weather out error, drizzle
00:59:16.559 adapter, the model user was not found in
00:59:19.599 the schema object. Please pass the
00:59:21.839 schema directly to the adapter options.
00:59:25.280 So this is what I was waiting for
00:59:27.280 because I knew that my AL configuration
00:59:31.119 looked a little bit different. So I was
00:59:32.880 waiting for the reason why. And it looks
00:59:35.599 like because we need to add our entire
00:59:38.240 schema. So let's import asterisk as
00:59:41.040 schema here from at database schema and
00:59:46.559 let's go ahead and pass the schema here
00:59:51.040 and simply spread the
00:59:53.880 schema like that. So we have now
00:59:56.880 connected our schema user session all of
01:00:01.200 these things with the schema here. And I
01:00:03.680 think that if you kind of like try and
01:00:06.000 rename something here, you might
01:00:08.799 actually get an error here or not. Maybe
01:00:11.680 not. But let's try again now. So I'm
01:00:15.119 going to try Antonio. Antonio demo.com.
01:00:18.319 And 1 2 3 4 5 6 7 8. Create
01:00:23.000 user. Looking promising. And there we
01:00:25.920 go.
01:00:27.559 Success. 200. And we can now go inside
01:00:32.400 of our neon console here. Refresh this
01:00:35.920 and go inside of user. And there we go.
01:00:38.240 You can see the actual user. So Antonio
01:00:41.559 demo.com. You can see when we are
01:00:43.839 created. You can see the matching
01:00:45.440 account with the credential provider ID
01:00:48.000 because we didn't use the social login.
01:00:49.839 We used credentials. And you can also
01:00:51.839 see the active session because we are
01:00:54.200 automatically logged in actually. And
01:00:57.040 the verification doesn't exist because
01:00:58.720 we didn't add anything regarding
01:01:01.640 verification. But yes, this is the part
01:01:04.240 that was missing adding our schema here.
01:01:07.680 Uh and one more thing I want to check
01:01:09.599 here is is there a nice way to maybe
01:01:12.240 display that we are logged in. Uh let's
01:01:14.559 say uh can I
01:01:18.280 check let's actually try and follow the
01:01:22.000 documentation here. So this is sign in.
01:01:24.079 Okay, that works just fine. social sign
01:01:27.200 on. How do I actually see the session?
01:01:31.040 That's what I'm using. There we go. The
01:01:34.680 session. So, I'm just going to go ahead
01:01:37.920 and add this here from
01:01:40.119 outclient use
01:01:42.280 session. All that I care about is the
01:01:45.040 data which remaps to session here.
01:01:50.799 So what I'm going to do is I'm going to
01:01:52.880 check if I have a session. We are going
01:01:56.559 to return a div here with a class name
01:02:00.240 flex flex column padding four and gap
01:02:04.760 y of four and I will add a paragraph
01:02:08.559 logged in
01:02:10.680 as session do user
01:02:14.280 name like this and let's add a button
01:02:18.000 here sign out on click and I think we
01:02:22.319 can just do
01:02:23.480 outclient sign out
01:02:27.000 here like
01:02:29.160 this. There we go. You can see that in
01:02:31.839 initially it shows the the register.
01:02:34.720 That's because this is an actual fetch
01:02:36.640 request. So it's loading for some time.
01:02:38.559 You can of course extract is pending
01:02:40.640 here if you want to handle that. But
01:02:42.720 this is just for demo. And when I click
01:02:44.799 sign out, uh there we go. And the cool
01:02:47.920 thing now is that if I try registering
01:02:52.680 again, I will get thrown an error
01:02:55.920 because this email is already taken.
01:02:59.680 User already exists. Perfect. So the
01:03:02.960 only thing that's missing here is a way
01:03:05.359 to uh log in. So let's quickly add this
01:03:09.440 as well just for fun. Let's do it. Let's
01:03:13.119 do a class name here. Flex flex call.
01:03:16.000 Yep. Y10 and we can just copy this
01:03:19.039 entire thing and paste it below and this
01:03:21.520 will be login. This just needs the name
01:03:26.240 and onsubmit will be on login here and
01:03:29.359 let's just copy onsubmit
01:03:33.079 here. Let's call it on
01:03:35.480 login outclient sign
01:03:40.839 in. Looks like we can also use email
01:03:44.079 just like that. There we go. So let's
01:03:46.160 try this. Let's try
01:03:49.480 antoniodemo.com. And yes, both of them
01:03:51.599 will be filled, but that's completely
01:03:53.200 fine. Let's try the wrong password
01:03:55.680 first.
01:03:57.400 Password. Click
01:04:00.760 login. Something went wrong and I didn't
01:04:04.559 open my network tab. But I'm pretty
01:04:06.400 confident that we got, as you can see
01:04:08.480 from the code
01:04:10.119 401. Let's try again.
01:04:13.599 invalid email or password. Now let's try
01:04:16.720 actual password here. Actually 1 2 3 4 5
01:04:19.680 6 7 8. Let's try logging
01:04:22.200 in. And success. There we go. Logged in
01:04:26.319 as Antonio. Just like that, we have
01:04:29.599 implemented credential out. And it only
01:04:32.240 gets easier from here. This was the
01:04:34.160 hardest part of our authentication.
01:04:36.319 Absolutely amazing amazing library. Uh,
01:04:40.079 and of course we only tested this in the
01:04:43.119 client mode because it's just, you know,
01:04:44.799 easier to create a form here and add all
01:04:47.200 of these callbacks and things, but you
01:04:49.680 can have equally uh good developer
01:04:53.359 experience with server components and
01:04:55.760 their server util and we will use that
01:04:58.640 later on. But as I said for this
01:05:01.039 chapter, I just wanted to build like a
01:05:03.599 very dirty basic UI to ensure that we
01:05:06.960 can actually create the new user. And
01:05:08.720 now let's go ahead create review and
01:05:10.559 merge this pull request. So I'm going to
01:05:13.200 go inside of my graph here. My apologies
01:05:16.319 my source uh source control here. Uh and
01:05:20.400 I'm going to go ahead and add all
01:05:22.280 changes and I before you commit you can
01:05:25.119 open the branch whenever you want. So
01:05:26.640 you can for example add the changes make
01:05:28.480 sure they are in staged go ahead and
01:05:31.119 click uh checkout to and then create a
01:05:36.319 new branch. So, I'm going to call this
01:05:39.280 uh 03
01:05:42.039 authentication
01:05:43.880 setup. I think that's the branch name.
01:05:46.319 Yeah, authentication setup. And the
01:05:49.119 message will be the
01:05:51.079 same. You can see your branch is down
01:05:53.760 here. You can click commit here and you
01:05:55.599 can publish your branch. As simple as
01:05:58.559 that. So, your branch is now available
01:06:01.359 for
01:06:03.000 review. Let's go ahead and click compare
01:06:05.599 and pull request.
01:06:07.839 And let's create a pull request. And in
01:06:10.480 a couple of seconds we will see the
01:06:12.640 review by code
01:06:16.280 rabbit. And here we have the summary. So
01:06:19.920 new features. We have introduced a
01:06:22.319 complete authentication system with user
01:06:24.880 sign up, login and sign out
01:06:27.039 capabilities. We have added a user
01:06:29.280 interface for authentication including
01:06:31.359 forms for registration and login as well
01:06:34.000 as conditional rendering based on the
01:06:35.839 authentication status, a new API
01:06:38.559 endpoint to handle authentication
01:06:40.559 requests and we have expanded the
01:06:42.960 database schema and of course the new
01:06:46.000 authentication library dependency. In
01:06:49.359 here, we have a more in-depth
01:06:52.000 walkthrough as well as file by file
01:06:54.720 change and a sequence diagram explaining
01:06:57.920 how our current form actually works. So
01:07:01.760 you can see here that when we fill up
01:07:03.920 the sign up or sign in form, we call the
01:07:06.640 sign up or login method which actually
01:07:09.839 reaches the API
01:07:11.720 al route which then handles the AL
01:07:15.359 request and then using the uh to the
01:07:18.079 database it validates or stores the user
01:07:21.200 session and account entities and then it
01:07:25.680 equally returns that state back to the
01:07:28.160 user and the UI. Of course, it left a
01:07:31.520 ton of comments in regards to our form
01:07:34.559 because that is just a temporary form
01:07:36.720 which is missing a ton of things. So,
01:07:39.240 naturally, all of these recommendations
01:07:41.760 are correct. But no point in resolving
01:07:44.079 them because we will be deleting that
01:07:45.920 entire component uh in place of a proper
01:07:48.960 one here. But if you're interested, you
01:07:51.200 can pause and read just to see how this
01:07:53.839 AI bot actually works because it is
01:07:56.160 quite impressive as well as the
01:07:57.599 suggestions it gives you. Uh, excellent.
01:08:00.960 And it actually refactors like your
01:08:03.119 entire component, but we will be doing
01:08:05.119 that later. So, no need to accept this.
01:08:07.839 Uh, in here, it adds some suggestions
01:08:11.520 for our schema. And regardless if this
01:08:14.640 is uh more correct or not, I don't want
01:08:17.439 to change anything because I want this
01:08:20.080 to be strictly compatible with better
01:08:22.319 out. I don't want to, you know, uh,
01:08:25.080 accidentally mess it up. Uh great. Uh so
01:08:30.080 in in here it marked a potential issue.
01:08:32.479 Sensitive credentials stored as plain
01:08:34.719 text. I think that is a confusion
01:08:36.960 because this is called text. That
01:08:39.679 doesn't mean that what's stored inside
01:08:41.520 is not encrypted, right? It is just a
01:08:45.600 text type. This is true. It could be a
01:08:49.198 varcher with a uh token limit. But I
01:08:52.560 think they do exactly that. They encrypt
01:08:55.679 it, but they just store it under a text
01:08:58.880 type from
01:09:00.679 Drizzle. All of these other suggestions
01:09:03.040 are semantic or new syntax here. So, I'm
01:09:06.799 going to go ahead and merge this pull
01:09:08.960 request because I am satisfied with this
01:09:11.759 result. Excellent. Once you have merged
01:09:14.238 this, go back to your IDE here and
01:09:19.359 switch to your main branch. So you just
01:09:23.120 have to find the origin
01:09:25.560 main and then just go ahead and click
01:09:28.399 this and fetch origin here and that
01:09:31.279 should recsynchronize everything here.
01:09:33.839 When you go to your graph, there we go.
01:09:36.158 You can see that uh we have added the
01:09:38.640 database in the previous one and in this
01:09:40.399 one we added the authentication setup
01:09:43.439 and everything regarding authentication.
01:09:46.080 Let me just close package lock so you
01:09:48.399 can see the actual uh code like our
01:09:50.640 session and our form and we just merge
01:09:52.880 that into main. You can of course go
01:09:55.520 inside your app page to confirm that you
01:09:57.840 can see the code in here. Excellent. So
01:10:01.840 that's it. We just merged our code. You
01:10:04.880 can always try this multiple times in
01:10:08.000 case you think it's not synchronized for
01:10:09.679 whatever reason. And that's it. Let's go
01:10:13.360 ahead and mark this as completed.
01:10:15.760 Amazing job and see you in the next
01:10:19.080 chapter. In this chapter, we're going to
01:10:21.760 develop the UI for our authentication.
01:10:24.719 This will include the AL pages, out
01:10:27.520 layout, out module, and finally the AL
01:10:30.560 views or
01:10:32.600 components. Let's go ahead and let's do
01:10:35.360 one thing first. So right now if you
01:10:39.199 take a look at our package JSON in here
01:10:41.520 you can see the d-turbo packac option
01:10:44.640 and when you run your app you will see
01:10:47.679 the turbo pack here and you will see
01:10:49.600 turbo pack right here. What I want you
01:10:52.480 to do is to remove turbo pack. That is
01:10:55.920 because I found an issue with the
01:10:58.960 layouts which is something that we will
01:11:00.960 be learning in this chapter. And that
01:11:03.600 issue simply makes it a bit harder to
01:11:05.360 demonstrate uh what I want to teach you
01:11:07.920 in this chapter. So for now go ahead and
01:11:10.480 remove that and save package JSON. And
01:11:13.199 then go ahead and do npm rundev again.
01:11:16.400 If you you will know that you've done it
01:11:18.480 correctly when you no longer see turbo
01:11:20.400 pack as opposed seeing it right here. So
01:11:23.280 just go ahead and do that. That is the
01:11:25.679 first thing we have to do. The next
01:11:27.840 thing we are going to do is create our
01:11:29.920 first route. So let's go inside of
01:11:31.600 source app folder and let's do sign dash
01:11:35.280 in and inside a page dsx file. Let's go
01:11:40.640 ahead and do an export default and let's
01:11:43.520 simply return sign in
01:11:45.960 page. Two things you have to know here.
01:11:49.199 Page is a reserved file name. If you've
01:11:52.560 named it something other than page,
01:11:55.040 Nex.js will not recognize this as a
01:11:58.159 route. The second important thing is to
01:12:01.520 always do a default export in that
01:12:04.159 reserved page file name. Otherwise,
01:12:07.360 Nex.js will not be able to find the
01:12:10.159 component it needs for
01:12:12.600 routing. Now, if you want to find this,
01:12:16.080 what you have to do is simply go to
01:12:19.520 localhost
01:12:22.920 3000/sign. So, let's go ahead and visit
01:12:25.440 that page right here. So you can see I
01:12:28.560 still have my old form here. But if I go
01:12:31.840 to localhost
01:12:34.199 3000/sign-in, we can find the sign in
01:12:37.320 page. So now let's go ahead and copy and
01:12:39.920 paste this and let's rename this one to
01:12:42.239 sign up. Let's go inside of the page and
01:12:44.880 change this to sign up page. This one is
01:12:47.840 visible at the same one, just dash sign
01:12:52.360 up. There we go.
01:12:54.960 Now let's say that I want to add some
01:12:57.120 design here. For example, for this
01:12:59.840 signin page, I will add a class name
01:13:02.400 background muted flex minimum height of
01:13:07.400 svh flex column items center justify
01:13:12.800 center padding of six medium padding of
01:13:16.560 10.
01:13:18.560 And then I'm going to add an inner div
01:13:21.520 here which will be used to limit the
01:13:25.000 width. Width will be full by default but
01:13:28.400 on mobile devices the maximum it will be
01:13:31.280 able to expand to is 24 rem or 384
01:13:35.719 pixels. On larger devices we are going
01:13:38.560 to increase this to 3 XL or 768 pixels.
01:13:47.280 Now let's go ahead and check this out.
01:13:50.400 So sign up page is all the way here. But
01:13:52.719 if I go into sign in, you can see how it
01:13:55.040 is uh pushed down here. And this is
01:13:58.080 actually centered and it will be easier
01:14:01.040 for you to understand that if you for
01:14:03.120 example wrap it with a card component,
01:14:06.239 you have the card component available
01:14:08.560 since we have added all components from
01:14:10.640 shatzen UI. So it is right here in
01:14:13.679 source components UI card and that's
01:14:16.159 where you can import it from. So now it
01:14:19.120 makes more sense. This is definitely a
01:14:21.040 centered
01:14:22.280 component. What I want you to do now is
01:14:24.880 go inside of sign up page here and
01:14:27.360 simply add the same
01:14:29.640 card without anything else. So just the
01:14:33.400 card. So now you can see a clear
01:14:35.679 difference between sign in and sign up
01:14:37.840 pages. They are they have different
01:14:39.840 backgrounds and they have different
01:14:42.520 positions. But since we know that we
01:14:44.960 want the exact same style for both of
01:14:47.440 these routes, there should be a way to
01:14:49.440 reuse this layout. And there is. Let's
01:14:52.800 learn that by creating a new folder
01:14:54.640 called AL. Let's go ahead and select
01:14:57.040 both sign in and sign up and let's drag
01:14:59.199 and drop them inside. If you are asked
01:15:01.600 to update the imports, you can select
01:15:03.520 yes.
01:15:05.960 Now first thing you will notice is that
01:15:08.400 our page has turned into a 404. That's
01:15:11.520 because it is no longer available at /s
01:15:14.080 sign in. Now it needs out sign in.
01:15:17.520 That's how you create nested
01:15:20.040 routes. There we go. And same thing is
01:15:23.199 true for sign
01:15:24.600 up. But what we've unlocked now is a
01:15:27.760 parent folder. Parent folder can now
01:15:30.800 have a layout file. Layout is a reserved
01:15:34.719 file name just like page and it behaves
01:15:38.000 pretty similar. It needs to have a
01:15:40.159 default export. The name of the
01:15:42.000 component does not matter. But what does
01:15:45.760 matter is that you always return the
01:15:47.920 children from here. Children are a type
01:15:50.400 of React
01:15:51.880 node. Let's go ahead and destructure
01:15:54.320 them from
01:15:55.880 here and let's render them inside of
01:15:58.480 this empty div.
01:16:01.120 So right now not much will change. Sign
01:16:04.480 up still looks like this and sign in
01:16:06.800 still looks like this. But what I want
01:16:09.920 to do is I want to go inside of sign in
01:16:11.840 here. And I want to copy these two divs.
01:16:16.320 And I will instead put it here in the
01:16:18.800 layout. And I will add an additional
01:16:21.120 closing div here. And I will indent the
01:16:23.600 children. And now I'm going to go inside
01:16:26.080 of the sign-in page and I will remove
01:16:28.080 everything besides the card here. So my
01:16:31.520 signin page and my sign up page now look
01:16:34.480 identical besides the text inside of
01:16:37.560 them. And in my layout I have now added
01:16:40.880 the class names. And what happens now?
01:16:43.760 The signin looks exactly the same and
01:16:46.000 the signup also looks the same. signup
01:16:50.159 has now gotten those styles that it
01:16:53.040 didn't previously have. So that's the
01:16:55.280 power of layout files. Layout files are
01:16:58.440 reusable well layouts that you can use
01:17:01.600 and this will apply to every route that
01:17:04.719 I create inside of the out folder.
01:17:07.679 That's why we needed a parent folder.
01:17:10.560 But you are probably wondering what if
01:17:13.360 you just want to have an organizational
01:17:15.520 folder, right? Because while this is
01:17:18.000 cool, it also extended our URL, right?
01:17:21.360 We now have to visit using /out here.
01:17:24.159 What if I want to go back to this? Do I
01:17:26.640 have to write the layout file
01:17:29.040 individually in each page as I did
01:17:31.000 before? No, you don't. What you can do
01:17:33.679 is use something called route groups. Go
01:17:36.560 ahead and rename this into AL in
01:17:39.400 parenthesis. If it asks you to import to
01:17:42.239 update the imports, you can select yes.
01:17:45.120 What this will do is it will mark this
01:17:47.840 as an out uh as a route group which
01:17:51.360 means that your routes are now
01:17:52.880 officially accessible back through its
01:17:55.280 original URL. You can see that the
01:17:57.520 current one is 404. But if I go back to
01:17:59.760 my old ones, there we go. Now I have a
01:18:02.560 much cleaner URL, but I also preserved
01:18:05.679 the ability to create a unique layout
01:18:08.960 file for that group of routes. So this
01:18:13.600 basically tells the Nex.js router do not
01:18:16.640 include this in the URL. That doesn't
01:18:19.600 mean don't include this folder in
01:18:22.159 routing. It simply means this specific
01:18:25.120 folder it's just a grouping folder.
01:18:28.560 Right? This will not be a part of the
01:18:30.480 URL. This will be a part of the URL. And
01:18:33.440 you can nest this kinds of things as
01:18:36.159 deep as you want. They won't stop
01:18:38.159 working. Right? Whenever you have
01:18:40.239 something in parentheses inside of the
01:18:41.920 app folder, it will be excluded from the
01:18:46.600 URL. But that does not mean excluded
01:18:49.760 from routing. That's important to
01:18:52.600 understand. Great. So now that we have
01:18:55.040 this set up and we have learned about
01:18:56.800 the layout and how we can use it, how
01:18:58.960 about we go and create the actual
01:19:01.600 module. So let's go inside of the
01:19:03.520 source. Make sure you are in the source
01:19:05.360 and create modules. And inside of here,
01:19:08.320 create the ALF module. And in here, I'm
01:19:11.760 going to keep everything ALF related.
01:19:14.239 Let's start with our UI. In here, we're
01:19:18.159 going to have views. So, modules out UI
01:19:21.679 views. Go ahead and create signin
01:19:25.800 view.tsx just like this. This is a
01:19:28.640 component, so it does not need to have a
01:19:30.640 default export. We can just do sign in
01:19:36.840 view and return sign in
01:19:40.760 view like this. Or let's be a bit more
01:19:44.440 specific uh let's return a card from
01:19:47.600 components UI card. And now if you go
01:19:50.719 inside of your sign in
01:19:54.120 page. So right here in the out route
01:19:57.199 group you can just return that sign in
01:20:01.480 view. So now our page here is used
01:20:04.800 purely for routing and it just renders
01:20:08.600 this and we are going to develop the
01:20:11.040 actual code inside of the module where
01:20:12.960 it belongs. So now sign in looks
01:20:16.360 identical.
01:20:18.000 So let's go ahead and do the same thing.
01:20:20.560 Sign in view. Let's copy it. Sign up
01:20:24.920 view. Let's rename this to sign up view.
01:20:28.719 And change this to sign up view. And
01:20:30.960 just to clarify, this is a my code
01:20:34.000 structure. This is not something you
01:20:35.520 have to do. Modules is not a reserved
01:20:37.679 folder in Nex.js. This is simply how I
01:20:40.640 like to separate my modules. Right?
01:20:43.520 Instead of writing the actual code in
01:20:45.280 pages, I mostly use page for redirects
01:20:48.800 for prefetching uh and then I just
01:20:51.280 render the actual component I need maybe
01:20:53.199 for some suspense or something like
01:20:55.040 that. But I keep them as server
01:20:57.679 components so that I can leverage
01:20:59.760 everything server components has to
01:21:01.360 offer and then I simply do the client
01:21:03.040 stuff inside of these views right
01:21:05.880 here. So now let's go ahead and go
01:21:08.719 inside of sign up here and let's do the
01:21:11.199 same thing here. So sign in view, my
01:21:13.520 apologies, sign up
01:21:15.239 view, remove the unused imports and you
01:21:18.080 can remove these comments. We now know
01:21:20.320 how to access these routes, right? And
01:21:23.120 uh now before we move on, I just want to
01:21:25.679 go quickly back inside of these views
01:21:27.840 and into both of them, go ahead and add
01:21:30.880 use client at the top. So signup view
01:21:33.600 and signin view, both of them should
01:21:36.000 have use client at the top. And what I
01:21:38.640 want you to do is add a console log sign
01:21:41.760 up
01:21:43.480 view and go inside of sign in and add
01:21:46.960 sign in
01:21:49.880 view and then go inside of these pages
01:21:54.040 here. So sign in page add a console log
01:21:58.120 here sign in
01:22:01.960 page and sign
01:22:05.320 up sign up page. So all of these four
01:22:09.840 should have both the views and the
01:22:12.320 pages. The only difference is that
01:22:14.400 signup views have these use client
01:22:17.159 thingies. I'm purposely doing this to
01:22:20.480 show you something. So you can see that
01:22:22.480 when I'm on my signin view, the signin
01:22:25.840 page console logs from
01:22:28.920 page.tsx, but it has a server prefix.
01:22:32.800 This means that it's actually logging
01:22:35.360 this on the server and not on the page,
01:22:39.040 right? So I just wanted to show you that
01:22:41.520 difference. And if you go inside of the
01:22:42.960 sign
01:22:44.360 up, you will see the same thing. You can
01:22:46.880 see we have signup page on the server
01:22:49.520 whereas signin view is the actual client
01:22:52.360 component. So you can now remove these
01:22:54.560 console logs and uh I'm going to talk
01:22:57.040 more about server and client components
01:22:59.120 moving on but I think this is this will
01:23:01.520 gives you like the most basic uh
01:23:03.440 difference between the two. So our views
01:23:06.320 need to have use client because we're
01:23:08.719 going to do client stuff in them. So
01:23:11.199 let's start with the signin view. What
01:23:13.920 I'm going to do is I'm going to wrap
01:23:15.360 this inside of a div. Whoops. Let's just
01:23:17.679 move that here. I'm going to wrap the
01:23:20.239 card inside of a div. And I'm going to
01:23:22.080 give the class name flex flex column and
01:23:25.760 gap of six. Now for the card, I'm going
01:23:29.440 to give it a class name overflow hidden
01:23:31.679 and padding of zero. Then I'm going to
01:23:34.080 import card
01:23:36.120 content from the same at /components UI
01:23:40.400 card like this.
01:23:43.120 In the card content, let's give it a
01:23:45.040 class name here, grid padding of zero.
01:23:48.960 And on desktop, grid columns 2. So right
01:23:53.520 now, if you add a paragraph, for
01:23:55.760 example, column one, and then another
01:23:57.760 one, column two, and head into sign
01:24:03.000 in, you will see that these columns are
01:24:06.320 next to each other. But when you zoom
01:24:08.080 in, they collapse because that's exactly
01:24:10.960 what we told them to do. Only on
01:24:12.920 desktop, this has to become two columns
01:24:15.600 next to each other. Otherwise, it's
01:24:17.360 going to be beneath one another. That's
01:24:19.280 exactly how we want them to behave.
01:24:21.920 Great. So now what I'm going to do is
01:24:25.120 I'm going to uh create a form element
01:24:31.480 here like this. And in here I will
01:24:36.080 create a div
01:24:37.480 element simply so we can begin
01:24:40.080 separating these two. Now let's go ahead
01:24:43.679 and do the following. Let's do the
01:24:45.199 second column uh first because it's
01:24:47.760 easier. So this column right here. We're
01:24:50.480 going to do a class name here.
01:24:52.800 background
01:24:54.040 radial from and then in here uh let's go
01:24:59.040 ahead and say green 500 to green
01:25:06.040 800. Something like this. We can
01:25:08.639 experiment a bit. Let's try 700 to 800.
01:25:12.800 Or maybe make this a bit
01:25:15.960 darker. Something like this for now.
01:25:18.320 It's okay. Uh let's keep it relative.
01:25:24.040 hidden MD
01:25:26.920 flex flex column gap Y of four items
01:25:33.520 center and
01:25:35.000 justify center. So now you should see
01:25:37.840 column two here in the center like that.
01:25:41.040 And now what we're going to do is we're
01:25:43.760 going to render a paragraph here with a
01:25:46.960 class name text to Excel font semibold
01:25:51.679 and text white. And this will have meet
01:25:55.760 AI text inside or whatever you are going
01:25:58.639 to call your app. And then above this we
01:26:03.040 should have a normal image element. So
01:26:05.199 yes, it should have this warning. That's
01:26:06.880 okay. We should go to /lo.svg.
01:26:10.159 SVG and give it an alt here of image and
01:26:13.840 give it a class name here of height 92
01:26:17.280 pixels and the width of 92
01:26:20.280 pixels. Now you will get this because we
01:26:23.760 don't have a logo yet and I'm going to
01:26:27.280 show you where you can get one. So I
01:26:30.080 find my placeholder logos on logo Ipsum.
01:26:33.600 I think it's an amazing website with a
01:26:35.600 bunch of placeholder logos. All right.
01:26:38.320 So, you should only use this for your
01:26:40.400 demo applications. And the one I found
01:26:43.520 is this one. So,
01:26:47.000 logoipsum.com. You can of course find
01:26:48.880 the link in the description. All you can
01:26:51.440 do is just click on this logos and that
01:26:53.520 will copy the SVG. You can of course use
01:26:55.440 the normal download or you can just
01:26:57.840 click copy and then go inside of public
01:27:03.280 logo SVG and paste it inside. Let me
01:27:06.880 just
01:27:09.080 uh yes, if it asks you to open that uh
01:27:13.360 just click yes to open the editor and
01:27:15.520 then paste it inside. And then this will
01:27:18.880 uh have the logo. And when you refresh,
01:27:21.440 there we go. We have the logo. Now,
01:27:23.280 let's go ahead and just change the
01:27:24.719 colors a little bit here. So, we have
01:27:28.719 this color E22935.
01:27:32.000 Go ahead and use the find and replace
01:27:34.159 option here and change it to the
01:27:36.800 following color 6 a34 A and click uh
01:27:42.080 this one to replace all instances.
01:27:44.639 There's two of them. There we go. So
01:27:48.560 already when you refresh you will see a
01:27:50.639 change of color but now we have four
01:27:53.520 more instances of the red color. So use
01:27:56.400 the find method again. You can use
01:27:58.320 control F or command F if you haven't
01:28:00.480 been able to find it and replace this
01:28:03.199 one with
01:28:06.040 6cc58D. And you can use this one to
01:28:08.320 replace all four instances. And refresh.
01:28:11.520 And there we go. Perfect. So that is it
01:28:15.600 for this column right here. And now we
01:28:17.840 can focus on actually developing uh the
01:28:21.280 form. So what I'm going to do is I'm
01:28:25.120 going to go back in my sign in view
01:28:27.880 here. And since we installed all
01:28:31.679 components from chaten, we also got some
01:28:34.880 new packages. Uh and one of them is zod.
01:28:39.360 So we can import z from zod. And you can
01:28:42.719 go inside of package json and search for
01:28:44.880 zod to confirm that you have it.
01:28:47.760 Besides
01:28:48.920 this, we are also going to need uh zod
01:28:54.040 resolver from at hook form resolvers
01:29:00.600 /zod. And we are also going to need the
01:29:04.159 input component from components UI
01:29:07.639 input. We are also going to need the
01:29:10.719 button from components UI button. And
01:29:15.520 we're also going to need all the
01:29:18.600 components from components UI form. So
01:29:23.600 let's add this as well. You have all of
01:29:25.280 this installed, right? All of this
01:29:27.120 already exists in your project. Uh don't
01:29:30.800 confuse this ad sign with this ad sign.
01:29:33.520 So this is the name of the npm package
01:29:35.520 and this is the name of our alias.
01:29:37.920 That's where I add space between imports
01:29:40.000 to separate my npm imports versus my
01:29:43.360 local imports.
01:29:46.560 Besides this, let's also import the
01:29:49.920 alert component. So, alert and alert
01:29:52.560 title from components UI
01:29:54.840 alert. And uh let's also
01:29:59.320 prepare octagon alert icon from Lucid
01:30:03.040 React. I think that's enough for us to
01:30:04.719 start with the development of the form.
01:30:07.360 So, let's define the form schema here to
01:30:09.520 be Z.Object
01:30:11.400 object
01:30:12.920 email a type of string and email and
01:30:17.800 password also a type of string and the
01:30:21.520 only thing I'm going to pass here is the
01:30:23.360 minimum length with the message password
01:30:26.639 is
01:30:27.480 required I will not change this to be
01:30:30.880 any other length because this is the
01:30:33.120 sign in view so it really does not
01:30:36.320 matter what length I put here right uh
01:30:40.080 the length matters for the registration
01:30:42.560 but I don't think you should ever
01:30:44.000 enforce the length on the sign in view
01:30:47.600 because uh what if you change your
01:30:50.800 requirement later on and you have a
01:30:52.560 bunch of users who no longer meet the
01:30:54.760 requirement you will prevent them from
01:30:57.040 logging in. So it only makes sense to
01:31:00.400 enforce that on
01:31:02.120 registration. So now that we have the
01:31:04.159 form schema, let's go ahead and let's
01:31:07.440 get use form. My apologies const form
01:31:11.679 from use form. And we did not import
01:31:14.800 this, but we should from
01:31:17.400 react-hook-form. This is another package
01:31:19.360 that we have installed. React hook form.
01:31:22.560 You can find it here. You can find hook
01:31:25.199 form resolvers. You can find lucid
01:31:27.920 react. All of those are installed when
01:31:30.800 we added all components from SHA CN
01:31:33.480 UI. Great. So now that we have this
01:31:35.920 inside of this, let's define Z infer and
01:31:39.040 let's add type of form schema. Inside of
01:31:43.040 this, let's add a resolver to be Zod
01:31:45.440 resolver and pass in the form schema.
01:31:47.679 And let's finally add the default
01:31:49.719 values. This should be an email and a
01:31:53.159 password just like this.
01:31:57.120 Now, let's go ahead and let's go back
01:31:59.679 inside of our card content here. And I'm
01:32:02.719 going to uh separate these with a space
01:32:06.400 just so I can find them more easily. And
01:32:08.639 let's actually add
01:32:10.280 our form with a capital F to wrap our
01:32:14.400 native form element. So this form with a
01:32:17.280 capital F is the import from
01:32:19.800 Shadnui and it
01:32:22.199 needs the entire form props. So this is
01:32:25.679 like a provider for all the form hooks
01:32:28.639 and components which we are going to use
01:32:30.960 going forward. Let's give this form a
01:32:34.000 class name of padding six and on large
01:32:38.320 devices padding
01:32:40.120 8. Then let's finally remove this text
01:32:43.280 and inside let's open a div and another
01:32:45.920 div inside. With the first outer div
01:32:49.120 give it a flex flex column and gap six.
01:32:52.800 And in the inner div, give it a flex
01:32:55.199 flex column again, items center and text
01:33:00.199 center. Inside of this inner div, you're
01:33:03.120 going to render an H1 element and below
01:33:05.520 it, you're going to render a paragraph
01:33:07.280 element. The H1 element will render out
01:33:10.960 welcome back with a class name of text
01:33:14.400 to Excel and font bold. And let's
01:33:17.280 quickly see how that looks like. There
01:33:19.040 we go.
01:33:20.400 And in the paragraph here, add a class
01:33:23.440 name text muted foreground and text
01:33:28.040 balance. And in here, you're going to
01:33:30.600 render log into your
01:33:35.000 account. Now, let's go ahead and outside
01:33:37.840 of this inner div, but still inside of
01:33:40.639 this outer div, you're going to render a
01:33:44.000 div with a class name grid and gap 3.
01:33:49.440 And inside you are going to render the
01:33:51.760 form field which is a self-closing tag.
01:33:55.120 Pass the control prop which is form
01:33:58.520 control name which is
01:34:01.800 email
01:34:03.320 render which will destructure our field
01:34:07.280 and go ahead and then inside render form
01:34:11.800 item. Inside of form item, add a form
01:34:15.360 label and write in your label for this
01:34:18.960 field which is email. Then add a form
01:34:22.639 control and finally inside the component
01:34:25.440 you want to use which in our case is a
01:34:27.760 normal input component. Type is email
01:34:32.440 placeholder can be
01:34:37.800 m@example.com and go ahead and spread
01:34:40.960 field. So now this input becomes a
01:34:43.280 controlled component. So that's how we
01:34:45.520 are going to build our forms modularly
01:34:48.719 and you can also add a self-closing form
01:34:51.719 message which will be used to render
01:34:55.040 errors if there are
01:34:57.480 any. Excellent. So now you have your
01:35:00.320 email uh right here. Perfect. And now
01:35:04.320 what you can do is you can copy this div
01:35:06.719 including the form field, paste it below
01:35:10.239 and change the name of this to be
01:35:12.080 password. And if you haven't noticed
01:35:14.080 already, this is uh strictly typed. So I
01:35:17.360 can only choose between email and
01:35:19.040 password because it reads from our
01:35:21.920 default values here. It reads from our
01:35:24.320 form schema.
01:35:26.880 So now in here where we added the name
01:35:29.199 password, change the form label to be
01:35:31.280 password and change the type to be
01:35:33.800 password. And for the placeholder, well,
01:35:36.320 you can just add some asterisks here. 1
01:35:38.400 2 3 4 5 6 7
01:35:41.480 8. There we
01:35:43.480 go. So now uh let's go ahead below this
01:35:48.639 and outside of this div we are going to
01:35:51.760 do the following. Let's do true. So
01:35:54.719 literally hardcode the word true and
01:35:58.080 render the alert component and inside
01:36:00.960 render the octagon alert icon and close
01:36:04.159 it. And then add an alert title and
01:36:07.360 render
01:36:08.760 error. In the alert give the class name
01:36:11.600 of background destructive divided by 10
01:36:15.120 which basically means 10%
01:36:17.639 opacity. Then uh let's go ahead and add
01:36:21.639 border-none. And for the octagon alert
01:36:24.320 icon, give it a class name height four
01:36:26.639 width four and add an exclamation point
01:36:30.239 text
01:36:33.239 destructive. This marks as dash
01:36:35.920 important uh I mean exclamation point
01:36:38.239 important. So now you have an error
01:36:40.560 here. So this is where we are going to
01:36:42.719 display our server errors because we
01:36:46.000 don't know what field exactly caused an
01:36:48.239 error but maybe our connection went out.
01:36:51.040 Maybe the database is down. This is
01:36:52.960 where we're going to display server
01:36:55.360 errors. That's why I have hardcoded it
01:36:57.280 to true. Later, this will be an actual
01:36:59.600 uh boolean value. Below this, add a
01:37:02.679 button and sign in text. Go ahead and
01:37:06.960 give it a type of submit and a class
01:37:10.159 name with
01:37:12.280 pool like this. There we go.
01:37:16.480 And now uh let's go ahead and do the
01:37:20.159 following here. Below this button, add a
01:37:23.600 div with a class
01:37:26.440 name. After border dash
01:37:30.760 border a relative text center text small
01:37:36.960 after absolute after inset zero after
01:37:42.960 top 1 and a half after zindex of zero
01:37:49.040 after flex after items center and after
01:37:54.159 border top.
01:37:56.880 Add a span element here or continue with
01:38:01.760 and give this a class name background
01:38:04.560 color of card text muted foreground
01:38:10.600 relative zindex of 10 and px of
01:38:15.080 two. So now you have this cool looking
01:38:18.560 line crossing text. And in here we're
01:38:21.440 going to add the buttons to log in with
01:38:24.080 socials. So outside of this
01:38:27.159 div, go ahead and add another div which
01:38:30.159 will serve as our grid specifically
01:38:33.520 handling two columns here. If you have
01:38:36.320 three social login, you would change
01:38:38.080 this to three. Right in here, add a
01:38:42.520 button. Go ahead and give it a variant
01:38:45.119 of outline, a type of button, and a
01:38:49.360 class
01:38:50.440 name with pool. type button is quite
01:38:54.080 important otherwise this button would
01:38:56.400 submit the
01:38:57.639 form and inside of here uh what we are
01:39:01.360 going to do is render the Google icon.
01:39:04.239 So for now let's just add the text
01:39:07.480 Google and in here
01:39:10.520 GitHub. So now you have Google and
01:39:13.199 GitHub texts right here. Great.
01:39:17.119 Uh, and then what I want to do is go
01:39:21.280 outside of this div right after we close
01:39:24.480 this button and add one more div here
01:39:26.719 with a class name text center and text
01:39:30.199 small. And in here you're going to add
01:39:34.040 don't have an account. And you can use
01:39:38.000 you can't exactly put an apostrophe
01:39:40.679 here. You have to use at signappos like
01:39:44.800 this.
01:39:46.480 So don't have an account import
01:39:50.679 link from next
01:39:55.480 slashlink. And in here you're simply
01:39:57.760 going to
01:39:59.639 redirect to slash sign up if you don't
01:40:03.440 have it. And inside just sign
01:40:06.360 up. Uh you can also do if it's easier
01:40:09.440 for your eyes you can add an empty space
01:40:11.920 like this and then collapse this. There
01:40:14.480 we go.
01:40:15.920 and give this link a class name
01:40:18.800 underline and underline offset
01:40:21.800 4. There we go. Don't have an account.
01:40:24.960 Sign up like this. Great. So now uh what
01:40:30.719 I want to do is just one more thing here
01:40:34.159 outside of this card here. Add a div
01:40:37.840 with a class name text muted foreground
01:40:42.440 asterisk column square brackets href
01:40:47.040 element column hover column text
01:40:51.159 primary text center text extra small
01:40:55.119 text
01:40:57.239 balance again this type of
01:41:00.679 sign but this time for underline and
01:41:04.159 then just copy it and add underline
01:41:07.320 offset four. And inside of here, you can
01:41:11.119 add a text by clicking continue. You
01:41:15.040 agree to
01:41:16.520 our and you would probably use an href
01:41:19.679 or link here for terms of
01:41:24.840 service
01:41:26.679 and privacy
01:41:29.800 policy and give this also an href. So
01:41:33.600 just some template for you to have.
01:41:35.520 There we go.
01:41:38.040 Perfect. So now let's go ahead and
01:41:41.040 actually make this form work. So in
01:41:44.480 order to do that, we have to create uh
01:41:48.440 the we have to add our ALF utils. So
01:41:52.480 let's go ahead and import the ALF
01:41:56.760 client, which we can do here. There we
01:41:59.840 go. out client from lib out client like
01:42:03.000 that and let's do the following. Let's
01:42:06.080 add con router here. Use
01:42:09.719 router. You can import that from next
01:42:15.400 navigation like
01:42:18.360 that. And then let's also add error set
01:42:23.199 error to be use state from
01:42:26.199 react by default. Set it to null. and
01:42:30.000 give it a type of string or null. You
01:42:32.880 can import use state of course from
01:42:37.880 react. And now let's create our const
01:42:41.679 onsubmit
01:42:43.000 method which is an asynchronous method
01:42:45.840 which accepts data which will be z.info
01:42:49.920 type of form schema. So we know exactly
01:42:52.480 what kind of data we are getting here.
01:42:55.119 First of all we are going to reset our
01:42:58.159 error here. And then we're going to
01:43:00.800 extract the error by using await
01:43:03.639 outclient
01:43:05.560 signin
01:43:08.600 email. And in the first argument for
01:43:12.159 this option, we will pass the email to
01:43:14.400 be
01:43:15.560 data. And password to be
01:43:19.880 data.pass. And in the second argument,
01:43:22.560 we are going to pass in the on success
01:43:25.880 here, which will be router.push.
01:43:29.719 push to the front
01:43:35.080 page and then in here if we have an
01:43:38.080 error actually we can do this
01:43:41.080 better we don't need this to be
01:43:43.360 asynchronous at all we can just I think
01:43:45.760 do
01:43:47.639 this and then in here on
01:43:51.800 error set error error which we have to
01:43:55.760 get from is
01:43:59.400 error and let's see dot
01:44:04.639 error
01:44:06.199 dot message like this or yeah I think
01:44:10.239 this will always be available maybe we
01:44:11.840 can destructure this
01:44:14.199 yeah and then like
01:44:20.040 this I think this should
01:44:24.360 work and now what we I have to do is go
01:44:26.800 inside of this form here. It's a native
01:44:28.719 HTML element and add on submit here to
01:44:31.119 be form handle submit
01:44:34.840 onsubmit. Let's see any errors. We do
01:44:37.440 have an error here. Unused variable. So
01:44:39.760 let's go and find our alert button.
01:44:42.639 Instead of true, it will be if we have
01:44:44.960 an error. And you can add double
01:44:47.199 exclamation points here. Make sure
01:44:49.199 there's double. So this turns it into a
01:44:51.600 boolean. And in here, just render the
01:44:53.760 error.
01:44:56.480 So let's go ahead and try it out. So
01:44:58.719 just by clicking sign in, you should
01:45:00.639 have the normal forward validation
01:45:02.400 errors. But if I try using something
01:45:04.080 that doesn't
01:45:05.320 exist. So I'm pretty sure I don't have
01:45:07.840 this
01:45:08.679 user and click sign in, I should be
01:45:12.239 getting an error back. There we go.
01:45:14.560 Invalid email or password. So this came
01:45:17.040 from the server, right?
01:45:21.600 If I if I try this
01:45:25.560 again, you can see that this error
01:45:28.000 message is coming from the server and we
01:45:30.560 are rendering it here. So the user knows
01:45:33.199 something went wrong. We can improve
01:45:35.360 this a little bit by also adding uh the
01:45:40.000 let's see what we can do disabled if we
01:45:42.880 are submitting but I'm trying to find a
01:45:45.280 good way of doing this. So we could of
01:45:48.560 course you know just add a new field set
01:45:51.199 is loading.
01:45:54.080 Maybe I should do that because yes, we
01:45:57.040 can also use the form state is
01:45:59.360 submitting. But since we will be using
01:46:01.960 um social login buttons, I think it's
01:46:05.040 more reliable for us to actually
01:46:06.880 introduce loading and actually this will
01:46:10.000 be
01:46:10.920 pending set pending use
01:46:14.280 state false by
01:46:16.920 default. So set pending here false as
01:46:20.560 well. And let's go ahead. Actually, this
01:46:24.080 will be set pending to true. And then in
01:46:26.639 here, we're going to add on. Let's see.
01:46:28.480 Do we have on
01:46:31.400 uh we can just do it after this, I
01:46:34.480 suppose.
01:46:36.040 Then set
01:46:38.199 pending
01:46:39.960 false. Maybe this isn't No, this will
01:46:42.880 not work like
01:46:45.960 that. We can just do this. It's
01:46:49.480 easier. and
01:46:51.400 then find the button and if it's pending
01:46:54.560 disable it. So now you have a nicer
01:47:00.040 experience. You can see the button is
01:47:02.080 disabled until it either returns with an
01:47:06.239 error or success. So you can copy this
01:47:09.760 and also add it to these buttons right
01:47:15.639 here. There we go. Perfect. So, this
01:47:19.440 form should now work. Now, let's go
01:47:21.920 ahead and copy it. So, we can copy
01:47:25.280 everything in here and go inside of
01:47:27.280 signup view and paste everything in
01:47:29.960 here. I'm first going to rename this
01:47:32.880 back to sign up view and go inside of my
01:47:36.320 sign up page to ensure no errors are
01:47:39.520 being thrown. And when I control or
01:47:41.440 commandclick here, I will be redirected
01:47:44.239 to this newly copied component. Make
01:47:46.960 sure you are working in the new copied
01:47:48.880 component so you don't override
01:47:50.239 anything. And let's start by introducing
01:47:54.480 uh the new form schema. So besides the
01:47:58.560 password
01:47:59.639 here, we are also uh I'm also just going
01:48:03.520 to say password is required. I won't
01:48:05.280 introduce any validation here because we
01:48:07.280 have backend validation from better out.
01:48:09.679 But what I will do is ensure that user
01:48:12.080 has to
01:48:13.320 confirm
01:48:15.080 password and I will also add a name
01:48:18.880 which will be Z string and min one
01:48:23.000 message name is
01:48:25.320 required. The reason we don't need that
01:48:27.760 for email is because this takes care of
01:48:30.840 that. But the confirm password uh will
01:48:34.560 be a little bit different. So this can
01:48:37.440 stay the same. And we're then going to
01:48:40.159 add
01:48:42.119 dotrefine get the data and check if
01:48:45.199 data.p password matches data confirm
01:48:50.199 password. But if it doesn't, the message
01:48:52.960 we're going to pass is
01:48:55.000 passwords don't whoops passwords don't
01:48:59.880 match. And the path well this basically
01:49:03.480 means what field should show this error
01:49:07.119 that should be the confirm
01:49:10.119 password like this. There we go. So now
01:49:13.920 inside of here everything can stay the
01:49:15.679 same but we now also have
01:49:18.119 name and we have confirm
01:49:21.480 password. And now what we have to do
01:49:24.280 here is we have to change the onsubmit
01:49:26.960 method to call the sign up method. And
01:49:30.080 we also need the name here. So
01:49:33.560 data.name. That's it. No errors at all.
01:49:37.199 And now in here we're going to change
01:49:39.360 instead of welcome back this will be let
01:49:42.639 and let's use at@ appos. So let's get
01:49:46.199 started. And this will be create your
01:49:51.560 account. The first field here will be
01:49:55.040 name. So you can copy the the entire
01:49:57.760 form field with the grid gap and paste
01:50:01.040 it
01:50:01.719 above. Change this name to be name and
01:50:05.280 this to be
01:50:06.600 name and the type can be text and this
01:50:09.600 can be John Doe for
01:50:14.119 example. So you can click sign up here
01:50:16.719 and you should be seeing that new form
01:50:18.800 which now has name here.
01:50:23.119 Now below this we have email below that
01:50:26.080 we have password and then copy the div
01:50:28.639 grid gap and the form
01:50:32.119 field. Paste it
01:50:34.679 below and change just the name here to
01:50:38.159 be confirm password. And well uh we
01:50:41.760 should also change this to be confirm
01:50:43.600 password I
01:50:45.880 guess. There we go. So let's just zoom
01:50:48.159 out a
01:50:49.159 bit. There we go.
01:50:52.560 So let's just try something
01:50:55.480 here. Let's try 1 2 3 and 1 2 3 4. There
01:51:00.239 we go. Passwords don't match. But if I
01:51:02.960 try 1, two, three, you can see that it
01:51:05.280 works. So let's try adding a new user
01:51:07.840 for example. And I will also prepare my
01:51:10.239 database here.
01:51:12.560 So what we can do of course is run mpm
01:51:16.880 run database studio
01:51:19.159 here which should get us you can click
01:51:22.080 this link and this should open the
01:51:23.600 studio then and in here I think I have
01:51:26.080 one user Antonio demo so let's go ahead
01:51:29.600 now and create a john john john john
01:51:32.239 john john john john john john john john
01:51:32.239 john john john john john john john john
01:51:32.320 john john john john john john john john
01:51:32.320 john john john john
01:51:33.159 johnondo.com and let's add 1 2 3 4 5 6
01:51:37.760 and let's do 1 2 3 4 5 6 I'm purposely
01:51:40.560 doing something wrong to see if This
01:51:42.239 will throw an error. There we go.
01:51:43.520 Password too short. So, let's add 78
01:51:47.800 78. And let's see what's going to happen
01:51:50.800 now. There we go. Logged in as John. And
01:51:55.199 if I go ahead and check uh my Drizzle
01:51:58.320 Studio here and refresh this and refresh
01:52:01.280 this. There we go. johndemo.com.
01:52:04.719 So, if I sign out now and if I go back
01:52:07.840 to sign in here, I should be able to log
01:52:10.960 in as John demo.com. Let's try an
01:52:14.080 invalid password
01:52:16.360 first. There we go. Let's try the
01:52:19.760 correct
01:52:20.599 password. And there we go. I'm logged
01:52:23.760 in. Perfect. So, we have completely uh
01:52:27.920 modified the form from the previous one.
01:52:30.400 Now it looks much better of course, but
01:52:32.880 there are some things we still have to
01:52:34.639 fix, including this one. Let's wrap up
01:52:36.719 the chapter with this. So inside your
01:52:38.639 sign up view, go down here and change
01:52:42.000 this to sign in and this to sign in. And
01:52:46.000 instead of don't have an account, it
01:52:47.760 will be already have an account. So now
01:52:51.040 you can switch between sign up and sign
01:52:53.360 in here. So what we have to do is we
01:52:55.840 have to improve this gradient a bit. I
01:52:57.920 don't like how it looks. And we have to
01:53:00.800 add proper icons for this. And of
01:53:02.880 course, we have to actually enable
01:53:04.159 Google and GitHub social signins, but
01:53:07.520 that will be for another chapter. And
01:53:09.599 also this button might need have might
01:53:12.560 need to have a different primary color.
01:53:15.119 We'll see about that later. But yes, you
01:53:18.719 can play around with the form. I'm
01:53:20.639 pretty satisfied with how it turned out.
01:53:23.440 Great. Let's go ahead now and wrap up
01:53:25.440 the chapter. We created the out pages,
01:53:27.920 out layout and the out module. We
01:53:30.159 created the out views. We got the
01:53:32.239 register login and the app logo. And now
01:53:34.480 let's create review and merge this pull
01:53:38.360 request. So what I'm going to do is uh
01:53:42.320 you can change your branch either from
01:53:44.960 using the three dots here and then
01:53:46.800 clicking check out too and but I think
01:53:49.280 you can also do clicking here and then
01:53:52.320 create a new branch from here. Maybe
01:53:53.840 that's easier. And let's call this 04
01:53:57.400 authentication UI. Let me just double
01:53:59.840 check it is 04 authentication UI. There
01:54:04.000 we go. I'm on my new branch. Now I will
01:54:06.320 go inside of the uh source control and I
01:54:09.679 will click plus here. Now all of these
01:54:12.400 are staged changes. I will add 04
01:54:15.800 authentication UI here. Confirm one more
01:54:19.280 time. I'm on the new branch and I will
01:54:21.040 click commit and publish branch. Now
01:54:24.400 let's head to
01:54:26.599 GitHub. Let's go ahead and open a pull
01:54:29.119 request here and create a pull request
01:54:32.159 and let's wait a second for our AI
01:54:35.040 reviewer to
01:54:37.400 start. And here we have our code
01:54:40.400 summary. So let's for change read the
01:54:43.280 walk through instead. This is a bit more
01:54:45.840 detailed. So this update introduces a
01:54:48.880 new authentication related react
01:54:50.639 components for signin and signup flows
01:54:53.040 including form validation and UI
01:54:55.040 layouts. We also add a layout wrapper
01:54:57.440 for authentication pages and we updated
01:55:00.159 the development script to remove the
01:55:02.159 turbo pack flag. So that's precisely
01:55:05.360 what we did in here. As always we have a
01:55:08.239 file by file change. And in here we have
01:55:10.719 an interesting sequence diagram. This is
01:55:12.719 what I was talking about. This will make
01:55:14.480 it easier for us to understand what we
01:55:16.560 just developed. So the user navigates to
01:55:19.360 sign in and that renders the signin view
01:55:22.320 component from the signin page. The user
01:55:25.520 submits email and password in the signin
01:55:28.000 view which is then sent through the out
01:55:30.800 client. Depending on success or failure,
01:55:34.159 we either redirect to home or we display
01:55:37.360 the error alert. And the same
01:55:39.679 functionality is for sign up view and
01:55:42.639 signup page. In here we have some
01:55:45.199 actionable comments here. And this is an
01:55:47.679 actual issue I forgot to do. So it
01:55:50.719 caught that in my sign up view. I forgot
01:55:54.080 to change the submit button label. It
01:55:56.800 still says sign in. So this is something
01:55:59.920 we're going to fix in the next chapter.
01:56:02.400 Great catch by Code Rabbit AI. And then
01:56:06.239 of course it gave us actionable advice
01:56:08.960 here to enable the social login. But
01:56:12.000 since we don't yet have them u
01:56:14.800 configured, we will not be doing that.
01:56:18.320 Nevertheless, let's go ahead and merge
01:56:20.800 this pull request. Once the pull request
01:56:24.560 is merged, you can go back to your IDE
01:56:28.480 here. Go ahead and click here and find
01:56:31.840 the main branch. Whether you will use
01:56:34.960 this main or origin main, it does not
01:56:39.040 matter. Just make sure it's main or if
01:56:42.000 you use anything else for your default
01:56:44.080 branch. And once you're there, click on
01:56:46.880 this button to pull and push commits
01:56:50.000 from origin main. This will make it
01:56:52.960 synchronized with everything else. So
01:56:55.119 there we go.
01:56:57.639 Perfect. Amazing. Amazing job. Now,
01:57:00.880 let's go ahead and mark this as
01:57:02.560 completed and see you in the next
01:57:06.440 chapter. In this chapter, we're going to
01:57:09.040 go ahead and implement social provider
01:57:12.239 login for GitHub and Google. We're also
01:57:16.159 going to learn how to protect our
01:57:18.000 non-ALF
01:57:19.560 pages. Let's go ahead and check if you
01:57:23.040 are running your app. So, npm
01:57:27.000 rundev. After that, go to localhost
01:57:31.800 3000/sign. So, you're viewing the same
01:57:34.080 form as I am. After that, let's go to
01:57:37.679 better out. I would highly suggest that
01:57:40.239 you follow the documentation alongside
01:57:42.560 with me. Go inside of the
01:57:45.159 documentation authentication and find
01:57:48.440 GitHub. The reason I told you to follow
01:57:50.800 alongside is so you can copy the code
01:57:52.960 snippets, but also use the very useful
01:57:56.159 links they have added. So in here they
01:57:58.800 have prepared the redirect URL for us.
01:58:01.679 So go ahead and copy this. Click on
01:58:03.920 GitHub developer portal. It's located in
01:58:06.960 your settings developer settings. Click
01:58:09.760 new or out app. Let's call it meet AI
01:58:14.000 and authorization callback URL is the
01:58:16.560 redirect
01:58:17.639 URL. For the homepage URL, you can just
01:58:20.800 set the local host 3000. If you are
01:58:23.920 unsure if the protocol or the port are
01:58:27.239 correct, you can double check here. When
01:58:29.840 you run npm rundev, you can see your
01:58:32.639 local URL. If it's anything different,
01:58:35.520 for example, https or
01:58:38.280 3001, no problem. Just modify it here
01:58:41.760 and here. After you are ready, go ahead
01:58:44.880 and click register application. This
01:58:47.440 will uh allow you to copy the client ID.
01:58:50.320 So go to environment and add GitHub
01:58:52.719 client ID and prepare GitHub secret. My
01:58:57.199 apologies. GitHub client
01:59:00.520 secret. Go ahead and click generate a
01:59:03.440 new client secret and copy
01:59:06.520 it. Go ahead and paste it
01:59:09.080 here. And that's all you need. Now what
01:59:12.480 we have to do is configure the provider.
01:59:14.560 So let's go ahead and copy the social
01:59:16.239 providers here.
01:59:18.639 Now let's go inside of source lib out
01:59:23.199 and go ahead and add the social
01:59:25.280 providers
01:59:27.480 here. Make sure that you have added the
01:59:29.920 client ID and the client secret for the
01:59:32.159 GitHub social provider. As always, what
01:59:35.360 I like to do is copy from here and then
01:59:38.719 paste here just to double check. So copy
01:59:41.920 from here and paste here. The reason I
01:59:45.360 always advise doing this is in case you
01:59:47.760 misspelled this, for example, like this.
01:59:50.719 You can't really see it immediately, but
01:59:53.119 this is a different variable, right? I
01:59:56.239 missed the letter T, for example. So,
01:59:58.320 that's why you always copy from here and
02:00:00.719 paste
02:00:02.199 here. Great. Now, let's go to sign in
02:00:05.480 view and find your or continue with
02:00:10.000 part. Find your two buttons Google and
02:00:13.159 GitHub and go ahead and add on click
02:00:16.760 here and simply call our client sign in
02:00:21.960 social and add the provider and set it
02:00:25.760 to
02:00:27.480 GitHub like this.
02:00:30.320 So now if you go to your sign in view
02:00:33.199 here and click on GitHub regardless if
02:00:36.239 you are trying to register or log in uh
02:00:39.360 all out works the same way. If the user
02:00:42.000 doesn't exist it will create it. If it
02:00:44.480 does exist it will just log in. So it
02:00:46.639 does not matter that we are doing this
02:00:48.480 from the signin page. Also double check
02:00:51.440 that you didn't accidentally register
02:00:54.080 with your existing GitHub email. If you
02:00:56.800 have, go ahead and remove that user from
02:00:58.960 your database. You can visit Dusel
02:01:00.880 Studio or Neon Tables. So, let's click
02:01:03.760 GitHub here. And in a few seconds, we
02:01:06.000 should see the authorization screen.
02:01:08.239 Let's authorize. And I should now be
02:01:11.080 redirected back to the homepage here. If
02:01:14.639 you, for whatever reason, were not
02:01:16.239 redirected, you can manually go to
02:01:18.400 localhost 3000 here. Wait a second, and
02:01:20.800 you will see your GitHub username right
02:01:23.360 here. Great. Now let's go ahead and
02:01:25.840 let's sign out. Let's go back to sign in
02:01:28.679 here. So what I want to do now is I want
02:01:31.599 to copy this here and I want to go to
02:01:34.639 sign up view. Find the GitHub button
02:01:38.119 here and add the on click here. So now
02:01:41.679 both from the sign up and from the sign
02:01:43.840 in GitHub should
02:01:45.960 work. What we have to do now is the
02:01:49.199 Google login.
02:01:51.280 Let's go ahead and click on Google here
02:01:53.679 and let's go inside of the Google Cloud
02:01:56.360 Console. So before you do anything here,
02:01:59.119 what you have to do is create a new
02:02:01.040 project. Using your navbar, you can
02:02:03.199 select your current project. And in here
02:02:05.199 you can click new project. I'm going to
02:02:08.000 go ahead and call this
02:02:11.320 meet
02:02:12.840 AI. You don't have to select any
02:02:15.159 organization. And go ahead and click
02:02:17.800 create. And now just wait for your
02:02:20.639 project to be created. It should be done
02:02:23.440 in a second and click select
02:02:27.320 project. Now you will see your project
02:02:30.400 name here in the project picker. And if
02:02:33.599 you try clicking on these credentials or
02:02:36.800 oath consent screens, uh you will
02:02:39.520 probably at one point be redirected to
02:02:42.480 this Google out platform. That's because
02:02:45.440 I've noticed that Google is in some kind
02:02:47.679 of migration phase where they are
02:02:49.599 introducing this Google AL platform. So
02:02:52.400 to make this easier for you to follow,
02:02:55.280 let's follow from the actual better AL
02:02:57.920 documentation. So let's together click
02:02:59.840 on Google Cloud Console that seems to
02:03:02.560 take us to APIs and services here. And
02:03:05.679 usually what you would do is you would
02:03:07.440 go and create the credentials. But in
02:03:10.159 here I have this warning. Remember to
02:03:12.239 configure the Oout screen. uh before we
02:03:15.440 create the credentials. So usually you
02:03:18.239 would click here right and as you can
02:03:20.800 see that takes me to Google out platform
02:03:24.159 and tells me that the Google out
02:03:26.480 platform is not configured yet. So
02:03:29.199 basically you need to find a way to
02:03:31.280 configure the out platform. I just
02:03:33.119 showed you one way of getting to here
02:03:35.520 and then click get started here and that
02:03:38.400 basically takes you to the overview. So
02:03:40.400 let's call this app meet AI. Let's use
02:03:43.840 whatever you have for the user support
02:03:45.920 email and click next. For your audience,
02:03:48.800 select external so that anyone can test
02:03:51.199 the app. Go ahead and click next and
02:03:53.920 enter your uh contact email address here
02:03:57.440 and click next. Agree to the terms and
02:03:59.840 service and continue and click
02:04:03.080 create. And this will set up the Google
02:04:06.239 AL platform right here. So what I would
02:04:10.000 suggest you do now uh is click on
02:04:13.040 branding just to see everything's okay.
02:04:15.599 So the app name is meet AI. This is the
02:04:18.320 support email. And here's an advice. Do
02:04:21.280 not add a logo. If you add a logo, you
02:04:24.320 will need to submit your app for
02:04:25.840 verification which can take some time.
02:04:28.560 So don't add any logos. Do you don't
02:04:30.880 have to add anything here. I'm just
02:04:32.719 checking that the name is correct. Now
02:04:35.520 let's click through audience here. And
02:04:37.520 this is important. Before you create the
02:04:39.840 credential, click on the publish app
02:04:42.159 push to production. So here here it is.
02:04:45.920 If your app's configuration has more
02:04:47.599 than 10 domains or if it has a logo or
02:04:51.199 request sensitive or restricted scopes,
02:04:53.679 you will need to submit for
02:04:55.000 verification. So that's why I told you
02:04:57.119 to not add a logo because this way you
02:05:00.800 can just push to production like this.
02:05:02.719 That's it. That's all you have to do.
02:05:04.960 Make sure this says external here. And
02:05:08.080 now let's go inside of the clients here.
02:05:10.239 And now we can finally click create
02:05:13.800 client. In here, go ahead and select web
02:05:16.960 application. And go ahead and call this
02:05:20.239 meet AI. And now in here, select add
02:05:24.800 authorized redirect URIs. And in here,
02:05:27.440 you can just copy this one.
02:05:33.599 Let's go here and let's add it here. So
02:05:36.159 double check the protocol and the port
02:05:38.080 and click create. And this will now show
02:05:41.199 you your client ID and your client
02:05:44.679 secret. So let's go ahead and add to
02:05:46.880 Google client
02:05:49.000 ID and Google client
02:05:55.000 secret. There we go. Make sure you have
02:05:57.920 both of them here and click okay.
02:06:01.760 And now you're ready to go inside of
02:06:04.000 your sign in view here. Copy the on
02:06:07.199 click. Go to
02:06:10.280 Google and add the Google provider here.
02:06:15.440 Go to the sign up view and do the same
02:06:19.159 thing. Now let's go ahead and try it
02:06:21.599 out. So I'm going to go ahead and click
02:06:24.080 Google. It doesn't matter from sign up
02:06:26.159 or from sign in. Let's click Google. And
02:06:28.800 let's wait a second.
02:06:30.960 This should uh open up the Google
02:06:35.719 login. Let me try refreshing or maybe
02:06:38.639 there is an error. Maybe we did
02:06:40.079 something
02:06:43.719 incorrectly. Well, we did something
02:06:46.320 incorrectly most certainly. And what I
02:06:49.360 don't like is that we are not getting
02:06:50.880 any Oops, I just clicked GitHub. Uh no,
02:06:53.760 no, no. I don't want to log in with
02:06:55.119 GitHub. So, basically, we are not
02:06:57.280 getting the errors here. So what I want
02:06:59.360 to do here is set error to be
02:07:03.400 null. And then in here I'm going to do
02:07:06.960 on
02:07:09.320 error. How about we let's standardize
02:07:13.280 this, shall we? So okay, go inside of
02:07:16.960 sign up view right
02:07:19.719 here and you can copy the onsubmit
02:07:23.360 method entirely.
02:07:26.800 Paste it below itself and rename this on
02:07:30.760 social. Change this to be provider.
02:07:34.719 Change it to GitHub or Google. Set the
02:07:39.920 error to null and the pending to true.
02:07:42.159 Change this from email to social and
02:07:45.040 simply pass the provider. As you can see
02:07:47.599 the
02:07:48.840 provider it has to be sign in dosocial.
02:07:52.400 So even in the sign up view you have to
02:07:54.719 use the sign in for the onsocial. So the
02:07:57.599 provider type can be all of these as you
02:08:00.800 can see when I hover it's an
02:08:03.079 enum not an enium sorry it's this type
02:08:06.239 of type. So this actually matches so I
02:08:09.360 can just set the provider prop here and
02:08:11.920 the error goes
02:08:14.040 away. And in here you can set the
02:08:17.840 pending false here and set the error
02:08:19.599 message here like this. And then you can
02:08:21.280 use the on social in the buttons below.
02:08:25.119 So let's try it like that. Or sign in
02:08:27.199 with and let's
02:08:29.960 do on social
02:08:33.880 Google and in
02:08:36.040 here on social
02:08:39.480 GitHub. So now what I would like to do
02:08:42.000 is copy the on social here. Go to sign
02:08:45.040 in view here.
02:08:51.199 and keep it like
02:08:53.320 this. And then just change these as
02:08:56.599 well. So on social
02:09:01.159 Google and in here on social GitHub. So
02:09:06.560 now the reason I did this is because
02:09:08.239 when you click on Google, it should now
02:09:10.320 say provider not found. That's because
02:09:12.719 we actually forgot to add the provider
02:09:15.199 here. So let's quickly do that.
02:09:18.480 Let's add
02:09:19.560 Google to our alph.ts where we just
02:09:23.119 added GitHub. So, let's just add Google
02:09:25.119 below this. And as always, let's double
02:09:28.000 check
02:09:29.800 this. So, Google client
02:09:32.360 ID.
02:09:34.280 Oops. So, copy
02:09:36.679 this, paste it
02:09:38.679 here, copy this, paste it
02:09:42.440 here. And now, let's go ahead and try
02:09:44.719 again. Google
02:09:47.280 There we go. Let's click on this one.
02:09:50.320 Let's click continue. And I should now
02:09:52.480 be logged in as John Doe. There we go.
02:09:55.520 So, what I want to do now is I don't
02:09:57.360 know if you've noticed, but even before
02:09:59.920 I selected my account, I already got
02:10:02.000 redirected to the root page. That's
02:10:04.400 probably because of the way this on
02:10:07.760 social
02:10:09.320 here handles the on success. So I think
02:10:12.639 on success here might be just
02:10:16.239 successfully making the oalf request. So
02:10:19.119 it already pushes me here which is not
02:10:21.119 good because at this point the user
02:10:22.639 would not be logged in. So what we can
02:10:25.679 do here is add a callback
02:10:27.960 URL like
02:10:29.960 this and I just want to confirm. Let me
02:10:33.679 just check inside of better
02:10:36.440 out. Can I search for call back
02:10:44.280 URL? As you can see, we can also do it
02:10:47.040 like
02:10:48.760 this. I'm trying to find the fallback
02:10:53.440 URL. Okay, so we can use relative
02:10:55.920 imports, relative URL. I was wondering
02:10:58.239 if I need to do the whole local host or
02:11:00.239 not. And then I'm going to remove the
02:11:02.800 router.push from here. So that's in the
02:11:04.719 signin view.
02:11:06.560 Let's do the same thing for the sign up
02:11:08.079 view. So remove router.push here and add
02:11:11.280 call back URL to forward slash. And how
02:11:15.360 about we do the same thing for sign up
02:11:17.679 with
02:11:19.000 email. So we can add call back URL. So
02:11:22.159 we don't have to do router.push which
02:11:24.400 means we don't have to use router which
02:11:26.719 means we don't need the next navigation
02:11:28.760 import. And do the same thing in the
02:11:30.880 signin
02:11:31.880 view. So in the onsubmit sign in with
02:11:35.280 email remove router.push and add a call
02:11:38.000 back URL to be a forward slash remove
02:11:41.280 use router and remove next
02:11:44.840 navigation. So let's go ahead back to /
02:11:47.840 signin now and let's try logging it with
02:11:51.880 GitHub. So I should now only be
02:11:54.199 redirected in the call back. There we
02:11:56.960 go. Perfect. So I think that now we can
02:12:00.079 officially mark this as completed. Now
02:12:02.880 let's learn how to protect our non pages
02:12:06.159 here. So I think we can finally now go
02:12:08.639 inside of source app folder page and
02:12:11.280 remove this entire
02:12:16.360 thing div homepage. We can remove all of
02:12:20.480 this
02:12:23.400 imports. The only thing I would actually
02:12:26.000 like to leave here. Yeah, let me just
02:12:28.400 revert it a bit. Sorry for telling you
02:12:29.920 to remove it. I mean, I just I'm just
02:12:31.599 using it so I have so I can copy these
02:12:33.360 two
02:12:34.199 things. This is the only thing I care
02:12:41.800 about. There we go. So I just want this
02:12:44.480 to be here which means that uh I need to
02:12:47.520 get data session from out client use
02:12:53.320 session and I need to mark this as use
02:12:57.400 client and I need to import button from
02:13:01.760 components UI
02:13:03.560 button and in
02:13:05.719 here if there is no session
02:13:10.440 return loading
02:13:14.520 Okay. So, make sure you've marked this
02:13:16.639 as use client and I just want this. I
02:13:18.400 don't need the entire form or anything.
02:13:21.360 So, the problem now is uh as you can
02:13:24.639 see, well, I didn't really handle this
02:13:26.320 correctly, right? Because there is no
02:13:28.560 session here. So, I just return loading.
02:13:31.840 But I actually want to handle it a
02:13:33.280 little bit differently. So, this is how
02:13:34.560 we would do it. Let's go inside of
02:13:36.639 source modules and I will just create a
02:13:38.880 home module.
02:13:41.360 And inside of the home module, I will
02:13:43.920 create a UI folder. And then I will
02:13:46.560 create views. And this will be a home
02:13:51.159 view.tsx. So that will actually be this
02:13:53.760 page
02:13:55.079 here. Let's paste it here. And let's
02:13:57.520 just export con home view here. And we
02:14:01.679 can remove the default export entirely.
02:14:04.719 So this can be the use client part right
02:14:08.239 in our home module here. home view. So
02:14:12.159 now we are free to use our server
02:14:14.960 component here as an actual server
02:14:17.199 component. So we can remove everything
02:14:20.040 here and just use it as a server
02:14:23.239 component. So inside of here what we
02:14:26.000 would do is we would return home view
02:14:29.920 like this. So right now it should work
02:14:33.119 exactly the same. It's displaying
02:14:34.719 loading because I didn't do any out here
02:14:40.239 to I didn't I I basically if there's no
02:14:42.719 session I just say it's loading right so
02:14:46.000 what I want to do instead is use a
02:14:48.159 server component to redirect the user
02:14:51.840 back to my AL pages and the reason I
02:14:54.560 want to use a server component for that
02:14:56.239 is well so we learn how to use the
02:14:58.560 server uh util of better AL and simply
02:15:02.320 because it's better to redirect direct
02:15:03.840 from the server side than from a client
02:15:05.840 component. If we already have server
02:15:08.400 components, right? Why not use them to
02:15:10.800 for what they're good
02:15:12.840 at? So let's go ahead and get the
02:15:16.159 session here using await which means
02:15:18.880 that we have to turn this into an
02:15:20.400 asynchronous component. Let's import out
02:15:23.679 from lib out. So not outclient out
02:15:26.639 directly API.get session. And inside of
02:15:30.560 the session here we have to pass the
02:15:32.360 headers. So this can be await headers
02:15:35.280 from next headers and execute them. It's
02:15:38.639 a function. Make sure you don't have use
02:15:41.440 client here in the page. And then if
02:15:44.159 there is no session redirect using next
02:15:48.040 navigation to
02:15:51.159 /signin. There we go.
02:15:54.480 So now you don't really have to worry
02:15:56.719 about this because never will a user see
02:16:00.800 the home view client component even
02:16:03.440 being rendered if they don't have a
02:16:05.679 session. So yes, this is technically
02:16:08.159 correct way of doing it now because in
02:16:10.800 here we are going to detect that there
02:16:12.719 is no session sooner than we detected
02:16:15.119 that there is no session here because
02:16:17.360 this is a fetch request whereas this is
02:16:20.400 an actual deconstruction of the header
02:16:23.239 parameters. So if I try manually going
02:16:26.320 to logos 3000 now you can see that I am
02:16:29.040 redirected back. I cannot see the
02:16:31.280 homepage anymore. But if I click on
02:16:34.160 GitHub for example, let's wait. Let's
02:16:37.478 wait. There we go. Logged in as Antonio.
02:16:41.040 So now I can visit the homepage. What I
02:16:44.398 want to do now is I want to do the
02:16:47.280 reverse of this. So I'm going to go
02:16:49.840 ahead and just copy this pattern and I'm
02:16:53.359 going to go inside of source app out
02:16:56.558 signin page.tsx dsx and I'm going to add
02:16:59.920 this here and turn this into an
02:17:01.599 asynchronous method and I'm going to
02:17:03.599 import out from lib out and I'm going to
02:17:06.478 import headers from next
02:17:09.879 headers and I'm going to import redirect
02:17:13.200 from next navigation and in here I will
02:17:15.359 do the opposite logic if the session
02:17:18.398 already exists so what I can do is turn
02:17:21.040 it into a boolean by adding double
02:17:23.359 exclamation points this will redirect
02:17:25.840 the user back to the root page
02:17:28.240 or to the homepage.
02:17:30.359 Right? So now I will just indent this
02:17:33.638 properly. I will copy this again. I will
02:17:36.240 go instead of sign up here and I will do
02:17:38.240 the same thing
02:17:39.879 here.
02:17:42.040 Async out lib
02:17:45.080 out
02:17:47.799 headers.
02:17:49.959 Whoops. Next. headers and
02:17:56.359 redirect. There we go. Like
02:17:59.318 this. So now if you are logged in like I
02:18:03.760 am, you should not be able to visit
02:18:06.000 slashsign in for example. You can see
02:18:08.398 I'm immediately redirected
02:18:11.240 back to my homepage. But if I sign out
02:18:16.799 uh oh yes, I didn't properly do this. So
02:18:21.478 uh this will not actively look for my
02:18:25.599 session. So that's why this did not
02:18:27.439 redirect after I signed out. But
02:18:30.080 thankfully that's why our sign out
02:18:32.398 offers us
02:18:34.478 uh a on success fetch options which is
02:18:37.519 an
02:18:38.439 object on
02:18:40.599 success and then in here we can do
02:18:43.478 router which we have to add con router
02:18:47.519 use router from next navigation and let
02:18:50.080 me just open this so you can see better
02:18:52.478 how it looks
02:18:56.439 like. So fetch
02:18:59.879 options
02:19:02.359 router.push sign
02:19:08.760 in like
02:19:13.879 this. So let's try this again. So I can
02:19:17.280 now visit sign up and visit sign in. But
02:19:20.638 I cannot visit the homepage. I
02:19:22.959 immediately get redirected back here.
02:19:25.120 But if I log
02:19:26.439 in, I should get redirected back to the
02:19:30.359 homepage. When I am logged in, I cannot
02:19:33.679 visit sign
02:19:35.240 in and I cannot visit sign up. Both of
02:19:39.519 them are protected. But if I sign out, I
02:19:42.398 should now get redirected. There we go.
02:19:45.760 So that's how we're going to use this
02:19:47.519 onsuccess method here. Perfect. Uh, so
02:19:51.760 you probably have a question here.
02:19:55.200 Um, can we somehow reuse this? Can we
02:20:00.000 somehow put this maybe in a layout? And
02:20:02.240 then this way we can protect the entire
02:20:04.479 AL route group. I please do not do that.
02:20:08.240 Um, it is much much safer to explicitly
02:20:10.960 protect routes rather than use the
02:20:13.359 middleware or try and find a way to
02:20:16.720 protect multiple things at once. It's
02:20:18.800 always better to have explicit
02:20:20.479 protection. there's been a number of
02:20:22.160 issues in the middleware in the layout
02:20:25.200 uh and those were security issues. So
02:20:27.359 basically people were able to bypass
02:20:29.120 middlewarees and bypass the layout
02:20:31.160 protection. But the thing is uh you you
02:20:34.640 never should have relied on things like
02:20:36.880 that. So using out in the middleware or
02:20:39.120 in the layout is not inherently wrong if
02:20:41.760 you want to improve user experience, if
02:20:43.520 you want to show them, hey, you're not
02:20:45.040 logged in. So, it's not wrong to do
02:20:47.439 that, but that shouldn't be your last
02:20:49.840 line of defense, right? You should
02:20:51.600 always have another explicit redirect in
02:20:55.200 the actual page you're doing. In our
02:20:57.520 case, we don't even need these redirects
02:21:01.359 because we're going to be implementing
02:21:03.040 TRPC in this tutorial and we're going to
02:21:05.200 have protected procedures. So, our
02:21:07.520 entire backend and API will be strictly
02:21:10.399 protected. The only reason I'm even
02:21:12.720 doing this redirects are for good user
02:21:15.200 experience, right? So, if you're asking,
02:21:17.840 can I use the middleware? Can I use the
02:21:19.600 layouts, you probably can. There's
02:21:21.359 probably documentation, but I would not
02:21:23.600 suggest doing that because people then
02:21:26.000 uh completely avoid doing any kind of
02:21:28.640 actual authentication protection. So, I
02:21:31.840 will be teaching direct explicit uh
02:21:34.479 authentication like this in
02:21:36.760 pages. Great. So now that we have that
02:21:40.160 ready, what I just want to do is add the
02:21:43.520 icons here and also you know just for I
02:21:46.479 want to check if my actual uh normal
02:21:49.520 registration is working. So let's try
02:21:53.080 Johndemo.com
02:21:55.960 password. I want to see if these things
02:21:59.359 are working or not. Let's see. So, looks
02:22:02.080 like I was uh registered, but it did not
02:22:06.000 redirect me. Only once I refresh did it
02:22:10.160 redirect me. That's interesting. Okay,
02:22:12.960 so looks like that in my This is why
02:22:15.359 it's always good to test. So, go inside
02:22:18.479 of your sign up view here. And to fix
02:22:20.600 that, you should go inside of uh sign up
02:22:23.600 by email here. You can leave the
02:22:25.760 callback URL to be this. But looks like
02:22:28.000 we are going to need the router which we
02:22:31.040 removed. So
02:22:33.240 const router use router from next
02:22:37.399 navigation. Let's go ahead and add it
02:22:40.840 here and simply on success after set is
02:22:45.280 pending router.push to the root page
02:22:48.080 like this. And you don't need to add it
02:22:50.800 for the social login because that seems
02:22:52.720 to be working correctly.
02:22:56.399 Perfect. So that will now work. Go
02:22:58.479 inside of sign in and you have to do the
02:23:00.800 same
02:23:05.640 thing. Next
02:23:09.080 navigation. Go ahead and add the router
02:23:13.479 here. Oops.
02:23:18.800 And in the normal onsubmit
02:23:21.880 here do router
02:23:25.080 push and go
02:23:27.319 here like
02:23:29.640 this. So I think that now this should be
02:23:33.040 working. So if I sign out here and if I
02:23:35.359 go into
02:23:36.600 johndemo.com and password and sign in I
02:23:40.479 should get redirected and I am perfect.
02:23:43.520 If I go inside of sign up here and try a
02:23:45.920 new
02:23:52.200 one and sign in, I should get redirected
02:23:55.600 as well. There we go. Looks like
02:23:58.880 everything is working nicely. GitHub
02:24:01.520 will use the call back and my social and
02:24:05.520 my credential will use the router push.
02:24:08.800 This seems to be working just fine.
02:24:11.040 Perfect. All that's left to do is to add
02:24:13.280 the icons and we can close this chapter.
02:24:16.160 So go ahead and do npm install react
02:24:19.240 icons d- legacy here deps. The reason
02:24:23.200 I'm adding these icons is simply because
02:24:25.600 they have Google and GitHub icons. If
02:24:28.640 you're wondering about the version of
02:24:30.080 this
02:24:33.160 package, it is 5.5.0.
02:24:37.120 Let's go inside of the signin
02:24:39.240 view and let's import FA GitHub and FA
02:24:44.280 Google from React
02:24:47.800 icons. Copy this immediately inside of
02:24:50.560 the sign up
02:24:55.160 view. Go back inside of the signin view.
02:24:58.800 Find your GitHub
02:25:02.200 button and add FA GitHub here.
02:25:07.359 and replace the Google text with FA
02:25:12.600 Google. And then do the same thing.
02:25:15.439 Let's just see what the error is about.
02:25:17.120 Oops. Slash FA. That's the full import.
02:25:20.960 Same thing here. /ash
02:25:23.720 FA. Go ahead and find the Google here or
02:25:28.000 GitHub. FA
02:25:32.280 GitHub and FA Google
02:25:36.520 here. And there we go. Now we have nice
02:25:39.840 icons and everything is working. Social
02:25:42.680 login, redirects, outs, routes are
02:25:45.800 protected, everything is working just
02:25:48.080 fine. Amazing, amazing job. So we
02:25:50.720 learned how to protect non-out pages.
02:25:52.640 And now let's go ahead and merge this
02:25:54.399 pull request. So what I'm going to do is
02:25:57.280 the following. I have nine unsaved
02:26:00.640 changes
02:26:01.720 here. I mean uncommitted changes. So I'm
02:26:04.640 going to do is I'm going to click on my
02:26:06.000 branch here. I will click create new
02:26:09.040 branch and I will call this 05
02:26:12.560 uh authentication socials. And I will
02:26:15.359 just confirm that that's the name. Here
02:26:18.479 it
02:26:20.600 is. I will add all of my changes. Just
02:26:23.840 confirm you are on the new branch. I
02:26:26.240 will add all changes. So now they become
02:26:28.479 staged changes and I will add 05
02:26:31.720 authentication socials and I will click
02:26:34.960 commit and publish
02:26:37.800 branch. Now we can go to
02:26:41.160 GitHub right
02:26:43.240 here and we can open this pull request.
02:26:47.680 Let's create the pull request here. And
02:26:50.800 let's wait for our AI reviewer to review
02:26:53.840 our
02:26:56.120 code. And here we have our code summary.
02:26:59.840 So new features. We added social login
02:27:02.560 options via Google and GitHub on sign in
02:27:05.520 and sign up pages. We have introduced a
02:27:08.080 new home view displaying user
02:27:09.600 information and sign out functionality.
02:27:12.560 We improved authentication flow with
02:27:14.560 serverside detection and automatic
02:27:16.880 redirects for authent authenticated
02:27:19.040 users. We have updated UI to use icons
02:27:22.720 to use icon buttons for social login
02:27:25.560 options. So in here of course we have a
02:27:28.319 more detailed walk through and we also
02:27:30.880 have a very big sequence diagram
02:27:33.439 explaining how our new session detection
02:27:35.840 works, how our social login works. So
02:27:38.720 you can pause and take a look at this if
02:27:40.399 you are interested or need further
02:27:42.319 explanation about
02:27:43.720 that. Now in here we have some usual
02:27:46.399 comments. Uh code rabbit uh well very
02:27:50.080 intelligently suggests that we should
02:27:52.160 add a runtime validation for required
02:27:55.160 environment variables. So if you want to
02:27:57.760 yeah you can go ahead and you know
02:27:59.600 implement this kind of get environment
02:28:01.359 variable function which will check if it
02:28:03.200 doesn't exist and then throw an error on
02:28:05.920 time. Um, but I I'm pretty confident in
02:28:09.439 doing it this way. Um, I don't think
02:28:12.319 there's anything we need to change
02:28:14.200 here, at least not for, you know,
02:28:16.640 development here. Uh, in here, I'm not
02:28:19.359 exactly sure that we use invalid fetch
02:28:22.399 options on success. Um maybe this was in
02:28:26.399 the previous versions of better out but
02:28:28.399 in the newer versions of better out I'm
02:28:30.800 pretty sure
02:28:32.359 that sign out
02:28:35.240 here offers fetch options on success. So
02:28:39.920 we are definitely doing a proper
02:28:43.280 redirect here. So that's
02:28:45.479 fine. Uh so I will resolve this
02:28:49.160 conversation. Now in here it is telling
02:28:52.000 us that on social success handle should
02:28:54.800 redirect and this is a completely valid
02:28:57.920 uh you know thing to to comment on. I'm
02:29:00.880 pretty sure a human reviewer would
02:29:02.800 notice that that's missing here as well.
02:29:05.120 That's because we noticed that when
02:29:07.200 using social it is smarter to rely on
02:29:09.840 the call back URL rather than the
02:29:12.640 router. push in the on success because
02:29:14.720 the on success with the social sign in
02:29:17.439 is you have successfully sent a Oout
02:29:21.359 request but you you were not actually
02:29:24.000 authenticated just yet that's why it's
02:29:26.560 better to use callback URL so this is
02:29:28.479 also fine I will resolve this and in
02:29:31.600 here uh I don't think it has the new API
02:29:36.080 headers are now asynchronous this was a
02:29:38.800 recent change in nextJS so that is okay
02:29:42.000 as Well, but still uh very very smart
02:29:45.840 suggestions. It's good to have a sanity
02:29:48.000 check on our changes here. So, I will
02:29:50.960 just resolve everything. There we go.
02:29:53.760 Let's go ahead and merge
02:29:55.479 this. Confirm
02:29:58.120 merge. And then let's go back here.
02:30:00.960 Let's go inside of main. Again, you can
02:30:03.200 use main or you can use origin main. It
02:30:06.240 won't matter because you will click on
02:30:08.160 this little button here and you will
02:30:10.479 push and pull commits from origin main.
02:30:13.359 And this way if you go ahead and look at
02:30:15.680 your graph you will see that you have
02:30:17.840 just merged 05 authentication socials
02:30:21.200 into your main branch here. And of
02:30:24.479 course you can check it yourself. For
02:30:26.080 example go inside of app page and in
02:30:29.280 here we have the redirect which we just
02:30:31.520 developed in that branch. Amazing
02:30:34.080 amazing job. That marks the end of this
02:30:36.160 chapter and see you in the next
02:30:39.000 one. In this chapter, we're going to go
02:30:41.760 ahead and develop the dashboard sidebar.
02:30:44.560 This will include creating the layout
02:30:46.560 module, the actual sidebar component,
02:30:49.120 modifying the global CSS to obtain our
02:30:52.080 theme and then using those new themes to
02:30:55.439 fix the gradient colors in our
02:30:57.439 authentication views. So, our sidebar
02:31:00.399 will look something like this. a logo at
02:31:03.600 top, meetings and agents items here, and
02:31:07.439 then an upgrade item here. Down here,
02:31:10.640 we're going to have the currently logged
02:31:12.399 in user and the drop down for the user
02:31:14.560 to log out. Later, this dashboard
02:31:18.640 sidebar will also have the free trial
02:31:21.520 status, but it doesn't make sense to
02:31:23.280 develop it now because we don't have any
02:31:25.280 data to work with. So, let's start with
02:31:28.399 creating the actual dashboard layout.
02:31:31.439 So, as always, just make sure you have
02:31:33.200 your app running, npm rundev, and let's
02:31:37.359 go ahead and check out how our app
02:31:39.200 currently works. So, right now, go ahead
02:31:41.520 and log in using either a social
02:31:43.760 provider or email and password
02:31:46.520 credentials. And you need to be on your
02:31:49.359 dashboard page. So, basically, this page
02:31:51.600 with the big sign out button, which
02:31:53.680 tells you logged in as whoever you're
02:31:56.399 logged in with. So, that is currently
02:31:59.200 displayed.
02:32:01.280 on this route right here, localhost
02:32:04.720 3000, just the root page. And it's this
02:32:07.280 page right here, the home view. Right?
02:32:10.080 So, what we have to do now is the
02:32:11.760 following. Inside of your app folder, we
02:32:14.080 are going to create a route group called
02:32:17.640 dashboard. And since you've already
02:32:20.840 learned, whenever you create a new
02:32:23.040 folder in parenthesis inside of the
02:32:25.120 Nex.js GS app folder. That means this is
02:32:28.720 not a part of the URL. It is simply a
02:32:33.040 grouping folder. And what you can do is
02:32:36.720 you can actually drag and drop your main
02:32:39.920 root page tsx and put it inside of here
02:32:43.359 like this. If you're being asked to
02:32:45.600 update the imports, you can select yes.
02:32:48.240 If you still end up with one unsaved
02:32:50.479 file, it's most likely the next types
02:32:53.439 app file. You can just go inside and
02:32:55.680 click save and close it. And then make
02:32:58.160 sure you close the next folder so you
02:33:00.560 don't accidentally continue developing
02:33:02.520 here. The next folder uh restarts and
02:33:06.160 rebuilds every time you do npm rundev.
02:33:08.560 So no worries. Even if you've messed
02:33:10.640 something up, you can just delete this
02:33:12.800 folder if you want to and just restart
02:33:15.760 your server and it's going to be
02:33:17.640 rebuilt. It's not going to affect the
02:33:19.840 actual production of the app. So what
02:33:22.319 we've done now is we moved our
02:33:25.240 page.tsx from the app folder into the
02:33:28.520 dashboard route group. So what changes
02:33:32.160 now? Well, absolutely nothing. But what
02:33:35.760 we can now do is we can create a layout
02:33:39.200 which is specific for this dashboard
02:33:41.840 route group. So we don't have to use
02:33:45.520 this global layout here, right? Because
02:33:48.960 this is the root layout. This is
02:33:50.479 something else. We don't want to add the
02:33:52.319 sidebar here because I don't want to
02:33:54.960 have my sidebar active at all times. I
02:33:57.920 only want it active for sites or routes
02:34:02.080 which belong in the dashboard route
02:34:04.240 group. So that's why we did this
02:34:06.359 decision. Let's go inside of here and
02:34:08.640 let's quickly create a layout inside of
02:34:12.000 here. Simply pass the children. And now
02:34:16.240 let's go ahead and create the interface
02:34:19.000 props children react react
02:34:23.640 node. Go ahead inside of here and the
02:34:27.359 structure the
02:34:30.040 children. And still nothing should
02:34:32.960 change because we don't add any new
02:34:35.200 styles to this layout. But you should
02:34:37.920 still test it just to confirm you didn't
02:34:40.399 break anything.
02:34:42.319 So what we're going to do now in the
02:34:44.240 layout is the following. We're going to
02:34:46.880 go ahead and change this to be a sidebar
02:34:49.720 provider from components UI sidebar. So
02:34:53.200 yes, we also added the sidebar
02:34:55.200 components when we added chats and UI.
02:34:57.840 Make sure to double check that you have
02:34:59.600 the sidebar component in your source
02:35:01.600 components UI sidebar. If it's missing,
02:35:04.479 make sure to revisit chapter one where
02:35:08.080 we actually uh set up Shad and UI and
02:35:12.399 added
02:35:14.520 components. Great. So now we're going to
02:35:17.600 go ahead and do the following. We are
02:35:19.920 going to wrap our children inside of a
02:35:23.760 main and give the main a class name of
02:35:27.319 flex, flex column, height of screen,
02:35:31.520 width of screen, and background color of
02:35:35.640 muted. And then we're going to go ahead
02:35:38.479 and create a dashboard sidebar
02:35:43.720 component. This will be created and
02:35:46.080 maintained inside of the modules. So,
02:35:48.720 let's go ahead and create a dashboard
02:35:51.359 module here. Let's go ahead and create
02:35:54.040 UI. And let's go ahead and create
02:35:56.359 components. And inside of here,
02:35:59.120 dashboard dash
02:36:03.160 sidebar.tsx like this. Go ahead and mark
02:36:06.399 this as use client. And now, let's go
02:36:08.960 ahead and import everything we need from
02:36:11.040 components UI sidebar. So, the same path
02:36:13.920 as this one. sidebar, content, footer,
02:36:17.439 group, group content, header, menu, menu
02:36:20.560 button, and menu item. Just like that.
02:36:24.560 Now, let's define our first section of
02:36:28.160 items here. So, it's going to be an
02:36:30.240 array of items which have an icon video
02:36:33.880 icon, a label, which will say meetings,
02:36:38.080 and an href which will be the actual
02:36:40.319 path / meetings.
02:36:43.840 Then we're going to have an icon bot
02:36:46.160 icon from Lucid React label of agents
02:36:50.880 and an href of forward slash
02:36:54.920 agents. And then let's go ahead and copy
02:36:57.439 this, paste it, and rename it second
02:37:01.399 section. This one will just have one
02:37:03.840 item star icon from Lucid React and the
02:37:07.359 label upgrade and an href forward
02:37:10.399 slashupgrade.
02:37:12.479 Make sure you have added all of these
02:37:14.479 icons from Lucid React
02:37:16.439 here. And now we're going to go ahead
02:37:18.560 and render them so that they display
02:37:21.600 just like
02:37:23.240 this. Let's go ahead and back inside of
02:37:25.600 the layout. And actually, I can't really
02:37:28.640 import anything yet. I first have to
02:37:30.560 develop at least something. So, let's
02:37:32.240 export con dashboard
02:37:35.880 sidebar. And let's go ahead and return a
02:37:39.120 sidebar component. Then a sidebar
02:37:43.000 header and give the sidebar header a
02:37:45.840 class name. Next text sidebar
02:37:49.080 accent dash
02:37:51.560 forground. And inside of here a link
02:37:55.200 from next link. Make sure you don't
02:37:58.399 accidentally import it from Lucid React.
02:38:03.120 Give this link an href of a forward
02:38:06.479 slash and give it a class name of flex
02:38:09.560 items center gap 2 px2 and padding top
02:38:14.080 of two. Inside of the link render an
02:38:18.439 image from
02:38:20.920 next forward slash
02:38:23.479 image and give it an href of /lovg.
02:38:28.479 Basically the same thing that we do in
02:38:30.479 our sign up and sign in
02:38:33.560 views logo SVG. In here we used a normal
02:38:37.520 image element because we needed to
02:38:39.280 position it uh and style it a certain
02:38:42.160 way. But in here we can use the
02:38:44.080 optimized image component from
02:38:46.520 Nex.js. Now go ahead and give it a
02:38:48.840 height of 36 and a width of 36 and an al
02:38:55.120 of logo or meet AI whatever you
02:38:59.000 want and let me just see it's not href
02:39:02.000 it's a source okay and now we can
02:39:05.359 already import this in the layout so
02:39:07.200 let's add that so we have one less
02:39:09.800 error and you should already start
02:39:12.000 seeing the development here make sure
02:39:14.240 you're not zoomed in too much as it will
02:39:16.640 probably collapse apps on mobile. So,
02:39:18.399 make sure you are in the desktop
02:39:20.439 view. Great. So, we now have that. And
02:39:24.720 let's add a paragraph here. Meet AI or
02:39:28.800 the name of your app. And add a class
02:39:31.600 name here, text to Excel, and font
02:39:35.479 semibold. There we go. We have our text
02:39:38.080 here now.
02:39:39.479 Perfect. Now, let's go below this and
02:39:42.479 add a class name div with a class
02:39:45.640 namex4. and py of two and inside a
02:39:50.359 separator. There is a dash uh a sidebar
02:39:54.399 separator component as
02:39:57.000 well like this. But um I had some
02:40:01.840 problems with it. Maybe it's something
02:40:04.160 uh the way I'm using it. It always
02:40:07.319 overflow here for some reason. So that's
02:40:10.399 why I'm not using it in case you were
02:40:12.160 wondering. And let's go ahead and give
02:40:14.560 the text uh the separator a class name
02:40:17.200 opacity
02:40:21.080 10 and a text
02:40:24.600 of hex color
02:40:27.640 5D 6B
02:40:31.720 68. After you've done that, go ahead and
02:40:34.319 save. And I'm not even sure if you will
02:40:37.520 see this because it's extremely
02:40:39.840 extremely thin. And I can barely see it,
02:40:42.240 but you know, just for your sanity, you
02:40:44.399 can
02:40:45.880 add black. Can you do that text
02:40:50.200 black? Or maybe let's
02:40:52.920 see. Um I'm I'm trying to make sure this
02:40:56.399 is actually
02:41:01.080 visible. Uh let me just see. Opacity 10.
02:41:04.720 How about I add
02:41:06.120 opacity 100? There we go. Okay. So yeah,
02:41:09.520 it's definitely here. Bring it back to
02:41:12.960 what we've wrote here. U the reason I'm
02:41:15.600 doing it like this where it's barely
02:41:17.040 visible is because later we are going to
02:41:18.960 obviously inverse these colors. So this
02:41:21.280 is how it's going to be visible.
02:41:22.800 Obviously on a white background you can
02:41:25.120 barely see it but later when we inverse
02:41:27.200 the colors it will be it will have more
02:41:29.640 sense. Great. So now let's add a sidebar
02:41:34.080 content. sidebar group, sidebar group
02:41:39.319 content, and sidebar menu
02:41:43.000 here. Inside of here, map the first
02:41:46.319 section of our items. So, get the
02:41:50.000 individual item and go ahead and render
02:41:54.240 sidebar menu item here.
02:41:57.680 Go ahead and give it a key of item
02:42:01.800 href. And inside render a sidebar menu
02:42:07.000 button. And inside of here we are going
02:42:10.319 to add a link
02:42:13.319 component. Uh we already have it. Great.
02:42:16.000 And let's add an href here to be item
02:42:19.200 href.
02:42:21.760 And then what we can do is add a span
02:42:27.080 here item label and give this a class
02:42:31.200 name text small font medium and tracking
02:42:37.080 type. Let me just indent this. And now
02:42:40.640 you should see meetings and agents text
02:42:43.439 here. And when you click on them, they
02:42:45.680 should lead you to 404 because we don't
02:42:48.080 have them yet. But if you take a look at
02:42:50.160 your URLs, they should be correct. So
02:42:53.520 what's missing is to uh render the
02:42:56.800 actual icon here. So let's go ahead and
02:42:59.840 do the
02:43:01.560 following. Um what we can
02:43:05.560 do, let me try and do this. Can I just
02:43:10.040 use this item icon and render it like
02:43:14.040 this? I can. There we go. Like that.
02:43:16.720 Let's just go ahead and style it a bit
02:43:19.640 better. So, I'm going to give this a
02:43:22.000 class name of size five. Like
02:43:27.800 this. And this should just make it a
02:43:30.240 little bit smaller, but you can see it's
02:43:32.240 still kind of uh messed up. Not exactly
02:43:35.120 behaving as we wanted to. Uh, and what I
02:43:39.280 actually want to do now before we do
02:43:42.000 anything else, before we fix this, uh,
02:43:45.680 is I want to go ahead and actually apply
02:43:50.080 the proper theme for our dashboard here.
02:43:54.240 So, let's go ahead and go inside of our
02:43:59.000 source app folder, globals.css.
02:44:05.120 And what I want you to do is I want you
02:44:07.040 to scroll down and find the root. Now be
02:44:10.640 careful because they have identical
02:44:13.439 variables for root and for dark. We are
02:44:17.680 not modifying dark. We are just
02:44:19.760 modifying the root. Okay. So the first
02:44:22.960 one you're going to modify in your root
02:44:25.439 is the primary color. Now, what I like
02:44:27.920 to do is I like to leave comments so I
02:44:30.399 know what I modified and I also add a
02:44:33.120 little explanation of what it is. This
02:44:35.040 one is pretty self-explanatory, but
02:44:37.040 still primary color, for example, the
02:44:40.319 color of our buttons. So, instead of
02:44:45.640 0.20500, we're going to set it 0.63, the
02:44:49.279 second value will be
02:44:51.800 0.1699 and the third value 149.21.
02:44:56.240 Make sure that you don't add any commas
02:44:58.160 here. This is not RGB. Okay. And right
02:45:01.840 now, what you will immediately notice is
02:45:03.760 that our buttons have a new color. So,
02:45:06.880 yes, now our button has a new primary
02:45:09.760 color. Previously, it was a black color
02:45:11.840 and now our button is this nice green
02:45:14.640 color matching our app. So, that's the
02:45:17.120 first thing I want us to change. And
02:45:19.720 now, make sure you're logged in and
02:45:22.000 seeing the sidebar. I want you to find
02:45:24.560 these sidebar elements here and let's
02:45:28.160 modify the sidebar one. So I will mark
02:45:30.479 this as sidebar background color so I
02:45:33.120 know what it is and that I've modified
02:45:35.120 it. It will be 0.2. The second value
02:45:38.560 will be
02:45:39.479 0.0283 and the third one
02:45:43.479 174.92. And you can already see the
02:45:46.080 background color has now changed. Below
02:45:48.880 that we have sidebar foreground which
02:45:52.319 will be sidebar text
02:45:54.359 color. Go ahead and change this to be
02:45:57.960 0.82
02:46:00.279 0.57 and
02:46:03.399 182.99. So now the text is more visible
02:46:06.560 towards this dark
02:46:09.160 background. We are going to leave the
02:46:11.200 primary and the primary foreground as
02:46:13.520 they are and go to sidebar accent. This
02:46:16.800 is sidebar active item background
02:46:20.439 color. And go ahead and change this to
02:46:23.040 be
02:46:24.359 0.34
02:46:26.600 0.0601. And the last one
02:46:30.120 171.21. And the last one we're going to
02:46:32.399 modify is the sidebar accent foreground,
02:46:35.520 which is basically sidebar active item
02:46:38.960 text
02:46:40.680 color. Go ahead and modify this to
02:46:43.800 0.34 0.06. 06. Uh my apologies. No, I I
02:46:48.560 I was reading the values from here. Uh
02:46:52.240 the sidebar active text uh color will be
02:46:56.160 1 0 0. A very simple one. So now that we
02:47:00.479 finally have our colors set, what we can
02:47:03.200 do is we can go back inside of the
02:47:04.960 dashboard sidebar and we can modify the
02:47:07.279 sidebar menu button to have some nicer
02:47:09.760 colors here. So go ahead and add a class
02:47:12.560 name here and import CN from lib utils.
02:47:16.800 This will allow us to dynamically change
02:47:19.279 class names if needed and also avoid any
02:47:21.840 merge conflicts. So this is the util
02:47:25.279 that was added with shad CN. I think
02:47:27.200 this was one of the first uh functions
02:47:29.200 we looked at once we added chaten and I
02:47:31.439 told you it was going to come in handy
02:47:33.040 later on. So CN util is a way you should
02:47:37.439 uh merge your class names, right? So the
02:47:40.560 way you use it is pretty simple. It can
02:47:42.479 accept an infinite amount of parameters.
02:47:44.640 So the uh it can be for example text
02:47:48.479 rows 500 and then the second parameter
02:47:50.880 background blue 500 or you can add all
02:47:54.880 of them in one parameter depending on
02:47:56.800 what you need. Right? So here's how I
02:47:59.680 like to use it. Um I like to reserve the
02:48:02.960 first parameter for my default classes.
02:48:05.359 So for example height 10 on hover
02:48:09.200 background linear to right /
02:48:15.160 klch give it a border border
02:48:19.160 transparent on hover border will have a
02:48:24.600 5B
02:48:26.120 6B 68
02:48:29.399 color divide it by 10.
02:48:33.439 We are continuing our and this is a
02:48:36.080 typo. It's not linear. It's
02:48:38.359 linear. Make sure that when you hover on
02:48:40.720 your class names, you can actually see
02:48:42.240 the tailwind. I mean the CSS. That means
02:48:45.600 it's a correct variable. And again, make
02:48:48.080 sure you have the tailwind CSS
02:48:50.880 intellense installed. So you can see
02:48:52.880 that. Let's continue. So from sidebar
02:48:57.040 accent, which we have now modified,
02:48:58.960 right? From 5% like this.
02:49:04.399 via 30% via sidebar color, but let's
02:49:09.680 reduce it for 50% opacity to sidebar
02:49:13.760 color, but let's reduce it for 50%
02:49:16.479 opacity as well. So now when you hover,
02:49:19.040 we have this nice effect. As you can
02:49:21.520 see, it's brighter here and then it goes
02:49:24.240 dark here. So it's a very cool looking
02:49:26.800 effect when we hover on our sidebar
02:49:28.880 items here like that. And let's go ahead
02:49:32.399 and also do one important thing. So the
02:49:34.520 reason our sidebar menu button looks
02:49:37.200 broken is because we forgot to add as
02:49:39.200 child here. Once you add that, there we
02:49:41.920 go. You will see how it becomes a uh
02:49:44.640 properly aligned and it's entirely
02:49:46.560 clickable, right? You don't have to
02:49:48.720 click directly on the label. Perfect. So
02:49:51.760 that is now added. Now uh what I also
02:49:57.200 want to do is the following. I want to
02:50:00.319 know if a certain route is active for
02:50:03.080 example. So the way we can do that is by
02:50:07.160 adding a const path name use path name
02:50:11.920 from next
02:50:13.880 navigation. Make sure to add this import
02:50:17.240 here. And then we can simply compare the
02:50:20.800 path name with the item href. So for
02:50:24.240 example I just added this. Obviously, if
02:50:27.600 I were just to add this type of class, I
02:50:29.920 wouldn't need the CN util. But since now
02:50:32.640 I'm going to add a comma here and add a
02:50:35.040 dynamic one, it makes sense. So if path
02:50:38.040 name is identical to the item href for
02:50:41.600 this specific item that we are iterating
02:50:43.960 upon, we can simply add a different
02:50:46.880 color background
02:50:49.720 linear to write OK
02:50:54.920 L. and then a
02:50:59.000 border 5 D 6B 68 / 10 like this. And we
02:51:08.080 can try it out. For
02:51:09.720 example, you can do you can comment this
02:51:13.120 out and then just set consp
02:51:15.800 name to be slash meetings and then you
02:51:20.720 will see that the meetings will kind of
02:51:22.640 be active like this. But
02:51:24.600 um I don't want it
02:51:27.479 exactly to be like this. Oh yes, because
02:51:30.160 we are missing one more prop here. So
02:51:33.279 let's add is active
02:51:35.240 here. Path name identical to item href.
02:51:39.520 There we go. So this is how it will look
02:51:43.040 like when meetings is selected, right?
02:51:45.439 Or if the agents is selected. Did I
02:51:50.080 write this properly? the agents forward
02:51:52.560 slash
02:51:56.920 agents. I'm expecting the agents to be
02:52:00.319 selected, but looks like um they are not
02:52:03.600 selected for some
02:52:05.399 reason. Uh let me just pause a bit and
02:52:07.920 debug to see what I'm doing
02:52:11.080 wrong. Oh well, I figured out what I'm
02:52:14.160 doing wrong. Uh I'm using a path name to
02:52:17.920 be like identical string but it's not
02:52:20.560 identical. It's missing a it has an
02:52:22.560 extra space here. So that's not the same
02:52:24.720 string. Yeah, there we go. Now it's
02:52:26.399 working. So that was the mistake. Great.
02:52:29.359 We can now remove the hard-coded path
02:52:31.680 name and make it dynamic like this. So
02:52:34.720 naturally none of these two will be
02:52:36.960 selected because we are on the root
02:52:38.640 page. And if you're wondering where is
02:52:40.640 the root page in the sidebar, we are not
02:52:42.399 going to have the root page. We are
02:52:43.920 later going to add a rewrite in the
02:52:46.080 nextjs config to always lead us to slash
02:52:50.240 slashmeings as the default page but we
02:52:53.040 don't need that now we are okay with
02:52:55.120 having this kind of root page for now uh
02:52:58.399 great so we have
02:53:00.920 this now what I want to do is I want to
02:53:03.920 add the second section and we can do
02:53:07.200 this quite easily here so what we need
02:53:09.840 is we need to copy the entire sidebar
02:53:12.680 group actually I think um let me just
02:53:15.840 see do we
02:53:17.080 copy the
02:53:19.640 entire yeah let's just copy the entire
02:53:22.640 sidebar group like this and let's paste
02:53:25.600 it below and let's just add second
02:53:30.399 section here. So a bit repetitive but
02:53:32.800 there we go. Now we have an upgrade
02:53:34.560 which is clearly separated here and in
02:53:37.600 between these two groups what we can do
02:53:39.600 is we can copy this
02:53:42.399 And we can add it
02:53:44.760 here. And there we go. Now we have this
02:53:47.600 kind of separator here as well. Um,
02:53:50.399 great. So that is now uh
02:53:54.040 semifinished. What I also want to do to
02:53:56.720 wrap up the chapter is implement the
02:54:00.160 user button. So the currently logged in
02:54:02.479 user. Right? So the way we are going to
02:54:05.439 do that is by going to the end of the
02:54:08.080 sidebar content and adding the sidebar
02:54:11.479 footer. Let's go ahead and give this a
02:54:13.760 class name of text
02:54:16.279 white. And let's go ahead and add a div
02:54:22.200 here with a class
02:54:25.319 name. Uh actually I don't think we need
02:54:29.520 this. We can just do normal user button
02:54:33.359 like this. So this is a component which
02:54:35.600 we're going to have to implement
02:54:38.200 now. Uh and actually we might call it
02:54:41.319 dashboard user button like this. So we
02:54:46.160 can go inside of a modules components
02:54:47.840 and create dashboard user
02:54:51.560 button.tsx because it's not exactly
02:54:53.439 going to be reusable anywhere other than
02:54:55.200 the dashboard. So in here what we're
02:54:58.240 going to do is we're going
02:55:00.600 to export const dashboard user
02:55:05.640 button return
02:55:09.479 div user
02:55:12.040 button and import dashboard user button
02:55:15.880 here from dot / user button is
02:55:18.560 completely fine because they are in the
02:55:19.920 same folder. So now here at the bottom
02:55:22.479 you should have user
02:55:24.520 button. In case this nextjs action
02:55:27.680 button is getting in the way, you can
02:55:29.760 actually click on it. You can click on
02:55:32.640 preferences here and you can change the
02:55:35.040 position for example to be bottom right
02:55:37.760 which will move it here which is okay
02:55:39.680 because we won't really have anything uh
02:55:41.760 here. So if you want to you can do that.
02:55:43.840 So you can clearly see the user button
02:55:45.520 here. Now let's go ahead and focus on
02:55:48.319 the dashboard user button and let's go
02:55:50.800 ahead and develop it. So what we have to
02:55:53.600 do inside of the dashboard user button
02:55:55.600 is get the data and is pending from out
02:56:00.840 client use session. Make sure you import
02:56:04.439 this. So if is pending or if there is no
02:56:10.279 data user we can just return
02:56:14.680 null like this. So for a split second
02:56:18.640 this will not be visible as you can see.
02:56:22.640 If you want to you can add a loading
02:56:24.640 indicator here however you prefer but
02:56:26.960 I'm completely okay for a split second
02:56:28.880 this just not existing until it loads.
02:56:30.640 I've seen that kind of behavior on a lot
02:56:32.560 of websites. So now let's go ahead and
02:56:36.319 do the following. We have to import
02:56:38.960 everything from drop-down menu. So let's
02:56:42.720 add all of these things. Drop-own menu
02:56:44.960 content item label separator and the
02:56:47.920 trigger from components UI drop-down
02:56:52.279 menu. So I'm going to encapsulate this
02:56:54.880 inside of the drop-down menu here. I
02:56:57.520 will add a drop-own menu trigger
02:56:59.520 component here. And I will give it a
02:57:01.840 class name rounded large border border
02:57:05.920 dash border with 10% opacity padding
02:57:09.600 three full width flex items center
02:57:15.279 justify between background white with 5%
02:57:19.760 opacity on hover background white with
02:57:23.040 10% opacity and overflow
02:57:25.880 hidden. And inside of here, what we are
02:57:28.560 going to do is the following. Let's just
02:57:31.439 leave the user button now and you will
02:57:33.200 see how it looks like. Right? You can
02:57:34.880 zoom in a little bit, but just make sure
02:57:37.120 your sidebar doesn't collapse if it's
02:57:39.200 hard for you to see. There we go. So now
02:57:42.319 what I want to do is I want to display
02:57:44.080 this user's image. So you can search for
02:57:47.359 data
02:57:48.439 user.image. And if we have an image, you
02:57:51.680 will display an avatar. If we don't, you
02:57:54.720 can just display null. We will actually
02:57:57.520 render something later. So for now,
02:58:00.000 let's go ahead and leave it like this
02:58:01.439 and add an avatar from components UI
02:58:03.840 avatar and add avatar image from
02:58:07.279 components UI
02:58:09.800 avatar. You can move this here as well.
02:58:12.960 You also have this installed when you
02:58:14.800 added chats UI. And the image will be
02:58:17.920 source data user image like this.
02:58:22.880 So since I've logged in with my uh
02:58:25.760 GitHub, you can see that I have an image
02:58:28.240 here. If you logged in using
02:58:29.960 credentials, you will most likely not
02:58:32.399 have an image here. So that's completely
02:58:33.920 normal. Don't worry. What I want us to
02:58:36.399 do now is implement a little component
02:58:39.200 which will be useful for us uh to create
02:58:43.840 uh placeholder images. It will be useful
02:58:46.800 for two reasons. for users who don't
02:58:48.640 have an avatar and second for our
02:58:52.040 agents, right? Our agents will be given
02:58:54.640 some kind of personality with a
02:58:56.319 generated avatar. So, let's go
02:58:59.720 ahead and go inside of components and
02:59:02.880 create a new f a new file called
02:59:06.439 generated-vatar.tsx. So, you don't have
02:59:08.080 to put this in the UI folder. I like to
02:59:10.640 keep chats and only stuff inside of
02:59:12.640 here. instead of the generated avatar
02:59:15.840 here, uh, we're going to have to install
02:59:18.800 two
02:59:20.120 packages. So, the first one will be at
02:59:24.160 dicebar-core
02:59:26.640 u, my apologies, forward slashcore, and
02:59:28.800 the second one will be at dice
02:59:32.200 bear. So, it's dice bear, not bar
02:59:36.439 slashcolction. Make sure to correct the
02:59:38.960 dice bear if you haven't. And I'm pretty
02:59:40.800 sure we need to add dash legacy pier
02:59:44.479 depths to avoid any errors. I will of
02:59:46.720 course show you the exact versions that
02:59:48.319 have been added to my package JSON
02:59:50.840 here. So let's go inside of package JSON
02:59:54.479 and let's go inside of there we go dice
02:59:58.399 pair. So 922 922 like
03:00:02.200 this. So now we can go back inside of
03:00:05.200 our generated avatar here and we can
03:00:07.840 import Oops. create avatar from dice
03:00:11.279 bear core and we are going to import two
03:00:14.000 collections from dice bear collection.
03:00:16.319 The first one will be bots neutral and
03:00:18.560 the second one will be initial initials.
03:00:21.359 So basically dice bear is an amazing
03:00:23.840 library uh which can you can either use
03:00:27.040 it with their JS API, their react API,
03:00:30.720 they have a bunch of solutions. They
03:00:32.880 even have an HTTP uh rest API, right?
03:00:36.240 But this one is um this one is cool
03:00:39.200 because it actually generates the SVG
03:00:41.600 without needing an internet connection.
03:00:43.359 So it's not going to generate any fetch
03:00:45.040 requests in our network to display these
03:00:47.279 avatars. And there's a bunch of
03:00:49.359 collections you can explore. You can see
03:00:51.760 there's a ton of them. Uh the ones I've
03:00:54.240 chosen here have a license which is free
03:00:57.680 for personal and commercial use. So
03:01:00.560 those are the initials and bots neutral
03:01:03.040 created by Pablo Stanley. So amazing
03:01:05.439 amazing libraries.
03:01:08.240 So after you've added this, let's go
03:01:10.319 ahead and import CN from lib utils and
03:01:14.160 let's import
03:01:15.800 avatar avatar fallback and avatar
03:01:20.279 image from add /components UI
03:01:25.479 avatar and in here create an interface
03:01:28.640 generated avatar
03:01:31.479 props seed will be a string class name
03:01:35.439 will be an optional string.
03:01:37.600 And the variant will either be uh well
03:01:41.200 you can just copy bots neutral or
03:01:45.120 initials like
03:01:47.160 this and then export con generated
03:01:50.640 avatar
03:01:54.439 here. Go ahead and dstructure the props
03:01:57.960 here. So that will be seed class name
03:02:01.120 and
03:02:02.520 variant just like that. and then define
03:02:05.840 the avatar here. So let avatar if
03:02:12.439 variant is equal to bots neutral avatar
03:02:17.040 will become create
03:02:19.319 avatar bots neutral and simply pass in
03:02:23.680 the seed.
03:02:27.240 Else
03:02:28.840 avatar will be create
03:02:32.279 avatar
03:02:34.600 initials. Pass in the seed, pass in the
03:02:37.920 font
03:02:39.960 weight and pass in font
03:02:43.000 size like this.
03:02:47.439 Now that you have the avatar, what you
03:02:50.319 can do is you can
03:02:52.359 return
03:02:54.040 avatar avatar
03:02:56.600 image and avatar fallback
03:02:59.800 here. Give the image a source of avatar
03:03:03.600 to data uri and an out of avatar.
03:03:07.760 And for the
03:03:10.120 fallback we can just use seed dot
03:03:14.160 character at first one to
03:03:18.520 uppercase and give the avatar a class
03:03:21.200 name of CN and pass in the class name
03:03:23.279 inside so we can modify it from the
03:03:26.040 outside. So now we have a component we
03:03:28.560 can use whenever we need a generated
03:03:30.960 avatar. So let's go back to our
03:03:34.000 dashboard user button here and what the
03:03:38.399 alternative here will be instead of null
03:03:41.120 is the generated avatar
03:03:43.399 component and pass in the seed to be
03:03:46.399 data
03:03:47.479 username and the variant will be
03:03:51.560 initials and class name will be size 9
03:03:55.439 and mr of
03:03:57.000 three initials like this.
03:04:01.520 So now nothing really changes for me.
03:04:03.520 But if I for example sign
03:04:06.520 out and if I go ahead and create a new
03:04:09.359 user for example
03:04:11.520 uh so mark
03:04:16.840 markdemo.com and sign in. So this one
03:04:19.439 does not have uh you can see any image
03:04:22.800 we use the generated avatar with their
03:04:25.680 initials here. So that's how this will
03:04:28.479 be used or you can change it to boss
03:04:35.720 neutral and then it will create a little
03:04:38.160 bot right but that makes more sense to
03:04:40.560 use for the actual agents right great so
03:04:44.479 that's one thing that I wanted for the
03:04:46.960 trigger uh but still let's go still
03:04:49.760 inside of the drop-down trigger here and
03:04:52.160 create a div with a class name flex flex
03:04:55.840 column gap
03:04:57.479 app.5 text left overflow hidden flex one
03:05:02.560 and a minimum width of zero. Inside
03:05:06.160 we're going to have data
03:05:08.520 username and we're going to have data
03:05:11.520 user email rendered here. So give the
03:05:15.520 first one a class name of text small
03:05:17.760 truncate and w with
03:05:20.760 full and the bottom one a class name of
03:05:24.640 text extra small truncate and with full.
03:05:29.520 And there we go. Now you have your name
03:05:31.439 and your email right
03:05:33.560 here. Outside of the trigger we're going
03:05:36.319 to have a drop-own menu content here.
03:05:40.000 This will have an align of end side of
03:05:44.080 right and class name of width
03:05:47.720 72. And inside of here drop-down menu
03:05:52.200 label with a
03:05:54.279 div class name flex flex column and gap
03:05:59.520 of one. And then inside of
03:06:02.680 here you're going to have two span
03:06:05.120 elements. The first one will be data do
03:06:07.520 user.name.
03:06:09.240 name with a class name font medium and
03:06:13.960 truncate and the bottom one will be data
03:06:17.920 user email again with the class name
03:06:21.760 text small font normal text muted
03:06:26.160 foreground and truncate. So now when you
03:06:29.359 click here you can see how it will open
03:06:31.520 additional options here in form of a
03:06:34.600 dropdown. Great. Uh, and one thing I
03:06:37.920 forgot to do here in the drop-down menu
03:06:40.800 trigger before you close it, just go
03:06:43.600 ahead and add a chevron down icon from
03:06:46.960 Lucid React. Give it a class name size
03:06:50.960 four and shrink zero. Make sure you've
03:06:53.920 added the Lucid icon
03:06:57.800 import. There we go. So, now it has a
03:07:00.080 drop-own
03:07:01.479 button. Perfect. So now let's go ahead
03:07:04.960 and continue developing uh the drop-own
03:07:07.120 menu content here. So after we finish
03:07:10.160 with our label, add a drop-own menu
03:07:14.040 separator, a self-closing tag, and then
03:07:16.640 a drop-own menu
03:07:18.840 item in here. Add
03:07:21.960 billing and credit card icon from Lucid
03:07:27.080 React. Copy this. And this one will be
03:07:30.960 log out icon with the text log
03:07:34.680 out. Give both of these icons class
03:07:37.439 names and size
03:07:39.479 four like this. And you can give both of
03:07:42.800 this drop-own menu
03:07:45.640 items class
03:07:47.800 names cursor pointer flex items center
03:07:52.560 and justify
03:07:55.880 between. There we go. So this is how the
03:07:58.399 buttons are
03:07:59.640 looking and we can't really develop the
03:08:02.800 billing one but we can develop the on
03:08:06.240 logout one. So above the return here add
03:08:10.800 const on logout asynchronous method
03:08:14.640 await out client sign
03:08:17.880 out fetch options on
03:08:24.520 success. And we also have to add the
03:08:27.520 router here
03:08:29.319 from use router next
03:08:34.760 navigation like this.
03:08:37.760 And let's do router push forward slash
03:08:42.160 sign in. And we this actually does not
03:08:44.960 have to be asynchronous. We don't have
03:08:46.479 to wait it at all. Let's use on log out.
03:08:49.840 And let's add it to the on click
03:08:54.120 here. There we go. So now we have a user
03:08:56.720 button which you can see takes some time
03:08:58.479 to load. Once it loads, we can click log
03:09:00.560 out and we are logged out. Perfect. So
03:09:04.960 what I want to do now is I want to wrap
03:09:07.600 it up by fixing the gradient colors here
03:09:09.680 because we have added the layout, the
03:09:11.359 modules, the sidebar, and we modified
03:09:13.279 the globals theme. And now let's use
03:09:15.680 these new variables to fix the gradient
03:09:17.840 colors in the ALF views. So this part
03:09:20.560 right here. So go inside of this sign in
03:09:23.640 view in your modules al UI views and
03:09:29.840 find the second column where you render
03:09:32.399 the normal image tag with logo SVG where
03:09:36.399 you have the background uh
03:09:38.680 radial and instead of using these colors
03:09:41.760 we're going to add our new variable
03:09:43.760 colors. So from sidebar
03:09:47.479 accent to
03:09:50.680 sidebar. There we go. So now it matches
03:09:53.359 our sidebar. Uh technically, you know,
03:09:57.520 we are using the sidebar color variable
03:10:01.359 for something that's not a sidebar, but
03:10:03.200 they think it's okay to borrow it for,
03:10:05.200 you know, just one or two more places,
03:10:07.439 right? Let's go ahead and copy this and
03:10:09.840 do the same thing in the sign up view so
03:10:11.680 that they look the same.
03:10:14.640 There we go. So now both our sign up and
03:10:18.560 our signin forms look very nice. Great.
03:10:22.800 So I'm going to go ahead and
03:10:25.560 uh wrap up the chapter now because we
03:10:28.399 just fixed this. There we go. And now
03:10:30.640 let's create review and merge our pull
03:10:34.040 request. So what I'm going to do is
03:10:36.960 close everything, open my source graph
03:10:39.479 here. You can see we have a lot of
03:10:41.600 changes here. Let's click on the branch
03:10:43.680 down here. Let's click create new branch
03:10:46.560 and let's call this
03:10:48.200 06 or is it 05? I'm not sure. 06
03:10:52.399 dashboard
03:10:57.080 sidebar. Let's add all
03:10:59.880 changes so they are staged. And let's do
03:11:04.080 uh 06 dashboard
03:11:07.080 sidebar. Make sure you are in your new
03:11:09.439 branch here. Click commit and publish
03:11:12.840 branch. There we go. Now let's go
03:11:16.680 to
03:11:19.240 GitHub. Let's open a pull
03:11:22.279 request and let's wait for our reviewer
03:11:25.600 to finish looking at our
03:11:30.359 code. And here we have our code summary.
03:11:33.840 So new features. We introduced a
03:11:35.920 dashboard layout with a sidebar
03:11:37.439 navigation and main content area. We
03:11:39.920 have added a sidebar component featuring
03:11:41.760 navigation links, section grouping, and
03:11:43.760 active route highlighting. We've
03:11:45.840 implemented the user profile button in
03:11:47.680 the sidebar with drop-own menu for
03:11:49.520 options for billing and logout as well
03:11:52.240 as the aer generator component. So in
03:11:55.680 here we have a file by file walk through
03:11:59.200 and a deeper uh review of what we've
03:12:02.160 done. Two sequence diagrams. The first
03:12:04.720 one explaining how our dashboard uh
03:12:07.359 layout actually works and the second one
03:12:10.160 is our dashboard user button which
03:12:12.319 handles the sign out functionality. We
03:12:15.600 have some actionable comments. The first
03:12:17.359 one is to add an on error in case sign
03:12:20.960 out fails. This is definitely something
03:12:23.200 we can do and we will come back to this
03:12:26.560 when we add the actual toaster component
03:12:29.120 for displaying errors. Right? So very
03:12:32.000 good suggestion here in here. Obviously
03:12:34.720 they suggest reusing some of the styles
03:12:36.800 because we have two identical uh section
03:12:40.240 groups, you know, first section and
03:12:41.840 second section inside inside of our
03:12:43.760 dashboard sidebar. But since we know
03:12:45.600 it's only going to be used for two
03:12:47.040 things, I'm okay with reusing it. If it
03:12:49.279 turns out that we will add more sections
03:12:51.040 in the future, it will probably be a
03:12:53.040 good idea to separate it like they
03:12:55.040 suggested
03:12:56.200 here. In here, it advises against using
03:12:59.920 hardcoded colors like this, which is a
03:13:02.000 completely valid claim. So, we can
03:13:03.680 consider adding this to our uh global
03:13:07.399 CSS. We'll see if we can find at least
03:13:10.080 one more place to use it perhaps. But uh
03:13:12.880 for this one of cases, I'm okay with
03:13:14.960 hard coding it. Uh anyways, great great
03:13:18.080 suggestions here. You can of course
03:13:19.520 decide for yourself. You know, your your
03:13:21.520 project does not have to be identical to
03:13:23.279 mine. if you want to handle some things
03:13:25.359 that AI suggests, feel free to do so.
03:13:28.239 So, I'm going to go ahead and merge this
03:13:30.080 pull request. And once I've done that,
03:13:32.000 I'm going back inside of my IDE here.
03:13:35.279 And I'm clicking down here and going
03:13:37.200 back to my main branch. Make sure this
03:13:39.600 says main or whatever is the name of
03:13:41.359 your default branch and click on
03:13:43.600 synchronize changes and click okay. And
03:13:46.800 this should automatically synchronize
03:13:49.760 everything here. So you can check by
03:13:52.080 going inside of the app. There we go.
03:13:54.640 Layout, dashboard, sidebar, everything
03:13:57.359 is here. Amazing. So that wraps up this
03:14:00.640 chapter. Amazing job. And see you in the
03:14:03.040 next
03:14:04.680 one. In this chapter, we're going to go
03:14:07.279 ahead and develop the dashboard navbar,
03:14:10.239 which should together with the dashboard
03:14:12.600 sidebar wrap up the dashboard layout. So
03:14:16.560 in the previous chapter, we have
03:14:18.160 developed this part right here. And now
03:14:20.560 we're going to focus on this. So two
03:14:23.840 things will happen in the navbar. First,
03:14:26.080 we're going to have the collapse button
03:14:28.560 so that we can collapse the sidebar if
03:14:30.720 needed. And the second one will while it
03:14:33.920 looks like an input, it's actually going
03:14:36.000 to be a button which is going to open a
03:14:38.560 command model so that we will be able to
03:14:41.520 search for any agent or any meeting
03:14:45.520 using a global search. and we will also
03:14:48.399 have a little shortcut to open it. So
03:14:52.239 let's start by creating the dashboard
03:14:54.920 navbar. As always, make sure you have
03:14:57.760 your app running and let's go ahead and
03:15:00.560 do the following. Let's go inside of
03:15:02.239 source app dashboard layout. And before
03:15:05.680 you write anything, double check you are
03:15:08.080 on your main branch here. And now inside
03:15:11.680 of
03:15:12.439 main uh inside of the main element I'm
03:15:15.359 going to add dashboard navbar component.
03:15:18.239 Now let's go inside of the modules
03:15:21.120 dashboard components. And now inside add
03:15:26.120 dashboard
03:15:29.319 navbar.tsx like this. So let's go ahead
03:15:32.319 and mark this as use
03:15:35.319 client and let's export const dashboard
03:15:40.920 navbar instead of a div. Let's return a
03:15:44.319 nav element here and say hello
03:15:47.960 navbar. Let's go back to the layout and
03:15:50.720 let's import the dashboard navbar from
03:15:55.560 modules. And now when you go here, when
03:15:58.880 you
03:15:59.960 refresh above this page, you should see
03:16:03.439 hello navbar right here. So now we're
03:16:06.720 going to continue developing that. I'm
03:16:09.279 going to give this nav element a class
03:16:11.359 name flex px of 4, gap x of 2, items
03:16:17.399 center,
03:16:19.080 py3, border bottom, and bg of
03:16:23.720 background. There we go. So already
03:16:26.239 looks much better and I just can't help
03:16:29.040 but notice that we are missing a little
03:16:31.439 gap here in the user button between the
03:16:34.160 avatar and the info. So let's quickly go
03:16:36.720 inside of dashboard user button here and
03:16:41.200 let's find that. So in here we
03:16:44.600 have drop-down menu trigger here and
03:16:47.520 looks like we are missing the gap here.
03:16:49.279 So let's just add gap
03:16:51.479 x2 and there we go. that keeps it
03:16:54.160 separated like that. So, let's continue
03:16:56.960 going back inside of the D uh nav
03:17:00.479 dashboard navbar here and let's add a
03:17:02.880 nate uh a button component from
03:17:05.359 components UI button. And in here, I'm
03:17:08.479 going to render a panel left icon from
03:17:11.840 Lucid React. And I'm going to give this
03:17:14.880 a class name of size
03:17:16.760 9 and a variant of
03:17:20.439 outline like this.
03:17:23.359 So now I have this button here. Right
03:17:26.000 now when I click on it, it doesn't do
03:17:28.359 much. But what I can do since I've
03:17:31.520 wrapped my entire dashboard inside of a
03:17:34.319 sidebar provider, I can now
03:17:38.600 access use sidebar in any of its
03:17:42.160 children from components UI sidebar. And
03:17:44.880 in here I can get the current state of
03:17:46.720 the sidebar. I can get to toggle it and
03:17:49.760 I can also extract is
03:17:51.880 mobile. So what I'm going to do is the
03:17:54.239 following. I'm going to add on click
03:17:56.560 here to be toggle
03:17:58.920 sidebar. So now when a user clicks it
03:18:02.000 opens and
03:18:03.800 closes. And now what I'm going to do is
03:18:06.080 dynamically render this. So let's just
03:18:09.040 encapsulate this. And let's
03:18:12.120 check in parenthesis if state is
03:18:15.800 collapsed or if is mobile which means
03:18:19.920 it's automatically collapsed. We are
03:18:23.120 rendering the panel left icon otherwise
03:18:26.800 render panel left close icon from lucid
03:18:32.120 react. Now let me just collapse these so
03:18:35.279 they are easier to look
03:18:38.760 at. And now let's go ahead and just add
03:18:41.840 a little class name here size four
03:18:45.640 inside. So now you can see that we have
03:18:48.680 actual different icons representing
03:18:52.319 different actions, right? But if you
03:18:54.239 enter mobile, you will see how it will
03:18:58.120 behave exactly the same. Perfect.
03:19:01.920 So now that we've uh established that,
03:19:05.040 let's go ahead and handle the button
03:19:07.840 next to it, which is the search
03:19:11.560 button. So in here, I'm going to give
03:19:14.720 this button a variant of outline, a size
03:19:19.600 of
03:19:20.520 small, and on click for now, just an
03:19:23.359 empty arrow function. And in here I'm
03:19:26.560 going to add a class name height 9 width
03:19:29.760 of 240 pixels justify start font normal
03:19:36.640 text muted foreground hover text muted
03:19:40.319 foreground. Basically I'm doing this to
03:19:42.399 override uh the usual effect where the
03:19:46.080 color of the text changes on hover.
03:19:47.920 That's why I'm writing the same color on
03:19:49.880 hover. And uh that will be
03:19:52.920 it. And inside of here, I'm going to add
03:19:55.680 a search
03:19:57.000 icon from Lucid React. And you can
03:20:01.200 already see how this looks like. So,
03:20:02.720 it's very clearly a button. We're just
03:20:05.040 going to mask it as an input. There we
03:20:09.359 go. Like this. And what I want to do
03:20:11.680 here is add a KBD
03:20:14.200 element which will basically just be uh
03:20:18.319 a shortcut
03:20:21.319 representation because besides clicking
03:20:23.760 on this button you will also be able to
03:20:25.520 do a keyboard shortcut to open the
03:20:27.359 global search. So inside of here, add a
03:20:30.800 span element and go ahead and write the
03:20:34.279 following and
03:20:36.600 hashtag
03:20:38.200 8984 and then a column like this. And
03:20:42.239 this will render a command icon, right?
03:20:46.399 So obviously depending on uh Windows or
03:20:49.680 Mac, this will be the control icon. Uh
03:20:53.359 but it's basically the meta key, right?
03:20:56.560 You can of course change it if you want
03:20:58.560 to detect users operating system and
03:21:00.880 then display control, but most people
03:21:04.319 understand what this means. So now let's
03:21:06.800 go ahead and style this just a bit
03:21:10.160 better. So first of all, I want to give
03:21:12.239 this span a class name of text extra
03:21:14.880 small. And I'm going to give this one a
03:21:16.800 class name ML auto. So that will push it
03:21:20.080 to the end here. Pointer events none
03:21:25.520 inline flex height five select none
03:21:29.640 items center gap one rounded
03:21:35.319 border border uh my apologies background
03:21:39.880 muted px
03:21:43.000 1.5 font mono text 10
03:21:47.800 pixels font medium text muted foreground
03:21:52.319 and opacity. Um, no, actually we don't
03:21:55.760 have to do anything with the opacity.
03:21:57.840 There we go. So, now you can see that
03:21:59.600 this looks like an actual keyboard uh
03:22:02.560 shortcut. It's very recognizable, right?
03:22:05.960 Perfect. Uh, what I want to do before we
03:22:09.200 move forward is one thing just check one
03:22:12.080 thing. So, if you go inside of source
03:22:13.840 app layout, you can see that we are
03:22:16.080 currently using the Ge uh font. How
03:22:18.720 about we change this to instead use
03:22:21.560 enter? And let's go ahead and call this
03:22:25.160 enter and simply set the enter font. We
03:22:29.920 don't need the variable. So you can just
03:22:32.239 add enter like
03:22:34.279 this. And you can just add inter dot
03:22:39.040 class name
03:22:41.560 here like that. So this should change
03:22:44.960 the font of the app to be inter which I
03:22:47.840 think suits better in this
03:22:50.279 case. Now we can go back inside of the
03:22:53.120 dashboard navbar here. And what I want
03:22:56.640 to do now is I want to uh simply create
03:23:00.720 that command even though it's not going
03:23:03.359 to do much because we don't have
03:23:04.800 anything in the database to search for
03:23:06.640 and we don't have any API created but
03:23:09.439 let's just prepare for it. Right? So
03:23:11.279 wrap the entire thing inside of a
03:23:13.279 fragment here because semantically
03:23:16.560 uh it will not be inside of the navbar.
03:23:18.640 It will be here. So dashboard command
03:23:21.439 that's the component we're going to
03:23:23.080 create and go inside of here and create
03:23:26.279 dashboard command dsx. So all of them
03:23:30.160 live here together. Let's export the
03:23:33.359 dashboard command here. And inside of
03:23:36.800 here, what you're going to do is you
03:23:39.040 will return command dialogue from
03:23:41.600 components UI command. And then inside
03:23:44.720 of here, add the command input from
03:23:47.920 components UI
03:23:50.439 command. And now what we have to do is
03:23:53.120 we have to create the props for this. So
03:23:57.279 let's create an interface props open
03:24:02.840 boolean set open dispatch from react set
03:24:07.760 state action from react and then boolean
03:24:12.760 inside. Now let's go ahead and modify
03:24:15.200 this and let's destructure open and set
03:24:18.560 open here.
03:24:20.560 Let's pass in the open and on open
03:24:23.920 change set open like this. And besides
03:24:28.399 the let's actually add some attributes.
03:24:30.560 So the command input placeholder will be
03:24:33.760 find a meeting or agent like
03:24:37.479 this. And below this let's add a command
03:24:41.120 list from components UI command. And
03:24:44.479 then let's add command item from
03:24:46.640 components UI command. And in here I
03:24:49.200 will simply write test and I will give
03:24:51.920 this uh I'm not sure it needs uh
03:24:54.160 anything. We can just do test like this.
03:24:57.359 And let's leave it like this. So now
03:25:00.960 let's go inside of the dashboard navbar
03:25:02.720 and let's import this from dot /
03:25:05.279 dashboard command like that. And what we
03:25:08.160 have to do now is we have to implement
03:25:10.319 the use state control for this. So,
03:25:12.720 command open set command open use state
03:25:16.800 from react and set it to false by
03:25:20.080 default. And let's just move this up
03:25:22.200 here. And let's go ahead and add this to
03:25:25.200 be open. Command open and set open to be
03:25:29.439 set command
03:25:31.479 open. And now let's go ahead and use the
03:25:34.880 button for search to be set command
03:25:37.680 open. And let's simply toggle. So the
03:25:40.239 current value and just the reverse of
03:25:42.160 the current value. So now when you click
03:25:44.640 this, you can see that it opens up,
03:25:46.960 right? And you can see how it uses this
03:25:49.200 filtering search. It doesn't work
03:25:50.800 properly yet because we don't have an
03:25:52.880 actual API to call and search for
03:25:54.640 meetings or agents, right? But that's
03:25:56.640 how our global search will work. And one
03:25:58.720 thing we have to do is just implement
03:26:01.319 the shortcut here. So the way we can do
03:26:04.880 that is by using a use effect. Let's add
03:26:08.000 a use effect here from
03:26:13.560 React. Make sure you have imported this.
03:26:16.720 Uh you don't have to put anything in the
03:26:18.800 dependency array. Define a function
03:26:21.279 called down which will accept a keyboard
03:26:25.960 event. If event key is equal a and if we
03:26:32.239 are pressing a meta
03:26:35.000 key or we are pressing the control key
03:26:39.279 so compatible both on Windows and Unix
03:26:43.399 systems we will prevent default and
03:26:46.439 simply
03:26:48.359 toggle the current command
03:26:52.600 status and then let's add a document add
03:26:55.760 event listener.
03:26:57.120 key down to call the function down and
03:27:00.319 important on unmount we need to remove
03:27:03.840 that event listener on key down and pass
03:27:07.600 the reference to the function so now
03:27:10.160 when you press command and letter K it
03:27:13.760 should open let's see did I implement
03:27:15.920 this correctly I had to refresh there we
03:27:18.080 go so without clicking I can now open
03:27:20.640 and close it perfect so we just added
03:27:24.880 the dashboard navbar. And now let's wrap
03:27:27.520 it up by adding a responsive drawer to
03:27:29.680 dashboard user button. So basically
03:27:31.680 right now if you go into mobile
03:27:33.800 mode and open
03:27:36.920 this and click here, you can see that
03:27:39.680 it's not exactly usable, right? You
03:27:42.479 can't really use mobile like this. So
03:27:45.520 what we're going to do uh is we're going
03:27:47.920 to implement a drawer. We already have
03:27:50.160 that inside of our components. So what
03:27:52.640 we can do is go back to our dashboard
03:27:54.479 user button. The reason I'm doing this
03:27:56.960 is so that we start getting familiar
03:27:59.840 with uh our way of adding responsivity
03:28:03.200 here. So what we need to do is we have
03:28:04.880 to import all components from drawer the
03:28:08.960 same way we added all components from
03:28:10.760 drop-down. So from components UI drawer
03:28:13.760 which is a chat UI component. So source
03:28:16.160 components UI drawer right here. Drawer,
03:28:19.520 content, description, footer, header,
03:28:22.000 title, and trigger. And it works very
03:28:24.880 very similarly. Uh they pretty much
03:28:27.040 share the same base, same platform. So
03:28:30.640 what we're going to do is the following.
03:28:32.399 We're going to get const is mobile using
03:28:35.760 use is a mobile, which we also
03:28:38.760 have. If you're wondering where did this
03:28:41.120 come from, well also chatnui, one of the
03:28:44.560 components needs it. Uh in case you are
03:28:47.680 using, you know, some different version
03:28:49.680 and you don't have it, you can pause the
03:28:52.080 screen and just write the hook yourself.
03:28:54.319 It is pretty simple. It's not really
03:28:56.000 that complicated. Uh but there is
03:28:59.520 probably Oh, maybe it doesn't use it.
03:29:01.760 Oh, use is mobile. There we go. The
03:29:04.479 sidebar component uses it, right? So
03:29:06.479 that's why we have it in our project in
03:29:08.800 case you were wondering. So now we're
03:29:10.720 going to use it in the dashboard user
03:29:12.399 button. And what we're going to do is
03:29:14.000 the following. After this we're going to
03:29:16.239 do if is mobile we're going to do an
03:29:20.000 early return and similarly to this we
03:29:23.200 will open a drawer here and then a
03:29:26.160 drawer
03:29:27.880 trigger which will have an as child
03:29:31.160 option and in here what we can do
03:29:34.160 actually I think we can just copy this
03:29:36.880 thing like
03:29:38.760 that and then literally just copy what's
03:29:42.239 inside of this drop-own menu trigger.
03:29:45.840 So, all the way to
03:29:48.200 here and add it here. This will ensure
03:29:51.200 that the trigger button looks the same
03:29:54.800 on mobile.
03:29:56.880 But that's just the trigger because now
03:29:59.760 what we have to do is we have to add
03:30:01.920 drawer
03:30:03.399 content and in here a drawer header and
03:30:07.680 a drawer title with data user name and
03:30:12.880 in here data user email. This will be
03:30:16.439 drawer description and make sure to
03:30:19.040 change the closing tag as well.
03:30:22.319 Outside of the drawer header, open up
03:30:24.479 the drawer
03:30:25.960 footer. And in here, we are simply going
03:30:28.800 to add the two
03:30:31.319 buttons. So, let's add a button from
03:30:34.000 components UI
03:30:35.560 button variant of outline on
03:30:40.920 click empty function because this is the
03:30:44.000 credit card icon and billing option.
03:30:48.880 Give it a class name of size four and
03:30:51.920 text black. Go ahead and copy and paste
03:30:55.279 this and change this one to be our on
03:30:59.359 log out
03:31:00.920 method. Log out icon and log
03:31:05.960 out just like
03:31:07.960 that. So now when you go ahead and click
03:31:11.760 on mobile you will see that you have a
03:31:13.920 much much nicer experience. you have a
03:31:16.560 proper drawer. When switching to
03:31:19.359 desktop, it will open in a normal uh
03:31:23.279 drop-down menu. So, that's how we're
03:31:25.760 going to handle responsivity in this
03:31:27.439 project. And the buttons should work
03:31:29.520 normally. Let's see. Log out. There we
03:31:31.840 go. Perfect
03:31:33.239 responsivity. Great. Amazing. Amazing
03:31:35.600 job. I think uh that wraps it up. So, we
03:31:40.000 added the responsivity. And now, let's
03:31:42.560 go ahead and just merge the pull request
03:31:44.319 here. So uh I have opened this. I have
03:31:48.000 some changes. I'm going to go inside of
03:31:49.640 here. Clicking on my branch. Creating a
03:31:52.319 new
03:31:53.000 branch
03:31:54.760 07. Uh this is dashboard navbar I
03:31:59.160 believe.
03:32:01.239 Correct. Ensure that you can see the new
03:32:03.840 branch here. Go ahead and click the plus
03:32:06.239 to add to stage all
03:32:08.840 changes. 07 dashboard navbar. commit and
03:32:13.760 publish the
03:32:15.000 branch. There we go. Now, let's go
03:32:18.520 ahead and open the pull request on
03:32:22.439 GitHub and let's see the review from
03:32:25.680 Code
03:32:28.279 Rabbit. Then here we have the summary.
03:32:31.279 We introduced the navigation bar to the
03:32:33.359 dashboard layout for improved
03:32:34.960 navigation. We added a command palent
03:32:37.359 interface for the dashboard for quick
03:32:39.279 searching or selecting items. We updated
03:32:42.239 the user menu to provide a mobile
03:32:44.160 friendly drawer experience, improving
03:32:46.160 the usability on mobile devices. And we
03:32:48.720 simplified and updated the apps font to
03:32:51.520 use inter for a cleaner appearance.
03:32:55.439 That's exactly what we did. This was a
03:32:57.040 pretty uh short chapter. In here we have
03:33:00.160 a sequence diagram. If you uh need
03:33:03.120 further or visual explanation of how our
03:33:06.479 uh drawer works, for example, detecting
03:33:08.880 the mobile or detecting the desktop as
03:33:11.920 well as the dashboard command
03:33:14.160 visualization here. Perfect. And may I
03:33:17.760 say no big comments, some nitpick
03:33:20.319 comments here as you can see, uh but no
03:33:23.040 large comments that need any action.
03:33:25.200 Great. So, let's go ahead and merge this
03:33:26.880 pull request. And once the pull request
03:33:29.520 is merged, let's go back here, select
03:33:32.720 the branch name, go back to main or
03:33:36.080 origin main and go ahead and click this
03:33:39.439 to synchronize the changes and click
03:33:41.800 okay. And then when you click on your
03:33:44.880 source control here and go inside of the
03:33:47.200 graph, you will see that we just merged
03:33:50.080 07 dashboard navbar. Amazing amazing
03:33:54.239 job. Let's mark this as completed and
03:33:56.880 see you in the next
03:33:59.479 chapter. In this chapter, we're going to
03:34:02.080 go ahead and set up TRPC in our project.
03:34:06.160 After we've done that, we are going to
03:34:08.319 experiment using it with a client
03:34:10.880 component with a server component and
03:34:13.760 then we are going to preview prefetching
03:34:16.080 and how it works and how we are going to
03:34:18.560 use it moving on. So first things first,
03:34:22.479 ensure that you're on your uh default
03:34:25.279 branch here. Ensure that you have
03:34:27.120 synchronized all changes. You shouldn't
03:34:29.200 have any numbers in the source control
03:34:31.680 here. Everything should be up to date.
03:34:34.239 And then you can also shut down your app
03:34:36.800 simply because in the beginning all
03:34:38.479 we're going to do is install a bunch of
03:34:41.239 packages. So head to trpc.io io or use
03:34:45.040 the link in the description and let me
03:34:47.439 show you how you can find the
03:34:48.840 documentation that will tell us what we
03:34:51.279 need to do in nextJS. So you can click
03:34:54.239 on the quick start which will take you
03:34:55.680 to the documentation and in here uh you
03:34:59.200 will have some uh options like backend
03:35:02.640 usage and client usage and in here you
03:35:06.399 will notice that you have nextjs
03:35:08.640 integration that's because they still
03:35:10.560 support explaining how to set it up with
03:35:13.279 the pages router this is not what we are
03:35:16.800 looking for what we need is one of these
03:35:20.479 either the tanstack react query or React
03:35:24.399 Query. So, I previously used this type
03:35:28.319 of integration, but nowadays they have
03:35:31.760 this complete new rewrite of how you use
03:35:35.040 Tstack Query with TRPC and honestly it
03:35:38.640 makes so much more sense and it's
03:35:40.640 actually simpler to use and it's the
03:35:43.760 recommended way of going forward. So,
03:35:47.760 this is what you have to find. go inside
03:35:50.720 of DRPC documentation client usage 10
03:35:53.600 stack react query and not in the setup
03:35:56.399 if you want to you can go in the setup
03:35:58.319 and you know uh but you can see that
03:36:00.399 you're missing some things like the
03:36:01.760 server router like where does this come
03:36:03.760 from so that's why I recommend that you
03:36:05.840 go inside of server components first and
03:36:08.880 in here you will read how to set up the
03:36:12.319 RPC with tanstack react query using
03:36:15.200 their new integration using server
03:36:18.399 components which basically can be
03:36:20.319 translated to
03:36:22.359 Nex.js app router. So basically they are
03:36:25.600 doing a separation of server components
03:36:27.600 and client components. That's why uh
03:36:29.920 while the documentation might be a
03:36:31.520 little bit confusing in here you can
03:36:33.680 find everything you need for the Nex.js
03:36:36.520 integration. So let's go ahead and start
03:36:39.279 with installing the dependencies. So I'm
03:36:42.800 just going to copy this entire thing
03:36:45.160 here and paste it. But I will also show
03:36:48.479 you uh the versions that I am using. So
03:36:52.319 my DRPC server here is
03:36:57.399 11.1.2. My TRPC client very importantly
03:37:00.880 will match that version. And my TRPC
03:37:04.000 10stack react query will also match that
03:37:07.200 version. Now for tenstack react query,
03:37:10.960 not TRPC tanstack react query. actual
03:37:13.520 tanstack react query they use latest but
03:37:16.800 I will prefer using the exact version
03:37:19.840 just for this tutorial's sake right
03:37:23.200 obviously if you were developing this on
03:37:24.800 your own it's completely fine to use the
03:37:26.960 latest versions but for this tutorial I
03:37:29.279 want to ensure longevity and the zod
03:37:31.439 version will be 3.25.7
03:37:33.080 25.7 client only and server only. Uh it
03:37:36.960 doesn't really matter. These versions
03:37:38.239 don't change too much and I don't think
03:37:39.680 anything will be breaking here. But of
03:37:41.439 course I will show you which versions I
03:37:43.120 got installed. So why am I adding
03:37:45.920 versions for these things and why am I
03:37:48.960 adding versions for Zod, right? So the
03:37:52.000 reason I'm adding versions for all of
03:37:53.840 these is because you can see that if one
03:37:56.000 of them is 11.1.2,
03:37:58.960 2 the others need to be that version as
03:38:01.960 well. The other reason is you can see
03:38:05.359 for example tanstack react query has a
03:38:07.760 warning the package is currently in beta
03:38:10.080 as we stabilize stabilize the API. We
03:38:12.800 might do breaking changes without
03:38:14.800 respecting simber. So what does this
03:38:17.200 sentence mean? It means that usually you
03:38:19.760 would expect the breaking change in a
03:38:21.439 major version change. But since they are
03:38:23.520 in beta, the breaking change might come
03:38:26.160 in
03:38:27.640 11.1.3, right? That's why I'm telling
03:38:29.840 you that for this tutorial, it might be
03:38:31.600 safer and it might save you some
03:38:33.359 headaches to simply use the same
03:38:35.040 versions that I'm using. And I'm also
03:38:38.160 pinning the tanstack react query version
03:38:40.960 simply because I know that this version
03:38:43.120 is compatible with this. And why do I
03:38:45.920 pin zod version? Well, that's because
03:38:48.319 Zod is also in some kind of
03:38:50.479 transitioning phase where they are
03:38:52.399 introducing version 4. So, depending on
03:38:55.680 when you watch this video, version 4
03:38:57.520 might become, you know, the default to
03:38:59.920 use. But this is the current highest
03:39:01.760 version that I have been able to found.
03:39:03.840 And we'll see uh how compatible it is
03:39:06.640 with these other ones. But this is the
03:39:09.279 reason why I'm doing that because
03:39:10.479 there's a lot of moving versions here, a
03:39:12.239 lot of beta things, a lot of breaking
03:39:13.920 changes. And I just want to make it
03:39:15.600 easier for you to follow along. And go
03:39:17.840 ahead and add
03:39:19.720 d-leacy fear deps and wait for a second
03:39:24.239 for this to install. There we go. So no
03:39:27.600 need to start anything immediately. We
03:39:29.680 can just go back here and let's create
03:39:32.000 the TRPC router. So we're going to go
03:39:34.800 inside of source create a new folder
03:39:37.000 trpc and inside let's create
03:39:40.920 init.ts and go ahead and click on this
03:39:43.600 view sample back end. Now just a small
03:39:47.279 note in case this documentation changes
03:39:49.760 and you can no longer find these code
03:39:51.840 snippets don't worry. Uh so this is how
03:39:54.640 I'm going to do it. I'm going to copy
03:39:56.000 it. I'm going to paste it here and I'm
03:39:58.239 just going to you know slowly scroll so
03:40:00.720 that you can see exactly what's inside.
03:40:02.399 It's not a very big code snippet. In
03:40:04.640 case the documentation no longer shows
03:40:06.399 it, you will have no problem writing it
03:40:08.600 yourself. There we go. So, just add this
03:40:11.359 in the init file. Now, what we have to
03:40:14.560 do is we have to create our uh app
03:40:18.160 router which will handle all of our
03:40:20.160 procedures and different routers, right?
03:40:22.720 So, we are doing that inside of TRPC
03:40:26.600 routers_app.ts. So inside of the TRRPC
03:40:29.040 folder, go ahead and create routers and
03:40:31.920 inside
03:40:34.359 create_app.ts and paste this inside.
03:40:37.600 There we go. And you can see that it can
03:40:39.200 find dot.init, which is this file right
03:40:41.840 here.
03:40:43.319 Perfect. After you have added that,
03:40:46.160 let's go ahead and let's add to our app
03:40:48.399 folder API TRPC dynamic TRPC
03:40:53.239 route.ts. So we can copy this and we
03:40:55.680 will have to modify this snippet a bit
03:40:57.680 because you can see they're using a
03:40:59.120 different type of alias
03:41:01.239 here. So let's go inside of app folder
03:41:04.359 API. Let's create the TRPC folder. Then
03:41:08.560 let's go ahead and create another folder
03:41:10.479 TRPC inside of square brackets and
03:41:13.040 finally route
03:41:15.399 TS. So app API TRPC TRPC in square
03:41:19.600 brackets route TS and paste this here.
03:41:23.920 And we are now going to modify these two
03:41:26.640 to not use this squiggly line but
03:41:28.560 instead the at sign because that is our
03:41:31.680 uh default alias. So this leads the
03:41:34.080 import to source folder and then we can
03:41:37.040 access the RPC from there. There we go.
03:41:40.000 So I think that's all we need for the
03:41:42.800 setup. So let's leave it like this for
03:41:46.040 now. Often when I go through this
03:41:48.800 documentation I forgot to do something.
03:41:50.880 So I'm trying to be as careful as
03:41:52.560 possible that that does not
03:41:54.840 happen. So in order to use the RPC both
03:41:58.479 in client and in server components, we
03:42:00.640 will need to have client factories and
03:42:03.120 server factories to handle that. Right?
03:42:05.600 So let's go ahead and create a
03:42:07.640 queryclient factory. So I'm going to
03:42:09.840 copy this and create
03:42:13.399 query-client.ts. So let's close this.
03:42:17.120 Let's go inside of TRPC and
03:42:21.080 query-client.ts and let's paste it here.
03:42:23.279 And I will now slowly go over this. So
03:42:26.720 in here we have the import. In here we
03:42:29.120 have the super JSON import which we can
03:42:30.960 comment out because A we don't have the
03:42:32.960 package installed and B we are not using
03:42:34.800 it yet. And after that we simply export
03:42:38.080 a function make query client. This is
03:42:40.160 basically the tanstack query setup.
03:42:42.880 That's it. We will later enable the
03:42:45.439 serialization. And I just want to finish
03:42:47.439 following through with the setup. Great.
03:42:50.000 So that's the query client. Uh and now
03:42:53.920 let's go ahead and see what else we
03:42:55.680 have. And if you want to read more about
03:42:57.040 it, you can pause the screen or go to
03:42:59.040 the documentation here. Now let's go
03:43:02.000 ahead and create a TRPC client for
03:43:04.479 client components. So I'm going to copy
03:43:07.680 this and I'm going to create inside of
03:43:09.439 the DRPC folder
03:43:13.560 client.tsx like this. Let me close
03:43:15.680 everything else.
03:43:17.560 client.tsx and let's paste that inside
03:43:20.239 of here. So in here we mark it as use
03:43:23.120 client. We do all of these imports right
03:43:26.800 here. And then we add our makequery
03:43:30.640 client from this which we've just added
03:43:33.920 previously, right? Make query client.
03:43:37.040 And we import the app router type from
03:43:40.840 our routers here because this is where
03:43:43.439 we are going to add all of our different
03:43:45.439 routers. So in here it will have the app
03:43:47.920 router to give the context and the type
03:43:49.920 interference for all of them. So I'm
03:43:52.720 just going over this slowly in case you
03:43:55.359 cannot find that code snippet and want
03:43:57.439 to type it yourself. So in here we
03:43:59.439 define the function get query client
03:44:01.840 which I suppose it's doing it uh so it's
03:44:05.239 compatible during server side rendering
03:44:07.840 here even though this is a client uh a a
03:44:12.399 even though this is a provider for the
03:44:14.000 client component usage uh it we still
03:44:16.800 have to handle server side rendering
03:44:19.040 that's different from a server component
03:44:20.640 so that's it's doing
03:44:22.120 this and after that we have this get URL
03:44:25.439 which I uh definitely want to modify I
03:44:28.800 think is a bit unnecessarily complicated
03:44:31.760 and it's optimized for Versel. But what
03:44:34.239 if you're not deploying on Versel,
03:44:36.239 right? So how about we do this? So find
03:44:40.800 get URL method or if you're in the
03:44:42.720 middle of typing it, go ahead and stop
03:44:44.560 here and instead let's go to our
03:44:46.880 environment here and let's add next
03:44:49.520 public app URL. And in here we're
03:44:53.120 basically just going we can copy the
03:44:55.120 better out URL because it's exactly the
03:44:57.040 same. It's basically where we have our
03:44:58.960 app running. If you are unsure, you can
03:45:00.880 do npm rundev and you will see exactly
03:45:02.880 where it's running like this and just
03:45:05.520 add it here. Be mindful of the protocol
03:45:07.520 and of the port. So this will be much
03:45:10.640 easier to do because you can see that
03:45:12.160 versel URL does not include the
03:45:14.160 protocol. So then they have to attach it
03:45:16.080 to the protocol. It's just a mess to
03:45:18.160 work with. Instead, what we can just do
03:45:20.160 is remove these two lines and just do
03:45:23.439 return process.vironment environment
03:45:26.239 next public app URL. Please copy and
03:45:28.479 paste so you don't accidentally
03:45:29.920 misspell. That's it. And what's
03:45:32.160 important here is that you have actually
03:45:34.319 defined the TRPC folder in the /
03:45:37.800 API/TRPC. So be mindful of that. API
03:45:40.720 TRPC. Make sure you didn't misspell
03:45:43.319 it. And finally, we have the TRPC React
03:45:46.560 provider, which combines the query
03:45:48.880 client with the TRPC. We are later going
03:45:51.520 to enable the superjson transformer. And
03:45:54.479 finally, it adds all the necessary
03:45:56.880 providers using the tenstack query and
03:45:59.040 the TRPC. And now we can wrap our
03:46:01.600 application into that. Great. So I hope
03:46:04.880 that kind of explained it. I will once
03:46:06.800 again go through this
03:46:08.439 slowly in case you are typing it out
03:46:11.359 line by line. So now let's go ahead and
03:46:15.359 let's mount the provider in the root of
03:46:17.359 our application. So I'm going to go
03:46:19.760 inside of layout right here. So this
03:46:22.560 root layout in the app
03:46:24.520 folder and I'm going to go ahead and
03:46:27.479 import gRPC react provider. So be
03:46:30.800 mindful here not to import the wrong
03:46:33.640 thing.
03:46:35.399 PRPC I already forgot what it's called
03:46:38.160 react
03:46:39.080 provider from at TRPC client. The reason
03:46:42.640 I I'm telling you to be mindful is
03:46:44.640 because autocomplete intellisense might
03:46:47.120 pull you and you might import uh a a
03:46:50.000 similarly named provider which is not
03:46:52.399 what we want. So now let's go ahead and
03:46:55.359 simply wrap our entire app into
03:46:58.840 that like that. And there we go. Now we
03:47:01.760 can safely use the RPC and tenstack
03:47:04.800 query throughout our application.
03:47:08.399 Now we have to create an equivalent
03:47:10.080 caller for server components because
03:47:12.000 this is useless in server components but
03:47:14.319 it will be quite handy for us to access
03:47:16.960 our TRPC router in a server component.
03:47:20.319 So again I'm going to copy this and
03:47:22.000 create trpc
03:47:24.359 server.tsx. So let's go inside of here
03:47:29.000 server.tsx like
03:47:30.840 this and let's paste it here.
03:47:36.080 So now what we're going to do is first
03:47:38.720 ensure that you have server only and I
03:47:41.279 just remember that I forgot to show you.
03:47:43.600 So client only
03:47:46.199 0.0.1 server only 0.0.1. Those are my
03:47:50.760 versions. Great. And in here you should
03:47:54.080 have no problems with this relative
03:47:55.840 imports because it's all in the same
03:47:57.600 folder. So we have the init, we have the
03:47:59.600 query client and we have the routers
03:48:01.880 app. And you can remove this part. So
03:48:05.120 this is if the router is on a separate
03:48:06.800 server. That's not the case for us. So
03:48:08.720 we can remove that. And this is the cool
03:48:11.520 thing. So usually uh if you were attempt
03:48:14.880 to you know fetch your data in a server
03:48:16.880 component uh using some kind of
03:48:19.319 abstraction like hono RPC, what it would
03:48:23.760 do is it would actually do a fetch
03:48:26.560 request on your server which is
03:48:29.359 unnecessary overhead. But that isn't the
03:48:31.680 biggest issue. That's not it's not
03:48:33.520 slowing anything down too much. The
03:48:35.680 issue is if you're doing a fetch request
03:48:37.920 in a server component, you're losing
03:48:39.840 authentication there. You need to fill
03:48:42.000 that fetch request with cookies and
03:48:43.680 headers. Well, this kind of server
03:48:47.120 module for
03:48:48.359 TRPC will allow us to natively call TRPC
03:48:54.000 procedures in server components
03:48:56.000 preserving the AL state. That's why this
03:48:59.359 is so good. So there is no uh fetch
03:49:01.760 request happening here. It will directly
03:49:04.640 call the TRPC procedures. You will see
03:49:08.000 more of this in action later on. Uh
03:49:11.439 great. So in here they immediately show
03:49:14.319 you the prefetching example which I
03:49:16.319 think is a bit complicated if you've
03:49:18.560 never seen this before but basically
03:49:20.960 pre-fetching allows us to combine the
03:49:24.000 best of both worlds. We are the when
03:49:26.640 next.js GS page loads. The first thing
03:49:28.560 it loads is a server component. And in
03:49:31.520 here we have the option to prefetch a
03:49:34.319 query. For example, you we just loaded a
03:49:37.040 meeting with meeting ID 1 2 3. So what
03:49:40.239 we're going to do in the server
03:49:41.359 component is we're going to start the
03:49:43.439 prefetch. We're going to say, okay,
03:49:45.279 start prefetching this immediately. And
03:49:47.920 then we're going to wrap this into the
03:49:49.520 hydration boundary. And then in the
03:49:52.399 client component, we're going to use the
03:49:54.239 client DRPC integration. And in here we
03:49:57.840 will be able to load a already loaded
03:50:01.840 data right because the server component
03:50:04.640 will already put the data into cache. So
03:50:08.080 our client component will be ready to
03:50:10.279 immediately use it right and we are also
03:50:13.760 going to be able to use use suspense
03:50:16.319 query with that and then we are going to
03:50:19.359 have an even better developer experience
03:50:21.600 for us. I know it's all a bit too much
03:50:23.520 overwhelming at the moment, but uh
03:50:25.840 you're going to see when we start doing
03:50:27.359 this how helpful it really is, but uh
03:50:31.120 how about we go ahead and actually try a
03:50:33.760 very simple example. So what I'm trying
03:50:35.359 to do here is the following. Let's go in
03:50:39.760 inside of our TRPC routers. And in here
03:50:43.199 we can see hello base procedure. So a
03:50:45.920 pretty simple procedure. How about we go
03:50:48.880 inside of our modules home home view
03:50:52.000 because this is a client component. Make
03:50:54.080 sure you have your app running here. And
03:50:56.399 this is what we're going to do now. So
03:50:58.239 we no longer need to display anything
03:51:00.319 else related. We have that in the
03:51:02.479 sidebar now. But what we can do is the
03:51:05.680 following. We can learn how to use TRPC
03:51:08.399 here. So let's first add TRPC hook. So
03:51:12.319 const TRPC is use TRPC from TRPC client
03:51:16.960 and then in here we would have the data
03:51:19.840 which would be use query from tan stack
03:51:22.960 query and then in here usually what you
03:51:25.279 would do is you would create your
03:51:26.720 fetcher and then pass the body. What
03:51:28.960 they have done is they have separated
03:51:31.439 the API from tRPC and use query. So you
03:51:34.800 use query and you learn use query
03:51:37.880 independently right you are not learning
03:51:40.600 tRPC you are learning tanstack query
03:51:44.319 that's the cool thing about this new
03:51:46.000 integration they've done usually what
03:51:48.160 you would do is tRC dot uh your
03:51:51.880 procedure dot use query but that would
03:51:55.439 require you to learn this whole new
03:51:57.600 syntax whereas with this one all you
03:52:00.399 already know use query most likely right
03:52:03.359 so all you have to do is pass hello and
03:52:07.439 query options inside and let's pass in
03:52:10.560 is it name? Let's just see hello text.
03:52:14.880 Okay, let's pass in text to be
03:52:18.600 Antonio. And then in here simply render
03:52:22.120 data greeting with a question mark here.
03:52:26.000 So now when you go to localhost 3000 and
03:52:28.560 refresh this, this should no longer
03:52:31.120 exist and instead it should say hello
03:52:34.840 Antonio. There we go. Hello Antonio. So
03:52:37.279 it loaded for a second and then it said
03:52:40.000 hello Antonio. So that's how you would
03:52:42.080 use it in a client component. Quite
03:52:45.199 normal. Nothing too unusual, right? But
03:52:48.160 we can also use it in a server component
03:52:50.560 if we need to. So let's just do that
03:52:52.560 before we wrap up the chapter. So
03:52:54.640 getting data in a server component you
03:52:56.720 would almost never you will almost never
03:53:00.479 need this right but if you really really
03:53:04.319 need data in a server component you can
03:53:07.680 right so what we're going to do is let's
03:53:10.160 just go inside of app folder dashboard
03:53:13.399 page and what I'm going to do here is
03:53:17.680 I'm going to fetch the greeting the same
03:53:20.800 way so con greeting will be awake Wait.
03:53:24.960 And let's see what do we need to import
03:53:26.720 a caller function. And I'm not even sure
03:53:29.359 if I have it. Yes, they are telling me
03:53:31.760 that I need to export it because we will
03:53:34.319 never use this. But just to demonstrate
03:53:36.319 to you that you can still do it. Let's
03:53:38.560 go inside of TRPC
03:53:40.960 uh server. If it's easy enough to do, we
03:53:43.040 will do it. If it's complicated, we will
03:53:44.960 just skip. Let's see. Okay. All I need
03:53:47.439 is the caller. Expert con color caller
03:53:50.080 app router create color and pass in
03:53:52.080 this. Perfect. Let's import the caller
03:53:54.960 from TRPC server. So caller hello text
03:53:59.720 Antonio
03:54:01.640 server and then in here we're just going
03:54:04.319 to return a
03:54:06.199 paragraph
03:54:07.720 greeting greeting. So this would
03:54:09.840 technically be data and then data
03:54:13.439 greeting. So now I'm overwriting that
03:54:16.560 client component and you can see hello
03:54:18.399 and new server. So I just wanted to
03:54:21.199 demonstrate to you that it's possible to
03:54:22.880 do this as well. But we won't be doing
03:54:24.960 that. We'll be doing the third option
03:54:27.359 which is the pre-fetching leveraging
03:54:29.359 both the speed of server components and
03:54:31.600 the knowledge and the um uh I'm not sure
03:54:36.000 what's the correct term to use a
03:54:37.920 familiarity of the client components
03:54:40.000 right because we're use used to this we
03:54:41.840 know how to work with this right but it
03:54:43.680 would be nice to leverage the speed of
03:54:45.439 the server components which load sooner
03:54:48.080 than the client components so you're
03:54:49.920 going to see us combine all of that in
03:54:51.600 one uh great but we just tested both so
03:54:54.560 we know that both the client and the
03:54:56.160 server iteration of these are working
03:54:58.560 and we're going to learn more about the
03:55:00.720 RPC as we go forward. So we've done this
03:55:04.560 this and this and I forgot to do one
03:55:07.439 more step which is to uh merge the pull
03:55:10.640 request. So let's go ahead and do that.
03:55:13.199 So I have 11 uh uncommitted changes
03:55:16.680 here. Let's go ahead and change the
03:55:19.359 branch first. New branch. This will be
03:55:22.560 08 DRPC
03:55:26.760 setup. Great. Let's confirm I'm on the
03:55:30.080 new branch. And let's click the plus
03:55:31.920 icon to stage all of our changes here.
03:55:34.399 And let's do 08 PRPC setup. And let's
03:55:38.000 commit. And let's publish the branch.
03:55:40.720 There we go. And let's go ahead and open
03:55:44.000 a pull request to see what Code Rabbit
03:55:47.359 has to say about this. though I won't
03:55:49.520 change it much simply because this is
03:55:50.960 the official documentation. So I'm just
03:55:53.439 going to follow how they've done it. But
03:55:55.279 still let's see what AI has to say about
03:55:59.160 this. And here we have the summary. So
03:56:02.239 let's read through the walkthrough this
03:56:04.000 time. This update integrates DRPC and
03:56:07.279 React Query into the project introducing
03:56:09.600 new API routes, server and client
03:56:11.920 utilities, and a context provider for
03:56:14.000 the app. Authentication logic is removed
03:56:16.560 from the home view because we removed
03:56:18.319 it, right? And which now displays data
03:56:21.279 fetched via TRPC. Several supporting
03:56:24.239 modules and dependencies are added or
03:56:26.479 updated to enable seamless type- safe
03:56:28.800 API calls. And that was pretty much the
03:56:31.120 point of this chapter. And this is where
03:56:33.600 you will finally see these sequence
03:56:35.439 diagrams become increasingly more useful
03:56:38.080 especially if you're struggling to
03:56:40.080 understand uh all of these types of uh
03:56:43.199 uh TRPC calls right server TRPC client
03:56:46.560 TRPC
03:56:48.080 uh hybrid with pre-fetching. So this
03:56:50.640 will come in quite handy in here. For
03:56:52.479 example, you can see a very very simple
03:56:54.399 one which is a usepc with use query for
03:56:58.479 the hello procedure where we pass the
03:57:00.800 text and we bring back from the app
03:57:02.960 router the greeting with that text
03:57:04.960 included and then render it back. In
03:57:07.920 here we have some comments but these are
03:57:11.680 just demonstrations right we will
03:57:13.920 obviously remove this. So it's making
03:57:16.800 sure that we are careful with this query
03:57:18.720 that we have the error and loading field
03:57:22.000 but we are going to remove it anyway and
03:57:23.840 we will handle error and loading but in
03:57:25.760 a different way using
03:57:27.560 suspense. We are also going to implement
03:57:30.479 proper protected procedures later on.
03:57:32.560 You can see how it already suggested
03:57:34.160 that right here. Perfect. And in here of
03:57:38.239 course it recommends a fallback but um
03:57:41.199 we don't really need a fallback. you
03:57:42.640 know, if you don't add this environment
03:57:44.000 variable, the app will not work either
03:57:45.920 way because we will use it for some
03:57:47.439 other things later
03:57:48.840 on. And finally, the caller here, which
03:57:52.560 again does not matter uh because we only
03:57:54.880 added it to demonstrate how you can use
03:57:57.680 TRPC for purely server component call.
03:58:01.040 But still, you can see how uh for
03:58:04.120 seemingly harmless pull request, it
03:58:06.800 noticed so many things that could go
03:58:08.960 wrong, right? Luckily for us, most of
03:58:10.720 this is just for demonstration, but
03:58:13.199 definitely a useful tool to have. Let's
03:58:16.319 go ahead and merge this pull
03:58:18.120 request. And after it's merged, go back
03:58:20.880 to your IDE, select the main branch, and
03:58:24.560 go ahead and synchronize the changes. To
03:58:28.479 double check, you can click on the
03:58:29.760 source control here, open the graph, and
03:58:32.479 just confirm that you have emerged the
03:58:34.800 TRPC setup. Perfect. Amazing. Amazing
03:58:38.880 job and see you in the next
03:58:42.199 chapter. In this chapter, we're going to
03:58:44.800 go ahead and set up the agents entity in
03:58:48.960 our project. This will include adding
03:58:51.439 the agents schema module, TRPC
03:58:55.359 procedures, some client pages, and we're
03:58:58.479 going to create reusable loading and
03:59:00.720 error
03:59:01.560 states. Let's start with the agent
03:59:04.239 schema.
03:59:05.760 First things first, ensure that you're
03:59:07.840 on your main branch here and feel free
03:59:11.439 to synchronize changes if you haven't
03:59:15.520 and make sure you have no active numbers
03:59:18.319 here, meaning everything was merged,
03:59:20.960 everything is up to
03:59:22.439 date. So, what I want to do now is run
03:59:26.319 mpm install nano ID legacy peer
03:59:31.880 deps. Great. Now let's go ahead and run
03:59:34.880 our app. Now let's go inside of source
03:59:38.920 database schema. Inside of here we have
03:59:42.880 all the tables added by better out. So
03:59:46.640 what we are going to do now is import
03:59:49.760 nano id from nano
03:59:54.040 id and we are going to create our table.
03:59:58.800 So let's go ahead and export const
04:00:01.800 agents. PG table
04:00:08.840 agents. The ID is going to be a type of
04:00:12.080 text with the column name ID. It will be
04:00:15.359 a primary key. And we are going to add a
04:00:18.000 default function here to assign a nano
04:00:21.199 ID. The reason I'm using Nano ID is
04:00:24.319 because they are shorter and much more
04:00:26.560 readable than UYU IDs. Let's go ahead
04:00:30.000 and set the name field to use the name
04:00:33.520 column name and it's going to be
04:00:36.760 required. User ID is going to be a text
04:00:40.439 field. User ID will be the column name.
04:00:45.439 It will be required and it's going to be
04:00:47.359 a reference to our existing user table.
04:00:51.920 specifically targeting the ID field. So
04:00:55.600 we are referring to this user table
04:00:58.399 right here. This ID field and we are
04:01:01.840 going to add a rule. If the user is
04:01:04.800 deleted, we are going to cascade meaning
04:01:07.680 deleting this agent as
04:01:09.640 well. Let's add
04:01:12.199 instructions to be a type of text with a
04:01:15.359 column name instructions. And let's just
04:01:18.080 make it required. And we are then going
04:01:20.640 to have created at which will be a type
04:01:23.760 of timestamp created at required and
04:01:28.479 default. Now copy and paste this and
04:01:31.840 change it to updated ad and change this
04:01:35.279 to updated ad as well. There we go. We
04:01:38.800 have our new agents table. So everything
04:01:41.760 above here is better out and everything
04:01:45.279 starting from the agents will be our
04:01:47.600 tables. Great. Now that we have our new
04:01:51.880 agent schema, let's go ahead and let's
04:01:55.920 run database
04:01:58.359 push. So, npm run database
04:02:05.000 push. And there we go. Changes applied.
04:02:09.439 So, now you have two options. You can
04:02:11.279 either go on neon and look at the table
04:02:14.160 or you can run database studio. So
04:02:17.199 whichever one you prefer, you can go to
04:02:21.479 local.drizle.studio to find the studio
04:02:23.520 here or you can go to your neon console
04:02:27.080 here and go inside of the tables and you
04:02:30.560 will find the exact same studio here. So
04:02:33.600 now you have the agents and in here you
04:02:36.319 have ID, name, user ID, instructions,
04:02:39.279 created at and updated at. And the last
04:02:41.840 one is a repeated user which is
04:02:43.840 basically just the relation which will
04:02:46.080 be loaded once we add the user ID.
04:02:49.479 Perfect. So we added the agents schema.
04:02:54.239 Now what I want to do is I want to add
04:02:56.319 the agents
04:02:59.000 module. So let's go ahead and close
04:03:01.600 everything. Let's go inside of source
04:03:04.279 modules and let's add agents here.
04:03:08.319 And then inside of here, let's add a
04:03:10.399 server folder. And let's add
04:03:15.800 procedures.ts. Inside of the procedures
04:03:18.840 here, I want to
04:03:22.199 import create brpc router from trpc init
04:03:27.439 and base procedure from trpc in it.
04:03:32.239 Let's export const agents
04:03:35.880 router and let's make it create trpc
04:03:39.560 router and let's add get many to be base
04:03:42.640 procedure query and it's going to be a
04:03:45.680 simple asynchronous
04:03:48.279 function and inside of here we're just
04:03:51.920 going to get the data using await
04:03:54.720 database from at /
04:03:57.239 db and let's go ahead and select
04:04:02.760 from agents. So make sure to import
04:04:06.720 database and
04:04:08.439 agents and we don't need to add any
04:04:11.760 other query because we are not querying
04:04:14.319 right now by user. We are not querying
04:04:16.880 by pageionation. We are just loading all
04:04:19.720 data. So let's go ahead and return this.
04:04:23.760 Now that we have that, let's go inside
04:04:25.439 of DRPC routers app and let's go ahead
04:04:29.920 and prepare a bit. So let's import
04:04:34.040 agents router from modules agent server
04:04:37.279 procedures and let's remove the hello
04:04:39.600 procedure and add agents to be agents
04:04:42.120 router. And you can remove base
04:04:44.560 procedure and zod from here like this.
04:04:48.960 Now let's go inside of home in the
04:04:51.840 modules folder UI views home view and in
04:04:55.920 here let's clear it up entirely and
04:04:58.239 let's just say home view here you can
04:05:00.399 even remove the class
04:05:01.880 names remove these two imports and just
04:05:05.279 leave it like this. This way the
04:05:08.160 component is no longer
04:05:10.040 erroring. Great. So we now added the
04:05:14.359 procedures. Now let's go ahead and
04:05:16.880 finish the module by adding the agent
04:05:20.520 pages. So let me just go ahead and start
04:05:23.279 my app here. npm
04:05:28.120 rundev. Let's wait a second for this to
04:05:30.960 load. There we go. So we just have home
04:05:33.120 view here. And now um let's go ahead and
04:05:36.080 actually run this. Let me just move this
04:05:40.359 here bottom right. There we go. so it
04:05:43.920 doesn't cause any issues. And now let's
04:05:46.720 go ahead and develop the agents
04:05:51.160 page. So we're going to go inside of
04:05:53.359 source app folder dashboard and we're
04:05:56.160 going to create the agents folder. Then
04:05:58.640 inside of here, page
04:06:01.560 DSX. Then let's go ahead and simply do a
04:06:04.720 default export here and write agents
04:06:08.080 like this.
04:06:10.880 So now when you go ahead and click on
04:06:12.560 agents here you will see the text
04:06:15.239 agents. Now let's go ahead go inside of
04:06:18.080 modules agents and create the UI folder
04:06:21.399 inside and create a views folder inside
04:06:24.560 of UI. And finally in here create
04:06:27.439 agents- view
04:06:30.040 tsx mark it as use
04:06:32.680 client import usec from tRPC client.
04:06:38.000 import use query from tanstack react
04:06:42.600 query. Now let's export const agents
04:06:45.439 view
04:06:48.040 here. Let's go ahead and prepare trc
04:06:51.120 using use query. My apologies
04:06:54.199 use and let's get the data by using use
04:06:57.840 query here. PRPC agents get many query
04:07:03.319 options like this.
04:07:06.720 Let's go ahead and return a div JSON
04:07:09.279 stringify data null and
04:07:13.319 two. So null and two is basically used
04:07:18.399 to format the JSON stringification in a
04:07:21.760 nice way so it's easier to
04:07:23.960 read. And let's also do the following.
04:07:28.000 Is
04:07:29.560 loading.
04:07:32.040 if is loading. Let's go ahead and return
04:07:35.439 a
04:07:36.439 div
04:07:39.239 loading and
04:07:42.279 if is
04:07:46.199 error, let's return a div
04:07:51.000 error like this. And I just have to wrap
04:07:54.239 it this in parenthesis because I can't
04:07:57.120 look at it like that. Okay, great. So
04:08:01.199 now let's go to the page here inside of
04:08:03.439 our dashboard agents page and let's go
04:08:06.479 ahead and directly return the agents
04:08:08.680 view like
04:08:10.600 this. And there we go. You're now able
04:08:13.439 to click add agents, right? And you will
04:08:16.960 just see an empty array. So, what you
04:08:21.040 can do is you can go inside of your
04:08:22.560 either Neon Console or Drizzle Studio,
04:08:25.040 whatever you have up and running, go
04:08:27.199 inside of agents and click add record.
04:08:29.359 For ID, you can just go ahead and type
04:08:31.680 whatever you want because it's a type of
04:08:34.239 text. Uh yeah, but before you do this,
04:08:36.800 yeah, let's just discard this. Go to
04:08:38.960 your users and just pick uh at least one
04:08:42.080 user here. Just pick an ID for the user.
04:08:45.520 Copy it. Go instead of agents, click add
04:08:47.840 record. Write whatever you want for the
04:08:50.319 ID for the agent. The name can be first
04:08:53.040 agent and then user ID. Paste the ID
04:08:56.239 that you've added in the instructions.
04:08:58.800 Add you are an agent. It really doesn't
04:09:01.920 matter. And created and updated at our
04:09:04.640 default. So you can click save one
04:09:06.319 change. And there we go. That will
04:09:08.479 create an
04:09:10.040 agent with a relation to the user. In
04:09:12.960 case you fail at doing this, no problem
04:09:15.520 at all. I'm literally just adding one
04:09:17.520 record. simply so we can see something
04:09:19.760 being loaded here. Right? That's the
04:09:21.520 only reason why I'm doing this. If you
04:09:23.040 are failing at doing it, don't worry. Uh
04:09:26.560 great. So now that we have this uh let's
04:09:30.000 go ahead and uh spice it up a little
04:09:33.520 bit, right? So let's go inside of the
04:09:35.760 agents view here. Let's go inside of get
04:09:37.920 many. And how about I go
04:09:41.479 here and I
04:09:44.120 purposely make it slower by using await
04:09:47.520 new promise
04:09:50.199 resolve set timeout resolve 5,000. So
04:09:54.479 I'm purposely adding 5 seconds here. So
04:09:57.279 let's refresh this. And now you can see
04:09:58.960 our loading state being active here uh
04:10:02.080 for 5 seconds before it loads. Now let's
04:10:05.520 comment this out and instead let's throw
04:10:07.880 new PRPC error here with a code bad
04:10:13.520 request for
04:10:15.479 example. Let's refresh this as well. So
04:10:19.279 it's going to load. It's going to load
04:10:21.199 for a couple of times until it
04:10:23.399 eventually hits the error I believe. And
04:10:26.080 there we go. So after a couple of
04:10:28.000 retries it shows the error state.
04:10:31.359 Perfect. So we now have a little
04:10:33.359 shortcuts to do both of them. So what I
04:10:36.399 want to do now is the following. I want
04:10:39.199 to build our error state and our loading
04:10:41.680 state which we are going to reuse
04:10:43.040 throughout the project. So let's go
04:10:44.880 inside of source components and create
04:10:48.399 loading state
04:10:50.680 tsx and do the
04:10:53.399 following.
04:10:55.160 Import loader to icon from lucid react.
04:10:59.680 Create an
04:11:00.920 interface props with a title of string
04:11:04.000 and description of
04:11:06.840 string. Export loading
04:11:11.479 state like
04:11:13.399 this. The structure the props
04:11:16.920 here. So you can obtain the title and
04:11:19.840 the
04:11:20.840 description. And inside of here return a
04:11:24.439 div. The div will have a class name.
04:11:27.359 Whoops. py 4 px8 flex flex one items
04:11:35.279 center and justify center. The div will
04:11:39.520 have a class name of flex flex call
04:11:42.560 items center
04:11:44.920 justify center gap y 6 bg
04:11:52.120 backgrounded large padding of 10 and
04:11:55.439 shadow sm. Inside of here add a loader 2
04:11:59.680 icon which we have imported above and
04:12:01.760 give it a class name of size six and
04:12:04.000 animate spin.
04:12:07.199 And let's also give it a text primary.
04:12:10.160 Let me just fix the typo in my animate
04:12:12.319 spin class name here. Below this, open
04:12:15.120 up a div with a class name flex flex
04:12:18.000 column gap y2 and text center. Inside of
04:12:22.160 this div, you will have a heading six
04:12:24.479 which will render the title and below it
04:12:27.199 a paragraph which will render the
04:12:29.439 description.
04:12:32.080 Go ahead and give the heading a class
04:12:33.760 name of text
04:12:35.640 large and font
04:12:38.760 medium and give the paragraph a class
04:12:41.399 name text
04:12:43.560 small. There we go. Now let's head back
04:12:47.040 inside of our agents view. Inside of
04:12:49.920 modules agents UI views agents view.
04:12:53.439 Instead of returning this, we are now
04:12:55.439 going to return our loading
04:12:57.239 state like that.
04:13:00.960 Let's go ahead and give this a title
04:13:02.640 uploading agents and a description of
04:13:05.920 this may take a few
04:13:11.319 seconds like
04:13:13.319 this. So now let's go back inside of our
04:13:16.920 procedures and let's enable our 5-second
04:13:20.880 timeout. And there we go. Now we have a
04:13:23.359 nice loading state which we can reuse
04:13:25.840 throughout uh our project.
04:13:29.960 Perfect. So now what I want to do is the
04:13:33.439 following. I want to copy the loading
04:13:35.040 state, paste it here and rename it error
04:13:39.000 state. Inside of here I will import the
04:13:42.000 alert
04:13:43.920 uh let me just see which com which one
04:13:46.800 is the proper alert circle icon. Let's
04:13:49.680 use this one. And this will be called
04:13:52.479 error state. And it's simply going to
04:13:54.720 load the alert circle icon. It will
04:13:58.159 remove animate spin and it will use oops
04:14:00.720 and it will use a color text red 500
04:14:04.720 like that. Go back inside of the agents
04:14:07.600 view and in here use the error
04:14:11.640 state. Give it a
04:14:13.880 title of failed to load
04:14:19.159 agents and a description of something
04:14:23.040 went
04:14:25.239 wrong. Or maybe let's do please try
04:14:29.840 again later. And let's do error loading
04:14:35.319 agents. And in here we can remove these
04:14:39.199 three dots like this. So now how about
04:14:42.960 we enable the error and remove this so
04:14:46.319 it errors faster. So let's refresh now.
04:14:49.359 So it's loading. It's loading. It's
04:14:51.600 loading. And it will eventually hit the
04:14:54.720 error state. displaying the error. There
04:14:57.600 we go. So, what you've just learned is
04:15:00.399 how to use DRPC with usequery in the
04:15:03.760 most normal way everyone is used to
04:15:06.960 using it. And if you want to, you can
04:15:10.239 complete the entire project like this.
04:15:13.520 There is absolutely nothing wrong with
04:15:16.000 doing it like this. If you prefer having
04:15:18.479 your error states here, your loading
04:15:20.239 states here, that's perfectly fine. But
04:15:23.040 what I'm going to show you now is how to
04:15:25.520 do it by leveraging server components
04:15:28.560 because right now we are using this
04:15:30.159 agents view as the fetcher right but we
04:15:35.520 have this uh out my apologies whoops
04:15:39.840 dashboard agents page which is a server
04:15:42.840 component which has closer access to the
04:15:45.800 database than this which is essentially
04:15:48.640 a fetch API call. Right? So what if we
04:15:52.960 could already fetch the data in the
04:15:56.080 server component and then immediately
04:15:58.239 provide it to the cache here? What if we
04:16:01.920 could do that? Well, good news is we can
04:16:05.439 do exactly that. So let's turn this into
04:16:08.000 an asynchronous
04:16:09.479 component like this. And let's go ahead
04:16:13.439 and define the following const query
04:16:15.800 client. And let's do get query client
04:16:19.279 from tRPC server. So you already know
04:16:22.080 that we are going to be using the server
04:16:24.000 utilus for this one. So we get the query
04:16:26.640 client here and then what we do is avoid
04:16:30.800 query client prefetch query and inside
04:16:35.040 we do tRPC which you can also import
04:16:37.760 from the server. It's important that you
04:16:40.000 import both from TRPC server not from
04:16:42.720 anywhere else. And in here dot agents
04:16:47.199 get many and simply do query options
04:16:51.800 here just like that. So what we've done
04:16:56.000 now is we used a server components to
04:16:59.319 prefetch the agents get many. But we are
04:17:02.640 still not done. What we have to do now
04:17:05.120 is we have to wrap this agents view
04:17:09.000 component in a hydration boundary from
04:17:12.239 tanstack react query. So let's do this
04:17:16.319 and let's pass in the state here to be
04:17:18.920 dehydrate from tanstack react query and
04:17:21.760 pass in the query client like this. So
04:17:25.600 what we have done now is the following
04:17:28.800 flow. The first component that will load
04:17:31.920 when the user clicks on the agents here
04:17:35.040 will be this page this server component.
04:17:38.640 This server component will then prefetch
04:17:41.600 the RPC agents get many and it will
04:17:44.720 hydrate through hydration boundary the
04:17:48.399 react query or tanstack react query
04:17:52.040 cache. So then when the agents view
04:17:55.359 finally loads it will already have the
04:17:59.199 data inside reducing the load time. But
04:18:03.199 in order to do that properly we need to
04:18:06.319 not use use query. Instead we have to
04:18:09.680 use use suspense
04:18:11.800 query like
04:18:13.960 this. And we have to modify a couple of
04:18:16.880 things. So since we're using use
04:18:18.640 suspense query, it makes no sense to use
04:18:20.960 the error and loading here. Why? Well,
04:18:24.319 let's look at the difference. I'm just
04:18:25.680 going to control Z back. So when I hover
04:18:28.080 over data here, you can see that in here
04:18:31.680 it can be undefined, right? Because
04:18:35.439 there is a state where this data is not
04:18:38.399 loaded yet. That's why we handle is
04:18:40.560 loading. But when you switch to use
04:18:42.479 suspense
04:18:43.720 query and hover over the data, it will
04:18:47.199 never be undefined because use suspense
04:18:50.279 query has already fetched data inside of
04:18:54.239 it, already resolved data. So that's why
04:18:57.520 it doesn't make sense to use these here
04:18:59.520 at all. So you can remove them and you
04:19:02.720 can completely rely on the data here.
04:19:05.279 Instead, what we're going to do is the
04:19:07.359 following. We're going to go ahead and
04:19:09.520 wrap the agents view inside of suspense
04:19:12.479 from
04:19:13.960 React and we're going to give it a
04:19:19.080 fallback and let's just keep this things
04:19:22.000 simple. So you have two ways of doing
04:19:23.920 it. You can add loading state here if
04:19:26.080 you want to and give it a title of
04:19:29.520 loading agents and a description here of
04:19:33.040 this may take a few seconds. If you want
04:19:37.439 to, you can do it like that. Uh or you
04:19:42.319 can export con agents view
04:19:45.720 loading and then in here return the
04:19:48.640 loading
04:19:50.120 state and simply repeat these two
04:19:54.840 values like
04:19:59.479 this. And then in here you can do a
04:20:03.040 simpler version agents view loading and
04:20:07.760 you import all of them from the same
04:20:09.439 place agents view and agents view
04:20:12.120 loading whichever version you
04:20:15.159 prefer. And it's a self-closing tag.
04:20:18.080 Great. So now go inside of your
04:20:21.000 procedures for the agents
04:20:24.120 router. Whoops. And enable this 5-second
04:20:28.159 timeout. So now do a hard refresh here
04:20:30.800 and you can see it is still working but
04:20:34.560 this time it's leveraging suspense.
04:20:37.520 Great. So how do we handle uh errors
04:20:42.479 here? Well, we need an error boundary.
04:20:45.199 Now Nex.js by itself has an error
04:20:48.439 boundary. So that means that you could
04:20:50.800 go inside of uh agents page here and you
04:20:54.399 could create an
04:20:55.800 error. SX mark it as use client export.
04:21:00.880 Uh I think you need to do a default
04:21:03.040 export as well. Well, you can just call
04:21:05.359 it error page. Make sure to not call it
04:21:08.000 error because that's a reserved file
04:21:09.600 name. And you could just return the
04:21:11.680 error state here. I
04:21:13.800 believe with a title uh error loading
04:21:18.080 agents and a description
04:21:20.680 here. Something went
04:21:24.040 wrong. And I haven't tested this. But I
04:21:27.760 think it should work. So let me try and
04:21:30.640 enable the error now. And let me do a
04:21:32.479 hard refresh here. And uh I'm just going
04:21:36.159 to see if this is working. So let's wait
04:21:39.520 a few seconds. And there we go. Yeah. So
04:21:42.399 just like that uh we handled the error
04:21:46.640 state. If you want to, you can handle
04:21:48.960 error states like that because Nex.js
04:21:51.040 offers this native uh error boundary.
04:21:54.399 the same way it actually offers a
04:21:55.760 loading boundary. But there is another
04:21:59.439 way of doing it and that is by using uh
04:22:02.640 react error
04:22:05.399 boundary dash legacy beer depths like
04:22:11.720 this. So in here what you can
04:22:15.239 do is inside of suspense add error
04:22:19.760 boundary. Make sure to not import it
04:22:22.000 yet.
04:22:24.800 And what you can do is copy this error
04:22:27.439 state from here. Go to agents view
04:22:29.520 export con agents view
04:22:32.920 error. Return the error state here.
04:22:36.479 Import the error
04:22:38.120 state like this. Keep them all together.
04:22:42.080 Go here in the
04:22:43.399 page. You will import error boundary
04:22:47.080 from react error
04:22:50.040 boundary like this.
04:22:54.199 and give it a fall back of agents view
04:23:00.080 error. So now you have all three
04:23:02.279 components from the same
04:23:05.479 place like this. And if you're wondering
04:23:08.239 why would I do this over native Nex.js
04:23:12.000 ones, well that's because native Nex.js
04:23:14.800 JS error boundary works on a entire page
04:23:18.640 level which in this specific case makes
04:23:21.439 sense but imagine you just wanted it on
04:23:24.880 a very small component in that page.
04:23:27.760 That's where having this kind of error
04:23:29.840 boundary makes more sense. So you can
04:23:32.880 now remove this
04:23:35.080 error.tsx and you can do a hard refresh
04:23:38.040 here and let me just see. So yeah, there
04:23:41.120 is one issue that might occasionally
04:23:45.040 happen, right? I don't know if you if
04:23:47.199 you've noticed it. So it eventually
04:23:49.279 showed this error, but uh it's very hard
04:23:52.399 to reproduce. For some of you, it might
04:23:54.720 happen. For some of you, it might not
04:23:56.319 happen. But keep your inspect element
04:23:58.600 open and make sure there we go. You can
04:24:01.439 see what's happening. So this is an
04:24:03.600 infinite loop that it was caught in. And
04:24:06.880 the only time I've noticed it happen is
04:24:09.520 either completely randomly or when you
04:24:12.960 throw an error, right? So, uh I'm not
04:24:17.840 sure if it happens with the native uh
04:24:21.760 error boundary from NextJS, but what I
04:24:24.479 do know, okay, let me just do a hard
04:24:26.720 refresh here
04:24:28.120 again. Yeah, you can see that when I
04:24:30.239 refresh, sometimes it happens, sometimes
04:24:32.319 it doesn't. So, it's not exactly
04:24:33.760 deterministic. And when I say hard
04:24:35.680 refresh, I mean command shift R or
04:24:39.359 basically this ignoring the cache. I
04:24:41.920 think you can do that in Chromium
04:24:43.840 browsers, right? Um it's something
04:24:47.840 relating with the hot reload. Uh I'm not
04:24:51.040 sure if it even translates to production
04:24:53.520 at all, but yeah, sometimes it can
04:24:55.600 happen. So if you get that, don't worry.
04:24:58.000 Uh I get it as well and other people do.
04:25:01.840 So there is an open issue on tanstack
04:25:04.399 query. Maximum update depth exceeded
04:25:06.720 here and uh it's very hard to track why
04:25:10.319 it's happening. You can see that uh
04:25:12.640 people are having trouble narrowing it
04:25:14.720 down. There is a specific version they
04:25:17.199 found. So if you want to completely get
04:25:20.239 rid of it, you could technically go
04:25:22.960 inside of the package JSON, find the
04:25:24.960 tanstack uh
04:25:28.439 query and downgrade, you know. Oops, not
04:25:31.680 this
04:25:32.680 one. Anstack React query, right? Find
04:25:36.479 this one. And you could technically, you
04:25:38.399 know, downgrade it to this version. And
04:25:40.399 apparently the issue does not happen
04:25:43.000 there. Uh because that's the last place
04:25:46.319 they uh did some actually it would
04:25:51.399 be 3. This would be the uh version
04:25:56.159 without any issues with infinite
04:25:58.159 hydration error loops, right?
04:26:01.199 if you if just for your information
04:26:03.680 because that's where they introduce some
04:26:05.520 hydration changes and then you can see a
04:26:07.600 bunch of you know discussion here uh I
04:26:10.399 think that even I left a comment here as
04:26:12.880 you can see that I encountered this
04:26:14.319 issue as well and when I use
04:26:17.159 5.66.3 the error actually goes away. Uh
04:26:21.199 the good news is they seem to be getting
04:26:23.920 to the bottom of it. As you can see just
04:26:26.000 yesterday, at least of the time I'm
04:26:27.680 recording this video, they seem to be
04:26:29.680 having a fix. So if you want to, you can
04:26:33.359 also follow this discussion. So uh just
04:26:36.960 please don't spam anything here, right?
04:26:39.359 They are doing their best to fix this.
04:26:41.920 It doesn't help anyone by commenting I
04:26:45.199 have the same problem, right? Unless you
04:26:47.359 have something of insight, no need to
04:26:49.760 spam the issue. They are obviously
04:26:51.439 fixing it. Um, so if you want to, you
04:26:54.239 can follow this issue along. Maximum
04:26:56.159 update depth exceeded in tan tech query.
04:26:59.520 And in here you can find the preview uh
04:27:03.760 pre-release packages which apparently
04:27:05.680 fixed the issue. I have not tested it
04:27:07.359 yet to confirm. So what you could do is
04:27:10.560 do npm install this add- legacy pure
04:27:13.439 deps and then you would have this type
04:27:15.359 of version inside. It's going to look
04:27:17.680 like this. So that's like a
04:27:20.199 pre-release. But basically I'm just
04:27:22.080 trying to tell you uh yeah I'm having
04:27:24.399 that maximum update depth error as well.
04:27:27.840 But I did not uh experience it breaking
04:27:30.880 my app in any way. Right. It doesn't
04:27:33.600 seem to freeze the entire app. It seems
04:27:35.359 to be somehow controlled. Another thing
04:27:38.239 you can keep an eye on is this issue
04:27:40.800 simply to see if it's closed. If it's
04:27:43.199 closed, it probably means that it might
04:27:45.439 be a good idea to check for a newer
04:27:48.479 version of React Query. Maybe that will
04:27:50.560 be 2, right? So, go ahead and do a
04:27:54.159 little bit of research if you're
04:27:55.359 interested and maybe they will fix it in
04:27:57.680 the next version. But nevertheless, I
04:28:00.159 developed with uh this version and I did
04:28:03.040 not find any big problems. It happened
04:28:06.080 very rarely mostly because we don't
04:28:08.080 really throw that many errors right you
04:28:10.800 can see that sometimes it happens
04:28:12.560 sometimes not but eventually it this
04:28:15.279 maximum update loop
04:28:17.720 ends and it shows the error. So yeah,
04:28:21.920 not sure exactly what's going on here,
04:28:24.640 but uh just to you know take some uh
04:28:27.760 your mind off ease, it's let's say quote
04:28:31.120 unquote normal, right? At least they are
04:28:33.359 on it. They know it's happening. So you
04:28:35.760 can now remove these two. You can remove
04:28:38.560 this and you can do a hard refresh just
04:28:41.760 to prove that it's still working. Uh and
04:28:44.720 I'm not sure if you noticed, but it is
04:28:46.640 significantly faster now. The loading is
04:28:49.439 much much quicker than it was when we
04:28:52.640 used the use query. Right? So a big
04:28:56.560 important thing here is if you're
04:28:59.439 planning on using suspense query in this
04:29:02.080 way, you need to make sure that in your
04:29:04.560 server component in your parent server
04:29:06.800 component you are doing the proper
04:29:08.560 prefetching here with the proper
04:29:10.720 hydration boundary because if you forget
04:29:13.439 to do these things you will end up with
04:29:16.319 some cryptic errors. So right now it is
04:29:18.680 working the reason it's working here uh
04:29:22.159 is because if it detects if use suspense
04:29:25.680 query detects no data right meaning
04:29:29.760 nothing was prefetched uh what will
04:29:32.239 happen is it will simply fall back to
04:29:35.199 use query but this will become a problem
04:29:38.640 with protected routes and you're going
04:29:41.040 to see that later when we actually
04:29:42.560 implement some protected routes so I
04:29:44.720 just showed you a bunch of options you
04:29:46.560 can fetch data in your project. A bunch
04:29:48.640 of ways you can show loading states, you
04:29:51.520 can show error states. We even use the
04:29:54.080 native uh Nex.js error boundary. So, I
04:29:57.199 hope that gave you a lot of new options
04:29:59.279 and uh the idea of how this works. And
04:30:02.880 as I said, you know, if you have a
04:30:04.800 preference for just using, you know, use
04:30:07.920 query and then handling loading an error
04:30:10.560 here, sure, no problem at all in doing
04:30:13.439 that. This is just an optimized way of
04:30:16.000 fetching your data. Uh it doesn't have
04:30:18.080 that much effect here because we just
04:30:20.159 have this simple data. But later when
04:30:22.560 you have actual data, it will definitely
04:30:25.199 you know uh you will see that it's
04:30:28.120 faster. Perfect. So I think that that
04:30:31.199 was everything I wanted to show you. We
04:30:32.880 have the agents modules, agent pages,
04:30:35.359 loading state and error state. And now
04:30:37.279 let's go ahead and create, review, and
04:30:38.800 merge this pull request. So 09 agents
04:30:42.840 setup.
04:30:44.439 So I'm going to go ahead and click on my
04:30:47.120 branch here. Create new branch. 09
04:30:52.279 agents
04:30:54.359 setup. Confirm you are in your new
04:30:56.760 branch. Add all changes
04:30:59.560 here. 09 agents
04:31:02.840 setup. Commit and publish the branch.
04:31:07.760 Now let's go ahead to our
04:31:10.279 GitHub. Let's open the pull
04:31:12.760 request. Let's create it and let's see
04:31:16.960 the review from Code
04:31:20.040 Rabbit. And here we have the summary. We
04:31:23.760 have introduced an agents dashboard page
04:31:26.560 with serverside data fetching, loading,
04:31:29.760 and error handling. We added reusable
04:31:32.159 loading and error state UI components.
04:31:34.880 And we have implemented an agents
04:31:36.720 database table to store agent
04:31:39.000 information. We have also enabled the
04:31:41.600 DRPC API endpoint for retrieving agent
04:31:45.399 data. Perfect. And we have added some
04:31:47.920 new dependencies nano ID and React error
04:31:51.279 boundary. Perfect. In here we have file
04:31:54.479 by file change summary. And in here we
04:31:57.520 have the sequence diagram. And these
04:31:59.520 will only become more useful uh the more
04:32:02.159 we use this type of prefetching, right?
04:32:04.159 because they will be helpful in
04:32:05.720 explaining why and how things are
04:32:08.880 happening. So let's go ahead and go over
04:32:10.800 them a little bit. So it starts with the
04:32:13.520 user visiting dashboard agents on the
04:32:16.080 agents page. The agents page is the
04:32:18.960 server component. In there we do a
04:32:21.600 prefetch to
04:32:23.560 agents.get many that in turn calls the
04:32:27.199 TRPC server which fetches all agents
04:32:30.239 from the database. It returns the agent
04:32:32.720 list to the TRPC server which we then
04:32:35.359 return to the TRPC client which finally
04:32:38.159 hydrates uh the agents page view with
04:32:42.560 the agent data and then we can render
04:32:45.920 that data finally. Here is the agent
04:32:48.239 view. My apologies. There we go.
04:32:50.960 Perfect. So it clearly shows how we are
04:32:53.720 prefetching through the parent server
04:32:57.080 component. And as per the comments here,
04:32:59.920 it only has comments regarding the fact
04:33:02.560 that this query is obviously not
04:33:04.879 something you would use in production.
04:33:06.958 And that's completely fair comment here,
04:33:10.561 but we will do that later when we
04:33:12.639 actually implement protected procedures
04:33:14.561 so that we can query by a specific user
04:33:17.118 and when we add pagination here. And
04:33:19.840 same thing for actually displaying those
04:33:22.080 elements. You can see in here they've
04:33:23.919 created an entire uh state uh for us
04:33:27.438 here. Perfect. So let's merge this pull
04:33:30.958 request. Let's confirm merge. And once
04:33:34.639 you've merged it, you can go ahead back
04:33:36.719 inside of your IDE. Select your main
04:33:39.480 branch and synchronize changes. Click
04:33:43.799 okay. Go inside of your source control
04:33:46.639 here. Open the graph and confirm that
04:33:48.799 you have just merged
04:33:50.599 09 agents setup. There we go. Perfect.
04:33:55.840 Amazing. Amazing job. And see you in the
04:33:59.840 next chapter.
04:34:03.520 In this chapter, I want to develop the
04:34:05.759 responsive dialogue component simply so
04:34:08.719 we save some time in the next chapter
04:34:11.680 where we are actually going to focus on
04:34:13.840 developing the new agent form and for
04:34:17.118 that we're going to need a responsive
04:34:19.520 dialogue. So I want to do a separate
04:34:22.480 chapter on that to also add a responsive
04:34:26.000 command dialogue while we are here.
04:34:29.759 So, as always, ensure that you're on
04:34:31.840 your main branch and ensure that you
04:34:34.240 have your changes synchronized. Also,
04:34:37.278 ensure that you have no active numbers
04:34:39.359 here in the source control. Perfect. So,
04:34:42.799 let's go ahead inside of the components
04:34:44.561 here and let's create the responsive
04:34:48.919 dialogue.
04:34:50.599 DSX like this. In here we are going to
04:34:54.480 import everything from components UI
04:34:57.480 dialogue and everything from components
04:35:00.719 UI
04:35:02.118 drawer. We are also going to import
04:35:04.561 everything from I mean one thing from
04:35:07.840 use is mobile from use mobile
04:35:10.599 hooks. And let's mark this as use client
04:35:14.240 here.
04:35:16.080 Now let's go ahead and let's write out
04:35:18.719 the
04:35:19.719 interface responsive dialogue props
04:35:22.799 title which is a required string
04:35:25.359 description which is a required string
04:35:27.759 children which are react react node open
04:35:30.799 which is a boolean and unopen change
04:35:32.879 which is a toggle for that
04:35:35.561 boolean let's export const responsive
04:35:38.719 dialogue
04:35:40.199 here let's go ahead and use these props
04:35:45.840 And let's go ahead and let's dstructure
04:35:48.639 all of them. So title, description,
04:35:50.958 children, open and on open
04:35:53.480 change. Let's define is mobile, use is
04:35:57.480 mobile. If is a mobile, we're going to
04:36:00.799 go ahead and return the drawer
04:36:06.118 component. Otherwise, we're going to
04:36:08.958 return the dialogue component.
04:36:14.759 So let's go ahead and do the following
04:36:18.320 thing. Let's add two of the same props
04:36:20.958 to it. Open will be
04:36:23.561 open and on open change will be on open
04:36:28.160 change
04:36:29.000 prop like
04:36:33.561 this. And now for the drawer let's add
04:36:37.278 drawer content here. Draw our
04:36:41.799 header drawer
04:36:44.438 title. Let's render the title. Below it
04:36:49.199 description, but let's change this
04:36:51.118 component to be drawer description.
04:36:54.480 Outside of the header, add a div with a
04:36:57.438 class name adding a
04:37:01.879 four and inside render the children.
04:37:07.278 Now for the dialogue, it's going to be
04:37:08.879 quite similar. Open up the dialogue
04:37:10.639 content here. Add the dialogue
04:37:14.039 header. Add the dialogue. Whoops.
04:37:18.199 Title, which will render the title. This
04:37:21.840 one will render the description, but
04:37:24.240 this one will be dialogue description
04:37:27.599 and fix the closing tag here. And one
04:37:30.320 thing we don't have to do is add a div.
04:37:33.118 So we can just add children here. That's
04:37:35.599 because while they are almost identical,
04:37:39.400 they briefly uh share they briefly uh
04:37:44.719 don't match in the body. So the footer,
04:37:47.759 I mean the drawer needs the padding
04:37:51.199 whereas the dialogue
04:37:53.958 doesn't. So now let's go ahead and test
04:37:56.480 this out. We can do it quite easily by
04:37:59.359 visiting any page that you want. For
04:38:01.320 example, let's do
04:38:03.958 agents. Uh, and let's go inside of
04:38:06.639 agents view. So, it needs to be a client
04:38:09.639 component. And inside of here, you can
04:38:11.840 just render the responsive
04:38:14.919 dialogue. Give it a title of responsive
04:38:19.359 test and a description of hello of
04:38:23.480 responsive description. And it needs the
04:38:26.799 children. So in here you could add like
04:38:29.359 a button component
04:38:31.680 uh some
04:38:34.118 action. So make sure you've imported
04:38:36.759 this hardcode open and for on open
04:38:40.958 change just do
04:38:42.840 this. There we
04:38:45.240 go. So now let's go ahead in the agents
04:38:49.879 here. And this is how it should look
04:38:52.561 like on desktop. You should not be able
04:38:54.561 to close it, right? because we hardcoded
04:38:57.520 it to be open. But if you switch to
04:39:01.599 mobile, it should open a drawer. So when
04:39:04.879 you refresh, there we go. It looks like
04:39:07.680 you can actually force close it on
04:39:10.000 mobile, but that's completely okay
04:39:11.359 because obviously we want our models to
04:39:14.000 be
04:39:14.840 closable. Uh, great. So that's it for
04:39:18.719 the responsive dialogue. So we can close
04:39:21.278 this now. You can remove it from here.
04:39:23.359 You no longer need it.
04:39:26.160 you can remove the associated
04:39:28.039 components. So what I want to do now is
04:39:30.879 I want to do the same thing for this
04:39:34.240 because right now this is what it looks
04:39:36.520 like. So let's make it responsive. And
04:39:39.840 the way I want to do this is just a
04:39:42.400 little bit
04:39:43.480 different. So I'm going to go inside of
04:39:46.160 source
04:39:47.400 components UI and I'm going to go
04:39:50.680 directly inside of the command
04:39:53.440 component. Right? Because when you go
04:39:56.320 inside of your dashboard command, that's
04:40:00.400 where you import from. So how
04:40:03.560 about we invent a new component inside?
04:40:07.280 So that's what chats allows us to do. We
04:40:10.798 are we should not be afraid of modifying
04:40:13.040 these components. They are not
04:40:15.440 maintained by some other author in your
04:40:18.718 node module. They are in your project.
04:40:21.440 You can go inside, you can change the
04:40:23.200 code and make it to your liking. So,
04:40:25.760 let's do exactly uh that. Go inside of
04:40:28.798 the command
04:40:30.360 here and find the command dialogue like
04:40:35.798 this. And let's go ahead and copy it
04:40:40.320 entirely and let's paste it below like
04:40:43.400 this. And let's rename it to command
04:40:47.240 responsive dialogue. The title can stay
04:40:50.240 the same and the description can stay
04:40:52.240 the same as well. Uh, and then what
04:40:54.958 we're going to do is the following.
04:40:57.040 We're going to add const is mobile, use
04:41:00.160 is
04:41:02.440 mobile from hooks use mobile,
04:41:05.480 right? And then if is mobile, we are
04:41:09.120 going to render, you guessed it, the
04:41:11.638 drawer. In order to do that, we need to
04:41:14.000 import everything from the drawer. So,
04:41:16.000 let's just add this. And let me just
04:41:18.000 move the hook up
04:41:20.040 here. There we go. Let's go to our
04:41:23.798 command responsive
04:41:26.360 dialogue like
04:41:30.280 that. So let's go ahead and render the
04:41:32.958 drawer component. And in here simply
04:41:36.000 spread all props the same way you're
04:41:38.000 doing for the dialogue. Now let's add
04:41:40.400 the drawer content.
04:41:42.958 And let's give it a class name
04:41:45.560 overflow hidden and padding of zero.
04:41:48.798 Inside of here, let's add a drawer
04:41:51.560 header. And let's give it a class name
04:41:55.200 SR only, which means screen reader
04:41:59.160 only. Let's add a title here. And render
04:42:02.560 the title. So this is only for
04:42:04.638 accessibility, right? This will not be
04:42:07.080 visible. Let's add a description
04:42:11.320 here. And let's just fix this by using
04:42:14.080 the proper drawer description
04:42:16.840 component. And then in here, what you
04:42:19.920 will
04:42:21.320 do is you will copy the
04:42:25.480 command and all of its
04:42:28.760 classes. Just like this. There we go.
04:42:33.520 And let's see. Now we have command
04:42:36.160 responsive dialogue and we have to
04:42:37.760 export it. So go all the way down
04:42:40.200 here and export it like this. And then
04:42:45.040 when you go inside of your dashboard
04:42:46.600 command, replace the import to use
04:42:49.440 command responsive dialogue. And instead
04:42:51.680 of using command dialogue, use command
04:42:54.638 responsive
04:42:55.798 dialogue. As simple as
04:43:00.120 that. So now when you try opening this
04:43:03.200 up, let me try zooming in a little bit.
04:43:06.638 When you try opening this up, it should
04:43:09.120 render in a
04:43:10.440 drawer. Looks like it's not rendering in
04:43:12.958 a drawer. Let's see
04:43:17.160 why. So, I have set it to be a command
04:43:20.718 responsive dialogue. I have set this to
04:43:23.840 be is
04:43:27.560 mobile. Oh, because I'm not using the
04:43:31.480 return. My apologies. Return.
04:43:35.040 That's why it never
04:43:38.600 returned. The reason you don't see any
04:43:40.958 errors for these kinds of things is
04:43:42.638 because it's technically correct syntax.
04:43:46.480 You don't have to return, right? It's
04:43:48.920 just never what you want, right? And
04:43:52.878 there we go. Now it's a nice draw. So
04:43:56.240 that's exactly what I wanted. Uh so it's
04:43:58.878 easier to use this global search on
04:44:01.560 mobile. Perfect. And on desktop it stays
04:44:05.200 a dialogue. Amazing. So there will be uh
04:44:09.360 we will be coming back to this component
04:44:12.000 later on when we actually implement the
04:44:14.240 functionality of this because maybe
04:44:17.280 you've already guessed but the way this
04:44:19.680 works right now is by using filters,
04:44:23.440 right? So it's not actually doing any
04:44:25.280 API calls here. It's simply filtering
04:44:28.718 whatever we put inside, right? So for
04:44:31.920 example, if I do test two here and if I
04:44:34.638 type two, it only filters test two.
04:44:38.080 That's not what we want because what we
04:44:40.160 want is to do an API request on each
04:44:43.240 keystroke, right? But we will worry
04:44:46.080 about that
04:44:47.958 later. Perfect. So I think this is a
04:44:51.520 great smaller chapter. So we fixed some
04:44:54.878 of those things. And just one more thing
04:44:58.160 that I kind of want to bring to your
04:45:00.200 attention. You might have noticed
04:45:03.160 that any of my buttons which are not
04:45:06.160 links don't have the cursor pointer.
04:45:09.920 Instead, they look not exactly
04:45:12.840 clickable. So that's a change in
04:45:15.360 Tailwind version 4, right? Only links
04:45:19.600 have the cursor pointer, but buttons
04:45:22.480 don't have it. If you want to change
04:45:25.680 that, there is a small snippet you can
04:45:28.480 do. So, what you have to do is go inside
04:45:30.878 of
04:45:32.120 your app folder globals and go all the
04:45:36.240 way down here and simply
04:45:39.400 add this another layer base. And
04:45:44.080 basically you will find all elements
04:45:46.320 which are either buttons which are not
04:45:49.160 disabled or are any other elements which
04:45:52.480 have a role of button and are not
04:45:54.600 disabled. And for them add a cursor
04:45:57.120 pointer. So just don't forget this
04:45:59.040 little comma here if you are writing
04:46:01.040 this out. Uh I found this snippet from
04:46:03.920 the actual Tailwind version 4
04:46:05.958 documentation. So this is what they
04:46:08.400 suggest if you want to reverse uh that
04:46:11.280 effect. So now buttons are clickable
04:46:14.520 again if you prefer it that way. If for
04:46:17.280 whatever reason you don't want it that
04:46:19.120 way just remove this. But you can see
04:46:22.480 that now this clearly indicates hey I
04:46:24.638 can click on this right and I can click
04:46:26.958 on this and click on this and on this. I
04:46:30.718 prefer it this way. Great. So I think
04:46:34.080 that wraps it up. We added the
04:46:35.920 responsive dialogue and responsive
04:46:37.840 command dialogue. Perfect. So now let's
04:46:40.798 create review and merge this pull
04:46:43.080 request. So I'm going to go ahead and go
04:46:47.040 inside of my source control just to
04:46:49.120 review. Okay, so I have four files
04:46:51.400 changed. I'm going to create a new
04:46:53.958 branch 10
04:46:56.120 responsive
04:46:58.840 dialogue. I'm going to stage all of my
04:47:02.798 changes. There we go. Add a commit
04:47:05.520 message. 10 responsive dialogues.
04:47:09.560 dialogue and let's commit and publish
04:47:12.718 the branch. There we go. Let's go to our
04:47:17.560 GitHub. Let's open a pull
04:47:20.360 request and let's get a review from our
04:47:24.718 AI
04:47:27.560 bot. So, let's go through our code
04:47:30.480 summary. We have introduced a responsive
04:47:32.958 dialogue component that adapts its
04:47:34.878 appearance for mobile and desktop
04:47:36.798 devices. We have also added a responsive
04:47:39.840 command plet dialogue that adjusts its
04:47:42.480 layout based on the device type. There
04:47:45.360 we go. We have also added one more
04:47:48.638 command option and we improved cursor
04:47:51.680 feedback for enabled buttons and
04:47:53.680 interactive elements ensuring a pointer
04:47:56.160 cursor is displayed for better user
04:47:58.320 experience. That's exactly the way I
04:48:00.000 feel about it. Right. Uh great. Great.
04:48:02.798 And in here we have a whole sequence
04:48:04.480 diagram explaining the device type
04:48:07.280 detection and how we display a drawer or
04:48:10.638 a dialogue depending on uh well device
04:48:14.920 type in here. It left uh some comments
04:48:18.160 here. Uh so this is pretty cool. It
04:48:21.200 noticed the inconsistent padding between
04:48:23.440 mobile and desktop implementation in the
04:48:25.520 responsive dialogue component. Right? Do
04:48:27.440 you remember that? And we know that
04:48:30.958 that's okay.
04:48:32.718 Right? We know because drawer content
04:48:36.480 behaves differently than dialogue
04:48:38.878 content. So I told you that we need to
04:48:40.718 add padding for the drawer. But uh code
04:48:44.320 rabbit, you know, the AI can't really
04:48:46.400 know that the same way you probably
04:48:48.160 didn't know it, right? So it made a cons
04:48:51.520 uh a consideration for us here to remove
04:48:54.400 that to make it the same as for the
04:48:57.200 dialogue. But since we know that's not
04:48:59.520 the case, we can safely resolve this
04:49:02.240 conversation. But pretty good catch by
04:49:04.920 AI. Obviously, all of the command items
04:49:08.000 in the dashboard command are currently
04:49:10.638 just for test. So, no need to do that.
04:49:12.958 And this is interesting. So, it noticed
04:49:15.200 props type
04:49:16.680 inconsistency. Specifically, it noticed
04:49:19.200 it in the
04:49:22.120 command component. This one command
04:49:25.120 responsive dialogue. So in here we share
04:49:28.718 the component props type of dialogue and
04:49:32.718 then we use those
04:49:34.920 props to spread them to the
04:49:38.200 drawer. So yeah, this is a pretty good
04:49:41.120 catch because nothing is really ensuring
04:49:43.680 to us that these props will be
04:49:47.000 compatible or at least compatible
04:49:49.200 forever. But in this case, you know, the
04:49:51.600 draw, you already noticed that the
04:49:53.360 drawer component and the dialogue
04:49:55.120 component behave pretty much the same
04:49:57.120 and I'm pretty sure have the exact same
04:50:00.040 API. So that's open, default, open,
04:50:03.040 open, unopen, change, and model. All of
04:50:05.520 those are supported in the drawer. So we
04:50:09.360 don't have to add any explicit props
04:50:11.600 here. So it's very good that it noticed
04:50:14.320 that because I definitely didn't even
04:50:17.200 think of that, right? So you can see the
04:50:19.680 kinds of things uh it it suggests you to
04:50:24.120 refactor. So yeah, in case you're using
04:50:26.958 some newer version of Shaden and you're
04:50:29.040 having problems here, it might be
04:50:31.120 because of that. It might be because the
04:50:32.878 dialogue and the drawer components API
04:50:34.878 have diverged and they are no longer in
04:50:37.520 sync. But in my version of SHAT CN, uh
04:50:40.958 these components are exactly the same.
04:50:44.560 these props have the exact same uh API.
04:50:48.638 So I will resolve this conversation as
04:50:50.560 well and I'm going to merge this full
04:50:53.600 request. There we go. Once we've done
04:50:56.160 that, we can go ahead back inside of our
04:50:58.240 main branch and we can click this little
04:51:01.840 button here to synchronize the changes.
04:51:04.160 Let's click
04:51:05.400 okay. And that should bring back
04:51:08.798 everything. There we go. Amazing.
04:51:11.760 Amazing job. Confirm with your source
04:51:14.560 control graph here that everything's
04:51:16.480 okay. We just merged number 10
04:51:18.798 responsive dialogue. Amazing. See you in
04:51:22.240 the next
04:51:24.760 chapter. In this chapter, we're going to
04:51:27.440 go ahead and develop the agents form.
04:51:30.718 This will include creating a list header
04:51:33.240 component which is going to render the
04:51:36.400 my agents text and the new agent button.
04:51:41.440 Once we press on that button, we're
04:51:43.280 going to use previously created
04:51:45.200 responsive dialogue and render the agent
04:51:48.240 form
04:51:50.440 inside. In order to achieve all of that,
04:51:53.680 we're going to have to implement a
04:51:55.600 protected procedure, agents.create
04:51:58.600 procedure, the list header component,
04:52:01.440 the new agent dialogue, and the actual
04:52:04.560 agent form. And this agent form will be
04:52:07.840 reusable for both create and update
04:52:11.160 actions. So let's go ahead and start
04:52:14.000 with protected procedure. So right now
04:52:17.440 if you go inside of source
04:52:19.320 DRPC in it all you have is a base
04:52:24.120 procedure and for example in your
04:52:27.280 modules agents server procedures for get
04:52:32.160 many we use a base procedure. This is
04:52:35.520 the equivalent of an API request which
04:52:38.718 has absolutely no security at all in
04:52:42.240 sense of protecting the authorized
04:52:44.958 route. So that's what we're going to do
04:52:47.360 in this chapter. We're going to create a
04:52:50.240 protected procedure. So before you start
04:52:53.440 doing that, as always, ensure that
04:52:55.440 you're on your default branch and feel
04:52:57.840 free to click synchronize changes just
04:53:00.480 in case something was left over. Go
04:53:03.200 ahead and mpm rundev your app. And now
04:53:07.120 we're going to borrow the way we
04:53:09.600 protected our dashboard page. TSX using
04:53:13.520 the session like this. So you can copy
04:53:16.000 this right here and go inside of tRPC in
04:53:20.680 it. Now in here we're going to export
04:53:24.160 const protected procedure and we are
04:53:27.520 going to extend on top of base
04:53:29.920 procedure.
04:53:31.600 Technically, you could also do
04:53:33.320 t.procedure because that's exactly what
04:53:35.600 base procedure is. But just
04:53:37.200 semantically, it makes more sense that
04:53:39.680 our protected procedure is based on top
04:53:42.878 of a base procedure. Now, obviously, if
04:53:46.080 later on you modify your base procedure
04:53:48.320 to do something specific for, you know,
04:53:50.638 public routes, you wouldn't want to uh
04:53:53.840 build the protected procedure on top of
04:53:56.320 that, right? But for this kind of uh
04:54:00.400 arrangement it makes sense. So base
04:54:04.160 procedure dot use async and extract
04:54:08.638 context and next. So this is a kind of
04:54:12.520 middleware. And now we're just going to
04:54:15.360 paste the session
04:54:17.878 await from out which we have to import
04:54:21.280 from lib out. So make sure you've added
04:54:23.200 this import and import the headers.
04:54:27.280 from next
04:54:29.000 headers. And now we have our session
04:54:32.000 using the server side out adapter from
04:54:34.718 better out. And what we're going to do
04:54:37.280 is check if there is no
04:54:39.320 session. Throw new TRPC error
04:54:44.440 here. Make sure you import TRPC error
04:54:47.200 from at TRPC
04:54:49.560 server.
04:54:51.400 Code unauthorized.
04:54:54.120 message unauthorized or whatever you
04:54:57.360 want to throw and the
04:55:00.920 important throw back next and extend the
04:55:05.360 context. So we're going to spread the
04:55:07.120 existing context and under key out we
04:55:10.878 are going to store the current session.
04:55:13.280 So now after this validation passes we
04:55:16.798 will have access to the currently logged
04:55:18.958 in user information in all of our future
04:55:21.680 procedures. So now we have the protected
04:55:24.400 procedure here. So let's go ahead now
04:55:28.718 and do the following. Let's go inside of
04:55:30.560 modules agents server procedures. Leave
04:55:33.920 this as base procedure for now. So I'm
04:55:36.638 going to add a little to-do change get
04:55:40.760 many to use uh protected procedure you
04:55:46.638 know just in case we forget. But for now
04:55:49.120 just leave it like this. Instead, let's
04:55:51.080 create the create procedure using the
04:55:55.480 protected procedure. So, make sure you
04:55:57.760 import this. Great. Now, inside of here,
04:56:02.160 we're going to add an input. And inside
04:56:04.798 of the input, we're going to add the
04:56:07.280 schema for create. So, let's go ahead
04:56:10.958 and do this. Inside of the agents
04:56:12.638 module, create a new file called
04:56:14.560 schemas.ts.
04:56:18.958 So it's like this. It's not specifically
04:56:21.200 in the server folder nor the UI folder.
04:56:23.920 It's schemas for itself in the agents
04:56:26.360 folder. In here, import Z from zod
04:56:31.600 export con agents insert schema Z object
04:56:36.920 name string with a minimum value of one
04:56:41.280 and a message name is
04:56:44.520 required. And the same thing for
04:56:47.040 instructions.
04:56:49.760 like this and now let's pass in the
04:56:53.200 agents insert schema here. So the reason
04:56:55.600 I have done it in a separate file is
04:56:58.638 very simple so I can later reuse it for
04:57:03.200 the form. Great. So protected
04:57:07.320 procedure.input and then let's chain dot
04:57:10.240 mutation because this is not a query.
04:57:12.400 This is a mutation. So in here we grab
04:57:15.040 async again and we can export uh my
04:57:17.840 apologies. We can destruct input and the
04:57:20.958 context from here.
04:57:24.240 So what is what in the input we can grab
04:57:29.638 things like our name and instructions
04:57:33.280 basically the things that will uh be
04:57:36.000 added through a form but from the
04:57:39.798 context we can now
04:57:42.040 destructure out and out will hold our
04:57:46.718 session our user ID and our user
04:57:50.000 information. You can see even some more
04:57:52.160 useful things here.
04:57:54.000 So that's what these two hold. So let's
04:57:57.920 go ahead and do the following const data
04:58:01.440 or we can do this. We can do you can
04:58:03.600 immediately destructure the array and go
04:58:07.520 ahead and write created agent to be
04:58:10.958 await database. You already have it
04:58:13.440 imported because we used it here. So
04:58:16.080 database.insert insert into agents
04:58:19.638 schema
04:58:21.240 values and in here spread the input and
04:58:26.160 attach user ID from context out user
04:58:31.798 ID and make sure to chain returning.
04:58:36.000 There we go. So now when you hover over
04:58:37.680 created agent you will see that that
04:58:39.360 will be a new created agent. If you
04:58:41.440 forgot to add returning, then it's just
04:58:44.638 a type of any because it's not returning
04:58:46.958 anything. If you're wondering why do we
04:58:49.200 need to do it inside of an array like
04:58:51.040 this? Why not just like this? That's
04:58:53.280 because by default, Drizzle always
04:58:55.760 returns an array because that's the way
04:58:58.638 SQL natively works, right? So that's why
04:59:01.840 we have to dstructure the first item in
04:59:04.160 this array because we know that even
04:59:06.560 though this is an array, we are only
04:59:09.200 creating a single record. So it's safe
04:59:11.760 for us to simply access the first item
04:59:14.560 in this array immediately in here
04:59:17.440 calling it created
04:59:19.958 agent. And once you've obtained the
04:59:22.240 created agent, you can simply return the
04:59:24.160 created agent. And what's cool is that
04:59:27.280 this is a fully uh validated and
04:59:31.000 alprotected procedure now. Even though
04:59:34.080 we didn't explicitly write any checks
04:59:36.480 here, so if the user forgets to pass
04:59:39.440 instructions or the name for the agent,
04:59:42.400 this will cause the procedure to fail.
04:59:45.280 And if the user is not logged in, this
04:59:48.400 the protected procedure will cause it to
04:59:51.440 fail. So that's how we have abstracted
04:59:54.878 that into our safe API safe
04:59:58.600 procedure. Perfect. Now let's go ahead
05:00:02.080 and create our list header component. So
05:00:06.400 let me just go to our app here. Make
05:00:08.560 sure you have your app running of course
05:00:10.560 and let's go inside of agents. So we are
05:00:12.560 on the same page here. And in here,
05:00:15.280 let's go inside of source app
05:00:18.520 folder dashboard agents page. And now
05:00:23.040 what we're going to do is the following.
05:00:25.360 So you might think that we will put the
05:00:28.480 list header component which is this the
05:00:32.560 text my agents and the new agent button
05:00:35.280 inside of the agents view. Right? Maybe
05:00:37.280 add it above this. We are not going to
05:00:40.400 do that because it makes no sense for
05:00:43.600 that part to be shown an error or for
05:00:47.040 that part to be loading. That part never
05:00:50.638 needs to load. It's static. Right? We
05:00:53.520 are not loading the agent name. It's
05:00:55.520 just a hard-coded text my agents. So
05:00:58.638 what we can do is inside of this server
05:01:01.638 component, we can simply render some
05:01:04.320 things outside of this hydration
05:01:06.000 boundary here. for example, list header
05:01:09.040 like
05:01:09.878 this. And now we are going to go ahead
05:01:13.200 inside of modules agents UI and create a
05:01:17.280 new folder called components just so we
05:01:19.600 semantically differentiate between the
05:01:21.440 two. And let's call this one list
05:01:24.840 header.tsx. If you want to, you can call
05:01:26.638 it agents list header if you want to be
05:01:29.120 more specific. Let's export const agents
05:01:32.560 list
05:01:34.360 header like this.
05:01:38.878 Let's just call it list
05:01:41.160 header. And in here, import agents list
05:01:44.320 header from modules agents UI components
05:01:47.120 agents list header. So now you will see
05:01:51.280 that this list header is automatically
05:01:53.440 displayed regardless of this being in
05:01:56.160 the loading state. And that's exactly
05:01:58.080 how I wanted it to behave, right?
05:02:00.240 There's no point in hiding this while
05:02:02.240 it's
05:02:03.080 loading. Perfect. So now let's work
05:02:05.680 inside of the agents list header here.
05:02:09.200 And let's give this div a class
05:02:11.718 name of
05:02:13.718 py4
05:02:17.718 px4 and let's do
05:02:21.480 mdpx8 flex flex column and gap y of
05:02:26.360 four. Now inside of here add another div
05:02:29.280 with a class name flex item center and
05:02:32.000 justify between
05:02:34.958 And in the first element here which is
05:02:37.760 the heading five write my agents. And
05:02:41.840 then below it add a button from
05:02:44.400 components UI button with the text new
05:02:47.320 agent. So make sure you've added this
05:02:49.600 import here. Uh and also yeah mark this
05:02:52.560 as use
05:02:54.840 client because by default uh if you just
05:02:59.440 put a new component inside of a server
05:03:01.680 component it will be a server component
05:03:04.360 until either the parent has used client
05:03:07.600 or the component itself has used
05:03:10.600 client and uh I have to explain this
05:03:14.080 just in case you got confused. Now, so
05:03:16.798 if you were to mark this as use client,
05:03:19.920 then yes, every single ch child inside
05:03:23.120 of here would automatically become a
05:03:25.120 client component as well. But that can
05:03:28.958 be uh overridden if you used children
05:03:33.360 for example. So if you inject children
05:03:35.840 into a use client component,
05:03:40.360 whoops, then everything will become a
05:03:43.360 client component besides the children.
05:03:45.680 Children act like kind of a portal
05:03:48.000 outside of it. Right? So I just needed
05:03:50.000 to explain that just in case uh you
05:03:52.958 jumped to some conclusions because I
05:03:54.718 often get comments asking about that. Uh
05:03:57.920 I will try to find a better example
05:04:00.000 because this wasn't exactly the best way
05:04:02.560 to show it. So yeah, just make sure you
05:04:04.400 didn't change anything in this uh agents
05:04:07.360 page besides adding the agents list
05:04:09.440 header here. And now let's see how this
05:04:12.240 looks like. There we go. The text my
05:04:13.840 agents and the new agent button. So now
05:04:16.878 what I want to do is I want to give this
05:04:18.798 H5 element a class name of font
05:04:24.120 medium and text extra large. There we
05:04:27.920 go. My agents new agent. And for this
05:04:30.798 button, let's add it a plus icon
05:04:33.878 here from Lucid
05:04:36.920 React and give the plus icon a class
05:04:39.840 name. Actually, I don't think you need
05:04:41.920 to do anything. It will automatically
05:04:44.160 have the proper class name. There we go.
05:04:46.638 Great. So now, uh, what we have to do is
05:04:51.920 we have to enable a dialogue to open
05:04:54.958 when we click on the new agent. So for
05:04:58.000 that we're going to go inside of this
05:05:00.240 agents modules agents UI components and
05:05:03.120 we're going to create uh new agent
05:05:07.240 dialogue
05:05:09.080 tsx and in here import our previously
05:05:13.040 created responsive dialogue from
05:05:15.520 components responsive dialogue create an
05:05:18.400 interface new dialogue new agent
05:05:21.920 dialogue props open boolean on open
05:05:28.120 change a simple toggle for
05:05:31.320 that and export con new agent
05:05:35.320 dialogue. Let's go ahead and assign the
05:05:37.680 props here and destructure
05:05:40.760 them open on open
05:05:44.040 change and in here return the responsive
05:05:47.680 dialogue like this. Let's give it a
05:05:51.000 title. New agent, a description, create
05:05:55.440 a new
05:05:58.120 agent. Open and on open
05:06:02.600 change. And inside of here, you can just
05:06:05.280 write new agent
05:06:08.600 form. There we go. So, we now have the
05:06:10.958 new agent dialogue. So, we can now go
05:06:13.120 back inside of the agents list header,
05:06:15.840 encapsulate this entire component in a
05:06:18.320 fragment. So we are semantically correct
05:06:20.240 with the positioning of our new agent
05:06:22.798 dialogue. Even though it uses a portal,
05:06:25.680 right? So uh it doesn't really matter
05:06:28.000 where you put it, but I like to be
05:06:29.440 semantically correct. Now in here, let's
05:06:32.798 add is dialogue open and set is dialogue
05:06:37.600 open to be use state from React with
05:06:40.718 default false. Let me just align these
05:06:44.798 imports like I like them to. Let's set
05:06:48.320 the open here to be is dialogue open and
05:06:51.520 on open change to be set is dialogue
05:06:54.440 open and modify the button on click here
05:06:58.718 to modify set is dialogue open to true.
05:07:02.718 There we go. So now when you click new
05:07:04.958 agent you get the new agent dialogue and
05:07:07.840 in case you are on mobile you will get a
05:07:10.958 draw. So exactly as we've developed in
05:07:13.680 the previous chapter. Perfect. So what
05:07:16.958 we have to do now is develop the actual
05:07:20.638 uh new agent form which will be
05:07:23.280 compatible uh both for updating and for
05:07:28.400 creating the
05:07:29.878 agents. So let's go inside of components
05:07:32.400 here. So modules agents UI components
05:07:35.638 agent dash form. It's unspecified
05:07:39.360 whether it's a new agent form or update
05:07:41.520 agent form because it's one form to rule
05:07:43.840 them all. So in here let's create an
05:07:46.320 interface agent on props and inside of
05:07:50.878 here we're going to get on
05:07:52.840 success to be an optional type of call
05:07:56.240 back right same as on cancel. So these
05:07:59.280 are not won't be required but uh it's
05:08:02.240 good to have them in case you want to
05:08:03.920 redirect the user after a success or if
05:08:06.718 they cancel right and then we need the
05:08:09.040 optional initial values right but uh
05:08:13.760 right now we have no idea
05:08:17.360 uh what the type of the initial values
05:08:19.798 is. So, how about we create this? And
05:08:24.160 the way we can do this, the way I like
05:08:27.200 to do this is not by reading what's
05:08:30.878 inside of my schema. That's one way of
05:08:33.120 doing it. We could infer this from
05:08:35.000 Drizzle, but what I like to do is I like
05:08:38.480 to know exactly what my
05:08:42.120 procedure returns back. So, that's the
05:08:45.680 way I like to do it. So, this is what
05:08:48.240 we're going to do. Let's quickly uh
05:08:51.600 create a get one
05:08:54.760 procedure. So get one and the reason
05:08:58.878 that I'm doing this is simply because
05:09:02.638 when the user goes about updating the
05:09:05.040 agent, they will first have to fetch
05:09:08.320 that individual agent. So that will be
05:09:10.798 done using the get one procedure. So
05:09:13.840 let's uh also keep this as base
05:09:16.638 procedure for now. It really doesn't
05:09:18.080 matter. Let's just add two comments
05:09:20.000 here. So change get one to use protected
05:09:22.400 procedure. So let's just add uh base
05:09:26.080 procedure here. It's okay. And let's add
05:09:28.480 the input here to be Z.object. And I
05:09:31.680 think we need to import Z here. So
05:09:34.240 import Z from Zod like this. And in here
05:09:38.718 just set the ID to be a type of string.
05:09:40.958 We are basically fetching the individual
05:09:44.240 agent using ID. So select from agents
05:09:48.000 where and then add equals from drizzle
05:09:51.280 or like
05:09:54.520 this. And all you're going to check is
05:09:57.680 whether agents do ID equals input do ID
05:10:02.080 and you have to destructure the input
05:10:04.080 from here. And then you can use it
05:10:07.400 here. And then in here you can
05:10:09.840 destructure the individual existing
05:10:12.400 agent like this and return it. So when I
05:10:16.718 hover over this you will see that it's
05:10:18.560 the correct type. So this is the initial
05:10:22.080 values that the update form will be
05:10:24.878 populated with. That's why I wanted to
05:10:27.200 create this right here. So make sure
05:10:31.440 that you have added this. So it's just a
05:10:33.280 very simple temporary form. We are going
05:10:35.520 to change it to protected procedure
05:10:37.120 later. We will do the whole proper
05:10:38.798 thing. Let's just leave it like this for
05:10:40.400 now. And let's go inside of agents and
05:10:43.040 let's create
05:10:45.080 types.ts. And we are not going to type
05:10:48.080 any types. We are just going to infer
05:10:50.320 them here. So import infer router
05:10:53.280 outputs from at
05:10:55.878 gRPC/server and go ahead and
05:10:59.080 import type app
05:11:01.958 router from atward
05:11:05.878 slashtrpc
05:11:07.560 routouters_app. So it's basically this
05:11:09.760 export right here in our tRPC
05:11:12.360 routers_app folder. So this app router
05:11:15.840 now has access to the entire agent's
05:11:18.000 router including the get one procedure.
05:11:20.638 So what I can do now is export type
05:11:23.200 agent get one and make it infer router
05:11:27.240 outputs pass in the app router. So it
05:11:30.000 has the context target the agents
05:11:32.760 specifically the get one procedure. So
05:11:35.760 now when I hover over this this is the
05:11:38.798 type that I am returning in this get one
05:11:41.718 procedure. So now we have this reusable
05:11:44.798 get one type which is correctly inferred
05:11:49.360 as our API will return it right because
05:11:53.440 you might think oh it would be much
05:11:55.280 shorter if I just inferred it from the
05:11:57.760 database schema well true but what if we
05:12:01.120 change our get one base procedure and we
05:12:03.600 only select the name for example right
05:12:06.400 and we don't select anything else then
05:12:09.440 your schema will not be correct right so
05:12:12.080 that's why I like to uh know exactly
05:12:14.798 what my API returns. So right now, for
05:12:17.120 example, let's try and do this. I'm I'm
05:12:18.958 not sure if I'm doing it correctly. Uh
05:12:21.680 but let's say I use name agents.name. Is
05:12:24.878 this how I do it? And now when I hover
05:12:27.280 over this, you can see that it only
05:12:29.280 returns the name, right? So that's why I
05:12:31.840 think it's important to use the return
05:12:35.280 of your API rather than your schema here
05:12:38.958 because this is what defines what will
05:12:42.080 the initial values be. So now we have
05:12:44.480 that in here. I just removed that select
05:12:46.560 you do it as well. Okay. So we just did
05:12:49.280 a small detour here. Now let's go back
05:12:51.440 inside of UI components agent form and
05:12:54.320 we can now set the agent get one from
05:12:57.760 our types here. And now we know what our
05:13:00.798 initial values will be. Now let's export
05:13:03.920 con agent
05:13:06.440 form. And in here let's add agent form
05:13:10.000 props. And let's dstructure on success
05:13:13.120 on cancel and initial
05:13:15.638 values. Let's prepare TRPC from use TRPC
05:13:19.760 here. Let's prepare router from use
05:13:22.480 router from next navigation. And let's
05:13:25.280 import query client from use query
05:13:29.120 client from tanstack react query. My
05:13:31.520 apologies. Uh oops. No, no, no. This is
05:13:33.600 incorrect. Use query
05:13:36.040 client. There we go. No need for this.
05:13:40.240 So
05:13:41.240 use router from next navigation. Use
05:13:44.638 query client from 10stack react query.
05:13:46.798 Use tRPC from ad/trpc client and agent
05:13:50.400 get one from the types. Great. Now let's
05:13:54.400 go ahead and create our create agent
05:13:58.400 method using use
05:14:00.440 mutation from tanstack react query and
05:14:04.560 in here simply pass the TRPC agents
05:14:09.840 create and pass in the mutation options
05:14:13.240 here and in the mutation options define
05:14:16.480 on success method here for now to be
05:14:19.760 empty and on error to be empty as But
05:14:23.440 we're going to come back to this uh
05:14:26.520 later. Great. So now that we have this
05:14:31.280 uh let's go ahead and create our form
05:14:35.200 here. So const form will be use form
05:14:38.958 from React hook
05:14:41.560 form and we're going to Z.infer. And in
05:14:45.280 order to do this we need to
05:14:47.000 import Z from zod. So Z.info info and we
05:14:53.200 don't have to write any new schema. We
05:14:54.958 can just do a type of agents insert
05:14:58.280 schema. Do you remember this? We've
05:15:01.360 created this previously just a moment
05:15:03.280 ago when we used it inside of our create
05:15:06.638 procedure agents insert schema. It's
05:15:09.200 located inside of our modules agents
05:15:12.958 schemas. It's right here. So I just
05:15:15.520 import that again and then I can use it
05:15:18.240 here and I don't have to write any new
05:15:20.600 schemas. I can then add my resolvers zod
05:15:23.600 resolver from hook form resolvers zod
05:15:26.480 and pass the agents insert
05:15:29.160 schema and add my default
05:15:31.958 values which are name and
05:15:35.240 instructions. So make sure that you have
05:15:37.680 imported the ZOD resolver
05:15:40.120 here and then make sure that you
05:15:42.878 properly assign default values right
05:15:45.280 because this is true for a new form but
05:15:47.840 if we actually have initial values we
05:15:50.000 should fill them. So go ahead and check
05:15:52.878 if you have initial
05:15:55.080 values and then depending on if we are
05:15:58.760 intame or an empty string or if we are
05:16:01.520 in dot instructions or an empty string.
05:16:04.160 So this way it's going to populate or
05:16:06.718 fall back to an empty
05:16:08.840 string. Great. So we now have the form.
05:16:11.520 Now let's create a useful isedit method
05:16:14.240 here which will be simply be a double
05:16:17.120 exclamation point initial values
05:16:20.400 question mark id. So this is what we're
05:16:23.440 going to use to determine whether this
05:16:25.120 is editing form or creating form. And
05:16:28.798 let's define const is pending here to be
05:16:32.080 create agent is pending. The reason I'm
05:16:34.560 adding it in a separate variable is
05:16:36.878 because later we're going to have update
05:16:39.400 agent is pending. So right now this does
05:16:42.560 not exist. So that's why it's an error.
05:16:44.718 But let's already be prepared for this
05:16:46.878 to be uh extended later on. Perfect. So
05:16:51.280 now let's do con onsubmit method here
05:16:54.718 which gets the value z infer type of
05:16:58.798 insert agent
05:17:00.520 schema. agents insert schema. My
05:17:03.958 apologies. Uh and if is
05:17:07.878 edit, we're just going to do console log
05:17:11.200 to do uh update agent. Else we are going
05:17:15.600 to do create
05:17:17.638 agent.mmutate and pass in the
05:17:20.120 values like this. There we
05:17:22.760 go. Perfect. So now what we have to do
05:17:26.000 is we have to import everything from our
05:17:29.280 form
05:17:31.080 control I mean from our add/components
05:17:34.958 UI form. So form form control field item
05:17:38.878 label and message. Besides that we're
05:17:41.600 also going to use our generated avatar
05:17:44.560 component which we have already used in
05:17:47.360 our dashboard user button in case the
05:17:49.520 user doesn't have an image.
05:17:52.080 And we're going to add text area. I
05:17:54.480 think this is the first time using this
05:17:56.040 component. Uh it's just a text area in
05:17:59.760 your source components UI text area
05:18:02.400 added from chats and UI. And besides
05:18:05.120 that, we're also going to need the usual
05:18:07.840 input from components UI input and
05:18:10.000 button from components UI uh button. And
05:18:13.840 I think for now that's all the imports
05:18:17.360 we need. Let's go ahead and develop this
05:18:19.120 form now. So after on submit, let's
05:18:22.000 finally do a return here and open up a
05:18:24.718 form. Go ahead and spread the form from
05:18:28.320 use form here. Inside of here, add a
05:18:31.680 native HTML form element. Give it a
05:18:34.400 class name of space y4 and give it an
05:18:37.680 onsubmit of form handle submit and pass
05:18:40.638 in the onsubmit function. In case you're
05:18:43.280 wondering why am I doing a function
05:18:45.440 inside of a function uh form handle
05:18:48.798 submit basically ensures that uh we
05:18:52.400 didn't do anything wrong in regards to
05:18:55.680 the schema right so this part will
05:19:00.520 prevent this from being called which is
05:19:03.680 the actual submit method if the form is
05:19:06.638 not correct if it's too short right if
05:19:09.600 there are any HTML errors being thrown
05:19:12.360 phone. So now inside of here, let's add
05:19:14.878 a generated avatar component here. And
05:19:18.160 we're going to give the seed to be
05:19:20.520 form.watch name. So every time you
05:19:22.798 change the name of this agent, a new
05:19:24.798 avatar will be generated according to
05:19:27.360 that name. The variant will be uh bots
05:19:31.440 neutral. Let me just select it. There we
05:19:34.080 go. And class name will be border and
05:19:38.600 size 16. There we go. Now let's add a
05:19:42.320 form field which is a self-closing tag.
05:19:44.638 Let's give it a name of name and let's
05:19:47.120 give it a control of form.cont control
05:19:50.000 and then finally a render method. In
05:19:52.798 here we can immediately dstructure the
05:19:55.638 field. Let's add form item here form
05:19:59.760 label which will be the
05:20:01.718 name. Let's add form control here. And
05:20:05.200 let's render the input. And let's simply
05:20:08.400 spread the field here. So, let's go
05:20:11.280 ahead and check it out. Uh, let me just
05:20:14.400 see. Okay, these errors are fine. These
05:20:16.480 are just unused values. I think what I
05:20:19.200 have to do now is go inside of my new
05:20:21.440 agent dialogue right here and actually
05:20:25.360 render the agent
05:20:28.040 form from dot / agent form. Now in here
05:20:34.400 uh what I want to pass is on success on
05:20:38.320 open change false and on cancel too. So
05:20:42.638 basically once we complete the form and
05:20:45.360 once we or if we cancel the form just
05:20:49.120 close the responsive dialogue. So that's
05:20:51.280 what we want in the call back. So now if
05:20:53.600 you click here you should see this
05:20:56.798 right. How you name your agent will
05:20:59.760 depend on the avatar that will be
05:21:01.680 generated. And I think that's pretty
05:21:03.520 cool because this way we have consistent
05:21:05.760 avatars for an agent, right? If you name
05:21:07.840 it John, it will have this avatar
05:21:10.480 everywhere because we're always going to
05:21:12.240 use the agent name as the
05:21:14.920 seed. Perfect. So now let's go ahead and
05:21:19.680 uh let me just see one thing. Yeah, this
05:21:21.840 doesn't have a placeholder. So if you
05:21:23.360 want to, you can add a placeholder here.
05:21:29.440 for example, John, right? Or I don't
05:21:32.400 know, maybe something like math
05:21:35.240 tutor,
05:21:37.000 right? Uh now what we're going to do is
05:21:39.680 we're going to copy this entire form
05:21:41.440 field and we're going to use a
05:21:45.000 instructions here. This will be
05:21:47.718 instructions and instead of using the
05:21:49.840 input, we will use a text area. Right?
05:21:53.520 And in the placeholder here, you can
05:21:55.920 add, you know, whatever you want to
05:21:59.040 explain to your users what it is. So,
05:22:01.920 for example, it can be, let me just
05:22:05.200 paste it. You are a helpful, let's do
05:22:08.718 math assistant that can answer questions
05:22:10.878 and help with
05:22:16.920 assignments like this, right? Whatever
05:22:19.600 you want to add inside. There we go.
05:22:23.080 Perfect. And then what we need is
05:22:28.200 after still inside of the form, right?
05:22:30.798 But after the form control here, add a
05:22:37.560 div and inside check if we have on
05:22:41.320 cancel. If we do, render a button and
05:22:45.760 the text
05:22:47.240 cancel. Give it a variant of ghost.
05:22:51.520 disabled of is
05:22:53.878 pending and type of button. This is very
05:22:57.280 important otherwise it will submit the
05:22:59.840 form because it's still inside of the
05:23:01.840 form
05:23:02.840 here and on click here will be a very
05:23:06.240 simple on
05:23:09.638 cancel and then you can add another
05:23:12.638 button
05:23:14.040 here. loading actually disabled here
05:23:17.200 will be is pending as
05:23:19.638 well and give it a type of
05:23:23.320 submit. Check if it's edit and then
05:23:26.080 render update otherwise render create.
05:23:30.000 There we
05:23:31.080 go. Perfect. So now you have cancel and
05:23:34.958 create here. And let's just use this div
05:23:38.320 to give it a flex justify between and
05:23:41.040 gap x of two. There we go. So now when I
05:23:44.560 click cancel here I can close this and
05:23:46.718 the reason I can close it because in
05:23:48.480 here I have added a call back here to
05:23:50.638 close it. Right. Perfect. So now
05:23:55.440 uh yeah I think that I uh forgot to do
05:23:59.280 one thing here for the name also add
05:24:02.400 form message here outside of the form
05:24:05.520 control and do the same thing here.
05:24:08.400 Great. Right. So now if you try submit
05:24:10.080 this you will see the errors and yeah
05:24:13.280 looks like inside of um my agent schemas
05:24:17.840 I need to change this to be
05:24:19.878 instructions are
05:24:23.160 required. There we go.
05:24:27.240 Perfect. So
05:24:29.160 now let's just see what's being unused
05:24:32.400 here.
05:24:34.160 So this is what we're going to do
05:24:36.600 now in the on success. Let's do the
05:24:41.480 following. Let's use query client to
05:24:45.680 invalidate queries
05:24:48.760 brpc
05:24:50.600 aents.get many and pass in the query
05:24:54.840 options like this.
05:24:59.120 And later on I'm going to add a to-do
05:25:01.638 here. Uh invalidate individ. Oh actually
05:25:05.760 we can do it. Yes my apologies. We can
05:25:07.840 already do if initial
05:25:11.160 values has the id. We can also
05:25:14.760 invalidate another
05:25:17.160 thing called PRPC agents what we just
05:25:21.360 created get one because in here we need
05:25:25.360 to pass the id and in this case that is
05:25:28.480 the initial value ID. So what's going on
05:25:30.878 here? Basically uh when on success
05:25:35.120 happens when we create the agent and we
05:25:37.760 successfully do it uh we are going to
05:25:40.638 invalidate the get many so that this
05:25:44.240 right here refreshes. So we're going to
05:25:47.120 add a new agent and we want to
05:25:48.560 immediately show that new agent in the
05:25:50.718 table. So that's why we need to
05:25:52.400 invalidate those queries. Right? And
05:25:55.520 this is where you actually see the power
05:25:57.520 of using pre-fetching in server
05:25:59.440 components and uh handling it the rest
05:26:02.000 in the client components because the
05:26:04.480 fact that in
05:26:06.520 the page tsx of our whoops
05:26:11.718 page.tsx in our agents we do the
05:26:14.600 prefetching it does not prevent us from
05:26:18.320 continuing to refetch this through
05:26:21.040 invalidation or any other method. Right?
05:26:23.760 So that's why I prefer using this way.
05:26:27.200 You could have done the same thing. Of
05:26:28.878 course, if you used just normal use
05:26:31.040 query here, but if you used uh if you
05:26:34.160 actually load the data in the server
05:26:36.000 component and then passed it as a prop,
05:26:37.840 you would not be able to revalidate it
05:26:39.920 like this. Right? That's why I really
05:26:42.160 like this way of doing it. And also um
05:26:44.958 this invalidated queries, I think that
05:26:46.958 they are a promise. So if you want to
05:26:49.600 you can mark this as async and then you
05:26:51.440 can await them.
05:26:53.440 like this. I'm not sure if you have to
05:26:55.480 wait. Not exactly sure. I mean, they
05:26:58.240 definitely still work, but you know. And
05:27:00.878 let's also add on success here, but
05:27:03.360 since it's optional, do it like this.
05:27:06.638 And two S's. There we go. So, this will
05:27:09.600 then close it, right? Why do I say it
05:27:12.000 will close it? Well, because we added
05:27:15.360 that to happen
05:27:17.798 here. Uh, great. So now let's go ahead
05:27:22.480 and go inside of the on error here. And
05:27:25.440 what we have to do here is the
05:27:26.878 following. So in here we have to first
05:27:28.718 go inside of our root layout. So in the
05:27:31.600 app folder layout and add a toaster from
05:27:35.520 components UI soner. So it's not a
05:27:38.840 wrapper. It is just a component to be
05:27:42.080 added like this. And then instead of the
05:27:44.638 agent form, you're going to get the
05:27:47.120 error here. And you're going to do toast
05:27:50.638 error
05:27:51.718 here. Error
05:27:54.600 dossage. And you can import toast from
05:27:59.320 soner like
05:28:01.320 this. And I will just add a to-do
05:28:05.040 comment here. Let me just go here. To-do
05:28:09.600 check if error code is
05:28:13.400 forbidden. Redirect to forward
05:28:16.160 slashupgrade. So we don't yet have this
05:28:18.558 but we will have this in the future. Uh
05:28:21.600 great. So the only thing that is uh
05:28:24.480 unused at the moment is use router.
05:28:28.360 Um and there is something that um yeah
05:28:32.718 okay let's just remove use router then
05:28:35.600 because we can't really redirect
05:28:37.520 anywhere at the moment. Great. So I
05:28:39.760 think that this is now ready to create.
05:28:42.718 Let's try it actually. So, make sure
05:28:44.878 that you're logged in and let's try a
05:28:47.360 test and test instruction
05:28:49.958 here. Instruction. Let's click create
05:28:53.600 and let's
05:28:54.920 see. I think that it works. Test
05:28:58.480 instruction. It's right here. There we
05:29:00.240 go. Test instruction and test. Perfect.
05:29:03.760 So, it's exactly what we wanted. Let's
05:29:05.680 try another one. Let's click create. And
05:29:08.878 there we go. It immediately adds that
05:29:10.958 here. Perfect. Uh now let's go ahead and
05:29:14.958 let's try an error. So how do we achieve
05:29:18.878 an error? Well, I think there is one way
05:29:21.840 of achieving the error without changing
05:29:24.040 anything. So if you go inside of source
05:29:26.558 app folder dashboard agents page, you
05:29:29.120 can see that this page is not
05:29:31.480 protected. So unauthorized users can
05:29:34.638 actually see this page. And I purposely
05:29:37.280 told you that in the get many you leave
05:29:40.798 it as the base procedure the same as get
05:29:43.798 one. The reason I told you is so I can
05:29:46.718 demonstrate this. So I'm going to copy
05:29:50.480 this URL and I'm going to log
05:29:53.240 out and then I will go back here in the
05:29:56.240 agents. As you can see I can access this
05:29:58.798 page even though I'm logged out. So this
05:30:01.600 would be a very bad thing, right? But
05:30:05.440 what happens when a logged out user
05:30:07.200 actually tries to create something? You
05:30:09.600 get back uh what I now notice is a typo.
05:30:13.080 Unauthorized. Let me just quickly fix
05:30:15.440 that inside of my DRPC in it.
05:30:20.040 Unauthorized. Right? So even if you
05:30:24.160 forget to do uh a redirect in the server
05:30:30.000 page, right? Because in my
05:30:32.360 dashboard
05:30:34.040 page, I do this session and I do the
05:30:37.040 redirect. So even if you forget to do
05:30:39.040 that somewhere, you don't have to worry
05:30:40.958 because that is our last line of
05:30:43.120 defense. Our first line of defense are
05:30:45.760 going to be the protected APIs. So now
05:30:49.280 what I want you to do is the following.
05:30:50.958 I want you to go inside of your agents
05:30:53.120 procedure. So modules agent server
05:30:55.040 procedures and now change this to
05:30:58.760 protected procedure and you can remove
05:31:01.840 this comment and same thing for get one
05:31:04.400 protected
05:31:05.798 procedure and you can remove the base
05:31:08.160 procedure input and now when you do a
05:31:10.638 refresh here you will see that logged
05:31:13.120 out users cannot even see the data. So
05:31:17.360 even if you forget to protect your page
05:31:20.480 and redirect the user away, you don't
05:31:23.440 have to be afraid because our APIs are
05:31:27.120 completely protected. As you can see
05:31:28.718 here, we have this unfortunate maximum
05:31:30.958 update depth which I talked about
05:31:32.558 previously. But you can see that
05:31:33.680 eventually it stops and it will just
05:31:35.680 show the user an error and if they even
05:31:38.080 try to create something, they also get
05:31:40.240 the unauthorized error. So there's
05:31:42.040 absolutely nothing they can do. But
05:31:45.040 let's just wrap it up with doing proper
05:31:47.520 redirect here as well. So we can just
05:31:50.080 copy this from the dashboard. This
05:31:52.240 entire thing here. There we go. And we
05:31:54.798 can do it before we even add these like
05:31:59.320 that. So import out from lib out. Let me
05:32:03.600 just move it here.
05:32:05.840 import
05:32:06.760 headers from next
05:32:10.120 headers and import
05:32:13.000 redirect from next
05:32:16.200 navigation. So now even if you refresh
05:32:20.080 you can no longer access that. So I just
05:32:22.400 told you the worst case scenario which
05:32:24.958 is you forget to redirect from the
05:32:27.440 server component nothing dangerous will
05:32:29.680 happen. That's because our that's our
05:32:31.760 this is our last line of defense, right?
05:32:34.160 This is not what's actually protecting
05:32:35.840 our app. TRPC and the proper use of
05:32:39.680 procedures are protecting our app.
05:32:42.480 That's what's handling the errors and
05:32:44.400 that's what's protecting the actual
05:32:46.320 data. Perfect. So I think we've learned
05:32:48.798 a lot in this agents form. Uh so we have
05:32:51.798 successfully created the protected
05:32:53.920 procedure agents create procedure list
05:32:56.080 header uh new agent dialogue and the
05:32:58.480 agent form which is reusable for both
05:33:00.558 create which we demonstrated but we we
05:33:03.120 can't yet demonstrate the update. And
05:33:05.200 now let's go ahead and merge these
05:33:07.718 changes. So I'm going to go ahead and
05:33:11.200 click on my branch here. Create a new
05:33:15.480 branch. This is 11 agents form. So 11
05:33:19.920 agents form. Let's stage all of these
05:33:24.000 changes by clicking on the plus. So they
05:33:26.160 are now all uh staged. 11
05:33:29.638 agents
05:33:31.558 form. Commit and publish the
05:33:35.798 branch. Now let's go ahead and open this
05:33:38.958 pull
05:33:41.558 request and let's wait for the review
05:33:44.878 from code rabbit.
05:33:48.080 And here we have the summary. So we have
05:33:50.320 added a global toss notification for
05:33:52.400 improved user feedback which is our
05:33:54.320 toaster. We introduced a new my agents
05:33:57.280 page header with a new agent button. We
05:33:59.440 added a model dialogue for creating new
05:34:01.360 agents with form validation and avatar
05:34:03.440 preview. We implemented an agent
05:34:05.680 creation form supporting both creation
05:34:07.760 and editing
05:34:09.558 workflows. Perfect. So in here of course
05:34:12.718 we have a more in-depth walk through. Uh
05:34:15.680 as you can see it noticed that we added
05:34:17.920 a TRPC a protected TRPC middleware for
05:34:20.638 securing the end points right and in
05:34:23.680 here we have a whole sequence diagram
05:34:25.680 explaining the state of our app right
05:34:27.680 now uh but this part right here we've
05:34:30.558 already covered this in the previous
05:34:32.878 pull requests what we are interested now
05:34:35.040 is in this part when user clicks on new
05:34:38.480 agent and in here it rent it clicks it
05:34:41.760 here in the agent list header which
05:34:43.680 opens a dialogue new agent dialogue
05:34:46.160 which finally uh renders the agent form.
05:34:50.000 So the user then submits the form in the
05:34:53.200 agent form which then calls the create
05:34:55.920 which is the protected procedure. So
05:34:58.240 that's calling the TRPC server, right?
05:35:00.958 The TRPC server is a protected
05:35:03.040 middleware in this case because it's a
05:35:05.280 protected procedure. So it calls the
05:35:07.280 session. If it has no session, it fails.
05:35:09.760 But if it has a session, it inserts the
05:35:12.400 new agent right here in the database and
05:35:15.120 the database returns back the created
05:35:16.958 agent to the TRPC server which then on
05:35:20.000 success handles the rest of the events.
05:35:23.280 So as I said this sequence diagrams will
05:35:26.160 become more and more useful as we go on.
05:35:29.360 In here we have some comments. Of course
05:35:31.600 we left a to-do here. So it recommended
05:35:34.400 adding the update agent in case we
05:35:36.400 forgot. But we did not forget we
05:35:39.040 actually don't have it yet. We just
05:35:40.958 developed ahead of time in here. Uh it
05:35:44.718 gave us the proper advice of handling um
05:35:47.680 non-existent agents. So yes, when we
05:35:50.400 actually go and develop this get one
05:35:52.798 method which we are going to have to uh
05:35:55.280 well advance a bit further than this. We
05:35:57.680 will also have to handle this throwing
05:35:59.840 an error if the agent is not found. So
05:36:02.160 yes, this is a good suggestion and we
05:36:04.080 will add that later when we develop the
05:36:06.638 actual agent get one
05:36:09.080 page. So we can resolve this and in here
05:36:12.480 in the get many uh it tells us to
05:36:15.958 actually protect this procedure even
05:36:18.558 further by only loading the agents from
05:36:21.040 that user. That is exactly what we are
05:36:23.840 going to do in the next chapter when we
05:36:26.558 load this in the actual table. Right?
05:36:29.680 because right now we're just JSON
05:36:31.280 stringify the agents. In the next
05:36:33.440 chapter, we're going to develop the
05:36:34.958 actual table for that and that will
05:36:37.360 include this fix as well. So, all great
05:36:40.558 suggestions, exactly what I plan to do
05:36:42.718 in the following chapters. So, let's go
05:36:44.878 ahead and merge this now.
05:36:48.040 Perfect. And once you've merged it, go
05:36:50.638 back to main and click synchronize
05:36:53.760 changes and click okay here. And you
05:36:57.760 should be all good. Let's go ahead and
05:37:00.080 check our graph here. We just merged 11
05:37:04.718 agents form which marks the end of this
05:37:07.600 chapter. Amazing amazing job and see you
05:37:10.558 in the next
05:37:12.760 chapter. In this chapter, we're going to
05:37:15.360 go ahead and develop the agents data
05:37:17.840 table. This will include a nice display
05:37:20.480 for existing agents, but also a nice
05:37:23.440 empty state if no agents have been
05:37:25.760 created. So the first step is to
05:37:28.480 implement the data table component. Now
05:37:31.200 as you probably know already inside of
05:37:33.840 our source components UI we have all
05:37:37.920 shats components and that includes the
05:37:40.878 table component. But what we are looking
05:37:43.840 for is not the table component. We are
05:37:46.080 looking for a data table component. So
05:37:49.040 in order to implement that we have to go
05:37:51.200 back to chats UI
05:37:53.400 documentation and find data table. Now
05:37:57.760 we can skip the first step of the
05:37:59.840 installation here because we already
05:38:01.600 have the table component. Instead we can
05:38:04.320 immediately go to step two adding
05:38:06.558 tanstack react table. So make sure that
05:38:10.558 you are on your main branch here and
05:38:13.280 make sure you have s syn syn
05:38:14.680 synchronized all
05:38:17.400 changes. Once you've done that go ahead
05:38:20.240 and install penstack react table and you
05:38:23.520 can add a
05:38:24.920 legacy pure deps to avoid any pure
05:38:28.320 dependency errors. Great. Once you have
05:38:31.680 added that you can go ahead and run your
05:38:33.520 app. I will now open my package JSON
05:38:36.798 just to show you the new package version
05:38:42.120 8.21.3. You don't have to strictly use
05:38:44.400 the same version. I don't think uh this
05:38:46.718 package often introduces breaking
05:38:49.160 changes. Great. So now let's go ahead
05:38:52.878 and build this. So we're going to start
05:38:54.878 by adding columns. Let's go ahead and do
05:38:57.440 that. I'm going to go inside of source
05:39:01.160 modules agents UI components and inside
05:39:05.440 of here I'm going to define
05:39:07.958 columns tsx like that and I'm going to
05:39:12.638 copy this snippet. Now in case you're
05:39:15.040 having trouble finding this
05:39:16.320 documentation page or it changed a lot
05:39:20.160 uh by the time you found this video, no
05:39:23.120 worries. We're going to go line by line
05:39:25.040 and see what's going on here. So it's
05:39:26.798 not too big of a file, don't worry. So
05:39:29.680 first of all, make sure it's marked as
05:39:31.280 use client. Make sure you add a tsx
05:39:33.760 extension and import column defaf from
05:39:36.080 your newly installed package. In here,
05:39:38.638 we just defined a very simple payment
05:39:41.040 type with ID, amount, status, and email.
05:39:44.080 And then what we do is we return an
05:39:46.400 array of uh column definitions according
05:39:50.080 to the payment type. So we render the
05:39:52.320 status, the email and the amount using
05:39:55.040 the accessor key and the header keys.
05:39:57.760 That's
05:39:58.840 it. So the next thing we have to
05:40:01.120 implement is the data table component.
05:40:04.000 Let's go ahead inside of components and
05:40:05.840 let's create
05:40:09.798 data-table.tsx. And again I'm going to
05:40:11.920 copy this entire snippet and paste it
05:40:14.320 here. And we're now going to go ahead
05:40:16.400 and look at it. So first of all use
05:40:19.600 client then the necessary imports from
05:40:22.160 tanstack react table which are column
05:40:24.320 def flex render get core row module
05:40:27.040 model sorry and use react table then
05:40:30.558 table table body table cell table head
05:40:33.600 table header and table row from
05:40:35.920 components UI table which is the
05:40:37.440 component we looked at in the beginning
05:40:39.040 to confirm that we have it. We then
05:40:41.360 created a generic data table props which
05:40:44.000 accepts any table data and any table
05:40:47.120 value here. And after that we export
05:40:50.080 function data table and we pass it these
05:40:52.480 generics right here. And we destructure
05:40:54.878 the columns and the data from the data
05:40:56.958 table props passing the generics. Our
05:41:00.558 table constant is defined through use
05:41:03.120 react table which simply accepts the
05:41:05.600 data the columns and the core row model.
05:41:10.320 Inside of here we have a div with a
05:41:12.480 class name rounded medium and border and
05:41:15.440 it encapsulates our entire table. Then
05:41:18.638 we have a table from the actual
05:41:21.680 components UI table inside a table
05:41:24.798 header. And inside of the table header,
05:41:26.958 what we do is we map over each of our
05:41:30.558 header groups and we render out the
05:41:32.558 table row. And then inside of this row,
05:41:37.200 we go inside of the individual header
05:41:39.280 group inside of the headers and we map
05:41:41.680 out each individual table head, which
05:41:44.080 would most likely be the column. So this
05:41:46.400 would be uh status, email and amount in
05:41:50.080 table head components. We check if it's
05:41:53.120 placeholder and render null. Otherwise
05:41:55.520 we use the flex render function which we
05:41:58.320 imported from tan stack react table and
05:42:00.878 we pass in header column column def
05:42:03.280 header in the first parameter and header
05:42:05.600 get context in the second parameter. And
05:42:08.240 we end the table head and the table row.
05:42:10.638 And we do the exact same thing uh for
05:42:13.200 the table body. Here you can see it's
05:42:15.040 not anything more complicated. The only
05:42:17.360 thing we do here is we do a length check
05:42:21.280 in case it is empty. What we do here is
05:42:24.798 we just render an empty table row and we
05:42:27.840 give it some default height and text
05:42:29.840 center here. And we also give it a
05:42:32.000 proper call span. So it takes the entire
05:42:35.120 width of our table. So I hope that this
05:42:38.798 kind of uh made it easier for you to
05:42:41.200 understand what's going on. And if you
05:42:44.240 struggled finding the actual snippet,
05:42:46.878 you can now find it
05:42:49.480 here. So now that we have our data
05:42:52.638 table, let's see what is the next step
05:42:55.280 here. So let's go ahead and render that
05:42:58.400 table and let's also invent this get
05:43:02.480 data it seems. So this is how we're
05:43:04.878 going to do this. Now we're going to go
05:43:06.718 inside of our views agents views here
05:43:08.958 and we're going to render the data table
05:43:13.160 component from that that dot
05:43:16.040 dot/components data table and in here
05:43:19.280 we're not going to use this data. Uh
05:43:21.878 instead we are going to define our own
05:43:24.400 data here. Let me just copy this.
05:43:28.480 Let's just do const mock data and just
05:43:31.680 do you know something like this id
05:43:34.718 amount status it needs to be either
05:43:37.798 pending or processing or success or
05:43:40.718 fail. So make sure it's it matches this
05:43:43.798 type like this mock data and just pass
05:43:47.440 in the data to be mock data here and you
05:43:51.040 also have to pass in the columns. So
05:43:53.120 columns will be the columns which we can
05:43:55.558 import from dot dot components columns
05:43:59.120 like this. And let me just see if I did
05:44:02.080 this correctly here. Uh I think the
05:44:04.958 problem here is in the mock data here.
05:44:08.798 We have to assign it to be payment type
05:44:12.958 and we might have to oh it's just
05:44:15.120 payment. Okay. So let's import payment
05:44:17.840 from the columns and set it as an
05:44:20.520 array. There we go. Now you no longer
05:44:23.280 have any errors here. And now if you
05:44:25.760 visit this and refresh the agents page,
05:44:28.718 you should see your data table here.
05:44:31.840 Let's wait. And there we go. This is our
05:44:34.240 data table with our mock data. And this
05:44:37.600 is actually enough for us to no longer
05:44:40.718 need to follow this. If you want to, you
05:44:42.480 can take a look to see exactly how you
05:44:44.798 would add some more things here. But we
05:44:47.760 are going to take it from here and
05:44:49.680 develop our own version. So the first
05:44:52.718 thing I want to do is go back inside of
05:44:54.320 the data table and modify it just a bit.
05:44:57.520 So I'm going to go ahead and give this
05:44:59.280 div besides uh I'm going to change
05:45:01.760 rounded medium to rounded large. I'm
05:45:04.080 going to leave the border and I'm going
05:45:05.520 to set the bg to be background and
05:45:07.920 overflow to be hidden. So that's the
05:45:10.718 first thing I'm going to do. Then what
05:45:12.958 I'm going to do is I'm going to delete
05:45:16.160 the table header
05:45:17.798 entirely like that. So I only want the
05:45:20.718 table body to render. And in the table
05:45:23.600 body I'm going to go ahead and do the
05:45:25.280 following. I'm going to give this one a
05:45:28.000 class name of cursor pointer like that.
05:45:31.040 So when I hover over it looks clickable.
05:45:34.320 And I'm going to introduce a new prop
05:45:36.920 here after the data on row
05:45:40.600 click like this to accept the row which
05:45:43.280 is a type of data and return a void. So
05:45:47.280 I can now destructure on row click here
05:45:50.638 and I will simply add it to the table
05:45:54.638 row. So on
05:45:56.040 click arrow function on row click
05:45:59.600 question mark dot and then execute and
05:46:02.000 pass in the row. original inside. So
05:46:05.040 it's optional. Uh so make sure you added
05:46:08.000 the question mark here. Great. Now what
05:46:12.160 I want to do is I want to modify the
05:46:13.760 table cell here by giving it a class
05:46:15.840 name text small and padding of
05:46:19.400 four. And in the table row here I want
05:46:23.200 to change this to be height 19. And also
05:46:27.280 add text muted foreground and change
05:46:30.718 this. Oh well this can be no results.
05:46:32.878 That's fine. Yeah. And remove table head
05:46:35.680 and table header from
05:46:38.600 here. There we go. Just like that. So
05:46:42.440 now what I want to do is I want to go
05:46:46.638 back inside of my agents view here and
05:46:49.280 just start uh modifying this a bit. So
05:46:51.920 give the wrapping div here a class name
05:46:53.920 of flex one padding bottom of four px of
05:46:57.280 four and the px of 8 flex flex column
05:47:03.120 and gap y of four. There we go. So looks
05:47:07.840 a little bit better. What I want to do
05:47:10.878 now is the following. I want to go
05:47:13.360 inside of my columns and in here I'm
05:47:15.760 going to modify this to no longer use
05:47:17.920 this payment type. Instead I will use
05:47:21.840 agent get one from the types which we
05:47:25.280 did in the previous chapter. Right?
05:47:27.120 Remember when I told you to create the
05:47:29.440 uh get one protected procedure. So we
05:47:31.840 are reusing it one more time here as our
05:47:35.520 column data type here. And now we're
05:47:38.798 going to go ahead and modify the actual
05:47:42.558 columns here. So the first one we're
05:47:44.320 going to render will be the name of the
05:47:46.080 agent and the header will be agent name.
05:47:50.320 And now what we can actually do already
05:47:53.680 is we can go back inside of the agents
05:47:56.638 view here and we can use this data. We
05:47:59.680 no longer have to use the mock data at
05:48:01.878 all. And you can remove this. There we
05:48:04.480 go. And you can already see that you now
05:48:07.360 have all of your agents here. So if you
05:48:09.280 add a new
05:48:10.440 agent, it will appear. There we go. So
05:48:13.440 we are now rendering them inside of
05:48:15.360 here. Perfect. So let's go back inside
05:48:18.320 of the columns and let's improve the way
05:48:22.480 the name field is showing. So we can do
05:48:25.520 that by adding the cell property here.
05:48:28.320 The structure the row and render a div
05:48:31.680 here with a class name
05:48:34.280 flex flex column and gap y of one.
05:48:38.638 Inside another div with a class name
05:48:41.200 flex items center and gap x of two. And
05:48:45.360 then finally a generated avatar
05:48:47.480 component which is a self-closing tag.
05:48:50.958 And inside of here give it a variant of
05:48:54.558 bots neutral seed of
05:48:59.798 row.name and a class name of size six.
05:49:04.160 So make sure you have added this import
05:49:06.000 here and already you will see the
05:49:08.878 avatars of your bots. Let's confirm. So
05:49:11.600 test seems to be having let's try test
05:49:13.920 two. It seems to be having this oneeyed
05:49:16.400 row. When I click
05:49:20.040 create, it has the exact same face.
05:49:23.638 Perfect. So now that we have added that
05:49:26.878 below the avatar, add a span element
05:49:29.520 rendering row original name
05:49:32.520 here. And give the span a class name
05:49:36.718 font semibold
05:49:39.958 capitalize. There we go. And now outside
05:49:43.440 of this div, open up a new div with a
05:49:45.840 class name of flex items center gap x of
05:49:50.760 two. And inside of this div, a new div
05:49:54.400 with a class name flex items center gap
05:49:58.480 x of
05:50:00.040 one. And in here, let's add a
05:50:03.400 corner
05:50:04.920 right down icon. Make sure you import
05:50:08.558 this from lucid react.
05:50:12.638 And give this icon a class name
05:50:15.638 of size three and text muted foreground.
05:50:21.280 And then add a span element
05:50:25.400 row. But give this a class name of text
05:50:29.240 small text muted foreground maximum
05:50:33.120 width of 200 pixels truncate and
05:50:38.280 capitalize. So we are adding truncate so
05:50:41.200 that it cuts off right. Uh and let's
05:50:44.558 just see. So this should be corner down
05:50:48.958 right icon. So make sure you don't do
05:50:51.600 the same mistake as I did. Corner down
05:50:54.080 right icon. There we
05:50:56.440 go. So flex item center gap x1. Let's
05:51:00.558 add uh maybe
05:51:02.040 1.5
05:51:03.878 here. Uh or maybe let's try two. Yeah,
05:51:08.718 maybe two is a bit better. And now that
05:51:10.638 I'm looking at it, we don't even need
05:51:13.680 the outer div here. So, you can just
05:51:15.600 remove the outer div. I think it's
05:51:17.040 exactly the same. Yeah, it is perfect.
05:51:19.760 So, yeah, you can choose gap x1 or gap x
05:51:24.000 2. I think maybe two gives it a little
05:51:26.160 bit more breathing room. Maybe 1.5 as
05:51:29.920 the perfect middle. I don't know.
05:51:32.160 Sometimes I can't decide. Okay. Uh,
05:51:35.120 great. So we can now render our avatars
05:51:39.360 here nicely our agents. And now let's
05:51:43.040 also add another key
05:51:45.798 here. Accessor key meeting count and
05:51:50.798 header will be
05:51:52.680 meetings and cell here will be a
05:51:57.080 row like this. Add a badge from
05:52:00.878 components UI badge. So you already have
05:52:04.718 this component installed instead of
05:52:06.718 source components UI badge. And in here
05:52:11.120 what we're going to do is simply render
05:52:13.440 a video icon from Lucid React and give
05:52:15.840 it a class name text blue 700 like this.
05:52:21.280 And then add row original dot meeting
05:52:24.558 count which will throw you an error
05:52:26.320 because it does not exist yet. And then
05:52:28.958 after it check if row original meeting
05:52:32.958 count is equal to one and then add
05:52:35.440 meeting or
05:52:37.798 meetings and give the badge a variant of
05:52:41.120 outline and a class name flex items
05:52:45.440 center gap x2 and in order to modify the
05:52:49.280 SVG size we have to target it like this
05:52:51.920 and then add
05:52:53.558 size-4. So right now you can see that it
05:52:56.558 looks a little bit broken
05:52:58.840 here. So let's go ahead and improve it
05:53:02.480 by going inside of our procedures for
05:53:06.558 the agent and finding the get one here.
05:53:11.680 And in here in the select what we have
05:53:14.798 to do is we have to add the meeting
05:53:17.120 count option and I think that we can
05:53:19.840 just import
05:53:21.480 SQL from Drizzle RM. And for now just
05:53:24.878 like put a number five. I think this
05:53:27.200 will render the number five. But what
05:53:29.600 happens now is that our existing agent
05:53:31.920 will only return this. And you can also
05:53:34.480 put like a type of number here. But in
05:53:37.680 order to preserve all other fields, we
05:53:40.320 can use a spread get table columns from
05:53:44.878 drizzle or so. So I imported SQL from
05:53:47.920 here as well and pass in agents.
05:53:52.000 So now the existing agent has the
05:53:54.080 meeting count which is a number and you
05:53:55.920 no longer have any errors here. Let's
05:53:58.718 refresh and see. Looks like it's uh not
05:54:01.840 yet working just because I'm not sure
05:54:04.638 how to actually uh use this to mock a
05:54:08.120 number. Let me just uh try something.
05:54:13.440 What we can do for now since this is
05:54:15.920 obviously not working, we can do
05:54:17.798 database dot dollar sign count agents
05:54:22.798 and I think we can just do this. Let's
05:54:24.480 just count all
05:54:25.718 agents. Will that give us a number? I'm
05:54:28.160 still not getting uh any number.
05:54:31.600 So, how about I try agents where
05:54:35.638 equals and
05:54:37.638 um let's
05:54:39.638 try user agents do user id
05:54:44.200 matches we can now since this is a
05:54:46.480 protected
05:54:48.760 procedure we can now extract context
05:54:52.000 from here and we can pass in the context
05:54:54.400 out session user
05:54:58.760 ID let's try
05:55:01.718 now. Okay. I I can't get a number from
05:55:05.680 here for whatever reason. So, yeah, it's
05:55:11.000 okay. Let's remove the meeting count
05:55:13.520 from now. Let's remove this. Sorry for
05:55:16.160 making you do all of this. It's because
05:55:17.840 we are missing the meetings schema,
05:55:19.680 right? I'm trying to mock a number here.
05:55:22.080 So, we're just going to set this to be
05:55:24.638 five meetings, for
05:55:27.878 example, like this.
05:55:31.360 And uh you do add a meetings count
05:55:36.440 here and just use the
05:55:39.160 SQL five with the type of number and
05:55:42.718 import
05:55:43.718 SQL from drizzle or um and you can add a
05:55:47.840 little to-do change to actual
05:55:53.798 count. There we go. So this is how it's
05:55:56.080 going to look like. Besides everything
05:55:57.920 regarding uh the first agent here, we
05:56:00.240 are also going to actually count the
05:56:02.160 number of meetings it has. So we need
05:56:06.000 the meeting count property to exist here
05:56:09.200 because otherwise the accessor key gets
05:56:11.718 confused. So that's why I'm trying to
05:56:14.240 mock the number later. What we're going
05:56:16.480 to do is we're going to actually count
05:56:18.240 the number of meetings associated with
05:56:20.400 our agent or our agent associated with
05:56:23.840 the number of meetings. Um, perfect.
05:56:26.798 Yes. So, this is what I wanted us to do.
05:56:28.798 And now what we have to do is we have to
05:56:30.718 implement the empty uh stage as well.
05:56:34.958 So, let's go ahead and let's go to
05:56:40.040 neon.te. So, we can go inside of our
05:56:43.600 project here. tables or you can use the
05:56:46.480 Drizzle Studio. It's the same thing,
05:56:48.638 right? And let's go inside of agents,
05:56:50.798 select all of them, and delete all
05:56:52.718 agents. So, it's completely empty. And
05:56:54.798 now when you refresh here, uh you should
05:56:57.280 see no results. But I want this to have
05:57:00.000 this nice uh view as well here. So, uh
05:57:04.958 let's go ahead and go inside of here.
05:57:07.040 I'm going to fix this error in a moment.
05:57:08.878 Let's just wrap up the um empty state,
05:57:13.120 right? So I will leave this for later.
05:57:15.840 In order to implement the empty state,
05:57:18.798 we can get started faster by copying the
05:57:23.040 error state. So let's copy the error
05:57:26.160 state and let's paste it. Let's rename
05:57:28.558 it to empty state like
05:57:32.520 this. And export con state like that. Uh
05:57:37.600 and then what we're going to do is the
05:57:40.320 following.
05:57:43.120 I'm going to remove this part and just
05:57:46.400 put flex flex column item center justify
05:57:50.360 center. And then I'm going to remove
05:57:54.558 this div entirely like that. And then in
05:57:59.840 here I will not render the alert. I will
05:58:02.798 render an image from next forward
05:58:05.840 slashimage.
05:58:08.000 And in here for now I will set the
05:58:11.120 source to be logo
05:58:13.480 SVG. Alt will be empty. Width will be
05:58:18.680 240. And height will be 240 as well. And
05:58:23.200 then in here this will be flex flex
05:58:25.600 call. Let's set gap Y six. Here let's
05:58:29.440 set maximum width to be medium. MX to be
05:58:33.480 auto. And let's put text center here.
05:58:37.200 And this will also have a text muted
05:58:40.120 foreground. There we go. Like that. So
05:58:43.520 now that we have the empty state, let's
05:58:46.080 go ahead and render it. So inside of
05:58:48.958 agents view here where we have this
05:58:50.878 error, let's go below it and let's do
05:58:53.440 the following. If
05:58:56.760 data.length is equal to zero, go ahead
05:59:00.080 and render the
05:59:01.320 empty
05:59:03.558 state like this. So I'll just move it
05:59:06.718 here with the error state here and the
05:59:09.840 title will be create your first
05:59:13.160 agent and the description will be create
05:59:16.718 an agent to join your
05:59:19.320 meetings. Each agent will follow your
05:59:23.878 instructions and can interact with
05:59:27.718 participants during the call. And let me
05:59:31.520 just fix this join. There we go. So now
05:59:35.360 you should see your big logo here and
05:59:37.840 the text create your first agent. So
05:59:39.840 what we have to do now is do a proper
05:59:42.638 image here. What I've prepared for you
05:59:46.558 is a link you can visit or you can use
05:59:48.558 the link in the description if this URL
05:59:50.718 stops working. So,
05:59:56.360 cwonia.com/me-assets and when you visit
05:59:58.520 that you will get redirected to this uh
06:00:02.000 public GitHub with all of the uh images
06:00:05.840 and assets for this projects or if you
06:00:07.840 have access to the source code you can
06:00:09.280 just go directly into my public folder
06:00:11.440 where I will add them. So, let's go
06:00:14.000 ahead and add
06:00:16.280 empty.svg. Since it's an SVG, you have
06:00:19.200 multiple ways of uh downloading it. You
06:00:21.920 can download it or you can click code
06:00:24.160 and just copy the entire code here and
06:00:27.040 then just go inside of your public
06:00:30.638 folder. Add
06:00:34.600 empty.svg. Click this open file using VS
06:00:37.760 Code standard text binary. Right? And
06:00:40.080 just paste the code inside. And there
06:00:42.480 you go.
06:00:44.000 you now have uh the empty
06:00:48.240 uh placeholder.
06:00:50.040 Perfect. So now let's go back inside of
06:00:52.480 empty state and let's use
06:00:55.718 empty.svg. And there we go. Now you have
06:00:58.400 the empty state. Create your first
06:01:00.000 agent. Create an agent to join your
06:01:01.520 meetings. Each agent will follow your
06:01:03.280 instructions and can interact with the
06:01:04.878 participants during the call. And the
06:01:07.440 moment you add uh a new agent, test
06:01:11.920 test. Click
06:01:14.760 create and this will now refresh and you
06:01:17.760 will no longer see that empty state.
06:01:20.080 Perfect. Amazing. Amazing job. So that's
06:01:22.400 exactly what we intended to do. We added
06:01:25.520 data table empty state and we obtained
06:01:27.680 the assets. So in the next chapter we're
06:01:30.558 going to focus on this the pageionation
06:01:34.160 right and also this the filters but
06:01:38.080 that's going to be for the next chapter.
06:01:40.240 Amazing job. And let's go ahead and
06:01:42.480 create review and merge this pull
06:01:45.240 request. So I'm going to go ahead and
06:01:48.958 click on my branches here. Create a new
06:01:51.360 branch. This will be 12 agents data
06:01:54.840 table I believe.
06:01:58.360 Yes. Let's go ahead and confirm we're on
06:02:01.360 the new branch. Stage all changes
06:02:05.240 here. Let's wait a second. There we go.
06:02:08.320 stage changes 12 agents data table.
06:02:12.878 Let's commit and let's publish this
06:02:17.080 branch. There we
06:02:19.080 go. Let's go to our GitHub here. Let's
06:02:23.120 open a pull
06:02:24.840 request. There we go. Uh and I already
06:02:29.120 remembered something that I will have to
06:02:30.878 do. Yeah. So, let's
06:02:33.558 uh let's open this pull request and I'm
06:02:36.638 going to let the reviewer do its thing
06:02:39.080 here. But uh let's go back inside of uh
06:02:42.558 so it's completely fine to stay inside
06:02:44.160 of this branch, right? We can work in
06:02:45.680 it. Let's go inside of our agent view
06:02:49.840 here. UI view is agents view. And I just
06:02:53.520 want to see why am I getting this error
06:02:55.440 here. So something's wrong with the
06:02:57.200 columns. agent get
06:03:00.360 one meeting
06:03:04.680 count. So something is not matching
06:03:09.480 here. Let's go inside of our columns to
06:03:12.400 see accessor key is
06:03:14.840 name meeting
06:03:17.958 count. What if I comment this out?
06:03:21.520 Nothing.
06:03:23.558 Okay. So for some reason it's
06:03:27.558 throwing an error
06:03:30.840 here. I'm not exactly sure why. So I
06:03:33.840 will uh experiment with this a little
06:03:35.920 bit. We can leave it like this for now.
06:03:37.600 Actually it's not it's not too big of a
06:03:39.878 problem. Uh so I will explore this
06:03:42.558 actually in the next chapter. So we're
06:03:44.638 going to fix this error alongside adding
06:03:46.798 our pagionation and
06:03:48.920 things. And here we have the code
06:03:51.280 summary. So let's read the walkthrough.
06:03:54.320 A new table display feature for agent
06:03:56.480 data was introduced using the tanstack
06:03:58.718 react table library. This includes the
06:04:01.040 new UI components for table columns, a
06:04:03.440 generic data table and an empty state.
06:04:06.400 The agents view now renders agent data
06:04:08.798 in a styled table and the backend query
06:04:11.200 for agents was updated to explicitly
06:04:13.360 select columns and added a computed
06:04:15.920 field which is our mock meetings
06:04:18.600 account. In here we have a whole
06:04:20.798 sequence diagram. But we already know
06:04:22.958 how this works, right? It's but and it
06:04:25.520 goes even further displaying the data
06:04:27.840 table or the empty state here. And in
06:04:30.718 here it left some expected comments. It
06:04:32.958 really doesn't like that we hardcode
06:04:35.120 this. So it gives us some action items.
06:04:37.520 Define or migrate a meetings table in
06:04:39.520 your schema. We will be doing that very
06:04:42.160 soon, but I do want to wrap up agents
06:04:45.080 first. In here, it uh suggests adding an
06:04:48.320 action button to the empty state. So,
06:04:50.240 this could be a good idea. But since we
06:04:52.638 already have a new agent here, I kind of
06:04:54.558 feel weird having another one, you know,
06:04:56.798 here. So, I'm going to leave it like it
06:04:59.558 is. And uh in here, of course, uh it
06:05:03.040 doesn't like that this is hardcoded. We
06:05:05.200 will change that later when we actually
06:05:07.600 uh have this value here. Uh and in here,
06:05:11.520 it noticed that we removed the table
06:05:13.920 header. Uh, so very good that it noticed
06:05:16.958 that, but we did it on purpose. Great.
06:05:20.400 So, let's go ahead and merge this pull
06:05:22.320 request. So, in the next chapter, what
06:05:24.400 we're going to have to do is work on
06:05:27.040 these filters here and fix this issue.
06:05:30.480 Even though I'm 99% sure this types are
06:05:34.280 confused simply because of uh Oh, the
06:05:38.638 types are confused. Oh, I just realized
06:05:41.840 that all this time I've been adding the
06:05:44.320 meeting count to get one. I also have to
06:05:47.520 add it to get many. That's why it's so
06:05:50.480 confused here. Okay, so we know how to
06:05:54.000 fix it, but we don't have to do it now
06:05:55.760 since we just merged this pull request,
06:05:58.240 right? Let's not change anything in this
06:06:00.080 branch anymore. And instead, let's go
06:06:02.638 and change this to main. And let's
06:06:05.680 synchronize our changes here.
06:06:09.280 There we go. Let's click on our source
06:06:12.798 control, click on the graph, and confirm
06:06:14.798 that you just merged commit 12 inside of
06:06:18.718 here and added all of these things.
06:06:21.520 Perfect. So, amazing, amazing job. Let's
06:06:24.160 mark that as completed
06:06:26.360 here and see you in the next
06:06:31.160 chapter. In this chapter, we're going to
06:06:33.920 implement agents filters. So the reason
06:06:37.120 I didn't put any screenshots here is
06:06:39.440 because the filters were already
06:06:41.520 featured in our chapter 12. So it's
06:06:44.320 going to be this search bar and the
06:06:46.680 pagionation right here. We're going to
06:06:49.600 start by modifying our
06:06:52.040 agents.get many procedure. We are then
06:06:55.120 going to add a package called nux. We're
06:06:58.240 going to implement the UI components for
06:07:00.080 the filters which will include the
06:07:01.680 search input and pagination. And we are
06:07:04.080 then going to synchronize the React
06:07:06.000 server component filters and client
06:07:08.160 filters because it's very important to
06:07:09.920 do that when we do
06:07:11.718 prefetching. Let's start with modifying
06:07:13.920 the agents get many procedure. And
06:07:16.000 before we actually do anything, well, as
06:07:18.798 always, confirm you are on your default
06:07:20.638 branch and confirm that you have
06:07:22.480 synchronized your changes here. And then
06:07:26.000 head inside of modules agents UI views
06:07:30.400 agents view. And in here we have this
06:07:33.680 bug. And the bug is because in the get
06:07:36.320 many procedure here I don't have the
06:07:39.280 meeting count. So what I'm going to do
06:07:41.440 is I'm just going to copy what I did for
06:07:43.200 the get one and I will add it in here
06:07:47.040 like this. And as you can see
06:07:49.600 immediately the error now goes away. And
06:07:52.958 I think that now so all that time in
06:07:56.400 previous chapter I was adding the
06:07:58.000 meeting count in the get one procedure
06:08:00.878 and I was so confused why I couldn't
06:08:03.360 read it in my table here. So I think
06:08:05.680 that now once I add it to the get many
06:08:07.878 procedure just a hard-coded number five.
06:08:11.120 I think that we can go inside of the
06:08:12.958 columns. So instead of agents UI
06:08:15.120 components columns and I think that I
06:08:17.280 can actually now try reading row um my
06:08:20.718 apologies. Let's dstructure the row
06:08:23.480 here. Row original meeting count. Can I
06:08:27.840 do that now? Let's refresh. There we go.
06:08:30.160 So number five is rendered here. So if I
06:08:32.878 change this in the get many procedure to
06:08:35.280 number six and refresh, it shows number
06:08:39.520 six. Perfect. So now we can go ahead and
06:08:44.160 add that little tweak here. If row
06:08:48.440 original meeting count is equal to one,
06:08:51.760 show meeting otherwise show
06:08:54.840 meetings. So it shows the proper the
06:08:58.000 grammatically correct text. Perfect. So
06:09:01.040 that's the first issue fixed. We no
06:09:03.200 longer have any errors inside of our
06:09:05.040 agents view. The second thing that we
06:09:07.600 now have to do is go back inside of our
06:09:09.520 get many procedures and what we have to
06:09:12.080 do is implement the proper filters here.
06:09:15.200 So before we do dotquery, let's add
06:09:17.920 dotinput here and let's open up an
06:09:21.160 object. So I think we already have zod
06:09:23.760 imported. Perfect. So now inside of here
06:09:26.000 we can add the filters. The first one
06:09:28.160 will be the page which will be a type of
06:09:30.240 number and the default will be one as in
06:09:34.160 the first page. And for the page size
06:09:37.798 here, we're going to add Z dot
06:09:41.320 number with a minimum of one. And let's
06:09:45.600 add a maximum of 100. And the default of
06:09:51.360 Whoops, let me just go back. And the
06:09:53.600 default of 10. And then we're going to
06:09:56.638 have search, which is a string. And
06:10:00.360 nullish. Uh, nullish. This one like
06:10:04.160 this. And you can set the entire input
06:10:06.160 to be
06:10:07.160 optional. Uh my apologies. So you have
06:10:10.080 to go inside of this parenthesis and
06:10:13.200 then put optional
06:10:14.760 here. The reason I want to put optional
06:10:17.440 is because we have default values for
06:10:19.760 the page and the page size. So if the
06:10:23.040 user doesn't want to pass any filters,
06:10:25.120 they don't have to pass any filters,
06:10:26.920 right? Uh and also here's another thing
06:10:29.920 you have to be aware of. And let me just
06:10:33.360 indent this a
06:10:35.718 bit like this. I just want to format it
06:10:40.638 a bit nicer so it's clearer which part
06:10:43.200 is
06:10:44.440 which. There we go. Like this. So
06:10:47.360 protected procedure as an input. Inside
06:10:50.080 of that input, we have an optional
06:10:52.240 object which has three possible
06:10:54.718 parameters. The page, page size, and
06:10:57.200 search. Why did I add optional to the
06:11:00.558 entire Z object? Well, for example, if
06:11:04.878 we go inside of our agent form
06:11:08.200 component, you might remember that in
06:11:10.798 here we do some invalidation here,
06:11:14.000 right? Specifically, what we do is
06:11:16.240 whenever we create a new agent, we
06:11:18.240 refetch agents get many by invalidating
06:11:21.280 it. Now if I were to change
06:11:25.160 this to not be optional, you can see
06:11:27.520 that I immediately get an error here
06:11:29.680 because this expects the object inside
06:11:33.760 for the options. But since I am
06:11:36.000 invalidating this, I don't really know
06:11:38.878 what to pass here except just an empty
06:11:41.520 object. So it kind of looks weird,
06:11:44.240 right? And not only that, but for
06:11:46.798 example, in my agents view here, I also
06:11:49.920 have a problem. Even though I just want
06:11:51.760 to use the default options, I now have
06:11:53.920 to just pass an empty object inside.
06:11:57.280 Right? So that's why I prefer to add dot
06:12:01.718 optional to the input here. I mean sorry
06:12:05.680 to the Z object here and instead just
06:12:09.040 make sure that I have some defaults. For
06:12:11.600 example, the search doesn't need to have
06:12:14.320 a default but pagenation needs to have
06:12:16.878 some defaults. And if I handle the
06:12:18.558 defaults inside, I can safely put the
06:12:21.120 entire object to be optional. And guess
06:12:23.360 what? I don't have to modify the rest of
06:12:25.360 my existing queries here, right? I don't
06:12:28.400 have any errors. Great. So now I don't
06:12:32.000 like magic numbers in my code. So what
06:12:34.558 I'm going to do is I'm going to go
06:12:35.600 inside of source folder and create
06:12:39.080 constants.ts. And inside of the
06:12:41.200 constants uh file, I'm just going to
06:12:45.040 export the default page to be number
06:12:47.600 one, default page size to be 10, maximum
06:12:50.798 page size to be 100, and the minimum
06:12:52.958 page size to be one. So just these four
06:12:56.718 constants here. Let's export them. And
06:12:59.200 the reason I put them in the constants
06:13:01.040 folder file in source is because I will
06:13:04.240 use the exact same defaults and
06:13:05.920 constants for all of my get many
06:13:08.638 procedures.
06:13:10.000 If you want to have different, you know,
06:13:11.680 per module, you can then put it inside
06:13:13.520 of the agents module and use them. But
06:13:15.520 since I know that all of them are going
06:13:16.878 to be the same, I will just use them in
06:13:18.558 the source folder. Great. So now let's
06:13:21.440 go ahead and replace the page default
06:13:24.958 with default page from the constants.
06:13:28.718 Right? Let's import it. Then the minimum
06:13:32.320 here will be minimum page size from the
06:13:35.240 constant, maximum page size and default
06:13:39.600 page size. Make sure to use default page
06:13:43.440 size and not default page here. So you
06:13:46.320 should have all of these imports here.
06:13:48.718 There we go. Perfect. So now that we
06:13:51.360 have added that we can work with those
06:13:55.040 inputs here. Let's dstructure the
06:13:58.000 context and the input from here.
06:14:00.878 And the first thing I want to do is the
06:14:03.760 following. I want to add a where here.
06:14:07.600 And inside of here, since I already know
06:14:09.840 that I will have multiple uh equals, I
06:14:13.200 will add and from Drizzle ORM. So make
06:14:17.200 sure you import and from Drizzle ORM.
06:14:20.400 And then I'm going to open this. And the
06:14:22.400 first one will be an equals for agents
06:14:25.520 user ID to be equal to my context out
06:14:30.480 user ID or you can use context out
06:14:33.440 session user ID whichever you prefer.
06:14:35.920 They're the same. So that's the first
06:14:38.638 thing that I want to load. I only want
06:14:41.200 to load agents that this user created
06:14:45.360 because in the create procedure
06:14:48.080 uh we set the user ID to the currently
06:14:51.200 logged in user. So that's how I know
06:14:53.760 that this will work
06:14:56.040 automatically. But besides that we now
06:14:58.638 also have some more filters like the
06:15:01.360 search filter. So for this we can check
06:15:04.638 if we have the search and if we do let's
06:15:07.840 use I like from drizzle OM. So make sure
06:15:13.200 you add this import
06:15:15.000 here and let's go ahead and pass in
06:15:19.160 agents.name like this. Open
06:15:22.520 backex. Go ahead and add percentages and
06:15:26.240 render the input dot search like this.
06:15:30.718 And this will be input dot
06:15:34.680 search.
06:15:37.958 Whoops. Like that. Otherwise
06:15:42.280 undefined. Perfect.
06:15:44.638 So now um that we have that let's go
06:15:48.558 ahead and you know now that I thinking
06:15:51.600 you know I kind of don't like this
06:15:54.878 uh I don't like that the
06:15:56.840 input has to be uh accessed through a
06:16:01.440 question mark here. I have a feeling
06:16:04.000 this might complicate things because
06:16:06.320 even though we've set this things to
06:16:08.240 default
06:16:09.920 uh the input by is as you can see it's
06:16:13.200 possible for it to be
06:16:14.840 undefined. So I'm going to revert my
06:16:18.320 decision. I know I told you to put this
06:16:20.480 to optional but I would rather we don't
06:16:23.440 do that. So remove optional from here.
06:16:27.600 And you can see immediately I have
06:16:29.200 errors here. I would rather we handle
06:16:31.280 those errors than have unsafe access to
06:16:35.600 the variables inside my input because
06:16:37.760 what I can do now for example is I can
06:16:40.558 extract search page and page
06:16:43.558 size from the input safely right whereas
06:16:47.600 if this is set to
06:16:51.000 optional I'm you can see this is any
06:16:54.080 right obviously this doesn't work
06:16:57.718 properly so I don't I think I would
06:17:00.480 rather do it like this because now I
06:17:02.558 have the proper information. I think one
06:17:05.520 possible solution is to set the
06:17:08.920 input like
06:17:11.000 this and then its number or undefined.
06:17:14.160 But then again, you know, I don't like
06:17:16.798 working with values like this because
06:17:18.400 this is technically not correct. Page
06:17:20.558 size will always be a default something.
06:17:23.840 So it's obviously not inferring these
06:17:25.840 things correctly. So that's why let's
06:17:28.240 not use optional. Uh I I regret doing
06:17:31.600 that. So I'm going to remove it now. And
06:17:34.080 I'm going to instead do what I said I
06:17:37.680 didn't like, but let's do it. So add
06:17:41.760 this Z object to your protected get many
06:17:44.520 procedure. You can go ahead and
06:17:46.320 destructure these items here. Leave
06:17:48.798 everything as it is. And let's fix our
06:17:51.360 errors. So what you can do is you can
06:17:53.840 search for agents.get get many and you
06:17:57.280 will find all the places you are using
06:17:59.040 it. So let's start with the first place
06:18:01.520 here. This is the source app dashboard
06:18:04.558 agents page where we prefetch. What we
06:18:07.360 have to do now is add the empty object
06:18:11.558 inside. Let's go ahead and do it again.
06:18:13.920 Agents get many. The second one is
06:18:17.200 inside of the agent form. So inside of
06:18:20.240 modules agents UI components agent form.
06:18:23.120 when we invalidate the
06:18:25.080 queries pass an empty object here.
06:18:28.638 Great. And the last one is inside of the
06:18:31.120 agents views. So source modules
06:18:35.558 agents UI views agents view. And go
06:18:40.160 ahead and pass that here. There we go.
06:18:42.878 And we just
06:18:44.200 resolve all syntax errors. And we can
06:18:47.040 now safely dstructure the search page
06:18:48.958 and page size from the input here. And
06:18:51.520 then I can do search
06:18:54.120 here and I can do search here. There we
06:18:57.760 go. So it's easier for us to build these
06:19:01.320 queries. Okay. So yeah, you can see me
06:19:04.080 change my mind in real time now. Great.
06:19:06.958 Now let's add order by here and let's
06:19:10.480 add descending from Drizzle
06:19:14.200 ORM and in here descend by
06:19:17.440 agents.created created at and then
06:19:21.520 combine it with descending agents id.
06:19:25.440 The reason we need the second one is for
06:19:28.680 pagination. So let's add a limit to be
06:19:31.280 page size here and let's add an offset
06:19:34.320 here to be open parenthesis page minus
06:19:37.600 one multiplied by page size. So each
06:19:41.760 following page will offset the last
06:19:45.000 result. And now let's calculate the
06:19:47.760 total. So con total will be await
06:19:51.958 database
06:19:53.638 select
06:19:55.160 count and use the count not from the not
06:19:59.280 from console use it from drizzle o and
06:20:02.878 execute it. So make sure you import
06:20:04.798 count from Drizzle
06:20:09.638 OM and add from agents here and where
06:20:16.080 just go ahead and copy the
06:20:18.280 query like this. But in here we will not
06:20:22.160 do any ordering or any limit or offset.
06:20:25.280 So we are interested in the total number
06:20:27.600 of items that we are working with
06:20:30.638 because only with the total number can
06:20:33.360 we calculate the total pages. So let's
06:20:36.638 use math
06:20:37.958 ceiling total first one in the array dot
06:20:41.920 count or what you can do is just the
06:20:44.000 structure total like this. So then you
06:20:47.760 can do total dot count looks nicer this
06:20:51.040 way and divide it by page size.
06:20:56.320 And then in here instead of returning
06:20:58.160 the entire data what you're going to do
06:21:00.878 is you're going to return items under
06:21:04.360 data total under
06:21:07.958 total.ount and total pages as a separate
06:21:12.160 last item. Great. And now that we have
06:21:14.480 introduced this, we have to go ahead and
06:21:16.958 fix again uh all the places that use get
06:21:20.878 many. So let's search for agents get
06:21:22.958 many in the page. Everything seems to be
06:21:25.360 okay because we're not actually working
06:21:27.120 with the data agent form. Everything
06:21:29.680 okay because we're not actually working
06:21:31.760 with the data agents view and we have
06:21:34.638 some problems. The one we can fix
06:21:36.798 immediately here is
06:21:38.840 data.length. So now what we have to do
06:21:41.520 is data
06:21:44.520 items.length and in here data do items
06:21:48.798 as well. There we go. So, that's how we
06:21:51.360 fixed that issue. Now, let's refresh and
06:21:53.840 let's see. There we go. I can only see
06:21:56.400 one now. Uh, and let's go ahead and
06:21:58.798 let's try
06:22:00.200 creating some more elements here. For
06:22:03.920 example, let's
06:22:05.400 create five of
06:22:07.638 them just so we can try out our
06:22:11.400 filters. Okay. So I have five agents and
06:22:14.240 I will go inside of my procedures get
06:22:16.160 many and I will change the default page
06:22:19.200 size here to be for example two. So when
06:22:24.000 I refresh now you will see these two
06:22:27.920 right here. And even though I entered
06:22:30.160 the exact same name for them which is a
06:22:32.400 coincidence you can see by instructions
06:22:34.558 that they are different uh agents here.
06:22:37.360 Perfect. So we can now bring this back
06:22:40.000 to 10 and just refresh. There we go. And
06:22:45.680 also uh you can now try and changing
06:22:50.878 inside of you suspense query here. If
06:22:53.520 you want page size for example, you can
06:22:56.080 do it here. But this is also where you
06:22:59.600 will probably encounter this issue. And
06:23:02.480 it says
06:23:04.600 unauthorized. Why does it say
06:23:06.558 unauthorized? It seems like a pretty
06:23:08.558 cryptic error for a very simple thing we
06:23:11.360 did. We just used the options that were
06:23:13.760 given to us. Well, the reason why is
06:23:17.040 because you're using use suspense query.
06:23:20.400 That means that it's expecting the data
06:23:22.718 to be populated from somewhere. More
06:23:25.400 specifically, data populated from
06:23:27.840 dashboard agents page prefetch. The
06:23:31.120 difference is in the server component
06:23:33.840 you prefetch without any explicit page
06:23:37.280 size but in here you are fetching with
06:23:40.798 the page size. So what happens is that
06:23:44.160 this use suspense query notices hey I
06:23:47.600 have different query options that means
06:23:50.160 I cannot guarantee that I will have the
06:23:52.400 same result as the cache that was given
06:23:54.878 to me. So I will fall back to use query.
06:23:59.200 The problem is one thing that doesn't
06:24:01.920 get transferred when it does its
06:24:04.680 internal fallback to use query is the
06:24:08.360 headers which means that it loses the
06:24:11.718 authentication. So that's one uh gotcha
06:24:15.360 as we would say right that's one
06:24:17.760 potential foot gun with using this and
06:24:21.120 not being careful. So the the error is
06:24:24.160 very cryptic. It just says unauthorized.
06:24:26.718 That's because we are authorized when we
06:24:29.638 prefetch. But in here, we lose that
06:24:32.798 chain of events because we have
06:24:35.680 different query options. So in order to
06:24:38.798 not throw an error, but to still attempt
06:24:41.360 to load the data, what we do is we
06:24:43.600 switch to use query and then we load
06:24:47.440 with our new query options. and
06:24:50.160 somewhere in between we lose those
06:24:52.240 headers and we fail to uh call that
06:24:56.240 procedure because that procedure is
06:24:58.480 protected and then we get into this
06:25:01.200 weird state where the data actually
06:25:03.680 loads but we still get this error right
06:25:06.400 so it's kind of weird but the fix is
06:25:08.718 very easy you just have to make sure
06:25:11.840 that what you prefetch is exactly the
06:25:16.558 initial state of what you expect in the
06:25:19.600 suspense query. You can later of course
06:25:22.558 uh change this to be page size 10,
06:25:25.360 right? You can modify this later, but
06:25:27.680 the initial load needs to be exact. Once
06:25:31.440 you do this and
06:25:33.080 refresh, no more errors, right? But if
06:25:36.320 one of these doesn't match, you will
06:25:39.440 start getting that unauthorized error
06:25:41.920 because the queries don't match. So now
06:25:45.520 go ahead and clean this entirely. make
06:25:48.000 it an empty object and make it an empty
06:25:50.080 object here. Perfect. What we're going
06:25:52.638 to do now is we're going to add Nuks.
06:25:55.760 So, let's go ahead and do npm install
06:25:58.920 nooks- legacy pier depths and I will
06:26:02.480 show you my Nooks version just in case.
06:26:06.120 Oops. Package JSON Nooks. So,
06:26:10.680 2.4.3. Uh the major version here is
06:26:13.520 quite important because uh NX one for
06:26:16.718 example is a completely different usage
06:26:19.600 than NX 2. So in case your NS behaves
06:26:23.840 very differently than mine, feel free to
06:26:26.400 install NX 2.4.3 to get the exact same
06:26:30.320 experience as I do. Now let's go ahead
06:26:33.840 to our root layout application. So
06:26:36.958 source app folder
06:26:39.480 layout and in here import Nuks
06:26:44.280 adapter from Nooks adapters
06:26:48.280 next. And go ahead and wrap the entire
06:26:52.200 app inside of the Nooks
06:26:55.638 adapter. There we go. And now you will
06:26:59.040 see what Nooks basically is. So uh what
06:27:03.680 I like to do is I like to create a use
06:27:08.958 filters hook inside of my uh respective
06:27:12.320 module. So, let's go inside of agents
06:27:14.080 here and let's create
06:27:17.798 hooks. And inside of here, go ahead and
06:27:21.520 add
06:27:23.400 use filters or let's do use agent agents
06:27:30.760 filters.ts like that. And inside of
06:27:34.400 here, what you're going to do is import
06:27:36.958 parse as
06:27:39.798 integer, parse as string, and use query
06:27:44.878 states from
06:27:46.920 Nuks. Export con use agent
06:27:50.200 filters, agents
06:27:52.600 filters, and
06:27:55.160 return use query states
06:27:58.840 here. and pass in the search to be parse
06:28:02.440 as
06:28:05.160 string dot with default empty string and
06:28:08.878 with
06:28:09.798 options clear on default
06:28:13.160 true. Copy and paste this and set the
06:28:16.320 second one to be the page. And this will
06:28:19.520 be parse as integer like this. Oh, and
06:28:24.478 this
06:28:25.320 is an object not an array. Sorry. There
06:28:28.718 we go.
06:28:29.840 And with default it's going to be uh
06:28:32.958 default page from the constants like
06:28:37.080 this and clear on default will be true.
06:28:40.000 So one thing that we are not going to
06:28:41.920 add here is the page size. Why? Well
06:28:45.040 because nooks is basically a way to
06:28:47.878 synchronize your search params for
06:28:51.120 example search hello with your use
06:28:56.240 state. Let's call it like that. So, we
06:28:58.638 are basically going to use Nooks as a
06:29:01.200 way to synchronize the URL state with
06:29:04.320 our React component, right? It's going
06:29:06.878 to be a two-way binding where they will
06:29:09.840 control each other in sync. But what I
06:29:12.718 don't want is for the user to be able to
06:29:15.520 append, you know, page
06:29:18.840 size 1 million and break our app. That's
06:29:22.638 why I won't allow the user to change
06:29:24.638 page size from the URL. Great. So that
06:29:28.000 is use agents builders here. Uh and now
06:29:31.280 that we have that, we have to go ahead
06:29:33.760 and actually uh well use them. So this
06:29:38.000 is what we're going to do. We're going
06:29:40.240 to go inside of source inside of modules
06:29:45.080 agents and let's go inside of uh UI
06:29:48.760 components agents list header right
06:29:52.240 here. And in here I'm going to get the
06:29:55.840 filters and set filters from use agents
06:30:00.360 filters. So you can see that it behaves
06:30:03.600 exactly like use state. So you get a
06:30:06.638 very familiar API and a very powerful
06:30:09.718 feature. So now let's go ahead and
06:30:13.840 create the search filter. So I'm going
06:30:17.680 to go ahead and go uh for the search
06:30:20.878 filter. Yeah. Hm.
06:30:23.920 Uh let's do it inside of the component
06:30:25.680 here. Let's call it agents search
06:30:29.400 filter.
06:30:31.558 DSX. Import the search
06:30:35.558 icon from lucid react. Import the input
06:30:40.320 component from components UI input and
06:30:43.120 import use agents filters from hooks.
06:30:47.120 Export const search filters. Search
06:30:49.680 filter.
06:30:51.760 Extract the filters and set filters from
06:30:54.718 use agents
06:30:56.520 filters. Return a div with a class name
06:30:59.440 of
06:31:00.920 relative. Render the input component
06:31:03.760 here. Give it a placeholder of filter by
06:31:07.320 name. Give it a class name of height 9,
06:31:10.798 background color of white, width of 200
06:31:13.440 pixels, and PL of 7. Give it a value of
06:31:17.600 filters.
06:31:20.080 And on change, grab the event and call
06:31:23.920 set filters just as you would set state
06:31:27.120 and set the search value to event target
06:31:30.520 value. And then add a search icon from
06:31:34.400 lucid react. Make sure you add this
06:31:36.478 import here. and add a class name size
06:31:39.440 for absolute left to top 1 and a half
06:31:44.320 minus translate on the yaxis 1 and a
06:31:47.840 half and text muted
06:31:51.320 foreground. Great. Now, let's go back
06:31:54.080 inside of our agents list header
06:31:56.920 here and let's go outside of this div
06:32:01.400 here and add a
06:32:05.958 div with a class name flex items center
06:32:11.680 gap x2 and padding of
06:32:14.680 one and render the search filter
06:32:19.798 component. And let's actually call it um
06:32:23.320 agents search filter since the name is
06:32:26.240 already agents search
06:32:29.320 filter and render it
06:32:32.040 here. And now in here you should see a
06:32:35.120 text filter by name. And I want to bring
06:32:38.240 your attention to the URL. So this is my
06:32:40.878 URL at the moment. Whoops. Let's go
06:32:44.000 here. This is my current
06:32:46.680 URL. HTTP localhost 3000 agents. When I
06:32:50.798 type test, you can see that it
06:32:53.120 immediately
06:32:54.600 changes to this. It appends the test
06:32:58.080 there. And if I change this to test 1 2
06:33:01.120 3. So if I change my URL this time and
06:33:03.440 press enter, you will see that this is a
06:33:06.400 two-way binding. Meaning that whatever I
06:33:08.878 change in the URL will appear here and
06:33:11.040 whatever I change here will appear in
06:33:13.040 the URL. And you're probably wondering
06:33:15.760 what does the width default and clear on
06:33:19.280 default do. Well, this is simply to
06:33:21.920 improve user experience. So the default
06:33:24.878 search is an empty string. And in here
06:33:27.440 we are telling it if you get an empty
06:33:30.160 string, simply remove this from the URL.
06:33:33.600 So we don't want a scenario where this
06:33:36.478 is the URL. It just looks weird. Why not
06:33:39.520 just remove it? So that's exactly what
06:33:41.840 will happen if I clear this. You can see
06:33:44.240 that now my URL is back to the original.
06:33:48.718 So that's what the with default and
06:33:51.040 clear on default options do. Perfect. So
06:33:54.718 now that we have that, what we can do
06:33:57.320 here is go back inside of the agents
06:34:00.160 list header and now let's do this font
06:34:04.718 is any filter modified and simply do
06:34:08.558 double exclamation points and look for
06:34:10.840 search. Then open a new function on
06:34:14.478 clear
06:34:15.400 filters and call set filters here.
06:34:19.440 search to be an empty string and page to
06:34:23.920 be
06:34:25.400 one and or we can use default page from
06:34:28.958 the constants just so we avoid any magic
06:34:32.200 numbers. There we go. And now we're
06:34:36.760 after agents search filter open is any
06:34:41.360 filter modified here and render a button
06:34:46.120 component with an X circle icon from
06:34:49.200 Lucid React and a clear text. Give the
06:34:53.040 icon a size four. Actually, no, you
06:34:54.958 don't have to. It automatically gets
06:34:56.878 size four if it's inside of a button.
06:34:59.440 Make sure you have imported the button
06:35:01.040 and X circle icon here. and instead give
06:35:04.400 the button a variant of outline size of
06:35:08.638 small and on click on clear filters. So
06:35:13.200 now if you type something you can clear
06:35:16.240 it with this. Great. What we have to do
06:35:19.680 now is we have to connect this with our
06:35:23.760 actual agents view here and pass the
06:35:27.520 search as an option here.
06:35:31.520 And we can do that quite easily by
06:35:34.080 adding our filters hook. So
06:35:37.400 filters use agents filters like this.
06:35:41.840 And simply go ahead and spread the
06:35:45.400 filters. We don't have to even
06:35:47.520 individually add search and then
06:35:51.320 filters. Right? We can simply spread all
06:35:54.160 of them because we know that both search
06:35:57.360 and page exist in the options. So now by
06:36:00.958 default it will use an empty string for
06:36:04.160 the search and number one for the page.
06:36:07.920 But if you try this right now, so go
06:36:10.160 ahead and clear this. And if you
06:36:11.440 refresh, you will get an error, right?
06:36:14.760 Unauthorized. But if you try searching,
06:36:17.760 you will most likely be able to query.
06:36:20.240 The only problem is that when you
06:36:22.120 refresh, when this is like the initial
06:36:24.718 state, you will get this unauthorized
06:36:27.280 error. That's because I explained
06:36:30.120 previously, you need to match your
06:36:33.040 initial load with your server component,
06:36:37.920 right? So now we have to do the same
06:36:40.478 thing here. But how do we do that when
06:36:43.360 we cannot access a hook here? Well, they
06:36:47.200 thought of that too. What we're going to
06:36:49.600 do now is we're going to go back inside
06:36:53.280 of our
06:36:55.080 modules agents and let's go ahead and
06:36:59.200 add a new file called
06:37:02.440 params.ts like this. Let's close all of
06:37:05.520 this. So just add
06:37:07.160 params.ts here. And I want you to go
06:37:09.920 inside of hooks use agent filters. And I
06:37:12.400 want you to copy this. Keep both of them
06:37:14.798 open. Actually go back inside of the
06:37:16.558 params. Paste it here but add a forward
06:37:20.840 slashserver import here. Go ahead and
06:37:23.840 import the default page from constants
06:37:26.798 here and export con filters search
06:37:32.360 params
06:37:33.878 page and simply copy everything that you
06:37:38.320 had here. So you can just copy these
06:37:40.440 two like this. There we go. So search
06:37:44.080 parse as string and this parse as
06:37:46.558 integer and no need for use query states
06:37:48.718 actually from the N server only these
06:37:50.958 two. There we go. And then export const
06:37:55.040 load search params. Create loader from
06:37:59.840 Nooks server and pass the filters search
06:38:03.280 params. So now we have the equivalent
06:38:06.160 for a server component. Now you probably
06:38:09.440 have a question on your mind. Could we
06:38:12.638 use find a way to reuse this? Like can
06:38:15.520 we copy this somewhere and then use it
06:38:17.760 here and use it here in the same time?
06:38:20.320 You probably can. The problem is uh you
06:38:23.360 would have to import everything from
06:38:25.280 Nuk's server. And I just haven't found
06:38:28.638 proof that you can do that safely. Uh if
06:38:32.798 you research yourself, go to the Nuks
06:38:34.798 documentation page. Maybe you will quite
06:38:37.040 easily find an example where they show
06:38:39.600 you that you can use Nuk's server in
06:38:43.280 client components. But I just don't want
06:38:45.760 to teach you anything incorrectly. So
06:38:48.160 that's why I'm repeating myself twice.
06:38:51.040 Once for the client and once for the
06:38:53.120 server just to keep it safe. So yeah,
06:38:56.080 make sure to just copy these properly so
06:38:58.958 there isn't any mismatch because
06:39:00.798 mismatch will continue to cause the
06:39:03.520 unauthorized error. Right? Great. So now
06:39:07.120 that you have the params here, go back
06:39:10.080 to your not the view but go inside of
06:39:13.040 the app dashboard agents page here.
06:39:16.798 Create an interface here. And what you
06:39:20.558 have to do is add search
06:39:23.878 params a type of
06:39:28.440 promise and search params from nooks.
06:39:32.400 And you can import it as a
06:39:34.760 type. Let's move it
06:39:38.680 here. And then go ahead and dstructure
06:39:41.440 the props here. Grab the search params.
06:39:46.160 And then simply get the params from
06:39:50.040 await load search params from modules
06:39:55.320 agents
06:39:57.000 params and pass in search
06:40:01.240 params. And then you finally have your
06:40:03.840 params here or you can call them filters
06:40:07.520 for example. So you use the same keyword
06:40:10.638 as on the client and simply spread the
06:40:14.920 filters and now you have officially
06:40:18.520 synchronized the server component and
06:40:20.958 the client component. You can see no
06:40:22.958 more errors. It now simply has the exact
06:40:26.478 same state on the client and the front
06:40:28.160 end. No matter what I do, I can properly
06:40:31.200 query this. No matter how I refresh, no
06:40:33.120 matter if I manually add search and do
06:40:36.520 something and press enter, no errors
06:40:40.080 because the server component and the
06:40:41.920 client component are synchronized by
06:40:43.920 their initial query, which is exactly
06:40:47.280 what we wanted to achieve. Perfect. And
06:40:51.520 just one important thing to know uh load
06:40:54.798 search params does not validate the
06:40:57.840 search params just in case you were
06:41:00.400 wondering right uh now let's go ahead
06:41:04.638 and let's wrap this chapter up by adding
06:41:07.440 pagionation because we just added search
06:41:09.760 and now we also have to add
06:41:13.080 pagenation. So let's go inside of the
06:41:15.520 agents view here and inside of the use
06:41:18.878 agents filters let's also extract the
06:41:21.520 set filters here and then just below the
06:41:25.120 data table here let's add data
06:41:28.400 pagination here it doesn't exist yet
06:41:31.200 we're going to create it and let's
06:41:32.878 prepare the props the page prop will be
06:41:35.280 filters
06:41:36.760 dotpage the total pages will be agents
06:41:41.120 data whoops data total
06:41:44.760 pages and on page
06:41:47.320 change will be a function which accepts
06:41:51.520 the page and simply calls set filters
06:41:55.040 with the new page. Now let's go ahead
06:41:58.080 and implement the data pagionation
06:42:00.160 component here. So I'm going to call
06:42:02.160 this agents data uh pagion actually we
06:42:05.360 can call it data
06:42:08.520 pagenation tsx
06:42:11.240 data-pagination here like
06:42:13.878 that and let's first of all define our
06:42:18.200 props page is a number total pages is a
06:42:21.360 number on page change is a function
06:42:24.638 which call which will set filters with
06:42:26.958 the new page here and let's also import
06:42:31.040 button. Whoops.
06:42:33.558 From add
06:42:36.920 /components UI
06:42:40.280 button. Let's export cons data
06:42:42.958 pagionation
06:42:46.200 here. And let's dstructure the props
06:42:51.120 page total pages and on page change
06:42:54.840 here. And let's
06:42:57.478 return a div with a class name.
06:43:01.878 Whoops. Flex items center and justify
06:43:08.680 between. Then in here a div with a class
06:43:12.240 name flex one text small and text muted
06:43:18.040 foreground and simply write page then
06:43:21.520 the number of the page of total pages.
06:43:26.160 But in case total pages is zero that
06:43:30.160 will technically mean for the user page
06:43:34.160 one internally on our server. uh if
06:43:37.360 there is no uh if there if there is no
06:43:40.958 uh data at all then the total pages are
06:43:44.160 zero. There are no pages to be made. But
06:43:47.360 for the user, it's weird to show them
06:43:49.440 page zero. That's still technically page
06:43:52.320 one for them. So that's why if we get
06:43:54.958 zero, we're just going to display the
06:43:56.958 number one for the user.
06:44:00.320 And below this, let's add a new div with
06:44:02.798 flex items center justify end and gap.
06:44:06.478 Whoops. And space x2 and py of four. In
06:44:11.280 here, let's add a button with the text
06:44:14.840 previews. And another
06:44:17.320 button with the text
06:44:20.360 next. And now what we have to do is just
06:44:23.558 assign some props to them. Let's set the
06:44:28.160 disabled here to be page one for the
06:44:33.878 previous and for the this one if page is
06:44:36.718 equal to total pages or if total pages
06:44:40.320 is equal to zero like
06:44:43.958 this. The next one will be the variant
06:44:47.040 which is the same for both of them.
06:44:49.400 Outline size
06:44:52.680 small and then we're going to have the
06:44:55.200 on
06:44:56.760 click. The first one or the previous one
06:44:59.600 will have on page change math max one or
06:45:04.958 page minus one. So we are basically
06:45:07.280 ensuring that we cannot go into negative
06:45:10.080 page requests. Right? The lowest one we
06:45:13.040 can go to is page one. And for this one
06:45:16.080 on page change math
06:45:19.320 min total pages otherwise page plus one.
06:45:23.680 This will basically ensure that we
06:45:25.680 cannot go above the total pages. I mean
06:45:28.798 we cannot make a request above total
06:45:31.000 pages. And that's it. That's our
06:45:34.440 pagionation. And now let's go back to
06:45:36.718 the agents view and let's import this
06:45:40.080 from components data pagination. And
06:45:43.040 there we go. You can now see page one of
06:45:45.200 one here and the previous and next
06:45:47.520 buttons which are disabled. In order to
06:45:49.920 see the pagionation in action, the best
06:45:52.000 way is to go inside of the constants and
06:45:54.558 simply change the default page size to
06:45:56.638 be one or two and then you will see that
06:45:59.840 you have the next page active. So when
06:46:01.920 you click next, you will see the next
06:46:04.080 set of results. And take a look at your
06:46:06.000 URL. Uh it should be showing page two.
06:46:09.360 So if I manually change this to page
06:46:11.440 three, it should load it should load the
06:46:14.320 page three. And I can go back
06:46:16.160 previously. And you can see when I do a
06:46:17.920 refresh, it stays on page two. And there
06:46:20.478 are no errors because we properly
06:46:22.638 synchronized the client and the React
06:46:25.200 server component. So you can now bring
06:46:27.440 this back to 10. you know just show the
06:46:30.000 normal amount of data just you can
06:46:32.320 always reduce it if you want to test
06:46:33.920 your pagination amazing amazing job so
06:46:37.440 you created a lot of components now
06:46:39.360 which we are going to easily reuse for
06:46:41.600 our meetings so we won't have to build
06:46:43.840 all of this all over again uh
06:46:46.440 specifically some components we are
06:46:48.478 going to copy uh but some we're going to
06:46:51.120 actually reuse that's why some of them
06:46:54.080 in here have generic names like data
06:46:56.798 pagenation and data table. So we are
06:46:59.360 later going to move these two into
06:47:02.080 global components because they will be
06:47:03.920 reusable. Uh but these ones aren't
06:47:06.958 exactly reusable but we will be able to
06:47:09.760 copy their code and then just uh build
06:47:12.638 faster. Right? Uh if you want to you can
06:47:15.120 make them reusable but sometimes I think
06:47:17.200 two abstraction is not too good of a
06:47:20.320 thing to do. Great. So now that we've
06:47:24.160 had this done let's just review. We have
06:47:27.520 modified agents get many procedure. We
06:47:29.760 added nooks. We added UI for filters
06:47:32.478 including the search input and
06:47:33.840 pagionation. And we synchronize React
06:47:36.080 server component filters and client
06:47:38.000 filters. And now let's merge
06:47:40.360 this. So I'm going to go ahead and
06:47:43.920 change to a new branch here. 13 agents
06:47:48.240 filters.
06:47:52.240 Once I confirm I am on a new branch, I'm
06:47:54.958 going to stage all of these
06:47:57.160 changes. 13 agents filters as my commit
06:48:00.478 message. I will press commit and I will
06:48:02.400 publish the branch. There we go. And
06:48:06.000 let's go to
06:48:07.478 GitHub. Let's create a pull request
06:48:11.000 here. And let's see what Code Rabbit has
06:48:14.878 to
06:48:17.160 say. And here we have our code summary.
06:48:21.040 Let's go through the walk through. This
06:48:23.600 update introduces pagionation and search
06:48:25.920 filtering for agents leveraging the new
06:48:28.160 Nooks dependency for query state
06:48:30.360 management. It adds constants for
06:48:32.718 pagenation, new hooks and components for
06:48:35.120 filters in pagenation UI and modifies
06:48:37.760 the agents query to support pageionated
06:48:39.920 and filtered results. And the root
06:48:42.478 layout now wraps providers with a new
06:48:44.958 Nooks adapter. In here we have a
06:48:48.160 detailed file by file change summary. In
06:48:52.080 here we have a sequence diagram uh
06:48:54.320 diagram explaining our new filters here
06:48:58.240 uh combined with the actual Nooks use
06:49:00.878 agents filters. So again if something is
06:49:03.840 uh not clear regarding this chapter
06:49:06.958 these kinds of diagrams come in very
06:49:08.798 handy as you can see exactly what's
06:49:10.400 going on. So the user loads the page
06:49:12.080 with search params. The agents view
06:49:14.240 components gets the filter state, search
06:49:16.320 and page using the use agents filters
06:49:18.478 here. We fetch the agents with those
06:49:20.878 filters. The agents server procedure
06:49:23.440 then returns that in form of items total
06:49:26.000 and total pages and then we render the
06:49:28.798 page by clicking on the next or
06:49:30.878 previous. We update the page in query
06:49:33.760 params and that triggers a data refetch
06:49:36.718 with the new
06:49:38.520 filters and no comments. That means we
06:49:42.558 did a very very good job. So we can
06:49:45.760 safely merge this pull request. Perfect.
06:49:49.680 Once this pull request has been merged,
06:49:52.240 let's go back inside of our IDE. Let's
06:49:54.958 go inside of our default branch. In my
06:49:57.040 case, that is main. And let's go ahead
06:49:59.680 and hit synchronize changes right here.
06:50:03.120 And then you can go inside of your
06:50:05.120 source control, open the graph, and
06:50:07.520 confirm that you just merged the agents
06:50:10.520 filters. There we go. Perfect. So that
06:50:15.120 marks the end of this chapter. Amazing,
06:50:17.200 amazing job. And see you in the next
06:50:20.520 one. In this chapter, we're going to
06:50:23.200 implement the individual agent page.
06:50:26.400 This will include modifying the existing
06:50:28.878 agents get one procedure. Creating the
06:50:31.920 agent ID server component page, adding a
06:50:35.600 data table redirect on click, creating
06:50:39.440 the agent ID client view. What we are
06:50:42.878 not going to do is implement the actual
06:50:45.680 edit and delete functionality. We are
06:50:48.000 just going to prepare the UI for that.
06:50:51.600 So let's start by modifying agents get
06:50:54.240 one procedure. As always, ensure that
06:50:57.200 you're on your default branch and feel
06:50:59.360 free to synchronize changes before
06:51:01.600 beginning just so you are sure that
06:51:04.478 everything is up to date. After that,
06:51:07.520 let's go inside of our modules agents
06:51:10.958 server
06:51:12.680 procedures and let's go inside of get
06:51:15.200 one protected procedure.
06:51:17.638 Here we can leave the input as it is.
06:51:21.440 The only thing that we are going to
06:51:22.878 modify is the following. In the wear,
06:51:26.958 we're going to add
06:51:30.360 and we already have and imported from
06:51:36.360 drizzlem. Let me just go back to my get
06:51:38.878 one here. And let me collapse this like
06:51:42.160 this so it's easier to keep track of.
06:51:44.958 inside of this end query. The first one
06:51:47.120 will be to make sure that we are loading
06:51:49.520 the agent for the ID that we pass in the
06:51:52.638 input. But the second one will be to
06:51:55.200 ensure that the agents user ID is the
06:51:59.280 same one as context. Whoops, we need to
06:52:02.558 extract context from here because this
06:52:04.798 is now a protected procedure. So make
06:52:07.360 sure you change this to protected
06:52:08.718 procedure if you haven't. Context.out
06:52:11.520 out dot user ID. So besides loading by
06:52:16.718 the agent ID, we are also going to
06:52:18.878 confirm that this user has access to see
06:52:21.920 that user ID. And the way we do that is
06:52:25.200 by checking if that user is the author,
06:52:28.320 the creator of that agent. And then what
06:52:31.920 we're going to do is if there is no
06:52:34.160 existing agent, let's throw
06:52:37.798 new TRPC error which you can import from
06:52:42.718 at the RPC
06:52:46.360 forward/server. And in here return a
06:52:50.080 code not found and a message agent not
06:52:55.000 found like that. There we go. And you
06:52:58.638 can leave the meeting count to be a
06:53:01.040 dummy number still. We are later going
06:53:03.680 to change it. Now that we have that,
06:53:06.878 let's go ahead and let's implement the
06:53:09.840 agent ID
06:53:11.958 page. So we're going to go inside of app
06:53:14.558 folder dashboard agents and create a new
06:53:17.360 folder inside of square brackets agent
06:53:19.760 ID. Be mindful of the capitalization
06:53:22.718 here because the the way you write the
06:53:26.558 variable inside will be the way you will
06:53:29.040 access it. So if you put a lowerase I,
06:53:32.558 you will need to use a lowerase I in the
06:53:34.958 code. If you put an uppercase I, you
06:53:37.760 will have to use the uppercase I. So
06:53:39.520 just be mindful. Let's create a page.x
06:53:43.120 inside of here. And let's go ahead and
06:53:46.320 create an interface props. And the
06:53:49.040 params will be a type of promise and
06:53:51.840 inside agent ID which is a string. So
06:53:55.200 this is what I was talking about. It
06:53:57.360 needs to be agent ID because we named
06:53:59.760 this folder agent ID instead of square
06:54:02.000 brackets. Right? So then this will look
06:54:04.320 like localhost 3000 forward/ aents and
06:54:07.840 then 1 2 3 and then 1 2 3 will be the
06:54:11.360 agent ID. So it's basically kind of an
06:54:15.360 uh unh hardcoded part of the URL. So,
06:54:18.160 dynamic part of the URL, that's the word
06:54:20.400 I was looking for. Let's go ahead and do
06:54:23.680 a default export here for the page.
06:54:26.878 Let's add the props here. Let's get the
06:54:30.558 params. Let's turn this into an
06:54:32.400 asynchronous method. And let's go ahead
06:54:36.080 and dstructure the agent ID await
06:54:39.320 params. There we
06:54:41.638 go. Uh, now let's go ahead and do the
06:54:45.760 prefetching. So query client is get
06:54:48.638 query client from tRPC
06:54:51.958 server add TRPC from here as
06:54:55.400 well and then just do void query client
06:54:59.360 prefetch query like that and inside add
06:55:02.798 TRPC agents get one query options and
06:55:07.920 inside ID pass the agent
06:55:10.840 ID. There we go. We have now prefetched
06:55:14.160 this
06:55:15.478 agent. Now inside of here, let's render
06:55:18.638 our hydration boundary which you can
06:55:21.040 import from tanstack react query and
06:55:24.240 also add dehydrate from here. Pass in
06:55:27.440 the state here to be dehydrate query
06:55:31.638 client just like that.
06:55:35.200 Now, inside of here, go ahead and add
06:55:37.360 suspense from React and error boundary
06:55:41.360 from React error boundary. So, make sure
06:55:45.040 to add these two. Now, let me just
06:55:47.600 properly align
06:55:49.878 these. For both of these, give them a
06:55:53.558 fallback. And for now, you can just
06:55:55.840 write a paragraph loading
06:55:59.558 error. And then in here render the agent
06:56:02.638 ID view and pass in the agent ID prop to
06:56:06.320 be agent
06:56:08.920 ID like
06:56:11.400 this. Now let's go ahead inside of our
06:56:15.080 modules
06:56:16.840 agents UI views and create the new
06:56:20.958 agent- id-
06:56:25.080 view.tsx. In here create a prompts
06:56:28.120 accepting already the structured agent
06:56:31.360 id. So in here it's a promise in the
06:56:33.520 params but in here we are passing it
06:56:35.840 directly. So we have it like this. Let's
06:56:39.400 export const agent ID view here.
06:56:44.478 Let's use the props
06:56:46.200 here and let's get the agent
06:56:49.878 ID and inside of here let's prepare the
06:56:52.878 DRPC from use DRPC and let's prepare
06:56:58.958 um I think that's it for now so let's
06:57:01.040 just uh leave it like this and let's get
06:57:04.160 our data using suspense query from tan
06:57:09.280 stack react query here and pass in gRPC
06:57:14.000 agents get
06:57:15.320 one query options and pass in the agent
06:57:20.760 ID as the ID like this. There we go. So
06:57:25.280 now our use suspense query matches our
06:57:29.120 hydration because this is the only prop
06:57:31.440 we are sending.
06:57:33.160 Perfect. Now that we have this, we can
06:57:35.600 go ahead and render out some information
06:57:38.798 here.
06:57:40.558 So inside of here, return a
06:57:43.798 div with a class name of flex one, py of
06:57:48.958 4, px of 4, md px of 8, flex flex
06:57:55.680 column, and gap y of
06:57:58.040 four. And you can just JSON stringify
06:58:02.840 data null and two.
06:58:08.240 So now make sure to mark this as use
06:58:11.360 client as well. Go inside of the page
06:58:14.320 and render the agent ID view from
06:58:17.878 modules. There we go. So now you still
06:58:22.400 don't really have a way of accessing
06:58:24.558 this because clicking on this does
06:58:26.760 nothing. So we created the agent ID page
06:58:29.680 and now we have to add data table
06:58:31.600 redirect on the click here.
06:58:35.160 So let's go ahead inside of our modules
06:58:40.520 agents agents
06:58:43.240 view go ahead and add a router from use
06:58:46.240 router from next navigation
06:58:51.240 here and then in the data table besides
06:58:54.958 having data and besides having the
06:58:57.638 columns also add on row click here you
06:59:01.600 will get the access to row information
06:59:04.080 and do router.push here open back text
06:59:07.280 slash agents and then row
06:59:11.718 id. So now when you click on an
06:59:14.558 individual agent let's just do a hard
06:59:16.558 refresh and click here you will get
06:59:19.760 redirected to the following
06:59:22.200 URL agents and then the agent ID. So I
06:59:26.878 can double check that. Let me just
06:59:28.240 refresh my neon uh tables here. If I go
06:59:31.520 inside of my agents here, let's just
06:59:34.000 wait for them to load. This is the agent
06:59:36.000 that I clicked on. F9
06:59:38.600 vis. And I can see that's exactly what's
06:59:41.680 inside of my URL. So your URL should
06:59:44.080 look exactly like this because that is
06:59:46.798 the exact structure we have defined in
06:59:48.718 here. Agents agent ID, right? So agents
06:59:54.400 agent ID. And in here we have the JSON
06:59:58.160 information about our
07:00:00.280 agent. Now let's go ahead and let's
07:00:02.638 build the proper loading and error
07:00:06.760 states. So let's go back inside of our
07:00:10.240 agents module UI agent ID view and we
07:00:14.240 can actually borrow the agents view
07:00:16.400 states here. So copy these two exports
07:00:19.600 the loading and the error. Go inside of
07:00:22.240 agent ID view here. Paste them. And
07:00:25.120 let's rename this. So this is agent ID
07:00:27.920 view loading. And this is agent ID view
07:00:30.718 error. Import the loading state from
07:00:33.040 components loading state. And import the
07:00:35.200 error state from components error state.
07:00:37.840 This will be loading agent and this will
07:00:40.320 be error loading individual agent like
07:00:44.680 this. Make sure you've imported the
07:00:47.040 loading and the error state. Now that
07:00:49.760 you have these two, you can go inside of
07:00:52.320 your page here. And we've added this
07:00:54.478 placeholders. So now let's add the
07:00:56.558 actual agent ID view loading. And in
07:01:00.878 here let's add agent ID view error
07:01:04.718 components. So all of them from the same
07:01:07.040 import the agent ID view, agent ID view
07:01:09.920 error and the loading state. So now when
07:01:13.200 you do a refresh here you will see how
07:01:15.280 it looks like. And if you try and change
07:01:17.360 the ID to something gibberish you will
07:01:20.878 get the proper error state. You might
07:01:23.360 run into that infinite loading error,
07:01:25.600 but it's going to resolve itself in a
07:01:27.680 few seconds and it will show error
07:01:30.080 loading agent. Perfect. Oops. Let's go
07:01:33.280 to the agents
07:01:34.840 here and just select some proper agent
07:01:37.760 now so you can see the
07:01:40.520 data. Now let's go back inside of the
07:01:43.280 agent ID view component. So instead of
07:01:46.400 our modules agents UI view agent ID view
07:01:50.080 the client component here where we
07:01:52.558 stringify the data and instead let's
07:01:55.280 render the agent ID view header
07:02:01.160 component. Let's go ahead and pass in
07:02:03.840 the agent ID here to be agent ID. Let's
07:02:07.520 pass in the agent name to be
07:02:11.478 data.name. And let's pass in on edit
07:02:14.638 here to be an empty arrow function and
07:02:18.320 on remove here to be an empty arrow
07:02:20.718 function as well. Now let's go ahead
07:02:23.200 inside of the components and let's
07:02:24.798 create agent ID view
07:02:27.718 header dsx. There we go. And inside of
07:02:32.478 here, let's prepare our props. Agent ID,
07:02:36.160 agent name, on edit, and on remove. Now
07:02:40.320 let's go ahead and export
07:02:43.080 const agent ID view
07:02:47.320 header. Let's go ahead and destructure
07:02:49.840 these props
07:02:52.600 here. So that's agent ID, agent name on
07:02:56.718 edit and on
07:02:58.200 remove. Inside of here we are going to
07:03:00.798 return a div with a class name flex
07:03:03.920 items center and justify
07:03:07.478 between. And now inside of here, we're
07:03:10.638 going to add the breadcrumbs. So this is
07:03:12.638 a component that we already have. So you
07:03:16.160 can go ahead here and import all of
07:03:18.798 these from components UI breadcrumb. The
07:03:22.160 breadcrumb itself item link list and the
07:03:26.160 separator. So this is a shatzian
07:03:28.320 component and it exists inside of source
07:03:30.320 components UI
07:03:32.440 breadcrumb. Now let's go ahead and use
07:03:34.558 it to render out our header. And we can
07:03:38.000 actually import agent ID view header
07:03:41.160 here simply so you can see what you're
07:03:44.558 doing. Right? So right now nothing is
07:03:46.240 visible. And now we're slowly going to
07:03:48.400 add some more information
07:03:50.600 here. So open up the breadcrumb inside
07:03:55.120 open up the breadcrumb
07:03:59.638 list. Inside of it a breadcrumb
07:04:03.320 item. And finally the breadcrumb
07:04:09.240 link. Give the link as child prop and a
07:04:12.718 class name font medium and text extra
07:04:16.520 large. Inside use an actual link from
07:04:20.000 next
07:04:21.958 link like
07:04:24.520 this. Give this an href of forward slash
07:04:28.040 agents and in here write my agents like
07:04:32.638 this.
07:04:34.080 So now you have a text which says my
07:04:36.000 agents and when you click on it you are
07:04:38.160 redirected back to the agents page. So
07:04:40.478 you can see when you click on something
07:04:41.920 you will have this left.
07:04:44.040 Perfect. Now let's go ahead outside of
07:04:46.958 this breadcrumb item and let's add a
07:04:48.958 breadcrumb separator
07:04:50.920 here and let's add a chevron right
07:04:56.280 icon. Let's go ahead and give this a
07:04:58.718 class name. I mean the breadcrumb
07:05:00.958 separator. So let's give it a class name
07:05:02.478 of text foreground text extra large font
07:05:06.718 medium and target the SVG using this
07:05:10.400 method here
07:05:14.520 SVG size four like this. Make sure you
07:05:18.718 have imported the chevron right icon
07:05:22.000 from Lucid
07:05:23.718 React. Then after the separator here,
07:05:26.558 you can copy the breadcrumb item like
07:05:30.240 this and the link
07:05:34.760 inside and change this to have a text of
07:05:40.120 foreground like that. And the href will
07:05:45.478 be open curly
07:05:48.680 brackets replace these with back ticks
07:05:52.558 and you will go to agents agent ID and
07:05:55.600 inside you will render the agent
07:05:58.120 name like this. So when you click on it
07:06:02.160 you are already in here but it's I think
07:06:04.558 it's semantically correct to do it this
07:06:06.478 way. Right. So you can now go back to
07:06:08.000 your agents and you can see the name of
07:06:10.080 the current agent you're on.
07:06:12.878 There we go.
07:06:14.200 Perfect. So now let's go ahead and
07:06:16.878 import our uh drop-down
07:06:22.440 menu from components UI drop-own menu.
07:06:25.600 Import drop-own menu
07:06:27.638 trigger drop-down menu item and
07:06:31.840 drop-down menu
07:06:33.958 content and also import button from
07:06:37.920 components UI button.
07:06:41.760 also import trash icon and pencil icon
07:06:47.600 and more vertical icon all from lucid
07:06:51.798 react. Now let's go ahead uh after our
07:06:55.680 breadcrumb
07:06:57.400 ends, let's open a drop-down
07:07:02.280 menu. And this is important. Give it a
07:07:05.360 model false.
07:07:08.718 without model
07:07:11.558 false. The dialogue that this drop-down
07:07:16.080 opens causes the website to get
07:07:20.040 stuck or maybe precisely
07:07:23.400 uncclickable. Right? So that's why we
07:07:25.680 need model false because our drop-own
07:07:28.000 menu will open models, the edit model
07:07:31.360 and the delete module. So that's why we
07:07:33.920 have to not do double model otherwise
07:07:37.120 the website will be in this weird
07:07:39.120 hanging
07:07:40.680 state. So let's add drop-own menu
07:07:43.440 trigger
07:07:44.920 here
07:07:46.760 button. Mark this as child give this a
07:07:50.000 variant of
07:07:51.400 ghost inside more vertical
07:07:56.360 icon. And outside of the trigger, add a
07:08:01.160 content. Give it an align of
07:08:05.160 end drop-down menu
07:08:07.958 item on click on
07:08:11.558 edit and a pencil
07:08:15.080 icon with a class name of size four and
07:08:19.360 text black and the text of
07:08:22.920 edit. Duplicate this. Change the on
07:08:25.760 click to be on
07:08:27.478 remove. This will be
07:08:30.280 delete and trash icon. So the reason I'm
07:08:34.638 typing text delete but using remove
07:08:37.440 keyword is simply because delete is a
07:08:40.000 reserved uh syntax in JavaScript. So
07:08:43.680 that's why I'm using remove internally
07:08:46.000 but delete on the user side. So now in
07:08:49.920 here, as you can see, you have a nice
07:08:52.320 dropown for editing and deleting.
07:08:55.200 Currently, they do nothing. We're going
07:08:56.718 to implement that later. Perfect. Now we
07:08:59.600 can go back inside of the agent ID view
07:09:02.240 here. And below the header, open up a
07:09:04.798 new div with a class name background
07:09:08.080 white rounded large
07:09:10.520 and
07:09:12.680 border. Inside of here, open a new div
07:09:16.000 with a class name px4 py 5 gap y of 5
07:09:20.958 flex flex column and call span of five.
07:09:26.080 Inside of here, a div with a class
07:09:29.160 name flex items center and gap x of
07:09:33.878 three. Let's render our generated avatar
07:09:36.878 component, which is a self-closing tag.
07:09:39.520 Make sure you have imported it from
07:09:41.440 components generated
07:09:43.878 avatar. Go ahead and give it a variant
07:09:47.040 of bots neutral and a seed of data name
07:09:51.680 and a class name of size
07:09:54.600 10. Below it an H2 element rendering the
07:09:57.920 data
07:10:00.440 name. Give the H2 element a class name
07:10:04.558 text to Excel and font
07:10:06.920 medium like this.
07:10:10.240 And outside of this
07:10:12.760 div, render a
07:10:15.400 badge from components UI badge. So make
07:10:18.798 sure you import it from here and not
07:10:20.958 from Lucid React because sometimes u
07:10:24.160 IntelliSense imports it from there. Give
07:10:27.040 this batch here a variant of outline and
07:10:30.478 a class name of flex item center gap x2.
07:10:34.718 Target the SVG and give it a size of
07:10:37.520 four inside. Render the video
07:10:41.000 icon. Make sure you have it from Lucid
07:10:46.120 React and go ahead and render data
07:10:49.760 meeting count. So inside of our
07:10:53.240 procedures get one, we added meeting
07:10:56.000 count in the select with a mock number
07:10:58.240 five. So later we're going to change it
07:11:00.160 to the actual meeting count, but I'm
07:11:02.240 just showing you this in case you don't
07:11:03.760 have it. You need to add it so that you
07:11:05.920 can access it here in the agent ID view.
07:11:08.958 So now that you have the meeting count
07:11:10.638 here, go ahead and check if data meeting
07:11:14.080 count is equal to one. Render meeting
07:11:18.600 otherwise meetings like this. There we
07:11:21.840 go. Outside of this, render a div with a
07:11:25.520 class
07:11:26.760 name flex flex column. Yeah, y of four
07:11:31.200 and two
07:11:32.280 paragraphs. First one with the label
07:11:35.878 instructions and the bottom one with the
07:11:39.280 actual data instructions.
07:11:42.878 Give this one a class name of text large
07:11:45.760 and font
07:11:47.240 medium. And this one a class name of
07:11:50.080 text neutral
07:11:54.520 800. And there we go. Now let's just
07:11:58.000 give this video icon here a class name
07:12:00.958 of text blue
07:12:03.718 700. Perfect. So this is our agent view.
07:12:07.840 You can see that it matches exactly what
07:12:09.840 we see here, but in a different layout.
07:12:12.638 And now in the next chapter, we will be
07:12:14.798 able to edit it and to delete it. Great.
07:12:19.040 Amazing. I think that's all we wanted to
07:12:21.360 do here. Let's just see this error that
07:12:23.440 I'm having here. It looks like I'm not
07:12:26.360 using more vertical. That's right.
07:12:29.280 Because I'm using the more vertical
07:12:30.878 icon. Okay. So, basically, I added an
07:12:34.000 invalid import here. Perfect. So I think
07:12:37.680 that's it for this chapter. Everything
07:12:40.160 seems to be working just fine. Uh and
07:12:42.718 obviously this is not in sync now. This
07:12:44.958 shows six and this shows five. So I'm
07:12:48.798 going to change that later when we
07:12:50.240 actually do the proper
07:12:52.120 calculation. So we've added this and
07:12:54.478 we've added this. And now let's merge
07:12:57.958 this. So I'm going to go ahead and
07:13:00.558 create a new branch with the name 14
07:13:02.638 agent page.
07:13:07.680 I'm going to stage all changes once I am
07:13:10.718 on the new page.
07:13:12.280 Here I will add a commit
07:13:16.120 message and I will publish the
07:13:19.798 branch. And now let's go ahead and open
07:13:23.280 a pull
07:13:26.440 request. And let's see what our code
07:13:29.280 reviewer has to say.
07:13:32.558 And now let's read our code summary. We
07:13:36.080 introduced a detailed agent view page
07:13:38.240 with loading and error handling states.
07:13:40.638 We added a header component for the
07:13:42.400 agent date detail view featuring
07:13:44.798 breadcrumb navigation and an action menu
07:13:47.440 with edit and delete options. We enabled
07:13:50.558 navigation to an agents detail page by
07:13:53.200 clicking on a row in the agents list. We
07:13:56.080 also improve data security by ensuring
07:13:58.320 only agents owned by the current user
07:14:00.478 can be accessed. So this is referring to
07:14:03.280 us modifying the get one procedure. In
07:14:06.718 here we have a more in-depth walk
07:14:09.120 through. We have a short sequence
07:14:11.360 diagram explaining how when the user
07:14:13.200 clicks on an agent row, we access the
07:14:15.360 agent view. We use router push agents
07:14:18.558 agent ID to get to the agent detail
07:14:21.360 page. In here we load the agent detail
07:14:23.920 page using a react server component and
07:14:27.120 then we do the uh we basically fetch the
07:14:30.958 agent data later on but we have it in
07:14:33.280 the cache so it's much faster and then
07:14:35.680 we return agent data or error and
07:14:38.558 depending on that we show either the
07:14:40.958 agent details loading or the error
07:14:44.120 UI and it also noticed a related PR here
07:14:47.760 for our agents setup. So it's pretty
07:14:49.760 cool how it keeps context of all of our
07:14:53.440 previous work. So it knows what we are
07:14:56.478 actually
07:14:57.320 developing. And in here uh we have a
07:15:00.558 request from them to uh verify that we
07:15:04.558 know what we are doing because we set
07:15:06.160 the model to false. So you can see that
07:15:08.240 when you add a comment uh it doesn't
07:15:10.878 tell you that you made a mistake. It
07:15:12.718 just asks you to verify. So pretty nice
07:15:16.080 uh noticing of the comment here. And of
07:15:19.040 course, it tells us to add a proper
07:15:21.040 comment here to implement this and not
07:15:23.760 just leave it like that. And that's
07:15:25.520 exactly what we will do in the next
07:15:27.320 chapter. So, let's go ahead and merge
07:15:29.760 this pull request. And once you've done
07:15:32.558 that, go ahead inside of your main and
07:15:36.638 synchronize the changes. After that, go
07:15:40.478 inside of your source control, open the
07:15:43.440 graph and confirm that you have just
07:15:45.760 merged 14 agent page. Perfect. Amazing.
07:15:50.558 Amazing job. And see you in the next
07:15:54.760 chapter. In this chapter, we are going
07:15:57.360 to implement update and delete
07:15:59.440 functionality for an individual agent.
07:16:02.240 This will include adding agents.
07:16:04.958 procedure, agents.update update
07:16:07.240 procedure and the actual edit and delete
07:16:11.558 UI. So, let's start with adding these
07:16:14.600 procedures. As always, ensure that
07:16:17.040 you're on your default branch and feel
07:16:19.680 free to synchronize the changes to
07:16:21.920 ensure that you're up to
07:16:24.200 date. After that, let's head inside of
07:16:26.798 our modules agents server and inside of
07:16:30.478 the procedures and let's implement the
07:16:33.680 remove procedure. So this will be a
07:16:37.200 protected
07:16:38.600 procedure and it's going to have a input
07:16:42.400 of
07:16:44.120 Z.Object and simply accept ID which is a
07:16:47.600 type of
07:16:49.080 string. Add a
07:16:51.240 mutation destructure the context and the
07:16:55.718 input. Let's go ahead and get the
07:16:58.718 removed agent here by using await
07:17:02.000 database.delete
07:17:03.478 delete
07:17:05.558 agents where
07:17:08.520 do and go ahead and add and the first
07:17:12.718 one will match the agents ID for the
07:17:15.600 input ID and the second one will confirm
07:17:18.798 that the agent's user ID is the
07:17:21.520 currently logged in user so that only we
07:17:25.280 can remove this user and no one else go
07:17:28.798 ahead and add returning here if there is
07:17:32.160 no moved agent here. Throw new TRPC
07:17:36.680 error code not found with a message
07:17:40.878 agent not
07:17:44.280 found otherwise return the removed agent
07:17:48.080 back to the client. Perfect. Now let's
07:17:51.440 go ahead inside of our modules agent
07:17:54.680 schemas and in here let's export con
07:17:58.638 agents
07:18:00.440 update schema and let's reuse the agents
07:18:04.638 insert schema and simply extend it by
07:18:08.638 also requiring an ID. Give it a minimum
07:18:13.040 length and a message ID is
07:18:18.200 required like this. Now let's go back
07:18:21.440 inside of our procedures here and let's
07:18:25.440 implement the update protected
07:18:28.840 procedure. So the update protected
07:18:31.600 procedure will have an input of agents
07:18:34.878 update schema. Make sure to add this
07:18:38.920 import and in here add a mutation
07:18:43.958 asynchronous destructure the context and
07:18:47.040 the input here. Let me just move this
07:18:49.920 comma to this place. And you can obtain
07:18:53.600 the updated agent here by using await
07:18:56.718 database update
07:18:59.558 agents.
07:19:01.080 Set everything in the input where
07:19:05.958 and you can just copy the same logic as
07:19:09.920 here. So the matching agent ID with the
07:19:14.080 matching author and make sure to put
07:19:16.558 returning here. If there is no updated
07:19:20.440 agent, you can throw the same error as
07:19:23.760 here. Agent not found. And then return
07:19:27.600 updated agent. And just like that, we
07:19:30.478 have implemented our procedures. Let's
07:19:32.958 go ahead and mark them as complete.
07:19:35.760 Now let's go ahead and implement the
07:19:37.440 delete UI as it is a bit simpler. So
07:19:41.840 what I want to do is I want to go inside
07:19:43.680 of an individual agent here and I want
07:19:46.160 to go inside of the agent ID view. So
07:19:50.000 inside of modules agents UI views agent
07:19:54.558 id
07:19:56.200 view. And in here let's go ahead and
07:19:58.798 prepare some things. Let's set the
07:20:01.200 router to be use router from next
07:20:03.840 navigation.
07:20:05.520 And let's add query client to be use
07:20:08.160 query client front stack react query. So
07:20:12.080 I'm just going to move this here. There
07:20:13.840 we go. Make sure you have added use
07:20:15.280 query client and use router from next
07:20:17.400 navigation. And then what we're going to
07:20:19.520 do is we're going to add a remove agent
07:20:22.040 method by using use mutation. So make
07:20:25.440 sure you have imported use mutation from
07:20:27.600 tanstack react query. Inside of the use
07:20:31.240 mutation, go ahead and pass
07:20:36.600 TRPC.agents. And open up mutation
07:20:40.280 options. Inside of the mutation options
07:20:43.280 here, oh, and let's just see. Uh, looks
07:20:46.718 like I have accidentally been
07:20:49.080 doing this. Let me just fix this. Use
07:20:52.080 mutation. Use query client. Use suspense
07:20:53.920 query. Okay. Uh, I think that's all I
07:20:56.958 need. Yes, perfect. So let's go back
07:20:59.440 inside of the remove agent here and
07:21:01.520 let's add on success here to do the
07:21:04.320 following. Let's use query client
07:21:06.558 invalidate queries. And the first thing
07:21:08.878 we want to invalidate is our get
07:21:12.840 many and add query options here and pass
07:21:16.320 in an empty object
07:21:18.120 inside. Then I want to invalidate
07:21:21.840 uh something that we don't yet have. So
07:21:24.878 I'm just going to add a comment to do
07:21:26.600 invalidate preier
07:21:30.040 usage. And after we've done that, let's
07:21:33.520 do
07:21:35.240 router.push forward slash agents like
07:21:39.040 this. And you can mark this as async.
07:21:41.200 And then you can mark this as a wait. So
07:21:43.520 it will push after it invalidates the
07:21:45.718 query. And on error
07:21:48.760 here obtain the error and do a toast
07:21:52.798 which you can import from
07:21:55.240 soner. So move it here toast dot error
07:21:59.360 error dot
07:22:01.638 message and just like that you have
07:22:04.000 implemented the remove agent method. So
07:22:07.520 if you want to technically you could
07:22:10.160 already uh call on remove here. So you
07:22:14.000 could do remove agent mutate and pass in
07:22:18.798 the IG to be agent
07:22:21.000 ID. So for example, if you were to do
07:22:24.160 this
07:22:26.520 delete and try one more time because I
07:22:29.680 have two of them with the same name.
07:22:31.760 There we go. So there it's definitely
07:22:33.520 working, right? The problem is there is
07:22:36.080 no confirmation, right? The moment you
07:22:38.400 hit delete, it immediately deletes. So
07:22:41.440 if you if you are fine with that, no
07:22:43.600 problem. But I want to go a step further
07:22:45.840 and I want to add the confirmation
07:22:48.760 message. So let's go
07:22:51.000 ahead inside of source hooks and create
07:22:57.080 use-confirm. TS actually tsx it's
07:23:00.878 important to be
07:23:03.718 tsx. Import jsx and use state from
07:23:07.040 react.
07:23:08.798 import button from components UI button
07:23:12.320 and import responsive dialogue. Let's
07:23:15.360 export
07:23:19.400 const. We will accept a title which is a
07:23:22.400 type of string and a description which
07:23:24.558 is a type of string and we are going to
07:23:27.120 return the
07:23:29.000 following a
07:23:31.638 JSX.element
07:23:33.240 and a promise unknown.
07:23:38.160 Let's go ahead and return that now.
07:23:40.718 First of all, let's set the promise and
07:23:42.878 set promise to be use state here and
07:23:46.478 let's set it to null by default. Let's
07:23:49.200 give the use state a following value.
07:23:52.558 Open an object and write resolve a
07:23:57.120 function which accepts the value which
07:23:59.040 is a boolean and returns a void. So it
07:24:02.478 can either be that instead of an object
07:24:05.878 or it can be null. There we go. So
07:24:09.760 that's our promise state. Now let's add
07:24:13.040 the
07:24:14.280 confirm
07:24:16.200 method in here. Very simply return new
07:24:20.360 promise. Grab the resolve from here and
07:24:24.160 set promise to
07:24:26.760 resolve like this.
07:24:31.280 Then do const handle close in here. Set
07:24:34.878 promise to be
07:24:37.798 null. Create a const handle
07:24:41.000 confirm. In here check if the promise
07:24:44.080 exists and resolve it with true and do a
07:24:48.400 handle
07:24:50.440 close. And finally let's do con handle
07:24:56.120 cancel which is an explicit no. So let's
07:24:59.920 resolve this
07:25:02.600 whoops with false and handle close. So
07:25:07.120 we are basically creating a system where
07:25:09.760 the user can answer yes or no for a
07:25:13.280 specific action and the you and then a
07:25:16.400 developer will be able to await the
07:25:18.958 result from this hook and get either
07:25:21.680 true or false and depending on that we
07:25:24.478 can call the delete method or we can
07:25:26.798 close the model. for example. So, it's
07:25:29.360 going to be a highly reusable hook for
07:25:32.240 asking the user for
07:25:34.040 confirmation. And let's now do a const
07:25:37.600 confirmation dialogue
07:25:39.638 here. And let's actually render this.
07:25:43.040 So, responsive dialogue like
07:25:46.840 this. Let's pass in the open to be
07:25:49.958 promise not null. on open change to be
07:25:53.920 handle
07:25:55.240 close. Title will be title. Description
07:25:59.360 will be
07:26:01.000 description. Inside of it, open a div
07:26:04.638 with a class name adding top four full
07:26:08.240 width flex flex column flex column
07:26:14.040 reverse gap Y of two LG flex
07:26:18.840 row. My apologies. This is not flex
07:26:21.600 call. Remove this. So just flex column
07:26:24.160 reverse. But on large devices it's going
07:26:26.558 to be flex row gap x2 items center and
07:26:31.680 justify end. Inside of here add a
07:26:36.360 button cancel. And below it
07:26:41.080 confirm. For the cancel button, give it
07:26:43.760 an on click of handle
07:26:45.958 cancel variant of outline class name of
07:26:50.958 full width on LG with
07:26:54.200 auto in here. Let's copy these
07:26:56.878 attributes and paste them here. Change
07:26:58.638 the on click to be handle confirm.
07:27:00.958 Remove the variant and just leave the
07:27:03.200 class
07:27:04.200 name. And finally, return the confirm
07:27:07.520 dialogue and the confirm method in an
07:27:10.600 array. And you should have no errors
07:27:13.280 here because we correctly matched all
07:27:15.840 the types here. So let's finally see how
07:27:19.360 this will be used. Agent ID view. Let's
07:27:23.200 go back
07:27:24.120 here and let's go ahead now and do the
07:27:28.558 following. So after remove agent, let's
07:27:31.360 do const use
07:27:34.760 confirm from hooks use
07:27:39.000 confirm. And let's go ahead and give the
07:27:41.760 first prop. Are you sure? And let's go
07:27:45.520 ahead and
07:27:46.680 do description. The following action
07:27:50.478 will remove. And let's do data dot
07:27:54.320 meeting count
07:27:57.240 associated meetings. So when you remove
07:27:59.440 an agent, we're also going to remove all
07:28:01.280 meetings associated with that agent. So
07:28:03.600 we want to let the user know that. In
07:28:06.160 here, grab the remove confirmation and
07:28:09.840 confirm remove
07:28:11.638 method and then create const handle
07:28:15.120 remove agent
07:28:17.478 method. Grab it. Make it an asynchronous
07:28:20.478 method and then you will get the okay
07:28:23.200 from await confirm remove. And this
07:28:26.478 confirm remove will open the remove
07:28:29.798 confirmation and only if the user
07:28:32.398 pressed okay are we going to continue
07:28:35.440 forward. So if not okay break the method
07:28:38.478 otherwise call await remove agent mutate
07:28:42.680 async and pass in ID agent
07:28:46.600 id and then go ahead and put this
07:28:51.240 here and wrap the entire thing inside of
07:28:55.440 square
07:28:57.200 uh the entire thing inside of a fragment
07:28:59.440 and render the remove confirmation
07:29:02.360 here and you should have no errors now.
07:29:06.160 And now let's go ahead and click on an
07:29:08.398 agent and let's try and remove it only
07:29:10.798 if you click confirm. And you will see
07:29:12.558 it says five associated meetings because
07:29:14.478 that's what we currently mock. So if I
07:29:16.958 click cancel, nothing happens. But if I
07:29:20.160 click
07:29:21.398 confirm, it deletes the agent. Exactly
07:29:24.878 what we
07:29:26.120 wanted. Now let's implement the update
07:29:29.120 agent dialogue. So, let's go inside of
07:29:32.000 our agent UI components and let's copy
07:29:35.520 the new agent dialogue and let's paste
07:29:38.000 it here and let's rename it update-
07:29:41.520 agent- dialogue. Before you edit it,
07:29:44.798 just double check that you are inside of
07:29:46.638 it, that you're not accidentally inside
07:29:48.558 of new agent dialogue. Close that and go
07:29:50.718 inside of update agent dialogue. The
07:29:53.360 good news is we made our agent form
07:29:56.478 editable. So it will also edit as much
07:30:00.320 as it will create for the first time.
07:30:02.558 The problem is we don't have the update
07:30:06.080 uh agent mutate added here. So that's
07:30:08.160 the only thing we're going to have to
07:30:10.600 modify. So now go back to the update
07:30:13.520 agent dialogue and let's rename this
07:30:16.320 from new agent dialogue to update agent
07:30:20.160 dialogue. Change the title to edit
07:30:23.280 agent. And this will be
07:30:26.360 edit the agent details like this. And
07:30:31.280 the only difference here is that we're
07:30:33.120 going to have initial values here. And
07:30:35.920 that will be a type of agent get one
07:30:38.638 from the types. And it will be required,
07:30:40.878 right? You cannot edit these if you
07:30:43.920 can't load the initial values here. So
07:30:46.878 go ahead and pass the initial values
07:30:48.638 which are optional for the agent form
07:30:50.638 because it can be used both with or
07:30:52.558 without
07:30:55.160 them. So let's pass them
07:30:59.000 here. Now let's go inside of the agent
07:31:03.080 form and let's copy the create agent
07:31:06.280 here and let's paste it here. Let's
07:31:10.160 rename it update agent and let's use the
07:31:13.920 RPC agents.update.
07:31:15.798 update and let's see what we have to do
07:31:18.240 on success here. So we have to
07:31:20.478 invalidate the queries get many that's
07:31:22.878 true and then we have to
07:31:25.878 invalidate the get one because we just
07:31:28.958 updated that individual one and in here
07:31:32.638 this is also true. So if the error code
07:31:35.920 is forbidden we redirect to upgrade. I'm
07:31:38.398 going to leave this purposely on to-do
07:31:40.798 because if we implement it now, sure,
07:31:43.280 it's going to work, but I want us to
07:31:45.280 wait until we actually implement
07:31:46.878 upgrades. So, it all makes more sense
07:31:48.718 when it happens, right? Uh, great. So,
07:31:51.440 that's our update agent. And now that I
07:31:54.240 look at it, our create agent actually
07:31:56.958 does not need to invalidate get one
07:32:00.558 because at this point, it will never
07:32:03.200 exist in the cache. So, our create agent
07:32:05.440 doesn't need to do that. But let's add a
07:32:07.680 to-do invalidate free tier usage in the
07:32:11.520 future when we have it. We don't have it
07:32:13.760 yet, but we're going to have to do this
07:32:15.600 for the free tier TRPC route. We now
07:32:18.718 have the update agent, which means that
07:32:21.760 we can now go inside of is pending and
07:32:26.160 add it here. So update agent is
07:32:30.600 pending and in here instead of a console
07:32:33.280 log we can now do update agent.mmutate
07:32:36.440 here spread the values and also add ID
07:32:39.840 from the initial
07:32:41.718 values do ID there we go and I think
07:32:45.760 that's all we need right because I think
07:32:48.080 this will already show update so now we
07:32:50.878 have to go back to the agent ID view
07:32:53.558 here and we have to add a state. So
07:32:57.040 let's
07:32:58.040 import use state from
07:33:01.878 React. Great. And let's just add this
07:33:05.200 field here. Update agent dialogue open
07:33:08.080 and set update agent dialogue open from
07:33:10.638 new state with a default of
07:33:13.160 false. And what we're going to do now is
07:33:16.160 simply below the remove confirmation,
07:33:18.160 let's add the update agent dialogue. So
07:33:21.600 make sure to import
07:33:24.760 it. And now let's go ahead and just pass
07:33:27.600 some props to it here. So that's going
07:33:29.520 to be open update agent dialogue open on
07:33:34.878 open change set update agent dialogue
07:33:37.718 open. And the initial values will be the
07:33:40.718 data. And there we go. Now on edit
07:33:44.478 modify this in the header to be set
07:33:47.040 update agent dialog open to be true.
07:33:50.878 and let's try it out. So, make sure you
07:33:53.440 have at least one agent. This one is
07:33:54.878 called a new agent. I will click edit
07:33:57.360 here. And there we go. You can see how
07:33:59.440 it autofilled all information and it
07:34:02.558 says edit and it says update. So, a
07:34:06.240 updated agent. 1 2 3. Let's try this.
07:34:09.920 Let's click update. And the moment of
07:34:12.798 truth. There we go. Seems to be working
07:34:16.160 just fine. And this is invalidated as
07:34:18.878 well. Amazing. We have officially
07:34:22.000 wrapped up our agents entity. The only
07:34:24.798 thing left is to properly count the
07:34:26.878 meetings. We're going to do that after
07:34:28.798 we add the meetings schema. Amazing. So,
07:34:32.160 let's go ahead and see what we have to
07:34:33.878 do. We added edit UI and delete UI. And
07:34:37.520 now, let's merge this pull
07:34:39.798 request. So, I'm going to go inside of
07:34:41.920 my graph as usual. I'm going to click on
07:34:44.558 my branch. I will create a new
07:34:47.798 branch 15 agent update and delete. So 15
07:34:52.000 agent update
07:34:54.040 delete. Once I'm on the new branch, I
07:34:57.120 will click plus to stage all the
07:34:59.000 changes. And I will write a commit
07:35:03.000 message. And let's click commit and
07:35:06.000 publish branch. There we go. And then
07:35:09.680 let's go to
07:35:10.920 GitHub. Let's open a pull request
07:35:14.440 here. and let's see what our reviewer
07:35:18.000 has to
07:35:19.798 say. So, let's see what we've done in
07:35:22.798 this pull request. We added the ability
07:35:25.200 to edit and remove agents, including the
07:35:27.760 edit agent dialogue and confirmation
07:35:30.240 prompts before removal. We introduced a
07:35:33.280 reusable confirmation dialogue for
07:35:35.120 asynchronous user confirmations. This
07:35:37.360 was exactly the goal with the use
07:35:39.200 confirm hook. We had some improvements
07:35:42.160 like enhancing the agent form to handle
07:35:44.558 both creation and updating of the agents
07:35:47.520 with improved success and error
07:35:50.120 handling. Perfect. In here we have a
07:35:52.638 more in-depth walk through. And in here
07:35:55.440 we have a sequence diagram explaining
07:35:58.080 our uh editing dialogues and our
07:36:02.040 confirmation removal dialogue right here
07:36:05.120 in case you are interested.
07:36:07.760 And in here uh we also have a related PR
07:36:12.160 agent page from our chapter 14. And we
07:36:16.398 do have some comments here. So this one
07:36:19.200 recommends checking if the promise
07:36:20.958 exists and resolving it. But we don't
07:36:22.958 have to do that because uh we do that uh
07:36:26.638 using a different method. We do it using
07:36:28.638 on cancel. So close by itself should not
07:36:32.878 uh resolve the promise. That's why it's
07:36:35.440 okay to do it this way. Okay. So, I'm
07:36:37.200 just going to resolve this. And in here,
07:36:39.760 it simply tells us to track and resolve
07:36:43.600 those to-dos in a future pull request.
07:36:47.120 And we definitely will. Perfect. So,
07:36:50.958 that's it for the comments. And let's
07:36:52.638 merge this pull request. And after
07:36:56.080 you've merged the pull request, you can
07:36:58.478 go back to your main branch, whatever is
07:37:00.958 your default branch, and synchronize the
07:37:03.440 changes. And as always, go inside of
07:37:07.200 your source control graph and confirm
07:37:10.080 that you just merged that. And here we
07:37:12.558 have our use confirm hook. Perfect. That
07:37:15.760 wraps up this chapter. Amazing job and
07:37:18.478 see you in the next
07:37:20.760 one. In this chapter, we are going to
07:37:23.600 implement the meetings into our project.
07:37:27.200 This chapter will include setting up the
07:37:29.760 schema module procedures and the
07:37:33.120 meetings pages. So let's start with our
07:37:36.440 schema. As always, ensure that you're on
07:37:39.280 your main default branch and go ahead
07:37:41.840 and synchronize changes just to make
07:37:44.160 sure everything is up to date. After
07:37:46.558 that, go inside of database schema. And
07:37:49.600 in here, to make things easier, let's
07:37:51.680 copy our agents schema. Let's paste it.
07:37:55.040 Let's rename this to meetings. Let's
07:37:58.240 rename the actual table name to
07:38:00.080 meetings. Here the ID field stays
07:38:03.120 exactly the same. The name as well, user
07:38:06.000 ID reference exactly the same. And then
07:38:08.958 we can copy the user ID reference and
07:38:11.280 simply add the agent ID reference. And
07:38:13.920 make sure to name this table agent ID.
07:38:18.080 And the reference will be to the agents
07:38:20.718 do ID
07:38:22.600 table. Besides the agent reference which
07:38:25.840 also has the ondelete cascade meaning if
07:38:28.398 an agent is deleted this meeting will be
07:38:30.638 deleted too. Let's also add a status.
07:38:34.478 Now the status will be a special enum
07:38:37.040 which we have to create. So let's go
07:38:38.878 above here and create a con meeting
07:38:41.520 status to be a type of pgnum from
07:38:44.320 drizzle or pg
07:38:47.638 core. Inside of here, let's go ahead and
07:38:50.718 add
07:38:51.958 meeting status and open an
07:38:55.320 array. In here, we're going to set
07:38:58.680 upcoming, active,
07:39:01.878 completed,
07:39:03.798 processing, and
07:39:06.120 cancelled. Now, we can use the meeting
07:39:08.320 status as our type for the status here.
07:39:12.240 meeting status, column name status,
07:39:16.200 required and default
07:39:18.840 upcoming like this. We are not going to
07:39:21.920 have instructions but what we will have
07:39:26.000 oops what we will have is the started
07:39:31.958 at and ended at timestamps. So make sure
07:39:36.718 to fix this. This will be started
07:39:40.280 at this will be ended at and they will
07:39:45.360 not be required and we are not going to
07:39:47.840 default them. So just timestamps like
07:39:52.600 this besides that let's also add
07:39:55.520 transcript URL which is a type of text
07:39:58.760 transcript URL. Copy and paste this and
07:40:01.920 make a recording
07:40:04.680 URL and add recording URL here as well.
07:40:08.958 And last one will be the summary which
07:40:10.958 is a type of text
07:40:13.080 summary. So none of these fields here
07:40:15.680 are required because all of these will
07:40:17.840 exist only after we switch to completed
07:40:22.080 mode. Right? Only after the meeting has
07:40:24.240 been had will we be able to append the
07:40:27.520 proper status. started at, ended at,
07:40:30.000 transcript URL, recording URL, and the
07:40:33.160 summary. Great. So, make sure you have
07:40:35.200 the agent reference. Make sure you
07:40:36.958 didn't forget to change the name of any
07:40:38.878 column here. Make sure none of them are
07:40:41.478 repeating. And now, let's go ahead and
07:40:44.638 push this to the
07:40:46.840 database. So, I'm going to go ahead and
07:40:49.280 do mpm run database push like this. And
07:40:53.680 this will add the new schema to our
07:41:00.440 database. And I seem to be having an
07:41:03.120 error here. Meeting
07:41:05.478 status does not
07:41:07.798 exist. So let's see what I did
07:41:11.360 incorrectly here. So pgnium meeting
07:41:14.638 status. Uh first of all, let's also add
07:41:16.398 export cons here. I think we need to do
07:41:19.280 this as well simply because we are using
07:41:21.760 the entire schema in some places. Uh but
07:41:25.360 let's just save this file. Let's shut
07:41:27.360 down our app and let's try
07:41:33.958 again. There we go. So, I'm not sure
07:41:36.798 which one of these changes did it. Maybe
07:41:39.840 it was the export. Maybe it was just
07:41:41.680 saving the file again and shutting down
07:41:43.600 the app. But yeah, just try one of those
07:41:46.000 and try npm run database push again and
07:41:48.878 uh no reason at all for this to fail.
07:41:52.240 Great. So now we have added our meetings
07:41:55.360 schema. Now let's go ahead and let's add
07:41:57.520 the meetings pages and the meetings
07:41:59.958 module. So I'm going to go inside of
07:42:02.000 source app folder dashboard and I'm
07:42:05.440 going to add meetings here and inside a
07:42:09.120 page.
07:42:11.080 DSX page div meetings
07:42:15.478 page just like this. And inside of here,
07:42:19.520 let's add individual meeting ID page DSX
07:42:24.718 another page here and a div meeting ID
07:42:28.320 page. There we go. So now that we have
07:42:31.600 added this, we can go ahead and do npm
07:42:33.920 rundev on our app again. And we can go
07:42:36.958 to localhost 3000 here. Wait for it to
07:42:41.080 load and we can now click on the
07:42:43.360 meetings and we will see the meetings
07:42:45.360 page. And if I manually change my URL to
07:42:49.320 forward/meings123, I will see the
07:42:51.040 meeting ID page. So let's go back to the
07:42:53.680 meetings page. And now let's implement
07:42:56.160 our module so that we can actually see
07:42:58.478 the JSON of our data. So let's go inside
07:43:01.760 of modules here. Let's create meetings.
07:43:05.120 And inside of here, let's create the
07:43:07.440 server module. and inside
07:43:10.280 procedures. DS, let's keep our agents
07:43:13.920 server procedures open so we can copy
07:43:16.000 and paste and speed things up. So let's
07:43:18.320 start by copying everything and pasting
07:43:20.398 in in the new meetings procedures here.
07:43:23.120 And let's rename this to be meetings
07:43:26.280 router. And for now let's remove update
07:43:29.280 and let's remove basically all except
07:43:32.160 get one and except get many. So that's
07:43:35.760 the only thing we are interested in. We
07:43:38.160 are later going to adapt the create,
07:43:40.958 update, remove and uh similar ones.
07:43:44.798 There we go. So meetings router. Now
07:43:46.718 let's go ahead and improve the get one
07:43:48.878 procedure here. So get one is a
07:43:51.280 protected procedure. It's looking for
07:43:52.958 ID. Instead of existing agent, it will
07:43:55.280 be existing meeting
07:43:57.878 here and it's not going to have a
07:44:00.160 meeting count. So you can remove that
07:44:02.000 and you can leave this as it is and it
07:44:04.240 will be from meetings.
07:44:06.958 So you have to change meetings in all
07:44:08.558 instances here. The easiest way to do
07:44:10.160 that is to simply remove the agents
07:44:12.000 imports. You will have errors and you
07:44:14.160 will know all the places you have to fix
07:44:16.680 things. There we go. So everything's
07:44:19.040 exactly the same. Existing
07:44:21.398 meeting, existing meeting and meeting
07:44:24.718 not found for the get many similar.
07:44:28.398 Let's go ahead and remove this. Leave
07:44:31.200 this to be meetings from meetings.
07:44:34.958 meetings user ID meetings name equals
07:44:37.520 the search order by meetings created at
07:44:40.478 meetings ID and the total is counting
07:44:43.360 the meetings with the same query here so
07:44:46.718 luckily the fields are exactly the same
07:44:48.478 so we don't have any issues here
07:44:49.958 whatsoever and we can remove the SQL
07:44:52.320 import here we go so we have a dead
07:44:55.600 simple um get many and get one
07:44:59.120 procedures here now what we have to do
07:45:01.680 is we have to go inside of the RPC
07:45:04.240 router
07:45:05.360 And we have to add meetings router from
07:45:09.280 modules meetings server procedures and
07:45:11.280 call this meetings like
07:45:14.200 this. Now let's go to our page tsx
07:45:18.638 inside of our meetings here. And in here
07:45:22.160 let's return meetings view.
07:45:26.558 Let's build the meetings view quickly by
07:45:29.120 going inside of our modules meetings and
07:45:32.558 let's create the UI folder. Let's create
07:45:35.520 the views folder and let's create
07:45:38.360 meetings-view tsx market as use client
07:45:42.398 export const meetings view like
07:45:45.958 this. And inside of here go ahead and do
07:45:50.638 the following. Prepare TRPC from use
07:45:54.080 DRPC from the client. Prepare data from
07:45:58.160 use
07:45:59.398 query from tan stack create query. Pass
07:46:02.478 in the TRPC meetings get many query
07:46:06.878 options and simply pass an empty object
07:46:09.958 here. And in here do JSON stringify data
07:46:14.478 question mark dot
07:46:18.120 items like this. or you can actually
07:46:20.638 stringify the whole beta, right? It
07:46:22.878 doesn't
07:46:23.798 matter. Now let's go to the page and
07:46:26.080 let's import meetings view from modules
07:46:28.320 meetings UI views meetings view. So now
07:46:32.160 when you hit the meetings page, you will
07:46:34.718 see the empty state right
07:46:37.878 here. Now let's go ahead and just add
07:46:41.120 some data here. So you can either visit
07:46:43.360 the Neon console or you can visit the
07:46:45.680 Drizzle Studio here. So we can go inside
07:46:47.760 of our project here. go inside of the
07:46:49.920 tables and let's just add something.
07:46:52.240 Again, if for whatever reason you can't
07:46:54.320 do this, no worries because we're going
07:46:55.920 to create the uh the form for creating
07:46:58.240 meetings in the next chapter. So, go
07:46:59.840 inside of meetings, add record. Um yeah,
07:47:03.680 you would now need to uh let's discard
07:47:07.040 the changes. So, you need to have at
07:47:09.040 least one agent and just, you
07:47:11.798 know, paste the ID here. Grab a user,
07:47:16.160 for example, whoever you are logged in
07:47:18.080 with, right? And just paste that user ID
07:47:20.958 here. And then go inside of your
07:47:23.040 meetings and add a new record. For the
07:47:25.040 ID, you can just write demo. For the
07:47:27.760 name, this can be first meeting. And
07:47:30.160 then for the user ID, you will copy your
07:47:32.240 user ID and add it here. For the agent
07:47:35.520 ID, copy it and add it here as well. And
07:47:39.440 for the status, you can use the default.
07:47:41.200 And I don't think you have to fill
07:47:42.878 anything else here. So just click save
07:47:44.798 change. There we go. And now we have
07:47:47.280 proper relations with that user and with
07:47:50.558 that agent. Again, if you fail at doing
07:47:52.878 this, no problem at all. We will create
07:47:54.958 it in the next chapter, the actual form
07:47:57.040 for doing this. But there we go. You can
07:47:59.200 see that it works. We can now see our
07:48:01.280 data here. Perfect. So what I want to do
07:48:05.360 now is I also want to enable the
07:48:09.360 prefetching here just so we don't have
07:48:12.240 to do it later. So let's go ahead and do
07:48:15.280 the following inside of our meetings
07:48:18.040 page. Let's go ahead and let's grab the
07:48:20.478 query client using get query client like
07:48:25.120 this.
07:48:29.040 Let's execute it and let's do void
07:48:32.840 queryclient dot prefetch query and
07:48:36.478 inside pass in tRPC from tRPC
07:48:39.878 server meetings get many and pass in an
07:48:44.398 empty
07:48:45.240 object for the query options like this.
07:48:49.920 So now we are prefetching that. Now
07:48:52.320 let's go ahead and let's add our
07:48:53.840 hydration boundary from tanstack react
07:48:56.240 query in here. Let's add the state to be
07:48:59.878 dehydrate from tanstack react query and
07:49:02.718 pass in the query client like that.
07:49:05.440 There we go. Now our page is hydrated
07:49:09.600 and prefetched. So what's missing is the
07:49:12.320 suspense here from
07:49:14.760 react and besides
07:49:17.398 suspense the error boundary from react
07:49:22.080 error boundary.
07:49:26.558 Now let's go inside of the meetings view
07:49:28.638 here and let's borrow from our uh agents
07:49:35.080 module UI views agents view. Let's copy
07:49:40.160 agents view loading and agents view
07:49:42.878 error and let's paste it inside of our
07:49:44.638 new meetings view. So let's rename both
07:49:47.280 of these well all of these instances to
07:49:50.638 meetings. So, meetings view loading
07:49:52.798 loading meetings meetings view error
07:49:54.638 error loading meetings and import the
07:49:57.360 loading state and import the error state
07:50:00.798 like this. There we go. And now in here
07:50:03.760 we can use a
07:50:05.240 fallback meetings view
07:50:08.360 loading and in here we can use meetings
07:50:12.878 view
07:50:14.638 error. There we go. So, I'm just going
07:50:17.280 to align all of my imports here.
07:50:20.398 There we go. Move this here. So you need
07:50:23.280 the meetings view, meetings view error
07:50:25.200 and the meetings view loading. There we
07:50:27.280 go. Which means that now in the actual
07:50:29.600 meetings view instead of using use query
07:50:31.520 you can use use suspense
07:50:33.798 query and that will trigger the
07:50:36.280 suspense. There we go. So now when you
07:50:39.200 refresh here you will see loading
07:50:40.958 meetings. And if you go ahead and try
07:50:43.440 and throw an error somewhere in here,
07:50:46.398 for example, throw new TRPC
07:50:50.280 error code bad
07:50:52.840 request and
07:50:54.920 refresh. You might encounter this
07:50:57.680 maximum uh depth infinite loop thing,
07:51:00.718 but after it settles down or after you
07:51:03.760 do a couple of refreshes and try again,
07:51:06.000 it will eventually uh simply render the
07:51:10.320 error. Let's give it a second. There we
07:51:13.360 go. Perfect. So, I think that's exactly
07:51:16.240 what we wanted to do in this chapter.
07:51:18.080 Simply introduce our meetings and
07:51:19.840 prepare the basics. And we did it quite
07:51:21.920 faster than the agents simply because we
07:51:24.080 had a lot of things to copy from. So
07:51:26.478 now, let's go ahead and let's create a
07:51:28.478 branch from this and let's merge it. So,
07:51:31.680 I'm going to create a new branch here
07:51:34.080 and I'm going to call it 16 meetings
07:51:36.878 setup. Let me just confirm that is our
07:51:39.360 topic. It is
07:51:41.320 perfect. Let's go ahead and stage all
07:51:44.600 changes and let's write our commit
07:51:47.280 message. Meetings setup. Let's click
07:51:49.760 commit and let's publish the branch.
07:51:53.080 Perfect. Now let's go to our GitHub.
07:51:56.398 Let's open up a pull request and let's
07:51:59.440 see what code rabbit has to say about
07:52:01.600 our
07:52:03.718 code. And here we have our summary. We
07:52:07.040 introduced a meetings dashboard page
07:52:08.798 with loading error and data display
07:52:11.040 states. We added a dedicated page for
07:52:13.440 viewing individual meeting details.
07:52:15.760 Meetings data is now fetched and
07:52:17.440 displayed including support for
07:52:18.958 pagination and search simply because we
07:52:21.040 copied the get menu from the agents
07:52:23.398 procedures. Perfect. So in here we have
07:52:25.840 a more in-depth walk through. And in
07:52:28.000 here we have a sequence diagram which is
07:52:30.240 identical to the one for the agents. So
07:52:32.320 we didn't have to go through it because
07:52:33.760 we didn't really add anything new. Later
07:52:36.240 when we actually add some new filters,
07:52:37.920 it will be interesting to look at how it
07:52:40.160 handles that here.
07:52:42.520 Perfect. And in here it has some
07:52:44.958 comments. Obviously, we didn't do
07:52:46.638 anything for the meeting ID page. We
07:52:48.638 will have a chapter for that. But you
07:52:50.398 can see how it knows exactly how it's
07:52:53.120 supposed to look like. So it even knows
07:52:54.878 the new TRPC syntax. This is very
07:52:57.680 impressive because it actually reads
07:52:59.360 from our code because this new TRPC
07:53:01.920 syntax is not something that AI
07:53:03.760 completion models actually know.
07:53:07.080 Perfect. Um, in here it tells us to add
07:53:10.718 pagination parameters. We will add that
07:53:12.718 later when we add the data table and all
07:53:14.798 the
07:53:16.200 filters. And in here of course it tells
07:53:18.958 us to add the actual data table. We will
07:53:21.280 do that in the next chapter.
07:53:24.160 Uh and in here it tells us to add UID
07:53:26.878 validation for get one. This is
07:53:28.878 interesting but it's actually not
07:53:30.478 correct because we are using nano ID. If
07:53:32.878 you go inside of the schema here we are
07:53:36.080 using nano ID. So using UU ID for the
07:53:38.558 validation would be incorrect in this
07:53:41.160 case. Perfect. And in here it adds some
07:53:44.718 additional validation but I'm okay with
07:53:46.878 the way we are using it right now.
07:53:49.840 Perfect. So, let's go ahead and merge
07:53:51.920 this pull request right
07:53:54.360 here. And let's go ahead and go back to
07:53:57.520 our main branch here. And let's click
07:54:00.160 synchronize changes
07:54:02.120 here. And there we go. That adds the
07:54:04.878 meetings here. Go inside of your source
07:54:07.360 control graph and confirm that you just
07:54:09.920 merged chapter 16 meetings. Amazing.
07:54:13.840 Amazing job. Let's mark this as
07:54:15.600 completed and see you in the next
07:54:17.120 chapter.
07:54:19.520 In this chapter, we're going to develop
07:54:21.440 the meetings form. So, this will include
07:54:24.478 creating the meeting list header, which
07:54:27.040 will use the text my meetings and the
07:54:29.440 new meeting button and also the actual
07:54:32.320 form where we will be able to select an
07:54:34.638 existing agent. Let's start by creating
07:54:37.520 the meetings create procedure. As
07:54:40.160 always, ensure that you're on your
07:54:41.840 default branch and that you have no
07:54:43.440 unstaged changes. Now, let's go ahead
07:54:46.558 and copy agents. server create procedure
07:54:51.920 simply so we speed things up. So I'm
07:54:54.320 going to copy the entire procedure here
07:54:56.718 and then I'm going to go inside of my
07:54:59.320 meetings server procedures and then at
07:55:02.718 the top here right above the get one I'm
07:55:05.920 going to paste the create
07:55:07.638 procedure. So now let's go ahead and
07:55:11.200 let's actually create the meetings
07:55:13.680 insert schema. So we can also help
07:55:16.638 ourselves by copying the agent schemas
07:55:19.760 and pasting it inside of meetings. Let's
07:55:22.878 rename the agents insert schema to be
07:55:25.600 meetings insert schema here. And it will
07:55:28.718 be a name and agent ID. And this will be
07:55:32.280 agent is required. And for the
07:55:37.958 meeting update schema, we are going to
07:55:40.878 extend the meetings insert
07:55:43.958 schema with an ID like this. Now we can
07:55:48.398 go back inside of the meeting server
07:55:50.080 procedures and instead of agents insert
07:55:52.478 schema, we now have it meetings insert
07:55:55.200 schema from dot dot / schemas.
07:55:59.200 Instead of having a created agent, we
07:56:01.440 are going to have created meeting in
07:56:04.958 this procedure here. And instead of
07:56:07.200 inserting agents, we will be inserting
07:56:09.280 into meetings. The input can be spread
07:56:12.240 like this. And we assign the user ID
07:56:14.680 manually. And simply return the created
07:56:17.520 meeting here. And that's it. That's all
07:56:19.760 we need for our uh create procedure for
07:56:23.440 now because there will be just one more
07:56:26.878 thing we're going to have to do here.
07:56:29.760 to do create stream call upsert stream
07:56:35.120 users. So later when we add video call
07:56:38.240 SDK, we're going to have to do that here
07:56:40.558 in the create procedure. That's why we
07:56:42.478 are adding a to-do here. Perfect. So we
07:56:45.440 can mark this as completed. Now let's
07:56:47.680 build the list header component. And we
07:56:50.478 can also help ourselves here by copying
07:56:53.440 the agents UI
07:56:55.878 components agents list header. Let's go
07:56:59.760 ahead and paste that inside of meetings
07:57:01.600 UI create a new folder called components
07:57:05.280 and paste it inside. Instead of agents
07:57:07.520 list header, this will be meetings list
07:57:09.760 header like
07:57:11.240 this. And now let's go ahead and do the
07:57:14.320 following. Let's remove the new agent
07:57:16.478 dialogue from here.
07:57:18.798 Let's remove agents search filter and
07:57:21.200 let's remove use agent filters. So we
07:57:24.160 can remove this and we can remove this
07:57:26.080 and this. Basically we're just building
07:57:28.240 the UI now. So this on click for now can
07:57:30.798 just be an empty arrow function and then
07:57:32.478 we're going to easily add it later. So
07:57:35.200 you can also remove these things here as
07:57:37.398 well to do
07:57:40.840 filters. Remove this, this, and this.
07:57:46.160 Double check that you are doing all of
07:57:47.760 these changes in the meeting list header
07:57:49.600 and not accidentally in the actual agent
07:57:51.840 list header. And now rename this
07:57:54.680 to meetings list header and this will be
07:57:57.600 my
07:58:00.520 meetings and the button will be new
07:58:03.760 meeting here. Now, let's go ahead inside
07:58:06.878 of our app folder dashboard meetings
07:58:10.558 page and let's wrap this hydration
07:58:13.520 boundary inside of a
07:58:16.760 fragment. And let's go ahead and render
07:58:19.840 the meetings list header component like
07:58:22.958 this from the
07:58:24.840 modules. And while we are here, let's
07:58:29.040 just mark this as an asynchronous
07:58:30.958 function. And let's also copy our
07:58:34.718 protection here. So let's grab the
07:58:37.120 session and let's do a redirect here. So
07:58:40.160 simply add that here in the meeting
07:58:42.000 page. So meetings page, import out from
07:58:46.798 lib out and headers from next headers
07:58:49.840 and redirect from next navigation. So
07:58:52.638 you should have all of these
07:58:55.638 added. There we go. So now our route is
07:58:59.760 protected. And when I refresh the
07:59:02.558 meetings, it should now render the
07:59:05.120 meeting list header above my JSON data
07:59:08.200 here. So we have this bug here because
07:59:12.718 it's extending our view. So what we can
07:59:15.120 do for now is go inside of the meetings
07:59:18.558 view component here and just write to-do
07:59:22.160 data table
07:59:25.160 here. And you can leave this error to
07:59:28.160 stay like that. There we go. So now you
07:59:30.558 have a much normal uh look
07:59:34.120 here. Now I want us to create the new
07:59:37.200 meeting
07:59:39.080 dialogue. Let's go ahead and copy from
07:59:42.398 the agents here in the UI components. We
07:59:46.398 have the new agent dialogue. Let's copy
07:59:49.600 that and let's put it inside of meetings
07:59:52.080 UI components. Let's go ahead and rename
07:59:54.958 this from new agent dialogue to new
07:59:57.280 meeting dialogue. Let's go ahead and
07:59:59.840 rename the instances of agent to
08:00:03.040 meeting. So new meeting dialogue. You
08:00:05.600 can remove the form import from now. And
08:00:08.000 in here you can add to-do meeting form.
08:00:12.160 Change the title to be new meeting. And
08:00:14.240 this will be create a new meeting. There
08:00:16.958 we go. Now let's go back inside of our
08:00:20.558 meetings list header here. And let's
08:00:24.240 actually render the new meeting dialogue
08:00:26.638 component fromward/ new meeting dialogue
08:00:29.600 because they are in the same components
08:00:31.200 folder in the meetings module. And now
08:00:34.160 we have to add back our use state here
08:00:38.240 is dialogue open. Set is dialogue open
08:00:40.638 from use state from react with a default
08:00:43.360 value of false. And then in here give it
08:00:46.958 an open of is dialogue open and an open
08:00:49.920 change of set is dialogue open. And in
08:00:53.280 here simply set is dialogue open to
08:00:57.080 true. So now when you click on a new
08:00:59.440 meeting you will see new meeting pop up.
08:01:01.840 And on a mobile this will be a drawer.
08:01:04.718 There we go. Now we have to implement
08:01:07.120 the meeting
08:01:08.520 form. In order to do that I also want to
08:01:11.840 add the update procedure already simply
08:01:14.718 because it's simple to do and we will
08:01:17.040 able to be complete the form both for
08:01:19.040 update and for create status. So let's
08:01:22.320 go ahead inside of modules agents server
08:01:25.718 procedures find the update procedure and
08:01:28.878 let's go ahead and copy it because it's
08:01:30.638 going to be quite similar. So now let's
08:01:33.120 go inside of our meetings server
08:01:35.680 procedures and above our create let's
08:01:38.160 now add our
08:01:39.718 copied update protected procedure. So we
08:01:43.440 can now import the meetings update
08:01:45.718 schema which we uh created a moment ago
08:01:48.958 by extending the meetings insert schema
08:01:51.080 here. Instead of updated agent agent it
08:01:54.398 will be updated meeting and we are
08:01:57.878 updating the meetings which means that
08:02:01.040 in the wear clause we are looking for a
08:02:02.958 matching meeting ID and a matching
08:02:05.440 meetings user ID. If we cannot find if
08:02:09.440 we uh we're unable to find the updated
08:02:12.080 meeting, that means that meeting does
08:02:14.080 not exist for this specific query. Maybe
08:02:17.520 the user doesn't have access to it.
08:02:19.280 We're just going to throw all of that
08:02:20.878 under not found. And let's return back
08:02:23.680 updated meeting. As simple as that. Make
08:02:26.080 sure you're using update and set here.
08:02:28.160 Perfect. So now we have the update
08:02:30.398 procedure as well which means that we
08:02:32.798 can now go inside of the agents module
08:02:35.200 UI components and we can now copy uh the
08:02:39.040 new the agent form. So let's copy the
08:02:41.920 agent form go inside of meetings UI
08:02:45.120 components paste it here and let's
08:02:47.680 rename this to meeting form and now
08:02:51.440 let's go step by step and let's simply
08:02:54.160 uh fix these things. So in here the
08:02:57.520 agent form will be meeting form. So
08:03:01.360 rename this to meeting form and use the
08:03:04.638 props here. Now let's fix the schema and
08:03:08.958 the
08:03:09.718 type. So let's go ahead and copy from
08:03:13.120 agents their types here. Let's paste
08:03:16.558 them inside of the meetings module. Make
08:03:19.280 sure you're inside of the modules
08:03:21.280 meetings types here. And in here change
08:03:24.878 this to be meeting get one. And in here
08:03:28.638 use meetings get one. So make sure that
08:03:32.000 you have implemented inside of our
08:03:34.000 meetings router get one protected
08:03:36.080 procedure which is something we did in
08:03:38.080 the meetings setup chapter alongside get
08:03:40.798 many. If you haven't it's a very short
08:03:43.360 procedure and you can implement it
08:03:46.120 now. Great. And now when you hover over
08:03:49.280 meeting get one, you will see the exact
08:03:52.160 meeting fields inside. Perfect. So let's
08:03:55.440 replace this with meeting get one from
08:03:58.718 dot dot/
08:04:00.200 do/types. And I seem to be having some
08:04:02.718 error here. Or maybe I just need to try
08:04:06.120 again. There we go. Now it's working.
08:04:09.360 And in here we are using the meetings
08:04:12.958 insert schema.
08:04:15.440 Now let's go ahead and actually append
08:04:17.760 that schema in our form here. So type of
08:04:21.040 off meetings insert schema. So the
08:04:23.280 resolver is using the meetings insert
08:04:25.718 schema. And we now also have to properly
08:04:29.040 add the form here. So the name will be
08:04:31.440 initial values name and the agent ID
08:04:33.920 will be initial values agent ID and also
08:04:37.920 use the meetings insert schema right
08:04:40.000 here.
08:04:41.520 Obviously, this will now cause errors
08:04:43.920 because we have not changed the
08:04:45.840 mutations here. So, let's start with
08:04:48.320 create agent. It's actually going to be
08:04:50.718 create meeting. Instead of TRPC agents
08:04:54.080 create, it's going to be TRPC
08:04:57.320 meetings.create like this. And for
08:05:00.478 invalidation, we are going to invalidate
08:05:03.120 meetings get many like this. And also to
08:05:06.718 do invalidate free usage. and on error
08:05:10.478 here toast the message and redirect to
08:05:13.760 upgrade. So exactly the same. Now let's
08:05:16.080 change this to update meeting use
08:05:19.440 meetings update and reinvalidate
08:05:22.478 meetings get many and reinvalidate
08:05:25.920 meetings get one when we update it like
08:05:29.398 this and all other to-dos stay exactly
08:05:32.878 the same. Perfect. So now what we have
08:05:35.840 to do is we have to modify the instances
08:05:37.840 of create agent to be create meeting and
08:05:41.680 update agent to be update meeting. And
08:05:44.638 that also includes right here update
08:05:47.600 agent and create uh update meeting and
08:05:51.200 create meeting. And there we go. No more
08:05:52.878 type errors because everything is
08:05:54.398 perfectly type safe. Now let's go down
08:05:57.440 here. And now we have to fix this form
08:06:00.080 field because inside of here it says to
08:06:02.718 use instructions but that's not true. We
08:06:04.878 will not be using instructions. So we
08:06:06.958 can remove this form field for now and
08:06:09.920 we can remove the text area import. So
08:06:12.398 now you have a completely uh valid form
08:06:16.160 which you can go ahead and add to the
08:06:19.040 dialogue. So, let's go back inside of
08:06:21.440 our new meeting dialogue here. And let's
08:06:25.040 go ahead and
08:06:26.760 import meeting form from forward slashme
08:06:31.280 form. And let's also add a router from
08:06:34.240 use router from next navigation
08:06:37.000 here like this. And inside of here,
08:06:40.398 let's add the meeting form.
08:06:44.240 And let's go ahead and add on success
08:06:46.440 here to accept an ID call on open change
08:06:50.958 to false and do a router
08:06:54.600 push to forward slash meetings and then
08:06:58.240 that meeting that we just created. So we
08:07:00.478 immediately open it up in case the user
08:07:02.478 immediately wants to start it and add on
08:07:05.200 open change here. Now we're going to
08:07:07.760 have to do a slight modification instead
08:07:10.320 of the meeting form here. So go inside
08:07:12.398 of meeting form and simply allow on
08:07:15.440 success to accept an optional ID of
08:07:18.600 string like
08:07:20.520 that. There we go. And then instead of
08:07:24.000 create meeting here on in the
08:07:26.920 onsuccess you can pass that. So for
08:07:29.360 example pass in the data and data do ID
08:07:33.440 and then the on success will now respond
08:07:36.478 with the ID and we can redirect to that
08:07:38.558 meeting ID. You could have also done
08:07:40.958 that here immediately. But since we have
08:07:43.120 a call back, let's use the call back. So
08:07:45.680 now when you refresh here, you will see
08:07:49.680 uh that you have a new meeting here with
08:07:52.320 the name here, but we also render the
08:07:54.320 avatar. So let's quickly fix that. Let's
08:07:56.240 go inside the new meeting
08:07:58.600 form. Let's find the generated avatar
08:08:01.200 and let's remove it entirely and let's
08:08:03.120 remove the import for it. So this is how
08:08:05.920 it's supposed to look like. Now let's go
08:08:08.398 ahead and let's give this a proper
08:08:11.478 placeholder. So this first input instead
08:08:13.920 of being a math tutor, let's for example
08:08:17.840 uh call this uh math
08:08:22.360 consultations like
08:08:25.558 this. Now we need to add one more field
08:08:28.398 to new meeting and that is the option to
08:08:30.478 select an agent. So the way I'm going to
08:08:33.360 do that is by implementing a new
08:08:35.440 component called command select. This
08:08:38.558 way it's going to be a type of select
08:08:40.320 which is responsive on mobile and a
08:08:42.798 model on desktop
08:08:45.000 devices. So let's go ahead and do the
08:08:47.120 following. Let's import react node and
08:08:49.360 use state from react. Let's import
08:08:52.558 chevrons updown
08:08:54.718 icon from lucid react.
08:08:57.920 Let's import CN from lib utilus and
08:09:00.000 button from components UI button. And
08:09:02.478 let's import the following from
08:09:04.160 components UI command command empty
08:09:06.638 input item list and responsive dialogue.
08:09:10.320 Now let's go ahead and create an
08:09:11.920 interface props here. First of all,
08:09:14.798 let's create an array of options. So we
08:09:17.440 are going to accept options which are
08:09:19.200 going to be an array of objects which
08:09:20.798 accept an ID, value, and children using
08:09:23.840 the React node import from above.
08:09:26.240 Besides the options, we're going to have
08:09:28.080 two functions. On select, which accepts
08:09:31.200 the value, and on search, which which is
08:09:34.000 an optional function, which accepts the
08:09:36.080 value. We are then going to have an
08:09:38.398 actual value, and three optional props
08:09:43.080 here. Placeholder is searchable, which
08:09:46.558 is a boolean, and class name, which is a
08:09:49.160 string. Then let's export con command
08:09:52.000 select here.
08:09:54.638 And inside of the props here, let's
08:09:56.398 assign them. And let's go ahead and
08:09:59.360 destructure all of them
08:10:02.600 here. Options on select, on search,
08:10:05.600 value, placeholder, and class name. And
08:10:07.840 let's give the placeholder a default
08:10:09.440 value of select an
08:10:12.200 option. Now in here, let's create a
08:10:14.878 state open and set open. Use state with
08:10:18.240 a default value of false. Then let's get
08:10:21.840 the selected option here to be
08:10:25.240 options.find get the option and compare
08:10:28.000 if option value is identical to the
08:10:30.798 current value that the user selected.
08:10:32.878 That's how we will find the selected
08:10:34.680 option inside of here. Go ahead and open
08:10:38.878 a fragment. Return a button. Inside of a
08:10:43.280 button, add a div, which is going to
08:10:46.080 check for selected option question mark
08:10:49.558 children or simply render a placeholder
08:10:52.478 if selected option was not
08:10:54.680 found. This div right here, I mean below
08:10:58.558 it, add chevrons updown
08:11:01.638 icon. For the button itself, give it a
08:11:04.398 type of button so it can safely be used
08:11:06.958 inside of a form.
08:11:09.120 variant of outline class name of CN
08:11:13.520 default classes will be height 9 justify
08:11:17.478 between font normal and px of two then
08:11:21.600 we're going to have class name whatever
08:11:23.600 the user passes and actually above that
08:11:27.440 let's add if there is no selected option
08:11:30.080 so make sure you put the question mark
08:11:31.520 before it in that case it's going to be
08:11:33.600 text muted
08:11:35.320 foreground like this so we are
08:11:38.000 transforming make a button to behave
08:11:39.680 like a
08:11:40.920 select. And then what we're going to do
08:11:43.600 outside of the button, we're going to
08:11:45.120 render the command responsive dialogue
08:11:48.040 component. Inside of here, let's add
08:11:50.558 open to be open. Let's add on open
08:11:53.040 change to be set open. Inside of here,
08:11:56.398 let's add a command input with a
08:12:00.600 placeholder of
08:12:04.120 search and on value change on
08:12:08.840 search. Below that, add a command
08:12:12.840 list. Add a command empty which will
08:12:16.718 render a span no options found. and give
08:12:20.958 the span a class name of text muted
08:12:23.440 foreground and text small below the
08:12:27.200 command empty. Let's iterate over all of
08:12:29.920 our options
08:12:31.718 here. Render the command item
08:12:36.680 here and inside render option dot
08:12:40.878 children. Give the command a key of
08:12:45.120 option do
08:12:47.478 ID and on
08:12:51.240 select call on select with option do
08:12:55.360 value and set open to
08:12:59.080 false. That's it. We will have to do one
08:13:02.638 more thing but first I want to
08:13:04.160 demonstrate how this currently looks
08:13:05.760 like so we have an easier time
08:13:09.000 understanding. So I want to go back to
08:13:11.840 the meeting form where we added the math
08:13:14.878 consultations input here. And let's go
08:13:17.520 ahead and do the following. Above all of
08:13:20.478 this, let's add our agents and let's
08:13:23.280 load them. So this time we are using use
08:13:26.240 query because we don't know where we are
08:13:28.718 going to use this model. So we cannot
08:13:30.718 guarantee with use suspense. So we're
08:13:33.600 just going to use the good old use query
08:13:35.360 here. Inside call tRPC agents get many
08:13:40.398 query
08:13:41.638 options. Set the page size here to be
08:13:44.680 100 and set the search here to
08:13:48.680 be const agent search. Set
08:13:52.520 agent search and use
08:13:56.200 state empty string and import use state
08:14:00.878 from
08:14:01.958 react like this.
08:14:05.440 Then also add const open set open use
08:14:10.240 state
08:14:12.760 false and in here add the agent
08:14:18.680 search. We are basically increasing the
08:14:21.360 page size to 100 and we are allowing the
08:14:24.638 user to search through the agents. So
08:14:26.478 this will this will be a better user
08:14:28.718 experience than a drop-own select
08:14:30.958 because this way they can actually
08:14:32.240 filter through all of the agents they
08:14:33.920 might have and they can also be more
08:14:36.958 specific with the search query ensuring
08:14:39.040 that we load them in this large data
08:14:42.200 set. Perfect. So now that we have this,
08:14:45.440 let's go ahead and let's import the
08:14:48.398 command select component which we've
08:14:50.718 just
08:14:51.878 created. And let's also
08:14:55.080 import generated avatar
08:14:59.718 component. And now let's go ahead and
08:15:02.638 let's copy our form field for the name
08:15:06.398 and let's paste it below here. Let's
08:15:08.718 change it to be agent ID and change the
08:15:11.920 form label to be agent. And inside of
08:15:14.478 the form control, you're going to do the
08:15:17.040 following. You will render the command
08:15:19.840 select option.
08:15:22.080 You will pass in the options here. Open
08:15:25.240 parenthesis agents data question mark
08:15:28.718 items or fall back to an empty array dot
08:15:32.958 map. Get the individual agent here and
08:15:36.240 immediately return an object.
08:15:40.080 Add an id to be agent ID, value to be
08:15:43.120 agent ID, and then children to be a
08:15:46.080 react node which will be a
08:15:50.280 div with a generated avatar inside a
08:15:54.320 class name of flex item as center and
08:15:57.440 gap x of two. Give the generated avatar
08:16:02.080 a seed of agent name variant of bots
08:16:06.878 neutral class name of border and size
08:16:11.558 six and below that a span rendering the
08:16:15.440 agent
08:16:16.440 name like this. And then let's add some
08:16:20.798 more options to command select which
08:16:23.920 will be on select to be field on
08:16:27.080 change on search will be set agent
08:16:30.878 search. So basically it's going to be
08:16:32.878 controlling this state here which will
08:16:34.798 then re-trigger this call every time it
08:16:38.120 changes and value field do value and the
08:16:42.638 placeholder will be select an
08:16:45.638 agent. So the only thing we have left
08:16:48.240 unused is the open and set open. We're
08:16:51.680 going to use that in a moment. But now
08:16:54.398 when you click on this uh it should open
08:16:58.240 the command. But looks like we did
08:17:00.000 something incorrect. So let's go back
08:17:01.600 instead of the command select here. Uh
08:17:04.000 and let's see what we did
08:17:07.080 incorrectly in the button. Let's add on
08:17:10.240 click here. Set open set to true. So
08:17:13.920 this is referring to the internal set
08:17:15.840 open of the command select not to this
08:17:18.798 is open. So now when you click here you
08:17:21.840 will see a list of your agents and you
08:17:23.840 will be able to select them. So if you
08:17:25.680 go inside of your agents here for
08:17:27.200 example and create a new
08:17:29.798 agent click
08:17:31.718 create. Go back to your meetings. Click
08:17:34.558 new meeting. You will find it here. And
08:17:36.798 if you search for new you will be able
08:17:39.680 Oh yeah. So right now it's not working
08:17:43.080 because we didn't uh properly implement
08:17:47.240 the filtering inside of the command. But
08:17:51.440 it's quite easy to do that. What we
08:17:53.680 actually have to do is we have to turn
08:17:56.000 off the way command component filters by
08:18:00.478 itself. So in order to do that we're
08:18:02.958 going to pass the prop should filter to
08:18:07.398 be the oppos to be the opposite of our
08:18:11.440 on search value. So if we have on search
08:18:14.478 in that case it's going to be false but
08:18:17.520 if we don't have it it's going to be
08:18:19.718 true but we are getting an error for it
08:18:22.478 which means we have to go inside of the
08:18:24.000 command responsive dialogue inside of
08:18:25.760 source components UI command find
08:18:28.240 function command responsive dialogue and
08:18:30.798 simply add a new prop here should filter
08:18:33.600 and set it by default to be
08:18:36.200 true. Go ahead and map it here. So
08:18:40.398 should filter is an optional boolean
08:18:43.760 like this and simply go ahead and in is
08:18:47.920 mobile add it to this command. So should
08:18:51.040 filter you can see the prop exists and
08:18:52.958 pass it here and make sure to also do it
08:18:55.360 in
08:18:58.360 here. There we go. So now our command
08:19:02.240 select will not use the internal
08:19:03.920 filtering. Instead it will use React
08:19:07.520 query search. So when I try this again
08:19:10.638 and write new, you can see how it loads
08:19:13.440 that new agent, right? So it's actually
08:19:16.160 doing an API call in the background here
08:19:18.478 or updated that. There we go. When I
08:19:21.360 click here, I can select the agent.
08:19:24.320 Amazing amazing job. So now when I click
08:19:27.760 test here and click create, we should be
08:19:30.240 able to create a new meeting. Uh and I
08:19:33.200 am redirected to that meeting ID page
08:19:35.600 immediately. So this is my URL right
08:19:38.160 now. There we go. Perfect. So if you
08:19:40.958 want to
08:19:42.638 uh you can enable inside of your
08:19:46.160 meetings
08:19:47.878 view
08:19:50.120 the data JSON JSON stringify
08:19:54.520 data. Let's just give it a class name
08:19:56.878 overflow X scroll. So it doesn't move
08:20:00.798 our content too much. Well, it still
08:20:02.958 moves it, but you can see uh our items
08:20:06.320 total says two. If I go ahead and create
08:20:09.520 a new
08:20:10.440 one right here, go back to the meetings.
08:20:13.760 Now, it says total three. So, we are
08:20:15.600 successfully creating new ones, right?
08:20:17.680 Just make sure to scroll here in case
08:20:19.840 your button is disappearing. And you can
08:20:21.920 now, you know, comment it out so you can
08:20:23.840 see it here. Normally, one more thing we
08:20:26.240 have to add here is a text. uh if the
08:20:29.520 user never created an agent so they have
08:20:32.080 a quick way to create it and we already
08:20:34.638 have the dialogue for
08:20:36.920 that. So inside of the new meeting form
08:20:41.200 let's change this to be a bit more
08:20:43.120 precise. So open agent dialogue.
08:20:46.840 Open new agent dialogue and set open new
08:20:51.840 agent dialogue. So we are specific about
08:20:54.558 what this is. And then we're going to go
08:20:57.200 ahead and find our agent ID form field.
08:21:00.240 And after form control, let's add form
08:21:04.080 description here. And make sure to
08:21:06.160 import this from components
08:21:09.080 UI4. Inside of here, we're going to ask
08:21:12.240 not found what
08:21:15.160 appos your My
08:21:18.120 apologies. Not found
08:21:21.638 what like this you are looking for. You
08:21:26.398 can add a space like this. Go to new
08:21:28.240 line and render a normal button here.
08:21:32.080 Create new
08:21:33.478 agent. Give this normal button a type of
08:21:36.398 button. This is very important. a class
08:21:38.878 name of text primary hover
08:21:42.680 underline and on click we'll very simply
08:21:46.558 call set open new agent dialogue to
08:21:51.120 true. Currently this doesn't control
08:21:54.638 anything. So what we have to do now is
08:21:57.360 we have to actually use it. So let's go
08:22:01.478 ahead inside of here.
08:22:04.638 Let's go wrap our entire
08:22:07.478 form in a
08:22:10.040 fragment like
08:22:11.878 this. Oops. In a
08:22:15.478 fragment. And then
08:22:17.798 here simply render the new agent
08:22:20.680 dialogue and pass it open to be open on
08:22:25.040 open change to be
08:22:27.638 set open new agent dialogue and this
08:22:30.080 will be open new agent dialogue. Make
08:22:32.798 sure you import new agent dialogue
08:22:34.558 component from modules agents UI
08:22:36.958 components new agent dialogue. So now in
08:22:39.600 here you have a quick button to create a
08:22:41.440 new agent here. And for example, right
08:22:44.320 now it doesn't exist here. So if I go
08:22:46.000 ahead and create new
08:22:47.638 one, click create, it automatically
08:22:50.478 invalidates the get many query. So it
08:22:52.638 immediately appears here and we can
08:22:55.520 create it. Amazing. Amazing job. So, I
08:22:58.878 think I've noticed one little bug here,
08:23:00.558 which we're going to do in the next
08:23:01.680 chapter, and that's if I search for
08:23:03.440 something and close it and open it up
08:23:05.120 again. Uh, you can see it stays in that
08:23:07.760 weird state. So, I'm going to look into
08:23:10.478 that and fix it in the next chapter, but
08:23:12.718 you just wrapped up the new meeting
08:23:15.120 form. So, we can now create new
08:23:17.280 meetings. What we're going to do in the
08:23:19.120 next chapter is actually display them
08:23:21.120 and filter them. Now let's go ahead and
08:23:26.280 let's create, review, and merge the pull
08:23:30.040 request. So this chapter is called 17
08:23:33.120 meetings form. So I'm going to create a
08:23:34.878 new branch
08:23:36.280 here. 17 meetings form. Once you're in
08:23:41.040 the new branch, go inside of your source
08:23:43.240 control. Mark all of these changes as
08:23:46.398 staged changes and add a commit message.
08:23:50.398 17
08:23:51.798 meetings form. Let's click commit and
08:23:55.440 let's publish the branch. Once the
08:23:57.920 branch has been
08:23:59.478 published, let's go ahead and open a
08:24:01.600 pull request here and let's see what
08:24:04.320 code rabbit has to say about our
08:24:08.360 code. And here we have the summary. So,
08:24:12.080 we introduced a couple of new features
08:24:14.000 including a customizable drop-down
08:24:16.080 select component with search
08:24:17.680 capabilities. So that's our new command
08:24:19.760 select component. We added a header
08:24:22.000 section with a new meeting button and a
08:24:23.920 dialogue for creating messages. My
08:24:26.080 apologies meetings. We implemented a
08:24:28.558 form for creating and editing meetings
08:24:30.638 with validation and agent selection
08:24:32.798 using the command select component and
08:24:35.280 of course a model dialogue for creating
08:24:37.600 a new meetings with navigate on success
08:24:40.680 here. So let's go ahead and go through
08:24:43.280 this sequence diagram. We're not going
08:24:44.958 to go through entire sequence diagram.
08:24:47.600 We're just going to go through this.
08:24:50.320 What happens when we click on a new
08:24:52.240 meeting? So the user clicks on a new
08:24:54.000 meeting in the meeting meetings list
08:24:55.920 header component. After that we open the
08:24:58.000 dialogue which renders the form meeting
08:25:00.320 form and once we submit that form we
08:25:03.360 create it through our server procedures
08:25:06.000 here and we validate the data. The
08:25:09.120 server procedures return the created
08:25:11.120 meeting and then we fire the on success
08:25:14.398 where we close the dialogue and we
08:25:16.798 redirect the user to the new page which
08:25:18.798 is the meeting ID page.
08:25:21.558 Perfect. And down here we have some
08:25:24.520 actionable comments here to complete
08:25:27.360 these to-dos which is completely valid
08:25:29.760 but since this is a tutorial I'm not
08:25:31.440 going to do them right away. I will do
08:25:32.878 it when it makes sense so you see why we
08:25:35.680 are doing it. So I will close this. Uh
08:25:38.798 in here it suggests adding the is
08:25:41.840 loading for our command select. That's
08:25:44.160 something we can consider later. And in
08:25:46.958 here it found a bug which we have to
08:25:49.040 fix. So right now our new meeting
08:25:51.240 dialogue does not cancel properly. So I
08:25:54.958 think you can actually try that. If you
08:25:56.398 click new meeting and click cancel,
08:25:58.798 nothing happens. So that is because
08:26:01.040 inside our new meeting dialogue here we
08:26:04.798 didn't call on open change properly. We
08:26:08.000 need to pass false to it like
08:26:12.200 this. So what I'm going to do now is I'm
08:26:15.200 going to do that in the second chapter
08:26:17.840 simply because in case you already
08:26:20.718 merged it right so I don't want to cause
08:26:22.638 you any problems. We're just going to do
08:26:24.240 it in the next chapter in the new
08:26:25.760 branch. But this is a bug found by code
08:26:28.878 rabbit. I have completely missed this.
08:26:31.520 Great job. So, let's go ahead and merge
08:26:34.000 this pull request as it is right
08:26:36.280 now. And once it's merged, let's go
08:26:39.280 ahead back inside of our main branch
08:26:41.680 here. And let's click synchronize
08:26:44.040 changes. Let's click
08:26:46.920 okay. And then everything should be
08:26:50.318 fixed. Let's click on the source and go
08:26:52.798 inside of the graph. And we just merged
08:26:54.798 17 meetings form. Amazing. Amazing job.
08:26:58.398 That marks the end of this chapter and
08:27:00.558 see you in the next
08:27:02.680 one. In this chapter, we are going to
08:27:05.200 implement the meetings data table. This
08:27:07.520 will include modifying the procedures to
08:27:09.680 include the duration column and inner
08:27:12.318 join on the relevant agent for that
08:27:14.638 meeting. We are also going to make the
08:27:16.798 existing data table component reusable
08:27:19.040 and we're going to add the empty state
08:27:20.798 component for the meetings view. Let's
08:27:23.840 start with modifying our procedures for
08:27:26.240 my meetings page. So let's go inside of
08:27:29.280 source modules meetings server
08:27:33.160 procedures. Before you start writing
08:27:35.360 anything, make sure that you're on your
08:27:37.200 default branch. Go ahead and find the
08:27:40.558 get many protected procedure. And we are
08:27:43.520 now going to modify the await database
08:27:46.000 here, specifically the select. After we
08:27:49.040 spread all the columns from the meetings
08:27:50.798 schema, let's also include an individual
08:27:53.120 agent relevant for this meeting, which
08:27:55.200 will use the agents schema. You have to
08:27:57.920 import that from database schema. Then
08:28:00.798 while you're in the imports also import
08:28:02.958 SQL from Drizzle
08:28:05.478 ORM. Now go ahead and add a duration
08:28:08.878 here. The duration will be calculated by
08:28:11.920 using the meetings schema started at and
08:28:15.920 ended at
08:28:17.318 timestamps. And we're going to use pure
08:28:19.680 SQL. So open SQL like this. You can give
08:28:23.760 it a type of number.
08:28:26.478 And in here write
08:28:29.398 extract epoch from open parenthesis. And
08:28:34.080 then make sure you don't misspell your
08:28:36.160 columns. So you can copy them from here.
08:28:39.120 Ended at
08:28:41.878 minus started at like this. And then
08:28:46.398 simply add
08:28:48.200 dot
08:28:49.958 as duration like this.
08:28:55.120 After that, let's go ahead and after we
08:28:57.760 select from meetings, let's add an inner
08:29:00.558 join here for the agents. And we are
08:29:03.760 specifically going to join all agents
08:29:06.878 that have the meeting ID. My apologies,
08:29:10.718 all agents that were used in our
08:29:12.638 meetings. So, meetings. ID. Agents do
08:29:16.080 ID, that's what we are matching. So for
08:29:18.240 each meeting that will be iterated here
08:29:19.760 in the select, we're going to find its
08:29:21.920 relevant meeting ID and we are going to
08:29:24.160 search for an existing agent ID and we
08:29:27.200 are only going to render the meetings
08:29:29.120 which were successfully matched with
08:29:32.080 their agent. That's why we're using an
08:29:33.920 inner join. If we were to use a left
08:29:36.240 join, then we would be okay with an
08:29:38.318 agent being null. But that's not the
08:29:40.718 case for us because the agent is always
08:29:42.798 required. So inner join is the correct
08:29:44.958 usage for this. Great. And now I think
08:29:48.798 we should also add this to our total
08:29:52.398 simply so it ex it is 100% accurate
08:29:56.478 about uh the amount of data that we are
08:29:59.920 working with here. Great. So now we have
08:30:03.200 successfully modified our procedures and
08:30:06.000 we can go ahead and render that inside
08:30:08.240 of a data table.
08:30:11.120 So let's go ahead and let's copy the
08:30:13.760 data table
08:30:15.080 component from modules agents UI
08:30:18.398 components and let's copy the data table
08:30:20.958 and let's actually add it to our global
08:30:23.840 components right here because it is
08:30:26.398 different enough uh it is generic enough
08:30:28.878 that it can be used multiple times. So
08:30:31.520 now that we have pasted it inside of
08:30:33.200 here, we can go inside of source modules
08:30:37.000 meetings
08:30:39.558 UI views meetings view and we can now
08:30:43.600 use it here data table from components
08:30:47.680 data
08:30:49.240 table. The only thing that's missing
08:30:51.520 here is the actual well columns, right?
08:30:56.160 So let's just pass in the items here.
08:30:58.000 And now we have to develop the columns.
08:31:01.440 So let's go ahead and let's copy the
08:31:03.680 existing columns from agents here. So in
08:31:06.080 UI components we have the columns here
08:31:09.120 and let's paste them inside of our
08:31:11.520 meetings UI components. So now we have
08:31:14.000 columns here as well. So what I want to
08:31:16.638 do now is I want to go inside of my
08:31:18.718 meetings types and I will copy meeting
08:31:21.200 get one and I will replace it with
08:31:22.878 getting meeting get many and let's use
08:31:25.520 meetings get many here as well.
08:31:28.478 So now inside of my columns I will be a
08:31:30.878 bit more specific. So make sure you are
08:31:33.120 inside of your newly copied columns in
08:31:34.878 the meetings and import meeting get many
08:31:38.398 and then in here specify number. So uh
08:31:43.360 actually let's go ahead and do type
08:31:45.958 meeting get many number like
08:31:49.558 this or maybe I'm doing something wrong
08:31:52.160 here. Oh yes. So get many here should be
08:31:55.000 items. My apologies. And yes, then you
08:31:58.718 can use the number here. And then uh
08:32:00.878 this number will just be a single one of
08:32:04.000 these values here. The reason I'm using
08:32:06.240 meeting get many and not meeting get one
08:32:08.798 is because these columns will be loaded
08:32:11.120 using the get many procedures. Right?
08:32:15.680 And instead of this get many procedures,
08:32:17.520 we just modified the select. The select
08:32:20.638 here is different than the one from get
08:32:23.040 one. The get one doesn't have it. So it
08:32:25.360 would be an incorrect column data. So
08:32:27.520 that's why I will I'm instead using
08:32:30.318 meeting get many and simply specifying a
08:32:34.000 single item from there by using the
08:32:36.000 number operator here. Great. So now that
08:32:38.798 we have this, let's go ahead and let's
08:32:40.398 add everything that we will need from
08:32:41.920 here. Let's start by adding npm install
08:32:44.958 date
08:32:46.520 FNS like
08:32:48.440 this. Once you have added date FNS, just
08:32:51.920 go ahead and include it here. Let's also
08:32:55.280 add mpm install humanize
08:32:59.160 duration with legacy period apps as
08:33:02.760 well. Let's import that here. There we
08:33:06.718 go. Then we're going to need a lot of
08:33:08.798 icons from Lucid React besides these
08:33:12.120 here. So let's go ahead and add the
08:33:16.080 following icons.
08:33:19.280 circle check icon, circle X icon, circle
08:33:22.080 arrow up
08:33:23.318 icon, C clock fading icon, and corner
08:33:26.638 down right icon and lastly loader icon
08:33:29.520 like
08:33:30.280 this. We are going to need the CN libut
08:33:34.958 from here and uh that's going to be it.
08:33:37.840 So now let's go ahead and before we
08:33:39.840 start the columns let's implement a
08:33:41.798 function format duration here seconds
08:33:46.080 number and return humanize duration here
08:33:49.760 multiply the seconds by a
08:33:52.360 th00and largest will be one round will
08:33:56.160 be true and units here will be
08:33:59.398 hours and seconds you're going to see
08:34:02.638 how we're going to use this function in
08:34:04.160 a
08:34:04.840 second. Great. Now let's go ahead and
08:34:07.360 let's define a const status icon map. So
08:34:11.680 depending on what status the meeting is
08:34:13.760 in, we're going to display a different
08:34:15.520 icon. If it's in upcoming, it will be
08:34:17.760 clock arrow app icon. Active this one.
08:34:20.240 Completed this one. Processing this one.
08:34:22.558 And canled this one. It is very
08:34:24.798 important that you don't misspel these
08:34:26.478 ones. And if you aren't sure, you can go
08:34:29.040 inside of your schema here and find the
08:34:31.360 meeting status. So you can copy them
08:34:33.280 from here. Make sure you don't misspell
08:34:35.280 them.
08:34:36.638 And now what you're going to do is
08:34:38.558 create another map called status color
08:34:41.040 map. So depending on
08:34:44.200 upcoming,
08:34:45.878 active,
08:34:47.558 completed, processing or
08:34:52.280 cancelled, you will have specific
08:34:54.318 colors.
08:34:56.478 An easy way to tell you've done it
08:34:58.638 correctly without typos is to click on
08:35:01.440 one of them and the other one will
08:35:02.878 highlight, meaning that it's exactly the
08:35:05.120 same. There we go. So, let's go ahead
08:35:07.920 and do the upcoming one first. So, it's
08:35:09.920 going to have a BG yellow with 20%
08:35:12.600 opacity. It's going to have a text of
08:35:15.520 yellow. Whoops. A text yellow 800. And
08:35:20.080 it's going to have border yellow 800
08:35:24.080 with 5% opacity. And the other ones will
08:35:27.478 be very similar, just different colors.
08:35:30.718 So the active will be background blue
08:35:33.120 with 520% opacity, text blue 800 and
08:35:36.718 border blue 800 /
08:35:39.798 5. For the completed one, same thing but
08:35:43.040 using the emerald.
08:35:45.600 For the cancelled
08:35:48.120 one, my apologies, for the processing,
08:35:50.718 it's going to be
08:35:51.878 rows and the exact same values as the
08:35:54.638 ones above. The only one that will be
08:35:57.040 slightly different is the processing
08:35:59.718 one. My apologies. So, I have um
08:36:03.200 reversed these two. So, instead of
08:36:06.000 processing here, this will be cancel
08:36:08.958 like this. Cancelled one will be using
08:36:11.360 the rose color. And then change the last
08:36:13.280 one to be processing.
08:36:15.360 like that. This one we'll use gray 300
08:36:19.040 with 20% opacity and the rest will be
08:36:21.520 the same. So you can pause and
08:36:23.718 copy. And now we are ready to build our
08:36:26.318 columns. Let's start with the accessor
08:36:28.878 key name which will now be meeting name.
08:36:32.398 The flex flex call gap y1 will be the
08:36:35.120 same. And then inside of here let's
08:36:37.600 immediately add a span here which will
08:36:40.600 render the row.name.
08:36:44.120 name with a class name font semibold and
08:36:48.360 capitalize like
08:36:51.000 this. Now go ahead and remove this div
08:36:54.080 here. So we can immediately work on this
08:36:56.478 one flex item center and gap x2
08:36:59.040 rendering the corner down right
08:37:01.798 icon. Instead of this flex item center
08:37:04.878 gap x2, add a new div with a class name
08:37:08.760 flex items center gap x1 like this. And
08:37:13.280 simply encapsulate the corner down right
08:37:15.520 icon and the span. And this will render
08:37:17.600 the agent name. And then outside of this
08:37:21.840 div, add a generated avatar component.
08:37:25.120 This will use a variant of bots
08:37:28.440 neutral seed row original
08:37:33.558 agent.name and a class name of size
08:37:38.080 four. And after that add a span element
08:37:41.360 here
08:37:43.318 row.st started at if we have it we're
08:37:46.318 going to format that exact field. So
08:37:49.840 started at using
08:37:51.638 mm and d format. otherwise an empty
08:37:56.160 string and give this a class name of
08:37:58.318 text small and text muted
08:38:02.360 foreground. Now let's go to the second
08:38:04.760 cell which will be the status and a
08:38:07.760 header will be status and inside of here
08:38:11.440 let's go ahead and do the following.
08:38:12.718 Let's remove the cell function like this
08:38:14.478 and let's open the curly brackets. And
08:38:16.558 first let's grab our icon which will be
08:38:19.280 status icon
08:38:21.000 map row original dot status as key of
08:38:25.840 type of status icon
08:38:28.600 map and then let's go ahead and let's
08:38:31.520 return a badge element here and inside
08:38:34.718 we are going to render that icon. Let's
08:38:37.440 go ahead and append some props here. So
08:38:40.798 variant will be outline. Last name here
08:38:43.840 will be CN
08:38:48.520 capitalize. Go ahead and target an SVG
08:38:51.318 here. Give it a size of four and text
08:38:55.200 muted foreground. And then let's go
08:38:58.798 ahead and check if status color map has
08:39:03.280 an
08:39:04.200 original status here which should be a
08:39:07.200 key
08:39:08.280 of type of status color map. So now our
08:39:13.600 icon will automatically be generated
08:39:15.360 depending on the meeting status as well
08:39:17.600 as our color here for that badge. And
08:39:20.878 for the icon here we can give it a class
08:39:23.440 name CN
08:39:25.760 row original status is processing. And
08:39:30.240 in that case simply do animate spin. So
08:39:32.558 it shows a spinning uh icon. And let's
08:39:36.160 render the row
08:39:37.718 original status here like that. And now
08:39:42.000 let's go ahead and do the last column
08:39:45.240 here with accessor key duration.
08:39:50.638 And let's do header of
08:39:54.760 duration. And I think I have to do
08:39:57.558 this here. My apologies. So I add a
08:40:00.558 comma here because this curly bracket is
08:40:03.600 the cell function. So make sure you're
08:40:06.318 doing it in the proper uh indent like I
08:40:10.000 have now. And let's open a cell. Let's
08:40:12.398 dstructure the row here. And let's
08:40:14.638 return another badge
08:40:16.520 here like this.
08:40:19.600 Now let's go ahead and give this badge
08:40:22.558 the following variant of outline and
08:40:27.600 let's copy the class
08:40:29.398 name. You can copy it uh from here like
08:40:34.680 this. So class name capitalize and SVG
08:40:39.840 size 4 flex items center and gap X of
08:40:43.600 two. And inside of here, add the clock
08:40:47.920 fading icon. Give it a class name of
08:40:51.680 size, my apologies, text blue
08:40:55.798 700. And check if we have row original
08:40:59.440 duration. And in that case, format
08:41:01.958 duration using the row original duration
08:41:05.520 as the prop. Otherwise, simply render no
08:41:07.680 duration, meaning this meeting has not
08:41:09.440 been started yet.
08:41:13.200 Now let's go and see what we have not
08:41:16.080 being used. So we didn't use humanized
08:41:18.080 duration. Uh not true. My apologies. Uh
08:41:20.878 we did not install the
08:41:24.200 types for humaniz
08:41:28.840 duration. There we go. So this is how
08:41:32.240 the full command looks
08:41:34.120 like. And let me just quickly show you
08:41:36.798 my package JSON. So, humanize duration
08:41:40.398 and date FNS. There we go. Perfect. So,
08:41:44.558 now we can go back inside of the
08:41:46.000 meetings view and we can pass the
08:41:48.478 columns here to be columns from that
08:41:52.240 forward/c columns. And now when you try
08:41:55.680 to load the meetings, it should have a
08:41:58.240 complete new
08:42:00.600 look. What we have to do now is add some
08:42:03.440 padding. And it seems like something's
08:42:05.600 wrong with the colors here. So let's
08:42:07.440 just quickly go inside of here and let's
08:42:09.840 see what's going on. So status color map
08:42:12.478 upcoming. We definitely have that. And
08:42:14.318 this is a status of upcoming status
08:42:16.958 color map
08:42:19.878 here. Let's just see. Is there something
08:42:22.558 we're doing incorrectly
08:42:25.718 here? I think everything's okay with our
08:42:28.398 code because the icon is rendered
08:42:30.798 correctly, right? This is the correct
08:42:32.398 icon we assigned. So this line of code
08:42:34.958 should work just fine. Um, so I'm going
08:42:38.040 to debug this in the next chapter. It
08:42:41.040 could be because of the just in time
08:42:42.718 compiler for Tailwind. Maybe I'm going
08:42:45.600 to explore a bit. But anyway, let's go
08:42:47.840 ahead and focus on wrapping this chapter
08:42:49.520 up by going back inside of the meetings
08:42:51.200 view here and give this div a proper
08:42:54.558 class name of flex one, padding bottom
08:42:56.958 of four, px of four, medium px of 8,
08:43:01.120 flex flex column, and gap y of four.
08:43:04.958 There we go. Perfect. Uh, so in the next
08:43:07.920 chapter, we're going to add the filters.
08:43:09.680 And you can go ahead and try something
08:43:11.200 here and click create. And there we go.
08:43:14.478 You can see our agent right here.
08:43:16.718 Perfect. So now it looks very similar to
08:43:19.040 our agents uh field. Let's just wait a
08:43:22.080 second for this to load. Uh, and the
08:43:24.878 style is matching, the theme is
08:43:26.798 matching, and our data table looks the
08:43:29.920 same.
08:43:31.920 I just want to change one thing and that
08:43:34.958 is to make data table component reusable
08:43:37.840 here and also we have to add the empty
08:43:39.680 state component. Yes, I forgot about
08:43:41.120 that. So let's go ahead and do the
08:43:43.440 following inside of source modules
08:43:46.520 agents inside of UI views agents view.
08:43:51.520 Let's go ahead and let's
08:43:54.160 uh import the data table not from
08:43:57.520 components data table local ones but
08:44:00.558 instead from the global ones right using
08:44:03.040 at components data table so it's
08:44:05.160 reusable which means that we can now go
08:44:07.360 inside of the modules agents UI
08:44:09.200 components and we can delete the data
08:44:11.280 table from here we no longer need it and
08:44:13.920 one more thing I want to fix here is my
08:44:17.040 columns inside of the agents so let's go
08:44:19.120 inside of the in the types first and
08:44:22.638 let's go ahead and prepare
08:44:24.920 agent get many agents get many agents
08:44:30.160 get many items like this. Then go inside
08:44:35.120 of UI components columns and in here
08:44:39.120 when you use agents get one use agents
08:44:43.280 get many
08:44:45.398 number and nothing should change. The
08:44:47.760 agents view should work perfectly fine.
08:44:50.160 But we are now using the proper get many
08:44:54.840 inference. And now we also have to add
08:44:57.760 the empty state. So we can copy this
08:45:00.000 from the agents view right here. And
08:45:02.638 let's go inside of
08:45:04.840 meetings UI views meetings view. And
08:45:08.478 let's just add that right
08:45:10.440 here. Import empty state from components
08:45:13.360 empty state. And now we just have to
08:45:14.958 change this to create your
08:45:16.920 first meeting like this. And let's add a
08:45:21.080 description. So the description I will
08:45:23.440 use is the following. Schedule a meeting
08:45:25.680 to connect with others. Each meeting
08:45:27.360 lets you collaborate, share ideas, and
08:45:29.280 interact with participants in real time.
08:45:32.240 Perfect. So, if you want to see that in
08:45:34.398 action, go inside of your meetings here
08:45:38.000 and go inside of your Neon Console or
08:45:41.120 Drizzle Studio and simply delete all
08:45:44.120 meetings and then do a refresh here and
08:45:47.760 you should see this create your first
08:45:50.280 meeting. Amazing. That's it. Let's go
08:45:52.958 ahead and merge this pull request. So,
08:45:54.958 meetings data
08:45:57.080 table. I'm going to create a new branch.
08:46:01.360 18 meetings data
08:46:04.360 table. I'm going to stage all changes.
08:46:07.520 There we go. I will write a commit
08:46:10.440 message and I will click commit and
08:46:13.360 publish
08:46:14.600 branch. And once the branch has been
08:46:17.120 published, let's go ahead and review the
08:46:20.160 pull
08:46:23.240 request. And here we have this chapter's
08:46:26.160 summary. We introduced a new table view
08:46:28.398 for meetings, displaying meeting name,
08:46:30.478 status, agent details, and human
08:46:32.718 readable duration. We added empty state
08:46:35.360 messaging to guide users when no
08:46:37.040 meetings are present. We enhanced
08:46:39.200 meeting data by including related agent
08:46:41.440 information and computed duration for
08:46:43.520 each meeting. We improved the agents
08:46:45.600 table typing for more accurate data
08:46:48.360 representation. Perfect. So in here, I
08:46:52.160 don't think there's anything too useful
08:46:53.440 in the sequence diagram that we haven't
08:46:55.440 seen before. But as you can see, it
08:46:57.760 immediately added to the diagram that we
08:46:59.680 now join the agents and compute the
08:47:02.160 duration. Right? So it's not just
08:47:03.520 repeating the same diagrams. It's
08:47:05.040 actively reading the context of
08:47:06.558 everything we've done before. And you
08:47:08.318 can see how it detected all related PRs
08:47:11.520 because we previously added these kinds
08:47:14.000 of things. So it knows that this is
08:47:15.920 similar. So it tells you this is
08:47:18.080 possibly related. We might want to take
08:47:19.520 a look at that. Right in a real world
08:47:20.958 example, this will be extremely useful.
08:47:23.440 And we have one comment here to improve
08:47:25.440 the duration SQL. Uh I'm not a SQL
08:47:28.160 expert, so I'm don't know what to tell
08:47:30.160 you if this is good or not. If you want
08:47:32.080 to, you can try it out, but I will stick
08:47:33.680 with what I know worked for my project
08:47:35.840 right here. Great. So, let's go ahead
08:47:39.040 and resolve this conversation and let's
08:47:41.840 merge this pull request. And after we've
08:47:45.680 emerged the pull request, let's go back
08:47:47.440 to our main branch here. And let's click
08:47:49.920 on the synchronize changes button and
08:47:52.398 click okay. And inside of your source
08:47:55.120 control here in the graph, you will see
08:47:58.160 18 being merged. Amazing amazing job.
08:48:01.760 That marks the end of this chapter. And
08:48:03.600 see you in the next
08:48:05.558 one. In this chapter, we're going to
08:48:08.160 implement the meetings filters the same
08:48:10.240 way we implemented the agent filters.
08:48:12.958 But before we do that, we're going to
08:48:14.878 improve the badge padding and we're
08:48:16.878 going to fix command select component
08:48:19.280 filter reset. I'm going to showcase both
08:48:22.000 of these issues in a second. We are then
08:48:24.558 going to modify the meetings get many
08:48:26.478 procedure, add the Nooks filters and
08:48:28.638 create UI for those filters. So,
08:48:31.600 regarding our previous issue uh where I
08:48:36.000 had problems with displaying the status
08:48:38.558 color, you can see that I no longer have
08:48:41.040 that issue. Looks like all I had to do
08:48:42.798 was wait for Tailwind's just in time
08:48:44.718 compiler to analyze the classes. If you
08:48:47.280 are still having that problem, you can
08:48:49.600 try doing
08:48:51.160 rmrf next and then simply doing npm
08:48:54.160 rundev
08:48:55.878 again. This should clear up the cache
08:48:58.558 and perhaps restart the just in time
08:49:01.040 compiler from
08:49:03.000 Tailwind. Now let's go ahead inside of
08:49:06.638 source components UI badge. And before
08:49:10.718 you write anything, just a reminder,
08:49:12.478 make sure you are on your default main
08:49:14.240 branch here. And change the py to one
08:49:17.520 instead of 0.5. So I just want to make
08:49:19.680 my badges a little bit taller. Great.
08:49:22.958 Now the second problem we have is when
08:49:25.600 selecting something from here and
08:49:27.200 typing, for example, new and closing it
08:49:30.318 and opening it again, it only displays
08:49:32.878 those two. So what we have to do is go
08:49:35.200 inside of um source components command
08:49:39.798 select and go ahead
08:49:42.798 uh and implement const on close or let's
08:49:48.558 call it handle
08:49:52.280 close like
08:49:54.600 this and actually let's call it handle
08:49:57.680 open change value is a boolean like this
08:50:02.398 and then what you're going to do is call
08:50:04.080 the on search but only if it exists like
08:50:07.840 this. And in here simply pass an empty
08:50:10.558 string to reset the query and then set
08:50:13.200 open set to
08:50:15.000 value and then use the handle open
08:50:17.958 change for command responsive dialogue
08:50:20.878 on open change. So on open change as you
08:50:24.160 can see will give you the open boolean
08:50:27.120 here. So to make it clearer you could
08:50:28.878 call this open like that.
08:50:32.718 So when you try it now, click on new
08:50:35.160 meeting. This still works as usual. And
08:50:37.840 if you search for new and it loads these
08:50:40.478 two and then you close it and open
08:50:42.878 again, it reset the query back to an
08:50:45.760 empty search. Great. So that's two
08:50:48.638 problems that we had resolved. Now let's
08:50:51.520 modify the meetings get many
08:50:55.080 procedure. So let's go inside of the
08:50:57.840 meetings server procedures.
08:50:59.600 Specifically, let's go inside of the get
08:51:01.280 many procedure
08:51:03.080 here alongside search. Let's add agent
08:51:06.878 ID Z string and nullish as well. And
08:51:12.000 then let's go ahead inside of the
08:51:13.520 meeting types here. And let's go ahead
08:51:16.798 and create export
08:51:19.558 type, my apologies, export enum meeting
08:51:25.878 status. And in here, go ahead and add
08:51:29.040 the following statuses. Upcoming,
08:51:31.760 active, completed, processing, and
08:51:33.958 cancelled. Always do this by looking at
08:51:36.920 your database schema file. And just
08:51:40.478 don't misspell them. You can copy and
08:51:42.398 paste them and add them here. So this
08:51:45.360 value is what matters. This can be named
08:51:48.000 whatever, but this inside of the strings
08:51:51.440 needs to match this exactly using
08:51:54.718 including the casing as well.
08:51:56.958 So now that you have that, let's go
08:51:59.040 ahead inside of the procedures here and
08:52:02.080 let's add status and let's make that
08:52:04.240 Z.NU Enum and inside of here you're
08:52:08.000 going to import meeting status from dot
08:52:12.318 dot slashtypes like this and very simply
08:52:15.760 add dot upcoming as one of the options
08:52:19.120 and then simply continue adding active
08:52:21.520 completed processing and cancelled all
08:52:23.920 of them and chain nullish to the status
08:52:28.240 enum as
08:52:29.718 well. Now let's go inside of the query
08:52:32.478 here and after page size extract the
08:52:35.558 status search and the agent ID. You can
08:52:39.840 remove the search as we already have it
08:52:41.878 here. So just status and the agent ID
08:52:46.478 and then inside of the where let's go
08:52:48.318 ahead and add some new things. So after
08:52:50.240 search check if you have a status that
08:52:52.878 user requested and then use equals
08:52:56.080 meetings status with the status
08:52:59.120 otherwise
08:53:00.600 undefined. Confirm that you have equals
08:53:03.120 imported from Drizzle
08:53:05.798 OM. Perfect. And now that you've added
08:53:08.318 that also add agent ID in the same way
08:53:12.798 using the equals and agent ID value.
08:53:15.680 Make sure you're using the proper values
08:53:17.600 here like that. otherwise undefined.
08:53:20.558 Perfect. And then I want to copy these
08:53:24.240 two and add them to the total query as
08:53:27.600 well. So I get the proper total amount
08:53:31.240 here. Great. And that's it. That's all
08:53:33.600 we need for our get many procedure. So
08:53:36.878 we have added that. Now let's add our
08:53:38.958 Nooks
08:53:40.760 filters. Let's go inside of our meetings
08:53:45.040 and let's also open the agents. And I
08:53:46.878 think that we can borrow the hooks here.
08:53:48.638 So copy the hooks folder and paste it
08:53:51.040 inside of the meetings here. So you will
08:53:53.440 now you have use agents filters. Go
08:53:56.000 ahead and rename it to use meetings
08:53:58.798 filters. Make sure you're doing that
08:54:00.318 inside of the meetings module. Go ahead
08:54:02.718 and return use meetings filters here. So
08:54:06.478 the search and the page are exactly the
08:54:08.958 same. So now let's go ahead and
08:54:11.958 add parse as string enum here. And let's
08:54:19.240 import meeting status from dot dot
08:54:22.680 /types. So now you can go ahead and add
08:54:26.680 status to be parse as string enum and
08:54:31.440 open object do values meeting status. So
08:54:34.718 these are the possible options for the
08:54:36.958 status in the URL. And
08:54:39.958 lastly add agent ID which is just a
08:54:43.600 normal string with clear on default
08:54:45.680 here. And no need for any clear on
08:54:47.840 default for the status. So leave that as
08:54:51.558 is. Now let's go ahead and let's go
08:54:54.240 inside of the agents and let's copy the
08:54:56.318 params and let's paste them in the
08:54:58.760 meetings. And now we are just going to
08:55:01.200 modify the new meetings params with
08:55:05.040 uh the new things we added in the use
08:55:07.120 meetings filters. So import parse string
08:55:09.680 as enum from Nook server. Make sure
08:55:12.160 you're working in the params we just
08:55:13.840 copied and put in the meetings module.
08:55:16.958 And you also have to
08:55:18.680 import meeting
08:55:22.080 uh status from
08:55:24.120 types this one. Great. So now let's go
08:55:28.318 ahead and just add these two to the
08:55:29.840 params like this. And that's it.
08:55:34.240 Now let's go ahead and let's add the UI
08:55:36.718 for these filters. So I want to prepare
08:55:39.520 from the agents UI components. In here
08:55:43.200 we have agents search filter. So let's
08:55:46.478 go ahead and copy this and uh let's go
08:55:50.318 inside of
08:55:51.718 meetings UI components and paste it
08:55:54.478 here.
08:55:55.760 Let's go ahead and rename this to be
08:55:58.440 meetings search filter. And let's rename
08:56:01.200 this to meetings search
08:56:05.080 filter. And inside of the meetings
08:56:07.440 search filter, we are going to use from
08:56:10.160 our hooks use meetings filters. And this
08:56:13.600 will be use meetings
08:56:16.600 filters. And everything else can stay
08:56:18.958 exactly the same. Yes, we probably could
08:56:21.600 have done a better job and reused this.
08:56:23.600 If you want to, you can do this as a
08:56:25.440 challenge for yourself. Find a way to
08:56:27.120 reuse the search filter since it's
08:56:29.200 exactly the same. The only difference is
08:56:31.120 the hooks. Hint, it will be controlled
08:56:34.080 from the outside of the component, not
08:56:36.080 the inside. But I already built it this
08:56:38.638 way. So, I'm just going to continue. Now
08:56:40.878 that I have the meeting search filter
08:56:42.638 using the new use meetings filter, I
08:56:44.718 will go inside of the meetings list
08:56:46.160 header here uh and I'm going to add it.
08:56:49.718 So in the to-do filters here, let's add
08:56:52.958 search filter from forward slash
08:56:56.558 meetings search filter. So now right
08:56:59.360 here when I do a refresh, I should see
08:57:02.080 filter by name. And then when I write
08:57:04.160 test, my URL has changed to this search
08:57:07.680 equals to
08:57:09.318 test. Now let's go ahead and let's build
08:57:12.000 the status filter. So this will be a new
08:57:14.318 component. So let's go inside of modules
08:57:16.398 meetings UI components. create
08:57:23.000 status-filters-filter.tsx. Let's go
08:57:24.398 ahead and import the following from
08:57:26.638 Lucid React. Circle X icon, circle check
08:57:29.760 icon, clock arrow up icon, video icon,
08:57:32.638 and loader icon. After that, we're going
08:57:35.360 to import our new command select
08:57:37.120 component, which we've built in the
08:57:38.558 previous chapter. Let's go ahead and
08:57:40.798 import the meeting status from our
08:57:42.638 types. And let's go ahead and import use
08:57:46.318 meetings filters from hooks use meetings
08:57:49.638 filters. Now we have to prepare the
08:57:51.920 options for our command select. So this
08:57:55.120 will be the following. ID of meeting
08:57:58.318 status
08:57:59.718 dotupcoming and the value of meeting
08:58:04.440 status
08:58:06.760 whoops dot upupcoming like that. and
08:58:10.878 then add a children which is a react
08:58:13.280 node. So open up a div here with a class
08:58:16.558 name flex items center gap x2 and
08:58:21.718 capitalize render clock arrow up
08:58:25.558 icon and render the actual text meeting
08:58:29.840 status upcoming. There we
08:58:33.240 go. We are now going to do the same
08:58:35.760 thing for all statuses. So after
08:58:37.600 upcoming go ahead and add completed.
08:58:40.638 It's exactly the same just using the
08:58:42.478 completed status and circle check
08:58:45.318 icon. After completed let's add active
08:58:50.000 using the active and video
08:58:53.160 icon. After active let's add processing
08:58:57.600 using the loader
08:58:59.958 icon. And finally, let's add the last
08:59:03.600 one, cancelled, using the circle X icon.
08:59:07.920 And now we can export con status filter.
08:59:11.160 Here we can grab the filters and set
08:59:14.558 filters using use meetings filters. And
08:59:19.280 we can return command
08:59:21.718 select. Inside of here, set a
08:59:24.398 placeholder to be status. Class name to
08:59:27.840 be height 9, options to be the options
08:59:31.280 constant from above. On select, we'll
08:59:34.638 very simply grab the value and set
08:59:37.878 filters with status value as meeting
08:59:42.680 status and value will be filters. status
08:59:46.558 or an empty
08:59:48.920 string. There we go.
08:59:52.718 We can now go back to the meetings list
08:59:54.798 header and we can import the status
08:59:57.040 filter
08:59:58.120 here from dot slash status filter. And
09:00:02.318 now in here when I click I am able to
09:00:04.638 select the status that I want. And you
09:00:06.798 will see that my URL is now both the
09:00:09.360 search and the status
09:00:11.000 completed. And notice that I can
09:00:13.398 actually filter right if I want to. I
09:00:16.638 can search. But notice how that works
09:00:18.958 differently than this where in here I
09:00:21.680 actually query the database. Right? So
09:00:24.958 the way this works and let me just see
09:00:28.478 is this a bug or is it just not loading
09:00:33.718 here. Looks like we have a bug here. So
09:00:37.920 I'll make sure to fix that. I will just
09:00:39.520 do a refresh just to confirm that it's
09:00:42.160 not uh something with my local
09:00:45.718 server. All right. I just restarted my
09:00:48.878 server and looks like it was just a
09:00:51.440 connection issue. Everything is working
09:00:53.280 fine with our filter here. So I can
09:00:55.600 search for new and it actually queries
09:00:57.520 the database for
09:00:59.000 new. So the reason for the different
09:01:01.440 behavior between the two is that our
09:01:04.080 status filter does not use the on
09:01:06.638 search. Whereas inside of our
09:01:11.200 uh meeting form, right, when we use the
09:01:14.240 command select, we use on search, which
09:01:17.920 basically tells the command select to
09:01:20.478 not
09:01:21.398 use the built-in filter. That's how that
09:01:24.958 works in case you were wondering. Great.
09:01:27.040 So, one more filter to build and that is
09:01:29.040 the agent ID
09:01:31.638 filter. Let's go ahead and let's go
09:01:34.638 inside of meetings UI components and
09:01:36.878 let's do agent-
09:01:41.080 ID-filter.tsx. Let's import use state
09:01:43.280 from react. Let's import use query from
09:01:45.520 tanstack query. Let's go ahead and
09:01:48.240 import use TRPC from TRPC client command
09:01:52.398 select from components command select
09:01:54.878 and generated avatar from components
09:01:57.520 generated avatar and lastly use meetings
09:02:00.760 filters. Now let's go ahead and export
09:02:03.200 const agent ID filter and as always
09:02:06.718 let's go ahead and add our filters and
09:02:09.840 set filters from use meetings filters.
09:02:14.000 Let's prepare our TRPC here.
09:02:17.280 And let's prepare the agent search and
09:02:20.240 set agent
09:02:22.520 search to be use state and an empty
09:02:25.718 string. And then we can query the data
09:02:28.080 using use query pass in tRPC agents get
09:02:32.200 many dot query options. And inside of
09:02:35.120 the query options increase the page size
09:02:37.360 to 100 and the search to be agent
09:02:40.798 search. This is basically a way to
09:02:42.798 guarantee that they can find uh their
09:02:45.520 agent, right? The pagination will not be
09:02:47.520 a problem here. And then we can go ahead
09:02:50.318 and return command
09:02:52.760 select. Let's give it a class name of
09:02:55.120 height
09:02:56.040 9. Let's go ahead and give it
09:02:58.478 placeholder of agent. And for the
09:03:01.600 options, we're going to go over data
09:03:04.160 question mark items or fall back to an
09:03:06.638 empty array map over an individual
09:03:09.080 agent. And then in here we are going to
09:03:12.638 uh return an object like like this with
09:03:16.240 an id of agent id value of agent id and
09:03:21.360 children which are going to be a react
09:03:24.000 node. So give this a class name of flex
09:03:27.280 items center and gap x of two inside a
09:03:31.280 generated avatar component and give it
09:03:34.638 the following props. seed will be agent
09:03:37.520 name, variant will be bots neutral and
09:03:39.920 class name will be size four and next to
09:03:42.798 it simply render out the agent name. The
09:03:46.160 on select will be identical as in our
09:03:49.440 status filter. So on select gets the
09:03:51.840 value and sets the filter to agent ID
09:03:54.798 for that value. And this time we're
09:03:57.440 going to have the on search prop meaning
09:03:59.280 that we are going to be using network
09:04:00.958 filtering. So on search will change and
09:04:03.600 that will re-trigger the data here
09:04:05.840 providing us with the new data inside.
09:04:08.638 And finally the value will be filters
09:04:11.280 agent ID. Perfect. Let's go inside of
09:04:14.398 the meetings list header here and let's
09:04:16.798 add the agent ID filter. Make sure to
09:04:19.680 import it from the right place. There we
09:04:22.478 go. And now you should be able to select
09:04:25.360 a filter. So for example I select this.
09:04:28.798 And now this is my URL. I have the
09:04:32.240 search test status completed and an
09:04:34.718 agent ID. And now let's add a button to
09:04:37.920 clear all of that. And then let's
09:04:39.520 finally connect it to the
09:04:42.120 API. Let's go back inside of the
09:04:44.558 meetings list header. And let's go ahead
09:04:47.520 and add filters and set filters from use
09:04:50.718 meeting filters like this. Let's go
09:04:54.398 ahead and define whether any filter is
09:04:56.718 modified. Is any filter modified if
09:05:00.478 status exists or search exists or agent
09:05:04.958 ID exists? Like that. Make sure to use
09:05:07.920 double exclamation points. And let's
09:05:10.718 also add a onclear filters method which
09:05:14.318 simply resets the filters to their
09:05:16.160 default states. Status is null. Agent ID
09:05:18.718 is an empty string. Search is an empty
09:05:20.798 string. And page as well. Perfect. So
09:05:24.638 now what we can do here is we can import
09:05:27.440 the button and we can also import X
09:05:31.120 circle icon from Lucid React and we can
09:05:35.040 go down here after the agent ID filter.
09:05:38.558 If any filter is modified, render the
09:05:40.958 button with the variant outline which
09:05:43.040 has an on click for our new method on
09:05:45.200 clear filters and render the X circle
09:05:47.440 icon which we just imported with the
09:05:49.120 clear button. So now I can click clear
09:05:51.600 and everything is reset.
09:05:54.638 In order to connect these filters, we
09:05:57.040 have to go back to our meetings UI view,
09:06:00.398 meetings view. And let's go ahead and
09:06:02.958 let's simply add the filters here. So I
09:06:06.318 will also add the router because we will
09:06:09.040 need it in a second. So let's just move
09:06:10.960 this here. And then let's also add our
09:06:14.398 filters and set filters here from use
09:06:18.519 filters, use meetings filters like this.
09:06:22.800 And then inside of the query options
09:06:24.800 here, simply spread the filters. So
09:06:27.917 already this should now start working.
09:06:31.040 If I select an agent like new one, I
09:06:33.839 will get no results here. But when I do
09:06:36.718 a hard refresh here, I'm getting this
09:06:38.480 issue unauthorized. That is of course
09:06:40.877 because our filters have not been
09:06:42.640 synchronized with the React server
09:06:44.480 component.
09:06:46.640 So before we do anything further here,
09:06:49.040 let's quickly go back to app folder
09:06:52.000 dashboard meetings page and let's go
09:06:55.680 ahead and let's
09:06:58.278 import load search params from modules
09:07:01.960 meetings. And let's go ahead and just
09:07:04.398 ask for params. There we go. And let's
09:07:08.000 also import a type search
09:07:10.917 params from Nooks server. So then we can
09:07:16.078 go ahead and create props for this page
09:07:19.519 using the promise search params. We can
09:07:22.480 then dstructure the search
09:07:25.800 params from the props here. And let's do
09:07:30.122 params await load search params search
09:07:35.078 params. If you want to, you can call
09:07:37.360 them filters. And then all you have to
09:07:40.000 do is spread the filters in the
09:07:42.078 prefetch.
09:07:44.877 There we go. So now when you refresh,
09:07:47.917 you will get no errors at all and you
09:07:50.640 can safely change your filters. That
09:07:53.438 includes the status. Everything seems to
09:07:56.320 be working exactly as we expected. Let's
09:07:59.680 just try the name test. There we go.
09:08:02.557 Works like a
09:08:04.519 charm. There's one more thing left to do
09:08:07.278 before we can end the chapter. Let's go
09:08:10.160 ahead inside of our
09:08:13.160 agents UI components and let's copy data
09:08:16.480 pagenation and let's paste it in source
09:08:20.360 components. So in the same place where
09:08:22.480 we added the data table because it's
09:08:24.320 generic enough to be reused and let's
09:08:27.040 now add it to the meetings view. So
09:08:29.360 after the data table add data pagenation
09:08:33.598 from components data
09:08:35.800 pagionation like this. And then we're
09:08:38.718 just going to go ahead and give it some
09:08:41.078 props. Page will be filters page. Total
09:08:45.839 pages will
09:08:47.718 be data. Total
09:08:50.438 pages. And on page change, we'll get the
09:08:54.320 page and set filters and simply modify
09:08:57.917 the
09:08:59.000 page like this. And for the data table,
09:09:02.557 let's add an on row. Click here to get
09:09:05.040 the row and simply do router.put
09:09:07.960 push open back takes forward slash
09:09:10.800 meetings and then row do ID and let me
09:09:14.557 just collapse this so it's more
09:09:17.800 visible. There we go. So make sure to
09:09:20.480 not misspell this. Right. Since we
09:09:22.800 already have that when you click here it
09:09:25.122 should lead you to the meeting ID page.
09:09:27.438 Perfect. So we now have working
09:09:29.278 pagionation for this as well. Let's try
09:09:31.438 it out by adding another agent
09:09:33.718 here like this.
09:09:37.122 Let's go back to the meetings and let's
09:09:39.360 go inside of our constants in the source
09:09:41.680 and change the default page size to one.
09:09:44.718 And you can see it immediately allows me
09:09:46.718 to pageionate and see the older agent.
09:09:50.237 Perfect. So you can now revert this back
09:09:52.320 to 10.
09:09:54.598 Great. One tiny problem that we have is
09:09:57.598 if you have any filter set and go inside
09:10:00.078 of mobile, you can see that this
09:10:01.839 happens. So let's go ahead and quickly
09:10:04.000 fix that. So let's go inside of
09:10:07.640 components meetings list header and wrap
09:10:11.040 this div inside of a scroll area from
09:10:14.320 components UI scroll area. So it's a
09:10:16.237 chassis and a component. You already
09:10:17.758 have it in your project. Just make sure
09:10:20.078 that you've added an import for it like
09:10:22.278 this in here. And let's go ahead and add
09:10:26.557 a inside of scroll area add a scroll bar
09:10:31.040 from components UI scroll area and give
09:10:33.199 it an orientation of
09:10:35.320 horizontal. So make sure to import
09:10:37.438 scroll bar and you can see that now this
09:10:39.839 is how it behaves. And now let's go
09:10:42.398 ahead and do the exact same thing inside
09:10:44.718 of the agents list header. So let me
09:10:47.758 just copy the import here. Let me add it
09:10:51.438 here. There we go. Uh and yeah you can
09:10:54.557 also in the meetings list if you want to
09:10:56.320 replace the magic number you can use the
09:10:58.278 default page from the constants which
09:11:01.278 will be the number
09:11:03.960 one and you also have to copy the usage
09:11:07.438 of
09:11:08.758 it. So let's just wrap this inside of
09:11:12.320 scroll
09:11:14.917 area. Add this and close scroll area.
09:11:18.960 Great. So I've just done exactly what we
09:11:22.000 did in the meetings list header to the
09:11:23.680 agents list header including the scroll
09:11:25.519 scroll area and scroll bar and I also
09:11:28.320 replaced the number one with default
09:11:31.040 page which is number one but in a
09:11:33.598 constant. So now the agents will also
09:11:37.680 have uh I mean it's not really visible
09:11:40.000 it requires a very small screen but this
09:11:42.160 is also now scrollable in case in it
09:11:44.839 overflows. Great amazing amazing job. So
09:11:48.000 that's all we wanted to do. We have done
09:11:51.040 all of these and now let's merge this
09:11:53.598 pull request. So 19 meetings
09:11:56.040 filters. I'm going to go inside of my
09:11:58.557 source control. I will change my new
09:12:01.438 branch. Create a new branch. 19 meetings
09:12:03.917 filters. Let me just double check. There
09:12:05.917 we go. And let's write a message.
09:12:08.557 Actually, first let's stage all changes.
09:12:11.917 There we go. 19 meetings filters. Let's
09:12:15.839 click commit. And let's publish the
09:12:18.598 branch. And then let's go and review our
09:12:22.800 pull
09:12:26.040 request. And now let's read the summary
09:12:28.960 of this chapter. Let's read through the
09:12:31.519 walkthrough. This update introduces a
09:12:33.758 comprehensive filtering and pagionation
09:12:35.519 to the meetings feature. It adds new
09:12:37.758 filter components, state management
09:12:39.680 hooks, and search parameter utilities.
09:12:42.320 The meeting's back end is extended to
09:12:44.398 support filtering by agent and status.
09:12:47.199 The UI now includes horizontally
09:12:49.199 scrollable filter bar, clear filter
09:12:51.640 functionality, and pageionated meeting
09:12:54.680 lists. And in here we have a sequence
09:12:57.278 diagram explaining exactly how when the
09:12:59.758 user adjusts the filter, it goes to the
09:13:01.598 meeting list header component. Using the
09:13:03.758 use meetings filters hook, we update the
09:13:06.000 filter state which in turn uh fetches
09:13:09.199 the meetings with new filters and the
09:13:11.122 pageionation and finally returns it back
09:13:13.758 to the user and no comments. So let's go
09:13:18.078 ahead and merge this pull request. We
09:13:20.078 did a very good job with this one. And
09:13:22.480 after that's done, let's go back to our
09:13:24.800 main branch and let's click synchronize
09:13:27.839 changes to ensure that we are up to
09:13:30.360 date. Perfect. After that, go inside of
09:13:33.040 your source control and confirm that you
09:13:35.278 see 19 merged to main. Amazing, amazing
09:13:40.480 job and see you in the next
09:13:43.237 chapter. In this chapter, we're going to
09:13:45.839 develop the individual meeting ID page.
09:13:48.640 This will include modifying the agents
09:13:50.640 get one procedure, adding the agents
09:13:52.960 remove procedure, and adding the agent
09:13:55.360 ID page and the agent ID view. Let's
09:13:59.438 start with modifying the get one
09:14:01.122 procedure. As always, confirm that you
09:14:03.519 are on your main branch and then let's
09:14:06.000 go inside of our meetings procedures
09:14:08.839 here and find get one protected
09:14:13.237 procedure. In the select here after we
09:14:16.160 spread our get table columns, add an
09:14:18.877 agent which will be a type of agents.
09:14:21.917 And you can actually copy from get many,
09:14:25.917 right? So you can copy the duration
09:14:27.598 here. It will work exactly the same. So
09:14:31.040 just add it right here. And what we have
09:14:34.160 to add is an inner join here. So we are
09:14:37.122 only going to load this meeting if we
09:14:39.758 can find the relevant match between
09:14:42.480 meetings agent ID and agents ID for each
09:14:47.519 meeting that we are
09:14:49.800 requesting like
09:14:51.877 that. Great. So that's what we had to do
09:14:54.640 for modifying the agents get one
09:14:57.160 procedure. And now let's go ahead and
09:14:59.680 implement the remove
09:15:02.758 procedure. So I'm going to copy the
09:15:05.278 update procedure because it's quite
09:15:07.398 similar. Let's go ahead and copy it.
09:15:10.480 Let's paste it here and let's call it
09:15:13.078 remove. Inside of the input here, we are
09:15:16.000 simply going to call Z object and
09:15:18.718 request id of string like this. This
09:15:22.877 will then be removed meeting and instead
09:15:25.680 of update we will call delete remove the
09:15:29.360 dot set and find where. So where meeting
09:15:32.718 ID matches the input ID and where the
09:15:35.040 user ID matches the currently logged in
09:15:37.438 user. So we know this user has access to
09:15:40.398 modify this meeting and then let's work
09:15:43.199 with if there is no removed meeting not
09:15:45.758 found otherwise removed meeting. That's
09:15:48.877 it. That is our agents remove
09:15:52.758 procedure. Now let's go inside of the
09:15:55.122 agent ID page. We can find that in
09:15:58.718 source app folder dashboard meetings
09:16:01.680 meeting ID. And in here let's go ahead
09:16:04.877 and let's prepare the following props
09:16:07.718 params with a promise of meeting ID
09:16:11.199 inside. And make sure that you didn't
09:16:13.519 misspell meeting ID here because that's
09:16:15.917 how you will be able to access it. So be
09:16:18.557 mindful of the case sensitive items. Be
09:16:22.078 mindful of any
09:16:23.718 typos. Now let's mark this as an
09:16:26.160 asynchronous method. Let's extract the
09:16:28.237 props and let's get the params
09:16:32.199 here. Then let's go ahead and let's
09:16:35.519 extract meeting ID from 08
09:16:39.000 params. Then let's go ahead and let's
09:16:41.438 add our session protection here. So
09:16:44.398 let's import out from lib out. Let's
09:16:48.398 import headers from next headers. And
09:16:51.278 let's import a redirect from next
09:16:56.040 navigation. Once you've added that,
09:16:58.320 let's go ahead and prefetch the
09:17:01.278 individual meeting. So let's get query
09:17:04.160 client from get query client. You can
09:17:08.320 import this from ERPC server and then
09:17:12.718 void query client refetch query ERPC
09:17:18.917 meetings get one query options and pass
09:17:23.519 in the ID to be meeting
09:17:27.160 ID. Add a to-do
09:17:34.040 refcript. Meetings get transcript. This
09:17:36.960 doesn't exist yet. We are later going to
09:17:38.960 implement it. Now let's add hydration
09:17:41.839 boundary here. Let's add state to be
09:17:44.680 dehydrate and pass in the query client.
09:17:47.917 You can import hydration boundary and
09:17:50.000 dehydrate all from tanstack react query.
09:17:53.839 Now in here add a suspense from
09:17:59.398 react. Then add error boundary from
09:18:03.122 react. error
09:18:06.519 boundary. Now let's go ahead and assign
09:18:09.040 the fallback
09:18:11.078 here and let's just do
09:18:14.199 to-do. Make sure to import suspense from
09:18:17.519 React and error boundary from React
09:18:20.078 error
09:18:21.320 boundary. Now let's implement the
09:18:23.519 meeting ID view component. So I'm going
09:18:26.237 to go inside of my modules meetings UI
09:18:30.000 views and I will create meeting ID
09:18:34.278 viewtsx like this. Let's go ahead and
09:18:37.438 create a interface here. Props meeting
09:18:40.598 ID. Let's export const ID view right
09:18:45.438 here.
09:18:47.758 Let's dstructure the
09:18:50.519 props meeting
09:18:53.718 ID like this.
09:18:57.040 Then let's go ahead inside of here. And
09:18:59.598 let's return a fragment. And let's
09:19:03.438 return a div here with a class name.
09:19:06.557 Flex one py4 px4
09:19:10.519 mdpx8 flex flex column and gap y of 4
09:19:15.840 meeting ID view.
09:19:19.840 Then let's go back to the page and let's
09:19:21.916 replace this with meeting ID view and
09:19:24.880 pass in the meeting ID. Meeting ID. Make
09:19:28.640 sure to import this from modules
09:19:30.480 meetings UI views meeting ID view. And
09:19:33.520 now when you click on an individual
09:19:35.436 meeting here let's just do a
09:19:37.400 refresh. You should see the new meeting
09:19:40.160 ID
09:19:41.800 view. Now let's go back inside of the
09:19:44.240 meeting ID view. Let's prepare TRPC from
09:19:47.596 use TRPC from TRPC client and let's
09:19:51.120 extract the data from use suspense
09:19:54.680 query individual use suspense query from
09:19:57.680 tanstack react query pass in the RPC
09:20:01.080 meetings get one query options and pass
09:20:04.800 in the meeting the ID as meeting
09:20:08.276 ID like that. Now that you have that,
09:20:12.480 let's go ahead and do a JSON stringify
09:20:16.560 data null
09:20:19.240 2. So let's go ahead and refresh. Let's
09:20:22.480 go uh inside
09:20:24.276 of meetings
09:20:26.756 here. Let's click here. Okay, seems like
09:20:29.756 something is wrong here. Instead of
09:20:32.800 meeting ID view, we need to mark it as
09:20:35.040 use client. That's it. That's what we
09:20:37.276 forgot to do. Let's refresh now. And
09:20:40.240 there we go. Perfect. Now let's build
09:20:43.520 the error and loading
09:20:45.720 states. So these are identical as to all
09:20:49.200 the other places we've used them. So
09:20:51.916 meeting ID view loading using the
09:20:53.756 loading state and meeting ID view error
09:20:56.320 using the error state. You can import
09:20:58.400 the loading state from components
09:20:59.916 loading state and the error state from
09:21:01.840 components error state. The title
09:21:04.160 loading meeting. This may take a few
09:21:06.240 seconds and error loading meeting.
09:21:07.840 Please try again later. And here I have
09:21:10.000 both of those components added. Now that
09:21:12.800 you have that added, you can go back
09:21:14.240 inside of the page here and instead of
09:21:16.080 using to-do, you can now use meeting ID
09:21:19.120 view
09:21:20.276 loading. And in here you can use meeting
09:21:24.160 ID view
09:21:26.120 error like this. And let's just import
09:21:29.400 it. Make sure to add all three meeting
09:21:32.560 ID view the error and the loading. So
09:21:36.000 now when you refresh you will have
09:21:37.680 proper loading here and we've already
09:21:39.680 demonstrated error a couple of times. So
09:21:41.756 no need to do it
09:21:44.040 again. Now let's go ahead and let's copy
09:21:47.120 from the agents UI components in here.
09:21:51.520 Uh we have agent ID view header. Let's
09:21:54.800 copy that. Let's paste it inside of
09:21:57.040 meetings UI components.
09:21:59.756 And let's go ahead and rename this from
09:22:02.960 agent ID view header to meeting ID view
09:22:06.840 header. And in case you think that we
09:22:09.840 forgot to rename this one, no, this is
09:22:12.160 our filter for filtering by agent. So
09:22:15.520 this needs to be called agent ID even
09:22:17.276 though it's in the meetings module. So
09:22:19.120 let's go inside of our new meeting ID
09:22:21.040 view header and let's modify the props a
09:22:23.596 bit. So instead of agent ID and agent
09:22:26.080 name, we will have meeting ID and
09:22:28.640 meeting name. So let's go ahead and use
09:22:30.880 that
09:22:33.000 here.
09:22:34.916 Meeting. So let's use the meeting ID
09:22:37.436 here and the href will be forward slash
09:22:40.596 meetings and here as well meetings and
09:22:43.120 this will be my meetings and this will
09:22:45.756 be meeting
09:22:48.040 name. And I think that everything else
09:22:50.400 can stay exactly the same except of
09:22:52.640 course meeting ID view header component
09:22:57.160 name. Perfect. So now we can go back
09:23:00.000 inside of the meeting ID view here and
09:23:03.436 let's go ahead inside of this div render
09:23:06.720 the header component. Uh
09:23:10.680 meeting ID view
09:23:13.960 header. Let's do meeting ID view header.
09:23:18.080 And inside of here, go ahead and pass
09:23:21.596 the following. So the meeting ID can be
09:23:25.436 simply meeting ID prop. Meeting name
09:23:28.960 will be data dot name and on edit here
09:23:34.880 will just be an empty arrow function and
09:23:37.756 on remove will be an empty arrow
09:23:39.756 function. Let's see what the issue is
09:23:42.436 here. So uh my apologies meeting
09:23:48.200 ID view header that's the component uh I
09:23:52.000 wanted to add the new one which we just
09:23:54.800 copied and modified. So now when you
09:23:57.520 refresh here your individual meeting ID
09:24:00.720 should now have a familiar looking
09:24:03.480 header. So you can navigate back to all
09:24:07.480 meetings or you can open the dropdown to
09:24:10.800 edit and
09:24:13.160 delete. Now let's implement the delete
09:24:16.240 functionality here. So that will be
09:24:18.640 quite simple. Let's go inside of the
09:24:20.480 meeting ID view here and we have to
09:24:23.200 prepare const remove meeting from use
09:24:27.400 mutation. You can get this from TRPC.
09:24:30.880 Oh, my apologies. From tanstack react
09:24:32.800 query inside add TRPC meetings remove
09:24:37.520 and add query options
09:24:40.360 here. Let me just see mutation options
09:24:43.680 like
09:24:44.520 this. Add on success
09:24:48.276 here and on
09:24:50.840 error like
09:24:53.240 this. Now let's also prepare the query
09:24:56.240 client here. use query client. You can
09:25:00.480 import this from tanstack react query.
09:25:04.000 And inside of the onsuccess, we are
09:25:06.160 going to invalidate uh meetings get
09:25:09.720 many like this. And let's add to-do
09:25:13.960 invalidate free tier
09:25:16.840 usage. And then let's also add router
09:25:20.240 here. Use router from next navigation.
09:25:22.720 So make sure you import
09:25:25.640 this like
09:25:27.480 that. And after we do this, let's do
09:25:30.400 router push forward/ meetings. So after
09:25:32.960 we remove it, we get redirected back to
09:25:34.960 the meetings here. And on error, we can
09:25:37.436 get the error. And we can do toast from
09:25:39.960 sonar. Error data
09:25:43.400 message. Uh let's do
09:25:47.240 error.data. Uh it looks like we don't
09:25:49.756 have any code in this one. Let's just
09:25:51.756 not do uh the error for this one. Now uh
09:25:55.360 let's go ahead and add our use confirm
09:25:58.120 hook which we can now reuse. So in here
09:26:01.756 I will add this remove confirmation and
09:26:04.560 confirm remove coming from the use
09:26:06.400 confirm
09:26:07.560 hook and it has two parameters. First
09:26:10.400 one are you sure and the second one the
09:26:12.320 following action will remove this
09:26:13.756 meeting and use confirm can be imported
09:26:16.240 from here. And let's remove the toast
09:26:18.080 soner here in case you've had it. And
09:26:21.200 let's go ahead and add this here like
09:26:25.960 that. And now let's go ahead and let's
09:26:28.640 implement the handle remove
09:26:31.320 meeting. So handle remove meeting is an
09:26:33.840 asynchronous method which is going to
09:26:36.000 await confirm remove from our use
09:26:38.560 confirm hook and only if we get okay are
09:26:41.756 we going to await remove meeting
09:26:43.960 mutation. So now we can handle that and
09:26:46.560 pass it here like that. And now if you
09:26:50.640 want to you can go ahead and try it out.
09:26:52.480 Click delete and you have a
09:26:53.916 confirmation. Once you hit confirm this
09:26:56.080 will get deleted and you are redirected
09:26:58.080 back to the meetings
09:27:00.120 page. Now let's also implement the edit
09:27:03.756 functionality. So this will be quite
09:27:06.120 simple. Let's go ahead and let's copy
09:27:08.800 the new meeting dialogue and let's
09:27:11.360 rename it to update meeting dialogue.
09:27:15.596 inside of here. Rename it to update
09:27:18.880 meeting dialogue as well and add one
09:27:21.360 more initial value prop here to be a
09:27:24.800 type of meeting get one and I think we
09:27:27.520 already have it from the types. So we do
09:27:29.840 so this is the get one
09:27:32.360 output like that. Go ahead and structure
09:27:35.596 the initial value here. Uh this will be
09:27:38.880 initial values not initial value like
09:27:41.840 that. And then inside of here, this will
09:27:44.720 be edit meeting. And this will be edit
09:27:49.120 the meeting
09:27:51.000 details. And meeting form in here uh is
09:27:55.360 not going to have a redirect. So it's
09:27:58.000 just going to be an open on change. And
09:28:00.880 oh yeah, we have to fix this and set
09:28:02.560 this to false. And pass the initial
09:28:04.800 values here to be initial values like
09:28:06.960 that. And we can do this simpler like
09:28:10.640 this.
09:28:12.480 And while you are here, uh, remove the
09:28:16.080 router, remove this. Go inside of your
09:28:19.520 new meeting dialogue and simply fix this
09:28:23.040 to be false. So you can close that
09:28:25.320 dialogue. Great. Now, let's go ahead and
09:28:28.240 let's render the update meeting dialogue
09:28:31.756 inside of the meeting ID view. And let's
09:28:35.276 go ahead and prepare our set state here.
09:28:38.720 So I'm just going to put it here. So
09:28:41.436 const update meeting dialogue open and
09:28:43.596 set update meeting dialogue open all
09:28:46.160 from use state which you can import from
09:28:49.520 react like
09:28:51.480 that. Now let's go ahead and use
09:28:55.560 this right here in the update meeting
09:28:58.240 dialogue. So open will be update meeting
09:29:02.276 dialogue open like that. And we're going
09:29:06.560 to have on open change to be set update
09:29:10.240 meeting dialogue open. And the initial
09:29:12.320 values will be
09:29:14.436 data. Uh and make sure to import this
09:29:19.200 update meeting dialogue from components
09:29:21.756 update meeting dialogue. And one more
09:29:25.040 thing we have to do is set update
09:29:26.960 meeting dialogue open in the header
09:29:29.080 here. So meeting edu header on edit set
09:29:32.320 this to true. So now this meeting is
09:29:36.080 called test as you can clearly see here.
09:29:39.120 But if I click edit uh you can see how
09:29:41.840 it also populates the agent. But if I
09:29:43.680 call it test two and click
09:29:46.276 update it should rename to test two and
09:29:49.680 it does. And if I go back it's called
09:29:51.756 test two. So that's all thanks to the
09:29:54.560 work we did when we initially developed
09:29:57.040 uh the meeting form. So it automatically
09:30:00.240 uses update meeting and it refetches
09:30:03.276 itself and get many as well. Great,
09:30:07.596 amazing, amazing job. Uh so I'm going to
09:30:11.120 stop this chapter here and then in the
09:30:12.880 next one we're going to focus on the UI
09:30:15.520 inside of here and we can start the call
09:30:18.000 very very soon. Perfect. Let's go ahead
09:30:20.560 and merge this. So, I'm going to go
09:30:23.436 ahead and open a branch 20 meeting page.
09:30:28.240 Create new branch 20 meeting
09:30:31.240 page. I'm going to go ahead and stage
09:30:34.240 all of these changes. 20 meeting page. I
09:30:38.080 will commit and I will publish the
09:30:40.360 branch. Now, let's go ahead and let's
09:30:43.276 review our changes by opening a new pull
09:30:47.960 request. And here we have our chapter
09:30:51.040 summary. We added the ability to delete
09:30:53.520 meetings. We introduced an enhanced
09:30:55.680 meeting detail view with improved
09:30:57.520 loading and error handling. And we added
09:31:00.160 a header component to the meeting detail
09:31:02.320 view with options to edit or delete the
09:31:05.120 meeting as well as a new dialogue for
09:31:07.436 editing meeting details. We also did
09:31:10.320 some bug fixing such as uh the issue
09:31:13.360 where cancelling the new meeting
09:31:14.560 dialogue did not properly close the
09:31:16.756 dialogue. Great. So in here we have a
09:31:19.200 more in-depth walk through and in here
09:31:21.520 we have a sequence diagram but nothing
09:31:24.000 new is really shown here because we did
09:31:26.560 this exact thing uh when we developed
09:31:30.560 the agent ID view right and in here we
09:31:34.240 have some comments such as to implement
09:31:36.640 to-do which we are definitely going to
09:31:38.320 do once we get to the premium chapter uh
09:31:41.200 I mean the chapter where we add premium
09:31:43.680 features to our app and in here uh It's
09:31:47.916 telling us to be mindful of
09:31:50.040 accessibility. So yeah, we could look
09:31:52.960 into this even though I think ChatSen
09:31:54.800 handles that by
09:31:56.276 itself in here. It does not have the
09:31:59.520 most up-to-date information. So next
09:32:01.520 headers does return a promise. So
09:32:04.240 headers needs to be awaited. So this is
09:32:06.720 an incorrect suggestion in this case.
09:32:09.360 Same thing for params. So this is new.
09:32:12.240 It wasn't like that before. But now the
09:32:14.960 new version is params is a promise and
09:32:18.400 you need to await
09:32:19.960 it. Uh and in here same thing. So this
09:32:23.360 is a completely new way of prefetching
09:32:25.436 with TRPC. So it thinks it needs to be
09:32:27.276 await. No, it needs to be a void.
09:32:31.400 Perfect. Great. So now let's go ahead
09:32:34.080 and let's merge this pull request.
09:32:37.436 And after it's merged, let's go back to
09:32:40.000 our main branch and let's click
09:32:42.400 synchronize changes and
09:32:45.240 okay. Let's then go inside of our source
09:32:48.240 control graph and confirm that we just
09:32:50.720 merged 20 meeting page with all of the
09:32:53.916 changes we just reviewed. Amazing,
09:32:56.880 amazing job and see you in the next
09:33:00.276 chapter. In this chapter, we're going to
09:33:02.960 add meeting varants. This will be
09:33:06.080 cancelled, processing, active,
09:33:08.320 completed, and
09:33:10.040 upcoming. So, let's go ahead and ensure
09:33:13.040 that you're on your default branch.
09:33:15.520 After that, go inside of the meeting ID
09:33:18.400 view inside of modules meetings UI views
09:33:22.560 meeting ID view. And in here, go ahead
09:33:27.040 and add the following
09:33:31.320 constants. And instead of using meeting
09:33:34.240 we are directly accessing the data like
09:33:36.800 this. So is active is upcoming is
09:33:40.400 canceled is completed and is processing.
09:33:43.520 And in here you don't have to be afraid
09:33:45.436 of doing a typo because you will get an
09:33:47.756 error because data.status is an enum
09:33:51.040 because data is what we fret from our
09:33:54.000 database right. So it can only be a
09:33:56.880 specific thing that we defined in our
09:33:58.960 schema. So just go ahead and add these
09:34:02.680 values and now let's go ahead and use
09:34:05.120 them to render the current state. So
09:34:07.200 remove the JSON stringify here and check
09:34:09.916 if is cancelled. Let's go ahead and
09:34:13.320 render a
09:34:15.880 div
09:34:19.560 cancel like this. And then let's go
09:34:22.400 ahead and repeat that for all
09:34:24.756 states like this. So he's canceled,
09:34:27.436 cancelled, processing, processing,
09:34:29.276 completed, completed, and upcoming,
09:34:31.720 upcoming. So right now when you visit
09:34:34.000 your meeting, you should see its state
09:34:37.040 here. There we go. Now it says upcoming.
09:34:40.080 But if I go inside of my Neon console
09:34:42.160 here, inside of tables, meetings, and if
09:34:45.360 I change the status to processing, for
09:34:48.000 example, and click save and refresh
09:34:50.640 here, it will now say processing. So
09:34:54.240 let's go ahead and just quickly uh bring
09:34:56.880 it back to upcoming so we can develop
09:35:00.480 that
09:35:02.360 component. Before we can develop any
09:35:04.720 components, we first have to fetch the
09:35:06.880 rest of our assets. So you can go ahead
09:35:09.360 and visit
09:35:14.040 cwantonio.com/meat-assets or you can
09:35:15.520 simply use the link in the description
09:35:17.520 and that will take you to the GitHub
09:35:19.916 with all of the assets. So, go ahead and
09:35:22.720 download all of this. You can click
09:35:24.400 individual inside of them and use the
09:35:26.400 download button right
09:35:28.916 here. Once you've downloaded them, go
09:35:31.916 ahead and put them inside of the public
09:35:34.480 folder. So, we already did this with the
09:35:37.120 empty SVG, and now we're just adding a
09:35:40.400 couple of more. So, we've added the
09:35:42.720 cancelled, we've added processing, and
09:35:46.400 we've added upcoming.
09:35:50.000 Now let's go ahead and just close
09:35:52.240 everything and go inside of source
09:35:54.000 components empty state and in here add a
09:35:56.960 new prop which is an optional image prop
09:36:00.400 and make it a default forward slash
09:36:02.960 empty SVG and instead of rendering the
09:36:05.756 hardcoded string here put it like
09:36:09.320 this and now let's go ahead and develop
09:36:12.320 upcoming state so we're going to do that
09:36:14.960 inside of the meetings UI components
09:36:17.596 let's create a new file
09:36:19.276 upcoming state.tsx.
09:36:23.756 Let's go ahead and let's export const
09:36:26.080 upcoming
09:36:28.040 state and let's return a div with a
09:36:31.040 class name background white rounded
09:36:34.080 large px of 4 py of 5 flex flex column
09:36:39.756 gap y8 items center and justify center
09:36:45.276 inside render the empty state from
09:36:48.240 components empty state and inside put an
09:36:52.000 image to be forward upcoming
09:36:56.040 SVG. So, we just added that to our
09:36:58.640 public folder. And then let's add uh the
09:37:02.080 title and the description. This is what
09:37:04.320 I'm going to use. You can, of course,
09:37:05.916 use whatever you prefer. So, let's go
09:37:08.720 ahead now and go back inside of our
09:37:12.160 views meeting ID view. And instead of
09:37:15.360 this upcoming let's actually render
09:37:17.436 upcoming
09:37:19.480 state from components upcoming state. So
09:37:23.680 now in here when you refresh if this is
09:37:25.916 in the state upcoming you should see not
09:37:28.560 started yet. Once you start this meeting
09:37:30.640 a summary will appear
09:37:33.080 here. Now let's go back inside of the
09:37:35.916 upcoming state here. And let's import
09:37:39.276 button from components UI button. And
09:37:43.040 let's import
09:37:44.880 uh
09:37:46.436 link from next link. And let's also add
09:37:50.960 video icon and ban icon from lucid
09:37:56.200 react. And now we're going to go ahead
09:37:59.276 below the empty state here and we're
09:38:01.756 going to open a div with a class name
09:38:04.960 flex flex column reverse lg flex row lg
09:38:11.520 justify center items center gap 2 and
09:38:16.480 full width. And now let's render the
09:38:19.040 buttons. The first one will be ban icon
09:38:22.960 and cancel meeting button. Copy and
09:38:26.240 paste it. And the second one will be
09:38:28.080 start meeting and video
09:38:30.840 icon. And this one will also be a link.
09:38:34.960 So go ahead and wrap the content of the
09:38:37.596 button inside a
09:38:39.960 link and give it an
09:38:42.276 href to the following open back forward
09:38:47.276 call forward
09:38:48.756 slash and then we're going to do meeting
09:38:51.840 ID. So let's just put one two three for
09:38:53.916 now. set the this to be as child and
09:38:58.160 class name with full LG with auto and
09:39:03.120 that would be
09:39:04.436 it. And now let's go ahead to the button
09:39:08.240 above and let's go ahead and give it a
09:39:10.880 variant of secondary and let's give it
09:39:14.080 the same class name here. There we go.
09:39:16.880 And now let's go ahead and let's simply
09:39:18.480 extend the props for this. So it will
09:39:22.320 accept meeting ID on cancel meeting and
09:39:25.040 is cancelling. So we can now destructure
09:39:28.640 that. Let's go ahead and do it. Meeting
09:39:32.160 ID on cancel meeting and is cancelling
09:39:35.040 from the props here. So for this button
09:39:39.200 here, we can go ahead and add an on
09:39:43.320 click and we can go ahead and add
09:39:47.800 disabled if it's cancelling.
09:39:52.480 And we can also disable the start
09:39:54.560 meeting button as well if is cancelling
09:39:57.436 so we don't accidentally start the call
09:40:00.240 while we're canceling it. Now let's go
09:40:04.000 ahead and also use the meeting ID here
09:40:05.840 instead of the 1 2 3. So forward
09:40:08.436 slall meeting ID like that. Now let's go
09:40:12.240 inside of the actual meeting ID
09:40:15.400 here and let's render it properly. So
09:40:18.560 I'm going to give it meeting ID. Meeting
09:40:21.756 ID on cancel meeting will be an arrow
09:40:24.640 function like this. And in is cancelling
09:40:26.960 will be
09:40:28.120 false. There we
09:40:31.800 go. So now we have the options to cancel
09:40:34.640 or start the
09:40:36.596 meeting. Now let's leave it like this
09:40:39.360 and let's go ahead and let's add a new
09:40:43.560 state called active state.
09:40:48.480 So in order to do that we just have to
09:40:51.120 copy the upcoming state and let's go
09:40:53.436 ahead and let's rename it active state
09:40:56.640 and for the props it will just accept a
09:40:59.040 meeting ID let's call it active state
09:41:02.160 and all we have to do is just modify the
09:41:04.160 title and the description
09:41:05.960 here meeting is active and meeting will
09:41:09.040 end once all participants have left and
09:41:11.680 we can use the exact same image here and
09:41:14.640 you can remove this div here. No need
09:41:17.520 for it. And uh yeah, you can leave the
09:41:20.560 class name as it is. Just remove the
09:41:22.160 unused imports here. And uh yeah, my
09:41:25.960 apologies. Bring this back. But it's
09:41:28.320 just going to be a single button
09:41:31.240 here. It's not going to be disabled. It
09:41:34.080 will be a link to the meeting ID. And
09:41:36.240 this will be join meeting like that.
09:41:40.160 Perfect. And I think we can leave
09:41:42.000 everything else exactly as it is. So
09:41:43.680 meeting is active. Meet will end. and
09:41:46.240 just remove the ban icon from here.
09:41:48.320 Perfect. Let's go back to the meeting ID
09:41:50.320 view here. And let's go ahead and let's
09:41:53.596 add is active and active
09:41:57.800 state. Meeting
09:41:59.960 ID. Meeting
09:42:02.276 ID. Make sure to import active state. So
09:42:06.160 now let's go ahead and let's change this
09:42:08.160 to active and click save
09:42:11.720 change. And let's see this change.
09:42:14.480 meeting is active and we have a button
09:42:16.160 to join the meeting which is a 404 page
09:42:19.120 at the moment because it doesn't exist
09:42:21.880 yet. And now let's wrap it up with the
09:42:24.720 processing state and the cancelled
09:42:26.960 state. So let's copy active state and
09:42:29.596 let's rename it canceled
09:42:32.360 state. Let's go ahead and remove the
09:42:34.400 props as we are not going to need any.
09:42:37.040 And let's rename this to
09:42:39.000 cancelled state. In here we are using
09:42:42.560 cancelled SVG and we just have to modify
09:42:46.240 the title and the description and we can
09:42:48.880 completely remove everything below that.
09:42:52.400 And let's remove all of the unused
09:42:54.160 imports here. So that's the canceled
09:42:56.560 state. So let's go inside of the meeting
09:42:58.240 ID view down here and let's go ahead and
09:43:01.916 render the canceled
09:43:04.680 state. Make sure to import the cancelled
09:43:07.480 state. And let's go ahead and change
09:43:09.916 this to cancelled. Save
09:43:12.360 change. And let's refresh and see it in
09:43:15.360 action. There we go. Meeting
09:43:18.276 cancelled. And let's do one more which
09:43:21.040 is the processing state. So let's just
09:43:23.680 copy
09:43:24.916 the cancelled
09:43:27.560 state. And let's rename it to processing
09:43:32.360 state. Processing state. So we're in
09:43:36.720 here. We're going to use u processing
09:43:39.520 SVG I think public processing. Yeah. So
09:43:43.756 we have processing SVG here and but this
09:43:46.880 is technically a completed state right
09:43:50.320 we are going to say meeting completed
09:43:52.080 because it was literally completed we
09:43:54.000 are just processing it. So like a
09:43:55.680 summary will appear soon. Great. And now
09:43:58.960 let's go back inside of the meeting ID
09:44:00.800 view here and let's use
09:44:03.080 the processing state like this. There we
09:44:08.360 go. Perfect. So the only thing left is
09:44:12.000 the completed state. But this will not
09:44:15.520 use any image. This will be an actual
09:44:17.520 you know completed state with
09:44:18.880 information and we can only develop it
09:44:20.560 once we actually process a meeting. But
09:44:23.680 let's just confirm this works by
09:44:25.276 changing this to processing and saving
09:44:27.680 it and
09:44:28.756 refreshing. And there we go. Meeting
09:44:31.276 completed. The meeting was completed. A
09:44:33.120 summary will appear soon. Perfect. So
09:44:35.596 now just bring this back to upcoming or
09:44:38.080 just create a new meeting. It's going to
09:44:40.000 have upcoming by default. And in the
09:44:42.320 next chapter, we are going to enable
09:44:44.320 this buttons right here. Now let's go
09:44:47.200 ahead and let's see if we've done
09:44:49.560 everything. We've grabbed the assets.
09:44:51.916 Cancelled processing active. Uh not
09:44:54.400 completed yet, but we did add this.
09:44:59.320 Perfect. And now let's go ahead and
09:45:01.360 merge this. So 21 meeting
09:45:05.320 variants. Let me go ahead and open a new
09:45:08.000 branch here. Create new branch. 21
09:45:10.800 meeting
09:45:14.436 variants. And let's click plus to stage
09:45:17.276 all changes. And add a commit message.
09:45:21.436 and let's press commit and publish the
09:45:24.520 branch. Once the branch has been
09:45:26.800 published, we can go ahead and review
09:45:29.360 our code. This one was pretty simple, so
09:45:31.680 I'm not expecting much, but I am
09:45:34.240 interested if we missed some uh serious
09:45:37.360 issues
09:45:39.000 here. And in here we have our code
09:45:41.960 summary. So, as we've just learned, we
09:45:45.040 have introduced new visual states,
09:45:47.200 active, upcoming, canceled, and
09:45:49.596 processing. And we have also added the
09:45:52.320 images to represent those states. In
09:45:55.360 here, as always, we have a more uh
09:45:58.160 in-depth file by file change summary, a
09:46:01.596 diagram representing our logic to show
09:46:04.560 each visual state. And in here, we have
09:46:08.160 some comments. So, it recommends using
09:46:10.560 active SVG instead of upcoming SVG.
09:46:13.520 Completely reasonable. It's not exactly
09:46:15.680 clear. The component is called active
09:46:17.680 state, but upcoming. SVG is the one we
09:46:20.960 need to use. In here, it suggests adding
09:46:24.640 some class names here, but we don't need
09:46:26.720 to do that because in the new chat
09:46:28.720 versions, button automatically separates
09:46:31.436 the icons
09:46:33.000 here. And let's go ahead
09:46:36.756 here. Uh it suggests removing the
09:46:39.840 meeting on cancel. We are going to have
09:46:41.916 an actual action to just cancel the
09:46:43.840 meeting without removing it.
09:46:46.240 Uh, of course in here it suggests
09:46:49.120 actually, you know, filling this and
09:46:51.040 also it suggests adding an unknown
09:46:53.200 meeting status. So that's something we
09:46:54.800 might actually do. Even though I'm not
09:46:56.320 sure how this can happen, it's good to
09:46:58.640 cover this kind of case as well. So
09:47:01.200 let's go ahead and merge this pull
09:47:03.200 request
09:47:04.360 here. Let's go back to our main branch
09:47:08.160 and let's click synchronize changes. So
09:47:11.756 this button right here. And let's go
09:47:14.640 back inside of our source control, look
09:47:16.880 at the graph, and confirm we just merged
09:47:19.596 all of those new images and all of those
09:47:22.640 new states. Great. That's it for this
09:47:25.436 chapter. Amazing job, and see you in the
09:47:27.596 next
09:47:28.840 one. In this chapter, our goal is to
09:47:31.916 implement a video calls. The plan for
09:47:34.880 that is to start by obtaining stream API
09:47:37.756 keys, adding the stream video and node
09:47:41.000 SDK, adding a few methods, procedures,
09:47:44.800 and finally UI elements. Let's start by
09:47:48.160 obtain obtaining the stream API keys.
09:47:50.960 So, visit
09:47:52.436 getstream.io and create an account. If
09:47:55.360 this is your first time, you will have a
09:47:58.000 prompt like this where you have to enter
09:48:00.160 a unique organization name. So, I'm
09:48:02.880 going to call this meet- AI. And I'm
09:48:06.080 just going to go ahead and give it a
09:48:08.000 number to make it unique. Let's click
09:48:10.320 save. And there we go. Our organization
09:48:13.040 was just created. And in here, we also
09:48:16.160 have our production app. In case you
09:48:18.560 don't have an app, you can click create
09:48:20.596 app. So, go ahead in your existing app
09:48:23.596 or your newly created one. And in here,
09:48:26.960 go ahead and select video and audio and
09:48:29.756 click overview. And now inside of here,
09:48:32.880 make sure you are in video and audio and
09:48:35.276 copy the
09:48:36.596 key. Now let's go ahead. Make sure you
09:48:39.276 are on your default branch. Go inside of
09:48:42.000 environment and let's add next public
09:48:45.436 stream video API
09:48:48.120 key and below that prepare the stream
09:48:52.160 video secret key which will be this
09:48:55.200 secret right here. So copy that secret
09:48:57.916 and add it here.
09:49:00.640 After we've obtained our keys, let's
09:49:02.800 install the SDK. So, I want to show you
09:49:05.840 where you can find the documentation.
09:49:08.080 And it's quite simple. You can just
09:49:09.596 click view documentation here. Just make
09:49:12.080 sure you have video and audio
09:49:14.120 open. And in here, go ahead and select
09:49:17.436 the platform API and select JavaScript.
09:49:21.840 Let's go ahead and install stream.io
09:49:24.080 node
09:49:25.960 SDK. So, npm install and just add legacy
09:49:30.080 pure depths so the installation doesn't
09:49:34.360 fail. Now that it's installed, let's go
09:49:37.360 ahead back inside of our project source
09:49:40.080 library and create stream-vide.ts.
09:49:46.000 Let's go ahead and let's import stream
09:49:49.000 client from at stream io node SDK and
09:49:54.080 export constream video to be new stream
09:49:57.720 client. And inside of here we need to
09:50:00.560 pass our new environment keys which are
09:50:04.560 process environment next public stream
09:50:07.520 video API key and stream video secret
09:50:10.000 key. As always, please double check,
09:50:12.560 copy and paste so you know you didn't
09:50:14.800 add any typos.
09:50:18.200 Great. For extra security, you can also
09:50:21.520 import server only in the beginning. You
09:50:24.560 already have this installed server only.
09:50:26.880 And let me just show you my stream io
09:50:30.000 node SDK version in case you're
09:50:32.436 wondering. So, this will basically
09:50:34.640 prevent this from being imported
09:50:36.640 anywhere on the client side.
09:50:39.200 Now, let's divert a bit and let's go
09:50:42.480 create the generate avatar method. So,
09:50:45.680 we're going to do that inside of source
09:50:47.520 lib and create
09:50:49.320 avatar.
09:50:51.800 DSX and import create avatar from dice
09:50:55.120 bear core. And let's add our two
09:50:57.680 variants here. Now, let's go ahead and
09:51:00.480 create the props seed, which is a
09:51:02.880 string, and the
09:51:04.436 variant. They need to match the imports
09:51:07.000 above. And then in here create a very
09:51:10.000 simple method generate avatar URI
09:51:13.596 accepting the seed and variant props.
09:51:15.916 And what we are doing is calling the
09:51:18.000 create avatar method depending on the
09:51:19.916 variant and we are passing some specific
09:51:22.800 options if it's initials. If it's bots
09:51:25.756 neutral we are just passing the seed and
09:51:28.080 we are returning to data URI. So this is
09:51:31.040 a quick way to generate avatar URIs but
09:51:34.480 not the entire component as we have with
09:51:37.040 our generated avatar component. So it's
09:51:39.276 pretty much the exact same function and
09:51:41.680 we could probably reuse it here if we
09:51:43.916 wanted to feel free to do that but this
09:51:46.400 one doesn't render any
09:51:49.640 JSX. Now let's go ahead inside of our
09:51:52.800 meetings procedures located in modules
09:51:55.756 meetings server procedures and let's go
09:51:58.080 to the top here and let's create
09:52:00.080 generate token procedure. It's going to
09:52:03.120 be a protected
09:52:05.320 procedure. Go ahead and add a mutation
09:52:08.120 here. Make it
09:52:10.520 asynchronous. Extract the context from
09:52:13.360 here. And what you're going to do is
09:52:16.120 await stream video from our newly added
09:52:20.640 lib stream video. And in here add upsert
09:52:26.756 users. And in here open an object and
09:52:30.720 set the ID for this new user to be the
09:52:33.596 currently logged in user. Give it a name
09:52:37.520 for the currently logged in user. A role
09:52:40.480 will be admin and image will either be
09:52:44.800 context out user image or our newly
09:52:49.520 created generate avatar URI from lib
09:52:55.000 avatar and let's go ahead and pass it
09:52:57.436 some options here. So we are going to
09:53:00.560 use seed to be context out user name and
09:53:04.880 variant will be initials.
09:53:08.720 There we go. So now we have prepared a
09:53:11.680 user for the call. Now we have to create
09:53:14.880 the actual token. So let's create the
09:53:17.276 expiration time using this formula which
09:53:20.560 is equivalent to 1 hour. And let's go
09:53:23.916 ahead and create the issued at using
09:53:26.880 this formula right here. And then we can
09:53:29.840 finally create the token using stream
09:53:32.160 video generate user token. pass in the
09:53:36.560 user id to be context al user id. So
09:53:40.960 this will now create a token for which
09:53:43.680 user can join the call and it's going to
09:53:45.840 match the user ID of this user which we
09:53:48.720 just added to the list of members. So
09:53:50.880 it's going to be able to read their
09:53:52.560 image and their name even though the
09:53:55.276 token only knows the ID of that user.
09:53:58.080 That's why we needed to upsert the user
09:54:00.160 first.
09:54:01.680 Now let's add the expiration to the
09:54:03.520 expiration time and the validity in
09:54:06.160 seconds to be issued
09:54:08.596 at. And since the generate user token
09:54:11.840 does not return a promise, we don't need
09:54:14.080 to await it. We can instead immediately
09:54:16.960 return this
09:54:18.840 token. Now we have to stay inside of the
09:54:21.680 meetings procedures and go inside of the
09:54:23.840 create protected procedure. And in here
09:54:26.000 we have a to-do to create stream call
09:54:28.240 and upsert some more users. Let's see
09:54:31.200 what that's all about. So first let's
09:54:33.680 create a new call using stream video dot
09:54:37.596 video call. The type of the call will be
09:54:42.200 default and the ID of the call will be
09:54:45.680 created meeting ID. So we are going to
09:54:48.160 associate the stream SDK call with our
09:54:52.720 meeting ID. So that will be our unique
09:54:55.596 identifier for this video call. And now
09:54:58.720 let's await call create. Let's go ahead
09:55:01.756 and add some data inside. This will be
09:55:04.400 created by underscore id context al user
09:55:08.756 ID. And then we're going to add some
09:55:11.436 custom fields here. So we can render
09:55:13.360 them in the call UI such as meeting ID
09:55:17.200 to be created meeting ID and meeting
09:55:20.560 name to be created meeting.name. name.
09:55:24.080 Be careful about the spelling here
09:55:25.756 because there is no type safety here.
09:55:27.916 These are our custom fields. So just
09:55:30.160 make sure you don't misspell them. And
09:55:32.560 now let's add some settings override
09:55:34.720 here. We are going to immediately enable
09:55:37.200 the transcription of the call using
09:55:39.756 English
09:55:41.320 language. Mode will be auto on and
09:55:44.640 closed caption mode will be auto on as
09:55:47.360 well. And we are going to do the same
09:55:49.520 thing with recording using mode auto on
09:55:53.120 and
09:55:54.276 quality 180 uh
09:55:57.720 1080p. There we go. So we just created a
09:56:00.640 new call every time we create a new
09:56:02.960 meeting. So we are ready to join that
09:56:05.200 call whenever we want. But we are not
09:56:07.360 done yet. What we have to do now is we
09:56:09.916 have to fetch an existing agent that
09:56:12.720 this newly created meeting uh uses. So
09:56:16.560 let's go ahead and do that. We can get
09:56:18.640 the existing agent using await database
09:56:21.200 select from agents where equals agents
09:56:24.560 ID matches the newly created meeting
09:56:27.120 agent ID. And the first thing we are
09:56:29.596 going to do is throw an error in case we
09:56:31.916 were not able to found that because we
09:56:34.560 cannot upsert this user. And now we can
09:56:37.800 finally go ahead and do stream video.
09:56:42.080 users. That's right. This agent will be
09:56:44.960 treated as a normal
09:56:47.960 user. So inside of here, let's add the
09:56:51.040 ID and the name to be existing agent ID
09:56:53.276 and existing agent name. Let's go ahead
09:56:56.000 and give it a role of user because we
09:56:59.596 already set the admin. And the image
09:57:02.000 will be our generate avatar URI with the
09:57:05.840 seed to be existing agent.name name and
09:57:08.880 the variant will be bots
09:57:11.320 neutral. Just like that. Perfect. And
09:57:14.640 now we can safely create our meeting.
09:57:16.880 And that's all we need to do with stream
09:57:19.276 video SDK uh in this procedure right
09:57:24.756 here. Now let's go ahead and let's
09:57:27.756 develop the following page which we get
09:57:30.880 access to in our upcoming state. If you
09:57:34.800 remember in the previous chapter, we
09:57:36.480 created a lot of meeting variants. One
09:57:38.720 of that was upcoming state which allows
09:57:41.436 the user to either cancel the meeting or
09:57:43.596 start the meeting. So it's basically
09:57:46.160 this screen right here. So when we start
09:57:48.560 the meeting, we are redirected to
09:57:50.680 forward/call meeting ID. Let's go ahead
09:57:53.436 and work on that page. Now the crucial
09:57:55.916 difference here will be that it's not
09:57:58.960 going to be inside of a dashboard. So,
09:58:02.080 it's going to be in its own folder call.
09:58:05.360 This means it's not going to have the
09:58:08.000 sidebar because we don't want it to be
09:58:10.560 anything other than full screen. So,
09:58:12.720 let's go inside of call and let's go
09:58:14.880 ahead and create a new folder meeting ID
09:58:18.800 and inside page esx. Why meeting ID?
09:58:24.160 That's because in our procedure right
09:58:26.640 now when we use the create method when
09:58:30.320 we create a new call we use the created
09:58:32.640 meeting ID as the unique identifier for
09:58:35.840 that call. So we can safely rely on the
09:58:38.160 meeting ID to help us find the call from
09:58:41.596 stream video SDK. Perfect. Now let's go
09:58:45.520 ahead and let's create a props here with
09:58:48.800 params promise and meeting ID. Be
09:58:50.960 mindful of spelling. Don't make any
09:58:52.800 typos or casing
09:58:54.840 errors. Let's export const page here.
09:58:58.000 Make it an asynchronous page and
09:59:00.000 destructure the params. Assign the props
09:59:03.800 here. And let's go ahead and dstructure
09:59:07.040 the meeting ID from the params like
09:59:11.800 this. Let's also make sure that this
09:59:14.640 page is protected. We can do that by
09:59:17.200 using our familiar session from
09:59:20.276 out which we can import from lib out get
09:59:23.436 session and pass in the headers from
09:59:26.080 next headers and the redirect from next
09:59:29.120 navigation if there is no session
09:59:30.720 available. So now only authenticated
09:59:33.200 users can visit this page. Now let's go
09:59:36.080 ahead and let's grab our query client
09:59:39.276 from get query client. We can get it
09:59:43.360 from TRPC server and let's void query
09:59:47.040 client prefetch query ERPC which you can
09:59:50.720 also import from the server here and
09:59:53.520 let's prefetch meetings get one pass in
09:59:57.360 the query options and use the ID as
10:00:00.480 meeting
10:00:03.640 ID just like that now let's go ahead and
10:00:07.436 return our hydration boundary here from
10:00:11.520 tan stack React query and add the state
10:00:14.720 as dehydrate from tanstack react query
10:00:17.596 and pass the query client
10:00:19.480 inside just like that. So we are doing
10:00:21.916 the prefetching like we've always done
10:00:24.080 it so far. So you can import dehydrate
10:00:27.120 and hydration boundary from tanstack
10:00:29.436 react query. And uh what I like to do is
10:00:34.080 for some reason I like to structure the
10:00:35.840 params up here. Even though we will
10:00:38.840 redirect it just feels right for it to
10:00:42.400 be here. Now what we have to do is we
10:00:44.800 have to develop the call view
10:00:48.680 component. We are going to develop that
10:00:51.120 inside of a new module. So let's go
10:00:52.880 inside of our modules and let's create a
10:00:54.720 new folder called call and inside of
10:00:57.520 here UI and then finally let's create
10:01:01.480 views and inside call- view
10:01:06.360 tsx it's going to have an interface
10:01:08.800 props of the meeting id and let's export
10:01:12.000 const call call view here and let's
10:01:14.560 simply grab those props here. So we are
10:01:16.960 basically extracting the meeting ID
10:01:19.436 here. So we can do
10:01:21.560 TRPC and so that we can extract the data
10:01:24.640 using use suspense
10:01:27.560 query from TRPC meetings get one with
10:01:32.480 the query options ID meeting ID. So now
10:01:37.120 we have that data prefetched here
10:01:39.680 because we are prefetching it here. So
10:01:41.916 we can now import call view and pass in
10:01:44.160 the meeting ID as meeting ID. Make sure
10:01:47.120 you have imported the call view from
10:01:48.960 modules call UI views call view. The
10:01:52.160 reason we still have an error here is
10:01:54.160 because we don't return any JSX here. So
10:01:58.000 let's go ahead and let's return a div
10:02:02.916 hello or maybe we can do JSON stringify
10:02:07.756 data null
10:02:09.640 2 just like that. and make sure to mark
10:02:12.240 the call view as use
10:02:15.800 client. Now let's go ahead and test our
10:02:18.480 app a bit just to see nothing's broken.
10:02:21.200 So make sure that you go instead of a
10:02:23.360 meeting which is in the state of
10:02:24.800 upcoming. If you are unsure, you can go
10:02:27.596 ahead and create a new meeting. I would
10:02:29.596 actually suggest that you go ahead and
10:02:31.360 create a new meeting so you can test the
10:02:34.000 video SDK. So let's click create here
10:02:37.360 and let's see if any errors pop up.
10:02:39.200 Maybe we did something
10:02:40.756 incorrectly in here. I cannot see any
10:02:43.840 errors at all, which would mean that we
10:02:45.680 have successfully uh upserted those
10:02:47.916 users and created those calls. And I
10:02:49.916 think that we might actually be able to
10:02:52.480 uh track this inside of here. Let me go
10:02:55.120 ahead and refresh here inside of my
10:02:57.680 video and audio. And I think that
10:03:00.080 somewhere here I might be able to go
10:03:03.040 maybe in the usage or
10:03:05.800 explorer. Let's click on calls here. And
10:03:08.800 there we go. I think that this is a new
10:03:11.520 call and I think uh it might not Yes, it
10:03:16.160 doesn't yet have any members. Uh I think
10:03:18.640 that in order to do that we actually
10:03:20.400 need to join the call I think. Right.
10:03:23.916 But this is the new call which we just
10:03:26.400 created. And you can see we have the
10:03:28.400 custom information test video SDK. So we
10:03:31.120 are successfully doing that. Perfect.
10:03:34.240 Now let's go ahead uh and let's click on
10:03:37.916 start meeting and in here we should now
10:03:41.276 see a redirect to forward slall and
10:03:43.756 looks like we are missing something. So
10:03:46.320 inside of this page here I'm doing
10:03:48.480 export const page but that's a mistake
10:03:51.916 because page needs to be export
10:03:54.916 default. So let's just fix that. And now
10:03:58.400 in here you can see no sidebar and we
10:04:01.276 have properly loaded the meeting ID for
10:04:04.080 which call we want to connect
10:04:06.840 to. Now let's go ahead and let's go
10:04:10.240 inside of our app folder call meeting ID
10:04:14.960 and inside of the entire call folder
10:04:17.596 create a layout.
10:04:20.276 DSX and it's going to be very simple. So
10:04:23.120 interface props with the children and
10:04:25.916 just wrap the children with a height
10:04:28.000 screen and background color of
10:04:30.840 black. So there we go. It's now just a
10:04:33.916 black on black text here. So I just
10:04:36.720 wanted to change the background for
10:04:38.720 everything relating the call to be
10:04:43.000 black. Now let's go back inside of our
10:04:45.596 call view here. And first things first,
10:04:48.000 let's check if data status is completed.
10:04:52.160 In that case, what I want to do here is
10:04:54.320 I want to return a div with a class name
10:04:56.880 flex hide screen items center and
10:05:00.480 justify center. And I want to render the
10:05:03.276 error
10:05:04.276 state from components error state. And
10:05:08.720 in here I just want to alert the user
10:05:11.756 that this meeting has ended and you can
10:05:14.720 no longer join this meeting.
10:05:17.756 So now we can test this out more easily
10:05:20.800 by changing this to
10:05:22.360 upcoming. So there we go. This is the
10:05:24.640 error that the user will see, but only
10:05:26.720 when it's
10:05:27.960 completed. So make sure you change this
10:05:30.080 to completed. So the upcoming user
10:05:31.916 actually sees the JSON stringify for
10:05:36.360 now. Now let's go ahead inside of call
10:05:40.360 UI and let's create a new folder called
10:05:43.480 components. Inside of here, create a
10:05:46.400 call
10:05:48.040 dashprovider
10:05:49.640 component. Now, inside of here, go ahead
10:05:52.080 and mark it as use
10:05:54.436 client. And go ahead and
10:05:56.916 import loader to icon from Lucid Ref.
10:06:01.680 Import AL client from lib al client.
10:06:05.680 Import generate avatar URI from lib
10:06:08.320 avatar. And let's quickly create an
10:06:12.080 interface props with meeting ID and the
10:06:14.800 meeting name. And now let's export const
10:06:18.640 call provider
10:06:20.436 here. Let's assign the props and let's
10:06:23.840 dstructure the meeting ID and the
10:06:26.080 meeting name. Let me just fix the
10:06:28.080 capitalization
10:06:30.120 issue. And inside of here, let's go
10:06:32.960 ahead and let's get our current session
10:06:36.400 using al client use session. So now we
10:06:38.960 have data and is pending here. So in
10:06:41.596 case we don't have data or in case is
10:06:44.320 pending is active, we are going to
10:06:46.960 return a div with a loader to icon
10:06:50.360 inside. Give the div a class name of
10:06:53.400 flex height screen items center justify
10:06:58.320 center background
10:07:00.756 radial from sidebar accent to sidebar. I
10:07:05.520 told you we're going to reuse that
10:07:07.756 variables a few more times in the
10:07:09.436 project and give the icon size six
10:07:11.916 animate spin and text
10:07:16.360 white. And now down here, go ahead and
10:07:20.800 simply return meeting ID inside of a
10:07:24.640 div.
10:07:28.276 Whoops. And meeting
10:07:31.960 name. Just like this.
10:07:35.680 And now let's go inside of the call view
10:07:37.880 here and let's
10:07:40.840 return call
10:07:43.240 provider from components call provider
10:07:47.120 and pass in the meeting ID to be meeting
10:07:50.080 ID and meeting name to be data
10:07:55.640 name. So now when you refresh this, you
10:07:58.640 should now see a loading and then in
10:08:01.120 here you will see the name and the ID.
10:08:03.916 It's just uh black text
10:08:06.680 here. Now what I want to do is I just
10:08:09.756 want to change the call provider from
10:08:12.080 loader to icon to just the normal loader
10:08:15.916 icon because I don't think we use loader
10:08:18.240 to throughout the project as much. So
10:08:19.840 let me refresh here. Let's do refresh
10:08:22.880 again. Yeah, that's the uh loader that I
10:08:26.960 want. Now, we're going to go ahead and
10:08:29.276 we're going to build a new component
10:08:31.120 which we are going to render here and
10:08:32.880 where we are going to pass this to as
10:08:35.200 well and it's going to be inside of the
10:08:36.880 same components folder. So, create
10:08:41.960 call-connect.tsx and create an interface
10:08:44.160 props accepting the meeting ID, meeting
10:08:46.560 name and the new user data information
10:08:49.840 which we await for here. So user ID,
10:08:53.040 username and user image. Let's export
10:08:56.400 con call connect
10:08:58.840 here and let's go ahead and assign the
10:09:01.596 props here and let's dstructure all of
10:09:05.596 them. There we go. Now inside of here uh
10:09:09.756 I want to go ahead and return a div call
10:09:13.960 connect like this. So let's go to the
10:09:17.436 call provider here and instead of
10:09:19.756 returning this let's return call connect
10:09:22.720 component which is a self-closing tag.
10:09:25.200 Make sure you have imported it and we
10:09:28.240 are now going to pass the meeting ID and
10:09:32.720 the meeting name the user ID and the
10:09:36.400 username which we get from data which we
10:09:39.596 use here in the use session. And finally
10:09:43.520 we are going to get the user image which
10:09:46.560 will look for data user image if it
10:09:48.640 exists otherwise it will generate one
10:09:51.040 using our generate avatar using seed
10:09:53.840 data username and variant initials.
10:09:57.520 Great. So now we can go inside of the
10:09:59.840 call connect and we can continue
10:10:01.916 developing here.
10:10:04.720 So now we should actually go ahead and
10:10:07.680 go back inside of the stream
10:10:09.040 documentation but this time go inside of
10:10:11.276 react documentation here and we have to
10:10:14.800 go ahead and install uh stream io video
10:10:19.596 react SDK. So let me go ahead and copy
10:10:22.080 this. Let me expand this a little
10:10:25.480 bit. Clear and let me add d- legacy here
10:10:30.480 depths like this.
10:10:33.276 Great. Once this is installed, let me
10:10:36.480 immediately show you my package JSON so
10:10:39.756 you can see the version. The version is
10:10:42.640 just in case you can't get your uh your
10:10:46.240 doesn't work. So you you think it's the
10:10:48.400 version. Well, this is the version I'm
10:10:50.000 using. So you can always install this
10:10:51.680 directly and then try with that version.
10:10:54.480 Now let's focus on the call connect
10:10:57.200 component. So in here we're going to
10:10:59.916 import the following items from stream
10:11:04.480 io video react SDK calling state stream
10:11:08.160 call stream video and stream video
10:11:11.000 client. We are also going to add import
10:11:15.200 loader icon from lucid react. We are
10:11:18.640 going to import use effect from react
10:11:20.880 and use
10:11:22.360 state from react.
10:11:25.596 And we're also going to add use DRPC
10:11:29.680 from TRPC
10:11:31.400 client. And we are also going to need to
10:11:35.120 import the last import needs to be
10:11:38.640 stream io video react SDK
10:11:42.436 dists
10:11:44.200 style.css. So that's how you style the
10:11:46.640 components of stream. And we are later
10:11:49.276 going to modify some of the variables to
10:11:51.520 match our theme, our project theme.
10:11:55.436 uh and also let's import use
10:11:58.596 mutation from tanstack react query and
10:12:02.640 mark this as use
10:12:04.436 client. Now let's go ahead and use all
10:12:07.276 of these props to establish our call. So
10:12:11.520 let's add TRPC from use DRPC here and
10:12:15.276 let's extract mutate async and let's map
10:12:18.560 it to
10:12:19.640 generate token use mutation and pass in
10:12:24.480 TRPC meetings generate token with
10:12:28.080 mutation options
10:12:30.200 here. Now open up the use state with the
10:12:34.160 first argument client, second one set
10:12:36.880 client and use state and give it a type
10:12:41.040 of stream video
10:12:44.200 client. Now open up the use effect
10:12:48.916 here. Set the empty dependency array for
10:12:51.916 now and let's do the following. Create
10:12:55.040 the underscore client variable simply
10:12:57.680 because client is already taken using
10:13:00.160 new stream video
10:13:03.320 client inside of API
10:13:06.276 key. Go ahead and add our process
10:13:10.120 environment next public stream video API
10:13:13.320 key. Please be mindful and go inside of
10:13:16.080 your environment and just copy it from
10:13:18.480 here. Make sure it has the next public
10:13:20.240 prefix so it's accessible on the client.
10:13:22.240 Copy it from here and paste it here. And
10:13:25.436 now let's add the user. So ID is user
10:13:28.400 ID, name is username and image is user
10:13:32.560 image. And we have made it convenient
10:13:35.360 for us. So all of these are just props.
10:13:38.560 Great. And let's add the token provider
10:13:40.640 for the user training to join which will
10:13:42.720 be this mutate asynchronous function. So
10:13:45.756 let's just pass it here. And you will
10:13:47.520 see it's completely compatible. Perfect.
10:13:51.120 And then let's go ahead and do set
10:13:53.680 client to this newly created client like
10:13:57.276 that. And in the unmount method, we have
10:14:00.480 to call this established
10:14:03.000 underscoreclient and disconnect the user
10:14:05.596 and set the client back to
10:14:09.800 undefined. And now let's go ahead and
10:14:12.000 let's add all the dependency array
10:14:15.040 items.
10:14:16.800 user ID, username, user image, and
10:14:19.840 generate token. So now we will have
10:14:22.240 access to that generated client inside
10:14:24.880 of this state and we will be able to
10:14:26.640 pass it around and do whatever we want
10:14:28.400 with
10:14:29.960 it. Now that we have established our
10:14:33.200 stream video client, we have to
10:14:35.360 establish the actual call. So we're
10:14:37.596 going to do a pretty similar thing
10:14:39.436 starting with the use state call and set
10:14:41.840 call with the type of call which we
10:14:43.916 imported from stream io video react
10:14:47.240 SDK and then let's go ahead and let's
10:14:50.320 open a new use effect which will check
10:14:53.880 if we don't have the client. So if we
10:14:58.000 don't have a client set we cannot
10:15:00.000 initialize the call at all. So simply
10:15:02.240 return at this point and then we're
10:15:04.800 going to create underscore call using
10:15:07.400 client call. The type of call will be
10:15:10.640 default and meeting ID will be the
10:15:13.880 identifier. Let's go ahead and by
10:15:16.436 default disable the camera for this user
10:15:20.480 and by default disable the microphone
10:15:23.916 for this
10:15:26.120 user. And let's set call underscore
10:15:29.640 call. And now in the unmount function we
10:15:32.880 have to disconnect from the call but
10:15:35.276 only under certain conditions. If
10:15:37.520 underscore call state calling state is
10:15:41.756 not identical to calling
10:15:46.680 state. Then you can do underscore call
10:15:50.520 leave and underscore call and call and
10:15:55.200 set call to
10:15:57.160 undefined like this. And inside of the
10:15:59.680 dependency array, add the client and
10:16:02.240 meeting ID like that. And now let's go
10:16:06.560 ahead and let's check if at this point
10:16:09.360 we still uh don't have client or we
10:16:13.596 still don't have a call. We're just
10:16:16.160 going to do the same thing we did in the
10:16:17.756 call provider and return this type of
10:16:21.680 loader here. So let me just indent uh my
10:16:24.880 items here a bit. There we go.
10:16:28.800 Perfect. So this this will be the loader
10:16:33.276 while all of these is being set up here
10:16:36.240 the call and the client. And now finally
10:16:38.560 in the return instead of a div we can
10:16:40.640 render stream video with client being
10:16:45.320 client inside of here stream
10:16:50.596 call with call being call. And now
10:16:56.000 inside of here, let's just see what we
10:16:58.240 have left unused. Meeting name. Okay. So
10:17:01.360 what we have to add now is the call
10:17:04.756 UI
10:17:06.276 element. Let's go ahead and go inside of
10:17:08.640 components and let's create call UI
10:17:12.680 tsx. Inside of call UI, let's create the
10:17:16.400 props which are meeting ID and the
10:17:19.360 meeting name. Actually, we don't need
10:17:22.320 meeting ID, just the name. Let's export
10:17:24.960 const call call
10:17:27.400 UI. Let's assign the props, the
10:17:30.720 structure, the meeting
10:17:33.480 name. And inside of here, we're going to
10:17:37.200 go ahead and do the following. The first
10:17:39.120 thing we can actually do is since the
10:17:41.436 call UI is rendered inside of these two,
10:17:44.960 we can use hooks to get the current
10:17:47.916 state of the call. So let's go ahead and
10:17:51.436 let's import the
10:17:54.360 following. Let's import stream and use
10:17:58.080 call from stream io video react
10:18:01.320 SDK. And let's also import the following
10:18:04.720 use state from react like this. Now
10:18:08.800 let's go ahead and let's obtain the call
10:18:11.360 from use call and let's create the
10:18:14.720 following use
10:18:16.360 state show and set show and the types
10:18:20.400 can be lobby call or ended with the
10:18:24.320 default being lobby and now let's create
10:18:28.160 two methods one is handle join which is
10:18:31.756 going to be an asynchronous method if
10:18:34.320 there is no call we are going to break
10:18:36.080 this method and let's just do a way call
10:18:38.960 and join the call. And after that, we
10:18:41.276 can set show to an active
10:18:43.880 call. And let's do handle
10:18:46.916 leave to check if there's no call and
10:18:49.680 break the method as well. And do call
10:18:51.756 end call and set show to ended. So we
10:18:56.400 now have methods to start the call from
10:18:58.560 the lobby and to leave the call from the
10:19:01.040 actual well call. Let's go ahead and
10:19:04.720 return stream theme with a class name of
10:19:08.960 height pool. And now if show is equal to
10:19:13.800 lobby, we should go ahead and render
10:19:16.840 lobby. If show is equal to call, we
10:19:20.560 should render the call. And if it is
10:19:23.640 ended, we should render
10:19:26.756 ended. So let's go ahead now and let's
10:19:29.840 use call UI inside of the call connect.
10:19:32.480 So, let's add it here. And meeting name
10:19:35.680 is meeting name like
10:19:39.640 this. So, I'm going to go back to my app
10:19:43.120 here and I'm going to do a refresh and
10:19:46.320 let's just see what will happen. You can
10:19:48.560 see I am in the lobby. It's very hard to
10:19:50.880 see. You have to highlight it, right? Uh
10:19:53.756 because we set our background to be
10:19:56.160 black. But you can see the text is now
10:19:59.840 the text now says lobby because I'm in
10:20:01.916 the lobby by default. So now let's go
10:20:04.400 ahead and let's create the lobby
10:20:07.120 component. Inside of components add call
10:20:12.596 lobby.tsx. And in here we're going to go
10:20:15.276 ahead and do the following props on
10:20:19.480 join. And let's go ahead and prepare the
10:20:22.240 following imports here. So that's going
10:20:25.200 to be login icon from lucid react and
10:20:28.160 we're going to have a bunch of imports
10:20:30.000 from stream io video react SDK dream
10:20:34.000 default video placeholder stream video
10:20:36.400 participant toggle audio preview button
10:20:39.200 toggle video preview button use call
10:20:41.680 state hooks and video preview. We are
10:20:44.000 basically now building this page right
10:20:46.080 here, the lobby, asking the user if they
10:20:48.320 are ready to join and giving them an
10:20:50.240 option to set up their video camera and
10:20:54.596 microphone. Let's also go ahead and
10:20:56.880 import link from next link. Let's go
10:21:00.960 ahead and
10:21:02.596 import al client from lib al client
10:21:06.240 button from components UI button and
10:21:08.480 generate avatar URI from our newly
10:21:10.720 created lib. And let's also import the
10:21:14.560 styles here as well. So stream io video
10:21:18.560 react sdk this css styles CSS like that.
10:21:23.840 Now let's go ahead and let's export
10:21:26.320 const call
10:21:28.360 lobby in here. Let's destructure on
10:21:31.960 join props.
10:21:34.640 And now we can go ahead and we can
10:21:38.120 grab camera state and microphone state
10:21:41.200 from use call state
10:21:43.560 hooks. From these two hooks, we can d
10:21:47.680 the structure has browser permission for
10:21:50.240 both of them. But since they are named
10:21:52.160 the same, we will alias this one to has
10:21:54.880 microphone permission and this one to
10:21:56.960 has camera permission. And we're going
10:21:59.360 to unify that into a single variable has
10:22:01.916 browser media permission. So if we
10:22:03.680 don't, we can then display to the user
10:22:05.680 that they need to allow the browser to
10:22:08.080 access the camera and the microphone. So
10:22:10.800 now let's go ahead and return a div here
10:22:13.680 with a class name flex flex column items
10:22:17.756 center justify center height full
10:22:21.680 background radial from sidebar accent to
10:22:26.240 sidebar. Inside, open up a new div with
10:22:29.756 a class name py of 4, px of 8, flex,
10:22:34.880 flex one, items center, and
10:22:39.560 justify
10:22:41.400 center. Inside of that div, let's open
10:22:44.720 one more div with a class name of flex.
10:22:48.240 Lex column items center justify
10:22:53.720 center gap Y 6 BG background rounded
10:22:59.436 large padding of 10 and shadow
10:23:03.080 small. Inside of
10:23:05.560 here we are going to add one more div. I
10:23:08.960 know this is divception. So many divs.
10:23:11.436 Uh but we will finally write some text
10:23:13.360 inside of this one. I promise. So flex
10:23:15.840 flex column
10:23:17.800 gap Y2 and text center. Let's add an H6
10:23:22.720 element ready to join. And let's add a
10:23:28.596 paragraph. Set up your call before
10:23:32.200 joining. Now let's go ahead and give the
10:23:34.720 heading a class name of text large and
10:23:37.276 font medium and the paragraph a class
10:23:40.480 name of text small.
10:23:43.596 Now let's go ahead and go back instead
10:23:45.840 of call UI and let's actually render
10:23:48.720 call lobby here and the only thing it
10:23:52.320 accepts is the onjoin method. So let's
10:23:55.596 pass in on join to be handle join. So
10:24:00.640 there we go. This is what you will see
10:24:03.040 now. Let's
10:24:04.756 refresh. Ready to join. Set up your call
10:24:07.916 before joining. And now instead of call
10:24:10.880 lobby, we actually have to go ahead and
10:24:14.080 render the video preview. So in order to
10:24:18.480 render the video preview, uh we have to
10:24:21.596 create the following a const disabled
10:24:25.596 video
10:24:27.160 preview. And in here the structure the
10:24:31.916 data from out client use
10:24:35.400 session and return default video
10:24:39.040 placeholder which is a self-closing tag
10:24:41.840 and inside add the participant prop.
10:24:45.360 Open a new object inside set the name to
10:24:48.720 data question mark user name or an empty
10:24:52.276 string. image will
10:24:55.960 be
10:24:57.480 data question mark user
10:25:00.596 image or generate avatar URI with seed
10:25:06.160 data question mark user name or an empty
10:25:10.080 string and let's just open an object
10:25:13.240 here like this and we also need to pass
10:25:17.200 the variant here to be initials like
10:25:20.596 this and in order to get rid of the
10:25:23.120 error use as stream video participant
10:25:26.960 prop
10:25:27.880 here like this. So now we have the
10:25:31.120 disabled video preview here and we need
10:25:34.160 uh just one more thing one more
10:25:36.000 component besides disabled video preview
10:25:38.320 and it's very simple one allow browser
10:25:40.880 permissions just a simple paragraph
10:25:44.000 please grant your browser a permission
10:25:45.916 to access your camera and microphone.
10:25:49.276 And now outside of this div add a video
10:25:52.960 preview
10:25:54.680 component and pass in disabled video
10:25:57.916 preview to be the following. If has
10:26:00.560 browser media
10:26:02.756 permission you will
10:26:04.756 use disabled video preview otherwise
10:26:08.560 allow browser permissions like this. And
10:26:13.120 there we go. Since by default my uh
10:26:18.000 camera is disabled, you can only see my
10:26:21.040 current user's image which is Google
10:26:23.596 login. So Google image is loaded here.
10:26:26.400 Perfect. So it's correctly loads the
10:26:28.480 currently logged in user here. Now below
10:26:31.756 the video preview, let's add a div with
10:26:34.560 a class name of flex gap x2. And inside
10:26:38.960 of here, we are going to render toggle
10:26:42.640 audio preview button and toggle video
10:26:45.436 preview button. There we go. And now
10:26:48.720 let's go ahead below here. Open up a div
10:26:51.680 with a class name
10:26:54.200 flex gap x of justify between and full
10:26:59.520 width. In here, let's add first button
10:27:03.680 to be cancel and the second button to be
10:27:08.480 join call with login
10:27:12.360 icon. This one will also be a
10:27:16.436 link with an href going back to meetings
10:27:20.080 and give this an as child prop and a
10:27:22.320 variant of ghost. the one below will
10:27:26.240 simply have on click to be on join. And
10:27:30.800 just like that, we've wrapped up our
10:27:33.120 call lobby method. So, we can now cancel
10:27:36.240 and go back to the meetings or we can go
10:27:39.276 to uh make sure you choose the newer
10:27:41.680 one, right? So, delete any old ones you
10:27:44.000 had because uh there's a chance it might
10:27:46.800 not work because we only in this chapter
10:27:49.040 added the call creation in the create
10:27:51.276 procedure. So, use the newest one and
10:27:54.560 click start meeting. And there we go.
10:27:56.880 And when you click join call, uh I don't
10:28:00.000 do it just yet because uh I'm not sure
10:28:02.960 what's going to happen, but what will
10:28:05.596 happen is you will just see a paragraph
10:28:07.680 call which will actually be invisible.
10:28:09.916 Right? So now let's actually develop the
10:28:14.000 uh call
10:28:15.480 active for this. So inside of components
10:28:19.596 create
10:28:23.480 call-active.tsx. Let's create the
10:28:25.436 interface with on leave and the meeting
10:28:28.040 name. And let's import the following
10:28:31.120 things. Link from next link image from
10:28:34.000 next image call controls and speaker
10:28:36.560 layout from stream io video react SDK.
10:28:40.560 export const call
10:28:42.916 active get on leave and meeting name
10:28:48.000 assign it to props
10:28:50.040 here and let's go ahead and return a div
10:28:54.320 with a class name flex flex column
10:28:58.040 justify between padding for height full
10:29:02.640 and text white and inside open up a new
10:29:05.840 div with a class name of background and
10:29:10.000 You can use the following hex
10:29:12.436 code and a rounded pool adding four flex
10:29:17.880 items center and gap four like that.
10:29:22.800 Inside add a link
10:29:26.596 element like this with an href of
10:29:30.640 forward slash and give it a class name
10:29:32.880 of plex items center justify center
10:29:36.720 padding one background white forward
10:29:39.596 slash 10 rounded full and w fit and
10:29:44.640 render an image with a source of
10:29:49.320 our app logo with
10:29:53.320 width 22 and height 22 and alt
10:29:58.040 logo and then after that an H4 element
10:30:02.560 with our meeting name and a class name
10:30:06.720 of text
10:30:08.360 base and outside of that div speaker
10:30:11.756 layout which is a self-closing tag and
10:30:13.756 below that a div with call
10:30:16.436 controls. Go ahead and give it a
10:30:19.040 background the same as above. So class
10:30:21.596 name
10:30:22.360 here and rounded full and px of
10:30:27.480 four and let's pass our on leave method
10:30:30.960 to call controls on leave and let's add
10:30:34.560 our on leave here. There we go. So now
10:30:38.400 we can go back to the uh call UI and in
10:30:42.960 here render call active just like we
10:30:46.560 rendered uh call lobby and let's pass on
10:30:49.916 leave to be handle
10:30:53.160 leave and we also need the meeting name
10:30:56.960 and I think we have that we do meeting
10:30:59.560 name let's go ahead and try it out now
10:31:02.160 so when I click join call there we go
10:31:06.320 and I can go ahead and send emojis here.
10:31:09.680 I can uh open my camera again. Here I
10:31:12.400 am. Uh and you can see that I have the
10:31:15.680 meeting name rendered right here. And
10:31:17.596 you can see the meeting is actively
10:31:19.200 being recorded. I can also share my
10:31:21.120 screen. You can see my connection here.
10:31:23.360 And I can also end the call. But before
10:31:26.480 we end the call, let's actually
10:31:29.120 implement the end screen so we can wrap
10:31:31.040 up this chapter.
10:31:33.436 So what we can actually do is we can
10:31:35.200 copy call lobby and paste it and rename
10:31:37.756 it to call ended. Go inside of call
10:31:41.120 ended here. You can remove all props.
10:31:43.680 You can remove this component. You can
10:31:45.840 remove allow browser permissions. Rename
10:31:48.000 call lobby to call ended. Remove any
10:31:50.640 props from here. Uh you can remove this.
10:31:53.276 You can remove this. Basically remove
10:31:55.596 everything besides link and
10:31:58.436 button. So just a return method here.
10:32:01.596 And inside of this heading six uh
10:32:04.000 heading six you will use you have ended
10:32:07.680 the call. And in the
10:32:10.680 summary in the in here you will add
10:32:13.596 summary will appear in a few minutes.
10:32:16.640 And then outside of this div there will
10:32:18.400 be no video preview none of this. Right?
10:32:21.596 So let's go ahead and remove this. Let's
10:32:24.560 remove
10:32:25.800 this and let's remove this as well. So
10:32:29.360 all you're going to do after
10:32:31.400 this is back to meetings button because
10:32:35.200 there will be no action to do here. So
10:32:37.040 now we can go back to call UI and we can
10:32:39.916 render call ended here just like that.
10:32:44.800 So now that we have all of these states
10:32:46.800 when I actually end the call this
10:32:49.436 appears you have ended the call. So we
10:32:53.200 have officially implemented the video
10:32:55.756 calling. The problem is states are not
10:32:58.960 being changed. So I can now start this
10:33:01.680 meeting as many times as I want and join
10:33:04.320 it and end it. Right? But we have two
10:33:06.640 problems. Agent is not joining and uh no
10:33:10.640 actual background jobs are being done
10:33:12.800 and there is no communicating with our
10:33:14.640 database. So that's what we're going to
10:33:16.080 do in the next chapter to properly
10:33:18.080 synchronize those states. But we did
10:33:20.400 such an amazing job. We obtained stream
10:33:23.040 API keys, stream video SDK. We've
10:33:25.596 created these procedures. We added call
10:33:27.756 page and call view. And now let's merge
10:33:31.960 this. Let's go and create a new branch
10:33:35.040 here. 22 video
10:33:38.120 call. Let's go ahead and stage all of
10:33:41.756 our
10:33:42.680 changes. Just like that. 22 video call.
10:33:46.960 Let's commit. Let's publish our branch.
10:33:50.640 And let's review our pull request to see
10:33:54.480 if there are any potential issues with
10:33:57.276 our
10:33:58.756 code. And here we have this chapter's
10:34:01.756 summary. We introduced video call
10:34:03.840 functionality including joining,
10:34:05.756 participating in, and ending calls with
10:34:08.000 a streamlined user interface. This
10:34:10.320 includes a pre-join lobby, in call
10:34:12.640 controls, and a post call summary
10:34:14.720 screens for a complete meeting
10:34:16.320 experience. We integrated video call
10:34:18.800 service for secure token generation and
10:34:21.040 user management. We automatically
10:34:23.360 created and managed video calls when
10:34:25.360 scheduling meetings and we display user
10:34:27.596 avatars and meeting details throughout
10:34:29.596 the entire call experience. As always,
10:34:33.120 in here we have a sequence diagram
10:34:35.596 containing every single component that
10:34:38.720 we just created in this request. This is
10:34:41.596 absolutely insanely detailed. Uh, in
10:34:44.800 case you're interested, I'm just going
10:34:46.400 to try and target it, center it like
10:34:49.680 this, so you can take a look and review
10:34:52.240 this entire diagram explaining exactly
10:34:54.640 what's going on in our code. As per the
10:34:57.596 code changes, most of these are refactor
10:35:00.000 suggestions which we have already seen,
10:35:01.840 but we decided that we like our current
10:35:04.000 practice. But there are a couple of
10:35:06.160 potential issues that I want to discuss.
10:35:08.240 So this one is because it doesn't know
10:35:10.480 yet that headers are now awaitable. they
10:35:13.040 are a promise. Same with the params. So
10:35:15.680 we are okay with this. This is not an
10:35:17.520 issue. Uh this is a refactor suggestion.
10:35:21.040 And in here it shows some u JVT payload
10:35:26.160 fields are incorrect. Token may be
10:35:27.960 invalid. As you can see in here it uh
10:35:31.436 tells me that my tokens might be
10:35:33.200 invalidly created. uh and I'm not
10:35:37.276 entirely sure but what I can tell you is
10:35:40.640 that I went into video and audio
10:35:42.960 platform here user tokens and I uh
10:35:46.320 learned that validity and basically
10:35:49.040 everything besides user ID is completely
10:35:51.840 optional. So yeah, technically in our
10:35:54.560 procedures in the meetings when we
10:35:57.276 generate the
10:36:00.120 token, we don't even have to use these
10:36:04.160 two. We can just pass. You can see there
10:36:07.520 there are no errors here. So if you want
10:36:09.436 to if it's causing you any problems, if
10:36:11.756 it's expiring too soon, you can delete
10:36:14.080 these two fields and this generation and
10:36:16.240 just use the user ID. So that's the new
10:36:18.320 thing I've learned here thanks to uh
10:36:20.880 rabbit's potential issue. Uh with the
10:36:23.596 rest I am satisfied. So I'm going to go
10:36:25.680 ahead here and merge this pull request.
10:36:29.520 And that marks the end of this chapter.
10:36:31.680 Let's go back to the main branch. And
10:36:34.160 let's go ahead and synchronize our
10:36:36.360 changes. Let's go inside of the source
10:36:39.436 control. Open up the graph and confirm.
10:36:42.000 We just merged the video call. And we
10:36:45.276 did. Great. Amazing job and see you in
10:36:48.000 the next
10:36:49.560 chapter. In this chapter, we're going to
10:36:52.160 learn how to connect the agent to our
10:36:54.560 video call. Let's start by obtaining the
10:36:57.840 OpenAI API key, which you can do by
10:37:00.960 visiting
10:37:03.800 platform.openai.com, or you can use the
10:37:05.680 link in the description to let them know
10:37:07.360 you came from this video. After that, go
10:37:10.400 ahead and log in or create an account.
10:37:13.040 If it's your first account, you will
10:37:14.800 most likely have to create an
10:37:16.436 organization. And as per project, you
10:37:18.720 can use the default project. Now, go
10:37:21.360 inside of your
10:37:23.160 settings. Once you are in your settings,
10:37:25.680 go inside of billing and confirm you
10:37:27.840 have sufficient credit balance. Five or
10:37:30.640 $6 will be more than enough for you to
10:37:32.800 complete this project. And after that,
10:37:35.040 go inside of API keys and click create
10:37:37.360 new secret key. I'm going to call this
10:37:40.000 meet AI. Select the default project with
10:37:42.480 all
10:37:43.400 permissions. Let's go ahead and copy our
10:37:45.840 key inside of your IDE. Make sure you
10:37:48.640 are in the default project. Go inside of
10:37:51.200 environment here and set open AAI API
10:37:54.400 key to be your newly copied key. The
10:37:58.240 next step we have to do is set up enrock
10:38:01.200 to expose our local host so webco
10:38:03.680 handlers can communicate to it. So head
10:38:06.880 to angrock.com and create an account or
10:38:10.320 you can simply use the link in the
10:38:11.756 description to let them know you came
10:38:13.360 from this video. Once you create an
10:38:15.436 account, you will see a welcome screen
10:38:17.200 like this. In here, select your
10:38:19.680 operating system and simply follow the
10:38:22.560 installation
10:38:23.800 method. And once you've added your
10:38:26.000 token, go ahead and try running this
10:38:29.120 command right here. In order to properly
10:38:32.080 test it, first make sure you have your
10:38:34.080 app running on localhost 3000 and after
10:38:36.880 that change the command to target well
10:38:39.436 localhost 3000. This will generate the
10:38:42.640 following forwarding URL using HTTPS
10:38:46.840 protocol. So now when you paste that
10:38:49.520 inside of your URL, you will be able to
10:38:52.080 see your project's login screen, meaning
10:38:55.120 that our project is now accessible
10:38:57.596 through this URL right here.
10:39:00.480 The only problem with this is every time
10:39:03.200 that you run this
10:39:05.240 command, a new URL will be generated and
10:39:08.800 that's quite difficult to work with. So
10:39:11.520 what Enro offers is a static domain. If
10:39:15.120 you can't find it here, you can click
10:39:16.720 inside of domains here and then find it
10:39:18.880 down
10:39:19.800 here. And then you can find start a
10:39:22.480 tunnel button and you can copy this
10:39:25.400 command. So
10:39:27.320 now you can go ahead and run the
10:39:30.120 following which basically adds your
10:39:33.120 static URL here and change the port to
10:39:36.120 3000. So what happens now is every time
10:39:38.800 you run this command you will have your
10:39:41.680 own static URL. There we go. Our app is
10:39:45.120 accessible through that URL. Keep in
10:39:47.680 mind that it's not intended to access
10:39:50.160 our app through that URL. You shouldn't
10:39:52.320 use that to share your app with someone
10:39:54.240 else. we will have a deployment for that
10:39:56.800 because this will cause many things to
10:39:58.640 fail. The only thing we need this for is
10:40:02.160 web hooks. So what I want to do now is I
10:40:05.360 want to go inside of my package JSON
10:40:07.400 here and I want to add dev web hook
10:40:11.400 command and I simply want to run
10:40:15.800 this. This is the command I want to
10:40:18.916 run enro http and then your static URL.
10:40:23.840 So now every time you're starting your
10:40:26.040 project in one terminal simply type mpm
10:40:29.436 rundev and in another mpm rundev web web
10:40:32.756 hook. As simple as
10:40:35.240 that. So now that we have that let's go
10:40:38.560 ahead and let's set up stream web hook
10:40:41.200 handler. So, the first thing you're
10:40:43.360 going to have to do is just copy your
10:40:45.120 URL, your uh static domain URL, and go
10:40:49.916 inside of stream dashboard, specifically
10:40:52.880 video and audio, and click on
10:40:55.240 overview. In here, go ahead and scroll
10:40:57.916 down until you find web hook URL, and
10:41:00.880 paste it here. Make sure it includes the
10:41:03.276 proper protocol
10:41:04.916 HTTPS. So, you can visit that here,
10:41:07.840 right
10:41:08.680 here. and change this to be forward
10:41:11.360 slash API slash web hook. Make sure to
10:41:15.436 not misspell it. And for the events you
10:41:18.240 want to listen to, uh we won't be
10:41:20.720 needing all of these, but feel free to
10:41:22.800 leave all of them selected so it's
10:41:24.640 easier to develop right now. Just make
10:41:26.800 sure you have all of them selected
10:41:28.320 regarding call. And after that, make
10:41:31.200 sure you click submit. Perfect. So now
10:41:35.040 let's go ahead and let's actually build
10:41:37.436 the endpoint. So we are going to do it
10:41:39.840 in the place we just added API web hook.
10:41:42.560 So inside of source app folder API
10:41:45.360 create a new folder called web hook and
10:41:48.080 inside of here
10:41:50.120 route.ds. Inside of this route let's
10:41:52.560 prepare by adding the following imports
10:41:54.960 from stream io node SDK. We are going to
10:41:58.320 use all of them uh except message new
10:42:00.880 event for now. So these are the events
10:42:03.040 we are interested in for this chapter.
10:42:05.680 Now let's go ahead and let's also add
10:42:08.400 the following from drizzle and equals
10:42:12.480 and not and let's also import next
10:42:16.640 request and next response from next
10:42:19.000 server. Then we are going to import our
10:42:22.596 database. We are going to import agents
10:42:25.120 and meetings from database schema. And
10:42:27.596 we are going to import stream video from
10:42:29.840 lib stream video. What we have to do now
10:42:33.360 is develop a method to verify the
10:42:35.596 signature for whoever is trying to
10:42:37.840 access this web hook because this will
10:42:39.680 not be protected via our AL. Instead, it
10:42:42.800 will be protected via a signature. So we
10:42:46.320 adding a function called verify
10:42:48.400 signature with SDK which accepts the
10:42:50.560 body and the signature and calls stream
10:42:53.200 video util verify web hook using the
10:42:56.000 body and the signature. Now let's export
10:42:59.040 asynchronous function post with request
10:43:02.480 next request
10:43:03.880 here. And what we have to do now is we
10:43:06.480 have to obtain two
10:43:08.680 headers signature and API key from
10:43:11.680 request headers get and then their
10:43:14.080 respective header names. If you want to,
10:43:17.360 you can also use the next headers
10:43:21.640 import just in case you're using some
10:43:24.080 newer version and this becomes outdated
10:43:26.640 even though it shouldn't because this is
10:43:28.560 the native Node.js API. So if you want
10:43:31.756 to this will also work. You can also
10:43:33.756 await headers and then do headers.get
10:43:36.240 the same way just in case you were
10:43:38.520 interested. Now let's go ahead and check
10:43:41.120 if any of these are missing and if they
10:43:43.200 are throw an error. Now in order to
10:43:46.960 verify our signature we have to turn the
10:43:49.756 body of this request into a string. We
10:43:52.400 can do that by using await
10:43:54.756 request.ext and then we can do a final
10:43:57.880 check. If verify signature with SDK
10:44:01.360 including our body and the signature
10:44:03.680 failed meaning put an exclamation point
10:44:05.916 here we throw back an error meaning you
10:44:08.720 don't have access for this endpoint. Now
10:44:12.400 let's define our payload to be unknown
10:44:14.800 and let's attempt to uh parse the string
10:44:18.800 which we just created here. So we are
10:44:21.200 attempting to parse it and if we fail to
10:44:24.000 parse it, it means it's not a valid
10:44:26.160 JSON. So we can't work with it. And then
10:44:30.080 after we successfully parse it, let's
10:44:32.240 prepare a constant event type. We have
10:44:35.040 to assign the payload to be a type of
10:44:36.960 object and then simply extract type from
10:44:39.916 it. And now we can finally check if
10:44:42.800 event type is one of our events that we
10:44:46.276 need. The first one will be call session
10:44:50.360 started. But before you do any
10:44:52.560 development in here, what I want you to
10:44:54.880 do is I want you to go outside of this
10:44:56.880 if clause and simply return a success
10:44:59.040 message at the end. because otherwise
10:45:01.360 all other events which did were not
10:45:03.756 handled would be throwing an error and
10:45:06.000 that would eventually cause stream to
10:45:08.000 stop sending our web hook any events. So
10:45:11.596 make sure to add that. Great. Now let's
10:45:15.360 go ahead to our call session started
10:45:18.840 here and let's add two things. The first
10:45:21.840 one will be event payload with a type of
10:45:24.240 call session started event which we
10:45:26.276 imported from here from stream io node
10:45:29.040 SDK and then we destructure the meeting
10:45:31.520 ID from event call custom meeting ID.
10:45:35.120 Make sure to put a question mark here.
10:45:36.720 So what is custom? If you remember in
10:45:39.360 our meetings procedures when we do the
10:45:42.520 create we do await call create and we
10:45:46.000 add the custom fields here meeting ID
10:45:48.480 and meeting name. So that's how we
10:45:50.720 access the meeting ID here even though
10:45:53.680 it's a web hook with no meeting
10:45:55.840 information. So that's why we needed it.
10:45:57.840 And we can actually remove this to-do
10:45:59.360 text. Now we fixed that. Now in here we
10:46:03.200 have to check if we don't have a meeting
10:46:05.276 ID because then we can just throw the
10:46:08.360 error. What we have to do now is we have
10:46:11.040 to find an existing meeting under
10:46:12.960 certain conditions. First of all
10:46:14.640 including the matching meeting ID. So
10:46:17.360 existing meeting await database select
10:46:19.680 from meetings where the matching meeting
10:46:22.880 ID is found but also we have to ensure
10:46:26.080 that it's its status is not completed or
10:46:29.596 active right. Uh and we can also add if
10:46:32.800 it's not
10:46:34.200 cancelled. So under no circumstances uh
10:46:37.596 should we find this meeting. The only
10:46:39.916 one we should actually look for is
10:46:41.436 upcoming. So if you want to you can
10:46:43.200 actually set equals
10:46:45.800 meeting status upcoming right or you can
10:46:50.160 simply use the the reverse values if you
10:46:52.400 want to be
10:46:53.320 explicit. Great. Now let's go ahead and
10:46:56.320 let's throw an error here if that kind
10:46:59.840 of meeting was not found. And
10:47:01.596 immediately what I want to do here is
10:47:04.320 update this meeting to a status of
10:47:06.880 active just in case this fires twice
10:47:10.880 because I found some rare cases where
10:47:13.040 that can happen especially if it's been
10:47:15.120 errored and then it may be retrieded. So
10:47:17.596 it's important to update the meeting
10:47:20.720 status to active as soon as possible
10:47:23.596 because what we're going to do now is
10:47:25.520 connect the agent. So if this event
10:47:28.080 accidentally fires multiple times, it
10:47:30.240 will connect multiple agents which is
10:47:32.080 not good, right? So that's why we
10:47:35.040 immediately set it to active. So if even
10:47:37.436 if it fires next time, this will fail,
10:47:40.960 right? Because in here we explicitly say
10:47:44.080 that it must not be
10:47:46.840 active. And you can also add not
10:47:50.400 processing here. There we go. So now we
10:47:53.276 explicitly add all uh states that we
10:47:55.596 don't want to have access to or you can
10:47:57.436 use the reverse and just target the
10:47:59.200 upcoming ones. Uh great. So now what we
10:48:03.120 want to do is we want to find the
10:48:05.436 existing agent for this meeting that we
10:48:08.160 just updated. So existing agent using
10:48:10.320 agents ID not match existing meeting
10:48:12.880 agent ID. If such an agent does not
10:48:16.400 exist, we throw an error. And now we can
10:48:20.960 connect to the stream video call using
10:48:23.360 the exact same method as we did in our
10:48:25.276 create procedure here. So now that is
10:48:27.040 the same instance. And before we go any
10:48:29.756 further, we now have to install a
10:48:31.596 package for open AAI agent to connect.
10:48:35.436 So I'm just going to shut this down and
10:48:37.520 I will do mpm install
10:48:40.520 stream-io openai realtime API- legacy
10:48:44.640 pure deps. And I will do mpm rundev
10:48:48.480 here. And just make sure you have your
10:48:50.320 webc running web hook running here. And
10:48:53.120 then inside of my package json, I will
10:48:55.200 stream simply show you all of my stream
10:48:57.360 versions just in case yours keep failing
10:48:59.916 and you don't know why it might be due
10:49:01.680 to newer versions. So you can always use
10:49:04.320 the exact same versions as I do if you
10:49:06.560 prefer doing so. Let's go ahead now uh
10:49:09.916 and let's actually connect the agent.
10:49:13.596 So we're going to do that by adding a
10:49:15.916 realtime client to be await stream
10:49:19.080 video connect open AI pass it the call
10:49:22.800 instance and then pass it open AI API
10:49:25.596 key to be process environment open AAI
10:49:28.160 API key always double check this by
10:49:30.800 copying it copying it from your
10:49:32.720 environment and pasting it here the
10:49:35.120 agent user ID will be existing agent do
10:49:38.560 ID right here perfect so now let's also
10:49:43.200 update the session for this real-time
10:49:45.320 client. Just be very very careful here.
10:49:49.120 This is not yet typed. So you can add
10:49:52.080 anything here and it will not throw
10:49:54.000 errors. So be very very careful to
10:49:56.640 correctly type this update session
10:49:59.040 instructions existing
10:50:01.640 agent.instructions like that. And that
10:50:04.320 is it. That's all we need for connecting
10:50:06.800 the agent to our uh
10:50:10.120 call. But before we test it out, let's
10:50:13.520 add one more event here. So let's do
10:50:15.756 else if event type is call session
10:50:18.640 participant left. So if anyone leaves
10:50:21.120 the call, first of all, let's establish
10:50:23.520 this to be the payload type call session
10:50:27.200 participant left event which we imported
10:50:30.000 and let's get the meeting ID. The only
10:50:32.640 problem is in here we need to use a
10:50:34.960 special way to obtain a meeting ID. We
10:50:37.360 can't do it the same way as in here
10:50:40.240 because there is no call event here
10:50:43.040 because this is a participant event,
10:50:46.000 right? So inside of the payload here, uh
10:50:49.360 you won't really have you can see you
10:50:51.520 have call C ID but you don't have the
10:50:54.080 call ID. So you have to access the
10:50:56.720 meeting ID like this. And if you're
10:50:58.560 wondering why that format, it's because
10:51:01.200 it's formatted as type and then colon
10:51:04.000 and then the ID. So that's why we need
10:51:06.560 it like that. But in case we cannot find
10:51:09.120 the meeting ID, throw an error and then
10:51:12.560 let's go ahead and connect to the call
10:51:14.560 again. So just as we did here above and
10:51:17.596 what we are going to do is we're going
10:51:19.436 to end the call. So the reason we are
10:51:22.400 doing this is as a fail safe just in
10:51:25.360 case uh so we don't leave our agents
10:51:28.000 hanging in the call too long and they
10:51:30.400 increase your usage on stream. So I
10:51:33.360 think we are now ready to test this out.
10:51:35.756 If you want to, you can comment out
10:51:37.120 these three events so you don't have any
10:51:39.120 errors here. And make sure you have your
10:51:42.080 local host running. Make sure you have
10:51:43.840 your angro running. And now what I
10:51:46.560 highly suggest that you do is first of
10:51:48.720 all clear all of your meetings. So I'm
10:51:51.360 going inside of my neon tables meetings
10:51:53.680 here and I have deleted all of my
10:51:55.916 meetings here and make sure to create
10:51:58.560 new meetings. You can ignore the fact
10:52:00.240 that one of mine is active. I was
10:52:01.916 testing it out. So, let's go ahead and
10:52:03.916 create a new one, math consultations.
10:52:06.240 And I created an agent, math tutor. And
10:52:09.200 I will click create
10:52:11.560 here. And just to show you this new
10:52:14.080 agent of mine, what instructions it has.
10:52:16.960 So, I just added you're a helpful math
10:52:19.040 assistant. That's it. And now I will
10:52:21.756 click start meeting here. And then I'm
10:52:25.120 going to click join call. And this will
10:52:27.840 fire an event. And as you can see, math
10:52:30.240 tutor has joined the call. And you can
10:52:33.276 see it immediately starts recording. Now
10:52:35.200 I'm going to ask it a question. What is
10:52:38.160 1 + 1?
10:52:42.880 1 + 1 = 2. Now, I don't know if you're
10:52:46.560 hearing the answer, but it's actually
10:52:48.480 telling me the answer. Perfect. So now
10:52:51.756 what I'm going to do is I'm going to go
10:52:53.520 inside of my Neon console and just
10:52:55.276 refresh my meetings. And this should now
10:52:58.080 have a status of active. And it does.
10:53:01.480 Perfect. Uh, and now what we can do here
10:53:05.756 is we can just end this call and go back
10:53:08.640 to meetings here. And you can see it
10:53:10.880 still says active. And that's fine
10:53:13.360 because we don't yet have a event which
10:53:16.640 will turn it into processing or
10:53:18.720 completed. So it's completely fine that
10:53:20.400 it still says active. And in here you
10:53:22.800 should now see this kind of screen here.
10:53:25.680 Amazing. amazing jobs. So, that's
10:53:27.436 exactly what I wanted us to do uh in
10:53:29.916 this chapter and we're going to leave
10:53:31.520 the rest in the next chapter when we
10:53:34.160 actually add some background jobs to
10:53:36.160 process what we just had. So, let's go
10:53:38.640 ahead and merge this now. So, I'm going
10:53:40.880 to go ahead uh and create a new branch
10:53:44.000 23 connecting
10:53:48.596 agents and I will stage all of my
10:53:51.960 changes. 23 connecting agents. Let's
10:53:55.916 commit and let's publish the
10:53:58.276 branch. And now let's go ahead and let's
10:54:01.756 review our code. I am just focused on
10:54:05.120 any potential issues or
10:54:07.640 bugs. And let's look at this chapter's
10:54:10.560 summary. So we introduced some new
10:54:12.320 features including a web hook endpoint
10:54:14.400 to handle video call events, enabling
10:54:16.400 real-time updates to meeting status and
10:54:18.400 agent integration. And we also added a
10:54:21.200 development script for web hook testing
10:54:23.436 and updated dependencies to support
10:54:25.596 realtime OpenAI
10:54:27.720 integration. In here we have the
10:54:29.840 sequence diagram explaining exactly what
10:54:32.080 happens in our web hook. So once the
10:54:34.000 event is hit, we validate the headers
10:54:36.160 and the signature parse JSON body and
10:54:38.480 event type and in the event call session
10:54:41.120 started. We find the meeting ID, fetch
10:54:43.756 the agent, and then we connect that
10:54:46.000 agent to the call and initialize
10:54:48.000 real-time client with agent
10:54:49.596 instructions. And when the participant
10:54:51.596 leaves, we end the call session.
10:54:54.596 Perfect. In here, it actually recommends
10:54:57.520 using an environment variable instead of
10:54:59.916 hard-coded text. And honestly, I didn't
10:55:02.080 even know you can do this. So, if you
10:55:04.320 want to, feel free to change it to an
10:55:05.840 environment variable like this. You
10:55:07.916 learn new things every day. Uh in here
10:55:11.360 it suggests wrapping our web hooks
10:55:13.596 inside of a try and catch. Um we might
10:55:16.160 look into that after we've wrapped up
10:55:17.680 the entire web hook event. And in here
10:55:20.800 it suggests already updating the
10:55:22.640 meeting. So it's very aware of our
10:55:24.640 codebase. It knows that we expect the
10:55:26.960 status completed and ended at at some
10:55:29.360 point. So it's super impressive how it
10:55:31.360 knows our schema. But this is not the
10:55:34.080 place to do that. Completed is a status
10:55:36.560 that will be handled differently in
10:55:39.116 here. another try cache suggestion and
10:55:41.276 I'm satisfied with our code. So let's go
10:55:43.436 ahead and merge it. And once you've
10:55:45.756 merged it, go back into your main branch
10:55:48.640 and go ahead and hit synchronize
10:55:51.080 changes. And then you should see the new
10:55:53.840 branch 23 merged to your project.
10:55:57.436 Amazing amazing job and see you in the
10:55:59.756 next
10:56:01.320 chapter. In this chapter, we're going to
10:56:03.840 implement background jobs into our
10:56:06.000 project. Let's start by completing these
10:56:09.680 three web hook events from our previous
10:56:12.640 uh web hook implementation. So right now
10:56:15.436 I don't have anything running and I am
10:56:18.160 on my main branch. I'm going to go
10:56:20.800 inside of source app API web hook route.
10:56:24.480 DS and the first thing I want to add is
10:56:27.436 call session ended. So let's go ahead
10:56:31.200 and add an else if here.
10:56:35.116 event type is equal to call session
10:56:39.160 ended and inside of here I want to get
10:56:43.200 the event as call ended event which we
10:56:46.080 can now uncomment as well as these two
10:56:49.520 and we can get the meeting ID from call
10:56:52.480 custom because this is a call event this
10:56:55.200 was a session participant event so
10:56:57.276 that's why we had to do a different way
10:56:59.360 of grabbing the meeting ID but in here
10:57:01.436 we can use our custom field and check if
10:57:03.680 it's missing and throw an error. And if
10:57:06.640 it is uh actually finished and we have
10:57:10.000 the meeting ID, we can go ahead and
10:57:12.160 update that meeting to be processing and
10:57:14.960 give it the ended at date and only do
10:57:18.720 that if we have a matching meeting ID
10:57:21.756 and the meeting status is active. So in
10:57:24.160 case this fires twice, we don't want to
10:57:26.880 add new ended at date here. We can only
10:57:29.680 do it once. So we are only doing it for
10:57:32.640 a meeting which was currently set to
10:57:35.116 active and now it's set to
10:57:37.720 processing. So that's one event down.
10:57:40.720 Now let's do transcription ready and
10:57:42.880 call recording ready. So let's start
10:57:45.840 with the transcription ready event. Else
10:57:49.276 if event
10:57:51.240 type is equal to this. So in here we
10:57:55.756 have to do the same thing. get the event
10:57:58.480 payload as call transcription ready
10:58:00.720 event and get the meeting ID using the
10:58:02.720 call C ID and split because of the
10:58:05.276 specific format here and then in here
10:58:08.480 we're going to go ahead and we are going
10:58:11.116 to update the meeting with the new
10:58:14.160 transcript URL. So updated meeting and
10:58:18.480 set transcript URL to be event call
10:58:22.276 transcription dot URL where we have a
10:58:25.360 matching meeting ID here. And then I'm
10:58:28.160 going to add to-do call ingest
10:58:31.436 background job to summarize the
10:58:35.320 transcript like that. So what we can do
10:58:38.400 here for now is check if there is no
10:58:40.800 updated meeting and then we can uh
10:58:43.520 simply throw an error like we did in the
10:58:46.880 previous
10:58:48.840 instances. Meeting not found. And let's
10:58:52.800 do a 404
10:58:55.080 here. And let's go ahead and do one more
10:58:58.916 event. So we can actually copy
10:59:01.360 everything from here. And let's do else
10:59:04.040 if event
10:59:06.040 type is
10:59:10.200 call.recording
10:59:12.276 ready. You can go ahead and paste
10:59:14.400 everything inside of here. And this will
10:59:16.400 be the call recording ready event.
10:59:19.840 Meeting ID will be accessed the same
10:59:21.680 way. And in here you won't have to
10:59:24.640 actually return this at all. Just go
10:59:27.596 ahead and update and set the new call
10:59:30.080 recording URL. So these events will only
10:59:33.756 fire the call recording ready and the
10:59:36.160 transcription ready if in the meeting
10:59:39.960 procedures you enabled the transcription
10:59:43.116 to be auto on and recording auto on.
10:59:47.116 Otherwise these events will not fire at
10:59:50.080 all. So what I suggest you do now is go
10:59:53.116 inside of your neon console tables
10:59:55.276 meetings here uh and delete all of your
10:59:58.640 meetings. Make sure you have a clean
11:00:00.880 slate here. Then go ahead and do npm
11:00:04.640 rundev and npm rundev web hook. So you
11:00:08.960 have a web hook running. Now let's go
11:00:11.680 ahead and refresh and I'm going to
11:00:13.200 create a new uh meeting
11:00:16.116 here. Okay. So I just created a new
11:00:19.116 meeting and I'm going to start the
11:00:21.200 meeting and I will have just a quick
11:00:23.116 conversation with uh the math tutor
11:00:26.400 which should join any second.
11:00:29.756 And now that it has answered my
11:00:31.596 question, I will simply end the call and
11:00:34.640 I will go back to meetings here. And you
11:00:36.640 can see that now this is actually set to
11:00:39.320 processing because it actually captured
11:00:42.640 my call session ended and it set it to
11:00:46.080 processing here. And what should be
11:00:48.640 happening now is I should be receiving
11:00:51.436 my transcription ready and recording
11:00:54.480 ready events. And I should be able to
11:00:57.040 see that in here if it's finished. I can
11:01:00.320 see the transcript URL and the recording
11:01:03.040 URL. So in the transcript URL here, you
11:01:06.000 can see what we talked about, right? And
11:01:09.116 in the recording URL, you will be able
11:01:12.000 to see uh the actual recording of the
11:01:16.240 event. Perfect. So both of these are
11:01:18.560 actually working. Looks like we have uh
11:01:20.800 successfully created recording ready and
11:01:23.276 transcription ready events.
11:01:26.480 Now that we have finished all of our web
11:01:29.040 hook events, let's go ahead and let's
11:01:31.520 implement a proper background job by
11:01:34.480 configuring inest. So you can use the
11:01:36.800 link in the description to let them know
11:01:38.880 you came from this video. And now let's
11:01:41.596 go ahead and let's go inside of
11:01:43.640 documentation get started. You won't
11:01:45.840 even need to create an account. So let's
11:01:47.596 go inside of Next.js here. Make sure you
11:01:50.800 select the app router. So in here I
11:01:53.436 already have my app running. So no need
11:01:55.520 to do that. But let's go ahead and let's
11:01:57.436 install
11:01:58.756 inest. So I'm just going to go ahead and
11:02:01.200 do that here. And I will just add legacy
11:02:04.240 here dep so it doesn't fail with the
11:02:09.000 installation. Now that I have installed
11:02:11.436 it, let me show you the version. So
11:02:15.560 337.0 just for your information. And now
11:02:18.720 let's run the ingest dev server. So I'm
11:02:22.000 going to go ahead here and I will have
11:02:24.240 it running the same way I have my web
11:02:26.720 hooks running. So alongside mpm rundev I
11:02:29.596 have my web hook running and now I will
11:02:31.840 have inest cli
11:02:34.680 dev. So if it asks you to upgrade feel
11:02:38.000 free to upgrade to use the latest
11:02:39.596 version. This is the version I'm using
11:02:41.200 for this tutorial. You can also specify
11:02:43.596 that version here if you want
11:02:45.800 to. And immediately upon running this uh
11:02:49.276 you will see that it is actually
11:02:50.960 scanning my localhost 3000 for any kind
11:02:54.400 of ingest functions. And you can see how
11:02:56.560 my npm rundev has a bunch of 404s
11:03:00.000 because we haven't added any functions
11:03:02.640 yet. But what you can do now is you can
11:03:04.960 visit localhost
11:03:06.916 8288. Let me go ahead and paste that
11:03:10.160 here so you can see it. Let me go all
11:03:12.320 the way down.
11:03:14.720 So you can go to localhost
11:03:17.160 8288 and you can actually see the ingest
11:03:20.160 dev server and inside of here you will
11:03:23.040 see all the functions that we create and
11:03:25.200 all the steps and background jobs that
11:03:27.116 we will we will be able to run. So now
11:03:30.160 let's go ahead and let's actually create
11:03:32.160 a background
11:03:33.720 job. For that we can simply follow the
11:03:37.680 uh documentation. So let's just go back
11:03:41.320 here. After we run this, let's go ahead
11:03:44.320 and let's create the ingest client. So
11:03:47.680 I'm going to close everything here. I'm
11:03:49.116 going to go inside of source and I will
11:03:50.480 create a new folder called ingest like
11:03:53.916 that. And inside I will create a
11:03:56.596 client.ts. And I will paste this inside.
11:03:59.916 And I will call this meet AI 2 simply
11:04:03.200 because I already named one meet AI. So
11:04:05.916 I don't want any conflicts just in case.
11:04:08.960 After that, let's go ahead and create an
11:04:11.360 API folder with the ingest route. So,
11:04:14.720 this server will actually be able to
11:04:16.560 find it and it won't have to scan for
11:04:19.480 404s. Let's go inside of app API. Let's
11:04:22.400 create a new ingest folder. And inside,
11:04:25.116 let's create a
11:04:26.360 route.ts. And let's go ahead and copy
11:04:29.596 this. And let's paste it inside. And I
11:04:32.480 will just change this to use our uh at
11:04:35.756 sign. There we go. So make sure to put
11:04:38.000 it inside of API inest
11:04:40.680 route.ts. It needs to be called inest.
11:04:43.276 And finally you can now see this npx
11:04:46.640 inest cli is hitting the correct uh
11:04:50.000 route here. So it finally found inest in
11:04:52.560 our project. And now let's go ahead and
11:04:55.116 let's write our first function here. So
11:04:57.840 I'm going to go inside of ingest and
11:04:59.520 create
11:05:00.436 functions.ts. And I will paste the hello
11:05:02.880 world function here. And I will import
11:05:05.116 this from ingest client. So it will be
11:05:08.800 called hello world here. And you can see
11:05:11.436 it accepts some data. It even waits for
11:05:14.480 a
11:05:15.800 second. Now that we have this defined,
11:05:19.040 we're going to have to add this back to
11:05:21.360 our route. So let's go inside of the
11:05:24.160 route here. U and my apologies, the
11:05:28.000 functions.ts DS files should be created
11:05:31.116 in inest folder here next to the client,
11:05:34.880 not in the API route. My apologies for
11:05:38.240 that. So the API inest should just have
11:05:41.040 a route and the actual source inest
11:05:44.240 should have the functions. Now let's go
11:05:46.320 inside of the ingest route and inside of
11:05:48.240 here let's add our hello world from
11:05:51.360 ingest functions. And immediately upon
11:05:54.160 doing that, if you go inside of your
11:05:56.960 local host 3 uh not 3000 but
11:05:59.880 8282, you will see in the functions a
11:06:03.116 hello world function. And in here you
11:06:05.520 can invoke it and you can pass email to
11:06:08.480 be
11:06:10.116 hello@mail.com and click invoke this
11:06:12.480 function. And you can see you now have a
11:06:15.040 run here which first waits for 1 second
11:06:18.640 and then says hello and your email. So
11:06:22.480 that's how these background jobs will
11:06:24.640 work. But ex instead of triggering them
11:06:27.276 from this dashboard, we are going to
11:06:29.116 trigger them from actual code and they
11:06:31.436 will simply work in the background. You
11:06:33.840 won't have to await it. You can tell
11:06:35.436 your user to log out and they can take a
11:06:37.596 walk and this will still be completed
11:06:40.480 without them. That's the power of
11:06:42.800 background jobs. you don't have to worry
11:06:44.800 about them timing out or erroring
11:06:47.116 because these individual steps will
11:06:49.360 retry themselves until they succeed or
11:06:52.480 until you put a limit on retries. So now
11:06:55.840 that we have established this, we can go
11:06:58.960 ahead and we can actually
11:07:02.000 uh create everything we need. So let's
11:07:04.560 create our own uh inest function now. So
11:07:08.640 the way we're going to do that is by
11:07:11.040 going back inside of the functions here
11:07:13.276 in the ingest and let's remove the hello
11:07:15.360 world function and instead we are going
11:07:18.720 to add export const meetings processing
11:07:22.240 to be
11:07:23.560 ingest.create function. The ID will be
11:07:26.960 meetings
11:07:28.916 slprocessing and the event will be
11:07:32.480 meetings forward
11:07:35.400 slashprocessing and then we're going to
11:07:37.276 have an asynchronous function which
11:07:39.116 destructures the event and the
11:07:42.360 step and inside we're going to start
11:07:44.960 defining the steps we need to process
11:07:46.880 our meeting.
11:07:49.596 Now the first step here will be to fetch
11:07:53.436 event data transcript URL. That's
11:07:56.240 because if you go inside of our web hook
11:07:59.000 route when we call transcription ready
11:08:02.840 here we added a to-do call the ingest
11:08:06.480 background job to summarize the
11:08:08.080 transcript. So at the point that this
11:08:10.160 function is called we will have this
11:08:12.960 stored inside of the updated meeting. So
11:08:16.080 we are going to pass that along here as
11:08:18.560 transcript URL and we can use inest
11:08:21.720 step.fetch as an optimized way to fetch
11:08:24.560 in a background job. So no matter how
11:08:27.040 long this takes background job will take
11:08:29.680 care of it. You won't have to worry
11:08:31.116 about it failing or anything else. Now
11:08:34.240 what we have to do is we have to parse
11:08:36.800 this because this is currently in JSON L
11:08:40.320 format. So it's not exactly workable
11:08:42.880 with in JavaScript by default. So what
11:08:45.276 we have to do is we have to add mpm
11:08:48.320 install jsonl l parse stringify and
11:08:52.080 let's add legacy pier deps
11:08:54.916 here once it's installed you can exit
11:08:58.800 and let's go ahead and import it
11:09:01.320 here jsonl from jsonl parse stringify
11:09:06.480 and in here what we're going to do is
11:09:08.720 call this a transcript and do await
11:09:11.480 steprun and this will be a custom that
11:09:15.040 called parse transcript like that. Let's
11:09:18.720 open up an asynchronous method here. And
11:09:21.840 first things first, let's go ahead and
11:09:24.160 await the response which we just fetched
11:09:26.400 above and turn it into a text. And then
11:09:28.880 we will simply return JSON L parse and
11:09:32.560 pass in the text like this. The only
11:09:36.080 problem is currently we don't really
11:09:38.400 know the type that is waiting for us.
11:09:42.560 But thanks to this JSON LS uh JSON L
11:09:45.840 parse function, we can actually add the
11:09:48.080 type. So let's go inside of our modules.
11:09:50.800 Let's go inside of meetings. And let's
11:09:52.240 go inside of types. And down here, I'm
11:09:55.200 going to add a new type called stream
11:09:57.520 transcript item including speaker ID,
11:10:00.240 type text, start, and stop. How do I
11:10:03.200 know that these are the ones I
11:10:05.880 need? Because of our transcript uh URL,
11:10:10.800 right? So I just visited my previous
11:10:12.880 transcript URL which we demonstrated to
11:10:15.116 confirm it's working. And in here you
11:10:16.720 can see speaker ID start timestamp top
11:10:20.000 stop timestamp type and text. So that's
11:10:23.520 why I know that those are the things I
11:10:25.596 need. So inside of here I can now append
11:10:28.960 stream transcript item from modules
11:10:32.080 meetings types like this. And now when I
11:10:35.436 hover over a transcript you can see
11:10:37.200 exactly what I expect inside. Perfect.
11:10:40.480 Now the problem is uh I can't really do
11:10:43.756 much just by having speaker ids. We need
11:10:46.720 to populate them and connect them to the
11:10:48.560 users from our
11:10:50.436 database. Quick interruption from future
11:10:53.436 me. Just a heads up. Right now we're
11:10:56.720 using step.fetch fetch and this works
11:10:59.840 fine locally during development but once
11:11:03.360 we deploy which will happen in a few
11:11:05.400 chapters this line will break in
11:11:08.480 production causing a malformed JSON
11:11:12.116 object. The fix though is very very
11:11:15.916 simple. All we have to do is modify from
11:11:19.040 step
11:11:20.436 fetch to this. basically calling your
11:11:24.560 normal fetch inside of a
11:11:28.116 step. And then chain then and turn the
11:11:33.436 response into text. The problem now is
11:11:37.116 that we also have to modify this line.
11:11:40.000 But that's not a problem either. Instead
11:11:42.480 of using the response.ext here in this
11:11:46.680 step, we're just going to go ahead and
11:11:49.276 parse it and do nothing more. So this is
11:11:52.960 what I would suggest you change your
11:11:55.436 code to. Even though the code will
11:11:58.800 switch back to the old version once I
11:12:01.200 unpause this interruption, I recommend
11:12:04.320 using this updated version going forward
11:12:07.916 to avoid any issues later on. All right,
11:12:11.680 now back to the current
11:12:15.240 timeline. So let's add another step
11:12:18.080 called transcript with speakers.
11:12:20.320 step.run run add speakers. And inside of
11:12:23.840 here, the first thing we're going to do
11:12:25.840 is we're going to establish all the ids
11:12:29.200 from our transcript. So, we're going to
11:12:31.436 be using a set to avoid any duplicates.
11:12:34.800 So, all of them will be under speaker
11:12:37.276 ID. And you can see how thanks to this
11:12:39.360 type here, we have strict typing here.
11:12:42.160 So, we don't make a mistake. Just double
11:12:44.080 check that you actually have speaker ID
11:12:46.080 here. You can find it here in your
11:12:48.160 meetings. just find a recording or
11:12:50.320 transcript URL to check. Great. Now,
11:12:53.436 let's go uh back to our app here. And
11:12:56.480 once we have speaker ids, let's go ahead
11:12:59.680 and let's get all user speakers because
11:13:03.596 half of them will be agent speakers. So,
11:13:07.116 user speakers will need a database. It
11:13:10.080 will need the user schema. It will need
11:13:13.200 in array from Drizzle OM. So make sure
11:13:16.320 you have imported the database user
11:13:18.880 schema and Drizzle
11:13:22.040 OM. Great. Now that we have all of
11:13:25.520 these, we have the user speakers and we
11:13:27.360 can now do the exact same thing but for
11:13:30.160 the agent speakers, but instead of
11:13:32.960 calling users, we are calling agents
11:13:35.756 here. So make sure you've added the
11:13:38.000 agents schema. Perfect. And now let's
11:13:41.840 unify them all together in a constant
11:13:44.320 called speakers. So we are combining the
11:13:47.040 user speakers and the agent speakers
11:13:49.400 here. And we are going to return
11:13:52.916 transcript.m mapap get the individual
11:13:55.680 item here. And now we are going to
11:13:58.080 attempt to find the matching speaker ID
11:14:01.200 with all of these speakers combined. So
11:14:03.680 we are going to load uh something either
11:14:06.240 an agent or a
11:14:07.880 user. And then if we don't find any
11:14:11.640 speaker, we are just going to return
11:14:14.800 this existing transcript item and we're
11:14:17.200 going to set the username to be unknown
11:14:19.680 because we cannot find that user in our
11:14:22.276 database. Otherwise, let's return this
11:14:25.276 existing item. But we are appending the
11:14:27.680 user object with the proper speaker
11:14:29.756 name. So we know exactly who was
11:14:32.480 speaking at that time. Perfect. And that
11:14:35.680 is our job for actually adding the uh
11:14:40.880 adding the speakers to the
11:14:43.560 transcript. Now we have to build an
11:14:46.240 agent here. So uh inest has their own
11:14:49.840 agent kit which we can implement and
11:14:52.080 then use as a step. So we can actually
11:14:55.360 connect open AI to ingest. But in order
11:14:58.880 to do that, we first have to go to uh
11:15:01.436 our assets repository here and find
11:15:05.040 system prompt. You can use the link in
11:15:06.880 the description to find this and go
11:15:08.400 ahead and simply copy this entire
11:15:10.240 prompt. Now go to the top of your
11:15:12.640 meetings processing function here and
11:15:14.720 create a
11:15:16.520 summarizer and give it a create agent
11:15:19.596 function and you can import create agent
11:15:22.800 from another package that we have to
11:15:24.640 install. So let's just do that. npm
11:15:26.800 install inest agent kit legacy pier
11:15:31.240 deps. So after it's installed, let's go
11:15:34.480 back here and let's import create agent,
11:15:38.000 open AI and text message all from ing
11:15:40.400 inest agent kit. Inside of the create
11:15:43.200 agent here, give it a name of
11:15:45.640 summarizer. Again, give it a system
11:15:48.320 prompt of the following. Open backpix.
11:15:51.360 And now you will simply copy the system
11:15:54.080 prompt and paste it here.
11:15:56.480 And then go ahead and simply add dot
11:15:59.040 trim here and add a
11:16:01.960 model. And in here add open AI. And we
11:16:06.320 imported this from here. Right? So open
11:16:09.360 AI model. Choose whichever model you
11:16:12.960 want. I'm going to choose 4 O and API
11:16:16.960 key will be
11:16:18.916 process.vironment open AI API key.
11:16:22.080 Always double check. Make sure it's the
11:16:24.640 proper one. There we go. Uh, perfect.
11:16:28.320 So, we now have this, which means that
11:16:30.960 we can now actually summarize this. So,
11:16:33.916 after transcript with
11:16:36.200 speakers, we can go ahead and create
11:16:39.040 another step using await
11:16:42.360 summarizer.run, give it summarize the
11:16:44.560 following transcript, and then use JSON
11:16:47.400 stringify transcript with speakers
11:16:50.320 because we now have them with speakers
11:16:52.240 here.
11:16:53.360 And once you actually have the output,
11:16:55.916 you're going to add one more
11:17:01.160 step. And add save summary asynchronous
11:17:06.596 method and await database.
11:17:10.240 Update meetings and set the summary here
11:17:15.200 to be output first in the array as text
11:17:19.520 message which is our type we imported
11:17:22.240 from inest agent kit dot content as
11:17:26.360 string and set the status to completed
11:17:30.040 finally and only do that where our
11:17:33.756 meetings ID uh matches the event data
11:17:37.840 meeting ID. be mindful. Uh, oh yes,
11:17:40.880 let's import meetings from database
11:17:42.480 schema. My apologies. And let's import
11:17:44.480 equals from Drizzle OM. So, make sure
11:17:47.756 you have added meetings here. And, uh,
11:17:50.240 equals from Drizzle OM. Make sure you
11:17:53.040 don't misspell the event data meeting ID
11:17:55.756 because this can be anything. It's not
11:17:57.596 strictly typed. Same goes with uh, event
11:18:01.360 data transcript URL.
11:18:04.960 All that's left to do now is go back
11:18:07.116 inside of our web hook here, find the
11:18:10.080 call transcription ready, remove the
11:18:12.960 to-do here, and do await ingest, which
11:18:16.480 you can import from ingest
11:18:20.436 client dot send name will be meetings
11:18:25.800 processing. So just make sure you don't
11:18:27.916 misspell it. You can copy it from here
11:18:30.320 and then paste it here. and data and
11:18:34.560 simply pass in the meeting ID and the
11:18:39.200 transcript URL from this updated meeting
11:18:42.160 which we've had right here. Perfect. And
11:18:45.756 we must not forget to now go inside of
11:18:49.520 API inest route and instead of hello
11:18:52.320 world add meetings processing here. And
11:18:56.160 you can confirm you've done it correctly
11:18:57.916 by going inside of your functions here.
11:19:00.160 Let's go ahead and refresh. and you now
11:19:01.840 have the meetings processing. Uh, but if
11:19:05.276 you try it with this data, it will just
11:19:07.116 fail. So, the best way to test this out
11:19:10.480 is to go ahead and have a new meeting.
11:19:13.680 So, that's what I'm going to try out
11:19:15.960 now. So, I just started math
11:19:18.480 consultations 3 and I will simply ask a
11:19:20.800 question here and then we're going to
11:19:22.720 look if any runs will start
11:19:25.596 automatically here.
11:19:28.560 I'm now going to end the call which will
11:19:31.680 now trigger the processing mode for that
11:19:35.116 consultations here and it will also wait
11:19:37.756 for the web hook to hit and once the web
11:19:40.400 hook hits you can see that we run the
11:19:43.116 meetings processing function. So the
11:19:45.756 first step was to fetch the transcript
11:19:48.240 URL which you can see right here worked.
11:19:51.916 It has the speaker ID here and
11:19:54.160 everything. Then we parse the
11:19:55.916 transcript. So we turn it into JSON.
11:19:58.560 Then we add the usernames. So this is me
11:20:02.240 John Doe and this is math tutor. So we
11:20:04.480 use the speaker ID to find that. And
11:20:06.960 then finally we used chat GPT to
11:20:10.400 summarize the transcript. And you can
11:20:12.400 see that we have the content result
11:20:14.160 here. And we saved that summary. And now
11:20:18.000 if I refresh my database here, I should
11:20:20.800 see a summary text inside of here. And I
11:20:24.880 will also see the status to be
11:20:27.276 completed. So if I go back here, this
11:20:29.680 now finally says completed. And you can
11:20:31.596 also see we have proper duration here.
11:20:34.160 Amazing. Amazing job. So we now have
11:20:37.200 everything ready uh to display the last
11:20:40.320 components for this app. So now let's
11:20:42.800 review and merge this pull
11:20:44.840 request. I'm going to go ahead and open
11:20:47.840 a new
11:20:48.916 branch. 24 background jobs. Once I'm in
11:20:53.200 a new branch, I'm going to stage all of
11:20:55.360 my changes and I will write a commit
11:20:59.240 message. Let's commit and let's publish
11:21:01.756 the
11:21:03.000 branch. And now let's review our pull
11:21:10.360 request. And here we have the summary.
11:21:14.080 So what I'm interested in here is the
11:21:16.640 walkthrough. This update introduces
11:21:19.436 injust based eventdriven processing for
11:21:21.840 meeting transcripts, adds new
11:21:23.596 dependencies and expands web hook logic
11:21:26.000 to handle additional event types. We
11:21:28.320 implement a function for AI powered
11:21:30.240 meeting summarization and we update
11:21:32.080 database records accordingly. We also
11:21:34.400 introduced a new type for transcription
11:21:36.240 items and some minor formatting changes.
11:21:39.116 So this is basically the goal of this
11:21:41.276 chapter inest based eventdriven
11:21:44.160 processing background jobs. something
11:21:46.240 the user doesn't have to wait for and
11:21:48.480 something that we don't have to await or
11:21:51.436 uh be afraid that it will fail, right?
11:21:53.680 The user can take a walk, the user can
11:21:55.596 go away. That's the power of background
11:21:57.756 jobs. They can simply do whatever they
11:21:59.680 want while they wait. So once the web
11:22:02.720 hook reaches the proper uh event type,
11:22:05.680 we update the meeting status and fields
11:22:07.916 and we dispatch the meetings processing
11:22:10.080 event with meeting ID and the transcript
11:22:12.160 URL to ingest. After that, we meet we
11:22:15.436 trigger the meeting processing function
11:22:18.240 and we fetch the transcript URL and
11:22:21.040 speaker info. We then send the enriched
11:22:24.320 transcript to summarization to AI and we
11:22:26.960 return the summary and notes and finally
11:22:29.680 update and set it as completed. In here
11:22:32.960 we do have some uh recommendations and
11:22:36.000 this is not an uh uh an SD SDK does not
11:22:39.916 accept this kind of format. So it
11:22:41.680 actually gives you a suggestion even in
11:22:43.436 that case if agent kit doesn't support
11:22:45.756 this format at minimum use template
11:22:47.916 literal. So it's basically suggesting us
11:22:49.840 to use template literal instead of
11:22:52.400 joining like this basically to avoid
11:22:55.436 potential prompt injection. So if you
11:22:58.400 want to you can change this. I might
11:22:59.916 change it in the next chapter. And the
11:23:02.320 rest of the refactor suggest suggestions
11:23:04.400 are basically just error handling
11:23:06.160 suggestions which inest does a pretty
11:23:08.320 good job of just by itself. So, no need
11:23:10.480 to do any of that. We can just go ahead
11:23:12.720 and merge this pull request. And once
11:23:15.520 you've merged it, go back to main and go
11:23:18.080 ahead and synchronize the changes like
11:23:20.880 that. And now inside of your graph here,
11:23:23.360 you should see that you have merged 24
11:23:26.080 background jobs. That marks the end of
11:23:29.040 this chapter. Amazing job. And see you
11:23:31.596 in the next one.
11:23:33.840 In this chapter, we're going to go ahead
11:23:35.840 and implement the completed state with
11:23:38.160 the new summary which we generated in
11:23:40.400 the previous chapter using background
11:23:42.916 jobs. So let's go ahead into our project
11:23:45.680 and ensure that we are on the main
11:23:47.436 branch. Let's also make sure we are
11:23:49.520 running npm rundev rundev web hook and
11:23:52.880 npx inest cli. And then let's go ahead
11:23:56.560 to our meetings page. Once in the
11:23:59.840 meetings page, ensure that you have at
11:24:01.436 least one meeting with a completed
11:24:03.040 status. If not, have a new meeting and
11:24:05.756 wait for it to be completed. You will
11:24:07.916 know it's properly completed by going
11:24:09.916 inside of your database and confirming
11:24:12.000 that at least one of them has a summary
11:24:14.560 like
11:24:15.560 this. And now let's implement the
11:24:18.000 completed
11:24:19.880 state. Let's go inside of meeting ID
11:24:23.680 view and let's find the is completed
11:24:26.160 which renders the completed text. Let's
11:24:28.560 replace it with completed state and pass
11:24:30.480 in the data which is our use suspense
11:24:32.800 query data. Now let's create the
11:24:35.596 completed state inside of components.
11:24:38.160 Create completed state
11:24:40.756 dsx. Let's export con completed state
11:24:43.840 right here. And let's go ahead and let's
11:24:46.720 create the interface
11:24:48.680 for let's import meeting get one from
11:24:52.080 our types which are located in the
11:24:54.560 meetings module. Right here we have
11:24:56.640 meeting get one. And now in here we can
11:24:59.596 go ahead and destructure the props and
11:25:01.436 grab our data right here. Now let's go
11:25:04.960 ahead and let's return a
11:25:07.400 div with flex flex column and gap y of
11:25:11.800 four. Let's go ahead and add semicolons
11:25:15.200 here. And let's import the completed
11:25:17.480 state so we can actually render it. And
11:25:20.320 you should have no errors with the
11:25:21.680 types. When you refresh, nothing should
11:25:24.160 be visible in your completed meeting
11:25:25.840 because we haven't rendered any text
11:25:28.436 yet. Now, let's go ahead and let's
11:25:30.880 import everything we need from our
11:25:33.040 components UI scroll area and components
11:25:35.596 UI tabs. So, we haven't used tabs yet,
11:25:38.400 but you have them inside of your source
11:25:40.400 components UI tabs. We've added that as
11:25:43.040 well as scroll area when the initialize
11:25:45.680 chats UI. Now, let's go ahead inside of
11:25:49.436 here. And the first thing we're going to
11:25:51.276 do is activate the tabs like this with
11:25:54.000 the default value of summary. Then
11:25:56.400 inside of the tabs we are going to add a
11:25:58.720 div with a background of white rounded
11:26:01.360 large border and px of three. Then we
11:26:04.720 are going to open the scroll area and
11:26:06.400 inside we are going to render the scroll
11:26:08.240 bar. The scroll bar will have an
11:26:10.480 orientation of horizontal. Now, inside
11:26:13.436 of the scroll area, let's go ahead and
11:26:15.436 let's open the tabs list component with
11:26:18.160 class name padding zero, bg background,
11:26:20.960 justify start, rounded none, and height
11:26:23.840 of 13. Now, inside of here, let's add
11:26:27.116 the tabs trigger component. And let's
11:26:30.240 render an
11:26:32.680 icon book open text icon, which you can
11:26:35.680 import from Lucid React. Make sure to
11:26:38.000 add that. And let's give the tabs
11:26:40.400 trigger a value of
11:26:43.320 summary. And now if you take a look at
11:26:45.916 your app, you will see the summary tab
11:26:48.400 right here. Now let's go ahead and let's
11:26:50.800 import actually all icons we need from
11:26:53.680 Lucid React. So that will be sparklas
11:26:56.400 icon, file, text icon, book open text
11:26:59.116 icon, file, video icon, and clock fading
11:27:02.320 icon. Let me just move them to the top
11:27:04.756 here. And now let's go ahead inside of
11:27:07.916 this tabs trigger. And let's move this
11:27:11.596 down here because we're going to add a
11:27:13.596 pretty large class name here. So I'm
11:27:17.040 going to paste it here and I will you
11:27:19.840 can pause the video and copy it. So
11:27:22.160 basically text muted foreground rounded
11:27:24.640 none bg background. And now this is
11:27:27.320 important. Uh data state active and
11:27:31.040 shadow none are one class name, right?
11:27:33.436 So let me just temporarily remove this
11:27:35.596 so you can see this is how the class
11:27:38.160 name looks like. So whenever you write
11:27:39.840 data state active shadow none it's one
11:27:43.360 class name. It's just that I use uh this
11:27:46.400 collapse line uh settings which
11:27:49.200 collapses them. So if I zoom out you
11:27:51.436 will see that my data state active are
11:27:53.916 all in one line. So whenever you see
11:27:55.596 data state active just know that they
11:27:59.200 are supposed to be together with
11:28:00.880 whatever comes after the column like
11:28:03.436 this. Same is true for hover. Okay. So
11:28:08.240 after you've added this yours should
11:28:10.720 look like that. There we go. And now
11:28:13.756 we're going to go ahead and open uh copy
11:28:16.400 the taps trigger again. And the second
11:28:18.960 one will be transcript. And we're going
11:28:22.240 to use the file text icon and
11:28:26.680 transcript. And then we're going to have
11:28:29.436 the recording one. So I'm basically just
11:28:32.080 copying exactly uh as it is. All of them
11:28:35.596 have the same class names, right? Uh
11:28:37.840 this one will have file video icon and
11:28:39.916 the recording text and the value of
11:28:42.560 recording. And this one has the value of
11:28:44.400 transcript. And then the last one we're
11:28:46.960 going to
11:28:48.680 have is the chat value, sparkles icon,
11:28:53.276 and ask AI. So the class names are
11:28:55.916 identical in all of them. We are just
11:28:57.756 copying from the first one, changing the
11:29:00.000 icon value and the label inside. So now
11:29:03.360 you have the transcript, the recording,
11:29:05.116 and ask AI. And now we have to actually
11:29:08.480 create the content for each of these
11:29:10.880 tabs.
11:29:12.880 A pretty easy tab to make is the
11:29:15.116 recording tab. So, let's just go outside
11:29:17.200 of this div, but still inside of the
11:29:19.160 tabs.
11:29:21.160 Oops. And let's render tabs content with
11:29:24.320 value recording. Just make sure that it
11:29:26.880 matches the value here that you don't
11:29:28.400 have any typos. And the only thing we're
11:29:31.200 going to do is the following. We're
11:29:32.560 going to add a div with background white
11:29:34.560 rounded large and border. And then we're
11:29:37.436 just going to add some padding as well.
11:29:39.276 So let's just do that right here. px4
11:29:42.720 and py5. And the only thing we're going
11:29:45.360 to do is we're going to render a video.
11:29:48.320 So normal video and source data
11:29:50.880 recording URL with an exclamation point
11:29:52.880 because without it uh it can be
11:29:54.880 undefined. But we know that since is it
11:29:57.756 is in the completed state, it's always
11:29:59.840 going to exist. So we can safely just
11:30:01.436 put an exclamation point at the end uh
11:30:04.240 with full and rounded large. And let's
11:30:06.560 also add controls. And when you click on
11:30:08.400 recording now you will see the actual
11:30:10.560 recording uh that exists in the
11:30:12.800 recording URL here. Just one tip
11:30:16.040 recordings storage for recording and
11:30:18.400 transcription. These URLs here uh they
11:30:21.436 have an expiration date. They are
11:30:23.436 retained for 2 weeks before being
11:30:25.596 automatically deleted. But don't worry
11:30:28.160 if you want to keep them forever or just
11:30:30.160 not store them with stream. You can use
11:30:32.640 your own storage like Amazon, Google
11:30:35.116 Cloud or Asure. So go ahead and visit
11:30:38.320 video and audio, select platform and
11:30:40.880 recording storage and transcription
11:30:42.720 storage and follow the documentation to
11:30:44.640 add your own external storage if you
11:30:47.040 don't want this to expire. Great. So it
11:30:50.320 was that easy to add the tabs recording
11:30:52.640 and now we're going to go ahead and add
11:30:54.960 the summary
11:30:56.436 tab. Before we can implement the summary
11:30:59.436 tab, we have to install a package called
11:31:02.880 react markdown so we can properly render
11:31:06.400 our markdown because that's what we
11:31:08.160 instruct our assistant to do. So now
11:31:11.276 that we have that, let's go ahead and
11:31:13.360 let's make sure that we add an import
11:31:15.840 for markdown from React Markdown. Let's
11:31:19.200 also import link from next link. And
11:31:23.276 let's also import generated avatar from
11:31:27.040 components generated
11:31:29.960 avatar. Now let's go down there inside
11:31:33.040 of new tabs content. So I will add tabs
11:31:35.756 content here and I will give it a value
11:31:38.480 of summary and inside I will render a
11:31:41.436 div with background white rounded lg and
11:31:45.040 border. Then inside I'm going to render
11:31:48.160 another div with px4 py5 gap y5 flex
11:31:54.240 flex call and call span of five. Inside
11:31:58.560 I'm going to add an h2 element with text
11:32:01.200 to excel font medium and capitalize
11:32:03.596 rendering the data name. And you can see
11:32:05.916 that now when I click on summary I can
11:32:07.680 see this meeting's name. Just make sure
11:32:09.756 you didn't misspell the default value
11:32:11.840 the value in the trigger and the value
11:32:13.916 in the tabs content.
11:32:16.880 Below the meeting title, we're going to
11:32:19.200 end add the current agent that was
11:32:21.756 inside. So add a div with flex gap x2
11:32:24.880 and items center and add a link element.
11:32:28.960 We're going to give the link an href of
11:32:31.840 forward slash agents and then data agent
11:32:35.596 ID like this. And then let's go ahead
11:32:38.400 and give it a class name flex item
11:32:40.880 center gap x2 underline underline offset
11:32:44.240 4 and capitalize. And then inside of
11:32:47.360 this link let's render the generated
11:32:49.360 avatar which we imported previously with
11:32:52.160 variant bots neutral seed as the agent
11:32:55.040 name and class name size five. And below
11:32:57.840 it we can simply render the agent name
11:33:01.756 and then add an empty space after the
11:33:04.400 link here. And below that, let's go
11:33:07.276 ahead and let's add a paragraph to check
11:33:10.080 if we have started at. If we have it,
11:33:13.520 let's use format from date FNS. So, just
11:33:16.960 make sure you imported format from date
11:33:19.240 FNS. And you're going to
11:33:22.360 format data started at in this exact
11:33:26.596 format. So, there we go. Now, you can
11:33:29.276 see math tutor. And when I click on it,
11:33:31.360 it will take me directly to that meeting
11:33:33.596 here.
11:33:35.436 Now, below our agent here, outside of
11:33:39.200 this div, let's render a new div with
11:33:41.436 class name flex, gap x2, and item
11:33:44.240 center. Render our imported sparkles
11:33:46.720 icon. And oops, not this one. And render
11:33:49.520 the text general summary like this. And
11:33:52.960 then below that, let's go ahead and
11:33:54.960 let's add a badge from components UI
11:33:58.240 badge. And it's not going to be a
11:33:59.680 self-closing tag. So, make sure you just
11:34:01.436 added the badge from components UI
11:34:04.040 badge. Let's go ahead and let's give it
11:34:06.880 uh some attributes here. So, variant
11:34:09.200 outline and class name flex item center
11:34:11.756 gap x2 and target the SVG to give it
11:34:15.116 size 4. And inside of here, go ahead and
11:34:18.240 add it clock fading
11:34:21.400 icon. Now, let's go ahead and let's
11:34:23.840 revisit our columns for the meetings
11:34:26.640 here. And in here we have a function
11:34:28.720 format duration. Let's copy it and let's
11:34:32.000 add it inside of our lib and inside of
11:34:36.080 utils here. So after the function CN,
11:34:38.720 let's add export function format
11:34:41.520 duration and import humanize duration
11:34:44.080 from humanized duration because I want
11:34:46.000 to reuse it. So inside of my source
11:34:48.880 modules meetings components columns, I
11:34:51.916 no longer have to have it here. I can
11:34:54.960 instead go down to where I use it and
11:34:57.116 just import format duration from lib
11:35:01.080 utils right like that. That means I no
11:35:03.916 longer need this import. And there
11:35:06.400 should be no errors in your columns
11:35:08.320 here. Now go inside of the completed
11:35:10.560 state here and now below clock fading
11:35:13.276 icon. That's exactly what we're going to
11:35:15.276 do. So we're going to check if we have
11:35:17.276 the duration and then use our newly
11:35:19.756 added format duration. Make sure to
11:35:22.320 import it from lib utilus not from date
11:35:24.560 fns. So we use the same name. That's
11:35:27.040 unfortunate. You can change it if you
11:35:28.800 want to. Just make sure to import it
11:35:30.560 from the correct place. So now in here
11:35:33.200 you have the duration of the
11:35:35.640 call. Now below this badge, let's go
11:35:38.560 ahead outside of this div, let's go
11:35:41.436 ahead and actually sorry inside of this
11:35:44.320 div below the badge, open a new div and
11:35:46.720 render the markdown.
11:35:50.640 Let's close the markdown. So, make sure
11:35:52.400 you have imported
11:35:54.040 markdown from React Markdown here. And
11:35:57.436 inside of here, render data
11:36:01.000 summary. So, let's go ahead and refresh.
11:36:03.596 In here, you can see that I have the
11:36:05.200 summary. The problem is it's not
11:36:07.040 formatted at all. So, in order to format
11:36:09.840 it, we have to go ahead and add
11:36:11.360 components prop here. Open an object and
11:36:14.320 let's simply add the elements. So this
11:36:16.640 is the H1 element text to Excel font
11:36:19.116 median and margin bottom of six. And
11:36:21.756 then I'm just going to copy from my
11:36:25.276 source code. The same is for H2
11:36:28.240 elements, H3 and H4. We are just
11:36:30.960 reducing the uh size of the fonts. You
11:36:34.320 can see it slowly changing now. Now
11:36:37.360 let's go ahead and let's add the
11:36:40.116 paragraph margin bottom of six and
11:36:42.560 leading relaxed. There we go. And then
11:36:45.276 you can go ahead and add more for
11:36:48.560 example unordered list or you can add
11:36:53.040 ordered list. You can then add a normal
11:36:56.960 normal list here. And I would also
11:37:00.080 suggest
11:37:01.240 adding
11:37:03.400 strong. I will also suggest
11:37:06.596 adding code and block quote. This way
11:37:09.840 you cover most of the things AI can
11:37:12.960 generate in markdown. So you can just
11:37:14.400 pause the screen. These are very simple
11:37:16.160 snippets, right? Uh and there we go. You
11:37:19.040 now have a nice overview summary
11:37:21.800 here. And I'm going to end the chapter
11:37:24.960 earlier now because I want to do the
11:37:26.880 transcript together with the AI chat
11:37:30.240 actually. So we only did the simple ones
11:37:32.400 now and we'll do these a bit more
11:37:34.160 complex ones in its own chapter. So
11:37:37.276 let's go ahead and mark this as
11:37:39.756 completed. Let's revert this. And
11:37:42.320 recording tab is completed. So, let's go
11:37:44.880 ahead and merge all of these changes.
11:37:47.436 I'm going to create a new branch. Uh 25
11:37:52.080 uh completed state I believe is the
11:37:54.560 chapter name. And once I have confirmed
11:37:59.040 I'm on a new branch, I'm going to stage
11:38:01.200 all of these changes. And I will add 25
11:38:04.160 completed state commit message. Click
11:38:07.680 commit and publish the branch. Once it's
11:38:10.480 published, let's go ahead and let's
11:38:12.960 review our pull request. I'm only
11:38:15.596 interested in any potential
11:38:18.840 issues. And here we have the summary.
11:38:21.436 So, this chapter was pretty simple. So,
11:38:24.080 not much going on here. We basically
11:38:25.840 added a completed meeting view with
11:38:28.800 summary, transcript, recording, and ask
11:38:31.200 AI tabs. And we added the markdown
11:38:33.840 rendered summary. And in here we have
11:38:36.720 one actionable comment and that is to
11:38:38.800 add turnary in case recording URL does
11:38:41.596 not exist which is a good idea
11:38:43.360 considering that it will uh disappear at
11:38:46.560 one point unless you use your own
11:38:48.320 storage as explained in the beginning of
11:38:50.320 the chapter. So you might consider doing
11:38:52.360 this. Let's go ahead and let's merge the
11:38:55.276 pull request. And once it is merged,
11:38:58.320 let's go back to our main branch and
11:39:00.560 let's synchronize the changes to ensure
11:39:02.720 everything is up to date. And in your
11:39:04.960 source control here in the graph, you
11:39:07.200 will now see 25 completed state.
11:39:10.160 Amazing, amazing job. And see you in the
11:39:12.400 next chapter.
---