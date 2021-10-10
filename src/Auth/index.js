import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routs from './Routs';

const Providers = () => {
  return (
    <AuthProvider>
      <Routs />
    </AuthProvider>
  );
}

export default Providers;