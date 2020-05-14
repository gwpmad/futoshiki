import styled, { css } from 'styled-components';

function getDirectionStyles(direction) {
  switch (direction) {
    case 'right':
      return `left: 114%;`;
    case 'left':
      return `right: 114%;
      transform: rotate(180deg);`;
    case 'above':
      return `transform: rotate(270deg);
      bottom: 98%;`;
    case 'below':
      return `transform: rotate(90deg);
      top: 98%;`;
    default:
      return '';
  }
}

const Container = styled.div`
  ${({ direction, theme: { colors } }) => css`
    color: ${colors.lightBlack};
    cursor: auto;
    font-size: 33px;
    position: absolute;
    ${getDirectionStyles(direction)}
  `}
`;

export default Container;
