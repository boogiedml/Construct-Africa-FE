import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ActionButton, Input } from '../components';

const Login = () => {

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
      console.log(values)
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
              Welcome Muez
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
                  placeholder: "Enter your email",
                  value: formik.values.email,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur
                }}
                error={formik.errors.email}
              />
              <Input
                passwordInput
                label='Reenter password'

                attributes={{
                  placeholder: "******",
                  value: formik.values.password,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur
                }}
                error={formik.errors.password}
              />

              <ActionButton attributes={{
                type: "button",
                disabled: !formik.isValid
              }}
                buttonText="Sign in"
                fullyRounded
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;