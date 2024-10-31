import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usernames = ["LeonDeniP", "Ivan-Sitorus", "NARACODINGS", "Anugrahexcell"];
        const responses = await Promise.all(
          usernames.map(username => 
            axios.get(`https://api.github.com/users/${username}`)
          )
        );
        const users = responses.map(response => response.data);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#1E1E2A", height: "100vh", padding: "20px" }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        height: "80vh"
      }}>
        {users.map((user, index) => (
          <div key={index} style={{
            backgroundColor: "#2D2D3A",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "250px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
          }}>
            <img 
              src={user.avatar_url} 
              alt="Foto Profil" 
              style={{ 
                borderRadius: "50%", 
                marginBottom: "20px",
                width: "100px",
                height: "100px"
              }} 
            />
            <h2 style={{ color: "white" }}>Nama: {user.login}</h2>
            <p style={{ color: "white" }}>Pengikut: {user.followers}</p>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#3C4DFE", textDecoration: "none", fontWeight: "bold" }}
            >
              Profil GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
