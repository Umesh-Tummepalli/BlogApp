"use client"

import { useState } from "react";
import { PenTool, Search, Calendar, User, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["Technology", "Design", "Lifestyle", "Travel", "Food", "Business", "Health", "Education"];

const initialPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development in 2024.",
    content: "Web development is evolving rapidly with new frameworks, tools, and methodologies...",
    author: "Alex Johnson",
    date: "2024-01-15",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=400",
    likes: 42,
    comments: 8,
  },
  // ... other posts
];

export default function LandingPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: null,
  });

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content && newPost.author && newPost.category) {
        const post = {
        id: posts.length + 1,
        title: newPost.title,
        excerpt: newPost.excerpt || newPost.content.substring(0, 150) + "...",
        content: newPost.content,
        author: newPost.author,
        date: new Date().toISOString().split("T")[0],
        category: newPost.category,
        image: newPost.image || `/placeholder.svg?height=200&width=400&query=${newPost.category.toLowerCase()}`,
        likes: 0,
        comments: 0,
      };
        setPosts([post, ...posts]);
      setNewPost({ title: "", excerpt: "", content: "", author: "", category: "", image: "" });
      setIsWriteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191919]">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#242424] to-[#191919]">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Share Your
            <span className="block text-white font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Stories</span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search blogs..."
                  value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 bg-[#191919] border border-gray-700 text-white placeholder-gray-400 p-2 rounded focus:ring-2 focus:ring-white"
              />
            </div>
              <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-white text-black hover:bg-gray-200 px-8 py-2 rounded font-semibold transition"
            >
              Start Writing
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-gradient-to-l from-[#242424] to-[#191919]">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded font-medium ${
                selectedCategory === "All"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "border border-gray-600 text-gray-300 hover:bg-gradient-to-r from-purple-400 to-pink-600 hover:text-white transition-colors duration-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded font-medium ${
                  selectedCategory === category
                    ? "bg-white text-black hover:bg-gray-200"
                    : "border border-gray-600 text-gray-300 hover:bg-gradient-to-r from-purple-400 to-pink-600 hover:text-white transition-colors duration-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4 ">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              {selectedCategory === "All" ? "Latest Posts" : `${selectedCategory} Posts`}
            </h3>
            <p className="text-gray-400">{filteredPosts.length} posts found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-[#191919] border border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image || "/placeholder.svg"}
                      alt={post.title}
                    className="w-full h-48 object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white p-1">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="mt-4 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
              >
                Be the first to write about {selectedCategory}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 mt-20 bg-gradient-to-r from-[#242424] to-[#191919]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PenTool className="h-6 w-6 text-white" />
                <h4 className="text-xl font-bold text-white">BlogSpace</h4>
              </div>
              <p className="text-gray-400">
                A platform for sharing stories, ideas, and connecting with fellow writers and readers.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Categories</h5>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category}>
                    <Link to={`/category/${category.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Newsletter</h5>
              <p className="text-gray-400 mb-4">Stay updated with the latest posts.</p>
              <div className="flex gap-2">
                <input 
                    placeholder="Your email"
                  className="bg-[#191919] border border-gray-700 text-white p-2 rounded flex-1" 
                />
                <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded font-semibold transition">
                  Subscribe
                </button>
                </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}