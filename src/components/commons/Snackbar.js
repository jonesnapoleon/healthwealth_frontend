import React from "react";
import { Box, Toast } from "gestalt";

const Snackbar = ({ text, color = "red" }) => {
  return (
    <Box
      fit
      dangerouslySetInlineStyle={{
        __style: {
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
      paddingX={1}
      position="fixed"
    >
      <Toast color={color} text={text} />
    </Box>
  );
};

export default Snackbar;
