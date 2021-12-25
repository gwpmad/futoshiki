import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 90%;
    font-size: 11px;
    @media (min-width: 400px) {
      font-size: 13px;
    }
    @media (min-width: 500px) {
      font-size: 16px;
    }
  `}
`;

export default Container;
