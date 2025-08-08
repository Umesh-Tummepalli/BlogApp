import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom"; // Add this import
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual login logic
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/user/login`)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(res?.data?.message || "Login failed");
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.message || "Login failed");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full min-h-screen bg-[#191919] flex items-center justify-center p-4 font-sans">
      <motion.div
        className="w-full max-w-md mx-auto"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#191919] rounded-2xl shadow-2xl shadow-white/10 p-8 border border-white/20">
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-8"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div className="relative" variants={itemVariants}>
              <Mail
                className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                required
              />
            </motion.div>
            <motion.div className="relative" variants={itemVariants}>
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-lg shadow-lg shadow-white/20 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
            </motion.div>
          </form>
          <motion.p
            className="text-center text-sm text-white/60 mt-8"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white underline hover:text-gray-300 transition-colors"
            >
              Register
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
