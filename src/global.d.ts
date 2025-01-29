export {};

declare global {
  interface Window {
    electron: {
      requestBranchUpdate: () => void;
      onBranchData: (callback: (data: { branch: string | null; stagedFiles: string[] }) => void) => void;
      minimizeWindow: () => void,
      closeWindow: () => void,
    };
  }
}
