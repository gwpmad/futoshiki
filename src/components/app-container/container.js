import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme: { colors } }) => css`
    height: 100%;
    background: radial-gradient(${colors.midBlue}, ${colors.blue});
    display: flex;
    justify-content: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  `}
`;

export default Container;
