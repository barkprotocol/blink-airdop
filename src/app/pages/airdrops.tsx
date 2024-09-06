import React from 'react';
import UserProfile from '@/components/UserProfile';
import AirdropCard from '@/components/ui/airdrop-card';
import { airdropData } from '@/data/airdrop-data';

const participateInAirdrop = (id: number) => {
  // Logic for participating in an airdrop
  console.log(`Participated in airdrop with id: ${id}`);
};

const Airdrops: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Airdrops</h1>
      <UserProfile />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {airdropData.map((airdrop) => (
          <AirdropCard
            key={airdrop.id}
            name={airdrop.name}
            description={airdrop.description}
            image={airdrop.image}
            onParticipate={() => participateInAirdrop(airdrop.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Airdrops;
