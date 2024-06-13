import { useEffect, useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/events/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);
  
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event:any) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
