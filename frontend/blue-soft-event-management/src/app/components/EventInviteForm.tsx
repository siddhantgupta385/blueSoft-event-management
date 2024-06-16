'use client'
import { useState, useEffect } from 'react';
import { fetchUsers, inviteToEvent } from '../utils/api';
import { useRouter } from 'next/navigation';

const EventInviteForm = ({ eventId }) => {
  const [users, setUsers] = useState([]);
  const [inviteeIds, setInviteeIds] = useState([]);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const getUsers = async () => {
    const response = await fetchUsers(token);
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, [token]);

  const handleInviteChange = (e:any) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setInviteeIds(value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await inviteToEvent(eventId, inviteeIds, token);
    router.push('/events');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Invite Users</label>
      <select multiple value={inviteeIds} onChange={handleInviteChange}>
        {users.map((user:any) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button type="submit">Invite</button>
    </form>
  );
};

export default EventInviteForm;
