import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateOfReport: '',
    communityChampion: '',
    transmanOPs: '',
    transwomanOPs: '',
    totalOPs: '',
    remarks: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing reports from localStorage
    const existingReports = localStorage.getItem('submitted_reports');
    const reports = existingReports ? JSON.parse(existingReports) : [];
    
    // Add new report
    reports.push(formData);
    
    // Save to localStorage
    localStorage.setItem('submitted_reports', JSON.stringify(reports));
    
    console.log('Form submitted:', formData);
    alert('Details submitted successfully!');
    
    // Reset form
    setFormData({
      dateOfReport: '',
      communityChampion: '',
      transmanOPs: '',
      transwomanOPs: '',
      totalOPs: '',
      remarks: ''
    });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/app/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/app/reports" className="nav-link">Reports</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <img src="/logo.jpeg" alt="Logo" className="header-logo" />
            <div className="header-title">
              <h1>MYTHRI TRANS CLINIC</h1>
              <p>మేథ్రీ ట్రాన్ స్ క్లినిక్</p>
            </div>
          </div>
          <div className="header-info">
            <span>Hospital: <strong>TEST</strong></span>
            <span>District: <strong>WARANGAL</strong></span>
            <span>CDPO: <strong>TEST</strong></span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* Form Section */}
        <div className="form-container">
          <form className="dashboard-form" onSubmit={handleSubmit}>
            {/* Transclinic Performance Details */}
            <div className="form-section">
              <h3 className="section-title">TRANSCLINIC PERFORMANCE DETAILS</h3>
              <div className="form-group form-group-narrow">
                <label>Date of Report <span className="required">*</span></label>
                <input 
                  type="date" 
                  name="dateOfReport"
                  value={formData.dateOfReport}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                  required
                />
              </div>
            </div>

            {/* Community Champion Attendance */}
            <div className="form-section">
              <h3 className="section-title">COMMUNITY CHAMPION ATTENDANCE</h3>
              <div className="form-group form-group-narrow">
                <label>Community Champion Attended <span className="required">*</span></label>
                <select 
                  name="communityChampion"
                  value={formData.communityChampion}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* OP Details */}
            <div className="form-section">
              <h3 className="section-title">OP DETAILS</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>No. of OPs for Transman <span className="required">*</span></label>
                  <input 
                    type="number" 
                    name="transmanOPs"
                    value={formData.transmanOPs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>No. of OPs for Transwoman <span className="required">*</span></label>
                  <input 
                    type="number" 
                    name="transwomanOPs"
                    value={formData.transwomanOPs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Total OPs <span className="required">*</span></label>
                  <input 
                    type="number" 
                    name="totalOPs"
                    value={formData.totalOPs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="form-section">
              <h3 className="section-title">REMARKS (OPTIONAL)</h3>
              <div className="form-group form-group-narrow-remarks">
                <textarea 
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter any remarks (max 500 characters)"
                  maxLength="500"
                  rows="5"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="btn-submit">Submit Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
