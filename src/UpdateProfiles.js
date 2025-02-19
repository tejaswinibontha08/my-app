import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [workSamples, setWorkSamples] = useState('');
  const [professionalExperience, setProfessionalExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem('user')).email;  // Assuming user's email is stored in localStorage

    try {
      const response = await axios.put('http://localhost:5000/api/auth/update-profile', {
        email,
        workSamples: JSON.parse(workSamples), // Convert work samples to an array of links
        professionalExperience,
        skills: JSON.parse(skills), // Convert skills to an array of strings
      });

      navigate('/Homepage');  // Redirect to the homepage after successful profile setup
    } catch (err) {
      setError('Error updating profile');
    }
  };

  return (
    <div className="update-profile-container">
      <form onSubmit={handleProfileUpdate}>
        <h2>Set Up Your Profile</h2>

        <textarea
          value={workSamples}
          onChange={(e) => setWorkSamples(e.target.value)}
          placeholder="Work Samples (Provide links in JSON format)"
          required
        />
        <textarea
          value={professionalExperience}
          onChange={(e) => setProfessionalExperience(e.target.value)}
          placeholder="Professional Experience"
          required
        />
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills (Provide skills in JSON format)"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
