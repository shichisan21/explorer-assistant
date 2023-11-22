import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ResponseView from "./component/ResponseView";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// モーダルのスタイル
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const useOnDrop = () => {
  const [serverResponse, setServerResponse] = useState<any>(null);

  // ファイルをサーバーにアップロードする関数
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/your-endpoint", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setServerResponse(data); // サーバーからのレスポンスを状態に保存
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return { uploadFile, serverResponse };
};

const UploadCSV: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const { serverResponse, uploadFile } = useOnDrop();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFileToUpload(acceptedFiles[0]);
        setShowModal(true); // モーダルを表示
      }
    }, []),
  });

  const handleConfirm = () => {
    if (fileToUpload) {
      uploadFile(fileToUpload); // ファイルのアップロード
    }
    setShowModal(false); // モーダルを閉じる
  };

  const handleClose = () => {
    setShowModal(false); // モーダルを閉じる
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV file here ...</p>
        ) : (
          <p>Drag 'n' drop a CSV file here, or click to select a file</p>
        )}
      </div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='modal-title' variant='h6' component='h2'>
            Upload CSV File
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }}>
            Do you want to upload the file?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              No
            </Button>
            <Button variant='contained' onClick={handleConfirm}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <ResponseView serverResponse={serverResponse} />
    </>
  );
};

export default UploadCSV;
