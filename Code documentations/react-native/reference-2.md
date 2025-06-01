# 📱 React Native Full Stack App Setup – Step-by-Step Guide (Expo + NativeWind)

## 📦 Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Mobile device with **Expo Go**
- IDE (e.g. WebStorm or VS Code)
- Git (optional)

---

## 🚀 1. Project Initialization

```bash
npx create-d-expo-app@latest .
````

Choose a **blank TypeScript template**.

---

## 🧹 2. Clean Boilerplate (Optional but Recommended)

```bash
npm run reset-project
# Select “Move files to app-example” and delete them
```

---

## 📁 3. Folder Structure (After Reset)

```plaintext
/
├── app/                 # Screens & routes
├── assets/              # Fonts, images
├── constants/           # Theme & design tokens
├── styles/              # Custom styles
├── components/          # Shared components
├── hooks/               # Custom React hooks
├── app.json             # Expo config
├── babel.config.js      # Babel plugin config
├── tailwind.config.js   # Tailwind/NW config
```

---

## 🎨 4. Install & Setup Tailwind with NativeWind

### A. Install Dependencies

```bash
npm install nativewind tailwindcss \
  react-native-reanimated \
  react-native-safe-area-context
```

### B. Tailwind Config

```bash
npx tailwindcss init
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0314ff",
        secondary: "#151312",
        light: {
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AA"
        },
        dark: {
          100: "#221f3d",
          200: "#0f0d23"
        }
      }
    },
  },
  plugins: [],
}
```

---

## ⚙️ 5. Babel & Metro Config Setup

### Babel

Create `babel.config.js` if not already present:

```js
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ["nativewind/babel"],
};
```

### Metro (if using custom CSS)

```bash
npx expo customize metro.config.js
```

Then wrap config:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

module.exports = withNativewind(getDefaultConfig(__dirname));
```

---

## 🧼 6. Global Styling (Optional but Recommended)

### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Enable Typings (optional but useful)

Create `nativewind-env.d.ts`:

```ts
/// <reference types="nativewind/types" />
```

---

## 💡 7. File-Based Routing with Expo Router

Expo Router uses the file name as the route.

### Example:

```plaintext
app/
├── index.tsx            // Home (/)
├── search.tsx           // Search (/search)
├── saved.tsx            // Bookmarks (/saved)
├── profile.tsx          // Profile (/profile)
├── (tabs)/_layout.tsx   // Tab Navigator Group
├── (auth)/login.tsx     // Route group with auth logic
├── movies/
│   └── [id].tsx         // Dynamic route (/movies/:id)
```

Use `<Link href="/search">` for navigation.

---

## 🧭 8. Navigation Setup (Tab + Stack)

### A. `_layout.tsx` in `app/(tabs)`

```tsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
```

---

## 💅 9. Applying Tailwind Styles

Use `className` prop:

```tsx
<View className="flex-1 justify-center items-center bg-dark-200">
  <Text className="text-primary text-3xl font-bold">Hello React Native</Text>
</View>
```

---

## 🖼️ 10. Core Components You’ll Use Often

| Component             | Purpose                          |
| --------------------- | -------------------------------- |
| `View`                | Wrapper like `div`               |
| `Text`                | For displaying strings           |
| `Image`               | Static and remote images         |
| `ImageBackground`     | Background visuals               |
| `FlatList`            | Large performant lists           |
| `ScrollView`          | Scrollable containers            |
| `SafeAreaView`        | Layout padding for notches etc.  |
| `TouchableOpacity`    | Pressable element (like buttons) |
| `Modal`, `Alert`      | UI dialogs                       |
| `Switch`, `StatusBar` | Controls & status indicator      |

---

## ✅ 11. Test Your Setup

Start the server:

```bash
npx expo start --clear
```

Scan the QR code in Expo Go.

If styling isn’t applied:

* Ensure Babel & Metro configs are correct
* Restart with `--clear`
* Confirm Tailwind directives are in `globals.css`

---

## 📌 Next Steps

* Create screens with reusable components
* Fetch movie data via 3rd party API
* Add trending algorithm and persistence with database (Convex, Supabase, etc.)
* Implement search functionality
* Set up authentication
* Deploy (EAS Build or Expo Dev Client)

---

## 📎 Resources

