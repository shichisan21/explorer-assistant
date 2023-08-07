import React from "react";
import { useDropzone } from "react-dropzone";
import ResponseView from "./component/ResponseView";
import useOnDrop from "./component/useOnDrop";

const UploadCSV: React.FC = () => {
  const { onDrop, serverResponse } = useOnDrop();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const style: React.CSSProperties = {
    width: 200,
    height: 150,
    border: "1px dotted #888",
    backgroundColor: isDragActive ? "#eee" : "#fff", // 背景色を変える
  };

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
