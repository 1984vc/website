import { BestFit } from "@/library/safe_conversion";
import { formatNumberWithCommas } from "@/utils/numberFormatting";

export interface ShareholderRow {
  name: string;
  shares?: number;
  investment?: number;
  ownershipPct: number;
  ownershipChange: number;
  ownershipError?: string;
}

export interface CapTableResultProps {
  shareholders: ShareholderRow[];
  totalShares: number;
  totalPct: number;
  totalInvestedToDate: number;
  pricedConversion?: BestFit;
}

export const CapTableResults: React.FC<CapTableResultProps> = (props) => {
  const {
    pricedConversion,
    totalShares,
    totalPct,
    totalInvestedToDate,
    shareholders,
  } = props;

  const roundTo = (num: number, decimal: number): number => {
    return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
  };

  const hasChanges = shareholders.some(
    (shareholder) => shareholder.ownershipChange !== 0,
  );
  const ownershipError = shareholders.find(
    (shareholder) => shareholder.ownershipError !== undefined,
  )?.ownershipError;

  return (
    <div>
      <div className="border border-gray-300 shadow-sm overflow-hidden w-full mx-auto mt-2">
        <table className="w-full text-sm leading-5">
          <thead className="bg-gray-300 dark:bg-inherit font-bold">
            <tr>
              <th className="py-3 px-4 text-left">Shareholder / Investor</th>
              <th className="py-3 px-4 text-left">Investment</th>
              <th className="py-3 px-4 text-left">Shares</th>
              <th className="py-3 px-4 text-right">Ownership %</th>
              {hasChanges && <th className="py-3 px-4 text-right">Change %</th>}
            </tr>
          </thead>
          <tbody className="not-prose">
            {shareholders.map((shareholder, idx) => (
              <tr key={`shareholder-${idx}`}>
                <td className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">
                  {shareholder.name}
                </td>
                <td className="py-3 px-4 text-left">
                  {shareholder.investment
                    ? "$" + formatNumberWithCommas(shareholder.investment)
                    : ""}
                </td>
                <td className="py-3 px-4 text-left">
                  {shareholder.shares
                    ? formatNumberWithCommas(shareholder.shares)
                    : ""}
                </td>
                <td className="py-3 px-4 text-right">
                  {ownershipError
                    ? ownershipError
                    : shareholder.ownershipPct.toFixed(2) + "%"}
                </td>
                {hasChanges && (
                  <td
                    className={`py-3 px-4 text-right ${roundTo(shareholder.ownershipChange, 2) > 0 ? "text-green-500" : roundTo(shareholder.ownershipChange, 2) < 0 ? "text-red-500" : "text-black"}`}
                  >
                    {roundTo(shareholder.ownershipChange, 2).toFixed(2)}
                  </td>
                )}
              </tr>
            ))}
            {pricedConversion && totalShares && (
              <tr>
                <td className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">
                  Additional Options Refresh
                </td>
                <td className="py-3 px-4 text-left"></td>
                <td className="py-3 px-4 text-left">
                  {formatNumberWithCommas(pricedConversion.additionalOptions)}
                </td>
                <td className="py-3 px-4 text-right">
                  {(
                    100 *
                    (pricedConversion.additionalOptions / totalShares)
                  ).toFixed(2)}
                  %
                </td>
                {hasChanges && <td className="py-3 px-4 text-right"></td>}
              </tr>
            )}
            <tr className="font-bold bg-gray-200 dark:bg-inherit">
              <td className="py-3 px-4 text-left">Total</td>
              <td className="py-3 px-4 text-left">
                ${formatNumberWithCommas(totalInvestedToDate)}
              </td>
              <td className="py-3 px-4 text-left">
                {formatNumberWithCommas(totalShares)}
              </td>
              <td className="py-3 px-4 text-right">
                {ownershipError ? ownershipError : totalPct.toFixed(2) + "%"}
              </td>
              {hasChanges && <td className="py-3 px-4 text-right"></td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
