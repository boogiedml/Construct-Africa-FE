import { Outlet } from "react-router-dom";
import NsNavbar from "../NsNavbar";
import NsFooter from "../NsFooter.tsx";

const NonSubscriberLayout = () => {
    return (
        <div className="w-full flex flex-col h-screen overflow-hidden">
            <NsNavbar />
            <section
                id="scrollable-section"
                className="flex-grow overflow-scroll"
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