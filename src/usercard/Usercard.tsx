import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  profilePicture: string;
};

const UserCard = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // JSON fájl betöltése a public mappából
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const foundUser = users.find((u) =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) // Keresés név alapján (nem érzékeny a kis/nagy betűkre)
    );
    if (foundUser) {
      setUser(foundUser);
      setError(null); // Hibaüzenet törlése
    } else {
      setUser(null); // Felhasználó törlése
      setError("No user found with the given name."); // Hibaüzenet beállítása
    }
  };

  return (
    <div className="user-card">
      <div className="search-section">
        <label htmlFor="userName">Enter User Name:</label>
        <input
          id="userName"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter user name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-section">
        {error && <p className="error">{error}</p>}
        {user && (
          <div className="user-info">
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="profile-picture"
            />
            <div className="user-details">
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
