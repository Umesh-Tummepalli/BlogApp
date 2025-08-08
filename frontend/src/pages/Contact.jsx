import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#191919] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have a question, a suggestion, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-[#242424] p-8 rounded-lg border border-gray-700">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input type="text" id="name" className="w-full bg-[#191919] border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input type="email" id="email" className="w-full bg-[#191919] border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea id="message" rows="4" className="w-full bg-[#191919] border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-white"></textarea>
            </div>
            <button type="submit" className="bg-white text-black hover:bg-gray-200 px-8 py-2 rounded font-semibold transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
