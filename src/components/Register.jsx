
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};



Register.propTypes = {
    
  onRegister: PropTypes.func.isRequired,
};

export default Register;
