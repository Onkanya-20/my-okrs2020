import React from 'react';
import withUploadFile from './uploadFile';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PreviewImage = styled.span`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-color: ${({ theme }) => theme.color.lightGray};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  display: inline-block;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  border-radius: 8px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  flex: 0 0 auto;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.lightBlue};
    opacity: 0;
  }
  border-color: ${({ isError, theme }) =>
    isError ? theme.color.lightBlue : 'transparent'};
  ${({ readOnly, theme }) =>
    !readOnly
      ? `
      &:hover {
        border: 2px solid ${theme.color.lightGray}
      }
      &:active {
        border-color: ${theme.color.lightBlue};
      }
      &:hover&:after {
        opacity: 0.1;
      }
      &:active&:after {
        opacity: 0;
      }
    `
      : `
      cursor: auto;
    `}
  ${({ size }) =>
    size === 'small'
      ? `
        width: 200px;
        height: 200px;
      `
      : `
        width: 255px;
        height: 255px;
      `};
`;

const RemoveButton = styled.div`
  ${({ theme }) => theme.typography.button()}
    color: ${({ theme }) => theme.color.lightBlue};
    border-radius: 100px;
    background-position: 16px 50%;
    background-repeat: no-repeat;
    border: 0;
    padding: 4px 10px;
    cursor: pointer;
    margin: 0 50px;
    margin-top: 8px;
    outline: none;
    text-align: center;
    background-color: lightgray;
    width: 150px;
`;
const BrowseButton = styled.div`
  ${({ theme }) => theme.typography.button()}
    color: ${({ theme }) => theme.color.lightBlue};
    border-radius: 100px;
    background-position: 16px 50%;
    background-repeat: no-repeat;
    border: 0;
    padding: 4px 10px;
    cursor: pointer;
    margin: 10px 0;
    margin-top: 8px;
    outline: none;
    background-color: lightBlue;
    width: 200px;
    text-align: center;
`;

const UploadImagePropTypes = {
  uploadFile: PropTypes.array,
  removeFile: PropTypes.func,
  onDrop: PropTypes.func,
  isLoading: PropTypes.bool
};

const UploadWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const PreviewWrapper = styled.div`
  width: 33%;
`;

const UploadImage = ({ uploadFile, removeFile, onDrop, isLoading }) => {
  const acceptedFile = ['image/png', 'image/jpeg'];

  const previewImage = uploadFile.map(file => (
    <PreviewWrapper key={file.name}>
      <Wrapper>
        <PreviewImage src={file.preview} key={file.name} />
      </Wrapper>
      <RemoveButton onClick={removeFile(file)}>remove image</RemoveButton>
    </PreviewWrapper>
  ));

  return (
    <div className="text-center mt-5">
      <Dropzone onDrop={onDrop} accept={acceptedFile}>
        {({ getRootProps, getInputProps }) => (
          <BrowseButton {...getRootProps()}>
            <input {...getInputProps()} />
            Click me to upload a file!
          </BrowseButton>
        )}
      </Dropzone>
      <UploadWrapper>{previewImage}</UploadWrapper>
    </div>
  );
};

UploadImage.propTypes = UploadImagePropTypes;
export default withUploadFile(UploadImage);
