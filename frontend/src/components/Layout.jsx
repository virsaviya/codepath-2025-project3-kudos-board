import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import { ModalProvider, ModalRenderer } from './Modal';
import './Layout.css';

const Layout = () => {
  return (
    <ModalProvider>
      <Header />
      <main>
        <ModalRenderer />
        <Outlet />
      </main>
      <Footer />
    </ModalProvider>
  );
};

export default Layout;
