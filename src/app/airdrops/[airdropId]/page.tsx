import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function fetchAirdrop(airdropId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('airdrops')
    .select()
    .eq('airdrop_id', airdropId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export default function Airdrop({ params }: { params: { airdropId: string } }) {
  const { airdropId } = params;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [airdrop, setAirdrop] = useState<any | null>(null);

  useState(() => {
    async function loadAirdrop() {
      const data = await fetchAirdrop(airdropId);
      if (data) {
        setAirdrop(data);
      } else {
        router.push("/airdrops");
      }
    }

    loadAirdrop();
  }, [airdropId, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const isRedPacket = formData.get('is_red_packet') === 'on';
    const updatedAirdrop = {
      name: formData.get('name') as string,
      total: Number(formData.get('total')),
      is_red_packet: isRedPacket,
      amt: !isRedPacket ? Number(formData.get('amount')) : null,
      password: formData.get('password') as string,
      expire_at: formData.get('expiry') ? new Date(formData.get('expiry') as string) : null,
    };

    const supabase = createClient();
    const { error } = await supabase
      .from('airdrops')
      .update(updatedAirdrop)
      .eq('airdrop_id', airdropId);

    if (error) {
      console.error(error);
      setError('Failed to update airdrop details');
      return;
    }

    router.push(`/airdrops/${airdropId}`);
  }

  if (!airdrop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link href="/airdrops" className="text-blue-500 hover:underline">← Back to all airdrops</Link>
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-lg font-bold">Edit Airdrop</h1>
            <Button variant="outline" type="button">Share Blinks</Button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-muted-foreground">Airdrop Details</p>
            <div className="space-y-1">
              <Label htmlFor="name">Name*</Label>
              <Input id="name" name="name" required placeholder="APUBCC Event" defaultValue={airdrop.name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="total">Total*</Label>
              <Input id="total" name="total" type="number" required placeholder="5000 SOL" defaultValue={airdrop.total} />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="red-packet" name="is_red_packet" defaultChecked={airdrop.is_red_packet} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="red-packet" className="flex items-center gap-2 cursor-pointer">
                      Red Packet Mode?
                      <QuestionMarkCircledIcon />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add explanation here...</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className={`space-y-1 ${airdrop.is_red_packet ? 'hidden' : 'block'}`}>
              <Label htmlFor="amount">Amount*</Label>
              <Input id="amount" name="amount" type="number" placeholder="100 SOL" defaultValue={airdrop.amt || ''} />
            </div>
            <hr className="border-dotted border-muted-foreground" />
            <p className="text-muted-foreground">Extra options</p>
            <div className="space-y-1">
              <Label htmlFor="password">Secret phrase</Label>
              <Input id="password" name="password" placeholder="••••••••••••" defaultValue={airdrop.password || ''} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="expiry">Expires at</Label>
              <Input id="expiry" name="expiry" type="date" defaultValue={airdrop.expire_at?.toISOString().split('T')[0] || ''} />
              <p className="text-sm text-muted-foreground">
                Leave this empty to not expire the airdrop
              </p>
            </div>
            <Button className="self-start">Update</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
