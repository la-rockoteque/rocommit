import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  requestBranchUpdate: () => ipcRenderer.send("request-branch-update"),
  onBranchData: (callback: (data: { branch: string | null; stagedFiles: string[] }) => void) =>
    ipcRenderer.on("branch-data", (_event, data) => callback(data)),
});
