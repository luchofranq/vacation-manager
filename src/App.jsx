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
    const { start, end, username } = vacation;
    const today = new Date();
  
    // Aseguramos que las fechas estén en formato Date
    const vacationStart = new Date(start);
    const vacationEnd = new Date(end);
  
    // Calcular la duración de las vacaciones (en días)
    const vacationDuration = Math.ceil((vacationEnd - vacationStart) / (1000 * 3600 * 24)) + 1; // Incluye el día de inicio
  
    // Verificar que la duración de las vacaciones no sea mayor a 28 días
    if (vacationDuration > 28) {
      alert('The vacation duration cannot exceed 28 days.');
      return;
    }
  
    // Filtrar las vacaciones ya solicitadas por el usuario en el mismo año
    const userVacationsThisYear = vacations.filter(vacation => {
      const vacationStart = new Date(vacation.start); // Aseguramos que sea un Date
      const vacationYear = vacationStart.getFullYear();
      const startDate = new Date(start); // Convertimos también la fecha de inicio a Date
      return vacation.username === username && vacationYear === startDate.getFullYear();
    });
  
    // Calcular el total de días que el usuario ya ha solicitado en el mismo año
    const totalDaysTaken = userVacationsThisYear.reduce((total, vacation) => {
      const startDate = new Date(vacation.start);
      const endDate = new Date(vacation.end);
      const duration = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
      return total + duration;
    }, 0);
  
    // Verificar si el total de días solicitados supera los 28 días
    if (totalDaysTaken + vacationDuration > 28) {
      alert('You cannot exceed 28 days of vacation per year.');
      return;
    }
  
    // Si la validación pasó, se agrega la nueva solicitud de vacaciones
    setVacations((prev) => {
      const updatedVacations = [...prev, { ...vacation, status: 'pending' }];
      localStorage.setItem('vacations', JSON.stringify(updatedVacations));
      return updatedVacations;
    });
  
    alert('Vacation request submitted successfully!');
  };
  

  const handleApproveVacation = (vacation) => {
    setVacations((prev) => {
      const updatedVacations = prev.map(v => 
        v.start === vacation.start && v.username === vacation.username 
          ? { ...v, status: 'approved' }
          : v
      );
      localStorage.setItem('vacations', JSON.stringify(updatedVacations));
      return updatedVacations;
    });
  };

  const handleRejectVacation = (vacation) => {
    setVacations((prev) => {
      const updatedVacations = prev.filter(v => v.start !== vacation.start || v.username !== vacation.username);
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
            <AdminPanel 
            vacations={vacations} 
            onClearVacations={clearVacations} 
            onApproveVacation={handleApproveVacation} 
            onRejectVacation={handleRejectVacation} 
          />
          
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
