# JP Training — Web Automation Platform

A sleek, modern React app built with Vite that lets users **subscribe** for slot availability notifications and **book classes** with ease. Designed with Tailwind CSS and Lucide icons for a smooth user experience.

---

## Features

- **Subscribe for updates** on new class slots with email notification.
- **Book classes** by selecting a date and authenticating with login credentials.
- Responsive, accessible UI with loading states and success/error feedback.
- Configured for easy deployment on [Vercel](https://vercel.com).
- Environment-variable-driven API URLs for flexible backend integration.

---

## Tech Stack

- React 18
- Vite (Fast frontend build tool)
- Tailwind CSS (Utility-first styling)
- Lucide React Icons
- Fetch API for backend communication

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Backend API running (or adjust API URLs accordingly)

### Installation

```bash
git clone https://github.com/yourusername/jp-training.git
cd jp-training
npm install
```

### Environment Variables

Create a `.env` file in the root with:

```env
VITE_API_URL=http://localhost:8000
```

> Replace with your backend URL in production or on Vercel.

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` (or your Vite port) in your browser.

### Build for Production

```bash
npm run build
```

---

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket.
2. Log into [Vercel](https://vercel.com) and import your repo.
3. Vercel auto-detects Vite and sets build command: `npm run build`, output folder: `dist`.
4. Set the environment variable `VITE_API_URL` on Vercel dashboard to point to your backend URL.
5. Deploy and enjoy your live app!

---

## API Endpoints (Expected)

- `POST /book` — Send booking request with login credentials and selected date.
- `POST /subscribe` — Subscribe an email for slot availability notifications.

---

## Folder Structure

```
├── public/             # Static assets (favicon, preview images)
├── src/
│   ├── components/     # React components (BookPage, SubscribePage, etc.)
│   ├── main.jsx        # Entry point
│   └── App.jsx         # Main app component (optional)
├── vite.config.js      # Vite configuration
├── package.json
└── README.md
```

---

## Customize

- Change icons and colors in `index.html` and components.
- Adjust API URLs or add authentication.
- Enhance UI with additional feedback or animations.

---

## License

MIT License © [Your Name]
