import BranchDisplay from "./commit/BranchDisplay";
import CommitForm from "./commit/CommitForm";
import StagedFiles from "./commit/StagedFiles";
import {useEffect, useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import {monokaiTheme} from "./styles/theme";
import TitleBar from "./TitleBar";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background-color:
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%
`;

export default function App() {

  const [branch, setBranch] = useState<string | null>(null);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [types] = useState(["feat: A new feature", "fix: A bug fix", "docs: Documentation"]);
  const [scopes] = useState(["No scope", "UI", "Backend", "Database"]);

  useEffect(() => {
    window.electron.onBranchData((gitInfo) => {
      setBranch(gitInfo.branch);
      setStagedFiles(gitInfo.stagedFiles);
    });
  }, []);

  return (
      <ThemeProvider theme={monokaiTheme}>
        <GlobalStyles />
        <TitleBar />
    <AppContainer>
      <BranchDisplay branch={branch} />
      <ContentContainer>
        <CommitForm types={types} scopes={scopes} />
        <StagedFiles files={stagedFiles} />
      </ContentContainer>
    </AppContainer>
      </ThemeProvider>
  );
}
