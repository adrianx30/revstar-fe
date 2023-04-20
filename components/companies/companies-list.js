import Link from 'next/link';

import classes from './companies-list.module.css';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../layout/SessionContext';
import CompanyItem from './company-item';

async function getCompanies() {
  try {
    const response = await fetch('http://localhost:3001/companies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error || 'Something went wrong!');
  }
}

function CompaniesList() {
  const { isAdmin } = useContext(SessionContext);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCompanies();
      console.log(result);
      if (result.length) {
        setCompanies(result);
      }
    };

    fetchData(); // Invoke the async function inside useEffect
  }, []);

  return (
    <div>
      <section className={classes.companies_title}>
        <h1>Companies list</h1>
        {/* <ProfileForm onChangePassword={changePasswordHandler} /> */}
      </section>
      {isAdmin && (
        <section className={classes.actions}>
          <button>
            <Link href='/companies/create'>Create Company</Link>
          </button>
        </section>
      )}
      {!companies.length && (
        <h2 className={classes.companies_list__fallback}>
          Found no companies.
        </h2>
      )}
      {companies.length && (
        <ul className={classes.companies_list}>
          {companies.map((company) => (
            <CompanyItem key={company.nit} company={company} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompaniesList;
