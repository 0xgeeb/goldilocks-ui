import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PointsAprCalculatorProps {
  data: any;
  vault: string;
}

export const PointsAprCalculator: React.FC<PointsAprCalculatorProps> = ({ data, vault }) => {
  const [fdv, setFdv] = useState<string>("");
  const [totalPoints, setTotalPoints] = useState<string>("");
  const [airdropPercent, setAirdropPercent] = useState<string>("");
  const [pointsMultiplier, setPointsMultiplier] = useState<string>("");
  const [depositAssetPrice, setDepositAssetPrice] = useState<string>("");
  const [valuePerPoint, setValuePerPoint] = useState<number | null>(null);
  const [pointsApr, setPointsApr] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  
  useEffect(() => {
    if(!isDialogOpen) {
      setFdv("")
      setTotalPoints("")
      setAirdropPercent("")
      setPointsMultiplier("")
      setDepositAssetPrice("")
      setValuePerPoint(null)
      setPointsApr(null)
    }
  }, [isDialogOpen])

  const calculatePointsApr = () => {
    const fdvNum = parseFloat(fdv);
    const totalPointsNum = parseFloat(totalPoints);
    const airdropPercentNum = parseFloat(airdropPercent);
    const pointsMultiplierNum = parseFloat(pointsMultiplier);
    const depositAssetPriceNum = parseFloat(depositAssetPrice);

    if (
      !isNaN(fdvNum) &&
      !isNaN(totalPointsNum) &&
      !isNaN(airdropPercentNum) &&
      !isNaN(pointsMultiplierNum) &&
      !isNaN(depositAssetPriceNum)
    ) {
      // Calculate value per point
      const airdropValue = (airdropPercentNum / 100) * fdvNum;
      const valuePerPointCalc = airdropValue / totalPointsNum;
      setValuePerPoint(valuePerPointCalc);

      // Calculate points APR
      const dailyPointsValue = pointsMultiplierNum * valuePerPointCalc;
      const yearlyPointsValue = dailyPointsValue * 365;
      const pointsAprCalc = (yearlyPointsValue / depositAssetPriceNum) * 100;
      setPointsApr(pointsAprCalc);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if(event.key === 'Enter') {
      calculatePointsApr()
    }
  }

  window.addEventListener('keypress', handleKeyDown)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="theme" size="sm">
          Points APR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fdv" className="text-right">
              FDV ($)
            </Label>
            <Input
              type="number"
              value={fdv}
              onChange={(e) => setFdv(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter FDV"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalPoints" className="text-right">
              Total Points
            </Label>
            <Input
              type="number"
              value={totalPoints}
              onChange={(e) => setTotalPoints(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter total points"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="airdropPercent" className="text-right">
              Airdrop %
            </Label>
            <Input
              type="number"
              value={airdropPercent}
              onChange={(e) => setAirdropPercent(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter airdrop percentage"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pointsMultiplier" className="text-right">
              Points Multiplier
            </Label>
            <Input
              type="number"
              value={pointsMultiplier}
              onChange={(e) => setPointsMultiplier(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter points multiplier"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="depositAssetPrice" className="text-right">
              Deposit Asset Price ($)
            </Label>
            <Input
              type="number"
              value={depositAssetPrice}
              onChange={(e) => setDepositAssetPrice(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter deposit asset price"
            />
          </div>
          <Button variant={"calculate"} onClick={calculatePointsApr}>Calculate</Button>
          {valuePerPoint !== null && (
            <div className="text-center">
              <div className="text-xl font-bold font-inter text-HoneyYellow">
                Value per Point: ${valuePerPoint.toFixed(2)}
              </div>
            </div>
          )}
          {pointsApr !== null && (
            <div className="text-center">
              <div className="text-xl font-bold font-inter text-HoneyYellow">
                Points APR: {pointsApr.toFixed(2)}%
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
