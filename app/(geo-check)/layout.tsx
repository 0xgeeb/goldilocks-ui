import { WagmiProvider } from "@/providers";

type Props = {
  children: React.ReactNode;
};

function GeoCheckLayout({ children }: Props) {
  return <WagmiProvider>{children}</WagmiProvider>;
}

export default GeoCheckLayout;
