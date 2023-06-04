import { Outlet } from 'react-router-dom';

import Navbar from 'components/Navbar/Navbar';

import styles from 'components/Layout/Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.mainBody}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
