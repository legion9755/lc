import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Layout/Home/Home";

import Visualization from "../component/Visualization";
import Integration from "../component/Integration";
import Interaction from "../component/Interaction";
import Collab from "../component/Collab";

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
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;