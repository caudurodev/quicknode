import { useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { FunctionComponent } from "react";

export const ConnectMetamaskButton: FunctionComponent<{
  metamaskAddress?: string;
}> = ({ metamaskAddress }) => {
  const connectWithMetamask = useMetamask();
  const disconnectMetamask = useDisconnect();
  return (
    <div className="w-[600px]">
      {metamaskAddress ? (
        <button
          className="bg-orange-400 p-3 rounded-lg font-bold w-full"
          onClick={disconnectMetamask}
        >
          Connected as {metamaskAddress}
        </button>
      ) : (
        <button
          className="bg-blue-400 p-3 rounded-lg font-bold text-white border-blue-500 border-2 hover:bg-blue-600"
          onClick={connectWithMetamask}
        >
          Connect Metamask Wallet
        </button>
      )}
    </div>
  );
};
