import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import Comments from './pages/Comments';

// Highlight active link
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      style={{
        marginRight: '18px',
        textDecoration: 'none',
        color: isActive ? '#1976d2' : '#333',
        fontWeight: isActive ? 'bold' : 'normal',
        borderBottom: isActive ? '2px solid #1976d2' : 'none',
        paddingBottom: '2px',
        transition: 'color 0.2s'
      }}
    >
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
          padding: 0,
          margin: 0,
          fontFamily: 'Segoe UI, Arial, sans-serif'
        }}
      >
        <div
          style={{
            maxWidth: '540px',
            margin: '48px auto',
            background: '#fff',
            borderRadius: '14px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '32px 24px'
          }}
        >
          <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '24px', letterSpacing: '1px' }}>
            StudentCollabHub
          </h1>
          <nav style={{ textAlign: 'center', marginBottom: '24px' }}>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/create">Create Post</NavLink>
          </nav>
          <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/comments/:postId" element={<Comments />} />
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <h2 style={{ color: '#333' }}>Welcome to StudentCollabHub Home!</h2>
                <p style={{ color: '#666', fontSize: '1.1em' }}>
                  Connect, collaborate, and grow with your peers.
                </p>
              </div>
            } />
          </Routes>
        </div>
      </div>
        </Router>
      );
    }