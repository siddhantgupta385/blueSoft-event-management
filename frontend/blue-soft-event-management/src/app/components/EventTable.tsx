import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchEvents, deleteEvent } from '../utils/api';
import { useRouter } from 'next/navigation';
import styles from '../styles/Event.module.css';
import { useTable, useSortBy, useFilters } from 'react-table';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Location', accessor: 'location' },
      { Header: 'Invitees', accessor: 'invitees' },
      { Header: 'Reminder', accessor: 'reminder' },
    ],
    []
  );

  const getEvents = async () => {
    if (!token) {
      alert('You need to be logged in to view events.');
      return;
    }

    const response = await fetchEvents(token);
    if (response.detail) {
      alert('Error fetching events: ' + response.detail);
    } else {
      const serializedEvents = response.map((event:any) => ({
        ...event,
        date: new Date(event.date).toISOString().slice(0, 10), // Serialize date to YYYY-MM-DD format
        reminder: event.reminder ? new Date(event.reminder).toISOString().slice(0, 16).replace('T', ' ') : '', // Serialize reminder to YYYY-MM-DD HH:mm format
        invitees: event.invitees.map((user:any) => user.username).join(', '), // Serialize invitees to comma-separated string
        
      
      }));
      setEvents(serializedEvents);
    }
  };

  useEffect(() => {
    getEvents();
  }, [token]);

  const handleDelete = async (eventId: any) => {
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      const response = await deleteEvent(eventId, token);
      if (response.detail) {
        alert('Error deleting event: ' + response.detail);
      } else {
        getEvents()
        // setEvents(events.filter(event => event.id !== eventId));
      }
    }
  };

  const data = useMemo(() => events, [events]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: data,
      initialState: {
        filters: [],
        sortBy: [],
      },
    },
    useFilters,
    useSortBy
  );

  const handleDateFilterChange = (e) => {
    const value = e.target.value || undefined;
    setDateFilter(value);
    setFilter('date', value);
  };

  const handleLocationFilterChange = (e) => {
    const value = e.target.value || undefined;
    setLocationFilter(value);
    setFilter('location', value);
  };

  return (
    <div className={styles['event-container']}>
    <div className={styles['event-header']}>
      <h1>Events</h1>
      <Link href="/events/create">
        <button className={styles['create-button']}>Create New Event</button>
      </Link>
    </div>
    <div className={styles['filter-container']}>
      <input
        type="date"
        value={dateFilter}
        onChange={handleDateFilterChange}
        placeholder="Filter by Date"
      />
      <input
        type="text"
        value={locationFilter}
        onChange={handleLocationFilterChange}
        placeholder="Filter by Location"
      />
    </div>
    {events.length > 0 ? (
      <table {...getTableProps()} className={styles['event-table']}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column:any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                <td>
                  <Link href={`/events/edit/${row.original.id}`}>
                    <button className={styles['edit-button']}>Edit</button>
                  </Link>
                  <button
                    className={styles['delete-button']}
                    onClick={() => handleDelete(row.original.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>No events available</p>
    )}
  </div>
  );
};

export default EventTable;
