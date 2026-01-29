# ⚡ FlexBot

**The Ultimate On-Demand Browser Automation Tool.**

FlexBot is a lightweight, high-performance Chrome Extension designed for "Grind Mode." It allows you to map any website button (like "Next", "Skip", or "Submit") to a keyboard shortcut of your choice.

Unlike other bots, FlexBot stays **dormant** until you need it, injects a sleek **Glassmorphism UI** only when requested, and can be completely unloaded with a single click.

## 🚀 Features

* **On-Demand Architecture:** Does not run in the background. Only loads when you click the extension icon.
* **Modern UI:** Draggable, semi-transparent "Glass" overlay that fits any modern web aesthetic.
* **Smart Docking:** The floating bubble magnetically snaps to the nearest screen edge.
* **Persistence:** Remembers your window position, minimized state, and active rules even after page reloads.
* **Stealth Mode:** Minimizes into a tiny ⚡ bubble to keep your workspace clear.
* **Zero-Inference:** No data collection. Everything runs locally in your browser.

## 🛠️ Installation

Since this is a developer tool, you will install it via **"Developer Mode"** in Chrome:

1.  **Clone or Download** this repository to a folder on your computer.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Toggle **Developer mode** (top right switch).
4.  Click **Load unpacked**.
5.  Select the `FlexBot` folder.

## 🎮 How to Use

1.  **Activate:** Click the ⚡ / **Puzzle icon** in your Chrome toolbar. The panel will appear.
2.  **Configure:**
    * **Target Selector:** Enter the `ID` (e.g., `#next-btn`) or `Class` (e.g., `.submit-button`) of the element you want to click.
    * **Trigger Key:** Enter the key you want to use (e.g., `n`, `Enter`, `space`).
3.  **Engage:** Click **ACTIVATE**.
4.  **Grind:** Press your hotkey to click the element instantly.
5.  **Exit:** Click the **X** button on the panel to completely unload the bot from the page.

## 💡 Pro Tips

* **Finding Selectors:** Right-click the button you want to automate, select **Inspect**, and look for `id="something"`. Enter `#something` in FlexBot.
* **Classes:** If there is no ID, use the class name with a dot (e.g., `.btn-primary`).
* **Auto-Fix:** If you forget the `#` for an ID, FlexBot's smart logic will attempt to add it for you automatically.

## 🤝 Contributing

This is a research-grade tool. Feel free to fork, modify, and submit Pull Requests if you want to add features like Macro Recording or Multi-Step workflows.



