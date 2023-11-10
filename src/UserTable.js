import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data structure is { "users": [...] }
        if (data && data.users) {
          setUsers(data.users);
        } else {
          setError(new Error('Invalid data structure'));
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h2>User Records</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#007bff', color: 'white' }}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Name</th>
            <th style={tableCellStyle}>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{user.id}</td>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.email}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left',
};

export default UserTable;