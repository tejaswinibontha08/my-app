import React, { useState, useEffect } from 'react';
import './AddPost.css';
import sampleImage from '../assets/Home.png';

function AddPost() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isDomainSelectorOpen, setIsDomainSelectorOpen] = useState(false);
  const [postDetails, setPostDetails] = useState({
    content: null,
    description: '',
    copyright: false,
    domains: []
  });
  const [errors, setErrors] = useState({});

  // Available domains
  const availableDomains = [
    { id: 'cinematography', label: 'Cinematography' },
    { id: 'music', label: 'Music' },
    { id: 'direction', label: 'Direction' },
    { id: 'production', label: 'Production' },
    { id: 'dance', label: 'Dance' }
  ];

  const handleCreatePost = () => {
    setIsPopupOpen(true);
    setErrors({});
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!postDetails.content) {
      newErrors.content = "Please upload a file";
    }
    
    if (postDetails.domains.length === 0) {
      newErrors.domains = "Please select at least one domain";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePost = () => {
    if (validateForm()) {
      console.log('Post Details:', postDetails);
      setIsPopupOpen(false);
      setIsSuccessPopupOpen(true);
      // Reset form data for next use
      setPostDetails({
        content: null,
        description: '',
        copyright: false,
        domains: []
      });
    }
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPostDetails({ ...postDetails, content: e.target.files[0] });
      setErrors({ ...errors, content: undefined });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails({ ...postDetails, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleToggleCopyright = () => {
    setPostDetails({ ...postDetails, copyright: !postDetails.copyright });
  };

  const toggleDomainSelector = () => {
    setIsDomainSelectorOpen(!isDomainSelectorOpen);
  };

  const handleDomainSelect = (domainId) => {
    let updatedDomains;
    
    if (domainId === 'all') {
      // If all domains are already selected, deselect all
      if (postDetails.domains.length === availableDomains.length) {
        updatedDomains = [];
      } else {
        // Otherwise select all domains
        updatedDomains = availableDomains.map(domain => domain.id);
      }
    } else {
      // Toggle individual domain selection
      if (postDetails.domains.includes(domainId)) {
        updatedDomains = postDetails.domains.filter(id => id !== domainId);
      } else {
        updatedDomains = [...postDetails.domains, domainId];
      }
    }
    
    setPostDetails({ ...postDetails, domains: updatedDomains });
    setErrors({ ...errors, domains: undefined });
  };

  const handleDoneSelectingDomains = () => {
    setIsDomainSelectorOpen(false);
  };

  // Get domain labels for selected domain IDs
  const getSelectedDomainLabels = () => {
    return postDetails.domains.map(id => 
      availableDomains.find(domain => domain.id === id)?.label
    );
  };

  // Check if all domains are selected
  const areAllDomainsSelected = () => {
    return postDetails.domains.length === availableDomains.length;
  };

  return (
    <div className="add-post-section">
      <img src={sampleImage} alt="Add Post Visual" className="add-post-image" />
      <button className="create-post-button" onClick={handleCreatePost}>+ CREATE POST</button>

      {isPopupOpen && (
        <div className="post-popup">
          <h3>Create New Post</h3>
          
          <div className="form-field">
            <label className="upload-button">
              + Your Content Here
              <input type="file" onChange={handleFileChange} hidden />
            </label>
            {postDetails.content && <span className="file-selected">{postDetails.content.name}</span>}
            {errors.content && <span className="error-message">{errors.content}</span>}
          </div>
          
          <div className="form-field">
            <textarea
              name="description"
              placeholder="Enter post description..."
              value={postDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-field toggle-field">
            <label className="toggle-label">Copyright Protection</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="copyright-toggle"
                checked={postDetails.copyright}
                onChange={handleToggleCopyright}
              />
              <label htmlFor="copyright-toggle" className="toggle-slider"></label>
            </div>
            <span className="toggle-status">
              {postDetails.copyright ? "With Copyright" : "Without Copyright"}
            </span>
          </div>
          
          {/* Selected domains display */}
          <div className="selected-domains-container">
            <div className="selected-domains-header">
              <span className="domains-label">Domains</span>
              <button 
                type="button" 
                className="select-domains-btn" 
                onClick={toggleDomainSelector}
              >
                {postDetails.domains.length > 0 ? 'Edit' : 'Select'} Domains
              </button>
            </div>
            
            {postDetails.domains.length > 0 ? (
              <div className="selected-domains-tags">
                {getSelectedDomainLabels().map((label, index) => (
                  <span key={index} className="domain-tag">{label}</span>
                ))}
              </div>
            ) : (
              <div className="no-domains-selected">
                No domains selected
              </div>
            )}
            {errors.domains && <span className="error-message">{errors.domains}</span>}
          </div>
          
          {/* Domain selector popup */}
          {isDomainSelectorOpen && (
            <div className="domains-selector-modal">
              <div className="domains-selector-content">
                <h4>Select Domains</h4>
                
                <div className="domain-option select-all">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={areAllDomainsSelected()} 
                      onChange={() => handleDomainSelect('all')} 
                    />
                    <span>Select All</span>
                  </label>
                </div>
                
                <div className="domain-options-list">
                  {availableDomains.map(domain => (
                    <div key={domain.id} className="domain-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={postDetails.domains.includes(domain.id)} 
                          onChange={() => handleDomainSelect(domain.id)} 
                        />
                        <span>{domain.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="done-selecting-btn" 
                  onClick={handleDoneSelectingDomains}
                >
                  Done
                </button>
              </div>
            </div>
          )}
          
          <div className="popup-buttons">
            <button className="save-btn" onClick={handleSavePost}>Save</button>
            <button className="cancel-btn" onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}

      {isSuccessPopupOpen && (
        <div className="success-popup">
          <div className="success-popup-content">
            <div className="success-icon">✓</div>
            <h3>Posted Successfully!</h3>
            <p>Your content has been successfully posted.</p>
            <button className="done-btn" onClick={handleCloseSuccessPopup}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPost;