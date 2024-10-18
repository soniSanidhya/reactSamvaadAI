import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import Sidepanel from "./components/SidePanel/Sidepanel.jsx";
import About from "./components/About/About.jsx";
import {
  Outlet,
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layouts from "./components/Layouts/Layouts.jsx";
import Setting from "./components/Settings/Setting.jsx";
import Api from "./components/Api/Api.jsx";
import ApiContextProvider from "./context/Apicontextprovider.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Api />,
  },
  {
    path: "",
    element: <Layouts />,
    children: [
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Home",
        element: <Home />,
      },

      {
        path: "App",
        element: <App />,
      },

      {
        path: "Setting",
        element: <Setting />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <ApiContextProvider> */}
      <RouterProvider router={router} />
    {/* </ApiContextProvider> */}
  </Provider>
);
