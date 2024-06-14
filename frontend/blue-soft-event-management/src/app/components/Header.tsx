'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You can decode the token to get user info if you want
      // Here, I'm just simulating the presence of a logged-in user
      setUser({ username: 'siddhant2' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/events/create">Create Event</Link></li>
          {user && (
            <>
              <li>Welcome, {user.username}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
