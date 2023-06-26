import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

interface Content {
  city: string;
  food: string;
}

interface ContentListProps {
  content: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ content }) => {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <Box>
      <List>
        {content.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`City: ${item.city}`}
              secondary={`Food: ${item.food}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContentList;
