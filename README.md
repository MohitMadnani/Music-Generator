# 🎵 AI Music Generator

A full-stack AI-powered music generation platform that creates original music from text descriptions and lyrics. Built with Next.js, powered by ACE-Step AI model, and deployed on Vercel with serverless functions.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Features

### 🎼 Music Generation
- **Text-to-Music**: Generate original music from text descriptions (genres, moods, instruments)
- **Lyrics-to-Music**: Create full songs with vocals from custom lyrics
- **Multiple Styles**: Support for 19+ languages and all mainstream music genres
- **Advanced Controls**: Adjust duration, style, tempo, and more

### 🎨 Music Editing & Control
- **Lyric Editing**: Modify specific lyrics while preserving melody and vocals
- **Repainting**: Regenerate specific sections of a song
- **Variations**: Create multiple versions of the same song with slight variations
- **Stem Generation**: Generate individual instrument tracks

### 👤 User Features
- **Authentication**: Secure sign-up/sign-in with email or social providers (GitHub, Google)
- **Credit System**: Pay-per-use credit system with Polar integration
- **Song Library**: Save, organize, and manage your generated songs
- **Audio Player**: Built-in player with playback controls

### 💳 Billing & Payments
- **Flexible Plans**: Multiple credit packages (10, 25, 50 credits)
- **Polar Integration**: Secure payment processing via Polar
- **Customer Portal**: Manage subscriptions and billing

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   UI/UX      │  │  Auth Layer  │  │  API Routes  │  │
│  │  (React 19)  │  │ (Better-Auth)│  │   (Next.js)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                     Database (PostgreSQL)                │
│              Hosted on Neon (Serverless)                 │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              Backend (Python/Modal)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │        ACE-Step AI Model (Music Generation)      │  │
│  │  • Text2Music    • Lyrics2Vocal                   │  │
│  │  • Repainting    • Lyric Editing                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                 Storage (AWS S3)                         │
│         Audio files, thumbnails, and assets              │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.3 (App Router, React Server Components)
- **Language**: TypeScript 5.8
- **UI Library**: React 19
- **Styling**: TailwindCSS 4.0, Radix UI, Shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Authentication**: Better-Auth with Polar integration
- **Database ORM**: Prisma 6.6
- **Email**: Resend
- **Background Jobs**: Inngest

### Backend
- **AI Model**: ACE-Step (Music Generation Foundation Model)
- **Framework**: Python, Modal (Serverless GPU)
- **Audio Processing**: Custom audio processing pipeline

### Infrastructure
- **Database**: PostgreSQL (Neon - Serverless)
- **Storage**: AWS S3
- **Hosting**: Vercel (Frontend), Modal (Backend AI)
- **Payments**: Polar
- **Domain**: Custom domain via Cloudflare

---
