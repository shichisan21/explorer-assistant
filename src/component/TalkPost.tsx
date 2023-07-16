import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Item {
  startDate: string;
  endDate: string;
}

const App: React.FC = () => {
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
        <DatePicker
          label='Start Date'
          value={selectedStartDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label='End Date'
          value={selectedEndDate}
          onChange={handleEndDateChange}
        />{" "}
      </LocalizationProvider>
      <Button onClick={onClickHandler}>Click!!</Button>
    </Box>
  );
};

export default App;
