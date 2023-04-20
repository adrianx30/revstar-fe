import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import AuthForm from '../../components/auth/auth-form';
import { SessionContext } from '../../components/layout/SessionContext';

function AuthPage() {
  const { session } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session.active) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [router, session]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
