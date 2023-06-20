import React from "react";
import Typography from "@mui/material/Typography";

const About: React.FC = () => {
  return (
    <div>
      <Typography variant='h4' component='div' gutterBottom>
        About Page
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to the About page.
      </Typography>
    </div>
  );
};

export default About;
