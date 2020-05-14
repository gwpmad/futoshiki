import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    border-radius: 4px;
    color: ${colors.lightBlack};
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
    margin-right: 15px;
    padding: 5px;
    width: 96px;

    &:focus {
      outline: none;
    }
  `}
`;

export default Container;
