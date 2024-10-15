import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Localizar el calendario
const localizer = momentLocalizer(moment);

const AdminPanel = ({ vacations, onClearVacations }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convertir las vacaciones a eventos
    const formattedEvents = vacations.map((vacation) => ({
      title: vacation.title,
      start: parseISO(vacation.start),
      end: parseISO(vacation.end),
    }));
    setEvents(formattedEvents);
  }, [vacations]);

  return (
    <div>
      <h2 className="font-bold mb-4">Admin Panel</h2>
      <button onClick={onClearVacations} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Clear All Vacations
      </button>
      <div className="mt-4">
        <h3 className="font-bold">All Vacations:</h3>
        {events.length === 0 ? (
          <p>No vacations recorded.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

AdminPanel.propTypes = {
  vacations: PropTypes.array.isRequired,
  onClearVacations: PropTypes.func.isRequired,
};

export default AdminPanel;
