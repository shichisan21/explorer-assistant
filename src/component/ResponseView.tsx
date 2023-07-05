// ResponseView.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

type ResponseViewProps = {
  serverResponse: any | null;
};

const ResponseView: React.FC<ResponseViewProps> = ({ serverResponse }) => {
  return (
    <Box>
      <Typography>
        {serverResponse && JSON.stringify(serverResponse)}
      </Typography>
    </Box>
  );
};

export default ResponseView;
