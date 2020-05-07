import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    color: ${colors.lightBlack};
    font-size: 25px;
    padding: 3px 20px;
  `}
`;

export default Container;
