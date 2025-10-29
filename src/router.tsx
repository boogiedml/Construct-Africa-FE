import { Navigate, type RouteObject } from "react-router-dom";
import { Login, Favourites, Companies, Home, News, Projects, Tenders, PublicHome, AdvisoryBoard, InsightDetails, EventDetails, ProjectDetails, PublicInsights, PublicEvents } from "./pages";
import { RootLayout, NonSubscriberLayout } from "./components/templates";

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
      { path: "advisory-board", element: <AdvisoryBoard /> },
      { path: "projects", element: <InsightDetails /> },
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
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "tenders", element: <Tenders /> },
      { path: "*", element: <Navigate to="/admin" /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
