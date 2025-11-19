import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, ActionButton } from '../components';
import { FiLock, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface LocationState {
  formData?: {
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    country: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    plan: 'news' | 'projects';
  };
}

const BookADemoPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const formData = state?.formData;

  // Redirect if no form data
  if (!formData) {
    navigate('/book-a-demo', { replace: true });
    return null;
  }

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^[\d\s]+$/, 'Card number must contain only digits')
      .min(13, 'Card number must be at least 13 digits')
      .max(19, 'Card number must not exceed 19 digits')
      .required('Card number is required'),
    cardName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name on card is required'),
    expiryMonth: Yup.string()
      .matches(/^(0[1-9]|1[0-2])$/, 'Please enter a valid month (01-12)')
      .required('Expiry month is required'),
    expiryYear: Yup.string()
      .matches(/^\d{4}$/, 'Please enter a valid year (YYYY)')
      .required('Expiry year is required'),
    cvv: Yup.string()
      .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
      .required('CVV is required'),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Here you would integrate with your payment API
        // For now, we'll simulate a successful payment
        console.log('Payment data:', { ...values, formData });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        toast.success('Payment processed successfully! We will contact you shortly.');
        
        // Navigate to success page or back to home
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      } catch (error) {
        toast.error('Payment failed. Please try again.');
      }
    },
  });

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format month (01-12)
  const formatMonth = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length === 0) return '';
    const num = parseInt(v, 10);
    if (num > 12) return '12';
    if (num < 1) return v;
    return v.padStart(2, '0');
  };

  // Format year (YYYY)
  const formatYear = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length > 4) return v.substring(0, 4);
    return v;
  };

  const planName = formData.plan === 'news' ? 'News Plan' : 'Projects Plan';
  const planPrice = formData.plan === 'news' ? '$99.99' : '$199.99';

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#181D27] mb-3">
              Let's ConstructAfrica Together
            </h1>
            <p className="text-sm md:text-base text-[#717680] max-w-2xl mx-auto">
              Fill in your information, select your preferred plan, and proceed to pay or we will contact you within 24 hours to complete your exclusive upgrade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Africa Map Visualization */}
            <div className="hidden lg:block relative h-full min-h-[600px]">
              <div className="sticky top-8">
                <div className="relative w-full h-full bg-gradient-to-br from-[#FEF3F2] to-[#FFF4E6] rounded-2xl p-8 flex items-center justify-center">
                  {/* Dotted Africa Map Pattern */}
                  <div className="relative w-full max-w-md">
                    <svg
                      viewBox="0 0 400 500"
                      className="w-full h-auto"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Simplified Africa outline using dots pattern */}
                      <defs>
                        <pattern
                          id="africa-dots-payment"
                          x="0"
                          y="0"
                          width="8"
                          height="8"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle cx="4" cy="4" r="2" fill="#E0891E" opacity="0.8" />
                        </pattern>
                      </defs>
                      {/* Africa continent shape approximation */}
                      <path
                        d="M 100 50 L 150 40 L 200 50 L 250 60 L 300 80 L 320 120 L 330 180 L 320 240 L 300 300 L 280 360 L 260 400 L 240 430 L 200 450 L 150 440 L 120 420 L 100 380 L 90 320 L 85 260 L 80 200 L 85 140 L 90 90 Z"
                        fill="url(#africa-dots-payment)"
                        stroke="#E0891E"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Form */}
            <div className="w-full">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-[#181D27] mb-6">Enter payment details</h3>
                  
                {/* Name on card */}
                <div className="mb-4">
                  <Input
                    label="Name on card"
                    labelFor="cardName"
                    attributes={{
                      type: 'text',
                      name: 'cardName',
                      placeholder: 'Olivia Rhye',
                      value: formik.values.cardName,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                    }}
                    error={formik.touched.cardName && formik.errors.cardName ? formik.errors.cardName : undefined}
                  />
                </div>

                {/* Expiry - Month and Year */}
                <div className="mb-4">
                  <label className="text-[#414651] text-sm font-medium mb-1 block">
                    Expiry
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <input
                      type="text"
                      name="expiryMonth"
                      className="w-full px-3 py-2.5 text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
                      placeholder="06"
                      value={formik.values.expiryMonth}
                      onChange={(e) => {
                        const formatted = formatMonth(e.target.value);
                        formik.setFieldValue('expiryMonth', formatted);
                      }}
                      onBlur={formik.handleBlur}
                      maxLength={2}
                    />
                    <input
                      type="text"
                      name="expiryYear"
                      className="w-full px-3 py-2.5 text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
                      placeholder="2025"
                      value={formik.values.expiryYear}
                      onChange={(e) => {
                        const formatted = formatYear(e.target.value);
                        formik.setFieldValue('expiryYear', formatted);
                      }}
                      onBlur={formik.handleBlur}
                      maxLength={4}
                    />
                  </div>
                  {(formik.touched.expiryMonth && formik.errors.expiryMonth) || (formik.touched.expiryYear && formik.errors.expiryYear) ? (
                    <span className="text-xs text-[#D95959] mt-[2px]">
                      {formik.errors.expiryMonth || formik.errors.expiryYear}
                    </span>
                  ) : null}
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="text-[#414651] text-sm font-medium mb-1 block">
                    Card number
                  </label>
                  <div className="relative mt-1">
                    <span className="text-[#A4A7AE] text-lg absolute left-2.5 top-1/2 -translate-y-1/2">
                      <FiCreditCard />
                    </span>
                    {/* Card logo placeholder - you can replace with actual card brand logos */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-8 h-5 bg-[#EB001B] rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      className="w-full px-3 py-2.5 pl-9 pr-12 text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
                      placeholder="1234 1234 1234 1234"
                      value={formik.values.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        formik.setFieldValue('cardNumber', formatted);
                      }}
                      onBlur={formik.handleBlur}
                      maxLength={19}
                    />
                  </div>
                  {formik.touched.cardNumber && formik.errors.cardNumber ? (
                    <span className="text-xs text-[#D95959] mt-[2px]">{formik.errors.cardNumber}</span>
                  ) : null}
                </div>

                {/* CVV */}
                <div className="mb-6">
                  <Input
                    label="CVV"
                    labelFor="cvv"
                    icon={<FiLock />}
                    passwordInput
                    attributes={{
                      type: 'password',
                      name: 'cvv',
                      placeholder: '•••',
                      value: formik.values.cvv,
                      onChange: (e) => {
                        const v = e.target.value.replace(/\D/g, '');
                        formik.setFieldValue('cvv', v);
                      },
                      onBlur: formik.handleBlur,
                      maxLength: 4,
                    }}
                    error={formik.touched.cvv && formik.errors.cvv ? formik.errors.cvv : undefined}
                  />
                </div>

                {/* Submit Button */}
                <ActionButton
                  buttonText={formik.isSubmitting ? 'Processing...' : `Proceed to pay ${planPrice}`}
                  attributes={{
                    type: 'submit',
                    disabled: !formik.isValid || formik.isSubmitting,
                  }}
                  textSize="text-base"
                  width="full"
                  backgroundColor="#E0891E"
                  paddingX="px-6"
                  loading={formik.isSubmitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookADemoPayment;

