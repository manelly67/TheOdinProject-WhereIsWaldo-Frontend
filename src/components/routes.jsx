import App from "../App";
import ErrorPage from "./Error_page";
import DrawingBoard from "./DrawingBoard";

const routes = [
  {
    index: true,
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
  },
  {
    path: "board",
    element: <DrawingBoard />,
  },
];

export default routes;
