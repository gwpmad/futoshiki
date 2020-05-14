import styled, { css } from 'styled-components';

const Note = styled.div`
  ${({ isActive }) => css`
    font-weight: ${isActive ? 'bold' : 'inherit'};
    opacity: ${isActive ? 1 : 0.25};
  `}
`;

export default Note;
