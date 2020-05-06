import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.lightBlack};
    margin-top: 0;
    margin-bottom: 4px;
    text-align: center;
  `}
`;
