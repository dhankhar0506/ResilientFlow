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

## 📚 Topic Coverage

The goal of ResilientFlow is to eventually cover the full computer science & software development curriculum — from how a CPU executes an instruction to how a production system scales. Here's where things stand:

### 🌐 Networking
| Lesson | Status |
|---|---|
| HTTP Request & Response | ✅ Available |
| TCP · TLS · connection handshakes | 🚧 Planned |
| DNS lookup, step by step | 🚧 Planned |
| OSI & TCP/IP layers explained | 🚧 Planned |
| Packet journey (encapsulation/decapsulation) | 🚧 Planned |
| ARP & MAC addressing | 🚧 Planned |
| IP addressing & subnetting | 🚧 Planned |

### 💻 Computer Fundamentals
| Lesson | Status |
|---|---|
| Binary, memory & storage | 🚧 Planned |
| How the CPU executes instructions | 🚧 Planned |

### ⚙️ Operating Systems
| Lesson | Status |
|---|---|
| Processes & threads | 🚧 Planned |
| Scheduling & memory management | 🚧 Planned |
| Filesystems & Linux fundamentals | 🚧 Planned |

### 🧩 Programming & Runtime
| Lesson | Status |
|---|---|
| Compiled vs. interpreted languages | 🚧 Planned |
| Runtime engines & debugging | 🚧 Planned |

### 🕸️ Web & Browser
| Lesson | Status |
|---|---|
| How a browser renders a page | 🚧 Planned |
| Cookies, sessions & auth | 🚧 Planned |

### 🛠️ Backend & APIs
| Lesson | Status |
|---|---|
| REST API design | 🚧 Planned |
| Queues, caching & WebSockets | 🚧 Planned |

### 🗄️ Databases
| Lesson | Status |
|---|---|
| SQL vs NoSQL | 🚧 Planned |
| Indexes, transactions & replication | 🚧 Planned |

### ☁️ Cloud & DevOps
| Lesson | Status |
|---|---|
| Docker & containers | 🚧 Planned |
| CI/CD pipelines | 🚧 Planned |
| Load balancers & monitoring | 🚧 Planned |

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
