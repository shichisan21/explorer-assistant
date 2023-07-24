import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Item {
  startDate: string;
  endDate: string;
}

const App: React.FC = () => {
  const [awsResponse, setAwsResponse] = useState<string>("");

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );
  const [response, setResponse] = useState<any>(null);

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  const handleGetRequest = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_APP_API_GATEWAY_URL,
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      // const response = await axios.get(
      //   import.meta.env.VITE_APP_API_GATEWAY_URL,
      //   {
      //     withCredentials: true,
      //   }
      // );
      const awsResponse = response.data;

      setAwsResponse(awsResponse);
      // または、このデータを状態に格納したり、表示に反映するなどの処理を書くこともできます
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const onClickHandler = async (): Promise<void> => {
    if (!selectedStartDate || !selectedEndDate) return;

    const itemToSend: Item = {
      startDate: selectedStartDate.toISOString(),
      endDate: selectedEndDate.toISOString(),
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/put_item/",
        itemToSend
      );
      setResponse(res.data);
      console.log("Click!!", response);
    } catch (error: any) {
      console.error("Error during request", error);
      setResponse(error.message);
    }
  };

  return (
    <Box>
      <h1>Response:</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ margin: 5 }}>
          <DatePicker
            label='Start Date'
            value={selectedStartDate}
            onChange={handleStartDateChange}
          />
        </Box>
        <Box>
          <DatePicker
            label='End Date'
            value={selectedEndDate}
            onChange={handleEndDateChange}
          />
        </Box>
      </LocalizationProvider>
      <Button onClick={onClickHandler}>Click!!</Button>
      <Button onClick={handleGetRequest}>Request SEND!!</Button>
    </Box>
  );
};

export default App;
