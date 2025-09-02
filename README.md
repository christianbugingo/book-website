# Ubwenge - AI-Powered Learning Platform

Ubwenge (a Kinyarwanda word for "knowledge" or "wisdom") is an intelligent, AI-driven learning platform designed to help students and lifelong learners supercharge their study sessions. It provides tools for note management, peer collaboration, and personalized content discovery.

This application is a Next.js project , featuring a modern tech stack and AI capabilities.

## ✨ Key Features

- **AI-Powered Note Management**: Upload your study notes and get AI-generated summaries and analysis (feature in development).
- **Collaborative Workspaces**: Share notes and discuss topics with peers through an integrated commenting system.
- **Dynamic News Feed**: Stay up-to-date with an AI-curated news feed tailored to your field of study.
- **Book Sharing Community**: Upload and explore a collection of books from various fields.
- **Role-Based Access Control**: Separate, secure access for regular users and administrators.
- **Interactive 3D Animations**: Engaging visual elements built with Three.js.
- **Responsive Design**: A seamless experience across desktop and mobile devices.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add any necessary environment variables (e.g., for Genkit API keys).
    ```
    # .env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Application

- **To run the development server:**
  ```bash
  npm run dev
  ```
  This will start the Next.js app on [http://localhost:9002](http://localhost:9002).

- **To run the Genkit development server (for AI flows):**
  ```bash
  npm run genkit:watch
  ```
  This will start the Genkit development environment.

## 🔑 Authentication Credentials

The application is pre-configured with mock credentials for testing purposes:

- **User Login:**
  - **Email:** `user@ubwenge.com`
  - **Password:** `user@123`
  - **Redirects to:** `/profile`

- **Admin Login:**
  - **Email:** `admin@ubwenge.com`
  - **Password:** `Admin@123`
  - **Redirects to:** `/admin`

## 📦 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs the linter to check for code quality issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run genkit:dev`: Starts the Genkit server.
- `npm run genkit:watch`: Starts the Genkit server in watch mode.

## 📂 Folder Structure

A brief overview of the key directories:

```
src
├── ai/             # Genkit AI flows and configuration
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable React components (UI, layout, auth)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── ...
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the code, feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available for use. Please refer to the license file for more details.
