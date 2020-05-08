import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ containsValueClue, gameCompleted, isActive, theme: { colors } }) => {
    let color = containsValueClue ? colors.lightBlack : colors.pastelBlue;
    if (gameCompleted) color = colors.gold;

    return css`
      align-items: center;
      background-color: ${colors.white};
      border: solid 3px ${isActive ? colors.transparent : colors.lightBlack};
      color: ${color};
      cursor: pointer;
      display: flex;
      flex-basis: 0; /* sets the main size for all blocks */
      flex-grow: 1; /* allows the same growth for all blocks, to a factor of their main size */
      flex-shrink: 0; /* allows shrink down to main size (flex-basis) if the row/grid is thinner than all blocks put together */
      font-size: 40px;
      justify-content: center;
      margin: 15px;
      position: relative;
      transition: color 0.5s ease;
      user-select: none;

      &:before {
        padding-top: 100%; /* gives the box height - percentages are based on the WIDTH of the containing box so box width and height will scale together */
        content: '';
        float: left;
      }

      &:hover {
        background-color: ${isActive ? colors.white : colors.lightBlue};
      }

      .chevron {
        color: ${colors.lightBlack};
        cursor: auto;
        font-size: smaller;
        position: absolute;
      }

      .chevron--right {
        left: 114%;
      }

      .chevron--left {
        right: 114%;
        transform: rotate(180deg);
      }

      .chevron--above {
        transform: rotate(270deg);
        bottom: 98%;
      }

      .chevron--below {
        transform: rotate(90deg);
        top: 98%;
      }
    `;
  }}
`;

export default Container;
