import { Navigate, type RouteObject } from "react-router-dom";
import { Login, Favourites, Companies, Home, News, Projects, Tenders, PublicHome, AdvisoryBoard, InsightDetails, EventDetails, ProjectDetails, PublicInsights, PublicEvents, CompanyDetails, NewsDetails, TenderDetails, PublicProjects, PublicNews, PublicNewsDetails, PublicTenders, PublicGetListed, PublicBlog, PublicBlogDetails, PublicFAQ, PublicTerms, PublicPrivacy, PublicRefund, PublicGDPR, PublicAbout, PublicContact } from "./pages";
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
      { path: "projects", element: <PublicProjects /> },
      { path: "tenders", element: <PublicTenders /> },
      { path: "get-listed", element: <PublicGetListed /> },
      { path: "insights/news", element: <PublicNews /> },
      { path: "insights/news/:id", element: <PublicNewsDetails /> },
      { path: "insights/blog", element: <PublicBlog /> },
      { path: "insights/blog/:id", element: <PublicBlogDetails /> },
      { path: "faqs", element: <PublicFAQ /> },
      { path: "terms-and-conditions", element: <PublicTerms /> },
      { path: "privacy-policy", element: <PublicPrivacy /> },
      { path: "refund-policy", element: <PublicRefund /> },
      { path: "gdpr", element: <PublicGDPR /> },
      { path: "about", element: <PublicAbout /> },
      { path: "contact", element: <PublicContact /> },
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
      { path: "companies/:id", element: <CompanyDetails /> },
      { path: "news", element: <News /> },
      { path: "news/:id", element: <NewsDetails /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "tenders", element: <Tenders /> },
      { path: "tenders/:id", element: <TenderDetails /> },
      { path: "*", element: <Navigate to="/admin" /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
