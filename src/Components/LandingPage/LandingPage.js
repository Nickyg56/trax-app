import React from 'react';
import { Link } from 'react-router-dom';


function LandingPage() {
  return (
    <section className='landing-container'>
      <h2>Landing Page</h2>
      <Link to='/login'>Login</Link>
      <Link to='registration'>Sign up</Link>
    </section>

  );
}

export default LandingPage