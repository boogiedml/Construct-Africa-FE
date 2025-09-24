import type { ReactNode } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  header: string;
  paragraph: string;
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  header,
  paragraph,
  children,
}) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const authData = localStorage.getItem("ff-dash-auth");
  //   const auth = authData ? JSON.parse(authData) : null;

  //   const isLoggedIn = auth && auth.token && auth.currentUser;

  //   if (isLoggedIn) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate]);

  return (
    <section className="w-full relative min-h-screen section-padding bg-admin_theme flex justify-center items-center bg-[url('/patterns/login-pattern.svg')] bg-contain md:bg-auto bg-left-top bg-no-repeat">
      <div className="w-[500px] max-w-xl py-20">
        <div className="w-fit mx-auto mb-10">
          <img src="/patterns/logo-login.svg" alt="logo" />
        </div>
        <div className="w-full bg-white rounded-xl p-8">
          <div className="max-w-[26rem] mx-auto text-center mb-8">
            <h3 className="mona-sans-semibold text-lg text-[#1B1818]">
              {header}
            </h3>
            <p className="text-[#645D5D] text-sm">{paragraph}</p>
          </div>
          <div>{children}</div>
        </div>
        {/* <div className="mt-10 bg-[#0D1B2A] text-sm text-white p-4 px-6 rounded-full w-fit mx-auto flex gap-2 grayscale">
          Don’t have an account?
          <span className="text-[#8AAEC3] mona-sans-semibold cursor-pointer">
            Sign up
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default AuthLayout;
