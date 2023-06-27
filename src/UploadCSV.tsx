import React, { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Box } from "@mui/material";

const csvReceiveUrl = import.meta.env.VITE_APP_CSV_API_URL
  ? import.meta.env.VITE_APP_CSV_API_URL
  : "#";

const UploadCSV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const selectedFile =
      event.dataTransfer.files && event.dataTransfer.files[0];
    setFile(selectedFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
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
    if (!file) {
      console.log("No file selected.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          const base64Data = reader.result.toString().split(",")[1];

          try {
            console.log("Upload data:", base64Data);

            const response = await axios.post(
              csvReceiveUrl,
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
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("File read error:", error);
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
        />
        <label htmlFor='file-input'>
          <Button
            variant='contained'
            color='primary'
            component='span'
            sx={{ display: "block" }}
          >
            {file ? file.name : "Drop CSV file here or click to upload"}
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
