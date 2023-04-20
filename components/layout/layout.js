import { Fragment, useState } from 'react';

import MainNavigation from './main-navigation';
import { SessionContext } from './SessionContext';


function Layout(props) {
  const [session, setSession] = useState({active: false});

  const updateSession = (userData) => {
    setSession(userData); // Update state variable
  };

  return (
    <Fragment>
      <SessionContext.Provider value={{ session, updateSession, isAdmin: session.admin }}>
        <MainNavigation />
        <main>{props.children}</main>
      </SessionContext.Provider>
    </Fragment>
  );
}

export default Layout;
