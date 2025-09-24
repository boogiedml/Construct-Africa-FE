import { Navigate, type RouteObject } from "react-router-dom";
import { Login, Favourites, Companies, Home, News, Projects, Tenders } from "./pages";
import { RootLayout } from "./components/templates";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "favourites", element: <Favourites /> },
      { path: "companies", element: <Companies /> },
      { path: "news", element: <News /> },
      { path: "projects", element: <Projects /> },
      { path: "tenders", element: <Tenders /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
