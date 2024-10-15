// Calendar.jsx
import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Calendar = ({ onAddVacation, currentUser }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end) {
      alert('Please fill all fields.');
      return;
    }

    const vacation = {
      username: currentUser.username,
      title,
      start,
      end,
    };

    onAddVacation(vacation);
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h6" gutterBottom>
        Add Vacation
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Vacation Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Start Date"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Add Vacation
        </Button>
      </form>
    </div>
  );
};

Calendar.propTypes = {
  onAddVacation: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Calendar;
