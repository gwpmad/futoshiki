import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme, greaterThan }) => {
    let chevronAlignment = '';

    switch (greaterThan) {
      case 'right':
        chevronAlignment = css`
          &:after {
            content: '❯';
            font-size: smaller;
            position: absolute;
            right: 114%;
          }
        `;
        break;
      case 'left':
        chevronAlignment = css`
          &:after {
            content: '❮';
            font-size: smaller;
            position: absolute;
            left: 114%;
          }
        `;
        break;
      case 'above':
        chevronAlignment = css`
          &:after {
            content: '❮';
            font-size: smaller;
            transform: rotate(90deg);
            position: absolute;
            bottom: 98%;
          }
        `;
        break;
      case 'below':
        chevronAlignment = css`
          &:after {
            content: '❯';
            font-size: smaller;
            transform: rotate(90deg);
            position: absolute;
            top: 98%;
          }
        `;
        break;
      default:
    }

    return css`
      align-items: center;
      background-color: ${theme.colors.white};
      border: solid 3px ${theme.colors.green};
      cursor: pointer;
      display: flex;
      flex-basis: 0; /* sets the main size for all blocks */
      flex-grow: 1; /* allows the same growth for all blocks, to a factor of their main size */
      flex-shrink: 0; /* allows shrink down to main size (flex-basis) if the row/grid is thinner than all blocks put together */
      font-size: 40px;
      justify-content: center;
      margin: 15px;
      position: relative;
      user-select: none;

      &:before {
        padding-top: 100%; /* gives the box height - percentages are based on the WIDTH of the containing box so box width and height will scale together */
        content: '';
        float: left;
      }

      ${chevronAlignment}
    `;
  }}
`;

export default Container;
