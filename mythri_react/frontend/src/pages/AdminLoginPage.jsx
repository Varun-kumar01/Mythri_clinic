import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicAuthLayout from '../components/PublicAuthLayout';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('admin_token', 'demo-admin-token');
    navigate('/admin/dashboard');
  };

  return (
    <PublicAuthLayout
      title="State Admin Login"
      subtitle="Sign in with your admin credentials"
      footerLink={<Link to="/login">← Back to Officer Login</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            id="username"
            type="text"
            className="form-control"
            value={form.username}
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <input
            id="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="auth-btn">Login</button>
      </form>
    </PublicAuthLayout>
  );
}

export default AdminLoginPage;
