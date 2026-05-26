import React from 'react';

function PublicAuthLayout({ title, subtitle, children, showBackdrop = true, footerLink }) {
  const pageStyle = showBackdrop ? {
    background: `linear-gradient(rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.58)), url('/background.png') center center / cover no-repeat fixed`
  } : {};

  return (
    <div className={`public-auth-page ${showBackdrop ? 'public-auth-page--backdrop' : ''}`} style={pageStyle}>
      {showBackdrop ? <div className="public-auth-backdrop" aria-hidden="true" /> : null}

      <div className="public-auth-card">
        <div className="public-auth-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}

        {footerLink ? <div className="public-auth-footer">{footerLink}</div> : null}
      </div>
    </div>
  );
}

export default PublicAuthLayout;