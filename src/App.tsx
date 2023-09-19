import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { UserContext } from "./contexts/userContext";

// App component is used in index.tsx
const App = () => {
  const [userRole, setUserRole] = useState("ROLE_USER");
  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
