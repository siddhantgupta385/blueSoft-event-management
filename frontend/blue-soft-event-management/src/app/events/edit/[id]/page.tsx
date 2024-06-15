'use client'

import { useParams, useRouter } from 'next/navigation';
import EventForm from '../../../components/EventForm';

const EditEventPage = () => {
  const { id } = useParams();

  return (
    <div>
      <EventForm eventId={id} />
    </div>
  );
};

export default EditEventPage;
