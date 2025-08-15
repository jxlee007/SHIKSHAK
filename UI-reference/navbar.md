# 🧭 Build a Responsive Navigation Menu with Pure CSS – Step-by-Step Guide

---

## ✅ What You’ll Build

A fully responsive vertical sidebar that:

* Stays fixed to the left on desktop
* Slides out on hover to show text
* Uses **Flexbox** for layout
* Moves to the **bottom** of the screen on mobile
* Includes animated icons with **duotone SVGs**
* Uses **CSS variables** and transitions for clean theming

---

## 📁 Step 1: Project Setup

1. **Create your files:**

   * `index.html`
   * `style.css`

2. **Link styles in your HTML head:**

   ```html
   <link rel="stylesheet" href="style.css" />
   ```

3. **Include a Google Font (optional):**

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
   ```

---

## 🏗️ Step 2: HTML Structure

1. **Add boilerplate HTML:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Responsive Sidebar</title>
     <link rel="stylesheet" href="style.css" />
   </head>
   <body>
     <nav class="navbar">
       <ul class="navbar-nav">
         <li class="logo">
           <a href="#" class="nav-link">
             <span class="link-text">Brand</span>
             <svg class="icon" viewBox="0 0 512 512" fill="currentColor">...</svg>
           </a>
         </li>
         <li class="nav-item">
           <a href="#" class="nav-link">
             <span class="link-text">Home</span>
             <svg class="icon" viewBox="0 0 512 512" fill="currentColor">...</svg>
           </a>
         </li>
         <!-- Add more items as needed -->
         <li class="nav-item last">
           <a href="#" class="nav-link">
             <span class="link-text">Logout</span>
             <svg class="icon" viewBox="0 0 512 512" fill="currentColor">...</svg>
           </a>
         </li>
       </ul>
     </nav>
     <main>
       <h1>Main Content</h1>
       <p>Lorem ipsum...</p>
     </main>
   </body>
   </html>
   ```

2. **Add SVGs:** Use [Font Awesome duotone icons](https://fontawesome.com) or your own.

---

## 🎨 Step 3: Define CSS Variables and Base Styles

1. **Set variables and base font:**

   ```css
   :root {
     --background: #1f1f1f;
     --foreground: #fff;
     --accent: #f72585;
     --transition-speed: 600ms;
   }

   body {
     font-family: 'Inter', sans-serif;
     background: var(--background);
     color: var(--foreground);
     margin: 0;
     padding: 0;
     overflow-x: hidden;
   }
   ```

---

## 🧾 Step 4: Main Layout Styling

1. **Style the `main` element so it doesn’t overlap with nav:**

   ```css
   main {
     margin-left: 5rem;
     padding: 1rem;
   }
   ```

2. **Remove scrollbar (optional):**

   ```css
   body::-webkit-scrollbar {
     width: 0.5rem;
   }

   body::-webkit-scrollbar-track {
     background: #1e1e1e;
   }

   body::-webkit-scrollbar-thumb {
     background: var(--accent);
   }
   ```

---

## 🧭 Step 5: Build the Sidebar Navigation

1. **Style the nav bar container:**

   ```css
   .navbar {
     position: fixed;
     top: 0;
     left: 0;
     width: 5rem;
     height: 100vh;
     background: var(--background);
     transition: width var(--transition-speed) ease;
     overflow-x: hidden;
     z-index: 100;
   }

   .navbar:hover {
     width: 16rem;
   }
   ```

2. **Create vertical Flexbox column:**

   ```css
   .navbar-nav {
     list-style: none;
     padding: 0;
     margin: 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     height: 100%;
   }

   .nav-item,
   .logo {
     width: 100%;
   }
   ```

3. **Position last item at bottom:**

   ```css
   .nav-item.last {
     margin-top: auto;
   }
   ```

---

## 🔗 Step 6: Style the Navigation Links

1. **Make links flex rows and center content:**

   ```css
   .nav-link {
     display: flex;
     align-items: center;
     justify-content: space-between;
     height: 5rem;
     color: var(--foreground);
     text-decoration: none;
     transition: background 300ms;
     padding: 0 1rem;
     filter: grayscale(100%) opacity(0.7);
   }

   .nav-link:hover {
     background: var(--accent);
     color: white;
     filter: none;
   }
   ```

2. **Hide text unless hovered:**

   ```css
   .link-text {
     display: none;
     margin-left: 1rem;
   }

   .navbar:hover .link-text {
     display: inline;
   }
   ```

---

## 🎨 Step 7: Animate SVG Icons (Duotone Effect)

1. **Target the `svg` elements:**

   ```css
   .icon {
     width: 1.5rem;
     height: 1.5rem;
     transition: transform var(--transition-speed);
   }

   .nav-link:hover .icon {
     transform: scale(1.2);
   }
   ```

2. **Add custom SVG colors if you're using `.fa-primary` and `.fa-secondary`:**

   ```css
   .fa-primary {
     fill: var(--foreground);
     transition: fill var(--transition-speed);
   }

   .fa-secondary {
     fill: var(--accent);
     transition: fill var(--transition-speed);
   }

   .nav-link:hover .fa-secondary {
     fill: #fff;
   }
   ```

---

## 🚀 Step 8: Add Logo Rotation Animation

1. **Rotate the logo icon when sidebar expands:**

   ```css
   .logo .icon {
     transition: transform var(--transition-speed);
     transform: rotate(0deg);
   }

   .navbar:hover .logo .icon {
     transform: rotate(-180deg);
   }

   .logo .link-text {
     text-transform: uppercase;
     letter-spacing: 2px;
     font-weight: bold;
   }
   ```

---

## 📱 Step 9: Make It Responsive (Bottom Bar on Mobile)

1. **Add media query for small screens (max-width: 600px):**

   ```css
   @media (max-width: 600px) {
     .navbar {
       bottom: 0;
       top: auto;
       width: 100vw;
       height: 5rem;
       flex-direction: row;
     }

     .navbar-nav {
       flex-direction: row;
       justify-content: center;
       align-items: center;
     }

     .nav-item,
     .logo {
       height: 100%;
     }

     .logo {
       display: none;
     }

     .link-text {
       display: none !important;
     }

     main {
       margin-left: 0;
       margin-bottom: 5rem;
     }
   }
   ```

---

## ✅ Result

* Desktop: A sidebar that slides out on hover.
* Mobile: A responsive bottom nav with just icons.
* Smooth animations and scalable layout using CSS only.

---