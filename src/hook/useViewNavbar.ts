"use client";

import { useState } from "react";

export const useViewNavbar = () => {
  const [isVisible, setIsvisible] = useState(true);
  setIsvisible((view) => !view);

  return { isVisible, setIsvisible };
};
