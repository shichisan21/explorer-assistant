import React, { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Box } from "@mui/material";

const csvReceiveUrl = import.meta.env.VITE_APP_CSV_API_URL
  ? import.meta.env.VITE_APP_CSV_API_URL
  : "#";

const UploadCSV: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        console.log("Base64 data:", base64Data);

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/upload-csv",
            { csvData: base64Data },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Upload successful:", response.data);
        } catch (error) {
          console.error("Upload error:", error);
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Base64 conversion error:", error);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "200px",
          border: "2px dashed #aaa",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDragOver ? "#f2f2f2" : "transparent",
        }}
        onDrop={handleFileDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <TextField
          type='file'
          onChange={handleFileChange}
          variant='outlined'
          sx={{ display: "none" }}
          inputProps={{ accept: ".csv" }}
          id='file-input'
        />
        <label htmlFor='file-input'>
          <Button
            variant='contained'
            color='primary'
            component='span'
            sx={{ display: "block" }}
          >
            {selectedFile
              ? selectedFile.name
              : "Drop CSV file here or click to upload"}
          </Button>
        </label>
      </Box>
      <Button variant='contained' color='primary' onClick={handleUpload}>
        Upload
      </Button>
    </Container>
  );
};

export default UploadCSV;
