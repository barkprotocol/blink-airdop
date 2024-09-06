"use client";

import React from 'react';
import { useUser } from '@/context/user-context';

const UserProfile = () => {
  const { user, setUser } = useUser();

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <p>Welcome, {user}!</p>
      ) : (
        <p>No user logged in.</p>
      )}
      <button onClick={() => setUser('John Doe')}>Log In</button>
    </div>
  );
};

export default UserProfile;
