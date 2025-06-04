# React Native Habit Tracker Development Guide

## 1. Project Setup
### Initialize Project
```bash
npx create-expo-app
npm run web  # Test initial setup
```

### Folder Structure
```
/lib
  └── appwrite.ts  # Configuration file
/types
  └── database.type.ts  # Type definitions
/src
  └── screens/
      └── components/  # Reusable UI components
```

## 2. UI Development
### Core Screens
1. **Login Page**
   - Email/password inputs
   - Sign-up/Login toggle
   - Form validation

2. **Habit Creation**
```tsx
// Add Habit Screen Components
const HabitForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const frequencies = ['daily', 'weekly', 'monthly']

  return (
    <View>
      {/* Input Fields */}
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={description} onChangeText={setDescription} />
      
      {/* Frequency Selector */}
      {frequencies.map(freq => (
        <Button 
          key={freq}
          onPress={() => setFrequency(freq)}
          mode={frequency === freq ? "contained" : "outlined"}
        >
          {freq}
        </Button>
      ))}
      
      <Button mode="contained" onPress={handleSubmit}>
        Add Habit
      </Button>
    </View>
  )
}
```

3. **Habit Display**
```tsx
// Today's Habits Screen
const HabitCard = ({ habit }) => (
  <Surface style={styles.card}>
    <Text variant="titleMedium">{habit.title}</Text>
    <View style={styles.streakContainer}>
      <MaterialCommunityIcons name="fire" size={24} />
      <Text>{habit.streakCount} day streak</Text>
    </View>
  </Surface>
)
```

## 3. Authentication
### AppWrite Integration
1. Create `.env.local`:
```
EXPO_PUBLIC_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_DATABASE_ID=your_database_id
```

2. Auth Context Setup
```tsx
// lib/auth.context.ts
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Auth functions (signUp, signIn, signOut)
  const signUp = async (email, password) => {
    // Implementation using AppWrite
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 4. Database Implementation
### AppWrite Collections
1. **Habits Collection**
   - Attributes:
     - `userId` (string)
     - `title` (string)
     - `description` (string)
     - `frequency` (string)
     - `streakCount` (integer)

2. **Habit Completions**
   - Attributes:
     - `habitId` (string)
     - `userId` (string)
     - `completedAt` (datetime)

### Type Definitions
```ts
// types/database.type.ts
interface Habit extends Models.Document {
  userId: string
  title: string
  description: string
  frequency: string
  streakCount: number
}

interface HabitCompletion extends Models.Document {
  habitId: string
  userId: string
  completedAt: string
}
```

## 5. CRUD Operations
### Create Habit
```ts
import { ID } from 'react-native-appwrite'
import { databases } from '@/lib/appwrite'

const createHabit = async (userId, title, description, frequency) => {
  try {
    await databases.createDocument(
      process.env.EXPO_PUBLIC_DATABASE_ID,
      'habits',
      ID.unique(),
      {
        userId,
        title,
        description,
        frequency,
        streakCount: 0
      }
    )
  } catch (error) {
    console.error('Error creating habit:', error)
  }
}
```

### Fetch Habits
```ts
const fetchHabits = async (userId) => {
  try {
    const response = await databases.listDocuments(
      process.env.EXPO_PUBLIC_DATABASE_ID,
      'habits',
      [Query.equal('userId', userId)]
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching habits:', error)
  }
}
```

## 6. Realtime Updates
```ts
// Subscribe to habit completions
const setupRealtimeUpdates = () => {
  const subscription = databases.subscribe(
    'collections.habit_completions.documents',
    (response) => {
      if (response.events.includes('documents.create')) {
        fetchHabits()
      }
    }
  )
  return () => subscription.unsubscribe()
}
```

## 7. Swipe Actions
```tsx
// Swipeable Habit Item
import { Swipeable } from 'react-native-swipe-list-view'

const SwipeableHabit = ({ habit }) => {
  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons name="check-circle-outline" size={32} color="#fff" />
    </View>
  )

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <HabitCard habit={habit} />
    </Swipeable>
  )
}
```

## 8. State Management
```ts
// Using React Hooks
const [habits, setHabits] = useState<Habit[]>([])
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const loadHabits = async () => {
    try {
      const data = await fetchHabits(currentUser.$id)
      setHabits(data)
    } catch (err) {
      setError('Failed to load habits')
    } finally {
      setIsLoading(false)
    }
  }
  loadHabits()
}, [])
```

## 9. Deployment
1. Configure AppWrite permissions
2. Set up environment variables
3. Test on all platforms:
```bash
npm run android
npm run ios
npm run web
```
```

This comprehensive guide covers all aspects of the habit tracker application as described in the transcript, organized by functional areas with code examples and implementation details.
---

Timestamps:
00:00 - Introduction & What You'll Build
01:00 - Why React Native & Expo in 2025
02:45 - Understanding Core Components (View, Text, TextInput, ScrollView)
03:58 - What is Expo and Why We're Using It
04:48 - Creating a New Expo App Project
06:17 - Exploring the Boilerplate Project
07:10 - Understanding the App Folder, index.tsx, and _layout.tsx
08:48 - Navigation Basics with Expo Router
13:12 - Creating and Linking New Screens
17:01 - Styling and Customizing Navigation Links
20:50 - Implementing Bottom Tab Navigation with Expo Router
27:04 - Customizing Tab Icons & Active States
29:56 - Starting the Habit Tracker App: Project Structure & Goal
34:04 - Setting Up Appwrite for Backend Services
38:09 - Creating the Appwrite Client in Your Project
42:10 - Building the Auth Page UI with React Native Paper
47:07 - Implementing Route Guards with Expo Router
50:04 - Handling Sign Up / Sign In Logic
56:00 - Finalizing UI & Switching Between Auth Modes
1:03:00 - Wiring Up Auth Logic with Context API
1:10:00 - Using Auth Provider and Redirecting Logged-In Users
1:17:32 - Sign Out Functionality and Testing Auth Flow
1:21:10 - Planning the Habit Tracker Screens
1:23:00 - Styling Tabs & Customizing Navigation UI
1:28:20 - Setting Up the Appwrite Database & Collections
1:33:00 - Connecting to Appwrite Database from React Native
1:35:00 - Building the Add Habit Screen UI
2:00:33 - Adding Habits to the Database  
2:06:18 - Handling Permissions in Appwrite  
2:08:04 - Fetching & Displaying Today's Habits  
2:14:13 - Building the Habits UI  
2:19:03 - Styling the Habit Cards  
2:31:05 - Making the Screen Scrollable  
2:34:00 - Setting Up Swipe to Complete/Delete  
2:40:00 - Implementing Swipeable Actions  
2:44:00 - Deleting a Habit with Swipe  
2:46:00 - Fixing Swipe Ref Behavior  
2:48:00 - Completing a Habit & Creating a New Collection  
2:59:02 - Updating Habit Streak on Completion  
3:00:06 - Completing a Habit and Updating the Streak  
3:03:12 - Creating the Habit Completions Collection  
3:04:14 - Fetching Today's Completions  
3:07:02 - Preventing Duplicate Completions  
3:10:30 - Subscribing to Habit Completion Updates  
3:13:13 - Styling Completed Habits  
3:17:32 - Creating the Streaks Screen  
3:21:00 - Fetching Habit Completion History  
3:23:24 - Calculating Current & Best Streaks  
3:32:29 - Ranking Habits by Streak  
3:37:04 - Displaying Streak Cards  
3:54:06 - Building Top 3 Habit Leaderboard  
4:03:00 - Final UI Touches & Styling  
4:06:59 - Outro

---

# tactiq.io free youtube transcript
# React Native Full Course 2025 | Become a React Native Pro in 4 Hours
# https://www.youtube.com/watch/J50gwzwLvAk

