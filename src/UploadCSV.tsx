import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import ResponseView from "./component/ResponseView";
import useOnDrop from "./component/useOnDrop";

const UploadCSV: React.FC = () => {
  const { onDrop, serverResponse } = useOnDrop();
  const style: React.CSSProperties = {
    width: 200,
    height: 150,
    border: "1px dotted #888",
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div {...getRootProps()} style={style}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV file here ...</p>
        ) : (
          <p>Drag 'n' drop a CSV file here, or click to select a file</p>
        )}
      </div>
      <ResponseView serverResponse={serverResponse} />
    </>
  );
};

export default UploadCSV;
