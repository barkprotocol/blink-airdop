import React from 'react';

const AirdropCard = ({
  name,
  description,
  image,
  onParticipate,
}: {
  name: string;
  description: string;
  image: string;
  onParticipate: () => void;
}) => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <button
        onClick={onParticipate}
        className="bg-black-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
      >
        Participate
      </button>
    </div>
  </div>
);

export default AirdropCard;
