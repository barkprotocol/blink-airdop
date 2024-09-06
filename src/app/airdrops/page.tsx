"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { PlusIcon } from '@radix-ui/react-icons';

async function fetchAirdrops() {
  const supabase = createClient();
  const { data, error } = await supabase.from('airdrops').select();
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

async function createAirdrop() {
  const supabase = createClient();
  const { data, error } = await supabase.from('airdrops').insert({}).select('airdrop_id').single();
  if (error) {
    console.error(error);
    return {
      errors: 'Failed to create new airdrop',
    };
  }
  // Redirect needs to be handled in a useEffect hook for client-side navigation
  window.location.href = `/airdrops/${data.airdrop_id}`;
}

export default function Airdrops() {
  const [airdrops, setAirdrops] = useState<any[]>([]);

  useEffect(() => {
    const loadAirdrops = async () => {
      const fetchedAirdrops = await fetchAirdrops();
      setAirdrops(fetchedAirdrops);
    };

    loadAirdrops();
  }, []);

  return (
    <div className="space-y-4">
      <h1>Airdrops</h1>
      <div className="grid grid-cols-3 gap-4">
        {airdrops.map((airdrop, i) => (
          <a href={`/airdrops/${airdrop.airdrop_id}`} key={i}>
            <Card className="h-36 p-4 space-y-4">
              <p className="text-xl font-bold">{airdrop.name ?? `Airdrop ${i + 1}`}</p>
              <p>Add more details here later...</p>
            </Card>
          </a>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await createAirdrop();
          }}
        >
          <Button
            variant="secondary"
            className="h-36 text-2xl leading-none gap-4 w-full"
          >
            <PlusIcon className="size-10" />
            New Airdrop
          </Button>
        </form>
      </div>
    </div>
  );
}
