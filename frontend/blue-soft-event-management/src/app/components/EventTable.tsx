import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents, deleteEvent } from '../utils/api';
import { useRouter } from 'next/navigation';
import styles from '../styles/Event.module.css';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const router = useRouter();

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

  const handleDelete = async (eventId:any) => {
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      const response = await deleteEvent(eventId, token);
      if (response.detail) {
        alert('Error deleting event: ' + response.detail);
      } else {
        setEvents(events.filter(event => event.id !== eventId));
      }
    }
  };

  return (
    <div className={styles['event-container']}>
      <div className={styles['event-header']}>
        <h1>Events</h1>
        <Link href="/events/create">
          <button className={styles['create-button']}>Create New Event</button>
        </Link>
      </div>
      {events.length > 0 ? (
        <table className={styles['event-table']}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event:any) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>
                  <Link href={`/events/edit/${event.id}`}>
                    <button className={styles['edit-button']}>Edit</button>
                  </Link>
                  <button
                    className={styles['delete-button']}
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventTable;
