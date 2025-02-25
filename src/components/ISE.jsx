import { useState, useEffect } from 'react';
import { FaPen, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './ISE.css';

const ISE = ({ username }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [tempSelectedInterests, setTempSelectedInterests] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showInterestSelect, setShowInterestSelect] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '' });

  const interestOptions = [
    "Direction", "Music", "ScreenWriting", "Production",
    "Cinematography", "Dance", "Art Department", "Sound Designing",
    "Editing", "VFX & Animations", "Acting", "Costume Designer"
  ];

  // Fetch initial data
  useEffect(() => {
    fetchISEData();
  }, [username]);

  const fetchISEData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-ise/${username}`);
      const data = await response.json();
      
      if (response.ok) {
        setSelectedInterests(data.interests || []);
        setTempSelectedInterests(data.interests || []);
        setExperiences(data.experience || []);
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Error fetching ISE data:', error);
    }
  };

  const handleInterestSelect = (interest) => {
    if (tempSelectedInterests.includes(interest)) {
      setTempSelectedInterests(tempSelectedInterests.filter(item => item !== interest));
    } else {
      setTempSelectedInterests([...tempSelectedInterests, interest]);
    }
  };

  const handleSaveInterests = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-interests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          interests: tempSelectedInterests
        }),
      });

      if (response.ok) {
        setSelectedInterests(tempSelectedInterests);
        setShowInterestSelect(false);
      }
    } catch (error) {
      console.error('Error updating interests:', error);
    }
  };

  const handleCancelInterests = () => {
    setTempSelectedInterests(selectedInterests);
    setShowInterestSelect(false);
  };

  const handleRemoveInterest = async (interest) => {
    const newInterests = selectedInterests.filter(item => item !== interest);
    try {
      const response = await fetch('http://localhost:5000/update-interests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          interests: newInterests
        }),
      });

      if (response.ok) {
        setSelectedInterests(newInterests);
        setTempSelectedInterests(newInterests);
      }
    } catch (error) {
      console.error('Error removing interest:', error);
    }
  };

  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    productionName: '',
    startDate: '',
    endDate: '',
    present: false,
    keyResponsibilities: ''
  });

  const handleEditExperience = (exp) => {
    setEditingExperience(exp);
    setNewExperience({
      jobTitle: exp.jobTitle,
      productionName: exp.productionName,
      startDate: exp.startDate,
      endDate: exp.endDate,
      present: exp.isPresent,
      keyResponsibilities: exp.responsibilities
    });
    setIsExperienceModalOpen(true);
  };

  const handleAddExperience = async () => {
    if (newExperience.jobTitle && newExperience.productionName) {
      try {
        const experienceData = {
          jobTitle: newExperience.jobTitle,
          productionName: newExperience.productionName,
          startDate: newExperience.startDate,
          endDate: newExperience.present ? 'Present' : newExperience.endDate,
          isPresent: newExperience.present,
          responsibilities: newExperience.keyResponsibilities
        };

        const url = editingExperience 
          ? 'http://localhost:5000/update-experience'
          : 'http://localhost:5000/add-experience';

        const response = await fetch(url, {
          method: editingExperience ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            experienceIndex: editingExperience ? experiences.findIndex(exp => exp._id === editingExperience._id) : undefined,
            experience: experienceData
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setExperiences(data.updatedUser.experience);
          setNewExperience({
            jobTitle: '',
            productionName: '',
            startDate: '',
            endDate: '',
            present: false,
            keyResponsibilities: ''
          });
          setEditingExperience(null);
          setIsExperienceModalOpen(false);
        }
      } catch (error) {
        console.error('Error saving experience:', error);
      }
    }
  };

  const handleDeleteExperience = async (experienceIndex) => {
    try {
      const response = await fetch('http://localhost:5000/delete-experience', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          experienceIndex
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setExperiences(data.updatedUser.experience);
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill });
    setIsSkillModalOpen(true);
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return;  // ✅ Prevents empty skill
  
    try {
      const url = editingSkill 
        ? 'http://localhost:5000/update-skill'
        : 'http://localhost:5000/add-skill';
  
      const response = await fetch(url, {
        method: editingSkill ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          skillIndex: editingSkill ? skills.findIndex(s => s === editingSkill) : undefined,
          skill: newSkill.name
        }),
      });
  
      if (response.ok) {
        setNewSkill({ name: '' });  // ✅ Clear input
        setEditingSkill(null);
        setIsSkillModalOpen(false);
        fetchISEData();  // ✅ Fetch latest skills from database
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDeleteSkill = async (skillIndex) => {
    try {
      const response = await fetch('http://localhost:5000/delete-skill', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          skillIndex
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data.updatedUser.skills);
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="ise-container">
      {/* Interests Section */}
      <section className="interests-section">
        <h2>Interests</h2>
        <div className="selected-interests">
          {selectedInterests.map(interest => (
            <div key={interest} className="interest-tag">
              {interest}
              <FaTimes
                className="remove-interest"
                onClick={() => handleRemoveInterest(interest)}
              />
            </div>
          ))}
          <button 
            className="standard-button"
            onClick={() => {
              setTempSelectedInterests(selectedInterests);
              setShowInterestSelect(!showInterestSelect);
            }}
          >
            Add Interest
          </button>
        </div>
        
        {showInterestSelect && (
          <div className="interest-selection-container">
            <div className="interest-options">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  className={`interest-option ${tempSelectedInterests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleInterestSelect(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="interest-actions">
              <button className="save-btn" onClick={handleSaveInterests}>Save</button>
              <button className="cancel-btn" onClick={handleCancelInterests}>Cancel</button>
            </div>
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="section-header">
          <h2>Experience</h2>
          <button 
            className="standard-button"
            onClick={() => {
              setEditingExperience(null);
              setNewExperience({
                jobTitle: '',
                productionName: '',
                startDate: '',
                endDate: '',
                present: false,
                keyResponsibilities: ''
              });
              setIsExperienceModalOpen(true);
            }}
          >
            Add Experience
          </button>
        </div>
        
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={exp._id || index} className="experience-card">
              <div className="experience-details">
                <h3>{exp.jobTitle}</h3>
                <p className="production-name">{exp.productionName}</p>
                <p className="date">
                  {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                </p>
                <p className="key-responsibilities">{exp.responsibilities}</p>
              </div>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditExperience(exp)}>
                    <FaPen />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteExperience(index)}>
                    <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <button 
            className="standard-button"
            onClick={() => {
              setEditingSkill(null);
              setNewSkill({ name: '' });
              setIsSkillModalOpen(true);
            }}
          >
            Add Skill
          </button>
        </div>
        
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-details">
                <h3>{typeof skill === 'object' ? skill.name : skill}</h3>
              </div>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditSkill(skill)}>
                    <FaPen />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteSkill(index)}>
                    <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Modal */}
      {isExperienceModalOpen && (
        <div className="modal-overlay">
          <div className="experience-modal">
            <h2>{editingExperience ? 'Edit Experience' : 'Add Experience'}</h2>
            <input
              type="text"
              placeholder="Job Title"
              value={newExperience.jobTitle}
              onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
            />
            <input
              type="text"
              placeholder="Production Name"
              value={newExperience.productionName}
              onChange={(e) => setNewExperience({ ...newExperience, productionName: e.target.value })}
            />
            <div className="date-inputs">
              <input
                type="date"
                placeholder="Start Date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
              {!newExperience.present && (
                <input
                  type="date"
                  placeholder="End Date"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                />
              )}
            </div>
            <div className="present-checkbox">
              <input
                type="checkbox"
                checked={newExperience.present}
                onChange={(e) => setNewExperience({ ...newExperience, present: e.target.checked })}
              />
              <label>I currently work here</label>
            </div>
            <textarea
              placeholder="Key Responsibilities"
              value={newExperience.keyResponsibilities}
              onChange={(e) => setNewExperience({ ...newExperience, keyResponsibilities: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleAddExperience}>Save</button>
              <button onClick={() => {
                setIsExperienceModalOpen(false);
                setEditingExperience(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Modal */}
      {isSkillModalOpen && (
        <div className="modal-overlay">
          <div className="skills-modal">
            <h2>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleAddSkill}>Save</button>
              <button onClick={() => {
                setIsSkillModalOpen(false);
                setEditingSkill(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ISE;