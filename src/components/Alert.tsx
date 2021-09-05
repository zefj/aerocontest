import React, { ReactNode } from "react";
import { Box, Flex } from "rebass";

export const Alert = ({
  icon,
  children,
}: {
  icon: string;
  children: ReactNode;
}) => {
  return (
    <Flex variant="alert">
      <Flex variant="alert.iconContainer">
        <Box variant="alert.icon" as="i" className={icon} />
      </Flex>
      <Flex sx={{ flex: 1 }}>
        <Box as="span">{children}</Box>
      </Flex>
    </Flex>
  );
};
