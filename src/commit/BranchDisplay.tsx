import styled from "styled-components";

const BranchContainer = styled.div`
 position: absolute;
  top: 10px;
  right: 10px;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.background};
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
`;

interface BranchDisplayProps {
  branch: string | null;
}

const BranchDisplay: React.FC<BranchDisplayProps> = ({ branch }) => {
  return <BranchContainer>{branch ? `Branch: ${branch}` : "Loading branch..."}</BranchContainer>;
}

export default BranchDisplay;