import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
  return (
    <div className='landing-page-container'>
      <section className='landing-page-section'>
        <h2 className='landing-page-header'>Welcome to the trax app!</h2>
          <Link className='landing-page-link' to='/login'>Login</Link>
          <Link className='landing-page-link' to='/register'>Sign up</Link>
      </section>
    </div>
  );
}

export default LandingPage