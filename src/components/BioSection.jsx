import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './BioSection.css';

function BioSection({ username }) {
  const [bio, setBio] = useState('');
  const [draftBio, setDraftBio] = useState(''); // <-- Temporary state for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-bio/${username}`);
        if (response.ok) {
          const data = await response.json();
          setBio(data.bio);
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };
    fetchBio();
  }, [username]); 

  const handleAddBioClick = () => {
    setDraftBio(bio); // <-- Prefill draft with existing bio (or empty)
    setIsPopupOpen(true);
  };

  const handleEditClick = () => {
    setDraftBio(bio); // <-- Prefill draft with existing bio
    setIsPopupOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/delete-bio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      setBio(data.bio);
    } catch (error) {
      console.error("Error deleting bio:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/update-bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio: draftBio })
      });
      const data = await response.json();
      setBio(data.bio);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bio-container">
      <div className="bio-heading-line">
        <h3 className="bio-heading">Bio</h3>
        {bio && (
          <div className="bio-icons">
            <FaEdit className="bio-icon edit-icon" onClick={handleEditClick} />
            <FaTrashAlt className="bio-icon delete-icon" onClick={handleDeleteClick} />
          </div>
        )}
      </div>

      {bio ? (
        <p className="bio-text">{bio}</p>
      ) : (
        <button className="add-bio-btn" onClick={handleAddBioClick}>
          <FaPlus /> Add Bio
        </button>
      )}

      {isPopupOpen && (
        <div className="bio-popup">
          <textarea
            className="bio-popup-textarea"
            value={draftBio} // Use draftBio here, not bio
            onChange={(e) => setDraftBio(e.target.value)}
            placeholder="Write something about yourself..."
            maxLength={300}
          />
          <div className="bio-popup-buttons">
            <button className="btn-gradient save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="btn-gradient cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BioSection;