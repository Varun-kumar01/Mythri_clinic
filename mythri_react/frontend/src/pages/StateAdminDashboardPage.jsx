import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

function StateAdminDashboardPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('Weekly');

  useEffect(() => {
    // Load reports from localStorage
    const storedReports = localStorage.getItem('submitted_reports');
    if (storedReports) {
      try {
        setReports(JSON.parse(storedReports));
      } catch (error) {
        console.error('Error loading reports:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const totalOfficers = reports.length;
  const totalReportsSubmitted = reports.length;
  const totalOPsConducted = reports.reduce((sum, report) => sum + (parseInt(report.totalOPs) || 0), 0);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>STATE ADMIN DASHBOARD - MYTHRI TRANS CLINICS</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </header>

      {/* Main Content */}
      <div className="admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Officers Reported</h3>
            <p className="stat-number">{totalOfficers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Reports Submitted</h3>
            <p className="stat-number">{totalReportsSubmitted}</p>
          </div>
          <div className="stat-card">
            <h3>Total OPs Conducted</h3>
            <p className="stat-number">{totalOPsConducted}</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <label htmlFor="filter-select">Filter by:</label>
          <select 
            id="filter-select"
            className="filter-select" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Reports Table */}
        <div className="reports-section">
          <h2>Detailed Reports ({filter})</h2>
          
          {reports.length === 0 ? (
            <div className="no-reports-message">
              <p>No reports found for this period.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="admin-reports-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>District</th>
                    <th>Hospital</th>
                    <th>CC Name</th>
                    <th>Date</th>
                    <th>Champion Attended</th>
                    <th>Document</th>
                    <th>Transman OP</th>
                    <th>Transwoman OP</th>
                    <th>Total OPs</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>WARANGAL</td>
                      <td>TEST</td>
                      <td>-</td>
                      <td>{report.dateOfReport || '-'}</td>
                      <td>{report.communityChampion || '-'}</td>
                      <td>-</td>
                      <td>{report.transmanOPs || '-'}</td>
                      <td>{report.transwomanOPs || '-'}</td>
                      <td>{report.totalOPs || '-'}</td>
                      <td className="remarks-cell">{report.remarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StateAdminDashboardPage;
