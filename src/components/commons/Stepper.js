import React from "react";
import { Box, Icon, Text, Pog, Divider, Button } from "gestalt";

const Stepper = ({ items, activeItem, setActiveItem }) => {
  return (
    <div>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        wrap={true}
      >
        {items?.map((datum, i) => (
          <>
            <Box marginEnd={1} padding={1}>
              <Pog
                icon={datum.icon}
                iconColor={i <= activeItem ? "blue" : "gray"}
              />
            </Box>
            <Text align="center" color="darkGray" weight="bold">
              {datum.name}
            </Text>
            {i !== items?.length - 1 && (
              <Box lgPadding={3} smPadding={2}>
                <Icon
                  icon={"directional-arrow-right"}
                  accessibilityLabel="Pin"
                  color="eggplant"
                />
              </Box>
            )}
          </>
        ))}
        <Box position="absolute" right padding={8}>
          <Button
            color="transparentWhiteText"
            text="Back"
            inline
            onClick={() => setActiveItem(-1)}
          />
          <Button
            color="blue"
            text="Next"
            inline
            onClick={() => setActiveItem(1)}
          />
        </Box>
      </Box>

      <Divider />
    </div>
  );
};

export default Stepper;
