import BranchDisplay from "./components/BranchDisplay";
import CommitForm from "./components/CommitForm";
import StagedFiles from "./components/StagedFiles";

export default function App() {
  return (
    <div className="app-container">
      <BranchDisplay />
      <CommitForm />
      <StagedFiles />
    </div>
  );
}
