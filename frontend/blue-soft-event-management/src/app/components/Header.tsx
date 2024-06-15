'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import styles from '../styles/Header.module.css';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          {user && <li><Link href="/events">Events</Link></li>}
        </ul>
        <ul>
          {!user && <li><Link href="/login">Login</Link></li>}
          {!user && <li><Link href="/register">Register</Link></li>}
        </ul>
        {user && (
          <ul className={styles['user-details']}>
            <li>{user.username}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
