import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAppSelector } from "../../store/hooks";
import ScrollToTop from "../../utils/ScrollToTop";

const RootLayout = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <section
        id="scrollable-section"
        className="flex-grow overflow-scroll"
      >
        <main className="px-4 sm:px-6 lg:px-10 mb-10">
          <Outlet />
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default RootLayout;
