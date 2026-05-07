# 💎 Obsidian — React Portfolio Template

*A premium, high-performance portfolio template built for developers, engineers, and designers who want to stand out.*

## 🔗 Live Demo
**[View Live Demo](https://obsidian-react-portfolio.netlify.app/)**

---

## ✨ Features
- **High-End Aesthetics:** Stunning glassmorphic UI elements, subtle gradients, and premium hover effects.
- **Smooth Animations:** Integrated with Framer Motion for beautiful page transitions and micro-interactions.
- **Single Source of Truth:** Update all your personal data, skills, and projects from a single JSON configuration file. No deep code digging required!
- **Built-in Theme System:** Distinct color themes (Coral, Sky, Emerald, Violet) are assigned to specific pages for a rich visual experience.
- **Interactive Layouts:** Features a master-detail Skills dashboard and a tabbed About page for organized content delivery.
- **Smart Contact Hub:** Includes an elegant email form UI and a dynamic WhatsApp quick-chat integration.
- **Fully Responsive:** Looks perfect on mobile phones, tablets, and large desktop screens.

---

## 🛠 Tech Stack
- **Core Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Extremely fast hot-reloading)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Folder Structure
Here's a quick look at how the project is organized:
```text
├── public/
│   ├── data/
│   │   └── portfolio-content.json   # 👈 All your text, projects, and info goes here!
│   └── projects/                    # Add your project thumbnail images here
├── src/
│   ├── components/                  # Reusable UI components (Buttons, Cards, Layouts)
│   ├── context/                     # React Context (Loads the JSON data)
│   ├── pages/                       # The 5 main pages of the template
│   ├── theme.js                     # Global color theme definitions
│   ├── index.css                    # Global CSS and custom Tailwind classes
│   └── main.jsx                     # Application entry point
├── package.json
└── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** installed on your computer (version 18 or higher is recommended).

### Installation Steps
1. **Unzip** the downloaded template folder and open it in your code editor (like VS Code).
2. **Open the terminal** in the project folder and run the following command to install dependencies:
   ```bash
   npm install
   ```
3. **Start the development server** by running:
   ```bash
   npm run dev
   ```
4. Open the link provided in the terminal (usually `http://localhost:5173`) in your browser.

---

## 🎨 How to Customize

### 1. Edit Your Personal Info
All the text on the website is controlled by a single file: **`public/data/portfolio-content.json`**. 
Simply open this file and update your name, roles, social links, resume URL, and descriptions. The website will update instantly!

### 2. Add or Edit Projects (Work Page)
Open `public/data/portfolio-content.json` and scroll to the `"portfolio"` section. 
Under `"projects"`, you will find a list of project items. You can duplicate an existing project block and modify the title, description, tags, and URL. 
- Put your project screenshots inside the `public/projects/` folder.
- Update the `"thumbnail"` path in the JSON to match your image file name (e.g., `"/projects/my-image.png"`).

### 3. Add or Edit Skills
In `portfolio-content.json`, scroll to the `"skills"` section. You can modify the `"skillGroups"` to define your categories (like "Frontend", "Backend", etc.) and the `"pills"` array to list your actual technologies.

### 4. Change Colors and Themes
The template uses a robust theme system. 
- You can change the primary colors by editing the HSL values at the top of **`src/index.css`** (look for `--coral`, `--sky`, `--emerald`, `--violet`).
- To see how themes are applied to specific sections, check out **`src/theme.js`**.

---

## 📧 Contact Form Setup

The Contact page features an elegant form and a WhatsApp quick-connect button.

**1. Setting up WhatsApp:**
Open `public/data/portfolio-content.json` and scroll to the `"contact"` section. 
- Find the `"Phone"` label under `"info"` and put your real phone number (include your country code, but remove spaces/dashes, e.g., `+1234567890`).
- The "Start Chat" button will automatically generate a direct WhatsApp link using this number and the `"messageTemplate"` you define in the JSON.

**2. Setting up the Email Form:**
By default, the email form is a front-end UI that prints the submitted data to your browser's console. 
To actually receive emails, you need to connect it to a form service like **Formspree**, **EmailJS**, or **Web3Forms**.
- Open `src/pages/Contact.jsx`.
- Find the `handleSubmit` function around line 60.
- Replace the `console.log` with the integration code provided by your chosen form service.

---

## 📄 Pages Included
1. **Home (`/`)**: A high-impact landing page with dynamic roles and a striking introduction.
2. **About (`/about`)**: A detailed, tabbed layout showcasing your Experience, Education, and Certifications.
3. **Skills (`/skills`)**: An interactive dashboard separating your technical categories and core tools.
4. **Work (`/portfolio`)**: A visual gallery of your projects with filtering categories and hover interactions.
5. **Contact (`/contact`)**: A central hub to connect with you via email, social links, or WhatsApp.

---

## ☁️ Deployment Guide

This project is built with Vite, making it incredibly easy to deploy for free on modern hosting platforms.

**Deploying on Netlify (Recommended):**
1. Upload your code to a GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/) and click "Add new site" > "Import an existing project".
3. Select your GitHub repository.
4. Netlify will automatically detect Vite. Make sure the build command is `npm run build` and the publish directory is `dist`.
5. Click **Deploy**. *(Note: A `netlify.toml` file is already included to handle page routing automatically!)*

**Deploying on Vercel:**
1. Upload your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click "Add New" > "Project".
3. Import your repository.
4. Leave the default settings (Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.

---

## ❓ FAQ

**Q: Does it have a backend?**  
**Ans:** No — it's frontend only. The contact form currently logs data to the console. You can easily connect it to a free service like **EmailJS**, **Web3Forms**, or **Formspree** to actually receive emails. The WhatsApp feature is also fully frontend (it builds a direct chat link).

**Q: Can I change colors?**  
**Ans:** Yes — one global config file controls everything. You can easily edit the CSS variables in `src/index.css` to update the global theme colors.

**Q: What Node version is required?**  
**Ans:** Node 18+ is recommended.

---

## 📜 License
**Personal & Commercial Use Allowed.**
You can use this template to build and publish your personal portfolio or portfolios for your clients. 
*However, reselling, redistributing, or claiming the template source code as your own original product is strictly prohibited.*

---

## 👨‍💻 Credits
Built with precision and care by **Rajat Gulati** ([@reactive-rajat](https://github.com/reactive-rajat)).
