# 🧠 ResilientFlow

**Learn Computer Science & Software Development visually — not from definitions, but from watching things happen.**

ResilientFlow is an interactive learning platform that breaks down how computers, networks, and software actually work, one step at a time. Instead of walls of text, every topic is a hands-on visual simulation you click through — see a packet travel across the internet, watch a TCP handshake happen, follow an HTTP request from browser to server and back.

Built for students, self-taught developers, and anyone who's tired of "just memorize it" explanations.

---

## ✨ Features

- 🧩 **Learn by simulation** — step through real processes (DNS lookups, TCP handshakes, HTTP requests) instead of reading static diagrams
- 🌗 **Light & Dark mode** — full theme toggle, easy on the eyes any time of day
- 🌐 **English & Hinglish** — every lesson is available in plain English or a casual Hindi-English mix, so explanations feel natural, not textbook-y
- 📂 **Topic-based sidebar** — browse by subject, drill into sub-topics, jump straight to the concept you're stuck on
- ⚡ **Fast & lightweight** — built with Vite + React, no bloated backend, runs entirely in the browser

---

# 🧠 ResilientFlow

**Learn Computer Science & Software Development visually — not from definitions, but from watching things happen.**

ResilientFlow is an interactive learning platform that breaks down how computers and software systems actually work, one step at a time. Instead of walls of text, every topic is a hands-on visual simulation you click through — watch a packet travel across the internet, step through how a browser renders a page, see how a database executes a query.

**Networking is where this project started, not where it ends.** The plan is to build out a full computer science + software development curriculum across five core pillars — **Frontend, Backend, Networking, Operating Systems, and DBMS** — each broken into the same kind of step-by-step visual lessons.

Built for students, self-taught developers, and anyone who's tired of "just memorize it" explanations.

---

## ✨ Features

- 🧩 **Learn by simulation** — step through real processes (DNS lookups, TCP handshakes, HTTP requests, query execution, rendering pipelines) instead of reading static diagrams
- 🌗 **Light & Dark mode** — full theme toggle, easy on the eyes any time of day
- 🌐 **English & Hinglish** — every lesson is available in plain English or a casual Hindi-English mix, so explanations feel natural, not textbook-y
- 📂 **Topic-based sidebar** — browse by subject, drill into sub-topics, jump straight to the concept you're stuck on
- ⚡ **Fast & lightweight** — built with Vite + React, no bloated backend, runs entirely in the browser

---

## 📚 Curriculum

ResilientFlow is being built around five core pillars of computer science and software development. Networking is the first one being fleshed out in full; the rest are actively being worked on next.

### 🌐 Networking — *in progress*
| Lesson | Status |
|---|---|
| HTTP Request & Response | ✅ Available |
| TCP · TLS · connection handshakes | 🚧 Planned |
| DNS lookup, step by step | 🚧 Planned |
| OSI & TCP/IP layers explained | 🚧 Planned |
| Packet journey (encapsulation/decapsulation) | 🚧 Planned |
| ARP & MAC addressing | 🚧 Planned |
| IP addressing & subnetting | 🚧 Planned |

### 🎨 Frontend Development — *planned*
| Lesson | Status |
|---|---|
| How a browser parses & renders a page (HTML → DOM → paint) | 🚧 Planned |
| The critical rendering path & reflow/repaint | 🚧 Planned |
| The JavaScript event loop, visually | 🚧 Planned |
| State management & re-renders (React lifecycle) | 🚧 Planned |
| Browser storage: cookies vs localStorage vs sessionStorage | 🚧 Planned |

### 🛠️ Backend Development — *planned*
| Lesson | Status |
|---|---|
| Anatomy of a REST API request | 🚧 Planned |
| Authentication & sessions vs tokens (JWT) | 🚧 Planned |
| Middleware pipelines, step by step | 🚧 Planned |
| Caching, queues & rate limiting | 🚧 Planned |
| WebSockets vs polling | 🚧 Planned |

### ⚙️ Operating Systems — *planned*
| Lesson | Status |
|---|---|
| Processes vs threads | 🚧 Planned |
| CPU scheduling algorithms | 🚧 Planned |
| Memory management & paging | 🚧 Planned |
| Filesystems, step by step | 🚧 Planned |
| Deadlocks & synchronization | 🚧 Planned |

### 🗄️ DBMS — *planned*
| Lesson | Status |
|---|---|
| How a query actually executes (parser → optimizer → executor) | 🚧 Planned |
| Indexes: why they speed things up | 🚧 Planned |
| Transactions & ACID, visualized | 🚧 Planned |
| Normalization, step by step | 🚧 Planned |
| SQL vs NoSQL: when and why | 🚧 Planned |
| Replication & sharding | 🚧 Planned |

### 🎁 Bonus topics — *stretch goals*
Computer fundamentals (binary, CPU execution), cloud & DevOps (Docker, CI/CD, load balancers) — planned once the five core pillars above are further along.

> Have a topic you want prioritized? Open an issue or start a discussion — the roadmap is driven by what learners actually need.

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite** — build tooling & dev server
- **MUI (Material UI)** — component library & theming
- Zero backend — 100% static, runs anywhere

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/resilientflow.git
cd resilientflow

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── App.tsx                     # App shell: sidebar + top bar + theme/language state
├── theme.ts                    # Light & dark MUI theme definitions
├── i18n.ts                     # UI strings + lesson content (English & Hinglish)
├── components/
│   ├── Sidebar.tsx              # Topic / sub-topic navigation
│   └── TopBar.tsx                # Language & theme toggles
└── modules/
    ├── learning/
    │   └── Overview.tsx          # Dashboard / topic overview page
    └── network/
        ├── components/           # Individual lesson visualizations
        └── data/                 # Lesson reference data
```

---

## 🤝 Contributing

New lesson ideas, translation improvements, and bug fixes are all welcome. To add a new lesson:

1. Add its content (English + Hinglish) to `src/i18n.ts`
2. Build the visualization component under `src/modules/network/components/` (or a new module folder for a new subject)
3. Wire it into `Sidebar.tsx` and `App.tsx`

---

## 📄 License

MIT — free to use, learn from, and build on.
