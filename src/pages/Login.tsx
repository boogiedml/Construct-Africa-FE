import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ActionButton, Input } from '../components';
import { useLoginMutation } from '../store/services/auth';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/features/authSlice';
import NsNavbar from '../components/NsNavbar';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();

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
        const fromPath = location.state?.from?.pathname || '/admin';
        navigate(fromPath, { replace: true });
      } catch (err) {
        // console.error('Login failed:', (err as { data: { errors: { message: string }[] } }).data.errors[0].message);
        toast.error((err as { data: { errors: { message: string }[] } }).data.errors[0].message || 'Login failed. Please check your credentials.');
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NsNavbar />

      <div className="md:flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-md:pt-28">
        <div className="sm:max-w-[360px] w-full space-y-8">
          <div className="text-center">
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

              <div className='max-md:mt-6'>
                <ActionButton
                  attributes={{
                    type: "button",
                    disabled: !formik.isValid || isLoading,
                    onClick: () => formik.handleSubmit()
                  }}
                  buttonText={isLoading ? "Signing in..." : "Sign in"}
                  loading={isLoading}
                  textSize='sm'
                  width='full'
                />
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;