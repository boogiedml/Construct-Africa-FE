import { Navigate, type RouteObject } from "react-router-dom";
import { Login, Favourites, Companies, Home, News, Projects, Tenders, PublicHome } from "./pages";
import { RootLayout, NonSubscriberLayout } from "./components/templates";
import PublicInsights from "./pages/PublicInsights";
import PublicEvents from "./pages/PublicEvents";
import InsightDetails from "./pages/InsightDetails";
import EventDetails from "./pages/EventDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <NonSubscriberLayout />,
    children: [
      { index: true, element: <PublicHome /> },
      { path: "insights", element: <PublicInsights /> },
      { path: "insights/:id", element: <InsightDetails /> },
      { path: "events", element: <PublicEvents /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "favourites", element: <Favourites /> },
      { path: "companies", element: <Companies /> },
      { path: "news", element: <News /> },
      { path: "projects", element: <Projects /> },
      { path: "tenders", element: <Tenders /> },
      { path: "*", element: <Navigate to="/admin" /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
