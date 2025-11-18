import { Outlet, useLocation } from "react-router-dom";
import NsNavbar from "../NsNavbar";
import NsFooter from "../NsFooter.tsx";
import ScrollToTop from "../../utils/ScrollToTop";

const NonSubscriberLayout = () => {
    const location = useLocation();
    const isPublicHome = location.pathname === '/';

    return (
        <div className="w-full flex flex-col h-screen overflow-hidden">
            <ScrollToTop />
            <NsNavbar />
            <section
                id="scrollable-section"
                className={`flex-grow overflow-y-scroll  overflow-x-hidden ${isPublicHome ? '' : 'mt-[48px] md:mt-[90px]'}`}
            >
                <main className="">
                    <Outlet />
                </main>
                <NsFooter />
            </section>
        </div>
    );
};
export default NonSubscriberLayout