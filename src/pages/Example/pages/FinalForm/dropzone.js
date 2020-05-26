import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const thumbsContainer = {
  // display: 'flex',
  // flexDirection: 'row',
  // flexWrap: 'wrap',
  marginTop: 16,
  marginButton: 20
};

const thumb = {
  // display: 'flex',
  // display: 'inline-flex',
  width: 100,
  height: 100,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const RemoveButton = styled.button`
  ${({ theme }) => theme.typography.button()}
    color: ${({ theme }) => theme.color.lightBlue};
    border-radius: 100px;
    background-position: 16px 50%;
    background-repeat: no-repeat;
    border: 0;
    padding: 4px 16px 4px 36px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 8px;
    outline: none;
`;

const PreviewImage = styled.span`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-color: ${({ theme }) => theme.color.lightGray};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  display: inline-block;
`;

const Wrapper = styled.div`
  margin: 0 auto;
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
        border: 2px solid red
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

const Dropzone = props => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    noDrag: true,
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFiles(files);
      if (props.onChange) {
        props.onChange(files);
      }
    }
  });

  const removeFile = file => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map(file => (
    <>
      <Wrapper>
        <PreviewImage src={file.preview} key={file.name} />
      </Wrapper>
      <RemoveButton onClick={removeFile(file)}>Remove File</RemoveButton>
      {/* <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="" />
        </div>
        <button onClick={removeFile(file)}>Remove File</button>
      </div> */}
    </>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="d-inline-block mt-4">
      <div {...getRootProps({ className: 'btn-dropzone' })}>
        <input {...getInputProps()} />
        <span>Click here to upload image</span>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
};

export default Dropzone;
