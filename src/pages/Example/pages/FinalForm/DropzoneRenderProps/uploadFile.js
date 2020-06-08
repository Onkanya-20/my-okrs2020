import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UploadFilePropTypes = {
  render: PropTypes.func,
  onChange: PropTypes.func
};

const UploadFile = ({ render, onChange }) => {
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = acceptedFiles => {
    setLoading(true);
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setUploadFile(uploadFile.concat(files));
    if (onChange) {
      onChange(uploadFile.concat(files));
    }
    setLoading(false);
  };

  const removeFile = file => () => {
    const newFiles = [...uploadFile];
    newFiles.splice(newFiles.indexOf(file), 1);
    setUploadFile(newFiles);
  };

  return (
    <>
      {render({
        onDrop,
        removeFile,
        uploadFile,
        isLoading: loading
      })}
    </>
  );
};

UploadFile.propTypes = UploadFilePropTypes;

export default UploadFile;
