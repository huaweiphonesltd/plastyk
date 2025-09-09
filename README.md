# Plastyk - Club Night Website

A modern static website for the Plastyk club night, built with TypeScript and Vite.

## Features

- 🎨 Modern design with custom theme colors
- 📱 Fully responsive layout
- ⚡ Fast loading with Vite
- 🎵 Club night information and events
- 🖼️ Integrated with Plastyk branding assets

## Theme Colors

- **Black**: #000000
- **Red**: #AD272D  
- **White**: #FFFFFF
- **Pink**: #FF7BAC

## Tech Stack

- **Node.js**: 22+
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Custom CSS (no frameworks)

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm package manager

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

4. Preview production build:
   ```bash
   pnpm preview
   ```

## Project Structure

```
plastyk/
├── assets/                 # Static assets (logos, images)
├── src/
│   ├── styles/
│   │   └── main.css       # Main stylesheet
│   └── main.ts            # TypeScript entry point
├── index.html             # Main HTML file
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # Node TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Development

The project uses:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **Custom CSS** with CSS variables for theming
- **Modern ES modules** for JavaScript

## Assets

All branding assets are located in the `assets/` directory and include:
- Various Plastyk logo variations
- Background images
- Sticker designs

These assets are automatically served by Vite during development and bundled for production.