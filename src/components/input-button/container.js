import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme: { colors }, gameCompleted }) => {
    return css`
      align-items: center;
      border-radius: 100%;
      color: ${colors.darkBrown};
      cursor: pointer;
      display: flex;
      flex-basis: 0; /* sets the main size for all blocks */
      flex-grow: 1; /* allows the same growth for all blocks, to a factor of their main size */
      flex-shrink: 0; /* allows shrink down to main size (flex-basis) if the row/grid is thinner than all blocks put together */
      font-size: 40px;
      justify-content: center;
      position: relative;
      transition: color 0.3s linear, opacity 0.3s linear;
      user-select: none;
      opacity: ${gameCompleted ? 0 : 1};

      &:before {
        padding-top: 100%; /* gives the box height - percentages are based on the WIDTH of the containing box so box width and height will scale together */
        content: '';
        float: left;
      }

      &:active {
        background-color: ${colors.lightBlue};
      }
      @media (min-width: 400px) {
        &:hover {
          background-color: ${colors.lightBlue};
        }
      }
    `;
  }}
`;

export default Container;
