import { useEffect, useState } from 'react';
import { fetchEvents } from '../utils/api';
import styles from '../styles/Event.module.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const getEvents = async () => {
      if (!token) {
        alert('You need to be logged in to view events.');
        return;
      }
      
      const response = await fetchEvents(token);
      if (response.detail) {
        alert('Error fetching events: ' + response.detail);
      } else {
        setEvents(response);
      }
    };

    getEvents();
  }, [token]);

  return (
    <div className={styles['event-container']}>
      <h1>Events</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event:any) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventList;
