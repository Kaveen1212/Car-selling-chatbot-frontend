# Claude Chat UI

A faithful recreation of the Claude interface built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 **Pixel-perfect Design** - Matches Claude's official interface
- 🌑 **Dark Theme** - Beautiful warm brown/orange color palette
- ⚡ **Fast Development** - Powered by Vite for instant HMR
- 🎯 **TypeScript** - Fully typed for better DX
- 🎨 **Tailwind CSS** - Custom design tokens matching Claude's design system
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 📱 **Responsive** - Adapts to different screen sizes

## Project Structure

```
e:\Claude\
├── src/
│   ├── ChatLayout.tsx    # Main component with all UI logic
│   ├── main.tsx          # App entry point
│   └── index.css         # Tailwind directives
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Custom Claude color tokens
├── postcss.config.js     # PostCSS with Tailwind
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Install Dependencies (already done)

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173` 🚀

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Component Overview

### ChatLayout
Main container component that renders the full interface.

### Sidebar
- Logo button
- "New chat" button
- Navigation items (Chats, Projects, Artifacts, Code)
- Recent chats list
- Account button

### MainArea
- Header with model name
- Message list (scrollable)
- Chat input with auto-growing textarea

### MessageBubble
Individual message with role-based styling and avatar.

### ChatInput
Bottom input bar with:
- Auto-growing textarea
- Enter to send, Shift+Enter for new line
- Send button (disabled when empty)

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  bg: { 100-400 },      // Background shades
  text: { 000-400 },    // Text colors
  border: { 100-300 },  // Border colors
  accent: { main-100-300 } // Claude orange
}
```

### Mock Data
Replace the static data in `src/ChatLayout.tsx`:
- `navItems` - Navigation menu
- `recentChats` - Recent chat list
- `initialMessages` - Initial conversation

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing

## Browser Support

Modern browsers that support ES2020+ features.

## License

MIT
