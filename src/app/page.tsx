import Diwali from "@/components/Diwali";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ friend: string }>;
}) {
  const friend = (await searchParams)?.friend;
  return <Diwali name={friend} />;
}
