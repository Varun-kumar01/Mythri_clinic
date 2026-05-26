import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resetPasswordApi } from '../api/auth.api';
import PublicAuthLayout from '../components/PublicAuthLayout';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        await resetPasswordApi({ mobileNumber: form.mobile, newPassword: form.password, confirmPassword: form.confirmPassword });
        navigate('/login');
      } catch (err) {
        console.error('Reset failed', err);
        alert(err.message || 'Reset failed');
      }
    })();
  };

  return (
    <PublicAuthLayout
      title="Reset Password"
      subtitle="Use your registered mobile number"
      showBackdrop={false}
    >
      <div className="auth-back-wrapper">
        <Link to="/login" className="auth-back-link" aria-label="Back to login">← Back</Link>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input name="mobile" value={form.mobile} onChange={handleChange} className="form-control" placeholder="Registered Mobile Number" />
        </div>
        <div className="mb-3">
          <input name="password" value={form.password} onChange={handleChange} type="password" className="form-control" placeholder="New Password" />
        </div>
        <div className="mb-4">
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" className="form-control" placeholder="Confirm Password" />
        </div>

        <button className="auth-btn" type="submit">Reset Password</button>
      </form>
    </PublicAuthLayout>
  );
}

export default ResetPasswordPage;
