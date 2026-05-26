import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/auth.api';
import PublicAuthLayout from '../components/PublicAuthLayout';

function RegistrationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    hospital: '',
    district: '',
    mandal: '',
    cdpo: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        await registerApi({
          mobileNumber: form.mobile,
          password: form.password,
          district: form.district,
          hospital: form.hospital,
          cdpo: form.cdpo
        });
        navigate('/login');
      } catch (err) {
        console.error('Registration failed', err);
        alert(err.message || 'Registration failed');
      }
    })();
  };

  return (
    <PublicAuthLayout
      title="CDPO Registration"
      subtitle="Fill in the details below to create your account"
      footerLink={<small>Already Registered? <Link to="/login">Click Here to login</Link></small>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input name="hospital" value={form.hospital} onChange={handleChange} className="form-control" placeholder="Hospital Name" />
        </div>
        <div className="mb-3">
          <input name="district" value={form.district} onChange={handleChange} className="form-control" placeholder="district" />
        </div>
        <div className="mb-3">
          <input name="mandal" value={form.mandal} onChange={handleChange} className="form-control" placeholder="mandal" />
        </div>
        <div className="mb-3">
          <input name="cdpo" value={form.cdpo} onChange={handleChange} className="form-control" placeholder="CDPO Name" />
        </div>
        <div className="mb-3">
          <input name="mobile" value={form.mobile} onChange={handleChange} className="form-control" placeholder="Mobile Number" />
        </div>
        <div className="mb-3">
          <input name="password" value={form.password} onChange={handleChange} type={form.showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" />
        </div>
        <div className="mb-2">
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type={form.showPassword ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" />
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="showPwd" name="showPassword" checked={form.showPassword} onChange={handleChange} />
          <label className="form-check-label" htmlFor="showPwd">Show Password</label>
        </div>

        <button className="auth-btn mb-3" type="submit">Register</button>
      </form>
    </PublicAuthLayout>
  );
}

export default RegistrationPage;
