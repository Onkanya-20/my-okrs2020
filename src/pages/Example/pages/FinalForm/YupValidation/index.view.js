import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 950px;
`;

export const Headline = styled.h1`
  ${({ theme }) => theme.typography.title()}
  color: ${({ theme }) => theme.color.black};
`;

export const UploadWrapper = styled(Dropzone)`
  border: 0;
  display: inline-block;
`;
