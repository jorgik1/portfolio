import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'yurii.stenin@gmail.com',
      link: 'mailto:yurii.stenin@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@jorgik1',
      link: 'https://github.com/jorgik1',
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Yuriy Stenin',
      link: 'https://www.linkedin.com/in/yuriy-stenin/',
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: FaTwitter,
      label: 'Portfolio',
      value: 'yuriy-dev.vercel.app',
      link: 'https://yuriy-dev.vercel.app/',
      color: 'from-sky-400 to-blue-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="text-gray-300">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.label}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity`}
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">{method.label}</p>
                <p className="text-sm text-gray-400">{method.value}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-white/5 border border-white/10"
      >
        <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
        
        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-lg bg-green-500/20 border border-green-500/50 text-center"
          >
            <p className="text-green-300 font-medium">✓ Message sent successfully!</p>
            <p className="text-gray-300 text-sm mt-2">I'll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 
                         outline-none transition-all text-white placeholder-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 
                         outline-none transition-all text-white placeholder-gray-400"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 
                         outline-none transition-all text-white placeholder-gray-400 resize-none"
                placeholder="Tell me about your project or just say hi..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 
                       hover:from-purple-600 hover:to-blue-600 rounded-lg font-medium 
                       transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Send Message
            </motion.button>
          </form>
        )}
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 text-gray-400"
      >
        <FaMapMarkerAlt className="w-4 h-4" />
        <p className="text-sm">Based in Poland, Andrzew • Available for remote opportunities worldwide</p>
      </motion.div>
    </motion.div>
  );
};

export default ContactContent;
