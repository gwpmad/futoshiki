import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ gameCompleted, theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    border-radius: 4px;
    color: ${colors.lightBlack};
    cursor: pointer;
    font-size: 10px;
    padding: 5px;
    transition: opacity 0.3s linear;
    opacity: ${gameCompleted ? 0 : 1};
    width: 96px;
    margin-right: 15px;

    &:focus {
      outline: none;
    }

    &:active {
      background-color: ${colors.lightBlue};
    }
    @media (min-width: 400px) {
      &:hover {
        background-color: ${colors.lightBlue};
      }
    }

    .keyboard-shortcut {
      margin: 0;
      font-size: 11px;
    }
  `}
`;

export default Container;
