import { useState } from "react";

export default function CommitForm() {
  const [description, setDescription] = useState<string>("");

  return (
    <div className="commit-form">
      <h1>rocommit</h1>
      <form>
        <div>
          <label>Type:</label>
          <select>
            <option value="feat">feat: A new feature</option>
            <option value="fix">fix: A bug fix</option>
          </select>
        </div>
        <div>
          <label>Short description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button>Save Commit Message</button>
      </form>
    </div>
  );
}
