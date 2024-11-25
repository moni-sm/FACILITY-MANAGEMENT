import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error,setError]= useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const tocken = localStorage.getItem('token');

      if(!token){
        setError('No token found.Please login. ');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile',{
          headers:{
            Authorisation:`Bearer ${tocken}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  if(error){
    return <div>{error}</div>;
  }

  if(!user){
    return <div>Loading Profile...</div>
  }

  return (
    <div className="profile">
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
    </div>
  );
};

export default Profile;