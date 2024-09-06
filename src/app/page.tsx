import { redirect } from "next/navigation";

// for landing page if we get there
export default async function Home() {
  return redirect('/airdrops')
  return redirect('/create-campaign')
  return redirect('/events')
}