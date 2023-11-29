# Notionize

A Notion clone project that replicates some of the key features and functionality of Notion, a popular note-taking and productivity application.

![Notionize landing page](./public/notionize-landing.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Features

- **Real-time Database:** Collaborate with others and see changes in real-time in your database.

- **Notion-Style Editor:** Create and edit documents with a rich-text editor similar to Notion.

- **Light and Dark Mode:** Switch between light and dark modes for comfortable day and night use.

- **Children Documents:** Organize your content hierarchically with nested documents.

- **Trash & Restore:** Safely recover deleted content and perform soft deletes and restore later.

- **Authentication:** Secure your data with user authentication and authorization.

- **File Upload:** Upload files and media to your documents.

- **Icons for Each Document:** Assign icons to your documents, and see changes in real-time.

- **Expandable Sidebar:** Navigate your workspace with an expandable sidebar.

- **Full Mobile Responsiveness:** Access your content and edit on mobile devices.

- **Publish Your Note to the Web:** Share your notes on the internet.

- **Cover Image for Each Document:** Add cover images to your documents for a personalized touch.

## Prerequisites

Node version 18.x.x

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/jun-low/notionize.git
   ```

2. Navigate to the project directory:

   ```bash
   cd notioize
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Setup `.env` file from the `.env.example`.

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Setup Convex:

   ```bash
   npm run convex:dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
