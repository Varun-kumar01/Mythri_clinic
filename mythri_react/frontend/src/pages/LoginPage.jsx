import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PublicAuthLayout from '../components/PublicAuthLayout';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('auth_token', 'demo-token');
    navigate('/app/dashboard');
  };

  return (
    <PublicAuthLayout
      title="Login"
      subtitle="Sign in with your mobile number and password"
      footerLink={
        <div className="auth-footer-inline">
          <Link to="/forgot-password" className="auth-footer-forgot">Forgot Password?</Link>
          <Link to="/register" className="auth-footer-register">Click here for Register</Link>
        </div>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            id="email"
            type="text"
            className="form-control"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="Mobile Number"
          />
        </div>
        <div className="mb-3">
          <input
            id="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="auth-btn">Login</button>
        <Link to="/admin/login" className="auth-btn-admin">Admin Login</Link>
      </form>
    </PublicAuthLayout>
  );
}

export default LoginPage;
