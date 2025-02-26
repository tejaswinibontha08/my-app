
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./Cinematography.module.css";

const Cinematography = () => {
  const [domain, setDomain] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
    imageFile: null,
    copyrightProtected: false, // 🔥 Copyright flag
  });
  const [username, setUsername] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username") || "Guest";
    setUsername(storedUsername);

    axios
      .get("http://localhost:5000/api/domains")
      .then((res) => {
        const domainData = res.data.find((d) => d.name === "VisualEffects");
        if (domainData) setDomain(domainData);
      })
      .catch((err) => console.error("Error fetching domains:", err));
  }, []);

  useEffect(() => {
    if (domain) fetchPosts(domain._id);
  }, [domain]);

  const fetchPosts = async (domainId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${domainId}`);
      console.log("Fetched Posts:", res.data); // ✅ Debugging
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostSubmit = async () => {
    if (!domain || !username) return alert("User not logged in!");
    if (!newPost.content.trim() && !newPost.imageFile && !newPost.image) {
      return alert("Post cannot be empty!");
    }

    const storedUsername = sessionStorage.getItem("username") || "Guest";
    setUsername(storedUsername);

    const formData = new FormData();
    formData.append("domainId", domain._id);
    formData.append("user", storedUsername);
    formData.append("content", newPost.content.trim());
    formData.append("copyrightProtected", newPost.copyrightProtected); // ✅ Send flag properly

    if (newPost.imageFile) {
      formData.append("imageFile", newPost.imageFile);
    } else if (newPost.image.trim()) {
      formData.append("image", newPost.image.trim());
    }

    try {
      const response = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        fetchPosts(domain._id);
        setNewPost({ content: "", image: "", imageFile: null, copyrightProtected: false });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleDeletePost = async (postId, postUser) => {
    const storedUsername = sessionStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
    if (!postId || storedUsername !== postUser) return alert("You can only delete your own posts!");
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className={styles.container}>
      {domain && (
        <>
          <h1 className={styles.title}>{domain.name}</h1>
          <p className={styles.description}>{domain.description}</p>
          <h3 className={styles.subTitle}>🎬 Key Skills:</h3>
          <ul className={styles.skillList}>
            {domain.keySkills.map((skill, index) => (
              <li key={index} className={styles.skillItem}>
                {skill}
              </li>
            ))}
          </ul>

          <h3 className={styles.subTitle}>🌟 Community Posts</h3>
          <div className={styles.postsContainer}>
            {posts.map((post) => (
              <div
                key={post._id}
                className={`${styles.postCard} ${
                  post.copyrightProtected && post.user !== username ? styles.protected : ""
                }`}
                title={post.copyrightProtected && post.user !== username ? "This post is copyright protected" : ""}
              >
                <p>
                  <strong>{post.user}:</strong>{" "}
                  {post.copyrightProtected && post.user !== username ? "🔒 Protected Content" : post.content}
                </p>

                {post.image && (
  <div className={post.copyrightProtected && post.user !== username ? styles.protectedImage : ""} style={{ position: "relative" }}>
    <img
      src={post.image}
      alt="Post"
      className={styles.postImage}
    />
  </div>
)}


                <p className={styles.timestamp}>{new Date(post.timestamp).toLocaleString()}</p>

                {post.user === username && (
                  <button className={styles.deleteButton} onClick={() => handleDeletePost(post._id, post.user)}>
                    🗑 Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          <h3 className={styles.subTitle}>🎥 Add a Post</h3>
          <textarea
            className={styles.textArea}
            placeholder="Write something..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Image URL (optional)"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value, imageFile: null })}
          />
          <input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setNewPost({ ...newPost, imageFile: e.target.files[0], image: "" })}
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={newPost.copyrightProtected}
              onChange={() => setNewPost({ ...newPost, copyrightProtected: !newPost.copyrightProtected })}
            />
            Enable Copyright Protection
          </label>

          <button className={styles.postButton} onClick={handlePostSubmit}>
            🎬 Post
          </button>
        </>
      )}
    </div>
  );
};

export default Cinematography;
