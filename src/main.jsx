import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./components/routes.jsx";

// set meta description
const meta = document.createElement('meta');
meta.setAttribute('name','description');
meta.setAttribute('content','manelly67\'s exercise study project: Where is Waldo A Photo Tagging App within the curriculum The Odin Project');
document.head.appendChild(meta);

// set router
const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
