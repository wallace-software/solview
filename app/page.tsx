import { HomeClient } from "@/components/site/HomeClient";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start py-16 md:py-32 px-8 md:px-16 ">
        <HomeClient />
      </main>
    </div>
  );
}
