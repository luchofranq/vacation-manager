import { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';

const App = () => {
  const [users, setUsers] = useState([]); // Almacena los usuarios registrados
  const [vacations, setVacations] = useState([]); // Almacena las vacaciones
  const [currentUser, setCurrentUser] = useState(null); // Almacena el usuario actual
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si es administrador
  const [isRegistering, setIsRegistering] = useState(true); // Estado para toggle entre Register y Login

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedVacations = JSON.parse(localStorage.getItem('vacations')) || [];
    
    setUsers(storedUsers);
    setVacations(storedVacations);
  }, []);

  const handleRegister = (user) => {
    setUsers((prev) => {
      const updatedUsers = [...prev, user];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    alert('User registered successfully!');
    setIsRegistering(false); // Cambia a Login después del registro
  };

  const handleLogin = ({ username, password }) => {
    const adminUsername = 'admin';
    const adminPassword = '1234';

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    // Verificar si el usuario es administrador
    if ((username === adminUsername && password === adminPassword) || user) {
      setCurrentUser(user || { username: adminUsername }); // Set current user to admin if valid
      setIsAdmin(username === adminUsername); // Verifica si el usuario es administrador
      alert('Login successful!');
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const clearVacations = () => {
    localStorage.removeItem('vacations');
    setVacations([]);
  };

  const toggleForm = () => {
    setIsRegistering((prev) => !prev); // Cambiar el estado de isRegistering
  };

  const handleAddVacation = (vacation) => {
    const { startDate, endDate } = vacation;

    // Convertir las fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Sumar un día a la fecha de inicio
    start.setDate(start.getDate() + 1);

    // Validaciones
    if (start < today) {
      alert('La fecha de inicio no puede ser anterior a la fecha actual.');
      return;
    }

    // Calcular duración
    const duration = (end - start) / (1000 * 60 * 60 * 24); // Diferencia en días
    if (duration > 28) {
      alert('La duración de las vacaciones no puede ser mayor a 28 días.');
      return;
    }

    // Incluir la fecha de inicio y fin en las vacaciones
    setVacations((prev) => {
      const updatedVacations = [...prev, { ...vacation, username: currentUser.username }];
      localStorage.setItem('vacations', JSON.stringify(updatedVacations));
      return updatedVacations;
    });
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Vacation Management System
      </Typography>

      {currentUser ? (
        <div>
          <Typography variant="h5" align="center">
            Welcome, {currentUser.username}!
          </Typography>
          {isAdmin ? (
            <AdminPanel vacations={vacations} onClearVacations={clearVacations} />
          ) : (
            <UserPanel 
  username={currentUser.username} // Pasa el nombre del usuario
  vacations={vacations.filter(v => v.username === currentUser.username)} 
  onAddVacation={handleAddVacation} 
/>
          )}
          <Button variant="contained" color="error" onClick={handleLogout} style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          {isRegistering ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={toggleForm} 
            style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default App;
