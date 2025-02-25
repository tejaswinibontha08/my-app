import { useState, useEffect, useRef } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaTrashAlt, FaEdit, FaExternalLinkAlt } from 'react-icons/fa';
import './SocialMedia.css';

const SocialMedia = ({ username }) => {
  const [socialLinks, setSocialLinks] = useState({});
  const [editMode, setEditMode] = useState({});
  const [hoveredPlatform, setHoveredPlatform] = useState(null);
  const cardRef = useRef(null);

  // Fetch social media links from backend when component loads
  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-social-media/${username}`);
        const data = await response.json();
        setSocialLinks(data.socialMedia || {});
      } catch (error) {
        console.error("Error fetching social media links:", error);
      }
    };
    fetchSocialMediaLinks();
  }, [username]);

  // Close input field when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setEditMode({});
      }
    };
    if (Object.values(editMode).includes(true)) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode]);

  // Save social media link to backend
  const handleSave = async (platform) => {
    try {
      await fetch("http://localhost:5000/update-social-media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, platform, link: socialLinks[platform] })
      });
      setEditMode(prev => ({ ...prev, [platform]: false }));
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  // Delete social media link from backend
  const handleDelete = async (platform) => {
    try {
      await fetch("http://localhost:5000/delete-social-media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, platform })
      });
      setSocialLinks(prev => ({ ...prev, [platform]: '' }));
    } catch (error) {
      console.error("Error deleting social media link:", error);
    }
  };

  const socialPlatforms = [
    { name: 'twitter', icon: <FaTwitter />, color: '#1DA1F2', placeholder: 'Enter Twitter URL' },
    { name: 'linkedin', icon: <FaLinkedin />, color: '#0A66C2', placeholder: 'Enter LinkedIn URL' },
    { name: 'facebook', icon: <FaFacebook />, color: '#1877F2', placeholder: 'Enter Facebook URL' },
    { name: 'instagram', icon: <FaInstagram />, color: '#E4405F', placeholder: 'Enter Instagram URL' }
  ];

  return (
    <div className="social-media-section">
      <h2 className="social-media-title">Social Media</h2>
      <div className="social-cards-container" ref={cardRef}>
        {socialPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="social-card"
            style={{ '--platform-color': platform.color }}
            onMouseEnter={() => setHoveredPlatform(platform.name)}
            onMouseLeave={() => setHoveredPlatform(null)}
          >
            <div className="social-icon">{platform.icon}</div>

            {editMode[platform.name] ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(platform.name);
                }}
                className="social-input-form"
              >
                <input
                  type="url"
                  value={socialLinks[platform.name] || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, [platform.name]: e.target.value })}
                  placeholder={platform.placeholder}
                  className="social-input"
                />
                <button type="submit" className="save-button">
                  Save
                </button>
              </form>
            ) : (
              <div className="spacer"></div> // Keeps layout spacing correct
            )}

            {hoveredPlatform === platform.name && !editMode[platform.name] && (
              <div className="social-buttons">
                {socialLinks[platform.name] && (
                  <button className="open-button" onClick={() => window.open(socialLinks[platform.name], '_blank')}>
                    <FaExternalLinkAlt />
                  </button>
                )}
                <button className="edit-button" onClick={() => setEditMode({ ...editMode, [platform.name]: true })}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(platform.name)}>
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;