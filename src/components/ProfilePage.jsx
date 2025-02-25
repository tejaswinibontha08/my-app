import { useState, useEffect, useRef } from 'react';
import defaultCover from '../assets/cover.jpeg';
// import defaultAvatar from '../assets/profile.jpeg';
import defaultAvatar from '../assets/download.jpg';
import './ProfilePage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import BioSection from './BioSection';
import AddPost from './AddPost';
import SocialMedia from './SocialMedia';
import ISE from './ISE';
import SettingsAndPrivacy from './SettingsAndPrivacy';

function ProfilePage() {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const username = sessionStorage.getItem("username"); // No useState needed
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const coverContainerRef = useRef(null);
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  useEffect(() => {
    console.log("Fetching user data...");
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-user/${username}`);

        if (response.ok) {
          const data = await response.json();

          if (data._id) {
            localStorage.setItem("userId", data._id);
          }
          setFirstName(data.firstName || "Add Name");
          setLastName(data.lastName || "");
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchUserData();
  }, [username]); 

  const updateProfile = async () => {
    console.log("🔄 Sending update request:", { username, firstName, lastName });
    try {
      const response = await fetch("http://localhost:5000/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, firstName, lastName }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditPopupOpen(false); // ✅ Close popup immediately
      } else {
        console.error("❌ Failed to update profile:", data.error);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (coverPhoto) URL.revokeObjectURL(coverPhoto);
      if (profilePhoto) URL.revokeObjectURL(profilePhoto);
    };
  }, [coverPhoto, profilePhoto]);

  const processCoverImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const containerWidth = coverContainerRef.current.offsetWidth;
          const containerHeight = coverContainerRef.current.offsetHeight;

          canvas.width = containerWidth;
          canvas.height = containerHeight;

          const ctx = canvas.getContext('2d');

          const scale = Math.max(
            containerWidth / img.width,
            containerHeight / img.height
          );

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const offsetX = (containerWidth - scaledWidth) / 2;
          const offsetY = (containerHeight - scaledHeight) / 2;

          ctx.fillStyle = '#e5e7eb';
          ctx.fillRect(0, 0, containerWidth, containerHeight);

          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            scaledWidth,
            scaledHeight
          );

          canvas.toBlob((blob) => {
            const processedImageUrl = URL.createObjectURL(blob);
            resolve(processedImageUrl);
          }, 'image/jpeg', 0.9);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (coverPhoto) {
        URL.revokeObjectURL(coverPhoto);
      }

      const processedImageUrl = await processCoverImage(file);
      setCoverPhoto(processedImageUrl);
      coverInputRef.current.value = '';
    }
  };

  const handleCoverPhotoDelete = () => {
    if (coverPhoto) URL.revokeObjectURL(coverPhoto);
    setCoverPhoto(null);
    coverInputRef.current.value = '';
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }

      setProfilePhoto(URL.createObjectURL(file));
      profileInputRef.current.value = '';
    }
  };

  const handleProfilePhotoDelete = () => {
    if (profilePhoto) URL.revokeObjectURL(profilePhoto);
    setProfilePhoto(null);
    profileInputRef.current.value = '';
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleSaveChanges = () => {
    setIsEditPopupOpen(false);
  };

  return (
    <div className="profile-page">
      {/* Cover Photo Section */}
      <div className="cover-photo-container" ref={coverContainerRef}>
        <img src={coverPhoto || defaultCover} alt="Cover" className="cover-photo" />
        <div className="cover-photo-overlay">
          <button className="cover-edit-icon" onClick={() => coverInputRef.current.click()}>
            <FaEdit />
          </button>
          {coverPhoto && (
            <button className="cover-delete-icon" onClick={handleCoverPhotoDelete}>
              <FaTrashAlt />
            </button>
          )}
        </div>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden-input"
          onChange={handleCoverPhotoChange}
        />
      </div>

      {/* Profile Photo and Info */}
      <div className="profile-section">
        <div className="profile-photo-wrapper">
          <div className="profile-photo-container">
            <img src={profilePhoto || defaultAvatar} alt="Profile" className="profile-photo" />
            <div className="profile-photo-icons">
              <button
                className="profile-edit-icon"
                onClick={() => profileInputRef.current.click()}
              >
                <FaEdit />
              </button>
              {profilePhoto && (
                <button className="profile-delete-icon" onClick={handleProfilePhotoDelete}>
                  <FaTrashAlt />
                </button>
              )}
            </div>
          </div>
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>

      {/* Name and Username */}
      <div className="user-details">
        <div className="user-name-wrapper">
          <h1 className="user-name">{firstName} {lastName}</h1>
          <FaEdit className="inline-edit-icon" onClick={() => setIsEditPopupOpen(true)} />
        </div>
        <p className="user-username">@{username}</p>
      </div>

      
      <BioSection username={username} />

      {/* Popup Form */}
      {isEditPopupOpen && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <label>First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label>Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <div className="popup-buttons">
              <button className="save-btn" onClick={updateProfile}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setIsEditPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <AddPost />
      <SocialMedia username={username}/>
      <ISE username={username} />
    </div>
  );
}

export default ProfilePage;