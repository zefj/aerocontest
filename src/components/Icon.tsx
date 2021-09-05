import React from "react";
import { Box } from "rebass";

export const Icon = ({ className }: { className: string }) => {
  return <Box variant="icon" as="i" className={className} />;
};
