import App from "../App";
import ErrorPage from "./Error_page";
import DrawingBoard from "./DrawingBoard";
import TopTen from "./TopTen";

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
  {
    path: "top_ten",
    element: <TopTen />,
  },
];

export default routes;
