# 📱 Full-Stack Mobile App in React Native with Expo – Step-by-Step Guide


## Key Features:
- 🚀 React Native + Expo - Build cross-platform mobile apps with React knowledge
- 📱 Real-time Social Media App - Works on iOS, Android, and simulators
- 🔐 Authentication with Clerk - Seamless Google login integration
- 🔄 Convex Backend - Powers real-time features and data management
- 📊 7 Different Screens - Auth, Home, Bookmarks, Create, Notifications, Profile, and User Profiles
- ❤️ Interactive Features - Like, comment, bookmark, and follow functionality
- 🖼️ Media Handling - Upload and share images from your device
- 🔔 Notification System - Like, follow, and comment notifications
- ✏️ Profile Editing - Animated modal for profile customization
- 📱 Fundamental Components - Learn all essential React Native UI components
- 🚀 Special Files & Folders - Master app, tabs & layout structure
- 📚 Mobile Dev Concepts - Splash screen, SafeAreaView, tab/stack navigators
- ⚡ Performance Optimization 
- 🎨 Custom Styling - Implement custom fonts and app icons
- 🔄 Webhooks Integration - Learn interview-ready backend concepts
- 💻 No Mac Required - Develop on any internet-connected laptop


## 🧰 Tech Stack
- **Frontend**: React Native + Expo
- **Backend**: Convex (serverless database)
- **Auth**: Clerk (authentication)
- **Navigation**: Expo Router with Stack & Tab Navigators
- **Styling**: StyleSheet API and theme constants

---

## ✅ Prerequisites
- Basic React knowledge
- Node.js + npm installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Physical mobile device (or emulator)
- Optional: VS Code + extensions

---

## 🧱 Project Setup

### 1. Create a New App
```bash
mkdir SpotlightApp && cd SpotlightApp
npx create-d-expo-app@latest .
````

### 2. Clean Default Boilerplate

```bash
npm run reset-project
# Confirm to move files to /app-example, then delete it
```

---

## 🔄 File Structure Overview

```
/SpotlightApp
├── app/                  # All screens & routing logic
├── assets/               # Images & fonts
├── constants/theme.ts    # Color, spacing config
├── styles/               # Modular stylesheets
└── ...
```

---

## 🧪 Run the App

### Option 1: Use Physical Device

* Install Expo Go from App Store/Play Store
* Run: `npx expo start` and scan QR

### Option 2: Use Simulator

* iOS: press `i` for iOS Simulator
* Android: press `a` (requires Android Studio)

---

## 🏗️ Core App Functionality

### 🔹 Screens

* Home (Feed)
* Bookmarks
* Create Post
* Notifications
* Profile

### 🔹 Components

* `Text`, `View`, `Image`, `FlatList`, `TouchableOpacity`, `Pressable`, etc.

---

## 🔀 Navigation Setup

### 1. Tab Navigator

* Create `app/(tabs)/_layout.tsx`
* Define screens using `<Tabs.Screen name="..." />`
* Customize icons using `Ionicons`
* Apply theming: `tabBarActiveTintColor`, `tabBarStyle`

### 2. Stack Navigator

* Controlled via `app/_layout.tsx`
* Used for navigation between screens like `Login → Tabs`, `Tabs → Notifications`

---

## 🎨 Styling Setup

### Centralized Theme

Create `constants/theme.ts`:

```ts
export const COLORS = {
  primary: "#22c55e",
  secondary: "#64748b",
  background: "#000000",
  white: "#ffffff",
  ...
};
```

### StyleSheet Example

```tsx
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
});
```

---

## 🔐 Authentication (Clerk)

### 1. Sign Up at [clerk.com](https://clerk.com)

### 2. Configure:

* API Keys
* Allowed redirect URIs
* Social Auth (Google)

### 3. Integrate Clerk

* Install Clerk SDK
* Wrap root app with ClerkProvider
* Add `SignIn`, `SignUp`, and session management

---

## 🗃️ Backend (Convex)

### 1. Set Up Convex

* Sign up at [convex.dev](https://convex.dev)
* Create a project
* Get Convex project config & install SDK

### 2. Define DB Schema

```ts
// convex/schema.ts
export default defineSchema({
  posts: defineTable({
    caption: v.string(),
    image: v.string(),
    likes: v.array(v.string()),
    ...
  }),
});
```

### 3. Backend Functions

```ts
// convex/functions/post.ts
export const createPost = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", args);
  },
});
```

---

## 🧠 Core Concepts Covered

| Concept              | Implementation Detail                                  |
| -------------------- | ------------------------------------------------------ |
| Safe Area Views      | `SafeAreaProvider` and `SafeAreaView`                  |
| Theming              | Centralized in `theme.ts`, imported in components      |
| Icons                | `@expo/vector-icons`, primarily `Ionicons` used        |
| Navigation Types     | Tab + Stack navigators using Expo Router               |
| Auth & DB Separation | Clerk for auth, Convex for DB and serverless functions |
| Styling Convention   | Modular `styles/ComponentName.styles.ts` format        |

---

## 📦 Bonus Tips

* Use `TouchableOpacity` for simple button feedback
* Separate styles into their own files for each screen
* Avoid large inline styles; use `StyleSheet.create()`
* Use `require(...)` for local images, `uri:` for remote

---

## 🚀 Final Thoughts

You now have:

* A production-ready boilerplate for React Native
* Auth + DB backend setup via Clerk and Convex
* Responsive, real-time mobile UI
* Clean architecture and modular design

---

## 📎 Resources

* [Clerk Documentation](https://clerk.dev/docs)
* [Convex Docs](https://docs.convex.dev)
* [Expo Documentation](https://docs.expo.dev)
* [React Native Docs](https://reactnative.dev)


Timestamps:
00:00:00 - Intro
00:04:56 - 1- React Native Theory [IMPORTANT]
00:14:05 - 2- Environment Setup
00:19:37 - 3- React Native Basics
00:28:27 - 4- Setting Up Our Project
00:48:37 - 5- Authentication
01:12:13 - 6- Database Setup
01:22:39 - 7- Defining Our Schema
01:35:05 - 8- Understanding Webhooks
02:01:18 - 9- Create Post Mutation
02:11:01 - 10- Create Post Implementation
02:36:22 - 11- Get Feed Posts Query 
02:46:43 - 12- Fetching Posts
03:01:46 - 13- Like Posts
03:14:06 - 14- React Native Must Knows
03:37:24 - 15- Commenting on Posts
03:58:17 - 16- Adding Bookmarks
04:02:24 - 17- Post Deletion
04:14:57 - 18- Bookmarks Screen
04:19:15 - 19- Notifications Screen
04:42:13 - 20- Our Own Profile Screen
05:00:37 - 21- Dynamic User Screen
05:24:04 - 22- Final Optimizations
05:36:27 - 23- Talking About Deployment

---

# tactiq.io free youtube transcript
# The Ultimate React Native Course | Build Your First Mobile App in 2025
# https://www.youtube.com/watch/wbj-DuaL748

00:00:00.199 so you might not believe it but this is
00:00:02.320 the actual mobile application that we're
00:00:04.640 going to build with react native in this
00:00:07.040 one single tutorial it works both on a
00:00:09.800 simulator and on your IOS and Android
00:00:12.920 devices in this application everything
00:00:15.440 works in real time for example when
00:00:18.119 someone likes a post every user can see
00:00:21.199 the update immediately and what you have
00:00:23.480 just witnessed was a clip from the end
00:00:25.960 of this tutorial where we test out our
00:00:28.359 entire application everything that you
00:00:30.400 know about react can be used to build
00:00:33.200 this mobile application thanks to react
00:00:35.920 native and in this video I'll assume you
00:00:38.520 have no experience with mobile
00:00:40.520 development and react native so
00:00:42.800 basically I'll take you from scratch and
00:00:45.239 I'll teach you 99% of the things that
00:00:47.800 you would need to build a real world
00:00:50.280 mobile application and specifically
00:00:52.800 using react native and Expo so let me
00:00:55.800 give you a complete walk through of the
00:00:57.800 end result and then we'll talk about the
00:01:00.239 text stack and what you'll learn from
00:01:02.480 this video so this is a social media
00:01:04.920 application that is called Spotlight and
00:01:07.560 it has seven different screens which are
00:01:10.360 authentication home bookmarks post
00:01:13.040 creation notifications our own profile
00:01:16.159 and the profiles of other users
00:01:18.520 everything starts with the
00:01:19.880 authentication screen we have Google
00:01:21.960 authentication implemented that works
00:01:24.119 flawlessly once we are logged in we will
00:01:26.640 be navigated to the home screen where we
00:01:29.400 have stories and posts we can like posts
00:01:33.079 add a comment and add a bookmark we can
00:01:36.079 see all of our past bookmarks on this
00:01:38.880 screen and if we are the owner of the
00:01:41.200 posts we are able to delete them in the
00:01:44.040 create screen we can select an image
00:01:46.719 from our device add a caption and share
00:01:49.799 it with everyone there will be three
00:01:51.719 types of notifications which are like
00:01:54.479 follow and comment we will be able to
00:01:57.079 see the post details as well as the
00:01:59.560 comment M itself in the profile screen
00:02:02.240 we can see our stats and posts and we
00:02:05.200 can edit our own profile with this
00:02:07.399 really cool animated model that slides
00:02:09.720 in from the bottom of the screen and we
00:02:11.959 can visit other user profiles where we
00:02:14.440 can follow and unfollow them and in the
00:02:17.040 homepage we will have refresh
00:02:18.959 functionality as well as a logout button
00:02:21.879 that will navigate us back to the
00:02:24.000 authentication so this is the entire
00:02:26.040 application that we're going to build
00:02:27.599 today and as you can tell there is a lot
00:02:29.920 to cover in this one tutorial so you
00:02:32.280 will learn how to use every fundamental
00:02:34.720 component that you should know in react
00:02:36.840 native such as view text image link
00:02:39.920 scroll view flat list and the rest is on
00:02:42.159 the screen on top of all these you will
00:02:44.560 learn about special files and folders
00:02:47.440 like app tabs and layout and you will
00:02:50.239 learn some Concepts and terms that you
00:02:52.680 should know in Mobile development such
00:02:55.080 as splash screen safe area view Tab and
00:02:58.400 stack Navigators while building this
00:03:00.720 application we are going to talk about
00:03:02.519 the performance and we will see how to
00:03:05.040 improve it as well we are going to learn
00:03:07.120 how to use our own phones like the one
00:03:09.599 that we have in the logo we will even
00:03:11.799 change the default app icon and I'm
00:03:14.360 going to provide some additional
00:03:16.000 resources that you should keep in mind
00:03:18.159 while building your next mobile
00:03:20.120 applications with react native now the
00:03:22.640 most important question is do you really
00:03:24.799 need a MacBook to be able to follow
00:03:27.000 along with this video absolutely not any
00:03:29.799 laptop that is connected to the internet
00:03:32.120 should be fine and this is all thanks to
00:03:34.599 Expo which is a framework and a platform
00:03:37.599 that is built on top of react native we
00:03:39.840 are going to talk more about it later in
00:03:41.720 the video but basically it allows us to
00:03:44.519 scan a QR code and test out the
00:03:47.280 application on our physical device when
00:03:50.120 it comes to the prerequisites if you
00:03:52.280 know the basics of react you should be
00:03:54.439 able to follow along from start to end
00:03:57.040 without any issues and our text tag will
00:03:59.879 be react native with Expo convex for our
00:04:03.480 entire back end and clerk for
00:04:05.560 authentication along the way you will
00:04:07.760 learn some really interesting Concepts
00:04:09.840 to talk about in your interviews so
00:04:12.680 overall this is the kind of tutorial
00:04:14.799 that I wish I had when I first started
00:04:17.120 with react native and I say this from
00:04:19.560 the bottom of my heart now I can talk
00:04:21.959 about this tutorial for the next 20
00:04:23.919 minutes but I think I'll just leave it
00:04:26.000 here and see you inside just before we
00:04:28.919 get into the video video if you would
00:04:30.560 like to support my work I have a udmi
00:04:33.160 course with over 100 hours of content
00:04:36.199 for the cheapest price that you can ever
00:04:38.680 get it's only onetime payment for
00:04:41.360 Lifetime access you can find the
00:04:43.360 discount Link in the description and the
00:04:45.680 source code of this project and future
00:04:48.199 projects will be there you can watch
00:04:50.320 this entire tutorial in UD me as well
00:04:52.800 without any ads thanks for watching and
00:04:55.280 let's get into it so before we start
00:04:57.680 writing any code I have prepared some
00:05:00.000 notes that we can take a look at and
00:05:02.320 once we are done with it we'll go ahead
00:05:04.199 and actually start coding you can get
00:05:06.639 these notes from the link in the
00:05:08.479 description it'll be completely free at
00:05:11.039 the moment it is private but while
00:05:13.000 you're watching this video it's going to
00:05:14.880 be public so let's start with the
00:05:17.320 question what is react native in the
00:05:19.759 first place so it is a framework that
00:05:22.639 allows you to build mobile applications
00:05:25.199 using react you can either use
00:05:27.520 JavaScript or typescript and this video
00:05:30.280 we'll be using typescript so all in all
00:05:32.720 it is a framework that allows you to
00:05:34.560 build mobile applications still using
00:05:37.639 react and there is a really common
00:05:40.319 keyword or a term called crossplatform
00:05:44.199 development which means writing code
00:05:46.800 once that can run on multiple platforms
00:05:50.560 and this is exactly what react native
00:05:52.919 allows us to do so it is a crossplatform
00:05:55.800 framework because we can write one
00:05:58.400 codebase in Java script and we can
00:06:01.000 deploy it to both IOS and Android now
00:06:04.720 this is really convenient and pretty
00:06:06.639 cool when you compare it to back in the
00:06:09.400 old days so just think about it for a
00:06:12.120 second back in the old days if you
00:06:14.199 wanted to build a mobile application you
00:06:16.919 actually had to build it twice one for
00:06:20.160 iOS one for App Store right and one for
00:06:24.080 play store which is for Android and you
00:06:27.160 had to learn two different programming
00:06:29.160 languages right for iOS you had to learn
00:06:32.120 Swift and for Android you had to learn
00:06:35.080 cotland and before Swift has been
00:06:38.120 introduced you had to use Objective C
00:06:40.840 which was a lot more harder than Swift
00:06:44.080 and before the cin you had to learn Java
00:06:48.080 and like there are
00:06:50.360 still um some drawbacks like for uh
00:06:54.440 Apple development you had to learn you
00:06:56.919 had to have a Macbook which is pretty
00:06:59.000 expensive to get and for the Android you
00:07:02.080 had to learn Android SDK and its
00:07:04.319 Frameworks so it was really a
00:07:06.400 complicated process and if you were a
00:07:09.039 company founder that means you need to
00:07:11.319 hire two different teams right one would
00:07:14.400 be building the iOS application and the
00:07:17.599 other one would be building the exact
00:07:19.280 same application but for Android so it
00:07:21.879 was really a messy process but thanks to
00:07:24.919 react native we can just write one code
00:07:27.599 base right and then we can deploy it to
00:07:30.240 both IOS and Android so I hope this
00:07:33.039 gives you a little bit more insights
00:07:35.319 into react native but hey react native
00:07:38.840 by itself is not enough and this is a
00:07:41.360 screenshot that I took from the
00:07:43.360 documentation so if you visit
00:07:45.199 reactnative dodev and get started with
00:07:47.960 it you're going to see that they tell
00:07:49.960 you we believe that the best way to
00:07:52.599 experience react native is through a
00:07:55.120 framework and their recommendation is
00:07:58.000 Expo this is what will be using in this
00:08:00.280 video as well so it is like a toolbox
00:08:03.120 with all the necessary apis that lets
00:08:06.000 you to build production ready
00:08:08.680 applications okay so now that we know
00:08:10.919 react native is not enough we need to
00:08:12.599 use a framework like Expo this is going
00:08:15.280 to be our goto framework when using
00:08:18.319 react native but please don't get
00:08:20.919 confused react native and Expo are not
00:08:24.240 the same thing so like Expo is built on
00:08:27.680 top of react native when you are
00:08:29.879 building an application with expo at the
00:08:32.519 end of the day you're still writing
00:08:34.679 react native but it just has a lot more
00:08:37.559 optimizations on top of it and you are
00:08:40.320 getting a lot of other tools that you
00:08:42.679 would need and and like it's pretty
00:08:45.720 convenient so you can think of it like
00:08:48.080 react and nextjs in web development when
00:08:51.120 you are building an application with
00:08:52.800 nextjs you're still actually writing
00:08:55.880 react code but on top of it you have
00:08:58.200 some features like like server actions
00:09:01.320 um API routes things like that right
00:09:03.760 server components so on and so forth so
00:09:06.399 it is the exact same situation that we
00:09:08.320 have right here and now let's take a
00:09:11.160 look at some comparisons that we have
00:09:13.360 between react and react native so I have
00:09:16.360 prepared this list to prove you that
00:09:18.560 react native is not actually different
00:09:20.640 than react as the name suggests it is
00:09:23.440 still react but it just has a bit more
00:09:26.800 Concepts and syntax differences on top
00:09:29.480 of it so let's go through this list
00:09:31.560 pretty quickly the point of this thing
00:09:34.320 is just to get you you know just just to
00:09:36.800 give you some idea so in react web if
00:09:39.959 you wanted to build a component you
00:09:41.959 would use things like ative H1 ptag so
00:09:45.839 on and so forth if you wanted to give
00:09:47.839 some Styles you would use a class name
00:09:50.079 field right and in react native it is
00:09:52.680 not actually that different instead of
00:09:55.000 using a you would use View and for any
00:09:58.040 text you can imagine like H1 H6 like
00:10:01.920 ptag H3 spin anything you would use text
00:10:06.399 so you would wrap your entire text in a
00:10:10.279 text component which is coming from
00:10:12.399 react native okay I hope that makes
00:10:15.079 sense we don't really have class name in
00:10:17.399 react native instead we would use style
00:10:20.399 and this is something that we're going
00:10:21.839 to get next so styling in react uh web
00:10:26.320 you would give a class name and then you
00:10:28.440 would uh let's say you would prepare
00:10:30.920 these classes in your CSS files and you
00:10:33.720 would give the styling like we have a
00:10:36.200 card and profile image classes and these
00:10:39.279 are the styles that it
00:10:41.519 has and then when it comes to the react
00:10:43.959 native we are actually getting a
00:10:46.120 component called stylesheet from react
00:10:48.880 native and here we create our Styles so
00:10:52.360 we have card and with these Styles and
00:10:55.680 then the profile image and under this
00:10:58.040 style we say styles. card so that means
00:11:01.320 this view will get all these styling
00:11:03.839 that you see here so it is like CSS injs
00:11:07.680 right and we're going to see all these
00:11:10.160 later in the video as well and when it
00:11:12.600 comes to event handling in react web
00:11:15.040 development we have on click on Mouse
00:11:17.519 over so on and so forth and it's almost
00:11:20.079 the same thing in react native but
00:11:22.560 instead of on click we have on press
00:11:25.040 because as you can imagine it is a
00:11:26.959 mobile phone uh so the name
00:11:30.240 uh like name makes sense right on press
00:11:33.079 on long press on double tab things like
00:11:36.560 that right and instead of a button
00:11:39.279 component we have things like touchable
00:11:42.200 opacity or pressable these are the
00:11:45.000 components that we're going to see later
00:11:46.959 in the
00:11:47.959 video okay let's just speed up a bit we
00:11:50.959 have lists in react web development like
00:11:54.000 we do items. map for each item we would
00:11:57.760 return something so is really similar
00:12:00.440 what we have here instead we have a
00:12:02.839 component called Flat list and here we
00:12:05.560 say this is the data that we'll like to
00:12:08.120 map through and for each item render
00:12:11.279 this function so we basically get the
00:12:14.839 item and for every single item we'll
00:12:17.639 like to return this part it might look
00:12:20.760 complicated but it's actually pretty
00:12:22.519 simple that we're going to see in the
00:12:24.800 incoming sections then we have forms so
00:12:28.079 instead of using an input element we can
00:12:30.440 use things like text input and instead
00:12:33.560 of onsubmit we can use on press on the
00:12:36.839 button okay I hope this gives you a
00:12:39.959 little bit more confidence in your react
00:12:42.279 native Journey right it is not really
00:12:45.240 that different than react okay so with
00:12:49.120 this in mind I have an empty folder let
00:12:52.440 me just go ahead and open this up in my
00:12:56.079 desktop okay there we go I actually have
00:12:58.160 it I have created an empty folder on my
00:13:01.279 desktop I have called this as Spotlight
00:13:04.040 app you can call this anything just open
00:13:06.600 it up in vs code then we would like to
00:13:09.040 open up our terminal and start an expo
00:13:12.279 application so this is the command that
00:13:14.519 you would type npx create D Expo app at
00:13:20.279 latest and I would like to initialize
00:13:22.880 this under the current folder so I'll go
00:13:25.519 ahead and just put dot at the
00:13:27.800 end and let me show you the actual
00:13:31.240 documentation that I got this from so if
00:13:34.440 you visit expo. Dev create the
00:13:37.079 documentation this is the Quick Start
00:13:39.560 command that you can get okay let's go
00:13:42.519 ahead and run
00:13:44.079 this this might ask you a question just
00:13:47.160 press why and then press
00:13:49.600 enter so in the like in your very first
00:13:52.600 time it might ask you that since this is
00:13:55.480 my like not the first time I didn't get
00:13:57.920 that question and let's wait for this to
00:14:00.480 complete and in the next section we're
00:14:02.880 going to talk about this code
00:14:05.600 base okay so installation has just been
00:14:08.880 completed in my terminal I can see it
00:14:11.560 says your project is ready and we would
00:14:14.399 like to start it so I'll just clear up
00:14:16.600 my terminal and before we start this
00:14:19.040 application I would like to mention that
00:14:21.240 we have a bunch of different files like
00:14:23.639 hooks components constants Etc we're
00:14:26.800 going to actually delete all of them and
00:14:29.199 will start from scratch because I can
00:14:31.199 imagine this might look really really
00:14:33.320 complicated for a beginner but as I said
00:14:36.680 we will actually reset this project in a
00:14:39.160 second but first I need to mention if
00:14:41.880 you want to follow along with this video
00:14:44.120 currently you have two different options
00:14:46.839 so you would either install the expoo
00:14:49.880 application in your actual physical
00:14:52.600 phone so you can visit app store if
00:14:55.279 you're using iPhone or if you have an
00:14:57.560 Android device you you can visit Google
00:15:00.160 Play store and just get the xoo
00:15:03.320 application and then by using this we
00:15:06.519 can test out our application or you can
00:15:10.440 use a simulator if you are on Windows
00:15:13.320 you would get Android studio and if you
00:15:15.759 are on Mac you would get X code now
00:15:19.040 since I am teaching you guys I have to
00:15:21.079 show this simulator on the screen so I
00:15:24.160 can just test this out show you the end
00:15:26.399 result in real time I'll be using a
00:15:28.519 similar
00:15:29.680 but if you ask me this is a lot more
00:15:31.800 harder to get into like why is it is
00:15:35.639 just because it'll take longer to
00:15:37.519 install any of these uh simulators will
00:15:41.199 be more than 10 GB but if you install
00:15:44.560 xoo on your phone it'll take less than 1
00:15:47.360 minute and you can just see the end
00:15:49.880 result in your actual phone and let's
00:15:52.399 see how we can start our application in
00:15:55.240 our
00:15:56.360 phone so I'll just visit vs code and
00:15:59.440 I'll say MPX Expo and just run this
00:16:03.639 command okay so if you are using your
00:16:06.680 physical phone you need to scan this QR
00:16:09.199 code in your actual terminal and you
00:16:11.959 need to connect to the same Wi-Fi like
00:16:15.839 your uh computer and your phone should
00:16:18.160 be connected to the same Wi-Fi okay and
00:16:21.839 then since I am since I'm going to be
00:16:24.279 running this in the iOS simulator I'll
00:16:26.759 just press I if you are on Windows you
00:16:29.160 can press a and you should have the
00:16:31.560 Android simulator up and running so I
00:16:34.839 can realize like I know we are going
00:16:37.040 really slowly but I just need to make
00:16:39.079 sure that everyone is in the same page
00:16:41.959 so I'll just press I hopefully this will
00:16:44.880 go ahead start the Expo application on
00:16:47.920 this simulator and here we go this is
00:16:51.319 the boilerplate application that we got
00:16:53.959 from the Expo team so this is what they
00:16:56.480 give us this is the code base and this
00:16:58.319 is the op put and let me just put them
00:17:01.440 side by side just like this okay now
00:17:04.760 here it says go into the app tabs index.
00:17:08.640 TSX so app tabs index. TSX if you update
00:17:13.880 any of these parts so let's say welcome
00:17:16.439 1 2 3 if I save it it should restart in
00:17:20.359 real time if it doesn't you can go here
00:17:23.400 in your terminal press R which means
00:17:26.520 reload and it should reload with the
00:17:28.960 latest version and you can even run this
00:17:31.640 in your browser so I'll just press W
00:17:34.960 which stands for web browser and this is
00:17:37.799 the actual application right you can
00:17:39.960 build it for the web but in our case we
00:17:42.640 are not really interested in
00:17:45.080 this okay but just keep that in mind it
00:17:47.760 actually it is actually
00:17:50.000 possible okay so I hope we get the point
00:17:53.679 now we are going to reset reset this
00:17:57.200 entire project but I just want to talk
00:17:59.480 about a concept called tab Navigator so
00:18:04.000 as the name suggests you can get a
00:18:06.280 navigation based off of these tabs so
00:18:09.919 here we are in the explore screen and we
00:18:12.679 are in the home screen and this is
00:18:15.159 possible thanks to this tabs folder
00:18:18.440 which is built into Expo so these are
00:18:20.880 the things that we're going to talk
00:18:22.080 about more later in the video but I just
00:18:24.280 wanted to mention it since we have it
00:18:26.280 already now I'll open up my terminal and
00:18:29.480 kill this with command C let's clear
00:18:32.600 this up and we would like to reset this
00:18:35.760 project so they have prepared a reset
00:18:38.720 project script for us we can basically
00:18:41.480 say npm run reset Das project and run
00:18:46.919 this so here it says do you want to move
00:18:50.200 existing files into app example instead
00:18:52.960 of deleting them so let's just say
00:18:55.720 yes and run this
00:18:59.159 and let me make this screen a little bit
00:19:01.400 larger okay so as you can tell
00:19:03.880 everything that we had previously has
00:19:05.880 been moved into this app example folder
00:19:09.080 and since we don't really want to have
00:19:11.080 any boilerplate code we're going to
00:19:12.880 start from scratch we can basically go
00:19:15.400 ahead and delete this entire folder we
00:19:17.960 don't really need it and we'll just
00:19:19.840 start with an empty app folder other
00:19:23.000 than this we have the configurations as
00:19:25.559 well as some assets like fonts and and
00:19:29.400 images okay so that's going to be it for
00:19:32.520 the reset project next we can get
00:19:35.080 started with the
00:19:36.640 basics all right so this is where we
00:19:39.360 left now we're going to start with the
00:19:41.440 basics of react native and I'll try to
00:19:44.799 go really slowly for the next 1 hour
00:19:47.720 until we understand everything then we
00:19:50.320 can just really speed up the process if
00:19:52.840 you ever feel we're going slowly you can
00:19:54.960 speed up the video from the settings uh
00:19:58.320 like from the video settings okay now
00:20:01.440 IID like to start this application I'll
00:20:03.720 open up my terminal and I'll say let's
00:20:06.240 clear this up if you're on Windows you
00:20:08.400 can just say CLS or clear and if you're
00:20:11.919 on Mac you can say command K which would
00:20:14.480 clear this up okay now let's say MPX
00:20:17.679 Expo we can run our new application this
00:20:22.000 is what we had previously so I'll just
00:20:24.280 press R this should
00:20:26.520 reloaded and there we go now I'll visit
00:20:30.000 app index. TSX which is our home screen
00:20:33.440 so it says edit this let's just edit it
00:20:36.080 I'll just add one two three let's save
00:20:38.720 there we go we can see the change in
00:20:40.559 real time now let's talk about the basic
00:20:43.799 component right basic components so here
00:20:46.840 we have a text if you would like to put
00:20:49.720 a text outside of a text component
00:20:52.760 you're going to get errors so here it
00:20:55.000 says any text you have it should go
00:20:57.760 under like inside a text component so we
00:21:01.919 can just say hello there we go this is
00:21:04.679 coming from react native and here we can
00:21:08.080 give some Styles as you can tell let me
00:21:11.080 just like delete
00:21:13.360 this okay so style will take an object
00:21:17.279 with any of the fields that you can
00:21:19.159 think of that is coming from CSS so here
00:21:22.120 we say Flex one justify content and
00:21:24.760 align item Center so that it it can
00:21:27.240 Center it in the middle of the screen
00:21:29.480 but now if you can imagine we might have
00:21:32.600 bunch of different CSS uh Styles and
00:21:36.039 this will get out of hand so there is
00:21:38.279 another solution instead of having all
00:21:40.799 these let's say I'll call this as
00:21:44.720 styles do okay styles. container and
00:21:50.080 where is this Styles coming from so
00:21:52.400 basically we can say const Styles and
00:21:55.640 import
00:21:57.159 stylesheet Style
00:22:00.039 sheet. create now this stylesheet should
00:22:03.799 be coming from react
00:22:05.840 [Music]
00:22:08.400 native just like that and we can say
00:22:11.910 [Music]
00:22:13.200 create this will take an object and here
00:22:16.880 we can add the container
00:22:19.480 class so just like previously we can add
00:22:22.320 those Styles so we had Flex one align
00:22:26.120 items of Center
00:22:29.960 and justify content of
00:22:33.320 Center okay now we can see this is a lot
00:22:36.039 more readable we can just say styles.
00:22:38.480 container here we can have a text so
00:22:41.120 let's say uh title you can call this
00:22:45.039 anything by the way so this can be even
00:22:47.159 hello but it should make sense I'll just
00:22:50.559 say color should be red let's say style
00:22:55.440 styles. tile now this will become red
00:22:58.520 you can say font size will be I don't
00:23:01.360 know let's say
00:23:03.720 50 okay so it'll just update in real
00:23:06.360 time now the beauty of this let's say
00:23:08.880 you have 200 lines of CSS code you can
00:23:12.640 basically create a folder let's say
00:23:16.320 Styles and let's say we're going to have
00:23:18.559 styles for the authentication page we
00:23:21.279 can just say oath. styles. JS now this
00:23:25.960 part is not an extension this is just a
00:23:28.159 con iion that I'd like to use so you can
00:23:30.720 even have this as .js it is a regular
00:23:34.000 JavaScript file and this is also a
00:23:36.840 regular Javascript file but as I said
00:23:39.440 this is the convention that I'd like to
00:23:41.120 use so I will go ahead and create this
00:23:44.080 file let me cut this paste this in and I
00:23:48.000 would like to export this constant let's
00:23:50.880 import the stylesheet save this file now
00:23:53.919 we can get these styles from that file
00:23:57.960 let's delete this I'll say
00:24:00.279 import styles from Styles
00:24:04.720 slash okay maybe we should go one up
00:24:08.960 styles then we have o Styles so it is
00:24:11.840 still working but as you can tell our
00:24:14.000 code base is a lot more cleaner and
00:24:16.640 organized and actually we're going to
00:24:18.640 have bunch of different styles file like
00:24:21.840 bunch of files like these later in the
00:24:24.440 video okay so we have talked about the
00:24:26.840 view text now we could have things like
00:24:30.159 touchable
00:24:31.640 opacity um okay just like this I am a
00:24:36.000 really slow typer but let's just
00:24:39.880 see let's import this we don't really
00:24:42.640 have touchable actually let's delete
00:24:44.240 that we have touchable opacity on press
00:24:47.240 let's just say
00:24:50.320 alert touched
00:24:53.480 okay let's say
00:24:56.279 you touched and here we can add a text
00:24:59.799 in between let's say press me okay if
00:25:03.440 you press that here we can see we just
00:25:05.399 got an alert and in the same way we have
00:25:08.520 pressable
00:25:10.640 component it is also coming from react
00:25:13.279 native and here we have on press on
00:25:16.480 Hover on BL and you can always just go
00:25:19.320 ahead into these components press
00:25:21.480 control space you can really get all the
00:25:24.320 props that they have so in the same way
00:25:27.320 we can copy it
00:25:29.039 paste
00:25:30.360 it let's say press
00:25:33.120 me
00:25:35.679 pressible okay so it is working in the
00:25:39.120 same way but obviously they have some
00:25:42.440 differences uh we're going to be talking
00:25:44.960 about them later in the video but just
00:25:47.360 know that touchable opacity gives you
00:25:49.919 this opacity feedback out of the box so
00:25:52.600 can you see it like I'll just delete
00:25:55.480 this once I click to it like for a
00:25:58.640 second we have this aacd feedback and
00:26:01.559 this is why you might want to use it
00:26:03.279 most of the time and it's actually a
00:26:05.679 simpler component than
00:26:08.159 pressible okay then we can have like
00:26:11.200 images let's say we're going to get an
00:26:13.640 image component that could be either
00:26:15.960 coming from react native or Expo for now
00:26:19.200 let's use the one that is coming from
00:26:21.520 react native and here we could have a
00:26:24.240 source and here if the image is going to
00:26:27.679 be coming from from your local files
00:26:30.320 let's say we're going to get this
00:26:32.480 icon.png then you need to require it
00:26:36.440 since it is a local image right let me
00:26:40.120 kill the left hand side I'll say
00:26:43.480 require and give the exact
00:26:46.840 path so I think this is not the correct
00:26:49.520 path so we should go one up under the
00:26:52.039 assets under the
00:26:54.360 images um do we have logo.png okay no we
00:26:58.080 don't don't actually have the logo.png
00:27:00.279 but we have icon.png and we can get this
00:27:03.840 we can add some styles on top of it like
00:27:07.799 width let's say 200 and height as
00:27:11.940 [Music]
00:27:14.120 well okay for some reason it did not
00:27:16.799 refresh it I'll just say R okay no it
00:27:21.520 didn't okay so I have just found the
00:27:23.799 solution I think instead of width and
00:27:25.799 height we should have this style with
00:27:27.880 the WID and height now it is working as
00:27:30.559 expected and if the image is coming from
00:27:33.480 a remote uh Network let's say we're
00:27:36.480 going to get an image from unsplash so
00:27:39.600 let's grab this image address uh copy
00:27:43.720 image address let's go back to vs code
00:27:46.960 here in this case you would like to
00:27:49.279 actually use a field called URI and once
00:27:53.679 you paste it it should work
00:27:58.279 let's see why this did not work maybe we
00:28:00.480 should add some
00:28:03.000 Styles say width is going to be again
00:28:05.960 200 okay now it is working if you're
00:28:08.919 getting an image from a remote Network
00:28:11.919 like unsplash or I don't know any place
00:28:14.840 it should have this URI field but if it
00:28:17.519 is a local image you should require it
00:28:20.279 from the like from the relative path
00:28:24.559 okay so I hope that makes
00:28:26.240 sense so these are are the basic
00:28:29.159 components that we have just explored
00:28:32.200 but on top of these there is a file
00:28:34.720 called underscore layout. TSX this is an
00:28:38.760 actual special file that we should keep
00:28:41.480 in mind we can create multiple layout
00:28:44.360 files in different places so currently
00:28:47.640 this gives us the stack Navigator which
00:28:50.600 is something that we'll talk about in a
00:28:52.399 second and here the index. TSX file is
00:28:56.000 also a convention so for your your
00:28:58.360 homepages in different routes you would
00:29:02.240 call it you would call it as index so
00:29:06.080 instead of calling this home. TSX we
00:29:08.320 just say index. TSX and if you had
00:29:11.240 different routes the entry files would
00:29:13.720 be index now I know this might sound
00:29:16.080 complicated but we're going to see a
00:29:17.600 couple of different examples and
00:29:20.440 anything that goes into this app folder
00:29:23.000 will become a screen so in our
00:29:25.720 application we're going to have a bunch
00:29:27.240 of different screens
00:29:28.760 like profile screen notification screen
00:29:31.960 create post screen home screen so on and
00:29:35.000 so forth and we're going to put all of
00:29:37.000 them into this folder now we have talked
00:29:39.919 about the stack Navigator um like how
00:29:43.880 does that work let's go ahead and create
00:29:46.200 a couple of different files I will have
00:29:48.840 a
00:29:49.720 profile. TSX and I am using an extension
00:29:53.880 let me show this
00:29:58.320 it is called
00:30:00.880 es7 react reactnative Snippets if you
00:30:04.440 get this you should be able to do this
00:30:07.000 shortcut
00:30:08.799 rnf it will give you a functional react
00:30:11.760 native component so let's say this is
00:30:15.440 profile
00:30:17.480 screen and we can uppercase this
00:30:21.360 one then let's have another screen
00:30:24.799 called notifications.
00:30:28.720 GSX or TSX actually we're using
00:30:31.559 typescript once again I'll say rnf and
00:30:34.320 let's just say
00:30:36.480 notifications
00:30:38.840 screen I'll save those now from the
00:30:42.519 homepage I will link this so I'll say
00:30:45.240 link this is another component here I
00:30:47.679 just get that from Expo router and I'll
00:30:51.120 say visit
00:30:54.039 notifications
00:30:55.679 screen and let's say h ra will take us
00:30:59.320 to/ notifications and as you can tell it
00:31:02.360 is type save out of the box let's save
00:31:05.320 from the homepage we can visit the
00:31:07.519 notification screen I'll click that okay
00:31:11.320 it says no rout P I think we should
00:31:14.039 restart this with r now I'll try to
00:31:17.880 collect it there we go now as you can
00:31:20.399 tell new screens are coming from the
00:31:22.960 right hand side right this is what stack
00:31:26.799 Navigator allows to have and if you go
00:31:29.559 back now notice how this screen will go
00:31:32.200 from left to
00:31:34.399 right okay so new screens will be coming
00:31:37.639 from right and if you want to go back
00:31:40.480 they will be popped right and this is
00:31:43.399 what sex uh Navigator allows us to have
00:31:46.840 then if we wanted to we can make this
00:31:50.600 like s uh not self Clos tag I was going
00:31:54.480 to say and here we can add different
00:31:58.159 screens so I'll just say stack. screen
00:32:01.159 for the homepage which we call this as
00:32:04.399 index we can actually hide the header so
00:32:09.200 here if you save it now header is gone
00:32:11.799 right and you can like bring this back
00:32:14.840 let's just say bring the header we can
00:32:17.919 change this name so we can say title
00:32:20.720 will be home because this is our actual
00:32:23.320 homepage or we can call this as feed if
00:32:26.240 this is a social media application and
00:32:28.559 we can visit the notifications page
00:32:30.919 instead of having this as lowercased we
00:32:34.120 can actually uh change it as well so
00:32:37.720 here we'll say go into the notifications
00:32:41.320 screen and make the title to be
00:32:45.120 notifications so here we just uppercase
00:32:47.360 the end let's save there we go and now
00:32:50.559 there is one issue here let's say um
00:32:54.320 here I'll go ahead and just say header
00:32:56.840 shown will be
00:32:59.279 false and you're going to see that
00:33:02.000 content overflows with this status bar
00:33:04.919 that we have at the top and if we wanted
00:33:07.200 to take this into the view always we can
00:33:10.480 just go ahead wrap it with something
00:33:13.000 called save area provider so I'll go
00:33:16.320 here I'll just say save area provider
00:33:20.240 component and wrap everything with it
00:33:23.320 then we would like to have save area
00:33:25.840 view component let's say import this as
00:33:28.760 well wrap everything with it and now if
00:33:33.120 we give this some styling let's say uh
00:33:36.000 not class name but let's say style we're
00:33:39.399 going to say Flex will be one so that it
00:33:42.240 will take the entire screen and here we
00:33:44.440 go now it is inside the view it is not
00:33:47.200 overflowing with the status bar so this
00:33:49.880 is something that you should also keep
00:33:51.440 in mind like you can change the
00:33:53.080 background so on and so forth this is an
00:33:56.360 absolutely important component that you
00:33:58.720 should keep in mind and we'll be using
00:34:01.080 this actually later in the video um so
00:34:04.720 now what should we what should we be
00:34:07.399 doing is to show you this image in our
00:34:10.918 application we're going to have a bunch
00:34:12.760 of different screens right and we're
00:34:15.040 going to have the tab Navigator so we'll
00:34:18.040 have home screen bookmarks create
00:34:21.280 notifications as well as the profile
00:34:23.679 screen and now let's try to create this
00:34:26.879 tab with the the related screens I will
00:34:30.199 go into my vs code and if you remember
00:34:35.239 we had a special folder called tabs so
00:34:38.760 I'll go ahead open this up the brackets
00:34:41.199 and just put tabs name in between okay
00:34:44.560 this is a special file that Expo will
00:34:47.000 take a look to be able to implement the
00:34:49.399 tabs
00:34:51.119 Navigator here I'll put a special file
00:34:54.159 once again which is going to be our
00:34:56.119 layout. TSX file then we can put our
00:35:00.040 tabs so we're going to have the profile
00:35:03.480 I'll just drag and drop it we'll have
00:35:05.800 the
00:35:06.760 notifications so we are going to have
00:35:09.440 let's say what do we have let's take a
00:35:11.760 look so we are going to have create and
00:35:13.960 bookmarks as well as the home
00:35:16.560 screen so let's try to do it slowly
00:35:19.359 we'll have
00:35:21.560 create. TSX and we can say rnf to get
00:35:26.000 this boilerplate code
00:35:28.240 code and here we'll also have bookmarks
00:35:32.440 let's
00:35:33.480 [Music]
00:35:37.079 say okay now let's save all of these I
00:35:40.720 think we can also take the homepage
00:35:43.440 in which is going to be called as index
00:35:46.839 right let's say save
00:35:49.599 this now we don't really have an index
00:35:52.359 in the root level so we can go ahead and
00:35:55.440 just add an index file here as well I'll
00:35:58.880 say index. TSX let's say rnf this could
00:36:02.640 be our starter point and all this file
00:36:05.920 will be doing is to redirect the user to
00:36:08.720 the feed which is this file so I know
00:36:12.040 this might look complicated but I
00:36:13.720 promise this will make sense just in a
00:36:15.640 second let's say from here we will take
00:36:19.520 our users to tabs okay this will take us
00:36:23.520 to the entry
00:36:25.160 point so once again this will make sense
00:36:27.920 just in a second now let's try to
00:36:30.880 actually put these colors as well as
00:36:33.560 these icons into our tab Navigator so
00:36:37.000 for this we're going to visit vs code
00:36:39.800 under the layout let's say rnf here we
00:36:43.800 can just call this as tab
00:36:46.920 layout you can call this anything but I
00:36:49.400 think this makes sense and let's shrink
00:36:51.280 the left hand side instead of having a
00:36:53.800 view we're going to get the tabs
00:36:56.200 component from X router and we're going
00:36:59.119 to give every single Tab screen so just
00:37:02.040 like in this tag Navigator we'll say
00:37:04.640 tabs. screen and we are going to put our
00:37:07.920 options so the first thing we need for
00:37:10.280 every single screen is the name and
00:37:13.280 first we'll have the index point which
00:37:15.720 is going to be the homepage right this
00:37:18.000 is the starter page that we'll have then
00:37:20.760 we're going to have five more tabs let's
00:37:24.160 try to put those I will duplicate it one
00:37:27.280 2 2 3 four and five let's say we're
00:37:30.680 going to have
00:37:32.440 bookmarks we're going to have
00:37:35.200 create we can have
00:37:38.720 notifications and I think we're going
00:37:40.839 have profile maybe that was like 1 2 3 4
00:37:46.280 okay that should be enough we have five
00:37:48.960 screens for some reason I put six but
00:37:51.920 there we go let's save and try to see
00:37:54.319 this in action do we have anything I'll
00:37:57.280 just press R there we go we got five
00:38:01.280 different tabs but now they don't really
00:38:03.880 have an icon and also I don't really
00:38:06.640 want to see this uh name at the bottom
00:38:10.200 we only want to see the icons for this
00:38:13.480 we can change our options here under the
00:38:16.880 tabs let me just say um screen
00:38:22.720 options which is going to take an object
00:38:25.839 so here I'll just say t M
00:38:28.800 Bar show label and I'll just save fals
00:38:33.720 if you save it should get rid of those
00:38:36.520 names and let's try to change the icon
00:38:39.480 for every single Tab screen so for the
00:38:42.480 homepage we'll say options we're just
00:38:45.400 going to take an object where we'll just
00:38:47.200 say tab bar icon and this is going to
00:38:50.560 take a call back function so just like
00:38:53.200 this instead of returning a text we
00:38:55.400 would like to return an icon this is
00:38:57.839 going to be a self-closed tag just like
00:39:00.599 that let's say we are going to get ion
00:39:04.440 icons let's say ion icons for some
00:39:08.280 reason this does not a to complete for
00:39:10.480 me let me try to get it from Expo Vector
00:39:14.640 icons so xook gives you different icons
00:39:17.960 out of the box and for the name of the
00:39:20.560 icon we'll get the home let's
00:39:23.359 save here we can see it has just been
00:39:25.839 updated but it is super tiny we can go
00:39:29.319 ahead change the size as well as the
00:39:32.640 color so we'll just take the size as it
00:39:36.079 is the default size as well as the
00:39:38.480 default
00:39:40.160 color so let me just zoom out so that
00:39:42.800 you can see the entire line and there we
00:39:45.560 go it is a little bit larger and it got
00:39:47.800 this blue color if you delete this it
00:39:51.079 will be black so it doesn't really get
00:39:53.400 the actual Theme by default this is blue
00:39:56.760 but we're going to change the colors
00:40:00.119 okay so in the same way we are going to
00:40:02.200 add couple of different icons so here
00:40:04.920 let me just give you the name of these
00:40:06.640 icons so you can just pause the video
00:40:09.040 and maybe try to add it by your own so
00:40:12.200 for the bookmarks are icon name is
00:40:14.720 bookmarks for the create it is ADD
00:40:18.200 Circle then for the notifications it is
00:40:21.359 heart and for profile it is person
00:40:25.400 Circle okay so once you have done this
00:40:28.280 let's watch my solution where I'll
00:40:30.560 basically copy and paste let's not waste
00:40:33.280 the time it the exact same thing then
00:40:36.040 for the
00:40:39.319 create let me get this and let's
00:40:42.200 actually save there we go it has just
00:40:43.960 been updated and you know as it is
00:40:46.560 focused the color will change okay for
00:40:50.079 the create we would like to get this but
00:40:53.240 now here for the color I used something
00:40:56.200 called primary color which is going to
00:40:58.800 be this green color so let's go ahead
00:41:01.319 and create this colors under a folder
00:41:05.319 called
00:41:08.740 [Music]
00:41:10.000 constants and I will have this theme. TS
00:41:13.520 file which you can grab it from the
00:41:15.839 source code let me try to provide this
00:41:18.720 to you it's around 10 lines of code we
00:41:22.000 have a primary color secondary
00:41:24.720 background so on and so forth I have for
00:41:27.280 preped these already so once you get
00:41:30.119 that we can import these colors and use
00:41:34.119 the primary color for this icon okay
00:41:36.960 there we go then what do we want to do
00:41:40.000 now let's get the notifications as
00:41:45.000 well okay paste
00:41:47.760 it and then for the profile so since
00:41:51.599 this is the exact same thing I don't
00:41:53.119 really want to type this out we don't
00:41:54.839 really need to waste five minutes on
00:41:56.839 these now basically we are just
00:41:58.920 returning a call back with this ion
00:42:02.119 icons right okay everything seems
00:42:05.240 correct to me but why this is blue and
00:42:08.680 this is green let's go ahead and change
00:42:11.359 the general color on each icon which is
00:42:15.280 going to be under the screen options on
00:42:17.760 the actual tabs component in the parent
00:42:21.280 component right now first off I don't
00:42:24.400 really want to see the tabs so I'll go
00:42:26.760 ahead and add this header shown to be
00:42:29.599 false let's save the tabs has just gone
00:42:32.960 here we see still tabs but it is coming
00:42:35.760 from the stack Navigator so we can go
00:42:38.680 ahead and actually say um let's say
00:42:42.319 style uh basically I'll just get this
00:42:46.079 part let's say style this is something
00:42:48.880 that we have done previously we'll just
00:42:50.720 say header shown to be
00:42:52.880 false okay why did not work I think we
00:42:56.319 can just delete those
00:42:59.440 um
00:43:01.079 wait let's just make it to be look like
00:43:03.920 this okay so my bad instead of style it
00:43:07.160 should be screen options because we are
00:43:09.680 in the parent component so time to time
00:43:13.079 I can also make mistakes but let's just
00:43:15.240 ignore the fact I'll just save there we
00:43:17.640 go that tab is also gone right now we'll
00:43:20.839 go ahead here and we'll like to add some
00:43:23.359 other styles so we would like to change
00:43:26.040 the color right right for this we can
00:43:28.200 get the primary color on the tab bar
00:43:31.599 active tint color so if you save if it
00:43:34.640 is active we're going to get this
00:43:36.480 primary color and we can change the
00:43:39.480 inactive color as well just like that
00:43:42.880 let's save there we go it just changed a
00:43:45.599 bit if you can see then we can add like
00:43:49.440 tab bar style now you might be asking
00:43:52.800 hey how do I learn all these props well
00:43:55.800 basically as you need them as you build
00:43:58.480 more projects you're going to see and
00:44:01.480 understand all of them more and more so
00:44:03.839 this is what I'm doing as well before I
00:44:06.280 record these videos I just go ahead and
00:44:08.680 experience with most of the things and
00:44:11.319 the most common things that are in the
00:44:13.680 documentation and these are one of those
00:44:16.280 things that I have built already so just
00:44:19.680 please don't get overwhelmed you might
00:44:21.440 be asking hey there are millions of
00:44:23.559 things how do I learn every single one
00:44:25.839 of them so so technically and honestly
00:44:28.880 you don't really need to learn 99% of
00:44:31.520 them only the things that you actually
00:44:33.720 need and in our case tab bar style is
00:44:37.079 one of them so I will grab this from my
00:44:39.520 notes and paste it instead of typing
00:44:41.880 this out I can explain every single line
00:44:44.960 so here this is the tab bar style that
00:44:48.280 we are updating let me just save okay we
00:44:51.359 have just changed the background color
00:44:53.920 just make it to be black we make the top
00:44:57.520 bar like border top width to be zero
00:45:01.520 Position will be absolute elevation of
00:45:04.559 zero and you might be asking what the
00:45:06.800 heck is elevation you can't read it it
00:45:09.200 is basically something specific to
00:45:11.559 Android and I have test this out
00:45:14.160 elevation zero looks a lot better that's
00:45:16.920 why I just you know ignore that then
00:45:19.599 height is 40 you can make it to be 80
00:45:22.680 like double it you can see the change
00:45:25.559 but I think 40 is pretty equ to our and
00:45:28.640 we give some petting of bottom of eight
00:45:32.160 okay these are the styles that we have
00:45:34.200 just
00:45:35.040 added now we're going to make the rest
00:45:37.960 of our application to be in the black uh
00:45:41.480 background color but we'll just get
00:45:44.160 there step by step now what I want to do
00:45:47.359 just basically kill all these and take a
00:45:51.960 step like take a moment try to
00:45:55.079 understand what the heck is happening in
00:45:57.040 our application so everything starts
00:46:00.000 from the app folder from the layout. TSX
00:46:03.559 this is the first file that is run okay
00:46:06.680 so here we wrap our entire application
00:46:09.559 with a safe area provider and safe area
00:46:12.960 view components so that our com so that
00:46:16.040 our content is always in the safe area
00:46:19.280 it is not overflowing with the status
00:46:21.760 bar and in the index page we are
00:46:25.000 basically taking the user immediately to
00:46:28.200 our tabs folder and specifically into
00:46:31.400 the homepage right this is our homepage
00:46:35.240 let's just say this is the feed screen
00:46:38.319 in
00:46:39.720 tabs okay so whenever you reload your
00:46:42.400 application by default your IND this
00:46:44.599 page and from here since we set it up
00:46:47.680 our tabs we can go into the bookmarks
00:46:50.720 right it will open up this file and
00:46:53.240 render it then we can go into the create
00:46:56.000 notifications and profile screen so I
00:46:59.520 hope this makes sense we are going to
00:47:01.400 fix the styling uh we're going to make
00:47:03.720 it actually look a lot better but this
00:47:06.680 is the general idea of our application
00:47:09.960 right so we have tabs which stands for
00:47:12.680 tabs Navigator and it goes under the
00:47:15.200 tabs folder this is a special folder
00:47:17.800 that Expo gives you then from here you
00:47:20.480 can change the general styles on each
00:47:24.000 Tab and specifically you can do like
00:47:28.280 change the options for the icons so on
00:47:31.240 and so
00:47:32.440 forth so this is what we have done so
00:47:35.839 far now just before we move on with the
00:47:38.680 next section let's go ahead delete these
00:47:41.040 Imports and change the background color
00:47:43.720 of our entire application which is going
00:47:46.040 to be under the layout here I'll just
00:47:48.400 say background
00:47:50.640 color will be black and it should update
00:47:54.440 it and here in react native the other
00:47:57.160 color formats are also supported so you
00:47:59.839 can say like black or you can say hex
00:48:02.680 code right FFF you should save it and it
00:48:05.640 should work like let's do
00:48:08.000 CCC like it should work you get the
00:48:10.200 point and also rgba works I think also
00:48:14.200 hsl works but in our case I'll just be
00:48:18.319 I'll be using this simple black color
00:48:21.119 and we can keep it shorter if you really
00:48:23.119 wanted to we'll go with 0 0 0 it's the
00:48:26.839 same thing there we go we have the
00:48:29.000 colors as well and later in the video
00:48:31.319 we'll just see how to change the
00:48:33.160 background color of each screen so with
00:48:35.960 that I'll see you in the next section
00:48:38.400 all right so this is where we left now
00:48:40.880 it is time to implement authentication
00:48:43.319 and connect our application to a
00:48:45.839 database and for this we'll be using
00:48:48.520 Clerk and convex you can find the link
00:48:51.200 in the description so let's go ahead and
00:48:53.440 visit clerk to implement the
00:48:55.240 authentication first now I am in the
00:48:58.040 homepage of the clerk if you haven't
00:49:00.119 heard of it it's the most comprehensive
00:49:02.520 user management platform and in this
00:49:05.200 project we'll be using it to handle the
00:49:07.559 entire authentication flow while making
00:49:10.280 our application completely secure and
00:49:13.200 some production grade applications and
00:49:15.720 companies are actually using it so it is
00:49:18.359 pretty cool and it is really cheap to
00:49:20.520 get started with it it's free right so
00:49:23.720 up to 10,000 users you can use it for
00:49:26.720 completely free and probably you will
00:49:29.359 never hit this amount of users so let's
00:49:31.880 go ahead and get started with it I
00:49:35.040 already have an account so I'll just go
00:49:37.079 ahead and visit my dashboard let me just
00:49:40.480 try to quickly log
00:49:43.040 in and there we go now we would like to
00:49:46.359 create an application let's say create
00:49:48.839 an app I will call this as Spotlight
00:49:51.920 this is the name that I'd like to use
00:49:53.760 you can call this anything I will
00:49:55.720 disable any other providers other than
00:49:58.559 Google if you really want to you can
00:50:00.680 just op them in right like you
00:50:03.920 can have all these others uh providers
00:50:07.839 but in my case I'll just be using Google
00:50:10.720 because that's the only thing that we
00:50:11.960 would need let's say create the
00:50:15.359 application and we have a bunch of
00:50:17.400 different sdks and guides in our case
00:50:20.480 we'll like to use it with Expo so I'll
00:50:23.440 select this and let's go through these
00:50:25.920 steps one by one first we'll like to get
00:50:28.880 clerk Expo right I'll open up my
00:50:32.640 terminal tell
00:50:35.200 this paste this in then the next step is
00:50:39.040 to get the types to make the typescript
00:50:42.200 happy get the type
00:50:44.640 definitions so once this is done we can
00:50:47.440 paste that
00:50:50.359 in okay so this is what happens if you
00:50:53.920 live in turkey with a shitty internet
00:50:56.119 connection but there we go I'll go ahead
00:50:58.520 paste this
00:50:59.599 in then we would like to set our
00:51:02.520 environment variables I'll copy this
00:51:05.200 here they say use a EnV file now later
00:51:08.599 in the video we'll be using convex and
00:51:11.799 they actually use env. loal file which
00:51:15.599 is the same thing but let's go ahead and
00:51:17.880 create this one I will paste this in
00:51:20.440 which is the clerk publishable key um
00:51:24.000 this is something clerk will use just in
00:51:26.640 a couple of seconds so we need to visit
00:51:28.960 the layout and wrap our application with
00:51:32.000 this clerk provider now I'll copy this
00:51:34.839 part and actually all these visit my
00:51:38.079 layout file it should be in the
00:51:42.640 root now I can feel this might look a
00:51:45.559 bit
00:51:47.200 overwhelming but let's just see now the
00:51:50.200 reason that I say it's overwhelming is
00:51:52.160 because we have really a limited space
00:51:54.720 font size is too large but there we go
00:51:57.520 we got the publishable key which is
00:51:59.319 coming from the environment variables
00:52:02.400 and we can WB our entire application
00:52:04.720 with this
00:52:06.000 part so here I'll go ahead wrap my
00:52:10.740 [Music]
00:52:13.079 application and let's get this one close
00:52:16.400 this off there we go we need to import
00:52:18.799 these they are going to be coming from
00:52:22.400 clerk so I'll copy that and
00:52:26.230 [Music]
00:52:28.440 okay now let's save this should be happy
00:52:30.880 with us but we have some more stuff to
00:52:33.280 do now clerk stores the active users
00:52:37.040 session token in memory by default and
00:52:40.280 in Expo applications the recommended way
00:52:42.960 to store sensitive data such as tokens
00:52:46.160 is by using Expo secure store package
00:52:49.799 which is going to encrypt the data
00:52:51.760 before restoring it so we're going to go
00:52:54.119 ahead and install this to make our
00:52:56.599 application a lot more safe let's
00:53:00.400 paste oops what have I done let's just
00:53:03.040 paste it I think I have just done a
00:53:05.160 mistake let me just copy this once
00:53:09.359 again clear up the terminal and paste
00:53:12.119 this
00:53:13.079 in next we would like to create a cache.
00:53:16.520 TS file in our root directory let's copy
00:53:20.960 this so these are just some steps that
00:53:23.720 we are doing that we are never going to
00:53:25.839 be thinking about it later this will
00:53:28.960 make our application completely secure
00:53:31.720 and authentication will work flawlessly
00:53:34.799 so we have 30 lines of code which is
00:53:37.720 something that clerk needs to be able to
00:53:40.520 get the token as well as save the token
00:53:43.400 to handle the authentication so you
00:53:45.599 don't really need to understand
00:53:47.319 everything that is going on here there's
00:53:49.160 a lot of magic that is happening behind
00:53:51.760 the
00:53:52.480 scenes okay then now that we have got
00:53:55.920 this token we're going to go ahead add
00:53:58.359 this token cache into our clerk provider
00:54:01.799 so I'll copy this
00:54:04.640 part save this file go into layout and
00:54:08.760 here we would like to oops what have I
00:54:11.720 done let's say token cache and we're
00:54:14.400 going to get the token cache from this
00:54:16.520 cache file that we had and I think our
00:54:19.359 application should be ready to go here
00:54:22.400 they have bunch of different steps that
00:54:24.720 we'll be doing in a couple of
00:54:27.640 minutes okay so with this now in our
00:54:30.400 entire application we have Clerk
00:54:33.799 initialized and we can use the
00:54:36.119 authentication so let's see we would
00:54:39.040 like to build the authentication page so
00:54:41.680 you can get these designs I think I
00:54:44.720 forgot to add the authentication screen
00:54:47.119 but let me show you this pretty quickly
00:54:49.599 so I have just add it right here this is
00:54:52.040 the authentication screen let's take a
00:54:54.480 look at it we have an icon
00:54:57.119 we have the title A P tag maybe a
00:55:00.880 description an image as well as our
00:55:03.799 authentication button so let's go ahead
00:55:06.200 and design this then we're going to make
00:55:08.040 this work with the clerk I'll open up my
00:55:10.880 PS code here I would like to create an
00:55:13.920 authentication page so it's not going to
00:55:16.119 be a part of the tabs because as you can
00:55:18.520 tell we don't really have the navigation
00:55:20.720 for this page or for this screen I
00:55:24.039 should say we are not in the web
00:55:25.799 development so we don't really have
00:55:27.520 pages but instead we have screens and
00:55:30.160 let's start with the authentication I
00:55:32.240 will create this folder and here we can
00:55:34.760 put a login. TSX file and here we would
00:55:39.559 like to basically have our Styles first
00:55:42.799 then we will implement the functionality
00:55:45.960 now here this is not a CSS course that's
00:55:49.079 why I would like to skip this Styles
00:55:51.599 part here we have a oath styles. JS file
00:55:56.440 and let's actually make this to be a
00:55:58.480 typescript file I'll just say oath
00:56:01.440 styles. TS and I will provide this file
00:56:04.640 to you so you can grab this from the
00:56:07.240 GitHub repo and let me show you the
00:56:09.799 entire
00:56:11.280 page if you want to type this out so we
00:56:14.319 are getting the colors we are getting
00:56:16.280 stylesheet as well as Dimensions where
00:56:19.400 we will just check the width and height
00:56:21.440 of the screen here we have container
00:56:24.280 brand section basically this is some CSS
00:56:27.720 styling just to make our application
00:56:30.280 look clean and
00:56:33.160 nice okay so I don't really think we
00:56:35.920 should be spending 10 minutes to write
00:56:38.720 all these classes that's why I'll just
00:56:41.160 provide them to you okay this is super
00:56:44.039 simple styling once again with this in
00:56:47.319 mind let's go ahead and actually try to
00:56:49.640 build the login page I'll just get rnf
00:56:53.480 let's try to save this file and actually
00:56:56.280 actually try to build the content so
00:56:59.799 here I'll sharing the left hand side we
00:57:02.319 going to have a view with some styling
00:57:05.720 let's say style will be styles.
00:57:08.599 container and these Styles will be
00:57:10.880 coming from oath Styles file then we
00:57:14.720 will have the brand section so I'll go
00:57:17.559 ahead say brand
00:57:20.240 section and let's just say we will have
00:57:24.119 a view let me please get this and I
00:57:28.680 don't really want anyone to get mad at
00:57:31.079 me just because I copy and paste but
00:57:33.640 this is really really basic stuff that
00:57:36.160 we have seen couple of sections ago we
00:57:38.880 are having a view with a style an icon
00:57:42.760 and some text so there is nothing logic
00:57:45.559 here that's why I would like to copy and
00:57:47.839 paste and we'll you through it so typing
00:57:50.559 this would take 3 minutes explaining
00:57:53.400 would take 30 seconds okay I hope this
00:57:56.559 makes sense now we got the brand section
00:57:59.200 let's save and try to see what we're
00:58:01.680 going to get currently we are in the
00:58:03.839 feed screen what I want to do just go
00:58:07.480 into the actual index file and for now
00:58:12.160 I'll just take my users to the
00:58:14.480 authentication so let's say
00:58:16.680 oath maybe to
00:58:20.160 login okay for some reason we cannot
00:58:23.480 [Music]
00:58:24.640 get the type
00:58:27.920 safety maybe we should start our
00:58:30.599 application I'll just say MPX
00:58:34.640 Expo press R
00:58:39.960 and make it look like
00:58:44.480 this okay we have all login I forgot to
00:58:47.599 wrap this with
00:58:50.319 parenthesis now I'll just uh reload this
00:58:53.760 once again it should work here we go
00:58:56.599 this is what we have in the
00:58:57.920 authentication page specifically in the
00:59:00.480 login page we just added the uh brand
00:59:03.720 section now we'll like to have an
00:59:06.240 illustration where we'll like to get
00:59:08.280 this image so I've got this from a
00:59:11.319 website called story
00:59:13.680 set let me show this story set.com it
00:59:17.960 should be and I think I got it from the
00:59:21.960 Bro
00:59:23.280 Styles I search for something like
00:59:27.079 social and let me actually provide you
00:59:29.799 the actual link so I have just grabbed
00:59:32.640 the link let me paste it it is story
00:59:35.240 set.com SL illustration slashonline
00:59:38.760 wishes SL bro it's funny name but there
00:59:42.760 we go this is the image that you can go
00:59:44.920 ahead and download it then put it into
00:59:47.839 your assets or you can simply grab it
00:59:51.240 from the GitHub Revo so under the images
00:59:54.200 I would like to get this
00:59:57.000 image from the source code so I'll take
01:00:01.920 the oath bg2 this is what I have called
01:00:05.720 it and just like if you want to use a
01:00:08.520 different images I have prepared two of
01:00:11.400 them as well so o bj3 and one I would
01:00:15.319 like to use this one but you can use any
01:00:17.760 of the the others that we have all right
01:00:21.359 so we would like to get the illustration
01:00:23.799 now it is your challenge to go ahead and
01:00:26.000 and display the image on the screen so
01:00:28.760 we have seen this previously since it is
01:00:31.200 a local image we need to require it in
01:00:34.039 the uh in the image source so here I'll
01:00:37.280 just say
01:00:39.880 illustration and paste it we have an
01:00:43.359 image let's import it from react native
01:00:45.880 and under the source we are going to get
01:00:47.760 this image since this is a local image
01:00:50.160 we need to require it right let's save
01:00:53.559 there we go this is what we got you can
01:00:55.559 use cover or contain this is basic CSS
01:00:59.359 I'll go with the cover and after the
01:01:02.240 illustration we can put the login
01:01:06.280 section basically where we have the
01:01:08.880 button right I would like to once again
01:01:12.839 copy this and paste it and please don't
01:01:16.119 get mad this is super basic stuff that
01:01:18.240 we have seen so far like VI touchable
01:01:21.160 opacity style onpress like this is
01:01:24.480 something that we haven't seen but name
01:01:26.599 makes sense like on press we don't have
01:01:29.039 this function let's leave it as an empty
01:01:31.960 function for
01:01:33.760 now we'll just say console
01:01:37.079 log okay let's save this is what we got
01:01:40.119 with the
01:01:41.240 styling now we should be able to make
01:01:43.880 this work currently if you click to it
01:01:47.200 we just see a console log but we are
01:01:49.319 going to make it work with Clerk and
01:01:51.520 specifically with the Google
01:01:53.319 authentication now when we click to this
01:01:55.520 button instead of doing this dummy
01:01:57.920 operation let's actually call this
01:02:00.359 function handle Google signin which is
01:02:03.200 something that will create above so
01:02:05.839 let's say const handle Google signin
01:02:08.559 this is going to be an async arrow
01:02:10.880 function and here we would like to do
01:02:13.559 something which is first we need to get
01:02:17.160 something from use SSO from clerk so use
01:02:21.240 single sign on and here we'll like to
01:02:23.880 get start SSO flow
01:02:26.559 and here I would like to get the router
01:02:29.400 just like in react but this is going to
01:02:31.400 be coming from let's say Expo router
01:02:34.400 this will allow us to do navigation
01:02:36.880 manually here I would like to have a try
01:02:40.000 catch block um here in the try we'll
01:02:43.279 like to say await start SSO flow and our
01:02:48.520 strategy will be all Google you can see
01:02:51.640 there are a bunch of different options
01:02:53.400 but in our case we are going with Google
01:02:56.400 and this will give us a couple of
01:02:58.240 different things which we can D
01:03:01.000 structure like we can get the create
01:03:03.799 session ID as well as set active so all
01:03:08.039 these are coming from the clerk
01:03:09.760 documentation please feel free to check
01:03:12.119 this out uh let's say set active if we
01:03:15.480 got this and if create session ID
01:03:18.039 existed we would like to say set active
01:03:21.319 with the uh session created session ID
01:03:25.319 this will be basically authenticate the
01:03:27.960 current user and once we are
01:03:29.799 authenticated we can just replace the
01:03:32.319 current screen with the homepage which
01:03:35.039 is going to be tabs right okay just like
01:03:37.920 that in the catch we can just put a
01:03:40.079 console log and we should be good to go
01:03:44.079 let's say this is going to be
01:03:46.240 error okay I'll save and let's click to
01:03:50.319 this here we go it says Expo wants to
01:03:53.599 use google.com let's just say continue
01:03:56.839 we should be able to see our accounts so
01:03:59.240 these are the things like these are the
01:04:01.039 accounts that I have added previously
01:04:03.000 and the language is Turkish at the
01:04:05.319 moment let's just make it to be English
01:04:07.720 so that everyone is
01:04:11.400 happy okay so let's just try to log in
01:04:14.400 with this one let's say
01:04:17.680 continue okay since we are since we are
01:04:20.559 just authenticated it take us to the uh
01:04:24.119 feed page right we just go go into the
01:04:26.599 homepage or home screen I should say if
01:04:29.520 you visit your dashboard you should be
01:04:31.520 able to see that you have a user that is
01:04:34.200 just logged in which means everything is
01:04:36.839 working
01:04:38.920 correctly okay but now if we restart our
01:04:42.599 application what is going to happen it
01:04:45.480 will still take us to the authentication
01:04:47.599 page it is because in our root layout
01:04:51.520 let me close everything in our root
01:04:53.960 layout we don't really have any check
01:04:56.520 for the authentication right we always
01:04:59.480 take the user to the login page or login
01:05:02.960 screen but we should fix it right in our
01:05:06.160 root layout before our application
01:05:08.680 started we should check if user is
01:05:11.240 authenticated or not depending on that
01:05:13.799 we should take the user either to the
01:05:15.920 login page or to the related page right
01:05:19.760 so for this I would like to go ahead
01:05:21.880 create a component so that I can put the
01:05:24.720 logic specifically into that file so
01:05:27.880 just say
01:05:28.839 components the name that I'll come up
01:05:31.200 with will be initial L out. TSX you can
01:05:35.880 call this anything but I think this
01:05:37.640 makes sense so I'll say
01:05:39.760 rnf which will be a functional component
01:05:43.200 and here we don't really have anything
01:05:45.119 related to react native because we are
01:05:47.200 not going to return um jsx right let's
01:05:51.079 just delete this this will be a
01:05:52.960 component where we handle the
01:05:54.839 Authentication and navigation let me
01:05:58.160 zoom in once again okay so first I would
01:06:01.359 like to get some stuff from use oath
01:06:05.279 from clerk so what can we get from here
01:06:08.520 let's say we would like to check if
01:06:11.200 clerk is loaded right you can read the
01:06:13.839 description a Boolean that indicates
01:06:16.240 whether clerk has completed
01:06:18.400 initialization initially it is false and
01:06:21.240 it will become true once clerk loaded
01:06:24.279 and we can check if use is signed in or
01:06:26.880 not then we can get the
01:06:29.960 segments let's say use segments and
01:06:33.680 you're going to see what that means
01:06:35.920 basically it will give you the segments
01:06:38.680 of the current screen so if you're in
01:06:40.960 the home screen if you're in the login
01:06:43.880 screen you know if you're in the
01:06:46.799 notifications so on and so forth we're
01:06:49.599 going to see this in a second and let's
01:06:52.359 say um okay we'll get a router
01:06:57.520 I'll say use router coming from
01:06:59.960 explorator because as you can tell we'll
01:07:02.359 be doing some navigations and here I
01:07:05.799 would like to have a use effect coming
01:07:08.119 from react even though this is react
01:07:10.279 native we can still use react as you can
01:07:13.359 tell we have talked about it previously
01:07:15.720 it is really really similar to react on
01:07:18.400 top of react you just have couple of
01:07:20.680 different concepts right and now in this
01:07:24.680 use effect we would like to check for
01:07:27.480 some stuff so first of all I'll say if
01:07:30.839 clerk is not
01:07:32.599 loaded just return don't do anything and
01:07:36.200 here we can add is
01:07:40.319 loaded we'll say is signed
01:07:43.319 in and we can add the segments so if any
01:07:47.799 of these changes
01:07:50.119 right if any of these changes this use
01:07:53.319 effect should run once again and and now
01:07:56.160 I'll get a variable I'll say if you are
01:07:58.520 in the
01:07:59.520 oath
01:08:02.079 page and this is how we can check for it
01:08:04.680 we'll just say if segments of the first
01:08:07.839 item is equal to oath if this is the
01:08:10.640 case that means we are in the oath page
01:08:13.119 and since we don't really have Pages
01:08:14.880 let's say in oath
01:08:17.439 screen let's say if user is not signed
01:08:20.960 in and if user is not in the oath screen
01:08:25.839 which means they should be navigated to
01:08:28.319 the homepage or to the login page my bad
01:08:32.080 we'll say router. replace take them to
01:08:34.759 the login page and in the same way if
01:08:38.158 they are trying to
01:08:40.040 cheat so let's say else if oops let's
01:08:44.439 say else if user is signed in and if
01:08:48.279 they are still trying to visit the login
01:08:51.560 page we're going to just take them to
01:08:53.520 the homepage right and at the end we'll
01:08:57.080 say if it is not loaded we can just
01:09:02.080 return null or we can return a loader
01:09:06.640 component and here if everything is done
01:09:10.198 successfully we can just return the
01:09:13.839 stack let's get this and we'll just say
01:09:16.479 screen options header shown to be
01:09:19.279 false okay so if user is authenticated
01:09:23.238 and if they visit let's say home screen
01:09:25.839 or if they visit notification screen we
01:09:28.439 are never going to hit any of these if
01:09:30.158 checks we will just take them to the
01:09:32.158 related screen and now we'll go ahead
01:09:35.279 into this layout instead of having this
01:09:37.839 stack we will have the initial layout so
01:09:41.479 previously we had stack as it is but now
01:09:44.719 we have put it here on top of it we have
01:09:47.600 added the authentication logic that will
01:09:50.679 do the navigation so I hope this makes
01:09:53.359 sense
01:09:55.920 let's get the initial
01:09:57.920 layout save it and now here we can see
01:10:01.640 since we are logged in it takes us to
01:10:04.040 the homepage I'll go ahead and
01:10:07.440 refresh like we are by default in the in
01:10:11.400 the home screen even though our index
01:10:14.600 file says take the user to the login
01:10:17.760 right since initial layout runs we are
01:10:21.560 in the actual home screen okay so let's
01:10:25.400 quickly close everything and reiterate
01:10:28.600 what we have done so far then we'll just
01:10:30.560 move on with the next section so we have
01:10:33.000 set it up cler we just need to get some
01:10:35.760 environment variables we need to set up
01:10:38.000 this cache. TS file which is something
01:10:40.520 that we don't really need to understand
01:10:42.280 completely this is something that clerk
01:10:45.480 needs to be able to handle the
01:10:47.159 authentication securely and then we have
01:10:49.880 built a login page with a really cool
01:10:52.560 design and we have added this fun
01:10:55.320 function called handle Google signin
01:10:58.800 where we just use the clerk functions
01:11:01.480 and once you are authenticated we take
01:11:03.640 the user to the homepage and in the
01:11:06.560 initial check we have a component called
01:11:09.400 initial layout that will do the
01:11:12.280 authentication uh navigation right if
01:11:15.120 user is not signed in and if they are
01:11:17.679 not in the oath screen they should be
01:11:20.000 navigated to the oath screen in the else
01:11:23.040 case they should be in the tabs page and
01:11:25.840 if none of these are correct then we're
01:11:29.719 going to hit this return statement where
01:11:31.800 we'll show the related page okay and we
01:11:36.480 have wrapped our entire application with
01:11:39.639 these cler providers and we have the
01:11:42.360 initial layout check in like in the root
01:11:46.280 layout right okay so I hope this makes
01:11:49.280 sense this might look a little bit
01:11:51.280 complicated but if you think about it if
01:11:53.600 you go step by step about this code
01:11:56.480 basee I think it should make sense so I
01:11:59.840 would say pause the video and take a
01:12:01.840 look at the code base try to see what we
01:12:04.040 have done so far it should take around 5
01:12:06.800 minutes and then in the next section
01:12:08.679 we're going to go ahead and integrate a
01:12:10.920 database to our current
01:12:13.360 application all right so this is where
01:12:15.800 we left we have integrated clerk for the
01:12:18.560 authentication and now it is time to
01:12:20.760 have a database and for this we'll be
01:12:23.560 using convex you can find the link in
01:12:25.920 the description they have a free plan
01:12:28.480 that we can use just like clerk so let's
01:12:31.600 go ahead and visit that before we try to
01:12:34.560 log in and create an application just
01:12:37.120 know that convex can be used as your
01:12:39.679 entire back end and actually in this
01:12:42.480 project we'll be using it as our
01:12:44.639 database which works in real time out of
01:12:47.360 the box and we'll be using their file
01:12:50.040 storage to be able to store our files
01:12:53.400 such as such as our post Imes right and
01:12:56.760 there are a couple of different concepts
01:12:58.920 like queries mutations actions so on and
01:13:02.000 so forth we'll get into we'll get into
01:13:05.320 them right so I would like to just go
01:13:07.480 ahead and log
01:13:11.000 in if you don't have an account go ahead
01:13:13.600 and create one uh you don't really need
01:13:15.760 to pay anything once again you can
01:13:18.280 create a project from here but what we
01:13:20.800 would like to do actually create it from
01:13:23.239 the terminal so I'll open up my terminal
01:13:26.040 let's kill this with command or control
01:13:28.800 C and clear this up we would like to say
01:13:31.960 npm
01:13:33.120 install oops let's say npm install
01:13:36.920 convex and by the way you can take a
01:13:39.520 look at the documentation as well let's
01:13:41.800 say documentation. convex
01:13:44.480 DOD they have bunch of different sdks in
01:13:47.679 our case we would like to have react
01:13:49.520 native with Expo so we already have an
01:13:52.520 expo application we would like to just
01:13:54.560 install convex and run this command
01:13:57.840 let's see what this will do in the
01:14:00.679 terminal now that now that we have this
01:14:02.800 ready let's go ahead paste this in if
01:14:05.560 you're using this command for the very
01:14:07.600 first time it will ask you to log in to
01:14:10.360 your conix account but since I am
01:14:13.040 already logged in it asks me to create a
01:14:16.159 new project or choose an existing one I
01:14:19.120 would like to create a new project so
01:14:20.960 I'll just select this press enter now we
01:14:24.480 can give it a name so I'll just say
01:14:26.280 Spotlight app let's just Auto accept
01:14:29.560 that and we would like to deploy this on
01:14:33.159 a cloud I mean CLA environment so I'll
01:14:36.920 just select this one it will go ahead
01:14:39.320 and create a project for us now it says
01:14:42.639 it is ready let's take a look at
01:14:44.920 it there we go in real time it works we
01:14:48.000 got the spotlight application and here
01:14:51.320 we don't really have like any tables but
01:14:54.400 we would like to to create couple of
01:14:56.199 different tables right such as one for
01:14:59.679 users posts
01:15:02.080 notifications likes so on and so forth
01:15:05.719 okay but first we need to handle the
01:15:09.480 authentication as well so what do I mean
01:15:11.960 you might say okay we already handled
01:15:14.080 that right we got the clerk it is
01:15:16.560 working so that's correct but we also
01:15:19.239 need to connect that authentication
01:15:21.320 Service with our database because at the
01:15:24.360 end of the day if you think about it
01:15:26.520 Clerk and convex are two different
01:15:29.280 Services when someone signs up with
01:15:31.960 clerk we need to let our database know
01:15:35.040 about that user so that we can store it
01:15:37.600 in our database so let's try to see in
01:15:41.199 the documentation we are going to take a
01:15:43.520 look at the um authentication
01:15:47.400 specifically with
01:15:49.520 clerk okay so this tells you to go ahead
01:15:53.320 sign up to Clerk this is something that
01:15:55.800 we already done we have created an
01:15:58.280 application and now it says you should
01:16:00.600 create a JWT template so let's go here
01:16:04.199 under the configure and make sure you
01:16:06.400 selected the correct
01:16:08.400 application so configure JWT templates
01:16:12.600 create a new one that is matching with
01:16:16.600 convex okay just copy this isue URL save
01:16:21.920 this and let's take a look at the next
01:16:24.239 step
01:16:25.480 they tell us to create an oath.
01:16:34.280 config.sys it but we got a convex folder
01:16:38.400 which is the place that we're going to
01:16:40.000 put everything related to our database
01:16:43.280 which is convex database right so let's
01:16:45.520 go ahead and first handle the
01:16:46.920 authentication under this oath. config
01:16:49.920 dots file so I will paste what I have
01:16:53.560 copied for a second we'll be using it
01:16:56.880 and copy this entire
01:16:59.719 thing paste it below and we would like
01:17:02.639 to change this part with what we have
01:17:06.040 right here so let's cut it and paste it
01:17:10.600 okay this should be good to go this is
01:17:12.760 something that we had to do around eight
01:17:15.520 lines of code let's close this file
01:17:18.480 let's see the next step okay they tell
01:17:21.000 you that you should be running this now
01:17:23.679 to be able to deploy your changes but we
01:17:26.639 already have this open right now it just
01:17:29.520 says convex functions are
01:17:31.920 ready so keep this in mind from here and
01:17:35.040 out until the end of this tutorial you
01:17:37.679 would like to have two different
01:17:39.320 terminals open one would be running this
01:17:42.840 npx convex Dev so every single time we
01:17:46.440 should have this npx convex St running
01:17:50.159 because when we add a function that is
01:17:53.360 related to our database it will deploy
01:17:56.199 our changes to convex and then we are
01:17:59.920 going to run our application with npx
01:18:03.840 Expo right I'll just run this in a
01:18:06.400 second but first let's see the other
01:18:08.679 steps so here this is the uh guide for
01:18:13.920 uh clerk react but in our case we are
01:18:16.360 using Expo so we don't really need to
01:18:18.639 install this I believe let's try to see
01:18:21.400 how we can make this work um like they
01:18:24.880 can like you can see in the main. TSX
01:18:28.280 they wrap the entire application with
01:18:30.600 clerk provider as well as convex
01:18:33.280 provider with clerk so let's try to do
01:18:35.840 this but instead of app we would like to
01:18:38.960 wrap our layout right our entire
01:18:43.520 application so I know this might sound
01:18:45.679 complicated but let's just try to see it
01:18:48.440 I would like to wrap or I would like to
01:18:51.800 create a folder called providers
01:18:55.120 to keep our code Base clean and I will
01:18:57.840 say Clerk and convex
01:19:02.920 provider.
01:19:04.480 TSX so basically instead of having this
01:19:08.600 clerk um logic here I would like to take
01:19:12.120 this and put it into it into its own
01:19:14.880 file so let's try to build this file
01:19:18.760 I'm so let's try to build this file I
01:19:21.880 promise it'll make 100% sense so I'll
01:19:25.120 just say rnf to get this code let's
01:19:28.480 delete this Imports we can delete this
01:19:31.239 return statement instead of a VI we'll
01:19:34.719 like to get the clerk provider which is
01:19:37.600 going to be coming from clerk Expo and
01:19:40.080 this is exact same thing what we have
01:19:41.840 done here we would like to get the token
01:19:45.080 as well as the publishable key let's try
01:19:47.960 to import these basically I'll just cut
01:19:50.920 this from here get it and then let's get
01:19:54.719 the token cache get the clerk provider
01:19:58.280 okay now inside of this instead of just
01:20:01.239 having the clerk loaded we would like to
01:20:03.840 have the convex provider as well so say
01:20:07.120 convex provider with clerk I think it
01:20:11.120 should be provider with
01:20:14.719 clerk just like this and we will be
01:20:17.719 importing this from
01:20:21.199 here okay now this gives us an error
01:20:25.639 because if you take a look at the
01:20:27.719 documentation this takes a client as
01:20:30.360 well as a use oath so let's try to add
01:20:34.280 those here I'll just say use oath here
01:20:37.920 will get the use oath from clerk Expo
01:20:40.920 then we'll like to add a client let's
01:20:43.800 try to create it above I will copy this
01:20:47.440 so this is coming from
01:20:49.920 documentation um convex react client
01:20:52.920 should be coming from
01:20:55.480 convex react okay just like this let's
01:20:58.840 try to import it there we go and we are
01:21:02.040 using uh public convex URL this is
01:21:05.960 coming from the env. local when we run
01:21:09.400 this command in our terminal we got
01:21:12.040 these environment variables okay just
01:21:14.679 keep that in mind I forgot to show you
01:21:16.600 this but these are the things that we
01:21:18.400 have in the EnV
01:21:21.440 file
01:21:22.960 okay then we'll go ah head and add this
01:21:25.639 convex client right here then we can
01:21:29.080 just say once clerk is
01:21:32.000 loaded we can wrap our children with it
01:21:35.960 and this children will be coming here as
01:21:39.360 a prop we can say children will be type
01:21:42.360 of react node so what we have done so
01:21:45.480 far is basically we took this entire
01:21:48.960 part put it into its own file into its
01:21:53.000 own component and on top of it we have
01:21:55.679 integrated convex with it right so we
01:21:58.960 can basically go ahead delete this part
01:22:01.880 completely we can delete the token cache
01:22:04.800 these Imports and we can wrap our
01:22:08.199 application with the clerk and convex
01:22:10.960 provider that we have just created now
01:22:14.199 in our entire application we can have
01:22:17.560 the clerk and convex working
01:22:20.920 together and we have take this logic put
01:22:24.520 put it into its own file so that our
01:22:26.960 code base is a lot more readable and it
01:22:30.480 is like
01:22:33.320 organized okay so with this in mind
01:22:35.880 let's try to delete this stack and save
01:22:38.440 this
01:22:39.679 file all right so we are making a really
01:22:42.760 good progress so far we have integrated
01:22:45.360 authentication as well as a database now
01:22:48.400 you might feel like we are going a bit
01:22:50.199 slowly that's correct but we are
01:22:52.480 actually building a real word app
01:22:54.480 application right so we just need to
01:22:56.840 take care of every single step slowly so
01:22:59.719 that we all understand everything that
01:23:01.960 we do now we have database as well as as
01:23:06.159 well as authentication system it is time
01:23:08.679 to maybe just go ahead and Define our
01:23:11.880 tables so I have said we're going to
01:23:14.040 have tables for users posts comments so
01:23:18.320 and and so forth right and since it is
01:23:20.920 related to our database we're going to
01:23:23.159 go into the convex folder
01:23:25.159 and we will Define our schema so let's
01:23:27.960 say schema. TS this is a special file
01:23:31.320 that will make our codebase to be uh
01:23:34.560 type safe so if you don't know what that
01:23:36.480 means it'll basically give us Auto
01:23:39.360 completions so that we don't really have
01:23:41.440 any errors in our code so it'll just be
01:23:43.840 type save as the name suggests all right
01:23:46.679 so let's just try to see how we can
01:23:48.800 Define our tables how we can Define our
01:23:51.520 schema I'll say export default and let
01:23:54.320 me me Shing the left hand side we're
01:23:56.400 going to say Define schema which is a
01:24:00.239 function let's say let me just delete
01:24:03.360 this this is a function coming from
01:24:05.920 convex I don't know why it did not
01:24:08.080 import it by default but it should be
01:24:10.560 coming from convex server this will take
01:24:13.560 an object and here we can Define our
01:24:16.280 tables the first table that I'd like to
01:24:18.960 have will be users so we just say users
01:24:22.800 Define table
01:24:25.480 say Define table just like this it'll be
01:24:28.600 coming from the same import from convex
01:24:31.800 server this is a function that we're
01:24:34.000 going to call and we're going to put an
01:24:35.800 object with the fields that we' like to
01:24:38.040 have so each user will have a username
01:24:41.760 and this is going to be type of string
01:24:44.280 but this is how we can do it we'll just
01:24:46.040 say v. string and we need to get this V
01:24:49.760 from convex values which is our
01:24:53.080 validator okay then each user will have
01:24:56.040 a full name so let's say v. string as
01:24:58.920 well so if this is something like a
01:25:01.639 jandoo this will be the full name
01:25:04.080 version of it like this then we'll like
01:25:07.280 to have email for every single user oops
01:25:10.520 let's say v. string every single user
01:25:13.480 will have a bio but this could be
01:25:16.119 optional right so I might not have any
01:25:20.159 bio so I can just say v. optional and it
01:25:23.760 will be type type of
01:25:25.840 string then each user will have an image
01:25:29.119 this could be optional but since users
01:25:31.280 are logging in with Google they will
01:25:33.960 have an image anyways so I'll just
01:25:36.199 remove the optional field and let's say
01:25:39.440 each user will have some followers which
01:25:42.280 is going to be say v. number we'll just
01:25:45.920 store this as a value in the same way we
01:25:48.639 will have number of
01:25:50.480 followings and in the same way we will
01:25:52.920 have the number of posts
01:25:54.920 then finally I would like to get a field
01:25:57.920 called clor ID which will be type of
01:26:01.000 string now why do we store clerk ID in
01:26:04.119 the users table so if you think about it
01:26:07.480 Clerk and convex are two different
01:26:09.920 Services right we have talked about this
01:26:12.880 when we authenticate with clerk when we
01:26:16.000 sign up with clerk we will save the same
01:26:18.639 user to our database so let's say we got
01:26:21.719 the user that has just signed up with
01:26:23.840 Clerk we would like to save it to our
01:26:26.119 database and we would like to keep a
01:26:28.560 reference to this user so we will just
01:26:31.159 add a clerk ID what it corresponds in
01:26:34.239 the clerk service right and this is the
01:26:37.719 field how we can do it when user signs
01:26:40.880 up we will add the clerk ID of this user
01:26:43.679 and by default users will have a field
01:26:47.360 called underscore ID this will be given
01:26:50.119 by convex so if you have used mongodb
01:26:53.560 previously it would do the same thing so
01:26:56.440 here uh convex doeses the same thing and
01:26:59.719 it gives you a creation time field as
01:27:03.400 well by default which is the created at
01:27:07.159 date okay now we would like to add some
01:27:10.639 indexes which would help us for the
01:27:13.520 querying later in the video so we can
01:27:15.960 just get a user by their clerk ID right
01:27:19.119 so I can just say add an index you can
01:27:21.679 call this anything I'll call this as a
01:27:23.600 buy clerk ID and the field that we would
01:27:27.119 like to querry with will be clerk ID so
01:27:30.520 basically later in the video we'll say
01:27:32.880 hey give us a user so let's say an
01:27:35.880 example let's say get user
01:27:39.159 by clerk ID okay let's just get this
01:27:44.360 let's say we're going to call a function
01:27:46.920 uh we're going to put the clerk ID let's
01:27:48.679 say it is one two three and it will give
01:27:50.840 us the user with this clerk ID I hope
01:27:54.800 that makes sense basically index is used
01:27:57.520 to have some quering it'll just make it
01:28:00.719 faster and then we can we can add our
01:28:03.800 other tables so I would like to just
01:28:07.119 grab and paste them uh one by one and
01:28:10.840 I'd like to walk you through it line by
01:28:13.040 line okay so we have the posts table
01:28:16.719 just like what we have here we will
01:28:18.480 Define a table each post will have a
01:28:21.280 user ID this is the owner of the post
01:28:24.639 then each post will have an image URL
01:28:27.520 because this is an application like
01:28:30.159 Instagram we have to have an image and
01:28:33.440 we would like to store a storage ID now
01:28:36.400 this will be needed when you want to
01:28:38.400 delete a post and the type of this will
01:28:41.360 be storage ID this is something that
01:28:43.679 we'll get later in the video and here
01:28:46.040 the user ID if you have realized is type
01:28:48.560 of V uh like user ID if you delete this
01:28:51.960 part you can see it should be type save
01:28:55.440 um currently it
01:28:56.800 isn't I don't know maybe in this schema
01:28:59.320 we don't really get it but in other
01:29:00.880 files we will actually get that then
01:29:03.920 each post will have a caption but it'll
01:29:06.400 be optional so you don't really need to
01:29:08.159 add a caption and we're going to store
01:29:10.360 the number of likes as well as comments
01:29:12.960 then we're going to get like we're going
01:29:14.679 to add an index where we'll just say hey
01:29:17.679 give us a post by user and we're going
01:29:20.560 to pass the user ID it'll give us the
01:29:22.760 post that match with that user ID so if
01:29:26.000 this index stuff doesn't make sense once
01:29:28.360 we use them I think it'll be
01:29:30.960 clear okay then we'll like to store the
01:29:34.480 comments right I'll just put the
01:29:37.119 comments table let's define it each
01:29:39.639 comment will have an author which will
01:29:42.440 be the user ID and each comment will be
01:29:45.400 made on a post right so it will be
01:29:47.600 related with a post we just put those
01:29:50.719 types those fields and then we add the
01:29:54.040 comment content itself and again we just
01:29:57.000 add a query then we'll like to store the
01:30:00.520 number of likes right or like I should
01:30:04.440 say we are going to have a likes table
01:30:07.280 and I'll just put it above the
01:30:09.320 comments let's put a comma here okay
01:30:12.840 we'll have a table called likes whenever
01:30:16.040 we like a post we're going to create a
01:30:19.000 like document which will have a user ID
01:30:21.960 and post ID user ID is the one liked
01:30:26.320 right so it is the author and the post
01:30:29.040 ID means which post that we have liked
01:30:32.280 then we can add some indexes now please
01:30:35.360 let me just grab those we should be able
01:30:38.159 to query a like with the post ID
01:30:43.080 and um so I should say and then we
01:30:45.719 should be able to get with the user and
01:30:48.239 post 8 so once again if this doesn't
01:30:50.639 make sense I think it should be really
01:30:53.080 really clear when we when we reach to
01:30:56.600 the end of the tutorial because we'll be
01:30:58.520 using the these
01:30:59.920 indexes um and it should be really
01:31:02.360 really clear then let's get the follows
01:31:05.719 table in the same way we would like to
01:31:07.960 have couple of different indexes let me
01:31:10.560 go ahead and put it
01:31:12.239 below so we are defining another table
01:31:15.360 where we have a follower ID and
01:31:17.440 following ID so let's say we have two
01:31:19.800 different users John and Jane
01:31:24.440 now if John let's say JN follows Jane
01:31:29.239 that means JN is following and sorry JN
01:31:34.400 is the follower right it follows the
01:31:36.560 Jane and Jane is the following when JN
01:31:39.960 follows the chain we will create a
01:31:41.960 follow document we will say follower ID
01:31:45.560 we will put the John's ID and following
01:31:48.080 ID would be the chains ID now I'm just
01:31:51.119 explaining it really slowly it might be
01:31:53.480 your very first time building a social
01:31:55.400 media application so I feel like I had
01:31:57.560 to explain it then we add a couple of
01:32:00.159 different indexes that we'll be using
01:32:02.080 later in the video okay then we would
01:32:04.800 like to keep track of the notifications
01:32:07.239 so when you like a post or when you
01:32:10.199 comment on a post or when you follow
01:32:13.159 someone you would like to send a
01:32:15.440 notification so let's create this table
01:32:18.159 I will say notifications Define a table
01:32:21.239 with these fields so each notification
01:32:24.199 will have a receiver as well as a sender
01:32:27.119 and we will store them as IDs Now
01:32:30.040 notifications will have three different
01:32:32.280 types either like comment or follow so
01:32:36.440 you could simply go ahead just say v.
01:32:39.520 string this is also acceptable but just
01:32:42.320 to make our code a little bit more clean
01:32:44.800 we can just force this right we'll say
01:32:47.159 it'll be Union
01:32:48.679 type and it will be one of them so v.
01:32:52.800 literal it could be either like comment
01:32:56.199 or follow then the like it will have two
01:33:00.040 different fields one post ID and one
01:33:03.159 comment ID now these are optional it is
01:33:06.080 because if it is a follow notification
01:33:09.080 it is not related to any post so it's
01:33:11.400 not going to have any post ID and it
01:33:13.360 will not have a comment ID as well but
01:33:15.600 if it is a like or if it is a comment
01:33:18.440 notification it will have these fields
01:33:22.600 right and and here once again we add an
01:33:25.920 index so we have one last table let me
01:33:29.719 save to get this formatting and by the
01:33:32.280 way whenever you save it will take a
01:33:35.679 look at this file and try to deploy your
01:33:38.360 functions to your convex
01:33:41.159 dashboard okay so the very last table
01:33:44.800 that we'll have will be bookmarks let me
01:33:47.080 just paste it whenever we bookmark a
01:33:49.880 post we will create a bookmark do
01:33:53.000 document with these fields okay so I can
01:33:56.560 definitely feel this might feel a little
01:33:58.840 bit overwhelming but basically these are
01:34:02.199 the tables that we'll have in this
01:34:04.239 tutorial in this project and we'll be
01:34:06.639 using these
01:34:08.320 indexes okay let's save and take a look
01:34:12.800 at our
01:34:16.320 dashboard if you like if you say
01:34:19.800 generate schema I don't know why we
01:34:21.800 didn't get that but let's refresh this
01:34:23.560 page
01:34:24.840 page okay so I think I have visited the
01:34:29.000 production um I should be visiting the
01:34:31.960 development right let's take a look at
01:34:33.920 this instance if you take a look at the
01:34:36.080 data you should be able to see all the
01:34:38.480 fields like all the tables that we have
01:34:41.199 and if you say show
01:34:42.760 schema like this is crazy the code that
01:34:45.639 we have just written in our local
01:34:47.920 machine is now accessible on the web in
01:34:50.960 the convex dashboard so the these are
01:34:54.480 this is the code that we have just
01:34:56.000 written and in the same way we should be
01:34:58.639 able to see our functions right here but
01:35:01.760 currently we don't really have any
01:35:03.239 functions which is something that we'll
01:35:05.560 build next so I have just said we're
01:35:08.760 going to build some functions and
01:35:11.000 specifically convex functions now you
01:35:13.520 might be asking what is a convex
01:35:15.360 function well basically any operation
01:35:18.119 that we need that is related to our back
01:35:20.440 end for our database we're going to
01:35:23.080 build a function to give you some
01:35:25.239 examples let's say if you want to get
01:35:28.000 some posts right if you want to do a get
01:35:30.760 request we're going to be writing a
01:35:32.800 function called query and it will you
01:35:35.920 know give us some response so here it'll
01:35:38.920 return us the posts and in the same way
01:35:41.560 we have a different type of function
01:35:43.679 called mutation where we can use this
01:35:46.159 for create update and delete operations
01:35:49.800 and here are some examples if you wanted
01:35:52.119 to create a post we're going to build a
01:35:55.040 mutation if you wanted to update a
01:35:57.639 comment we're going to build a mutation
01:35:59.639 and in the same way if you want to
01:36:01.040 delete a post we're going to build a
01:36:02.960 mutation for it so the first uh mutation
01:36:06.040 that I'd like to build is to create a
01:36:08.760 user right let's say create user this is
01:36:12.159 going to be a mutation that will write
01:36:14.239 in our convex back end and you might be
01:36:17.239 asking why this is the case so let's
01:36:19.639 just take a look at it on a diagram So
01:36:22.119 currently this is the state of our
01:36:24.119 application we just signed up with clerk
01:36:27.000 right we have the user under our clerk
01:36:29.880 dashboard but we don't really have a
01:36:31.960 user in our database right if you take a
01:36:34.600 look at it we don't really have this
01:36:36.199 user so we need to take that user and
01:36:39.639 create it in our database as well and
01:36:42.159 how can we make this happen well there
01:36:44.360 is a concept called Web hooks which is
01:36:46.960 something really really important for
01:36:48.760 you to understand this is not specific
01:36:50.960 to react native or this is not specific
01:36:53.719 to this application only this is a
01:36:56.639 general concept every web developer
01:36:59.000 should know so let's just see what they
01:37:01.239 are in the first place they are
01:37:03.280 automated messages that are sent when
01:37:05.840 something happens and in our case that
01:37:08.400 something is when a user created so
01:37:11.679 we'll say hey convex when a user signed
01:37:14.719 up just send us an event to our database
01:37:18.119 we're going to take that user and save
01:37:20.280 it to our database right so there is an
01:37:23.280 event event that clerk has called user
01:37:26.199 created and we are going to listen for
01:37:28.639 this event and this will send only once
01:37:31.600 for every single user because they can
01:37:34.040 only sign up once and like later they
01:37:37.360 can just only log in so I hope that
01:37:39.840 makes sense it will send us an event
01:37:42.560 that is called user created and with
01:37:45.119 this event they will also send the user
01:37:47.320 information such as their full name
01:37:50.480 email uh profile image
01:37:53.599 username so on and so forth and we're
01:37:55.760 going to take this user and save it to
01:37:57.840 our database and let's let's try to
01:38:01.159 create that function called create user
01:38:03.960 so I'll just visit vs code let's kill
01:38:07.199 everything under the convex I will
01:38:09.679 create a file called users. yes and
01:38:13.320 everything that is related to users
01:38:15.440 table we're going to put it here on this
01:38:18.520 file and let me just show you the
01:38:20.599 documentation as well so I'll just say
01:38:22.960 conve
01:38:24.719 functions let's go here take a look at
01:38:26.960 it just in case if you wanted to check
01:38:29.040 this out after completing this tutorial
01:38:31.560 so just remember that everything is
01:38:33.360 actually coming from the documentation
01:38:35.719 so here we can see there are three types
01:38:37.840 of functions that I have mentioned one
01:38:40.199 of them are queries then mutations and
01:38:43.119 also there are actions and you would use
01:38:45.440 actions when you are talking with third
01:38:48.040 party services such as stripe open AI so
01:38:51.239 on and so forth now let's just try to to
01:38:53.520 build our very first mutation so this is
01:38:56.400 the like syntax that they would give you
01:38:59.400 let's just copy it I will paste it into
01:39:01.719 vs code but we're going to obviously
01:39:03.880 change it okay well let's actually
01:39:07.040 delete everything that we have currently
01:39:09.719 just I don't know why I copied it but
01:39:12.800 let's go ahead try to build it from
01:39:14.719 scratch so we have a function you can
01:39:17.239 call this anything in my case I'll say
01:39:19.719 create user this is going to be a
01:39:22.320 mutation which is a function that we
01:39:24.360 call and it takes an argument so here we
01:39:27.440 can take some arcs let's just say if we
01:39:30.360 wanted to create a user user should have
01:39:33.080 couple of different fields one of them
01:39:35.159 is username and if you want to see all
01:39:37.400 the fields that we have these are the
01:39:39.480 things that we should take as an
01:39:41.760 argument right so let me just get them
01:39:44.840 pretty quickly we're going to get the
01:39:46.599 full name for the user because I think
01:39:48.960 this is what we have in the schema then
01:39:51.320 we are going to have an image going to
01:39:53.800 have a bio so these are type of strings
01:39:57.080 this is also type of string but there is
01:39:59.320 one thing this is optional right when
01:40:01.520 user signs up they'll not have a bio so
01:40:04.360 we're going to add the email as well and
01:40:06.880 finally the clerk ID now this is not
01:40:09.440 really happy with us because we need to
01:40:11.280 add a Handler function that will do the
01:40:14.239 logic so let's say async this is going
01:40:16.599 to take the context as the first
01:40:19.199 argument and then we're going to take
01:40:21.000 the
01:40:21.800 arcs now you might say what is this
01:40:24.760 context is all about so by using this
01:40:27.599 context you can interact with your
01:40:29.639 database as well as check the
01:40:32.000 authentication and with this arcs you're
01:40:34.320 able to access to these arcs basically
01:40:38.040 so let's go ahead and just say await so
01:40:40.840 basically we are trying to create a user
01:40:44.080 in database so we'll say await context.
01:40:48.159 db. insert let's just find it and we
01:40:51.960 would like to insert something into the
01:40:54.040 users table and here you can see it is
01:40:56.560 type save right if you press control
01:40:58.440 space you can see all the tables that we
01:41:00.719 have we would like to go under the users
01:41:02.960 table and we're going to add all these
01:41:05.080 fields that we have such as username
01:41:07.800 full name let me just accept everything
01:41:11.239 so these are the arguments that we have
01:41:14.239 above right and on top of these we would
01:41:17.040 like to add the default Fields such as
01:41:19.840 the number of followers following and
01:41:22.239 posts when users sign up by default they
01:41:25.920 will be zero okay now just before we
01:41:29.480 create the user we need to check if it
01:41:31.520 is already existed right because there
01:41:34.320 might be some mistakes and this function
01:41:36.520 might be called twice for a user so
01:41:39.480 we're going to check if a user existed
01:41:42.080 already or
01:41:43.400 not and let's do it I'll just say well
01:41:47.040 actually before we assign it I'll just
01:41:48.679 say await context. DB we would like to
01:41:52.760 query something under the user table and
01:41:55.960 we're going to query it with an index so
01:41:58.840 I'll just go here I'll say dot with
01:42:01.119 index and we have created an index
01:42:03.880 called by clerk ID and these are the
01:42:07.000 other indexes that clerk gives you so if
01:42:10.199 you take a look at the schema this is
01:42:12.400 the index that we have added under the
01:42:14.280 users table so we're going to say with
01:42:16.679 index called by clerk ID and here we are
01:42:19.760 going to pass a callback function where
01:42:22.760 we will take the query so we'll say
01:42:24.960 query. equal to clerk ID if it is equal
01:42:28.800 to this argument and this is going to
01:42:31.679 give us a result where we can fetch it
01:42:33.719 with first or unique so it's the same
01:42:37.199 thing I'll go with first and we will
01:42:39.840 assign this to a variable called
01:42:42.199 existing user just like
01:42:45.920 this and I will say if existing user
01:42:50.400 right if we have a user just return and
01:42:52.760 don't do anything but if user is not
01:42:55.360 existed we're going to go ahead and
01:42:57.119 create the user in the database so I
01:43:00.000 hope this makes sense now we able to see
01:43:02.679 how to create an index as well as consum
01:43:05.320 it we basically uh we basically get a
01:43:09.400 user with the clerk ID and this clerk ID
01:43:12.440 is coming from the arguments okay so we
01:43:15.520 have created this function but how can
01:43:17.840 we call it right we just talked about it
01:43:20.520 on a diagram when someone signs up with
01:43:23.159 with clerk clerk needs to send us this
01:43:26.239 uh webbook event so we just need to set
01:43:28.719 this up and you can take a look at it
01:43:30.840 from the documentation but let me just
01:43:32.920 walk you through it we'll go under the
01:43:35.280 dashboard under the
01:43:37.280 configure we just need to find the web
01:43:40.360 hooks so where is that I
01:43:43.679 think so for some reason I cannot see it
01:43:46.520 let's search for it web hooks okay there
01:43:48.800 we go under the
01:43:51.639 developers we would like to add a
01:43:54.360 webbook and specifically an endpoint so
01:43:58.280 let's say uh to be able to add this
01:44:00.800 endpoint we just need to get our convex
01:44:03.480 URL under the. EnV so I will go ahead
01:44:07.360 copy this entire thing called convex URL
01:44:10.800 and just go here paste it now if you are
01:44:13.880 adding an endpoint for web hook instead
01:44:16.840 of saying Cloud this should be site and
01:44:20.119 you might say how do you know this well
01:44:22.239 basically once again from the
01:44:24.159 documentation let's say HTTP actions
01:44:26.920 convex there we go they tell you that
01:44:30.199 you should use site at the end okay and
01:44:33.840 then there should be an endo that I'd
01:44:36.040 like to listen I'll just call this as
01:44:38.080 clerk web hook you can call this
01:44:40.440 anything literally like hello but it
01:44:43.480 shouldn't like it should make sense
01:44:45.320 right so I'll just say clerk web Hook
01:44:47.560 and the event that I would like to
01:44:48.960 listen to here we can see we have all
01:44:51.760 bunch of like all kinds kind of events
01:44:54.239 but I'd like to listen for user. created
01:44:57.760 okay I'll just go ahead add
01:45:01.119 this and we just got a signing secret so
01:45:04.840 this is really important we should copy
01:45:06.960 this and add this as an environment
01:45:09.960 variable now instead of adding it into
01:45:12.239 the EnV file we will go ahead and add it
01:45:15.199 into our convex dashboard so under the
01:45:18.400 settings under the environment variables
01:45:21.360 we're going to say Clerk book secret and
01:45:24.599 add this value in your case it will be
01:45:27.599 different please use your own because I
01:45:30.000 will delete mine uh before I publish
01:45:32.679 this video let's go ahead and save it
01:45:36.280 okay so now that we have set this up
01:45:38.239 let's go ahead write some code to make
01:45:40.639 this work and I I need to mention
01:45:43.960 something when clerk send us an event we
01:45:47.320 are going to take the user and save it
01:45:49.320 to the database but now think about it
01:45:52.159 everyone can send you this kind of an
01:45:54.520 event right we could have a malicious
01:45:56.840 user it like it'll just send you this
01:45:59.480 event millions of times and in that case
01:46:02.119 you just need to make sure that this
01:46:04.199 event is actually coming from clerk so
01:46:07.480 with this in mind let's try to write our
01:46:10.239 code so I will create a file called HTTP
01:46:14.760 dots and we're going to build the logic
01:46:18.320 in this file so I would like to get in
01:46:21.760 like get a package
01:46:23.560 let me just say npm install
01:46:26.679 svix which is used to verify web hooks
01:46:30.880 okay so let's wait for this to be
01:46:32.960 installed there we go we just got
01:46:36.159 that and I don't have the X application
01:46:39.360 running but I'll just run this in a
01:46:41.119 second let's try to build this file
01:46:43.679 first now first I'll get couple of
01:46:45.800 different imports from convex and we're
01:46:48.599 going to get this web Hook from SV
01:46:51.000 package so let's create a router I'll
01:46:54.080 say const
01:46:56.159 HTTP HTTP router and we're going to call
01:46:59.320 this now I promise this code will make
01:47:02.080 sense once we complete this file just
01:47:04.560 for a couple of minutes bear with me so
01:47:07.000 we'll say HTTP do route we are going to
01:47:11.000 create a route and this will take an
01:47:13.239 object where we'll say path will be
01:47:15.760 equal to what we have just created which
01:47:18.840 was Slash clerk SL web hook so if you
01:47:22.360 have created this something you should
01:47:24.880 put that name in my case this is what I
01:47:28.199 have done right clerk D web
01:47:31.040 hook um let's go back and then the
01:47:34.760 method type it'll be post as well as the
01:47:37.800 Handler function so this is the logic
01:47:40.880 that we're going to
01:47:42.080 put and I'll just put it in line if you
01:47:45.040 want it to you can create a function
01:47:46.719 outside but it is not really important
01:47:49.560 this is not how it'll look like let's
01:47:51.320 say it will be in http be action where
01:47:54.199 we'll take a callback function just like
01:47:56.719 this I believe and instead of calling
01:47:58.800 this wreck I'll just call it as request
01:48:01.920 okay now let's go ahead and create our
01:48:04.119 function logic so first things first we
01:48:06.639 just need to check for the environment
01:48:08.880 variable if it existed or not let's say
01:48:11.280 con web hook secret let me just copy
01:48:14.800 this and paste it because I'm really
01:48:16.360 slow typer and I don't really want to
01:48:18.400 waste too much time so we go under the
01:48:20.840 process. EMV and search for Clark web
01:48:23.920 hook secret and you just need to make
01:48:25.679 sure that this is matching with what you
01:48:28.920 have typed here right it should be
01:48:30.880 exactly the same otherwise it will be
01:48:33.199 undefined and here we'll just say if
01:48:35.599 this web web hook secret is undefined
01:48:38.239 we'll just throw an error and then we
01:48:40.960 just need to check for the headers so as
01:48:43.840 I've said we just need to make sure that
01:48:45.679 this web Hook is coming from clerk so
01:48:48.280 let's go ahead and first check the
01:48:50.599 headers so in this request headers there
01:48:53.679 will be svx ID signature as well as the
01:48:57.239 Tim stamp and if any of these values are
01:49:00.560 undefined then we're going to throw in
01:49:03.159 error just like this or the response
01:49:05.599 will be 400 and we'll just say like no
01:49:09.480 SV headers found but if we have the
01:49:12.679 headers we can go ahead do something
01:49:15.400 else we're going to get the payload from
01:49:17.880 the request and we're going to get the
01:49:20.400 body out of it just like this and then
01:49:23.520 we'll like to create a web hook so I'll
01:49:26.040 just say const web hook we're going to
01:49:28.520 call this um class that we have just
01:49:32.400 above and we're going to put the web
01:49:34.719 hook Secret in it then let's just say
01:49:37.480 let event this could be type of any uh
01:49:40.960 for now let's just leave it as it is and
01:49:43.040 we'll be using this event now I'll have
01:49:45.400 a try and catch block here I'll just say
01:49:48.599 verify the web hook and this this is how
01:49:53.119 we can verify it let me please go ahead
01:49:55.840 and get this so we say uh web hook.
01:49:59.320 verify here is our body and here are the
01:50:02.560 headers if this is if this doesn't throw
01:50:06.400 any errors which means it is verified
01:50:08.719 successfully but if it throws some
01:50:11.199 errors it'll hit the catch block where
01:50:13.840 we'll get the error and throw a response
01:50:17.320 okay so so far what we have done is to
01:50:20.639 check for the environment variable check
01:50:23.000 for the headers and verify the web hook
01:50:26.480 okay so this is what we have done if
01:50:28.360 everything went well so far we can go
01:50:31.239 ahead and actually save user to the
01:50:33.920 database and I would like to get the
01:50:36.320 event type from this uh EVT that we have
01:50:40.199 just created above and here we can see I
01:50:43.280 was going to say this should be type
01:50:44.840 save we can make it just in a second
01:50:47.520 let's say event.
01:50:49.960 type and we'll just check for it so I'll
01:50:52.960 say if so I have just accidentally
01:50:55.159 paused the video let's move on I was
01:50:57.079 going to say if event type is equal to
01:50:59.760 user. created we are going to run this
01:51:02.719 uh block where we can go ahead grab all
01:51:05.679 these fields that we have coming from
01:51:07.840 clerk so we'll basically destructure it
01:51:10.440 from event. data we are getting the ID
01:51:13.560 now here we have email addresses but
01:51:15.800 we're going to take the primary one so
01:51:18.360 here is how we can do it we'll just say
01:51:20.880 con email because in a clerk account
01:51:24.320 user might have bunch of different email
01:51:26.679 addresses we're going to get the primary
01:51:29.239 one right and then we can get the full
01:51:32.119 name so they have the first name and
01:51:34.480 last name we can combine them together
01:51:37.239 right and then we can basically run a
01:51:40.119 mutation oops let me just go back we'll
01:51:43.360 have a try catch Block in the try I'll
01:51:46.159 say a wait context. run mutation and
01:51:50.480 here we'll just say API this is
01:51:52.599 something that we have in uh imported
01:51:54.639 previously this is coming from the
01:51:56.639 generated folder from convex and this is
01:51:59.920 a folder that you don't really need to
01:52:01.719 think about this is something that
01:52:03.960 convex created for us already that will
01:52:07.360 allows us to interact with our database
01:52:10.599 I hope that makes sense we cut the API
01:52:13.679 and from here we'll say
01:52:15.960 api. users here we can see this type
01:52:18.880 save and we can say create user so we're
01:52:21.880 going to call this mutation with some
01:52:24.000 arguments such as the email that we have
01:52:27.599 above we can put it either like this or
01:52:30.520 we can just shorten it this is what I'll
01:52:32.320 be doing we will just add the full name
01:52:34.800 which is the name that we have created
01:52:36.719 above and we're going to put the image
01:52:39.560 which is going to be the image URL
01:52:41.360 coming from clerk now we can get the
01:52:43.960 clerk ID as well as the username so
01:52:47.960 let's say username and how can we create
01:52:50.840 the username for this so so this is what
01:52:53.159 I'll be doing let's imagine the email of
01:52:55.920 the user is equal to Chando gmail.com I
01:53:00.040 will go ahead and get this as the
01:53:02.400 username and let's do it with the split
01:53:05.079 method I'll say
01:53:08.440 email.it with the add symbol and grab
01:53:11.880 the first value right it will be this
01:53:14.880 part I hope that makes sense and in the
01:53:17.639 catch we can console log and error just
01:53:20.639 like that and throw a response with
01:53:23.960 status code of 500 but if everything
01:53:27.119 went well right if we don't really have
01:53:29.679 any errors so far we can return a
01:53:33.400 response where we can say webbook
01:53:35.360 processed successfully and here is the
01:53:37.639 status code okay so I hope now this
01:53:40.639 function or this file is making a little
01:53:44.040 bit of sense so what we have done we got
01:53:46.920 some imports created an HTTP router that
01:53:50.719 we are listening on this path with with
01:53:52.679 this post method and here is the
01:53:55.000 function logic that we're going to run
01:53:57.239 we will take the context as well as the
01:53:59.239 request first we just need to make sure
01:54:01.760 that this event is coming from Clerk and
01:54:04.599 we have a bunch of different really cool
01:54:06.800 checks so that our code looks clean and
01:54:09.599 everything would work properly so we
01:54:12.199 check for the headers check for the
01:54:13.920 environment variable we verify the web
01:54:16.880 hook just like this and for this we have
01:54:19.560 used a package called svx because this
01:54:22.639 is something what uh clerk uses as well
01:54:26.040 so that's why we have to use it this is
01:54:28.040 the web hook infrastructure and then we
01:54:31.159 have verified the web hook successfully
01:54:33.520 we check for that event that we have
01:54:35.560 mentioned previously extract the user
01:54:38.560 data and save it to our database now
01:54:41.679 let's go ahead delete the user from
01:54:44.480 clerk
01:54:46.239 dashboard and we'll try to sign up from
01:54:48.920 scratch let's say delete the user and
01:54:51.679 maybe before we we delete that user
01:54:54.159 let's try to sign out I'll say MPX Expo
01:54:59.159 and I will open up my simulator let's
01:55:01.880 say R uh maybe I should press I first
01:55:06.119 okay it has been like created let's say
01:55:09.280 R okay why is this not
01:55:13.960 working okay so I just close that
01:55:16.480 application press I now with this
01:55:18.800 bundling we should be able to see our
01:55:21.119 application and let me let me actually
01:55:22.960 show you how we can log out I will go
01:55:25.800 into the home screen which was index
01:55:28.520 under the tabs um here instead of this
01:55:31.840 link let's just say we going to have a
01:55:35.480 um I don't know let's just say touchable
01:55:40.480 opacity let's give it some Styles let's
01:55:44.239 say we don't really have this button but
01:55:47.760 let's put it in line I'll just say color
01:55:51.000 do we have color no we don't all right
01:55:53.880 so here I'll just put a
01:55:56.159 text okay just wait a second this look
01:55:58.800 messy but we'll make it work let's say
01:56:01.360 sign out I will take this
01:56:04.320 Styles put it and here I'll just say
01:56:07.119 color will
01:56:09.199 be okay what am I doing it should be
01:56:11.400 another object let's say color should be
01:56:14.199 white let's say okay we have this sign
01:56:16.719 out button and when we click to it we
01:56:19.639 actually want to get something from work
01:56:22.880 so I think it should be used o let me
01:56:25.639 double check this can we have like sign
01:56:29.199 out yep we have so here when we click to
01:56:32.440 this so let's say on press I would like
01:56:35.000 to call the sign out function now Ty
01:56:37.840 typescript is not really happy with us
01:56:40.000 it wants you to put it like this so
01:56:42.239 let's go ahead and do it okay let's save
01:56:45.960 if I clict to this we are signed out and
01:56:48.800 our layout runs once again initial
01:56:51.440 layout and it checks that you are not
01:56:54.079 authenticated it takes you to the login
01:56:56.599 page because we always say whenever the
01:57:00.079 uh is signed in field changes you should
01:57:03.000 run this use effect and that's why we
01:57:05.440 are taken to the oath page okay this is
01:57:09.199 the function that we'll be using later
01:57:11.199 in the video but let's just have it for
01:57:13.079 now in the homepage okay now let's go
01:57:16.840 ahead delete this
01:57:20.199 user now when we try to sign up with
01:57:22.800 clerk we should have the user both here
01:57:25.480 and then in our database let's go into
01:57:27.800 the data we don't have any users but
01:57:30.280 let's make it work I'll try to sign up
01:57:33.840 with my Google
01:57:40.800 account so we just signed up hopefully
01:57:43.800 it should be here as well let's take a
01:57:46.440 look at the dashboard that we got the
01:57:48.920 user okay we have it but for for some
01:57:52.440 reason we didn't get that here let's see
01:57:55.000 why this is the case now this is real
01:57:57.599 world programming we could have some
01:57:59.880 problems and errors but we should be
01:58:02.239 able to debug it pretty quickly and I
01:58:05.560 will not cut this part I want you to see
01:58:08.199 the debugging process so I just went
01:58:10.239 into my web books I need to check why it
01:58:14.840 failed do we have any console logs first
01:58:18.320 let's take a look at it here we
01:58:20.960 don't um um here it
01:58:24.320 says b request hit an error while
01:58:27.440 pushing must have it oh okay so as you
01:58:30.400 can tell we should have a default export
01:58:32.679 of a router which I forgot to do in HTTP
01:58:36.840 TS file so we should say export default
01:58:39.800 this
01:58:40.760 HTTP so I'll go ahead at the very bottom
01:58:43.440 of my file I'll say export default let's
01:58:46.800 save now we shouldn't really have any
01:58:50.480 errors okay I'll go ahead try to delete
01:58:53.280 this user once again and I'll try to
01:58:55.960 sign up from scratch the reason that I
01:58:58.520 am deleting this because this event is
01:59:01.360 only called when user signs up right
01:59:04.079 let's go ahead sign out I'll try to sign
01:59:07.560 up and once again just know that we
01:59:10.079 don't really have the user in the
01:59:13.760 database I'll try to sign up with this
01:59:18.119 account let's refresh we have user in
01:59:21.560 Clerk and in convex as well and it is
01:59:24.599 working in real time I I didn't need to
01:59:27.239 refresh it okay so we got the bio which
01:59:30.199 is unset but we have clerk ID email
01:59:33.599 these fields everything that we have
01:59:35.840 just put right and by default you get
01:59:38.840 this underscore ID field coming from
01:59:41.199 convex as well as the creation time okay
01:59:44.719 awesome that means our database now is
01:59:47.840 in sync with the clerk right you have
01:59:50.360 just learned something really really
01:59:52.079 important called Web Hooks and this is
01:59:54.040 something that you can use in your other
01:59:56.520 projects you can talk about it in an
01:59:58.400 interview you can just say I have built
02:00:00.920 a project where I use B hooks to make
02:00:03.840 sure my authentication Service is in
02:00:06.520 sync with my database so on and so forth
02:00:09.360 so this is one of those use cases and
02:00:12.320 later in the video we're going to see
02:00:14.199 how we can check for the authentication
02:00:16.360 in our convex functions but let me just
02:00:18.960 quickly try to mention it so here we can
02:00:22.320 go into this under this context object
02:00:25.960 so you can say aate like context. oath
02:00:30.560 here we can see we can get user identity
02:00:33.520 and this will check if user is
02:00:35.159 authenticated or not so here it says a
02:00:37.760 promise that resolves to user identity
02:00:40.679 if the convex client was configured with
02:00:43.320 a valid ID token and this is related to
02:00:46.599 authentication right so it will get the
02:00:48.760 details about the currently
02:00:50.719 authenticated user and we'll be using
02:00:53.119 this later in the video so with that
02:00:55.360 that's going to be it for this section
02:00:56.920 where we have learned about web books
02:00:59.199 and just for your reference I'll go
02:01:01.000 ahead visit this file and here I'll just
02:01:03.360 add a comment what we are doing in this
02:01:06.159 in this file we just need to make sure
02:01:08.159 that the web hook event is coming from
02:01:10.159 clerk if so we will listen for the user
02:01:13.400 created event and we will save the user
02:01:16.400 to the database okay now we are going to
02:01:19.960 move on with the post creation in the
02:01:22.719 create page so instead of starting with
02:01:25.239 the homepage we would like to First
02:01:27.800 create some posts right and then we are
02:01:30.520 going to build the homepage where we can
02:01:32.320 fetch those posts and display them so
02:01:35.480 here what do we need to do so first
02:01:38.040 things first we need to create a convex
02:01:40.360 function that will take the post details
02:01:43.800 and save it to the database once we
02:01:46.079 click to this button and we also need to
02:01:48.800 store the images right and for file uh
02:01:52.960 uploads thankfully we have a section so
02:01:55.920 if you visit the documentation you
02:01:57.840 should be able to see we have image
02:02:00.239 uploads and you can take a look at the
02:02:02.599 documentation how it is done but I'll
02:02:05.280 try to walk you through it with like
02:02:08.199 with our with our approach and react
02:02:10.840 native and Expo this is mostly for web
02:02:14.239 but as you can tell it can be used with
02:02:16.800 react native as well so we're going to
02:02:19.280 go ahead visit vs code and before we try
02:02:22.239 to build anything I would like to
02:02:24.400 provide you some styles that we are
02:02:26.400 going to have in the create page so
02:02:28.840 under the Styles folder create this file
02:02:31.880 called create. styles.
02:02:36.239 TS and I will go ahead copy everything
02:02:39.400 from my source code and paste it uh like
02:02:43.520 this it is around 100 lines of code
02:02:47.159 let's take a look at it once again we
02:02:49.040 got the width some imports such as
02:02:52.000 Dimensions as well as the stylesheet and
02:02:54.719 we build like really really basic stuff
02:02:57.400 that is related to CSS we give pings
02:03:00.520 borders making stuff centered so on and
02:03:04.000 so forth so this is not a CSS Course
02:03:06.440 once again that's why I'll skip this and
02:03:09.360 we can use these Styles now just in case
02:03:12.800 if you want to type this out let me show
02:03:15.079 you the entire
02:03:17.199 file so you can pause the video if you
02:03:19.920 really wanted to and and type this out
02:03:23.840 but this is not something I'll be
02:03:26.360 doing okay then let's create our convex
02:03:29.560 function and then we'll go ahead build
02:03:31.639 the UI first we just need to have it
02:03:34.280 since this is related to posts I will
02:03:36.719 create it in a file called posts. TS now
02:03:41.360 let's try
02:03:42.639 to build our uh build our file I'll just
02:03:46.760 go ahead zoom in let's get the simulator
02:03:50.320 on the right hand side and try to build
02:03:52.760 it so first I'll create a mutation as
02:03:56.079 you can tell because we would like to
02:03:57.920 create a post and whenever you need
02:04:00.480 stuff that is related to Creation like
02:04:03.360 update or delete you would like to
02:04:05.360 create a mutation you can call this
02:04:07.440 anything once again I will create it as
02:04:10.599 create post which is going to be a
02:04:12.639 mutation let's import it open up our
02:04:15.760 object and give our arguments if you
02:04:18.639 want to create a post you just need to
02:04:21.280 add a Caption This Could Be optional so
02:04:24.119 let's say v. string let's import the V
02:04:27.440 and this could be optional so just say
02:04:29.480 v. optional and then we are going to
02:04:32.320 take another field called storage ID and
02:04:36.199 this will be needed when we want to
02:04:37.960 delete a post once we try to delete it
02:04:40.920 you will actually see this this would be
02:04:43.480 important for now we don't really need
02:04:45.440 to understand it but let's go ahead
02:04:47.440 create the Handler function as well just
02:04:50.199 going to be an async function that will
02:04:53.199 take the context so that we can interact
02:04:56.159 with our database and we can get the
02:04:58.960 arguments okay so as I said we would
02:05:02.159 like to upload some files and for this I
02:05:05.559 will provide you a function that is
02:05:07.679 around three lines of code so it is
02:05:09.960 called as generate upload URL it is a
02:05:12.880 mutation so this is exactly coming from
02:05:15.760 the documentation let me show you
02:05:18.280 this okay so this is the exact same
02:05:20.719 function just on top of it I have added
02:05:23.400 a check where we check for the
02:05:25.520 authentication so uh we say context.
02:05:28.800 oath get user identity I have assigned
02:05:31.880 this to a variable called identity if it
02:05:34.159 is undefined or if it is falsy value
02:05:37.360 we'll just say you're unauthorized but
02:05:40.280 else we are going to create an upload
02:05:42.480 URL so that we can upload our image
02:05:45.960 into okay so let's go into the Handler
02:05:49.320 let's check for the authentication here
02:05:51.760 and get the current user so just say
02:05:54.440 const current
02:05:57.960 user and before we do so I think we just
02:06:00.840 need to get the identity so let me try
02:06:03.599 to get this
02:06:05.320 part and we are going to make this code
02:06:07.800 look a lot better later in the video
02:06:09.920 we're going to build a reusable function
02:06:13.000 to check for the authentication but for
02:06:15.239 now i' like to keep it simple and just
02:06:17.480 give you the longer version okay so
02:06:20.239 we'll just get the identity and if it is
02:06:23.119 not defined we're going to throw an
02:06:25.199 error but else we can get a user so say
02:06:28.639 current user and we'll say await dot
02:06:33.360 like
02:06:34.239 context.
02:06:36.119 dbquery
02:06:37.639 the users table with an index so let's
02:06:42.400 just put dot and go below say with
02:06:47.159 index by clerk ID we're going to take
02:06:50.040 the Callback function
02:06:52.040 just like this let me wrap it and we'll
02:06:55.440 say query. equal to the clerk ID field
02:06:59.599 to the identity do subject so this
02:07:04.000 identity. subject will give you the
02:07:06.119 clerk ID
02:07:07.880 and okay this says this has not any
02:07:10.880 effects because we just need to say the
02:07:14.119 get the first
02:07:16.599 value okay and we can add another check
02:07:20.000 if current user is not defined we can
02:07:22.559 say user not found so I hope this is not
02:07:25.800 any confusing at the moment we will make
02:07:27.960 this look a lot better later in the
02:07:29.800 video but for now this is what we can do
02:07:33.159 to get the
02:07:35.000 user let me put it like this okay so so
02:07:39.840 far we have done nothing related to
02:07:41.880 Creation like creating a post now we can
02:07:44.719 go ahead and actually try to do it I'll
02:07:47.320 say create post let's say await context
02:07:52.639 DB and if we want to add something we'll
02:07:55.320 be using the insert method and we'll
02:07:57.719 like to insert it under the post table
02:08:00.400 and we can add our Fields so we're going
02:08:02.679 to put the user ID so that we know who
02:08:05.239 is the owner of the post then we can add
02:08:08.239 the image URL let's go ahead paste this
02:08:11.440 but we don't really have the image URL
02:08:13.280 at the moment how can we get it well
02:08:15.960 we'll basically just
02:08:17.960 say here I'll say const image
02:08:21.960 URL await
02:08:26.520 context do storage and we'll say get URL
02:08:30.639 we're going to put this um ar. Storage
02:08:34.840 storage ID this will give us an image
02:08:37.239 URL we can just say if image URL is not
02:08:40.639 existed we can throw an error and then
02:08:43.800 we can say the storage ID which is
02:08:46.639 coming from the arguments we're going to
02:08:48.880 put the caption and each post will will
02:08:51.639 have zero likes and zero comments when
02:08:54.920 they first created so with this now our
02:08:58.239 code is happy with us if we don't add
02:09:00.559 this check I think it'll be unhappy with
02:09:03.199 you because typescript thinks this could
02:09:06.040 be undefined or null that's why we will
02:09:08.960 add this check just to make it happy so
02:09:12.320 once we have created the post we would
02:09:14.520 like to
02:09:16.599 increment the number of posts of the
02:09:21.520 user right so I'll just go ahead put
02:09:24.159 this comment
02:09:26.599 increment okay increment user posted by
02:09:31.400 one so how can we do this we can just
02:09:33.960 say AIT context. DB instead of saying
02:09:38.119 insert since we want to update something
02:09:40.480 we'll use patch and the user that we
02:09:43.480 would like to update will be current
02:09:45.360 user and here is the field we'll just
02:09:48.040 say
02:09:49.719 posts let's say current user. posts plus
02:09:55.800 one okay so this is what we have just
02:09:58.880 done and at the end of this function we
02:10:01.239 can return the post ID which would be
02:10:04.040 coming from here let's say con post ID
02:10:07.760 this is what you get as the response and
02:10:10.719 we can return
02:10:15.000 it okay so this is our function let me
02:10:18.040 just zoom
02:10:19.000 out what we have done so far is just to
02:10:22.199 check for authentication and you know if
02:10:25.280 you don't add this part I think this
02:10:27.520 code will not be happy with you because
02:10:29.639 typescript cannot really know if this
02:10:32.119 user is null oops typescript don't
02:10:35.639 really know if this is null into
02:10:37.400 database or if you actually have it
02:10:40.000 that's why we add these if checks and we
02:10:43.079 generated an image URL and create the
02:10:46.360 post then we just increment the users
02:10:49.480 post count by one so this is the
02:10:52.360 function that we would need we will be
02:10:54.239 using this we we are going to call this
02:10:56.960 from the front end which will be in the
02:10:59.840 create page now let's go into the create
02:11:02.800 page and actually try to build the UI so
02:11:06.360 under the app under the tabs we have
02:11:08.800 this create. TSX file let me just zoom
02:11:12.119 in and Shrink this left hand side so we
02:11:15.480 would like to build this function where
02:11:18.159 we just called the create screen
02:11:21.430 [Music]
02:11:23.840 okay so instead of typing everything out
02:11:26.199 I'll just walk you through it like line
02:11:28.400 by line I promise I will explain every
02:11:30.880 single thing that we have here so
02:11:32.800 instead of having this tutorial be 10
02:11:35.159 hours by doing this we can just have it
02:11:38.520 like we can decrement the size by twice
02:11:42.599 right you can just double down that so
02:11:45.040 we are going to get the user from clerk
02:11:47.480 we're going to get the router because
02:11:50.000 once we create a post we would like to
02:11:52.800 navigate the user to the homepage and
02:11:55.719 then each post could have a caption each
02:11:59.079 like uh each post could have an image
02:12:01.960 when we select the image it will be in
02:12:05.159 this state by default it is not so let's
02:12:08.199 go ahead import the use State as well
02:12:10.599 and I would like to keep a loading state
02:12:13.119 so that I can show a loading spinner and
02:12:16.280 this will be true once we say share okay
02:12:20.400 then we would like to get the current
02:12:22.360 user but more on this in a second we
02:12:25.360 would like to pick an image from our
02:12:28.199 media library So currently we have some
02:12:31.280 photos in this machine right in this
02:12:33.880 simulator and how can we select
02:12:36.960 these so basically we will be using a
02:12:39.880 package for this let's go ahead open up
02:12:42.280 our terminal and kill our XO app I will
02:12:46.360 say MPX Expo install and we'll just say
02:12:51.360 Expo Das
02:12:53.800 image Dash picker so I don't really know
02:12:58.719 if you can see it completely but this is
02:13:00.800 how that would look like and anytime
02:13:03.800 you're like anytime you're installing
02:13:06.320 something from Expo you would be using
02:13:08.679 this part but if you are installing it a
02:13:11.559 regular package you would say npm
02:13:13.800 install and then the package name so
02:13:16.199 just keep this in mind this part is
02:13:17.920 really important if you are getting
02:13:20.079 something from the Expo uh
02:13:23.400 ecosystem so with this in mind let's go
02:13:25.920 ahead run this okay why do I have it
02:13:29.159 twice in the terminal let's run this
02:13:33.639 now by using this package we should be
02:13:36.199 able to select an image from our media
02:13:39.559 library now that we have it let's say
02:13:42.159 npx
02:13:45.239 Expo and I'll press R to reload this
02:13:49.400 application there we go this is what we
02:13:51.639 have at the moment now for this UI I
02:13:54.520 would like to get an if check so I will
02:13:56.960 say if there is no selected image we
02:13:59.840 would like to show this kind of a UI
02:14:02.480 right a container that says tab to
02:14:05.119 select an image so let's go ahead and
02:14:07.679 make this work I will add this if check
02:14:10.400 before the return now I know there's a
02:14:12.960 lot of different things let's go ahead
02:14:14.559 and import everything so we're going to
02:14:16.639 get these styles from create uh file
02:14:19.920 we're going to get touchable opacity ion
02:14:22.800 icons let's get the colors I'll walk you
02:14:25.760 through this code and when we press to
02:14:28.520 this touchable opacity we're going to
02:14:30.800 call a function called pck image for now
02:14:33.480 I'll delete it let's
02:14:35.719 save and go into the create page okay
02:14:38.840 there we go this is what we got so we
02:14:41.079 have a view with container style and we
02:14:44.159 have the header section where we have an
02:14:46.599 arrow back icon and then we have this
02:14:49.480 text that says new post post and then
02:14:52.960 like we are just adding this so that
02:14:54.960 this is centered if you delete it this
02:14:57.520 is how that look so this is some dummy
02:15:00.040 view then we have the entire touchable
02:15:02.960 opacity so it doesn't really matter if
02:15:05.159 you press here or if you press here it
02:15:08.520 will always be pressed and then we would
02:15:11.400 like to call a function called pick
02:15:14.719 image so how can we make this work I'll
02:15:17.719 basically provide you this
02:15:21.199 above and once again I'll walk you
02:15:23.119 through it so we're going to get this
02:15:25.079 image picker from the package that we
02:15:27.639 have just installed so I'll go above
02:15:30.119 I'll say import everything as image
02:15:32.880 picker from this package this is
02:15:35.000 something that we have just installed
02:15:37.199 and when we press here we're going to be
02:15:39.360 calling this function which will go
02:15:41.760 ahead launch the image library and the
02:15:45.280 media types that we accept will be
02:15:47.920 images however you can get the live
02:15:50.520 photos as well as the videos I'll go
02:15:53.000 with images in this project you will
02:15:55.480 allow for the editing and aspect ratio
02:15:58.360 will be one to one you can change this
02:16:01.239 and quality we will just decrement it a
02:16:04.040 bit to compress our images and if it is
02:16:07.679 not cancelled we will set our state with
02:16:09.920 it so let's save and here I'll actually
02:16:13.400 console log the selected image say
02:16:16.719 select that image and open up the
02:16:18.800 terminal let's go ahead
02:16:21.520 uh press here there we go our media
02:16:23.599 library is selected if I say cancel
02:16:26.679 nothing will happen but if we try to
02:16:29.239 select an image let's say choose now we
02:16:32.478 can see this is the file that is
02:16:34.599 selected
02:16:35.840 right and we'll be using this uh exact
02:16:39.240 URL to be able to save this to our
02:16:42.599 convex file
02:16:44.478 storage okay so now that we know how to
02:16:47.240 make the create page work since we have
02:16:50.160 a selected image this if doesn't really
02:16:52.840 run instead we see this UI here it says
02:16:56.519 create this is exactly what we have now
02:16:58.879 let's go ahead and build this UI which
02:17:01.359 is going to look like
02:17:03.760 this um so when we like when we select
02:17:07.359 the image we're going to see this UI
02:17:09.280 where we see this header component and
02:17:11.558 then we will preview the image where we
02:17:14.160 can also change it if we really wanted
02:17:16.318 to then we'll have this write a caption
02:17:19.359 section but there's a problem with this
02:17:22.080 and to be able to solve it we have a
02:17:24.080 component but first i' would like to
02:17:26.240 show you the video what is the problem
02:17:29.638 so this is like let me show you when we
02:17:32.200 try to write a comment here we can see
02:17:35.080 the keyboard overflows the input right
02:17:37.959 we cannot really see it like I'll press
02:17:41.280 here there we go we cannot see it we
02:17:43.478 have the same kind of problem here and
02:17:45.879 to be able to fix it thankfully we have
02:17:48.398 a component instead of VI where we're
02:17:50.959 going to have keyboard avoiding view
02:17:54.040 coming from react native so open this up
02:17:57.160 and close it then we are going to add
02:17:59.478 some props to make it work properly and
02:18:03.200 in like we can check for the platform
02:18:06.120 let's go ahead import the platform we
02:18:08.318 will say Behavior will change depending
02:18:10.439 on if user is on iOS or Android on iOS
02:18:15.000 it will work with the Ping and uh in
02:18:18.000 Android it'll work with the height then
02:18:20.160 we can give some Styles just like this
02:18:23.040 which is the container and the vertical
02:18:26.359 offset and again it'll just change
02:18:28.760 depending on the platform now if you ask
02:18:31.080 me how do you know all these values well
02:18:33.558 basically I have just test them out
02:18:35.519 before recording this video and then
02:18:38.359 inside this we're going to have our
02:18:40.519 entire UI so here I'll have a
02:18:43.840 view let's turn this
02:18:46.359 off and it just has this content
02:18:49.519 container as the style let's build the
02:18:52.439 header now I'll put my header that will
02:18:56.200 go here which is going to be a touchable
02:18:59.599 opacity I would like to grab
02:19:03.000 this paste it and we you through it let
02:19:06.760 me put it right
02:19:08.799 here so we have a touchable opacity on
02:19:12.359 press we are going to reset our state
02:19:15.558 and it'll be disabled if we are in the
02:19:18.000 loading State then we have an icon which
02:19:21.120 is close outline and once again it'll be
02:19:25.318 like color will change depending on the
02:19:27.240 state then we have a text so basically
02:19:30.080 we are building this part I hope it
02:19:33.359 makes sense then on press we're going to
02:19:35.760 call this function which is something
02:19:37.478 that we'll build in a second and to have
02:19:40.080 a loading State we are going to be using
02:19:42.599 activity indicator which is coming from
02:19:45.120 react native so let's save there we go
02:19:48.080 this is the UI that we have if you say
02:19:50.800 like go back it will actually take you
02:19:53.840 back if you select an image once again
02:19:56.880 you should be able to see this UI now if
02:19:59.800 it is true we're going to have this
02:20:01.880 activity
02:20:03.000 indicator so I hope this makes sense so
02:20:05.680 far below the header component we're
02:20:08.880 going to build something else which will
02:20:11.240 be a scroll view so let me go ahead get
02:20:14.439 this component close this off and import
02:20:18.359 it from react native and we can add some
02:20:23.560 styling now why this is a scroll view I
02:20:26.600 will show you just in a second once we
02:20:28.920 built this entire UI so let's say it do
02:20:33.560 the bounces will be false keyboard
02:20:35.760 should persist tabs will be handled then
02:20:38.920 we'll like to have a
02:20:40.479 view with some styling and for this view
02:20:43.880 I'll go here let's just say you would
02:20:46.040 like to have a wi component this will
02:20:49.319 take styles
02:20:51.240 let's say Styles or style I should say
02:20:55.120 and this will be El Dynamic if you want
02:20:57.960 to add Dynamic Styles you can use an
02:21:00.399 array just like this we're going to say
02:21:03.200 get the Styles content and if we are in
02:21:06.359 the sharing state if we are in the
02:21:08.520 loading State we are going to add this
02:21:11.120 style as well which will make the UI
02:21:13.920 look like disabled then we would like to
02:21:16.399 add an image section so let me please go
02:21:19.520 ahead and
02:21:21.120 import it or add it there we go we'll
02:21:24.560 get the image from react
02:21:28.120 native okay so instead of getting it
02:21:30.359 from react native I think I'll get it
02:21:32.359 from Expo image so I'll say
02:21:35.280 import uh image
02:21:38.280 component from Expo image so do we have
02:21:42.280 that component or do we have that
02:21:44.200 package I think we should install it so
02:21:46.680 I will open up my terminal once again
02:21:48.600 kill this clear this up I'll say MPX
02:21:51.720 Expo install Expo Das
02:21:55.359 image now why are we using Expo image
02:21:58.399 component is because this package gives
02:22:01.399 you an image component that makes images
02:22:04.560 really optimized so it is like the image
02:22:07.640 component that we have xjs so basically
02:22:10.600 it is for performance reasons so we'll
02:22:13.399 go ahead get the Expo image and we have
02:22:16.520 added this part where we show the
02:22:18.520 selected image these are the SL fing
02:22:20.880 that we have and then we have this
02:22:22.760 change button on press we're going to
02:22:25.200 call the same function once again so
02:22:27.520 let's save open up our terminal and
02:22:30.080 start the
02:22:32.000 application I'll press r or maybe I
02:22:34.600 should press
02:22:39.840 I okay it should restart
02:22:44.040 it let's try to select an image
02:22:51.120 okay here we can see image has been
02:22:53.359 displayed we can change
02:22:56.880 it and it just works as expected and
02:23:00.160 since we have this editing through we
02:23:02.920 can basically edit
02:23:06.160 this okay so below to this image section
02:23:09.880 we'll like to add the input section so I
02:23:12.640 would like to once again get the code
02:23:14.920 and walk you through it so right here
02:23:18.359 I'll put a comment let's say in
02:23:21.080 image
02:23:23.359 section and here we'll have the input
02:23:28.840 section let's paste it we're going to
02:23:31.399 get a text input component the rest is
02:23:35.000 almost the same thing so there is no
02:23:37.800 there is no reason to type this out all
02:23:39.880 again from scratch we are showing the
02:23:42.439 user profile image and we can basically
02:23:45.319 write a caption so here why did we used
02:23:49.200 a component called scroll view it's
02:23:51.800 because like here I think we cannot see
02:23:54.720 it but if we had like
02:23:58.120 multiple lines let me try to add
02:24:01.080 those we can scroll through it in our
02:24:03.520 phone and we can even add like offset I
02:24:07.319 believe needs offset um let's say
02:24:11.240 content offset will be I don't know
02:24:15.920 50 does it have to be string okay so it
02:24:18.960 says Point prop
02:24:21.880 so I don't really know how to use this
02:24:23.640 because I haven't used it to be honest
02:24:26.240 okay we should give X and Y I
02:24:28.960 believe okay X let's say zero will be
02:24:32.200 but y let's say
02:24:35.000 100 so as you can tell we have some
02:24:38.000 offsets and like I just literally
02:24:40.120 learned it with you
02:24:42.319 today and how did I learn it like when
02:24:44.760 you hover over this I just saw this X
02:24:47.200 and Y and when I had 50 so here on the
02:24:51.080 error I I just saw this X and Y and
02:24:54.600 that's why how I realized there is this
02:24:56.640 X and Y Fields so I'll just go ahead and
02:24:59.560 just say y will be
02:25:01.760 100 okay so just because of this scroll
02:25:05.040 view component we are able to make it
02:25:08.160 work like this so let's go here I think
02:25:11.720 I also need to X field I'll make it to
02:25:14.000 be
02:25:15.640 zero we can basically add more stuff and
02:25:19.000 scroll through it here it doesn't really
02:25:21.479 work as expected but in your phone you
02:25:23.680 can imagine with your finger you can
02:25:26.399 basically scroll it and see the entire
02:25:29.040 view okay so this is what we have built
02:25:32.560 for the return statement now when we say
02:25:35.080 share nothing happens right let's just
02:25:37.200 press that literally nothing happens
02:25:39.479 because we don't really have a function
02:25:41.399 for that and let's try to build it now
02:25:43.960 so this is a quick pause that will take
02:25:46.120 around 1 minute I'd like to mention
02:25:48.200 something and I am recording this from
02:25:49.920 theut fure because we have some
02:25:51.640 potential issues so the first things
02:25:53.920 first if you want to see the keyboard
02:25:56.040 when typing this out in the simulator
02:25:58.680 you need to press command shift K and
02:26:01.439 all of a sudden you will see the
02:26:02.920 keyboard but now we still have this
02:26:05.279 problem where keyboard is overflowing
02:26:08.399 with the content so we thought we have
02:26:10.760 fixed the issue by using this component
02:26:13.399 but it didn't really fixed it completely
02:26:16.120 so I found the solution instead of using
02:26:18.240 20 we'll go with 100 and let's save now
02:26:21.800 let's try to see this in action there we
02:26:23.960 go we have 100 pixels of offset and we
02:26:27.479 can see this in action that is working
02:26:30.439 in Android we don't really need to add
02:26:32.640 any uh offset because by default the
02:26:36.439 keyboard will be avoided so you just
02:26:38.840 need to keep this in mind for iOS
02:26:41.200 specifically okay so that was something
02:26:43.200 that I wanted to mention just keep this
02:26:44.960 in mind and let's move on with the video
02:26:47.640 so we need to find this button called
02:26:49.720 share which is going to be under this
02:26:52.800 touchable opacity let's see where that
02:26:55.479 is okay it is this one and we're going
02:26:57.600 to add this onpress handle share
02:27:00.279 function and let's go ahead at the very
02:27:03.560 top try to add this function so first
02:27:06.920 things first we need to get the generate
02:27:10.439 uh upload URL function which is
02:27:12.760 something that we have created here as a
02:27:15.560 mutation and in convex you can just say
02:27:18.760 use mutation if you want to consume it
02:27:21.359 you can say API do whatever the file
02:27:24.640 that is so under the posts we have this
02:27:27.200 mutation and I would like to call this
02:27:29.600 as generate upload URL and in the same
02:27:33.680 way we can get the create post function
02:27:36.560 so I'll just say create post which is a
02:27:39.680 mutation that's why we say mutation
02:27:42.120 later in the video we'll learn things
02:27:43.920 about queries so we'll say use Query but
02:27:46.520 for now it is a mutation and under the
02:27:49.000 posts we will call this as create post
02:27:51.960 this is what we had and then in the
02:27:54.439 handle share function it is something
02:27:57.080 that we need to build let's say const
02:27:59.600 handle
02:28:02.120 share which will be an async function
02:28:05.359 and let me walk you through it now first
02:28:07.520 things first we'll just say if there is
02:28:09.800 no selected image then just return out
02:28:12.240 of this function don't do anything but
02:28:14.840 else we can open up our TR cat TR catch
02:28:18.040 statement and just say we are in the
02:28:20.800 loading state so we just say set is
02:28:23.160 sharing to be true then we are going to
02:28:25.640 get an upload URL by calling this
02:28:28.160 mutation right and then we need to get
02:28:31.040 an upload result by uploading our file
02:28:34.760 and to be able to make this work I will
02:28:36.800 get a package so let's let's uh kill
02:28:40.359 this clear this up I'll say MPX oops let
02:28:45.200 me make it full screen MPX Expo so here
02:28:48.680 is the entire package name I just pause
02:28:50.840 the video and take a look at my notes
02:28:52.760 because I was not able to remember that
02:28:54.960 but there we go it is called as Expo
02:28:57.640 file system let's go ahead and install
02:29:00.359 it by using this package we will be able
02:29:03.600 to upload our images really like
02:29:07.040 performant way and clean let's start our
02:29:12.479 application press R so that it would
02:29:14.840 reload it and here in this function we
02:29:17.760 would like to get an upload result
02:29:20.920 I will go here below paste this and walk
02:29:23.680 you through it we need to get the file
02:29:26.479 system as an import just like what we
02:29:29.600 have done
02:29:31.200 here so we'll say import everything as
02:29:34.520 file system from this package and by
02:29:38.000 using this we can upload upload a URL
02:29:42.000 right or upload an image to this URL
02:29:44.439 that we have what are we going to upload
02:29:46.960 is this selected image our method is
02:29:49.600 post this is the upload type we
02:29:51.880 basically have this binary content and
02:29:54.640 the meme type is image JPEG then we can
02:29:58.200 go ahead just check for the status we'll
02:30:01.600 say if uh if status is not equal to 200
02:30:05.520 which means something failed but else we
02:30:08.080 can get the storage ID from this upload
02:30:11.240 result and then we can call our mutation
02:30:14.880 so it will be a wait create post and
02:30:18.279 we're going to add our fields which we
02:30:20.279 have the storage ID as well as the
02:30:23.560 caption and if everything has done
02:30:26.240 successfully we can take the user and
02:30:29.040 push it to the homepage so let's say
02:30:32.479 slash tabs and in the catch we can
02:30:35.960 basically just say console log error
02:30:39.319 sharing the
02:30:41.319 post you can handle this in a better way
02:30:44.520 but this is how I will leave it and
02:30:46.640 finally we'll say set is sharing will be
02:30:50.080 false either we succeed or we fail in
02:30:53.920 either case the loading State should be
02:30:55.920 false okay let's save and test this out
02:30:59.040 and hopefully you didn't get really
02:31:00.840 confused with this package this is how
02:31:03.680 we can easily upload images easily
02:31:07.160 upload files by using Expo and this is
02:31:10.560 one of those packages that Expo gives
02:31:12.880 you out of the box okay so let's go
02:31:15.600 ahead select an
02:31:18.319 image I'll say choose this one let's say
02:31:21.640 first
02:31:22.900 [Music]
02:31:25.319 post oops let's say first post and share
02:31:29.160 it we have the loading state for a
02:31:31.120 second once it is done successfully we
02:31:34.479 are taken to the hom page let's double
02:31:37.120 check under the posts we should have
02:31:40.479 that and here by the way I don't know
02:31:44.240 why we got the exact same user twice
02:31:46.880 looks like we have a bug that we're
02:31:48.600 going to fix but but here we can see
02:31:50.880 this user has one more one post right
02:31:54.359 under the posts we can see this is the
02:31:56.920 post and we can go into the files we can
02:32:00.560 see this
02:32:02.439 file um if you hover over this I think
02:32:05.680 this is going to give you the
02:32:10.279 preview so I think it was giving me the
02:32:12.920 preview but right now it doesn't but you
02:32:16.000 can take a look at it we have just
02:32:17.800 installed it
02:32:22.359 okay so this is what we have stored in
02:32:24.840 our convex storage so this is how we can
02:32:28.439 create posts let me pretty quickly walk
02:32:31.279 you through it what we have done and how
02:32:33.359 it works from start till the end so
02:32:36.319 first when we visit this page we hit
02:32:38.680 this if check where we say if there is
02:32:40.840 not a selected image then please show
02:32:43.560 this UI and when we click to this we
02:32:47.240 basically call a function called pick
02:32:49.600 image image and it is going to launch
02:32:52.960 our image Library it will allow us to
02:32:55.560 select images and we have some props to
02:32:58.800 add our own customization and if an
02:33:01.680 image selected successfully we're going
02:33:04.040 to set our state with it so I will go
02:33:06.479 ahead and select it now that we have a
02:33:09.160 selected image we are not going to hit
02:33:11.319 this if check but instead we are going
02:33:13.240 to hit this return statement which is
02:33:15.960 going to show us this kind of a UI and
02:33:19.359 when we click to this button we are
02:33:21.359 calling this handle share function and
02:33:24.399 here we are calling two different
02:33:26.479 mutations that we have and we have
02:33:29.120 created these in this file one is to
02:33:32.520 generate an upload URL we just got this
02:33:35.240 from the documentation and added our
02:33:37.840 authentication check and then we have
02:33:40.399 our own create post function where once
02:33:43.640 again we check for the authentication we
02:33:46.439 get an image URL then we create the Post
02:33:50.200 in our database with these fields and
02:33:53.680 then we increment the users post count
02:33:56.880 by one right this is what we have done
02:34:00.000 and let's save this file then here in
02:34:03.200 this function we are basically um
02:34:06.000 consuming those mutations and on top of
02:34:08.800 everything we have used a package called
02:34:11.960 file system this is coming from Expo
02:34:15.040 this allows us to upload images pretty
02:34:17.800 easily and it is really easy to use and
02:34:21.399 if everything has done successfully we
02:34:24.120 take the user to the home screen so I
02:34:27.279 hope everything that we have done in
02:34:28.880 this section makes sense you can pause
02:34:31.359 the video and just analyze the code base
02:34:34.279 for 5 to 10 minutes and once you're
02:34:37.240 ready we can move on with the next
02:34:39.040 section and I have just realized we have
02:34:41.960 an error that is related to users so I
02:34:45.120 don't know why we got this user created
02:34:47.880 twice I think this will never happen
02:34:50.160 again um when we were developing we got
02:34:52.880 this issue but let's go ahead delete all
02:34:55.160 the users and I'll delete all the posts
02:34:58.000 that we have and let's try to sign up
02:35:01.040 all over again just to make sure that
02:35:03.359 this is not happening if it is happening
02:35:05.439 we just we have to debug this so I'll go
02:35:08.880 here into my
02:35:11.240 simulator we need to sign out from it
02:35:13.960 from this account and let's try to sign
02:35:17.000 up
02:35:21.359 so we just signed up let's
02:35:23.720 see we got the user here let's refresh
02:35:27.720 we should have it in the cler dashboard
02:35:29.600 as well there we go I would like to like
02:35:33.479 log out and log in once again and in
02:35:37.359 this case it shouldn't really create
02:35:39.200 this
02:35:42.600 user okay so we didn't really get this
02:35:45.359 and we don't need to refresh it because
02:35:47.319 convex by default is working in real
02:35:49.479 time time and let's try to create a post
02:35:53.240 so I'm just doing this for the debugging
02:35:55.920 purposes just to make sure that the same
02:35:58.800 user is not being created
02:36:03.000 twice okay so we got the post but this
02:36:07.680 uh did not create it once again it just
02:36:10.520 updated the post count so I don't really
02:36:12.760 know why we got the same user previously
02:36:15.479 twice but now it is working um as
02:36:18.600 expected okay so with that that's going
02:36:20.760 of it for this section now let's move on
02:36:23.479 with the home screen which is going to
02:36:25.600 be our feed so we would like to build
02:36:28.399 this header section below to it the
02:36:31.240 stories and then we'll like to fetch the
02:36:33.720 posts that we have in the database so
02:36:36.439 let's go ahead and start with our uh
02:36:38.960 query that we'll built with the convex
02:36:41.640 and then once we built the UI we're
02:36:43.600 going to go ahead and fetch the posts so
02:36:46.640 first I'll go under the convex we have
02:36:48.840 this post file and we would like to
02:36:51.600 build a query let's say export const get
02:36:57.160 feed posts now this is going to be a
02:37:00.600 query because we would like to fetch
02:37:02.600 some data we would be using mutations to
02:37:05.760 update some data or create and delete
02:37:08.479 but uh queries will be used to get some
02:37:11.240 data now in the same way we can add
02:37:13.800 arguments but we don't really need to
02:37:15.800 add we would like to basically fetch all
02:37:18.200 the posts so for for that reason I'll
02:37:20.319 just put a Handler function let's say
02:37:22.880 this is going to be an Asing function
02:37:24.800 where we'll put the context as the first
02:37:28.279 argument once again we can get the
02:37:30.680 arguments but we don't really need it
02:37:32.800 for this function so we'll go ahead and
02:37:35.760 try to build the logic so in the same
02:37:38.720 way so here we have tried to get the
02:37:41.680 current user so what we can do is copy
02:37:44.640 this and paste it here this will check
02:37:48.080 if user is authenticated and it'll get
02:37:50.600 the current user now instead of doing
02:37:52.960 all this again and again we can go ahead
02:37:55.800 take this and make it a reusable
02:37:58.399 function so I will cut this entire thing
02:38:01.560 visit my users file that I have as part
02:38:05.720 of my convex functions and I'll create
02:38:08.880 that helper function so here this is not
02:38:11.920 going to be a mutation or query this is
02:38:14.520 basically an async function that I'd
02:38:17.760 like to call as get
02:38:20.960 authenticated user and let's try to
02:38:24.600 paste this
02:38:25.720 in okay so we just put the entire logic
02:38:29.560 where we return the current user if
02:38:31.960 there is no errors but the only thing
02:38:34.399 that we are missing is the context which
02:38:36.840 we can get as an argument but what is
02:38:39.399 going to be the type of it so it could
02:38:41.520 be either a query context or it could be
02:38:45.279 a mutation context right so let me just
02:38:48.439 grab this
02:38:50.520 mutation context okay and we are
02:38:53.359 importing them from generated server so
02:38:56.279 let's try to save it uh like once again
02:38:59.319 what we are doing here is the exact same
02:39:01.560 thing what we have here so I will delete
02:39:05.840 everything that we have because I will
02:39:08.399 call my function called get
02:39:12.359 authenticated user and I will aade this
02:39:15.800 and I will add my context into it then
02:39:19.160 what this going to give me will be the
02:39:22.600 current
02:39:24.800 user okay so here this is a context
02:39:28.560 going from the mutation and now we will
02:39:31.600 take the exact same
02:39:33.880 thing but this time this context is
02:39:36.600 coming as like from the query that's why
02:39:39.520 we said type could be either query
02:39:41.520 context or mutation context so I hope
02:39:44.399 this makes sense like I'm trying to go
02:39:46.160 really slowly uh just to make sure that
02:39:48.600 we are getting familiar with the convex
02:39:51.840 once we understand this we can just spit
02:39:54.279 up with these functions okay so now that
02:39:57.880 we got the current user we would like to
02:40:00.240 get all posts so just say get all posts
02:40:05.120 and here we can say const posts will be
02:40:09.000 equal to a wait
02:40:11.270 [Music]
02:40:13.000 context.
02:40:14.720 DB we would like to query our posts
02:40:17.920 table and if we don't really have any
02:40:21.439 queries we don't really need to you know
02:40:24.399 just add things like with index so on
02:40:27.359 and so forth we would like to get
02:40:29.200 everything and I would like to order
02:40:31.240 this in the descending order and let's
02:40:34.640 just say collect
02:40:36.319 everything okay so now that we have all
02:40:38.840 the posts let's add let's add a check
02:40:41.479 I'll say if
02:40:42.760 posts. length is equal to zero we'll say
02:40:47.600 return and empty array
02:40:49.800 and then we can finally go ahead just
02:40:51.960 say return posts if you think this is
02:40:54.920 the entire function that we need you are
02:40:57.000 wrong let me tell you why if you hover
02:40:59.479 over the posts you can see we have bunch
02:41:01.960 of different fields and the most
02:41:03.840 important thing is the image URL as well
02:41:06.200 as the caption but there are some stuff
02:41:09.000 that we are missing if you just take a
02:41:11.520 look at this post you don't really
02:41:13.600 understand if we like it already or not
02:41:16.560 and depending on that like we needed
02:41:19.840 because depending on that field we are
02:41:21.680 going to show this as field and if we
02:41:24.640 bookmarked it already we will make this
02:41:26.880 to be filled as well right we'll just
02:41:29.200 have this as a different color so let's
02:41:31.600 go ahead and try to actually build that
02:41:35.040 part so instead of returning the posts
02:41:37.359 immediately I'll say return posts with
02:41:41.800 some info right and let's try to build
02:41:44.560 it I will go ahead just say enhance post
02:41:50.240 with user data and
02:41:56.520 interaction
02:41:58.640 status okay so let's say con posts with
02:42:02.640 info and we would like to do this in a
02:42:07.160 promise.all because we're going to run
02:42:09.080 an array so here I'll just go inside and
02:42:12.080 I will say posts. map we would like to
02:42:15.439 get each single
02:42:17.600 post and I wrap this with an async
02:42:22.200 function just like this let's say async
02:42:25.680 post and call this Arrow
02:42:29.080 function now what do we really want to
02:42:31.200 do we would like to get the post author
02:42:33.880 first because if you take a look at the
02:42:36.200 post you only have the user ID you don't
02:42:39.359 really have the author image or author
02:42:43.279 username right we need to get this data
02:42:46.080 so that we can display it on the UI so
02:42:48.520 we're going to go ah head use this user
02:42:51.240 ID and from that we are going to get the
02:42:54.359 post author so let me just type this out
02:42:56.760 we'll say post author you would like to
02:42:59.760 say await
02:43:01.399 context. DB doget and we're going to say
02:43:06.080 post. user ID so this is going to give
02:43:09.600 us the post author and then we would
02:43:11.920 like to check if we already like the
02:43:14.439 post or not so say await
02:43:17.640 context. DB you would like to query
02:43:21.040 something from the likes array here I'll
02:43:23.920 go ahead and just say with index and if
02:43:26.760 you remember we have an index for this
02:43:29.439 by user and post we're going to get a
02:43:34.200 query and basically I will say if query.
02:43:38.439 equal to here is the user ID which is
02:43:41.920 the current user
02:43:43.840 ID let me give
02:43:47.479 space and then we'll say equal to I
02:43:51.520 think this should be inside and we're
02:43:53.960 going to add basically the other field
02:43:56.200 let's say post
02:43:59.160 ID like this is equal to this post
02:44:05.600 ID okay and out of this thing we would
02:44:09.240 like to get the first result so I'll
02:44:11.439 just say get the first one which is
02:44:13.560 going to give us a like document so
02:44:17.040 let's say const like okay if this is
02:44:20.160 existed that means we already liked it
02:44:23.160 let's save this has been formatted so in
02:44:25.680 the same way I would like to check if we
02:44:27.840 bookmarked a post or not so this is the
02:44:30.880 exact same thing but we are going under
02:44:32.640 the bookmarks table and then we would
02:44:35.520 like to actually return an object So
02:44:39.200 Below to it I'll say
02:44:42.520 return We would like to get every single
02:44:45.600 thing about theost but on top of it we
02:44:48.040 would like to enhance it so we would
02:44:50.160 like to add the author info so I'll just
02:44:52.760 say author object where we will add the
02:44:55.520 author ID post author doore ID then
02:45:00.840 we'll take to add the
02:45:04.160 username which is going to be post
02:45:06.319 author.
02:45:07.960 username uh let's get it and finally
02:45:11.680 we'll like to show the image of the
02:45:14.520 author so post
02:45:17.040 author. image okay then the very last
02:45:21.479 two fields that we need to add if we
02:45:24.000 already elect it or not let's say is El
02:45:27.760 and is
02:45:32.479 bookmarked now like is an object right
02:45:35.920 we would like to convert this into a
02:45:38.560 bullion and we can add two bank
02:45:40.960 operators so this is a basic JavaScript
02:45:43.560 trick that you that you can keep in mind
02:45:46.960 and with this that's going to be for the
02:45:49.399 entire
02:45:50.520 file right let me just make this to be
02:45:54.479 entire
02:45:55.680 screen and zoom out so that you can see
02:45:58.279 the entire function so we got the
02:46:00.439 current user we got all the posts and if
02:46:04.040 it is empty we're going to return an
02:46:05.840 empty array and then we would like to
02:46:08.080 enhance the posts so that we can
02:46:10.960 actually extract the author information
02:46:14.680 as well as if we already like the post
02:46:17.520 and if we already bookmarked it
02:46:20.120 depending on that because we will update
02:46:22.000 the
02:46:23.040 UI and this is how we basically did it
02:46:26.279 we used our indexes that we have created
02:46:29.680 previously and yeah so exactly that's
02:46:33.000 what we have done we are returning the
02:46:34.880 posts with info out of this function and
02:46:38.160 now it is time to go ahead and build the
02:46:41.760 UI then call that query so I will visit
02:46:45.520 the feed let's say this is the file let
02:46:49.640 me make this look like that we will go
02:46:52.720 under the app tabs where we have this
02:46:55.160 index and I'll delete everything that we
02:46:57.600 have here which is the only sign out
02:46:59.760 button we are going to still keep this
02:47:02.399 sign out at the very top we are going to
02:47:05.000 keep this view with this style now on
02:47:07.560 top of it we'll like to add the header
02:47:10.160 section which is going to be this part
02:47:12.680 we have the logo as well as the log out
02:47:15.880 button so let's see how we can make this
02:47:18.479 work I will basically copy and paste it
02:47:21.120 it's around five lines of code and for
02:47:23.600 the Styles we need to add a file let me
02:47:27.120 go ahead and provide this to you so I
02:47:29.479 will just say feed. styles. TS I will
02:47:34.680 grab this from theab repo and if you
02:47:36.920 want to type this out I can show you the
02:47:39.000 entire file this is the longest one that
02:47:41.880 we
02:47:42.960 have so you can pause the video and take
02:47:46.160 a look at
02:47:47.840 it but I think we don't really need
02:47:53.359 it so here you can have the entire
02:47:59.160 file okay I'll just save now let's go
02:48:01.760 ahead import the Styles which are going
02:48:04.080 to be coming from not oath Styles but
02:48:07.720 let's say feed
02:48:10.479 Styles okay then we'll import the icons
02:48:14.560 as well as the colors let's save and
02:48:17.120 take a look at the output okay this is
02:48:19.479 exactly what we got um I'll just open up
02:48:22.720 my terminal and reload
02:48:25.560 this so here you can see uh the text is
02:48:29.279 a little bit different and for this we
02:48:31.600 are using the header title with jet
02:48:34.240 brains mono medium we didn't really
02:48:37.200 install this font if you take a look at
02:48:40.160 the assets let me show this so we don't
02:48:43.359 really have this font installed this is
02:48:45.439 something that we'll do later in the
02:48:47.040 video If in your case you cannot see it
02:48:50.080 highlighted like this just ignore that
02:48:53.240 we are going to install it in a couple
02:48:55.240 of minutes okay so with this now let's
02:48:58.920 keep moving let's keep building after
02:49:01.479 the header we'll like to build the
02:49:03.399 stories section and in our application
02:49:07.240 the story section will not really work
02:49:09.720 but I just want to still implement it
02:49:12.080 with the hardcoded data so that you can
02:49:14.640 see um how to implement that kind of a
02:49:18.439 comp component right so I will go under
02:49:21.720 the components I will create this thing
02:49:24.920 let's say story do TSX and under the
02:49:29.239 constants I will provide you Moog data.
02:49:33.439 TS file so I will go ahead get that
02:49:37.560 file so we have around 50 lines of code
02:49:41.840 for stories and each object has an ID
02:49:45.640 username Avatar which is coming from
02:49:47.880 unsplash and has story bullion so it's
02:49:51.200 either false and true this is couple of
02:49:53.800 different stories that we have around
02:49:56.800 eight of them now let's save and for the
02:49:59.800 story component let's try to build it
02:50:03.720 this is a basic function where we get
02:50:06.279 the styles from feed. Styles we got a
02:50:09.680 couple of different components from
02:50:11.880 react native and then we have the story
02:50:14.439 type which is typescript specific and we
02:50:17.560 just have UI no logic at all just some
02:50:20.239 styles with an image and a text so I'll
02:50:23.279 save this and let's go ahead try to
02:50:25.760 build the remaining part so after this
02:50:28.720 view I would like to add a scroll
02:50:31.359 view let's say scroll view component and
02:50:34.880 I'll explain why are we using this in
02:50:36.760 the first place so I'll just say the
02:50:40.760 shows let me actually copy it so it
02:50:44.080 shows vertical scroll indicator we don't
02:50:46.840 really want to see it so I'll just say
02:50:48.760 false then we would like to add the
02:50:51.040 stories section I will go ahead save
02:50:54.359 this and let's go inside I'll say
02:50:58.279 stories let's paste this in we're going
02:51:00.680 to get the stories from the mock data
02:51:03.120 file and let's get every single story
02:51:06.000 right now let's save there we go this is
02:51:08.960 what we have and here you can see again
02:51:11.760 we just say do not show the scroll
02:51:13.920 indicator if you say true
02:51:19.239 so it did not refresh I'll just say
02:51:24.560 reload okay so I don't know if you can
02:51:27.120 see it but it is not visible
02:51:31.319 actually okay so like normally there
02:51:34.120 should be this scroll indicator at the
02:51:36.720 bottom and here we are trying to hide it
02:51:41.960 now I've used it in my phone when I was
02:51:43.960 testing out it is actually shown but
02:51:46.720 here I don't know why this doesn't show
02:51:48.600 show when it's true but in your physical
02:51:50.960 phone this will actually be visible and
02:51:53.880 I think because the parent has false is
02:51:56.279 it the
02:51:57.840 reason no but this is
02:52:00.760 vertical okay so just keep that in mind
02:52:03.080 if you make it true in the physical
02:52:05.239 phone you'll be able to see a scroll
02:52:07.359 indicator at the bottom and if you make
02:52:10.239 it false it'll not be visible and I will
02:52:12.840 leave it as false specifically so that
02:52:15.960 the bottom scroll bar is never shown in
02:52:19.120 the horizontal Direction This is what
02:52:21.439 modern social media applications does So
02:52:24.359 Below today's stories and Below to this
02:52:27.439 scroll view but still inside the parent
02:52:30.680 I would like to like show my posts so we
02:52:34.120 would like to say posts. map for every
02:52:36.840 single post show a post component but we
02:52:40.120 would like to uh create post component
02:52:43.720 and we also need to fetch the posts
02:52:46.239 fetching posts is easy because we
02:52:48.560 already created our query so I can say
02:52:51.960 const posts will be equal to use Query
02:52:56.319 and we'll say api. posts and get feed
02:53:00.920 posts okay and we can add a loading
02:53:04.040 State as well so I'll just say if posts
02:53:08.279 is equal to undefined and if a query is
02:53:11.960 equal to undefined in convex that means
02:53:14.960 it is in the loading State okay just
02:53:17.080 keep that in mind if it is undefined it
02:53:19.520 will be in the loading State and if it
02:53:21.920 is null that means there is no value so
02:53:25.120 let's say return in this case I would
02:53:27.040 like to return a loader component that
02:53:29.520 we are going to create in a second and
02:53:32.160 let's say if
02:53:35.760 posts. length is equal to zero in this
02:53:39.479 case we would like to return a
02:53:41.560 placeholder I'll just say no posts
02:53:46.200 found and this is a component that we
02:53:48.880 will be using only in this file that's
02:53:51.560 why I'll just scroll at the very bottom
02:53:53.880 and create that component so basically
02:53:56.560 this is a view with a tech with a text
02:53:59.279 that says no posts yet and now we'll
02:54:02.920 take to build the loader component we
02:54:05.359 are going to be using this in multiple
02:54:07.200 places so I will put it into the
02:54:09.880 components folder so just say loader.
02:54:12.680 TSX and let me give you the styling it
02:54:15.960 is a really simple component we have a
02:54:18.479 view where we just show a large activity
02:54:21.840 indicator okay I'll save let's go back
02:54:25.359 try to import this and then we would
02:54:28.200 like
02:54:29.000 to create the post
02:54:31.760 component so for a second I will delete
02:54:34.359 this and I'll just say if this part is
02:54:37.920 true let's see what we're going to see
02:54:40.560 okay this is going to be DUI in the
02:54:42.920 loading State this is what we'll see and
02:54:45.600 let's say if this part is true if we
02:54:48.040 don't they have any posts in the
02:54:49.720 database we're going to see this text
02:54:53.040 and you can always change this and make
02:54:55.040 it a lot better but I'll just leave it
02:54:57.000 as it is now let's add this post
02:54:59.760 component into the UI and we'll like to
02:55:02.720 create a file for this that's going to
02:55:05.080 be under the components so just say
02:55:07.399 post. TSX and let's say
02:55:11.600 rnf where we would like to build a post
02:55:14.680 component and this is going to be taking
02:55:17.080 the post as the the argument or as a
02:55:20.479 prop I should say right so we'll just
02:55:22.720 get the post and here we'll like to make
02:55:25.120 the typescript happy for now I'll just
02:55:27.399 say we're going to get a post it's going
02:55:29.319 to be type of any but in a couple of
02:55:31.239 minutes we will put the actual type and
02:55:33.479 just to not forget it I'll add a to-do
02:55:35.680 so I'll just say add the actual type
02:55:37.520 later in the video and the very first
02:55:39.760 thing I'd like to do is just get the
02:55:41.560 feed sles so I'll go ahead and import it
02:55:44.560 then let's build the UI and we're going
02:55:46.800 to build the functionalities
02:55:48.800 so here under the return statement I'll
02:55:51.000 just delete this text and here I would
02:55:53.200 like to add a style with styles. poost
02:55:57.479 and first let's build the post header
02:56:00.640 I'll just add a comment just in case if
02:56:02.760 you want to copy and pasted from the
02:56:05.000 source code so we're going to have a VI
02:56:08.120 component let's say this will have the
02:56:10.520 style as styles. poost header and this
02:56:15.399 is also types save because it is able to
02:56:18.359 see that file and read the content then
02:56:21.399 inside this view we would like to first
02:56:23.680 put a link so I'll just say
02:56:27.760 link and you might be asking why just
02:56:31.439 imagine when we collect to this section
02:56:35.120 it should take us to the profile of this
02:56:37.120 user right so that's why we're going to
02:56:39.279 go ahead and add a link let's say import
02:56:42.439 the link from Expo router and for the H
02:56:46.520 for now let's just put slash user and
02:56:50.080 slash1 23 later later in the video we
02:56:53.279 actually make it work now this is not
02:56:55.640 really happy with us but let's just say
02:56:58.080 for now we are going to take the user to
02:57:00.080 the I don't know let's say notifications
02:57:02.760 Tab and to make this work it should be
02:57:05.800 looking like this to work properly and
02:57:09.000 then under this link I will have a
02:57:11.600 touchable opacity where we will show the
02:57:14.680 image so let me import this we'll have
02:57:17.800 the image
02:57:18.680 and you can import it from either Expo
02:57:21.120 image or react native in this case we'll
02:57:23.680 use Expo image so that we can actually
02:57:26.200 cach it and make it work performant so
02:57:30.160 we have the source which is post.
02:57:32.399 author. image style content fit
02:57:35.359 transition and then the cache policy and
02:57:38.160 then we're going to show the post author
02:57:40.720 username so let's save this and I will
02:57:43.520 open up my simulator let's go ahead
02:57:46.319 import the post and save hopefully we
02:57:50.120 should be able to see our very first
02:57:52.200 post we don't have the cont content yet
02:57:55.120 but we can see who's the author and then
02:57:58.359 below to this view we would like to put
02:58:02.120 something
02:58:03.239 else I think still inside the view but
02:58:06.160 below to the link so I will say uh show
02:58:09.840 a delete button but we only want to show
02:58:13.560 this if we are the owner of the post so
02:58:16.520 again I will add a Todo let let's say
02:58:18.640 fix it
02:58:21.439 later okay I'll just leave it like this
02:58:24.319 for now let's just say we will have
02:58:26.399 three
02:58:28.239 dots which will be a touchable opacity
02:58:31.600 ion icons ellipses horizontal and we're
02:58:34.720 going to have this white color if we are
02:58:37.720 the owner of the post we will see a
02:58:39.600 delete button and let me show you this
02:58:41.840 as well how it'll look like so we are
02:58:45.399 going to have a touchable opacity with
02:58:48.680 this trash outline so I will delete that
02:58:51.800 and bring this back here we go this is
02:58:53.920 how that look and I can comment out this
02:58:57.640 we will be making this to be dynamic in
02:59:00.239 a couple of minutes and then outside of
02:59:02.920 this view we will like to put the actual
02:59:05.439 image the post image so I will go ahead
02:59:08.880 get the
02:59:10.319 image so it is exact exact same thing
02:59:13.279 that's why I am not typing this out we
02:59:15.520 basically get the post image URL and and
02:59:18.560 we cat this and here we go this is the
02:59:21.279 post that we have shared in the previous
02:59:24.239 section then below to it we would like
02:59:26.760 to put the post actions so here I would
02:59:30.760 like to have my post actions which is
02:59:35.040 going to be the buttons where we can
02:59:37.399 like or we can add a comment we can
02:59:40.479 bookmark so on and so forth so I would
02:59:42.920 like to provide this section which is
02:59:44.800 around 10 lines of code let me save and
02:59:47.279 I'll walk you through it
02:59:48.640 so we have a view this is the parent
02:59:50.920 view where we give the post actions then
02:59:53.479 we have the left hand side which are
02:59:56.080 these two buttons okay so we just show a
02:59:59.120 hard heart outline and then chat bubble
03:00:01.760 outline if I can correctly then we have
03:00:04.279 the bookmark outline that is on the
03:00:06.319 right panel so after this view we would
03:00:09.120 like to like like after this view we
03:00:11.600 would like to put the post
03:00:15.200 info okay so we'll go ahead and just
03:00:18.000 check the number of likes and comments
03:00:20.920 so once again I'd like to just paste it
03:00:23.600 which is around 10 lines of code and I'd
03:00:25.800 like to walk you through it so we can
03:00:27.960 already see some data so here we say be
03:00:31.359 the first one to like this post and
03:00:34.200 we'll just say if there is a caption
03:00:36.279 then display it with the author info
03:00:38.960 then we just say view all two comments
03:00:41.800 later in the video we'll make this to be
03:00:43.960 actual number of comments and then we
03:00:46.200 just say 2 hours ago but now there is an
03:00:49.080 issue if you can see like we just need
03:00:51.760 to scroll even more to be able to see
03:00:54.720 everything so here it is overflowing
03:00:57.080 with the tab bar and to make this work
03:01:00.439 we can scroll to the scroll to the top
03:01:03.200 and actually it'll be in the index. TSX
03:01:06.000 file we'll go into this scroll view
03:01:08.279 where we have this parent scroll view I
03:01:10.880 will add this content container style
03:01:13.880 and from the bottom we'll just give 60
03:01:16.479 padding now if we scroll to the very end
03:01:19.720 we can still have 60 pixels of uh like
03:01:23.680 pading so we can have this area before
03:01:26.399 this just notice how we cannot really
03:01:29.319 see everything clearly right it
03:01:31.279 overflows so this is another thing that
03:01:33.560 you can keep in mind while using scroll
03:01:36.160 view component and now let's go ahead
03:01:38.680 into the post. TSX make these
03:01:41.920 functionalities work where we can like
03:01:44.520 comment and add a bookmark so we are
03:01:48.000 going to start with the like function
03:01:50.120 but before let's just handle this to-do
03:01:52.720 where we would like to add the actual
03:01:54.600 type instead of just saying any so I
03:01:57.120 will delete this line and let's go ahead
03:01:59.439 make this to be let's say post props
03:02:02.040 which is going to be a type that we'll
03:02:03.880 like to create so here we are accepting
03:02:06.640 a post let's go ahead and get that now
03:02:09.439 this post is extended right we just know
03:02:12.319 that from the get feed posts we are
03:02:14.800 returning an object getting all the
03:02:17.479 fields that a post has such as you know
03:02:20.560 everything that you see on the screen
03:02:22.200 and on top of it we have the author uh
03:02:25.040 author author information and then we
03:02:27.840 have two different buan values so we
03:02:30.880 would like to add these so that our post
03:02:33.160 prop is um type save and instead of
03:02:36.560 typing this out since we already know
03:02:38.640 this I will paste this and walk you
03:02:40.479 through it so each post will have an ID
03:02:43.800 which is type of post ID and you can get
03:02:46.840 this ID from a convex generated data
03:02:50.040 model you can also say this is going to
03:02:52.319 be type of string but if you want to be
03:02:54.600 really clear what you are doing with you
03:02:57.319 should say um this should be actual type
03:03:01.239 of post ID right and then on top of
03:03:04.000 these Boolean values we would like to
03:03:06.239 have the author field just like that
03:03:09.239 okay so with this in mind everything
03:03:11.040 should be working as expected now you
03:03:13.359 can just say post and you can see it is
03:03:16.439 type save you can go on under the author
03:03:18.760 and you can get all these fields now I
03:03:21.399 think this is
03:03:22.640 complaining here we go so it says it
03:03:25.760 could be undefined and to be able to fix
03:03:28.200 this I will go here and let me shink the
03:03:31.080 left hand side so when we are getting
03:03:33.120 the post author it says this could be
03:03:35.640 null but we really know that if we have
03:03:38.359 a post we know that we have an author as
03:03:41.399 well so I'll just wrap this with
03:03:43.640 brackets and I'll just add a question
03:03:46.040 mark or exclamation Mark at the end just
03:03:49.080 to say this will never be null we will
03:03:51.800 always have a post author okay let's
03:03:54.479 save now we don't really have any errors
03:03:57.720 okay I hope that makes sense we have
03:03:59.239 just handled our
03:04:01.279 to-do and we can build our like function
03:04:04.920 so I will save this file and since
03:04:07.319 liking a post is related to posts I will
03:04:10.439 go under the convex folder and visit the
03:04:13.640 posts file and we are going to add a
03:04:16.040 function called let's say toggle like I
03:04:20.760 am calling this as toggle like it's
03:04:22.960 because this will both handle liking and
03:04:25.960 unliking so let's say this is going to
03:04:28.080 be tole like which will be a mutation
03:04:30.960 and we would like to get the arcs and
03:04:33.720 here we'll just pass the post ID so that
03:04:36.520 we know which post that we are trying to
03:04:38.960 like so just say it's going to be type
03:04:40.920 of V ID with posts there we go and we'll
03:04:45.040 just say we're going to have a Handler
03:04:46.960 function which will be an async arrow
03:04:49.840 function and we're going to get the
03:04:51.920 context as well as the
03:04:54.000 arcs okay so now let's try to build the
03:04:56.800 function logic so first things first we
03:04:59.319 are going to get the currently
03:05:00.920 authenticated user and since we have
03:05:03.160 this function already we can just call
03:05:05.160 it then we would like to check if we
03:05:07.520 already like this post or not so I'll
03:05:10.239 just say const existing and we're going
03:05:12.760 to go into the likes table and we are
03:05:15.520 going to search for it if we get a
03:05:18.560 result that means we already like this
03:05:21.439 and then we'll like to get the post
03:05:23.520 itself so here we just get the like we
03:05:26.720 just check if we already liked it or not
03:05:29.600 and now it is time to get the actual
03:05:31.479 post so we'll just say context db. getet
03:05:34.800 and pass the post ID let's just add an
03:05:37.720 if check if post does not exist we'll
03:05:40.560 say post not found and now depending on
03:05:43.479 this existing uh existing state we'll
03:05:46.880 just say e either we would like to
03:05:48.800 remove the like or in the else case we
03:05:52.160 would like to add a
03:05:54.600 like okay so if it is existing it means
03:05:57.720 we already liked it where we like to now
03:06:00.399 delete our like so I'll just say a wait
03:06:03.880 context db. delete so basically go ahead
03:06:07.520 delete this like from the likes uh from
03:06:10.800 the likes table and then what we want to
03:06:13.600 do just go ahead decrement the number of
03:06:16.319 likes on this post
03:06:18.279 okay so we just say patch this post and
03:06:20.840 this is the field that we'll like to
03:06:23.080 update so that's going to be it for the
03:06:25.640 if check and I think we can also return
03:06:28.560 false this indicates now the like state
03:06:32.000 is false right so it means it is unliked
03:06:35.800 and then in the else case you would like
03:06:37.800 to basically add a
03:06:40.560 like as you can tell we're going to add
03:06:43.080 a like into the likes table with this
03:06:45.600 user ID and with this specific spefic
03:06:47.920 post and then we'll like to increment
03:06:50.200 the likes count to by one now there is
03:06:52.920 one more thing that we'll like to do if
03:06:55.200 it is not my post I would like to send a
03:06:57.720 notification right so I'll just say if
03:07:00.640 it is not my post let's create a
03:07:02.840 notification and how can we check this
03:07:06.000 let me just provide the code let's save
03:07:08.640 to get this formatting so we basically
03:07:10.920 say if current user ID is not equal to
03:07:14.200 the post user ID right if this is not my
03:07:16.960 post go ahead under the notifications
03:07:19.439 table and create a notification and here
03:07:22.800 are the fields type will be like there
03:07:25.760 we go and
03:07:27.880 finally still inside the lse statement
03:07:31.200 notice how we returned false in the F in
03:07:33.720 the if now here we'll like to return
03:07:36.960 true let's see true this will
03:07:40.399 indicate uh this is now liked okay so
03:07:44.040 that's the entire function believe it or
03:07:45.720 not it looks like too much but actually
03:07:48.720 it is super simple right okay just take
03:07:52.399 a look at this if you really wanted to
03:07:54.479 pause the video then we should be good
03:07:56.680 to go now let's go into this post. TSX
03:07:59.560 file and actually try to call this
03:08:01.760 mutation that we have just created so I
03:08:04.439 would like to have a state first so I'll
03:08:06.680 just say const this is going to check if
03:08:08.960 we already like the post or not so is
03:08:11.680 liked and set is
03:08:14.479 liked this is going to be equal to use
03:08:17.980 [Music]
03:08:20.040 State let me type this correctly there
03:08:23.200 we go and we'll just say post dot is
03:08:25.880 liked and we can now create a function
03:08:29.200 I'll just say const handle like when we
03:08:32.319 click to this icon we would like to call
03:08:35.160 this function so let's say async Arrow
03:08:38.319 function that we're going to build the
03:08:39.760 logic in a second and we can also keep
03:08:42.359 track of the likes count so here I'll
03:08:44.960 just say likes count it will will be a
03:08:47.920 state post. likes that is coming as you
03:08:51.200 can tell from the props there we go now
03:08:54.720 let's visit and find this touchable
03:08:57.640 opacity where we have heart outline icon
03:09:01.120 but we would like to make this to be
03:09:02.720 dynamic so I will cut this for a second
03:09:05.479 I'll say if it is light we would like to
03:09:07.840 show a hard icon but if it is not liked
03:09:12.760 then we would like to show this heart
03:09:14.600 outline let's save I'll just make this
03:09:17.680 to be true so that we can see the fied
03:09:20.200 State there we go and then we would like
03:09:22.520 to change the color as well so I would
03:09:24.920 like to go
03:09:27.399 below and instead of having the white
03:09:29.920 color we'll just say if it is light it
03:09:32.120 should be primary color which is green
03:09:34.760 and otherwise it'll be white then on
03:09:37.800 press let's just save to get this
03:09:40.040 formatting on this touchable opacity on
03:09:43.239 press should call the handle like
03:09:46.319 function so let's go ahead and try to
03:09:48.840 build
03:09:49.920 it so first things first I will just say
03:09:53.160 give me a try catch block and then I'll
03:09:56.239 say AIT toggle like and this is the
03:10:00.600 mutation that we would like to consume
03:10:03.080 so let's say use
03:10:05.040 mutation under the API under the posts
03:10:08.560 there we go get the toggle like let's
03:10:11.120 say con toggle like now we can call this
03:10:15.640 and as you can tell this is is expecting
03:10:18.239 some props wait toggle like it should be
03:10:22.600 okay we are just going to send the post
03:10:24.479 ID let's say post ID will be equal to
03:10:27.200 post doore ID then after this we would
03:10:31.279 like to update the state right I'll just
03:10:33.600 say set is liked and now is this going
03:10:37.560 to be true or is this going to be false
03:10:39.960 I don't really know right we should get
03:10:41.840 a response from this function and this
03:10:44.239 is actually what we have done in the if
03:10:47.520 and lse statements we just return the
03:10:50.560 current state either true or false so
03:10:53.520 here I'll just say const and assign it
03:10:55.800 to a variable called new is liked and
03:10:59.399 we'll just set is liked with it then we
03:11:02.239 can go ahead update the likes count just
03:11:05.720 like this in the catch you can handle it
03:11:08.680 properly or in a different way I'll just
03:11:11.080 save it as a console log so let's save
03:11:14.279 and hopefully this should work out and
03:11:16.439 also I would like to use this likes
03:11:19.000 count in the actual UI so I will go
03:11:23.040 ahead and find the post info section
03:11:26.319 here instead of having this text I will
03:11:28.640 cut it for a second and I will say if
03:11:31.200 leg count is greater than zero then we
03:11:33.640 would like to see the actual actual
03:11:36.120 count otherwise we'll just see the
03:11:38.160 previous text now let's save and I would
03:11:41.040 like to reload this application by
03:11:43.680 pressing R in the terminal okay so I'll
03:11:46.600 go ahead like this there we go we have
03:11:49.080 one like and let's double check
03:11:53.080 this here we can see our post got a like
03:11:56.760 and if we visit the likes uh table we
03:11:59.920 can see we just got a document we can go
03:12:03.200 ahead and try to unlock it this should
03:12:05.800 be
03:12:06.520 deleted in real time here we go and this
03:12:09.760 post now has zero likes so that means
03:12:13.319 everything is working properly and since
03:12:16.160 we just like our own post we shouldn't
03:12:19.160 really have any notifications here we go
03:12:22.359 and now let's test out the notification
03:12:24.560 feature as well I will go ahead and like
03:12:28.319 log out because I will try to sign up
03:12:31.479 with a different account so currently we
03:12:33.880 just have only one user in the database
03:12:36.840 which is this one let's sign up with
03:12:39.160 this and I will like the other accounts
03:12:42.960 post all right so looks like we got an
03:12:45.479 error uh for some reason let's try to
03:12:48.319 reload our application is this something
03:12:50.960 that we just got in development or okay
03:12:53.720 so we are going to see if that error
03:12:56.040 occurs anytime soon um otherwise we can
03:12:59.560 just move on at the moment we can take a
03:13:02.239 look at the notifications we don't
03:13:04.160 really have any documents so I am logged
03:13:07.479 in as a different account and I will try
03:13:10.120 to like the post of this user which
03:13:12.840 should create a notification so I will
03:13:15.239 like it like in real time we got the
03:13:18.200 notification it is type of like this is
03:13:20.760 the receiver this is the sender and we
03:13:23.279 can see this post now has one like and
03:13:27.000 we got that user in the database as well
03:13:30.040 okay so it seems like everything is
03:13:31.560 working now if we try to unlike it
03:13:34.359 obviously we don't really want to delete
03:13:36.120 the notification so I will unlike it and
03:13:39.439 this is not being deleted which is what
03:13:41.720 we would like to have and now you might
03:13:43.680 be asking okay so if this is not my post
03:13:46.560 why on Earth do I see this delete button
03:13:49.439 so this is just an icon this is how we
03:13:51.720 coded it it is hardcoded we're going to
03:13:54.359 fix it obviously but just know that
03:13:57.160 currently if you click to it nothing
03:13:58.960 happens so this is a to-do that we left
03:14:01.399 for the incoming sections and next we
03:14:04.080 can add the common
03:14:06.200 functionality so before we start writing
03:14:08.760 the common functionality I'd like to
03:14:11.359 take a quick break and just talk about
03:14:14.120 the performance issues that we currently
03:14:16.640 have and then I'll give you some
03:14:18.520 resources that you should keep in mind
03:14:20.600 while working with react native so first
03:14:23.399 things first let's see the problems that
03:14:25.359 we have and how we can optimize them so
03:14:27.960 it's going to be under the home screen
03:14:30.120 which is what we have and it's under the
03:14:32.120 app tabs index. TSX file all right so it
03:14:36.800 is going to be related to posts so for
03:14:40.239 now let's go ahead and just cut this
03:14:42.800 we're going to ignore this for a second
03:14:44.680 and we're going to fix that as well I'll
03:14:46.760 just put it right here and comment this
03:14:49.040 out so as if it does not exist and we're
03:14:52.279 going to add it as I said just in a
03:14:54.479 second so what is the problem here that
03:14:56.880 we have now in a real word social media
03:14:59.760 application probably you will have
03:15:02.080 hundreds and thousands of posts and what
03:15:05.479 scroll view does here at the moment when
03:15:08.040 you map through it it actually tries to
03:15:10.880 render all of them at once and this is a
03:15:14.000 problem because your application might
03:15:16.239 crash uh because there is not enough
03:15:18.399 memory so what we should use instead a
03:15:21.319 called a component called flatlist so
03:15:25.720 this is something that I have mentioned
03:15:27.319 if you remember at the beginning of the
03:15:29.399 tutorial and this is the time to use it
03:15:32.520 so what this does is to actually only
03:15:35.560 render what is visible on the screen so
03:15:38.640 just imagine we have 100 posts but
03:15:41.760 currently we can only see one right we
03:15:43.800 cannot see the others so it will only
03:15:47.000 render the one that you see and as you
03:15:49.199 scroll it will render the remaining part
03:15:51.920 so currently we just have only one post
03:15:54.080 but imagine if in the database we had
03:15:56.439 100 posts that would be the case so
03:15:59.760 scroll view tries to render everything
03:16:02.120 at once and flatlist instead does only
03:16:06.000 render what you see on the screen so
03:16:08.359 I'll just bring this back uh maybe the
03:16:11.199 story
03:16:13.040 section and we are going to try to fix
03:16:16.080 it so so let's save so we are going to
03:16:18.720 optimize the post section but now for
03:16:21.399 stories if you think in your social
03:16:24.040 media application you will have let's
03:16:26.239 say at most 20 stories in that case
03:16:29.399 using scroll view is I think completely
03:16:32.120 fine because like if you render every
03:16:35.319 story that you have at once your
03:16:37.880 application will not crash right but you
03:16:40.279 could still use flat list for this case
03:16:42.600 as well so what's like once again what
03:16:45.520 scroll view does is is to render
03:16:47.680 everything that you have at once even
03:16:50.160 though if they are not visible on the
03:16:51.840 screen but on the other on the other
03:16:54.920 hand what flatlist does only render you
03:16:58.560 what what is visible on the screen and
03:17:01.080 as you you know as you see the other
03:17:03.479 elements it goes ahead and render them
03:17:06.319 and it this doesn't really cause any
03:17:08.160 delay or anything but it just improves
03:17:11.479 the performance so before we try to
03:17:14.000 implement it I'd like to give this as a
03:17:16.040 note I'll go into the rout and I'll
03:17:19.680 create a nodes. MD file so that you can
03:17:22.960 have this as a reference at the end of
03:17:24.880 this tutorial let me just copy it and
03:17:27.600 paste it from my notes shrink the left
03:17:30.199 hand side paste this in so these are the
03:17:33.000 notes that I have prepared with the help
03:17:35.000 of AI just to make it look really clean
03:17:37.560 and crisp but I just double checked
03:17:40.439 everything that you see on the screen is
03:17:42.160 completely correct so let's just go over
03:17:44.760 it you should use FL flat list when
03:17:48.239 performance is critical because flatlist
03:17:51.040 only renders items currently visible on
03:17:53.640 the screen and it saves memory and
03:17:55.800 improve your performance and when you
03:17:58.439 have long lists of data so basically
03:18:01.840 what we have in the posts uh post
03:18:04.680 section right when we are rendering
03:18:06.960 potentially large sets of data so this
03:18:09.840 could be your feeds search results
03:18:12.399 message lists so on and so forth now we
03:18:15.160 can read the rest but basically you
03:18:17.279 would like to use scroll view when all
03:18:20.040 content fits in memory so when you are
03:18:22.279 displaying a small fixed amount of
03:18:24.520 content and so on and so forth I hope
03:18:28.000 this helps and we're going to add more
03:18:30.279 notes as we go through this
03:18:33.080 section all right so now that we know
03:18:35.359 the theory but how the hell do we
03:18:38.199 Implement that right so we're going to
03:18:40.120 go ahead what I'd like to do just ignore
03:18:42.960 the stories completely for now once
03:18:45.880 again I'll just cut that that and put it
03:18:48.600 right here as a comment so that it
03:18:50.920 doesn't really bother us so for now
03:18:53.920 let's just think about depost since we
03:18:56.439 are not going to be using scroll view we
03:18:58.399 can basically go ahead and delete this
03:19:01.160 completely and instead use a component
03:19:04.199 called Flat list so let's say flat list
03:19:07.319 imported from react native and this is
03:19:09.560 going to be a self-closed component and
03:19:12.560 let's see how we can use it so instead
03:19:15.680 of doing like
03:19:17.239 posts. map or stories. map we will say
03:19:21.239 this is the data that you would like to
03:19:23.279 map through and for each post what do we
03:19:26.720 want to do we would like to render an
03:19:29.000 item so this is going to be taking a
03:19:32.080 callback where we will take the item so
03:19:35.160 here you can see if you uh press control
03:19:38.560 space you can see index item and
03:19:40.680 separators we would like to get the item
03:19:43.600 and for every single item we would like
03:19:46.040 to return a post component and here
03:19:49.000 we'll go ahead and add the
03:19:51.279 post like this because this post
03:19:54.120 component wants you to add a post prop
03:19:57.399 but now we didn't really add the key
03:19:59.720 right for this there is a special prop
03:20:02.239 called key extractor and we would like
03:20:05.040 to add a unique field such as the ID and
03:20:08.520 then we would like to add this previous
03:20:12.399 uh prop that we have called show I think
03:20:15.680 it should be first
03:20:17.399 yes so since this is related to posts we
03:20:20.600 don't really want to show that vertical
03:20:22.960 uh scroll indicator so I'll just say
03:20:25.120 false for this then I also want to add
03:20:28.479 this content container style where we
03:20:31.479 give some pettings from the
03:20:34.160 bottom okay so I would like to just save
03:20:36.800 it and let's see what we're going to get
03:20:39.199 okay there we go what we have let's just
03:20:41.160 double check I'll reload my
03:20:43.920 application so we can just see our posts
03:20:46.920 just like previously but now it is a lot
03:20:49.040 more optimized and performant but now we
03:20:52.239 don't really have these stories right
03:20:54.279 for this we can go ahead and add another
03:20:56.520 prop so I'll just say list header
03:20:59.680 component and for this we would like to
03:21:02.760 return a com return a component called
03:21:05.399 let's just say stories section you can
03:21:08.319 call this anything but this is the name
03:21:10.000 that I'll be going with now let's try to
03:21:12.840 cut this part and delete this comment I
03:21:16.680 will go ahead and create this component
03:21:19.199 so this will be an arrow function where
03:21:21.359 we can immediately return what we have
03:21:24.120 just cut it okay so I think this is
03:21:26.960 going to
03:21:28.239 be like this so we can just still go
03:21:31.720 like this but I want to make it a bit
03:21:33.560 more beginner friendly so we'll just say
03:21:36.279 return this
03:21:38.239 part and let's paste and remove the
03:21:42.319 comments okay so basically we have a
03:21:45.000 functional component where we return a
03:21:47.199 scroll view with stories and we say this
03:21:50.439 is going to be in the horizontal
03:21:51.880 direction do not show the indicator and
03:21:54.800 this is the Styles okay so everything
03:21:57.600 should be working as expected just like
03:21:59.800 previously but now everything is a lot
03:22:02.080 more optimized and performant because we
03:22:04.760 are using flat list if you really wanted
03:22:08.040 to you can still use flat list for this
03:22:10.279 one as well but since we only have eight
03:22:13.000 stories I think this is completely fine
03:22:15.279 to use scroll View so that was the first
03:22:17.720 thing that I wanted to mention now let's
03:22:19.680 go ahead and talk about something else
03:22:22.239 so I think at the beginning of the video
03:22:24.960 I've talked about the pressable
03:22:27.080 component versus touchable opacity and
03:22:30.239 so far we have only used touchable
03:22:32.279 opacity and it has a reason so I would
03:22:35.040 like to just save this file and go into
03:22:37.680 the notes and try to add some notes so
03:22:40.760 that you can have it on your source code
03:22:43.160 as
03:22:43.840 well let me copy everything
03:22:47.000 and I'll just tell you the difference by
03:22:49.640 reading this file so before I read
03:22:52.560 anything just know that pressable is
03:22:55.439 used in more complex situations when you
03:22:58.760 need more complex interactions and
03:23:01.319 touchable opacity used for more simply
03:23:05.120 like for simple fade effects and this is
03:23:08.000 what we have used so far we don't really
03:23:10.120 have any advanced interactions so we
03:23:13.520 mostly we mostly use touchable opacity
03:23:16.880 but you can take a look at the entire
03:23:18.520 thing once again I just double checked
03:23:20.840 everything that you see on the screen is
03:23:22.399 completely correct but basically you
03:23:24.840 would like to use Pressel for complex
03:23:27.520 interaction States and both of them are
03:23:30.040 used for button purposes and pressable
03:23:34.439 is a little bit more newer like in the
03:23:37.479 old code bases you're going to see
03:23:39.359 touchable opacity more and more and it
03:23:42.319 has a simpler API as well so I think and
03:23:46.120 I hope hope this makes sense as well
03:23:48.120 there is one more thing that I'd like to
03:23:49.960 talk about which is the image component
03:23:53.319 that is coming from react native and in
03:23:55.720 this file I think we are
03:23:58.040 using um the one that is coming from
03:24:00.439 react native and there is another image
03:24:02.560 component which is coming from Expo so
03:24:05.160 what are the differences about those I
03:24:08.040 think I have already mentioned that but
03:24:09.920 I'll just give you some
03:24:12.640 notes which explain it a lot better
03:24:17.040 and once again basically you would use
03:24:19.439 Expo image when you need some like a bit
03:24:22.520 more performance and for caching and in
03:24:25.640 our case since we have high quality
03:24:28.160 images this is a social media
03:24:30.040 application we always want to have some
03:24:32.359 caching so that images loads immediately
03:24:36.479 and we are using Expo images most of the
03:24:39.120 time and you should use react native
03:24:41.160 image when you need basic image display
03:24:43.840 with minimal configuration and when you
03:24:46.399 are trying to keep your apps bundle size
03:24:49.120 smaller here are some more uh some edge
03:24:52.600 cases that you can take a look but this
03:24:54.600 is the general idea that you should keep
03:24:56.560 in mind so with all these nodes in mind
03:24:59.680 we would like to talk about something
03:25:01.399 else which is about fonts So currently
03:25:04.880 probably this is not what you see uh
03:25:07.479 since I am running the demo application
03:25:09.399 as well this gets the font size and font
03:25:12.840 family from the cache so in your case
03:25:16.040 let me me just pretty quickly show you
03:25:18.800 if we go here if I delete this so
03:25:22.040 probably you are seeing the font size
03:25:24.479 just like this but in my case this is
03:25:26.760 coming from the cache and let's try to
03:25:29.439 actually install it so when I first
03:25:31.800 started with this application I didn't
03:25:33.760 really have this at all now I would like
03:25:37.359 to go and show you this assets folder
03:25:40.319 where we have some fonts this is the
03:25:42.600 default font coming with Expo
03:25:45.000 installation but we would like to add
03:25:46.960 our own custom font so first I'd like to
03:25:50.239 give you the
03:25:52.399 URL let me copy it it's going to be
03:25:55.120 coming from
03:25:56.560 jetbrains so jetb brains.com
03:26:00.080 LPM
03:26:01.840 monono once you get into this website
03:26:04.760 you can download the font which is going
03:26:06.920 to give you a zip and from there you
03:26:09.560 would like to find a file so I have
03:26:12.479 already installed it I'll just show you
03:26:14.439 which one it is let me try to copy and
03:26:17.520 paste it into the fonts folder okay so
03:26:22.080 it's really simple you'll go ahead and
03:26:23.880 unzip that folder and grab this file
03:26:27.600 which is jetbrains mono- medium. ttf now
03:26:31.920 we just get this but this doesn't mean
03:26:34.439 we installed it into our application we
03:26:36.840 need to load it for this we'll go into
03:26:39.520 our layout so let me go back into the
03:26:43.319 underscore layout which is our root
03:26:45.520 layout and here we would like to load
03:26:48.439 the
03:26:49.399 font and before we load it I would like
03:26:52.080 to talk about a concept or something
03:26:54.920 called splash screen and you might be
03:26:57.520 asking what the hell is that so when you
03:27:00.319 are trying to log into your application
03:27:03.479 right so when you open this up for a
03:27:06.000 split second you see the icon right that
03:27:08.720 could be in Facebook Instagram Twitter
03:27:11.359 in any application you name it for a
03:27:13.880 split second you see this kind of a
03:27:15.760 screen and this is what we call splash
03:27:17.880 screen the loading screen basically so
03:27:20.760 for this I would like to write some code
03:27:24.199 that will handle the splash screen so
03:27:26.359 we're going to say until our phone's
03:27:29.640 loaded just show the splash screen and
03:27:33.640 you know like once our phone's Loaded
03:27:35.680 show the actual application content so I
03:27:38.800 hope I have explained it in a clean way
03:27:41.239 let's try to see how we can make that
03:27:43.000 work so we'll just first say splice
03:27:45.920 screen scen let's import it from Expo
03:27:48.160 router we'll just say prevent Auto Hide
03:27:51.399 async and then we'll like to load our
03:27:54.479 fonts which we can do it with use fonts
03:27:58.080 hook and I think this is going to be
03:28:00.160 coming from Expo let's say
03:28:03.479 import font oops let's say use fonts
03:28:08.080 which is going to be coming from Expo
03:28:10.479 fonts Expo font okay then this is the
03:28:13.880 font uh path that we'll like to look
03:28:16.160 load so first the name is called as jet
03:28:20.479 brains mono-
03:28:25.040 medium and this is the path that we'd
03:28:27.760 like to import it so we'll just say
03:28:29.880 require go under the assets under the
03:28:32.640 fonts and this is the exact same file
03:28:34.960 that we have just installed it which is
03:28:37.239 going to give us a variable so let's say
03:28:39.359 const we're going to destructure this
03:28:42.680 fonts loaded so this is a bullion that
03:28:46.359 we'll like to check let's say if once
03:28:49.479 loaded then you should go ahead and
03:28:52.000 actually say Splash screen. hide async
03:28:56.640 so once our phone's loaded we would like
03:28:58.680 to hide the SPL screen so that we can
03:29:01.520 actually see the actual application
03:29:04.479 content and we don't really want to add
03:29:06.920 it like this but instead I will go ahead
03:29:09.319 and wrap this with a use callback so
03:29:12.080 that it is memorized and cached let's go
03:29:15.120 ahead import the use callback from react
03:29:18.399 this is on layout root View and we're
03:29:21.439 going to pass it into our safe area view
03:29:24.680 component so let's say on layout we'll
03:29:27.600 like to call this function and if you're
03:29:29.760 wondering what does that mean what this
03:29:31.840 does basically it is invoked on Mount
03:29:34.800 and layout changes with Okay so let's go
03:29:37.680 ahead and
03:29:39.120 save now you should be able to see the
03:29:41.960 exact same font that I have if you
03:29:44.160 cannot see go ahead maybe kill your your
03:29:46.239 application or press R it should reload
03:29:50.279 it and we are able to see our font now
03:29:53.800 for a split second I'll just press R
03:29:56.560 like we can see the splash screen right
03:29:59.279 this is the icon oops let's just press
03:30:01.560 once again this is the icon that Expo
03:30:03.840 gives you you can see it from the assets
03:30:06.920 images and it is this Splash icon.png
03:30:10.520 now you can use this completely like
03:30:13.479 definitely but I have prepared something
03:30:15.720 for you if you want to get it I will go
03:30:18.520 ahead delete this one let me just say
03:30:21.800 delete this and I will provide the one
03:30:24.880 that I have prepared so I have just
03:30:27.000 dragged interrupted it is again called
03:30:29.680 Splash Das icon this is the actual icon
03:30:33.279 that I have prepared and if you toggle
03:30:35.960 the status bar visibility you can see
03:30:38.560 this is the recommended size 1024 Square
03:30:42.199 you would like to get this size for the
03:30:44.520 splash icon and and if you ask like how
03:30:47.920 did I make this open it is command shift
03:30:50.960 p and I'll just tackle this so that it
03:30:53.680 doesn't take any space so let's open up
03:30:56.600 the terminal I'll press R hopefully we
03:30:59.680 should be able to see the splash icon
03:31:01.760 but looks like we can't so I will go
03:31:03.760 ahead just say command
03:31:06.239 C kill the application and restart
03:31:12.720 this okay so for some reason this does
03:31:15.640 not work maybe it is in the cache it
03:31:18.319 should be cleared let's see how we can
03:31:20.319 fix this now what I'll be doing is to
03:31:22.800 kill my terminal and clear this up let
03:31:25.720 me shink the left hand side I would like
03:31:27.680 to start my application from scratch but
03:31:30.399 clearing the cache so I'll just say npx
03:31:32.840 Expo start-
03:31:35.279 C hopefully this will clear the cache as
03:31:38.399 you can tell let's say
03:31:41.359 R okay still we cannot get this icon I
03:31:45.080 don't know why
03:31:46.399 previously it has worked for me but at
03:31:49.160 the moment it doesn't maybe I should
03:31:51.479 kill the application restart it
03:31:56.279 again okay so it does not work let's go
03:31:58.920 ahead and try to find another solution
03:32:01.399 so since it is not working as expected
03:32:03.840 let's take a look at the documentation
03:32:06.120 so this is something expected they
03:32:08.239 basically tell us do not use Expo go to
03:32:11.560 test your splash screen you should get a
03:32:14.319 preview build or produ build to test
03:32:17.120 this out otherwise you might get this
03:32:20.040 kind of conflict that we just got so we
03:32:22.600 can assume that it is going to work in
03:32:24.520 the production and then here are some
03:32:26.880 notes about a splash screen icon this is
03:32:30.120 your recommended size this is what I
03:32:32.239 have mentioned a couple of minutes ago
03:32:34.560 and then it should be a PNG file without
03:32:37.680 a transp like with a transparent
03:32:39.920 background and if you want to configure
03:32:42.319 your you know colors images you should
03:32:44.880 visit the app. Json file where you have
03:32:47.720 all kinds of configurations about your
03:32:51.199 application so you can change the
03:32:53.199 Android icon you can change the icon for
03:32:56.439 all devices and then for the splice
03:33:00.160 screen now in our case we would like to
03:33:03.279 actually change these icons as well
03:33:06.399 which is the icon.png as well as
03:33:08.960 adaptive icon.png so you might be asking
03:33:12.319 what are these so this is the main icon
03:33:15.520 for for our application and adaptive
03:33:18.239 icon is also like the same icon but it
03:33:21.520 is used for newer Android devices so
03:33:25.399 older Android devices will use this one
03:33:28.040 and iOS devices would also use this one
03:33:30.760 but newer Android devices are going to
03:33:32.960 be using this adaptive icon so what I
03:33:36.199 have done is to actually prepare these
03:33:38.920 icons as well which is going to be the
03:33:40.840 same thing with this one so I would like
03:33:43.040 to just copy this paste it once again in
03:33:46.319 and I'd like to delete the icon.png and
03:33:49.640 I'll delete this adaptive icon.png as
03:33:52.040 well so I'll just copy this paste this
03:33:54.359 once again let's say this will be
03:33:56.279 icon.png
03:33:58.680 and adaptive icon.png
03:34:02.560 hopefully this should be our new icons
03:34:06.000 now we cannot really see it I
03:34:08.319 believe let me just open up my terminal
03:34:11.479 and rerun
03:34:13.080 this first we should press I okay so I
03:34:16.600 think the supply screen worked
03:34:19.040 for like let me just double check okay
03:34:22.120 our supply screen now started to work
03:34:24.680 and if we take a look at the
03:34:28.399 Expo can we just go back if you press
03:34:31.239 command M no that was not correct thing
03:34:35.040 let me bring this back is it command D
03:34:38.120 okay we can go
03:34:39.840 home can we refresh this okay let's
03:34:43.359 clear this out and restart once again
03:34:46.319 just I am looking to if it is going to
03:34:49.239 work with the newer icon so I'll press
03:34:52.520 command
03:34:54.720 D come
03:34:59.080 on okay why it does not work commen
03:35:02.600 let's go home okay here we can see our
03:35:05.239 icon also changed and it is working as
03:35:07.960 expected let me give you some notes and
03:35:10.319 hopefully we're going to end this
03:35:13.560 section under the notes I'll get the
03:35:17.399 notes about the
03:35:22.479 icons okay so here you have it icon.png
03:35:26.760 versus adaptive icon.png so this is the
03:35:30.800 standard app icon that appears on most
03:35:33.319 devices it is the primary icon for your
03:35:36.399 application and this is the recommended
03:35:38.880 image size it is the same thing for
03:35:41.239 adaptive icon and adaptive icon has been
03:35:44.880 introduced in in Android 8 this is
03:35:47.359 specific to Android devices and if you
03:35:50.120 don't provide these icons your app will
03:35:52.560 still work but it'll use expose default
03:35:55.680 icons for a professional application you
03:35:58.600 definitely want to include these icons
03:36:01.640 with your custom icons right okay there
03:36:05.000 we go the very last note that I'd like
03:36:07.359 to include are some resources so if you
03:36:11.160 want to find hundreds of other third
03:36:13.720 party libraries you can visit react
03:36:16.160 native. directory so let me show you
03:36:18.600 this pretty
03:36:20.120 quickly so here you have bunch of
03:36:22.520 different packages that you can take a
03:36:24.399 look explore so on and so forth and if
03:36:27.600 you want to handle some gestures which
03:36:30.520 are a great way to provide an intuitive
03:36:33.279 user experience in an application so
03:36:36.000 there is a package for this as well you
03:36:38.000 can learn more about these under the
03:36:40.520 documentation and so you can add like
03:36:43.439 different gestures like P
03:36:46.040 tab rotation so on and so forth and
03:36:49.479 there is one more package that I'd like
03:36:51.880 to mention which is react native
03:36:54.359 reanimated where you can create smooth
03:36:57.279 animations so let's go ahead take a look
03:36:59.520 at the documentation this is really
03:37:01.680 really common like commonly used if we
03:37:04.279 just search for npm install react native
03:37:08.359 reanimated like weekly downloads is over
03:37:11.080 1 million which is
03:37:13.000 insane and you would like to definitely
03:37:15.239 keep this in mind while building
03:37:17.359 applications so these are the some
03:37:19.279 resources that I'd like to mention
03:37:21.359 before we end this section so with that
03:37:23.600 I'll see you in the next one now let's
03:37:25.720 go ahead and Implement common
03:37:27.640 functionality currently everything is
03:37:29.680 hardcoded and at the end of the day we
03:37:31.760 would like to have this kind of a model
03:37:34.040 when we click to this comment icon where
03:37:37.239 we can see the previous comments and we
03:37:39.720 can add our own comment right so let's
03:37:42.640 see how we can make that work first
03:37:44.840 things first I would like to add my
03:37:46.840 convex functions so that we can really
03:37:50.319 consume those functions in a couple of
03:37:52.720 minutes you can put it into the posts.
03:37:56.000 TS file but I would like to actually put
03:37:58.399 it into the comments. TS file it doesn't
03:38:01.319 really matter but this is the convention
03:38:04.000 that I'd like to use or not a convention
03:38:06.560 but it's just my preference so let's
03:38:08.800 create a function to add a comment you
03:38:11.800 can pause the video and try to do it by
03:38:13.880 yourself and then watch my solution
03:38:16.840 let's say this is going to be a mutation
03:38:18.960 right we' like to add some data and if
03:38:21.520 you want to add a comment we need to get
03:38:23.960 some arguments let's say the content
03:38:27.080 which is the comment itself which will
03:38:29.040 be type of string let's say v. string
03:38:32.920 and we should import the V from convex
03:38:36.160 values then we would like to get the
03:38:38.160 post ID so that we know on which post
03:38:41.040 that we are adding a comment then we
03:38:44.199 would like to have the Handler
03:38:47.560 function which is going to be taking the
03:38:49.880 context as well as the requests I mean
03:38:52.560 arguments not request let's go ahead
03:38:55.800 open up our function and try to build it
03:38:58.319 so I would like to get the current user
03:39:01.000 with our function let's say await get
03:39:05.000 authenticated user and pass the context
03:39:07.640 as the argument so we would like to get
03:39:10.239 the post let's say aate context. db.
03:39:14.720 getet and we're going to put the post ID
03:39:17.120 which is going to return the post itself
03:39:19.840 let's add an if check we'll just say if
03:39:22.120 post not found let's throw an error and
03:39:25.279 by the way you can also return a convex
03:39:27.479 error I think I haven't mentioned this
03:39:29.640 but this is also available then we'll
03:39:32.199 like to create the comment itself so
03:39:34.560 we'll just say go into the comments
03:39:36.560 table and try to insert a data which is
03:39:39.600 this one this is the comment author this
03:39:42.279 is the post and this is the content then
03:39:45.120 this is going to give us the comment ID
03:39:47.479 how do I know well when you hover over
03:39:49.560 this it will tell you that the return
03:39:52.520 statement it returns you the ID of the
03:39:55.560 new document okay so I'll just assign
03:39:58.399 this to the comment ID we would like to
03:40:00.840 increment the comment count by one so I
03:40:03.840 will go ahead edit with a comment since
03:40:06.399 we are updating we'll be using patch
03:40:08.479 this is the post that we would like to
03:40:10.000 update and this is the field that we
03:40:11.880 would like to update right post.
03:40:13.880 comments plus one then we would like to
03:40:16.760 create a notification if this is not my
03:40:19.399 post so I'll go ahead add my if check
03:40:22.239 I'll say if post. user ID is not equal
03:40:25.239 to my ID I would like to insert a
03:40:28.800 notification which is type of comment
03:40:31.199 and here is the related data and at the
03:40:34.439 end of the day we could return this
03:40:36.720 comment ID from this function so this is
03:40:40.160 the entire mutation that we have the
03:40:42.520 other one that we would like to add into
03:40:44.279 this file is to get comments which is
03:40:47.399 going to be a query so I'll go ahead
03:40:49.880 just say export const get comments which
03:40:52.920 will be a query let's get this query
03:40:56.600 from our Imports and we'll like to get
03:40:59.560 the like pass some arguments so that we
03:41:02.199 know on which post we are going to get
03:41:04.399 the arguments and this will be post ID
03:41:07.800 which is type of uh posts and we'll just
03:41:11.040 say our Handler
03:41:14.239 function let's grab the context oops
03:41:17.560 context and
03:41:19.199 arguments and try to build the logic so
03:41:22.439 we'll say con
03:41:24.920 comments let's say await do
03:41:29.080 context wait why this is not happy okay
03:41:32.080 it should be like this context. dbquery
03:41:37.479 the comments table with an index so I'll
03:41:41.560 just say dot with index and if you
03:41:43.760 remember we have a IND index called by
03:41:46.760 post so we'll just add our call back
03:41:49.319 function let's say query. equal to this
03:41:52.640 is the field and we would like to
03:41:54.640 collect all the
03:41:56.800 posts I mean all the comments there we
03:42:00.040 go this is going to give us all the
03:42:01.279 comments now there is one more thing we
03:42:03.239 would like to do so if you think we
03:42:05.080 should just say return comments let me
03:42:07.680 tell you my friend you are wrong because
03:42:10.239 in the comments we have no info about
03:42:13.040 the user the only thing we have is the
03:42:14.960 US user ID but in the comment section we
03:42:17.840 would like to show the user image as
03:42:21.560 well as the user full name right and we
03:42:24.640 need to just go ahead fetch those info
03:42:28.080 right and let me provide this to you
03:42:30.880 this is something that we have done
03:42:32.239 previously right we just said posts with
03:42:35.359 info now we'll just say comments with
03:42:37.680 info so we got all the comments and
03:42:40.560 we're going to go ahead map through each
03:42:42.760 comment and for each comment we'll like
03:42:44.960 to get the user which is going to have
03:42:47.640 the full name as well as the image field
03:42:50.560 okay this is going to be our query that
03:42:52.640 we'll be using in a couple of minutes
03:42:54.720 now let's go into the post. TSX I would
03:42:57.560 like to create a couple of different
03:42:59.399 states let sharing everything just like
03:43:02.479 likes count I will duplicate this and
03:43:04.720 we're going to have something called
03:43:07.000 comments count and let's say set I think
03:43:11.520 we should say comments count and this
03:43:14.760 will be post. com comments just like
03:43:17.680 that and then I would like to have one
03:43:19.520 more State just to check if the comments
03:43:23.120 model will be visible or not so I'll
03:43:25.359 just say show comments and by default
03:43:27.720 this is going to be false if this is
03:43:29.720 true we would like to show a model I'll
03:43:32.319 just uh like I'll just scroll to the
03:43:34.279 very bottom of the file just before this
03:43:37.600 view I will add a component called
03:43:40.359 comment let's say comments model and
03:43:43.479 this is a component that we're going to
03:43:45.120 create just in a second let's say this
03:43:47.520 will take the post ID let's say post. ID
03:43:51.680 is this going to be visible or not we
03:43:53.560 will depend on this state called show
03:43:55.800 comments and when we close this uh when
03:43:59.319 we close this model this state should be
03:44:01.640 false so here is the function that we
03:44:03.760 pass and finally once the comment has
03:44:06.720 been added we would like to increment
03:44:08.840 the number of comments so here it says
03:44:11.840 set comments count let's see
03:44:16.439 it should be S okay I had a typle now
03:44:19.439 this should be happy with us but we
03:44:21.439 don't really have the component that's
03:44:24.000 why it crashes let's go under the
03:44:27.040 components and create this
03:44:30.159 TSX let's say
03:44:32.319 rnf save
03:44:34.760 it and try to import it in this
03:44:37.960 file okay let's go ahead and try to
03:44:40.680 build this Commons model component so
03:44:43.760 first I'd like to add my props as my
03:44:46.640 type right so I'll just a type comments
03:44:50.000 model just going to be a type so here I
03:44:53.159 would like to just copy and paste all
03:44:55.600 these four values so we're going to have
03:44:57.920 a post ID which is going to be type of
03:45:00.920 post ID right then we'll get divisible
03:45:03.760 on close and on comment added functions
03:45:07.319 then let's go ahead to say this is the
03:45:09.640 object that we like the D structure now
03:45:11.840 this should be type save let's get all
03:45:14.159 of them so this is typescript specific
03:45:17.600 and we would like to have a state to
03:45:19.720 keep track of the comment itself so when
03:45:23.080 we are typing in we would like to have
03:45:25.680 this state so that we can update it and
03:45:27.960 initially it'll be empty as you can tell
03:45:31.000 then let's try to get our query so let's
03:45:34.399 just say const comments we'll just say
03:45:37.279 use Query coming from conx we'll just
03:45:40.600 say
03:45:42.000 api. comments. getet comments and this
03:45:45.800 is taking an argument which is going
03:45:47.960 which is going to be the post ID then
03:45:50.279 we'll like to have our mutation so I
03:45:52.479 basically duplicate this and I'll say
03:45:54.840 add comment this is going to be a use
03:45:58.239 mutation
03:45:59.960 call just like that API comments and
03:46:04.080 let's say add comment this takes the um
03:46:08.560 I think this is not the place that we
03:46:10.359 should add so for the mutations if you
03:46:13.239 remember when we call it we would pass
03:46:15.960 those right so this is the place to
03:46:18.279 actually pass these arguments not
03:46:21.680 here okay with this in mind I'll just
03:46:25.000 have one more function let's say handle
03:46:27.840 at comment let's say this is going to be
03:46:30.600 an async empty function for now we're
03:46:33.279 going to build the logic just in a
03:46:35.000 second now let's try to build the actual
03:46:37.600 UI so when we click to this it should
03:46:40.479 open up the model right but we don't
03:46:43.359 really have a model in the first Place
03:46:45.800 let's go ahead and try to build it and
03:46:48.640 for a model there's a component exactly
03:46:52.000 called as model which is coming from
03:46:54.120 react native and whatever you put inside
03:46:56.920 of the model becomes a model so let's
03:47:00.479 just try to see how this would work we
03:47:02.560 will say this will be visible depending
03:47:05.239 on this visible state right this prop
03:47:07.920 that we are getting and then we'll like
03:47:10.159 to have couple of different things let's
03:47:12.560 say animation type will be slide so
03:47:15.359 it'll just slide from the bottom and
03:47:18.000 let's say this will be transparent let
03:47:20.680 say it will be not false but true then
03:47:23.920 we would like to have on request close
03:47:27.199 we would like to add our on close
03:47:29.680 function right and then let's try to
03:47:32.600 build the actual component so first
03:47:36.040 things first I would like to have my
03:47:37.840 keyboard avoiding view this is something
03:47:40.199 that we have mentioned previously
03:47:42.359 basically when we want to open up the
03:47:45.040 keyboard we want this input still be
03:47:49.479 visible so that's why we are using this
03:47:53.199 component and I will get some props like
03:47:56.600 the behavior as well as the style let's
03:47:59.439 say
03:48:00.520 platform. and styles I think this Styles
03:48:04.319 will be coming from let me just double
03:48:06.680 check it should be from the feed Styles
03:48:09.600 then we would like to have the model
03:48:11.960 header let's save to get this formatting
03:48:14.840 we'll go into the keyboard avoiding view
03:48:17.359 paste this in save this and let's try to
03:48:20.040 import our components so touchable
03:48:22.960 opacity which will have this close icon
03:48:26.680 let's get the colors and then the
03:48:28.960 comments title so basically we have just
03:48:31.720 built this part now let's try to build
03:48:35.000 the remaining
03:48:38.359 part so after this view we will just say
03:48:41.680 if comments are equal to un find which
03:48:45.479 means we are in the loading State here
03:48:47.840 we would like to return something else
03:48:49.720 we would like to return something else
03:48:52.040 and in this case we would like to have a
03:48:53.840 loader component which is going to have
03:48:57.080 this uh activity indicator which is size
03:49:00.040 of large and then here we would like to
03:49:02.560 actually return our comments and as you
03:49:05.880 might guess we would like to use a
03:49:07.880 component like flat list okay so if you
03:49:12.199 remember we have this data field where
03:49:14.920 we'll just say map through the comments
03:49:17.399 and render item so each comment go ahead
03:49:21.080 and create or render a comment component
03:49:26.199 we don't have this but we're going to
03:49:27.720 build it and let's add the
03:49:31.159 item as the comment field so you can
03:49:34.720 call this anything right but it should
03:49:36.560 make sense so that you know what you're
03:49:38.239 sending and this is the item that we got
03:49:41.600 then we'll like to add the key extractor
03:49:44.680 so I'll just put it right here and then
03:49:46.840 I'll just give some
03:49:49.279 Styles into the Container okay now let's
03:49:53.520 try to build the comment component which
03:49:56.439 is something that I'd like to create
03:49:58.479 under my components folder so let's say
03:50:02.199 comment.
03:50:03.840 TSX and this has no logic at all other
03:50:07.439 than styling and UI so I'll just paste
03:50:11.399 it around 30 lines of code and let's
03:50:14.359 take a look at it so this is using date
03:50:16.880 FNS package let's go ahead and install
03:50:19.279 it so let just say mpm install date-
03:50:24.680 FNS so we'll be using this to be able to
03:50:27.840 format our dates and let's say npx
03:50:31.279 XO and rerun our
03:50:34.960 application okay so basically this has a
03:50:38.080 view an image with some Styles this will
03:50:41.399 take the comment author and then we have
03:50:45.800 you know the full name of the author the
03:50:48.120 comment content as well as the comment
03:50:50.560 time and this will go ahead and format
03:50:52.760 the distance so that it will say
03:50:54.680 something like 2 hours ago 1 hours ago
03:50:58.040 so there isn't anything called 1 hours
03:51:00.120 ago it should be 1 hour ago but you get
03:51:02.720 the point okay let's go ahead and try to
03:51:05.520 import the comment component now I don't
03:51:09.359 know why this is not really happy with
03:51:11.199 us and I think it is because I haven't
03:51:14.080 imported it so here we should be getting
03:51:16.520 it from our comment file now let's save
03:51:20.960 okay and let's try to keep building it
03:51:23.359 where we just have only one more view
03:51:25.840 I'll just say view let's add the Styles
03:51:28.760 which is going to be comment input then
03:51:31.960 inside we are going to put a text input
03:51:34.560 so again this is a component I think we
03:51:36.640 are using this for the very first time
03:51:39.239 or I don't know if we have used it
03:51:41.520 previously yeah I think we used it in
03:51:43.560 the caption section right here when we
03:51:46.520 try to add a caption but basically we
03:51:49.080 got a style a placeholder and then the
03:51:51.560 text color of the placeholder value on
03:51:54.359 change and this could be multi-line then
03:51:58.199 like after this we'll just have a post
03:52:00.359 button which is going to be a touchable
03:52:02.960 opacity when we click it we're going to
03:52:05.279 call this method that we just have above
03:52:08.800 and then and then it'll be disabled if
03:52:11.439 we don't really have a new comment
03:52:13.680 content and we just have some additional
03:52:16.640 Styles okay now when we collect it
03:52:19.080 nothing happens because we never call
03:52:21.199 the function when we click to this icon
03:52:24.000 let's find it which one is that it
03:52:26.319 should be under the actions so right
03:52:29.880 here when we click to this chat bubble
03:52:32.199 outline let's say on press it should
03:52:34.720 make this state to be true let's save
03:52:37.359 and fingers crossed hopefully it should
03:52:39.560 work there we go we can see our model
03:52:43.040 right it is it just sided
03:52:45.239 down or like it just animated from the
03:52:49.000 bottom of the
03:52:50.120 screen it works without any issues so
03:52:53.159 let's go ahead and add something okay
03:52:56.239 but if we try to post it nothing will
03:52:58.359 happen once again we don't have the
03:53:00.600 function logic yet so let's try to build
03:53:03.159 it and I'll just try to walk you through
03:53:05.239 it so first things first we'll just say
03:53:07.800 if you don't have a comment content just
03:53:10.560 return out of this but else we'll like
03:53:12.840 to have a try catch
03:53:14.610 [Music]
03:53:15.920 in the try I'll just say call my
03:53:17.880 mutation which is ADD comment and these
03:53:20.920 are the fields that we would like to add
03:53:22.760 or the arguments so the comment content
03:53:25.479 as well as the post ID once this is done
03:53:28.239 we can just say set new comment to be
03:53:31.600 reseted and then we can just call the on
03:53:34.960 comment added function then in the catch
03:53:38.760 let's just put a console log like this
03:53:42.840 let's save and try to to send our very
03:53:45.560 first comment I'll just say hey nice
03:53:49.840 post let's post it okay so there we go
03:53:53.520 we just got that let's open up our
03:53:56.080 database this post has a new comment
03:54:00.000 under the comments we should be able to
03:54:02.120 see the document but we shouldn't get a
03:54:05.439 notification because I just commented on
03:54:08.600 my own post so this is the account that
03:54:11.479 I am currently logged in behind the
03:54:13.800 scenes I just logged out from the other
03:54:15.680 account but this is the account that I
03:54:17.520 am logged in so just keep this in mind
03:54:20.319 this is my actual post and now let's see
03:54:24.159 if I just try to open up my keyboard
03:54:26.439 with command shift
03:54:28.760 K okay so I just wanted to show you that
03:54:32.239 this is actually avoiding the keyboard
03:54:34.880 view right so we are able to see the
03:54:37.960 content it is not overflowing if you
03:54:40.720 were to use a regular view without this
03:54:45.120 behavior let's see what would happen it
03:54:48.040 overflows right you are typing your
03:54:50.159 comment let's just say hey but you are
03:54:52.720 not able to see what you have just
03:54:55.080 written okay so with this in mind let's
03:54:58.640 save and add one more
03:55:01.680 comment okay let's just say post here we
03:55:04.720 go and our date is formatted by the way
03:55:07.439 if you can
03:55:08.479 see um is there anything that we are
03:55:11.279 missing I don't really think so well
03:55:14.439 actually we have so here we just say
03:55:16.800 view all two comments but this is a
03:55:19.279 hardcoded value right we should fix this
03:55:22.680 actually so we need to get the number of
03:55:25.319 comments and here thankfully we have a
03:55:28.239 state where we just say comments count
03:55:31.239 and when we add a new comment we are
03:55:33.359 actually updating it so it will always
03:55:35.760 work properly we can go ahead delete
03:55:38.640 this and make it work um dynamically so
03:55:43.439 let me just Corp this paste it so
03:55:47.000 instead of just two we have added this
03:55:48.840 part let's save let's try to add one
03:55:51.560 more comment say one
03:55:57.680 more okay it's been added here we can
03:56:00.760 see weew all three comments and when we
03:56:03.920 click to this it should also open up the
03:56:06.720 model let's try to add it here I'll just
03:56:09.439 say on this touchable opacity onclick or
03:56:12.520 on press it should open up the
03:56:15.159 model okay and the other thing that we
03:56:18.080 are missing is this 2 hours ago which
03:56:20.760 should be dynamic not hardcoded so let's
03:56:24.279 say format distance to now get this from
03:56:27.239 data Fess and this is the time that we
03:56:30.399 like to format so if you save this is
03:56:32.880 actually one day ago when we post this
03:56:35.399 it was yesterday and just make sure this
03:56:37.920 is coming from date- FNS and then I
03:56:41.520 would like to scroll to the bottom where
03:56:43.800 we show the commment count instead of
03:56:47.359 showing this always what I'd like to do
03:56:49.880 is just wrap it with an if check so
03:56:52.800 because imagine if we don't really have
03:56:54.880 any comments it'll just say VI all zero
03:56:58.960 comments which doesn't make any sense so
03:57:01.399 I'll just go ahead and say if comments
03:57:05.199 count is greater than zero only then
03:57:08.000 show this part let's go ahead and wrap
03:57:10.520 it okay so with this in mind that's
03:57:13.520 going to be it for for the commment
03:57:14.960 functionality everything works as
03:57:16.960 expected we are able to even send the
03:57:19.520 notifications and let's actually make
03:57:21.960 sure that it is also working I'll just
03:57:24.159 log out from this account log in as the
03:57:27.199 other account and I'll just try to add a
03:57:30.239 comment okay like it doesn't click I
03:57:33.159 think I just I just need to press
03:57:35.080 command shift K to get rid of that
03:57:39.399 effect okay now I can click to it let's
03:57:42.439 open up our database take a look at the
03:57:45.640 notifications and add a comment so this
03:57:48.399 is not my post I should be able to get a
03:57:51.600 notification let's say oops what the
03:57:54.319 heck is
03:57:55.479 happening let's say you know A1 12 3 it
03:57:58.760 doesn't really matter let's post it here
03:58:01.120 we go we can see we just got a comment
03:58:03.720 type
03:58:04.720 notification and here is the receiver
03:58:07.040 here is the sender it works without any
03:58:12.520 issues okay so in the next section we're
03:58:14.960 going to add the add bookmark
03:58:17.640 functionality so for the bookmarks let's
03:58:20.319 go ahead and create a file under the
03:58:22.920 convex I'll just say bookmarks dots and
03:58:26.520 we would like to add our mutation as
03:58:28.479 well as the query so let's start with
03:58:30.720 the mutation this is going to be called
03:58:33.600 as a toggle bookmark because with this
03:58:36.399 single mutation we should be able to
03:58:38.880 both bookmark it and unbookmark it so
03:58:41.960 I'll go ahead paste this because this is
03:58:44.199 something that we have done multiple
03:58:45.560 times and I'll just walk you through it
03:58:47.920 let me import
03:58:49.439 everything okay so this is a mutation
03:58:52.080 where we take an object we'll have some
03:58:54.560 arguments so that we know which post
03:58:57.159 that we are trying to bookmark and then
03:58:59.640 we're going to get the currently
03:59:01.159 authenticated user and we would like to
03:59:04.199 just check if this is already bookmarked
03:59:07.000 or not we're going to query it right
03:59:09.920 with an index and then if it is already
03:59:13.159 existed we going to remove the bookmark
03:59:16.359 but else we're going to insert it and
03:59:19.040 here we'll return false or true to
03:59:21.720 indicate the newest state so this is the
03:59:26.040 mutation now let's go ahead and try to
03:59:28.760 get the bookmarks which is going to be a
03:59:31.319 query I'll just paste it and walk you
03:59:33.680 through
03:59:34.600 it okay so we got the currently
03:59:37.439 authenticated user and we get all the
03:59:40.080 bookmarks of this user but if you take a
03:59:42.960 look at it under under the bookmarks we
03:59:45.359 don't really have any information about
03:59:47.640 the post other than post ID and this is
03:59:50.720 not enough because let me show you the
03:59:53.920 image under the bookmarks page we would
03:59:57.680 like to see the post image right and for
04:00:00.680 that reason we're going to do the same
04:00:02.439 trick that we have done previously we're
04:00:04.760 going to get the resources with the
04:00:07.880 information so we'll just say promise.
04:00:10.279 all map thread for each bookmark get the
04:00:13.439 post and return this out of this query I
04:00:17.159 hope that makes sense these are the
04:00:18.920 things that we have done multiple times
04:00:20.960 so I just didn't want to type this out
04:00:23.239 line by line instead I have just
04:00:25.040 explained everything now with this in
04:00:27.319 mind let's go into the post
04:00:30.520 component and create a function called
04:00:33.880 handle bookmark just like above for the
04:00:37.279 like
04:00:38.479 function when we click to this icon
04:00:41.960 we're going to be calling this function
04:00:43.760 and and let's get our mutation we'll
04:00:45.840 just say toggle
04:00:48.159 bookmark use mutation under the
04:00:51.239 bookmarks if you wanted to you can put
04:00:53.560 it under the posts but I'll just go
04:00:55.680 ahead and add it under the
04:00:58.520 bookmarks so now here in this function
04:01:01.640 I'll just call my mutation let's say
04:01:04.399 await toggle bookmark and we're going to
04:01:07.560 put the post ID and this is going to
04:01:10.080 return the newest State and I will call
04:01:12.920 this as new is bookmarked and then we're
04:01:16.199 going to set our state with it which is
04:01:18.520 going to be set is bookmarked but seems
04:01:21.439 like we don't really have it I will
04:01:23.319 duplicate this let's say is
04:01:26.640 bookmarked and set is
04:01:29.560 bookmarked just like that this is going
04:01:31.600 to be post dot is
04:01:34.120 bookmarked okay hopefully we should be
04:01:36.279 able to say set is bookmarked with this
04:01:39.319 but now when do we call this
04:01:41.920 function well when we call C to this
04:01:44.960 icon called bookmark outline so here
04:01:47.840 I'll just say onpress call this function
04:01:50.359 and we we don't really want to see this
04:01:52.399 always we would like to check if it is
04:01:54.680 already bookmarked or not if so we're
04:01:57.359 going to see The Bookmark icon else
04:02:00.040 we're going to see this one okay let's
04:02:02.319 save take a look at the database let's
04:02:05.279 just put them side by side we don't have
04:02:07.880 any bookmarks at the moment if I click
04:02:10.159 to it here we go it has been added the
04:02:13.439 icon has changed and I can like
04:02:17.000 unbookmark it okay looks like everything
04:02:20.159 is working without any issues and next
04:02:22.520 we are going to add post deletion so if
04:02:25.199 we want to delete a post we should visit
04:02:27.439 the convex folder and try to add a
04:02:30.040 mutation and I will add it into this
04:02:32.680 file called posts. TS so I'll just say
04:02:36.359 export const delete post which is going
04:02:38.760 to be a mutation we' like to take some
04:02:41.359 arguments which is going to be the post
04:02:43.600 ID so that we know which post that we
04:02:46.239 are trying to delete and then in the
04:02:48.520 Handler function we would like to delete
04:02:50.800 it so first we're going to get the
04:02:53.000 currently authenticated user and then we
04:02:55.600 would like to check I mean we would like
04:02:57.960 to fetch the post that we are trying to
04:03:00.560 delete if it does not exist then we can
04:03:03.439 throw an error so I'll just save to get
04:03:05.760 this formatting and then before we try
04:03:08.239 to do anything I would like to just
04:03:10.319 verify ownership so I'll just check if
04:03:13.239 the current user is the owner of the
04:03:15.640 post if not we are going to throw an
04:03:18.159 error so I'll just say post. author is
04:03:20.960 not equal to the current user then
04:03:23.920 return and error but else we would like
04:03:26.439 to delete the post but immediately
04:03:29.439 deleting the post so instead of
04:03:31.199 immediately deleting it we would like to
04:03:33.359 do something else and let me tell you
04:03:36.159 what that is so we would like to delete
04:03:38.479 all the associated likes in this post
04:03:42.279 right so there might be 200 100 likes
04:03:44.880 which are documents that we are storing
04:03:47.199 so we would like to go ahead and delete
04:03:48.920 every single one of them then we would
04:03:51.080 like to delete all the comments as well
04:03:53.080 as the bookmarks so I'll just go ahead
04:03:55.920 add these so this is what I have just
04:03:58.720 added as well as he likes then we'll
04:04:01.319 like to do the same thing for the
04:04:04.880 bookmarks okay so this is what I have
04:04:07.199 just pasted this is really like almost
04:04:09.960 the same thing that's why I don't really
04:04:12.359 think that we should be explaining this
04:04:14.800 and once we have done all these we would
04:04:16.920 like to delete the image from our
04:04:19.199 storage so I'll go ahead add this line
04:04:21.920 and then finally we would like to delete
04:04:24.199 the post itself from the table right so
04:04:28.279 we have bunch of different information
04:04:30.040 about this post we would like to delete
04:04:32.239 it and here I'll go ahead paste this
04:04:34.840 line and I think I have mentioned this
04:04:37.279 previously that we need this storage ID
04:04:40.319 field on the post and I said we are
04:04:42.680 going to need it when we want want to
04:04:44.040 delete the post and here is that exact
04:04:46.479 moment here we just say context. storage
04:04:49.560 delete something and here is the thing
04:04:52.760 that you would like to delete then uh
04:04:55.199 we'll just delete the post itself and
04:04:57.479 finally we can decrement the users post
04:05:00.640 count by one which is going to be the
04:05:03.359 current user and here we'll just say
04:05:05.960 math. Max and if you are wondering why
04:05:08.600 this is the case basically this always
04:05:11.159 make sure that the number of posts at
04:05:14.120 minimum could be zero so imagine for
04:05:17.359 some reason this part equals to let's
04:05:20.760 say minus two this is going to get the
04:05:23.359 maximum value out of these which is
04:05:25.600 going to be zero so the posts will
04:05:27.960 always be zero at minimum I hope that
04:05:31.120 makes sense so with this everything
04:05:33.439 should be good to go I'll just add one
04:05:35.359 more comment here called delete the post
04:05:38.880 now this function could be definitely
04:05:41.040 written in a better way this is the the
04:05:43.880 simplest way that we can do and it
04:05:46.319 doesn't really look that bad you can
04:05:48.640 obviously optimize it but here is what
04:05:51.600 we have we are just checking for the
04:05:54.000 ownership deleting all the likes
04:05:56.439 comments and bookmarks that are
04:05:58.439 associated with this post then we are
04:06:00.680 deleting the file from the storage
04:06:02.840 deleting the post from the table and
04:06:05.279 finally updating the users post count
04:06:09.720 now that we have everything ready we can
04:06:11.880 go ahead and actually call this when we
04:06:15.000 click to this button and just before we
04:06:17.479 make this work we are going to need one
04:06:19.359 more query that is related to users so
04:06:22.800 let's just type this out and then I'll
04:06:24.479 explain what this does so let's say
04:06:26.920 export const get user by clerk ID which
04:06:34.159 is going to be a query and our argument
04:06:36.960 as you can tell will be the clerk ID so
04:06:39.560 let's say ARS passes clerk ID which is
04:06:42.640 going to be type of string let's import
04:06:44.920 the query and we'll just say have a
04:06:47.680 Handler function which will take the
04:06:50.800 context as well as the arcs so we are
04:06:53.720 going to pass the clerk ID of a user and
04:06:56.840 it'll give us the user that is stored in
04:07:00.040 the database so let me explain this
04:07:02.399 might sound complicated but it's
04:07:04.080 actually pretty simple so we have two
04:07:07.040 different users right we would like to
04:07:09.960 let's say get this user we are going to
04:07:12.720 pass the clerk ID of that user and it
04:07:15.199 will give us everything about this user
04:07:17.880 such as this complete document and let's
04:07:20.520 try to see how we can make it so I'll
04:07:23.040 just say const user I'll say a wait
04:07:27.119 context. DB do get or query I think
04:07:32.000 because we're going to query the users
04:07:34.239 table and we would like to query this
04:07:36.680 with an index which is called as by
04:07:39.319 clerk ID this is something that we have
04:07:41.760 created in the schema file right this is
04:07:45.319 exactly what we have done and we would
04:07:47.680 like to get the unique value you can
04:07:51.040 also say first let's use unique this
04:07:54.040 time then we're going to return this
04:07:57.680 user okay now you might be asking why do
04:08:01.000 we need this function how can we use
04:08:03.439 this so let's just see we're going to go
04:08:06.439 into the post component and there is a
04:08:09.840 hook that is coming from Expo or clor I
04:08:13.680 should say let's say use
04:08:16.680 user and let's say const now this gives
04:08:20.399 you a user State let's console lock this
04:08:23.680 say user is here and put the user open
04:08:28.279 up the terminal so here we can see this
04:08:30.640 is the user
04:08:32.080 object I know this looks really weird
04:08:35.000 but user is here there is a lot of
04:08:37.479 different fields we would like to get
04:08:40.040 the ID in that user so that we can call
04:08:43.600 our query to get the convex equivalent
04:08:47.319 of it so let's try to see I'll save and
04:08:51.800 then just try to call my query so I'll
04:08:54.680 say use Query and I'll say you would
04:08:58.880 like to get the api. users. getet user
04:09:02.760 by clerk ID and this wants us to pass an
04:09:06.119 argument which will be the clerk ID and
04:09:08.800 this will be user. ID so we don't really
04:09:12.119 need this one now here you can see the
04:09:14.680 user could be null right what we'll like
04:09:17.840 to do we'll just say let's delete this
04:09:20.399 for a second or I
04:09:22.479 think here I'll just say if we have a
04:09:25.319 user then pass this but else just skip
04:09:29.439 this call until we got the user now we
04:09:32.159 don't really have any errors it is
04:09:35.159 working
04:09:36.479 correctly and this is going to be equal
04:09:38.760 to let's say cost you can call this
04:09:40.880 anything I'll call this as convex user
04:09:43.880 or specifically we can just say current
04:09:46.720 user so this and this is the exact same
04:09:50.720 user but this is the user that is stored
04:09:53.600 in Clerk and this is the user that is
04:09:55.560 stored that is stored in database and
04:09:58.560 this has different fields than this one
04:10:00.720 right such as number of followers
04:10:02.920 following so on and so forth clerk
04:10:05.199 doesn't really store those for
04:10:07.560 us I hope this makes sense this is the
04:10:10.359 best way that I can explain then we'll
04:10:13.040 like to use this field and check if we
04:10:16.760 are the author of the post if not we
04:10:20.000 will not be able to delete it but if we
04:10:22.359 are the owner we can delete that so here
04:10:25.520 if you realize we have a to-do where we
04:10:28.560 would like to fix it now all right so
04:10:32.840 let's go ahead delete that and uncomment
04:10:36.119 this this is the three dots icon that
04:10:40.000 look like this but we would like to show
04:10:42.520 one of these at a time so here I'll just
04:10:45.600 add a
04:10:47.040 comment let's say or actually actually
04:10:51.279 I'll get it from my comments if I am the
04:10:54.000 owner of the post show the delete button
04:10:57.319 and I would like to grab this and I'll
04:10:59.760 just walk you through
04:11:02.239 it so we will say current
04:11:05.680 user let's add a question
04:11:09.479 mark all right so we just say if post
04:11:12.680 author is equal to me right if it is me
04:11:16.920 if it is my post then I would like to
04:11:18.880 show this trash outline icon but else I
04:11:22.239 will show this three dots and currently
04:11:25.920 as you can tell it already worked this
04:11:28.159 is the this is a different account now
04:11:30.960 I'll try to log in with this account
04:11:33.279 let's go back or I should log
04:11:38.560 out and I will log in as the post owner
04:11:42.640 we should be able able to see the trash
04:11:44.800 outline there we go it just updated and
04:11:48.040 we should be able to delete that so here
04:11:50.760 I'll just say onclick or on press we're
04:11:54.680 going to call a function called handle
04:11:58.199 delete let's say yeah handle delete I
04:12:00.840 was going to say handle delete post but
04:12:03.399 this should be good to
04:12:05.520 go and let's create our function let's
04:12:08.640 say handle delete and here in this
04:12:11.840 function we're going to call our
04:12:15.199 mutation let's grab that I'll
04:12:19.279 say delete
04:12:21.920 post it is going to be coming from the
04:12:24.479 posts
04:12:27.199 file and we should be able to call it in
04:12:29.840 this async
04:12:31.359 function now we could have TR catch I'll
04:12:34.040 just accept what AI gives me we are
04:12:36.640 going to call our mutation with the
04:12:38.840 argument let's save and I'll just press
04:12:42.199 this it's been deleted here we go and it
04:12:45.840 says no posts yet let's take a look at
04:12:48.479 the
04:12:50.399 database zero posts and this user should
04:12:53.640 have zero posts it's been updated and
04:12:57.880 that means everything is working as
04:13:00.040 expected now we don't really have any
04:13:02.040 posts just to have something on the
04:13:04.760 application let's go ahead and create
04:13:06.720 some I'll just say choose and let's say
04:13:10.479 ABC or I'll just you know just add
04:13:14.800 anything this should be posted let's add
04:13:18.040 one
04:13:18.760 more okay so one challenge for you when
04:13:21.840 we add a post we take the user to the
04:13:24.279 homepage but we don't really clear the
04:13:26.880 state so you can uh do this let's go
04:13:29.800 ahead maybe I can do it as
04:13:32.880 well once we share this before we take
04:13:36.600 it to here we can just say set and let
04:13:39.880 AI to complete
04:13:41.560 it okay I can add these this is how we
04:13:45.520 can make that work now let's just test
04:13:47.520 this out once again I will add an image
04:13:50.239 let's say choose let's say hey this
04:13:55.800 is
04:13:58.119 my weekend
04:14:02.159 trip let's say this was and let's
04:14:08.199 share now if we go back our state should
04:14:11.319 be updated and here we go we can like
04:14:15.080 add a comment
04:14:16.720 bookmarket let's just
04:14:18.760 say
04:14:20.140 [Music]
04:14:24.080 nice okay everything works as expected
04:14:27.680 and next we can move on with the
04:14:29.560 bookmarks page well just one more thing
04:14:32.800 before we move on to the next section I
04:14:35.000 just realized I didn't show you the file
04:14:37.279 storage so what happens if we try to
04:14:39.720 delete a post we didn't really make sure
04:14:42.359 that if it is has been deleted from the
04:14:44.239 storage I'll go ahead and delete this
04:14:46.359 one now it has gone from here as well so
04:14:49.359 you can just make sure that it is
04:14:51.840 working without any issues so now it is
04:14:54.439 actual time to go ahead and build the
04:14:56.600 bookmarks page so to be able to build
04:14:59.520 the bookmarks page first we just need to
04:15:01.960 visit that file and let's try to make
04:15:05.199 this to be capitalized so that we are
04:15:07.399 consistent in our code base and then we
04:15:09.920 need to call a query which is the one
04:15:12.520 that we have already built under the
04:15:14.520 convex folder and this is our query
04:15:18.439 which we call this as get bookmark posts
04:15:21.680 so this is going to give us all the
04:15:23.199 bookmarks of the current user and we
04:15:25.840 would like to take it and consume it in
04:15:28.439 this file so since we learn since we
04:15:31.439 already learned how to use a query I'll
04:15:34.040 just paste this in so we would call the
04:15:36.239 use Query get the API and get the
04:15:39.199 related query and if this is in the
04:15:42.439 undefined
04:15:43.439 state that means we are in the loading
04:15:45.880 state so this is how that work in convex
04:15:49.479 and let's get this loader component that
04:15:51.680 we have built previously and then we can
04:15:54.840 also get a not found state so we'll just
04:15:58.279 say if the length is equal to zero we
04:16:00.800 would like to show this simple component
04:16:03.880 that I'll just provide so this is a
04:16:06.439 simple function here we have some Styles
04:16:09.840 and it just basically says no posts yet
04:16:13.199 or no bookmarks yet now let's save and
04:16:17.520 take a look at it I think we have a
04:16:19.720 bookmark yep that's why we see this
04:16:22.439 return statement if I unbookmark
04:16:25.399 it so I don't know why this did not
04:16:28.000 update it let me just reload our
04:16:31.080 application let's go here all right no
04:16:34.159 bookmarked post yet let's add this now
04:16:38.000 we can see our bookmarks and let's try
04:16:40.760 to build this now well I just want to
04:16:43.760 speed up the process a bit so that's why
04:16:46.359 I'll just
04:16:47.399 delete this
04:16:49.359 completely and give you some you know
04:16:52.560 code so I'll just say wi which we have
04:16:55.840 the style and this is coming from feed.
04:16:58.239 Styles and this is using the container
04:17:01.159 class and then we'll like to have the
04:17:03.239 header at the top so let's paste this
04:17:05.840 save and this is what we're going to see
04:17:08.040 and then below that we would like to
04:17:10.159 render the posts and for this I'll be
04:17:13.080 using a scroll view so I think we'll
04:17:15.800 just have less bookmarks so it could be
04:17:18.439 a good option to use scroll view but if
04:17:21.439 you wanted to you could use flatlist as
04:17:24.040 well so here I'll just get my code from
04:17:28.040 my notes instead of typing this out I
04:17:30.960 can walk you through it so this is a
04:17:33.000 scroll view component with these Styles
04:17:36.520 and for the content we'll just say
04:17:40.159 bookmark Post St map
04:17:44.359 get every single post and you can just
04:17:47.080 say for now let's just say we're going
04:17:49.640 to have a view
04:17:51.920 component and if you try to say you know
04:17:54.479 post uh I don't know like caption you're
04:17:58.159 going to see that this will complain for
04:18:01.399 a second if you don't add this question
04:18:03.560 mark now it it's because it thinks that
04:18:06.840 this could be null and just to get rid
04:18:08.960 of this error you can either add a
04:18:11.199 question mark or maybe a bit better
04:18:14.119 option would be to make this a function
04:18:17.720 and add a if check so here I'll
04:18:20.439 basically say if there is no post just
04:18:24.239 return null but post is not equal to
04:18:27.760 null then we can just return a view with
04:18:30.640 the image let's get this import the
04:18:34.159 image from Expo image because we are
04:18:36.399 trying to cach it and this cach policy
04:18:39.680 has a bunch of different options this is
04:18:41.840 the one that makes in this use case but
04:18:44.840 you can take a look at the other options
04:18:47.520 here we can see we have like four in
04:18:50.840 total okay let's save here we go this is
04:18:53.720 the post that we have let's try to un
04:18:56.840 bookmarket it's been updated let's try
04:18:59.560 to add it once
04:19:00.880 again you know it just works without any
04:19:04.399 issues okay so that's going to bit for
04:19:06.880 this screen as well next we can move on
04:19:10.560 with the notifications
04:19:13.119 which looks like this at the moment all
04:19:15.760 right so to start with notification
04:19:17.720 screen let's go ahead and find the
04:19:20.279 actual file which is going to be this
04:19:22.880 but before we try to build the UI let's
04:19:25.239 try to build the query that is going to
04:19:27.840 give us all the notifications that we
04:19:30.319 have for our account and for this we
04:19:33.199 would like to create a convex function
04:19:36.080 which is going to be a query you can put
04:19:38.239 it in any of these files but I believe
04:19:40.920 it would be better if we go ahead and
04:19:42.720 and create a file called notifications.
04:19:45.640 yes let's shink the left hand side and
04:19:48.199 say export const uh let's say get
04:19:52.600 notifications okay that's going to be a
04:19:54.520 query you can pause the video and try to
04:19:57.319 do it if you really wanted to but uh
04:20:00.560 like let me just go ahead and build it
04:20:02.840 so since we would like to get every
04:20:04.439 single notification for the current user
04:20:07.399 we don't really need to pass any arcs so
04:20:10.000 we'll just say Handler where will just
04:20:11.960 take the context
04:20:13.319 and we would like to build the logic so
04:20:16.199 first things first as always we would
04:20:18.119 like to get the authenticated user and
04:20:21.040 then we'll just get the notifications so
04:20:23.720 let's say const notifications and let's
04:20:26.520 await this call context. db. query where
04:20:30.600 we would like to go under the
04:20:31.920 notifications table and let's try to
04:20:34.479 query it query it with a index so I'll
04:20:38.000 just say with index and for this we'll
04:20:40.279 just say buy receiver and and we'll just
04:20:43.399 say if we are the receiver give us all
04:20:46.199 the notifications and this is how we can
04:20:48.720 do the current user ID if it is matching
04:20:51.680 with the receiver ID you should just go
04:20:54.199 ahead and collect all the notifications
04:20:57.479 and I would like to sort this before so
04:20:59.760 I'll just say order should be in the
04:21:02.199 descending order so we would see the
04:21:04.760 latest one at the top and the oldest one
04:21:07.520 at the bottom here we can see it says 2
04:21:10.119 days ago and this is like 8 hours ago it
04:21:12.800 is sorted in this
04:21:16.119 order okay now if you
04:21:20.159 think we say like return notifications
04:21:23.600 this function is done you would be wrong
04:21:26.479 right because if you think about it once
04:21:29.000 again under the notifications we don't
04:21:31.479 really have any information about the
04:21:33.720 post the only thing we have is the post
04:21:36.159 ID in the same way we don't really have
04:21:38.600 any information about the sender other
04:21:41.239 than their IDs but we would like to get
04:21:44.000 more info about them and let me show you
04:21:46.680 what I mean so this is the notification
04:21:49.119 sender right we'll like to get their
04:21:51.319 profile image as well as their username
04:21:54.439 and in the same way we'll like to get
04:21:56.359 information about the post okay so I
04:21:59.800 hope that makes sense this is something
04:22:01.520 that we have done actually in the past
04:22:03.840 where we where we would just say
04:22:06.159 notifications with info right we have
04:22:09.399 done this in our other queries so in the
04:22:12.359 same same manner I'll go ahead and
04:22:14.199 create
04:22:16.080 this uh variable then we're going to say
04:22:19.359 promise. all and we'll just say
04:22:22.600 notifications. map for each notification
04:22:25.600 we would like to run this call back
04:22:28.080 function right and we'll just say const
04:22:31.199 let's first get the sender of the
04:22:33.479 notification and this is how we can do
04:22:35.479 it this is going to give us the sender
04:22:38.080 and then I'll just say let post will be
04:22:41.359 equal to null
04:22:43.359 and let's duplicate this this will be
04:22:47.800 comment now you might be asking why are
04:22:50.479 we doing this I think we'll just see
04:22:52.359 this in a second let's say if our
04:22:55.239 notification has a post ID that means
04:22:58.720 this is related to a post and we are
04:23:01.439 going to go ahead fetch that post we'll
04:23:03.920 say post will be a wait context db.
04:23:07.319 getet this specific post and let's say
04:23:10.479 if notification is
04:23:13.479 D type is equal to comment and if it has
04:23:17.640 a comment ID we would like to go ahead
04:23:20.080 and get the comment itself so that we
04:23:23.040 can display it right here
04:23:25.800 right okay so I hope that makes sense
04:23:28.720 now if you don't really add this part
04:23:30.640 typescript will be unhappy with you so
04:23:33.760 that's why we are adding it and then
04:23:35.920 after this if check we can go ahead and
04:23:38.359 return an object so I'll just say get
04:23:41.080 everything about the not notification
04:23:43.479 but on top of it we'll like to add the
04:23:46.040 sender information so we'll just say
04:23:49.040 let's give the ID we'll like to give the
04:23:51.920 username as well as the image so here it
04:23:55.319 says sender could be null but we just
04:23:57.840 know that if there is a notification we
04:24:00.840 we will always have a sender right so I
04:24:03.319 can go ahead wrap this with brackets and
04:24:06.720 just say exclamation point this will
04:24:09.880 never be null
04:24:12.720 okay finally we would like to say like
04:24:16.040 return the post as well as the comment
04:24:18.880 for the comment I'll just say get the
04:24:21.560 content okay just like that this should
04:24:23.760 be good to go and at the end of the day
04:24:26.199 we will return the notifications with
04:24:29.600 info okay let me just make this entire
04:24:32.000 screen zoom out so that you can see it
04:24:34.399 clearly so this is our entire query and
04:24:38.159 I hope this makes sense like we cannot
04:24:41.159 just return the notific ations as it is
04:24:44.199 we would like to get it with the info so
04:24:47.040 that we can grab the post comment and
04:24:49.880 the sender
04:24:51.840 information okay I hope that makes sense
04:24:54.119 let's zoom
04:24:55.119 in I will shrink
04:25:00.880 this okay now this is the query that we
04:25:03.800 have just built now let's go into the
04:25:05.880 notifications under the tabs and try to
04:25:09.000 build the UI before we get into it let's
04:25:12.080 say we would like to use a
04:25:15.520 query just like this we would like to go
04:25:18.439 under the notifications file and get our
04:25:21.279 notifications this is the query and
04:25:23.880 while we are in the loading State we can
04:25:26.439 show a loader and once again this is how
04:25:30.479 it works in convex if a query value is
04:25:33.800 equal to undefined that means you're in
04:25:36.359 the loading State and let's say if we
04:25:39.119 don't have any notifications we'll like
04:25:41.439 to return this component which is
04:25:43.640 something that I will provide it's about
04:25:46.399 five lines of code just like this let's
04:25:49.399 get these Styles but this like these
04:25:52.880 styles are going to be coming a okay
04:25:55.680 they're going to be coming from a file
04:25:57.359 that we would like to create so I'll
04:25:59.040 just say
04:26:01.239 notifications.
04:26:02.920 styles. TS and you can grab this from
04:26:06.319 the source code and if you don't have
04:26:08.080 the source code you can just you know
04:26:10.439 take a screenshot
04:26:12.560 and type this out I'll just show you the
04:26:14.720 entire
04:26:21.560 file okay so these are just some styling
04:26:25.640 let's get these
04:26:27.080 Styles get the ion icons as well as the
04:26:31.960 colors okay so currently I think we have
04:26:34.920 some notifications that's why we cannot
04:26:37.560 see this UI let me just press R so that
04:26:40.880 it is been Reloaded
04:26:43.000 and let's go into the notifications page
04:26:45.359 okay so looks like we got some
04:26:47.199 notifications but let's just say if this
04:26:49.520 is the true case this is what we're
04:26:51.760 going to see and please feel free to
04:26:53.840 update this UI this is not looking that
04:26:56.279 good but it's just good enough for a
04:26:59.239 placeholder okay let's save um shink the
04:27:03.840 terminal shink this one I would like to
04:27:06.439 go ahead and just update this return
04:27:08.760 statement so I will have my view let's
04:27:11.479 say Style will be styles. container just
04:27:15.080 like as always then we'll like to have
04:27:17.720 our header component so I'll just say
04:27:20.319 styles that header and here this is our
04:27:22.920 title where we say notifications then we
04:27:25.720 would like to have a flat list you can
04:27:28.279 also use a scroll view component but for
04:27:31.560 in my case I'll be using a flat
04:27:35.359 list okay say flat list imported self
04:27:40.119 closed and the data that we'll like to
04:27:43.199 map through will be notifications for
04:27:46.000 every single item we would like to
04:27:48.080 render this function let's say we're
04:27:51.680 going to get the item we are going to
04:27:54.279 create a component called
04:27:57.159 notification
04:27:59.319 item and we're going to pass the
04:28:02.319 notification as the prop which will be
04:28:05.199 the item then let me just grab the key
04:28:09.399 extractor so this is the key when we use
04:28:12.680 in react in react native it is equal to
04:28:15.920 key extractor I don't want to show the
04:28:19.520 vertical uh scroll indicator so I'll
04:28:22.000 just say false and finally let's give
04:28:24.399 some Styles now if you save obviously it
04:28:27.319 will crash so let's go ahead and create
04:28:29.800 this
04:28:31.530 [Music]
04:28:33.239 component so notification item this is
04:28:36.119 going to
04:28:37.239 take a prop let's say it will be the
04:28:41.479 notification
04:28:42.840 just like what we have here for now
04:28:44.840 let's just say type will be any later in
04:28:46.720 the video we can fix it and let's say we
04:28:49.080 would like to return this statement and
04:28:52.399 this will be only UI specific so I'll
04:28:55.800 just have a
04:28:57.650 [Music]
04:29:01.359 view okay let's go ahead and add some
04:29:05.920 Styles so the first style that we would
04:29:08.239 like to have will be notification item
04:29:10.880 then we are going to have a another
04:29:13.760 component called VI and this time I'll
04:29:16.840 again get the styling just like this so
04:29:19.760 I don't really want to type this out
04:29:21.520 just to save a bit of time there is no
04:29:23.720 logic at all and let me tell you what
04:29:26.199 we're going to do so here I would like
04:29:28.760 to wrap this component with a link so
04:29:32.080 that when we click to it this would take
04:29:34.040 us to the profile of this user
04:29:37.760 and let's try to build it I would like
04:29:40.680 to copy this link I think it is around
04:29:44.000 10 lines of code and I will walk you
04:29:46.199 through it so we have a link that is
04:29:48.520 coming from Expo currently we don't have
04:29:51.239 the user profile so I'll just take them
04:29:53.359 to the notifications later in the video
04:29:56.000 we are going to fix it so I'll just say
04:29:57.880 too fix later and we will have touchable
04:30:02.040 opacity we're going to have an image
04:30:04.279 from Expo image and we're going to pass
04:30:07.560 the source style content fit and then we
04:30:11.080 are going to have this View and like
04:30:13.520 this is the kind of like it looks a
04:30:16.359 little bit complicated but it's
04:30:17.800 basically if and lse statements couple
04:30:20.319 of times so we say if notification type
04:30:23.159 is equal to like then show a hard icon
04:30:26.319 but in the else case check if the
04:30:28.520 notification type is equal to follow if
04:30:31.319 so show this icon but else go ahead and
04:30:34.600 show this one so depending on that we
04:30:36.960 are going to see either this one or this
04:30:41.000 and this one
04:30:43.880 so this is what we have just done let's
04:30:46.279 save go into this page here we go we
04:30:49.520 have two different notifications one is
04:30:52.239 like the other one a
04:30:54.760 comment okay after this view we would
04:30:58.399 like to and actually after this link We
04:31:01.439 would like to add one more view so I'll
04:31:04.399 just say View and turn this
04:31:08.399 off and this is going to be actually
04:31:10.960 notification in info class so I would
04:31:13.880 like to go ahead and get one more link
04:31:17.359 so please feel free to type this out or
04:31:19.880 grab it from the source code if you
04:31:21.560 don't really want to again we are going
04:31:23.800 to fix this for now let's say it'll take
04:31:26.159 us to the notifications because we don't
04:31:28.800 really have the users page so let's say
04:31:31.199 too fix later and let's save this is
04:31:34.040 going to give us the username then after
04:31:37.040 this link We would like to have this
04:31:39.680 text so it'll say either they have
04:31:42.720 commented or they like your post or like
04:31:46.560 started following you and we are going
04:31:48.880 to put these dynamically once again
04:31:52.239 depending on the notification type so I
04:31:55.119 would like to go below this link have a
04:31:58.800 text
04:32:00.840 component just like this and I will give
04:32:03.560 a style called
04:32:05.560 action and then we're going to do this
04:32:08.520 conditional rendering so here I'll just
04:32:11.119 say if not ification type is equal to
04:32:13.119 follow show this one if it is equal to
04:32:15.399 like show this one else show the comment
04:32:18.880 itself let's save and take a look at it
04:32:22.720 so this one has commented as undefined
04:32:25.920 looks like we got something
04:32:28.960 wrong um we're going to fix it okay so
04:32:31.960 this shouldn't really say undefined but
04:32:34.960 seems like the rest is working and after
04:32:38.359 this text I would like to put one more
04:32:40.640 text just to show show like when this
04:32:43.439 has been posted and it will just say get
04:32:46.000 this function from dat FNS and this will
04:32:49.319 take the creation
04:32:51.479 time now it is working it says about 5
04:32:54.600 hours ago or one day ago and after this
04:32:58.479 step I mean after this View and after
04:33:00.880 this view just before the very last one
04:33:04.400 you would like to show the image and we
04:33:07.599 only want to show this if it is related
04:33:10.118 to a post so let just do contrl Z so
04:33:14.160 this notification is related to a post
04:33:16.879 so we just show that in the same way we
04:33:20.080 show the post but this has nothing to do
04:33:22.599 with a post and we don't really show
04:33:25.118 anything so for that reason we need to
04:33:27.438 do conditional check so I will just say
04:33:31.240 after this view if
04:33:33.400 notification has a post ID or if it is
04:33:37.958 like if notification. post is true then
04:33:41.359 we will like to go ahead render this
04:33:43.958 part and let me grab this which is an
04:33:46.919 image
04:33:49.278 component okay so notification. post
04:33:52.320 image URL will will be the source
04:33:55.480 otherwise we are not going to show
04:33:57.599 anything but seem seems like this
04:34:00.278 crashed let's go ahead and rerun
04:34:08.840 this okay so for some reason we cannot
04:34:12.118 get the image let me console log this
04:34:16.561 what is wrong with this say
04:34:19.080 console.log the
04:34:26.759 notification okay so we got the
04:34:28.719 notification we have ID field creation
04:34:32.000 time okay so post is null for some
04:34:36.561 reason so why is this the case maybe it
04:34:40.240 is because we have posted something and
04:34:43.278 we have deleted that but when we delete
04:34:45.879 the post we didn't delete the
04:34:48.080 notifications so I think this is what
04:34:50.520 happened let me just double check if we
04:34:53.199 go into the posts
04:34:56.080 file when we try to delete a post we
04:35:00.719 have deleted the likes comments
04:35:04.199 bookmarks but we forgot to delete the
04:35:07.080 notifications right okay so I have just
04:35:09.879 realized this I can leave this as a
04:35:12.000 to-do for you let's say to-do delete
04:35:14.958 Associated notifications and you can
04:35:17.639 pause the video try to do it and then
04:35:20.278 watch my solution all right so I have
04:35:22.719 just paused the video and implemented
04:35:25.080 let me show you my solution so first I
04:35:27.480 have visited the schema. TS file and
04:35:30.599 added an index called by post and just
04:35:33.958 make sure you added this index to the
04:35:36.639 notifications table so once you have
04:35:38.879 added this part we going to come back to
04:35:41.438 here here and we will just fetch all the
04:35:44.000 notifications by this post just like
04:35:46.799 what we have done above right then we're
04:35:49.278 going to just do a for Loop to delete
04:35:52.199 every single notification and now then
04:35:55.118 now that this is not a to do we can
04:35:56.759 delete this and we can just move on with
04:35:59.359 the video but since these are the
04:36:01.919 previous notifications we cannot delete
04:36:04.118 them this will work from the next like
04:36:07.359 future post deletions but we can
04:36:10.840 manually can go into the database and
04:36:14.240 try to just delete all the
04:36:17.359 notifications okay let's say delete all
04:36:19.639 of them and we are going to test
04:36:22.561 everything from scratch so here I would
04:36:25.359 like to just create one more post let's
04:36:31.680 say some nice
04:36:34.630 [Music]
04:36:39.438 pick okay so from this account we have
04:36:42.480 two different posts let's go ahead log
04:36:45.400 out and log in with the other account
04:36:48.840 then we will try to create some
04:36:51.480 notifications so we are just doing this
04:36:53.719 for the testing purposes to see if
04:36:56.160 everything is working okay so I'm just
04:36:58.599 logged in with a different account I
04:37:00.520 will like this post and I will add a
04:37:03.759 comment let's
04:37:05.080 say dude this is
04:37:08.700 [Music]
04:37:10.320 sick okay okay we have added this let's
04:37:13.958 like this one as well and add one more
04:37:17.799 comment let's say hoay like
04:37:23.320 this now let's try to go back to the
04:37:26.080 other
04:37:26.958 account now let me just try to log
04:37:33.879 out and we're going to check the
04:37:38.480 notifications so here we go we got one
04:37:41.520 un like from this user on this post we
04:37:44.160 got a comment it says dude this is sick
04:37:47.438 the same thing for this comment so it
04:37:49.599 seems like everything is working we
04:37:52.118 cannot really see the follow
04:37:54.438 notification at the moment because we
04:37:56.520 don't really have that functionality
04:37:59.080 implemented but once we done this we are
04:38:02.799 going to test this out again okay so for
04:38:05.799 this section just keep that in mind we
04:38:07.958 have added this index to the
04:38:09.799 notifications table we went ahead and
04:38:12.799 added this part so that if we delete a
04:38:15.799 post all the notifications that are
04:38:18.199 related to that post will be
04:38:20.958 deleted and then we have basically
04:38:23.520 implemented this entire
04:38:25.799 file now what I'd like to do instead of
04:38:28.958 putting this into this file I will just
04:38:32.520 actually cut
04:38:34.199 it and put it under my components and
04:38:38.039 instead of calling this as notification
04:38:40.039 item I'll just say
04:38:42.639 notification. TSX let's say just paste
04:38:46.561 this
04:38:47.561 in and we need to get all the Imports so
04:38:51.520 here's what I generally do instead of
04:38:53.599 importing them one by one I just go
04:38:55.799 ahead import everything and then I press
04:38:58.160 command shift p and I and I say organize
04:39:01.118 Imports so what that does it just gets
04:39:04.039 rid of all the Imports that we are not
04:39:06.199 using so there we go this is just a cool
04:39:10.240 trick that you can keep in mind and
04:39:12.400 let's just say export default this
04:39:16.340 [Music]
04:39:17.958 function all right let's save go back
04:39:21.199 and try to import this and I would like
04:39:23.520 to call this as notification instead of
04:39:25.879 notification
04:39:27.160 [Music]
04:39:28.599 item save this file go back
04:39:31.879 and get this one okay now this file
04:39:35.080 looks a lot more cleaner if you really
04:39:37.320 want to you can take this and put it
04:39:39.200 into its own component and its own file
04:39:42.680 but I think this is like five lines of
04:39:44.958 code I think that's completely fine and
04:39:47.120 once again I'll just say command shift p
04:39:49.360 organize the
04:39:50.440 Imports here we go I don't know why we
04:39:53.680 get an error for a split second but
04:39:56.600 seems like everything is working as
04:39:58.638 expected now at this point if you really
04:40:01.160 want to add the notification type you
04:40:03.480 can pause the video and try to do it
04:40:05.920 that would be a great challenge because
04:40:07.760 we have done this multiple times and you
04:40:09.840 can just test out your for knowledge if
04:40:12.440 you cannot do it feel free to ask it in
04:40:14.600 the comments and we can answer that so I
04:40:17.000 will delete this console log let's save
04:40:19.760 it and just before we end the section I
04:40:22.718 would like
04:40:23.680 to fix something else and why are we
04:40:26.718 getting this here it says require not no
04:40:31.000 module okay so actually this is existed
04:40:34.878 but you may also want to run mpm install
04:40:37.958 so I'll just go ahead say mpm install
04:40:40.080 once again
04:40:43.680 and run our
04:40:45.360 application and reload it with
04:40:49.320 r let's say dism preload this once again
04:40:53.878 we should be good to go okay so I was
04:40:56.638 going to say there is one more thing
04:40:58.400 that I would like to fix I think it is
04:41:00.920 in the post comment I mean post
04:41:04.080 component let's find it post.
04:41:09.480 DSX so at the very bottom no it's not
04:41:12.878 here so there was a component that I'd
04:41:15.638 like
04:41:16.400 to take let me just see I think it is
04:41:19.840 under the homepage okay so instead of
04:41:22.600 having this right here I would like to
04:41:25.000 take this and put it into its own
04:41:27.798 component I mean into its own file so
04:41:30.400 I'll just say stories.
04:41:33.560 TSX grab this completely paste this in
04:41:37.958 and I'll just say export const and and
04:41:41.320 maybe let's just do export
04:41:43.320 default let's just be consistent let's
04:41:46.560 get this scroll view get these Styles I
04:41:49.360 think it is feed let's get the stories
04:41:51.920 and the story
04:41:53.400 component now we'll go ahead and try to
04:41:55.798 import it let's save you can do the same
04:41:58.718 thing for this one but I'll just leave
04:42:00.560 it as it is okay so with that that's
04:42:03.360 going to be it for this section as well
04:42:06.000 let's clear the Imports let's say
04:42:07.798 command shift p organize Imports and
04:42:10.560 let's save it
04:42:11.760 so I'll see you in the next section now
04:42:13.760 it is time to build the profile screen
04:42:16.480 which is going to look like this so we
04:42:18.878 will have the user information at the
04:42:21.520 top with the stats then we will be able
04:42:24.280 to edit our profile when we click to
04:42:26.840 this button this model will show up and
04:42:30.160 we should be able to save the changes we
04:42:32.600 are going to display the posts and then
04:42:35.200 when we click to a post it will open up
04:42:37.718 in a model just like this so with
04:42:40.320 everything that you have learned so far
04:42:42.440 you can build all these functionalities
04:42:44.840 by yourself just keep that in mind and
04:42:47.560 now just for the sake of tutorial let me
04:42:49.840 go ahead and show you every single step
04:42:52.520 so first things first before we try to
04:42:54.958 build the UI once again we would like to
04:42:57.718 add our functions so I will go under the
04:43:00.560 posts and we would like to add a query
04:43:04.200 let's shrink this mutation and at this
04:43:07.160 point I will just go ahead paste this in
04:43:10.798 let me is Shing the left hand side so
04:43:13.160 this is a query where we would like to
04:43:15.080 get posts by a user and this user ID
04:43:18.600 will be optional because if we are
04:43:20.920 looking our own profile we don't really
04:43:23.080 need to pass a user ID right we would
04:43:25.798 like to get our own posts so here we'll
04:43:28.958 just say if user already existed then go
04:43:31.840 ahead find that profile but if it is not
04:43:34.440 existed then this user will be the
04:43:37.080 currently authenticated user and just
04:43:39.878 add an if check in case user not found
04:43:43.320 then we're going to go ahead get the
04:43:44.958 posts for this current user and then we
04:43:48.040 will return the posts out of this query
04:43:50.878 now if you're asking why is this
04:43:52.920 optional once again because in our
04:43:56.680 profile in our profile page we don't
04:43:59.120 really need to add a user ID but if we
04:44:02.000 are looking to other user profiles such
04:44:04.680 as this one then we need to add a user
04:44:07.240 ID so that we can get that profile I
04:44:09.718 hope that makes sense let's go back this
04:44:12.280 is the function let's save the other
04:44:14.920 function that we would like to add will
04:44:16.760 be related to users so let's open this
04:44:20.480 up and this will be a mutation once
04:44:23.680 again I would like to copy and paste
04:44:26.000 because at this point we know everything
04:44:27.840 about convex the only thing we need to
04:44:30.520 do is just type this out pretty quickly
04:44:33.958 so we are going to get two different
04:44:35.840 arguments I don't know why I tried to
04:44:37.798 delete them but here we go we are going
04:44:40.520 to get the full name to be able to
04:44:42.360 update it as well as the bio then we'll
04:44:45.280 have a Handler function which will get
04:44:47.600 the current user and it we will try to
04:44:51.120 update these
04:44:53.400 fields okay so that was the mutation
04:44:56.000 that we would
04:44:57.200 need now we can go into the app tabs and
04:45:01.560 find the profile page or the profile
04:45:04.320 screen I should say now let's try to
04:45:06.638 build it so in this page we are going to
04:45:09.160 have this icon or this touchable opacity
04:45:12.520 to be able to log out so for that reason
04:45:15.520 I will go ahead get the use oath from
04:45:18.520 Expo Clerk and then we would like to
04:45:21.200 have a state this is going to check if
04:45:24.040 the edit model is visible or Not by
04:45:27.680 default this is going to be false and
04:45:29.840 then we would like to get the current
04:45:31.560 user by this query that we have created
04:45:35.000 already and we have used this in the
04:45:37.200 past so we'll just say this is the clerk
04:45:40.280 ID and instead of doing it like this I
04:45:42.798 think we can just say if user ID existed
04:45:47.000 go ahead run this query but else you can
04:45:49.878 skip
04:45:51.280 that okay so this is what we have for
04:45:54.480 the current user and then for the edited
04:45:57.638 profile info so just think about it when
04:46:00.958 we click to this button we are going to
04:46:03.040 see the model and by the default like by
04:46:06.480 default we'll like to get the full name
04:46:08.560 and the current bio and then we can
04:46:11.638 either write something on top of it or
04:46:14.280 we can just change it completely so for
04:46:16.840 this we'll like to have a state let me
04:46:19.440 grab
04:46:20.440 this I'll just paste it right here which
04:46:23.680 is the edited profile and set edit
04:46:26.878 edited profile okay default name and bio
04:46:30.200 by default these are the fields that we
04:46:32.680 have and then we are going to need one
04:46:34.760 more state so when we click to this post
04:46:38.280 this will be the selected post so that
04:46:40.558 we can and show it inside the
04:46:42.920 model right so I will have my state
04:46:46.520 let's say const selected post and set
04:46:49.718 selected post now if you don't really
04:46:52.480 add this type this is completely fine
04:46:55.240 but we would like to let typescript know
04:46:58.080 that this will be type of post and this
04:47:00.840 is how we can do it convex gives you
04:47:03.360 this dog or document and you just say
04:47:06.718 which type this is so you can either say
04:47:08.798 it's going to be coming from users table
04:47:11.080 but in our case this is going to be a
04:47:12.760 post or by default it'll be null so here
04:47:16.160 we go it is null by default then we
04:47:18.878 would like to get the posts by user and
04:47:22.400 since this is our own profile we don't
04:47:24.440 really need to add any arguments so I
04:47:26.878 just leave this as empty then we would
04:47:29.638 like to call our mutation as well so
04:47:32.280 let's go ahead and grab this use
04:47:34.440 mutation under the users we have this
04:47:37.320 update profile
04:47:38.920 mutation and then we are going to have
04:47:41.520 last two functions let's say con handle
04:47:45.360 edit profile this is going to be an
04:47:49.200 arrow function let's
04:47:51.240 say let's leave it as it is for now and
04:47:54.360 I will duplicate this and let's say
04:47:57.280 handle um let's just say save
04:48:02.558 profile and this will be an asyn
04:48:05.600 function just like that and you know
04:48:08.200 what my apologies we don't really need
04:48:10.400 this fun function the only function we
04:48:12.120 need is this handle save profile and we
04:48:15.000 are going to call this once we click to
04:48:17.280 this
04:48:18.240 button okay so with this now I think we
04:48:20.878 can build the UI so first I'll just say
04:48:24.080 if we don't have the current user or if
04:48:26.878 we are in the loading State go ahead
04:48:29.320 show a loader component but else we can
04:48:32.878 return our actual view so this will be a
04:48:36.200 really long return statement but let's
04:48:38.480 try to build it step by step
04:48:41.280 we are going to say styles. container
04:48:44.360 and I think these Styles will be coming
04:48:47.878 from a different file that we need to
04:48:49.798 create let's say profile do styles. yes
04:48:56.080 once again I will grab this from giab
04:48:58.360 repo paste this in this is one of the
04:49:01.360 longest
04:49:02.360 ones let me show this entire
04:49:05.718 file okay so this is what we have I'll
04:49:09.080 just scroll really slowly
04:49:23.680 okay so that's what we have I'll just
04:49:25.480 save you can grab this from the GitHub
04:49:27.798 repo and let's get the styles from the
04:49:31.160 profile Styles file and let me see the
04:49:34.520 entire view inside this view we would
04:49:37.600 like to have the header which will have
04:49:40.320 the
04:49:41.320 username as well as the logout Button as
04:49:44.240 you can tell so here I would like to
04:49:46.718 just grab this it is around 10 lines of
04:49:49.558 code let's get the touch touchable
04:49:52.878 opacity the ion icons as well as the
04:49:55.920 colors let's save this is what we got
04:49:59.000 our username as well as the logout
04:50:01.360 button once we collect it it just signs
04:50:04.718 signs us out right then after this we
04:50:08.200 would like to put a scroll View
04:50:12.280 and then this is going to take the show
04:50:14.558 vertical scroll indicator to be pulse we
04:50:17.680 don't really want to show this at all in
04:50:19.558 our application and then we would like
04:50:21.798 to have one view that will be the
04:50:24.240 container for profile info let's close
04:50:27.638 this off and inside we would like to
04:50:30.160 have
04:50:31.440 Avatar and
04:50:33.798 stats so so like number of followers
04:50:37.000 following so on and so forth so here let
04:50:40.160 me just say save to get this
04:50:44.440 formatting and then paste this in close
04:50:47.280 this off we have Avatar and stats class
04:50:51.040 and on top of it we will have one more
04:50:54.000 view that will have the image this is
04:50:57.360 coming from Expo image and we're going
04:50:59.400 to put the current user image so once I
04:51:02.280 save this is the output that we got so
04:51:05.320 outside of this view we would like to
04:51:07.520 put the stats container so let me go
04:51:10.638 ahead grab this again it is around 10
04:51:13.320 lines of code so we have two different
04:51:16.080 texts so let me just save and see the
04:51:18.360 output there we go this is what we have
04:51:20.320 just added then on top of this view we
04:51:23.840 would like to put the full name as well
04:51:26.120 as the user bio and we only want to show
04:51:29.440 the bio if it is existed so we just have
04:51:32.920 a conditional styling here okay seems
04:51:35.958 like we are missing something maybe this
04:51:38.360 should
04:51:39.120 be oops outside of here let's
04:51:43.110 [Music]
04:51:44.400 see okay now this is actually working so
04:51:47.360 just double check that you are under
04:51:49.600 three different views and then you add
04:51:51.840 the text right
04:51:54.718 here okay then we would like to add the
04:51:57.680 action buttons so I will go ahead paste
04:52:01.120 them here on press let's just delete
04:52:04.360 that save so this is what we have this
04:52:07.520 doesn't do anything this is just for
04:52:09.638 decoration you can add the actual
04:52:12.080 functionality but I'll just skip that
04:52:14.440 and let's say when we click to this when
04:52:17.080 we click to this edit profile button we
04:52:21.080 would like to just change our state so
04:52:24.400 I'll just say on press make this state
04:52:27.440 to be true and depending on this state
04:52:29.878 we would like to show our model so for
04:52:33.760 now let's save and let me show you the
04:52:35.600 entire thing like this and then after
04:52:39.360 this touchable AAC
04:52:41.120 after these two views I will say if the
04:52:44.440 number of posts is equal to zero I would
04:52:47.440 like to show this component which is
04:52:49.760 around 10 lines of code once again let's
04:52:53.480 just say function no post found this is
04:52:56.240 the content we just say no posts yet
04:52:59.798 okay then after this like below to it we
04:53:02.680 would like to show the actual posts and
04:53:05.958 for this we are going to be using
04:53:07.600 flatlist and let me turn this off the
04:53:10.760 data that we would like to map through
04:53:12.638 will be posts let's say number of
04:53:15.000 columns this is something that we have
04:53:16.760 used for the first time in flat list but
04:53:20.120 here we go then let's say scroll
04:53:23.200 enabled let's say this will be false
04:53:26.120 they shouldn't be able to scroll and for
04:53:28.798 the render item we can show a post
04:53:31.520 component but in this case I'll just put
04:53:33.958 it in line and I'll just show the image
04:53:37.440 itself okay just a simple image and when
04:53:40.520 we collected this will set the selected
04:53:43.360 post so that we can let me show
04:53:47.440 this oops so that when we click to a
04:53:50.680 post we should be able to show a
04:53:53.680 model
04:53:57.200 okay so this is what we have the flat
04:53:59.920 list we're going to save and go back
04:54:02.680 here by the way we got the UI we can
04:54:05.080 collect it nothing happens we can
04:54:06.920 collect it this nothing happens but
04:54:09.120 let's make it work below to this scroll
04:54:11.520 view we're going to have two different
04:54:13.558 models so one for the edit profile model
04:54:17.878 and then the other one let's say
04:54:20.718 selected image model let's start with
04:54:23.840 the simplest one which is this model I
04:54:27.440 would like to give you the code it's
04:54:29.878 around 20 lines of code here let me walk
04:54:33.280 you through it so we're going to get the
04:54:35.320 model from react native we will say
04:54:37.760 animation type will be fate transparent
04:54:40.120 of true and when we close it it should
04:54:43.160 set the selected post to be null and
04:54:45.798 here it will be visible depending on the
04:54:48.160 state now since this is an object we
04:54:50.600 would like to convert this into a bullan
04:54:53.040 so we just put double bang operators
04:54:55.760 once again super simple JavaScript trick
04:54:58.040 that you should know then we have a view
04:55:00.760 with some styling if there is a selected
04:55:03.400 post we are going to see this part so I
04:55:06.920 think we don't really need to add this
04:55:08.400 check but if we don't add it this is not
04:55:11.400 really happy with us so that's why we
04:55:13.680 have that let's save and test this out
04:55:16.718 here we go if I click to this this one
04:55:19.280 is selected if we click to this okay you
04:55:22.840 get the point it works and when you
04:55:24.878 click to the close button it sets the
04:55:28.000 states to be
04:55:29.520 null so with this now we can add the
04:55:32.600 actual model the one and only edit
04:55:35.798 profile model which will slide down from
04:55:39.360 the bottom of the screen screen right
04:55:41.080 it'll be
04:55:43.040 animated so I think this will be around
04:55:45.600 50 lines of code I can copy it and paste
04:55:49.000 it then we'll go through it
04:55:51.558 slowly so I am just trying to do
04:55:54.280 everything to not type this out I hope
04:55:57.480 nobody gets annoyed by this because like
04:56:00.480 I am more on the explaining part of the
04:56:03.558 tutorials rather than typing everything
04:56:05.878 out I think it just doesn't make sense
04:56:08.280 at this point we are I think four to
04:56:11.200 five hours in and you should be able to
04:56:15.160 understand everything that we just copy
04:56:16.920 and paste so let me import everything
04:56:19.520 and we will take a look at the
04:56:23.320 code okay so we have just imported from
04:56:28.000 like this entire model once again we
04:56:30.520 have our animation type divisible
04:56:32.798 bullion transparent and close function
04:56:36.320 then we have touchable without feedback
04:56:38.920 we don't really want to get any feedback
04:56:40.958 so this is one of those components that
04:56:42.760 you can use and then on press we'll just
04:56:45.360 say dismiss the keyboard so let's save
04:56:48.958 see the output and then I'll explain the
04:56:51.440 rest so if we clict to this our state
04:56:54.600 becomes true and you are able to see the
04:56:57.360 model which is this view then here we
04:57:00.240 say once again like use the keyboard
04:57:03.760 avoiding view make sure that behavior is
04:57:06.638 working correctly depending on the
04:57:08.600 platform and then we have have this edit
04:57:11.718 profile header which is this part then
04:57:15.160 we have the name we have a text input
04:57:19.120 and once you type something in it will
04:57:21.320 update the state here we go and it will
04:57:24.280 only update the full name then we have
04:57:26.798 the exact same thing for the biography
04:57:29.680 right and at the moment we don't have
04:57:32.160 any value so it is null we're going to
04:57:35.320 fix it or we are going to add something
04:57:37.440 I was going to say and then once we
04:57:39.600 click to the save changes button we are
04:57:42.600 calling this function so let's go ahead
04:57:45.400 and create that then we will try to
04:57:47.920 actually update our profile so here I'll
04:57:51.240 just scroll to the very top and here
04:57:54.680 basically we would like to call our
04:57:56.798 mutation so I'll just say update profile
04:57:59.440 and we are going to add the edited
04:58:01.798 profile state which has the full name as
04:58:04.638 well as the bio then once we edit like
04:58:07.920 once we save this update the profile
04:58:10.120 profile we would like to make this state
04:58:12.280 to be false so that this model would
04:58:14.878 close Okay that was a lot of different
04:58:17.520 things now let's actually test this out
04:58:20.160 I'll click here and I'll just add one
04:58:22.280 two three at the end of my name and then
04:58:24.958 I'll just say hey
04:58:29.240 everyone let's save the changes here we
04:58:32.280 go looks like it has been updated we can
04:58:34.600 just double check by taking a look to
04:58:37.680 our database this is the new bio
04:58:40.878 and this is the new full name here we
04:58:44.360 can
04:58:45.080 see and let's try to build it with the
04:58:49.040 like let's try to test this with the
04:58:51.080 actual keyboard so I'll go ahead press
04:58:54.440 command shift
04:58:56.558 K as we can tell the view is like
04:59:02.520 keyword keyboard is in the view all
04:59:05.320 right and there isn't really any issues
04:59:08.840 on this side as well
04:59:11.958 okay I'll just
04:59:14.000 say um maybe I can just disable the
04:59:17.360 keyboard it's kind of annoying because
04:59:20.040 while it is open you cannot really type
04:59:22.280 type out with your actual keyboard so
04:59:24.520 I'll just say sve and we can delete this
04:59:27.718 one two three and there is like
04:59:29.878 correction if you can see I believe we
04:59:32.558 can turn this off as
04:59:35.160 well I don't really remember the exact
04:59:38.200 prop but if you go into this text input
04:59:42.080 for the bio let's say completion do we
04:59:45.878 have anything like that like autoc
04:59:48.680 complete and let's see what this does
04:59:51.638 specific autoc complete hints for the
04:59:56.000 system so I think it should be autoc
04:59:58.360 complete and we can just say this will
05:00:00.320 be off is this the case okay we have off
05:00:03.718 like bunch of different things that I
05:00:05.480 don't even know that was
05:00:08.638 existed but yeah basically this is how
05:00:10.920 we can explore different things so let's
05:00:13.840 just say it will be sve just like that
05:00:16.440 save and here we go now that our profile
05:00:20.000 page also works the only thing that we
05:00:22.440 left is the user profile so when we
05:00:26.040 click to other user profiles we're going
05:00:28.400 to see this page as you can tell we will
05:00:31.360 be able to follow them and unfollow them
05:00:35.120 so this is what we're going to build
05:00:36.798 next so in this page we are going to
05:00:39.400 need couple of different functions and
05:00:42.120 specifically we're going to need two
05:00:44.360 different queries and one mutation and
05:00:47.440 let's see what they are so let's start
05:00:49.680 with the queries the very first query
05:00:52.280 that we're going to need is to fetch the
05:00:54.440 user profile and then the other one is
05:00:57.120 to check if we are following this user
05:00:59.718 or not depending on that we will either
05:01:02.160 show this follow button or unfollow
05:01:04.760 button and then the mutation will be as
05:01:08.878 you can tell like follow or unfollow
05:01:11.958 functionality okay so we're going to
05:01:13.718 just toggle the follow state so before
05:01:16.360 we start building the uii let's go ahead
05:01:19.200 and create our convex functions then
05:01:22.040 we'll just jump into the UI okay so I'll
05:01:25.200 go under the
05:01:26.760 posts and I don't know if you have
05:01:29.040 realized so maybe you had a question you
05:01:31.360 said why don't we have a query to fetch
05:01:33.920 the posts but we don't really need to
05:01:36.480 build it because we have already done
05:01:39.000 that right get posts by user and we're
05:01:42.080 going to pass the user ID and we'll just
05:01:44.638 collect every single post that this user
05:01:48.000 has okay so let me just make this entire
05:01:51.320 screen so that we can see it clearly and
05:01:53.878 I'll just get my very first query which
05:01:57.120 is to get user profile let's say query
05:02:02.080 at this point you should be able to do
05:02:03.680 this in seconds but I'll just type this
05:02:06.320 out let's say we're going to pass an ID
05:02:09.120 which will be the US user ID and then we
05:02:11.160 would like to go ahead and get the user
05:02:14.000 let's just add an if check where we say
05:02:16.120 if there is not user throw an error but
05:02:18.878 else go ahead and return
05:02:22.080 that okay so that that was the very
05:02:24.958 first query the other one is to check if
05:02:27.718 we are following this user or not so
05:02:30.520 I'll just paste this and then walk you
05:02:32.080 through it it's around 10 lines of code
05:02:35.040 okay so it is called is following and
05:02:37.240 we're going to pass the ID of the user
05:02:39.600 so so that we know if we are following
05:02:41.760 this user or not we'll get the
05:02:43.878 authenticated user and then we'll just
05:02:46.160 check for a document under the follows
05:02:49.200 table and we'll say hey if we are the
05:02:52.638 follower and if this is the
05:02:55.200 following that means we are already
05:02:57.600 following this account right because we
05:02:59.718 are the follower of that user then like
05:03:03.520 we'll get the first result this will be
05:03:06.040 an object or null and if you want to
05:03:08.798 convert this into a bullion we would use
05:03:11.320 our JavaScript trick so we're going to
05:03:13.558 put double bang operator so if you
05:03:16.280 follow I mean if you hover over this you
05:03:19.400 can see we are returning a Boolean okay
05:03:22.958 so that was the very last query but we
05:03:26.718 we need one more mutation okay so let's
05:03:29.558 just try to type this out this will be a
05:03:31.920 bit longer but I think it is nothing
05:03:34.200 complicated so let's say export const
05:03:37.240 toggle follow just like this this is is
05:03:39.878 going to be a mutation and once again
05:03:42.120 we'll get an argument so that we know
05:03:44.600 which user that we are trying to follow
05:03:47.040 or unfollow then let's get the Handler
05:03:51.200 function just like this we're going to
05:03:53.558 get the currently authenticated user and
05:03:56.360 then just like what we have done above
05:03:58.760 I'll just copy this if you really want
05:04:01.200 to you can make this a reusable function
05:04:04.320 but I'll just say you know copy and
05:04:06.638 paste and I will call this as existing
05:04:09.320 so if this is already existed that means
05:04:11.798 we are following this user and you would
05:04:14.638 like to unfollow it so say if existing
05:04:17.400 do it this else do this here we would
05:04:20.798 like to
05:04:22.200 unfollow right and then here we would
05:04:24.600 like to
05:04:26.440 follow okay now if we want to unfollow
05:04:29.958 that means we would like to delete a
05:04:32.080 document and specifically we would like
05:04:34.638 to delete the follow document and then
05:04:37.480 we would like to decrement the number of
05:04:40.798 following let me show this we are going
05:04:43.638 to decrement the number of following of
05:04:46.638 this user or I should say okay let me
05:04:49.400 just tell you from scratch if we want to
05:04:52.080 unfollow this user we would like to
05:04:54.240 decrement the number of followers of
05:04:56.240 this user and we would like to decrement
05:04:58.638 the following count of our own account
05:05:01.798 right so I hope that makes sense let's
05:05:04.280 go ahead and try to do it since this
05:05:07.040 will be reusable I'll just create a
05:05:09.200 function called update follow counts and
05:05:14.200 we're going to pass the
05:05:16.878 context current user ID and following ID
05:05:22.040 which is coming from arguments and then
05:05:24.680 we'll just say true or false so in this
05:05:27.320 case this will be false here it will be
05:05:29.400 true I know this doesn't make any sense
05:05:31.958 but we will create it in a second and it
05:05:34.400 should be clear and then if we are
05:05:36.638 following that means we would like to
05:05:38.920 create a document so let's say context.
05:05:42.480 DB insert into the follows table and
05:05:45.718 this is the document that we would like
05:05:47.240 to insert so we're going to put the
05:05:49.680 follower ID and then the following
05:05:52.558 ID okay once we have done this we would
05:05:55.080 like to do the same
05:05:57.000 thing because we would like to increment
05:05:59.638 the number of these values and the you
05:06:03.920 know the same arguments will be added
05:06:06.160 but this will be true which means like
05:06:09.120 if we are following or unfollowing okay
05:06:13.000 so hopefully here we should be good to
05:06:15.200 go and you know we are missing something
05:06:17.718 else which is to create a notification
05:06:21.080 right and here I'll go ahead copy and
05:06:25.360 paste this is something that we have
05:06:27.440 done multiple times at this point we'll
05:06:29.680 just insert under the notifications a
05:06:32.440 type of follow docu a follow
05:06:35.040 notification right and here is the
05:06:37.240 receiver and sender is the current user
05:06:40.638 now let's build this function so I think
05:06:43.638 I can provide this to you once again
05:06:46.280 it's around 10 lines of
05:06:48.320 code okay so first we get the mutation
05:06:51.440 context so since this is coming from a
05:06:54.400 mutation right this is the context that
05:06:57.480 we are passing let's say type of this is
05:06:59.958 mutation context and then we got the
05:07:02.360 follower ID and following ID which are
05:07:05.440 the type of user ID and then is follow
05:07:08.480 Boolean
05:07:10.200 so this code is pretty easy to
05:07:12.120 understand we get both of these
05:07:14.320 documents then like if you don't add
05:07:17.080 this part types script will be a bit mad
05:07:20.040 that's why we are adding it and then we
05:07:22.400 just say go ahead update these values so
05:07:26.440 following uh the number of following
05:07:29.240 either will be incremented or
05:07:31.320 decremented and same for the followers
05:07:34.878 and how can we check for the increment
05:07:37.120 or decrement it'll be depending on this
05:07:39.958 buan which we have here so either false
05:07:43.200 or true so all in all this function
05:07:47.000 allows you to follow or unfollow right
05:07:50.320 as the name suggests so I think you can
05:07:52.840 pause the video if you didn't really
05:07:55.080 understand it even though there is there
05:07:57.760 isn't anything complex but I can feel
05:08:00.558 this might look a little bit weird if
05:08:02.320 you are kind of like a beginner so once
05:08:05.480 you have once you are done with it we
05:08:08.040 can go ahead and try to build our UI for
05:08:10.878 the user page and just before we build
05:08:13.520 the UI I'd like to show you this image
05:08:16.718 so I don't know if you have realized it
05:08:18.638 but this is not part of the navigation
05:08:21.878 right and let's take a look at it okay
05:08:24.520 all these Pages all these screens are
05:08:27.480 part of the navigation but here this is
05:08:30.040 not the case so we would like to go
05:08:32.120 ahead and put it outside of the tabs
05:08:35.760 folder because anything anything that
05:08:38.000 you put here under this folder will be a
05:08:41.440 will be a tab right if I can correctly
05:08:44.320 then let's go ahead create this screen I
05:08:47.280 will call this as user and this could be
05:08:49.798 dynamic right we could have millions of
05:08:52.400 different users so that means there
05:08:54.360 could be millions of different screens
05:08:57.600 since this will be a dynamic screen
05:08:59.680 we're going to put these square brackets
05:09:01.958 this is how we will make it work we'll
05:09:03.958 just say id. TSX you can call this
05:09:07.360 anything like username but we will be
05:09:09.878 fetching the user profiles depending on
05:09:12.200 their IDs that's why I'll just call it
05:09:14.440 as ID then we will like to have a layout
05:09:17.920 file we'll say layout. TSX this will be
05:09:22.080 a really simple file let me just type
05:09:25.120 this out let's say
05:09:28.480 rnf so we can just call this as user
05:09:32.798 layout and instead of view and text we
05:09:35.680 would like to basically return the stack
05:09:42.000 let's get it from the export router and
05:09:44.200 then I'll just say screen options we we
05:09:47.440 don't really want to show the headers
05:09:50.120 okay now let's
05:09:53.360 save and we would like to build this
05:09:55.638 page now I'll just say rnf let's say
05:09:58.520 user
05:10:00.080 profile page or I think we should call
05:10:02.760 it as
05:10:04.400 screen give a bit space and save now
05:10:07.680 we'll like to build the actual
05:10:11.320 content let's just make them to look
05:10:14.000 correctly
05:10:16.160 okay so here I'll just go inside and we
05:10:19.798 would like to call some queries so first
05:10:22.638 let's try to get the profile of the user
05:10:26.320 now this is not the page that we are
05:10:27.920 trying to build this is our own profile
05:10:30.480 the page that we are trying to build
05:10:33.080 will be the profile of others right so
05:10:35.440 when we click to this we should be taken
05:10:38.360 into this page
05:10:40.440 so let's say profile and I'll just shink
05:10:42.600 the left hand side give a little bit
05:10:44.600 space let's say use Query get it from
05:10:48.200 the convex and I'll just say get the
05:10:51.760 api. users and get
05:10:55.280 user profile I was going to say but why
05:10:58.680 don't we have this function get
05:11:02.280 user profile so I don't know why but I
05:11:06.200 have just put this into the posts
05:11:09.400 I think this doesn't really make any
05:11:11.000 sense this is not related to posts so
05:11:13.400 I'll go ahead cut it from here and
05:11:16.120 actually I'll I'll cut all of these
05:11:19.120 right they all are related to users so
05:11:24.200 I'll just cut everything save this file
05:11:27.040 go into the convex folder and under the
05:11:30.878 users file so I'll just paste this
05:11:34.520 in let's get the ID
05:11:40.200 okay now everything should be happy with
05:11:43.120 us we just have all these queries and
05:11:46.958 mutations and one helper function okay
05:11:50.040 now let's save showing the left hand
05:11:52.040 side this should be happy with us now
05:11:54.480 let's say get user profile now this
05:11:57.000 wants you to put an argument right which
05:11:59.760 is the ID and how do we get this ID from
05:12:03.878 the file name so this will be coming
05:12:06.600 from a hook let's say const
05:12:10.280 use local search prems and we can
05:12:13.878 destructure the value which is going to
05:12:16.200 be ID so if you call this file as hello
05:12:19.680 you would say grab me that right but in
05:12:22.360 our case it is called as ID so this is
05:12:24.958 how we get that and here this says like
05:12:28.878 let's just add it ID as ID but now this
05:12:32.040 says this is type of string or an array
05:12:34.958 of strings but we are expecting a type
05:12:38.200 of user right here
05:12:39.840 right so let's make the typescript happy
05:12:42.120 and just say this will
05:12:44.000 be ID of users just like that now this
05:12:47.320 is happy with us now the other query
05:12:49.878 that we'd like to do let's just
05:12:51.680 duplicate that it will be posts we'll
05:12:55.040 say API get user
05:12:58.638 profile in the same way this wants us to
05:13:02.400 put an ID so here we go and finally
05:13:06.040 we'll like to get our mutation so let's
05:13:08.360 say const is
05:13:10.600 following I think this is also the query
05:13:13.480 not mutation let's say is following I'll
05:13:16.400 just outo accept this here we go this is
05:13:20.080 working correctly then we can get our
05:13:22.600 mutation which is called as toggle
05:13:25.920 follow we'll say use
05:13:29.480 mutation okay this is the mutation that
05:13:32.520 we have we are going to have a function
05:13:35.000 called handle back for now let's just
05:13:37.840 leave it as an empty Arrow function we
05:13:40.120 will implement this later in the video
05:13:43.400 and let's handle the loader case I'll
05:13:46.240 just say let me grab the entire thing it
05:13:48.638 is just a simple if check so if profile
05:13:51.480 is undefined and if you remember in
05:13:53.798 convex if something is equal to
05:13:55.760 undefined that means you are in the Lo
05:13:57.520 loing state so basically we check any of
05:14:00.000 these are in the All loing State we're
05:14:02.520 going to show a loader component which
05:14:04.958 is something that we have created
05:14:07.480 already then we and go and jump into the
05:14:10.840 return
05:14:11.680 statement let's delete this part
05:14:14.000 completely and here is going to be our
05:14:17.718 container now this is related to user
05:14:20.760 profile and I believe the Styles will be
05:14:23.760 coming from the profile. Styles then we
05:14:27.480 would like to add the
05:14:29.440 header section which is going to be this
05:14:32.280 part so we have an icon and then the
05:14:35.200 user like username right I would like to
05:14:38.600 grab this put it which is around five
05:14:41.320 lines of code I'll save to get the
05:14:43.600 formatting let's get this component
05:14:46.160 icons and then the
05:14:49.160 colors all we do is
05:14:51.680 to just show the user profile name right
05:14:56.120 I mean username so let's go ahead and
05:14:58.680 try to see this page how can we make
05:15:00.878 this work let's go under the
05:15:03.000 notifications page under the tabs so
05:15:06.680 when we click to a link
05:15:10.798 so under the
05:15:13.520 notification so we are just taking this
05:15:15.638 user to the notifications page but we
05:15:18.160 have a too now let's just fix it now
05:15:21.600 when we click to it we'll just say take
05:15:23.520 them to the user page and here is the
05:15:27.440 entire entire URL so let's save I'll
05:15:31.320 just click to this it says this page
05:15:34.280 does not found but this is not correct
05:15:36.360 let's go ahead press R when you add a
05:15:39.040 new page I think you should reload your
05:15:41.320 application Let's test this out once
05:15:43.480 again I'll click to
05:15:45.638 this okay so here it says value does not
05:15:49.000 match
05:15:50.360 validator let's take a look at
05:15:54.400 it so we got the ID I'd like to just
05:15:57.600 console log it what do we get let's say
05:16:00.520 ID is here
05:16:10.638 so I just found a solution it was a
05:16:12.760 silly mistake by AI in conx we don't
05:16:16.160 really have ID but instead we have
05:16:18.200 underscore ID right so ID just returns
05:16:21.558 undefined we should fix it now let's
05:16:24.120 save and test this out if you click to
05:16:27.080 this profile it should take us to there
05:16:29.280 and here is what we can see okay now I
05:16:31.878 hope that makes sense let's go ahead
05:16:34.120 sharing this left hand side delete that
05:16:37.120 and build the rest of the UI
05:16:39.718 now what are we going to have is this
05:16:42.200 remaining part and I will just put them
05:16:44.360 under a scroll view so let's go back put
05:16:48.120 them side by side and import a scroll
05:16:51.718 view let's say close this
05:16:55.638 off and we don't really want to show the
05:16:58.558 scroll indicator then I'll have a view
05:17:01.400 at the very top let's save to get this
05:17:03.680 formatting then this view will have a
05:17:06.080 style let's say styles do I think it
05:17:09.520 should be profile info then inside we're
05:17:12.120 going to have one more view with the
05:17:14.840 style to be styles.
05:17:19.320 Avatar and stats then I'll just grab you
05:17:23.600 the
05:17:25.240 content so this is the Avatar let's get
05:17:28.040 the image from Expo image save there we
05:17:31.240 go next to it we would like to put the
05:17:33.798 stats so just below the image still
05:17:36.680 inside this view I'll just say
05:17:39.800 [Music]
05:17:41.320 stats and then I'll provide you the code
05:17:44.600 which is around once again 10 lines of
05:17:48.480 code okay so here we go number of posts
05:17:51.878 followers and
05:17:54.200 following then after this de I mean
05:17:57.080 after this View and then after this one
05:17:59.760 we would like to go ahead build this
05:18:02.360 full name
05:18:03.638 text this is what we got and if user has
05:18:07.120 a bio we would like to put that that and
05:18:10.080 looks like this user doesn't have it so
05:18:12.120 it is not updating the UI then we would
05:18:15.320 like to have this button and for this
05:18:18.160 I'll be using pressible just to have at
05:18:20.638 least one of them in our code base you
05:18:22.878 can still use touchable opacity but this
05:18:25.798 is what I'll be going
05:18:28.200 with so pressible let's import that and
05:18:31.760 depending on the following State we are
05:18:33.798 going to show a different style and on
05:18:37.558 press we're going to call the
05:18:39.718 call the mutation and pass the following
05:18:42.240 ID if you don't add this part typescript
05:18:44.760 will be unhappy with you so this is what
05:18:47.240 we added depending on the state the
05:18:49.798 button text will change and let's save
05:18:53.360 and test this
05:18:54.958 out here we go I can follow that in real
05:18:58.200 time this has been updated and I can
05:19:00.760 unfollow that user after the pressible
05:19:04.360 and after this view but still inside the
05:19:07.120 scroll view we would like to to create
05:19:09.400 the post grid so here I'll just have a
05:19:12.200 view with the
05:19:14.558 styling to be let's say styles. post
05:19:18.760 grid and inside I like I just need to
05:19:22.638 check the number of posts I'll say
05:19:24.680 posts.
05:19:27.958 length wait why don't we get this
05:19:34.680 posts okay so for some reason posts is
05:19:39.040 not an array why is this the
05:19:42.360 case Okay this should be get user posts
05:19:46.958 but we don't really have
05:19:48.520 it maybe it should be under the
05:19:51.798 posts get posts by user and this wants
05:19:57.240 you to add a user
05:20:01.400 ID so if you have realized these
05:20:04.240 mistakes a couple of minutes ago you
05:20:06.680 might be mad at me but I have just
05:20:08.240 realized
05:20:10.320 okay now we can just say posts and we
05:20:12.440 can get the length now it is an array
05:20:14.958 and if it is equal to zero we would like
05:20:17.920 to do
05:20:19.200 something like this and in the else case
05:20:22.000 we would like to show something else and
05:20:24.480 here I'll just put a placeholder that
05:20:27.200 says no posts yet and then here we'll
05:20:30.958 like to just show a flat list let me
05:20:34.680 grab
05:20:36.680 this so this is what we have done done
05:20:38.878 multiple times where we would like to
05:20:41.400 map through the posts number of colums
05:20:44.718 scroll is not enabled and for each item
05:20:47.840 we would like to render a touchable
05:20:49.798 opacity let's
05:20:51.680 save okay currently this user doesn't
05:20:54.320 really have any posts that's why this is
05:20:57.200 what we see now I don't really know why
05:20:59.760 this is not being centered let's go
05:21:01.920 ahead and fix it let's maybe say Flex
05:21:05.040 will be
05:21:06.558 one okay so probably you already have it
05:21:09.798 in the source code but I have just added
05:21:12.360 that now it's being
05:21:14.558 centered okay so everything is working
05:21:16.958 at the moment we can follow this user we
05:21:19.558 can unfollow them it just works without
05:21:22.280 any issues and just one thing that we
05:21:24.878 are missing is this function like called
05:21:29.040 handle back when we collect this nothing
05:21:31.400 happens and we have attached it to this
05:21:34.440 icon so let's go ahead and build this
05:21:36.638 function so basically we'll using the
05:21:39.718 router I would like to import it let's
05:21:42.480 say use router coming from here and
05:21:45.240 we'll just say const
05:21:47.040 router okay so inside I'll just say if
05:21:51.600 like let's say if router can go back Yep
05:21:55.080 this is something that is available if
05:21:57.200 this is the case we should be able to go
05:22:02.958 back and in the else case we could just
05:22:05.680 say router. replace
05:22:09.680 slash tabs so we're just going to go
05:22:11.638 into the homepage I'll just click to
05:22:14.400 this here we go we can go back to the
05:22:16.480 notifications page then I think there is
05:22:19.840 one more thing that we are missing is
05:22:22.040 that when we click to here nothing
05:22:24.200 happens so let's go ahead and fix that I
05:22:27.200 will go into the post component this is
05:22:30.520 where that is and here here we go like
05:22:34.638 if you remember back in the video I just
05:22:37.320 said we're going to fix this part and
05:22:39.798 let's fix it now this is going to be
05:22:43.120 dynamic value so if post is mine that
05:22:46.520 means the author is me when I click to
05:22:49.080 this it should take me to my own profile
05:22:51.638 tab but if post is posted by someone
05:22:55.638 else it should take us to the user page
05:22:58.680 that we have just created right so here
05:23:01.080 is how we can do it I'll basically paste
05:23:03.440 this in we're going to get the current
05:23:05.638 user let's just put a question mark so
05:23:08.958 we'll say if the post author is me then
05:23:12.400 take me to the profile tab but else take
05:23:15.360 me to that user page let's save I'll
05:23:19.520 click to
05:23:20.600 this nothing happens I think we should
05:23:23.558 say as child right because there's a
05:23:26.798 touchable opacity and we would like to
05:23:29.480 take the link inside of it so this is
05:23:31.680 how we can do it let's save and I'll
05:23:34.120 click to this it should take me to my
05:23:35.958 own profile okay this is how that work
05:23:39.360 if that was a different profile trust me
05:23:41.760 it would take us to that user screen
05:23:44.638 that we have just built so with that
05:23:46.680 that's going to it for the user page
05:23:49.200 there isn't really anything complex that
05:23:51.240 we have implemented it was a pretty
05:23:53.280 basic UI where we just handle a mutation
05:23:56.680 and we have added couple of different
05:23:58.958 queries okay so in the next section
05:24:01.240 we're going to do some fixes and
05:24:03.760 optimizations now let's do some
05:24:05.760 optimizations the very first one is Rel
05:24:08.680 to Android devices so this is an Android
05:24:11.958 device that I actually tested out and
05:24:14.878 I've just realized when you take a look
05:24:17.000 at the navigation bar it is in the White
05:24:20.400 theme so it should be dark I think this
05:24:23.000 doesn't really look nice it would be
05:24:25.360 better if the background is dark and
05:24:28.160 these things are white right these
05:24:30.878 buttons so how can we make this work
05:24:33.638 well thankfully there is something
05:24:36.080 called Expo navigation bar
05:24:39.160 and we'll go under the layout try to get
05:24:42.440 that package so I'll just kill my
05:24:44.600 application clear this up and I'll just
05:24:47.240 say npx Expo install let's say Expo Das
05:24:53.798 navigation dashb
05:24:57.480 bar so this will go ahead and install it
05:25:01.000 while it
05:25:02.360 installs and here we go we got that so
05:25:04.760 let's start our application preloaded
05:25:08.080 okay okay it says no apps connected I'll
05:25:10.440 just press I and then reload
05:25:14.200 okay let's kill the terminal we're going
05:25:17.520 to go ahead and use it so what I'd like
05:25:20.000 to do use a use effect and just try to
05:25:23.840 change the background color as soon as
05:25:26.000 our application starts so first I will
05:25:28.920 get my import just like this I'll say
05:25:32.320 import everything as navigation bar from
05:25:35.040 this package then below to this I'll
05:25:38.440 just say use
05:25:40.520 effect and let's initialize
05:25:44.840 it okay so when our application starts
05:25:48.040 we'll like to check if
05:25:50.600 platform. operating system is equal to
05:25:53.878 Android if this is the case we would
05:25:56.120 like to go ahead run this block and I
05:25:59.000 would like to just basically copy and
05:26:01.200 paste so navigation bar set background
05:26:04.120 color with this black color and then the
05:26:07.480 style will be a light so that these
05:26:10.360 buttons are light and the background
05:26:13.558 will be
05:26:15.360 black okay so once you have done this we
05:26:18.280 can basically save and I'll just add a
05:26:20.798 comment just so that you can have it in
05:26:23.080 the source code now on Android devices
05:26:26.120 this problem should be fixed and I have
05:26:28.440 tested out it is actually working now it
05:26:31.080 is in the dark background color so that
05:26:34.718 was the very first thing that I wanted
05:26:36.680 to mention the other one is is let me
05:26:38.920 take a look at my notes okay so we would
05:26:41.520 like to make the number of likes to work
05:26:44.718 in real time so what do I mean by this
05:26:47.558 now what do I mean by this what does
05:26:49.680 that mean to make this work in real time
05:26:52.280 so let me pretty quickly open up my
05:26:54.360 camera and just show you in real time
05:26:57.480 I'll go ahead and try to scan this QR
05:27:00.798 code let's open up the
05:27:03.120 terminal just like
05:27:06.520 that okay so let's wait a second this
05:27:11.000 should open up the actual application
05:27:13.558 and I'll just log in with my
05:27:27.240 account all right so I am just logged in
05:27:30.320 here we
05:27:31.280 go dude I just got an even email
05:27:34.040 notification but here we go this is the
05:27:36.320 exact same post that you can see on the
05:27:38.600 screen right this is what I have this is
05:27:41.280 what we got here so I will go ahead and
05:27:44.320 unlike this post currently it is liked
05:27:47.958 here you can see and if I unlike that
05:27:51.120 this screen should get updated
05:27:53.360 immediately but notice how I will unlike
05:27:56.080 it it doesn't get updated here right and
05:27:59.680 actually we can make this work in real
05:28:01.638 time because we are using conx so let's
05:28:04.878 go ahead and try to fix the code and
05:28:07.320 then we'll just test it out once again
05:28:10.240 all right so I will kill this file we're
05:28:13.080 going to go under the post
05:28:16.638 component oops let's shink the left hand
05:28:19.600 side so we have this state called likes
05:28:22.558 count but we don't really need to keep
05:28:24.798 it in a state we'll just use it as post.
05:28:27.718 likes so I'll just delete this state and
05:28:31.000 here we have an error instead of likes
05:28:32.920 count we'll just say
05:28:35.000 post. likes
05:28:38.200 okay and then we have one more error
05:28:40.120 let's go here under the handle like we
05:28:42.558 don't really need this function because
05:28:44.718 convex will fix it immediately now in
05:28:47.798 the same way I will go ahead and fix the
05:28:50.480 commment count because at the moment if
05:28:53.000 I try to add a comment from my phone
05:28:56.240 this will not update it for this us for
05:28:58.638 this user right if we delete this
05:29:01.680 part and make the comments to be post.
05:29:07.480 comments
05:29:09.120 dot okay I think that should be it post.
05:29:12.680 comments because it's already number and
05:29:15.480 we can save here we should be able to
05:29:18.480 get rid of this and go into the comments
05:29:22.840 model delete this type delete this
05:29:27.400 prop and delete this call so what we
05:29:31.280 have just done is to get rid of that
05:29:33.320 state so that we don't
05:29:35.798 really so we don't really need them
05:29:37.920 right it will just make it work in real
05:29:39.680 time okay so I'll just open up the
05:29:41.360 terminal and as well as my camera just
05:29:43.638 to show you
05:29:45.798 this so I'll just press r that will
05:29:48.680 reload the
05:29:50.440 application okay just take a look at the
05:29:52.520 screen we have zero likes and here it
05:29:55.520 also has zero likes I'll just go ahead
05:29:58.320 like
05:29:59.280 it and here we can see in real time on
05:30:02.718 the screen for this account it just
05:30:05.000 updated and if I like it here on my
05:30:07.718 phone it should be two
05:30:10.120 likes okay I don't know if you can see
05:30:12.600 it but now it is two likes here as well
05:30:15.040 I will unlike
05:30:17.200 that okay I cannot click
05:30:19.718 it okay now it is just one like let's go
05:30:23.240 ahead and add a comment so I'll just say
05:30:26.400 hey but first let's see there is only
05:30:28.320 one
05:30:30.040 comment hey
05:30:32.240 there and post it okay it just works in
05:30:36.520 real time so I just really wanted to
05:30:38.160 show you the entire process and okay so
05:30:41.840 that was just one optimization that I
05:30:43.558 wanted to add I think it is better to
05:30:45.958 see the numbers increment in real
05:30:49.440 time okay so that's going to be it for
05:30:52.600 this optimization I think there is one
05:30:54.798 more thing now this one that I'll show
05:30:57.040 you is not like an optimization but it
05:30:59.680 is something that I genuinely want to
05:31:01.558 talk about so I will go under the
05:31:04.840 homepage okay so app tabs
05:31:08.600 feed here what do we want to do so when
05:31:11.718 we just try to refresh this right in
05:31:14.520 Instagram this is how that work but here
05:31:16.798 nothing happens but thankfully there is
05:31:19.480 a component for this where we can just
05:31:22.120 make it work right so here first things
05:31:24.600 first I'll just get a state to check the
05:31:28.360 refreshing state so I'll just say by
05:31:30.958 default this is going to be false and
05:31:32.958 let's import the use State and then on
05:31:35.920 refresh we'll do something let's say
05:31:38.280 const on
05:31:39.878 refresh for now let's have an empty
05:31:43.160 function just like that and then we can
05:31:46.160 add it into the flat list I'll just
05:31:49.600 say was it on refresh okay so here we
05:31:53.160 would like to actually render a
05:31:55.760 component and I think it is not on
05:31:58.000 refresh my bad it should be a refresh
05:32:00.520 control the component that we'll like to
05:32:02.958 show will be refresh control coming from
05:32:05.760 react native then we can add couple of
05:32:08.400 different props so here I'll just say
05:32:11.840 refreshing well depending on the state
05:32:14.600 and on refresh what are we going to be
05:32:16.760 doing is to call our function and then
05:32:19.520 the tin color if we really want it to we
05:32:22.160 can customize it and there are bunch of
05:32:24.360 different things that you can take a
05:32:25.718 look after completing this tutorial so
05:32:28.558 let's save and we can try to refresh
05:32:31.160 this here we can see we can actually get
05:32:34.480 that
05:32:36.160 view but nothing happen happens at the
05:32:38.440 moment what we can do on the on refresh
05:32:42.840 method we can actually try to run this
05:32:45.958 query once again right so that we would
05:32:48.440 get the latest posts so here I'll go
05:32:51.480 ahead for now I'll say set refreshing
05:32:54.120 will be equal to True when we run this
05:32:56.240 function and then I'll just say after 2
05:32:59.600 seconds we would like to just say set
05:33:03.280 refreshing to be false So currently this
05:33:07.440 does nothing right the only thing we
05:33:10.200 just update the state as if something is
05:33:12.798 happening behind the scenes so after 2
05:33:15.760 seconds basically nothing happens so if
05:33:18.680 you really want to you can call this
05:33:21.200 query once again and since we are using
05:33:24.520 convex if you really want to refetch a
05:33:27.600 query you can use this package called 10
05:33:31.440 stack query but in our case I just
05:33:34.320 wanted to mention this and I will not be
05:33:37.240 implementing that if you really want to
05:33:39.400 you can have this as a really great to
05:33:43.120 do okay so this is how we can Implement
05:33:46.120 on refresh
05:33:48.000 functionalities let's take a look at our
05:33:50.160 code base if we have any to-dos left
05:33:53.480 basically we fixed it we can delete
05:33:57.200 that and then the other one I think it's
05:34:00.280 in the same
05:34:01.400 page okay we forgot to fix it so let's
05:34:04.200 go ahead and do that this is
05:34:08.798 when we click to the
05:34:11.000 username this should take us to the user
05:34:13.958 profile so just like what we had
05:34:17.160 above I will copy this entire thing and
05:34:21.240 then paste
05:34:22.920 it okay so now if you clict the username
05:34:26.160 it should take you to that profile just
05:34:29.200 like
05:34:31.320 here okay so with that that's going to
05:34:34.000 be it for this section as well so I have
05:34:36.480 just said buy but there is one more
05:34:38.558 thing that I'd like to mention which is
05:34:40.680 that let me open up the camera first so
05:34:43.798 here I just got an Android device and
05:34:46.360 this was the previous device now this is
05:34:48.600 working completely fine this is also
05:34:50.958 working completely fine but there is
05:34:53.360 just one thing that I'd like to mention
05:34:55.760 which is this status bar so let's go
05:34:58.160 ahead and try to make this work with a
05:35:01.240 dark background so here even if there
05:35:05.360 wasn't a problem on this Android device
05:35:07.798 this is the component that I'd like to
05:35:09.718 mention so I just forgot that until now
05:35:12.680 we didn't really need it but here we go
05:35:15.680 we'll just be using it so we're going to
05:35:17.718 get this status bar import from Expo
05:35:20.760 status bar and I'll just put it right
05:35:23.878 below to the save area provider okay so
05:35:27.240 we'll just say status bar we can give it
05:35:29.600 a style like light dark and there is
05:35:33.480 also invert I believe yep we have even
05:35:37.280 out so here let's go with the light
05:35:40.160 since our background is always black
05:35:43.520 this should be a light so that text is
05:35:46.920 white but if you go with dark notice how
05:35:50.120 this will be invisible right and this
05:35:52.798 doesn't really make sense we'll go with
05:35:54.798 the light option and let me open up the
05:35:58.320 camera to show you
05:36:00.760 this so here we can see now it is black
05:36:03.920 it is looking a little bit better if we
05:36:06.280 go with dark
05:36:08.200 oops let me just like delete this and
05:36:11.558 just say
05:36:13.080 dark just like
05:36:15.600 that like the text completely disappears
05:36:19.120 but in our case we' like to have this as
05:36:22.320 light okay so now that this is working I
05:36:25.280 think we can move on with the next
05:36:26.958 section so now that we have an entire
05:36:29.958 application built this is completely
05:36:32.200 ready to be deployed but how do we
05:36:34.840 deploy this so unfortunately it is not
05:36:37.638 not as easy as deploying a web web
05:36:40.558 project right so we cannot really go
05:36:43.320 into verel or render doccom and just
05:36:46.840 drag and drop it this is not how that
05:36:49.040 works there are some good news and bad
05:36:51.520 news the good news are that you can
05:36:54.200 deploy it right you can publish it to
05:36:57.000 Google Play store or App Store the bad
05:36:59.638 news are it just a little bit more
05:37:01.760 involved right so you would need to have
05:37:04.320 a developer account to put your you know
05:37:07.798 application information and then from
05:37:10.120 there you would publish it and I don't
05:37:12.600 know like how long it'll take but I
05:37:14.440 think it is couple of days or maybe
05:37:17.558 weeks I don't really know I I I have
05:37:19.798 never deployed any application to App
05:37:22.200 Stores but I'll just provide you some
05:37:24.600 notes that you can keep in mind so that
05:37:27.480 you just really know the steps okay so
05:37:30.080 I'll just go ahead and paste this in and
05:37:31.920 let me walk you through it so building
05:37:34.000 and Publishing your application you can
05:37:36.638 build your app for production with Expo
05:37:39.718 application services and I have some
05:37:42.320 links that I'll just provide in a second
05:37:44.878 and if you want to submit it to Google
05:37:47.000 Play store or App Store you will need a
05:37:49.600 developer account and then it would take
05:37:52.040 couple of days or weeks as I have just
05:37:54.360 mentioned and then if it is accepted I
05:37:57.360 think it'll just go live immediately and
05:38:00.480 I guess like I believe there is also
05:38:03.200 beta version and then the actual version
05:38:07.920 so if it is not accepted completely the
05:38:10.638 beta version will be live I might be
05:38:12.958 wrong just let me know this is something
05:38:14.840 that I have seen uh haven't really
05:38:17.160 experienced it fully but it's really
05:38:19.840 nice to know this right then here are
05:38:22.760 two different links that you can take a
05:38:25.040 look from the Expo documentation you can
05:38:28.480 build your project for app stores and
05:38:31.240 you can submit it to app stores right
05:38:34.280 and there is even a video explanation so
05:38:37.680 there is really no excuses to not deploy
05:38:41.478 it if you really want to you can like
05:38:44.160 you should definitely take a look at
05:38:45.840 these documentations and just make that
05:38:48.558 work and then what the hell let's delete
05:38:52.080 this then like there are a couple of
05:38:54.478 different steps that I take note and I'd
05:38:57.638 like to walk you through it so first
05:38:59.558 things first you need to visit expo. Dev
05:39:02.280 and sign up so I have just said you can
05:39:04.798 use the EAS to build to our applications
05:39:08.718 and since this is since this is the
05:39:12.040 service of Expo you should visit their
05:39:15.120 website and sign up which is free I
05:39:18.280 believe let's take a look at the pricing
05:39:20.798 here we go like there they have a free
05:39:22.958 plan and 30 mobile application builds
05:39:25.840 per month that's pretty cool
05:39:28.478 right and then like there is even submit
05:39:31.680 to App Store
05:39:34.878 option okay so you just went ahead and
05:39:37.840 signed up then here is what you would do
05:39:40.638 in your terminal install the E EAS CLI
05:39:44.798 globally then you would log in with this
05:39:47.478 command so these are everything that you
05:39:49.400 would do in your terminal right so you
05:39:51.680 would run this one first then this one
05:39:54.280 and then you would say EAS in it and
05:39:57.040 this will ask you to create a project
05:39:59.798 and you can just say
05:40:02.000 yes okay let me just fix that then if
05:40:05.080 you want to build it for Android you
05:40:07.440 should say EAS built platform Android
05:40:11.400 and this will give you an APK file which
05:40:14.520 is the file format that is used by
05:40:17.200 Android operating system to install and
05:40:22.200 distribute uh applications right in the
05:40:25.160 same way you would do it for iOS and
05:40:28.000 then it would give you IPA file so this
05:40:31.478 is for iOS and this is for Android and
05:40:35.040 then you would take those files and sub
05:40:37.280 sub it to play store or App Store so
05:40:41.000 once again there is no excuses to not do
05:40:43.638 these if you really want to and then
05:40:46.080 your actual challenge is to publish this
05:40:48.558 application and if it went live
05:40:51.280 successfully you could let us know and
05:40:54.200 you know I can just do a shout out then
05:40:56.440 we can give you some starts and that
05:40:58.558 would be a really cool project for your
05:41:01.160 resum so with that if you were able to
05:41:03.920 follow along up until now I don't have
05:41:06.718 anything to say other than
05:41:08.520 congratulations it is 3:00 a.m. in the
05:41:10.958 morning and I am going to bed straight