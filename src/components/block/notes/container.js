import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
    display: flex;
    font-size: 16px;
    justify-content: space-around;
    width: 90%;
  `}
`;

export default Container;
