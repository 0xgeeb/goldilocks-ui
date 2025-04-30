import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface YtRoiCalculatorProps {
  currentApr: number;
}

export const YtRoiCalculator: React.FC<YtRoiCalculatorProps> = ({
  currentApr,
}) => {
  const [expectedApr, setExpectedApr] = useState<string>("");
  const [roi, setRoi] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  
  useEffect(() => {
    if(!isDialogOpen) {
      setExpectedApr("")
      setRoi(null)
    }
  }, [isDialogOpen])

  const calculateRoi = () => {
    const expectedAprNum = parseFloat(expectedApr);
    if (!isNaN(expectedAprNum) && currentApr > 0) {
      const roiValue = expectedAprNum / currentApr;
      setRoi(roiValue);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if(event.key === 'Enter') {
      calculateRoi()
    }
  }

  window.addEventListener('keypress', handleKeyDown)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="theme" size="sm">
          YT ROI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentApr" className="text-right">
              Current APR
            </Label>
            <div className="col-span-3 text-HoneyYellow">{currentApr.toFixed(2)}%</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expectedApr" className="text-right">
              Expected APR
            </Label>
            <Input
              type="number"
              value={expectedApr}
              onChange={(e) => setExpectedApr(e.target.value)}
              className="col-span-3 bg-input-base"
              placeholder="Enter expected APR"
            />
          </div>
          <Button variant={"calculate"} onClick={calculateRoi}>Calculate ROI</Button>
          {roi !== null && (
            <div className="text-center text-xl font-inter font-bold text-HoneyYellow">
              ROI: {roi.toFixed(2)}x
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
