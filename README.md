# 🔖 Smart Bookmark App

A real-time bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users authenticate using **Google OAuth only**, create private bookmarks, and see real-time updates across multiple tabs without refreshing the page.

---

## 🚀 Live Demo

🔗 Live URL: https://abstrabit-task-nhidhees.vercel.app/  
🔗 Repository: https://github.com/NhidheesKB/abstrabit-task  

---

## 📌 Task Requirements

- Google OAuth authentication only
- Add bookmark (Title + URL)
- Bookmarks are private per user
- Real-time updates across tabs
- Delete own bookmarks
- Deployed on Vercel

---

## ✨ Features

- 🔐 Google OAuth via Supabase
- ➕ Add bookmark
- 📋 View personal bookmarks
- 🗑 Delete bookmarks
- 🔄 Real-time sync using Supabase Realtime
- 🎨 Tailwind CSS UI
- 🌐 Production deployment on Vercel

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Backend | Supabase (Auth + PostgreSQL + Realtime) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment | Vercel |

---

# 📁 Project Folder Structure

app/
│
├── auth/
│ └── callback/
│ └── route.ts
│
├── list-bookmarks/
│ ├── BookmarkSelection.tsx
│ └── page.tsx
│
├── login/
│ └── page.tsx
│
├── components/
│ └── ui/
│ ├── BookmarkList.tsx
│ ├── Input.tsx
│ └── Navbar.tsx
│
├── Form.tsx
├── layout.tsx
├── page.tsx
├── globals.css
├── favicon.ico
│
lib/
│
├── supabase/
│ ├── client.ts
│ ├── server.ts
│ └── proxy.ts
│
├── auth.ts
└── utils.ts


---

# 📂 Folder & File Explanation

## 🔹 `app/`

This directory uses **Next.js App Router**.

### `layout.tsx`
- Root layout wrapping the entire application.
- Includes global styling and structure.

### `page.tsx`
- Landing or root page.
- May redirect user depending on authentication state.

### `globals.css`
- Global Tailwind CSS styles.

---

## 🔹 Authentication

### `app/auth/callback/route.ts`
- Handles OAuth callback from Supabase.
- Exchanges auth code for session.
- Redirects user after successful login.

### `app/login/page.tsx`
- Login page.
- Triggers Google OAuth login via Supabase.

---

## 🔹 Bookmark Pages

### `app/list-bookmarks/page.tsx`
- Main protected dashboard.
- Fetches bookmarks for logged-in user.
- Subscribes to real-time changes.

### `BookmarkSelection.tsx`
- Manages selection or filtering logic for bookmarks.

---

## 🔹 UI Components

Located in: `app/components/ui/`

### `Navbar.tsx`
- Displays application header.
- Handles login/logout state.

### `BookmarkList.tsx`
- Displays list of bookmarks.
- Updates when real-time events occur.

### `Input.tsx`
- Reusable styled input component.

---

## 🔹 `Form.tsx`
- Handles bookmark creation (Title + URL).
- Inserts data into Supabase database.

---

# 🔹 `lib/` Directory

Contains backend logic and Supabase configuration.

---

## `lib/supabase/`

### `client.ts`
- Creates Supabase client for client-side usage.

### `server.ts`
- Creates Supabase client for server components.

### `proxy.ts`
- Handles request forwarding or middleware-related logic.

---

## `lib/auth.ts`
- Helper functions for authentication.
- Session validation logic.

## `lib/utils.ts`
- Utility helper functions used across the project.

---

# 🗃 Database Schema

### Table: `bookmarks`

| Column     | Type      | Description |
|------------|-----------|-------------|
| id         | uuid      | Primary Key |
| user_id    | uuid      | Reference to authenticated user |
| title      | text      | Bookmark title |
| url        | text      | Bookmark URL |
| created_at | timestamp | Auto timestamp |

---

# 🔐 Row Level Security (RLS)

Enabled in Supabase.

Policy:

```sql
auth.uid() = user_id
