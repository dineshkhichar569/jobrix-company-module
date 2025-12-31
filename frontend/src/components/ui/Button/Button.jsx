import styled from "styled-components";

const StyleButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;

background: ${({ variant }) => {
  if (variant === "primary")
    return "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)";

  if (variant === "secondary")
    return "linear-gradient(135deg, #9a3412 0%, #f97316 100%)";

  if (variant === "third") return "linear-gradient(135deg, #7f00ff, #e100ff)";

  // return "linear-gradient(135deg, #e5e7eb, #d1d5db)";
  return "transparent";
}};

color: ${({ variant }) => {
  if (variant === "primary") return "white";
  if (variant === "secondary") return "black";
  if (variant === "third") return "white";
  return "black";
}};

${({ variant }) => {
  if (variant === "ghost") {
    return `
    &:hover {
              background: linear-gradient(135deg, #2FA39A, #249C8F);
              color: white;
            }`;
  }
  return "";
}}
  &:hover {
    transform: translateY(-1px);
    box-shadow:
      0 10px 26px rgba(37, 99, 235, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 4px 12px rgba(37, 99, 235, 0.35);
  }

  &:disabled {
    background: linear-gradient(135deg, #c7d2fe, #e0e7ff);
    color: #6b7280;
    cursor: not-allowed;
    box-shadow: none;

`;

function Button({ children, variant = "", ...props }) {
  return (
    <StyleButton variant={variant} {...props}>
      {children}
    </StyleButton>
  );
}

export default Button;
