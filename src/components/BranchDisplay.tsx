import { useEffect, useState } from "react";

export default function BranchDisplay() {
  const [branch, setBranch] = useState<string>("Loading branch...");

  useEffect(() => {
    window.electron.onBranchData((gitInfo) => {
      setBranch(gitInfo.branch || "⚠️ No Git repository detected");
    });

    window.electron.requestBranchUpdate();
  }, []);

  return (
    <div className="branch-header">
      <span>{branch}</span>
    </div>
  );
}