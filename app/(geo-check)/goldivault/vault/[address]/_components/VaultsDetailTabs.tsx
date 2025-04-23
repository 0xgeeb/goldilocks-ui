import { useGoldivault } from "@/providers";
import { TAB_LABELS } from "./VaultsDetail";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

function VaultsDetailTabs({ currentTab, vaultToken, setTab, }: { currentTab: string, vaultToken: string, setTab: React.Dispatch<React.SetStateAction<string>> }) {

  const { changeActiveToggle } = useGoldivault();
  const filteredLabels = 
    vaultToken === "oriBGT"
    ? Object.fromEntries(
        Object.entries(TAB_LABELS).filter(([key]) => key !== "LIQUIDITY")
      )
    : 
    vaultToken === "rsETH"
    ? Object.fromEntries(
        Object.entries(TAB_LABELS).filter(([key]) => key !== "YIELD" && key !== "LIQUIDITY")
      )
    :
    vaultToken === "uniBTC"
    ? Object.fromEntries(
        Object.entries(TAB_LABELS).filter(([key]) => key !== "YIELD" && key !== "LIQUIDITY")
      )
    :
    vaultToken === "rUSD"
    ? Object.fromEntries(
        Object.entries(TAB_LABELS).filter(([key]) => key !== "YIELD")
      )
    : TAB_LABELS

  return (
    <>
      {/* Mobile */}
      <div className="flex md:hidden flex-col gap-2 font-semibold">
      <Drawer>
        <DrawerTrigger>
          <button className="rounded-md border-2 px-3.5 py-2 text-xl cursor-pointer hover:scale-105 text-Teak border-[#FFFFFF0D] hover:text-white">Open Navigation</button>
        </DrawerTrigger>
        <DrawerContent className="bg-bera-brown border-bera-brown-border">
          <DrawerHeader className="flex flex-col gap-2 justify-center items-center">
            {/* <DrawerTitle className="text-3xl font-amatic text-warm-text mb-4">Choose Tab</DrawerTitle> */}
            {/* <DrawerDescription>Lorem Ipsum</DrawerDescription> */}
            {Object.entries(filteredLabels).map(([key, value]) => (
              <DrawerClose key={key}>
                <button
                  className={`rounded-md text-2xl px-3.5 py-2 cursor-pointer hover:scale-105 ${
                    currentTab === key
                    ? "bg-[#FFFFFF14] text-white"
                    : "text-Teak hover:text-white"}
                  `}
                  onClick={() => {
                    setTab(key);
                    changeActiveToggle(value.children[0].mode);
                  }}
                >
                  {value.label}
                </button>
              </DrawerClose>
            ))}
          </DrawerHeader>
          {/* <DrawerFooter>
            <DrawerClose>
              <button className="rounded-md border-2 px-3.5 py-2 cursor-pointer hover:scale-105">Cancel</button>
            </DrawerClose>
          </DrawerFooter> */}
          </DrawerContent>
      </Drawer>
      </div>
      {/* Desktop*/}
      <div className="hidden md:flex gap-2 font-semibold">
        {Object.entries(filteredLabels).map(([key, value]) => (
          <button
            key={key}
            className={
              `rounded-md border-2 px-3.5 py-2 cursor-pointer hover:scale-105 ${
                currentTab === key
                ? "bg-[#FFFFFF14] border-[#FFFFFF14] text-white"
                : "text-Teak border-[#FFFFFF0D] hover:text-white"}
              `}
            onClick={() => {
              setTab(key);
              changeActiveToggle(value.children[0].mode);
            }}
          >
            {value.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default VaultsDetailTabs;
