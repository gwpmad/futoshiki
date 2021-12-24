import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    border-radius: 4px;
    color: ${colors.lightBlack};
    cursor: pointer;
    font-size: 25px;
    padding: 5px 20px 6px;
    font-size: 4vw; // allow box to shrink with screen size, otherwise font size prevents it

    &:hover {
      background-color: ${colors.lightBlue};
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default Container;
