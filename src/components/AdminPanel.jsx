import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Localizar el calendario
const localizer = momentLocalizer(moment);
const AdminPanel = ({ vacations, onClearVacations, onApproveVacation, onRejectVacation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convertir las vacaciones aprobadas a eventos para el calendario
    const formattedEvents = vacations
      .filter(vacation => vacation.status === 'approved')
      .map((vacation) => ({
        title: vacation.title,
        start: parseISO(vacation.start),
        end: parseISO(vacation.end),
      }));
    setEvents(formattedEvents);
  }, [vacations]);

  const handleApprove = (vacation) => {
    // Llamar a onApproveVacation con la vacación específica
    onApproveVacation(vacation); // Cambiar el estado a aprobado
  };

  const handleReject = (vacation) => {
    // Llamar a onRejectVacation con la vacación específica
    onRejectVacation(vacation); // Eliminar la vacación
  };

  return (
    <div>
      <h2 className="font-bold mb-4">Admin Panel</h2>
      <button onClick={onClearVacations} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Clear All Vacations
      </button>
      <div className="mt-4">
        <h3 className="font-bold">Pending Vacations:</h3>
        {vacations.filter(vacation => vacation.status === 'pending').map((vacation, index) => (
          <div key={index}>
            <p>
              {vacation.title} - {new Date(vacation.start).toDateString()} to {new Date(vacation.end).toDateString()}
            </p>
            <button onClick={() => handleApprove(vacation)}>Approve</button>
            <button onClick={() => handleReject(vacation)}>Reject</button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Calendar:</h3>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '50px' }}
          views={['month']}
          defaultView="month"
          popup
          eventPropGetter={() => ({
            style: { backgroundColor: '#2196F3', color: 'white' },
          })}
        />
      </div>
    </div>
  );
};

AdminPanel.propTypes = {
  vacations: PropTypes.array.isRequired,
  onClearVacations: PropTypes.func.isRequired,
  onApproveVacation: PropTypes.func.isRequired,
  onRejectVacation: PropTypes.func.isRequired,
};

export default AdminPanel;
