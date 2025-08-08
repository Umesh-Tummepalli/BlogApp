import React, { useState } from 'react';
import { Search, Calendar, User, Heart, MessageCircle, Share2 } from "lucide-react";

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

const Home = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#191919] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Search and Categories */}
        <section className="py-12 px-4 bg-gradient-to-l from-[#242424] to-[#191919] rounded-lg">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">Browse by Category</h3>
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-[#191919] border border-gray-700 text-white placeholder-gray-400 p-2 rounded focus:ring-2 focus:ring-white"
                  />
                </div>
            </div>
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
                        <span>{post.authorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
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
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
