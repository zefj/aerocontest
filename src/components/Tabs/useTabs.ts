import { useState } from "react";

export const useTabs = <T>(
    active: T,
) => {
    return useState<T>(active);
};