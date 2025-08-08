import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Calendar, Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export const RegistrationForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    contactNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }, [form.password, form.confirmPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        {
          username: form.username,
          password: form.password,
          email: form.email,
          contactNumber: form.contactNumber,
          dob: form.dob,
        }
      );
      if (res.data.success) {
        toast.success("Registration Successful");
        navigate("/login");
        setError("");
      } else {
        toast.error(res.data.message);
        setError(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.message || "Registration failed");
      setError(err.response?.message || "Registration failed");
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
        <div className="bg-[#191919] rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/30 p-10">
          <motion.h2
            className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight"
            variants={itemVariants}
          >
            Create Account
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Responsive grid for first four fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column: Username & Email */}
              <div className="space-y-6">
                <motion.div className="relative" variants={itemVariants}>
                  <User className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                    required
                  />
                </motion.div>
              </div>
              {/* Right column: Contact & DOB */}
              <div className="space-y-6">
                <motion.div className="relative" variants={itemVariants}>
                  <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={form.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                    required
                  />
                </motion.div>
              </div>
            </div>
            {/* Password fields below */}
            <motion.div className="relative" variants={itemVariants}>
              <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </motion.div>
            <motion.div className="relative" variants={itemVariants}>
              <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" size={22} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 bg-black/80 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </motion.div>
            {error && (
              <motion.div
                className="text-red-500 text-sm text-center"
                variants={itemVariants}
              >
                {error}
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-xl shadow-lg shadow-white/20 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#191919] focus:ring-white transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={form.password !== form.confirmPassword || !form.password}
              >
                Register
              </motion.button>
            </motion.div>
          </form>
          <motion.p
            className="text-center text-base text-white/70 mt-10"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-white underline hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
