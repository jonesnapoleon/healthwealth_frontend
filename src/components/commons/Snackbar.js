import React from "react";
import { Box, Toast } from "gestalt";

const Snackbar = ({ text, color = "red" }) => {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
      position="fixed"
    >
      <div className="toast">
        <Toast color={color} text={text} />
      </div>
    </Box>
  );
};

export default Snackbar;
