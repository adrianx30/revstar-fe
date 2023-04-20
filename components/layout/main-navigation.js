import Link from 'next/link';

import classes from './main-navigation.module.css';
import { useContext, useState } from 'react';
import { SessionContext } from './SessionContext';

function MainNavigation() {
  const { session, updateSession } = useContext(SessionContext);
  const [loading, setLoading] = useState();

  function logoutHandler() {
    // logout;
    updateSession({active: false});
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        {/* <a> */}
        <div className={classes.logo}>RevStar Test</div>
        {/* </a> */}
      </Link>
      <nav>
        <ul>
          {!session.active && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session.active && (
            <li>
              <Link href='/companies'>Companies</Link>
            </li>
          )}
          {session.active && (
            <li>
              <button onClick={logoutHandler}>
                <Link href='/'>Logout</Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
