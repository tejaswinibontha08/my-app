import { useState } from 'react';
import { FaToggleOn, FaToggleOff, FaChevronRight, FaLock, FaBell, FaUserCog, FaQuestionCircle } from 'react-icons/fa';
import './SettingsAndPrivacy.css';

const SettingsPrivacy = () => {
  // State for visibility settings
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [contentVisibility, setContentVisibility] = useState(true);
  
  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  
  // State for active section
  const [activeSection, setActiveSection] = useState('visibility');
  
  // Toggle handlers
  const toggleProfileVisibility = () => setProfileVisibility(!profileVisibility);
  const toggleContentVisibility = () => setContentVisibility(!contentVisibility);
  const toggleEmailNotifications = () => setEmailNotifications(!emailNotifications);
  const togglePushNotifications = () => setPushNotifications(!pushNotifications);
  const toggleMessageNotifications = () => setMessageNotifications(!messageNotifications);
  
  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul className="settings-menu">
          <li 
            className={activeSection === 'visibility' ? 'active' : ''} 
            onClick={() => setActiveSection('visibility')}
          >
            <FaLock className="menu-icon" />
            <span>Visibility & Privacy</span>
          </li>
          <li 
            className={activeSection === 'notifications' ? 'active' : ''} 
            onClick={() => setActiveSection('notifications')}
          >
            <FaBell className="menu-icon" />
            <span>Notifications</span>
          </li>
          <li 
            className={activeSection === 'account' ? 'active' : ''} 
            onClick={() => setActiveSection('account')}
          >
            <FaUserCog className="menu-icon" />
            <span>Account Settings</span>
          </li>
          <li 
            className={activeSection === 'help' ? 'active' : ''} 
            onClick={() => setActiveSection('help')}
          >
            <FaQuestionCircle className="menu-icon" />
            <span>Help & Support</span>
          </li>
        </ul>
      </div>
      
      <div className="settings-content">
        {activeSection === 'visibility' && (
          <div className="settings-section">
            <h2>Visibility & Privacy</h2>
            <p className="section-description">
              Control who can see your profile and content. These settings determine how your information appears to others.
            </p>
            
            <div className="settings-group">
              <h3>Profile Visibility</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Profile Page</h4>
                  <p>Set your profile to private or public</p>
                </div>
                <button className="toggle-button" onClick={toggleProfileVisibility}>
                  {profileVisibility ? <FaToggleOn className="toggle-on" /> : <FaToggleOff className="toggle-off" />}
                  <span className="toggle-label">{profileVisibility ? 'Public' : 'Private'}</span>
                </button>
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Content Visibility</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Portfolio Content</h4>
                  <p>Control visibility of your work, productions, and experience</p>
                </div>
                <button className="toggle-button" onClick={toggleContentVisibility}>
                  {contentVisibility ? <FaToggleOn className="toggle-on" /> : <FaToggleOff className="toggle-off" />}
                  <span className="toggle-label">{contentVisibility ? 'Public' : 'Private'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'notifications' && (
          <div className="settings-section">
            <h2>Notification Settings</h2>
            <p className="section-description">
              Manage how you receive notifications from the platform. Customize your preferences for different types of activities.
            </p>
            
            <div className="settings-group">
              <h3>Email Notifications</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Updates</h4>
                  <p>Receive notifications via email</p>
                </div>
                <button className="toggle-button" onClick={toggleEmailNotifications}>
                  {emailNotifications ? <FaToggleOn className="toggle-on" /> : <FaToggleOff className="toggle-off" />}
                  <span className="toggle-label">{emailNotifications ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Push Notifications</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Browser Notifications</h4>
                  <p>Receive notifications in your browser</p>
                </div>
                <button className="toggle-button" onClick={togglePushNotifications}>
                  {pushNotifications ? <FaToggleOn className="toggle-on" /> : <FaToggleOff className="toggle-off" />}
                  <span className="toggle-label">{pushNotifications ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Message Notifications</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Direct Messages</h4>
                  <p>Receive notifications for new messages</p>
                </div>
                <button className="toggle-button" onClick={toggleMessageNotifications}>
                  {messageNotifications ? <FaToggleOn className="toggle-on" /> : <FaToggleOff className="toggle-off" />}
                  <span className="toggle-label">{messageNotifications ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'account' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p className="section-description">
              Manage your account details, security preferences, and account controls.
            </p>
            
            <div className="settings-group">
              <h3>Security</h3>
              <div className="setting-link">
                <div className="setting-info">
                  <h4>Change Password</h4>
                  <p>Update your account password</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
              
              <div className="setting-link">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Account Control</h3>
              <div className="setting-link danger">
                <div className="setting-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
              
              <div className="setting-link">
                <div className="setting-info">
                  <h4>Download Your Data</h4>
                  <p>Get a copy of all your account data</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'help' && (
          <div className="settings-section">
            <h2>Help & Support</h2>
            <p className="section-description">
              Get assistance with account issues, find answers to common questions, or contact support.
            </p>
            
            <div className="settings-group">
              <h3>Resources</h3>
              <div className="setting-link">
                <div className="setting-info">
                  <h4>FAQ</h4>
                  <p>Find answers to commonly asked questions</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
              
              <div className="setting-link">
                <div className="setting-info">
                  <h4>User Guide</h4>
                  <p>Learn how to use all platform features</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Contact Us</h3>
              <div className="setting-link">
                <div className="setting-info">
                  <h4>Support Ticket</h4>
                  <p>Create a support ticket for assistance</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
              
              <div className="setting-link">
                <div className="setting-info">
                  <h4>Report a Bug</h4>
                  <p>Let us know if something isn't working right</p>
                </div>
                <FaChevronRight className="arrow-icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPrivacy;