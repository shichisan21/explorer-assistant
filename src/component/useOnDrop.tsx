// useOnDrop.ts

import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";

const useOnDrop = () => {
  const [serverResponse, setServerResponse] = useState<any | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file); // 'file' はサーバー側が期待するパラメータ名に置き換えてください

      try {
        const response: AxiosResponse<any> = await axios.post(
          "http://127.0.0.1:8000/upload-csv",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setServerResponse(response.data);
        console.log("Upload successful:", response.data);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  }, []);

  return { onDrop, serverResponse };
};

export default useOnDrop;
