import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch {
        alert("Failed to load profile");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>👤 Profile</h2>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Points:</strong> ⭐ {user.points}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;