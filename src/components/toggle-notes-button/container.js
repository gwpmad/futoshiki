import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ gameCompleted, theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    border-radius: 4px;
    color: ${colors.lightBlack};
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
    margin-right: 15px;
    padding: 5px;
    transition: opacity 0.3s linear;
    opacity: ${gameCompleted ? 0 : 1};
    width: 96px;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: ${colors.lightBlue};
    }

    .keyboard-shortcut {
      margin: 0;
      font-size: 11px;
    }
  `}
`;

export default Container;
