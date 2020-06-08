import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Loading = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  &:before {
    content: ' ';
    display: block;
    width: 24px;
    height: 24px;
    margin: 1px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: rgba(255, 255, 255, 0.6) rgba(255, 255, 255, 0.6)
      rgba(255, 255, 255, 0.6) transparent;
    animation: ${rotation} 1.2s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Loading;
