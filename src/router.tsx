import {
  createBrowserRouter,
} from "react-router-dom";
import List from "./components/List";
import { EventDetail } from "./components/EventDetail";
import { EventCreate } from "./components/EventCreate";

// Router settings for home page, Event Detail page and Event Create page 
const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
  },
  {
    path: '/:id',
    element: <EventDetail/>
  },
  {
    path: '/create',
    element: <EventCreate />
  },
  {
    path: '/update/:id',
    element: <EventCreate />
  }
]);

export default router;