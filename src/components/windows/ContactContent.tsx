import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { portfolioConfig } from '../../data/portfolio';
import { useSettings } from '../../context/SettingsContext';

interface FormValues {
  name: string;
  email: string;
  message: string;
  recaptcha: string;
  success: boolean;
}

const ContactContent = () => {
  const { isDarkMode } = useSettings();
  const recaptchaKey = portfolioConfig.personal.recaptcha_key;

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: portfolioConfig.personal.email,
      link: `mailto:${portfolioConfig.personal.email}`,
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: `@${portfolioConfig.personal.githubUsername}`,
      link: portfolioConfig.personal.github,
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Yuriy Stenin',
      link: portfolioConfig.personal.linkedin,
      color: 'from-blue-600 to-blue-800'
    }
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full name field is required'),
    email: Yup.string().email('Invalid email').required('Email field is required'),
    message: Yup.string().required('Message field is required'),
    recaptcha: Yup.string().required('Robots are not welcome yet!'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setFieldValue }: FormikHelpers<FormValues>
  ) => {
    try {
      await fetch('https://formspree.io/xjvvqevg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'form-name': 'portfolio-dev',
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      setSubmitting(false);
      setFieldValue('success', true);
      setTimeout(() => {
        resetForm();
        setFieldValue('success', false);
      }, 5000);
    } catch (err) {
      setSubmitting(false);
      setFieldValue('success', false);
      alert('Something went wrong, please try again!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden
              ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/40 border-black/5 hover:bg-white/60'}
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{method.label}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{method.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-black/5'}`}>
        <h3 className="text-xl font-semibold mb-4">Send a Message</h3>

        <Formik
          initialValues={{ name: '', email: '', message: '', recaptcha: '', success: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              {values.success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 rounded-lg bg-green-500/20 border border-green-500/50 text-center"
                >
                  <p className="text-green-600 dark:text-green-300 font-medium text-lg">✓ Message sent successfully!</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>I'll get back to you ASAP!</p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <Field
                      name="name"
                      placeholder="Full name*"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all placeholder-gray-400
                        ${isDarkMode
                          ? 'bg-white/10 border-white/20 focus:border-purple-500 text-white'
                          : 'bg-white/50 border-gray-200 focus:border-purple-500 text-gray-900'}
                        ${touched.name && errors.name ? 'border-red-500' : ''}
                      `}
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email*"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all placeholder-gray-400
                        ${isDarkMode
                          ? 'bg-white/10 border-white/20 focus:border-purple-500 text-white'
                          : 'bg-white/50 border-gray-200 focus:border-purple-500 text-gray-900'}
                        ${touched.email && errors.email ? 'border-red-500' : ''}
                      `}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Field
                      name="message"
                      as="textarea"
                      rows={5}
                      placeholder="Message*"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all placeholder-gray-400 resize-none
                        ${isDarkMode
                          ? 'bg-white/10 border-white/20 focus:border-purple-500 text-white'
                          : 'bg-white/50 border-gray-200 focus:border-purple-500 text-gray-900'}
                        ${touched.message && errors.message ? 'border-red-500' : ''}
                      `}
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {values.name && values.email && values.message && (
                    <div className="flex flex-col gap-2">
                      <ReCAPTCHA
                        sitekey={recaptchaKey}
                        onChange={(value) => setFieldValue('recaptcha', value)}
                        theme={isDarkMode ? 'dark' : 'light'}
                      />
                      <ErrorMessage name="recaptcha" component="div" className="text-red-500 text-sm" />
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500
                             text-white rounded-lg font-medium transition-all shadow-lg
                             hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                             ${isSubmitting ? 'animate-pulse' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </motion.button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <FaMapMarkerAlt />
        <p>Based in Poland, Cracow • Available for remote opportunities worldwide</p>
      </div>
    </motion.div>
  );
};

export default ContactContent;
