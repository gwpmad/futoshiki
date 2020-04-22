import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  `}
`;

export default Container;
