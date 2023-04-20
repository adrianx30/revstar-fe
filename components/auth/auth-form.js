import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';
import { SessionContext } from '../layout/SessionContext';

async function createUser(email, password) {
  try {
    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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

async function signIn(email, password) {
  try {
    const response = await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { session, updateSession } = useContext(SessionContext);


  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn(enteredEmail, enteredPassword);

      if (result) {
        // set some auth state
        updateSession({...result, active: true});
        router.replace('/');
      }
    } else {
      const result = await createUser(enteredEmail, enteredPassword);
      updateSession({...result, active: true});
      router.replace('/');
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
