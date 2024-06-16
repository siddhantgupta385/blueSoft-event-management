'use client'
import { useState } from 'react';
import { createEvent } from '../utils/api';
import { useRouter } from 'next/navigation';
import EventTable from '../components/EventTable';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  invitees: string[];
}

interface EventsPageProps {
  initialData?: Event[];
}

const EventsPage: React.FC<EventsPageProps> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
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

export default EventsPage;
