"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { PlusIcon } from '@radix-ui/react-icons';

async function fetchAirdrops() {
  const { data, error } = await supabase.from('airdrops').select();
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

async function createAirdrop() {
  const { data, error } = await supabase.from('airdrops').insert({}).select('airdrop_id').single();
  if (error) {
    console.error(error);
    return {
      errors: 'Failed to create new airdrop',
    };
  }
  return data;
}

export default function Airdrops() {
  const [airdrops, setAirdrops] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAirdrops = async () => {
      const fetchedAirdrops = await fetchAirdrops();
      setAirdrops(fetchedAirdrops);
    };

    loadAirdrops();
  }, []);

  const handleCreateAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    const result = await createAirdrop();
    if (result.errors) {
      setError(result.errors);
    } else {
      // Redirect using the router
      router.push(`/airdrops/${result.airdrop_id}`);
    }
    setCreating(false);
  };

  return (
    <div className="space-y-4">
      <h1>Your airdrops</h1>
      <div className="grid grid-cols-3 gap-4">
        {airdrops.map((airdrop, i) => (
          <a href={`/airdrops/${airdrop.airdrop_id}`} key={i}>
            <Card className="h-36 p-4 space-y-4">
              <p className="text-xl font-bold">{airdrop.name ?? `Airdrop ${i + 1}`}</p>
              <p>Add more details here later...</p>
            </Card>
          </a>
        ))}
        <form onSubmit={handleCreateAirdrop}>
          <Button
            variant="secondary"
            className="h-36 text-2xl leading-none gap-4 w-full"
            disabled={creating}
          >
            <PlusIcon className="size-10" />
            New Airdrop
          </Button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
