import { formatNumberWithCommas } from "@/utils/numberFormatting";
import { BestFit } from "@/library/safe_conversion";
import QuestionMarkTooltipComponent from "@/components/tooltip/QuestionMarkTooltip";

export interface ShareholderRow {
  name: string;
  shares?: number;
  investment?: number;
  ownershipPct: number;
  ownershipChange: number;
  ownershipError?: string;
}

export interface PricedRoundPropsData {
  preMoney: number;
  postMoney: number;
  shareholders: ShareholderRow[];
  totalSeriesInvestment: number;
  totalShares: number;
  newSharesIssued: number;
  totalPct: number;
  totalInvestedToDate: number;
  pricedConversion: BestFit;
  preMoneyChange: number;
  investmentChange: number;
  totalRoundDilution: number;
}

export interface PricedRoundProps extends PricedRoundPropsData {
  updateInvestmentChange: (change: number) => void;
  updatePreMoneyChange: (change: number) => void;
}

const PricedRound: React.FC<PricedRoundProps> = (props) => {
  const {
    preMoney,
    pricedConversion,
    postMoney,
    totalSeriesInvestment,
    totalRoundDilution,
    preMoneyChange,
    investmentChange,
    updateInvestmentChange,
    updatePreMoneyChange,
  } = props;

  const increment = (name: "preMoney" | "investment") => {
    console.log(name);
    if (name === "preMoney") {
      const change = preMoneyChange + 500_000;
      updatePreMoneyChange(change);
    } else if (name === "investment") {
      const change = investmentChange + 500_000;
      updateInvestmentChange(change);
    }
  };

  const decrement = (name: "preMoney" | "investment") => {
    if (name === "preMoney") {
      const change = preMoneyChange - 500_000;
      if (preMoney - change > 0) {
        updatePreMoneyChange(change);
      }
    } else if (name === "investment") {
      const change = investmentChange - 500_000;
      if (totalSeriesInvestment - change > 0) {
        updateInvestmentChange(change);
      }
    }
  };

  return (
    <div className="pt-2">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <div className="absolute text-nt84bluedarker top-0 right-0 p-2 max-w-96">
            <QuestionMarkTooltipComponent>
              The number of outstanding shares after the round multiplied by the PPS.
            </QuestionMarkTooltipComponent>
          </div>
          <div className="absolute text-nt84bluedarker bottom-0 left-0 p-2 text-xl">
              <button
                className="px-2 mr-2 bg-blue-100 rounded-md"
                name="increment"
                onClick={() => decrement("preMoney")}
              >
                -
              </button>
          </div>
          <div className="text-sm text-gray-600 bottom-0 z-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {preMoneyChange !== 0
              ? ` (${preMoneyChange > 0 ? "+" : ""
              }$${formatNumberWithCommas(preMoneyChange)})`
              : ""}
          </div>
          <div className="absolute text-nt84bluedarker bottom-0 right-0 p-2 text-xl">
              <button
                className="px-2 ml-2 bg-blue-100 rounded-md"
                name="increment"
                onClick={() => increment("preMoney")}
              >
                +
              </button>
          </div>
          <dt className="text-sm font-semibold leading-6 text-gray-600">
            Post Money
          </dt>
          <dd className="order-first font-semibold tracking-tight text-gray-900">
            <span className="text-xl p-0 m-0">
              ${formatNumberWithCommas(postMoney)}
            </span>
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <dt className="text-sm font-semibold leading-6 text-gray-600">
            Pre Money
          </dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            <span className="text-xl p-0 m-0">
              ${formatNumberWithCommas(preMoney)}
            </span>
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <div className="absolute text-nt84bluedarker bottom-0 left-0 p-2 text-xl">
              <button
                className="px-2 mr-2 bg-blue-100 rounded-md"
                name="increment"
                onClick={() => decrement("investment")}
              >
                -
              </button>
          </div>
          <div className="text-sm text-gray-600 bottom-0 z-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {investmentChange !== 0
              ? ` (${investmentChange > 0 ? "+" : ""
              }$${formatNumberWithCommas(investmentChange)})`
              : ""}
          </div>
          <div className="absolute text-nt84bluedarker bottom-0 right-0 p-2 text-xl">
              <button
                className="px-2 ml-2 bg-blue-100 rounded-md"
                name="increment"
                onClick={() => increment("investment")}
              >
                +
              </button>
          </div>
          <dt className="text-sm font-semibold leading-6 text-gray-600">
            Investment
          </dt>
          <dd className="order-first font-semibold tracking-tight text-gray-900">
            <span className="text-xl p-0 m-0">
              ${formatNumberWithCommas(totalSeriesInvestment)}
            </span>
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <div className="absolute text-nt84bluedarker top-0 right-0 p-2">
            <QuestionMarkTooltipComponent>
              <div className="max-w-72">
                PPS: The Price Per Share (PPS) in a round is calculated by dividing the pre-money valuation by number of pre-money shares
              </div>
            </QuestionMarkTooltipComponent>
          </div>
          <dt className="text-sm font-semibold leading-6 text-gray-600">PPS</dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            ${pricedConversion.pps}
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg">
          <dt className="text-sm font-semibold leading-6 text-gray-600">
            Total Shares
          </dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            {formatNumberWithCommas(pricedConversion.totalShares)}
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <dt className="text-sm font-semibold leading-6 text-gray-600">New Shares Issued</dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            {formatNumberWithCommas(pricedConversion.newSharesIssued)}
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <div className="absolute text-nt84bluedarker top-0 right-0 p-2">
            <QuestionMarkTooltipComponent>
              <div className="max-w-72">
                Additional Options: these are the options created as part of the round to expand the option table. 
              </div>
            </QuestionMarkTooltipComponent>
          </div>
          <dt className="text-sm font-semibold leading-6 text-gray-600">
            Additional Options
          </dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            {formatNumberWithCommas(pricedConversion.additionalOptions)}
          </dd>
        </div>
        <div className="flex flex-col bg-gray-100 p-8 text-center rounded-lg relative">
          <div className="absolute text-nt84bluedarker top-0 right-0 p-2">
            <QuestionMarkTooltipComponent>
              <div className="max-w-72">
                Total Round Dilution: the percentage reduction in ownership for existing shareholders from a round, calculated as the number of new shares being issued from the transaction divided by the fully diluted shares after the transaction
              </div>
            </QuestionMarkTooltipComponent>
          </div>
          <dt className="text-sm font-semibold leading-6 text-gray-600">Total Round Dilution</dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-900">
            ${totalRoundDilution.toFixed(2)}%
          </dd>
        </div>
      </div>
    </div>
  );
};

export default PricedRound;
