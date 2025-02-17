import { GeoProvider, WagmiProvider } from "@/providers";

type Props = {
  children: React.ReactNode;
};

function GeoCheckLayout({ children }: Props) {
  return (
    <GeoProvider>
      <WagmiProvider>{children}</WagmiProvider>
    </GeoProvider>
  );
}

export default GeoCheckLayout;
