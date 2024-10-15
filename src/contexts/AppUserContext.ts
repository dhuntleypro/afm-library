import { createContext } from "react";

interface UserContextType {
  // Define your context properties and their types here
}

export const AppUserContext = createContext<UserContextType | undefined>(undefined);
 