import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const RootLayout = () => {

  return (
    <div className="w-full flex flex-col h-screen overflow-hidden">
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
