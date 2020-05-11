import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ gameCompleted, theme: { colors } }) => css`
    align-items: center;
    background-image: radial-gradient(
      ${colors.lightTurquoise},
      ${colors.darkTurquoise}
    );
    display: flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    height: 100%;
    justify-content: center;
    position: relative;
    z-index: 1;

    &:before {
      background-image: radial-gradient(
        ${colors.limeGreen},
        ${colors.faintLimeGreen}
      );
      bottom: 0;
      content: '';
      left: 0;
      opacity: ${gameCompleted ? '1' : '0'};
      position: absolute;
      transition: opacity 0.3s linear;
      right: 0;
      top: 0;
      z-index: -1;
    }
  `}
`;

export default Container;
