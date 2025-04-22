"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetDailyEndPricesQuery } from "../../../src/graphql/generated/queries";
import { useBorrow } from "../../../providers";

export const LocksFetcher = () => {
  const [skip, setSkip] = useState<boolean>(false);

  // const { updateChartData } = useBorrow();

  const last7DaysTimestamps = (): { start: number; end: number }[] => {
    const timestamps = [];
    const now = new Date();
    let end = Math.floor(
      (new Date(now.setUTCHours(23, 59, 59, 999)).getTime() - 86400000) / 1000,
    );

    for (let i = 0; i < 7; i++) {
      const start = end - 86399;
      timestamps.push({ start, end });
      end = start - 1;
    }

    return timestamps.reverse();
  };

  const timestamps = useMemo(last7DaysTimestamps, []);

  const { data, loading } = useGetDailyEndPricesQuery({
    variables: {
      firstStart: timestamps[0].start,
      firstEnd: timestamps[0].end,
      secondStart: timestamps[1].start,
      secondEnd: timestamps[1].end,
      thirdStart: timestamps[2].start,
      thirdEnd: timestamps[2].end,
      fourthStart: timestamps[3].start,
      fourthEnd: timestamps[3].end,
      fifthStart: timestamps[4].start,
      fifthEnd: timestamps[4].end,
      sixthStart: timestamps[5].start,
      sixthEnd: timestamps[5].end,
      seventhStart: timestamps[6].start,
      seventhEnd: timestamps[6].end,
    },
    skip,
  });

  useEffect(() => {
    if (!loading && !!data) {
      // updateChartData(data);
      setSkip(true);
    }
  }, [data, loading]);

  return null;
};
