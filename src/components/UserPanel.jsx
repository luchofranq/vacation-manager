import { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css'; // Importa tus estilos personalizados

const UserPanel = ({ username, vacations, onAddVacation }) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start && end) {
      const vacationEnd = new Date(end);
      vacationEnd.setDate(vacationEnd.getDate() + 1);

      const combinedTitle = username; // El título será solo el nombre del usuario
      onAddVacation({ title: combinedTitle, start: start.toISOString(), end: vacationEnd.toISOString() });

      setStart(null);
      setEnd(null);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleStartDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      alert('Start date cannot be in the past.');
      setStart(null);
    } else {
      setStart(date);
      setEnd(null); // Resetea la fecha de fin al cambiar la fecha de inicio
    }
  };

  const handleEndDateChange = (date) => {
    if (start && date < start) {
      alert('End date must be after the start date.');
      setEnd(null);
    } else if (start) {
      const maxEndDate = new Date(start);
      maxEndDate.setDate(maxEndDate.getDate() + 28); // 28 días después de la fecha de inicio

      if (date > maxEndDate) {
        alert('End date cannot exceed 28 days from the start date.');
        setEnd(null);
      } else {
        setEnd(date);
      }
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-4">{username} Vacation Panel</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label className="block mb-1">Vacation Title *</label>
          <input
            type="text"
            value={username} // Fijo en el nombre del usuario
            readOnly // Campo solo lectura
            className="border px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Start Date *</label>
          <Calendar
            onChange={handleStartDateChange}
            value={start}
            minDate={new Date()} // No permitir fechas anteriores a hoy
          />
        </div>
        <div>
          <label className="block mb-1">End Date *</label>
          <Calendar
            onChange={handleEndDateChange}
            value={end}
            minDate={start ? new Date(start) : new Date()} // No permitir fechas anteriores a la fecha de inicio
            disabledDates={[new Date(start)]} // Deshabilitar la fecha de inicio en el selector de fecha de fin
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add Vacation
        </button>
      </form>
      <h3 className="font-bold">My Vacations:</h3>
      {vacations.length === 0 ? (
        <p>No vacations recorded.</p>
      ) : (
        vacations.map((vacation, index) => (
          <div key={index}>
            <p>
              {vacation.title} - {new Date(vacation.start).toDateString()} to {new Date(vacation.end).toDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

UserPanel.propTypes = {
  username: PropTypes.string.isRequired,
  vacations: PropTypes.array.isRequired,
  onAddVacation: PropTypes.func.isRequired,
};

export default UserPanel;
