import React from 'react';

const InputBox = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="Escribe algo..."
        className="p-2 border-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default InputBox;
