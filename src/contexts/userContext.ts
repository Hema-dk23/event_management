import { createContext } from "react";

export const UserContext = createContext({
  userRole: "ROLE_WORKER",
  setUserRole: (userType: string) => {},
});