import styled from "styled-components";
import {Label} from "./Label";

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.muted};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border-radius: 4px;
`;

const Container = styled.div`
  padding: 16px 8px;
`;

interface SelectProps {
  label: string;
  children: any;
}

export const Select: React.FC<SelectProps> = ({label, children}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledSelect>
        {children}
      </StyledSelect>
    </Container>)
}
