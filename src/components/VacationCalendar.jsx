// VacationCalendar.jsx

import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const VacationCalendar = ({ vacations }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth(); // Mes actual (0 - 11)
  
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de días en el mes
  const vacationDays = new Set(vacations.flatMap(vacation => {
    const start = new Date(vacation.start);
    const end = new Date(vacation.end);
    const days = [];
    
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      days.push(d.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    }
    
    return days;
  }));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Vacation Calendar
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isVacation = vacationDays.has(date);

          return (
            <Box
              key={day}
              bgcolor={isVacation ? 'primary.main' : 'transparent'}
              color={isVacation ? 'white' : 'black'}
              border={isVacation ? '2px solid white' : '1px solid lightgrey'}
              borderRadius="4px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="50px"
            >
              {day}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

VacationCalendar.propTypes = {
  vacations: PropTypes.array.isRequired,
};

export default VacationCalendar;
