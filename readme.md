# Termi-Gotchi 👾
> **The CLI Tamagotchi that feeds on your code commits.**

![Termi-Gotchi](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q1bnJ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5/POU/giphy.gif) 
*(Note: Imagine a cool CLI pet here)*

**Termi-Gotchi** gamifies your git workflow. It lives in your terminal and gets hungry if you don't commit code. The more you code, the happier it gets!

## 🎮 How to Play (The Use Plan)

### 1. Adopt your Pet
Install the tool globally so you can summon it anywhere.
```bash
npm install -g termi-gotchi
```

### 2. Setup its Home (The Git Hook)
Go to any git repository you are working on. This will be your pet's feeding ground.
```bash
termi-gotchi init
```
*This installs a `post-commit` hook. Now, every time you commit in this repo, your pet gets fed.*

### 3. The Feeding Cycle
*   **Hunger**: Your pet gets hungry if you don't feed it (commit code) for **4 hours**.
*   **Snacks**: Small commits give a little XP.
*   **Meals**: Large commits give more XP.
*   **Super Foods (Refactoring)**: Deleting lines of code gives **5x XP** compared to adding lines. Termi-Gotchi loves clean code!

### 4. Check on your Pet
Type this anytime to see its status, mood, and level:
```bash
termi-gotchi
```

## 🌟 Features
*   **Persistent State**: Your pet's health and level stay with you.
*   **Git Integration**: Works automatically with your existing workflow.
*   **RPG Elements**: Level up from "Junior Dev" to "10x Engineer" (Leveling logic inside!).
*   **Moods**:
    *   **Happy** ( ^_^) - Well fed.
    *   **Hungry** ( 0_0 ) - Needs code!
    *   **Sleeping** ( -_- ) - Resting.

## 📦 Installation

```bash
npm install -g termi-gotchi
```

## 🛠 Tech Stack
Built with [Ink](https://github.com/vadimdemedes/ink) (React for CLI), `simple-git`, and `conf`.
