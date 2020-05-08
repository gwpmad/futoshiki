import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ gameCompleted, theme: { colors } }) => css`
    align-items: center;
    background: ${gameCompleted
      ? `radial-gradient(${colors.gold}, ${colors.red})`
      : `radial-gradient(${colors.midBlue}, ${colors.blue})`};
    display: flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    height: 100%;
    justify-content: center;
  `}
`;

export default Container;
