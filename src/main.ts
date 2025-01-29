import { app, BrowserWindow, ipcMain } from "electron";
import { execSync } from "child_process";
import path from "path";

let isDev = false; // Default to production
import("electron-is-dev")
  .then((mod) => {
    isDev = mod.default;
    console.log("Running in Development Mode:", isDev);
  })
  .catch(() => console.log("⚠️ Failed to load electron-is-dev, assuming production."));


console.log("Electron is starting... Looking for main.js at:", __dirname);

let mainWindow: BrowserWindow | null = null;

function getGitInfo() {
  try {
    // Check if the current directory is a Git repository
    const insideWorkTree = execSync("git rev-parse --is-inside-work-tree", { stdio: "pipe" }).toString().trim();

    if (insideWorkTree !== "true") {
      throw new Error("Not a Git repository");
    }

    const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
    const stagedFiles = execSync("git diff --name-only --cached").toString().trim().split("\n").filter(Boolean);

    return { branch, stagedFiles };
  } catch (error: any) {
    console.warn("⚠️  Git repository not found. Running without Git integration.");
    return { branch: "No Git Repo", stagedFiles: [], error: "Not a Git repository or Git is missing." };
  }
}

const appURL = isDev
  ? "http://localhost:5173"
  : `file://${path.join(__dirname, "index.html")}`;

async function loadApp(window: BrowserWindow) {
  console.log("Loading app from:", appURL);

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      await window.loadURL(appURL);
      console.log("App loaded successfully.");
      return;
    } catch (err) {
      console.error(`Attempt ${attempts + 1} failed to load app:`, err);
      attempts++;
      await new Promise((res) => setTimeout(res, 2000)); // Wait 2 seconds
    }
  }
  console.error("Failed to load the app after multiple attempts.");
}

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 550,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  loadApp(mainWindow)


});

// Listen for frontend requests
ipcMain.on("request-branch-update", (event) => {
  event.sender.send("branch-data", getGitInfo());
});

// Handle window minimize request
ipcMain.on("window-minimize", () => {
  mainWindow?.minimize();
});

// Handle window close request
ipcMain.on("window-close", () => {
  mainWindow?.close();
});