00:00:00.160 Welcome to my React Native crash course
00:00:02.800 for 2025. In this video, you're going to
00:00:05.440 go from a complete beginner to knowing
00:00:07.200 how to build a complete full stack habit
00:00:09.440 tracker app from scratch using React
00:00:11.840 Native, Expo, and AppRide. This course
00:00:14.719 is designed for absolute beginners.
00:00:16.960 Whether you are brand new to mobile
00:00:18.640 development or switching over from web,
00:00:20.960 you'll learn how to build beautiful UIs,
00:00:23.279 create different screens, manage state,
00:00:25.680 connect a backend, and create real
00:00:27.920 mobile experiences, all using the most
00:00:30.240 up-to-date and modern tools. We'll go
00:00:32.880 step by step starting from the
00:00:34.480 fundamentals and slowly progressing to a
00:00:36.480 fully featured app with user
00:00:38.280 authentication, real-time habit
00:00:40.160 tracking, and clean responsive design.
00:00:42.640 Now, React Native continues to be one of
00:00:44.640 the most powerful frameworks for
00:00:46.559 building cross-platform apps in 2025.
00:00:49.600 You write code once with React and your
00:00:51.920 app runs on iOS, Android, and even the
00:00:54.640 web, all with native performance. Plus,
00:00:57.600 with tools like Expo, it's never been
00:00:59.760 easier to prototype and ship apps fast.
00:01:02.480 It's trusted by companies like
00:01:04.080 Instagram, Shopify, and Discord, and
00:01:06.560 backed by massive open-source ecosystem.
00:01:09.439 If you are a React developer or just
00:01:11.360 getting started with mobile, React
00:01:13.200 Native is your best next move. So, first
00:01:15.680 things first, how exactly does React
00:01:18.000 Native work? Well, like I said, it
00:01:20.560 allows you to build mobile apps using
00:01:22.479 JavaScript and React, but instead of
00:01:24.159 running in a browser, it runs on a real
00:01:26.479 mobile device. That means that you have
00:01:28.320 access to native features like a camera,
00:01:30.880 GPS, and more. It lets you use a single
00:01:33.840 codebase for both iOS and Android,
00:01:36.000 saving you tons of time and effort in
00:01:38.400 the process. Now, there's a couple core
00:01:40.720 React Native components that I want you
00:01:42.720 guys to just keep in mind before we
00:01:44.560 start the tutorial. We're obviously
00:01:46.240 going to go over them later on, but for
00:01:48.720 now, I just want to present it to you.
00:01:50.720 The first component is a view. And a
00:01:52.880 view in React Native is like a container
00:01:54.960 or a wrapper. Think of it as a div in
00:01:57.680 HTML. It's used to lay out your app and
00:02:00.399 holds other components inside. Views can
00:02:02.880 be styled to control the layout of your
00:02:05.040 UI like controlling width, hide,
00:02:07.439 margins, and paddings. The second
00:02:09.598 component is text and the text component
00:02:12.319 is used to display like the name implies
00:02:14.400 text on your screen. Think of it like
00:02:16.640 the paragraph tag in HTML, but with more
00:02:19.280 customization options for styling fonts,
00:02:21.680 colors, and alignment. The third is a
00:02:24.720 text input. The text input component is
00:02:27.360 used to get text directly from the user.
00:02:30.640 It is like a normal input, but it's way
00:02:32.959 more tailored for the developer
00:02:35.280 experience. It is mainly used for stuff
00:02:37.519 like login forms or a search bar. And
00:02:40.480 the final component is a scroll view.
00:02:42.720 And a scroll view is something that you
00:02:44.319 usually don't see on a web project, but
00:02:46.080 it is a component that allows you to
00:02:47.840 create a scrollable area when the
00:02:49.840 content exceeds the screen size. Now,
00:02:52.239 those are just a couple of the core
00:02:54.160 components we're going to be using, but
00:02:55.680 we're going to be using a lot more as
00:02:57.280 well. And also, in order to create our
00:02:59.519 React Native app, we'll be using a
00:03:01.599 powerful open-source framework that will
00:03:03.760 work on top of React Native called Expo.
00:03:06.800 Expo simplifies the development process
00:03:08.800 and allows you to build mobile apps with
00:03:10.560 React Native without needing to set up
00:03:12.480 complicated native code. It provides a
00:03:14.720 set of tools, libraries, and services
00:03:16.640 that speed up development and make it
00:03:18.720 easier to test and deploy your apps.
00:03:21.040 With Expo, you can instantly preview
00:03:23.200 your app using your phone through an app
00:03:25.920 called the Expo Go app without needing
00:03:27.840 to deal with Xcode or Android Studio.
00:03:30.560 You can also access device features like
00:03:32.799 the camera, GPS, notifications, and so
00:03:35.200 on right out of the box without needing
00:03:36.959 to write native code. You can use a
00:03:39.440 powerful development environment with a
00:03:41.360 fast refresh for you to actually see
00:03:43.360 your changes in a simulator or in your
00:03:45.599 real device. And in short, Expo is
00:03:47.840 perfect for quickly getting started with
00:03:49.519 React Native and building apps that can
00:03:51.120 run on both iOS and Android without
00:03:53.440 having to waste time on setup. We're
00:03:55.440 going to be using Expo for this video.
00:03:57.439 And if you want to check out the code
00:03:58.799 for the video, it's going to be in the
00:04:00.400 description together with an even more
00:04:02.319 advanced version that I didn't include
00:04:04.560 in the video, but could help you guys
00:04:06.400 have an idea of how a large scale React
00:04:09.200 Native app could look like. Also, if you
00:04:11.840 enjoyed the way I teach React, you
00:04:13.920 should check out my new ReactJS course
00:04:16.238 for beginners. It's been almost a month
00:04:18.160 since I released this course and the
00:04:19.600 feedback has been incredible. Also, in
00:04:22.000 the first month, we have early bird
00:04:23.680 pricing. So, if you click in the link in
00:04:25.440 the description and you use the code
00:04:27.040 early 100, you'll get 20% off my course.
00:04:30.160 In this course, you will learn
00:04:31.440 everything related to React.js JS as a
00:04:34.160 beginner and I'll take you all the way
00:04:35.759 to knowing how to build large scale apps
00:04:38.160 through four different big projects. So
00:04:40.800 if you're interested in that, go ahead
00:04:42.080 and click the link in the description
00:04:43.440 and check it out. Now that we got all of
00:04:46.000 this out of the way, let's get into the
00:04:48.160 video. Okay, everyone. Now that we
00:04:49.919 understand some of the main core
00:04:51.680 concepts of React Native, let's start
00:04:54.479 building a React Native application
00:04:57.199 inside of our computer. Now, in order
00:04:59.680 for us to create our app, I have here a
00:05:02.560 folder that I opened up inside of my
00:05:05.120 code editor of choice, which is VS Code.
00:05:07.680 And I want to open up my terminal and
00:05:11.520 run the following command. I want to run
00:05:15.560 npx
00:05:17.080 create expo app. Then I'm going to put a
00:05:21.360 dot which will represent uh the that I
00:05:24.720 want to create this Expo app inside of
00:05:26.960 the current directory that I'm in which
00:05:28.560 is the folder that I created. Now if
00:05:30.880 you've never ran this create a expo app
00:05:33.039 command before, you'll probably be
00:05:35.120 prompted to install the the package just
00:05:38.240 as you can see over here. And this is
00:05:39.919 the version of create a expo app that
00:05:42.479 I'm using. Now, if you don't have the
00:05:44.160 package installed, just press enter and
00:05:45.840 it will install the CLI command and also
00:05:49.199 start setting up your app. When the
00:05:51.520 project is done creating, you should see
00:05:53.840 this uh little message saying that your
00:05:55.680 project is ready and that you can run
00:05:57.440 your project using one of the following
00:05:59.280 commands. Now, like I said before, when
00:06:02.160 you create a project with React Native
00:06:04.319 and specifically with Expo, um you can
00:06:06.960 you're actually creating a project that
00:06:09.199 runs on Android, on iOS, and on the web
00:06:12.400 all natively. So, you can actually see
00:06:14.880 the version of your app running on an
00:06:17.600 Android emulator, an iOS simulator, or
00:06:21.440 uh your actual browser. Now I want to go
00:06:24.639 over briefly how a boilerplate expo
00:06:28.880 project is generated. So uh I want to
00:06:31.759 talk about the different folders and
00:06:33.280 files that come with an React Native
00:06:35.840 Expo app and so you already have an idea
00:06:38.800 because as you can see it already has a
00:06:40.560 bunch of different folders and it might
00:06:42.000 be a little bit overwhelming at first.
00:06:44.080 Now the main thing that you should know
00:06:46.160 is that a React Native app using Expo is
00:06:50.080 very similar to a normal React app.
00:06:52.160 Right? You see we have our package.json
00:06:54.000 to manage our dependencies, our TS
00:06:56.160 config because we're using TypeScript
00:06:58.000 and all of the other folders that you
00:07:00.160 might see in a normal React app. Now the
00:07:02.400 thing is this is not actually a fully
00:07:06.160 like built from scratch project in React
00:07:09.120 Native. When we create when we run the
00:07:10.720 create expo app command, it actually
00:07:13.360 creates a project using the default
00:07:15.360 template. And this template has an
00:07:17.680 essential boilerplate code uh with other
00:07:20.479 libraries that are essential for you to
00:07:22.639 build your app. So, uh a lot of
00:07:24.960 different packages are actually already
00:07:26.639 installed because of this boilerplate um
00:07:29.599 app. But we can actually reset it if we
00:07:31.520 want to. Now, to test out what the
00:07:34.720 boilerplate code is, I'm going to run
00:07:37.199 npm run web. Now, in order for me to
00:07:41.039 show you guys uh what the boilerplate
00:07:43.520 project is, I'm going to choose what uh
00:07:46.880 type of software I want to run my
00:07:48.960 application on. And since we're building
00:07:50.560 an app, I'm going to run on iOS. I
00:07:53.520 already have the uh Xcode simulator uh
00:07:56.960 installed, the iPhone simulator
00:07:58.479 installed into my computer. If you
00:08:00.240 don't, you have to install it. Um but uh
00:08:03.520 if you want to just run it on web, you
00:08:05.280 can do that as well. So, I'm going to
00:08:07.039 run npm run iOS. And you'll see that it
00:08:10.560 will start a project using um iOS. But
00:08:13.680 it, as you can see, if you don't have
00:08:15.440 the iOS simulator installed, it will
00:08:18.319 actually give you um an option for you
00:08:21.120 to install uh the different developer
00:08:24.160 tools that you need. So, I'm going to
00:08:25.759 run going to put yes over here. It's
00:08:27.840 going to open up um Xcode. And as you
00:08:30.800 can see, even though I do have Axcode,
00:08:34.399 uh it's just on an older version in this
00:08:36.479 computer I'm using to record this video.
00:08:38.719 We have to install the iOS component for
00:08:42.479 uh in its latest version and it is 8.86
00:08:45.760 GB. So, I just click here, download and
00:08:48.080 install, and it will start installing
00:08:50.000 the system component for the iOS
00:08:52.240 simulator. It shouldn't take that long.
00:08:53.839 I uninstalled it into this computer so
00:08:56.080 you guys can get an idea of how to
00:08:58.080 actually set it up. But if you're using
00:09:00.160 Windows, you can and you have Android
00:09:02.399 Studio and you want to run an Android
00:09:05.920 app, you can use the Android Studio
00:09:08.240 emulator as well. If you want to build
00:09:10.080 it for both types of mobile phones, but
00:09:13.440 you don't want to use the emulators, I
00:09:15.200 would recommend just running it on web
00:09:16.959 and um you'll get the experience um on
00:09:19.760 running those emulators later on. So,
00:09:21.680 I'm going to wait for this to reinstall
00:09:23.279 the iOS 18.4 simulator and I'll be back
00:09:26.399 when it's done. Now I have successfully
00:09:28.480 installed the simulator. So I can just
00:09:30.560 run again npm run iOS and you might run
00:09:33.519 into this issue where it gives you the
00:09:36.080 same uh text saying that you need to
00:09:38.959 actually install. But you see that if
00:09:41.200 this message is still occurring after
00:09:42.959 installing Xcode, you might need to
00:09:45.200 finish the installation by running this
00:09:47.200 command. So you copy this command over
00:09:49.360 here and you close out the terminal. You
00:09:53.040 run it. It will ask for your computer
00:09:55.200 password. You just run your computer
00:09:57.200 password and um now if we run npm run
00:10:00.880 iOS again, it should actually run our
00:10:04.000 iOS simulator. It's running on iPhone 16
00:10:07.440 Pro. I can actually it will open for me
00:10:10.560 as you can see over here on the right. I
00:10:13.360 have my um simulator opened up. All I
00:10:16.320 did was I just searched for the
00:10:17.440 simulator app that I just installed on
00:10:19.839 my MacBook computer. And as you can see,
00:10:22.320 it has installed the Axo app. Not only
00:10:25.839 that, but it also has the name of your
00:10:27.760 app, which is the name of the folder.
00:10:29.920 Now, if I click uh close over here, this
00:10:33.360 is our app. We have our app successfully
00:10:35.440 running. Now, you see that this is the
00:10:37.760 boilerplate app which comes with all of
00:10:39.920 the folders that I mentioned. But like I
00:10:42.079 said, this is actually just a template
00:10:44.720 and you can build up off of this.
00:10:47.120 However, since I'm teaching you guys
00:10:48.959 React Native from scratch, we don't want
00:10:50.959 to actually build our project and learn
00:10:53.120 using this template. We want to reset
00:10:55.279 the project such that it is at a clean
00:10:57.680 slate. And to do that, we have this very
00:10:59.920 nifty command which we can run on a new
00:11:02.399 terminal called npm run
00:11:06.040 reset project. And when we run this, it
00:11:09.040 is going to ask if we want to delete all
00:11:12.160 of the files or move them into another
00:11:14.640 one. I'm going to put no actually
00:11:16.560 because then it will actually delete all
00:11:18.399 of the uh parts of the project that were
00:11:21.360 part of that template. So you see here
00:11:23.920 it deleted a bunch of files and it
00:11:26.959 generated some of the files that are
00:11:28.880 necessary for a project to run such as
00:11:31.440 the app folder and the the other two
00:11:34.240 files here that I'll mention in a
00:11:35.680 second. Um and we have a new project
00:11:37.680 from scratch. So we can actually get
00:11:40.000 started. So let's get started with this
00:11:42.800 app folder which is the most important
00:11:44.640 part of your project. So let's start
00:11:46.399 with the folder. What what is this
00:11:48.240 folder? Well, the app folder is similar
00:11:50.320 to like the app folder uh in other
00:11:53.680 frameworks like Nex.js. It is actually
00:11:56.399 where all of your routes, meaning all
00:11:58.560 the pages slashcreens that you have in
00:12:00.959 your app are going to live. Now, we're
00:12:03.440 going to talk about navigation and
00:12:05.200 creating routes. But the way you define
00:12:08.320 navigation, different pages in your in
00:12:10.240 your app is through a file-based system.
00:12:12.480 So, we're going to be creating files and
00:12:13.839 folders inside of here to determine the
00:12:16.079 different screens we have on our app.
00:12:18.240 Now each file that you put inside of
00:12:20.880 this app will automatically become
00:12:23.440 screen. However, there are two super
00:12:26.079 important files that are here by default
00:12:28.399 and you need to understand what they
00:12:29.920 are. So the first one is the
00:12:33.000 index.tsx. This is the index route. Now
00:12:36.399 this file is the entry point of our app
00:12:38.560 and it will execute when the development
00:12:41.200 server starts. By default, we see here
00:12:43.519 that it uses some of the core React
00:12:46.639 Native components that we've mentioned.
00:12:48.639 So, like I mentioned in the beginning of
00:12:50.639 the video, a view is more thought of
00:12:53.760 like a div in a normal web project and a
00:12:57.600 text is more thought of as a paragraph
00:13:00.399 tag or an H1 tag. Now, this index uh
00:13:03.920 screen over here is the main screen that
00:13:06.399 you have in your project, but you can
00:13:08.240 create other ones as well. Now all of
00:13:10.720 those screens are defined by the Expo
00:13:13.600 router framework. Now there are a couple
00:13:16.240 things that you need to understand about
00:13:17.519 navigation and routing in React Native
00:13:20.000 and Expo. So like I said, this is a
00:13:22.560 file-based routing and that means that
00:13:25.200 in this app directory over here, we have
00:13:27.440 to define folders and files to determine
00:13:30.240 the different routes and screens we're
00:13:31.839 going to have. Now all of them are
00:13:33.839 binded together by this layout file over
00:13:36.480 here. This root layout is actually the
00:13:41.200 shared is actually where we define
00:13:44.240 shared UI elements between in between
00:13:46.959 all of the different routes. So this
00:13:49.360 means that for example in your app if
00:13:51.200 you have UI elements that you might want
00:13:53.200 to have on every single screen like
00:13:55.040 maybe a header different tabs you know
00:13:57.360 to navigate between them uh things that
00:13:59.440 should stay consistent in between all
00:14:01.120 the different routes you would put them
00:14:02.959 over here. Now, this stack over here
00:14:05.680 represents whichever screen you're in.
00:14:08.160 So, if you have worked with React in the
00:14:10.480 past and you've worked with something
00:14:11.680 like React Router DOM or something like
00:14:14.720 Nex.js uh filebased routing as well, you
00:14:17.920 might know what I'm talking about. This
00:14:19.360 is what this depending on what screen
00:14:21.760 we're in, the screen UI will be rendered
00:14:24.480 over here and whatever we put around it
00:14:27.279 will actually be uh displayed as well.
00:14:30.079 So I could put here a text that will say
00:14:33.040 hello. And if I import text from uh
00:14:39.040 actually from React
00:14:40.760 Native, you should see that hello should
00:14:43.199 show up no matter what. Now the thing is
00:14:46.160 uh hello is showing up over here, but
00:14:48.000 it's showing up right at the top here. I
00:14:50.480 don't know if you can even see it.
00:14:52.079 Probably not. Maybe if I just like copy
00:14:54.320 and paste this like a bunch of times,
00:14:56.000 you might see it. Uh but it is appearing
00:14:58.240 above the stack. And if I put this below
00:15:00.160 here as well, you'll see that it will
00:15:01.920 appear below. Whatever is in between
00:15:04.480 both of them is the screen that we're in
00:15:06.720 and it's being represented by this
00:15:08.880 stack. Now, how do we create a different
00:15:11.360 route or different um screen in our
00:15:14.240 application? So, the way we're going to
00:15:15.839 do this is we're going to come here to
00:15:18.480 our app folder and we're going to create
00:15:22.959 a new navigation item. So to add a new
00:15:25.839 screen to this stack, I could come here
00:15:27.680 to our um app folder and I can just
00:15:30.639 create a new file. Now the name of the
00:15:33.360 file is what is going to determine what
00:15:35.360 the name of the screen is. So for
00:15:37.160 example, if I want to make an login
00:15:41.120 screen, I could just make a
00:15:44.680 login.tsx. And for example, if I want to
00:15:47.360 make a log login login screen, I can
00:15:49.199 just make a
00:15:50.839 login.tsx. And now I can export a
00:15:54.959 component from inside this file. So I'm
00:15:58.320 going to export
00:15:59.959 default function. I can give it whatever
00:16:03.279 name I want. But usually what I like for
00:16:05.680 naming convention is I name the name of
00:16:08.000 the screen. So login and then I put
00:16:11.240 screen. And then inside of here we need
00:16:13.839 to return some sort of UI. We're going
00:16:16.320 to return a
00:16:18.600 view with some sort of I don't know text
00:16:21.839 inside of it. We can put whatever UI we
00:16:24.079 want. Now I'm going to import this UI
00:16:27.120 over here. So I'm going to import view
00:16:29.600 and
00:16:30.759 text from React
00:16:33.720 Native. And I'm going to put hello. This
00:16:37.120 is the login page. Now when I save this,
00:16:41.199 absolutely nothing happens. we still see
00:16:43.680 our um index.ts, right? The this screen
00:16:47.680 over here, it it it's whatever I put in
00:16:50.079 here, you'll see it will update to this.
00:16:51.920 However, we don't see the login page
00:16:53.920 that we just created. And the reason for
00:16:55.759 that is because in our root layout over
00:16:57.759 here, we never actually defined that
00:17:00.320 screen. So, what we want to do is we
00:17:02.720 actually want to um keep this stack
00:17:05.679 component, but we want to actually um
00:17:08.959 like not self-close it. And inside of
00:17:10.799 here, we're going to define each
00:17:13.039 individual stack screen. So this is how
00:17:15.839 you define a screen. You just say stack
00:17:18.160 screen. You need to give it a name. So
00:17:19.760 we have here the obviously the index
00:17:22.400 screen that we can create that this it
00:17:24.480 already existed, but now we're just
00:17:26.000 formalizing it. And we can pass some
00:17:28.000 options. for example. Uh and different
00:17:30.080 options that you can pass to a screen is
00:17:33.440 for example a name which is the required
00:17:36.960 uh prop that you need to pass and a
00:17:38.960 bunch of other optional ones as well.
00:17:41.360 Now they're not important for now but
00:17:43.600 you might need to use them in the
00:17:45.120 future. The important one is just
00:17:46.559 knowing that you need to pass a title
00:17:48.080 for each individual screen. Now the home
00:17:50.320 screen is going to be called home. And
00:17:52.799 you see that immediately this changes to
00:17:54.559 home when before uh it didn't even
00:17:57.360 compile. But if I put something else
00:17:58.880 over here, now it changes at the top. So
00:18:01.440 this is what the purpose of the title
00:18:03.280 is. Now we can define another screen
00:18:06.320 over here. And this other screen is not
00:18:08.400 going to be the index. It's going to be
00:18:10.320 the login screen. And we can give it a
00:18:13.679 different name like login as well. And
00:18:16.240 we now know that it exists. But again,
00:18:20.160 how do I get to that screen? Well, to
00:18:23.039 get to that screen, we need to find a
00:18:24.720 way to navigate to it. And since our
00:18:27.120 project starts from the index route, we
00:18:29.760 need a way to do that through the index
00:18:31.679 route. Now, in order to navigate between
00:18:34.640 screens, there's a couple ways. Now, the
00:18:37.440 most web ccentric way that you can
00:18:39.600 imagine is by using a link. And there is
00:18:41.760 actually a link component that you can
00:18:44.160 use from um Expo Router. Now, this link
00:18:51.360 component is pretty simple. It's like
00:18:53.200 any link component you might use in a in
00:18:55.520 a normal web react library. You just
00:18:58.640 call the link. You put um some sort of
00:19:01.120 text like login page and then you have
00:19:05.039 to pass here an href. So the href is
00:19:08.160 just the route to your screen. And you
00:19:11.919 see that immediately it already offers
00:19:14.000 us different options that we might want
00:19:15.919 to use that are existing in our project.
00:19:18.720 Specifically the login one that we want.
00:19:21.200 So, we can create this over here. And
00:19:23.679 you should see that now we have this
00:19:25.280 login page text, but it doesn't really
00:19:28.000 look like a link or a button, right? So,
00:19:31.120 I'm going to show you guys in a second
00:19:32.640 how to actually make this look a little
00:19:34.559 bit better by applying some styling. But
00:19:36.640 for now, we know that if we click on
00:19:38.640 this, we are actually navigating to the
00:19:41.600 login screen. And we see the UI that we
00:19:44.240 created in this login screen. We also
00:19:46.880 have by default easy backtracking
00:19:49.919 navigation that is implemented for us
00:19:52.799 without anything to worry about. So we
00:19:54.640 can you can see how we can actually move
00:19:56.640 between different parts of the app
00:19:58.960 without having to worry. Now how do I
00:20:01.039 apply some styling to make this link
00:20:03.120 look a little bit better? Well, you
00:20:05.280 could apply similar to what we've
00:20:06.880 mentioned here, right? There's a style
00:20:08.720 thing over here that you can use. I
00:20:10.559 could come over here and just say style
00:20:13.120 and apply some inline styling. I can
00:20:15.600 make this for example uh be a button. So
00:20:19.840 I can set the width to be I don't know
00:20:23.440 something like 200 and then the height
00:20:26.559 to be let's make it like 50. It's going
00:20:30.400 to look kind of weird. I can set a
00:20:32.000 background color to be uh coral. Uh
00:20:37.039 actually this has to be a string. And
00:20:39.200 then it will look like this.
00:20:41.600 Uh, I'll put some border radius and I'll
00:20:45.120 say it's like eight. Then I can also
00:20:48.400 text align
00:20:50.360 to center. And I could also just make
00:20:54.840 this width and height actually smaller,
00:20:58.520 like way smaller. Something like this.
00:21:01.120 Right? So obviously it doesn't look
00:21:02.799 amazing, but I'm just showing you guys
00:21:04.240 that this is how you would apply styling
00:21:05.919 to this. and um it will look a little
00:21:08.480 bit more like what the UI element should
00:21:10.799 look like. Now there's a different way
00:21:12.240 for you to actually apply styling. You
00:21:13.919 see that here we have styles for our
00:21:15.919 view and for our link. Now obviously you
00:21:19.679 could apply the styling through inline
00:21:21.039 styling like this. However, sometimes
00:21:23.120 you might want to keep it all condensed
00:21:24.880 in one place. So you can actually use
00:21:26.960 the stylesheet um object that exists
00:21:30.400 from React Native, not Expo Router.
00:21:32.960 Sorry about that. Stylesheet. And what
00:21:35.919 this does is somewhere in your app,
00:21:39.360 usually at the bottom, you can define a
00:21:41.679 styles object and you use the stylesheet
00:21:45.440 to create your screens stylesheet, which
00:21:50.000 means you can define all the styles for
00:21:52.480 your screen inside of this object. For
00:21:55.240 example, let's grab this view over here,
00:21:57.919 right? Uh this is the view. So for the
00:22:01.600 homepage so I can say uh view as the
00:22:07.039 like the style that we are styling and I
00:22:09.760 can just copy all of these styles and
00:22:13.360 just paste them over here and then if I
00:22:16.559 come to this style object over here
00:22:18.960 instead of directly inserting the styles
00:22:21.600 I can just say styles do and it will
00:22:25.280 actually use the styles from that view.
00:22:27.760 Now I can do the exact same thing here
00:22:29.760 with the
00:22:31.640 uh navigation button. I can create a nav
00:22:35.840 button over here and paste that. And
00:22:38.559 then I can just call this
00:22:41.080 styles.nav button. So this is how you
00:22:44.720 would apply some basic styling inside of
00:22:47.039 your project. Now you might be asking
00:22:50.960 yourself, okay, but when I use an app
00:22:53.679 there, it doesn't look like this.
00:22:55.679 There's no buttons to navigate. That
00:22:57.679 doesn't look like a real app. Real apps
00:23:00.400 actually have some sort of navigation um
00:23:03.440 tabs like a like some some way for you
00:23:05.760 to keep clicking. Usually at the bottom,
00:23:07.520 right, where you you click between the
00:23:09.200 different tabs in your app, you can
00:23:10.720 navigate. If you think about like
00:23:11.840 Instagram, Tik Tok, or any other um app
00:23:14.480 that you use, they all have those little
00:23:16.320 tabs at the bottom, and you can actually
00:23:17.760 navigate between the screens using that.
00:23:20.080 So, how do we do that? Well, that
00:23:22.240 concept is called tabs. And it's
00:23:24.240 actually really simple for you to
00:23:25.440 implement in React Native. The way we're
00:23:27.440 going to do that is we're actually going
00:23:28.720 to get um the different screens that we
00:23:31.120 have, which for now is the login and the
00:23:33.120 index. And we're going to create a new
00:23:34.960 folder. Now, this folder is going to be
00:23:37.280 called the tabs folder. And we have to
00:23:41.360 use this little parentheses over here.
00:23:44.559 This tab folder is a special folder
00:23:47.200 because we can put different uh screens
00:23:50.240 inside of it and group them together.
00:23:52.400 just put the navigation to them at the
00:23:54.320 bottom of the screen as if we have some
00:23:56.480 sort of like bottom uh tab navigator.
00:23:59.760 So, what I'm going to do is I'm going to
00:24:01.120 copy the index and the login and I'm
00:24:03.360 just going to put them inside of the
00:24:04.880 tabs folder. Just going to move them.
00:24:06.960 And now that we have a collection of
00:24:08.960 screens, which is why we use this um
00:24:11.679 parentheses over here, which is a way
00:24:13.760 for us to indicate that this is a route
00:24:16.640 group, we actually have to set up a
00:24:19.120 layout for this group of routes. So I'm
00:24:22.240 going to copy this layout file and I'm
00:24:23.919 going to paste it on the tabs folder
00:24:25.760 over here. Now this means that we have
00:24:27.760 to define what are the screens that
00:24:30.000 exist in this group. So the screens that
00:24:33.840 exist on this group are the screens that
00:24:35.760 we already created before. We are
00:24:38.480 basically merging them into one group of
00:24:41.840 of screens that will exist in our app.
00:24:45.520 Now we're going to call that group of
00:24:47.440 screens the tabs. Right? It's the name
00:24:50.159 of the folder that we created over here.
00:24:52.720 So on the layout inside of the tabs
00:24:55.919 folder, we can just leave it like this.
00:24:58.480 Uh we can actually change the name
00:25:00.159 instead of root layout. This is the tabs
00:25:02.480 layout like this. But the layout folder
00:25:06.720 which is has the root layout can be
00:25:09.360 changed to instead of showing the two
00:25:11.679 individual screens, it will actually
00:25:13.520 just show the or render the tab group.
00:25:17.520 So in here we're going to change this to
00:25:21.039 have a name of tabs which will match the
00:25:24.480 name of the folder we created over here.
00:25:26.640 Then you see that immediately the name
00:25:28.720 of the the title of the page over here
00:25:30.400 has changed. And the reason for that is
00:25:32.799 because it doesn't make sense to have a
00:25:34.320 title for a group of screens. Right? So
00:25:38.320 actually in a group of screens we don't
00:25:40.559 want to show the header for this
00:25:43.200 specific stack screen. So I'm going to
00:25:45.679 remove the title over here and I'm going
00:25:47.279 to set a property called header shown to
00:25:51.120 false. And now we are ready to make our
00:25:53.440 bottom tab navigator. So how do we do
00:25:56.240 that? Well, let's think about it. We
00:25:58.000 want this piece of UI to appear on all
00:26:00.960 of the routes that exist on the tabs
00:26:04.480 folder, right? So since this navigator
00:26:06.960 is going to navigate between the
00:26:08.320 different screens on the tabs folder, I
00:26:10.480 want that piece of UI with the buttons
00:26:12.799 to navigate to appear regardless of
00:26:15.120 which of the screens we are in. So that
00:26:17.039 concept relates to the concept of what a
00:26:19.279 layout does. So in this layout file over
00:26:21.440 here, we can put UI that exist in
00:26:24.799 between the uh two screen definitions
00:26:28.880 and it will appear no matter what. Now
00:26:31.279 the most basic way for us to achieve
00:26:33.679 that tab navigation look is actually we
00:26:36.400 don't want to actually call this a stack
00:26:38.559 because this isn't a stack. This is what
00:26:41.360 a stack would be. This is a tab, right?
00:26:44.720 So we want to switch this from instead
00:26:46.799 of saying stack, we actually want to
00:26:48.640 import from expo router the tabs
00:26:52.000 component and we want to render that
00:26:53.720 instead. Now we'll replace this to
00:26:56.080 tabs.screen as well. And you'll see that
00:26:57.919 when I save the file, automatically
00:26:59.840 we're going to get the bottom tab
00:27:01.840 navigator look. So we have here the two
00:27:04.559 different routes and we can actually
00:27:05.840 navigate in between them by just
00:27:07.520 clicking each individual tab. So now we
00:27:10.720 don't need this login page thing. It
00:27:12.960 looks kind of ugly. We can actually
00:27:14.640 remove this from uh from here. Great.
00:27:19.600 Now we have a way for us to navigate.
00:27:22.799 But it's kind of weird. We don't have
00:27:24.880 like for example we have the same icon
00:27:26.799 for each of them. So how can we switch
00:27:28.480 and customize each individual tab? So
00:27:31.039 the way for you to do this is in your
00:27:34.320 layout for the tabs you can actually put
00:27:36.640 some options for the tabs that you
00:27:39.520 create. So the first thing that you can
00:27:41.039 do is you can actually set a color to
00:27:44.640 which tab is active. So for example we
00:27:47.360 are in the home tab over here. I might
00:27:49.200 want to make this tab have a different
00:27:51.760 color. So to do that I can come to the
00:27:53.840 tabs um component over here. I can set a
00:27:56.960 screen options object and I can set a
00:28:01.320 tab bar
00:28:04.840 active tint color and I can set this to
00:28:09.600 be coral for example which is the color
00:28:12.240 I used for that button and now it
00:28:13.760 changed the color of which u tab is
00:28:16.960 active. I could also change this to
00:28:19.120 instead be tabbar active background
00:28:22.399 color and then it just becomes something
00:28:24.000 a little bit more uh insane. I'll just
00:28:27.520 keep it as it was before cuz it looks
00:28:29.039 kind of okay. Now, one thing that we
00:28:31.679 want to do as well maybe is actually
00:28:34.000 changing the icon. So, when you set up
00:28:36.080 your project, it comes with this popular
00:28:38.960 library called the vector icons library
00:28:41.840 from Expo. So this is going to give you
00:28:44.000 a lot of icons and in every app that you
00:28:47.520 create you need to have an icon library
00:28:49.919 just because of how common they are in
00:28:52.559 mobile apps. So the way you import icons
00:28:55.120 depend on which icons you're going to
00:28:57.039 import. So we're going to open up over
00:28:59.360 here the list of icons from ver vector
00:29:02.640 icons and I'll put the link for this
00:29:04.480 together with the uh code for this
00:29:06.880 video. But you can see that there is a
00:29:09.039 list full of icons and there are
00:29:11.200 different icon uh providers right
00:29:13.919 there's as you can see end design if I
00:29:16.320 just search for the home icon we can get
00:29:18.320 one from antipo feather font awesome uh
00:29:22.159 a bunch of them so uh you choose
00:29:24.399 whichever one you want for example let's
00:29:26.399 get this one from um home you can see
00:29:29.440 that the way we do this is uh you copy
00:29:33.039 this command over here to import it you
00:29:35.840 paste it at the top and then you can
00:29:38.000 copy the rendering of that component by
00:29:40.799 just copying that and then just pasting
00:29:42.559 it over here. So if I go back into our
00:29:45.919 app, you see that um actually it won't
00:29:48.640 show up cuz it's it's up here. But you
00:29:51.440 have to trust that it's working. Now
00:29:53.200 what we want to do is we want to put
00:29:54.799 this icon uh to replace the home icon
00:29:57.600 over here. Now, the way we're going to
00:29:59.120 do that is I'm actually going to come to
00:30:01.200 the home tab screen and I want to give
00:30:03.279 it a property called tab bar icon and
00:30:08.240 I'll just set it equal to
00:30:11.399 a function that will have a that will
00:30:14.640 return back this um component call. And
00:30:18.000 you can see that now it renders the home
00:30:20.640 icon instead of the uh whatever that
00:30:24.159 icon was before. Now the problem is that
00:30:26.799 this com this this home icon is rendered
00:30:29.919 as being full no matter what. It's not
00:30:32.080 even following the the color scheme uh
00:30:35.039 that we set at the top over here. So how
00:30:37.840 do we adapt to that? Well, with this tab
00:30:40.960 bar icon function, it actually gives us
00:30:43.600 some arguments that we can use in this
00:30:46.720 um function argument over here. So I'm
00:30:49.120 going to actually dstructure what we can
00:30:51.039 get from this. And what we can get is we
00:30:52.880 can get for example the color. That
00:30:54.640 makes it easy. We can just set now the
00:30:56.799 color of this icon to be the color of
00:30:59.840 our tab. And automatically you see that
00:31:02.080 it now adapts to that color. Right? Now
00:31:05.760 one thing you can do as well is there
00:31:08.399 are different types of icons. Right? So
00:31:11.120 you see we have this uh home icon from
00:31:14.320 foot from font awesome 5. But if I go
00:31:17.520 over here and I search for home
00:31:21.320 um let me see home and then we get
00:31:26.520 probably this was from font awesome 5.
00:31:29.600 We could maybe get this one because it's
00:31:31.760 kind of empty. I'm just it's like an
00:31:33.679 outline instead of being a full one. We
00:31:36.480 can copy that icon. We'll import it over
00:31:38.960 here at the top cuz this one is end
00:31:40.399 design. We'll copy the component name.
00:31:43.039 And what we can do is we can actually
00:31:45.039 render one icon when the tab is focused
00:31:48.799 and render a completely different one
00:31:50.720 when the the tab is not focused. And the
00:31:53.840 way we do this is through the focus
00:31:55.840 property over here on the the argument.
00:31:59.120 So what we do is we ask okay
00:32:01.480 if the uh tab is
00:32:06.200 focused so if focused is true then we
00:32:10.320 want to render this icon but if it's not
00:32:14.799 then we want to render this one. Now
00:32:16.720 this is breaking because actually this
00:32:18.320 is returning back um directly a
00:32:21.440 component. So what we have to do is we
00:32:24.159 have to remove the parenthesis that we
00:32:27.279 were putting and we have to return this
00:32:31.039 result. So I'm going to return whatever
00:32:33.120 is returned from this. So I'm returning
00:32:35.120 if focused is true I return this icon.
00:32:37.919 If focus is false I return this one. And
00:32:40.080 now what this does is you see when when
00:32:42.080 when we are focused on the home we see
00:32:44.480 the font awesome 5 icon. But when I
00:32:46.559 click on this it now switches to the
00:32:48.799 other icon. Now I don't think that this
00:32:50.559 specifically two icons are good for this
00:32:53.279 example just cuz they are actually from
00:32:55.120 different libraries but some libraries
00:32:57.120 do provide um actually like an a filled
00:33:00.559 version and an outline version of each
00:33:02.640 icon. So you can actually do something
00:33:04.159 like this. So this is the basics of um
00:33:07.840 expo routing and the basics of actually
00:33:10.720 react native as a whole. So we will
00:33:14.080 learn the rest through building the
00:33:16.399 project for this course. It's going to
00:33:17.919 be a habit tracking app and it's going
00:33:20.159 to be a full stack app. We're going to
00:33:21.919 learn how to organize our project in a
00:33:23.840 way such that it will make it efficient
00:33:25.760 for us to scale this if we wanted to and
00:33:28.559 you guys will be able to use the
00:33:30.559 knowledge you guys have of React, the
00:33:32.159 basic knowledge of React in order to
00:33:34.480 actually build the rest. I feel like if
00:33:36.480 you understand React a little bit, this
00:33:38.480 is going to be very easy for you. But
00:33:40.640 even if you don't understand React, I'll
00:33:42.399 take you guys every single step of the
00:33:44.559 way so you guys actually get out of this
00:33:46.720 video understanding everything. So,
00:33:49.120 let's get started with building the
00:33:51.039 project. So, as you've seen in the
00:33:52.799 beginning of the video, this project
00:33:54.720 that we're going to be building is going
00:33:56.080 to be a habit tracker, and it's going to
00:33:59.120 be a full stack project. So, we're going
00:34:01.200 to have to learn how to deal with that.
00:34:03.200 But, we're going to continue off from
00:34:04.880 where we left off in the same project,
00:34:06.640 in the same folder that we were coding
00:34:09.280 in. and we want to make some changes. So
00:34:12.320 the first thing I want to do is I want
00:34:14.560 to set up our project such that a user
00:34:17.599 can go into the app and be able to
00:34:20.399 create an account or sign in to an
00:34:22.480 account that they already have. So to do
00:34:25.040 that we're going to have to make our
00:34:26.639 project into a full stack project. And
00:34:29.679 um there's different ways in which you
00:34:31.359 can do that. Uh obviously you can make
00:34:33.199 your own backend or you can use a
00:34:35.040 backend as a service uh provider. Uh
00:34:37.440 there's a bunch of them out there. The
00:34:39.199 most popular examples are Firebase,
00:34:42.000 AppRight, or Superbase. So, in this
00:34:44.560 video, we're going to be using AppRight.
00:34:46.879 So, it is a free service that I'm not
00:34:48.960 sponsored by, but you can just go ahead
00:34:50.960 and click the link in the description or
00:34:52.639 just go to apprite.com. And you will be
00:34:55.040 prompted with this page. It's actually
00:34:57.960 apprite.io. Now, you have to create an
00:35:00.400 account. Uh, I usually just create my
00:35:02.240 account with GitHub. And then, you need
00:35:03.760 to click on go to console. When you
00:35:05.680 click on go to console, you'll be
00:35:07.119 prompted with your projects. I created
00:35:09.200 here a new account uh just for this
00:35:11.920 video. Uh so if you want to create a new
00:35:15.040 project, you click on create a new
00:35:17.119 project over here and it will ask for
00:35:19.440 your project name. So we're going to be
00:35:21.119 making an habit tracker app. So that's
00:35:25.040 what I'm going to be calling it. Now I'm
00:35:27.359 going to click next. And it's going to
00:35:29.440 ask for our region for deployment. Now,
00:35:32.880 right now, AppRight only has Frankfurt.
00:35:35.119 However, they are in the plans of
00:35:37.599 actually adding other regions as well,
00:35:40.079 and it shouldn't be that much of an
00:35:41.599 issue for us in our project. So, we're
00:35:43.760 going to click here on create, and you
00:35:46.160 can see that our project was created.
00:35:48.640 Now, the whole point of using AppRight
00:35:50.400 is that we can facilitate creating a
00:35:52.880 backend for our project. And similar to
00:35:55.119 stuff like Firebase and Superbase,
00:35:56.640 AppRight actually allows you to set up
00:35:59.359 database interactions um authentication
00:36:02.079 into your projects and even real time
00:36:04.480 messaging. So in our case, uh we're
00:36:07.920 going to be using O for handling signing
00:36:11.359 in and um creating accounts and also
00:36:15.119 their database. Now the database on
00:36:17.280 AppRight is actually a relational
00:36:19.839 database. So um if you don't know uh
00:36:22.800 apprite uses Maria DB on its uh
00:36:26.560 underlining uh database however a lot of
00:36:29.520 people think it's actually a nosql
00:36:31.440 database because of the terminology that
00:36:33.760 we use when we are creating our
00:36:35.839 databases on apprite it's very similar
00:36:37.599 to something like on firebase with fire
00:36:39.599 store uh there's words like collections
00:36:42.160 and documents which are very commonly
00:36:44.960 used for nosql databases but actually
00:36:47.839 when you're working with apprite you're
00:36:49.520 working with a relational database. I
00:36:51.520 just wanted to get that out of the way
00:36:52.880 in case you ever had that doubt. Now,
00:36:55.920 we're going to start off. We're not
00:36:57.040 going to create our database yet. We're
00:36:58.720 going to start with our O. And O is
00:37:00.640 already set up by default. However, we
00:37:03.280 have to connect um our AppRite project
00:37:06.400 to our React Native application. So what
00:37:09.920 I want to do is I want to go back to our
00:37:12.320 app and I want to create a folder that
00:37:15.200 is going to be outside of our app folder
00:37:17.760 and it's going to be called the lip. Now
00:37:19.920 in here we're going to create the
00:37:22.040 appite.ts file which is going to be the
00:37:24.960 configuration file for connecting
00:37:26.640 apprite to our project. So what we need
00:37:29.760 to do is we need to install the react
00:37:32.480 native app SDK. So I'm going to come
00:37:35.119 over here and we're going to clear out
00:37:37.920 our terminal and I'm going to run
00:37:40.520 npx expo install. So when you install
00:37:44.000 packages you run npx expo install and
00:37:46.880 then you put the name of the package
00:37:48.160 which in our case is going to be react
00:37:51.320 native
00:37:52.839 apprite. Now we also want to install
00:37:55.440 another library that is going to help
00:37:57.440 establish this connection. is going to
00:37:59.359 be the React Native URL
00:38:03.960 polyfill and we'll press enter. This
00:38:07.040 should install both packages into our
00:38:09.200 project. And at the top over here of our
00:38:11.599 app file, I'm going to import uh the
00:38:15.480 account, the
00:38:18.359 client, and the
00:38:20.680 databases from
00:38:23.560 React
00:38:25.880 Native Appite.
00:38:28.640 Uh then below this we're going to create
00:38:31.760 our apprite client. So I'm going to say
00:38:34.400 conclient is equal to new client. Now we
00:38:38.240 have to put a couple things um into this
00:38:40.960 client in order for it to actually
00:38:42.720 connect to our project. The first thing
00:38:44.560 we need to do is we need to set an
00:38:46.440 endpoint. Now an endpoint is going to be
00:38:48.960 an endpoint that we get from appite. So
00:38:51.599 if I go over here, I can go to settings
00:38:54.000 and I can see that my API endpoint is
00:38:56.720 this over here on the overview. We get
00:38:58.480 the API credentials and we can copy this
00:39:01.280 value. Then we can put it directly over
00:39:03.760 here and uh it will actually set that
00:39:06.800 endpoint. Now the second thing I have to
00:39:08.560 do is I have to set the project to
00:39:11.920 specify what project I am creating on in
00:39:15.119 my account. Now the project is going to
00:39:17.760 be this ID over here. So I'm going to
00:39:20.160 copy this and I'm going to go back over
00:39:22.640 here and I'll just set the project equal
00:39:24.800 to this. Now the final thing is I need
00:39:27.839 to set the platform for my project. Now
00:39:30.240 I haven't actually set up my project
00:39:32.480 yet. To do that I'm going to go here to
00:39:34.560 overview and we need to add a platform
00:39:37.040 such that so that we specify where we
00:39:39.599 are building our app right project. So
00:39:42.000 there's web, there's flutter, there's
00:39:44.040 apple specific and there's obviously
00:39:46.720 react native. So, I'm going to copy
00:39:48.079 here, click here on React Native, and uh
00:39:50.640 it's going to ask us for a package name
00:39:52.560 registration. We're just going to give
00:39:54.240 it a name for the app. So, I'm going to
00:39:56.320 call it the habit tracker app. Uh then
00:40:00.720 it's going to ask for a package name.
00:40:02.560 You can call it whatever you want. I'm
00:40:04.079 going to call it co.pro
00:40:07.960 tag.habit tracker or something like
00:40:10.400 this. You can see that you can set the
00:40:12.480 value for both iOS and Android. I'll
00:40:15.440 just keep both of them the same. And
00:40:16.800 then I'm going to click on next. Now
00:40:19.280 when I click next, it's going to
00:40:20.800 actually give the commands that we
00:40:23.200 already installed. So I'm going to click
00:40:24.560 next again. And everything that we
00:40:26.400 already wrote is actually already over
00:40:28.320 here. So I'll just actually copy this
00:40:30.400 and I'll go back to our code and I'll
00:40:33.040 just paste it so that we get the
00:40:34.720 platform as well. Now I'm going to click
00:40:37.040 on go to dashboard and we should have
00:40:39.520 correctly connected our project. Now
00:40:41.839 this information is your credentials and
00:40:44.240 they should be safely stored. uh so no
00:40:47.119 storing credentials and putting them
00:40:49.359 publicly on GitHub. So what we need to
00:40:51.040 do is we need to create av file on our
00:40:54.160 project so that we can access those
00:40:56.079 credentials elsewhere. So how I'm going
00:40:58.000 to do this is I'm going to come over
00:40:59.599 here and I'm going to create an
00:41:02.040 env.lo file and on this file I want to
00:41:06.240 um create variables that are going to
00:41:07.839 represent these um uh values over here.
00:41:11.440 So I'm going to come over here to our
00:41:13.440 envo. Let's create firstly um an
00:41:16.880 environment variable for the endpoint.
00:41:18.640 So I'm going to create here expo public
00:41:22.560 which you have to do because every
00:41:24.160 environment variable you on expo has to
00:41:26.880 be prefixed with expo public and then
00:41:29.839 you write the name of the variable. So
00:41:31.119 in our case it's going to be the apprite
00:41:34.200 endpoint and we're going to set this
00:41:36.240 equal to this value over
00:41:40.200 here. Perfect. Now I'm actually going to
00:41:43.280 copy this already so we don't have to
00:41:45.440 keep coming back. I'm just going to
00:41:47.280 paste it over here. And then let's copy
00:41:49.760 the platform as well. And just paste it
00:41:51.760 over here. Now for the endpoint or for
00:41:54.880 the project ID, I'm just going to paste
00:41:56.880 it like this. And I'm going to call this
00:41:59.200 the project ID. Then for the last one,
00:42:04.240 it's going to be the platform. So I'll
00:42:06.640 just call this platform. Perfect. Now to
00:42:10.400 import it over here, we literally just
00:42:13.040 use
00:42:15.960 process.env dot and then the name of the
00:42:18.160 variable. So in our case over here, we
00:42:19.920 have the endpoint variable. Then we want
00:42:22.720 to use the U project ID variable. So
00:42:26.240 I'll copy this, paste it here. And I'll
00:42:30.640 copy this for the platform as well. And
00:42:32.560 I'll just write platform. So I'll delete
00:42:35.520 this and I'll write platform. Now the
00:42:39.680 reason why it's giving us errors is
00:42:41.119 because we're using TypeScript and uh
00:42:43.599 technically in reality uh you could
00:42:46.880 potentially not have a value for this
00:42:49.280 environment variables. So potentially
00:42:51.760 this
00:42:52.520 process.env whatever name of variable
00:42:54.560 you put could be null. So since we know
00:42:56.880 that we did put those values on theuninv
00:42:59.520 file, let's assert that uh there is a
00:43:03.440 value on this variable. So it removes
00:43:05.839 that little squiggly line. Perfect. And
00:43:07.520 now we have successfully created our
00:43:09.520 client. Now I also want to export this
00:43:11.599 client in case I want to access it later
00:43:13.599 on in our project. But one thing you
00:43:16.000 need to know is that the different
00:43:17.760 services that are available on apprite
00:43:20.240 like authentication and databases they
00:43:22.800 are independent from each other. So you
00:43:25.040 can actually just use app right for O if
00:43:26.960 you wanted to or just use it for the
00:43:28.480 databases without using the other one.
00:43:30.480 So we have to specify what service I
00:43:33.200 want to initialize on my project for
00:43:35.119 apprite. So the one that I want right
00:43:37.119 now is the O service and the way I'm
00:43:39.280 going to do this is I'm going to create
00:43:40.480 a variable called account and I'm going
00:43:42.560 to set this equal to new account and
00:43:46.000 this is what we imported before from
00:43:47.920 React Native apprite. Then in this class
00:43:50.720 over here, I just have to pass my client
00:43:52.960 and I'll export this variable. And with
00:43:54.880 this variable, I can access and make
00:43:56.960 modifications to the user authentication
00:44:00.079 service on apprite. So let's start using
00:44:03.359 it. I'm going to actually close all of
00:44:05.119 this and let's start with our project.
00:44:07.920 So the first thing I want is if I'm
00:44:09.680 going to the app, I want to be able to
00:44:12.400 be prompted with an O page, right? a
00:44:15.520 page that is going to um tell us that we
00:44:18.880 can sign in into our accounts or sign up
00:44:21.839 for an account. I don't want to see the
00:44:23.839 page that we have right now. So to do
00:44:25.839 that, I want to create a new page on my
00:44:28.240 app and it's not going to be part of the
00:44:29.920 tabs because it's not going to be
00:44:31.359 something accessible from the tabs. It's
00:44:33.040 going to be independent from that. So
00:44:34.560 I'll create here another file called
00:44:37.800 O.tsx. And this will represent the O
00:44:41.119 screen for us to be able to sign in and
00:44:43.359 sign up. So I'll export over here a
00:44:46.880 default function called off
00:44:51.160 screen. And now in this off screen I
00:44:54.319 want to return a special component from
00:44:57.440 React Native called the
00:45:00.839 keyboard avoiding view. So this is
00:45:04.319 basically a normal view like we've used
00:45:06.800 already. However, it ensures that the
00:45:08.640 keyboard doesn't overlap whatever we put
00:45:11.760 inside of here which is going to be the
00:45:12.960 form. just so that uh it doesn't annoy
00:45:15.599 you when you're typing on one of the
00:45:17.280 inputs. The keyboard appears on top of
00:45:19.599 it. So, this behavior will change
00:45:21.680 depending on the platform you use. Uh
00:45:23.599 but I just think it looks a lot nicer if
00:45:25.760 you set it up like this. So, you do have
00:45:27.839 to specify here actually the behavior
00:45:30.240 you want out of it. So, I'll just set
00:45:32.560 behavior. And depending on the platform,
00:45:34.960 you have certain keywords that you can
00:45:37.599 use to help it adjust to your screen. So
00:45:41.200 for example, I can get whatever the
00:45:43.280 platform that my React Native app is on
00:45:46.160 by using the
00:45:47.640 platform object from React Native and
00:45:50.400 just getting the OS. This should return
00:45:53.119 either um iOS, Android, Mac OS, Windows
00:45:56.800 or web. So those are the options, right?
00:45:58.640 Because those are what you can build
00:45:59.839 with React Native. Now if the platform
00:46:03.040 the OS is equal to iOS then I want to
00:46:06.720 set padding and padding will basically
00:46:10.240 add a padding to the top of this view so
00:46:12.640 that the content isn't covered by the
00:46:14.319 keyboard and this is specific for iOS.
00:46:17.280 Now if it's not so if it's basically
00:46:19.920 Android we want to actually set it to
00:46:22.599 height and what it will do is it will
00:46:25.440 just adjust the height of the view to
00:46:27.200 basically do the same thing make room
00:46:28.800 for the keyboard. So this is what we
00:46:30.880 have to do on a keyboard avoiding view.
00:46:33.119 Now the next thing we want is just a
00:46:34.960 normal view. So I'll put here a
00:46:37.480 view and on this view I want to put a
00:46:41.560 text. Now this text will be the O text.
00:46:45.440 So it could have for example by default
00:46:48.440 create
00:46:49.960 account. Now I need to import this text
00:46:52.640 over here. I'll import from React Native
00:46:55.599 as well.
00:46:57.920 and um I want to see it appearing on the
00:47:00.240 screen. Right now, we're obviously just
00:47:01.520 seeing the homepage or the login page.
00:47:03.839 Those aren't what we want. So, the way
00:47:05.599 we're going to do this is we're actually
00:47:07.359 going to come here to our layout, our
00:47:10.000 default layout. And I want to start
00:47:12.560 building this layout such that it will
00:47:14.800 scale up in our application. Right now,
00:47:17.200 it's just defining the stack, right? The
00:47:19.760 the the stack with the tabs. However,
00:47:22.560 what I can do is I can actually create
00:47:24.480 what is known as a route guard. This is
00:47:27.119 going to basically be a component that
00:47:29.760 is going to uh wrap around our layout
00:47:33.359 and it is going to determine whether or
00:47:35.520 not the user is logged in or not. And if
00:47:38.480 the user is logged in, it will show the
00:47:40.480 off it will show the tabs right with the
00:47:42.960 tab navigation and the actual screens.
00:47:45.280 But if the user is not, it will show the
00:47:47.599 O page. So to do that, I'm going to
00:47:50.000 create here the route guard. And to make
00:47:54.800 this wrapper component, I have to have
00:47:57.640 children being a prop because then I'm
00:48:00.800 going to set the type of this to be
00:48:03.240 children of type react node. React node,
00:48:07.920 sorry. And then down here, what we want
00:48:11.200 to do is we want to basically run the
00:48:13.119 logic to check if the user is off a or
00:48:15.839 not, which right now we don't have that
00:48:17.359 yet. So what I'm going to do is I'll
00:48:19.040 just create an is off variable. I'll set
00:48:22.640 it equal to false. And what we do is we
00:48:25.520 want to check okay, we'll run a use
00:48:28.160 effect to run immediately when this
00:48:30.559 component renders. And if is off is not
00:48:36.920 true, then we'll just replace the user's
00:48:41.680 current route with the off route. So
00:48:44.319 we're kind of forcing here for the
00:48:46.480 moment to actually show the off screen
00:48:49.119 and to actually replace the the route.
00:48:51.920 We can use this important hook called
00:48:55.119 the use router hook. We can import it
00:48:57.920 from expo router. Um it will give us
00:49:01.119 access to this router object. So we say
00:49:04.480 const router is equal to use router and
00:49:07.359 we use this whenever we want to redirect
00:49:09.200 to different parts of the of the app and
00:49:11.680 so on. In our case over here, we
00:49:13.280 basically just want to replace the
00:49:14.640 user's current state to be on the um O
00:49:19.119 route. So we'll say dash off. And you'll
00:49:22.480 see that now if I return here, which in
00:49:25.760 this case since this is just a wrapper
00:49:27.680 component, I just want to return the
00:49:29.880 children, right? I don't want to return
00:49:31.760 any UI. This is literally just meant to
00:49:34.559 check for the O state. And down here I
00:49:38.720 wrap the whole thing with this route
00:49:41.280 guard. So let's wrap the stack with this
00:49:43.920 route guard. You'll see that now it
00:49:45.920 automatically redirects us to the off
00:49:48.079 page. So it shows here the create
00:49:49.839 account which is what we have here on
00:49:51.920 our off page. We'll keep it like that
00:49:54.000 for a second. We'll build this this page
00:49:56.400 first. Um and then we'll we'll go ahead
00:49:58.960 and actually make the the off stuff
00:50:01.680 work. But for now, let's do this. What
00:50:04.319 we want in this page is we want there to
00:50:06.800 be um a text input that is going to be
00:50:10.720 for the email, a text input that is
00:50:12.720 going to be for the password, and then a
00:50:14.400 button to sign in or sign up. Now,
00:50:16.559 because the user will need to sign in
00:50:18.800 and sign up with the same kind of
00:50:20.640 information, we're going to keep this
00:50:21.839 simple in the sense that the user only
00:50:23.599 needs their email and a password to sign
00:50:25.440 up and an email and a password to sign
00:50:27.440 in. We're going to reuse the inputs for
00:50:29.520 both scenarios. So below the text over
00:50:31.839 here, I want to create an input for the
00:50:33.680 email. And the way you do this is with
00:50:35.440 the text input component from React
00:50:38.240 Native. If you've worked with anything
00:50:40.559 uh like HTML or JSX in the past, you
00:50:43.359 know that this is very similar to the
00:50:44.800 input um tag that you can use. Now for
00:50:47.440 the t text input, we're going to pass a
00:50:49.680 label. So the label is going to be
00:50:53.079 email. Then we want to basically set the
00:50:56.319 email to not be able to be capitalized.
00:50:58.400 And we can do this with auto capitalize
00:51:01.280 equal to none because if you've ever
00:51:03.040 worked with anything on your phone
00:51:04.480 before, you've probably noticed that
00:51:05.760 when you start typing it auto capitalize
00:51:08.319 the first letter. So you don't want to
00:51:10.240 do that. You want to keep it the way it
00:51:12.800 is because emails usually don't start
00:51:14.400 with a capital letter. Now the next
00:51:16.480 thing is I want to keep the keyboard
00:51:19.599 uh type. So this is a important thing
00:51:22.000 that you want to put because inputs on
00:51:24.480 your phone change depending on what
00:51:26.240 you're trying to do with it. And uh this
00:51:28.240 prop will determine the type of keyboard
00:51:30.079 layout that will be displayed for the
00:51:31.599 user. So if it's an email, it probably
00:51:34.000 should show the at symbol uh appearing
00:51:36.480 pretty big, right? So that the user can
00:51:38.559 actually use it. Maybe give some
00:51:40.079 recommendations like at Gmail and at um
00:51:43.839 I don't know outlook and so on. So the
00:51:46.319 way we do this is by setting the type to
00:51:48.640 email address. Then we can for now pass
00:51:52.400 a placeholder that will just say
00:51:55.040 something like
00:51:58.200 example@gmail.com. And you should see
00:51:59.680 that now the input appears over here and
00:52:01.839 I can start typing on it. Now obviously
00:52:04.400 the styling we're not doing it yet.
00:52:05.839 We're going to do when we're done with
00:52:06.960 the component. Uh but one thing I want
00:52:09.119 to mention is that some of the styling
00:52:10.800 we're going to have is going to be
00:52:12.079 pretty much automatic. And the reason
00:52:13.680 for that is because we're going to be
00:52:15.280 using React Native paper, which is a
00:52:18.160 really good design library for React
00:52:20.319 Native. It's used everywhere and I
00:52:22.400 highly recommend for making your styles
00:52:24.559 very easily. So, we're going to come
00:52:26.160 over here. We're going to run npx expo
00:52:28.800 install. Uh, I just pressed up and I'll
00:52:31.119 just change this. We're going to install
00:52:33.119 React Native paper. And now when that's
00:52:38.800 done installing in start instead of
00:52:40.880 actually importing some of these UI
00:52:42.880 inputs from React Native, we're actually
00:52:45.200 going to import them from React Native
00:52:48.079 paper. More specifically, I want to
00:52:50.200 import from React Native Paper. And what
00:52:55.200 I want to import is the text component
00:52:58.640 and the text input component. So I'll
00:53:01.440 actually delete these two over here. And
00:53:04.160 we're going to save it. And you'll see
00:53:06.079 that now the input already automatically
00:53:08.960 changed um the way it looks and it looks
00:53:12.160 a little bit better, right? We're
00:53:13.520 obviously going to still style it, but
00:53:14.960 it looks already a little bit better.
00:53:16.400 Also, one of the cool things that the
00:53:18.079 new text input provides, the one from
00:53:20.240 React Native Paper, is this mode uh
00:53:23.520 prop, which basically has the purpose of
00:53:26.319 defining the visual style of the input
00:53:28.480 field. So, like if we set it to
00:53:30.720 outlined, which is what we want,
00:53:33.839 uh, outlined, you'll see that
00:53:35.839 automatically the input turns into this
00:53:38.880 really cool looking outlined input. Now,
00:53:41.200 we're pretty much done with, uh, some of
00:53:42.880 the initial props. We're going to copy
00:53:44.480 this. We're going to paste it again, and
00:53:46.400 we're going to make one for the
00:53:48.200 password, and we'll keep all the other
00:53:50.319 ones the same. Uh, but we're not going
00:53:52.079 to put a placeholder. Uh maybe we can
00:53:54.559 just put like your
00:53:57.480 password or something like that. Uh or
00:54:00.800 actually we don't need placeholders to
00:54:02.640 be honest. Per passwords is very
00:54:04.440 self-explanatory. And you can see that
00:54:06.160 the UI already has this cool animation
00:54:07.839 as well which is really cool from React
00:54:09.359 Native paper. Now the last UI thing we
00:54:12.240 want to do is we want to add a button
00:54:14.000 down here. So we're going to add this
00:54:16.400 button which is also from React Native
00:54:18.319 Paper and we'll just say sign up. And
00:54:22.960 the button will look like this. But we
00:54:25.119 can actually give a mode to it similar
00:54:26.960 to how we did with the text input. And I
00:54:29.119 want to put the
00:54:31.000 contained mode. And then it will get
00:54:33.200 actually filled with the color purple.
00:54:35.359 Now we don't want this to be just the
00:54:37.359 signup page. We want it to be also the
00:54:40.160 sign-in page. And we want to switch it
00:54:42.480 by through a button down here at the
00:54:44.079 bottom. So we're going to copy this
00:54:45.599 button and we're actually going to
00:54:46.720 render another one down here. It's not
00:54:49.200 going to be mode contained. We're
00:54:50.720 actually going to make it mode text. And
00:54:52.720 this will make it into just the normal
00:54:54.240 text. And what I want to do is I want to
00:54:56.640 basically say, do you already have an
00:55:00.440 account? Because if you do, click here
00:55:04.240 to sign
00:55:06.200 in. And we want to click on this and
00:55:08.800 then switch the screen to actually be
00:55:11.280 the signin page. Now, to do that, I need
00:55:13.520 to keep track of if the user is trying
00:55:15.040 to sign in or sign up. So I'm going to
00:55:16.880 create here a state that is going to be
00:55:19.520 called is sign up and we're going to
00:55:23.040 make a function called set is sign
00:55:26.599 up and we're going to set this equal to
00:55:29.040 use state. And what this will do is it
00:55:31.280 is going to keep track of whether or not
00:55:33.520 the user wants to sign in or not. This
00:55:35.680 is going to be a boolean. So, I'm going
00:55:37.520 to set this to boolean and we're going
00:55:40.720 to start it at uh true actually because
00:55:43.760 we're going to assume actually let's
00:55:45.280 start it as false because I'm I'm
00:55:47.200 thinking about it. It's better for us to
00:55:49.920 uh do this for users who are coming
00:55:51.599 back. Right? So, this would just let us
00:55:54.240 know is the user trying to sign up or
00:55:55.920 not. Now, this changes everything
00:55:58.839 because if the user is not trying to
00:56:03.200 sign up, it means they're trying to sign
00:56:04.559 in. meaning that starting already from
00:56:06.720 here we need to change this um text
00:56:10.000 instead of saying create account if is
00:56:12.799 sign up we'll do that so we'll we'll
00:56:15.839 show the create account but if the user
00:56:18.079 is trying to sign in we'll say something
00:56:19.760 like welcome back so this is what it
00:56:23.119 does right if this is true it will say
00:56:25.599 create account if this is false it will
00:56:27.440 say welcome back now same same logic
00:56:30.079 with the button down here right instead
00:56:33.200 of sign up we're going to say sign up if
00:56:37.599 the sign up is true but sign
00:56:40.839 in if it's false. And finally down here
00:56:45.119 we're going to do the same thing uh but
00:56:47.359 it's going to be a little bit bigger.
00:56:48.880 We're going to say if sign up is true
00:56:51.680 then we'll show this text. But if it's
00:56:54.559 false, then we're going to show don't
00:56:58.559 have an account. Question mark sign up.
00:57:03.599 And this is what shows up now. Now, how
00:57:06.400 do we switch between the different
00:57:07.839 modes? Well, I'm going to create here
00:57:11.319 a function called handle switch mode.
00:57:17.400 And I just realized I'm using arrow
00:57:20.000 notation here, but you can use either
00:57:21.599 notation. We've been using normal
00:57:23.200 function notation, but this is the same
00:57:24.799 thing. Now on this switch mode function
00:57:27.200 over here, all I'm doing is I'm setting
00:57:30.160 the is sign up equal to the opposite of
00:57:34.880 what its current value is. And I get its
00:57:37.280 current value by accessing the argument
00:57:40.319 of this function and setting it equal to
00:57:42.160 the opposite of it because if it's true,
00:57:44.799 it will become false. And if it's false,
00:57:46.480 it will become true. Now, I want to call
00:57:49.040 this function when the button down here
00:57:52.160 at the bottom is called. So, you might
00:57:54.400 expect me to put here an on click, but
00:57:56.640 this isn't a website. So, there's no on
00:57:58.799 click on buttons. Instead, it is called
00:58:01.359 on press. But there's also a bunch of
00:58:03.599 other events that you might want to keep
00:58:05.119 in mind um if you ever want to do a
00:58:07.119 little bit different. Now, on this on
00:58:08.720 press, I'll call the handle switch mode.
00:58:10.799 And you'll see that now if I click on
00:58:12.400 this, it switches between signin and
00:58:14.720 sign up. and it will keep switching
00:58:16.599 indefinitely. Perfect. Now, I think we
00:58:19.520 can actually make the styling of this
00:58:21.280 look a little bit better, like centering
00:58:22.960 stuff and just overall making it look
00:58:24.720 better. So, what I want to do is I want
00:58:26.720 to do what we did in the beginning of
00:58:29.280 this course, which is creating a style
00:58:31.839 sheet for this page. So, down here at
00:58:34.319 the bottom, I'm going to create styles.
00:58:37.680 And I'm going to set it equal to style
00:58:40.440 sheet dot create.
00:58:44.799 And then I need to actually import this.
00:58:47.040 Did I import it? No, I didn't. So I'll
00:58:49.280 import from um React Native
00:58:53.319 stylesheet. And I'll say create and I'll
00:58:57.280 pass an object. Now the first thing I
00:58:59.119 want to pass is a container that we're
00:59:00.960 going to have for this page. It's going
00:59:02.640 to encompass the whole p the whole
00:59:04.240 screen. So the styling for this
00:59:06.480 container is going to be flex is equal
00:59:08.640 to one and a background
00:59:11.160 color equal to and I want to put this
00:59:14.160 color over here. It's going to be kind
00:59:15.839 of like matching the style of what we
00:59:18.079 have for um the the buttons and the
00:59:20.960 inputs. It's going to be a hexodimal F5
00:59:25.040 F5 F5. Now to apply this, we're going to
00:59:28.960 come here to our view. And on this top
00:59:31.520 one over here, I'm going to set the
00:59:32.880 style equal to the
00:59:36.599 styles.container. And I'm going to save
00:59:38.319 this. And you might have not already
00:59:40.880 noticed the difference, but let's apply
00:59:43.280 also a style for this view over here.
00:59:45.760 I'm going to call this
00:59:47.720 content. And on the styles over here,
00:59:50.480 let's double this and create a style for
00:59:52.799 the content. Now for this one, we're
00:59:55.280 going to keep flex is equal to one as
00:59:56.880 well. But we're going to put um padding.
01:00:00.799 So I'm going to put a padding of
01:00:02.680 16. When I save this, you see
01:00:04.799 immediately everything gets a little bit
01:00:06.880 um it does it's not actually stretched
01:00:08.640 out. And then I also want to justify the
01:00:11.040 content to be center so that we have
01:00:14.720 everything in the center of the screen.
01:00:16.640 Now obviously there's padding issues
01:00:18.319 still. So we're going to address that. I
01:00:20.480 want to first deal with this title over
01:00:22.079 here. So, I'm going to create the
01:00:25.480 title object. Uh, so we'll come here to
01:00:29.280 the text and I'm just going to say style
01:00:32.079 is equal to
01:00:34.839 styles.title. Now, it looks weird cuz I
01:00:37.440 just copied the styles from the content.
01:00:39.200 But for the the title, what I want to do
01:00:41.599 is I want to text align it to the
01:00:44.960 center. So, it's on the center of this
01:00:47.040 input. And then I want to set a margin
01:00:51.000 bottom of 24 so it doesn't look too like
01:00:55.119 too close to the inputs. Now the next
01:00:57.839 style will be the input. And I'll do the
01:01:00.319 input and the button at the same time so
01:01:02.160 we're not constantly scrolling up and
01:01:03.760 down. I'll do the input over here and
01:01:06.559 the button. Now, for the input, what we
01:01:09.599 want to do is we just want to have a
01:01:10.799 margin bottom from the bottom of the of
01:01:12.880 each other. So, it's not too close to
01:01:14.640 the button and not too close to each
01:01:16.480 other as well. So, I'll keep here the
01:01:18.480 margin bottom, but I'll make it a little
01:01:20.480 bit smaller. I'm going to make it 16.
01:01:22.720 And you'll see how that looks. Now, for
01:01:24.559 the bottom, for the button, I actually
01:01:26.640 want to have a margin
01:01:28.119 top. And the margin top is going to be
01:01:30.400 an eight. And that should be good. We're
01:01:33.280 going to come here to the inputs. We're
01:01:34.960 going to copy this.
01:01:37.040 We're going to apply them to the both
01:01:40.440 inputs. And I'll copy for this as well
01:01:42.880 and put it here. You see this is how it
01:01:44.880 changes. It just creates more space. And
01:01:47.119 then for the buttons, we're going to
01:01:49.839 apply here
01:01:51.400 styles. Perfect. Now, I'm not going to
01:01:53.920 apply it to the other button because
01:01:55.520 this one actually will have a different
01:01:57.359 styling. It's going to be called the
01:02:00.920 switch mode button.
01:02:04.240 Uh, so we'll create it down
01:02:06.920 here. And with the switch mode button,
01:02:10.079 what I want to do is I just want to set
01:02:12.400 a margin top of 16. So there's actually
01:02:15.119 more space, double the space. Perfect.
01:02:18.400 And I want to apply actually I look I
01:02:20.799 just noticed this looks a little bit
01:02:22.319 plain. So let's put a variant to the
01:02:25.200 text with this text component from app
01:02:27.920 from React Native paper. We can pass a
01:02:30.640 variant here. And a variant that we want
01:02:32.720 to apply is the
01:02:34.520 headline variant uh to make it a little
01:02:37.520 bit bigger. But I'm also going to set it
01:02:39.040 to medium. And I wrote this wrong. I
01:02:43.040 shouldn't have put the A here. And it
01:02:44.880 should look a little bit bigger.
01:02:47.160 Perfect. Now we're ready to actually
01:02:50.240 implement the logic behind allowing the
01:02:52.480 user to authenticate. So the way we're
01:02:54.559 going to do this is we're going to
01:02:56.480 create here a function that is going to
01:02:59.119 be called handle
01:03:02.280 o. And this function will handle both
01:03:05.040 creating and signing into an account.
01:03:08.000 And we're going to call it whenever the
01:03:10.079 user presses the signin button. So we'll
01:03:12.720 go to this button and we're going to do
01:03:14.559 an on press and we're going to pass the
01:03:17.039 handle off. Now on this function we need
01:03:20.319 to make it a sync because this is going
01:03:23.039 to be calling our apprite API to
01:03:26.079 actually sign in or sign up the user.
01:03:28.480 Now to do that we need to keep track of
01:03:31.440 what the user is typing on the inputs.
01:03:34.720 So I need to create a state that is
01:03:37.280 going to keep track of that value for
01:03:39.440 the email and one for the password. So
01:03:41.920 up here I'm going to create an email uh
01:03:45.599 state with a set email function and it's
01:03:49.359 going to be equal to use state uh string
01:03:53.039 and it's going to be an empty string at
01:03:55.119 first but I'm also going to create a
01:03:57.640 password over here and a set
01:04:01.720 password. Perfect. Now what I want to do
01:04:04.799 is when the user is typing on this
01:04:07.760 inputs I want to change the values of
01:04:09.680 those states. So the way we do this with
01:04:11.920 a text input is we pass in on change
01:04:16.200 text and we call the set email function.
01:04:21.520 So we just say set email. We don't have
01:04:24.720 even have to do any handling because it
01:04:27.200 does it automatically for us because
01:04:29.119 this is an on onchange text. It knows to
01:04:31.839 set the value through here. Now we can
01:04:34.319 do the exact same thing with the
01:04:36.480 password. So I'm going to say set
01:04:39.079 password and it will keep track of that
01:04:41.440 as well. So the first check that I need
01:04:44.079 to make on this function is do we have
01:04:46.079 any email or password because if we
01:04:48.000 don't have one of those then we don't
01:04:50.640 want to actually allow the user to try
01:04:52.160 to sign in or sign up. So we come over
01:04:54.160 here and we say if not email or not
01:04:58.920 password then there is an issue. Now the
01:05:02.480 way we're going to keep track of issues
01:05:03.920 is through a state which is going to be
01:05:06.559 called an error state. So we're going to
01:05:08.640 say const error is equal to set error.
01:05:13.280 And I wrote error wrong. Uh and it's
01:05:15.920 going to be a use state which will be a
01:05:18.400 string or null possibly. If there's no
01:05:21.200 errors it will be null. Now in this
01:05:24.240 function over here, I'm going to set the
01:05:26.240 error equal to um probably something
01:05:28.880 like please fill in all fields. And if
01:05:33.920 there is an error, I want to display it
01:05:36.319 on the screen for the user. So let's go
01:05:39.039 down here and in between the button for
01:05:41.440 submitting and the button for and the
01:05:43.839 inputs, we're going to actually check to
01:05:45.680 see if there's any errors. And if there
01:05:47.520 is an error, I want to
01:05:50.599 show the text like I use text and I'll
01:05:54.559 show the error over here. So in case I
01:05:58.000 just try signing in right now, you'll
01:06:00.000 see it will show up. Please fill in all
01:06:02.160 fields because that's the error that we
01:06:04.480 set over here. Also, we want to return
01:06:06.799 because we're going to put some logic
01:06:08.000 down here that we wouldn't want to
01:06:09.839 execute if this is the case. Also, let's
01:06:12.640 make this error look a little bit
01:06:13.920 better. A way we can do this is by
01:06:15.680 setting some styling which can we can
01:06:18.640 actually apply through the colors that
01:06:21.440 we can get from react native paper. So
01:06:23.760 what I mean by that is if I come over
01:06:25.520 here and I say style and I apply a color
01:06:29.359 right I can say red and this will make
01:06:32.000 it red. But I think this red doesn't
01:06:33.599 look that good. What I can do instead is
01:06:36.079 I can use this function from react or
01:06:38.480 this hook from react native paper called
01:06:40.480 use theme. And what this hook does is it
01:06:43.200 gives us access to their theme including
01:06:45.280 their colors. So I'll say theme is equal
01:06:48.160 to use theme and they have theme colors
01:06:51.440 for like anything including um a color
01:06:54.960 for a situation in which there's an
01:06:57.200 error. So I can say theme colors and
01:07:00.160 then I can access uh for example error
01:07:03.039 which is the actual color that I wanted
01:07:05.119 to try. And you'll see that it looks a
01:07:06.880 lot more in line with the rest of the
01:07:08.880 theme for React Native paper. Now let's
01:07:11.359 do some minor validation because most of
01:07:13.839 the validation we can actually do on the
01:07:15.359 back end. In our case over here we just
01:07:17.280 want to check is the
01:07:19.559 password.length less than six because if
01:07:22.000 there is if it is then I want to set the
01:07:26.319 error to be
01:07:30.359 passwords must be at least six
01:07:36.760 characters
01:07:38.359 long. And then you'll see that if I
01:07:40.799 return here as well, um, if there's
01:07:44.319 nothing in signed up, it will still give
01:07:46.559 us this error. But if I put here an
01:07:48.319 email,
01:07:50.079 um, and then I put a really small
01:07:53.440 password. Now, this is the error message
01:07:55.760 that I get because we don't want people
01:07:57.039 to put very small passwords cuz it's
01:07:58.640 unsafe. Perfect. Now we're going to come
01:08:01.039 over here and we're going to set the
01:08:04.559 error to be equal to null just in case
01:08:07.359 error was set to something else right uh
01:08:09.599 like in this situation over here we want
01:08:11.359 to set it to null so that we restart and
01:08:13.839 we actually do the authentication. Now,
01:08:16.960 in order to do this, we're actually
01:08:19.279 going to separate our logic for
01:08:21.600 authenticating, for signing in and
01:08:23.279 signing up, and also keeping track of
01:08:25.040 whether the user signed up or not uh
01:08:27.359 through a hook that we're going to
01:08:29.040 create, which is going to utilize the
01:08:32.719 the context API from um React. So, the
01:08:36.238 way we're going to do this is we're
01:08:37.759 going to create uh I'll just create it
01:08:39.520 here on our lib. Uh it doesn't really
01:08:41.359 matter. I'm going to create it. I'm
01:08:42.560 going to create the o context.ts.
01:08:46.198 tsx file. Now on this file I want to
01:08:49.920 make two things. The first thing I want
01:08:51.759 to make is a provider that we're going
01:08:54.479 to be using for distributing information
01:08:57.120 about authentication on our project. So
01:08:59.520 I'm going to say export function o
01:09:04.279 provider and I'll create this provider.
01:09:06.960 It's a wrapper component. So we have to
01:09:08.880 do something very similar to what we did
01:09:10.560 with the route guard where we get the
01:09:14.279 children and the type will be
01:09:17.560 children with a
01:09:20.520 react
01:09:22.759 node. Now I obviously forgot to close
01:09:25.839 this but now it works. Um and then we'll
01:09:29.880 return something here which I won't uh
01:09:33.600 return for now. But the second thing I
01:09:35.520 want to export from this file is I want
01:09:38.880 to
01:09:39.560 export a function or hook called the use
01:09:43.600 off hook that it is going to use the
01:09:47.279 context that is being created on this O
01:09:49.920 provider and actually return to us
01:09:52.560 everywhere that we needed to. So we
01:09:54.320 don't have to constantly be importing
01:09:56.000 the O context that we're going to create
01:09:58.640 um in every single file that we do. Um,
01:10:00.960 so this is a nifty way for us to
01:10:02.560 actually make this work in an easy way.
01:10:05.040 So what we want to do is on this O
01:10:07.440 provider, we want to create um a
01:10:09.840 context. So I'll actually make it
01:10:11.280 outside of it so we have access to it
01:10:12.880 here as well. We're going to create the
01:10:15.640 O context. Now this O context we're
01:10:19.520 going to be using create context from
01:10:21.760 React and we want to set it to undefined
01:10:25.080 initially but we want to define the type
01:10:28.400 of this O context since we're using
01:10:30.280 TypeScript. So I'll define type O
01:10:34.280 context type or I'll just yeah context
01:10:38.440 type. Now in this we want to what what
01:10:42.880 information do we want to keep track of
01:10:45.199 in this context? Well, first of all, we
01:10:48.239 want to distribute information about the
01:10:50.320 user who's logged in, right? Because
01:10:52.159 everywhere in our in our app, we want to
01:10:54.400 keep track of that information. So,
01:10:56.400 we're going to pass in this user
01:11:00.040 information. Now, we don't have a type
01:11:02.159 for user at, but what we can use is um
01:11:06.400 in apprite you can actually import the
01:11:10.239 user type from apprite. So you can
01:11:13.280 import models from React Native app,
01:11:16.000 right? And the the type for a user is
01:11:18.560 going to be models do
01:11:21.239 user and we pass here as well
01:11:25.640 models.preferences and potentially the
01:11:28.000 user can also be null if they're not
01:11:29.760 authenticated. So this is the user type.
01:11:32.560 Now the second thing I want to keep
01:11:34.159 track of is just the functions that
01:11:36.080 we're going to be using. Now, we're
01:11:37.360 going to be changing this O context uh
01:11:39.440 as we add more stuff, but for now, we
01:11:41.199 just want to keep track of the user and
01:11:43.280 if they like a function for them to sign
01:11:45.960 up, which has a type of function which
01:11:50.400 returns a
01:11:51.960 promise, which is a void. And I'm also
01:11:55.120 going to make a signin type. So, I'll
01:11:57.679 say sign in. Now, this function um is
01:12:01.440 going to require us to pass in the email
01:12:03.600 and the password, right? to sign up, we
01:12:05.360 need to pass in that information and to
01:12:06.719 sign in as well. So when we're defining
01:12:09.280 the the type of it, I'm going to set the
01:12:12.199 email to be one of the things we need to
01:12:14.719 get from it and the password as
01:12:17.560 well. Now I'll do the exact same thing
01:12:20.000 on the
01:12:21.000 signin and I'll pass this off context
01:12:24.000 type as a type to this create context.
01:12:28.239 Now initially it's also undefined. So
01:12:30.320 that's why I'm going to also say it can
01:12:32.960 be undefined. Now we created this O
01:12:36.239 context and what we want to do is we
01:12:38.400 want to use it to make this O provider
01:12:41.520 return a provider that is going to wrap
01:12:43.840 the children that is that we wrap this
01:12:46.159 component around. So I'm going to return
01:12:48.800 here the O context dot provider to turn
01:12:53.360 this into a provider. And I'll do the
01:12:55.679 same thing here. And I need to pass a
01:12:58.239 value to it. More specifically, I need
01:13:00.640 to pass an object that is going to
01:13:02.080 include a user, a signup, and a sign in.
01:13:05.280 So, I'll make here user, sign up, and
01:13:09.840 sign in. Now, obviously, we haven't made
01:13:11.840 those things yet, but we are going to
01:13:13.280 make them in a second. Now, the last
01:13:15.280 thing I need is I need to basically
01:13:17.679 render the children that we get from the
01:13:20.000 prop directly inside of this, or else
01:13:22.960 this wouldn't be a wrapper component.
01:13:25.040 Perfect. Now we can create the
01:13:28.560 information for the user for the signup
01:13:30.320 and for the signin. Now let's start with
01:13:32.159 the sign up right. So we're going to
01:13:35.199 make a function here called sign up. And
01:13:37.600 like we defined the type over here it is
01:13:39.920 going to take in as an argument um an
01:13:43.440 email and a password. And it's also
01:13:45.920 going to be an async function because we
01:13:48.880 need to call it on this handle off
01:13:51.520 function that we basically left behind.
01:13:53.360 But we're going to get back to it. We
01:13:54.560 just need to make this first. Now on the
01:13:57.120 signup function, I want to try to
01:14:00.480 execute the sign up operation on
01:14:03.600 app.right, but if there's any errors, we
01:14:06.560 want to catch them and we'll handle what
01:14:09.360 happens down here. Now on the try, I
01:14:12.480 want to try to
01:14:15.080 await and this is where I use the
01:14:17.840 account that we created on the apprite
01:14:20.560 file, right? on this account over here
01:14:23.199 because with this account I can
01:14:24.560 basically say
01:14:26.360 account.create and this will create a
01:14:28.719 user in our project. Now to create a
01:14:31.600 user we have to pass three things. We
01:14:33.199 have to pass an ID, an email and a
01:14:35.360 password. And we already have the email
01:14:37.040 and the password. So we can do it like
01:14:39.440 this. But we don't have the ID and
01:14:41.520 actually the ID is the thing that we
01:14:42.719 pass first. Now the ID we can generate
01:14:45.760 through this ID um object that we have
01:14:49.280 here from apprite and we can call the
01:14:52.000 unique function and this will generate a
01:14:54.000 unique ID for our user
01:14:56.120 automatically. Now after this I also
01:14:59.199 want to sign in the user after they
01:15:01.679 create their account automatically just
01:15:03.440 sign them in. So what I'm going to do is
01:15:06.000 I'm going to say await
01:15:08.760 signin. Uh, and obviously we don't have
01:15:10.960 the function yet, but we'll just
01:15:12.560 duplicate this for now. Um, and we'll
01:15:16.320 call this sign
01:15:17.960 in. But we're going to call the sign-in
01:15:20.320 function with the same email and
01:15:22.080 password so that when you sign up, you
01:15:24.239 actually sign in as well. Now, what we
01:15:26.800 do when we catch any errors here is we
01:15:29.440 want to return that error message or
01:15:31.840 return some error message. So, I'm
01:15:33.840 actually going to change the type of
01:15:35.120 this to potentially return either a
01:15:39.640 string or
01:15:42.159 uh return null. And this means that if
01:15:45.760 you return a string, there was an error
01:15:47.440 in this process. And if you return null,
01:15:49.120 it means there was no errors. So, in
01:15:51.840 this case over here, we're going to
01:15:53.520 return null. Now, if there's an issue,
01:15:56.880 then we want to check to see if the
01:15:59.120 error is of type. it's an instance of
01:16:03.360 the generic error type uh that we have
01:16:06.159 in JavaScript. And if it is, then I want
01:16:08.880 to return
01:16:11.480 um the error message because then I'll
01:16:16.239 return the string with the actual error
01:16:17.840 message. If not, then we'll just return
01:16:21.120 a generic error message that will say an
01:16:24.719 error
01:16:26.920 occurred during signup.
01:16:30.800 Perfect. Now, we'll copy this exact
01:16:33.440 logic and we're just going to paste it
01:16:34.800 here on the signin. We're just not going
01:16:36.560 to call the sign in again because that
01:16:37.920 would make it into an infinite loop. Uh,
01:16:41.040 but what we want to do is instead of the
01:16:44.120 account.create for you to sign into an
01:16:46.320 account, you actually do
01:16:49.000 account.create email password session.
01:16:52.480 And this will create a session using the
01:16:54.960 user's email and password, right? Just
01:16:57.120 like the name implies. So, we can just
01:16:58.880 use the email password from the
01:17:00.080 arguments and that should be good to go
01:17:02.159 as well. Now, we'll just change this to
01:17:04.320 sign in in case there's an error uh
01:17:07.280 because it's not signup. Now, we we're
01:17:10.640 now good to go for the sign in and sign
01:17:12.320 up. I'm actually going to comment out
01:17:14.400 the user for now just because uh we
01:17:18.560 don't have a point of writing the logic
01:17:21.120 for getting the user info yet since we
01:17:23.360 haven't even implemented the sign in and
01:17:25.360 signup. So for now we'll just take that
01:17:27.600 out and let's uh now test this on our
01:17:31.199 actual screen. Now to have this
01:17:34.560 information from this provider be
01:17:36.560 distributed on every single screen on
01:17:38.640 our app, we have to wrap this O provider
01:17:42.640 around our layout. So we'll go here to
01:17:45.120 our layouts and um on the top over here
01:17:48.239 even above the route guard we want to
01:17:50.400 wrap it with the O
01:17:52.440 provider so that everything below it
01:17:55.280 will have access to the information
01:17:57.040 inside of it. Now how are people going
01:17:58.960 to have access to it? Like how are we
01:18:00.960 going to get the uh sign in or the
01:18:03.440 signup functions for example on this o
01:18:06.080 component? Well we could use the use
01:18:07.920 context hook every single time. However,
01:18:10.239 this use o function over here or hook is
01:18:14.000 actually going to make it a lot easier
01:18:15.199 for us because we can this we can get
01:18:17.760 the context from it. So I'm going to say
01:18:20.000 use context and I'm just going to use
01:18:22.239 the o context inside of here. So we get
01:18:24.719 back everything from this provider and
01:18:27.199 then if context is equal to undefined.
01:18:31.600 So if for some reason we are calling
01:18:34.320 this use off and we're not in the inside
01:18:37.280 the O provider then we do have to throw
01:18:40.640 an error that says use off must be
01:18:45.920 inside of the O provider. I mean that's
01:18:49.600 not going to happen cuz we're going to
01:18:50.960 make sure it won't. Um but in that case
01:18:53.440 then we throw an error. If not we just
01:18:56.000 return the context. And that means that
01:18:57.920 now for example in the O component over
01:19:00.640 here we can get the sign in and sign out
01:19:04.000 uh the sign in and sign up functions by
01:19:06.480 just calling the use O hook. So now we
01:19:11.920 get access to the sign in and sign up.
01:19:15.840 Now we can use the sign in and sign up.
01:19:18.480 So I'm going to come here to after we
01:19:21.040 set the error to null. And if you
01:19:23.679 remember, we already checked to see if
01:19:26.400 the email and password are there or if
01:19:28.400 the password is greater than six
01:19:30.400 characters. So what we can do is we can
01:19:33.159 try to um sign up. Actually, since we're
01:19:38.400 handling this, we're returning
01:19:39.679 everything automatically. So I don't
01:19:40.800 even need to worry about that. I'm just
01:19:42.239 going to actually say if sign up of if
01:19:46.239 is sign up is equal to true, then I will
01:19:50.080 call the signup function. If not, I want
01:19:54.320 to call the sign-in function. So, I'm
01:19:57.199 going to
01:19:58.600 await sign up and I'll pass the email
01:20:02.960 and password to the function. And in
01:20:05.840 this case, I'm going to do the exact
01:20:08.880 same thing but for sign in. But remember
01:20:11.840 that these functions, they return uh
01:20:14.560 potentially an error, right? So, I'm
01:20:18.080 going to get the error back. And if
01:20:21.520 there's an
01:20:22.600 error, so
01:20:24.679 if there is an error, I want to set the
01:20:29.199 error equal to that error and then
01:20:32.560 return. Now on the signin, I want to do
01:20:36.640 the exact same thing, but if the sign-in
01:20:40.159 is successful, I want to use the use
01:20:42.800 router hook. So actually, I need to
01:20:45.679 import the use router hook. And I'm
01:20:48.880 going to create a router over here like
01:20:52.080 we've done in the past. And with this I
01:20:55.360 can actually redirect the user to a
01:20:58.000 different page like the homepage for
01:20:59.760 example. So I can say router
01:21:03.320 dotreplace and then bring them to
01:21:07.480 the homepage.
01:21:10.000 Now, we can test this, but I think the
01:21:12.239 best way for us to test it for now is to
01:21:14.320 actually go to the um to the app right
01:21:19.199 off O page over here. And as users are
01:21:21.760 being created, they're going to appear
01:21:23.679 on our screen. So, I'm going to come
01:21:26.800 back here to the code and I want to
01:21:32.080 create a new account. I'm going to use
01:21:34.320 an email that I have for testing for
01:21:36.800 videos. It's called Pedrotech Rumés. Uh,
01:21:39.440 and I'm going to create an account with
01:21:40.960 it. So, let's put an email and I'll put
01:21:42.960 a password. It's going to be password
01:21:45.920 one, two, three. I just realized that
01:21:47.600 this shouldn't be appearing, right? Cuz
01:21:49.679 this is a password field. So, one thing
01:21:51.600 we could do is uh on this keyboard type
01:21:55.360 over here, we actually don't want to
01:21:57.920 keep this as an email. We actually just
01:22:00.320 copy and paste it from the above one. We
01:22:02.400 want to change it. But also, we want to
01:22:04.560 make it such that this is a secure text
01:22:06.719 entry. We do that by literally setting
01:22:08.960 secure text entry and then it will kind
01:22:10.960 of remove the text, right? So people
01:22:12.960 don't see it. Now I'm going to click on
01:22:15.679 uh sign up and if everything is
01:22:18.600 successful then we should see on the
01:22:22.800 account over here the user
01:22:25.400 appearing. Now you see immediately the
01:22:27.920 user appeared on the screen. Now there
01:22:30.159 was an issue probably with the signing
01:22:34.239 in. Um, I can try signing in with the
01:22:36.719 same account. Uh, it says creating of a
01:22:39.360 session is prohibited. Which one
01:22:40.719 session? Oh, yeah. We actually have the
01:22:43.040 section active. I forgot. So, everything
01:22:45.440 worked, but we since we're just
01:22:48.600 forcefully setting the O um page, it's
01:22:52.800 not actually redirecting to the
01:22:54.080 homepage. We still have to implement
01:22:55.600 that. So, we're going to do that. So,
01:22:57.440 let's think about exactly what we want.
01:22:59.600 We want in this layout.tsx tsx file over
01:23:02.400 here to actually check to see if the
01:23:05.199 user is authenticated or not uh using
01:23:08.320 apprite. So in order to do that we want
01:23:10.960 to make some changes to our o context.
01:23:14.880 So in here let's go up here. We want to
01:23:17.840 add again the user property because the
01:23:20.400 way we're going to do this is somewhere
01:23:21.840 inside of our o provider we're going to
01:23:23.440 use appite to detect if the user um
01:23:26.480 exists. And if the user exists, meaning
01:23:28.639 the user is logged in, we're going to
01:23:30.239 set this user variable equal to that.
01:23:32.480 And that's a way for us to know if the
01:23:33.760 user is logged in or not. Because if
01:23:35.280 this user object is null, then it means
01:23:37.520 they're not. And um if it's set to
01:23:39.840 something, it means that the user is
01:23:41.679 authenticated. Now, an easy way for us
01:23:43.520 to do this is we want to create a state
01:23:45.840 that is going to keep track of the user.
01:23:48.320 So, we're going to create here a const.
01:23:50.719 We'll call it user, and we'll create a
01:23:53.120 function called set user. And we'll set
01:23:55.120 this equal to use state. Now the type of
01:23:58.960 this state is going to be the same type
01:24:00.960 that we set up here, right? It's going
01:24:02.960 to be the models user and possibly null
01:24:05.280 as well. Now initially obviously since
01:24:07.600 there's no authentication, uh the user
01:24:10.239 will be null. Now the next thing we want
01:24:13.920 is we want to have some sort of function
01:24:16.560 that is going to get the user. So I'm
01:24:19.280 going to create here get user and it's
01:24:22.880 going to be an async
01:24:24.520 function that we're going to try to
01:24:28.960 check to see if there's a session for
01:24:31.520 this user. Now to do that we're going to
01:24:33.440 say const session and we can use the
01:24:36.960 account variable similar to what we did
01:24:38.560 here for creating and for signing in. We
01:24:42.080 can use
01:24:43.800 account.get and this needs to be awaited
01:24:46.239 because this returns a promise. So await
01:24:49.520 account.get and if there is a valid
01:24:51.760 session then we're going to get that
01:24:54.400 back and it's going to set that to the
01:24:55.920 session variable. So we can then set the
01:24:58.320 user equal to this session. Now if there
01:25:01.840 is any other errors so if there's a
01:25:05.120 catch right we are going to catch that
01:25:08.880 error. And to be honest all we're going
01:25:11.040 to do is we're going to set user equal
01:25:12.880 to null. We don't want to actually
01:25:15.520 display anything because it's not an
01:25:17.040 issue. It's not an error um for the user
01:25:19.280 to not be authenticated. It just means
01:25:20.639 that they they shouldn't have access to
01:25:22.639 the rest of the app. Now, we can now
01:25:25.679 call this get user function every time
01:25:29.199 the O provider renders. So, on its
01:25:31.840 initial render, we can call this. And to
01:25:34.000 do that, we're going to be using the use
01:25:36.080 effect hook. This hook, like many of you
01:25:38.800 might know, it basically will run and
01:25:41.280 execute code uh when the code when the
01:25:43.679 page first renders or when a screen
01:25:45.360 first renders. And we have to make sure
01:25:46.719 we put this empty dependency array so
01:25:48.880 that it doesn't actually infinitely uh
01:25:51.520 refresh and re reload this component. So
01:25:54.239 inside of here, we're just going to call
01:25:55.920 get user and it should now make that
01:26:00.320 assumption and and set the value of user
01:26:02.960 equal to either the session or keep it
01:26:05.040 as null. Now we can successfully pass
01:26:07.840 this user value to this uh O provider
01:26:11.600 and we now have access to that elsewhere
01:26:13.440 in our app. Where do we want to use it?
01:26:15.199 Well, we're going to use it in multiple
01:26:16.320 places in our app, but more
01:26:17.280 specifically, we want to use it in our
01:26:18.960 layout. Inside of this route go guard
01:26:21.040 over here, we want to check to see if
01:26:22.639 the user is authenticated. So, the
01:26:24.880 easiest way to do that is we're going to
01:26:26.480 actually delete this variable. We're
01:26:28.400 going to call the the use o. So, I'm
01:26:32.080 going to say equals to use
01:26:34.520 o. And in here, we're going to get back
01:26:37.440 the user.
01:26:39.679 Um, then inside of this use effect, I
01:26:43.120 want to redirect the user if to the off
01:26:47.040 page if the user object is null. But
01:26:50.800 also, I don't want to do that if the
01:26:52.400 user is already in the off page, right?
01:26:54.080 Cuz that's redundant. So a way what I
01:26:56.800 can do is I can actually detect what
01:26:58.400 screen the user is inside of at the
01:27:00.400 moment and not actually redirect them if
01:27:03.520 they are already in the off page. To do
01:27:05.440 that we we can use the use segments
01:27:08.719 hook. So segments will help us have
01:27:12.239 access to the information of where in
01:27:14.000 the app the user is. We get that through
01:27:16.480 the use segments hook similar to the use
01:27:18.480 router. And what we can do is I can
01:27:20.719 detect if the user is already in the O
01:27:23.040 page by saying const in O group is equal
01:27:28.080 to segments. And then if I get the first
01:27:30.800 element of the segments array and that's
01:27:33.120 equal to O then I know that it's in the
01:27:36.239 O page. Uh now why we need that is
01:27:39.679 because now I can detect if the user
01:27:42.800 doesn't exist meaning they're not
01:27:44.080 authenticated and the user is not in the
01:27:47.280 O page then let's redirect them to the O
01:27:51.199 screen. But if not, so else if the user
01:27:57.040 exists and the user is in the O group,
01:28:03.440 then we want to actually do the opposite
01:28:05.920 because uh the user is authenticated but
01:28:10.320 they're seeing the sign-in screen. We
01:28:11.600 don't want that to happen, right? So we
01:28:13.040 redirect them to the homepage. So those
01:28:15.040 are the only two scenarios. We don't
01:28:16.080 want to put an else here because we
01:28:17.360 don't want to redirect people for no
01:28:18.800 reason. The only two scenarios in which
01:28:20.480 we want to redirect them in this route
01:28:22.239 card is if they're not authenticated and
01:28:24.320 not in the O screen or if they are
01:28:26.719 authenticated and are in the off screen.
01:28:30.000 So I hope you guys understand this. Uh
01:28:32.400 now one thing we have to do is in this
01:28:34.239 use effect now because we're doing a lot
01:28:36.639 of like different um checks in here. we
01:28:39.199 should probably put some uh dependencies
01:28:41.679 to this dependency array because things
01:28:44.080 might change in your in your app and you
01:28:46.880 want to adapt this use effect every time
01:28:49.120 different pieces of state changes. The
01:28:51.120 first thing we want to put here is the
01:28:52.639 user if the user off change then we want
01:28:56.000 to run this use effect again. Now we
01:28:58.239 also want to change uh run this again if
01:29:00.480 the segments change and also because uh
01:29:03.920 then part of this logic will be impacted
01:29:06.800 specifically the in off group uh boolean
01:29:10.159 right so now we are pretty much done
01:29:13.280 with this part now we should also think
01:29:16.400 about the following scenario in our use
01:29:19.280 o over here there's a small leap of
01:29:22.719 second right in between getting the
01:29:25.120 actual session and in that moment even
01:29:26.960 though the user might be authenticated
01:29:28.960 just because we haven't received back
01:29:30.800 the information of whether or not a
01:29:32.560 session is active, the user will be null
01:29:35.120 because we set it to null initially. So
01:29:37.840 if the user is not in the O group and
01:29:40.000 they are user, this might trigger a
01:29:42.639 replacement, right? They might be
01:29:44.080 redirect to the O page even though it in
01:29:46.880 3 seconds we will detect that they are
01:29:48.719 actually authenticated and uh that
01:29:51.040 shouldn't have been the case. So one
01:29:52.880 thing we can do is we can actually
01:29:54.320 create a new state on our of context and
01:29:57.520 that state is going to keep track of
01:29:59.199 whether or not we are loading the
01:30:01.520 information about the user. So we're
01:30:04.000 going to actually create here a loading
01:30:06.239 or let's actually make it is loading.
01:30:09.360 It's a boolean and um I'll call it is
01:30:12.800 loading user makes more sense. And then
01:30:15.760 inside of this we want to actually
01:30:17.600 create a state for this uh boolean. So
01:30:20.400 we'll say const is loading user and
01:30:25.280 we'll create a set is loading user set
01:30:29.679 is equal to use state and it will be a
01:30:32.719 boolean that starts with false and it
01:30:35.520 will be a boolean that starts with true
01:30:38.960 because initially we'll always be making
01:30:41.760 the request to check the user. Now after
01:30:45.440 the user is done being checked right
01:30:48.880 either they
01:30:50.360 successfully found a session or the user
01:30:53.679 isn't authenticated or there's an error
01:30:55.679 or something we want to set the loading
01:30:58.159 to false because the request is done. So
01:31:00.159 a way we can do this is we can put a
01:31:02.400 finally clause here in the try catch and
01:31:04.719 this finally will run after either these
01:31:06.960 two cases. So in that scenario we just
01:31:09.120 want to set this to false because now it
01:31:11.600 is not loading anymore. And now we can
01:31:13.679 pass that value to the uh value over
01:31:17.440 here. So we can pass uh the is loading
01:31:21.440 user as a part of this. And now in here
01:31:24.560 in our layout we want to implement that
01:31:27.920 is loading user because now we only want
01:31:30.960 to redirect if the is loading user is
01:31:33.520 false because we don't want to make any
01:31:35.360 abrupt changes unless the actual
01:31:37.679 information is finished loading. So for
01:31:39.199 example, we'll put here if is loading
01:31:42.000 user is false and we'll put here the
01:31:45.040 exact same thing. Perfect. Now sometimes
01:31:48.800 when you are out or redirecting like
01:31:50.639 this, you might run into issues where
01:31:52.320 it's saying that um you're attempting to
01:31:55.199 navigate before mounting, but it's
01:31:56.880 because we're still building our app. So
01:31:58.639 that might cause some issues. What I
01:32:00.719 would do is I'll just come here, close
01:32:03.280 the app, open it again, and then um go
01:32:07.040 to the specific app that we are working
01:32:09.360 on. Um and you see that now because we
01:32:12.239 are authenticated, we're not seeing the
01:32:13.760 off page anymore. We're actually seeing
01:32:15.840 the homepage. So, let's actually do
01:32:18.880 something cool. I'm going to make a sign
01:32:21.040 out button just so we can also test
01:32:23.760 signing out before we actually start
01:32:25.520 building the the core part of the uh of
01:32:28.800 the habit tracker. So let's make that uh
01:32:31.280 I'm going to come to the O context.
01:32:32.960 That's the last thing we're going to do
01:32:34.239 here. We're going to create a function
01:32:36.719 for signing out. So I'm going to create
01:32:38.880 here sign
01:32:40.440 out. And this function it won't require
01:32:44.480 any arguments to it. And to be honest,
01:32:46.320 it will just return a promise void. So
01:32:49.199 I'm going to say
01:32:50.360 promise void. And the sign out function
01:32:54.239 is pretty self-explanatory in the sense
01:32:56.639 that we just create a sign out over
01:32:59.400 here. And it has to be
01:33:03.480 async and what we do is we literally
01:33:06.400 just await the account and we delete the
01:33:10.560 session. So we call delete session. Now
01:33:13.199 we have to specify what session we're
01:33:15.199 deleting. You can see here to log out
01:33:16.719 the user use current as the session ID
01:33:18.960 to delete. So I'll just put current over
01:33:21.520 here and it will delete the current
01:33:23.719 session. Also when that happens we want
01:33:26.960 to automatically change the value of
01:33:28.960 user to null because now the user isn't
01:33:31.120 logged in. So we'll just set that to
01:33:32.560 null. So I'll set user to
01:33:36.840 null. Now we only want to actually do
01:33:39.760 that if it's successful. So I'm going to
01:33:41.920 try over
01:33:44.679 here and I want to catch any
01:33:48.760 errors. Now I don't really care about
01:33:51.520 displaying any errors if the user fails.
01:33:54.080 So I'll just actually console log for
01:33:56.159 now. Uh the error message or actually
01:33:59.600 just the error in general if there's any
01:34:01.600 errors. Now I want to pass this sign out
01:34:04.080 as the last function here in the O
01:34:06.400 context provider and let's have access
01:34:09.120 to it on the homepage. So, I'm going to
01:34:11.360 do that by going to our homepage. We'll
01:34:14.080 go to tabs over here, and we'll go to
01:34:16.120 index.tsx. We have this basic things
01:34:18.480 that we made when we were uh in the
01:34:20.480 beginning of the tutorial. So, we're
01:34:22.080 going to actually start changing this a
01:34:23.760 bit. So, the first thing I want to do
01:34:25.679 here is I'm going to make that button
01:34:28.159 just for now. I'll just make that
01:34:29.600 button. Now, I want to get it from React
01:34:31.679 Native paper, right? And I want to say
01:34:35.960 sign out. I also want to make this
01:34:39.760 button I mean it's already mode text but
01:34:42.000 I want to specify that it's the mode
01:34:43.920 text. Now when we press this button I
01:34:47.840 want to call the sign out function. To
01:34:50.480 get that sign out function I need to
01:34:52.320 again call the use off
01:34:54.760 hook and get back here the sign out
01:34:59.239 function. Now let's see what happens
01:35:01.520 when I click on this button. Actually,
01:35:04.080 one thing I can do as well is that I can
01:35:05.440 set an icon to this and I can put log
01:35:07.760 out.
01:35:08.920 And you'll see that now it has this
01:35:11.360 little cool icon that represents logging
01:35:13.920 out. Now I'll click on this and you'll
01:35:17.040 see we are redirected to the off page
01:35:19.040 because we set the user to null and we
01:35:21.280 actually deleted the session. Now if I
01:35:23.199 put here Pedro Tech
01:35:25.480 Rumés and I put the password that I used
01:35:29.440 to sign in. Actually, let me put a a
01:35:31.760 wrong password. Let's see what what it
01:35:33.280 says. Yeah, it correctly detects that.
01:35:35.360 But if I'll I'll put the right one. Um H
01:35:38.880 interesting. It redirected me back to
01:35:40.400 the O page, which is weird. I mean, I
01:35:43.280 know I'm a so um I wonder why. So, if I
01:35:47.280 go back into the app, you'll see I
01:35:48.960 probably am already signed in. I don't
01:35:50.719 But it didn't redirect us to the
01:35:53.120 homepage automatically. So, there's an
01:35:54.960 issue here. And the issue probably is
01:35:56.960 with the um with the O context with the
01:36:02.320 sign-in functionality. Yeah. Uh with the
01:36:04.560 sign-in functionality, we want before we
01:36:07.199 actually uh return null down here, we
01:36:10.400 want to uh get the session, right? We
01:36:13.840 just created the session. Now we want to
01:36:15.600 get it. So I'm going to say await
01:36:19.480 account.get. And then from here I want
01:36:22.239 to set the user equal to the
01:36:27.960 session. So what happens now is if I
01:36:30.560 sign out and I come over here and I put
01:36:32.639 pedro tech
01:36:34.440 rumés
01:36:36.120 atgmail.com and I put the correct
01:36:39.480 password it should now take us to the
01:36:42.000 homepage. Perfect. I'll just save the
01:36:43.840 password so we don't have to keep
01:36:44.960 putting it. But perfect. Now we have
01:36:46.880 successfully fixed that issue. So, let's
01:36:48.880 start building this uh homepage. Let's
01:36:51.679 think about it. We want to create a
01:36:53.840 habit tracker. And to create a habit
01:36:56.000 tracker, we want to have different tabs
01:36:58.960 at the bottom that are going to
01:37:00.800 represent the different parts of our
01:37:02.159 app. So, we specifically have three
01:37:04.159 different parts of our app. We're going
01:37:05.679 to have the um add habit page like
01:37:09.760 screen. We're going to have the home
01:37:11.600 screen. And we're also going to have a
01:37:13.760 screen for us to see the streaks of the
01:37:15.840 habits that we've had consistently.
01:37:18.520 uh accomplished, right? So, we keep
01:37:21.040 track of all of the habits we are
01:37:22.639 completing every day and uh we keep
01:37:25.119 track of the best ones um in another
01:37:27.280 page. Now, to do that, we want to adapt
01:37:29.600 our tab navigator to actually match that
01:37:32.320 and also change a bit of the styling
01:37:34.000 because it doesn't match the styling
01:37:35.440 that we're using on React Native paper.
01:37:38.000 So, what I want to do is I'll actually
01:37:39.600 go to the layout over here. Not this
01:37:41.360 one. uh actually yeah this one cuz we
01:37:43.600 have the tabs here and I want to add
01:37:45.600 more uh stuff to this tabs screen
01:37:48.320 options which if you remember it's how
01:37:50.159 we style this tabs navigator. So the way
01:37:53.280 I'm going to do this is the first thing
01:37:54.960 is I want to set a header style and the
01:37:59.440 header style I'm going to apply apply is
01:38:02.080 I want to apply the background color of
01:38:04.400 the header. So what does this do? Well,
01:38:06.639 it's a way for us to actually change the
01:38:08.719 style of this header section over here,
01:38:11.920 uh, depending on the route you're in.
01:38:13.840 So, for example, if I set set the
01:38:15.960 background color to purple. I don't even
01:38:20.000 think that's Yeah, it is a color, but
01:38:21.280 yeah, it changes to a purple. Right now,
01:38:23.840 we want to actually set it to the the
01:38:26.480 kind of beige white color that we've
01:38:28.480 been using. So, I'll set it to F5. F5
01:38:30.840 F5. Then, I also want to apply a header
01:38:34.880 shadow visible. So header shadow visible
01:38:38.639 and I'll set it to false. So I remove
01:38:40.880 that actual line here. Then I'm going to
01:38:44.000 apply a tab bar style. And the tab bar
01:38:47.119 style will apply specifically for this
01:38:49.840 section over here. Now for the tab bar
01:38:52.320 style, I want to put the same background
01:38:54.000 color as the header. So we'll set that
01:38:56.400 and we'll change a little bit the color.
01:38:58.239 Then I want to put a border top width.
01:39:01.760 So that's just the width of the top and
01:39:03.280 I want to set it to zero. I want to set
01:39:04.880 the elevation to zero and I want to set
01:39:07.360 the shadow opacity to zero. You'll see
01:39:10.239 that all those changes basically removes
01:39:12.159 that line from the top. Now I also want
01:39:15.440 to change the color of the active and
01:39:18.080 the inactive um tab. Right? So the tab
01:39:22.480 bar act active tint color. So for
01:39:26.400 example, right now it's the home. Uh, we
01:39:28.400 want to set it equal to this color
01:39:33.960 hashtag6200E and it's a little bit
01:39:36.400 purple to to kind of match the buttons.
01:39:39.600 Now we'll do the same thing to the
01:39:41.760 inactive tint color. So I'll change this
01:39:44.360 to
01:39:46.040 inactive. And now this one is going to
01:39:48.800 be just a bunch of sixes. So 666 666.
01:39:53.280 Perfect. And now you can see that we can
01:39:55.040 switch between them and it looks a lot
01:39:57.119 better. Now I do want to change a little
01:39:59.040 bit the icons and um the names of each
01:40:01.679 of the tabs. Right, we have the home,
01:40:04.159 but this isn't going to be the home
01:40:05.600 screen. It's going to be the main habits
01:40:08.400 screen. If you remember from the demo,
01:40:10.159 we have a screen with a title called
01:40:12.960 today's habits. And that's what we're
01:40:14.719 going to have for the homepage. So the
01:40:16.560 index screen. So the way we're going to
01:40:18.719 do this is we're going to change the
01:40:19.840 title to today's habits.
01:40:23.679 and let's switch that. Now the tab bar
01:40:26.719 icon, what I want to do is I actually
01:40:28.719 want to use another icon and I don't
01:40:30.960 want to switch between focused and
01:40:32.639 unfocused like I was doing before. I
01:40:34.400 just want to keep one. And the icon I'm
01:40:36.639 going to be using is called
01:40:39.480 material community
01:40:42.440 icons. And the way we import it is we're
01:40:45.840 going to come here at the top and I'm
01:40:48.080 going to delete this. I'm going to
01:40:49.440 import the
01:40:50.760 material community
01:40:53.520 icons. This will actually be an we're
01:40:56.560 going to destructure this and I'm just
01:40:57.760 going to get it directly from the vector
01:40:59.719 icons. Now through this I want to put
01:41:02.800 the specify the icon I want. And the
01:41:05.840 icon I want here is since it's like a
01:41:07.679 daily thing, it's like you're showing
01:41:09.199 today's habits. I want to put a
01:41:10.480 calendar. So I'm going to put the icon
01:41:12.159 with the name calendar today. And it
01:41:16.320 gives us a little cool icon for today.
01:41:19.040 Now, obviously, it looks super small.
01:41:20.960 So, I'm going to put the size that
01:41:23.000 matches and the color that
01:41:26.920 matches. Now, size. I mean, we're
01:41:29.520 getting color already from this, but we
01:41:31.199 need to get the size as well, so it
01:41:32.719 adapts perfectly. And you can see that
01:41:34.400 the size of the icon now switches to
01:41:36.400 adapt the tab screen. Now, the second
01:41:38.239 thing we want is we want a screen for
01:41:41.119 the uh streaks. It's the one that's
01:41:43.360 going to go in the middle. We haven't
01:41:44.480 made that page yet. We're going to do it
01:41:45.920 in a second, but we'll just create this
01:41:47.520 the the screen first. So, I want to
01:41:49.679 change this to
01:41:51.080 streaks and we'll change the title to
01:41:55.800 streaks. Now, the icon is going to be a
01:41:59.239 chart
01:42:01.320 line and the rest should remain the
01:42:04.080 same. Now, it's not appearing because we
01:42:05.920 we again we don't have that screen yet,
01:42:08.159 but we're going to make the last one
01:42:09.679 which is going to be the add habit page.
01:42:12.400 So, we're going to say uh add habit and
01:42:16.560 we're going to change this to add habit.
01:42:20.400 And the icon here is going to be the
01:42:22.400 plus
01:42:25.800 circle. Perfect. Now, let's make the two
01:42:28.880 other pages for uh the the streak and
01:42:32.480 the ad habit just so we have that
01:42:34.000 already. I'm going to I'm going to reuse
01:42:35.600 this. So, I'm going to change this to
01:42:38.679 streaks. And I'll change this to streaks
01:42:41.920 page or streaks screen. And now we have
01:42:45.360 that. Uh oh, weird. Why did it Why did
01:42:48.639 it refresh like that? But yeah, I'll
01:42:50.239 create another page now. I'll actually
01:42:51.920 copy this. I'll paste it here. And we'll
01:42:54.239 make the add habit. And I'll change this
01:42:57.520 to add habit
01:43:00.679 screen. Perfect. Now you see we have
01:43:03.679 access to the um add habit and the
01:43:06.880 streaks screen. Now the tab only shows
01:43:09.280 the streaks. So I actually want to
01:43:11.360 figure out why. So I'm going to actually
01:43:13.199 refresh the app again. So let me pull
01:43:16.000 this up. Let me just close this. Open it
01:43:18.480 again. And um hopefully the tab the
01:43:21.360 bottom tab navigator will be updated.
01:43:23.199 Yeah, it is. Sometimes you just have to
01:43:24.719 do that. It's kind of annoying, but
01:43:26.400 whatever. So you can see we now have the
01:43:28.320 three different screens that we're going
01:43:29.920 to be using. Now, what I want to do is I
01:43:31.679 just want to finalize the last piece of
01:43:33.760 our layout over here cuz there's a
01:43:35.600 couple things that we haven't added yet.
01:43:36.880 So, one thing I like to do with every
01:43:38.480 app that I make is I like to add a safe
01:43:40.960 area provider. This will ensure that our
01:43:43.679 app's UI components avoid areas that
01:43:45.760 could be obstructed by things like the
01:43:47.920 device notches and status bar. So, it's
01:43:51.040 just a way for us to keep our screen um
01:43:54.480 keep our app adaptive to our screen in a
01:43:56.800 safe way. So the way I'm going to do
01:43:58.400 this is I'm going to put this around the
01:44:00.320 route card but also below the O
01:44:02.000 provider. And I'm going to put the safe
01:44:05.119 area
01:44:06.679 provider. I'm also going to uh put the
01:44:10.880 paper provider which is uh just a
01:44:12.800 provider we have to get from React
01:44:14.400 Native paper. Um I forgot to add it
01:44:16.560 before but we can put it around this
01:44:18.320 safe area provider. So paper provider
01:44:22.080 and I'll do it here as well. Perfect.
01:44:25.520 Now we're pretty much done with this.
01:44:26.960 I'll close it out and we can start
01:44:28.400 building our index page. So, here is
01:44:30.719 where we're going to show all of the
01:44:32.080 habits. But to have habits to show, we
01:44:34.719 have to create the ad habit page. And to
01:44:37.840 make the ad habit page, we have to have
01:44:40.000 our apprite databases set up. So, this
01:44:43.119 is the part where we actually start
01:44:44.800 setting up our database in our project.
01:44:46.800 We have set up o, but we don't have
01:44:48.480 setup databases. So, I'm going to come
01:44:50.560 here to the database section on appite
01:44:52.480 and I'm going to click on create
01:44:53.679 database. Inside of here, I want to give
01:44:55.920 a name to this database. I'm going to
01:44:57.440 call it the habits DB or something like
01:45:00.400 this. And we're going to click on
01:45:02.000 create. And it's going to create the
01:45:03.920 database for us. Now, we need to keep
01:45:06.239 track of this ID because this is going
01:45:08.320 to be used to connect to it. So, I'm
01:45:10.159 going to come here to
01:45:12.520 ourv and I'm going to create an expo
01:45:17.400 public apprite. Actually, I'll just call
01:45:19.679 it database or DB ID just like this. and
01:45:23.840 I'll just paste it down here. Now, let's
01:45:26.320 go back here and we want to create a
01:45:28.480 collection. Now, a collection is going
01:45:30.000 to be like a table, right? Uh inside of
01:45:32.400 this database. So, I'll click on create
01:45:34.000 collection and we want to create um the
01:45:36.719 first collection. I'll just create one
01:45:38.400 for now. Uh we're going to have two, but
01:45:40.320 the first one is just going to be the
01:45:41.440 habits collection. It's just going to
01:45:42.800 keep track of all the habits you're
01:45:44.159 trying to track. So, I'm going to click
01:45:45.760 on create. And it is going to give us
01:45:48.639 here the habits collection. And I need
01:45:50.880 to copy this ID as well. So, I'm going
01:45:53.199 to open up the VS Code, and we're going
01:45:56.159 to create the um variable for this. I'll
01:45:59.679 just actually copy this, paste it behind
01:46:02.080 here. I'll change this to the
01:46:05.639 habits
01:46:07.239 collection ID. And then I'll just copy
01:46:09.920 this and paste it here. Perfect. Now, we
01:46:14.080 need to create the attributes that are
01:46:16.000 going to exist in this table. Like I
01:46:18.560 mentioned, this is not a NoSQL table,
01:46:20.800 right? It's a relational database. So we
01:46:22.800 do have to define the structure of how
01:46:24.320 the data is going to come in. So we go
01:46:26.400 to the attributes tab and we click on
01:46:28.000 create attribute and we can choose
01:46:29.840 between uh what the data types are going
01:46:32.639 to be for the attribute. Now for this
01:46:35.119 table here are the attributes we want.
01:46:37.600 The first one is when you create a habit
01:46:39.679 you want to keep track of which user
01:46:41.040 created it. So we're going to create a
01:46:42.840 user ID uh field. Now the size I'm just
01:46:47.199 going to put it to a th00and. It doesn't
01:46:49.440 really matter. It's just the size of the
01:46:51.280 string. And since we chose string, uh we
01:46:53.679 could put a default value over here, but
01:46:55.280 I'm not going to put one. Uh and I'll
01:46:57.119 choose this field to be required. And
01:46:59.360 then I can click on create. It's just
01:47:01.119 going to say that we are storing now the
01:47:02.639 user ID as a string. Now I want to
01:47:05.199 create a new attribute and it's going to
01:47:06.719 be the title of the habit. So I'll
01:47:08.639 create a title and I'll put again a
01:47:11.280 th00and as the the length and I'll click
01:47:13.600 on required and I'll create. Now we're
01:47:16.400 going to do the same thing for a bunch
01:47:18.239 of other ones as well. So, I'll just run
01:47:20.480 through it. We're going to have a
01:47:21.600 description for each of the habits.
01:47:24.320 We're going to make it required. And
01:47:25.520 I'll click on create. Then I feel like
01:47:28.560 actually the next one is an integer, not
01:47:30.960 a string because we want to keep track
01:47:32.560 of the streak count, right? For each of
01:47:35.040 the habits. So, create a streak count.
01:47:37.920 Uh you can put a minimum or a maximum
01:47:40.000 size. I'll put a minimum of zero because
01:47:41.760 obviously you can go negative on streak
01:47:44.159 counts. And I won't put a default value,
01:47:46.639 but I'll make it required. and I'll
01:47:48.159 click create. Now, we want to have
01:47:51.119 another string just to keep track of
01:47:53.440 when the user last completed their this
01:47:57.440 habit. And I'll put a th00and again and
01:47:59.840 I'll make it required. And then finally,
01:48:02.880 I want to actually there's two more. I
01:48:04.800 want to keep track of the frequency. So,
01:48:07.119 the frequency of like how many times
01:48:11.280 like how often you want to complete this
01:48:12.880 habit, right? Some habits can be
01:48:14.159 something for every day and some habits
01:48:15.840 can be an every week type thing. So
01:48:17.840 we're going to make this into an option.
01:48:19.679 I'll make it required. And the last one
01:48:22.400 is just the date in which this habit was
01:48:24.880 created. So I'm going to create a
01:48:26.719 created at field again a th00and. And
01:48:30.400 I'm going to make it
01:48:31.880 require. Perfect. And now we have the
01:48:34.400 table that we're going to be using for
01:48:36.159 this project. Now to use this table,
01:48:38.560 we're going to go back to our code over
01:48:40.080 here. And what I want to do is I want to
01:48:43.360 connect um the database ID that we have
01:48:47.040 to our actual database. So we'll go to
01:48:48.840 appite.ts over here and we'll create a
01:48:51.760 new access point to another service from
01:48:55.119 apprite. The service is going to be the
01:48:57.960 databases service. We'll also pass the
01:49:00.800 client, but we'll call this databases.
01:49:03.840 Now, we're going to create a variable
01:49:06.239 for each of the environment variables
01:49:08.080 that we have over here, cuz we're going
01:49:09.360 to have to constantly be calling them.
01:49:11.199 So, this one and this one. Uh, what
01:49:13.440 we're going to do is we're going to
01:49:14.719 create here a
01:49:17.400 database
01:49:18.920 ID variable. We're going to set it equal
01:49:21.679 to
01:49:23.560 process
01:49:26.600 env. And remember to make it um to
01:49:30.000 actually assure the type. And then we're
01:49:32.320 going to make the same thing but for the
01:49:34.320 habits collection ID. So habits
01:49:37.480 collection
01:49:39.639 ID and we'll copy as well the value from
01:49:43.520 the NV uh not the value but the the
01:49:46.719 variable and we'll put it over here.
01:49:49.119 Perfect. Now we'll export this so that
01:49:51.840 we have access to it in different parts
01:49:53.760 of our app.
01:49:55.600 Now I'll save this and let's go to the
01:49:59.840 add habit page. So we can first create
01:50:02.639 the ability to add a habit so that we
01:50:04.320 can then see it on the today's habit
01:50:06.480 screen. So let's start like always with
01:50:08.800 the UI of this screen. Let's think about
01:50:10.880 what we want here. Well, we already have
01:50:12.560 a view, right? But we also want to have
01:50:14.880 uh similar to the login page. We want to
01:50:16.400 have an input for adding the title. We
01:50:18.960 want to have an input for the
01:50:20.239 description. And we want to have a
01:50:21.840 button to add the habit. uh and also we
01:50:24.560 want to have a place for us to choose
01:50:26.320 whether this habit is something that you
01:50:28.400 want to do daily, something that you
01:50:29.760 want to do weekly or monthly. So I'm
01:50:32.639 going to create here first the inputs.
01:50:34.480 We're going to create a text input from
01:50:36.000 React Native paper and we're going to
01:50:38.320 put a label. The label for the first one
01:50:41.119 is going to be title. Then we'll put a
01:50:44.880 mode and the mode for it is going to be
01:50:47.199 outlined.
01:50:49.360 Now I'll do the exact same thing, but
01:50:51.119 we're going to do it for the
01:50:54.600 description. And then I want to create
01:50:58.239 the part where we actually can choose
01:51:00.320 between the different types of
01:51:02.400 frequencies. Right now, to do that,
01:51:04.639 there's a couple ways of doing it. What
01:51:06.320 I like to do is I like to use segmented
01:51:09.360 buttons. So segmented buttons, it's
01:51:12.239 going to basically make uh a sequence of
01:51:14.719 buttons like we we just described and
01:51:17.520 they're going to be right next to each
01:51:18.880 other. So I'm going to create here a
01:51:20.800 segmented buttons and we can pass a
01:51:23.040 value here for buttons. It's basically a
01:51:25.440 list of different buttons that we're
01:51:26.880 going to have. Now to pass this, we have
01:51:29.600 to pass a list of buttons that look like
01:51:32.239 this, right? It looks like it has a
01:51:34.520 value and it has a label.
01:51:38.800 Now the value of the first button is
01:51:41.840 going to be for example daily or
01:51:44.560 something like this and the label might
01:51:46.480 be daily as well. Now you see now we
01:51:49.440 have one button for the daily option.
01:51:52.239 Now if I copy this and paste it again
01:51:54.400 you see now we have two buttons. This is
01:51:56.159 what this does. Now a way for us to make
01:51:57.760 this actually easier is we can just
01:52:00.320 create uh above here probably a list
01:52:03.440 called
01:52:06.040 frequencies. and we'll set it equal to a
01:52:08.080 list and we'll have the options
01:52:10.840 daily,
01:52:12.520 weekly and
01:52:15.400 monthly. And then we can just loop
01:52:18.560 through uh this list like this
01:52:21.520 frequencies map. And while looping
01:52:24.080 through it, we can get the specific
01:52:27.000 frequency and just set the object equal
01:52:30.239 to the value which is the frequency and
01:52:35.119 the label which is going to be the
01:52:38.599 frequency but actually what I want to do
01:52:41.119 with it is I don't want it see it will
01:52:42.880 say daily, weekly, monthly. I want to
01:52:44.239 capitalize the first letter. The way I'm
01:52:46.080 going to do this is I'm going to get the
01:52:47.520 first item. So we'll say char at
01:52:50.000 position zero which is the first letter
01:52:53.040 but instead of just rendering that I
01:52:54.800 want to uppercase that. So you see it
01:52:57.599 now becomes uppercase and then I want to
01:52:59.679 add to the end of this string basically
01:53:02.239 the rest of the string. And to do that I
01:53:04.159 just slice the string starting at the
01:53:06.560 second letter and now I capitalize just
01:53:08.400 the first letter. Perfect. Now we have
01:53:11.520 our least list of uh segmented buttons.
01:53:14.560 But uh it's giving us an error just
01:53:16.239 because we we need to pass a couple
01:53:18.080 other things like what happens when you
01:53:20.320 change on it and so on. But we'll keep
01:53:22.080 it as that for now. We're also going to
01:53:23.760 wrap this around with a view just cuz we
01:53:26.159 want to style this in a very specific
01:53:28.560 way.
01:53:30.119 Then below this we want to put the
01:53:32.560 button and the button is going to be the
01:53:36.800 add habit button. And I'm going to pass
01:53:39.920 the mode as
01:53:43.400 contained. And why is giving us an
01:53:46.000 error? We have to import button from
01:53:48.239 react native
01:53:49.480 paper. Perfect. And I'll go to add
01:53:51.599 habit. And now we have the button here.
01:53:54.000 Perfect. Now let's add the styles for
01:53:56.400 this. I'll first add the style name. So
01:53:58.880 we'll have here a style for the view.
01:54:00.880 We're going to call this
01:54:03.880 styles.container. We also haven't
01:54:05.520 created that yet. We can create it down
01:54:07.199 here at the bottom actually. So I'll say
01:54:09.440 styles is equal to
01:54:13.480 stylesheet. Uh I'll actually let me
01:54:16.320 import it from React Native
01:54:18.080 automatically. Yeah. And then I'm going
01:54:20.400 to say
01:54:21.400 docreate and we'll just keep like this
01:54:24.480 for now. But we'll create a container
01:54:26.400 style. We're also going to create an
01:54:28.639 input style that we're going to apply to
01:54:30.480 both
01:54:32.280 inputs. And then we want one for this
01:54:35.840 view. So I'm going to call it the
01:54:39.159 frequency
01:54:41.800 container. And we'll do one for the
01:54:44.159 segmented uh buttons as well. So I'll
01:54:46.880 apply here style is equal to uh actually
01:54:50.560 I'll just paste this. So I'll say
01:54:53.159 segmented
01:54:54.840 buttons. And finally, let's do it for
01:54:58.000 the add habit button. So, we'll just
01:55:01.440 call this button. And now, let's apply
01:55:04.000 this. Let's create the styles directly
01:55:05.920 down here. The first one is the
01:55:07.360 container. And what we want to do with
01:55:08.960 the container is we want to uh first set
01:55:13.440 the flex to one, which you'll see will
01:55:16.400 do nothing for now, but when we add the
01:55:18.320 padding to 16, uh it will kind of
01:55:21.360 declutter stuff. We also want to set the
01:55:23.520 background uh to this screen to be the
01:55:27.040 color that we're using for everything.
01:55:28.560 So we'll say F5 F5 F5. Uh then we
01:55:32.960 actually have to set background color
01:55:34.960 not
01:55:35.719 background. And then we can stop with
01:55:38.800 the container. We'll give some styling
01:55:40.719 for the
01:55:41.880 input. Now for the input, we want to
01:55:44.400 just set a margin bottom of
01:55:47.960 16 to give some space. Then we'll do the
01:55:51.920 same thing but for the frequency
01:55:54.199 container. So we'll do
01:55:56.679 frequency
01:55:58.199 container. Now for the frequency
01:56:00.080 container, let's just make a bigger
01:56:01.599 margin bottom. Uh no, not this 24.
01:56:05.360 That's what I meant. Now we'll copy
01:56:08.719 again. We'll paste it here. And we'll
01:56:11.280 make this segmented buttons style. Now
01:56:15.520 this one will be similar to the input.
01:56:17.440 We'll just put some margin down here.
01:56:19.440 And finally, we want to create the
01:56:21.040 button to have a margin
01:56:25.080 top a margin top of eight. Perfect. But
01:56:29.920 I'm going to be honest. I think I think
01:56:31.520 this looks too big. I'm going to
01:56:34.159 actually make this eight. And I want to
01:56:36.639 make
01:56:37.639 this I think this is fine. Yeah,
01:56:40.080 actually. Let me even remove the styling
01:56:42.000 for this. I don't think we need it.
01:56:44.920 Uh this is for the Did I remove? Yeah, I
01:56:48.560 removed for both the segmented buttons
01:56:50.400 and for the button. Yeah, this is fine.
01:56:52.880 React Native paper adds a lot of styling
01:56:54.800 automatically, which is great for us.
01:56:57.040 And we now have this at the top here.
01:56:59.679 Now, I could also, if I wanted to, just
01:57:02.960 justify the content to be center. Uh,
01:57:06.400 and then everything is centered. Uh, you
01:57:08.480 can do that if you want to. Uh, I
01:57:10.400 actually might keep it like this just
01:57:12.080 because I like the style of this. Um, I
01:57:14.800 also set the margin bottom here to eight
01:57:16.800 just so I can make it not not this one.
01:57:18.960 Uh, I kind of wanted to just set the
01:57:21.679 Actually, I'll remove the margin bottom
01:57:23.840 here. And actually, I'll keep it like
01:57:25.360 this. It just makes it easier for us to
01:57:27.119 see it. And I think this should be good
01:57:29.920 to go. Now, let's add the logic to keep
01:57:32.880 track of what the user is typing. Uh, we
01:57:35.440 want to keep track of this title, the
01:57:37.199 description, and the the frequency,
01:57:39.520 right? So, to do that, we're going to
01:57:41.119 use states.
01:57:43.280 So I'll come over here. I'll create here
01:57:45.599 the title
01:57:47.400 state which will be a
01:57:51.159 string and we'll start as as an empty
01:57:54.000 string. Then I'll just copy this. I'll
01:57:56.239 paste it three
01:57:57.800 times. And I'm going to change this to
01:58:00.760 description. I'm going to change this to
01:58:03.280 set
01:58:04.679 description. And the final one is going
01:58:06.880 to be a frequency. I'm going to change
01:58:08.719 this to frequency. And I'll change this
01:58:11.920 to set frequency as well.
01:58:15.320 Now the type of this is let's actually
01:58:18.159 make a type out of this array. So what
01:58:21.440 I'm going to make is I'm going to create
01:58:22.480 a type called
01:58:23.960 frequency. And the type of it is
01:58:26.560 actually going to be an object with the
01:58:29.280 type of and then I'll put the trip
01:58:31.760 frequencies array. I can do this in
01:58:34.560 Typescript. I'm just making the key be
01:58:36.719 one of these options and then it will
01:58:39.599 have uh as a value a number. So I'll put
01:58:43.440 here the type of frequency to be
01:58:45.480 frequency and initially it will be
01:58:49.480 daily. That actually makes sense. If we
01:58:51.760 go back here to our thing, let's
01:58:54.320 actually set the initial frequency on
01:58:56.719 this attribute to be daily. I think that
01:59:00.080 that might be a good thing for us to do.
01:59:02.880 Uh, I'll set it to daily. Now, we go
01:59:06.719 here to all of our inputs,
01:59:24.520 especi. Now, the frequency is going to
01:59:27.119 be a little bit different. We're not
01:59:28.320 going to use an onchange text. we're
01:59:30.639 actually going to have to use an onv
01:59:32.000 value change because that's what
01:59:33.280 segmented buttons allow us to. And when
01:59:35.679 there's a change in the button you
01:59:37.040 click, we're going to have this callback
01:59:38.880 function and we can access the value. So
01:59:41.840 this this property over here of the
01:59:43.920 button we clicked. Now what we want to
01:59:46.000 do is we want to set the frequency equal
01:59:48.480 to the value as frequency. Now we also
01:59:52.800 have to put a value as the initial
01:59:54.639 frequency selected. So we're going to
01:59:56.880 set value over here equal to frequency.
01:59:59.599 And that's why the thing was red
02:00:02.080 squiggly lined because now we can select
02:00:04.480 daily as the first value and I can
02:00:06.320 switch between them. And you can see
02:00:07.599 that there is some styling to which
02:00:09.760 segmented button you click. Now on the
02:00:11.920 add habit button I want to uh where we
02:00:14.639 have the mode contained. Obviously we're
02:00:16.639 going to put an on press for when you
02:00:18.080 submit it but also I want to disable
02:00:20.000 this button if there's no title or no
02:00:24.639 description. So the user can't even
02:00:26.800 select it if they haven't written
02:00:28.960 anything yet. Now I think it's time for
02:00:31.040 us to handle what happens when you add a
02:00:33.360 habit and successfully add stuff to our
02:00:35.440 database. So to do that I'm going to add
02:00:37.760 an on press over here and we're going to
02:00:39.440 call this function called handle submit.
02:00:42.480 Now we have to create that function.
02:00:44.080 We're going to do it up here. We're
02:00:45.679 going to say const handle
02:00:48.040 submit. We have to make this into an
02:00:50.320 async function just cuz we're going to
02:00:52.560 be accessing database stuff and I want
02:00:55.599 to only be able to add I want to make
02:00:57.599 sure that the user exists before we
02:01:00.560 actually submit this. So I'm going to
02:01:02.800 create here a user and set it equal to
02:01:05.040 use o.
02:01:07.119 And if the user doesn't exist, then
02:01:11.679 we'll just skip this function just so we
02:01:13.679 can assure that the user exists when
02:01:15.599 we're trying to add a habit because
02:01:17.599 we're going to access information about
02:01:18.880 the user, especially the user ID. Now,
02:01:21.760 inside of here, here is how we're going
02:01:23.920 to handle um adding a user or adding a
02:01:27.360 habit. So we need to
02:01:30.599 await and we will call the databases
02:01:33.119 object that we we created in our apprite
02:01:36.239 file and I have to click on create
02:01:39.040 document. Create document will add
02:01:41.280 something to a collection. It will add a
02:01:42.960 document to a collection and a document
02:01:44.960 will just be an entry to our table. Now
02:01:47.920 to create a document I need to pass a
02:01:49.920 database ID. I need to pass a habits
02:01:53.280 collection ID and I need to pass the id
02:01:57.280 of the um document I'm creating which if
02:02:00.159 you remember I could easily create by
02:02:01.760 using the ID do unique uh but I need to
02:02:04.960 import this id object from react native
02:02:08.239 apprite and then use the unique
02:02:10.760 function. Now after we're done doing
02:02:13.280 that we can now pass an object that
02:02:15.440 represents the attribute structure of
02:02:17.840 this um document that we're creating. So
02:02:20.639 if you remember the first thing we need
02:02:22.080 to pass is a user ID and we'll get that
02:02:25.840 by saying user dot and then we'll get
02:02:28.560 the id. User if you remember is the uh
02:02:32.080 session that we have from the use
02:02:34.280 off. Now the second thing is the title.
02:02:37.280 Obviously we get the title from the
02:02:39.119 states that we created to keep track of
02:02:40.880 this. So we'll just pass title. We'll
02:02:42.800 pass description as well. Same thing.
02:02:45.440 Then frequency. Same thing. But then
02:02:48.400 there's a couple other things. For
02:02:49.840 example, with the streak count, we'll
02:02:51.280 start it as zero. So, we'll have to pass
02:02:54.239 it as zero over
02:02:55.560 here. Then we want to pass a last
02:03:00.760 completed. And the last completed by
02:03:03.119 default is going to be today. So, we'll
02:03:05.119 say new
02:03:07.639 date dot to ISO string. And this will
02:03:11.679 basically create the current date. We'll
02:03:14.239 do the exact same thing uh also put the
02:03:16.560 date but for the created at property.
02:03:20.880 And now we have the structure of our
02:03:22.679 object. When we click this, it should
02:03:25.280 actually send this as a document to our
02:03:27.760 table. But when we successfully create a
02:03:30.159 new habit, what I also want to do is I
02:03:32.000 want to be able to go back to where we
02:03:33.760 were before because we created a habit.
02:03:36.000 Now we actually can see the habit
02:03:37.599 appearing in the screen. So I'm going to
02:03:38.960 click on
02:03:40.440 router.back. And uh this should navigate
02:03:43.280 you back to where you were before. Now
02:03:45.199 obviously we don't have access to the
02:03:47.199 router here. So let's do that. Con
02:03:49.760 router is equal to use
02:03:52.040 router from expert router. And that will
02:03:56.000 navigate us back. But this might fail.
02:03:58.800 So let's try catch this. So we'll say
02:04:02.760 try and we're going to catch any
02:04:06.119 errors. And in here we might want to
02:04:10.400 handle errors. So I'm going to actually
02:04:12.320 create here an error state. So error and
02:04:16.080 set error and this is going to be a
02:04:19.040 state that is a
02:04:21.239 string and when there is an error we
02:04:24.880 have to check if error is instance of
02:04:31.360 error right we've done this before then
02:04:33.920 we set the error to be equal to error
02:04:36.719 dom message because then we know there's
02:04:38.400 a message in that error object but if
02:04:41.040 not
02:04:42.960 uh like and we want to return this as
02:04:44.960 well. If not, then we'll just set the
02:04:47.760 error to some generic thing like there
02:04:50.360 was an error creating the
02:04:54.920 habit. Perfect. And now let's handle
02:04:58.560 displaying that error when creating a
02:05:00.159 habit. We'll put it below the button.
02:05:01.679 We'll add here u if there's an
02:05:04.840 error. So if error is true, then we'll
02:05:10.320 do the exact same thing we did here on
02:05:12.080 the off page. which will actually even
02:05:13.760 copy the logic we did there. We'll just
02:05:16.320 copy this. We'll put it
02:05:18.920 here. And uh we need now have access to
02:05:22.719 the theme similar to what we did there.
02:05:24.800 So we'll have to um call the use theme
02:05:28.000 hook from React Native paper. So use
02:05:30.080 theme just so we can get the color
02:05:32.000 remember. Uh
02:05:35.480 and what happened here?
02:05:40.000 Oh, we need to import the text from uh
02:05:43.920 from React Native paper, not from React
02:05:46.159 Native. Right. So, we'll just import
02:05:49.280 text over here. And now the error should
02:05:52.239 be gone. Perfect. Now, let's try
02:05:54.239 creating a a habit and let's see what
02:05:56.719 happens. Let's put here uh let's think
02:05:59.760 of one that I can do every day. uh
02:06:03.400 meditate for that's the title and then I
02:06:05.920 put five
02:06:07.800 minutes of
02:06:10.760 meditation
02:06:12.280 every morning and we choose it to be
02:06:15.199 daily and we click on add habit. It says
02:06:18.960 current user is not authorized to
02:06:20.639 perform the requested action meaning
02:06:22.400 that we are displaying the error
02:06:23.679 correctly. But you might be wondering
02:06:25.119 why why am I not authorized? Well,
02:06:27.360 because if you've ever worked with any
02:06:29.280 uh backend as a service such as
02:06:31.040 Superbase or uh Firebase or in this case
02:06:33.840 Apprite, you know that you need to set
02:06:35.520 up policies for which users are
02:06:37.920 authorized to execute actions on your
02:06:41.199 tables. So the way we do that is we go
02:06:43.440 to settings over here and we go down and
02:06:45.599 we see permissions, right? You can
02:06:47.679 choose who can access the collection and
02:06:49.360 documents. So, we need to add a role for
02:06:52.480 this collection. And by default, no one
02:06:55.119 can do anything with this collection,
02:06:56.800 which is good because it secures our
02:06:58.639 collection. So, I'm need to click here,
02:07:00.560 add a role to get started. And I need to
02:07:03.520 choose what role I want to apply. Now,
02:07:05.840 I'm going to choose all users over here.
02:07:08.000 And I want to allow all users to create,
02:07:09.840 read, update, and delete. And to be
02:07:11.520 honest, because this app is very
02:07:12.800 personal in the sense that you don't
02:07:14.480 interact with habits from other people,
02:07:16.960 I think that you can basically set the
02:07:19.199 user to be able to do anything they want
02:07:21.440 um in this table. So, we're going to
02:07:23.360 allow users, not guest users, so users
02:07:26.239 of the app, people authenticated to be
02:07:28.320 able to create, read, update, and delete
02:07:30.320 their own habits. And I'll click update.
02:07:32.719 And now we should see that if I go back
02:07:35.360 into our app and I click add habit, we
02:07:39.520 have successfully added a habit. Now,
02:07:41.360 how do I know that? Well, the
02:07:43.560 router.back here redirected us back to
02:07:46.159 today's habits. Meaning that if I go to
02:07:48.320 our database over here, we should see
02:07:50.800 that there was a document that was
02:07:52.960 created and it looks exactly like what
02:07:55.119 we just created. Great. We have
02:07:57.360 successfully connected our React Native
02:07:59.040 app to our backend. But now, how do I
02:08:02.480 display the habits on the today's habits
02:08:04.880 screen? So, I'm going to close. Now,
02:08:07.040 we're done with the add habits. We'll go
02:08:08.639 to the index screen and we're going to
02:08:11.199 create the today's habits page. So, in
02:08:14.320 here, I want to start by being able to
02:08:17.119 fetch the list of habits that we have on
02:08:19.280 the table. So, to do that, I'm going to
02:08:21.840 create here a function called fetch
02:08:24.360 habits. It's going to be an async
02:08:26.560 function. And inside of here, I want to
02:08:30.719 try and catch uh getting the habit. So,
02:08:34.159 I'm going to catch an
02:08:35.960 error. And to be honest, if there's an
02:08:38.159 error, I don't want to display anything.
02:08:40.320 I just want to console error the
02:08:44.440 error. Now, when I fetch the habits, I
02:08:48.079 need to use the same logic we used with
02:08:52.000 the um creating habits. We need to
02:08:54.239 access the databases object. So I'm
02:08:56.719 going to await databases and we need to
02:09:00.560 import that from the apprite file. Now
02:09:03.520 for fetching documents in a in a in a
02:09:06.320 collection we use the list documents
02:09:08.480 function. Now this function will list
02:09:10.719 all the documents in this um collection
02:09:14.719 um as per you put a condition for those
02:09:17.520 documents to appear and the condition we
02:09:19.280 want is we only want to list the
02:09:20.800 documents that are created by the user
02:09:23.360 that is logged in right now. So they
02:09:24.719 only see their own habits. So what we
02:09:26.880 put here is first we need to put the
02:09:28.560 database ID then we need to put the
02:09:31.360 habits collection ID and then finally
02:09:34.800 you need to put the condition. So you
02:09:37.520 might already be understand that every
02:09:39.840 time you interact with a database or a
02:09:41.679 collection you have to pass the database
02:09:43.360 ID and the specific collection ID. So
02:09:45.280 that's why we created those variables
02:09:46.560 and exported them. Now the condition it
02:09:49.360 looks a bit weird but you'll get used to
02:09:50.800 it. You need to pass an array because
02:09:52.880 you can actually implement multiple
02:09:54.480 conditions. In our case, we're only
02:09:55.599 going to have one condition, which is
02:09:57.679 just that we only want to list the
02:09:59.280 documents in which the user ID is equal
02:10:01.360 to the ID of the user who's logged in.
02:10:03.679 So to do that, we have to get the user
02:10:06.000 that is logged in through the use O. And
02:10:09.360 we're going to create here a query. Now
02:10:12.480 this query we we'll we can specify what
02:10:15.920 comparison are we making here, right? It
02:10:17.760 can be uh a between, a contains, a
02:10:20.960 greater than or equal, stuff like that.
02:10:22.719 We want it to be equal. We want the user
02:10:24.480 ID field to equal the ID of the user
02:10:26.960 logged in. So we put equal. We specify
02:10:30.239 the field we're putting this comparison
02:10:32.239 on. So user ID and we specify what uh we
02:10:36.560 are comparing it to. So we're comparing
02:10:38.560 it to the user ID. Now this could be
02:10:41.760 null. So if it is null because the user
02:10:44.239 isn't logged in for some reason, we just
02:10:46.239 put this which is an empty string. And
02:10:48.239 then obviously there's no habits with an
02:10:50.239 empty string. So it won't return
02:10:52.239 anything. Anyways, now when this is
02:10:54.239 done, we want to basically keep track of
02:10:57.040 this response. So I'm going to create
02:10:58.800 here a state called um habits. And this
02:11:03.599 state will be a list of habits which is
02:11:07.760 going to have a type called habit list.
02:11:11.440 Now we have we don't have the type yet.
02:11:13.360 We need to create it. And what I like to
02:11:15.360 do on my React Native app is I like to
02:11:17.679 create a types um folder. So I'll create
02:11:21.840 here types. And in here I'll create all
02:11:25.199 the specific types that we need to be
02:11:27.599 reusing on our project. And habit is a
02:11:29.599 type that we're going to reuse it
02:11:30.800 multiple times. So I'll create here a
02:11:33.199 file called
02:11:38.199 database.type.ts. And in here I'll
02:11:40.079 create all the types including this
02:11:41.840 habit one. So in here we're going to
02:11:44.760 export an interface called habit. And
02:11:49.840 this interface is actually going to
02:11:52.920 extend another interface which is
02:11:55.679 something we can get from appite. It's
02:11:58.159 going to be called models.doccument. But
02:12:00.560 we need to import models. So models
02:12:03.360 do.cument. Why? because now the habit uh
02:12:07.280 interface is going to include the
02:12:09.320 specific format of attributes that we're
02:12:12.079 going to set but also it is going to
02:12:14.639 include extra stuff that a normal
02:12:17.199 document that we get back from eprite
02:12:19.679 might include as well. So the way we do
02:12:21.920 this is we specify here for example a
02:12:24.000 habit has a user ID which is a string.
02:12:27.679 It has a title which is a string. A
02:12:30.440 description which is a string. It also
02:12:33.599 has a
02:12:35.079 frequency which is a string. Uh streak
02:12:40.679 count which is a number not a string.
02:12:43.199 It's the only one that isn't a string.
02:12:44.880 And a less completed which is a string.
02:12:47.440 and a created at which is a string.
02:12:52.400 Perfect. And now we can use this habit
02:12:56.320 as a type over here by importing the
02:12:59.040 type from database type. Now when we
02:13:02.159 create the response, I want to set the
02:13:04.239 habits equal to the response. But the
02:13:06.880 response will return back more than just
02:13:08.480 the list of habits. To get that, I
02:13:10.719 actually have to say response documents.
02:13:13.760 And I want to cast the type of it to be
02:13:16.320 equal to a habit list so that we
02:13:18.639 specifically know what the type is. Now
02:13:21.440 before we list that out, I want to
02:13:22.960 console log it just so we see if we're
02:13:24.800 actually getting back the response
02:13:26.800 documents. Let's see what we get back
02:13:28.480 from that. So let's run this fetch
02:13:32.079 habits function every time the user
02:13:34.239 comes to this screen. So I'm going to
02:13:35.440 create a use effect and on this use
02:13:37.199 effect we're going to pass a dependency
02:13:38.719 array which is just going to be the user
02:13:40.639 just in case the user changes. And in
02:13:42.800 here I want to call the fetch habits
02:13:44.599 function. Now if I open my terminal over
02:13:48.480 here you see that we have a console log
02:13:51.119 and it includes the information for the
02:13:54.079 one uh frequency or the number one habit
02:13:57.360 that we created right it includes here
02:13:58.800 the user ID uh it includes the
02:14:00.960 description the title and the frequency
02:14:04.400 and so on. So we are getting back the
02:14:06.560 data correctly. Uh and we're also
02:14:08.400 setting it to the state. So now we can
02:14:10.159 actually start building the UI to adapt
02:14:12.639 to that state. So how are we going to do
02:14:14.320 this? Well, I'm going to delete this
02:14:15.920 stuff over here. Let's start from a
02:14:17.599 clean slate. Now in this uh view over
02:14:20.800 here, I actually want to start by making
02:14:23.119 kind of like a header to this page. So
02:14:25.280 I'm going to make another view which is
02:14:27.199 going to be the header. And on this one,
02:14:28.960 we're going to have a text that I'm
02:14:30.880 going to import uh I hope it imported
02:14:34.400 from No, it's not from React Native. I
02:14:37.040 want to import it from React Native
02:14:40.520 paper. And then I want this text to be
02:14:45.360 saying today's
02:14:47.960 habits. Perfect. Now I want to put a
02:14:50.960 variant to this. The variant is going to
02:14:53.040 be headline
02:14:55.159 small. And then I want to put a button
02:14:58.079 in here on the header which is going to
02:15:00.000 be the logout button which I just
02:15:02.000 realized we deleted. So, let me sorry,
02:15:04.079 let me command Z everything here cuz I
02:15:06.719 want to get back this button. And then
02:15:09.199 I'll just command shift Z. So, we go
02:15:12.239 back to where we were. And then I'll put
02:15:13.920 the button below this. Uh, but we need
02:15:16.880 to import this from React Native paper.
02:15:19.360 Perfect. Now, we have this button over
02:15:20.880 here. Now, this is going to be the
02:15:22.079 header. So, below this header, we want
02:15:24.400 to have the list of habits. So we want
02:15:27.360 to first check to see if there's no
02:15:28.719 habits because if the habits list so if
02:15:32.560 the habits.length length is equal to
02:15:35.880 zero. Then I want to display a view over
02:15:41.480 here that is going to have just a text
02:15:46.079 saying that the habits is u empty.
02:15:49.360 Right? So I'm going to say no habits
02:15:53.239 yet. Add your first habit.
02:15:58.639 Now, if that's not true, which we know
02:16:00.800 it isn't, uh then we display the list of
02:16:03.520 habits. And to do that, we have to loop
02:16:06.560 through the habits array. So, we'll say
02:16:08.079 habits.m map and we'll map through each
02:16:10.560 of them. Grab the individual habit and a
02:16:14.800 key over
02:16:16.199 here. And we're going to create a view
02:16:20.320 for this habit. So, we'll make here a
02:16:23.960 view. And for now we won't do anything
02:16:26.800 with it but we'll just create it. Now
02:16:30.560 obviously habits is not empty so we are
02:16:32.558 not seeing this text but if this was the
02:16:35.040 opposite you'll see that we would see
02:16:36.799 this no habits yet add your first habit.
02:16:39.679 Uh but we want to keep obviously uh
02:16:42.398 habit like this. So now let's create the
02:16:45.040 habit in individual habit view. So for
02:16:47.359 this we want to display some information
02:16:48.879 about the habit. The first one is we
02:16:50.959 want to put a text. Now, this text is
02:16:53.519 going to be the title, right? So, we're
02:16:55.840 going to put here the
02:16:58.318 um
02:17:01.398 habit.title. Also, let me just put a key
02:17:04.080 to this uh view so we can properly index
02:17:07.799 this. Now, we're showing the title of
02:17:10.080 the habit. Now, we'll do the same thing
02:17:11.679 for the description. So, we'll show
02:17:14.040 description and then I think I want to
02:17:16.318 create a view now so we can display the
02:17:20.000 um the streak. So, I'm going to create a
02:17:22.398 view. I'm going to close that view. And
02:17:25.120 in here, we're going to create another
02:17:28.760 view. And we'll close that other view.
02:17:32.000 And inside of this other view, I want to
02:17:33.920 put an icon. I'm going to put
02:17:37.558 material community icons, similar to
02:17:40.160 what we did before. And on this icon, I
02:17:43.120 want to use the icon with the name fire.
02:17:46.000 It's kind of like a fire emoji. And
02:17:49.200 that's to represent the the the
02:17:51.359 individual streaks. I'm going to put a
02:17:53.120 size of it to be a little bit bigger.
02:17:54.398 I'm going to make it 18. And I also want
02:17:56.478 to put the color to be um this color
02:18:00.318 over here. It's a hashtag um
02:18:05.160 FF9800. And it will be kind of orange.
02:18:08.519 Perfect. Now I want to put a text with
02:18:12.318 the actual streak of this habit. So, I'm
02:18:16.160 going to put a text right next to this
02:18:18.558 icon and it's going to include the habit
02:18:21.599 dot streak count. And I'll put right
02:18:24.240 next to it, obviously, it's zero by
02:18:25.679 default, but I'm going to put day
02:18:29.558 streak. Nice. Now, below this, I want to
02:18:33.840 put the frequency, right? So, below the
02:18:36.558 view that we just closed, I want to put
02:18:39.359 another view. And this will be the
02:18:40.959 frequency uh badge, the frequency view.
02:18:44.240 And in here, I'll just put a text that
02:18:46.398 says the habit
02:18:51.160 frequency dot char at zero. Similar to
02:18:55.120 what we did before to capitalize, we're
02:18:57.439 going to uppercase
02:18:58.920 it plus the habit frequency dots
02:19:03.638 slice starting from one. And uh I need
02:19:07.280 to close this. Sorry. Yeah. And now we
02:19:10.000 get the frequency with a capitalized
02:19:12.160 first letter. So we see daily. Now
02:19:14.160 obviously the styling of this looks
02:19:15.760 really ugly. Uh so we do need to apply
02:19:17.840 some styling to it. So I'll do what we
02:19:19.599 did last time. I'll just add the uh
02:19:22.160 individual elements first and then I'll
02:19:24.160 apply the styles. So the first thing I
02:19:26.478 want to do is I want to change this to
02:19:28.280 container and then I want to apply one
02:19:31.679 for the header. So we'll call this
02:19:34.679 header. Then we'll probably have one for
02:19:37.439 the title. So I'll call this title. Uh
02:19:40.879 we already we don't pro we don't need
02:19:42.398 anything for the sign out button.
02:19:45.080 Then for this we're going to create one.
02:19:47.519 We're going to call it empty state. And
02:19:50.240 we'll do one for the text as well. We're
02:19:51.760 going to call it
02:19:54.680 empty state
02:19:57.560 text. And then for the habits, we pretty
02:20:00.319 much want to treat this as a card. So
02:20:02.319 I'm going to call this
02:20:04.600 card content.
02:20:08.000 Uh then for the text over here, I want
02:20:10.240 to have a card
02:20:12.920 title. Then on this one, I want to have
02:20:15.359 a card
02:20:19.319 description. And then for this view, we
02:20:21.920 want to this is the footer, right? This
02:20:23.920 is what goes below the or kind of like
02:20:25.840 at the bottom of the card. And it will
02:20:27.359 include the the streak and the
02:20:30.479 frequency. So I'm going to call this the
02:20:33.399 card footer. Now, the frequency or the
02:20:38.000 streak um view. We're going to call this
02:20:40.560 the
02:20:42.680 streak badge. And we'll put a styling to
02:20:45.520 the text. I'm going to call this the
02:20:47.399 streak text. Then for this view, we're
02:20:51.040 going to call it similar to this. We're
02:20:52.479 going to call it the frequency badge
02:20:54.160 instead. So,
02:20:57.160 frequency badge. And the text will be
02:21:00.399 frequency text. Now, we want to put an
02:21:02.880 extra element above the view, which is
02:21:05.280 going to have the style of the card. So,
02:21:07.280 we're going to use the um surface
02:21:09.560 component. This is a React Native paper
02:21:12.319 component that creates a material design
02:21:14.640 surface for a card. So, it's just going
02:21:17.600 to help us style our card better. So,
02:21:20.160 I'm going to import that and I'm going
02:21:21.359 to put it around this. So, it's going to
02:21:23.680 wrap it. And for the surface, we're
02:21:25.760 going to create here a style, which is
02:21:29.120 going to be styles.card. card and we're
02:21:32.000 also going to put an elevation of
02:21:35.319 zero. So now let's go to our styles over
02:21:38.479 here and let's make each individual one.
02:21:40.240 So the first one is the container which
02:21:42.640 is going to be flex one. Uh we're not
02:21:44.720 going to justify anything uh but we're
02:21:46.640 going to put a padding of 16 and we're
02:21:50.000 going to put a background
02:21:51.880 color of
02:21:54.399 uh # F5 F5 F5. Perfect. Now we're going
02:21:59.520 to make here the
02:22:01.160 header. The header we're going to have a
02:22:03.880 flex direction. So flex direction is
02:22:08.240 equal to
02:22:09.880 row. Now we're going to justify the
02:22:12.319 content to be space
02:22:16.280 between. And then we're going to align
02:22:20.319 the items to the
02:22:23.720 center. And I put a double comma here.
02:22:27.359 And then we're going to set a margin
02:22:31.160 bottom to be
02:22:33.800 24. So we have some space. Now after
02:22:37.600 this, we want to style the title. So
02:22:40.319 this thing over here, the title is going
02:22:42.880 to be pretty simple. I just want to
02:22:44.080 change the the font weight to be bold.
02:22:47.040 So we have a bold
02:22:48.840 text. Then below this, we want to start
02:22:51.359 styling the card. So the card is going
02:22:53.200 to be huge. We want a margin
02:22:56.920 bottom to be 18. So there's some space
02:23:00.399 in between the cards. Then we want a
02:23:03.160 border radius to be 18 as
02:23:07.319 well. We want a background color to be a
02:23:10.960 little bit different from the color of
02:23:12.720 the the the whole screen. So we're going
02:23:15.600 to say
02:23:16.840 F7 F2 F8. And you see it's a little bit
02:23:21.600 purple. It's hard to see, but I can see
02:23:23.120 it on my screen. Uh, then I'm going to
02:23:25.200 put a shadow color so we can actually
02:23:28.080 see a shadow. And it's going to be 0
02:23:31.000 0. Then I'm going to put a shadow offset
02:23:36.319 to be to have a width of zero, but
02:23:39.399 height of
02:23:41.399 two. And then I'm going to put a shadow
02:23:44.520 opacity to have 0.08 opacity. So it's
02:23:48.240 very, very small.
02:23:50.240 And then I'm going to put a shadow
02:23:52.479 radius to be
02:23:55.160 eight. And then finally the elevation to
02:23:58.319 be four. Perfect. So it's kind of
02:24:00.640 elevated and you can see it clearly. Now
02:24:03.120 let's add the card
02:24:06.040 content. So I'll say card content. And
02:24:09.280 we're going to just add some padding to
02:24:11.840 it because it's all cluttered at the
02:24:13.680 side over here. So we're just going to
02:24:14.720 put a padding a default padding on all
02:24:16.319 directions of 20. And it looks a lot
02:24:18.560 better now. Then we want to put the card
02:24:21.520 title, which uh I guess the card title
02:24:24.880 would be this one over here. And um for
02:24:28.000 the card title, we're going to put a
02:24:30.880 font size to be 20. So it's a little bit
02:24:34.960 bigger. Um then we're going to put a
02:24:38.800 font weight to be
02:24:42.600 bold. Perfect. And oh, I just I wrote
02:24:46.240 card. So let me put card title. And now
02:24:48.560 it actually updates. Then I want to put
02:24:51.200 a margin bottom to be four. And I
02:24:55.359 actually want to make the color of this
02:24:58.000 look a little bit different. I want to
02:24:59.920 put the color and make it be
02:25:03.960 #222 3B. So it's it's not technically
02:25:07.439 black. I don't know if you can even
02:25:08.960 notice that it's not technically black.
02:25:10.640 Now let's copy this and we're going to
02:25:13.600 make a card description. So, card
02:25:16.840 description, the font size will be
02:25:19.120 smaller will be 15. But we're also not
02:25:22.160 going to make it bold. We only want to
02:25:23.840 make the title be bold. So, I'll just
02:25:25.920 delete this. And we'll make a margin
02:25:29.359 bottom of
02:25:31.399 16. And then let's make the color a bit
02:25:34.240 different. I'm going to make it be 6 C 6
02:25:38.600 80. Perfect. It's like a lighter gray.
02:25:42.000 Then we want to make the card
02:25:45.000 footer. And the card footer we need to
02:25:47.680 it's a view. It's not a text or
02:25:49.600 anything. So it's this part over here
02:25:51.200 that encompasses this whole thing. So
02:25:52.960 what we want to do is we want to first
02:25:55.200 put a flex direction, right? We'll put a
02:25:58.080 flex direction of row so that things are
02:25:59.840 actually next to each other. Then we're
02:26:02.880 going to put uh justify content and
02:26:05.520 we'll put space between. You'll see that
02:26:08.319 it will now make a space in between the
02:26:10.080 two different elements uh that are
02:26:12.640 inside of this flex. Then I want to
02:26:15.680 align the items to be center. Perfect.
02:26:20.000 So that it aligns it vertically. Now for
02:26:23.040 the items inside of the footer we have
02:26:25.439 the streak badge. And this one we want
02:26:29.439 to put a flex direction of row. I
02:26:32.880 believe this is also a view. Uh so we'll
02:26:36.240 put it as row and then we'll put align
02:26:39.880 items to be center. We'll put the
02:26:43.680 background
02:26:45.399 color and I'm going to make it a
02:26:47.920 specific color as well. We're going to
02:26:49.520 put #
02:26:53.000 fff30. So there's like a kind of like
02:26:55.840 you know this little orange uh tint to
02:26:59.280 this area just to count your string.
02:27:01.920 Then I'm going to put a border
02:27:06.680 radius of 12 so it doesn't just look
02:27:09.280 like a square. And then let's make the
02:27:13.880 padding horizontal. So this is just a
02:27:16.640 padding on the x direction. We're going
02:27:18.399 to put it as 10. And we'll put a padding
02:27:22.920 vertical as
02:27:25.399 four. Perfect. Now I just I keep putting
02:27:28.479 extra comments. Uh, but then down here,
02:27:31.600 let's make the streak text. So, streak
02:27:35.080 text, I'm going to make this have a
02:27:37.920 margin left of six. So, there's some
02:27:40.479 space from the left. I'm going to put a
02:27:42.399 color to be
02:27:45.479 #
02:27:48.439 FF980. And you'll see that uh this will
02:27:52.240 make it kind of an orange, but not too
02:27:54.240 orange uh not too light such that you
02:27:56.960 can actually see it. Then we're going to
02:27:59.520 make the font be bold so you can see it
02:28:01.680 even better. So font weight, we're going
02:28:03.920 to set it equal to bold. Perfect. Then
02:28:07.600 finally, I'll make the font size be 14.
02:28:10.479 Now, I always recommend using bold
02:28:12.160 overusing bold when you're working with
02:28:13.840 an app because uh differently from like
02:28:16.800 a website uh on your app, making things
02:28:19.840 bold actually looks really really good.
02:28:21.760 Um, so I always tend to hyperfocus on
02:28:24.800 things specific like specific elements
02:28:26.720 that I want to uh be distincted uh or
02:28:30.000 distinctful in the page. I I make it
02:28:33.000 bold. Then I want to copy this whole
02:28:36.720 thing and we're going to make a similar
02:28:38.640 one but for the frequency. So we're
02:28:40.960 going to make a frequency badge and
02:28:43.680 we're going to make a frequency text.
02:28:45.920 Now there are some changes that we were
02:28:47.680 going to make to them, right? So, for
02:28:49.280 example, for the frequency badge, the
02:28:51.359 color is not going to be this. It's
02:28:52.880 going to be
02:28:53.880 ED
02:28:55.960 7F6. What this will do is we'll make it
02:28:58.160 kind of purple. And to match that, we're
02:29:00.560 going to make the color of this one be 7
02:29:02.960 C 4 D FFF, which will make it kind of
02:29:07.280 purple as well. Now another change that
02:29:09.600 we need to make is uh I'm going to
02:29:12.399 remove the flex direction the align
02:29:15.600 items from this and I'm also going to
02:29:18.720 change the horizontal padding to be 12.
02:29:23.040 The padding vertical can be the same.
02:29:24.800 Now the margin left over here doesn't
02:29:26.640 make sense because we only put that here
02:29:29.520 because there's a little icon on the uh
02:29:32.319 streak, right? So we don't need this. So
02:29:34.000 I'll remove it and it will now look a
02:29:35.760 lot better. And also what we can do is
02:29:38.960 you see how there's it says daily
02:29:41.840 because that's that's how we saved it.
02:29:43.359 It's it's capital D and then it's uh the
02:29:46.160 whole word is daily, right? It it has
02:29:48.160 lowercase letters after that. But what
02:29:50.479 we can do which is interesting is we can
02:29:52.479 actually capitalize the whole text. We
02:29:54.560 can use this property called text
02:29:57.479 transform and it allows you to make uh
02:30:00.240 transformations to the capitalization of
02:30:02.319 a word. I can make it uppercase if I
02:30:04.560 wanted to and the whole thing would be
02:30:06.640 transformed into an uppercase letter
02:30:08.399 even though the original string isn't
02:30:10.640 uppercase. Now I just wanted to show
02:30:12.640 this because I think it's cool. Uh but
02:30:14.560 we don't want to do this in our case
02:30:16.399 since it's already good. It's already
02:30:18.080 capital D. Um even though we did this
02:30:20.080 manually, we could have done it through
02:30:21.520 here as well using the capitalize
02:30:23.640 property. So now all we have left is the
02:30:27.680 empty state and the empty state text.
02:30:30.160 So, I'm going to come down here and
02:30:32.080 let's make it an empty
02:30:35.240 state. And I'll make the flex be one.
02:30:38.479 I'll make the justify content be center.
02:30:41.439 And I'll align items to the center cuz
02:30:43.600 to be honest, in an empty um state, we
02:30:47.200 don't want to do too much things. So,
02:30:48.640 we'll say empty
02:30:50.280 state text. And I'll just set the color
02:30:54.560 of it to be a bunch of sixes. So, six
02:30:57.920 six.
02:30:59.840 Now we have our cord done. If I wanted
02:31:02.720 to add another item, another habit, I
02:31:05.280 could come over here and I would add,
02:31:07.840 for example, we added meditating. Let's
02:31:09.760 do
02:31:11.240 drink five gallons. I think five gallons
02:31:14.880 is too much. I think one gallon of water
02:31:16.479 is good, but yeah, drink five gallons of
02:31:18.160 water. I'll make it weekly in this case.
02:31:20.560 So, drink a bunch of
02:31:24.840 water every day.
02:31:29.439 And then I'll make this weekly. It's
02:31:30.960 every day because you can space out the
02:31:32.560 five gallons in your week. Then I'll
02:31:34.560 click add habit. And where is the habit?
02:31:37.439 Well, it's not here, right? Because
02:31:39.359 what's happening is this is fetching the
02:31:42.319 information from our table when this
02:31:45.120 screen is rendered. So right now the
02:31:48.479 screen is not being rendered. It's not
02:31:50.080 fetching the data because it fetched it
02:31:51.600 once, right? When we had the use effect.
02:31:53.840 Only way for it to fetch again is if
02:31:56.479 either you change what the user is by,
02:32:00.640 for example, making the user not be
02:32:03.680 signed in or if you connect uh the your
02:32:08.640 screen to listen to real-time changes in
02:32:11.520 the habits table. So for example, we
02:32:14.399 could force this by making user equal to
02:32:16.760 null. And obviously that would break.
02:32:19.120 Then I'll remove this over here. And
02:32:21.600 you'll see that it will fetch again the
02:32:23.040 data because user changed. But now
02:32:24.560 there's a valid user and we have here.
02:32:26.800 But we want to listen to this
02:32:27.760 automatically. When we change this, we
02:32:30.000 want it to show up over here no matter
02:32:31.680 what. So to do this, here's what we're
02:32:33.760 going to do inside this use effect.
02:32:35.920 We're going to be using this function
02:32:38.640 from um from apprite called the
02:32:41.680 subscribe function. So we're going to
02:32:43.520 make a subscription called the habit
02:32:45.680 subscription. And this is going to
02:32:47.600 actually subscribe to an event that
02:32:49.760 happens in our database table. Now to do
02:32:52.000 that we have to have access to the
02:32:53.600 client. And the client we can access in
02:32:56.160 the apprite. It's this thing that we
02:32:57.920 exported over here. So we're going to
02:33:00.080 say client over here. We're going to
02:33:03.680 import it from apprite. Then we're going
02:33:06.160 to say
02:33:07.319 client.subscribe. Now we have to specify
02:33:09.920 what are we subscribing to. So it's a
02:33:11.840 table in our database. But the thing is
02:33:14.080 to specify what you're subscribing to,
02:33:16.399 you have to actually make this string
02:33:18.080 that is going to let appright know what
02:33:20.880 table and what collection you are
02:33:22.640 subscribing to. So we have to say that
02:33:24.640 we're subscribing to
02:33:26.600 databases. So it's a database. We have
02:33:29.439 to insert here the database ID for the
02:33:31.920 database that we are subscribing to. So
02:33:34.319 we'll insert database ID. Then we want
02:33:37.200 to at another dot put collections and
02:33:40.800 then specify the ID of the collection
02:33:43.680 that we are subscribing to. So I'm going
02:33:45.760 to say
02:33:46.680 habits collection ID and then we want to
02:33:50.160 say that we're subscribing to the
02:33:52.040 documents or to any changes in the
02:33:54.960 documents of this collection. So the
02:33:57.359 whole string would look like this. Um
02:34:00.160 yeah like this. So when this uh client
02:34:05.680 is subscribed, we're going to execute
02:34:08.160 this function over here. So every time
02:34:10.080 there's a change in uh this operation
02:34:13.439 that we're subscribing to this callback
02:34:15.920 function is going to be executed and
02:34:17.680 inside of here we can get the response
02:34:20.560 which we need to make a type for that.
02:34:22.399 I'm going to make it on the app right uh
02:34:24.720 file over here. Uh the type for this
02:34:27.280 it's going to be the following. Uh I'll
02:34:29.040 just make it below this. I'm going to
02:34:31.359 export an interface called real
02:34:35.160 time
02:34:36.760 response and it's going to have a list
02:34:39.280 of events which is a list of strings and
02:34:42.399 it's going to have a payload which we
02:34:43.920 don't know what it's going to be because
02:34:45.439 it depends on what type of response we
02:34:47.600 have but we'll make this be of that
02:34:50.399 type. Now we have to import this from
02:34:53.640 apprite. Now inside of this we have to
02:34:56.240 check for the different operations that
02:34:58.479 might happen to the event. So in this
02:35:00.880 project we have three operations that we
02:35:02.880 want to detect. We want to be able to
02:35:05.439 create a new habit. So when we create a
02:35:07.760 habit we want to detect uh and show that
02:35:10.240 up over here. We want to be able to
02:35:12.160 update it because we want to be able to
02:35:13.840 complete the the habit for the day and
02:35:17.520 increase the streak and also maybe
02:35:20.160 demonstrate that it's completed and also
02:35:22.560 delete it because you can delete a
02:35:24.080 habit. So we have to handle what happens
02:35:26.399 on all of those three scenarios. And in
02:35:28.479 all of those three scenarios, what
02:35:29.680 happens is we just fetch the list of
02:35:31.680 habits again to show the new uh habits
02:35:35.600 list, right? And what I want to do here
02:35:38.000 is I want to create a channel. So I'm
02:35:40.880 going to say channel is equal to and
02:35:43.520 then I want to actually get this list
02:35:47.040 over here. And let's actually extract
02:35:48.720 that and make it into a variable. So I'm
02:35:51.120 going to call it the channel because
02:35:52.160 this is the channel that we're
02:35:53.120 subscribing to. And then I'll just pass
02:35:55.359 this value here instead of making it to
02:35:57.520 the string. And we want to reuse this
02:35:59.840 because then what we can do is in this
02:36:02.160 response we can check if the response
02:36:06.200 dot events
02:36:09.160 do.inccludes and if the event includes a
02:36:12.479 create operation which we can detect by
02:36:15.280 saying databases
02:36:20.280 doall.colctions doall.d
02:36:23.160 documents
02:36:25.800 doall.create and then it will specify
02:36:27.920 that this is just for create operations.
02:36:30.080 Then we want to fetch the habits again.
02:36:33.040 So I'll say fetch habits. Now we can do
02:36:36.240 this as well and you will understand why
02:36:38.080 we're doing this for each of them but
02:36:40.080 we're going to then put an else if and
02:36:43.120 we can put the same thing but instead of
02:36:45.359 saying response.events events, we change
02:36:47.520 this to
02:36:48.520 update and we'll also fetch the habits.
02:36:51.760 And if that there's a delete, we're
02:36:54.720 going to also fetch the habits. Now, the
02:36:57.040 reason why I'm I'm putting specific else
02:36:59.120 ifs for each of them doing the same
02:37:00.960 thing is just because later on we're
02:37:03.520 actually going to have another
02:37:04.800 subscription uh that uh we're not using
02:37:07.680 right now, but we're obviously going to
02:37:08.880 fetch the information of which u habits
02:37:12.160 were completed today. So to do that,
02:37:14.720 we're going to have to have this little
02:37:16.399 if else if else u group over here. Now
02:37:20.080 what we want to do is we actually want
02:37:21.359 to pull this fetch habits the initial
02:37:23.680 one below this. So we're going to put it
02:37:26.160 like right over here. And at the end
02:37:29.840 when after subscribing to it and
02:37:32.880 fetching the habits, we actually want to
02:37:34.560 clean up this use effect just so we
02:37:37.439 avoid any memory leaks. And then for
02:37:39.040 this we'll just say habits subscription.
02:37:42.000 And this function when called will
02:37:44.240 actually cancel and unsubscribe the
02:37:46.880 subscription. So now if everything seems
02:37:49.760 to be working, we can go here and add a
02:37:52.000 new habit. So let me add a habit over
02:37:53.920 here. Let's make it 100 push-ups. And
02:37:57.520 I'll put here do 100 push-ups every day.
02:38:02.479 Make it daily. Click add habit. And it's
02:38:05.200 broken. So I figure out why it's broken.
02:38:07.760 we have to actually wrap this whole
02:38:09.920 thing around with an
02:38:12.359 if
02:38:14.359 user just to detect if the user is
02:38:16.960 actually here and we'll put this and now
02:38:21.280 it should be working. So, when I come
02:38:23.280 over here to add habit and I delete this
02:38:25.600 and I add I don't know, let me think of
02:38:27.120 another habit. Uh, I've done meditation.
02:38:29.600 I've done adding push-ups. I'll do okay
02:38:33.240 workout and I'll put
02:38:35.560 here do push pull legs uh split. I don't
02:38:41.120 know. I'll put it uh daily thing. Add
02:38:43.760 habit. And now we should navigate back
02:38:46.319 to the work to the main page and the new
02:38:50.240 um habit should appear over here. Now
02:38:53.840 this works perfectly. But one thing you
02:38:55.520 might notice is if I come over here and
02:38:57.120 I add a monthly thing like meet up with
02:39:00.960 or actually call an old friend. This
02:39:05.280 might be something cool. Uh call someone
02:39:08.560 you haven't in a while and make that
02:39:12.640 monthly. I click add habit. Where is
02:39:15.359 that? Well, it's down here. But how do
02:39:17.200 how do I scroll it down? There's no way
02:39:19.120 to scroll it down because we didn't make
02:39:20.560 this screen be scrollable. So, how do we
02:39:22.640 do that? So, to do that, we have to come
02:39:24.800 down here and we're going to go to where
02:39:27.040 we we map the list of habits. So, uh
02:39:31.840 probably around here. And we're going to
02:39:33.760 actually make this whole thing be
02:39:36.080 surrounded by a scroll view from React
02:39:38.800 Native. Now, a scroll view is what it's
02:39:41.359 just like what the name implies. It's
02:39:42.960 going to make this whole section be
02:39:44.600 scrollable. Um, you see it already
02:39:47.280 works, but we can specify certain part
02:39:50.080 of it of like what we want to do like
02:39:52.560 the style and so on. So, first of all,
02:39:54.640 when scrolling, I don't want this to
02:39:56.080 look like a website where it shows the
02:39:58.160 this indicator over here. So, we can say
02:40:01.600 that it shows vertical scroll indicator
02:40:05.439 and we'll set it equal to false. And
02:40:07.680 then what happens is guess what? It
02:40:09.520 doesn't show up. Now you can apply other
02:40:11.840 types of um styling to this and maybe we
02:40:14.800 will later on but uh for now we are fine
02:40:18.319 with this. Let's think of what we want
02:40:20.160 to do now. Well the first thing I want
02:40:22.000 to be able to do is delete habit just
02:40:24.720 because it's kind of annoying to have a
02:40:26.160 bunch of habits here. Maybe I want to
02:40:27.520 create some other ones just to practice
02:40:30.000 like how do we do that? Well, to do
02:40:32.000 that, I want to do this thing on this
02:40:35.120 habit screen where if you want to delete
02:40:37.760 a habit, you can swipe it to the left to
02:40:40.399 the right. And if you want to complete a
02:40:42.080 habit, you can swipe it from the right
02:40:43.760 to the left. So, that's something
02:40:45.920 complicated and it exists on a bunch of
02:40:48.479 different apps, but people sometimes
02:40:50.560 don't know how to make this happen. So,
02:40:52.240 I thought it would be a good um thing to
02:40:54.240 teach you guys. So to do that, we're
02:40:56.240 going to be using this um library which
02:41:00.080 is going to help us detect different
02:41:01.920 gestures that the user is making. And
02:41:05.920 the library is going to be called um
02:41:09.120 we're going to install it. It's going to
02:41:10.479 be called React Native
02:41:13.880 Gesture Handler. So we expo install it.
02:41:17.920 It will install it into our project. We
02:41:20.080 do have to go to our layout to actually
02:41:22.319 enable it. So I'm going to go to this
02:41:24.240 layout over here. And what we want to do
02:41:25.760 is we want to above the O provider, I
02:41:28.800 want to add a
02:41:30.840 gestured handler
02:41:33.479 root view. Now this is going to be
02:41:36.880 something that we wrap around the whole
02:41:38.720 thing. Uh not enough provider
02:41:43.160 gestured. I'll just copy this whole
02:41:45.200 thing. And I want to self-close it.
02:41:48.080 Perfect. And we want to import this from
02:41:52.240 not from that. Let's import it
02:41:55.640 from let's say
02:41:58.120 React native gesture handler. And we
02:42:01.280 want to import the
02:42:04.200 gesture handler root view. Perfect. Uh
02:42:09.680 oh, I wrote it wrong. That's why it
02:42:11.359 wasn't autoimp importing. But perfect.
02:42:13.760 Now in this root view, we do have to
02:42:15.439 pass a style to it. or you don't have
02:42:17.439 to, but I want to specifically just make
02:42:19.200 the
02:42:20.040 flex be equal to one. Um, so we'll say
02:42:24.439 flex is equal to one. And I'll set this
02:42:27.680 equal here. Perfect. Now inside of this
02:42:32.640 anywhere in our app, we can detect
02:42:34.880 different uh gestures that the user is
02:42:38.319 um making. The one that we want to do is
02:42:41.040 we want to detect when they gesture a
02:42:43.359 different habit from the right to left
02:42:45.600 or from the left to right. Now, inside
02:42:47.680 of the habits list over here, we're
02:42:49.439 going to map each habit and wrapping
02:42:51.439 around the habit card. I want to make
02:42:53.840 this be a swipeable component. So, I'll
02:42:56.880 just wrap this whole thing around with
02:42:59.120 the swipeable. And in the swipeable over
02:43:02.880 here, I want to set a couple properties.
02:43:05.439 The first property I want to set is I
02:43:07.760 want to make a ref. And a ref is a
02:43:10.399 reference to which um so which of the
02:43:14.720 individual habits I'm applying this
02:43:18.240 gesture handling. So to do that I
02:43:20.640 actually need to make a list of
02:43:23.600 different uh cards that I'm going to
02:43:25.920 store inside of a use ref. So we're
02:43:28.880 going to be using one of React's core
02:43:30.479 hooks called the user ref hook. We're
02:43:32.319 going to make a list of the elements by
02:43:35.439 making a swipeable ref list. So,
02:43:38.240 swipeable um refs. We're going to set
02:43:40.960 this equal to uh use
02:43:44.520 ref. And in this ref, we need to pass a
02:43:47.760 type to it. We're going to initialize it
02:43:49.680 as just an empty object, but we can make
02:43:52.399 it into actually of the following type.
02:43:55.040 It's going to be a key value pair. The
02:43:57.520 key is going to have a string type and
02:43:59.920 the value is going to be of type
02:44:02.920 swipeable. Then, we're going to make
02:44:04.880 this possibly null if there's any
02:44:06.640 issues. And I do need to actually wrap
02:44:09.359 this around with uh curly braces because
02:44:11.680 it's an object. Then on swipeable refs,
02:44:14.720 we actually want to use that to assign
02:44:16.640 each individual um habit into its own
02:44:20.240 ref. So, how am I going to do that is
02:44:22.240 this ref uh property over here allows me
02:44:24.560 to put a callback function that will
02:44:28.000 allow me to set the current value of
02:44:31.200 this swipable refs uh reference list to
02:44:36.160 have to have the individual current
02:44:39.479 property have a key which is the ID of
02:44:42.800 this habit. So I'll say habit do id and
02:44:46.800 the value is going to be the reference
02:44:49.520 of this element that I can get it from
02:44:51.439 here. So I'll set it equal to ref. Then
02:44:54.240 I need to pass a key to this um
02:44:58.319 swipeable. That's why we didn't pass a
02:45:00.160 key to the surface just because uh we
02:45:02.960 were going to pass it eventually to the
02:45:04.319 swipeable component which is the uh
02:45:07.279 parent of this. Actually we passed it to
02:45:08.960 the view over here. It was before we put
02:45:11.120 the surface. So I'm going to remove
02:45:12.640 that. I'm going to put it here. And um
02:45:15.680 actually this has to be outside of this
02:45:18.960 function over here. I didn't realize we
02:45:20.319 were making that inside of the function.
02:45:22.160 Then below this we actually have to
02:45:24.960 we're going to put the following
02:45:26.720 properties. We're going to put an
02:45:28.279 overshoot left to be equal to false. So
02:45:32.000 we don't actually detect like we don't
02:45:34.640 want the swiping to be very responsive.
02:45:37.920 We want it to be just as much as the
02:45:40.640 user is actually swiping. If we
02:45:42.160 overshoot it to left or to right, which
02:45:44.640 we also need to do, it will actually
02:45:47.120 increase the or decrease the friction of
02:45:49.600 which the user is swiping and it might
02:45:52.479 cause them to accidentally swipe an
02:45:54.160 event uh which might not be something
02:45:56.560 that they want to do. We want it to be
02:45:57.920 literally you swipe and you make sure
02:45:59.760 that you're swiping uh before deleting
02:46:02.319 or completing a task. Then we want to
02:46:05.680 render how the uh like how the card is
02:46:10.479 going to look like when the user swipes
02:46:13.600 to the left or to the right. So we can
02:46:16.240 actually change the styling of it and
02:46:18.000 render a component or a view um
02:46:21.359 depending on which side they are
02:46:22.880 swiping. So the way we do this is we
02:46:25.040 come over here and we can pass a render
02:46:27.840 left actions and we can pass a render
02:46:30.399 right actions. Then we create functions
02:46:33.920 that will render those like how the view
02:46:37.200 is going to look like when the user is
02:46:39.040 swiping from the left and from the
02:46:40.640 right. So I'm going to create a render
02:46:42.319 left um actions uh for this one. I'll
02:46:46.960 just copy this and paste it here. And
02:46:48.640 I'll also do the same thing. Then up
02:46:50.960 here we want to make those functions and
02:46:54.640 style those views. So we'll paste the
02:46:56.720 render right
02:46:59.080 action and I'll make the same thing but
02:47:02.479 for the left action. Now I understand
02:47:04.880 this library is kind of confusing and I
02:47:06.880 wouldn't worry that much about it. It's
02:47:08.080 just for specific use cases. You might
02:47:09.920 not even use it again. Uh but for this
02:47:12.640 use case we we have to do this. Now the
02:47:16.000 way we style it is for the write action.
02:47:19.120 I'm actually going to just remove this
02:47:21.600 and make it into parenthesis because
02:47:23.120 we're returning some some JSX, right?
02:47:26.240 And we'll return a view which inside of
02:47:29.359 it, it's going to have an icon. The icon
02:47:32.080 we want to use is a material community
02:47:34.319 icons which is going to be a check mark.
02:47:37.600 So the name of this icon is going to be
02:47:39.439 a check circle outline. We're going to
02:47:43.040 put a size of it to be
02:47:44.920 32. And we'll put a color of it. And the
02:47:47.920 color we are going to make it be #
02:47:52.279 fff. Now we'll also put some styling to
02:47:55.920 it later on. But for now, we'll just
02:47:58.000 copy this and we'll put it here.
02:48:01.920 And on this one, instead of using the
02:48:04.800 check, we're actually going to make the
02:48:07.399 trash can outline because swiping on the
02:48:11.840 left deletes a habit and swiping on the
02:48:14.479 right just completes it, right? So those
02:48:17.040 icons make sense. So you can see that
02:48:18.560 now if I swipe it, uh the icon appears
02:48:21.040 on the left for the trash can and the
02:48:23.279 icon appears on the right for the check
02:48:24.960 mark. Now the reason why I made it white
02:48:27.040 is just because uh we're going to make
02:48:29.040 the background of them be different
02:48:30.720 colors. So for the view over here, we're
02:48:33.120 going to put uh for the right action,
02:48:34.479 we're going to put a style. And we're
02:48:36.160 going to create a style called
02:48:39.240 swipe
02:48:40.840 action right. We'll do the exact same
02:48:44.000 thing on the left over
02:48:45.960 here. And uh we should just need to
02:48:48.319 change this to
02:48:49.960 left. And we'll come down here and we'll
02:48:52.880 make those two. So, let's make a
02:48:56.520 swipe
02:48:58.120 left or action
02:49:01.640 left. And let's duplicate this and make
02:49:05.359 one for the
02:49:08.520 right. Perfect. Now, for the uh left,
02:49:12.479 this is the one that we're going to uh I
02:49:15.840 believe have the trash can. So, we want
02:49:17.680 to first just style the content of it.
02:49:21.040 So, the container of it. We're going to
02:49:22.240 justify stuff to the center. So the
02:49:23.840 trash can is now in the middle. Then we
02:49:26.319 want to align the
02:49:28.600 items to be at flex
02:49:31.479 end and we want the flex of it to be
02:49:34.960 one. Now the reason for that is because
02:49:36.640 when you're swiping you want it to go
02:49:39.040 all the way and if you don't do that
02:49:41.200 then it won't actually allow you to uh
02:49:43.840 swipe it completely. Now it's stuck at
02:49:46.160 that point but when we finish adding the
02:49:47.840 style you'll see what I what will look
02:49:49.920 like. Now I'm going to put a background
02:49:53.399 color and make it be white or green. No,
02:49:57.920 actually this is the trash can. So let's
02:49:59.279 make it be red. And I have this red
02:50:01.200 color over here which is going to be 4 C
02:50:03.479 AF 50. No, sorry. This is actually the
02:50:06.720 color for the for the green. I'll even
02:50:09.200 copy and paste it here. Uh for the check
02:50:12.319 mark, sorry. For the red one, the trash
02:50:14.720 can, we're going to make
02:50:16.920 E53
02:50:19.720 935. And it will have this little cool
02:50:22.479 red color. Now, after this, we want to
02:50:25.520 put a
02:50:26.840 border radius of 18. And we want to put
02:50:32.080 a margin bottom of 18 as well. A margin
02:50:38.160 top of two and a padding right of
02:50:44.279 16. And this is how it's going to look
02:50:46.479 like. Then we can swipe it back and up.
02:50:48.720 So it kind of looks uh it kind of looks
02:50:51.840 pretty nice. Um now let's copy all of
02:50:55.760 this. Uh I'll just keep the color the
02:50:58.960 same. We're going to put the exact same
02:51:00.319 thing for the right, but this time it
02:51:03.439 looks like this. And on this one, it
02:51:05.200 looks like this. Now, uh I was
02:51:06.960 accidentally putting the styling for the
02:51:08.800 trash can uh on the other way. So, we
02:51:11.359 actually want to put this at the start,
02:51:13.359 not at the flex end. So, we'll put flex
02:51:16.160 start and then it will be here. But on
02:51:18.240 the check mark, it will be at the end.
02:51:20.000 And that means that actually we don't
02:51:21.760 want to put a padding right, we want to
02:51:23.279 put a padding left.
02:51:25.680 And you see now the trash can and the
02:51:28.560 check mark appear pretty nicely. Great.
02:51:31.680 But nothing is happening, right? Nothing
02:51:33.200 is happening when I'm swiping. We're not
02:51:34.800 deleting and we're not completing. So,
02:51:36.720 how are we going to actually complete
02:51:38.560 and delete a a habit? Now, let's start
02:51:41.200 with the delete cuz it's the easiest
02:51:43.200 one. for the delete. What I want to do
02:51:46.319 is I want to create this function up
02:51:50.680 here which is going to I'll make it
02:51:53.520 above the render right function which is
02:51:55.840 going to be called handle delete habit
02:51:59.680 and it's going to be an async function
02:52:02.560 that is going to call apprite and
02:52:05.040 actually delete the habit from our
02:52:06.880 database. Now on our styling over here,
02:52:10.319 on our swipeable over here, I'm going to
02:52:12.960 run this prop called on swipeable open.
02:52:17.520 And this will run every time you're
02:52:20.800 swiping for a direction either left or
02:52:22.960 right. Now, which direction do we know?
02:52:25.200 Uh well, you get it directly from this
02:52:28.000 um argument. It provides you a direction
02:52:30.319 over here. So we can detect it by saying
02:52:33.640 if direction is equal to
02:52:39.399 left then do something which in our case
02:52:42.399 is called a handle delete habit. But if
02:52:45.680 it's not then we're going to create
02:52:48.080 later on a function for the handle
02:52:50.160 complete habit. But we'll start with
02:52:51.600 this one. Also when we are deleting a
02:52:53.840 habit we need to know which habit we're
02:52:55.279 deleting. So in this handle delete
02:52:57.520 function we need to grab the id of the
02:53:01.160 habit. So in here we need to pass that
02:53:04.640 ID by saying habit do id. Perfect. Now
02:53:09.439 let's go back here and to delete an a a
02:53:12.960 document in your collection you can run
02:53:15.479 try and
02:53:17.720 catch. We'll put an error here. And when
02:53:21.520 we try this, we're going to await
02:53:25.560 databases and we're going to call the
02:53:28.080 delete document function. Similar to the
02:53:30.720 other operations, we have to specify the
02:53:32.880 database ID, the habits collection ID,
02:53:36.640 and we have to specify the ID of the
02:53:39.359 habit or the ID of the document we're
02:53:41.680 trying to delete, which we can just get
02:53:43.120 from the ID of this
02:53:45.479 function. Perfect. Now, if there's any
02:53:47.920 errors, to be honest, uh this isn't a
02:53:50.080 core functionality, so I don't need to
02:53:51.680 show anything. So, I'm just going to
02:53:53.279 console
02:53:56.520 error the actual error
02:53:59.720 message. Actually, I'll just console log
02:54:01.760 the error. Perfect. Now, let's try to
02:54:04.720 see if this works. Let's delete
02:54:07.560 the the workout. I don't like this one.
02:54:10.319 I'll swipe right. And you see that and
02:54:14.479 now accidentally the uh call an old
02:54:18.080 friend uh habit was the one selected
02:54:21.040 because the actual uh habit that we had
02:54:24.560 before was actually deleted. It's not
02:54:26.640 here anymore. We can't find it anywhere.
02:54:29.120 So we successfully deleted the habit.
02:54:31.200 But the reason why the when we swiped
02:54:35.040 the call an old friend one was the one
02:54:37.439 that was uh fully swiped instead is
02:54:40.640 because uh if you remember we have this
02:54:43.040 list of reps right and this is what
02:54:45.040 detects which habit we're trying to
02:54:46.560 delete. Uh when we deleted the fourth uh
02:54:50.240 habit over here uh that meant that the
02:54:53.040 ID of that um ref got removed from the
02:54:57.520 list but we didn't actually change it.
02:55:00.240 So now since this is the fourth element
02:55:02.640 because that the the one before it was
02:55:04.160 deleted now this was the one that is
02:55:06.080 swiped if you know what I mean right
02:55:07.439 it's it it just switched. So we actually
02:55:09.680 have to also tell the list uh that it is
02:55:13.840 updated. So how do we do that? Well on
02:55:16.479 the swipeable open over here after
02:55:19.600 either direction is handled we're going
02:55:21.439 to call the swipeable refs and we're
02:55:23.439 going to say current. We're going to get
02:55:25.760 the current habit ID. So to get the
02:55:29.040 current uh swipeable element and we can
02:55:32.399 actually forcefully close it so that the
02:55:35.359 last element isn't already uh open when
02:55:37.840 we try. So let's delete one over here.
02:55:40.080 I'm going to delete the 100 push-ups.
02:55:42.880 And you see it goes back automatically.
02:55:44.880 It closes and it actually deletes the
02:55:47.920 item. Perfect. Now let's start handling
02:55:51.279 the other action which is the ability to
02:55:53.600 complete a habit. Now to do this, we
02:55:56.319 actually want to keep track of all the
02:55:57.840 habits that are completed. Now I'll do
02:56:01.200 that actually by creating a new
02:56:03.279 collection in our ha habits database. So
02:56:06.479 I'm going to create a collection and I'm
02:56:08.160 going to call it habit
02:56:10.680 completions. Now the reason why we're
02:56:12.720 creating this is that it's going to be
02:56:15.359 such a specific thing for us to keep
02:56:17.680 track of which is going to be a lot
02:56:19.279 easier for us to then get this data
02:56:21.279 whenever we need it. So this table or
02:56:23.600 this collection is going to look very
02:56:25.439 simple. It's going to have three
02:56:26.560 attributes. The first one is going to be
02:56:28.319 a habit ID to reference which habit
02:56:30.960 we're trying to complete. We'll put the
02:56:32.800 size again to be a thousand or
02:56:34.560 something. We'll make it required. The
02:56:37.439 second attribute is going to again be a
02:56:39.840 string, but this one is going to
02:56:41.520 reference which user completed this
02:56:43.600 habit. So we're going to put a user ID
02:56:46.080 with a size of a,000 and it's required.
02:56:50.240 Now the last thing we need to know is
02:56:52.000 just when this habit was completed. So
02:56:54.560 we're going to put a completed at
02:56:57.640 property a size of a th00and and it's
02:57:00.880 also required. Now this is all we need
02:57:03.760 to know. Now we need to keep track of
02:57:06.000 the habits completion ID. So we're going
02:57:08.240 to copy this collections ID. We're going
02:57:10.960 to go back to our table. And in here,
02:57:13.600 we're going to go to the uh apprite
02:57:17.120 file. And actually, we need to put it in
02:57:19.680 our env file first. So, I'm actually
02:57:22.720 going to put it here. Going to copy
02:57:24.720 this. I'm going to change this to habits
02:57:28.479 uh to completions. Actually, let's call
02:57:30.240 it
02:57:31.319 completions. So, the completions
02:57:33.439 collection. And we're going to paste
02:57:34.880 this ID in here. Then let's go to our
02:57:38.720 apprite f uh file and let's export this
02:57:43.439 ID. So I'm going to copy this. Going to
02:57:46.720 call this the
02:57:49.880 completions collection ID. And then on
02:57:52.240 this one we'll change this to
02:57:54.160 completions as
02:57:56.040 well. Perfect. Now let's go to our
02:58:00.840 index.tsx. And in here, we want to
02:58:03.279 create a function that is going to be
02:58:05.359 similar to the handle delete habit, but
02:58:07.279 it's going to be a little bit more
02:58:08.560 intricate. So, we're going to call it
02:58:10.240 the handle
02:58:12.520 complete habit. And it's also going to
02:58:15.520 take in an ID, but instead of deleting a
02:58:18.319 document, we want to create a document.
02:58:21.600 We want to actually insert uh this habit
02:58:24.479 into the list of completed habits. So,
02:58:27.279 we're going to change this collection ID
02:58:28.960 to be completions collection ID instead.
02:58:32.720 And we do want to pass an ID here, but
02:58:35.279 it's not the ID of the habit we are
02:58:37.920 completing because that is going to go
02:58:40.479 in the actual payload that we're
02:58:42.720 sending. The ID of this is just going to
02:58:44.800 be an ID that we generate for this
02:58:46.560 table. So, we're going to say ID dot
02:58:50.040 unique. And then in here I want to pass
02:58:53.040 a habit ID and that's going to be equal
02:58:55.920 to the ID that we have from the
02:58:57.520 function. Then a user ID which has to be
02:59:02.000 equal to the user do ID but we have to
02:59:06.640 uh let's assert that the user exists
02:59:08.479 first. Let's actually uh come over here
02:59:11.279 and just say if not user then return. So
02:59:15.600 we skip this and now we don't have to
02:59:18.399 put that question mark and then we'll
02:59:21.040 pass a completed at. And the completed
02:59:23.520 at is going to be the current moment,
02:59:25.200 right? Because this function is going to
02:59:26.800 be called when the user completes the
02:59:28.399 action. So uh it's going to be a new
02:59:32.359 date to string. Perfect. Now when you
02:59:37.040 when a user completes u a habit, we
02:59:41.359 don't want it to just insert the new
02:59:43.200 habit on the habits completion. That's
02:59:44.800 just part of one of the things we want
02:59:46.399 to do. The other thing is we actually
02:59:48.080 want to update the habits table because
02:59:50.560 if you remember this table has a couple
02:59:52.880 attributes that are important. For
02:59:54.560 example, the street count should
02:59:56.080 increase, the last completed should
02:59:58.160 change and yeah, I think those two only
03:00:01.040 to be honest, but yeah, the street count
03:00:02.720 should increase so that we know that the
03:00:04.399 user now completed an extra day and the
03:00:06.560 last completed will let us know if the
03:00:08.640 user completed the um habit in the
03:00:12.080 current day. So what we do is after this
03:00:15.920 uh await over here we want to grab the
03:00:18.640 specific habit that oh I need to
03:00:21.359 actually come out of this. So here we
03:00:23.520 want to grab this specific habit that we
03:00:26.479 want to increase the streak of. So we're
03:00:28.160 going to say const habit is equal to
03:00:29.840 habits.find find and we'll find the
03:00:33.120 habit that has the h equal to the habit
03:00:39.920 do ID equal to the ID of this function.
03:00:44.240 So we just found the habit that we are
03:00:46.160 trying to complete. Then if for some
03:00:49.279 reason we didn't find any habits then
03:00:51.600 we'll just return and continue forward
03:00:54.240 and not actually do anything. But if we
03:00:57.680 do have a habit, then we want to call
03:01:00.200 await
03:01:02.359 databases.update document. And on this
03:01:04.720 update document, we want to pass the
03:01:07.439 database ID and the habits collection ID
03:01:10.800 since we're updating the habits
03:01:12.040 collection. And we want to specify which
03:01:15.120 document we want to update. So in the
03:01:16.640 update function you pass uh obviously
03:01:19.279 these two things that you pass on every
03:01:20.720 function but you have to pass the id of
03:01:22.479 the h of the document you want to update
03:01:24.479 which in our case is just ID it's the
03:01:26.720 thing we have here as an argument to
03:01:28.240 this function and then you have to pass
03:01:30.000 a payload and this payload is just going
03:01:32.080 to be what part of this document you
03:01:34.240 want to update whatever payload you pass
03:01:36.319 here whatever fields you pass will be
03:01:38.160 updated so the only two fields we want
03:01:39.840 to update is the streak count which we
03:01:44.080 want to make it equal to we're going to
03:01:46.240 basically increase it by one. So we do
03:01:49.200 have its current value because we just
03:01:52.080 currently got the habit from here,
03:01:54.000 right? So we can just say streak count
03:01:56.960 now will be habit dot streak count but
03:02:00.240 plus one. So we just increase it by one.
03:02:03.359 Now the second thing we want to update
03:02:04.720 is the last completed. We want to set it
03:02:08.000 equal to the current date. So I'm going
03:02:10.160 to say new
03:02:11.960 date equal to ISO string. Perfect. Now I
03:02:17.279 just realized as well that uh we were we
03:02:19.840 want to we definitely want to use the
03:02:21.200 same date for both of them. So what I
03:02:23.120 want to do is I want to actually get the
03:02:25.200 current date and set it equal to this
03:02:29.920 and then just reuse it twice so we don't
03:02:31.680 have any mis mismatches in between those
03:02:34.680 dates. Perfect. Now, if there's an
03:02:37.120 error, we'll just console log it and
03:02:38.800 it's fine. So, let's see if this works.
03:02:41.439 I'm going to call this when the
03:02:44.240 direction is is right. So, we're going
03:02:47.040 to say if else if direction is equal to
03:02:53.160 write, then we're going to call the
03:02:55.840 handle complete habit and we're going to
03:02:57.760 pass the habit do ID. Perfect. Now,
03:03:01.120 let's try completing a habit. Let's try
03:03:03.920 completing this calling an old friend
03:03:06.560 one. So I'm going to put right to left
03:03:09.160 and it says current user is not per
03:03:12.080 authorized to perform the requested
03:03:13.840 action. And the reason for that is
03:03:15.439 because we just made a new collection
03:03:18.560 this uh habit completions but we didn't
03:03:21.359 set up the policies for this collection
03:03:24.960 uh such that it doesn't allow any user
03:03:26.880 to do anything on it. So in the
03:03:29.200 permissions over here, we have to add a
03:03:31.439 role to what we want to allow users to
03:03:34.240 do with this um collection. I'm just
03:03:37.040 going to put all users and all users can
03:03:39.600 create uh read. Actually, I'm just going
03:03:42.479 to say create because I think that's the
03:03:44.080 only thing we're going to do for now. So
03:03:45.600 I'm going to click update and now users
03:03:48.399 are able to create. So let's try
03:03:52.359 again. Yeah, perfect. It worked. Not
03:03:55.520 only it we notice here that this um day
03:03:58.640 streak updated by one because we just
03:04:01.920 updated the the the thing right but also
03:04:04.720 if I go back here um and I go to
03:04:07.439 documents we see that the habit
03:04:08.800 completions u also has a new entry.
03:04:12.359 Perfect now I want to be able to fetch
03:04:15.359 the list of habits that were completed
03:04:17.680 today. Now the reason for that is
03:04:19.760 because of a couple things. First of
03:04:21.359 all, that will allow me to prevent a
03:04:24.080 user from being able to do this and all
03:04:27.040 of a sudden they completed the same uh
03:04:29.279 the same habit twice in the same day.
03:04:31.200 They just keep doing this infinitely.
03:04:33.040 But also because I want to have a
03:04:34.880 special styling when a habit was
03:04:37.040 completed today. So to do that I want to
03:04:40.399 actually create a function somewhere
03:04:42.720 here which is going to be similar to the
03:04:44.720 fetch habits function but it's going to
03:04:46.640 fetch the completed habits or the
03:04:49.279 completed uh yeah the completed habits
03:04:52.080 but for today. So I'm going to call this
03:04:54.760 fetch today
03:04:58.040 completions. Now this is going to be a
03:05:00.479 little bit different. What I want to do
03:05:01.520 is I want to know what today means. So
03:05:04.640 how do we fetch only uh completions that
03:05:08.080 were from today? Well to do that I'm
03:05:10.319 going to say const today is equal to new
03:05:13.240 date. Then I'm going to set the hours of
03:05:16.720 today to be so set hours to be 0 0 0.
03:05:24.319 Then when we are fetching the list of
03:05:26.720 documents in the query over here, which
03:05:29.520 by the way, this isn't going to be for
03:05:30.560 the habits collection. It will be for
03:05:32.399 the completions collection. Um, in the
03:05:37.040 query over here, we want to keep this
03:05:39.359 the same. We want to only query the
03:05:41.600 completions that were from the current
03:05:43.520 user. But we can add another query to
03:05:46.000 this because this is a list of queries,
03:05:47.760 right? And the second query is going to
03:05:49.680 be that we want to only copy or get the
03:05:53.479 completions that happen in the current
03:05:55.920 day. So query
03:05:58.359 dotgrater than or equal to and then
03:06:02.479 we'll put the property of completed at
03:06:05.760 to
03:06:07.000 be greater than or equal to today do two
03:06:12.240 iso string. So what this will do is it
03:06:15.520 will get all of the completions from the
03:06:18.319 completion collection which first of all
03:06:21.120 it was done by the user that is logged
03:06:23.359 in. So we don't get completions from
03:06:24.960 other users so it wouldn't make any
03:06:26.640 sense but also the ones that happened at
03:06:29.520 least after this morning which will only
03:06:32.640 get the completions from today. It
03:06:34.160 obviously won't get any from the future
03:06:35.760 because unless you manually edit the
03:06:37.920 database you should never have a
03:06:39.520 completion from the future right? So
03:06:41.600 only have it for today. And when we get
03:06:44.560 this back, we can grab it by saying con
03:06:49.640 completions is equal to
03:06:52.040 response dot actually we can just set it
03:06:55.120 directly similar to how we did with the
03:06:56.760 habits. Uh we're going to set we're
03:06:59.279 going to have to make a a state for
03:07:01.840 this. I'm going to come here and I'm
03:07:03.200 going to call it the
03:07:06.439 completed habits state and a set
03:07:10.319 completed habits. Now the type of this
03:07:13.120 is going to be a bit different. We're
03:07:14.720 going to create a new type here. Let's
03:07:17.680 export an
03:07:19.640 interface called habit
03:07:22.520 completion. And it will again extend the
03:07:26.840 models
03:07:28.920 document. And what I want this to be is
03:07:31.840 it's going to have a habit ID which is
03:07:34.640 equal to a string, a user ID which is
03:07:38.080 equal to a string and it's going to have
03:07:40.080 a completed at which is equal to a
03:07:43.760 string as well. Now in here we can now
03:07:46.960 use this uh habit completion type and
03:07:50.240 it's going to be a list of it as well.
03:07:51.920 Now, let's use this set habit
03:07:54.000 completions down here to instead of
03:07:56.399 setting the habits, we set the response
03:07:58.880 to documents as a habit completion list.
03:08:03.840 Perfect. Now, to be honest, if I'm
03:08:06.240 thinking about it, when we want to
03:08:08.319 detect if a habit was completed today,
03:08:10.880 it might be easier for us to make this
03:08:13.359 set completed habits um state to instead
03:08:16.479 of being a habit completion type uh
03:08:19.359 array, it just be a list of this of the
03:08:22.880 ids of this habit in the um in this
03:08:27.600 list. So instead of being a list of
03:08:29.279 completed habits, we have a list of
03:08:31.120 their ids. So that when we want to
03:08:34.319 detect if the current habit is
03:08:37.040 completed, we just detect if this list
03:08:39.040 of ids include the ID of the current
03:08:41.359 habit. So instead of doing this over
03:08:43.760 here, let's actually get this. So we'll
03:08:46.720 say completions is equal to this. We're
03:08:49.600 going to just put it over here just so
03:08:51.200 we can make it easier. And then I'm
03:08:53.040 going to transform this completed habits
03:08:55.120 uh which was previously a habit
03:08:57.200 completion type and I'm going to map
03:08:59.120 through it and I'm going to map each
03:09:02.000 completion to become just its id. So I'm
03:09:05.120 going to say habit id and uh now this
03:09:08.960 should be a list of strings with the ids
03:09:11.200 of the habit which is perfect because
03:09:13.200 one of the main things I want to prevent
03:09:14.960 is this uh allowance that we have for mo
03:09:19.439 for basically completing a habit
03:09:22.720 multiple times in the day. So to do that
03:09:25.680 instead to prevent that I can just come
03:09:27.520 to the handle complete habit and
03:09:29.439 prohibit that by saying if the completed
03:09:32.680 habits includes the ID of the current
03:09:36.399 habit. So this over here then return.
03:09:40.000 Now we're not fetching the completed
03:09:42.640 habits yet. So I'm going to actually
03:09:45.279 call it down here similar to what we did
03:09:47.120 with the habits. I'm going to fetch it.
03:09:50.160 And oh, I just realized that we didn't
03:09:52.560 set up a permission for reading on this
03:09:54.720 table as well. I completely missed that.
03:09:57.120 So let's set up a permission for reading
03:10:00.080 so that we don't get any errors. And
03:10:02.319 then now uh it should be fetching that
03:10:04.960 information. So if I try to complete
03:10:07.040 that, it doesn't it actually allows me
03:10:09.680 to maybe it's not actually fetching.
03:10:11.680 Wait, let me do let me comment this out.
03:10:15.680 Save it and then uncomment it and save
03:10:17.680 it. Let's try again.
03:10:19.920 And yeah, now it doesn't work. It was
03:10:21.359 just that um we did we for we we didn't
03:10:23.920 actually we got an error. So we didn't
03:10:25.520 actually fetch the completion again. So
03:10:29.200 you know what that means, right? It
03:10:30.479 means that we're not actually getting
03:10:33.120 the information about the completions in
03:10:35.359 real time. So similar to what we did
03:10:37.359 here with the habits, we want to have a
03:10:39.439 subscription for this new uh completions
03:10:42.240 table. Now what we're going to do is we
03:10:44.319 are going to um create another
03:10:48.120 subscription for but this one is going
03:10:50.240 to be the completion subscription. So
03:10:52.640 I'm going to call this actually you know
03:10:54.319 this channel over here. We're going to
03:10:55.840 call this the
03:10:57.720 habits channel. So we know that this is
03:11:01.040 just the channel for the habits
03:11:03.680 subscription. And we're going to copy
03:11:05.359 this entire logic and we're going to
03:11:06.960 paste it again down here. But we're
03:11:09.279 going to make this into the the
03:11:11.520 completions
03:11:13.319 channel. So we're subscribing to the
03:11:15.760 channel that detects any changes in the
03:11:18.160 completions table. So in the collections
03:11:21.520 ID here, we have to change this to the
03:11:24.439 completions collection ID. This will
03:11:27.680 also change it to the
03:11:29.800 completions
03:11:31.399 subscription and I'll pass the
03:11:34.000 completions channel instead. Now, one
03:11:37.279 thing that is important as well is with
03:11:39.520 a completion uh table, right? We don't
03:11:42.080 want to listen to a create to uh an
03:11:44.240 update or delete. Those those are not
03:11:46.160 actual things that uh we're actually
03:11:49.760 making on that table. We're just
03:11:51.120 creating completions. Um so, we're only
03:11:53.760 going to listen to a create event. And
03:11:56.080 when that happens, we want to fetch the
03:11:58.720 today's completions again. So, we'll
03:12:01.920 fetch the completions one more time. And
03:12:04.640 in the end here, we want to return the
03:12:07.040 unsubscribe function for this
03:12:08.720 subscription. So we'll just return and
03:12:11.520 call the completion subscriptions um
03:12:14.960 again. Perfect. Now let's try and see
03:12:18.000 what happens here. So let me try to
03:12:20.000 complete uh this and we should see that
03:12:24.560 this increased. Now it should have also
03:12:27.439 fetched the today's completions. But one
03:12:29.600 thing that is important is now if I try
03:12:32.000 doing this again, it doesn't actually
03:12:34.560 allow me to because it detected that
03:12:36.720 today we completed this habit. So it
03:12:40.240 won't allow us to pull this trick one
03:12:42.319 more time. So now another way that we
03:12:46.000 can actually separate completed um
03:12:48.399 habits from non-completed habits is we
03:12:50.319 can actually use this information to
03:12:52.000 kind of make the UI look a little bit
03:12:53.840 different if the habit was already
03:12:55.359 completed in the day. So, we're going to
03:12:57.520 actually create here a state um
03:13:01.359 somewhere. It's not going to be a state
03:13:02.479 actually. It's just going to be a
03:13:03.359 boolean called is habit completed. And
03:13:07.120 this is going to be a function that
03:13:08.560 returns a true or false statement of
03:13:10.560 whether or not a habit based on its ID
03:13:13.120 was completed or not. So, we're going to
03:13:15.520 make this into a function that requires
03:13:17.120 a habit ID, which is a string. for us to
03:13:20.160 know if the habit was completed, we
03:13:21.840 literally just have to check in the
03:13:23.279 completed habits array if it includes
03:13:25.760 the ID of this habit. So if it does,
03:13:29.279 then the habit that we are passing in
03:13:31.200 the argument of the function was
03:13:32.880 completed and this should return true.
03:13:35.040 If not, then it will turn false. And we
03:13:37.279 use this inside of our UI. So what I
03:13:40.239 want to do is I actually want to create
03:13:42.560 a version of the UI of this um card to
03:13:46.239 be called the card completed UI. We're
03:13:49.120 going to go to the surface that we have
03:13:50.640 over here. And in the style, instead of
03:13:53.359 passing one style, which is the style
03:13:55.439 for the card, we want to pass an array
03:13:57.760 of
03:13:58.760 styles. So, actually, we'll just keep it
03:14:01.200 the same, but we're going to pass an
03:14:02.239 array in here. So, I'm going to just do
03:14:05.760 this. And we're going to pass two
03:14:08.319 specific styles. The first one is the
03:14:10.560 styles.card, which is the default style.
03:14:13.279 But if the habit completed is true and
03:14:17.359 we do that we find out because we say is
03:14:19.920 habit completed and we pass the habit id
03:14:22.800 here. If that's true then we also want
03:14:26.640 to pass in this array a new style which
03:14:29.359 we're going to call it the card
03:14:32.319 um completed style. Now we don't have
03:14:34.560 that yet. So, we're going to go here to
03:14:36.160 styles and next to the card, I'm going
03:14:38.560 to create a card
03:14:41.800 completed. Now, you'll see that if based
03:14:44.880 on this, I just made the background of
03:14:48.000 the card completed be for example red.
03:14:52.720 I'll just make it red. You see that the
03:14:55.120 the habits that were completed today are
03:14:58.479 now being correctly uh distinguished
03:15:00.880 between the ones that haven't been
03:15:02.239 completed today. So, and by the way, I'm
03:15:05.200 recording this video in with multiple
03:15:07.359 days in the distance. So, uh that's why
03:15:10.000 I haven't actually completed this today.
03:15:11.439 This is already another day. So, I have
03:15:13.439 So, we're correctly detecting if it's a
03:15:15.760 different day. That's why. So, you guys
03:15:17.760 don't get confused with this. So, you
03:15:20.479 know, now we are correctly detecting
03:15:22.000 that. So, what styles do we want to
03:15:23.920 implement for the habits that have been
03:15:25.920 completed? Well, literally all I want to
03:15:27.760 do is I just want to make it a little
03:15:29.200 bit less visible. I'm going to set the
03:15:31.200 opacity to be 60%. And you'll see that
03:15:34.160 now it's clear that the ones that are
03:15:36.160 kind of grayed out are the ones that are
03:15:38.800 completed. Now, one thing we can do as
03:15:40.960 well is we're still going to want to
03:15:42.960 allow swipeable actions, right, when the
03:15:45.760 thing has been completed. Now,
03:15:46.960 obviously, the completed one isn't uh
03:15:49.920 going to increase this the one day
03:15:51.840 streak, but we want to allow the user to
03:15:53.279 be able to delete a habit if that's the
03:15:55.439 case. Now, what I want to do instead is
03:15:57.600 when the user tries to complete a habit
03:15:59.840 that they have already completed, I want
03:16:01.920 the check mark to be replaced with a
03:16:04.080 text saying uh completed or something
03:16:06.640 like that. So, oh, I accidentally
03:16:08.640 deleted that habit. But yeah, so we're
03:16:10.479 going to go to the uh to this over here,
03:16:13.439 the render write action. And in this
03:16:16.479 function, we're going to actually change
03:16:18.160 the argument of it to be to require a a
03:16:21.840 habit ID, which is going to be a string.
03:16:25.439 Now because of this when we call this
03:16:27.920 function we have to change this to
03:16:30.399 return back an anonymous function that
03:16:32.800 passes in the habit do
03:16:36.520 ID. Now in the render write function uh
03:16:40.080 we want to check here
03:16:42.359 if
03:16:44.359 the habit do the if is in habit
03:16:48.960 completed is true and we pass the habit
03:16:51.439 ID in here then we actually want to show
03:16:54.720 a text that will say
03:16:59.160 completed. If not, then we want to show
03:17:02.560 the check mark. And you'll see now that
03:17:04.239 when it's completed, it will say
03:17:05.680 completed. And when it's not, it will
03:17:07.920 show a check mark. Now, obviously, this
03:17:09.600 we need to put a style to it. Um, I to
03:17:12.960 be honest, I can just pass here a quick
03:17:14.720 style. Since it's just going to be a
03:17:15.920 small style, I can just put the color
03:17:17.760 and I'll make it be the same thing cuz
03:17:19.600 it's something that we also did here for
03:17:21.200 the check mark just so we don't have to
03:17:23.680 make an extra style for this. And you
03:17:25.439 see that now it looks a lot better.
03:17:27.600 Perfect. Now we are finally done with
03:17:30.160 this page. We want to now create the
03:17:34.000 last screen that we have which is the
03:17:35.920 streak screen. We have the add habit,
03:17:37.760 the today's habit and now let's make the
03:17:39.760 streak screen. So I'm going to close
03:17:41.359 this. We're going to open up here the
03:17:43.359 streaks um component. Now on this page
03:17:46.560 what I want to do is I want to first get
03:17:50.000 the data about the habits and the
03:17:52.720 completions because what we want to do
03:17:54.720 with this is we want to actually use
03:17:56.640 that data to rank the different habits
03:18:00.080 that uh have been completed just to show
03:18:02.239 the user which habits they're completing
03:18:04.640 more often and more not. So what we do
03:18:07.120 is in here we need that data as well.
03:18:09.680 Now the way we're going to do that is
03:18:11.359 we're going to go to index.tsx tsx and
03:18:14.080 we're going to copy this logic over
03:18:17.120 here. So, we're going to copy this
03:18:18.399 logic. We're going to paste it in here.
03:18:20.880 We're going to copy the use effect. But
03:18:22.880 to do that, there's a bunch of stuff
03:18:24.399 that we have to copy still. We have to
03:18:26.399 copy the the functions, right, for the
03:18:29.359 fetch habits and the fetch to date
03:18:31.479 completions. We're going to copy both of
03:18:33.640 them and we're going to paste it paste
03:18:36.479 it over here. And also, we're going to
03:18:39.120 have to copy the states. So, we're going
03:18:41.600 to copy the habits and the completion
03:18:44.439 states and as well we're going to put it
03:18:47.520 over here. Now, it's not just copy and
03:18:50.399 paste. We're going to have to make some
03:18:51.439 changes to them. So, first of all, let's
03:18:53.439 import some of the stuff from React. So,
03:18:55.840 like the use state and the use effect
03:18:58.279 hook. Now, we want the habits array to
03:19:02.080 be a list of habits. So, we have to
03:19:03.680 import this type. But the completed
03:19:07.040 habits uh we don't want it to be a list
03:19:10.560 of strings like we were before. Before
03:19:12.640 we're just getting a list of the ids of
03:19:15.040 the habits that were completed. Instead
03:19:17.520 now we want to get the whole data of it.
03:19:19.760 So I'm going to actually make this be of
03:19:21.359 type habit completion. Now to get the
03:19:24.479 user we're going to say const user is
03:19:27.680 equal to use o like we did
03:19:30.279 before. Now perfect. And then we need to
03:19:33.520 get the different types. But the thing
03:19:35.359 is we don't need the logic for the uh
03:19:39.200 subscription on this screen. And the
03:19:41.520 reason for that is because this screen
03:19:44.239 this doesn't matter because we're not
03:19:45.840 interacting on the streak screen. We're
03:19:47.520 not doing anything uh to change the data
03:19:50.000 of the habits or the completions, right?
03:19:52.399 We're not deleting habits or completing
03:19:53.920 habits on the streak screen. That's just
03:19:55.600 to display data. So we want to delete
03:19:57.920 all of this logic over here. We'll
03:20:00.640 delete this as well. We're just going to
03:20:02.960 fetch the habits and the completions in
03:20:06.880 the use effect. So I'll delete this over
03:20:09.680 here. We don't need to return or clean
03:20:11.200 up any subscriptions. And in the we're
03:20:13.840 actually not going to just fetch today's
03:20:15.520 completions. We want to fetch all of the
03:20:17.120 completions. So I'm going to change the
03:20:18.720 name of this function to fetch
03:20:21.239 completions. And on the function over
03:20:24.080 here, we'll have to change the name. And
03:20:26.319 we'll need to change this query a bit
03:20:28.000 because this was just fetching which uh
03:20:30.319 habits were completed for a specific
03:20:32.000 user in today, right? In a specific day
03:20:34.479 or time frame. Now, we don't need this
03:20:37.120 anymore. So, I'm going to delete this.
03:20:39.600 And I want to import all of the apprite
03:20:42.720 stuff. So, I'll import databases. I'll
03:20:44.640 import database ID and completion ID and
03:20:48.640 query as well. But instead of fetching
03:20:52.080 for when the completed is greater than
03:20:54.160 or equal to today, we'll delete that.
03:20:56.399 We'll just get all of the completed
03:20:57.840 habits by the user no matter which day
03:21:00.000 they were completed at. And in the end,
03:21:02.319 I want to set the completed habits to be
03:21:05.600 equal to the completions, not a list of
03:21:08.560 the completed the completion IDs. Uh
03:21:11.520 we'll put the whole completion data
03:21:13.359 inside of here. Perfect. Now, for the
03:21:16.080 habits, uh I think this should pretty
03:21:18.399 much be the same. We don't need to
03:21:19.760 change anything. We just have to import
03:21:21.120 the habit collection ID and we should be
03:21:23.520 good to go. Now in this tricks uh
03:21:25.840 screen, we have the habits and the
03:21:27.600 completed habits arrays and those are
03:21:30.080 filled with the correct data. Now what
03:21:32.319 are we going to start with? Well, let's
03:21:33.840 start with the data that we want to
03:21:36.319 display in our screen for the different
03:21:39.840 habits that were completed. So we're
03:21:41.920 going to have two parts of the screen.
03:21:43.120 If you remember from the from the demo,
03:21:44.880 we're going to have the top over here,
03:21:45.920 which is going to show a rank of the
03:21:47.359 habits that were completed the most. At
03:21:49.439 the bottom, we'll show as well each
03:21:51.200 individual habit and the current streak
03:21:53.279 for it. So, we'll start with the bottom
03:21:55.120 part first, just because it will help us
03:21:57.120 set up for what we need for when we make
03:21:59.040 the top part. So, to do that, I'm going
03:22:01.200 to first just change this to say habit
03:22:05.080 streaks. Just have a nice title title.
03:22:08.080 And then below
03:22:09.720 this, I want to rank the habits. So I'm
03:22:14.399 going to create a function at the top
03:22:17.359 here. Actually, let's just make it below
03:22:19.359 the fetch completion stuff. And I'm
03:22:21.279 going to make this function called get
03:22:24.000 streak data. What this function is going
03:22:26.800 to do is it's going to take a habit ID.
03:22:29.279 And for each habit, it is going to
03:22:32.239 return back the streak for that habit,
03:22:35.040 the best streak for this habit, and the
03:22:37.439 total amount that we have for that habit
03:22:39.760 as well. So in order to do that, we need
03:22:42.720 both the data for the habit itself, but
03:22:46.640 also for all of the times you completed
03:22:49.120 this habit. So we know what was the mo
03:22:51.040 the biggest sequence in which you were
03:22:53.120 completing this habit. Uh so we detect
03:22:55.200 the best streak and the current streak.
03:22:57.520 So the first thing we need to do is we
03:22:59.279 need to get all of the completions for
03:23:00.960 this habit sorted by the date. So we
03:23:04.080 have the habit completions or the uh we
03:23:07.279 have the completions array. So I'm going
03:23:08.640 to call create an array here called
03:23:10.399 habit completions and we're going to set
03:23:12.960 it equal to completed habits dot filter.
03:23:17.359 We're going to filter for each habit
03:23:19.840 with an ID equal to this habit ID. So we
03:23:23.760 only keep the habits that has this ID
03:23:27.439 because remember the completions uh
03:23:29.200 array will will include every single
03:23:31.040 habit that was ever completed. And since
03:23:33.040 this function we want to return the data
03:23:35.040 for each habit, we need to first specify
03:23:37.920 which habit we're talking about. So I'll
03:23:40.160 say C, we only want to filter for when
03:23:42.720 the habit ID is equal to the habit ID of
03:23:47.600 the function.
03:23:49.279 Now when we filter for that now this
03:23:50.880 habit completions will only include this
03:23:53.040 habit inside of it and then we can use
03:23:55.520 the sort function from JavaScript to
03:23:58.160 sort it. Now we have to specify how we
03:24:00.000 want to sort this and the way I'm going
03:24:01.680 to do this is I want to sort it by date.
03:24:03.840 So the easiest way to do this is we have
03:24:05.600 a callback function over here which we
03:24:07.840 can use to compare. You can see even
03:24:09.359 here it shows you compare the first
03:24:11.920 habit which is habit A with the second
03:24:14.479 habit which is habit B. So we're going
03:24:17.120 to grab A and B. And the way we're
03:24:19.439 comparing them is based on the
03:24:22.160 difference in the date of when the habit
03:24:24.960 A and the habit B were completed. So
03:24:27.040 we'll say the new date and we'll pass
03:24:30.880 the completed at value for A dot get
03:24:36.920 time minus and then we'll put the same
03:24:40.640 thing but for B. And that difference is
03:24:43.359 what we sort the array for. And now we
03:24:47.439 have a list of the specific habit sorted
03:24:51.200 by the times in which they were
03:24:53.920 completed. Now we have to check to see
03:24:56.080 if this array is empty because if the
03:24:58.880 habit
03:24:59.880 completions.length is equal to
03:25:02.359 zero, then we just want to return
03:25:05.680 basically a default state to this
03:25:07.680 object. So what's going to happen is
03:25:09.600 this object over here let's just make a
03:25:11.920 simple interface here is going to be
03:25:13.760 called
03:25:15.080 streak data and what it's going to
03:25:18.239 return is it's going to return a streak
03:25:21.760 which is going to be a
03:25:23.479 number a best streak which is also going
03:25:27.439 to be a number and a total which again
03:25:30.880 it's going to be a number. So when we
03:25:33.760 return this we want to use that
03:25:36.160 interface and when we have an empty
03:25:38.560 state we basically want to return the
03:25:41.200 streak to be zero the best streak to be
03:25:45.279 zero as well and the total to be zero as
03:25:48.160 well. Now below this we now can assume
03:25:51.200 that habit completions is not empty and
03:25:53.520 we have the sorted array. Now what do we
03:25:56.000 do with it? Well, we build the streak
03:25:58.720 data at the end. We want to return uh
03:26:01.680 basically an array or an object that is
03:26:04.800 going to look like this. It's going to
03:26:06.080 return a variable called streak, a
03:26:07.760 variable called best streak, and a
03:26:09.200 variable called total. But we don't have
03:26:10.880 those yet. So, we have to build them.
03:26:12.960 So, let's write here build streak
03:26:18.120 data. So, we'll start with uh with
03:26:21.800 streak. We'll create a variable here.
03:26:24.000 Set it equal to zero initially. We'll
03:26:26.399 create a variable for best streak. We'll
03:26:30.399 set it to zero as well. And we'll make
03:26:32.560 one for total. Now total obviously it's
03:26:35.279 going to be the length of the habits
03:26:37.760 completion array because then it's the
03:26:39.840 total amount in which we completed this
03:26:41.760 habit. So we'll say habit
03:26:45.000 completions.length and this is already
03:26:46.800 going to be the total value. Now, in
03:26:49.680 order for us to generate the value for
03:26:52.960 streak and bad streak, we also need to
03:26:54.640 know the last date in which the user
03:26:56.960 completed it. So, we're going to say let
03:26:59.840 last date. We're going to set a type of
03:27:03.520 it to be a date or null because it will
03:27:06.399 start as
03:27:07.800 null and we'll have to calculate that.
03:27:10.439 And we also need to know the current
03:27:12.720 streak. So we'll say current
03:27:14.680 streak is equal to
03:27:19.000 zero. Perfect. Now for us to build this,
03:27:22.800 we have to loop through the habits
03:27:24.399 completion array and detect that
03:27:26.239 information and accumulate for each
03:27:28.479 individual habit. So we're going to say
03:27:30.399 habit completion dot for each and for
03:27:33.760 each habit we'll get the information of
03:27:36.880 it through this completion variable. Now
03:27:40.319 first let's get the date. So we're going
03:27:43.120 to say const date is equal to new
03:27:48.279 date. This is going to give us the date
03:27:51.439 of the completed at for this habit. So
03:27:53.920 we're going to say c do completed at.
03:27:57.680 Then we need to check to see if there is
03:28:00.080 a value for last date. Initially it's
03:28:02.560 no. But as we run through this uh habits
03:28:05.760 completion array as we iterate through
03:28:07.279 it we're going to change that value. So
03:28:09.920 if last date is not null. So if there
03:28:12.319 was a date in which uh the the habit was
03:28:14.960 last completed then we want to get the
03:28:17.640 difference in between the current date
03:28:20.800 of this habit and the last date. So
03:28:24.319 we're going to say diff is equal to um
03:28:29.720 date.get
03:28:31.800 time minus last date do get
03:28:38.200 time. And then we want to wrap this
03:28:42.080 around with some uh parenthesis so we
03:28:44.560 can actually divide it into an actual
03:28:48.720 format that we understand. So we'll
03:28:50.479 divide it by a,000 * 60 * 60 minutes or
03:28:56.080 time 24 hours. Now the reason why this
03:28:59.279 is still giving us error and it's saying
03:29:01.120 property get time doesn't doesn't exist
03:29:02.960 on type never is because we have like
03:29:05.680 even though we're assume we're asserting
03:29:07.600 here that last date is not null. Uh
03:29:10.720 Typescript knows that we never set last
03:29:12.399 day to anything right we set it to null
03:29:14.080 initially but we've never set it again.
03:29:16.000 Later on in this function we are going
03:29:17.920 to set it to something. So this error
03:29:19.680 will go away. So for now just ignore it.
03:29:22.399 Now when we have the difference in time
03:29:24.560 we want to check to see if the
03:29:26.439 difference is less than or equal to 1.5
03:29:30.399 because if it is then we want to
03:29:32.720 increase the streak by one. So we'll say
03:29:35.600 current streak plus or equal to one. Now
03:29:38.800 if it's not we just want to keep current
03:29:41.600 streak to be equal to one. We want to
03:29:43.600 initialize it to one. Now, if there's no
03:29:46.880 last date, right, and here's where we're
03:29:48.960 going to actually set a value for last
03:29:51.200 date. We want to check first to see if
03:29:54.399 the current streak is greater than the
03:29:57.359 best streak because if it is, then we
03:29:59.600 want to change the value for best streak
03:30:03.040 and set it equal to current
03:30:05.800 streak. Now, we updated that value. An
03:30:08.720 easy way to do this would also use the
03:30:10.239 min or ma max functions from math uh
03:30:13.200 which is a library you can access in in
03:30:15.200 JavaScript but I think this way is also
03:30:17.319 intuitive. Now if that's not the case
03:30:21.359 then we want to set the streak equal to
03:30:23.760 the current streak and we'll also set
03:30:26.880 the last date equal to the date and
03:30:30.399 you'll see that now last date is not
03:30:32.560 null and we can access the get time and
03:30:36.239 if all of this is successful in the end
03:30:39.359 we'll get back here uh the data we'll
03:30:42.160 have correctly filled out the data for
03:30:44.960 the habits uh for the street data. Now
03:30:47.840 one thing I just noticed is that it's
03:30:49.760 saying that total is not assignable
03:30:51.840 because if you look at how we define
03:30:53.600 total it assumes to have a completion
03:30:55.680 can be null. Now we can remove this
03:30:58.200 because we already assumed that it is
03:31:01.760 not undefined. Now the reason for that
03:31:04.080 is because when we come here to when we
03:31:06.560 set the states uh we didn't put an
03:31:08.960 initial value to it. We can pass an
03:31:10.880 empty array and now it will allow us to
03:31:15.040 uh pass empty values like for example
03:31:19.600 passing just the length without putting
03:31:21.200 a question mark in here and now total
03:31:23.760 will always be a number. Initially it
03:31:25.520 will be zero but as we filled it out
03:31:27.200 we'll update it. So perfect now we're
03:31:29.520 getting back the correct streak data.
03:31:31.200 Now why did we need this trick data?
03:31:32.960 because now we can create this ranking
03:31:36.800 variable which is going to rank the
03:31:38.960 habits based on its streak data. So I'll
03:31:41.600 do here const habit
03:31:44.920 streaks is equal to habits do map and I
03:31:48.399 want to map through each habit and rank
03:31:50.560 it by its best streak. So for each habit
03:31:55.040 we're going to get back the strict data
03:31:58.000 for that habit. So I'm going to say get
03:31:59.600 streak data and I'll pass the habit ID.
03:32:03.279 And like we know we're going to get the
03:32:04.880 streak, the best streak, and the total.
03:32:06.800 So streak, best streak, and
03:32:10.600 total. And what we're doing here is
03:32:13.680 we're going to
03:32:16.520 return
03:32:18.359 each value based on that. So what I
03:32:22.160 could do actually is I'll return here
03:32:24.399 the habit, the best streak, the streak,
03:32:28.960 and the total. Now you might think this
03:32:31.520 is kind of redundant because we're just
03:32:32.720 getting the streak data for each of them
03:32:34.399 that returning. Well, technically we are
03:32:36.560 getting the habit as as part of the
03:32:38.720 object that we're returning as well.
03:32:40.160 Something we didn't have access to in
03:32:41.840 the streak data. And now we have this
03:32:43.920 habits streaks and we can use that to
03:32:46.800 make the ranked habits because since we
03:32:50.800 know the information of each habit plus
03:32:54.160 their streak data, we can sort through
03:32:58.720 this habit streaks
03:33:00.680 array. And if you remember from what I
03:33:03.040 explained about the sort function, we
03:33:06.080 can compare different two different
03:33:08.960 values in this array based on the A and
03:33:11.760 B. And we put a condition in which we
03:33:13.680 want to compare them. And the comparison
03:33:15.439 we want to do here is we want to rank it
03:33:17.359 based on which habit had the be the
03:33:20.080 longest best streak. So it's a the best
03:33:23.920 streak minus b the best streak. And the
03:33:26.880 difference of that will rank some habits
03:33:29.040 higher than others. And now we have
03:33:32.080 this. We can console log this so you
03:33:34.880 guys can see if it's
03:33:36.279 working. And if I open this up. Wow. It
03:33:40.000 actually looks kind of weird. Wait, let
03:33:41.640 me just do a map here so we can see it
03:33:45.760 better. I'll map through this and I'm
03:33:48.399 going to map based on just
03:33:51.640 the habit dot and then I'll just get the
03:33:55.520 title so you guys can see. We know which
03:33:57.439 habit is the the best one. It's call an
03:34:00.640 old friend. We only have two of them,
03:34:02.080 right? So call an old friend should be
03:34:04.160 Yeah, as you can see it's at the top and
03:34:05.920 then meditate is at the bottom. Perfect.
03:34:08.560 So, we know uh it's correctly ranked.
03:34:11.279 Um, if I actually added a new habit
03:34:13.359 here, let's put drink one gallon of
03:34:18.279 water. Uh, drink a bunch of water. If we
03:34:23.600 add this, the streak will be zero. So,
03:34:27.120 it appears here. If I go to streaks
03:34:28.720 again, and this is not fetching every
03:34:31.840 time. So I technically can just do this
03:34:34.720 like comment something out, save it, it
03:34:36.880 will break and then come back and and
03:34:39.600 you see that uh the drink one gallon of
03:34:42.880 water doesn't even appear in the console
03:34:44.479 log because it's not a completed habit.
03:34:46.239 So it doesn't appear on this. But if I
03:34:48.800 were to go ahead and complete this and
03:34:51.600 now I open this up uh and I go back to
03:34:55.040 streaks then now we see drink one gallon
03:34:58.080 of water as one of the options over
03:34:59.680 here. Perfect. So let's remove this and
03:35:02.800 let's use the ranked habits um to
03:35:05.439 display the habits being ranked in the
03:35:07.439 UI. So below this uh text over here I
03:35:11.200 want to check to see if the
03:35:13.239 habits
03:35:14.760 do length is equal to zero because if it
03:35:19.359 is then this actual screen should just
03:35:22.640 show an empty state. I'm going to add
03:35:24.880 the same empty state we had here. So I'm
03:35:26.800 going to copy the empty state we put
03:35:29.680 here. Where is it? Yeah, it's this. I'll
03:35:32.239 put the exact same
03:35:33.640 thing and we should be good to go. I'll
03:35:36.720 obviously delete the style for now just
03:35:39.040 because we don't have those yet. We'll
03:35:41.760 save it. Now, we do have to pass an
03:35:44.239 alternative to this, which is going to
03:35:46.399 be us map mapping through the ranked
03:35:50.840 habits. And for each element, we're
03:35:54.960 going to return a card. Now a card is
03:35:58.000 going to be a a component that we can
03:36:01.120 get from React Native
03:36:03.319 paper. So I'll just return this for now.
03:36:06.000 We see the error goes away. But one
03:36:08.479 thing we need to do is we need to get
03:36:09.760 back since we're we're looping through
03:36:11.600 the ranked habits, we can get back a
03:36:13.279 bunch of stuff in this function. Uh so
03:36:15.520 we can get back the habit, the streak,
03:36:20.160 the best streak, and the total. We also
03:36:23.520 want to get back here the key for each
03:36:25.960 element. And in this uh card over here,
03:36:29.359 I'm going to again put the parenthesis.
03:36:31.600 I'm going to first pass the key to this
03:36:33.680 just so we can uh remove the annoying
03:36:36.080 warning that it gives us. And inside of
03:36:38.800 this card, I want to put a card dot
03:36:42.960 content. This is a type of a component
03:36:45.120 that we can put. And inside of it, I
03:36:47.760 want to put a text with the title of the
03:36:50.560 habit. So I'm going to say
03:36:52.359 text and then I'll put um the
03:36:57.640 habit.title. So now we now see each of
03:37:00.080 the streaks appearing in order. And now
03:37:02.080 we can see the streaks or the the habits
03:37:04.640 appearing in order. And then below this
03:37:07.200 I'm going to put another text that is
03:37:08.880 going to be the description. So I'm
03:37:10.399 going to say
03:37:13.560 habit.escription. Then we want to put
03:37:15.920 the view which we're going to show the
03:37:18.319 stats for this specific habit. So I'm
03:37:20.560 going to put view over here. And for the
03:37:24.000 first view, uh this is the stats row. So
03:37:27.920 if you think about it, they're going to
03:37:29.359 be three stats, one next to each other
03:37:31.600 on the same row. So I'm going to start
03:37:33.520 with the first one, which is going to be
03:37:35.359 the uh view for the uh current streak.
03:37:39.520 So I'm going to put here a view with a
03:37:43.720 text. And the first text is just going
03:37:46.399 to be the emoji for like fire. and the
03:37:53.479 streak. Perfect. Which all of them for
03:37:55.840 some reason all of them are zero. Then
03:37:58.399 uh we want to put another text which is
03:38:00.560 going to be the text for the best stre
03:38:04.319 uh actually no below this we'll just put
03:38:07.399 current. But then we'll copy this view
03:38:09.920 and we'll put two more. But this one is
03:38:13.439 going to be for the best trick. So,
03:38:15.120 we're going to do uh like a trophy and
03:38:17.920 we're going to change this to best
03:38:20.200 streak. And then we'll change this again
03:38:22.720 to
03:38:23.720 best. And then for the last one, we want
03:38:27.040 to put a like a check mark and we'll put
03:38:29.760 the total. And we'll change this to
03:38:32.160 total as well. And now we see the total
03:38:35.359 amount of streaks, the current streak,
03:38:37.840 and the best streak as well. Now,
03:38:40.479 technically, I haven't completed any of
03:38:43.359 these for multiple days in a row just
03:38:46.160 because of the way I'm recording this
03:38:47.760 video. So, you see that um the if you're
03:38:51.680 doing this all in one day, the value for
03:38:53.600 current and best will always be zero
03:38:55.520 because uh you haven't spent two days in
03:38:58.160 a row actually increasing the habits,
03:39:00.160 right? The the the completions. And I
03:39:02.160 know one of them says five, but that's
03:39:03.680 just because we we increased it to five
03:39:06.600 after we uh implemented the restriction
03:39:11.200 for this habit uh to be able to complete
03:39:13.600 twice on the same day. So now I want to
03:39:16.479 um continue building this part. We have
03:39:19.279 the information for the streaks and for
03:39:21.279 the total. Uh we can actually include
03:39:24.080 already some styling to this and I
03:39:26.640 probably want to do that. I want to
03:39:28.720 start with the style for this card
03:39:31.200 content over here before we continue
03:39:33.120 building the top part. For this section,
03:39:35.760 I want to first set a style which is
03:39:38.960 going to be let's call it
03:39:42.760 styles.habit habit title. Now, I do want
03:39:46.800 to put a stylesheet. So, I'm actually
03:39:48.239 going to just copy this, paste it down
03:39:51.840 here, and then just close this. And I
03:39:55.120 want to import the stylesheet from React
03:39:57.760 Native. So I'm going to go up here.
03:39:59.760 We're gonna import it from React Native.
03:40:02.080 I just realized the text that we
03:40:04.160 imported shouldn't be from React Native.
03:40:06.560 It should be from React Native paper. So
03:40:10.319 let's import it from React Native
03:40:13.000 paper. Which means that now uh in this
03:40:16.720 text we can use some of React Native uh
03:40:20.080 styling. For example, I can put a
03:40:22.640 variant to this. So, I'm going to put a
03:40:25.279 variant of title medium and we'll make
03:40:27.840 it a little bit bigger. I also want to
03:40:29.600 put a styling to this. So, I'll copy the
03:40:31.680 style here. And I'm going to call this
03:40:34.479 the actually this is the one that has to
03:40:36.800 have habit title card content. We don't
03:40:38.640 really need to style it at all. I'm
03:40:40.239 going to delete that. Now, on the
03:40:42.239 description, we're obviously going to
03:40:43.520 change this to habit
03:40:46.680 description. And on the view for the
03:40:49.920 stats, this is a row, right? They're
03:40:52.399 currently in a column. They're one on
03:40:53.760 top of each other, but we're going to
03:40:54.720 change the styling to that to show the
03:40:56.800 to become a row. So, I'm going to call
03:40:58.479 this the stats
03:41:00.120 row. Then, for each of the views here, I
03:41:04.239 want to actually set a background color
03:41:06.000 that is a bit different. So, the first
03:41:08.080 one is going to be just the this one,
03:41:10.640 the uh fire. So, we're going to call
03:41:12.960 this the uh we're going to call it stat
03:41:17.160 badge, and we'll make a version of it
03:41:19.760 for the the best streak, which is going
03:41:22.319 to be a golden version of it. So, I'm
03:41:24.000 going to call it stat badge gold, so we
03:41:26.000 know which is which. And for this one,
03:41:28.800 we're going to call it stat badge green.
03:41:31.600 And the color here is just so we
03:41:33.279 differentiate what we're going to set
03:41:34.319 the background color to. Now, for each
03:41:36.720 of them, we want to basically use the
03:41:38.640 same style. Uh, so we're going to call
03:41:40.319 it
03:41:41.399 stat badge
03:41:44.040 text. And for the bottom thing, we're
03:41:47.680 going to call it a label. So stat
03:41:52.279 label. And we'll copy the same thing and
03:41:55.520 paste it on on this and on this. And
03:41:59.200 I'll copy this as well and paste it on
03:42:02.040 this and on this. Perfect. Now, let's
03:42:05.920 create the actual styles. So, I'm going
03:42:07.840 to come here to the stylesheet and we'll
03:42:09.920 start with the title. The title is just
03:42:12.319 going to have a font weight of
03:42:15.560 bold and the margin bottom of
03:42:21.560 16. Then, we're want to set a card type,
03:42:25.840 which we actually didn't set a style
03:42:29.520 for. So I'm going to actually copy this
03:42:32.239 and I'm going to set here not for the
03:42:35.359 card content for the card we want to
03:42:37.520 actually set. So for this uh card type I
03:42:40.720 actually want to pass two styles. I want
03:42:42.319 to pass the first style which we're
03:42:43.680 going to call it the
03:42:45.239 styles.card which is just for every
03:42:47.120 single card they have the same style.
03:42:48.800 But the second one is I want to
03:42:50.560 implement a different styling depending
03:42:52.560 if it's the first card because the first
03:42:54.479 card is the card with the best streak.
03:42:57.359 Right? So the way we're going to do this
03:42:59.920 is we're going to detect to see if the
03:43:03.000 index or the key actually of this car of
03:43:07.600 this habit is equal to zero it means
03:43:10.319 it's the the card at the top which is
03:43:13.040 the best street card and if that's true
03:43:15.920 then I also want to implement another
03:43:18.520 style called first card. So there's
03:43:22.479 those are both styles that we want to
03:43:24.000 create. So we'll come down here and
03:43:26.560 we'll implement for the card we're going
03:43:28.399 to put a margin bottom of 18, a border
03:43:35.800 radius of uh 18 as well. And oh, I just
03:43:40.640 realized we're doing this inside of the
03:43:42.479 title, which by the way, the title we
03:43:46.000 should this style is actually not for
03:43:48.239 the habit title. It's for this title up
03:43:50.399 at the top over here. So we have to
03:43:52.000 implement it as well.
03:43:53.840 Uh so that's why it appears like that.
03:43:55.840 Also let's put a a styling for this
03:43:57.439 view. Let's call it
03:44:00.040 container. And container you guys know
03:44:02.479 is going to be
03:44:03.880 the like it's it's all almost always the
03:44:06.880 same. It's just a flax of one. A
03:44:10.720 background color to be the color that
03:44:13.520 we've been using all the time. So it's
03:44:16.399 going to be the
03:44:18.279 F5 F5 F5.
03:44:21.680 And then we also want to put a padding
03:44:23.920 of
03:44:25.319 16. Perfect. And then let's put a comma
03:44:28.239 on this. And everything should be fine.
03:44:30.640 Now on the card, let's continue building
03:44:32.800 this. I want to put a different
03:44:34.160 background
03:44:36.520 color. Uh we're going to make it be #
03:44:41.319 fff. Then we'll make an elevation of
03:44:44.479 three.
03:44:46.239 We're going to put the shadow
03:44:49.720 collar to be
03:44:54.760 #000000. Then for the shadow offset,
03:44:59.760 we're going to set a object with a width
03:45:03.680 of zero and a height of two. So we have
03:45:06.560 more control over the shadow. And we'll
03:45:09.199 set a shadow opacity to be equal to
03:45:12.600 0.08. So it's very minimal.
03:45:15.600 Now after that we want to set a shadow
03:45:18.520 radius to be equal to 8. We want to set
03:45:22.160 a
03:45:23.080 border width to be equal to 1. And we'll
03:45:27.040 set a border color to be equal to # f0
03:45:32.239 f0 f0. Perfect. This is the styling I
03:45:35.520 want for each of the habits. Now, below
03:45:38.640 this, like I said, we now detect which
03:45:41.760 is the habit that appears at the top,
03:45:43.199 which by the way, I don't know if you've
03:45:44.720 noticed already, since all of the the
03:45:47.439 streaks are at zero, even the current
03:45:49.920 and the best. Um, it really isn't
03:45:52.640 sorted. But I have another version of
03:45:54.800 this app, which is the one I built
03:45:56.399 before recording this video, which I
03:45:58.000 actually did complete the streaks. It's
03:45:59.520 the same code, but I did complete the
03:46:00.880 streaks multiple times so you guys will
03:46:02.720 see a better uh idea of how this is
03:46:04.800 going to look like when you use the app
03:46:06.479 multiple days in a row. So, we just
03:46:09.279 wanted to highlight the first card so
03:46:12.560 it's very clear to the user which one is
03:46:14.399 the best one. So, we're going to say
03:46:16.239 first
03:46:17.160 card, we'll set a border width to be two
03:46:21.040 and we'll set a border color to be this
03:46:23.439 purple color. So we'll set 7 C 4 D FFF
03:46:30.080 and this will be kind of like this
03:46:31.439 purple shadow to it. Now below this,
03:46:35.359 let's set the styling for the stuff
03:46:37.680 inside of the card. So we'll start with
03:46:39.760 the habit title. This will have a font
03:46:43.199 weight of
03:46:45.239 bold. Then we're going to use the font
03:46:48.680 size of um
03:46:51.640 18. And let's put a margin
03:46:56.120 bottom of two. Perfect. Now for the uh
03:47:01.680 habit description, I'll copy this and
03:47:04.560 I'll just call it
03:47:06.680 description. We want to not set a font
03:47:09.600 weight or a font size. We want to set a
03:47:13.439 color of it. So I'm going to set a color
03:47:15.120 to be
03:47:17.960 #606c 80. So, it's kind of like again
03:47:20.960 that little grayish color. The margin
03:47:23.760 bottom, we can make it a little bit
03:47:24.960 bigger. We'll make it eight. So, there's
03:47:26.479 more space. Not 28, eight. Now, below
03:47:29.920 this, let's make the row. So, this stuff
03:47:32.239 appears one next to each other. One
03:47:34.239 here, one here, and one here. So, I'm
03:47:36.319 going to call this stats row. And to do
03:47:39.439 that, we'll just set the flex direction
03:47:42.640 to be
03:47:44.439 row. Then now they're next to each
03:47:47.040 other, but we need to put a space in
03:47:49.120 between them. So I'm going to justify
03:47:50.479 the content to space
03:47:53.000 between. Now we'll set the margin bottom
03:47:56.720 to be 12 and the margin top to be
03:48:01.880 eight. Now below this, let's set the
03:48:05.120 stat badge, which is the styling for the
03:48:07.840 first one, the the little fire over
03:48:10.720 here. So most of them are going to be
03:48:12.800 pretty much the same. We want to first
03:48:14.880 set a background color. So I'll just
03:48:17.120 copy this. I'll paste it here. And the
03:48:19.600 background color for this one is going
03:48:21.520 to be F
03:48:23.720 FFF 3 E0. So it's kind of like an orange
03:48:28.199 color. Now below this, we want to put a
03:48:31.680 border radius of
03:48:34.199 10. We want to put a padding horizontal
03:48:38.800 of 12. a padding vertical of six. And we
03:48:44.560 want to align the items to the
03:48:48.680 center. And then below this, we'll just
03:48:51.120 set a minimum width of it to be
03:48:54.120 60. Now, we can copy this and put it two
03:48:58.160 more times, but we'll change this to be
03:49:00.160 the stat badge gold and the stat badge
03:49:03.279 green because the stylings are pretty
03:49:05.359 much the same, but the difference is
03:49:06.479 going to be just the size of it and also
03:49:08.880 the color. So for the gold, we want to
03:49:11.120 put a golden color. So the style will be
03:49:13.960 FFF D E7. And you see it's kind of an a
03:49:17.920 yellow instead of an orange. Now for
03:49:19.760 this one, again, it's going to be a bit
03:49:21.760 different. It's going to be
03:49:24.040 E8F
03:49:25.800 5E9 to give it a green look. Now we can
03:49:29.279 go down here and we can add a stat badge
03:49:33.960 text because it's for the first text
03:49:37.439 that appears over here in each of the
03:49:39.199 elements. And for that we're just going
03:49:40.880 to put a font weight of
03:49:43.720 bold. Then we're going to set a font
03:49:47.359 size to be
03:49:49.399 15. And then we're going to set a color
03:49:52.399 to be hashtag
03:49:54.760 2222 3B.
03:49:57.680 Perfect. Now, below this, we want to
03:50:00.640 actually put a label. So, the styling
03:50:02.640 for the label, which will include the
03:50:04.800 margin between the label and the text
03:50:07.520 because it doesn't it looks kind of
03:50:09.279 close to each other. So, we're going to
03:50:10.880 call this stat
03:50:12.600 label. And in here, we don't want to
03:50:15.520 make it be a bold text. We want the font
03:50:18.960 size, which I just realized we already
03:50:20.800 have style here. Uh, I want it to be 11.
03:50:23.359 So, a little bit smaller than the top
03:50:24.800 one. But also I want to set the color to
03:50:27.760 be 888. And I want to set a margin top
03:50:32.000 to be two. Now the font weight even
03:50:34.160 though we don't want it to be bold, we
03:50:35.920 can set a specific value to it. And I'll
03:50:37.920 set 500 cuz I think it looks better this
03:50:40.640 way. Now this is the style for each
03:50:43.199 individual habit streak. Now the thing
03:50:45.760 is uh first first and foremost when we
03:50:48.720 have uh the habits here we let me add a
03:50:52.080 couple other habits. I'm going to add
03:50:53.520 here the uh let's think about it. What
03:50:56.000 habit I want to add? Probably I'll just
03:50:58.880 do the workout because it's one that I
03:51:00.800 haven't added. So workout 5 days a week.
03:51:04.880 We're going to make this weekly and it
03:51:07.040 appears here. And I also probably want
03:51:11.279 to actually yeah I probably want to
03:51:13.040 increase the I want to run the the same
03:51:16.160 kind of subscription ran here. I know I
03:51:18.239 deleted it, but I I realize now that it
03:51:20.479 should probably be included here if you
03:51:21.920 want everything to appear automatically.
03:51:24.080 So, yeah, I'll copy this logic
03:51:26.920 here. And it's it's going to be quick
03:51:29.439 for us to add it. I'll just put it above
03:51:32.439 this. I'll change this to fetch
03:51:36.359 completions. And I'll have to import the
03:51:39.040 client and I'll have to import the
03:51:40.880 real-time
03:51:42.120 response. Um, pretty much the rest is
03:51:45.199 the same. The only thing we need to do
03:51:46.720 now is we have to return
03:51:50.399 uh obviously the cleanup function which
03:51:53.040 is just going to call the habits
03:51:55.680 uh no the is it the habit subscription
03:51:58.399 yeah habits subscription and it's going
03:52:01.600 to call the completion subscription
03:52:04.479 perfect so now we know that uh it will
03:52:07.600 include this but this is why I wanted to
03:52:10.080 to add this so I showed you guys I want
03:52:12.239 to make this scrollable because it is
03:52:14.000 not scrollable right now Right? And uh
03:52:16.800 things can just be messed up if they
03:52:18.640 appear at the bottom here. So to make it
03:52:20.560 scrollable, I'm going to come to the
03:52:23.199 streaks view. Right? And in here, right
03:52:26.479 when we have the ranked habits, I
03:52:28.720 actually want to put a scroll view
03:52:30.800 around this. Similar to what we did on
03:52:33.279 the um on the other component, I want to
03:52:36.560 put a scroll view here. Now, and now I
03:52:39.600 need to wrap this around with uh with
03:52:42.000 some curly braces so that this is actual
03:52:44.279 JavaScript. And we can Oh, I'm not in
03:52:46.880 the right screen. We can now scroll
03:52:48.640 through this. But I do want to put a I
03:52:51.520 want to remove the vertical, right? So,
03:52:53.840 show vertical scroll indicator. I want
03:52:56.080 to set it to false like we did on the
03:52:58.560 other screen. And perfect. Now, I do
03:53:01.359 want to put as well the
03:53:03.840 uh container. Actually, I want to swap
03:53:05.760 this. I want to put this to be over
03:53:08.199 here. Yeah. So, it's it's it's not
03:53:11.199 cluttered at the side. And it looks
03:53:13.359 pretty nice now. Yeah. I like this.
03:53:15.479 Perfect. So, now we can scroll through
03:53:18.160 this and we can see all of the things.
03:53:20.399 But how do we show the ranking of the
03:53:23.600 habits at the top? It's the top part,
03:53:25.840 right? So, that's why I made the scroll
03:53:27.439 view be just the loop of the ranked
03:53:29.520 habits because we're going to have
03:53:30.960 something above it. Now, how do we uh
03:53:33.359 display that information? Well, above
03:53:35.600 the habits.length equal to zero, we want
03:53:38.479 to include that view. So, I'm going to
03:53:41.199 put here if the ranked habits array is
03:53:45.040 not zero. So, if it's greater than
03:53:47.399 zero, then let's display this view. This
03:53:52.080 view is going to be kind of like a
03:53:54.399 table. We're going to style it to look
03:53:56.000 like a table later, but for now, we'll
03:53:57.520 keep it like this. We'll put a text
03:54:00.000 which again is the one from React Native
03:54:01.840 paper which will show this little emoji
03:54:05.920 um for like a metal and it will say top
03:54:10.520 streaks. Uh it should appear at the top
03:54:13.040 here but I just realized that we didn't
03:54:15.520 put a dot length here. Perfect. Yeah.
03:54:19.040 Then below this we want to put we want
03:54:22.000 to loop through the ranked habits and
03:54:24.160 only show the top three habits. So we'll
03:54:28.720 put here ranked habits. We're going to
03:54:31.439 slice this array. Just show the first
03:54:34.000 three. And for each of them, we're going
03:54:36.000 to map and grab each habit and their
03:54:39.800 key. And for each habit, we want to
03:54:42.319 return a
03:54:45.239 view. Now we'll set the key of the view
03:54:47.920 to be equal to the key of the um array.
03:54:51.199 And for each habit, I want to uh display
03:54:55.680 some information about it. For example,
03:54:57.920 uh I pretty much want to display
03:55:00.199 the badge. So like we'll have three
03:55:03.439 different types of badges that we want
03:55:05.600 to include. Um and depending on which
03:55:08.960 kind of badge we want to use, we'll put
03:55:11.920 it over here. So the first uh item will
03:55:16.800 have a specific styling. The second item
03:55:18.800 will have another specific styling. And
03:55:20.960 the third one will have a different one
03:55:22.800 as well. just so we can clearly
03:55:24.479 differentiate who's number one, number
03:55:25.920 two, and number three. So, we'll make
03:55:27.520 here uh an array called badge
03:55:31.080 styles. And we're gonna add a style for
03:55:35.840 the badge first place, the badge second
03:55:38.880 place, and the badge third
03:55:40.680 place. So, we'll do badge two, and badge
03:55:44.560 three.
03:55:46.000 And the way we differentiate them is on
03:55:48.239 the style of this uh not for the this
03:55:51.600 view but for the we're going to put a
03:55:53.520 view below
03:55:54.840 this we want to pass uh actually let me
03:55:59.680 just complete this view. We want to pass
03:56:01.520 a style object here and we'll pass an
03:56:03.880 array which is going to include the
03:56:06.800 generic style for the ranking
03:56:10.199 badge but also we're going to get the
03:56:13.760 individual styling based on which item
03:56:17.199 we are talking about. So the index of
03:56:18.960 the array if it's zero we'll get the
03:56:20.960 badge for the first place. If it's sec
03:56:23.279 uh one we'll get it for the second and
03:56:24.960 if it's two we'll get it for the third
03:56:26.479 place.
03:56:28.359 Now, inside of this view, we're all
03:56:30.880 we're going to do is just put the
03:56:33.359 ranking of it. So, we'll put a text
03:56:35.840 here. And the ranking is going to be if
03:56:38.800 it's first place, second or third. Now,
03:56:40.800 the way we know if it's first, second,
03:56:42.160 or third is by using the key because
03:56:44.479 keys is like the index of the item in
03:56:46.880 the array. Right? So, uh if you know
03:56:49.680 anything about arrays in computer
03:56:51.359 science, they're actually they start
03:56:52.800 from zero. So we do have to increase it
03:56:54.720 by one so that it shows 1 2 3 instead of
03:56:58.000 0 1 and two. Perfect. We're now
03:57:00.399 displaying them in the screen. Now below
03:57:02.800 this view I want to put another text and
03:57:05.439 this will just show the title of the
03:57:06.800 habit. So I'm going to say
03:57:10.600 item.habit.title. And then below this
03:57:12.800 I'll then put the best streak of this
03:57:15.040 habit. So I'm going to say item dot best
03:57:20.760 streak. Perfect. Now all of them
03:57:23.840 obviously have the streak of zero again
03:57:25.760 but uh that's beyond the fact. So now we
03:57:29.120 have successfully made this this section
03:57:31.600 but it doesn't look like what you guys
03:57:32.960 saw in the demo. Well all of that was
03:57:34.800 done with styling. So we're going to add
03:57:37.600 some styles to this. I want to add a
03:57:40.000 style for the total view here. So we're
03:57:42.399 going to put style and we're going to
03:57:44.319 call this the ranking component or the
03:57:47.040 ranking container. So let's say ranking
03:57:49.520 container.
03:57:51.760 Then I want to put one for these text.
03:57:54.160 We're going to call it the ranking
03:57:57.560 title. Uh one for this one. We're going
03:58:00.319 to call it the ranking
03:58:03.800 row.
03:58:05.800 And we already have one for this view,
03:58:08.560 but we need one for the text. We're
03:58:10.239 going to call it the
03:58:12.439 ranking badge
03:58:15.239 text. And then for this two, we're just
03:58:18.960 going to call it the ranking
03:58:21.960 habit and the ranking
03:58:26.760 streak. Then let's go actually let me
03:58:29.680 also add on this text over here. I
03:58:33.359 forgot. Let's put a variant to this.
03:58:35.279 Let's make it headline
03:58:37.399 small. So it's a little bit bigger even
03:58:40.000 though it says small. Just that we now
03:58:41.840 made it into a headline. Perfect. Now
03:58:45.199 let's go down here and let's add the
03:58:47.279 stylings that we just added. So we'll go
03:58:49.600 down here. We'll go to below stat label
03:58:51.439 and let's add a ranking container. This
03:58:55.120 ranking container is going to be what's
03:58:57.439 going to have a margin
03:58:59.800 bottom which is going to be 24. So
03:59:02.960 there's some space in between the the
03:59:05.199 ranking and the bottom list. Then we'll
03:59:08.000 put a background
03:59:09.720 color which is going to be pretty much
03:59:12.640 just white. So
03:59:15.080 fff. Then we're going to have a border
03:59:18.640 radius of
03:59:21.239 16. Which matches the padding that is
03:59:24.160 also going to be
03:59:25.560 16. And then below this, we'll put a
03:59:28.000 shadow color. Actually, I'll just copy.
03:59:29.920 We just have a styling similar to this,
03:59:31.840 right? Uh which one is it? It's this
03:59:33.920 one. I'm going to call copy all of this.
03:59:36.800 And I'm just going to paste it
03:59:39.560 here. Perfect. Now the only change is I
03:59:43.040 want to change the elevation of this to
03:59:45.600 be two instead of three. The shadow
03:59:48.080 quality should be the same. The shadow
03:59:49.760 offset the same padding as well.
03:59:51.439 Everything the same. Uh I don't want to
03:59:53.680 put a border width on this. So I'm going
03:59:56.479 to remove this. Perfect. And I also
03:59:59.680 don't want to put a border color cuz
04:00:00.880 that's I didn't put a border width. Now
04:00:03.439 below this we're going to put a ranking
04:00:05.319 title. And I know it's kind of big but
04:00:07.760 it's because uh they're going to appear
04:00:09.760 on top of each other. But the individual
04:00:11.760 items should be right next to each
04:00:13.199 other. Right? It shouldn't be one and
04:00:15.040 then meditate which is the title of the
04:00:16.720 habit shouldn't appear below. It should
04:00:18.399 appear next to it. So for the ranking
04:00:20.479 title, we're going to put um a font
04:00:23.680 weight to be bold so the top streaks
04:00:26.319 look
04:00:27.479 better. Then below this, we'll put a
04:00:30.399 font size to be 18 so it's
04:00:32.439 bigger. Then margin bottom to be 12.
04:00:37.920 Then color, we're going to set it to be
04:00:43.640 #7c4dfff. So it's kind of purple. And
04:00:46.399 then we can actually put some letter
04:00:48.279 spacing. It will look a lot better with
04:00:50.399 this. Now below this, we want to put the
04:00:54.239 ranking row so things don't look too
04:00:56.319 cluttered and on top of each other. The
04:00:58.399 way we do this is, as always, we set a
04:01:00.319 flex direction to
04:01:01.880 row. And then I want to align the items
04:01:05.680 to the center cuz they're all in the
04:01:07.359 left. So I'm going to say
04:01:09.239 center. And then I want to put a margin
04:01:14.040 bottom to be
04:01:16.439 eight. I want to put a border bottom
04:01:21.120 width to be equal to one. And the reason
04:01:23.359 why I'm doing this is so that it looks
04:01:24.720 like a list, right? And then I want to
04:01:27.359 put a color to it. I'm going to make it
04:01:28.720 kind of um grayish. So, I'm going to say
04:01:35.399 hashtagf. And then below this, I'll just
04:01:38.399 put a padding bottom of eight. Perfect.
04:01:43.040 Now, it actually looks like a
04:01:45.160 list. I'm so tired,
04:01:47.960 bro. Then below this, let's put a
04:01:50.920 ranking
04:01:53.399 badge. We'll set it the width to be 28.
04:01:58.479 Then we'll set the height to be 28 as
04:02:02.000 well. We'll set the border radius to be
04:02:07.560 14. We'll set the align items to be
04:02:12.600 center. Justify
04:02:15.560 uh so justify content to be
04:02:19.720 center. And we're also putting a margin
04:02:23.560 right to be 10 and a
04:02:26.439 background color to be E 0 E 0 E is Z.
04:02:32.399 Perfect. Now I need to change this to
04:02:34.080 height. And now it looks like a circle.
04:02:36.359 Perfect. Now this ranking badge is
04:02:39.120 applied to each of them. But remember we
04:02:41.279 made specific styling for the different
04:02:44.000 positions in this list. We made a r a
04:02:47.120 badge one, a badge two, and a badge
04:02:48.800 three. and it will change the color
04:02:50.640 based on it. So I want to do this. The
04:02:53.120 badge one is going to have a background
04:02:56.520 color of gold because they just they're
04:03:00.160 number one. So I'm going to put
04:03:02.120 FFD 700. This is
04:03:07.239 gold. Perfect. And you see it's kind of
04:03:09.680 yellow. Then I'll copy this and I'll
04:03:12.479 make badge two. It's not going to be
04:03:14.560 gold. It's going to be silver. So I'm
04:03:16.720 going to put a silver color. C 0 C 0 C 0
04:03:20.720 And I'll change this to
04:03:23.160 silver. And then finally, let's make the
04:03:28.600 bronze, which is going to be badge
04:03:32.439 3, and it's going to be CD
04:03:36.760 7F
04:03:38.279 3D2. And it will look kind of bronze.
04:03:41.760 Now, below this, let's just add the
04:03:43.760 styling for the ranking badge text.
04:03:48.560 It's going to have a font weight of
04:03:52.120 bold. It's going to have a color of #
04:03:56.279 fff and a font size of
04:03:59.960 15. So it looks white and it's a little
04:04:02.640 bit bigger. It looks a lot better in my
04:04:04.640 opinion. Now we do have to apply some
04:04:06.080 styling to differentiate this streak and
04:04:08.319 the actual title of the habit. So the
04:04:11.199 ranking
04:04:12.600 habit will have a flex of
04:04:16.040 one and then it will have a font size of
04:04:20.520 15 apply to the whole thing. And we're
04:04:24.399 also going to have a color of
04:04:27.680 #
04:04:28.920 333 and a font
04:04:32.359 weight of 600.
04:04:36.920 Then individually
04:04:39.640 the ranking
04:04:42.760 streak is going to have a font
04:04:45.479 size of
04:04:47.399 14, a color of
04:04:51.960 #7c 4D
04:04:55.000 fff. And we want to put a font weight of
04:04:58.080 bold cuz it's it's purple so it's kind
04:05:00.479 of hard to see. So making it bold will
04:05:02.640 make it easier to see. Now, finally,
04:05:04.720 we're pretty much done with this screen.
04:05:07.920 You can see we can swipe between this
04:05:10.000 and we have the top habit streaks at the
04:05:12.080 top. Uh, and it looks pretty nice,
04:05:14.800 right? We can uh complete different
04:05:17.600 workout, different habits. They now
04:05:19.680 appear here, see automatically. And if I
04:05:24.160 were to actually record this video and
04:05:26.479 complete stuff day after day in a
04:05:28.399 sequence, you would see that we would
04:05:30.000 actually get the information for the
04:05:31.520 streaks. Now, one thing I just noticed
04:05:33.680 is that even though uh we haven't
04:05:36.720 completed stuff in multiple times in a
04:05:38.720 row, uh we should get the values for the
04:05:42.560 current to be at least one cuz we are
04:05:44.560 completing the streaks, right? We we're
04:05:46.640 not registering this correctly. And I
04:05:48.479 just noted that it is because on this if
04:05:51.199 else statement over here, you know how
04:05:53.520 we have this else statement here? This
04:05:56.960 is actually incorrect. The else
04:05:59.199 statement shouldn't be wrapping the
04:06:01.920 around this whole last date um property.
04:06:05.520 It should actually be wrapping around uh
04:06:08.479 we setting the current
04:06:11.000 streak equal to
04:06:13.399 one. And now you'll see that this stuff
04:06:15.760 will update. Now it's still only one.
04:06:18.800 That's the only actually the current
04:06:21.279 this the calling an old friend. Oh yeah,
04:06:23.840 it's detecting the best streak. Uh yeah
04:06:26.800 so that should appear first. Now uh even
04:06:29.279 though the work the current uh values
04:06:31.680 are proper you can see that the colon
04:06:33.760 old friend is appearing at last. Now the
04:06:36.560 way we fix that is actually on this um
04:06:40.000 sort for the ranked habits. We just have
04:06:42.160 to switch the order to be reversed. So
04:06:44.800 we compare B to A instead of A to B. And
04:06:47.680 you'll see that now calling old friend
04:06:49.600 is at the top and it is the top habit.
04:06:52.239 Perfect. I don't even have to show you
04:06:53.840 guys my other um version of this app
04:06:56.640 that has an actual winner. Uh this
04:06:59.439 clearly shows that calling old friend is
04:07:00.960 the habit that has the best streak. Now
04:07:03.040 we have successfully built this app and
04:07:06.000 I know it it took a while and it is a
04:07:08.800 simple app. However, I hope that this
04:07:10.960 has taught you guys a lot about React
04:07:13.120 Native and how to integrate uh integrate
04:07:15.199 React Native in a full stack way. I will
04:07:18.319 also include a link to the part of this
04:07:22.640 rep. So a different branch of this
04:07:24.640 repository for this project in which I
04:07:27.359 actually took this project and I
04:07:30.000 implemented a lot of very specific best
04:07:32.239 practices for you to how to divide your
04:07:34.479 code, you know, make it look um just
04:07:37.439 organize it better using uh some
04:07:39.600 libraries that I think could improve the
04:07:41.199 code and so on. So, if you're interested
04:07:43.120 in that, I don't think it would be um
04:07:45.600 that important for this video just
04:07:47.120 because this video is React Native
04:07:48.880 specific and this changes I'm going to
04:07:51.279 make are actual changes that are just
04:07:53.760 generally React um instead of being
04:07:56.720 something specific for React Native. So,
04:07:58.479 if you want to see this project, but
04:07:59.840 also uh a version of it in which the
04:08:02.000 code is following more best practices
04:08:03.840 and being more organized, feel free to
04:08:05.760 check the code in the description.
04:08:08.080 Again, if you want to check out my new
04:08:09.680 React course for beginners, it doesn't
04:08:11.840 include React Native, but I am preparing
04:08:13.600 a React Native course. Um, feel free to
04:08:16.080 go and click the link in the description
04:08:18.000 and check it out. We do have PPP
04:08:20.080 pricing, which is a thing everyone
04:08:22.160 started asking me about. Um, and we have
04:08:24.479 implemented that. So, if you want to
04:08:25.920 check that out and buy it in your own
04:08:27.840 currency with adaptive pricing depending
04:08:30.560 on how much your currency can afford, of
04:08:33.359 course, feel free to check the link in
04:08:34.800 the description and I'll be really happy
04:08:36.399 to have you guys enroll in the course.
04:08:38.640 And yeah, that's that's basically it.
04:08:40.319 Hope you guys enjoyed this video. Thank
04:08:41.920 you so much for watching and I see you
04:08:43.680 guys next time.