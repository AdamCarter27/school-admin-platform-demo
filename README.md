# School Administration & Staff Performance Evaluation Platform

A full-stack K-12 school management platform built for administrators to track teacher performance through classroom observations, AI-powered reviews, and goal monitoring.

## Tech Stack

- **Next.js** — frontend and API routes
- **Supabase** — PostgreSQL database
- **Tailwind CSS** — styling
- **Google Gemini 2.5 Flash** — AI summaries

## Features

### Classroom Observations
Admins select a teacher, write observation notes, and rate classroom engagement on a 0–10 scale. Data is stored instantly and reflected across the platform.

### AI-Powered Reviews
The reviews page fetches all observations for a selected teacher and sends them to Gemini, which generates a professional 2–3 sentence performance summary based on the actual notes — not just the average score.

### Goal Tracking
Admins set improvement goals per teacher and track progress through three statuses: pending, in progress, and completed.

### Dashboard
A real-time school-wide overview showing average engagement, total observations, top performing teachers, and staff flagged as needing attention.

### Teacher Profiles
Each teacher has a detail page showing their full observation history, engagement score, and active goals in one place.