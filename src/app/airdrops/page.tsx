"use cli"

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { PlusIcon } from '@radix-ui/react-icons'

async function fetchAirdrops() {
  const supabase = createClient()
  const { data, error } = await supabase.from('airdrops').select()
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export default async function Airdrops() {
  const airdrops = await fetchAirdrops()
  console.log(airdrops)

  async function createAirdrop(_formData: FormData) {
    'use server'
    const supabase = createClient()
    const { data, error } = await supabase.from('airdrops').insert({}).select('airdrop_id').single()
    if (error) {
      console.log(error)
      return {
        errors: 'Failed to create new airdrop'
      }
    }

    redirect(`/airdrops/${data.airdrop_id}`)
  }

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
        <form action={createAirdrop}>
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
