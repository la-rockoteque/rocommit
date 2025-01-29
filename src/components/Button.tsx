import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease-in-out, transform 0.1s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.colors.secondary}; /* Cyan on hover */
    transform: scale(1.05);
  }

  &:active {
    background: ${(props) => props.theme.colors.success}; /* Green when clicked */
    transform: scale(0.95);
  }

  &:disabled {
    background: ${(props) => props.theme.colors.muted}; /* Muted for disabled */
    cursor: not-allowed;
  }
`;

export default Button;