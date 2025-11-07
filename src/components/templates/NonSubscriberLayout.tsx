import { Outlet } from "react-router-dom";
import NsNavbar from "../NsNavbar";
import NsFooter from "../NsFooter.tsx";
import ScrollToTop from "../../utils/ScrollToTop";

const NonSubscriberLayout = () => {
    return (
        <div className="w-full flex flex-col h-screen overflow-hidden">
            <ScrollToTop />
            <NsNavbar />
            <section
                id="scrollable-section"
                className="flex-grow overflow-y-scroll overflow-x-hidden"
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