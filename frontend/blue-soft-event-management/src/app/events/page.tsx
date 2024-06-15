'use client'
import { useState } from 'react';
import { createEvent } from '../utils/api';
import { useRouter } from 'next/navigation';
import EventTable from '../components/EventTable';

const EventForm = ({ initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [date, setDate] = useState(initialData.date || '');
  const [location, setLocation] = useState(initialData.location || '');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to create an event.');
      return;
    }

    const eventData = {
      title,
      description,
      date,
      location,
    };

    const response = await createEvent(eventData, token);
    if (response.id) {
      // Event created successfully, redirect to the events page
      router.push('/events');
    } else {
      alert('Error creating event: ' + JSON.stringify(response));
    }
  };

  return (
    <>
    <div>
      <EventTable />
    </div>
    </>
  );
};

export default EventForm;
