import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Oval height={50} width={50} color="#4A90E2" visible={true} />
    </div>
  );
};

export default Loader;