* [Expo Router Docs](https://expo.github.io/router/docs)
* [NativeWind](https://github.com/marklawlor/nativewind)
* [React Native Components](https://reactnative.dev/docs/components-and-apis)
* [Tailwind Color Palettes](https://tailwindcss.com/docs/customizing-colors)

---


Time Stamps 👇
00:00:00 — Intro
00:02:12 — Why React Native?
00:06:00 — React Native Fundamentals
00:16:34 — Project Overview
00:18:34 — Intro & Setup
00:27:01— Setup Styling
00:35:56 — Routing & Navigation
00:58:28 — Customize App Title & Icon
01:00:41 — Home Screen UI
01:09:39 — TMDB API
01:19:06 — Custom Hook
01:25:38 — Fetch & Display Movies
01:45:59 — Develop Search Screen
02:04:36 — Appwrite Setup
02:22:01 — Show Trending Movies
02:38:50 — Hide StatusBar
02:41:16 — Movie Details
03:02:09 — Optimization

---

# tactiq.io free youtube transcript
# React Native Course for Beginners in 2025 | Build a Full Stack React Native App
# https://www.youtube.com/watch/f8Z9JyB2EIE

00:00:00.199 the existence of react native makes
00:00:02.600 react one of the most valuable skills
00:00:04.680 you can learn think about it about 75%
00:00:08.160 of what you already know from building
00:00:09.800 websites carries over to mobile
00:00:11.840 development and that's exactly what you
00:00:13.880 learn in this video I used to compare
00:00:15.719 react native to react but now it's more
00:00:18.560 like nygs because now on mobile you can
00:00:21.720 do everything from file based routing
00:00:24.439 and component driven architecture to API
00:00:27.000 routes even react server components
00:00:29.480 react native is evolving fast and this
00:00:32.520 crash course will help you keep up hi
00:00:34.680 there I'm Adrien and welcome to the
00:00:37.280 ultimate react native crash course in
00:00:39.600 this course you'll learn react native
00:00:41.719 from scratch Master the latest features
00:00:44.480 and build a modern fully functional app
00:00:47.600 we'll start with a quick look at react
00:00:49.879 native's Journey why react native is the
00:00:52.280 go-to choice and how it actually works
00:00:54.320 an introduction to Expo the official
00:00:56.760 react native framework mastering core
00:00:59.120 building blocks file structures routing
00:01:01.879 and more and then we'll dive straight
00:01:04.400 into building a fully featured movie app
00:01:07.520 with a home screen that has the top
00:01:09.680 trends feature showing the hottest
00:01:11.479 movies using an algorithm that you'll
00:01:13.799 write and that will power using the open
00:01:16.320 source tool called aite and you'll also
00:01:18.759 be able to see some latest movies here
00:01:20.960 then of course there's the custom tab
00:01:22.960 navigation as search screen to find any
00:01:25.680 movie in seconds and a full movie
00:01:28.200 Details page where you can get all the
00:01:30.360 info you need and more but this course
00:01:33.439 isn't just about building an app it's
00:01:35.399 about building it the right way by
00:01:37.600 writing clean scalable and maintainable
00:01:40.920 code and to make your journey even
00:01:42.799 easier I've put together a free react
00:01:45.200 native roadmap that covers the essential
00:01:47.320 tools you need to know the projects you
00:01:49.200 should build and the exact path to
00:01:51.520 getting hired as a react native
00:01:53.200 developer you can download it now it's
00:01:55.240 completely free and the link is in the
00:01:56.920 description so by the time you finish
00:01:59.119 this course you won't just know react
00:02:01.840 native you'll be shipping relaps with
00:02:03.799 confidence so let's build something
00:02:11.879 great before react native building
00:02:15.000 mobile applications for multiple
00:02:17.040 platforms was a nightmare you had to
00:02:20.160 write separate code bases for IOS and
00:02:22.840 Android which meant double the work
00:02:25.360 higher costs and slower development
00:02:27.879 Cycles but with react native you can
00:02:30.920 write a single code base that works
00:02:33.200 seamlessly on both platforms making
00:02:35.720 development faster cheaper and more
00:02:38.200 efficient and it's not just me saying
00:02:40.680 this big companies like meta Discord
00:02:44.159 Microsoft Tesla Amazon Airbnb and even
00:02:47.760 Call of Duty use react native to build
00:02:50.480 their mobile apps react native has
00:02:52.879 evolved so much that you'll find fewer
00:02:55.400 people flattering these days and with
00:02:57.760 the release of react's new architecture
00:03:00.280 performance has been improved
00:03:02.400 significantly so the next time someone
00:03:04.959 says Hey react native apps are slow just
00:03:08.599 take a deep breath and say not anymore
00:03:11.799 flut boy let me break it down first
00:03:14.560 there's the new JSI JavaScript interface
00:03:17.840 which replaces the old bridge allowing
00:03:20.560 JavaScript to communicate directly with
00:03:22.840 the native code for a faster and
00:03:25.080 smoother performance then there are the
00:03:27.640 new turbo modules that load native
00:03:30.159 modules only when needed reducing
00:03:32.519 startup time and memory usage and third
00:03:35.799 there's a new thing called fabric which
00:03:38.280 optimizes UI rendering making animations
00:03:41.519 gestures and updates faster and more
00:03:44.480 efficient with JSI turbo modules and
00:03:47.879 fabric react native apps are now as fast
00:03:51.120 and smooth as the native ones and aside
00:03:53.920 from its new architecture crossplatform
00:03:56.000 support and Native components react
00:03:58.680 native also comes with hard reloading
00:04:01.200 allowing you to see the changes you code
00:04:03.079 instantly a huge community that just
00:04:05.480 keeps on growing and an easy learning
00:04:08.159 curve which means that if you already
00:04:10.000 know JavaScript and react you can
00:04:12.040 quickly pick up react native and that's
00:04:14.439 exactly what we'll do today in this
00:04:17.238 video we'll use Expo to build a react
00:04:20.199 native application and before you say
00:04:22.720 wait real developers don't use Expo hold
00:04:26.120 on if you check react natives official
00:04:28.759 documentation Expo is the recommended
00:04:31.360 way to get started read that again but
00:04:35.000 what the heck even is Expo you're
00:04:37.039 familiar with tools like vit right well
00:04:39.880 Expo is just that only for react native
00:04:42.639 apps it provides many tools and services
00:04:45.759 that simplify development and help you
00:04:48.000 build your app more easily Expo is the
00:04:50.960 react native what nextjs is the react
00:04:54.600 it's a framework that simplifies react
00:04:56.759 native development by handling the
00:04:58.919 development enir setup which means that
00:05:01.120 you don't need to separately install
00:05:02.840 Android Studio native dependencies and
00:05:05.479 pre-built components for navigation
00:05:07.919 gestures camera maps and more it also
00:05:10.680 supports something known as overthe a
00:05:12.800 updates so your app users can get the
00:05:15.400 latest code without needing App Store
00:05:18.120 approvals and this is huge with Expo you
00:05:21.560 can deploy your app in minutes but don't
00:05:24.319 just take my word for it companies like
00:05:26.639 Discord Burger King coinbase X box and
00:05:30.479 more than 2,000 companies are using Expo
00:05:32.800 for their tools and Expo just like njs
00:05:36.800 just keeps on getting better so if you
00:05:39.199 still think react native CLI is the
00:05:41.039 better option well think twice so now
00:05:43.520 that you understand the importance of
00:05:45.120 react native and apparently how easy it
00:05:47.720 is to build apps with it let me show you
00:05:50.240 I'll first teach you some basic react
00:05:52.160 native Concepts and then very quickly
00:05:54.600 into this video you'll build a real
00:05:57.360 mobile movie application so let's Dive
00:06:00.400 Right In all right let's Jump Right In
00:06:03.560 we've already talked about the benefits
00:06:05.280 and drawbacks of react native and how
00:06:07.720 Expo can make your life easier now it's
00:06:10.400 time to dive into the code and see how
00:06:12.280 it works if you worked with react GS
00:06:15.680 before you'll find that react native
00:06:17.680 uses a similar syntax but of course
00:06:20.599 there are some differences you should be
00:06:22.280 aware of so let me show you the ins and
00:06:24.880 outs of react native code we can check
00:06:26.880 out how it looks and how it functions
00:06:28.880 when compared to to react GS to help you
00:06:31.599 understand the similarities but also the
00:06:33.840 differences between the two so super
00:06:35.880 quickly you'll understand the react
00:06:37.720 native's components and how to use them
00:06:39.919 when coding in react native you use
00:06:42.400 JavaScript just like with react but
00:06:45.599 instead of rendering HTML elements
00:06:48.000 you'll be rendering native mobile
00:06:50.919 components take a look at this basic
00:06:53.199 react native component here we're
00:06:55.720 importing two important components from
00:06:58.000 react native Library View and text then
00:07:01.639 we create a functional component called
00:07:03.520 app that Returns the text component
00:07:05.800 wrapped inside of a view what's
00:07:07.560 interesting here is that we're using jsx
00:07:09.840 syntax which makes it super easy to
00:07:12.280 create and visualize our components in a
00:07:14.759 more HTML like way but if you take a
00:07:17.479 closer look you can quickly see that
00:07:19.319 this is neither a P tag nor an H tag nor
00:07:22.960 anything that we're used to while
00:07:24.400 writing code that runs in the browser in
00:07:27.199 react native we use text instead said
00:07:30.520 it's pretty straightforward the text
00:07:32.160 component is used to display text in the
00:07:34.599 app and you can style it using the same
00:07:36.759 CSS like syntax as in react you can set
00:07:39.599 the font size color and weight using the
00:07:42.160 style prop react native also offers a
00:07:45.039 Styles sheet utility that allows you to
00:07:47.560 Define styles by creating a single
00:07:49.720 JavaScript object this is super handy in
00:07:52.120 larger applications as it optimizes
00:07:54.319 performance but as we all know tailin
00:07:56.800 CSS is rising in popularity so so in
00:08:00.000 react native World native wind came into
00:08:02.440 the picture allowing you to write
00:08:04.400 Tailwind likee CSS Styles in react
00:08:06.759 native isn't this crazy it feels like
00:08:09.080 you're writing a regular web app but
00:08:11.479 instead you're developing apps for
00:08:13.240 mobile now let's talk a bit about the
00:08:15.479 view component think of it as a box or
00:08:18.520 container that holds other components
00:08:21.360 similar to the development in HTML but
00:08:24.039 with some added functionality specific
00:08:25.759 to mobile apps The View component is
00:08:28.280 often used to create layout structures
00:08:31.000 for other
00:08:32.240 components it has many different props
00:08:34.799 that can be used to control its
00:08:36.279 appearance and
00:08:37.719 behavior and one thing to note is that
00:08:40.159 the view component uses flexbox layout
00:08:43.000 by default which makes it really easy to
00:08:45.839 control how its children components are
00:08:47.839 laid out so you can use flexbox
00:08:50.440 properties like Flex Direction justify
00:08:53.040 content and align items to achieve any
00:08:55.800 layout you want but what if you want to
00:08:57.839 add some interactivity to your re act
00:08:59.680 native apps well get excited because
00:09:02.160 there are some amazing components that
00:09:04.160 do just that components for creating
00:09:06.320 buttons links and other interactive
00:09:08.959 elements the first one on the list is
00:09:11.760 touchable opacity which is great if you
00:09:13.920 want to create a simple button think of
00:09:15.800 it like a cousin to a react button
00:09:18.120 component but with even more room for
00:09:20.680 customization and instead of an onclick
00:09:22.920 in react native you're not clicking it
00:09:25.160 you're pressing it so let's provide an
00:09:27.440 on press the second similar component is
00:09:30.320 called a touchable highlight which
00:09:32.760 allows views to respond to touch in a
00:09:35.680 unique way when touched the component
00:09:38.640 reduces the opacity of the wrapped div
00:09:41.279 revealing the underlying color and then
00:09:43.680 there's the touchable without feedback
00:09:45.839 which is there if you need to create an
00:09:47.279 element that is clickable but you don't
00:09:50.040 want it to have any visual feedback when
00:09:52.240 pressed it is super useful when creating
00:09:55.079 links or images that don't need any
00:09:57.360 additional effects and apart from these
00:09:59.640 touchable components there's also
00:10:01.600 activity indicator which allows you to
00:10:03.839 show a spinner or a loading indicator
00:10:06.600 within your app sure there's also a
00:10:08.519 simple button allowing you to set
00:10:10.360 properties like the title color and an
00:10:12.880 on press that is called when the button
00:10:14.920 is pressed but whenever you need some
00:10:16.720 more Advanced Styling or behavior you'll
00:10:19.399 find yourself using the touchable
00:10:21.040 components much more often as they offer
00:10:23.560 greater flexibility now the next super
00:10:26.480 important component on the list of
00:10:28.399 components I want toach teacher right
00:10:29.880 now and which we'll use later on within
00:10:32.079 our app is called a
00:10:34.560 flatlist a flatlist is perfect for
00:10:37.760 rendering long lists of items that need
00:10:40.839 to be scrolled it's like the map
00:10:43.160 function in react but with some extra
00:10:45.480 features like optimized scroll
00:10:47.519 performance and item separation the way
00:10:50.079 it works is you of course import it from
00:10:52.360 react native and then you define some
00:10:54.800 data such as an array of objects you
00:10:56.760 want to map over then you put it all in
00:10:59.600 a view and you call it flatlist a
00:11:03.200 flatlist by default already accepts some
00:11:05.880 props such as the data prop to which you
00:11:08.240 can pass an array of data you want to
00:11:10.079 map over and then a render item prop
00:11:13.079 which allows you to Define exactly how
00:11:15.839 you want to represent each item in the
00:11:18.200 array pretty cool right now when should
00:11:21.079 you use a flat list and when should you
00:11:23.560 just map over the
00:11:25.079 elements well for larger lists where you
00:11:27.959 want to have smooth scrolling
00:11:29.839 go for the flat list while for the
00:11:32.040 smaller lists the map function will do
00:11:34.120 the job there's also something known as
00:11:35.880 a scroll view you can think of it like a
00:11:38.680 magic box that can hold multiple
00:11:40.760 components and Views providing you a
00:11:42.800 scrolling container for them it's like
00:11:45.160 the Overflow scroll property of a div in
00:11:47.600 HTML allowing you to easily navigate
00:11:50.560 through a list of items or large amounts
00:11:52.920 of content in our app you can put it
00:11:54.600 within a view call it scroll View and
00:11:56.839 then render some elements within it by
00:11:58.600 using the scroll view component you can
00:12:00.600 make sure that users can easily explore
00:12:02.720 all the content making your app more
00:12:04.959 intuitive and there's also a component
00:12:06.880 which you'll find yourself using super
00:12:08.839 often called safe area view which gives
00:12:12.160 you some sort of a safe Zone to render
00:12:14.519 your apps content within without it
00:12:16.800 being covered by the devices Hardware
00:12:18.959 features like the notch home indicator
00:12:21.800 or a status bar it's great for building
00:12:23.959 apps that are supported on different
00:12:25.720 devices with different screen sizes and
00:12:28.160 shapes the way you use it is whenever
00:12:30.959 you think something might be too long or
00:12:32.959 awkwardly placed you just wrap it within
00:12:34.920 a safe area View and while that default
00:12:37.279 safe area view is amazing for most cases
00:12:40.440 sometimes it does fall short for some
00:12:42.320 devices making it not the optimal choice
00:12:45.360 so I often like to use a package called
00:12:47.920 react native safe area context which
00:12:50.560 works across all devices even for the
00:12:53.199 Bottom bar but you don't have to worry
00:12:55.040 about remembering all of that right now
00:12:56.839 I'll show it to you once you start
00:12:58.480 developing your own first app but bear
00:13:01.360 with me for a moment I first want you to
00:13:03.399 know which components exist so we can
00:13:05.839 later on use them more easily for
00:13:07.839 example we'll surely have to display
00:13:09.800 some images within our app right so how
00:13:12.120 can we do that in react native well
00:13:14.519 thankfully once again it is super
00:13:16.519 similar to how it looks like in react
00:13:18.760 you just use the image component
00:13:20.199 provided by react native you pass the
00:13:22.360 source to it which can be a path or a
00:13:24.480 URL and you're good but if you want to
00:13:27.079 display an image as a background then
00:13:29.760 you should use the image background
00:13:31.600 component which works in the same way
00:13:33.839 but just renders it as a background it's
00:13:36.240 specifically designed to allow other
00:13:38.560 components to be layered on top of it
00:13:41.040 whereas just the image is used for
00:13:43.279 displaying images on their own and both
00:13:45.519 of these can handle different image
00:13:47.000 formats like pngs jpegs gifs and web PS
00:13:50.839 but nons support SVG files because of
00:13:53.920 some native rendering limitations so if
00:13:56.320 you want to use svgs there's a
00:13:58.240 thirdparty package called react native
00:14:00.240 SVG once again don't try to remember it
00:14:03.079 I'll show it to you once again later on
00:14:04.959 so you can use it within your own code
00:14:07.399 okay now that you know how to use images
00:14:09.680 what about models well thankfully react
00:14:12.199 native has components for that too it's
00:14:14.399 called a model just import it from react
00:14:17.040 native set visible to True add an
00:14:19.839 animation type and Define what happens
00:14:22.399 when you close it pretty simple there's
00:14:24.759 also an alert component which you can
00:14:26.839 again just very conveniently report from
00:14:29.519 react native and call it by saying
00:14:32.120 alert. alert provide a title and
00:14:35.199 functions which you want to execute on
00:14:37.199 cancel or on okay and if you're creating
00:14:39.920 forms you might want to create some kind
00:14:41.720 of a toggle in react native and for that
00:14:44.440 you can use a switch component once
00:14:46.880 again it is super simple imported create
00:14:50.079 a state for it same as in
00:14:52.519 react create a function that manages it
00:14:55.440 and then simply call it like this within
00:14:56.959 your code provide some colors its value
00:15:00.240 and what happens when you click it
00:15:02.079 there's also a component that I use
00:15:03.880 super often called the status bar both
00:15:06.720 react native and Expo have their own
00:15:09.160 versions that allow you to control how
00:15:11.040 status bar should look like for each
00:15:12.920 screen within the app I prefer using the
00:15:15.279 one from Expo you can define a view with
00:15:17.560 some text and just beneath it you can
00:15:19.959 define a status bar but what am I even
00:15:22.440 trying to do I'm just listing all of the
00:15:24.680 different components that you can use to
00:15:26.759 build your mobile applications well I I
00:15:29.120 guess I'm just trying to show you that
00:15:31.160 there are some differences like P tags
00:15:33.639 and H tags are now becoming text divs
00:15:36.600 are becoming views but other than that
00:15:39.199 there are so many components that feel
00:15:42.120 like you're writing react code within
00:15:44.399 react native allowing you to build
00:15:46.959 mobile applications from touchable
00:15:49.160 opacities for buttons to models alerts
00:15:52.360 and more the list doesn't stop there of
00:15:55.360 course I don't want to waste your time
00:15:57.240 we're not going to go through every
00:15:58.600 single component that exists in this
00:16:00.680 video but I did take some time and I
00:16:03.120 wrote down the most important ones
00:16:05.319 within the free react native guide
00:16:07.120 Linked In the description so if you want
00:16:08.920 to check them out there see the
00:16:10.399 differences and similarities and just
00:16:12.279 have a place where you can recap what
00:16:13.839 you learned that guide is what you need
00:16:16.040 but now that you know the most important
00:16:17.839 components and Concepts in react native
00:16:20.240 let's Dive Right into action I'll show
00:16:22.160 you how to set up your app what files
00:16:24.120 and folders are involved and everything
00:16:26.360 else that matters step by step
00:16:35.040 step all right before we dive into the
00:16:37.839 development of the movies app let me
00:16:39.680 quickly tell you what you'll build and
00:16:41.639 learn along the way you'll get the
00:16:43.680 firsthand opportunity to put into code
00:16:46.319 many components I was just telling you
00:16:48.040 about a couple of minutes ago core react
00:16:50.279 native components like view touchable
00:16:52.560 opacity image flat list scroll view safe
00:16:55.720 area view text input and more different
00:16:58.399 Navigation like stack navigation tab
00:17:01.120 navigation with custom styling and
00:17:03.560 advanced file based routing including
00:17:06.000 nested and dynamic routes custom Hooks
00:17:09.439 and fonts to make your app more flexible
00:17:11.599 and reusable types and interfaces with
00:17:14.480 typescript for better type safety
00:17:16.799 responsive design to ensure the app
00:17:18.919 looks great on any screen of course
00:17:21.640 Tailwind CSS for clean and scalable
00:17:24.240 design backend with aite to handle data
00:17:27.599 and user interactions and many other
00:17:30.120 best practices we'll go step by step and
00:17:33.280 I'll teach you to implement amazing
00:17:35.120 stuff which you'll see yourself using
00:17:37.120 across any future apps you build like a
00:17:39.799 search feature with optimized
00:17:41.480 performance fetching movies data from a
00:17:43.880 thirdparty API smooth loading and air
00:17:47.280 handling and then a trending movies
00:17:49.919 algorithm that tracks user searches and
00:17:52.559 helps us recommend the most popular
00:17:54.720 movies based on real user activity
00:17:57.600 pretty cool right will use aight to
00:17:59.880 store that user activity for this
00:18:01.600 algorithm to work so let's quickly
00:18:03.760 create an account click the link down in
00:18:05.960 the description to be able to follow
00:18:07.720 along and see exactly what I'm seeing
00:18:10.000 create your account at the top right or
00:18:12.240 just sign in as you can see I'm using
00:18:14.679 app right for many of my projects and
00:18:17.320 now you can just create a new one for
00:18:18.919 this one I'll call it
00:18:20.919 JSM RN movie app you can do something
00:18:25.039 similar and you can choose the region
00:18:27.400 and click create now with can set up our
00:18:29.320 project's file and folder structure and
00:18:31.559 very soon we'll put this project to
00:18:34.840 use let's get started with developing
00:18:37.400 our app by first setting up our
00:18:39.360 development environment I've created a
00:18:41.360 new empty folder on my desktop called it
00:18:43.960 mobile movie app and opened it up within
00:18:46.679 my IDE throughout this course I'll be
00:18:48.880 using webstorm the most powerful
00:18:51.320 JavaScript and typescript IDE until
00:18:53.520 recently it was paid so not everyone was
00:18:55.880 able to use it but as of now it is
00:18:58.799 completely free for noncommercial use
00:19:01.200 I'll leave the link in the description
00:19:02.799 you can check it out and download it for
00:19:04.640 your operating system once you install
00:19:06.600 it you can set it up to look exactly how
00:19:08.480 you want it to look currently I'm using
00:19:10.480 the material deep ocean theme and lately
00:19:13.080 I prefer using it over vs code so once
00:19:15.640 you create an empty folder in whichever
00:19:17.520 editor you're using we can create our
00:19:19.400 new react native application if you head
00:19:21.720 over to react native. deev click get
00:19:24.799 started you'll notice that there are a
00:19:26.640 couple of different ways in which you
00:19:28.080 can initialize your react native
00:19:29.799 projects and as I've mentioned in the
00:19:31.440 crash course the recommended way of
00:19:33.200 course is Expo it'll provide us with a
00:19:35.480 lot of important features out of the box
00:19:37.440 making our development experience that
00:19:39.440 much better so to start your react
00:19:41.880 native app with Expo the only thing you
00:19:43.840 have to do is run this command in your
00:19:46.120 terminal so let's write it together by
00:19:48.799 opening up the terminal and running MPX
00:19:52.039 create D xo- app add latest and then add
00:19:56.919 slash to install it in the current
00:19:58.679 directory now it'll proceed to install
00:20:00.880 all the necessary packages that we need
00:20:02.760 to run a react native application and
00:20:04.679 you can see that it's also starting to
00:20:06.000 create our file and folder structure
00:20:08.600 very soon I'll explain exactly what all
00:20:10.679 of these files and folders mean and what
00:20:12.679 they do once it gets installed you'll be
00:20:14.880 able to run it now going back to the
00:20:16.919 docs it says Hey run this command and
00:20:19.559 then continue with Expo and when you
00:20:21.400 click it it'll show you how you can set
00:20:23.200 up your development environment no
00:20:24.840 matter which device you're using in this
00:20:26.720 case I'll be using a real iOS device but
00:20:29.400 you can also use an Android then it's
00:20:31.440 asking you how you would like to develop
00:20:33.400 and we'll be using Expo go so depending
00:20:35.480 on your operating system you'll be able
00:20:37.120 to scan the QR code to download it or
00:20:39.480 visit the expoo page on the App Store
00:20:41.799 once you install it you'll be able to
00:20:43.400 create your account and your screen
00:20:45.039 should look something like this so the
00:20:47.240 first thing we have to do is start a
00:20:49.240 development server by running MPX Expo
00:20:52.039 start so back within our terminal let's
00:20:54.240 do just that run MPX expose start and
00:20:57.640 you'll be able to see different letters
00:20:59.159 that allow you to do different things
00:21:01.039 but you don't have to press any of them
00:21:02.880 what you have to do is just scan this QR
00:21:05.600 code so I'll open up my camera and scan
00:21:08.440 it right here it'll say bundling and in
00:21:11.480 a couple of seconds the app will run on
00:21:13.840 your phone there we go we are live as I
00:21:17.720 mentioned we don't need to rely on heavy
00:21:20.080 tools like Android Studio or xcode
00:21:22.679 instead we're using this easiest method
00:21:24.720 to develop apps with react native which
00:21:27.000 of course includes this Expo app on your
00:21:29.000 phone and as you can see I can switch
00:21:30.840 between different pages touch different
00:21:32.520 elements on the screen and it feels like
00:21:34.520 I'm using a real mobile application now
00:21:37.279 if you're not seeing what I'm seeing on
00:21:38.760 the screen then that must mean that
00:21:40.520 you're having some problems and
00:21:42.080 thankfully there is a couple of quick
00:21:43.720 fixes first make sure that you're on the
00:21:46.279 same Wi-Fi network on your computer and
00:21:48.679 your device and if it still doesn't work
00:21:51.400 it may be due to the router
00:21:52.640 configuration common for public networks
00:21:55.200 on iOS you might have to Grant the local
00:21:57.799 network permission to the Expo Go app or
00:22:00.200 you can try using this MPX Expo start--
00:22:03.200 tunnel or just read whatever the Expo
00:22:05.240 app is saying and try resolving it step
00:22:07.520 by step but with that in mind we are now
00:22:09.640 ready to make our first change to do
00:22:11.679 that we can head over within our app
00:22:14.120 tabs index. TSX and if you see this
00:22:17.559 welcome theme text you can say something
00:22:20.400 like
00:22:21.640 welcome to my movie app because that's
00:22:25.080 exactly what we're building if you save
00:22:27.279 it you can see that it'll change
00:22:29.200 immediately and we can remove this wave
00:22:31.360 so this means that we have established a
00:22:33.039 connection between our code and our
00:22:35.440 device so we can see all the changes
00:22:37.279 live now that our project is running let
00:22:39.600 me quickly explain what each one of the
00:22:41.440 files and folders here does so you have
00:22:43.520 a better understanding of the entire
00:22:44.960 codebase so you can more confidently
00:22:47.000 make changes to your application later
00:22:48.559 on let's start from the bottom to the
00:22:50.320 top first we have the TS config which
00:22:53.360 contains the rules that typescript will
00:22:55.240 use to enforce type safety throughout
00:22:57.200 the project and no worries you don't
00:22:59.360 need to know typescript to be able to
00:23:00.919 proceed with this course I'll teach it
00:23:02.640 to you as we go next we have the read me
00:23:05.919 which is a text file containing some
00:23:07.440 information about the project then
00:23:09.440 there's the package lock and
00:23:11.400 package.json which contains the project
00:23:13.960 scripts dependencies and additional
00:23:16.840 metadata after that there's the app.
00:23:19.720 Json file which contains the
00:23:21.559 configuration options for the project
00:23:23.600 and is often called the app config these
00:23:26.919 options change the behavior of your
00:23:29.200 project while developing building
00:23:31.559 submitting or updating your app
00:23:33.520 everything starts with an expo object
00:23:35.960 which is the root object containing all
00:23:37.919 the app configuration then of course
00:23:39.919 there's the app name shown on the home
00:23:42.120 screen or the app screen very important
00:23:44.600 in case you want to make it custom then
00:23:46.880 there's the slug which is a unique
00:23:48.679 identifier for the project used by Expo
00:23:51.440 it's used when defining the URL if you
00:23:53.440 want to show your project in the web
00:23:55.559 there's the version of the project the
00:23:57.960 orientation ation which defines whether
00:24:00.000 your app should initially open in
00:24:01.799 portrait landscape or the default screen
00:24:04.559 orientation mode the icon is the full
00:24:06.880 path to the image you want to display
00:24:09.279 the scheme is a custom URL to enable
00:24:11.799 deep linking in this case let's set it
00:24:14.480 to movies so later on we can do
00:24:17.360 something like movies Colin sl/ some
00:24:21.520 path there's also the user interface
00:24:23.720 style which we can leave to automatic
00:24:26.320 this determines the dark or light mode
00:24:28.760 and then there's this new Arch enabled
00:24:31.279 which enables the new architecture of
00:24:33.200 react native for better performance it
00:24:35.399 was that thing that I talked to you
00:24:36.760 about in the crash course part regarding
00:24:38.760 JSI turbo modules and more and what's
00:24:41.880 best is that Expo immediately supports
00:24:44.360 this new architecture without you having
00:24:46.360 to do anything along with this you're
00:24:49.120 also getting the newest react features
00:24:51.200 like transitions moving on we have IOS
00:24:54.360 specific features that you can extend
00:24:56.480 specifically on iOS devices in this case
00:24:58.960 you can define whether it supports
00:25:00.399 tablet devices and then there are also
00:25:03.000 Android specific properties such as apps
00:25:06.080 adaptive icon path to the image color
00:25:09.240 and more and similarly there's also
00:25:11.679 additional options for the web now
00:25:13.600 coming out of the app. Json there's of
00:25:15.919 course the git ignore which allows us to
00:25:18.080 ignore some environment variables or git
00:25:20.600 related things there's the scripts
00:25:22.679 folder currently having just one part
00:25:25.279 which allows us to reset the project to
00:25:27.000 the bare minimum code and and then
00:25:28.600 there's some boilerplate code like
00:25:30.640 custom hooks constants some components
00:25:35.080 assets and finally the app folder which
00:25:38.240 allows us to route to different pages
00:25:40.559 similarly to
00:25:42.000 nextjs or in this case we're not calling
00:25:44.520 them Pages we're calling them screens
00:25:47.080 you can see this tabs group in which we
00:25:49.279 have more files within here you'll be
00:25:51.360 able to manage the layouts for different
00:25:53.080 pages and very soon I'll show you
00:25:55.200 exactly how it works there is a lot of
00:25:57.919 code but you don't have to memorize all
00:26:00.240 of this boilerplate code because I'll
00:26:02.520 teach you how everything works from
00:26:04.360 scratch so let's use this nice script
00:26:07.159 that Expo has given to us called reset
00:26:09.640 project which will set the project to
00:26:11.679 its bare minimum I'll stop the
00:26:13.360 application from running and then I will
00:26:15.279 run mpm run reset Das project it's going
00:26:19.480 to ask you whether you want to move
00:26:21.000 everything to the example folder I'll
00:26:23.640 say no just go ahead and delete it so as
00:26:26.200 you can see all of these folders have
00:26:27.840 been deleted deled and some new files
00:26:30.440 very Bare Bones have been created we can
00:26:32.960 once again run MPX expose start to start
00:26:36.600 the development
00:26:37.720 server and then you can just press the
00:26:39.840 letter R to reload it automatically on
00:26:42.559 your device now if you check it out
00:26:44.720 it'll look much simpler the app only
00:26:46.919 consists of a very simple layout and an
00:26:49.760 even simpler index. TSX page where we
00:26:52.919 can say welcome and we can dive right
00:26:56.000 into extending it to build our MO movie
00:26:58.520 application great job on completing the
00:27:02.559 setup we're done with the general setup
00:27:05.120 of the application but there are still
00:27:07.440 some things we got to set up such as
00:27:09.640 additional packages for styling and
00:27:12.000 configuration that will make our job
00:27:13.880 easier later on one of those packages is
00:27:16.840 called native wind native wind doesn't
00:27:19.360 even have its own landing page it just
00:27:21.520 says do you like using Tailwind CSS to
00:27:23.720 style your apps well this helps you do
00:27:26.399 that in react native so we use it for
00:27:28.760 that exact reason you can install it by
00:27:31.120 opening up a new terminal keep this one
00:27:33.559 running because it's the one running our
00:27:35.279 app and run mpm
00:27:37.840 install native wind Tailwind CSS react
00:27:43.480 native reanimated and react native safe
00:27:48.440 area context these are some packages
00:27:51.120 that are going to make our styling
00:27:52.240 easier let's give them a few moments
00:27:53.919 until they install and once that is done
00:27:56.640 run MPX Tailwind CSS init this will
00:28:01.080 generate our configuration file you can
00:28:03.559 find it within your code right here
00:28:05.600 Tailwind Doc config.js and you'll get a
00:28:08.519 default configuration but to make sure
00:28:10.840 it works properly with a react native
00:28:12.640 setup we'll need to update it a bit here
00:28:15.159 you want to include all the files that
00:28:17.120 you want ta into to style so in this
00:28:19.000 case everything within the app folder
00:28:21.200 that ends with JS jsx or TS or TSX and
00:28:25.120 we're also adding a babble preset so
00:28:27.760 just copy it from native winds Expo
00:28:29.880 setup and just override what you had in
00:28:31.919 the tailin config file finally create a
00:28:34.080 new file within the app folder and call
00:28:36.960 it global. CSS and within it you'll have
00:28:40.840 to import three things or rather add
00:28:44.399 three Tailwind directives Tailwind base
00:28:47.159 Tailwind components and Tailwind
00:28:49.399 utilities after that we'll have to set
00:28:51.600 up the Babel preset so copy this config
00:28:54.880 and create a new file in the root of
00:28:56.720 your directory called
00:28:59.120 Babel Doc config.js and paste what you
00:29:03.760 just copied after that we'll also have
00:29:06.519 to modify our Metro config so just copy
00:29:09.360 it open up your terminal and run MPX
00:29:13.480 Expo customize metro. config.js
00:29:18.799 this will generate that config file so
00:29:22.159 you'll be able to find it right here and
00:29:24.200 you can override it with what we just
00:29:25.840 copied from native wind get default
00:29:28.760 config with Native wind we wrap that
00:29:31.320 configuration and we set it up you don't
00:29:33.760 have to worry about understanding what's
00:29:35.360 happening here this is just the setup to
00:29:37.279 make the styling work finally we can
00:29:39.519 head over into our appor layout. DSX and
00:29:44.240 right here we can import the/ global.
00:29:48.039 CSS so we can actually apply some of
00:29:50.279 these Styles and then at the root of
00:29:52.559 your project create a new file called
00:29:55.880 native wind- EnV .
00:29:59.360 D.S and within it add a triple for slash
00:30:03.159 open up a new self-closing component
00:30:05.320 called reference and add types equal to
00:30:08.519 Native wind types this will enable tab
00:30:11.080 script to recognize tailin CSS classes
00:30:13.679 preventing constant error messages and
00:30:16.440 very quickly head over into your Metro
00:30:18.640 config and make sure that the input
00:30:21.279 points to the right path to our global.
00:30:23.840 CSS file so it is not/ global. CSS
00:30:28.919 rather it
00:30:30.640 isapp SL globals with an s. CSS this has
00:30:36.399 to match this global. CSS file once you
00:30:39.840 do it close all of your files and open
00:30:42.519 up your terminal to make sure that
00:30:44.679 everything we've done right now actually
00:30:46.559 works you'll have to restart your
00:30:48.399 application by pressing contrl
00:30:50.480 C and this can get boring pretty soon
00:30:53.320 but whenever something is not working or
00:30:55.240 your changes are not being reflected
00:30:57.159 just go ahead and set it it'll help so
00:30:59.679 start your app with a command MPX Expos
00:31:03.360 start-- clear this will make sure that
00:31:05.919 everything we've done actually gets
00:31:07.480 taken into account and then press R to
00:31:09.919 reload your application it'll first
00:31:11.760 bundle it and then depending on your
00:31:13.600 internet speed it'll download the code
00:31:15.760 and it'll display it right here on the
00:31:17.440 screen so while that is happening let me
00:31:20.240 head over into the index. DSX file and
00:31:23.240 now hopefully we can style our
00:31:25.159 applications using Tailwind instead of
00:31:27.440 these default Styles let's remove these
00:31:30.120 default inline Styles and instead let's
00:31:33.399 give it a class name and say something
00:31:36.320 like Flex
00:31:37.840 D1 justify Das Center and items - Center
00:31:42.440 which should keep it centered like it
00:31:44.440 did before and we can also style this
00:31:46.880 welcome by giving it a class name of
00:31:50.159 text- 5xl and by the way notice how my
00:31:53.799 webstorm IDE is giving me all of these
00:31:56.440 options in a super nice way so I
00:31:58.880 immediately know exactly which Styles
00:32:01.880 will each one of these tailin CSS
00:32:03.760 properties apply we can also give it a
00:32:05.679 text blue of 500 as well as font Das
00:32:09.360 bolt if you save it in a matter of
00:32:11.880 seconds you'll be able to see the
00:32:13.320 changes reflected on your device now
00:32:16.120 instead of saying something like text
00:32:18.240 Dash and then manually defining the
00:32:20.360 color like hash2 3 1 2 3 this is not
00:32:24.159 going to work right whenever you change
00:32:25.880 one color you have to change it across
00:32:28.200 hundreds of different files so what you
00:32:30.880 typically do when using Tailwind is
00:32:33.120 Define custom themes within your
00:32:35.080 configuration file so head over into
00:32:37.720 Tailwind Doc config.js and extend your
00:32:42.039 theme with some additional colors such
00:32:45.120 as a primary color of something like #
00:32:51.600 0314 now going back to your app you can
00:32:54.639 just say text- primary and and it'll
00:32:58.360 automatically take that color into
00:33:00.320 account pretty cool right so where did I
00:33:03.480 find this color well just below you'll
00:33:06.279 be able to find a link to a complete
00:33:08.440 figma design of this project you can go
00:33:10.720 through it a bit and if you go ahead and
00:33:12.880 click a couple of times on different
00:33:15.440 elements it'll tell you what is the
00:33:17.799 color of that specific element so for
00:33:20.240 example we have this accent color of AB8
00:33:24.080 BFF so we can copy it and back in the
00:33:27.120 code we can add that accent color just
00:33:30.000 like this and then you can use it very
00:33:32.760 easily within your code by saying text
00:33:35.480 Dash accent there are also a couple of
00:33:38.000 other colors from this design that I
00:33:40.159 want to add maybe the dark background
00:33:42.600 color or this gray color right here that
00:33:44.720 we want to use you can find them on the
00:33:47.080 design yourself and then copy them
00:33:48.799 within your app such as this variant of
00:33:50.639 the dark color or we can do it together
00:33:53.080 right now there aren't too many
00:33:54.960 alongside the primary color we'll also
00:33:57.000 have the secondary
00:33:58.519 which is going to be hh1 151
00:34:01.840 312 we'll also have a couple of
00:34:04.519 variations of the light color such as
00:34:07.279 the 100 variation of hash
00:34:11.040 d6c 7 FF we can also have a 200 variant
00:34:15.199 of hash A8 B5 DB as well as 300 which is
00:34:21.000 going to be set to Hash 9 C A4 a and we
00:34:26.480 can have a couple of variations of the
00:34:28.199 dark color one for the bottom navigation
00:34:31.040 bar and one for the background so I'll
00:34:33.239 say 100 # 221
00:34:37.440 f3d as well as 200 variation of # 0 F0
00:34:43.079 d23 if you save it all of these
00:34:45.679 variations of different colors will be
00:34:47.760 extended in our theme so now we can very
00:34:50.399 easily use them by saying text- dark
00:34:53.480 D200 for example and with that we have
00:34:56.280 just set up native one inside of your
00:34:58.520 project allowing us to style our
00:35:00.320 applications more easily you'll
00:35:02.040 definitely want to save this entire
00:35:03.560 process somewhere as this is something
00:35:05.119 you'll have to do with every single app
00:35:07.359 and as you saw it's not easy as ABCs if
00:35:10.440 you mess one thing the Styles will not
00:35:12.599 be getting applied so I'll include the
00:35:15.119 entire native one setup within that
00:35:17.240 react native guide down below so you can
00:35:19.920 always refer back to it even when you're
00:35:21.880 building your own applications in the
00:35:23.560 future great job on setting up the
00:35:25.440 styling next routing oh and I almost
00:35:28.960 forgot to mention something that is
00:35:30.440 super relevant here if you're struggling
00:35:32.560 with tawin CSS and you think that would
00:35:35.119 hinder your work on the react native app
00:35:37.599 just recently I have published the
00:35:39.400 updated version of the Tailwind CSS
00:35:41.800 crash course which teaches you
00:35:43.680 everything you need to know about
00:35:44.599 Tailwind in less than an hour so if you
00:35:46.960 want to revisit your Tailwind styling
00:35:48.680 game before we proceed with the rest of
00:35:50.319 the course checking it out might be a
00:35:52.520 good idea
00:35:58.240 it's time to do the routing and as I
00:36:00.920 mentioned before routing in react native
00:36:03.720 Works similarly to routing in nextjs but
00:36:07.240 even if you haven't tried it in xjs
00:36:09.079 don't worry because I'll show you
00:36:10.520 exactly what that means it simply means
00:36:12.680 that your file within the app folder
00:36:15.400 represents your route and the file name
00:36:18.079 is a URL pointing to that route for
00:36:21.119 example the app. index DSX represents
00:36:24.359 Your Home Route the starting point of
00:36:26.720 your app and and if you want to create
00:36:28.520 another route like let's say you want to
00:36:30.400 onboard users to your app you can create
00:36:32.960 a new file and let's call it onboarding
00:36:35.839 ttsx and within it you can run RN FES
00:36:40.520 which is a simple react native
00:36:42.240 functional export with component Styles
00:36:45.160 so just a quick boiler plate so we don't
00:36:47.040 have to write it by hand if this didn't
00:36:49.560 work for you that must mean that you
00:36:51.240 don't have the react and react native
00:36:53.240 extension for plugins installed so just
00:36:56.079 search for your plugins and search for
00:36:58.000 react or react native plugins once
00:37:00.119 you've created this route we have to
00:37:01.599 figure out how we can get to it from the
00:37:03.800 index route so let's head over into the
00:37:06.400 index and just below the view that says
00:37:09.119 welcome let's put a link coming from
00:37:12.319 Expo router and let's give it an href of
00:37:15.440 SL onboarding and it can simply say
00:37:17.960 onboarding if we save it you can see it
00:37:20.240 right here on your screen and if you try
00:37:22.240 clicking on it you can see that it says
00:37:24.000 unmatched route but let's first reload
00:37:26.800 I'll open up my terminal and press the
00:37:28.599 letter R and click on onboarding and
00:37:31.480 there we go we have been redirected to
00:37:33.480 the onboarding screen and now you can
00:37:35.280 use all your devices native back and
00:37:37.760 forward functionalities such as on
00:37:39.839 iPhone it is normal to scroll from left
00:37:42.040 to right to go back this works
00:37:44.880 seamlessly similarly let's say you want
00:37:47.200 to create a route that shows the details
00:37:49.480 of a movie well we can create a new
00:37:51.960 folder and let's call it movie and
00:37:55.319 Within movie we can create a dynamic
00:37:57.920 route so that means creating a file in
00:38:01.319 which we wrap its name within square
00:38:03.560 brackets and you can Define what the
00:38:06.079 actual parameter is in this case I'll
00:38:08.640 wrap it in a square brackets of id.
00:38:12.319 TSX here you can once again run
00:38:16.680 rnf and this will create a boilerplate
00:38:19.119 function which we have to fix a bit I'll
00:38:21.240 call it details export default details
00:38:25.680 and we have a stylesheet at the bottom
00:38:28.079 so now the question is how can we know
00:38:30.079 on which movies Details page we're on
00:38:32.640 are we on the Iron Man's Details page or
00:38:35.280 bathman for example well we can extract
00:38:37.880 the route Pam information in Expo like
00:38:40.760 this by saying const D structure
00:38:43.839 whatever name or title you put within
00:38:46.240 the square brackets and then get it from
00:38:48.680 use local search prams coming from the
00:38:52.319 Expo router if you do this now you can
00:38:54.839 use this ID variable so I'll say movie
00:38:58.960 details and then I'll render the dynamic
00:39:01.680 ID right here so now back in our index.
00:39:05.839 DSX we can create another link and this
00:39:09.119 one will point to slov slash
00:39:14.960 Avengers and we can say Avenger
00:39:18.839 movie if we go back you can now see this
00:39:21.760 new link and don't forget to reload so
00:39:24.560 one more time just press the letter R
00:39:26.480 and wait until it reloads so we make
00:39:28.760 sure that this new route we created is
00:39:30.760 recognized you'll have to do this
00:39:32.319 whenever you add some new pages now if
00:39:34.760 you click on the second link you'll see
00:39:36.880 that we go to the movie Details page but
00:39:39.839 it knows that we are on the Avengers
00:39:42.119 movie details you can play with that a
00:39:44.079 bit more to fully understand how routing
00:39:46.240 works but what I'll do for now is remove
00:39:49.560 those two examples that we have
00:39:51.960 created by entirely removing the movie
00:39:54.640 folder as well as the onboarding file
00:39:57.640 that's because I want to teach you how
00:39:59.680 you would begin creating the screens for
00:40:02.160 your entire application by first looking
00:40:04.720 at the design this right here is a
00:40:07.560 typical react native application well it
00:40:10.400 definitely has a design better than most
00:40:12.160 of the apps out there but you get the
00:40:14.119 idea we have the homepage some kind of a
00:40:16.839 search page and also a Details page for
00:40:19.839 whatever it is that we're searching
00:40:21.119 through we also have a bottom navigation
00:40:23.720 for the home screen search saved and the
00:40:27.720 profile and of course there's also off
00:40:29.960 so if you'd like me to extend this react
00:40:32.040 native course to include authentication
00:40:33.800 2 let me know down below but with that
00:40:36.160 in mind we now have to figure out how
00:40:38.680 many screens we have and for each one of
00:40:40.960 these screens we have to give it a
00:40:42.800 proper route first of all there's the
00:40:45.560 home screen the search screen the save
00:40:49.280 or bookmark screen the profile screen
00:40:52.160 and finally the movie detail screen out
00:40:54.680 of these four screens we only want to
00:40:56.560 show the navigation for the first four
00:40:59.240 screens and not the movie details
00:41:01.640 because we'll get to the movie details
00:41:03.480 by of course clicking on the movie card
00:41:05.880 Expo allows us to do just that with
00:41:08.319 route grouping we can prevent a segment
00:41:11.599 from showing in the URL by using the
00:41:13.920 group syntax which is just a pair of
00:41:17.160 parentheses so for example if we have
00:41:19.880 app Root home. TSX it'll match to home
00:41:24.240 and if we don't put it into a route
00:41:25.920 group then we'll have to say root home
00:41:28.800 which we don't want to do so groups are
00:41:31.119 great for organizing sections of the app
00:41:33.800 so let me show you how we can group our
00:41:35.599 routes within the application first
00:41:37.760 let's create a group route folder for
00:41:40.160 our tabs I'll call it in parentheses
00:41:44.319 tabs within tabs we can create a newcore
00:41:48.040 layout. DSX so now we want to ensure
00:41:51.520 that we show the mobile navigation only
00:41:54.119 on that screen keep in mind that there
00:41:56.000 can only be one index. TSX route and
00:41:59.319 right now it is right here in the root
00:42:01.200 of the directory but we actually want to
00:42:03.359 put it within tabs because the homage is
00:42:05.839 a part of the tabs layout next let's
00:42:08.560 create the other three routes by
00:42:10.599 creating a new file and naming it
00:42:13.480 profile. TSX let's quickly run
00:42:17.599 rnfe which will quickly spin up a new
00:42:20.079 functional
00:42:21.079 component and let's create a second file
00:42:24.079 right here or a second screen should I
00:42:26.520 say and let's call it saved. TSX also
00:42:31.000 run rnf and finally create the last
00:42:34.440 screen let's call it search. TSX and run
00:42:39.839 rnfe now for the movie details since
00:42:42.760 it's outside of that tab layout we want
00:42:45.680 to create it within the app by creating
00:42:47.760 a new movies folder and within movies
00:42:51.800 create a new Dynamic route of id. DSX
00:42:56.359 Within square brackets there you can
00:42:58.880 also run rnf and make sure to fix the
00:43:01.760 name to movie
00:43:04.720 details there we
00:43:06.559 go perfect now we want to hide this ugly
00:43:10.680 header that we have right here at the
00:43:12.240 top that says index how can we do that
00:43:15.240 well we can head over into the app
00:43:17.280 layout. DSX that is this one that we had
00:43:20.240 from before not the one within tabs and
00:43:23.000 here we can expand the stack component
00:43:26.200 and within it we we can render something
00:43:27.960 known as a stack. screen which is a
00:43:31.000 self-closing component where we can give
00:43:33.440 it a name and say that it'll be a string
00:43:37.680 of tabs this is the route Group which we
00:43:40.319 created and we can also give it options
00:43:43.760 of header shown is false and we also
00:43:46.680 want to repeat this stack. screen for
00:43:51.559 our movie Details page by saying name is
00:43:54.720 equal to movie SL ID like this and we
00:43:59.119 can
00:44:00.040 say options header shown is set to false
00:44:04.520 if you save this and reload because the
00:44:07.240 header is still here well to hide it
00:44:10.040 completely we have to head over into the
00:44:12.280 underscore layout of the tabs folder and
00:44:15.920 then you can run
00:44:17.240 rnfe right here to create a new layout
00:44:20.480 instead of returning a view right here
00:44:22.720 let's instead return something known as
00:44:25.319 tabs coming from Expo router within tabs
00:44:29.280 you can render a tabs. screen component
00:44:32.800 it is a self-closing component that has
00:44:35.280 a name in this case it's index for the
00:44:38.160 homepage and then you can provide
00:44:40.160 additional options here you can also
00:44:43.319 provide a Heather shown is set to false
00:44:46.480 as well as a title sets to something
00:44:49.000 like home as this is the homepage now if
00:44:52.119 you reload your application by opening
00:44:54.400 up your terminal and pressing the letter
00:44:55.960 R you'll see that there is no header
00:44:58.079 shown on top and if I comment out this
00:45:01.040 tabs. screen you can see that we still
00:45:03.200 have index so it is hiding that single
00:45:06.359 route and then this one stack that
00:45:08.760 screen if you comment it out this one is
00:45:12.040 actually hiding the group route so we
00:45:14.599 are right now Under tabs
00:45:17.040 Index this one right here hides the
00:45:19.800 route groups header and this one right
00:45:22.280 here hides that specific screens header
00:45:25.760 and it also gives it a name which is
00:45:27.599 then shown right here at the bottom so
00:45:30.200 tabs allow you to modify how your bottom
00:45:32.440 navigation looks like now why did I say
00:45:34.400 modify and not create your tabs
00:45:37.640 navigation well that's because you can
00:45:39.800 see even though we have only declared
00:45:41.400 the Home Route immediately right of the
00:45:43.359 bat three additional routes are here and
00:45:46.599 they work out of the box we didn't do
00:45:49.040 anything but yet react native recognized
00:45:52.079 that we have three other routes right
00:45:54.200 here profile saved search and the the
00:45:57.200 home and at the bottom we can switch
00:45:59.480 between them but what tabs allow to do
00:46:02.119 is to further customize them so let me
00:46:04.400 say tabs.
00:46:06.119 screen make it self-closing and let's
00:46:09.359 give it a name of search as well as the
00:46:11.880 options of title search and header shown
00:46:15.240 set to false so now we can see it has a
00:46:17.520 capital S right here and let's duplicate
00:46:20.000 it two more
00:46:21.280 times this one for the saved so let me
00:46:25.359 call it name saved and title of Saved
00:46:28.720 make sure that you called it exactly as
00:46:30.599 you did right here and the last one will
00:46:33.119 be profile and I'll call it
00:46:36.160 profile so now no matter in which route
00:46:38.680 we are you can see that the header is
00:46:40.760 hidden but this results in a super basic
00:46:43.960 boring navigation to make it look more
00:46:46.160 similar to what we have on the design we
00:46:48.280 have to customize it by defining
00:46:50.119 different icons for each tab of the
00:46:52.200 navigation screen so I took the time to
00:46:54.760 find some cool images and icons so I can
00:46:57.119 share them with you below this lesson
00:46:59.319 you'll find this Project's video kit
00:47:01.400 which includes the link to the project
00:47:02.880 repo which then includes the readme that
00:47:05.880 has the assets so simply go here and
00:47:08.880 download them once you download them
00:47:11.280 simply unzip them head over within your
00:47:13.559 project and delete the current assets
00:47:15.839 folder as we don't need it then simply
00:47:18.440 drag and drop all of these folders
00:47:20.559 within your movie app there we go I'll
00:47:24.400 now explain everything that we brought
00:47:25.920 in here first we have the assets the
00:47:29.319 assets contain the font that we'll be
00:47:30.960 using some icons such as the home logo
00:47:34.680 person and more and also some images
00:47:37.680 like the background image the Highlight
00:47:39.920 logo and more we also have some
00:47:42.240 constants such as the icons and images
00:47:45.200 where we export all of these images from
00:47:47.319 a single file with a specific name so
00:47:49.960 it's easier to import them later on and
00:47:52.359 we also have some interfaces so the
00:47:54.400 typescript knows what kind of fields
00:47:56.839 will each one of our documents have so
00:47:59.160 with that in mind let's head back over
00:48:01.040 to our tabs layout to make our Tabs go
00:48:05.000 from this right here at the bottom to
00:48:07.800 something that looks more like this we
00:48:10.440 can start customizing them let's start
00:48:12.880 with the Home tab button react native
00:48:16.079 specifically the Tab screen allows us to
00:48:18.559 specify how the tab bar icon will look
00:48:21.559 like you can provide a callback function
00:48:24.839 where you get access to the state of
00:48:26.960 that specific icon whether it has
00:48:28.920 currently been clicked or not and then
00:48:31.760 here we can return an empty react
00:48:34.480 fragment for now and within it we can
00:48:37.520 return maybe like a background image
00:48:40.640 what do you think so first I'll return
00:48:43.280 an image background coming from react
00:48:46.760 native that'll have a source equal to
00:48:51.440 images make sure to click enter right
00:48:54.359 here before you finish typing them to a
00:48:56.880 to import them from constants my
00:48:59.119 webstorm did that very nicely for me
00:49:00.960 here so you can see that I imported
00:49:02.480 images from add/ constants SL images and
00:49:06.880 then we can say images. highlight
00:49:09.760 highlight is this little part so when
00:49:11.640 we're currently on that screen you can
00:49:13.520 show this little pill likee shape next
00:49:16.359 within this image background we can
00:49:18.359 render a regular image coming from react
00:49:21.040 native with a source equal to
00:49:24.640 images. home and we can give it a tint
00:49:28.079 color equal to
00:49:30.599 # 151
00:49:33.480 312 as well as a class name equal to
00:49:39.119 size-5 and we can close it right here
00:49:42.200 and we can also give it a text property
00:49:45.400 that'll simply render the word home okay
00:49:48.359 so now this is looking a bit off
00:49:50.359 definitely not what we expected so let's
00:49:53.200 style it a bit I'll give this Source a
00:49:56.240 class name equal to flex Flex - row w-
00:50:02.599 full Flex
00:50:04.480 D1 m-w of 112 pixels I found this value
00:50:11.000 to work the best with a Min height of 14
00:50:15.079 a margin top of
00:50:16.960 four justify Dash center items Das
00:50:21.040 Center to fully Center it rounded Das
00:50:23.760 full and overflow Das
00:50:27.160 there we go so now we have this real
00:50:28.960 pill like shape if it's active let's
00:50:31.440 also render an actual icon it is under
00:50:34.640 icons. home but also make sure to import
00:50:37.680 the icons from constants and now we can
00:50:40.119 see this icon and we can style this text
00:50:43.280 by giving it a class name of text-
00:50:46.319 secondary
00:50:48.359 text-base font D
00:50:51.400 semibold and margin left off
00:50:54.799 two okay so this is looking good now we
00:50:57.760 want to repeat this for every single
00:50:59.839 icon and instead of copying this code
00:51:02.000 and duplicating it four times let's
00:51:04.119 actually extract it into its own custom
00:51:07.200 component so this is not a react native
00:51:10.319 specific thing it is just how we do
00:51:12.160 things around react so take this as a
00:51:14.640 mini lesson whenever you have to repeat
00:51:17.160 this multiple times it's better to
00:51:20.000 extract it okay so now I'll take this
00:51:23.160 entire image background and I'll create
00:51:26.240 a new component out of it by saying
00:51:28.760 const tab icon is equal to a functional
00:51:32.839 component that returns this image
00:51:35.720 background which I can just space right
00:51:37.720 here but it seems like we have an error
00:51:39.520 so let's put this component to use by
00:51:42.000 rendering it right here instead of the
00:51:44.440 code that was previously on here tab
00:51:47.079 icon and immediately we get the same
00:51:49.319 output but it looks so much better but
00:51:52.559 now here's the problem whenever you
00:51:54.319 extract something into a custom
00:51:55.960 component
00:51:57.040 well how are you going to reuse it right
00:51:59.359 because now if I head into the options
00:52:01.160 of the search screen and I say something
00:52:03.920 like tab bar icon where again we can
00:52:07.559 Define how it looks like and then I
00:52:10.880 specify that I want to show some kind of
00:52:12.559 an icon well what happens it's going to
00:52:15.799 be the same one as in the home so of
00:52:17.920 course we want to figure out a way of
00:52:20.200 how we can differentiate those two
00:52:22.839 places where that component is being
00:52:24.799 used and here this is a mini lesson on
00:52:28.599 reusability you want to figure out how
00:52:31.079 to make a custom component reusable and
00:52:34.480 you can do that of course through props
00:52:37.160 so many things here are always going to
00:52:38.920 be the same such as the image background
00:52:40.880 component the classes we're going to use
00:52:43.480 and the colors of the text but what will
00:52:46.079 change is going to be the icon the text
00:52:50.079 and maybe the state of the focus are we
00:52:52.240 currently on home or are we on search so
00:52:54.839 whatever changes from component to
00:52:56.559 component you have to pass it as a prop
00:52:59.400 I'll pass a focus State equal to focused
00:53:02.720 as well as an icon equal to icons. home
00:53:06.440 as well as a title equal to home and
00:53:09.640 I'll put it into multiple lines so it's
00:53:11.799 easier to read I'll copy it and I'll
00:53:14.319 paste it right here for the search but
00:53:17.040 for the search of course it's not going
00:53:19.040 to be just icons. home it's going to be
00:53:21.680 icons. search and the title will be set
00:53:24.680 to search
00:53:26.680 and now we can also just copy this
00:53:28.400 entire tab bar icon and add it for the
00:53:31.480 other two icons this one the third one
00:53:35.359 will actually be called save so I'll say
00:53:38.440 tab icon icons Dove and the title can be
00:53:42.880 saved the icon name is save without the
00:53:45.920 D but I decided to add the D right here
00:53:48.599 saved and finally the last one will be
00:53:51.640 the profile so here we can render
00:53:54.520 focused icons. person and the title will
00:53:58.760 be profile now if I save this you can
00:54:02.200 still see that all four of them say home
00:54:05.319 but now let me collapse them just so you
00:54:07.640 can see how tidy this looks like there
00:54:10.359 we go so now we have four different tab
00:54:13.200 screens with different titles and icons
00:54:15.839 and the only thing we have to do is
00:54:18.079 extract those props right here at the
00:54:20.240 top focused icon and title for now we
00:54:24.640 can make them of the type any and we
00:54:26.680 have to use them whenever something has
00:54:28.400 to be dynamic so instead of icons.
00:54:31.160 something I'll simply render the icon
00:54:34.040 through passing through props and here
00:54:36.119 instead of saying home I will render the
00:54:38.720 title if I now save this you can see
00:54:41.400 that the icons for all four of them have
00:54:43.680 changed also not always we want to show
00:54:46.400 this image background we only want to
00:54:48.319 show it if it's focused so I'll say if
00:54:51.880 focused in that case we can return
00:54:56.440 whatever is right here so I'll indent it
00:54:58.880 properly and end it else I'll return
00:55:02.559 something much simpler like a simple
00:55:05.440 view that'll render an image of a source
00:55:08.920 equal to Icon a tint color equal to #
00:55:13.880 a8b 5db and a class name of size of five
00:55:19.160 of course import the view from react
00:55:21.240 native and give it a class name of size-
00:55:24.960 FO justify - center items Das Center
00:55:29.559 margin top of four and the rounded Das
00:55:32.640 full if you do that you'll notice that
00:55:35.280 now the icons are going to look much
00:55:37.160 better so let's collapse our tab icon
00:55:40.480 and let's further customize how all of
00:55:42.760 the icons together look we can do that
00:55:45.000 through options not on the individual
00:55:47.319 tab screens but we can do it directly on
00:55:50.400 the tabs by saying screen options and
00:55:54.720 here can say tab bar show label we can
00:55:58.960 set that to false so now we have no
00:56:01.480 labels just the icons we can also modify
00:56:04.920 the tab bar item style and I'll give it
00:56:08.240 a width of
00:56:10.280 100% a height of 100% as well I'll give
00:56:15.799 it a Justified content of Center as well
00:56:19.039 as a line items off center as well and
00:56:22.760 we can also modify the tab bar Style so
00:56:26.520 this is the entire tab on its own where
00:56:29.160 I'll change the background color to Hash
00:56:32.520 0 F0
00:56:34.920 d23 border radius will be set to about
00:56:39.119 50 there we go we can also give it a
00:56:42.359 margin horizontal of about 20 let's also
00:56:45.960 give it a margin bottom of
00:56:48.760 36 a height of 52 a position of absolute
00:56:54.920 overflow of hidden and Border width of
00:57:00.079 just
00:57:01.400 one with a border color which is going
00:57:04.480 to be the same color we used above 0 F0
00:57:08.319 d23 and there we have it we have a
00:57:10.920 navigation bar that looks much more
00:57:12.880 similar to the one we have here to make
00:57:15.039 it perfect we just have to fix this
00:57:17.119 small little inconsistency where the
00:57:19.200 height of this pill like shape is not
00:57:21.760 matching the height of the entire bar so
00:57:24.039 let's quickly head over into the tab
00:57:25.799 icon and increase the mint age from 14
00:57:29.240 to 16 and that did the trick perfect so
00:57:33.720 now take your phone in your hand and
00:57:35.799 just click between different pages
00:57:37.839 you'll only see welcome on the home
00:57:39.440 screen and the rest of the pages will
00:57:41.599 appear blank but if you pay close
00:57:43.839 attention to the top left corner you'll
00:57:46.000 see that some text is changing it's just
00:57:48.160 that it's not visible within our current
00:57:50.839 view but if you've been paying close
00:57:52.760 attention to the crash course I already
00:57:54.559 mentioned that there's an element that
00:57:55.920 can help us make sure that everything
00:57:57.880 fits nicely within the screen so we'll
00:58:00.520 explore it soon but I'm already super
00:58:02.599 happy with this because you have just
00:58:04.720 implemented a fully functional routing
00:58:07.280 system with a custom bottom navigation
00:58:10.280 bar that allows us to switch between
00:58:12.680 four different screens great job I know
00:58:16.119 this was a long lesson so I'll keep the
00:58:18.559 next one much shorter but equally as
00:58:21.359 important I'll show you how to customize
00:58:23.319 the logo of your application so when
00:58:25.720 users want to use it they know where to
00:58:29.559 click before we start developing this
00:58:32.200 beautiful home screen UI I want to
00:58:34.240 quickly show you how you can customize
00:58:35.880 your Expo app to show the logo of your
00:58:38.079 application when it's loading if you
00:58:40.559 check out your terminal you'll see an
00:58:42.200 error saying asset not found and right
00:58:45.039 here unable to resolve your asset assets
00:58:48.240 images icon.png within your app.js or
00:58:52.039 app.config DJs this is because when we
00:58:55.640 change the assets we're no longer
00:58:57.760 satisfying the need of our app.js to
00:59:01.000 show our applications icon it's pointing
00:59:03.760 to a pad that doesn't exist so let's fix
00:59:06.720 it we can show an icon called assets
00:59:10.200 images
00:59:12.039 logo.png you can copy it that full path
00:59:15.359 and we can also change it for Android as
00:59:17.799 the foreground image and while we're
00:59:20.839 here let's also change it for the web
00:59:24.000 right here as the favicon oh and right
00:59:26.880 here under the Expo splash screen let's
00:59:29.079 modify it here as well perfect so once
00:59:31.480 you do this open up your terminal and
00:59:34.240 press R to reload your application for
00:59:36.839 the changes to take effect as soon as it
00:59:38.960 bundles the error will be gone and our
00:59:41.440 icon will be applied so now if you
00:59:43.680 reopen your XO app you should be able to
00:59:45.920 see something like this mobile movie app
00:59:48.599 right here or if you want to change the
00:59:50.480 name too to something better like movie
00:59:53.599 Flex you can do that too and for this
00:59:56.440 change you'll actually have to reopen
00:59:58.319 your Expo app and rescan the QR code
01:00:02.520 too there we go now we can see this icon
01:00:05.480 even on the splash screen and when you
01:00:07.520 open it within Expo there we go both the
01:00:10.200 icon and the title are here too of
01:00:12.680 course we're within Expo right now but
01:00:15.200 this would be reflected on your devic's
01:00:17.799 home screen I mean just imagine opening
01:00:20.160 up your iPhone or Android device and
01:00:22.440 seeing your app on the home screen right
01:00:24.319 there with its icon and the title pretty
01:00:27.160 cool right there we go as promised this
01:00:29.559 was a short and sweet lesson next we can
01:00:32.960 focus on a super important part of this
01:00:35.160 course which is building out the UI of
01:00:38.039 our homepage so let's do that
01:00:42.200 next to start developing the UI over our
01:00:45.200 home screen head over into app tabs and
01:00:49.000 then index.ts X here is where we have
01:00:52.000 this welcome so for now let's focus on
01:00:54.640 implementing the header component
01:00:56.559 I'll clear this entire View and create
01:00:59.559 another this one will have a class name
01:01:03.039 equal to flex das1 and BG of primary
01:01:07.440 finally we're going to go away from this
01:01:09.319 light screen to a nice dark color within
01:01:12.559 this view we can render an image coming
01:01:15.240 from react native see how webstorm very
01:01:18.079 easily Auto Imports it at the top and we
01:01:21.079 can render a source and give it a source
01:01:23.680 of images now keep in mind if I just
01:01:25.720 press press enter it'll autoimport it
01:01:27.960 once again from at/ constants SL images
01:01:32.119 and I'll call the images. BG for the
01:01:35.400 background let's position it a bit by
01:01:37.880 giving it a class name equal to Absolute
01:01:41.640 let's also give it a w full so it takes
01:01:43.839 the full width of the screen as well as
01:01:46.319 a z index of zero so we can show some
01:01:48.559 elements on top of it right below it we
01:01:51.000 can render a scroll view this is used to
01:01:54.240 make the whole screen scrollable so if
01:01:56.680 there's a lot of vertical content that
01:01:58.880 might not fit within a single view then
01:02:01.559 you need to wrap everything within a
01:02:03.119 scroll view for users with smaller
01:02:05.039 devices to be able to see it let's give
01:02:07.799 it a class name equal to flex D1 and a
01:02:12.480 padding X of five to give it some
01:02:14.359 horizontal spacing within it for now
01:02:16.880 let's just render a single image that'll
01:02:20.000 have a source equal to
01:02:23.319 icons again coming from constants . logo
01:02:27.279 with a class name equal to W of 12 for
01:02:31.319 the width h of 10 for the height margin
01:02:34.920 top of 20 to divide it a bit from the
01:02:36.960 top margin bottom of five and margin X
01:02:40.680 of Auto to center it in the middle there
01:02:43.480 we go this is starting to look like a
01:02:45.200 real app already now if we had more
01:02:47.520 content we would have this ugly scroll
01:02:49.520 bar at the right side so to remove it we
01:02:52.279 can give an additional prop to the
01:02:54.240 scroll view called show or rather shows
01:02:58.160 vertical scroll indicator which I'll set
01:03:00.839 to false and I'll also give it a
01:03:04.359 Content container style which will be
01:03:08.200 equal to an object where Min height will
01:03:11.240 be set to 100% And also padding bottom
01:03:15.400 will be set to 10 so now you can see if
01:03:18.079 you scroll up and down it kind of moves
01:03:20.640 the logo moves right but we have no
01:03:22.559 content to show so very soon we'll be
01:03:25.039 able to add some content but first
01:03:27.079 things first we have to ask ourselves
01:03:28.799 what is the first thing that we want to
01:03:30.400 show on the homepage and it'll be the
01:03:33.039 search bar which will be our first
01:03:35.160 component of the day so let's create a
01:03:38.039 new components
01:03:42.400 folder and within it let's create a new
01:03:45.760 file called search
01:03:48.920 bar. TSX and within it run
01:03:53.079 rnfe to quickly create a new component
01:03:57.039 now we want to be able to see that
01:03:58.599 component somewhere so let's head back
01:04:01.400 into the index. TSX and let's head right
01:04:04.960 below this logo image and render The
01:04:09.279 View that'll have a class name of Flex
01:04:13.000 one and margin top of five and within it
01:04:16.640 just render a self-closing search bar
01:04:19.119 bar component coming from at/ components
01:04:22.960 SL
01:04:24.480 searchbar now you won't be able to see
01:04:26.680 it yet because right now it is just a
01:04:28.839 single piece of text which is hard to
01:04:30.559 see on a dark background but of course
01:04:32.720 we're going to style it further so let's
01:04:34.839 start by giving this view a class name
01:04:37.640 equal to flex Das row items Das Center
01:04:42.279 BG dark 200 rounded Das full and padding
01:04:47.319 X of five as well as padding y of four
01:04:50.720 to create some spacing in between it we
01:04:53.200 can render an image which is going to be
01:04:55.680 kind of like a search icon so let's
01:04:57.839 import the image component and give it a
01:05:00.559 source equal to icons.
01:05:03.680 search with a class name equal to size
01:05:07.319 of
01:05:08.200 five a resize mode equal to
01:05:13.440 contain as well as a tint color equal to
01:05:17.480 Hash
01:05:19.119 AB8 BFF and of course don't forget to
01:05:22.640 import the icons coming from constant
01:05:26.319 if you do that you should be able to see
01:05:28.279 this little icon at the top left below
01:05:31.000 it we can render a text input okay so a
01:05:34.799 text input is like an input component in
01:05:37.279 react or in regular HTML and it allows
01:05:40.640 you to pass similar things to it such as
01:05:43.640 the onpress functionality which for now
01:05:45.880 I'll just leave as an empty coolback
01:05:47.400 function a placeholder that you can pass
01:05:49.880 to it which can be something like search
01:05:52.000 for now a value which can be equal to an
01:05:55.400 empty string for now an onchange text
01:05:59.279 which for now will be equal to an empty
01:06:01.160 callback function a placeholder text
01:06:04.400 color which can be similar to our tint
01:06:06.359 color
01:06:07.799 a8b 5db there we go now we can see it
01:06:11.920 and finally we can give it a class name
01:06:13.920 of flex D1 margin left of two and text-
01:06:18.480 white so now we have what appears to be
01:06:20.760 a very simple search and when you click
01:06:22.920 on it you can see that your keyboard
01:06:24.799 actually opens up giving you a way to
01:06:27.520 type something in now what we need to do
01:06:29.520 to make this somewhat functional is pass
01:06:32.119 the real onpress value from the index so
01:06:35.920 typically when you have smaller
01:06:37.279 components like a search bar on its own
01:06:39.920 it doesn't necessarily have to be
01:06:41.559 concerned with what it is doing
01:06:43.680 typically you have some logic that you
01:06:45.920 pass from the parent component to the
01:06:48.240 child component in this case the search
01:06:50.400 bar so what we can do is Define the
01:06:54.119 router right here here in the homepage
01:06:57.079 you can say something like import use
01:07:00.119 router coming from Expo router you can
01:07:03.680 Define that router right here by saying
01:07:06.119 const router is equal to use router by
01:07:09.760 the way this is the first time we're
01:07:11.160 using the router right here and what
01:07:12.960 we're doing here is essentially using
01:07:15.160 something known as a hook so in react
01:07:17.920 and therefore in react native when
01:07:20.279 something starts with the word use that
01:07:23.279 means that it is called a hook and hooks
01:07:26.400 are typically called at the top of our
01:07:28.400 functional components and then they
01:07:30.240 expose additional functionalities in
01:07:32.760 this case the router functionality
01:07:34.760 allows us to move between different
01:07:36.799 screens programmatically not necessarily
01:07:39.440 by clicking a button or something but we
01:07:41.680 can use it to go to another page or
01:07:43.799 screen when something happens in this
01:07:46.760 case I will pass two props to the search
01:07:49.839 bar the first one will be the onpress
01:07:52.839 functionality that will for now call the
01:07:55.079 call function and then call the router.
01:07:57.960 push which will push it to for SL search
01:08:02.240 okay so we want to move to the search
01:08:03.640 screen once pressed and I'll also pass a
01:08:06.520 placeholder equal to search for a movie
01:08:10.319 now if we head into the search bar we
01:08:12.559 can accept these different props so
01:08:15.240 right here at the top I can destructure
01:08:17.319 them and accept the placeholder as well
01:08:20.640 as the on press and these can be of a
01:08:23.238 type props so right above it we can
01:08:26.679 define a typescript interface called
01:08:29.880 props and just say that the placeholder
01:08:32.960 will always be of a type string and on
01:08:36.198 press will be optional and it'll be of a
01:08:40.120 type function that returns void meaning
01:08:43.359 nothing the goal of this function is not
01:08:45.520 to return something rather it is to use
01:08:48.920 the router functionality to push to a
01:08:51.080 different URL so if you haven't used
01:08:53.439 typescript before don't worry what this
01:08:55.920 interface does is it simply tells our
01:08:58.799 react application or react native in
01:09:00.600 this case what the types of those props
01:09:02.600 should be so now on press we can call
01:09:06.040 the onpress functionality that we're
01:09:07.880 passing through props and also we can
01:09:10.600 pass in the
01:09:12.399 placeholder there we go search for a
01:09:15.120 movie now check this out as soon as I
01:09:17.520 click search for a movie it actually
01:09:19.600 redirects me to another screen called
01:09:22.238 the search
01:09:23.198 screen which will Implement very very
01:09:25.679 very soon but of course it doesn't make
01:09:27.759 sense to start implementing the search a
01:09:29.880 movie screen if we don't yet have any
01:09:32.040 movies to search for so in the next
01:09:34.279 lesson let's go ahead and fetch the
01:09:36.198 movies data from a third party
01:09:39.759 API to fetch the movies for our great
01:09:43.080 mobile movie application we'll use tmdb
01:09:46.640 a database off I think every movie that
01:09:49.198 you can possibly think of this is their
01:09:51.080 public facing website but they also have
01:09:53.640 an API so if you Google for tmdb API
01:09:56.719 getting started or I'm going to also
01:09:58.480 leave the link in the description then
01:10:00.480 you'll be able to find this getting
01:10:02.080 started guide head over to the API
01:10:04.800 reference and here you'll be able to
01:10:06.719 give it a shot we'll be using no JS to
01:10:09.040 make the calls and you'll have to get
01:10:11.199 your API key it'll ask you to log into
01:10:13.760 your account or to create it if you
01:10:16.120 haven't before so feel free to create
01:10:17.960 your account as it is completely free
01:10:20.600 you don't have to worry about paying
01:10:22.040 anything and you'll get access to all
01:10:23.800 the data once you log in you'll be able
01:10:26.159 to see something like this which is your
01:10:28.000 account and then head back over to the
01:10:30.000 getting started guide and click the link
01:10:32.400 that says API link there we go here
01:10:34.880 you'll have your API read access token
01:10:37.520 so copy it and save it somewhere and do
01:10:39.880 the same thing for the API key head over
01:10:41.960 into the API reference and if you're
01:10:43.840 logged in you'll see that all of the
01:10:45.600 credentials will be filled in alongside
01:10:47.880 a demo request that you can try in this
01:10:50.040 case they're making a request to the
01:10:51.280 authentication so if I click try it you
01:10:53.840 can see that it succeeded in this case
01:10:56.360 we'll be using the endpoint for
01:10:58.320 discovering movies so search for
01:11:01.080 discover movie and you'll quickly be
01:11:03.600 able to find that movies is deprecated
01:11:06.760 but you should use discover movie
01:11:09.320 instead and it tells you right here
01:11:11.520 which API request you have to call find
01:11:13.560 movies using over 30 filters and sort
01:11:15.880 options and it tells you right here what
01:11:18.120 you can pass over into it we can also
01:11:20.480 give it a shot by clicking try it and
01:11:22.760 then you get back the total number of
01:11:24.640 pages which is
01:11:26.440 49,000 pages that has almost 1 million
01:11:31.120 movies and here of course you get more
01:11:33.560 details for every single one out of
01:11:36.280 those almost 1 million movies how cool
01:11:39.920 is that now let's actually try to call
01:11:42.719 this within our code let's go ahead and
01:11:44.679 copy this entire fetch request by
01:11:47.440 selecting it and then pressing control
01:11:49.280 or command C and then heading back
01:11:51.440 within our code we'll create a new
01:11:53.120 folder that we'll use for the API
01:11:55.360 configuration so let's create a new
01:11:57.719 folder let's call it
01:12:00.400 services and within Services let's
01:12:02.840 create a new file called api. TS within
01:12:06.920 it for now you can paste this request
01:12:08.960 that we just copied but comment it out
01:12:12.080 we first want to set it up from scratch
01:12:14.120 so it's fully reusable and more
01:12:16.679 structured first things first we need to
01:12:18.480 extract this key that was given to you
01:12:21.159 so if you head back to your credentials
01:12:22.960 header select it and copy it you can now
01:12:25.960 store it in a more convenient place such
01:12:28.719 as a EnV file this stands for
01:12:32.239 environment variables and make sure that
01:12:34.480 it is in the root of your directory I'll
01:12:36.560 call it Expo coru if you're going to use
01:12:40.199 it on the front and side of your Expo
01:12:41.800 application you have to preen the name
01:12:44.159 of your environment variable with Expo
01:12:46.440 public and then say movie API key and
01:12:50.239 paste your environment key now we won't
01:12:52.840 have to every time spell it out within
01:12:54.400 our code for every body to see but we'll
01:12:56.560 be able to just refer to this variable
01:12:58.920 so instead of just making one single
01:13:00.840 request let's actually form a tmdb
01:13:03.760 configuration that is reusable so we can
01:13:06.480 actually change the way we interact with
01:13:08.719 it we can call it for multiple different
01:13:10.960 endpoints to do that you can export
01:13:14.280 const
01:13:16.199 tmdb config and it'll be equal to a
01:13:19.840 single object within the object we can
01:13:23.239 first pass the base URL like this and
01:13:27.320 the base URL will be this starting part
01:13:29.880 up to the part where the endpoint will
01:13:31.639 actually change so sometimes it'll be
01:13:33.880 discover movie sometimes it'll be my
01:13:36.400 profile for example but there's always a
01:13:39.360 base URL that each API has so https
01:13:44.400 Colin api. theme.org
01:13:48.520 sl3 and leave out the last forward slash
01:13:51.920 we don't need it here next we have to
01:13:54.080 pass the API iore key which will be
01:13:57.360 equal to process. env. EXO
01:14:01.520 undoru moviecore API undor key this is
01:14:06.040 coming from our environment variables
01:14:08.120 next we can pass the headers that we're
01:14:10.040 making with the request where we're
01:14:12.719 going to pass the accept property to let
01:14:15.000 it know what kind of data should it
01:14:17.159 accept and this will be equal to
01:14:19.280 application Json and also we have to
01:14:21.960 pass the authorization header which is
01:14:24.440 equal to a template string of Bearer and
01:14:28.080 then you once again render the process.
01:14:30.440 env. Expo public movie API key we're not
01:14:34.320 spelling it out like this perfect so
01:14:36.840 with that we have basically utilized
01:14:38.920 this entire part and the only thing that
01:14:40.800 remains to be changed is the URL that
01:14:43.400 we're calling so in this case you can
01:14:45.840 see we're looking for forward slcover
01:14:48.440 for/ movie but now that we have this
01:14:50.679 configuration object it'll be super
01:14:52.800 simple to create a function that just
01:14:55.080 call one endpoint let me show you export
01:14:58.520 const fetch movies is equal to an
01:15:01.800 asynchronous function that will accept a
01:15:04.280 search query and we can open up a code
01:15:07.239 block now for this query we also have to
01:15:10.239 pass the type and we can say that the
01:15:12.159 query is of a type string it'll look
01:15:14.800 something like this next we have to
01:15:16.719 define the endpoint that we're calling
01:15:18.719 so I'll say con endpoint is equal to
01:15:22.360 slash discover slovie question mark sort
01:15:26.840 by popularity descending so this will
01:15:29.800 give us the most popular movies then we
01:15:32.239 have to get the response out of that
01:15:33.920 call by saying const response is equal
01:15:36.639 to
01:15:38.120 await fetch we're going to fetch a
01:15:41.440 specific endpoint with the following
01:15:43.679 options I'll pass the method of get so
01:15:47.360 we want to make a get call and I will
01:15:50.159 also assign the headers to be equal to
01:15:53.639 tmdb config do headers finally we'll
01:15:57.440 check if the response is not okay so if
01:16:02.360 not response okay then throw new error
01:16:05.800 failed to fetch movies and we can also
01:16:08.159 consol log the response. status text to
01:16:11.120 see exactly what went wrong I'll
01:16:13.440 suppress this TS warning right now
01:16:15.480 because I assume there will be a
01:16:17.320 response. status text that might give us
01:16:19.440 more info and then if everything is okay
01:16:21.920 we can extract the data from the
01:16:23.560 response by saying respon data is equal
01:16:26.239 to await response. Json and finally we
01:16:30.120 just want to return the
01:16:31.719 data. results which contains the actual
01:16:34.480 movies out from this function and this
01:16:37.040 would be great I mean this works
01:16:39.280 amazingly well for just fetching the
01:16:41.159 most popular movies you could say fetch
01:16:43.880 popular movies and you would be good to
01:16:45.840 go with this function but I want to
01:16:48.000 teach you how to make it more modular
01:16:50.320 how to make it work both for fetching
01:16:52.320 the popular movies as well as to work
01:16:55.239 for fetching the movies that we search
01:16:57.639 for so if a user heads over and clicks
01:17:00.199 search right here we actually want to
01:17:01.880 use the same function not create a
01:17:04.120 duplicate one that'll fetch the movies
01:17:06.239 based on the user's search query so what
01:17:08.600 you can do is say that the endpoint is
01:17:11.719 equal to and then if there is a query so
01:17:16.239 if query exists then we can change the
01:17:20.120 endpoint to be equal to/ search slov
01:17:25.000 question mark query is equal to and now
01:17:28.360 here we can pass over the query like
01:17:30.800 this but whenever you pass plain strings
01:17:33.880 into a URL it is always better to encode
01:17:36.840 them just to make sure that we don't
01:17:38.239 have any weird characters that the
01:17:39.800 browser might not be able to process so
01:17:42.520 you can write in code URI component and
01:17:45.880 then pass the query into it this way
01:17:49.320 we'll be sure that everything is good
01:17:51.679 and then if we don't have the query
01:17:53.560 simply search for the the latest movies
01:17:55.880 now the final thing we need to do to
01:17:57.440 make this work is also make the bottom
01:17:59.639 one a template string why because for
01:18:02.840 both of these we actually want to add
01:18:05.120 the
01:18:06.040 tmdb config dobas URL at the start of
01:18:10.320 them so everything starts with this base
01:18:13.320 URL and then we're changing the exact
01:18:15.840 endpoint depending on whether we have
01:18:17.960 the query and if so we pass it or if not
01:18:21.480 give me all the most popular movies I
01:18:24.040 think you can now understand a bit more
01:18:25.679 detail of what I meant when I said that
01:18:28.000 we're going to make this reusable and
01:18:29.960 just better configured and it makes
01:18:31.639 sense because the endpoint is different
01:18:33.880 but the actual data we turning from the
01:18:36.080 function is still the same they are
01:18:38.920 movies so with that in mind you have
01:18:41.280 successfully created an account on tmtb
01:18:44.360 you extracted your own API key for free
01:18:47.880 and you made a function that fetches the
01:18:50.199 movies either the most popular ones or
01:18:52.920 the ones that match the user's query
01:18:54.880 very soon we'll put it to use but just
01:18:57.280 before that in the next lesson I'll show
01:18:59.560 you one more optimization that we can
01:19:01.199 make to use the fetch movies functions
01:19:03.159 we created in a more optimized
01:19:06.560 way in the previous lesson we
01:19:08.960 implemented this fetch movies function
01:19:12.480 but before diving into using it which
01:19:14.960 involves API calls using the use effect
01:19:18.000 hook managing loading and error States
01:19:21.040 and potentially clattering our code with
01:19:23.040 repetitive logic there's a more
01:19:25.560 efficient approach instead of repeating
01:19:28.080 the same code for every request we can
01:19:30.600 improve this process by using something
01:19:33.000 known as a custom hook this hook will
01:19:36.080 handle fetching the data in a clean
01:19:38.440 reusable and scalable way so let's
01:19:41.280 create a new file within the services
01:19:43.400 folder and let's call it use fetch. TS
01:19:48.760 and we can develop that custom hook this
01:19:50.840 hook will allow us to handle API
01:19:52.920 requests without cluttering the
01:19:55.000 components by abstracting away the logic
01:19:58.159 for fetching the data managing loading
01:20:00.440 and error States and it'll even provide
01:20:02.880 us with a way to manually trigger a
01:20:05.120 refetch when needed let me show you how
01:20:07.400 it'll look like we can say const use
01:20:10.440 fetch again notice the keyword use
01:20:13.159 indicating that it is a hook and we can
01:20:15.320 make it equal to a function call and we
01:20:18.480 can make it equal to an arrow
01:20:20.360 function now bear with me for a second
01:20:23.320 the use fetch hook will accept the fetch
01:20:27.239 function as a parameter okay so what can
01:20:31.800 this fetch function be well it can be
01:20:34.159 like fetch movies or it can be something
01:20:36.639 else maybe like fetch movie details
01:20:40.000 whatever it
01:20:41.080 is we're going to pass it into this use
01:20:43.800 fetch call so it'll look something like
01:20:46.080 this use fetch fetch movies we
01:20:49.360 immediately have to let it know that the
01:20:51.080 first parameter will be that fetch
01:20:53.040 function and we need to Define its type
01:20:56.280 and the type will be a function that
01:21:00.080 returns a promise and the promise will
01:21:03.679 be of a generic type t t makes it a
01:21:08.080 generic function allowing us to later on
01:21:10.760 pass the specific data types that we
01:21:13.120 want the function return to be it'll all
01:21:15.360 make sense once we start using it we
01:21:17.480 also have to add this generic T
01:21:19.440 parameter here and as the second
01:21:21.320 parameter we'll pass the autof Fetch and
01:21:23.920 make it equal to the true if you don't
01:21:25.800 understand what this means specifically
01:21:27.560 This Promise generic parameter T again
01:21:30.679 don't worry about it I'll explain it in
01:21:32.560 more detail once we actually start using
01:21:34.800 this function great with that said this
01:21:37.440 use fetch function will have to work
01:21:39.280 with some kind of data so we can create
01:21:41.440 a new state called data and set data
01:21:45.920 which will be equal to the use State
01:21:48.320 hook and it'll be of a type t or null
01:21:52.880 you define it right here before we open
01:21:55.920 the function call of this function and
01:21:58.880 by default we'll set it to null next we
01:22:02.040 need to define the loading and set
01:22:03.960 loading at the start equal to false and
01:22:07.639 also the errors const error set error is
01:22:11.239 equal to the use state where the type of
01:22:13.800 that state is either an error or a null
01:22:16.760 by
01:22:17.560 default now that we have implemented
01:22:19.800 those different states let's create a
01:22:22.000 function const fetch data which will be
01:22:25.239 equal to an asynchronous function within
01:22:28.320 which we can open up a try and catch
01:22:32.360 Block in the catch we'll of course get
01:22:35.040 the access to the error I'll shorten it
01:22:37.719 for err and within it we can set
01:22:41.639 error if an error is an instance of
01:22:47.239 error then I'll just forward the entire
01:22:50.360 error else I'll just create a new error
01:22:53.840 and pass in a string of an error
01:22:57.480 occurred and also press the typescript
01:22:59.880 right here for this line by saying TS
01:23:02.239 ignore then we're going to also add a
01:23:04.880 finally Clause finally block of code
01:23:07.480 gets executed either when a try succeeds
01:23:10.920 or a catch finishes either way we want
01:23:13.760 to set loading to false but now what we
01:23:16.440 care about the most is dealing with the
01:23:18.560 tri block which means actually fetching
01:23:20.760 the data first we're going to set
01:23:23.480 loading to true because we want to start
01:23:26.520 the loading action we're going to also
01:23:29.440 reset the error to false or rather null
01:23:33.159 there is no error and then we can say
01:23:37.000 const result is equal to await fetch
01:23:43.120 function so keep in mind that this fetch
01:23:45.400 function is not yet declared the fetch
01:23:48.280 function will be passed through props
01:23:50.880 and it can be either the fetch movies
01:23:52.920 function which we created not not long
01:23:54.800 ago or maybe another function which will
01:23:57.280 create in the future like fetch movie
01:23:59.320 details or maybe another function which
01:24:01.840 will create soon in any case the
01:24:04.440 function we want to call will be passed
01:24:06.840 through as the first parameter to the
01:24:08.560 use fetch hook and then we'll call it
01:24:10.520 right here get the results and simply
01:24:13.400 set them to the data so set data is
01:24:16.239 equal to result also below this entire
01:24:19.960 fetch data function we can also have a
01:24:22.560 reset function so con
01:24:25.040 reset is equal to an error function
01:24:28.760 where we set the data to null set the
01:24:30.920 loading to false and set the error to
01:24:32.920 now as well finally I'll also create a
01:24:35.560 use effect hook and a use effect Hook is
01:24:38.800 called when you want to do something at
01:24:40.679 the start of your component load so in
01:24:43.719 this case as soon as the component loads
01:24:46.679 we want to check if autof fetch is
01:24:49.239 turned on that means that we want to
01:24:51.960 automatically fetch the data in that
01:24:53.600 case so if if autof fetch is true we'll
01:24:55.800 simply call the fetch data
01:24:57.719 function finally hooks have to return
01:25:00.719 something so I'll return almost
01:25:03.280 everything the data State the loading
01:25:05.840 State the error State the refetch
01:25:08.880 function which I'll call fetch data as
01:25:11.960 well as the reset function so later on
01:25:14.639 when we use this hook it is dealing with
01:25:17.000 everything data related fetching
01:25:19.320 loadings errors and finally the data
01:25:22.080 that it's returning so let's say export
01:25:25.400 default use fetch so that in the next
01:25:28.280 lesson we can use the use fetch hook as
01:25:31.239 well as use the fetch movies function
01:25:33.679 merge them together to be able to fetch
01:25:36.320 and display
01:25:39.040 movies and we are finally ready to fetch
01:25:42.280 and display the movie data to do that
01:25:45.080 let's head over into our homepage app
01:25:48.560 tabs index. TSX fetching the data now
01:25:52.040 should be super simple since we have
01:25:54.360 already done all the hard work of
01:25:56.239 actually implementing scalable reusable
01:25:58.600 fetching functions that contain all of
01:26:00.840 the necessary data fetching logic let me
01:26:03.159 show you what I mean instead of handling
01:26:05.320 all the states and everything right here
01:26:08.080 now we can do just a single thing const
01:26:11.600 destructure the data that we're going to
01:26:14.000 fetch rename it to
01:26:16.560 movies and make it equal to the call of
01:26:19.840 the use fetch hook coming from services
01:26:22.920 use fetch to it we have to pass a
01:26:25.320 callback function in this case fetch
01:26:29.320 movies which is another one of our
01:26:31.400 functions we created and to it we can
01:26:34.280 pass a query which by default will be
01:26:37.040 set to an empty string let me actually
01:26:39.719 put this into multiple lines so you can
01:26:41.360 better see what's happening there we go
01:26:44.080 so we're calling the use fetch hook and
01:26:47.159 to it we're passing a callback function
01:26:50.119 called Fetch movies to which we pass the
01:26:53.119 query this this query right now is empty
01:26:56.040 but later on once we Implement search or
01:26:58.280 once we navigate to the search page we
01:27:00.080 can fill in the query data but it
01:27:02.320 doesn't matter if it's empty right now
01:27:04.040 because you know what happens fetch
01:27:06.119 movies if a query doesn't exist Returns
01:27:08.960 the most popular movies so we're still
01:27:11.920 good now alongside the movies themselves
01:27:15.679 back from the use fetch hook we're also
01:27:17.880 getting the loading which I can rename
01:27:20.400 to movies loading and we're also getting
01:27:23.520 back the error state which I can rename
01:27:26.080 to movies error and just so it's easier
01:27:29.199 to read it I'll put it into multiple
01:27:31.239 lines and there we go all the data we
01:27:33.719 need nicely contained within a single
01:27:36.080 call so let's put it to use right below
01:27:39.560 the icons logo we can check whether
01:27:42.080 we're currently loading the movies so if
01:27:44.639 movies loading in that case we can show
01:27:48.239 an
01:27:49.239 activity indicator built right into
01:27:52.360 react native it is a self- closing
01:27:54.880 component for which you can Define the
01:27:56.920 size in this case I'll make it large the
01:28:00.119 color which I'll set to Hash
01:28:02.560 0 FF and you can also Define the class
01:28:06.280 name which I'll set to margin top of 10
01:28:09.320 and self Center but if we're not loading
01:28:13.080 the movies then maybe there's an error
01:28:16.080 so let's check if movies errors exist
01:28:19.440 then we will render a piece of text
01:28:22.480 that'll say something like
01:28:24.760 error is equal
01:28:26.800 to movies error question mark.
01:28:31.280 message and finally if we're not loading
01:28:34.679 and we don't have an error we can return
01:28:37.600 a view within which we'll have the
01:28:40.080 search bar and the rest of the content
01:28:42.239 so basically I can just copy this view
01:28:44.360 that we had before and put it right here
01:28:47.119 instead of this view that I created next
01:28:49.840 below the search bar we can create an
01:28:51.840 empty react fragment and within it we
01:28:54.800 can display a piece of text that'll say
01:28:58.199 something like latest movies to be able
01:29:01.760 to see that text let's give it a class
01:29:04.159 name of text- LG text- white font Das
01:29:10.719 bold margin top of five and margin
01:29:14.360 bottom of three and I'll try to reload
01:29:17.040 the application just to see whether the
01:29:18.719 changes happen there we go you can see
01:29:20.719 the latest movies right there sometimes
01:29:22.679 you have to manually restart it now get
01:29:24.719 ready to use one of the most important
01:29:27.239 react native components called a flat
01:29:31.400 list imported from react native and let
01:29:34.639 me show you how it works a pretty cool
01:29:37.080 thing about the flat list is is that it
01:29:39.400 accepts a lot of props so for it to work
01:29:42.480 you don't have to customize it that much
01:29:44.840 outside of figuring out which props to
01:29:47.119 provide first of all we have to provide
01:29:49.560 the data prop that will simply be equal
01:29:52.400 to movies that's the data data we
01:29:54.480 rendering and then we have to tell it
01:29:57.080 how it will render each item each one of
01:29:59.880 these movies first we can destructure
01:30:02.719 that item which is a movie itself and
01:30:05.159 then for each item we can have an
01:30:07.280 immediate return what does an immediate
01:30:09.440 return mean well it means that we're not
01:30:11.520 opening up a function block here with
01:30:13.639 curly braces instead we're opening it
01:30:16.080 with parenthesis so whatever we put in
01:30:18.320 here such as maybe a text element means
01:30:22.040 that we will automatically return it so
01:30:24.520 for each movie Let's automatically
01:30:26.679 render an item. tile and give it a class
01:30:30.199 name of text- white as well as text- smm
01:30:35.199 so take a look at that we get back a
01:30:37.960 list of 20 most popular movies at the
01:30:40.560 time of the recording pretty cool right
01:30:42.560 another thing we have to pass into the
01:30:43.960 flat list is the key
01:30:46.480 extractor which simply helps react
01:30:48.679 native figure out how many elements they
01:30:50.480 are and where they're positioned so same
01:30:53.360 as before we get access to the item and
01:30:56.400 we simply want to take the ID of each
01:30:58.880 one of these
01:30:59.920 movies next we can Define the number of
01:31:02.639 columns in this case let's make it equal
01:31:04.719 to three and then you might need to
01:31:06.480 reload for the changes to take effect
01:31:08.400 because you cannot change the number of
01:31:09.840 columns on the Fly there we go so now
01:31:12.800 they're showing in three different
01:31:14.000 columns let's also Define a column
01:31:17.119 wrapper Style by making it into an
01:31:20.880 object and passing a justifi content of
01:31:24.480 flex Das
01:31:26.199 start gap of 20 in between the elements
01:31:30.119 padding of right five margin bottom of
01:31:36.360 10 so now if we save this they're going
01:31:39.400 to be positioned a bit more nicely and
01:31:42.679 we can also pass a general class name to
01:31:45.199 the entire flat list as margin top of
01:31:48.440 two and padding bottom of
01:31:51.880 32 Also let's say scroll enabled is set
01:31:55.480 to false as our entire view already
01:31:58.199 Scrolls by itself perfect so now we're
01:32:01.880 displaying 20 of the most popular movies
01:32:04.800 in the world just by passing the movies
01:32:06.960 array as data into the flat list pretty
01:32:10.520 cool right and I think you can now get
01:32:13.159 the idea of what I meant when I said
01:32:15.520 that the flat list is super extensible
01:32:18.080 and you can modify everything just by
01:32:20.119 calling different props data render item
01:32:23.080 key extractor num columns whatever we
01:32:25.760 needed to present our data nicely in a
01:32:27.960 list was already there and provided to
01:32:30.360 us through the flatlist component props
01:32:33.600 and you'll find this practice pretty
01:32:35.440 commonly in react native where the
01:32:38.119 pre-built components are super
01:32:39.920 extensible you just have to figure out
01:32:41.960 which props to pass and how can you know
01:32:44.639 well you just Google it which will bring
01:32:46.840 you to the documentation page you can
01:32:49.040 check out the example and then very
01:32:51.360 quickly you'll be able to see a list of
01:32:53.520 different props that you can pass to it
01:32:55.679 and exactly what each one of these props
01:32:58.199 does pretty cool right let me Zoom this
01:33:00.320 back in right now and now that we're
01:33:02.199 fetching the data properly let's make it
01:33:04.320 look a bit more interesting of course
01:33:06.719 visuals are what's going to change the
01:33:08.480 game right now we are showing just the
01:33:10.960 title but what if we could show an image
01:33:13.960 for each one of these
01:33:15.600 movies just so we don't have to declare
01:33:17.679 it in many places we'll create a new
01:33:20.480 reusable card component for the movie so
01:33:23.360 let's create a new file in the
01:33:24.880 components folder and let's call it
01:33:27.199 moviec card. TSX run rnfe to quickly
01:33:33.119 spin up our movie card component give it
01:33:36.159 a class name equal to text- White in
01:33:39.960 text
01:33:41.320 DSM and let's call it right here instead
01:33:44.920 of this simple text element instead of
01:33:47.760 that I'll call the movie card and I'll
01:33:51.119 self-close it like this now we have a
01:33:53.480 simil problem that we had before with
01:33:55.520 the tabs layout where each movie card
01:33:58.440 now shows exactly the same data so to be
01:34:01.840 able to make it different we have to
01:34:04.119 pass the right props to it so what does
01:34:06.440 it mean in this case well we can simply
01:34:09.400 spread out all of the properties of the
01:34:12.280 item or of the movie so that way we'll
01:34:15.360 be able to extract them directly within
01:34:17.760 the movie card so let's head over into
01:34:20.920 the movie card and let's accept all of
01:34:23.440 the props that we have passed into it
01:34:26.080 such as the ID the poster undor path the
01:34:30.920 title and where am I getting all of
01:34:32.880 these from well remember we already made
01:34:35.400 a mock response before and tmdb gave us
01:34:39.040 back exactly the data that we're getting
01:34:41.480 such as the poster path overview title
01:34:44.080 and
01:34:44.880 more so let's get it vote uncore average
01:34:49.880 as well as the release
01:34:52.119 date and these will be of a type movie
01:34:56.159 which we declared before under
01:34:57.800 interfaces so we already know what each
01:35:00.280 movie has now we want to make each one
01:35:02.719 of these cards clickable because once we
01:35:05.280 click it we want to go to the movie
01:35:06.920 Details page so I'll make it into a link
01:35:10.920 and this link of course has to be
01:35:13.159 imported from Expo router it'll have an
01:35:16.280 href of for/ mov slid and as child as
01:35:22.520 child simply means that the card that is
01:35:25.000 inside of the link will actually be the
01:35:26.800 thing that's clickable in this case
01:35:29.000 we'll make it a touchable
01:35:31.480 opacity so like a card is technically a
01:35:34.800 clickable button in this case coming
01:35:36.719 from react native we can give it a class
01:35:39.280 name equal to w- 30% so each card takes
01:35:44.280 only 30% of the screen and within it
01:35:47.119 let's first render an image this image
01:35:50.159 will have a source equal to an object
01:35:54.400 where the URI is we can check if the
01:35:58.440 poster path exists if it does then we'll
01:36:02.960 set it to be equal to
01:36:05.400 https colon SL SL image.
01:36:11.080 tmdb org SLT SL
01:36:18.040 pw500 and then poster path like this
01:36:22.400 else if we don't have a poster path we
01:36:24.840 can render just the placeholder so it'll
01:36:27.560 be a string of
01:36:29.400 https
01:36:31.719 col placehold doco SL600 by
01:36:36.920 400 SL1 a1a1 a SL
01:36:45.000 f.png sorry for spelling out the entire
01:36:47.239 URL just thought it would be the
01:36:48.960 simplest way to share it with you now
01:36:50.639 reload your application and let's also
01:36:53.080 give this image a class name of
01:36:56.760 w-o
01:36:58.880 h-52 and the rounded dlg for the rounded
01:37:02.600 Corners we can also give it a resize
01:37:05.239 mode equal to cover right below that
01:37:08.040 image still within the touchable opacity
01:37:10.960 let's also render a piece of text that
01:37:13.760 will simply render the movie
01:37:16.000 title and we can give it a class name of
01:37:19.239 text DSM font D bold text - white and
01:37:24.880 margin top of two and there we go once
01:37:28.320 again you can see all of these movies
01:37:30.440 but hey where is the poster why can't we
01:37:33.320 see the images well let's first consol
01:37:36.159 log the poster path to see whether we're
01:37:39.480 getting back the Pats of those movies so
01:37:42.080 the URLs are coming back but hey where
01:37:45.080 is the poster why can't we see the
01:37:47.960 images well for the image to be
01:37:50.040 displayed we need to give it a URL which
01:37:52.880 I do believe we're getting as the titles
01:37:54.760 are here so the poster should be two but
01:37:57.800 images also need a width and a height
01:38:01.119 and I thought that I was providing a
01:38:03.280 width of 100% and a height of about 208
01:38:08.400 pixels so why is it not getting applied
01:38:11.520 well if you head over into your Tailwind
01:38:14.040 doc config.js you'll see that we're
01:38:17.119 saying that only the app folders and
01:38:19.920 files will actually include Tailwind
01:38:22.040 Styles but we we have to do the same
01:38:24.440 thing for the
01:38:26.159 components so right here as the second
01:38:28.639 part of the content I can add a second
01:38:30.880 string and say/ components and then also
01:38:34.760 Target all of the components and
01:38:37.440 immediately that will allow us to apply
01:38:40.560 Tailwind Styles within our components
01:38:42.560 folder and immediately the images will
01:38:45.560 appear so this is looking absolutely
01:38:48.880 amazing and it is so nice to be able to
01:38:52.159 scroll with my thumb across all of these
01:38:55.040 movies and since we're using touchable
01:38:57.320 opacities you can see as I hover over
01:38:59.480 them it appears as they are clickable
01:39:02.239 all of this is happening natively within
01:39:04.480 our mobile application beautiful for me
01:39:07.159 I see some of the movies that are
01:39:08.480 currently popular if you're watching
01:39:10.599 this video later on for you some
01:39:12.560 different ones might be so in the
01:39:14.280 comments down below let me know what is
01:39:16.239 the popular movie from your list that
01:39:18.080 you like and with that said we also have
01:39:20.480 one little error right here saying that
01:39:22.840 the path of movie slash is not a valid
01:39:25.920 path and it's actually pretty amazing
01:39:28.440 that react native can understand that we
01:39:30.719 don't have a movie ID path we only have
01:39:33.880 movies plural so as soon as we change it
01:39:37.239 that's working great so now that we're
01:39:40.239 showing the image and title already this
01:39:42.560 is looking amazing but we might as well
01:39:45.080 show some more information so let me
01:39:47.560 open up another view right here and give
01:39:50.320 it a class name of flex - row items Das
01:39:55.599 Center justify Das start and a gap of X
01:40:00.000 meaning horizontal only of
01:40:02.760 one within it we can display another
01:40:05.560 image but this time a much simpler one
01:40:09.000 just coming from icons which is coming
01:40:11.360 from constants do star so we want to
01:40:14.679 display the number of stars for each one
01:40:17.000 of these with a class name equal to size
01:40:22.360 is set to four and below it we can
01:40:25.320 render a piece of text that'll round up
01:40:28.280 the current score so I can use the
01:40:30.840 math.round vote
01:40:33.119 average divided by two because it goes
01:40:36.080 up to 10 we want to have it up to five
01:40:38.639 so if we do this and reload our
01:40:40.560 application the changes are still not
01:40:43.000 getting applied so sometimes you might
01:40:45.480 need to just reload your application by
01:40:47.960 pressing contrl C and then run MPX
01:40:50.840 expose start one more time and then
01:40:52.880 press R to fully reload it but why can't
01:40:56.040 we see the star yet oh it's not SRC in
01:40:58.960 react native it's Source oh it's those
01:41:02.239 little gotas right that always get you
01:41:04.480 there are some small differences between
01:41:06.239 react and react native so be careful but
01:41:09.360 thankfully there aren't many let's also
01:41:12.159 give this text a class name of text- XS
01:41:15.960 extra small text- white and font Das
01:41:20.480 bold as well as uppercase so now we can
01:41:24.199 show the rating right here below this
01:41:27.080 view let's render another
01:41:29.639 view this one will have a class name
01:41:33.320 equal to flex D row items Das Center and
01:41:37.800 justify Dash between and within it we
01:41:40.960 can render a piece of text that'll have
01:41:43.520 a class name equal to text- XS text
01:41:49.679 dl-300 font D medium and the margin top
01:41:53.679 of one and within it we can render the
01:41:56.119 release date but it'll be too long like
01:41:59.440 this so we can just split it by saying
01:42:02.760 question mark. spit based on the dashes
01:42:07.760 and we can only take the first part of
01:42:09.400 the dash which is the year we just care
01:42:11.599 about when this movie was
01:42:13.280 released and below this piece of text we
01:42:16.119 can render another that will simply say
01:42:19.639 movie and we can give it a class name
01:42:22.480 equal to
01:42:23.719 text- EXs font D medium text- light 300
01:42:29.679 and uppercase and if you save it it'll
01:42:32.440 now say movie this is cool to have later
01:42:34.679 on in case maybe some are not movies but
01:42:37.360 maybe TV shows so you can specify which
01:42:39.800 one it is but for now I will simply
01:42:42.080 comment it out and I also want to make
01:42:44.159 sure that the title takes only one row
01:42:46.599 because if it doesn't that can mess up
01:42:48.480 with the view so where we have the title
01:42:51.280 that's going to be right here under this
01:42:53.199 text property we don't have to shorten
01:42:55.159 the string react natives text element
01:42:57.960 comes with a pre-built number of lines
01:43:01.159 prop where you can say that this text
01:43:03.280 should only take one line and
01:43:05.360 immediately you can see that it is
01:43:07.199 shortened to just a single line looking
01:43:10.320 great with that in mind I invite you to
01:43:12.880 further style this card right now we're
01:43:15.239 just showing the title the profile photo
01:43:17.679 the rating and the year but as you know
01:43:19.880 we're getting back so much more data
01:43:22.199 about each one of of these movies so you
01:43:25.040 can go ahead and utilize something else
01:43:27.560 like the original language or the
01:43:30.119 popularity or even show the overview
01:43:32.560 right here so feel free to play with it
01:43:35.320 and try to further customize this card I
01:43:38.199 will suggest with simply destructuring
01:43:40.239 some more props from right here and then
01:43:42.760 using them within your jsx but don't
01:43:45.159 worry about it too much because very
01:43:46.800 soon we'll be able to show all of the
01:43:49.239 details about a movie within our movie
01:43:51.880 Details page so keeping that in mind I
01:43:54.719 am now more than happy with how our
01:43:57.239 homepage is looking and if we head back
01:43:59.599 to the index. TSX you can see that we're
01:44:02.719 fetching back all the movies but now
01:44:05.239 what we can do is for the time being
01:44:08.480 manually change the query to see whether
01:44:12.000 our function works for fetches where
01:44:14.840 we're searching for a specific movie so
01:44:17.599 if I type something like Iron Man and
01:44:20.360 click save you can see that it'll reload
01:44:23.400 and show all of the movies that match
01:44:25.800 that search term pretty cool right and
01:44:28.800 if I bring it back we're back to where
01:44:30.679 we were it's not that hard right once
01:44:33.320 you understand the basics using it the
01:44:35.400 next time will feel much easier but this
01:44:38.159 was just one example of creating a
01:44:40.840 custom hook for fetching data you can
01:44:42.880 create custom hooks for many other
01:44:44.560 things like handling forms like react
01:44:46.880 hook form managing themes or storing
01:44:49.679 data in local storage you can do
01:44:51.440 whatever you want but don't give me me
01:44:53.239 wrong you don't always need to create
01:44:55.159 your own hooks only when it really makes
01:44:57.440 sense to do so because react 19 comes
01:45:00.560 with a lot of pre-built hook like the Ed
01:45:03.480 hook yep it's only used like this and it
01:45:07.400 does some pretty cool things there's
01:45:09.159 also the use action State use form State
01:45:12.119 use transition which make working with
01:45:14.599 forms and requests much easier and I
01:45:17.480 actually explain all of these in detail
01:45:20.480 with real examples and even better
01:45:22.560 projects
01:45:23.599 within the new react native course that
01:45:26.000 I'm right now building for JS Mastery
01:45:28.800 Pro it's a new learning platform where
01:45:31.080 you can learn Lesson by lesson with real
01:45:33.520 examples and even better projects so go
01:45:36.599 ahead and check it out I'll leave the
01:45:38.119 link in the description but with that
01:45:40.320 let's go ahead and develop the search so
01:45:42.320 we no longer have to manually pass the
01:45:44.080 query right here instead we can use the
01:45:46.800 actual search page and then pass over
01:45:49.880 real values great job so far the app is
01:45:53.520 already looking amazing but now we'll
01:45:55.920 make it stand out with even better
01:46:00.159 functionalities similar to what we did
01:46:02.080 in the home screen now is the time to
01:46:04.760 develop the search screen so let's open
01:46:07.280 up our file explorer and head over into
01:46:10.080 tabs search. TSX now we could totally
01:46:14.320 just copy the entire index. TSX and just
01:46:17.679 paste it over into the search but I want
01:46:20.679 to take the time to guide you through
01:46:22.800 the the process of building it out one
01:46:24.920 more time because although it'll be very
01:46:27.719 similar there will be some differences
01:46:30.080 here and it's just a beautiful chance to
01:46:33.000 recap everything we've learned so far
01:46:35.159 just to make sure you totally get it
01:46:36.880 I've made the font a bit smaller just so
01:46:38.719 you can nicely see everything and we are
01:46:41.280 ready to get started first this view
01:46:44.840 that we're wrapping everything with will
01:46:47.159 have a class name of flex D1 and BG -
01:46:51.880 primary just so we don't have to stare
01:46:53.840 at that blank screen anymore next within
01:46:57.040 it I'll display another image which I'll
01:47:00.280 import from react native and it'll have
01:47:03.280 a source equal to images coming from
01:47:07.040 constants BG so this is our background
01:47:10.760 with a class name of flex
01:47:13.840 D1 absolute W full and Z of zero as well
01:47:19.480 as a resize mode equal to cover
01:47:23.800 similar to as on the homepage next in
01:47:26.599 this case instead of wrapping everything
01:47:29.400 with the scroll view as we did on the
01:47:31.360 index here we don't want to scroll the
01:47:33.639 entire view because the search bar
01:47:35.840 always has to remain on top so here I
01:47:39.080 will actually just render a flat list
01:47:42.239 pass the movies to it and pass the
01:47:45.119 similar render item as before where we
01:47:48.080 will destructure the each individual
01:47:50.480 movie and for each one we'll simply
01:47:53.000 render a movie card to which we will
01:47:56.320 spread the item property or in this case
01:48:00.199 the movie itself so let me put these
01:48:03.000 props in a new line so it's easier to
01:48:04.920 see and we are rendering this movie card
01:48:08.119 right here there we go now of course
01:48:10.520 where are these movies coming from well
01:48:13.080 this part we can definitely grab from
01:48:15.000 the index we're getting them by simply
01:48:17.440 calling our use fetch fetch movies this
01:48:21.199 is a custom hook we already created we
01:48:23.280 might as well grab this used router at
01:48:24.840 the top we'll surely need to use it and
01:48:27.480 I'll paste it right here at the top of
01:48:29.440 our
01:48:30.199 search make sure to also get all the
01:48:32.840 Imports such as this movie card right
01:48:35.440 here and now if we go back to the search
01:48:38.040 you'll see we have well something right
01:48:40.920 a broken layout so far next as before we
01:48:44.480 need a key extractor to let react native
01:48:47.960 which ID does each one of these elements
01:48:50.159 have and here we can just say that each
01:48:53.920 one will get it from item.
01:48:57.639 id. to string we'll also render a class
01:49:02.119 name and give it a padding X of five so
01:49:05.840 some spacing a number of columns will be
01:49:09.480 set to three as before and we have to
01:49:12.199 reload our application for the changes
01:49:14.239 to take effect there we go this is a bit
01:49:16.440 better as well as we can provide the
01:49:19.679 column wrapper style which will be an
01:49:23.159 object that will say justif a content is
01:49:25.560 equal to center a gap of 16 in between
01:49:29.520 the elements as well as a margin
01:49:32.320 vertical to create some space for the
01:49:34.520 search bar of 16 as well we can also
01:49:38.480 render the content container style as
01:49:41.880 before which will simply have a padding
01:49:44.599 bottom of something like 100 and now
01:49:48.719 bear with me before we display the
01:49:51.880 search bar at the top of the flat list
01:49:54.840 because we were able to scroll the whole
01:49:57.199 thing we didn't need to see the search
01:49:58.800 bar but in this case we'll render the
01:50:01.440 search bar as a part of the flat list so
01:50:05.840 I'll do that with yet another special
01:50:08.280 flat list prop called list Heather
01:50:12.000 component I'll open up an empty react
01:50:14.800 fragment and whatever you put within it
01:50:17.639 will be displayed at the top of our list
01:50:20.880 so let me say something like like View
01:50:24.360 and this view will have a class name of
01:50:28.840 w-o
01:50:30.960 flex-r justify Dash Center margin top of
01:50:35.119 20 and items Das Center and within it we
01:50:39.320 can display our logo that'll be an image
01:50:42.639 with a source equal to icons make sure
01:50:45.920 to import them from icons constants do
01:50:49.719 logo with a class name of W12 and h10 so
01:50:55.679 now we get the logo at the top as I
01:50:57.599 promised whatever you put within the
01:50:59.280 list header component even though it's
01:51:01.239 just a part of the flat list it'll
01:51:03.360 actually show on top as that's what this
01:51:05.400 component does rendered at the top of
01:51:07.639 all the items now below the view that's
01:51:10.920 wrapping the image we can render another
01:51:13.639 view this one will have a class name
01:51:17.440 equal to margin y of five and here we
01:51:21.719 can render the search bar coming from
01:51:24.119 components search bar and we can give it
01:51:27.119 a placeholder of something like search
01:51:30.679 movies dot dot dot there we go it
01:51:33.360 appeared right on top right below the
01:51:35.280 view we can also check whether we are
01:51:37.560 currently loading so I'll say something
01:51:39.719 like movies loading and if movies are
01:51:43.040 loading then we can show an activity
01:51:46.960 indicator with a size is equal to large
01:51:51.159 a color is equal to
01:51:54.239 000000 FF and a class name equal to
01:52:00.040 margin y of three so now we have to get
01:52:03.040 access to this movies loading and we're
01:52:05.760 getting it right here through this use
01:52:08.239 fetch call but I have to spell it
01:52:10.440 properly the L in loading is uppercased
01:52:13.800 now if we go back if you're paying close
01:52:17.040 attention you would have been able to
01:52:19.119 see the loading for a short period of
01:52:21.280 time but if we don't have a loading then
01:52:24.320 it is possible that we might have some
01:52:26.320 kind of an error so I'll say if movies
01:52:29.840 error in that case we can render just a
01:52:33.440 single piece of text that'll have a
01:52:36.199 class name of text-
01:52:40.960 r-500 padding X of five and margin y of
01:52:45.239 three and the text will say
01:52:48.639 error and then we'll render the movies
01:52:51.199 error die message no errors for now and
01:52:54.679 finally below it I'll open another
01:52:57.000 Dynamic block of code and if we're
01:52:59.760 neither loading nor there is an error
01:53:03.880 then we can take a look into the current
01:53:06.079 search term let's say that the search
01:53:08.599 term right now is hardcoded search
01:53:11.280 term. trim so we want to trim any extra
01:53:14.159 spaces and if the search query exists as
01:53:16.719 well we want to check if there are any
01:53:19.239 movies. length so movies question mark.
01:53:22.280 link length for that search term and if
01:53:25.280 that is greater than zero in that case
01:53:28.360 we can finally return a piece of text
01:53:31.520 and this piece of text will say search
01:53:35.239 results
01:53:36.880 for we can put an empty string right
01:53:39.400 here and then render another piece of
01:53:42.280 text that'll say search term and I'll
01:53:45.760 style the second piece of text by giving
01:53:47.920 it a text- accent class name and I'll
01:53:51.320 style the first piece of text text by
01:53:53.639 giving it a class name of text- excl
01:53:58.639 text- white and font Dash bolt oh and
01:54:02.159 now I see that I call this just loading
01:54:04.000 an error instead of movies errors and
01:54:05.840 movies loading so you know what it might
01:54:07.880 be just simpler to call it like that it
01:54:09.840 makes sense that we're loading the
01:54:11.400 movies so I'll just not rename the
01:54:14.679 loading in the error to loading movies
01:54:16.880 and loading error I'll just keep them as
01:54:18.679 loading and error so here I can now
01:54:21.639 change the mov loading to loading and
01:54:24.599 error to error same thing right here and
01:54:28.800 now this message right here makes sense
01:54:31.480 if there is no loading and no error and
01:54:34.880 search term exist and if movies that
01:54:37.599 length is greater than zero well then
01:54:40.079 display this piece of text so now if you
01:54:42.320 go
01:54:43.639 back you can see search results for
01:54:47.079 search term so let's make it Dynamic
01:54:50.040 right at the top of this component I'll
01:54:52.760 create another Ed State we don't need
01:54:56.079 the router in this case so let me delete
01:54:58.760 it and let me Define a use State snippet
01:55:02.679 called search query set search query at
01:55:07.000 the start equal to an empty string also
01:55:09.639 when calling these movies in this case I
01:55:12.639 want to pass a second parameter to the
01:55:15.400 use fetch function of false because in
01:55:18.960 this case we don't want to autof fetch
01:55:21.960 we just just want to let the user
01:55:23.760 actually trigger the fetch on search so
01:55:26.280 that's why we initially extended this
01:55:28.400 custom hook to allow for autof fetch
01:55:31.400 when we're on the homepage or to
01:55:33.719 disallow it when we want the user to
01:55:36.119 search First and of course we can now
01:55:38.360 put the search query to use and say give
01:55:41.400 me the movies where the query matches
01:55:44.280 the query that the user currently
01:55:45.639 searched for so now that we have access
01:55:47.719 to the search query right below we can
01:55:51.440 replace this big search term with search
01:55:54.239 query. trim and also below where we're
01:55:57.880 saying search term we can render the
01:55:59.960 actual search
01:56:01.440 query so now if I open up my keyboard by
01:56:05.079 clicking on the list and I start typing
01:56:07.880 you'll see nothing is yet changing and
01:56:10.599 that's because we haven't passed proper
01:56:12.800 values into the search bar so to the
01:56:15.000 search bar alongside the placeholder we
01:56:18.920 also have to pass the value
01:56:23.360 equal to search query as well as on
01:56:27.360 change text equal to a callback function
01:56:31.960 where we simply set query or set search
01:56:34.639 query to be equal to text that is coming
01:56:37.760 right here through props and we can set
01:56:39.960 the type of this search to a string but
01:56:43.639 as you can see the search bar is still
01:56:45.360 not accepting the value prop so let's
01:56:48.119 head into it and let's implement it I'll
01:56:50.280 simply say also accept the value
01:56:52.760 and the value will be of a type string
01:56:55.040 once you do accept it simply forward it
01:56:57.360 here value and also forward the onchange
01:57:02.360 text I believe that's how we called it
01:57:04.360 onchange text so it'll be a function
01:57:08.520 that doesn't return anything void and
01:57:12.040 now we can make that onchange text right
01:57:14.760 here instead of this dummy cack
01:57:18.679 function if we now do that looks like I
01:57:22.040 did properly defined the type here we
01:57:25.079 are getting something as the first
01:57:26.360 parameter and it is text of a type
01:57:29.719 string so if I fix that you can see that
01:57:32.920 the error goes away and now if I start
01:57:35.360 typing something like
01:57:37.760 Batman you can see that the search
01:57:39.880 results change immediately right here
01:57:42.360 below I can type Marvel that works as
01:57:45.280 well it works incredibly well and as
01:57:48.360 soon as I delete it the search results
01:57:50.760 go away great
01:57:52.719 but finally what matters most is
01:57:55.079 rendering the movies that match that
01:57:57.119 search term so I'll create a new use
01:58:01.199 effect right here below this use effect
01:58:04.719 will have a callback
01:58:06.480 function and a dependency array we want
01:58:10.000 to recall it every time that the search
01:58:12.960 query changes so I'll say if search
01:58:16.719 query. trim exists so if there is
01:58:20.520 something that the user has searched for
01:58:22.960 then await and as a return value of the
01:58:25.679 fetch we're also getting access to the
01:58:27.920 refetch function which we can rename to
01:58:31.079 load movies because that's exactly what
01:58:33.280 it does and also we get access to
01:58:36.679 reset so now if there is a search term
01:58:39.960 whenever the search query changes just
01:58:43.079 await load movies like this else simply
01:58:48.599 reset the state and since we're using a
01:58:50.840 w right here we'll have to wrap this
01:58:53.239 into an asynchronous function so I'll
01:58:56.040 say const funk and I'll make it equal to
01:58:59.679 an asynchronous function that then has
01:59:01.960 this if within it that'll look something
01:59:04.520 like this and now we can call this
01:59:06.440 function just below if I do that
01:59:09.000 initially you'll see no movies but if I
01:59:11.920 search for Iron Man you can see all the
01:59:15.719 movies that match that search term and
01:59:18.159 if you start deleting it you can see
01:59:20.159 that we get back to well I I think we
01:59:22.400 got back to whatever the letter was
01:59:24.920 there before we actually removed it so
01:59:27.360 this is the letter i movies and then
01:59:30.239 yeah if we remove it we have nothing now
01:59:32.800 there's a couple of problems with this
01:59:34.840 and that is that let's say that I want
01:59:36.400 to type a normal movie name like Iron
01:59:39.639 Man like what happened here is that the
01:59:42.800 app made a request to the API for every
01:59:46.440 single letter that I type that is a lot
01:59:52.520 of different requests and for each one
01:59:54.840 we're getting many movies but hey I just
01:59:56.920 wanted to see the ones that I get back
01:59:59.280 once I type the entire search term so to
02:00:02.599 not overload our application with too
02:00:04.840 many API requests for every single
02:00:07.400 keystroke what we need to do is
02:00:09.760 something called
02:00:11.560 debouncing we can debounce a search term
02:00:15.079 by wrapping it into a timeout function
02:00:18.599 so I'll say const timeout ID is equal to
02:00:24.840 set
02:00:26.400 timeout and then we have this function
02:00:30.000 and we can close it here as well and in
02:00:32.360 this case you don't have to call it but
02:00:34.400 we do have to give it a second parameter
02:00:36.800 which is a number of milliseconds of how
02:00:39.320 long it'll wait for the next keystroke
02:00:42.560 I'll explain what that means soon and
02:00:45.400 now we can return a callback function
02:00:48.440 where we can clear the timeout with that
02:00:52.119 specific timeout ID this is just to make
02:00:55.960 our application work more efficiently we
02:00:58.360 need to clear out all the timeouts but
02:01:01.000 with that said check this out if I type
02:01:03.920 very quickly you'll see that as long as
02:01:06.840 I continue typing no request will be
02:01:09.320 made but as soon as I stop typing for
02:01:12.760 500 milliseconds which is half a second
02:01:15.040 immediately I'll get the results this
02:01:17.000 means that a user that types fast can
02:01:19.400 only make a single request and get the
02:01:21.599 data they would usually get as well but
02:01:23.719 this time in a single request instead of
02:01:26.159 a dozen great but now what happens if I
02:01:29.920 search for something that just doesn't
02:01:32.840 exist we are left with a completely
02:01:36.119 empty screen something that you never
02:01:38.480 want to see within your application you
02:01:40.679 always want to show some kind of an
02:01:42.119 empty State and believe it or not once
02:01:45.800 again I think you can now start seeing
02:01:47.679 what I was saying from the start in
02:01:50.440 react native components there is a prop
02:01:53.599 for everything from the data render item
02:01:57.760 key extractor to defining how a header
02:02:00.239 will look like two even defining how an
02:02:03.880 empty state will look like yep list
02:02:07.760 empty state is a valid flatlist prop
02:02:11.159 that allows us to specify what the user
02:02:13.360 will see if there's nothing in the list
02:02:16.079 so I'll say if there is no
02:02:18.760 loading and if there is no error
02:02:22.760 in that case and of course if we're
02:02:25.560 empty we'll show a view with a class
02:02:29.599 name equal to margin top of 10 and
02:02:33.639 padding X of five a text
02:02:36.199 element with a class name of text-
02:02:39.599 Center and text- gray 500 and within it
02:02:44.040 we can say search
02:02:45.719 query. trim if the search query exists
02:02:49.520 will say no movies found
02:02:52.719 but if a search query doesn't exist
02:02:54.880 we'll say search for a movie and of
02:02:59.440 course if there is a loading on error
02:03:03.199 we'll just return null for the empty
02:03:06.280 list component because we want to
02:03:07.840 display something else so currently we
02:03:10.599 get no movies found and if you wanted to
02:03:14.199 you could display a nice illustration
02:03:16.480 right here and say you know go ahead and
02:03:18.960 search for something cool or here's a
02:03:21.480 movie recommendation that you might want
02:03:23.079 to watch based on your history there's a
02:03:25.480 lot of things you can do on empty States
02:03:28.040 but hopefully the users won't be staring
02:03:30.159 at this for too long as they're going to
02:03:32.239 put our search to use great so in this
02:03:35.760 lesson we recapped what it means to
02:03:38.920 create a react native screen that uses
02:03:42.199 our custom hook fetches data from a
02:03:45.040 third party
02:03:46.079 API changes it based on the search query
02:03:49.520 that the user types in using their
02:03:51.280 keyboard as well as how to debounce a
02:03:54.159 search term to optimize it further and
02:03:56.639 not make too many requests and finally
02:03:59.199 how to use a flatlist component with all
02:04:01.679 of its props to properly render the
02:04:03.800 layout doesn't get much better than this
02:04:05.960 now in the next lesson we'll bring our
02:04:08.639 app to the next level we'll Implement an
02:04:11.280 algorithm that displays trending movies
02:04:15.480 so I'm not talking popular or searched
02:04:18.800 but rather show the movies that match
02:04:22.400 what the users within our app are
02:04:25.079 searching for that can kind of give you
02:04:27.320 an idea of who your users are and how we
02:04:30.320 can further customize the app so let me
02:04:33.040 show you how to implement it in the next
02:04:36.840 lesson so hey custom algorithm right
02:04:41.320 well technically yes you'll Implement a
02:04:43.320 feature that displays the movies that
02:04:45.559 The users are searching for within the
02:04:47.480 app to be more specific the more
02:04:49.760 frequently a specific search is
02:04:51.760 performed by multiple users the higher
02:04:54.679 its trending status becomes this
02:04:57.320 requires tracking and analyzing search
02:05:00.079 patterns over time for example if many
02:05:02.840 users Search for Avengers that search
02:05:05.679 term becomes trending and to track and
02:05:08.960 analyze these searches we need a place
02:05:11.639 to store that data permanently this is
02:05:14.800 where a database comes into the picture
02:05:17.480 it keeps all the information organized
02:05:20.119 and accessible and traditionally Ally
02:05:22.360 implementing this would mean building a
02:05:24.400 full stack application you'd have to
02:05:27.119 create a server set up a database
02:05:29.800 connect them host everything together
02:05:32.800 and then integrate it into your react
02:05:34.760 native project while this approach works
02:05:38.000 it can be a lot of effort and requires
02:05:40.679 diving into backend development which is
02:05:42.960 a whole different area of expertise an
02:05:45.239 easier way to get backend functionality
02:05:47.920 without starting from scratch is using a
02:05:50.559 backend as a service platform it'll
02:05:52.599 provide you with apis and tools to let
02:05:55.079 you store your data manage off and more
02:05:58.400 without needing in-depth backend
02:06:00.040 knowledge in this course I'll use aite
02:06:03.239 because it's simple open- source and
02:06:05.559 free to use plus it'll save us from
02:06:08.040 diving head first into backend work when
02:06:10.440 we really just want to focus on making a
02:06:12.440 react native app great so click the link
02:06:14.920 in the description and create your
02:06:16.960 account and then head over to your
02:06:19.760 console if you haven't already create
02:06:22.199 your project or just head over into the
02:06:24.480 one you already created and copy its ID
02:06:27.360 back within your app head over into ourv
02:06:30.400 file and let's create our second
02:06:32.559 environment variable Expo public aight
02:06:37.239 project ID and simply paste the one you
02:06:40.280 just copied now we'll have to set up a
02:06:42.599 platform for a project in this case
02:06:45.159 aight already comes with react native so
02:06:47.880 let's select it and you'll have to
02:06:50.159 choose Android or for
02:06:52.400 iOS and give it a name I'll do JSM movie
02:06:57.119 app and as the bundle ID you can type
02:06:59.880 something like com. JSM doov app like
02:07:04.679 this and click next it'll give you some
02:07:07.440 dependencies you want to install so copy
02:07:09.880 them open up your second terminal and
02:07:12.920 paste them right here to install app
02:07:15.480 right click
02:07:16.800 next next one more time because we'll do
02:07:19.440 this together and go to the the
02:07:21.639 dashboard and now we can set up the rest
02:07:23.840 of the back end together specifically
02:07:26.040 create a database and some collections
02:07:28.239 within it so let's do that next just to
02:07:31.280 give us some extra space to work with I
02:07:33.599 have hidden my Mobile screen from here
02:07:35.280 for now and I'll create our first
02:07:37.719 database I'll call it movies and create
02:07:41.920 as soon as you create it you'll be given
02:07:43.880 a database ID copy it and store it
02:07:47.040 within your editor within the EnV file
02:07:49.760 as Expo public aite database ID next
02:07:56.280 create a new collection within that
02:07:58.320 database call it metric you'll also be
02:08:02.079 given the ID of the metric collection so
02:08:04.800 copy it and paste it as the
02:08:07.800 Expo public aight collection
02:08:12.520 ID and baste it now you'll want to
02:08:15.679 create different attributes for the
02:08:17.639 metrics
02:08:18.880 collection the first one will be a
02:08:21.840 string of search term so let's say
02:08:25.199 search term let's say that it can have
02:08:27.639 maybe 1,000 characters and let's make it
02:08:30.840 required after that we'll do an integer
02:08:33.679 of
02:08:34.760 count it won't be required and we don't
02:08:38.360 need to enter the Min and Max size but
02:08:40.920 the default can be set to zero so this
02:08:43.360 is how many times has a user searched
02:08:46.119 for each specific movie or rather for a
02:08:48.880 specific search term let's also create
02:08:50.599 another attribute of a type URL and call
02:08:54.079 it poster URL I'll make it
02:08:57.760 required so we can store the poster of
02:09:00.360 the movie that people are searching for
02:09:02.599 we can also save an integer called
02:09:05.960 moviecore
02:09:07.719 ID and I'll make it
02:09:10.639 required and finally we want to save the
02:09:13.280 title of the movie people are searching
02:09:15.599 for I'll enter the size of 1,000 better
02:09:19.040 to have more than less and I'll make it
02:09:21.000 requireed
02:09:23.199 great and now we just want to make sure
02:09:25.440 that we give this collection all the
02:09:27.400 necessary permissions to be able to
02:09:29.559 update it so head over to settings
02:09:32.360 scroll down to permissions and click any
02:09:36.159 and tick create read update and delete
02:09:39.360 this is the easiest way to do it just to
02:09:41.320 make sure that we don't have any
02:09:42.480 permission errors now we just want to
02:09:44.599 make sure that we can read any kind of
02:09:46.599 value from aight so to be able to do it
02:09:49.840 let's create a new file within
02:09:52.719 services and let's call it
02:09:56.440 aight. TS within it we'll Implement two
02:10:00.000 functions the first function will track
02:10:03.280 the
02:10:04.440 searches made by a user it'll have to
02:10:08.079 accept two different params so let's
02:10:10.480 Cote it out export
02:10:13.679 const update search count and let's make
02:10:18.559 it equal to an asynchronous function
02:10:21.320 that accepts two different props the
02:10:24.040 query of a type string so what the user
02:10:26.800 is searching for and then the first
02:10:28.920 movie that matches that search query so
02:10:32.119 I'll say movie of a type movie then we
02:10:35.320 have to perform a couple of steps we
02:10:37.920 have to call the aight API to browse the
02:10:41.719 database and check if a document already
02:10:44.320 exists for the given search term so
02:10:47.360 check if a record of that search has
02:10:52.000 already been
02:10:54.239 stored then if a document is found
02:10:57.760 simply increment the Search Count
02:11:01.760 field but if no document is
02:11:05.159 found in that case it means that it's a
02:11:07.880 new search term so we want to create a
02:11:10.159 new document in aight
02:11:12.840 database and then we want to initialize
02:11:15.400 its count to one so how would that look
02:11:17.960 in practice well something like this
02:11:20.480 first we want to check everything that
02:11:22.159 we have in our app database by saying
02:11:24.840 const result is equal to a weit and now
02:11:30.119 we have to call the aight database but
02:11:33.159 before calling it we actually have to
02:11:35.239 set it up to be able to make that call
02:11:38.440 that looks something like this we can
02:11:40.880 first Define our environment variables
02:11:43.719 by saying const database unor ID is
02:11:47.800 equal to the variable coming from
02:11:50.000 environment variables process. env. exop
02:11:55.159 public aight database ID and make sure
02:12:00.040 you don't have a typo like I do right
02:12:02.559 here and at the end of that line you can
02:12:05.440 add an exclamation mark which tells
02:12:07.480 typescript that we know that this value
02:12:09.760 will be there because it cannot know
02:12:11.719 what we have within our envs but we do
02:12:14.880 know it and I'll also create another one
02:12:18.599 const collection ID will be equal to
02:12:22.440 process. env. Expo public aight
02:12:28.159 collection
02:12:29.760 ID just like this now we can set up a
02:12:34.119 new aight client const client is equal
02:12:38.000 to new
02:12:40.239 client and make sure to import this
02:12:43.159 client coming from react native app
02:12:46.599 right and we want to call a method
02:12:48.880 called set endpoint on it to which we
02:12:51.800 want to pass the default aight endpoint
02:12:56.520 https
02:12:59.040 colon cloud.
02:13:02.079 aight.
02:13:03.960 slv1 and we want to
02:13:06.199 choose our project by passing the ID of
02:13:09.880 our project that is the process. env.
02:13:14.040 Expo public aite project ID perfect so
02:13:21.599 now we have our aight client and we are
02:13:24.360 ready to set up our database instance
02:13:27.880 belonging to that aight client by saying
02:13:30.599 cons database is equal to new
02:13:36.520 databases this is coming from aight so
02:13:39.199 make sure to import it and to it you can
02:13:41.920 pass the client that we want to
02:13:43.639 initialize this database on once you do
02:13:46.000 that we can go back to where we were
02:13:48.679 result is equal to await
02:13:52.559 database. list
02:13:56.000 documents and you want to pass in a
02:13:58.679 couple of things first is the database
02:14:01.360 ID within which we want to list the
02:14:03.719 documents then we have to specify within
02:14:06.360 which collection do we want to fetch it
02:14:08.280 collection ID and then you want to pass
02:14:11.480 the actual query so query. equal and we
02:14:16.000 want to match the search term with the
02:14:18.880 query that the user is currently passing
02:14:21.679 and of course this query is also coming
02:14:23.960 from react native aight oh and make sure
02:14:26.719 to put it within an array not within an
02:14:28.800 object because there can be multiple
02:14:30.960 queries or multiple criteria that we're
02:14:33.840 searching or listing the items by so
02:14:36.559 let's go ahead and conso log the result
02:14:39.040 and before we try to get back any result
02:14:41.679 let's make sure to reload our
02:14:43.480 application by stopping it from running
02:14:46.159 and then rerunning MPX Expo start when
02:14:49.000 you change your environment variables
02:14:50.719 you you might want to always reload it
02:14:52.679 just to make sure the changes are taken
02:14:54.280 into account so I ran the application
02:14:57.800 and now back on the search page we want
02:15:00.000 to call this update Search Count
02:15:01.920 function so let's head over into search
02:15:04.760 within tabs and I'll add it for now just
02:15:08.599 here at the top of this use effect call
02:15:11.639 the update search count and make sure to
02:15:15.000 import it from Services aight if you do
02:15:18.599 it properly and navigate over to the
02:15:21.000 search function you won't be able to see
02:15:23.199 anything yet but if you pass the search
02:15:26.920 query into the update Search Count
02:15:29.239 function as well as the movies zero so
02:15:33.000 the first movie that you get back for
02:15:34.920 that search
02:15:36.400 query you'll see that you'll get back
02:15:38.960 documents zero total zero which means
02:15:42.320 that we're successfully accessing the
02:15:44.360 app right database but there's nothing
02:15:46.760 to be fetched yet this is good this is
02:15:48.960 the only thing we wanted to see for now
02:15:50.679 and if you don't yet see it that's okay
02:15:52.719 don't worry about it now we'll actually
02:15:55.599 create our first document and then we'll
02:15:58.159 be able to fetch it so now we have to
02:16:02.000 check if a record of that search has
02:16:04.639 already been stored so I'll say if
02:16:08.199 result. documents. length is greater
02:16:12.559 than zero then we want to search for the
02:16:15.840 existing movie so con existing movie is
02:16:20.239 equal to
02:16:23.639 result. documents zero so this is the
02:16:27.400 top movie that shows for that search
02:16:29.079 term in that case we want to say await
02:16:32.840 database. update document so if the
02:16:36.240 movie already exists and we need to pass
02:16:38.478 it the database ID to be able to know
02:16:41.718 within which database to update within
02:16:44.478 which collection to update and then
02:16:46.478 finally the ID that we want to update
02:16:49.040 that's going to be existing movie do
02:16:51.398 dollar sign ID and finally what do we
02:16:54.200 want to change well we want to set the
02:16:56.359 count to be equal to existing movie.
02:17:00.519 count + one because some other user has
02:17:03.959 already searched for it before else if a
02:17:06.398 movie doesn't yet exist then we can just
02:17:08.799 create that metric by saying a wait
02:17:12.318 database. create document within our
02:17:15.959 database ID within this specific
02:17:19.558 collection ID
02:17:21.799 and we also want to give it a unique ID
02:17:24.920 so say ID and import it from react
02:17:27.879 native app right do
02:17:30.519 unique so we're now creating a new
02:17:33.439 document in our aight database that will
02:17:35.920 allow us to store the searches that
02:17:38.519 people have entered and we can then
02:17:41.280 Define an object of how that record or
02:17:44.040 document in the data base will look like
02:17:47.359 and we can say search term will be equal
02:17:50.280 to query
02:17:51.959 moviecore ID so the first movie that
02:17:54.478 shows up will be the movie. ID the count
02:17:58.200 will be set to one by default and the
02:18:00.718 poster URL of that movie will be equal
02:18:03.679 to
02:18:05.120 https col and
02:18:07.439 forward image. tmb.jpg
02:18:21.240 similar to what we did on the homepage
02:18:23.478 or rather in the movie card and we can
02:18:25.478 put all of this within a tri block
02:18:28.200 everything from where we're trying to
02:18:29.920 get this result try to do this
02:18:34.120 everything we have here so let me close
02:18:36.398 it there we go and then catch if
02:18:40.439 something goes wrong well that must mean
02:18:42.840 that we have an error so simply
02:18:45.359 console.log the error message as well as
02:18:49.000 throw the error
02:18:51.599 great so with this code we should be
02:18:53.920 successfully updating the ight database
02:18:56.200 to store the metric of what the user has
02:18:58.478 searched so let's head back over into
02:19:01.120 the search and right below where we say
02:19:04.120 await load movies that means that the
02:19:06.558 search has actually been made check if
02:19:10.120 movies question mark. length is greater
02:19:12.879 than
02:19:14.040 zero and if movies question mark. Z
02:19:19.478 exists then we can await update Search
02:19:23.840 Count pass the search query as well as
02:19:26.959 the movies zero if I zoom it out that'll
02:19:29.840 look something like this so now let me
02:19:32.519 show you how that works I'll go ahead
02:19:34.959 and search for something like Avengers
02:19:39.080 and the first movie that shows up is
02:19:40.959 Avengers Infinity War I'll search one
02:19:43.599 more time for Iron Man for example I'm
02:19:46.200 want to roll with these superhero movies
02:19:48.519 and again please let me know which
02:19:49.840 movies do you like you can let me know
02:19:51.680 in the comments below this lesson and
02:19:53.600 I'll Search for
02:19:55.399 Avengers one more time just to replicate
02:19:58.720 as if some other user has searched for
02:20:01.000 that search term as well now we can head
02:20:03.359 back over into the database head into
02:20:05.920 movies metrics oh and I don't see any
02:20:09.479 documents yet that's interesting oh
02:20:12.880 check this out missing required
02:20:14.800 attribute title so back in app right
02:20:17.800 where we're creating a new document we
02:20:19.960 want to actually pass the title equal to
02:20:22.840 movie. tile so we can store that as well
02:20:26.240 oh that was my bad but thankfully we
02:20:28.120 were getting some logs
02:20:30.000 back now if I go ahead and and restart
02:20:33.720 this search and go back and
02:20:36.120 reload immediately a new document has
02:20:39.640 been added to the database Avengers
02:20:42.680 count one with the stored poster URL the
02:20:46.319 movie ID and the title so this means
02:20:49.080 that right now this is the top searched
02:20:51.200 movie now if I go ahead and search for
02:20:53.800 something like
02:20:55.840 Avatar and reload right here check this
02:20:59.359 out in our permanent data storage we're
02:21:01.640 now getting back two different documents
02:21:04.800 and now if another user goes ahead and
02:21:06.920 searches for
02:21:08.840 Avengers oh I misspelt it that's okay
02:21:11.880 there we go now this count should update
02:21:15.560 to two oh but it didn't it is still one
02:21:19.200 but let me try one more time maybe it
02:21:21.240 didn't send out the request I'll remove
02:21:23.640 1 s Avenger and I'll re it right now to
02:21:27.479 rep. search and if I reload you can see
02:21:31.640 that even the Avenger and then Avengers
02:21:34.040 gets added so we have the count of two
02:21:37.200 if I remove it and if I search for it
02:21:39.960 one more time and
02:21:44.760 reload now we're looking at the count of
02:21:47.520 three this is great it means we're
02:21:50.000 actually storing the data of the top
02:21:52.319 trending movies that The users are
02:21:54.359 searching for within our app so in the
02:21:56.960 next lesson let's go ahead and display
02:21:59.080 them at the
02:22:01.280 top in this lesson we'll first create a
02:22:04.960 function that queries the aight database
02:22:07.800 to retrieve the top movies our users
02:22:10.200 have searched for and then we'll display
02:22:12.080 it in a cool Netflix like Carousel at
02:22:15.000 the top so first things first let's
02:22:17.479 collapse this update Search Count
02:22:19.479 function I'll zoom out a bit and right
02:22:23.479 beneath it create a new function export
02:22:27.319 const get trending movies it'll be equal
02:22:32.600 to an asynchronous function and this one
02:22:35.000 doesn't have to get any props but it'll
02:22:37.520 just return a single promise of trending
02:22:41.960 movie array just like this or undefined
02:22:46.640 in case something goes wrong so here we
02:22:48.880 can open up a try and catch
02:22:52.160 Block in the catch if there's an error
02:22:55.680 we'll simply console log that
02:22:59.000 error and return undefined but in the
02:23:02.760 try we'll actually try to list out those
02:23:05.640 documents and we have already done that
02:23:07.920 at the top of the update search count
02:23:10.200 because to update we first have to fetch
02:23:12.280 them so let me copy this starting part
02:23:16.000 and paste it here con result is equal to
02:23:19.800 a wait database. list documents database
02:23:23.720 ID collection ID and this time I'll say
02:23:27.920 query. limit to five so we only want to
02:23:31.720 get the first five elements and query.
02:23:35.200 Order descending based on the count
02:23:39.640 field so we only want to show the top
02:23:43.319 five movies that people have searched
02:23:45.319 for sorted by the count and we can say
02:23:49.640 return
02:23:51.040 result. documents just to make
02:23:53.520 typescript happy we can say as
02:23:56.160 unknown as trending movie array this way
02:24:01.439 tab script will know exactly what we're
02:24:03.399 returning next we can call this function
02:24:06.240 within our homepage so head over into
02:24:09.160 index.
02:24:10.560 TSX I'll Zoom it out once again so you
02:24:13.200 can see a bit better and right above the
02:24:16.439 first use fetch call we're going to add
02:24:19.080 the second const we know how it works
02:24:22.680 you can call it use fetch but this time
02:24:26.000 to it we're going to pass the get
02:24:29.760 trending movies instead of fetch movies
02:24:33.720 and we get back the same things the data
02:24:36.520 which this time we can rename to
02:24:38.120 trending movies the loading which we can
02:24:41.439 rename to trending loading as well as
02:24:44.399 the error which we can rename to
02:24:47.279 trending error now just below where we
02:24:50.359 we have the activity
02:24:51.920 indicator we can say if movies
02:24:54.680 loading or trending loading and same for
02:24:58.520 the error if there is movies error or if
02:25:03.120 there is trending error show an error
02:25:05.840 that error can be movies error or maybe
02:25:08.960 it is trending error question mark.
02:25:12.359 message here to the search bar we don't
02:25:15.040 have to pass the value because we're
02:25:16.560 searching within the search page so we
02:25:19.240 can make this value optional right here
02:25:22.359 and what else is optional on press
02:25:24.359 placeholder what are we missing on
02:25:27.200 change text yeah we don't need it right
02:25:29.960 here in the homepage next right below
02:25:33.160 the search bar I'll say if trending
02:25:37.160 movies exist so if trending movies then
02:25:41.560 show a
02:25:43.520 view this view will have a class name
02:25:48.000 equal to margin top of 10
02:25:51.560 and we'll render a text
02:25:54.080 element that will say trending
02:25:57.800 movies of course let's go ahead and give
02:26:00.200 it a class name so we can see it of
02:26:02.840 text- LG as well as text- white font
02:26:07.960 Dash bold and margin bottom of three
02:26:11.040 let's open up our terminal and reload
02:26:13.000 the
02:26:13.760 app just to see where we are sometimes
02:26:16.439 it gets stuck so you have to reload it
02:26:18.800 you know that by now don't you and now
02:26:20.920 you can see trending movies title right
02:26:22.880 here below the search so how are we
02:26:25.120 going to render the trending movies well
02:26:27.920 believe it or not it's going to be a new
02:26:30.520 flat list to which we can pass the
02:26:32.920 trending
02:26:34.240 movies as the data and I'll pass the
02:26:38.319 render item to be equal to as before
02:26:41.960 we'll destructure the item as well as
02:26:44.960 the index from this function and then
02:26:47.319 for each item for now I'll s simply
02:26:50.680 return the item. tile but of course we
02:26:54.000 have to put it within a text so let me
02:26:56.040 actually expand this and return a text
02:26:59.240 element within which I'll render the
02:27:02.120 item.
02:27:03.439 tile and let's give it a class name
02:27:06.600 equal to text- White text DSM just so we
02:27:11.640 can see it now if we properly close this
02:27:14.439 flat list you'll be able to see three
02:27:17.200 top movies Avengers Infinity war three
02:27:19.920 times let's style it a bit by giving it
02:27:22.479 a class name of margin bottom of four
02:27:25.920 and margin top of three and I'll put
02:27:28.439 each one of these props in a new line
02:27:30.520 just so it's easier to see what's
02:27:31.960 happening there we go data render item
02:27:36.680 and then we render a text below render
02:27:39.120 item we'll have the key extractor it is
02:27:41.960 a mandatory thing where we get access to
02:27:45.040 the item and the ID will be coming from
02:27:49.080 item do movor id. TW string and
02:27:54.000 currently the top three movies all seem
02:27:56.439 to be Avengers Infinity War I guess
02:27:58.920 that's because for all three of these it
02:28:01.319 saved that as the title let me actually
02:28:03.319 delete those documents and let's try it
02:28:05.800 one more time now there should be no
02:28:08.359 latest
02:28:09.359 movies so now if I reload my application
02:28:12.720 once again right off the bat you'll see
02:28:15.000 an error right here saying that
02:28:17.200 virtualized lists should never be nested
02:28:19.840 into inside plain scroll views with the
02:28:22.520 same orientation because it can break
02:28:25.240 windowing and other functionality what
02:28:27.640 this means is that we cannot have at
02:28:29.760 least not the list with the same
02:28:32.479 orientation but don't worry about that
02:28:34.520 for now because very soon we'll change
02:28:36.680 the orientation of this flat list to
02:28:38.760 horizontal because that'll make it look
02:28:40.760 more like this so for now if I go back
02:28:43.200 to my app go to search and try with
02:28:46.960 something like Avatar and then I delete
02:28:50.240 that and maybe search for alien okay and
02:28:53.399 now if I go back to aight looks like the
02:28:56.160 metrics are not getting added so let's
02:28:58.520 debug it together I love it when
02:29:00.840 something obvious doesn't work when I'm
02:29:02.560 recording because it gives me the
02:29:04.200 opportunity to go back into the code and
02:29:06.680 I think that sometimes you can learn
02:29:08.080 more that way than just watching me code
02:29:10.439 everything out because you can see
02:29:12.399 exactly how I would approach the
02:29:14.680 debugging process first we have to ask
02:29:17.120 ourselves where is the error coming from
02:29:19.800 in this case we know that the documents
02:29:21.640 are not getting added to the ight
02:29:23.240 database so we have to ask ourselves
02:29:25.399 where is that within our code and that
02:29:28.000 is within the search page so if you head
02:29:30.160 over to the search page you'll see that
02:29:32.200 we have a single use effect now within
02:29:35.240 this use effect we have both await load
02:29:37.960 movies as well as update search count
02:29:41.160 and these two can race together and we
02:29:43.720 never get back the meaningful results so
02:29:45.880 we have to split them into two separate
02:29:48.080 use effects so I'll I'll copy this if
02:29:51.120 statement and within this first use
02:29:53.640 effect that gets executed whenever the
02:29:55.720 search query gets changed here we just
02:29:58.680 want to await load
02:30:00.560 movies but in the second one that I'll
02:30:03.600 create right now use effect where we
02:30:06.399 have a callback function this one will
02:30:09.319 change whenever the movies themselves
02:30:12.760 change and here we want to check if
02:30:15.840 movies do length is greater than zero
02:30:18.359 and if movie first EX exists then we
02:30:21.000 want to open up a codee block here and
02:30:23.319 we can simply call the update Search
02:30:25.439 Count without the use effect like this
02:30:28.080 now if we go ahead and search for
02:30:30.920 something like Avatar we'll get back the
02:30:33.359 movies I'll go ahead and search for
02:30:35.720 something like let's do
02:30:39.120 cats there we go and if I head back to
02:30:42.080 aight you'll see that we have two
02:30:44.279 different movies stored right here we
02:30:46.439 might as well go for the third one so
02:30:48.680 I'll go with iron
02:30:51.600 man there we go looking good and if I
02:30:56.200 reload it gets saved and of course what
02:30:58.960 we care about is what if another user
02:31:01.279 searches for a similar movie so if
02:31:03.720 another user searches for avatar for
02:31:06.399 example there we go does the count get
02:31:10.000 updated and this time it does so now if
02:31:13.960 we go back to the homepage and head back
02:31:16.439 over here where we're trying to show a
02:31:19.000 flat list of the top movies let me just
02:31:22.600 make sure to reload the page you can see
02:31:24.800 that right here we get three different
02:31:27.160 movies Avatar cats and Iron Man which is
02:31:30.080 great that means that our trending
02:31:32.040 functionality is kind of working but of
02:31:34.640 course we have to improve it further
02:31:36.840 check this out we can pass just a single
02:31:39.359 prop called horizontal and if you just
02:31:42.520 pass it like this and save it
02:31:45.279 immediately the orientation will change
02:31:47.960 to horizontal we can also O Say shows
02:31:51.319 horizontal scroll indicator and set it
02:31:53.800 to false and we can also render the item
02:31:57.080 separator
02:31:58.240 component and I'll make it equal to a
02:32:01.160 simple
02:32:02.479 view that is
02:32:04.479 self-closing and has a class name equal
02:32:07.840 to W of 4 now we can see that this looks
02:32:10.720 a bit better oh and this latest movies
02:32:12.880 was supposed to be just above the other
02:32:15.200 flat list not this one so I'll go below
02:32:18.000 this one and here I can paste it it says
02:32:21.000 latest movies and right here at the top
02:32:23.200 we have trending
02:32:24.880 movies great but of course we don't just
02:32:28.000 want to show three pieces of text we
02:32:30.200 want to show fullon cards that look like
02:32:32.840 this with these top trending numbers so
02:32:35.920 to do that let's create a new component
02:32:38.479 in the components folder and let me call
02:32:41.520 it trending
02:32:44.680 card. TSX run rnf to quickly create and
02:32:50.279 now instead of this text where we're
02:32:53.439 rendering the item title we can render
02:32:56.080 the trending card just like this a
02:32:58.359 self-closing trending card component to
02:33:01.520 which we can pass over the movie equal
02:33:04.479 to item this is an alternative way of
02:33:07.200 just spreading everything out sometimes
02:33:09.640 this is preferable because then you can
02:33:11.479 consol Lo the entire movie itself and
02:33:13.840 then know what properties does it have
02:33:15.960 and let's also pass the index of that
02:33:17.960 movie equal to index so we can show that
02:33:20.800 number now let's head over into the
02:33:23.240 trending card and let's get it
02:33:24.800 implemented as with the cards before
02:33:27.040 I'll wrap this card with a link because
02:33:29.479 we want to make sure that the entire
02:33:30.880 card is clickable and that it leads to
02:33:33.160 the movie Details page so I'll add an
02:33:35.840 href of SL movies SL movor ID and I'll
02:33:42.800 say as child because we want the entire
02:33:45.439 touchable opacity to be clickable so
02:33:48.000 it'll inherit link properties now where
02:33:50.680 is this movie ID coming from well we can
02:33:53.520 destructure the movie right here from
02:33:56.359 props and from the movie we can further
02:33:59.120 destructure the movie ID the title and
02:34:02.720 the poster URL and outside of this movie
02:34:06.359 destructuring we can also get the index
02:34:09.319 and we can say that all of these are of
02:34:11.279 a type trending card props now within
02:34:15.720 each link let's render a touchable
02:34:18.359 opacity it'll have a class name equal to
02:34:22.960 w-32 relative and padding left of five
02:34:26.800 and immediately within it we can render
02:34:29.120 an image this image will have a source
02:34:32.960 equal to URI is poster _ URL a class
02:34:37.560 name equal to
02:34:39.600 w32 h48 and rounded
02:34:44.080 dlg with a resize mode equal to cover
02:34:48.800 and there we go now you can see the
02:34:51.359 cover photos or the posters for the top
02:34:53.960 three searched movies right below it
02:34:56.120 I'll render another view and this view
02:34:59.279 will be absolutely positioned so I'll
02:35:01.880 give it a class name of absolute that's
02:35:04.560 because it'll serve as an overlay over
02:35:06.920 the poster so somewhere at the bottom
02:35:09.359 left we want to show that number 1 2 3
02:35:12.359 so I'll say bottom
02:35:14.439 D9 minus left-
02:35:17.920 3.5 padding X of to padding y of one and
02:35:22.720 the rounded -4 and now within it we want
02:35:25.520 to achieve some kind of a masked layout
02:35:27.760 I'm not sure if you can see it here but
02:35:29.680 the number here will be a bit masked
02:35:32.040 like it is under some kind of a darker
02:35:34.160 mask like it'll have a slight gradient
02:35:37.000 and we can do that using a package
02:35:39.279 called masked view this one right here
02:35:42.120 has about 265,000 downloads and as the
02:35:46.000 package says it creates a masked view
02:35:48.439 where the text appears as a cutout over
02:35:50.760 an image so let's simply copy the
02:35:52.760 installation command that is mpm install
02:35:55.960 at reactnative mask view slask dvw while
02:36:00.520 it is installing we can put it to use
02:36:03.040 right here within this view I'll create
02:36:05.439 another masked View and you have to
02:36:08.680 provide a mask element in this case
02:36:11.479 it'll be a single piece of text so I'll
02:36:15.200 do it right
02:36:16.720 here text inside of which I'll render
02:36:19.720 index + one so that we don't start at
02:36:22.560 zero we start at one of course I'll give
02:36:24.920 this index a class name equal to font
02:36:28.000 Das bold text- white and text- 6xl we
02:36:33.040 want to make it extra large let's fix
02:36:34.920 the class name spelling right here and
02:36:37.520 within the mask view I will render the
02:36:39.640 image that will have a
02:36:41.800 source equal to images coming from
02:36:45.240 constants do ranking gradient
02:36:49.720 with a class name of
02:36:53.560 size-14 and a resize mode set to cover
02:36:58.479 now let's fix a typo where we have it
02:37:00.840 there we go I think we're good and take
02:37:04.000 a look at these numbers right here
02:37:06.319 looking good 1 two 3 and if you try
02:37:09.640 scrolling you'll see that this one has a
02:37:11.840 horizontal scroll whereas you can scroll
02:37:14.399 the entire page up and down so before we
02:37:17.319 had that virtualized list error because
02:37:19.800 we had two vertical lists in the same
02:37:22.160 file or in the same screen should I say
02:37:24.880 but now one is horizontal and one is
02:37:27.080 vertical so we're good now just below
02:37:29.720 this view not the mask view but the
02:37:31.760 other one we can render a piece of text
02:37:34.640 that will simply render the title of the
02:37:37.240 movie and it'll have a class name equal
02:37:40.720 to text DSM font Das bold margin top of
02:37:45.319 two and text- light 200 and we can also
02:37:50.520 make it take two lines maximum so number
02:37:54.439 of lines two and with that you have
02:37:57.160 implemented this trending card layout
02:37:59.680 which is looking great so if we go back
02:38:02.080 to the index no warnings or errors here
02:38:05.200 and if I go ahead and search for a new
02:38:07.399 movie like Avengers there we go and go
02:38:10.359 back to home and
02:38:12.520 reload you have to keep in mind this
02:38:14.800 search functionality update is not
02:38:16.720 something that has to happen in real
02:38:18.160 time when you open the app again you'll
02:38:20.000 be able to see all the new searches that
02:38:21.880 people have made and there we go a
02:38:23.800 fourth number appeared right here
02:38:25.760 Avengers that is perfect and the more
02:38:28.080 users search for the same movies the
02:38:30.279 higher they will rank wonderful now you
02:38:33.160 have not only implemented the typical
02:38:35.160 API fetch call but also implemented a
02:38:38.000 backend as a service tool that allowed
02:38:40.520 us to store a persistent data within a
02:38:43.600 database that we use to then show the
02:38:46.520 top trending movies great job
02:38:51.200 oh and now that everything is looking so
02:38:53.359 good we might as well make it a real
02:38:55.560 mobile app by hiding the time and the
02:38:57.800 battery percentage no need to show it
02:38:59.840 here within our movie app and even
02:39:01.600 though having it here is totally fine
02:39:04.240 having it within our movie Details page
02:39:06.399 which will will code next is not ideal
02:39:08.960 because if the poster is very light or
02:39:11.479 very dark depending on your theme these
02:39:13.640 numbers will not be visible at all and
02:39:16.040 they will just clutter the poster image
02:39:18.200 so to hide them you you can head over
02:39:20.200 into our appcore layout it is this
02:39:24.319 layout right here the primary one not
02:39:26.560 the tabs one and right below the stack
02:39:29.080 you can say status bar import from react
02:39:31.600 native and simply give it a hidden
02:39:34.800 property set to true if you save it and
02:39:38.920 open up your terminal you'll see that
02:39:41.000 the layout children must be of type
02:39:43.000 screen and all other children are
02:39:45.200 ignored that's why this status bar is
02:39:47.319 not taking effect so what you have to do
02:39:49.680 instead is wrap everything with an empty
02:39:52.880 react fragment just like this and then
02:39:56.840 right next to the stack or on top of it
02:39:59.800 in other words you can save it and there
02:40:02.240 we go it gets hidden away immediately
02:40:04.840 the app looks so much cleaner as the
02:40:07.080 time and Battery are not impacting our
02:40:09.200 view looking great and all of these are
02:40:12.680 just fundamentals of react native
02:40:15.120 everything from Flat lists to layouts to
02:40:18.240 knowing how to hide thisp status bar if
02:40:19.920 you need to but this is just the
02:40:21.560 beginning there's always more to learn
02:40:23.920 bigger projects to build and exciting
02:40:25.960 things to ship to production so if you
02:40:27.680 want to apply some of the knowledge
02:40:28.960 you've gotten today to practical
02:40:30.960 production level check out JS Mastery
02:40:33.399 Pro where I dive deeper into JavaScript
02:40:36.200 react react native nygs and more and the
02:40:39.600 best part is that it is a subscription
02:40:41.760 based model which means that it is more
02:40:43.920 accessible to get started and you can
02:40:46.319 always learn something new every month
02:40:48.560 so I'll see in there as it is the new
02:40:51.439 biggest chapter of JavaScript Mastery
02:40:53.760 but with that said I do want to give you
02:40:55.880 a glimpse of the kind of optimizations
02:40:59.000 that we do on the production level so in
02:41:01.560 the next lesson I'll show you one big
02:41:03.840 mistake that we've made in our hom page
02:41:06.279 yep it is hidden right here within this
02:41:08.319 file but understanding it requires
02:41:10.760 reading a lot of docs and fixing it well
02:41:13.920 I'll show you how to do it in the next
02:41:16.720 lesson but just before I show you how to
02:41:19.479 tweak that little homepage optimization
02:41:21.920 I want to make sure that we focus on the
02:41:23.920 movie Details page we've been staring at
02:41:26.760 the search results and the homepage for
02:41:28.840 such a long time even the trending
02:41:30.680 movies right now but we were never able
02:41:33.080 to fetch and show all the movie details
02:41:36.080 so let's do that next first we have to
02:41:38.479 create a function to gather all the
02:41:40.560 movie information so head over into
02:41:44.359 Services api. TS and right below fetch
02:41:48.800 movies we want to create a new function
02:41:51.880 export const fetch movie details it'll
02:41:57.040 be equal to an asynchronous function
02:41:59.439 that simply accepts a movie ID of a type
02:42:02.960 string which will return a promise
02:42:05.359 that'll ultimately resolve into movie
02:42:08.640 details and now we can open up the
02:42:10.479 function block I'll open up a try and
02:42:13.399 catch Block in the catch you know the
02:42:16.319 drill if there is an error simply con to
02:42:19.359 log that error and throw it just so we
02:42:22.920 can catch it somewhere else and in the
02:42:25.000 try we can make a fetch request similar
02:42:27.640 to the one we made above but this time
02:42:29.600 to a different endpoint so let's say con
02:42:32.439 response is equal to a wait Fetch and
02:42:37.399 now we can form the URL by first getting
02:42:40.279 to the tmdb
02:42:43.000 config Bas
02:42:45.120 URL
02:42:47.080 slov slash movie ID question mark API
02:42:52.640 key is equal to tmdb config API key so
02:42:58.640 we have just crafted the endpoint which
02:43:00.800 we want to call as the second parameter
02:43:02.960 we want to provide it an object where
02:43:05.920 the method will be set to get and the
02:43:09.000 headers will be set to tmdb config do
02:43:13.399 headers we already prepped everything
02:43:16.359 beforehand finally if the response is is
02:43:19.640 not okay we simply want to throw a new
02:43:23.880 error saying something like failed to
02:43:27.080 fetch movies or movie details that's a
02:43:30.960 bit more precise but if response is okay
02:43:34.800 we want to get the data by awaiting the
02:43:37.960 response. Json typically when you use
02:43:40.760 fetch you need to say response. Json to
02:43:43.160 extract the data and finally we want to
02:43:45.840 return the data which in this case is
02:43:48.640 the move
02:43:49.720 details so now that we have created this
02:43:52.120 function let's head over into the page
02:43:54.840 that we haven't touched so far which is
02:43:57.200 this one movies ID a dynamic route that
02:44:02.120 displays the details of that specific
02:44:04.240 movie let's start with the jsx we're
02:44:06.960 wrapping everything with a view that has
02:44:09.359 a class name equal to BG primary and
02:44:14.200 flex das1 if I save it how do we get to
02:44:17.399 that page well you just have to click on
02:44:20.319 one of the touchable opacities or one of
02:44:22.520 the buttons so choose whichever one you
02:44:25.399 want I'll go with the
02:44:27.240 Gladiator and now we can render the
02:44:29.279 movie details I'll render them within a
02:44:31.479 scroll view because it is possible that
02:44:34.160 the height of the details will span more
02:44:36.880 than the height of the device and I'll
02:44:38.840 give it a Content container style equal
02:44:42.359 to padding bottom of 80 within it I'll
02:44:46.439 display a view and within that view I'll
02:44:49.120 display an image that'll have a source
02:44:51.880 equal to URI and we once again have to
02:44:55.399 have that starting part of a photo https
02:45:00.600 colon image.
02:45:03.680 tmdb org SLT SL
02:45:08.479 w500 and then we render the Movie
02:45:11.439 question mark. poster path but of course
02:45:14.960 we first have to fetch the movie details
02:45:17.319 so this is exactly where that function
02:45:19.080 we just created comes into the picture
02:45:20.920 first we need to get the ID of the movie
02:45:23.399 that we're trying to get the details for
02:45:25.760 and we can do that by destructuring the
02:45:28.560 ID by using the use local search for
02:45:32.359 Rams Hook Once We have the ID it is
02:45:34.800 pretty simple we just say const the
02:45:38.240 structure the data rename it as
02:45:41.720 movie also accept the loading and make
02:45:45.040 it equal to the use fetch hook call
02:45:48.160 within which we can have a callback
02:45:50.399 function that then calls the fetch movie
02:45:54.439 details and we need to pass the ID as
02:45:57.920 string right into it so now we get
02:46:00.800 access to that movie and if you click on
02:46:03.319 one of those
02:46:05.760 movies you can see that we get
02:46:07.800 redirected we no longer have an error
02:46:10.439 but to be able to see the poster we have
02:46:12.760 to give this image a class name of w
02:46:16.880 fool and let's do something big like H
02:46:20.760 550 pixels there we go so now it takes
02:46:24.800 that upper part of the screen looking
02:46:27.520 good we can also give it a resize mode
02:46:31.200 equal to
02:46:32.840 stretch there we go so now it is looking
02:46:35.760 even better now below that view we can
02:46:38.399 render another view that'll have a class
02:46:41.760 name equal to
02:46:44.319 flex-all items Das start justify Dash
02:46:48.279 Center margin top of five and padding X
02:46:51.520 of five we're just creating some space
02:46:54.000 for the text elements that'll go within
02:46:55.760 it so let's create the space for the
02:46:58.439 first text element that'll render the
02:47:01.680 Movie question mark. tile and we can
02:47:05.000 style it by giving it a class name equal
02:47:08.760 to text- White font Das bold and text-
02:47:14.399 excl there we go Gladiator 2 we can go
02:47:18.520 below
02:47:19.399 this text and render another view this
02:47:23.040 view will have a class name equal to
02:47:26.520 flex Das row items Das Center and a gap
02:47:31.279 X of one in between the elements as well
02:47:34.040 as a margin top of two to divide it a
02:47:36.560 bit from the elements above within this
02:47:39.279 view we can show one more
02:47:42.279 text this one will have a class name
02:47:45.359 equal to text- light 200
02:47:49.840 and text- smm and within it we can
02:47:53.040 render the year we already learned how
02:47:54.880 to do that movie question mark. releasor
02:47:58.760 date question mark
02:48:00.960 do split by the dash and get only the
02:48:05.800 year oh but the index of zero has to
02:48:08.560 come after the split there we go 2024
02:48:12.080 right below this text we can render
02:48:14.160 another text with the same Styles so
02:48:17.200 that'll be a class name of of text-
02:48:20.319 light 200 and text- smm and within this
02:48:25.600 one we can render the Movie question
02:48:28.000 mark.
02:48:29.680 runtime so this one lasts for
02:48:32.960 184 and we can add M at the end which
02:48:35.880 stands for minutes now we can exit this
02:48:38.840 View and we can create another view
02:48:40.880 below to show some more
02:48:42.960 information this one will have a class
02:48:45.640 name equal to flex-r
02:48:49.080 items Das
02:48:50.439 Center BG of dark 100 padding X of two
02:48:55.800 padding y of 1 rounded -
02:48:59.920 MD Gap X of one and a margin top of two
02:49:04.960 and within this view we can render an
02:49:07.240 image that'll have a source equal to
02:49:11.080 icons coming from constants icons do
02:49:15.000 star as well as a class name equal to s
02:49:18.760 size of
02:49:19.840 four and there we have it one little
02:49:22.359 star right there right below that image
02:49:25.520 we can render a piece of text that'll
02:49:28.000 have a class name equal to text- White
02:49:32.560 font Das bold and text- smm and within
02:49:37.359 it I'll put a dynamic block of code and
02:49:40.960 round up the current score by saying
02:49:44.479 math.round movie mark. Vore average
02:49:49.800 or if it doesn't exist simply take zero
02:49:53.319 just so it doesn't break and we can say
02:49:55.359 out of 10 so this one is 7 out of 10
02:49:59.080 right below it we can also render
02:50:01.080 another piece of
02:50:02.439 text that will have a class name that'll
02:50:06.120 have a text- light 200 and text- smm and
02:50:11.239 within this one we want to show the
02:50:13.040 number of votes so in parenthesis I'll
02:50:16.520 say movie question mark. vote count and
02:50:21.239 then I'll say votes so this one got
02:50:26.279 2,947 votes it matters right we want to
02:50:29.720 know how many people have rated it on
02:50:31.680 average 7 out of 10 and now we want to
02:50:34.080 show a couple of these movie labels like
02:50:36.800 the overview release date status genres
02:50:39.800 and so on each one has a little title on
02:50:42.720 top and then the actual
02:50:44.920 content that means that we can turn it
02:50:47.160 into a reusable component
02:50:49.399 so right at the top I'll create a new
02:50:52.479 reusable component and call it movie
02:50:56.200 info so const movie info is equal to a
02:51:00.120 function that will destructure the props
02:51:03.800 of label and value so for each value
02:51:06.960 there is a label they'll be of a type
02:51:10.359 movie info props which we can Define
02:51:14.080 just above by saying
02:51:17.040 interface movie info props and it has a
02:51:21.399 label of a type string as well as an
02:51:24.080 optional value of a type either string
02:51:27.520 or number or null perfect and then we
02:51:32.800 can open up a function block with an
02:51:35.239 immediate return which means that we
02:51:37.080 just put parenthesis right here and not
02:51:38.960 curly braces so what do we return well
02:51:42.920 it'll be a
02:51:44.239 view with a class name of flex-all
02:51:49.279 items Das start justify Das Center and a
02:51:54.279 margin top of five and right within it
02:51:57.359 first we show a piece of
02:51:59.680 text that has a class name of text
02:52:04.840 dl-200 font
02:52:07.920 dormal and text
02:52:10.520 DSM and within it we render the label
02:52:14.200 and next we can have a text just beneath
02:52:16.960 it with a class name of text- light-1
02:52:22.520 100
02:52:24.680 f-bold text DSM and margin top of two
02:52:29.319 and within it we render either the value
02:52:32.120 or a string of Na a value doesn't exist
02:52:37.000 and now we can use this movie info a
02:52:39.680 couple of times right here below our
02:52:42.600 view that contains the vote count so
02:52:45.640 let's go right below it and let's render
02:52:48.040 a couple of these movie info
02:52:51.680 components the first one will have a
02:52:53.840 label of overview and the value of movie
02:52:58.080 mark. overview and if you self close it
02:53:02.040 check this out immediately it looks
02:53:04.600 super nice let's also render one more
02:53:07.600 just beneath it this one will have a
02:53:10.239 movie info of jras and the value will be
02:53:14.800 movie mark.
02:53:17.439 genres question mark. map where we get
02:53:20.800 each individual G as in genre and then
02:53:23.720 we can say return g.n name and then
02:53:26.800 outside of that function we can say do
02:53:28.960 join them with something like a dash in
02:53:32.000 between like this or say na doesn't
02:53:36.000 exist so if you do this you'll see
02:53:38.439 action adventure drama looking good now
02:53:42.319 let's create one more view below this
02:53:45.200 movie info this one will have a class
02:53:48.160 named name of flex Flex D
02:53:52.560 row justify Dash between and a w of 1
02:53:57.239 over two so that is 50% of the width and
02:54:00.680 within it I'll show another movie info
02:54:03.120 component with a label of budget and a
02:54:06.800 value of dollar sign movie question
02:54:10.680 mark. budget and we can divide it by 1
02:54:15.840 million and then render the data in
02:54:18.600 Millions that'll look something like
02:54:20.720 this budget is 310 million for this
02:54:25.120 movie still within the same view but
02:54:27.640 just below this movie info we can also
02:54:30.080 show the revenue so the label of Revenue
02:54:33.640 and a value of we want to do the same
02:54:36.560 thing right here but we can round it up
02:54:38.279 a bit so we can say a template string of
02:54:41.560 math.
02:54:43.279 round movie question mark. revenue and
02:54:48.080 one once again we want to divide it by 1
02:54:50.560 million and save it and at the start we
02:54:53.800 can add a dollar sign as well right here
02:54:57.840 so now we can see that the revenue is
02:55:00.279 458 million which means that this movie
02:55:03.239 is already profitable finally we can go
02:55:05.800 below this view that wraps the two of
02:55:07.880 them and we can create one more movie
02:55:12.000 info this one will have the label of
02:55:15.239 production
02:55:17.120 companies and and it'll have a value
02:55:20.120 equal to movie question mark.
02:55:23.319 production
02:55:24.840 companies. map where we get each
02:55:27.560 individual company and for each one we
02:55:30.720 return its name and we can join them by
02:55:34.640 a dash which will look something like
02:55:37.120 this or if it doesn't exist we can
02:55:40.000 simply say na a there we go so now we
02:55:43.040 can see Paramount Pictures scotf free
02:55:45.319 production and more many people worked
02:55:47.840 on this movie movie finally just below
02:55:50.200 this entire scroll View at the bottom we
02:55:52.840 can render a touchable opacity a button
02:55:56.319 to go back to the previous page so it'll
02:55:59.880 have an
02:56:01.600 image that'll have a source equal to
02:56:05.160 icons.
02:56:06.720 arrow with a class name equal to
02:56:10.880 size-5 margin right of one margin top of
02:56:15.560 0.5 and rotate 180
02:56:18.840 and a tint color equal to # FFF so if
02:56:24.000 you render it you can't see it just yet
02:56:26.760 but below it I'll render a text that'll
02:56:30.399 say go
02:56:32.800 back and I'll give it a class
02:56:35.760 name equal to text- White font D
02:56:41.279 semibold
02:56:43.720 text-base and now you can see it but of
02:56:46.439 course we have to style this touchable
02:56:47.960 opat capacity a bit better by giving it
02:56:50.920 a class name of
02:56:53.920 absolute
02:56:56.279 bottom-5 left- 0 right- Z margin X of
02:57:03.279 five BG of
02:57:05.800 accent rounded
02:57:08.920 dlg padding y of
02:57:12.720 3.5
02:57:14.520 Flex Flex Das row items Das Center
02:57:19.479 justify Dash
02:57:20.840 Center and a z of 50 so it appears above
02:57:24.640 other elements and there you have it a
02:57:28.000 movie Details page with a Gob back
02:57:31.040 button of course to actually make it
02:57:33.560 work we can use the router
02:57:35.760 functionalities so let me give it an
02:57:38.200 onpress and call the
02:57:40.600 router which we can import from Expo
02:57:43.640 router dot back if you save it and click
02:57:47.800 go back back take a look at that it
02:57:50.120 actually goes back but you can also just
02:57:53.000 scroll or swipe from left to right on
02:57:56.479 iOS to go back as well and now you can
02:58:00.160 see the movie details for all of these
02:58:03.160 different movies not only the popular
02:58:05.520 ones or the trending ones but also the
02:58:08.520 ones that you search for so if you have
02:58:10.720 your favorite
02:58:12.600 movie I don't know which one it is once
02:58:15.080 again let me know down in the comments
02:58:17.399 well you can find it right here and see
02:58:19.760 all of its
02:58:20.920 details and I got to say the app is
02:58:24.000 super super responsive it works very
02:58:27.560 well and you can see as I swipe up and
02:58:30.040 down and as I open different pages it is
02:58:32.720 just super efficient and this brings us
02:58:36.200 to the end of the movie Details page and
02:58:39.439 we're almost done with the entire app
02:58:41.680 this is pretty amazing I got to say just
02:58:44.920 before we finish it off I want to make
02:58:46.680 sure that we have something on the saved
02:58:48.800 and profile Pages too because right now
02:58:51.560 they look super blank so let's head over
02:58:54.600 into those two pages starting with a
02:58:57.359 profile and I'll just tighten them up a
02:58:59.640 bit so we have a nice blank screen but
02:59:02.520 then if you want to you can go ahead and
02:59:04.760 Implement additional
02:59:06.560 functionalities this is an exercise for
02:59:09.520 you to improve this app even further and
02:59:12.920 to put the skills you've gained from
02:59:14.880 this video to the test first things
02:59:17.680 first let's get rid of this ugly white
02:59:20.800 screen by rendering a class name to this
02:59:24.920 View and giving it a BG
02:59:27.920 primary as well as a flex of one and the
02:59:31.319 padding X of 10 that's better within it
02:59:35.279 let's also render another view which
02:59:37.800 we'll use to Center our icon in the
02:59:40.200 middle so I'll give it a class name of
02:59:44.040 flex justify Das center items Dash
02:59:48.880 Center Flex D1
02:59:52.640 flex-all and a gap of five within it we
02:59:56.120 can render an image that'll have a
02:59:58.840 source equal to icons.
03:00:02.720 person and a class name equal to size of
03:00:06.840 10 as well as a tint color equal to # FF
03:00:12.479 oh and make sure to import the icons
03:00:14.640 from constants and then reload the app
03:00:18.520 while it's reloading we can also add the
03:00:21.120 text element right below it that will
03:00:23.640 simply say profile and we can style it
03:00:27.399 by giving it a text-
03:00:30.520 g-500 as well as
03:00:33.200 text-base so now if you head over to the
03:00:36.000 profile you see a little profile icon in
03:00:38.600 the middle waiting for you to implement
03:00:40.960 that profile screen what we can do is
03:00:43.920 also copy this entire view head over
03:00:46.920 into saved
03:00:48.439 and override the saved as well but this
03:00:51.680 time it's not going to be icons. person
03:00:54.560 it'll be icons. saave as well as it'll
03:00:57.920 say
03:00:59.160 save so now if you head over into the
03:01:01.880 saved you can see that it looks great as
03:01:04.880 well again I don't want to Simply give
03:01:08.319 you everything in this course because
03:01:10.520 then there's not going to be an
03:01:11.600 incentive for you to try some things out
03:01:14.560 so I invite you to go ahead and
03:01:16.920 Implement that save movie functionality
03:01:19.479 to save your favorite movies into a
03:01:21.600 collection you'll have to work a bit
03:01:23.319 with aight to have some persistent
03:01:25.200 storage and it'll be very similar to
03:01:27.600 tracking our metrics right now instead
03:01:29.880 of searches you'll be tracking the
03:01:32.040 clicks when somebody clicks a heart on a
03:01:35.120 specific movie for example and then
03:01:37.399 you'll have to create a second function
03:01:39.640 that will fetch all of the favorite
03:01:42.040 movies pretty cool right I know it might
03:01:45.040 sound difficult at first but trust me as
03:01:48.040 you get a hang of react native it'll all
03:01:50.560 start making sense very soon especially
03:01:54.080 if you dive into JS Mastery Pro where we
03:01:56.680 dive a bit deeper into how react native
03:01:59.200 Works under the hood as well as how we
03:02:01.600 can optimize it for bigger applications
03:02:04.520 great that's it for this lesson this was
03:02:07.800 a big
03:02:09.840 one and to finish this course off I want
03:02:12.800 to show you one little gotcha that I
03:02:15.160 found it's those little things that you
03:02:17.560 don't find in the documentation very
03:02:19.520 easily but rather it's a best practice
03:02:22.200 that you have to dig through GitHub
03:02:23.760 discussions to figure it out fully I
03:02:25.560 zoomed out this code so you get a better
03:02:27.720 understanding of the entire homepage
03:02:29.359 that we have right now notice a couple
03:02:31.279 of things we have a single scroll view
03:02:34.040 right here where we said show vertical
03:02:36.840 scroll indicator is set to false but
03:02:40.319 doesn't matter that we're hiding the
03:02:41.680 indicator this scroll view is a vertical
03:02:45.600 View and within that vertical view we
03:02:48.800 also have another flat list this one
03:02:51.840 right here which renders all the movie
03:02:53.840 cards those movies are also in a
03:02:56.760 vertical View and it is not generally
03:03:00.200 recommended to have two virtualized
03:03:02.600 lists or scroll views or flat lists in
03:03:05.800 the same orientation see this flat list
03:03:09.279 is not a problem this one is horizontal
03:03:11.960 and that's okay when it comes to the
03:03:13.239 performance but having two huge flat
03:03:16.680 lists that are of the same orientation
03:03:18.960 is generally not considered a good
03:03:21.560 practice we're using a scroll view to
03:03:24.080 render most of the movies and if you go
03:03:26.560 to the docs it's going to say scroll
03:03:28.760 view versus flatlist which one should
03:03:31.439 you use well scroll view renders all its
03:03:34.960 children components at once but this has
03:03:38.080 a performance downside imagine you have
03:03:41.359 a very long list of items you want to
03:03:43.560 display maybe several screens worth of
03:03:46.040 content creating Js components and
03:03:48.560 Native use for everything all at once
03:03:51.200 much of which may not be even shown will
03:03:53.319 contribute to slow rendering and
03:03:55.359 increased memory usage and this is where
03:03:58.279 the flatlist comes into play because
03:04:00.880 flatlist is smart IT renders items
03:04:03.960 lazily just before they're about to
03:04:05.960 appear and it removes the items that
03:04:08.239 scroll way off the screen to save memory
03:04:11.040 and processing time so in other words
03:04:13.960 when you have large lists of vertical
03:04:16.239 elements you want to use a flat list and
03:04:19.000 not a scroll View and in our case if you
03:04:21.640 look at the flat list we technically
03:04:23.840 didn't allow it to reach its full
03:04:25.560 potential because we have set scroll
03:04:28.040 enable to FSE which technically means
03:04:30.560 that we let the scroll view do its job
03:04:33.960 even though it is totally fine perfectly
03:04:36.640 fine for our use case as we don't have
03:04:38.960 many elements and we wouldn't even been
03:04:41.040 able to harness the power of the flat
03:04:43.359 list for bigger applications it makes a
03:04:46.479 big difference and that's exactly why I
03:04:49.520 wanted to leave this for the end of this
03:04:51.600 video while it is totally fine for
03:04:54.359 smaller apps for larger apps you just
03:04:57.399 got to be smarter and utilize everything
03:05:00.239 that the software allows you to do in
03:05:02.520 this case react natives built-in
03:05:04.319 components like the flatlist are super
03:05:07.080 powerful but you got to know how to use
03:05:09.520 them below this lesson I'll leave the
03:05:12.319 improved codebase for how the homepage
03:05:14.920 should have looked like if it had
03:05:16.960 hundreds or thousands of elements so if
03:05:20.040 you want to check it out you can go
03:05:21.520 ahead and do that but this is just one
03:05:23.720 little optimization out of hundreds or
03:05:26.399 thousands that we go over on JS Mastery
03:05:29.319 Pro so check it out cancel at any time
03:05:32.479 or get a refund if you don't like it but
03:05:35.200 given how many resources we have in our
03:05:37.160 knowledge base and within our pads it's
03:05:39.600 hard not to find something that you can
03:05:41.680 learned from and that'll help you
03:05:43.600 advance your career with that in mind
03:05:46.120 great job on coming to the end end of
03:05:48.160 this phenomenal project allowing users
03:05:51.160 to find their favorite movies search for
03:05:53.800 them and then the algorithm that
03:05:56.279 actually checks which movies have been
03:05:58.359 searched most often and therefore they
03:06:00.960 get displayed right here on the homepage
03:06:04.160 looking good feeling good it is
03:06:06.760 responsive and it is the best of mobile
03:06:09.359 development that react native offers so
03:06:12.680 thank you so much for watching and I'll
03:06:15.000 see you on Js mastery. proo have a great day