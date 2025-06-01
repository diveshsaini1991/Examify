/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {  CheckCircle, Clock, Shield, ChevronRight, BookOpen, Users, BarChart } from "lucide-react";

export default function Home() {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  const textReveal = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dramatic Split Design */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side */}
        <motion.div 
          className="md:w-1/2 bg-blue-900 text-white flex items-center justify-center p-12"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-lg">
            <motion.div variants={heroVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="mb-4 flex items-center">
                <div className="bg-blue-600 p-2 rounded-full mr-3">
                  <BookOpen size={20} />
                </div>
                <span className="uppercase tracking-widest text-blue-300 text-sm font-semibold">Examify Platform</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl font-bold mb-8 leading-tight"
              >
                Revolutionize Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"> Online Examination </span>
                Experience
              </motion.h1>

              <motion.div 
                variants={itemVariants}
                className="h-1 w-20 bg-blue-400 mb-8"
              />

              <motion.p 
                variants={itemVariants}
                className="text-blue-200 text-lg mb-10"
              >
                Create, manage, and analyze exams with unparalleled security and real-time insights. The all-in-one platform trusted by leading educational institutions worldwide.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="/signup"
                  className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ChevronRight size={18} className="ml-1" />
                </motion.a>
                <motion.a 
                  href="/demo"
                  className="border-2 border-blue-400 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Demo
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Animated Features Display */}
        <motion.div 
          className="md:w-1/2 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-12 flex items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full max-w-lg mx-auto">
            <motion.div 
              className="relative rounded-2xl bg-white shadow-2xl p-8 overflow-hidden border border-blue-100"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              />
              
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <CheckCircle size={24} className="text-blue-600" />
                </div>
                Key Features
              </h3>
              
              {[
                { icon: <Shield size={20} className="text-blue-600" />, title: "Advanced Security", desc: "Prevent cheating with AI-powered proctoring" },
                { icon: <Clock size={20} className="text-blue-600" />, title: "Time-Saving", desc: "Automated grading and instant results" },
                { icon: <BarChart size={20} className="text-blue-600" />, title: "Deep Analytics", desc: "Comprehensive performance insights" },
                { icon: <Users size={20} className="text-blue-600" />, title: "Scalable", desc: "Handle thousands of concurrent test-takers" }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-start mb-5 p-3 hover:bg-blue-50 rounded-lg transition-all"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + (idx * 0.2) }}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">{feature.title}</h4>
                    <p className="text-blue-600 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-6 pt-6 border-t border-blue-100 text-center text-blue-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Trusted by <span className="font-bold">10,000+</span> educators worldwide
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p className="text-2xl font-light text-center">Trusted by leading institutions</motion.p>
            
            {["Harvard", "MIT", "Stanford", "Oxford", "Cambridge"].map((logo, idx) => (
              <motion.div 
                key={idx} 
                className="text-xl font-bold uppercase tracking-wider"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, color: "#a5b4fc" }}
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "2M+", label: "Exams Taken" },
              { number: "5K+", label: "Institutions" },
              { number: "150+", label: "Countries" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-md"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)"
                }}
              >
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-blue-800 uppercase tracking-wide text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}