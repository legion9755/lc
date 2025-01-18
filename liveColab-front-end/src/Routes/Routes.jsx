import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Layout/Home/Home";

import Visualization from "../component/Visualization";
import Integration from "../component/Integration";
import Interaction from "../component/Interaction";
import Collab from "../component/Collab";
import Login from "../component/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/visualization",
    element: <Visualization></Visualization>
  },
  {
    path: "/integration",
    element: <Integration></Integration>
  },
  {
    path: "/interaction",
    element: <Interaction></Interaction>
  },
  {
    path: "/collab",
    element: <Collab></Collab>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;