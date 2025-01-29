import styled from "styled-components";

interface StagedFilesProps {
  files: string[];
}

const StagedFiles: React.FC<StagedFilesProps> = ({ files }) => {
  return (
    <StagedFilesContainer className="staged-files">
      <StagedFilesTitle>Staged Files</StagedFilesTitle>
      {files.length === 0 ? <p>No staged files.</p> : (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>{file}</FileItem>
          ))}
        </FileList>
      )}
    </StagedFilesContainer>
  );
}

export default StagedFiles;

const StagedFilesContainer = styled.div`
  background: #2d2f3b;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
  min-height: 100px;
`;

const StagedFilesTitle = styled.h2`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 10px;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FileItem = styled.li`
  background: #232533;
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  font-size: 0.9rem;
`;