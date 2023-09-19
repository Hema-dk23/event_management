import { createContext } from "react";

export const UserContext = createContext({
  userRole: "ROLE_USER",
  setUserRole: (userType: string) => {},
});