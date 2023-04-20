import { useContext } from 'react';
import classes from './starting-page.module.css';
import { SessionContext } from '../layout/SessionContext';
import Link from 'next/link';

function StartingPageContent() {
  const { session } = useContext(SessionContext);

  return (
    <section className={classes.starting}>
      <h1>Welcome to Adrian's test!</h1>
      {!session.active && <Link href='/auth'>Please Login First</Link>}
    </section>
  );
}

export default StartingPageContent;
