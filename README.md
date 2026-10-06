# 📝 Modern To-Do List Web App

A sleek, responsive, and interactive To-Do List application built with vanilla HTML, CSS, and JavaScript. Designed with modern glassmorphism aesthetics, dynamic aurora background lighting, and seamless drag-and-drop task reordering.

---

## ✨ Features

- **⚡ Fast & Lightweight**: Pure Vanilla HTML, CSS, and JavaScript without external runtime dependencies.
- **↕️ Drag & Drop Reordering**:
  - Full desktop HTML5 drag-and-drop support.
  - Native touch-enabled drag-and-drop for mobile devices.
- **💾 Local Storage Persistence**: Automatically saves your tasks locally so data persists across browser sessions.
- **✔️ Task Completion & Deletion**:
  - Click any task to toggle between completed and active status.
  - Smooth fade-out micro-animation when removing tasks.
- **📊 Real-Time Task Counter & Empty State**:
  - Displays remaining active tasks dynamically.
  - Shows an encouraging placeholder message when the list is empty.
  - One-click **"Clear All"** with confirmation dialog.
- **🎨 Modern Visual Design**:
  - Aurora twilight mesh background with ambient gradients.
  - Glassmorphic card container with rainbow accent highlights.
  - Interactive hover animations on the header logo.
  - Fully responsive across desktop, tablet, and mobile screens.

---

## 🚀 Demo & Screenshots

```
+-------------------------------------------------------+
|  To-do List [Logo]                                    |
|                                                       |
|  [ Add your task...                     ] [ Add ]     |
|                                                       |
|  [::] Welcome to your To-do list! 👋              [x] |
|  [::] Drag and drop tasks to reorder them ↕️       [x] |
|  [v]  Click on any task to mark it done           [x] |
|  [::] Click the x on the right to delete          [x] |
|                                                       |
|  3 tasks left                           [Clear All]   |
+-------------------------------------------------------+
```

---

## 📁 Project Structure

```text
Todo list/
├── index.html              # Main HTML markup and structure
├── script.js               # Application logic, drag-and-drop, & storage handling
├── README.md               # Project documentation
└── assets/
    ├── style.css           # Styling, design tokens, animations, and responsive layout
    └── images/
        └── Logo.png        # Application logo and favicon
```

---

## 🛠️ Built With

- **HTML5** – Semantic structure and accessible elements.
- **CSS3** – Custom properties (variables), Flexbox, CSS animations, and Glassmorphism.
- **JavaScript (ES6+)** – DOM manipulation, HTML5 Drag & Drop API, Touch Events, and `localStorage`.
- **Fonts** – [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Poppins](https://fonts.google.com/specimen/Poppins).

---

## 🏁 Getting Started

No installation or build steps required! Simply open the project in any modern web browser.

### Option 1: Direct File Open
Double click `index.html` or open it with your browser:
```bash
# On Windows PowerShell
start index.html
```

### Option 2: Using VS Code Live Server
1. Open this folder in VS Code.
2. Right click `index.html`.
3. Select **"Open with Live Server"**.

### Option 3: Using Node / npx (Optional)
If you prefer running a local static server:
```bash
npx serve .
```

---

## ⌨️ How to Use

| Action | How-To |
|---|---|
| **Add Task** | Type in the input box and click **Add** or press <kbd>Enter</kbd> |
| **Mark Complete** | Click anywhere on the task text to toggle status |
| **Delete Task** | Click the **×** button on the right side of the task |
| **Reorder Tasks** | Click/tap and drag any task item up or down |
| **Clear All** | Click **Clear All** at the bottom to reset the list |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
