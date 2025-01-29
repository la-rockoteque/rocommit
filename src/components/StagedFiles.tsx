import { useEffect, useState } from "react";

export default function StagedFiles() {
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);

  useEffect(() => {
    window.electron.onBranchData((gitInfo) => {
      setStagedFiles(gitInfo.stagedFiles || []);
    });

    window.electron.requestBranchUpdate();
  }, []);

  return (
    <div className="staged-files">
      <h2>Staged Files</h2>
      {stagedFiles.length === 0 ? <p>No staged files.</p> : (
        <ul>
          {stagedFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
