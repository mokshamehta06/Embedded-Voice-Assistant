# 🎙️ Embedded Voice Assistant — AI-Powered Embeddable Voice Widget for Websites

> A full-stack SaaS platform that lets business owners **create, customize, and embed a voice-enabled AI assistant** into any website using a single `<script>` tag — powered by **Google Gemini AI**, with built-in **Razorpay payments**, **Firebase Google Auth**, and **smart page navigation**.

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture & System Design](#-architecture--system-design)
3. [Tech Stack](#-tech-stack)
4. [Folder Structure](#-folder-structure)
5. [Database Design (MongoDB Collections)](#-database-design-mongodb-collections)
6. [Backend — Server Deep Dive](#-backend--server-deep-dive)
7. [Frontend — Client Deep Dive](#-frontend--client-deep-dive)
8. [The Embeddable Widget — How It Works](#-the-embeddable-widget--how-it-works)
9. [Complete API Documentation](#-complete-api-documentation)
10. [Authentication Flow](#-authentication-flow)
11. [Payment Flow (Razorpay)](#-payment-flow-razorpay)
12. [Navigation Intelligence — How the AI Agent Navigates Websites](#-navigation-intelligence--how-the-ai-agent-navigates-websites)
13. [Environment Variables](#-environment-variables)
14. [How to Run Locally](#-how-to-run-locally)
15. [Technical Interview Questions & Answers (50+)](#-technical-interview-questions--answers)

---

## 🔭 Project Overview

**Embedded Voice Assistant** is a SaaS (Software as a Service) platform where:

1. A business owner **signs up** using Google OAuth (Firebase).
2. They **build a custom AI assistant** through a visual builder — setting the assistant name, business context, tone, theme, pages for navigation, and their own Gemini API key.
3. The platform generates a **single `<script>` tag** that the business owner pastes into their website's HTML.
4. When a visitor loads that website, the script **injects a floating chat widget** (bottom-right corner) that can:
   - **Listen to voice** (Web Speech API → Speech-to-Text)
   - **Respond with AI** (Google Gemini API)
   - **Speak the response aloud** (SpeechSynthesis → Text-to-Speech)
   - **Navigate the user** to different pages of the website based on voice commands (e.g., "Open pricing page")

### Core Value Proposition
Instead of building a chatbot from scratch, any business owner can get a **branded, voice-enabled AI assistant** on their website in minutes — zero coding required.

---

## 🏗 Architecture & System Design

```
┌───────────────────────────────────────────────────────────────┐
│                     EXTERNAL WEBSITES                          │
│   (Any website that embeds the <script> tag)                   │
│                                                                │
│   ┌──────────────┐     Fetches config & sends       ┌────────┐│
│   │ assistant.js  │────── user questions via ────────│ Server ││
│   │ (Widget IIFE) │     REST API (public CORS)       │(Express││
│   └──────────────┘                                   │  API)  ││
│         ↕  Injects UI, voice, chat                   └───┬────┘│
│   ┌──────────────┐                                       │     │
│   │ assistant.css │                                       │     │
│   └──────────────┘                                       │     │
└───────────────────────────────────────────────────────────│─────┘
                                                           │
        ┌──────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────┐
│                        BACKEND (Node.js + Express)                │
│                                                                   │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  Auth    │  │  User    │  │ Assistant │  │    Billing       │  │
│  │ Routes  │  │ Routes   │  │  Routes   │  │    Routes        │  │
│  │/api/auth│  │/api/user │  │/api/asst  │  │/api/billing      │  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  └────┬─────────────┘  │
│       │            │              │              │                 │
│       ▼            ▼              ▼              ▼                 │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  Auth   │  │  User    │  │ Assistant │  │    Billing       │  │
│  │Controller│ │Controller│  │Controller │  │   Controller     │  │
│  └─────────┘  └──────────┘  └─────┬─────┘  └────┬─────────────┘  │
│                                   │              │                 │
│                                   ▼              ▼                 │
│                            ┌─────────────┐  ┌─────────────┐       │
│                            │ Gemini AI   │  │  Razorpay   │       │
│                            │  (Config)   │  │  (Config)   │       │
│                            └─────────────┘  └─────────────┘       │
│                                                                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │  isAuth.js   │    │  token.js    │    │ connectDb.js │         │
│  │ (Middleware)  │    │ (JWT Gen)    │    │ (MongoDB)    │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
└──────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite + TailwindCSS)           │
│                                                                    │
│  ┌────────┐  ┌────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Login  │  │  Home  │  │ Builder  │  │ Billing  │              │
│  │ Page   │  │  Page  │  │  Page    │  │  Page    │              │
│  └────────┘  └────────┘  └──────────┘  └──────────┘              │
│                                                                    │
│  Components: Navbar, ProtectedRoute, AssistantPreview,             │
│              ScrollFadeText                                        │
│                                                                    │
│  Utils: Firebase (Google Auth)                                     │
└──────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────┐      ┌──────────────────────┐
│   MongoDB Atlas      │      │   Firebase Auth      │
│  (User + Billing     │      │  (Google OAuth)      │
│   Collections)       │      │                      │
└──────────────────────┘      └──────────────────────┘
```

### Key Architectural Decisions

| Decision | Why |
|---|---|
| **Two CORS policies** (private + public) | Dashboard routes (`/api/auth`, `/api/user`, `/api/billing`) use `privateCors` with credentials; the embeddable widget uses `publicCors` (`origin: *`) because it runs on **any** external website |
| **Widget is a self-contained IIFE** | `assistant.js` is a vanilla JS IIFE (Immediately Invoked Function Expression) — no React dependency, no build step needed on the host website. It just needs a single `<script>` tag |
| **Gemini API key stored on backend** | The API key is **never** sent to the public widget endpoint. Only the backend calls Gemini, keeping the key secure |
| **Cookie-based JWT auth** | Uses `httpOnly` cookies instead of localStorage tokens for better security against XSS attacks |
| **MongoDB with Mongoose** | Schemaless NoSQL is ideal because each user's assistant config is a flexible document; no complex relational joins needed |

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server runtime |
| **Express.js v5** | HTTP framework, routing, middleware |
| **MongoDB + Mongoose v8** | Database (NoSQL document store) |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **cookie-parser** | Parse cookies from HTTP requests |
| **cors** | Cross-Origin Resource Sharing policies |
| **Razorpay SDK** | Indian payment gateway integration |
| **dotenv** | Environment variable management |
| **crypto** | HMAC-SHA256 signature verification for payments |
| **nodemon** | Dev hot-reloading |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI library |
| **Vite 8** | Build tool & dev server (fast HMR) |
| **TailwindCSS v4** | Utility-first CSS framework |
| **React Router DOM v7** | Client-side routing (SPA navigation) |
| **Axios** | HTTP client for API calls |
| **Firebase v12** | Google OAuth authentication (client-side) |
| **Framer Motion** | Scroll-based animations (ScrollFadeText) |
| **Spline (@splinetool)** | 3D interactive element on login page |
| **react-hot-toast** | Toast notification system |
| **react-icons** | SVG icon library |

### Embeddable Widget
| Technology | Purpose |
|---|---|
| **Vanilla JavaScript (IIFE)** | Zero-dependency widget injected via script tag |
| **Web Speech API** | `SpeechRecognition` for voice input (STT) |
| **SpeechSynthesis API** | Browser TTS for AI voice responses |
| **CSS Themes** | 4 pre-built themes (dark, light, glass, neon) |

---

## 📁 Folder Structure

```
Embedded Voice Assistant/
├── server/                          # Backend (Express API)
│   ├── server.js                    # Entry point — starts Express, connects DB
│   ├── app.js                       # Express app config — middleware, routes, CORS
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables (secrets)
│   │
│   ├── Config/
│   │   ├── connectDb.js             # MongoDB connection with exponential backoff retry
│   │   ├── gemini.js                # Gemini AI API integration (REST call)
│   │   ├── razorpay.js              # Razorpay SDK initialization
│   │   └── token.js                 # JWT token generation helper
│   │
│   ├── Models/
│   │   ├── user.model.js            # User schema — assistant config, plan, pages
│   │   └── billing.model.js         # Billing/payment records schema
│   │
│   ├── Controllers/
│   │   ├── auth.controller.js       # Google auth login/logout handlers
│   │   ├── user.controller.js       # Get user, save assistant config
│   │   ├── assistant.controller.js  # AI chat endpoint + navigation logic
│   │   └── billing.controller.js    # Razorpay order creation & payment verification
│   │
│   ├── Routes/
│   │   ├── auth.routes.js           # POST /api/auth/google, /api/auth/logout
│   │   ├── user.routes.js           # GET /current-user, POST /save-assistant
│   │   ├── assistant.route.js       # GET /assistant-config/:userId, POST /ask-assistant
│   │   └── billing.route.js         # POST /create-order, /verify-payment
│   │
│   └── Middleware/
│       └── isAuth.js                # JWT verification middleware
│
├── client/vite-project/             # Frontend (React SPA)
│   ├── index.html                   # HTML entry — loads Razorpay SDK + React app
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies
│   ├── .env                         # Client env vars (Firebase key, Razorpay key)
│   │
│   ├── public/
│   │   ├── assistant.js             # ⭐ THE EMBEDDABLE WIDGET (vanilla JS IIFE)
│   │   ├── assistant.css            # ⭐ Widget CSS (4 themes: dark/light/glass/neon)
│   │   └── logo.png                 # Favicon/logo
│   │
│   └── src/
│       ├── main.jsx                 # React entry — BrowserRouter wraps App
│       ├── App.jsx                  # Root — routes, auth state, Toaster
│       ├── index.css                # Global Tailwind import
│       │
│       ├── pages/
│       │   ├── Home.jsx             # Landing page — hero, features, CTA
│       │   ├── Login.jsx            # Login page — Spline 3D + Google OAuth
│       │   ├── Buider.jsx           # ⭐ Assistant Builder — forms, embed code
│       │   └── Billing.jsx          # Pricing plans, Razorpay checkout
│       │
│       ├── components/
│       │   ├── Navbar.jsx           # Top nav — Builder, Billing, user profile
│       │   ├── ProtectedRoute.jsx   # Auth guard — redirects to /login if no user
│       │   ├── AssistantPreview.jsx  # Live demo widget with 4 switchable themes
│       │   └── ScrollFadeText.jsx   # Framer Motion word-by-word scroll reveal
│       │
│       └── utils/
│           └── firebase.js          # Firebase app init + Google Auth provider
```

---

## 🗄 Database Design (MongoDB Collections)

### Why MongoDB?
- **Flexible schema**: Each user's assistant config has nested arrays (pages), enum fields, and optional attributes — perfect for document stores.
- **No JOIN needed**: User data + assistant config live in the same document, eliminating expensive relational joins.
- **Mongoose ODM**: Provides schema validation, type checking, and middleware hooks on top of MongoDB.

### Collection 1: `users`

This is the **core collection**. It stores user account info AND the assistant configuration together in a single document for fast reads.

```javascript
const pageSchema = new mongoose.Schema({
    name: String,            // Page display name (e.g., "About Us")
    path: String,            // URL path (e.g., "/about")
    keywords: {              // Trigger words for voice navigation
        type: [String],      // e.g., ["about", "team", "company"]
        default: [],
    },
}, { _id: false })           // No separate ObjectId for sub-documents

const userSchema = new mongoose.Schema({
    // ── Account Info ──
    name: { type: String, required: true },           // From Google OAuth
    email: { type: String, required: true, unique: true }, // Unique constraint

    // ── Assistant Configuration ──
    assistantName: { type: String, default: "MyAssistant" },
    businessName: { type: String, default: "" },
    businessType: { type: String, default: "" },      // e.g., "E-commerce"
    businessDescription: { type: String, default: "" },// Fed into AI prompt

    tone: {
        type: String,
        enum: ["friendly", "professional", "sales"],   // Controls AI personality
        default: "friendly"
    },
    theme: {
        type: String,
        enum: ["light", "dark", "glass", "neon"],      // Widget visual theme
        default: "dark"
    },
    enableVoice: { type: Boolean, default: true },     // Show/hide mic button
    enableNavigation: { type: Boolean, default: true }, // Allow page navigation

    pages: { type: [pageSchema], default: [] },        // Pages with keywords

    // ── API & Status ──
    geminiApiKey: { type: String, default: "" },       // User's own Gemini key
    geminiStatus: {
        type: String,
        enum: ["active", "quota_exceeded", "invalid"],
        default: "active"
    },

    // ── Usage & Billing ──
    totalMessages: { type: Number, default: 0 },       // Message counter
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    requestLimit: { type: Number, default: 200 },      // Free tier cap
    proExpiresAt: { type: Date, default: null },        // Pro plan expiry

    isSetupComplete: { type: Boolean, default: false }, // Has user saved config?
}, { timestamps: true })                                // createdAt, updatedAt
```

#### Why Each Field Exists:

| Field | Why it's needed |
|---|---|
| `name`, `email` | Identity from Google OAuth. `email` has a `unique` index to prevent duplicate accounts |
| `assistantName` | Personalization — appears in the widget header and AI prompt |
| `businessName/Type/Description` | Fed into the Gemini prompt so the AI gives contextually relevant answers about the user's specific business |
| `tone` | Enum constraint — the AI prompt is told to respond in "friendly", "professional", or "sales" style |
| `theme` | Determines which CSS class the widget uses (dark/light/glass/neon) |
| `enableVoice` | Boolean toggle — if false, the mic button is hidden in the widget |
| `enableNavigation` | Boolean toggle — if false, the "open/go/navigate" keyword matching is skipped |
| `pages[]` | Array of sub-documents with `name`, `path`, `keywords`. Used by the navigation engine to match voice commands to URL paths |
| `geminiApiKey` | User brings their own API key — the platform doesn't pay for AI usage |
| `geminiStatus` | Tracks API key health. Updated on every Gemini call (401 → "invalid", 429 → "quota_exceeded", 200 → "active") |
| `totalMessages` | Counter — incremented on every free-tier message. Used to enforce the 200-message limit |
| `plan` | "free" or "pro". Pro users get higher limits and don't increment the counter |
| `requestLimit` | Max messages allowed on free plan (200 by default) |
| `proExpiresAt` | Date when pro plan expires (90 days from payment). Checked on every request |
| `isSetupComplete` | Controls whether the Builder page shows the config form or the embed code view |
| `timestamps: true` | Auto-generates `createdAt` and `updatedAt` fields |

### Collection 2: `billings`

Stores payment transaction records. Each record links back to a user via ObjectId reference.

```javascript
const billingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",              // Foreign key reference to User collection
    },
    amount: Number,               // Payment amount in INR (e.g., 299)
    plan: String,                 // Which plan was purchased ("pro")
    paymentId: String,            // Razorpay payment ID (set after verification)
    orderId: String,              // Razorpay order ID (set on creation)
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",       // Lifecycle: created → paid/failed
    },
}, { timestamps: true })
```

#### Why a Separate Collection?
- **Audit trail**: Every payment attempt is logged with status, enabling debugging and financial reconciliation.
- **One user → many payments**: Users can upgrade multiple times. This is a **one-to-many** relationship (User → Billings), best modeled as a separate collection with a reference.
- **Razorpay reconciliation**: `orderId` and `paymentId` map directly to Razorpay's dashboard for cross-referencing.

---

## 🖥 Backend — Server Deep Dive

### Entry Point: `server.js`
```javascript
const app = require('./app.js');
const connectDb = require('./Config/connectDb.js');
const PORT = process.env.PORT || 5000;

connectDb();                    // Connect to MongoDB with retries
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
- Separation of concerns: `server.js` handles startup; `app.js` handles Express configuration.

### Express Configuration: `app.js`

Two CORS policies:
```javascript
const privateCors = cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true            // Allow cookies to be sent
})
const publicCors = cors({
    origin: "*",                 // Any website can call this
})
```
- **`privateCors`**: Used for dashboard routes. Only the React dev server can call these. `credentials: true` enables cookie-based auth.
- **`publicCors`**: Used for the assistant routes. Since the widget runs on **any external website**, it must accept requests from any origin.

### Database Connection: `connectDb.js`
Implements **exponential backoff retry** (5 attempts):
```javascript
const delay = Math.min(1000 * 2 ** attempt, 10000);
// Attempt 1: 2s, Attempt 2: 4s, Attempt 3: 8s, Attempt 4: 10s (capped), Attempt 5: 10s
```
This prevents hammering the database during transient network issues.

### Gemini AI Integration: `gemini.js`
- Calls the **Gemini 1.5 Flash** REST API directly via `fetch()` (no SDK — lighter footprint).
- **Dynamic error handling**: Updates the user's `geminiStatus` field based on HTTP response:
  - `400/401` → `"invalid"` (bad API key)
  - `429` → `"Quota Exceeded"` (rate limited)
  - `200` → `"active"` (working)
- This status is shown in the Builder dashboard so the user can diagnose issues.

### JWT Auth: `token.js` + `isAuth.js`
- `genToken()`: Creates a JWT with `userId` payload, expires in 7 days.
- `isAuth` middleware: Extracts JWT from `req.cookies.token`, verifies with `jwt.verify()`, attaches `req.userId` for downstream handlers.

---

## 💻 Frontend — Client Deep Dive

### App Architecture: `App.jsx`
```jsx
// Global state: user object (or null)
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

// On mount: try to fetch current user (cookie-based session check)
useEffect(() => {
    axios.get(SeverUrl + "/api/user/current-user", { withCredentials: true })
}, []);
```

**Routing structure:**
```
/login          → Login.jsx (public)
/               → Home.jsx (protected)
/builder        → Builder.jsx (protected)
/billing        → Billing.jsx (protected)
*               → Redirects to / (catch-all)
```

### Key Components

#### `ProtectedRoute.jsx`
- **Guard component**: If `loading` → shows animated spinner. If `!user` → redirects to `/login`. Otherwise → renders children.

#### `Login.jsx`
- **Spline 3D scene**: Lazy-loaded interactive 3D element (with error boundary fallback).
- **Google OAuth flow**: `signInWithPopup(auth, provider)` → gets `displayName` and `email` → POST to `/api/auth/google` → server creates/finds user → sets JWT cookie → redirects to `/`.

#### `Builder.jsx` (Buider.jsx)
- **The core page**. Two views:
  1. **Setup Form** (when `!user.isSetupComplete || editAssistant`): Shows forms for assistant name, business info, tone, theme, voice toggle, navigation toggle, page management, and Gemini API key.
  2. **Dashboard View** (when `user.isSetupComplete && !editAssistant`): Shows current config summary, plan status, Gemini health, messages remaining, and the **embed script tag** with a copy button.

- **Pages Management**: Users add pages with `name`, `path`, and comma-separated `keywords`. These power the navigation feature.

#### `AssistantPreview.jsx`
- Interactive demo widget with **4 switchable themes** (Midnight, Pearl, Holo Glass, Cyber Neon).
- Simulated listening → processing → response flow when the user clicks the orb.
- Each theme has a complete design token set (colors, gradients, shadows, glow effects).

#### `ScrollFadeText.jsx`
- Uses Framer Motion's `useScroll` + `useTransform` hooks.
- Splits text into individual words, each word fades from `opacity: 0.12` → `1` as the user scrolls — creating a cinematic reading experience.

---

## 🔌 The Embeddable Widget — How It Works

This is the **most technically interesting part** of the project. Here's how a single `<script>` tag turns any website into an AI-powered voice assistant:

### Step 1: User Pastes the Script Tag
```html
<script src="https://your-domain.com/assistant.js" data-user-id="abc123"></script>
```

### Step 2: The IIFE Executes (`assistant.js`)
The script is an **Immediately Invoked Function Expression** — it runs as soon as the browser parses it:

```javascript
(function () {
    const script = document.currentScript;
    const userId = script ? script.dataset.userId : null;
    // ... entire widget logic
})();
```

### Step 3: Load External Resources
```javascript
// 1. Load CSS (widget styles with 4 theme variants)
const link = document.createElement("link");
link.href = CLIENT_URL + "/assistant.css";
document.head.appendChild(link);

// 2. Load Google Inter font
const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Inter...";
document.head.appendChild(font);
```

### Step 4: Fetch Assistant Config
```javascript
fetch(SERVER_URL + "/api/assistant/assistant-config/" + userId)
    .then(res => res.json())
    .then(data => buildWidget(data.user));
```
This calls the **public** endpoint (no auth needed) and gets the user's assistant config (name, theme, voice enabled, pages, etc.) — **but NOT the Gemini API key** (security!).

### Step 5: Build the Widget DOM
The `buildWidget()` function dynamically creates all HTML elements:
- Floating trigger button (bottom-right)
- Chat widget with header, body (welcome screen + messages area), and footer (input + send + mic)
- Theme class applied: `"voiceass theme-" + theme`

### Step 6: Voice Input (Speech-to-Text)
```javascript
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;  // Captured speech
    input.value = text;                        // Put in input field
    sendMessage();                             // Auto-send to AI
};
```

### Step 7: Send to AI Backend
```javascript
fetch(SERVER_URL + "/api/assistant/ask-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, userId: userId })
})
```

### Step 8: Backend Processes the Message
In `assistant.controller.js → askAssistant()`:

1. **Validate** message and userId
2. **Check plan limits** (free: 200 messages max, pro: check expiry date)
3. **Navigation detection**: If `enableNavigation` is true and message starts with "open/go/show/navigate/take me", match keywords against pages array
4. **If navigation match found**: Return `{ action: "navigate", page: "/about" }`
5. **If not navigation**: Build a Gemini prompt with business context:
```
You are {assistantName}
Business Name: {businessName}
Business Type: {businessType}
Business Description: {businessDescription}
Assistant Tone: {tone}
Rules:
- Keep replies under 15 words
- Give fast direct responses
- Behave like smart voice assistant
User Question: {message}
```
6. **Call Gemini API**, increment message counter, return AI response

### Step 9: Text-to-Speech
```javascript
const speak = (text) => {
    window.speechSynthesis.cancel();  // Stop any ongoing speech
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
};
```

### Step 10: Navigation (if applicable)
When the backend returns `action: "navigate"`, the widget would redirect:
```javascript
if (data.action === "navigate") {
    window.location.href = data.page;  // Navigate to the matched page
}
```

---

## 📡 Complete API Documentation

### Auth Routes (`/api/auth`) — Private CORS

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/google` | None | Login/Register via Google. Body: `{ name, email }`. Sets JWT cookie |
| POST | `/api/auth/logout` | None | Clears the JWT cookie |

### User Routes (`/api/user`) — Private CORS

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/user/current-user` | `isAuth` | Returns the currently logged-in user's full document |
| POST | `/api/user/save-assistant` | `isAuth` | Saves assistant configuration. Body: all config fields |
| GET | `/api/user/assistant-config/:userId` | None | Returns public-safe assistant config (no API key) |

### Assistant Routes (`/api/assistant`) — Public CORS

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/assistant/assistant-config/:userId` | None | Fetch assistant config for widget initialization |
| POST | `/api/assistant/ask-assistant` | None | Send a message to the AI. Body: `{ message, userId, currentPath }` |

### Billing Routes (`/api/billing`) — Private CORS

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/billing/create-order` | `isAuth` | Creates Razorpay order. Body: `{ plan: "pro" }` |
| POST | `/api/billing/verify-payment` | `isAuth` | Verifies Razorpay signature. Body: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` |

---

## 🔐 Authentication Flow

```
┌──────────┐     1. signInWithPopup()      ┌──────────┐
│  Browser  │────────────────────────────────│  Firebase │
│  (React)  │◄──── 2. Returns name, email ──│  Google   │
└─────┬─────┘                               └──────────┘
      │
      │ 3. POST /api/auth/google { name, email }
      ▼
┌──────────┐     4. Find or Create user     ┌──────────┐
│  Express  │────────────────────────────────│  MongoDB  │
│  Server   │◄──── 5. User document ────────│           │
└─────┬─────┘                               └──────────┘
      │
      │ 6. Generate JWT → Set httpOnly cookie (7 days)
      │ 7. Return user data
      ▼
┌──────────┐
│  Browser  │  → setUser(data) → Navigate to "/"
│  (React)  │
└──────────┘
```

**Why Firebase + Own Backend Auth?**
- Firebase handles the OAuth complexity (Google popup, token exchange, consent screen).
- Our backend creates its **own JWT** and stores it in an **httpOnly cookie** — Firebase tokens are never stored on the client.
- This gives us full control over session management and doesn't expose Firebase admin privileges.

---

## 💳 Payment Flow (Razorpay)

```
┌──────────┐  1. POST /create-order     ┌──────────┐  2. razorpay.orders.create()  ┌──────────┐
│  Browser  │──────────────────────────►│  Express  │────────────────────────────►│ Razorpay │
│           │◄──── 3. { order } ────────│           │◄──── order object ──────────│  API     │
└─────┬─────┘                          └──────────┘                              └──────────┘
      │
      │ 4. new Razorpay(options).open()
      │    → User completes payment in Razorpay popup
      │
      │ 5. handler callback with { razorpay_order_id, razorpay_payment_id, razorpay_signature }
      ▼
┌──────────┐  6. POST /verify-payment   ┌──────────┐
│  Browser  │──────────────────────────►│  Express  │
│           │                           │           │
│           │                           │  7. HMAC-SHA256 verification:
│           │                           │     sign = crypto.createHmac("sha256", SECRET)
│           │                           │           .update(order_id + "|" + payment_id)
│           │                           │           .digest("hex")
│           │                           │     if (sign === razorpay_signature) ✅
│           │                           │
│           │                           │  8. Update billing.status = "paid"
│           │                           │  9. Update user.plan = "pro"
│           │                           │     user.proExpiresAt = now + 90 days
│           │◄──── { success: true } ───│           │
└──────────┘                           └──────────┘
```

**Security**: The HMAC-SHA256 signature verification ensures the payment callback hasn't been tampered with. Only Razorpay can generate a valid signature using our secret key.

---

## 🧭 Navigation Intelligence — How the AI Agent Navigates Websites

This is the **unique selling point** of the project. Here's the exact flow:

### 1. User Configures Pages in Builder
```javascript
pages: [
    { name: "Home", path: "/", keywords: ["home", "main"] },
    { name: "About Us", path: "/about", keywords: ["about", "team", "company"] },
    { name: "Pricing", path: "/pricing", keywords: ["pricing", "price", "cost", "plans"] },
    { name: "Contact", path: "/contact", keywords: ["contact", "reach", "email"] },
]
```

### 2. Visitor Speaks on Website
**"Open the pricing page"**

### 3. Backend Detects Navigation Intent
```javascript
const navigationWords = ["open", "go", "show", "navigate", "take me"];
const wantsNavigation = navigationWords.some((word) =>
    cleanMessage.startsWith(word)  // "open the pricing page" starts with "open" ✅
);
```

### 4. Keyword Matching
```javascript
const matchedPage = user.pages.find((page) =>
    page.keywords.some((keyword) =>
        cleanMessage.includes(keyword.toLowerCase())
        // "open the pricing page" includes "pricing" ✅ → matches Pricing page
    )
);
```

### 5. Duplicate Check
```javascript
if (req.body.currentPath === matchedPage.path) {
    return res.status(400).json({ message: "You are already on that page" });
}
```

### 6. Return Navigation Response
```javascript
return res.json({
    success: true,
    action: "navigate",
    page: matchedPage.path,          // "/pricing"
    response: "Opening Pricing"
});
```

### 7. Widget Navigates the Browser
The widget receives this response and redirects the user to the matched page.

---

## 🔑 Environment Variables

### Server `.env`
```bash
MONGO_URI=mongodb+srv://...        # MongoDB Atlas connection string
JWT_SECRET=your-jwt-secret         # Secret for signing JWTs
RAZORPAY_KEY_ID=rzp_test_...       # Razorpay test/live key ID
RAZORPAY_KEY_SECRET=...            # Razorpay secret key
PORT=5000                          # Server port
```

### Client `.env`
```bash
VITE_FIREBASE_API_KEY=AIza...      # Firebase Web API key
VITE_RAZORPAY_KEY_ID=rzp_test_...  # Razorpay key (client-side, public)
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Firebase project with Google Auth enabled
- Razorpay test account
- Google Gemini API key

### 1. Clone & Install

```bash
# Clone
git clone https://github.com/yourusername/Embedded-Voice-Assistant.git
cd Embedded-Voice-Assistant

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client/vite-project
npm install
```

### 2. Configure Environment
Create `.env` files in both `server/` and `client/vite-project/` directories with the variables listed above.

### 3. Run

```bash
# Terminal 1 — Start backend
cd server
npm run dev              # Runs nodemon server.js → http://localhost:5000

# Terminal 2 — Start frontend
cd client/vite-project
npm run dev              # Runs vite → http://localhost:5173
```

### 4. Test the Widget
After creating an assistant in the Builder:
1. Copy the embed script from the Builder page
2. Create any HTML file and paste the script before `</body>`
3. Open that HTML file — the floating assistant button appears
4. Click it → type or speak → get AI responses

---

## 🎯 Technical Interview Questions & Answers

### Architecture & Design

**Q1: What is the architecture of your project?**
> It's a full-stack **monorepo** with a **3-tier architecture**: React frontend (presentation), Express.js backend (business logic), and MongoDB database (persistence). The frontend is a SPA (Single Page Application) built with Vite + React. The backend is a RESTful API with 4 route groups. The embeddable widget is a separate vanilla JS module that communicates with the backend via public REST APIs.

**Q2: Why did you choose MongoDB over PostgreSQL/MySQL?**
> Because the user data is **document-centric** — each user has a flexible config with nested arrays (pages), enums, and optional fields. MongoDB's schemaless nature fits this perfectly. We don't need complex JOINs — all user + assistant data lives in one document. Mongoose gives us schema validation on top.

**Q3: Why two CORS policies?**
> The dashboard routes (auth, user, billing) use `privateCors` with `credentials: true` because they rely on httpOnly cookies and should only be called from our React frontend. The assistant routes use `publicCors` with `origin: "*"` because the embeddable widget runs on **any external website** — we can't predict the origin domain.

**Q4: Why is the widget a vanilla JS IIFE instead of a React component?**
> Because the widget needs to run on **any website** — WordPress, Shopify, static HTML, Angular, Vue, etc. Using React would force the host website to include React as a dependency. An IIFE has zero dependencies and executes in any browser context. It injects its own DOM elements and CSS.

**Q5: How does the embed system work?**
> The user gets a `<script>` tag with their unique `data-user-id`. When the script loads, it: (1) reads the userId from `dataset`, (2) fetches the assistant config from our API, (3) dynamically creates all widget HTML, (4) loads the CSS file, (5) sets up event listeners for chat, voice, and navigation.

---

### Authentication & Security

**Q6: Explain your authentication flow.**
> Firebase handles Google OAuth on the client (popup flow). After successful auth, we send `name` and `email` to our backend. The backend either finds or creates a user in MongoDB, generates a JWT, and sets it as an **httpOnly cookie** (not accessible via JavaScript, preventing XSS theft). On every protected request, the `isAuth` middleware extracts and verifies this JWT.

**Q7: Why httpOnly cookies instead of localStorage?**
> `httpOnly` cookies **cannot be read by JavaScript** (including malicious XSS scripts). If we stored the JWT in localStorage, any XSS vulnerability could steal the token. With httpOnly cookies, even if an attacker injects JS, they can't access the auth token.

**Q8: Why not use Firebase tokens directly for backend auth?**
> Firebase tokens are managed by Firebase SDK and have their own expiry/refresh logic. By generating our own JWT, we have **full control** over session duration (7 days), payload contents, and revocation logic. We also don't need Firebase Admin SDK on the backend, keeping it simpler.

**Q9: Is the Gemini API key secure? Can anyone steal it from the widget?**
> Yes, it's secure. The API key is stored in MongoDB and **never sent** to the public widget endpoint. Look at `getAssistantConfig()` — it uses `.select()` to return only `assistantName, businessName, businessType, businessDescription, tone, theme, enableVoice, enableNavigation, pages` — the `geminiApiKey` field is explicitly excluded. Only the backend ever uses the API key.

**Q10: How does your JWT middleware work?**
> `isAuth.js` extracts `req.cookies.token`, verifies it with `jwt.verify(token, JWT_SECRET)`, and if valid, attaches `req.userId` and `req.user` to the request object. If the token is missing or invalid, it returns 401 Unauthorized.

---

### Database & Models

**Q11: How many collections do you have and why?**
> Two collections: `users` and `billings`. Users hold both account info and assistant config in one document (avoiding JOINs for the most frequent operation — fetching config). Billings are separate because it's a **one-to-many** relationship (one user → many payment records) and we need an audit trail.

**Q12: Why is `pageSchema` embedded in `userSchema` rather than a separate collection?**
> Pages are always accessed **together with** the user document — we never query pages independently. Embedding them avoids an extra database round-trip. MongoDB supports arrays of sub-documents natively, and with `{_id: false}`, we don't waste storage on unnecessary IDs.

**Q13: What's the purpose of `{timestamps: true}`?**
> Mongoose automatically adds `createdAt` and `updatedAt` fields to every document. This is useful for knowing when a user signed up, when they last updated their assistant, and when a payment was made — all without manually managing these fields.

**Q14: Why does `geminiStatus` exist?**
> It provides **real-time health monitoring** of the user's API key. When the Gemini API returns 401 (invalid key) or 429 (quota exceeded), we update this field. The Builder dashboard displays this status so users can self-diagnose issues without contacting support.

**Q15: How do you handle the free tier message limit?**
> The `totalMessages` counter increments only for free-plan users (`user.plan === "free"`). Before processing any message, we check `user.totalMessages >= user.requestLimit`. If exceeded, we return 403 with a message to upgrade. Pro users bypass this check entirely.

**Q16: How does the pro plan expiry work?**
> When payment is verified, we set `proExpiresAt = Date.now() + 90 days`. On every assistant request, we check `new Date(user.proExpiresAt) < new Date()`. If expired, we downgrade the user to free (`user.plan = "free"`) and return 400.

---

### API & Backend Logic

**Q17: How does the AI prompt engineering work?**
> The prompt is a **system context template** that includes: assistant name, business name, business type, business description, tone, and strict rules (keep replies under 15 words, be direct, talk naturally). This ensures the AI responds in character, with business-specific knowledge, in the right tone.

**Q18: How does the navigation feature work technically?**
> When a message arrives, we check if it starts with navigation keywords ("open", "go", "show", "navigate", "take me"). If yes, we iterate through the user's `pages` array and check if any page's `keywords` array includes a word that appears in the message. If a match is found, we return `{ action: "navigate", page: "/path" }` instead of calling Gemini.

**Q19: Why do you check `req.body.currentPath === matchedPage.path`?**
> To avoid unnecessary navigation. If the user says "Open pricing page" but they're already on the pricing page, we return "You are already on that page" instead of a redundant redirect.

**Q20: How does the Gemini API call work?**
> We use `fetch()` to call the REST endpoint `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=...`. The request body follows Google's format: `{ contents: [{ parts: [{ text: prompt }] }] }`. We parse the response and extract `data.candidates?.[0]?.content?.parts?.[0]?.text`.

**Q21: What error handling exists for the Gemini API?**
> We handle: (1) Missing API key → 403, (2) Non-OK HTTP response → parse error, update geminiStatus (401→invalid, 429→quota_exceeded), throw error, (3) Empty/null response → throw "No valid response from Gemini", (4) Network failures → caught by try/catch, logged.

**Q22: What is exponential backoff and where do you use it?**
> In `connectDb.js`, if MongoDB connection fails, we retry up to 5 times with increasing delays: 2s → 4s → 8s → 10s → 10s (capped). The formula is `Math.min(1000 * 2^attempt, 10000)`. This prevents overwhelming the database during temporary outages.

---

### Payments (Razorpay)

**Q23: Explain the complete Razorpay payment flow.**
> (1) Frontend calls POST `/create-order` with the plan name. (2) Backend creates a Razorpay order via SDK (`razorpay.orders.create()`), saves a billing record with status "created". (3) Frontend opens Razorpay checkout popup using the order details. (4) After payment, Razorpay calls the `handler` callback with payment IDs and signature. (5) Frontend sends these to POST `/verify-payment`. (6) Backend verifies the HMAC-SHA256 signature, updates billing to "paid", upgrades user to pro with 90-day expiry.

**Q24: How does Razorpay signature verification work?**
> We create an HMAC-SHA256 hash of `order_id + "|" + payment_id` using our Razorpay secret key. If this computed hash matches the `razorpay_signature` sent by the client, the payment is authentic. This prevents attackers from faking payment success callbacks.

**Q25: Why multiply amount by 100?**
> Razorpay expects amounts in the **smallest currency unit** (paise for INR). So ₹299 becomes 29900 paise. This is a common pattern in payment APIs to avoid floating-point precision issues.

---

### Frontend & React

**Q26: How does ProtectedRoute work?**
> It's a wrapper component that checks 3 states: (1) If `loading` is true → shows animated loading screen. (2) If `!user` → redirects to `/login` using `<Navigate>`. (3) If user exists → renders `{children}` (the protected content). This is the standard React auth guard pattern.

**Q27: Why lazy-load Spline on the login page?**
> Spline 3D scenes are heavy (~MB) and use WebGL. Lazy loading (`React.lazy()`) prevents blocking the main bundle. The `Suspense` boundary shows a lightweight CSS fallback while loading. The `ErrorBoundary` catches WebGL crashes on devices without GPU support.

**Q28: How does ScrollFadeText work?**
> It uses Framer Motion's `useScroll()` to track scroll progress of a container, then `useTransform()` to map each word's index to an opacity range. Word 0 fades in first, word N fades in last, creating a word-by-word reveal effect. Each word's opacity goes from 0.12 → 1 as the user scrolls past it.

**Q29: Why use `useEffect` with an empty dependency array in App.jsx?**
> `useEffect(() => { ... }, [])` runs **once on mount**. We use it to check if the user has a valid session cookie by calling `/api/user/current-user`. This is the "session restoration" pattern — if the cookie is still valid from a previous login, the user is automatically logged in without re-authenticating.

**Q30: How do you manage form state in the Builder?**
> We use a single `form` state object with all fields. The `handleChange(field, value)` function uses a computed property name to update any field: `setForm(prev => ({ ...prev, [field]: value }))`. This avoids creating separate state variables for 10+ fields.

**Q31: What is the Toaster component?**
> `react-hot-toast` provides non-blocking notification popups. `<Toaster position="top-right" />` renders the toast container once in App.jsx. Throughout the app, we call `toast.success()`, `toast.error()` etc. to show feedback without blocking the UI.

---

### Embeddable Widget (Deep Dive)

**Q32: What is an IIFE and why did you use it?**
> An IIFE (Immediately Invoked Function Expression) is a function that runs immediately when defined: `(function() { ... })()`. We use it to create a **private scope** — all variables (like `userId`, `assistantConfig`, `recognition`) are encapsulated and don't pollute the host website's global scope.

**Q33: How does `document.currentScript` work?**
> `document.currentScript` returns the `<script>` element that is currently being parsed/executed. We use it to read the `data-user-id` attribute: `script.dataset.userId`. This is how the widget knows which user's configuration to load.

**Q34: How does voice input work in the browser?**
> We use the Web Speech API's `SpeechRecognition` interface. We create an instance, set `continuous: false` (stop after one sentence), listen for the `onresult` event which gives us `e.results[0][0].transcript` (the transcribed text), then auto-send it as a message.

**Q35: How does Text-to-Speech work?**
> We use the Web `SpeechSynthesis` API. We create a `SpeechSynthesisUtterance` with the AI response text, set language to `hi-IN`, and call `window.speechSynthesis.speak(speech)`. The `onend` event fires when speaking finishes, allowing us to reset the UI state.

**Q36: How are CSS themes applied to the widget?**
> The widget container gets a class like `theme-dark`, `theme-light`, `theme-glass`, or `theme-neon`. In `assistant.css`, each theme variant uses CSS descendant selectors like `.voiceass.theme-dark .va-msg-ai` to apply theme-specific colors, backgrounds, and borders.

**Q37: What happens if SpeechRecognition isn't supported?**
> We check `window.SpeechRecognition || window.webkitSpeechRecognition`. If neither exists (e.g., Firefox without flags), clicking the mic shows an `alert("Speech recognition is not supported in this browser")`. The text input still works as a fallback.

---

### Performance & Best Practices

**Q38: How do you handle CORS pre-flight requests?**
> Express's `cors` middleware automatically handles OPTIONS pre-flight requests by responding with the correct `Access-Control-Allow-*` headers. For `privateCors`, it allows specific origins with credentials. For `publicCors`, it allows all origins.

**Q39: What happens if MongoDB goes down?**
> `connectDb.js` retries 5 times with exponential backoff. If all attempts fail, it calls `process.exit(1)` to crash the server — this is intentional so the process manager (PM2, Docker, etc.) can restart it. There's no point running a server that can't reach its database.

**Q40: How do you prevent the free tier from being abused?**
> Multiple layers: (1) `totalMessages` counter with `requestLimit` check on every request, (2) Each user must provide their own Gemini API key (so Google's own rate limits apply), (3) `geminiStatus` tracking prevents calls with invalid keys.

**Q41: How do you handle concurrent saves in the Builder?**
> The `saving` state disables the button (`disabled={saving}`) and shows a spinner, preventing double-clicks. On the backend, Mongoose's `user.save()` uses MongoDB's atomic operations.

**Q42: How is the widget CSS scoped to avoid conflicts?**
> All widget CSS selectors are prefixed with `.voiceass` or `.voiceass-trigger`. The CSS also includes a reset block (`margin: 0; padding: 0; box-sizing: border-box;`) scoped to `.voiceass *` to prevent inheritance from the host site's styles.

---

### Advanced Questions

**Q43: How would you deploy this to production?**
> (1) Replace `localhost` URLs with environment-specific URLs. (2) Build the React app with `npm run build` — output goes to `dist/`. (3) Serve the backend via PM2/Docker on a cloud platform (AWS EC2, Railway, Render). (4) Serve the frontend via Vercel/Netlify (static hosting). (5) Set `secure: true` on JWT cookies for HTTPS. (6) Use MongoDB Atlas for managed database. (7) Host `assistant.js` and `assistant.css` on a CDN for fast global delivery.

**Q44: How would you scale this for 100K users?**
> (1) Put the API behind a **load balancer** (Nginx/AWS ALB). (2) Add **Redis caching** for frequently accessed assistant configs. (3) Use **connection pooling** for MongoDB. (4) Move `assistant.js`/`assistant.css` to a **CDN** (CloudFront). (5) Add **rate limiting** per userId to prevent abuse. (6) Consider **WebSocket** for real-time chat instead of polling.

**Q45: What are the security vulnerabilities and how would you fix them?**
> (1) **No rate limiting** on the public assistant endpoint — add express-rate-limit. (2) **No input sanitization** on messages — add DOMPurify before displaying in the widget. (3) **JWT secret in .env** — use a secrets manager (AWS Secrets Manager). (4) **No HTTPS in dev** — enforce HTTPS in production with `secure: true` on cookies. (5) **Gemini API key stored in plaintext** — encrypt at rest using AES-256.

**Q46: How would you add real-time streaming responses?**
> Replace the current `fetch`/`response` pattern with **Server-Sent Events (SSE)**: The backend would stream Gemini's response token-by-token, and the widget would use `EventSource` to append text in real-time — like ChatGPT's typing effect.

**Q47: What is `{_id: false}` in pageSchema?**
> By default, Mongoose adds an `_id` field (ObjectId) to every sub-document. Since pages are embedded in the user document and never queried independently, the extra `_id` wastes storage and adds no value. `{_id: false}` disables it.

**Q48: Why use `express.urlencoded({ extended: true })`?**
> This middleware parses URL-encoded form data. `extended: true` uses the `qs` library which supports nested objects (`user[name]=John`). It's needed in case any form submissions use URL-encoded format instead of JSON.

**Q49: What is the difference between `user.save()` and `User.findByIdAndUpdate()`?**
> `user.save()` triggers Mongoose middleware (pre/post save hooks), runs validators, and works on the in-memory document. `findByIdAndUpdate()` is an atomic operation that bypasses middleware but is faster for simple updates. We use `save()` in the assistant controller because we need to modify multiple fields and update `geminiStatus` dynamically.

**Q50: How do you handle the "builder" page having both view and edit modes?**
> We use a boolean state `editAssistant`. When `user.isSetupComplete && !editAssistant`, we show the dashboard view with stats and embed code. When `!user.isSetupComplete || editAssistant`, we show the edit forms. The "Edit" button sets `editAssistant = true`, and "Cancel" or "Save" sets it back to `false`.

**Q51: Why does the assistant prompt say "Keep replies under 15 words"?**
> Because this is a **voice assistant** — responses are spoken aloud. Long AI responses create a poor voice experience (users have to wait). Short, punchy responses feel natural and are quicker for TTS to pronounce.

**Q52: How does `navigator.clipboard.writeText()` work in the Builder?**
> It's a modern browser API that writes text to the system clipboard. We use it in the "Copy Embed Code" button. It returns a Promise and requires the page to have focus (security restriction). We wrap it with `toast.success("Copied!")` for user feedback.

**Q53: What design patterns are used in this project?**
> (1) **MVC** — Models/Controllers/Routes separation on the backend. (2) **IIFE Module Pattern** — Widget encapsulation. (3) **Observer Pattern** — React's state-driven re-renders. (4) **Guard Pattern** — ProtectedRoute for auth. (5) **Strategy Pattern** — Theme-based styling (swap themes without changing logic). (6) **Factory Pattern** — Razorpay order creation.

**Q54: Explain the flow when a user asks "Open pricing page" on an external website.**
> (1) User clicks mic button → SpeechRecognition starts → User says "Open pricing page" → `recognition.onresult` fires with transcript "Open pricing page". (2) Widget sends POST to `/api/assistant/ask-assistant` with `{ message: "Open pricing page", userId: "abc" }`. (3) Backend: lowercase + trim → "open pricing page". (4) Checks `enableNavigation` is true. (5) "open" is in navigationWords → `wantsNavigation = true`. (6) Iterates pages → finds "Pricing" page with keyword "pricing" matching. (7) Checks `currentPath !== "/pricing"`. (8) Returns `{ action: "navigate", page: "/pricing", response: "Opening Pricing" }`. (9) Widget receives response → `window.location.href = "/pricing"` → browser navigates.

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👤 Author

Built as a full-stack SaaS portfolio project demonstrating: real-time AI integration, embeddable widget architecture, payment gateway integration, Google OAuth, and voice-enabled web interfaces.
