import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reports.css';

function ReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

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
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const handleDeleteReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
    localStorage.setItem('submitted_reports', JSON.stringify(updatedReports));
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className="nav-link" 
            onClick={() => navigate('/app/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className="nav-link active" 
            onClick={() => navigate('/app/reports')}
          >
            Reports
          </button>
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

        {/* Reports Container */}
        <div className="form-container">
          <div className="reports-wrapper">
            <h2 className="reports-title">SUBMITTED REPORTS</h2>
            
            {reports.length === 0 ? (
              <div className="no-reports">
                <p>No reports submitted yet.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date of Report</th>
                      <th>Community Champion Attended</th>
                      <th>Transman OPs</th>
                      <th>Transwoman OPs</th>
                      <th>Total OPs</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{report.dateOfReport || '-'}</td>
                        <td>{report.communityChampion || '-'}</td>
                        <td>{report.transmanOPs || '-'}</td>
                        <td>{report.transwomanOPs || '-'}</td>
                        <td>{report.totalOPs || '-'}</td>
                        <td className="remarks-cell">{report.remarks || '-'}</td>
                        <td>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteReport(index)}
                            title="Delete report"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
