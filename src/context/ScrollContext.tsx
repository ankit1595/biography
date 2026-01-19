import { createContext } from "react";
import type { ScrollContextValue } from "../types/scroll";

export const ScrollContext = createContext<ScrollContextValue | null>(null);
ScrollContext.displayName = "ScrollContext";
