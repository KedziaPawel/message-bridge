import { useState } from "react";
import { getBlock } from "@wagmi/core";
import { Hex } from "viem";
import { useWatchContractEvent } from "wagmi";
import { useConfig } from "wagmi";
import { optimismSepolia } from "wagmi/chains";
import { contracts } from "~~/contracts/contracts";

function useMessageReceiver() {
  const [messages, setMessages] = useState<
    {
      message: string;
      blockTimestamp: bigint;
      transactionHash: Hex;
      blockNumber: bigint;
      key: string;
    }[]
  >([]);
  const config = useConfig();
  const { Receiver } = contracts[optimismSepolia.id];

  useWatchContractEvent({
    address: Receiver.address,
    abi: Receiver.abi,
    eventName: "MessageReceived",
    chainId: optimismSepolia.id,
    onLogs(logs) {
      Promise.all(
        logs.map(async log => {
          if (log !== undefined) {
            const message = log.args.message;
            if (message !== undefined) {
              const block = await getBlock(config, {
                blockHash: log.blockHash,
                chainId: optimismSepolia.id,
              });

              setMessages([
                {
                  message,
                  transactionHash: log.transactionHash,
                  blockNumber: log.blockNumber,
                  blockTimestamp: block.timestamp,
                  key: `${log.transactionHash}-${log.logIndex}`,
                },
                ...messages,
              ]);
            }
          }
        }),
      );
    },
  });

  return {
    messages,
  };
}

export function MessageReceiver() {
  const { messages } = useMessageReceiver();
  return (
    <div className="w-full flex items-center flex-col">
      <h2 className="font-semibold text-lg">Messages on L2 received from L1:</h2>

      <div className="space-y-4">
        {messages.length === 0 && <p>No messages received yet</p>}
        {messages.map(({ message, blockTimestamp, transactionHash, blockNumber, key }) => (
          <div key={key} className="bg-gray-100 p-4 rounded-lg">
            <p>{message}</p>
            <p>Block timestamp: {blockTimestamp.toString()}</p>
            <p>Block number: {blockNumber.toString()}</p>
            <a
              className="hover:text-blue-500 text-blue-400"
              href={`https://sepolia-optimism.etherscan.io/tx/${transactionHash}`}
              target="_blank"
            >
              View on block explorer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
