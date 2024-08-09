import { createSelector } from "reselect";
import { IConversionStateData } from "./ConversionState";
import {
  CapTableProps,
} from "@/components/safe-conversion/Conversion/CapTableResults";
import { getPriceRoundPropsSelector } from "./PricedRoundSelector";

export type ResultSelectorState = IConversionStateData & {
  preMoneyChange?: number;
  investmentChange?: number;
};

// Simply output what is required for the cap table
export const getCapTablePropsSelector = createSelector(
  getPriceRoundPropsSelector,
  (
    pricedRoundData,
  ): CapTableProps => {
    return {
      totalPct: pricedRoundData.current.totalPct,
      totalInvestedToDate: pricedRoundData.current.totalInvestedToDate,
      totalShares: pricedRoundData.current.totalShares,
      capTable: pricedRoundData.capTable,
    };
  },
);
