'use client'
import { useState, useEffect } from 'react';
import { createEvent, updateEvent, fetchEvent } from '../utils/api';
import { useRouter } from 'next/navigation';
import styles from '../styles/Event.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ eventId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [reminder, setReminder] = useState('');
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    if (eventId) {
      const getEvent = async () => {
        const response = await fetchEvent(eventId, token);
        setTitle(response.title);
        setDescription(response.description);
        let dateObject = new Date(response.date)
        setDate(dateObject.toISOString().slice(0, 10));
        setLocation(response.location);
        setReminder(response.reminder ? new Date(response.reminder) : null);
      };
      getEvent();
    }
  }, [eventId, token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!token) {
      alert('You need to be logged in to create or edit an event.');
      return;
    }

    const eventData = { title, description, date, location, reminder: reminder ? reminder.toISOString() : null };
    let response;

    if (eventId) {
      response = await updateEvent(eventId, eventData, token);
    } else {
      response = await createEvent(eventData, token);
    }

    if (response.id) {
      router.push('/events');
    } else {
      alert('Error saving event: ' + JSON.stringify(response));
    }
  };

  return (
    <div className={styles['event-container']}>
      <h1>{eventId ? 'Edit Event' : 'Create Event'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <label>Reminder</label>
        <DatePicker
          selected={reminder}
          onChange={(date) => setReminder(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Set a reminder (optional)"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EventForm;
