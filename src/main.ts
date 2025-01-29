import { app, BrowserWindow, ipcMain } from "electron";
import { execSync } from "child_process";
import path from "path";

let isDev = false;

import("electron-is-dev")
  .then((mod) => {
    isDev = mod.default;
    console.log("Running in Development Mode:", isDev);
  })
  .catch(() => console.log("Failed to load electron-is-dev, assuming production."));


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

  const appURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(appURL);

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow?.webContents.send("branch-data", getGitInfo());
  });
});

// Listen for frontend requests
ipcMain.on("request-branch-update", (event) => {
  event.sender.send("branch-data", getGitInfo());
});