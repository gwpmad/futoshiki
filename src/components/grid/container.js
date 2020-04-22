import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  `}
`;

export default Container;
