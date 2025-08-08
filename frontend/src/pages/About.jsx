import React from 'react';
import { PenTool, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#191919] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">BlogSpace</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A community-driven platform for sharing stories, ideas, and connecting with passionate writers and readers from around the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-[#242424] p-8 rounded-lg border border-gray-700">
            <PenTool className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-400">
              To provide a simple, beautiful, and powerful platform for individuals to share their voice and connect with others through the power of writing.
            </p>
          </div>
          <div className="bg-[#242424] p-8 rounded-lg border border-gray-700">
            <Users className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Our Community</h2>
            <p className="text-gray-400">
              We are a diverse community of writers, thinkers, and creators who are passionate about sharing knowledge and experiences.
            </p>
          </div>
          <div className="bg-[#242424] p-8 rounded-lg border border-gray-700">
            <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="text-gray-400">
              To become the leading platform for high-quality, independent content, fostering a vibrant and supportive community.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">The Story of BlogSpace</h2>
          <div className="prose prose-invert lg:prose-xl mx-auto text-gray-300">
            <p>
              BlogSpace was born from a simple idea: that everyone has a story to tell. In a world of noise and distraction, we wanted to create a space where thoughtful, well-crafted content could shine. We believe that writing is a powerful tool for connection, learning, and personal growth.
            </p>
            <p>
              Our platform is designed to be intuitive and easy to use, allowing you to focus on what matters most: your writing. We provide the tools you need to create beautiful and engaging blog posts, without the clutter and complexity of other platforms.
            </p>
            <p>
              But BlogSpace is more than just a tool. It's a community. We are committed to fostering a supportive and inclusive environment where writers of all levels can thrive. Whether you're a seasoned author or just starting out, you'll find a home here.
            </p>
            <p>
              Join us on our journey to build a better platform for writers and readers. Share your story, connect with others, and be a part of the BlogSpace community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
