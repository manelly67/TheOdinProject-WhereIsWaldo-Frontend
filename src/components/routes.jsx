import App from "../App";
import ErrorPage from "./Error_page";

const routes = [
  {
    index: true,
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
  },
];

export default routes;
