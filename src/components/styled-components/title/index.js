import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.green};
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 0;
    text-align: center;
  `}
`;
