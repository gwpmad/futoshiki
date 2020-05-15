import styled, { css } from 'styled-components';

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: white;
    border: 3px solid ${colors.lightBlack};
    border-radius: 4px;
    color: ${colors.lightBlack};
    cursor: pointer;
    font-size: 25px;
    padding: 5px 20px 6px;

    /* 
      Centre the button
      The translate percentage refers to the width of the item itself. Left 50% pushes all of the item past 50% of the positioned ancestor so the translate
      is required to push half of it back the other way and properly centre it
      From this great SO answer: https://stackoverflow.com/questions/32551291/in-css-flexbox-why-are-there-no-justify-items-and-justify-self-properties/33856609#33856609
    */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
      background-color: ${colors.lightBlue};
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default Container;
