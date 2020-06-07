import React, { useState } from 'react';
import PropTypes from 'prop-types';

const withUploadFile = WrappedComponent => {
  const HandleUpload = ({ onChange }) => {
    const [uploadFile, setUploadFile] = useState([]);

    const onDrop = acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setUploadFile(uploadFile.concat(files));
      if (onChange) {
        onChange(uploadFile.concat(files));
      }
    };

    const removeFile = file => () => {
      const newFiles = [...uploadFile];
      newFiles.splice(newFiles.indexOf(file), 1);
      setUploadFile(newFiles);
    };

    return (
      <WrappedComponent
        onDrop={onDrop}
        removeFile={removeFile}
        uploadFile={uploadFile}
      />
    );
  };

  const HandleUploadPropTypes = {
    onChange: PropTypes.func,
    acceptedFile: PropTypes.array
  };

  HandleUpload.propTypes = HandleUploadPropTypes;

  return HandleUpload;
};

export default withUploadFile;
