import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActionButton, Input } from '../components';
import { useLoginMutation } from '../store/services/auth';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/features/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loginMutation, { isLoading, error }] = useLoginMutation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginMutation(values).unwrap();
        dispatch(login({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires: response.data.expires
        }));
        // Redirect to the page they were trying to access or default to home
        const fromPath = location.state?.from?.pathname || '/';
        navigate(fromPath, { replace: true });
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  });

  const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/insights' },
    { name: 'Tenders', href: '/tenders' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-[#E9EAEB] h-[48px] md:h-[90px]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="w-[60px] md:w-[120px] h-full">
              <img className='w-full h-full object-cover' src="/images/logo.png" alt="" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-base transition-colors px-2 py-2 duration-200 ${item.href === location.pathname
                    ? 'text-[#181D27] font-semibold'
                    : 'text-[#717680] font-normal'
                    }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ActionButton buttonText="Contact us" fullyRounded paddingX='px-7' />
            </div>
          </div>
        </div>
      </nav>

      <div className="md:flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[360px] w-full space-y-8">
          <div className="text-center">
            <div className="w-[60px] mx-auto mb-6">
              <img className='w-full h-full object-cover' src="/images/logo-black.png" alt="" />
            </div>
            <h1 className="text-lg md:text-xl lg:text-[30px] font-semibold text-[#181D27] font-bitter mb-1">
              Welcome back
            </h1>
            <p className="text-sm md:text-base font-base">
              Let's get you started on Construct Africa
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                label='Email'
                attributes={{
                  type: "email",
                  name: "email",
                  placeholder: "Enter your email",
                  value: formik.values.email,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
              />
              <Input
                passwordInput
                label='Password'
                attributes={{
                  name: "password",
                  placeholder: "Enter your password",
                  value: formik.values.password,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
              />

              <ActionButton
                attributes={{
                  type: "button",
                  disabled: !formik.isValid || isLoading,
                  onClick: () => formik.handleSubmit()
                }}
                buttonText={isLoading ? "Signing in..." : "Sign in"}
                loading={isLoading}
                fullyRounded
              />

              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  Login failed. Please check your credentials.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;