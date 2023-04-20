import Link from 'next/link';

import classes from './create-company.module.css';
import { useRef } from 'react';
import { useRouter } from 'next/router';

async function createCompany(name, address, nit, telephone) {
  try {
    const response = await fetch('http://localhost:3001/companies', {
      method: 'POST',
      body: JSON.stringify({ name, address, nit, telephone }),
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

function CreateCompany() {
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const nitInputRef = useRef();
  const telInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredNit = nitInputRef.current.value;
    const enteredTel = telInputRef.current.value;

    const result = await createCompany(
      enteredName,
      enteredAddress,
      +enteredNit,
      +enteredTel
    );

    console.log(result);

    if (result.nit) {
      alert('company created with id: ' + result.nit);

      router.replace('/companies');
    }
  }

  return (
      <section className={classes.create_company}>
        <h1>Create Company</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='company_name'>Company Name</label>
            <input type='text' id='company_name' required ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='company_address'>Address</label>
            <input
              type='text'
              id='company_address'
              required
              ref={addressInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='company_nit'>NIT</label>
            <input type='number' id='company_nit' required ref={nitInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='company_tel'>Telephone</label>
            <input type='number' id='company_tel' required ref={telInputRef} />
          </div>
          <div className={classes.actions}>
            <button>Create</button>
            <button className={classes.actions_cancel} type='button'>
              <Link href='/companies'>Cancel</Link>
            </button>
          </div>
        </form>
      </section>
  );
}

export default CreateCompany;
