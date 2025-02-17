import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mf geoblocked",
  description: "Goldilocks Geoblocked",
};

export default function GeoBlocked() {
  return (
    <main className="h-screen w-screen">
      <h1 className="m-auto font-amaticbold text-[5vw] font-medium">
        ur region is blocked ser
      </h1>
    </main>
  );
}
