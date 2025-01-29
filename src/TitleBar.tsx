// src/components/TitleBar.tsx
import React from "react";
import styled from "styled-components";

const TitleBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.text};
  height: 30px;
  padding: 0 10px;
  -webkit-app-region: drag; /* Allows dragging */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  -webkit-app-region: no-drag; /* Prevents buttons from being draggable */
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const WindowButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.danger}; /* Turns red on hover */
  }
`;

const TitleBar: React.FC = () => {
  return (
    <TitleBarContainer>
      <Title>ROcommit</Title>
      <ButtonContainer>
        <WindowButton onClick={() => window.electron.minimizeWindow()}>-</WindowButton>
        <WindowButton onClick={() => window.electron.closeWindow()}>✕</WindowButton>
      </ButtonContainer>
    </TitleBarContainer>
  );
};

export default TitleBar;
