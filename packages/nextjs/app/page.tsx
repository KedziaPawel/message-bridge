"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MessageReceiver } from "~~/components/MessageReceiver";
import { MessageSender } from "~~/components/MessageSender";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { chainId, isDisconnected } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  const incorrectNetwork = chainId !== targetNetwork.id;

  return (
    <div className="flex items-center flex-col flex-grow pt-10 space-y-8">
      <h1 className="text-center">
        <span className="block text-2xl mb-2">Welcome to</span>
        <span className="block text-4xl font-bold">Message Bridge</span>
      </h1>
      {isDisconnected || incorrectNetwork ? (
        <div className="flex flex-col items-center">
          <p className="text-center">
            {isDisconnected ? "Connect your wallet to send messages between L1 and L2." : "Switch to correct network"}
          </p>
          <RainbowKitCustomConnectButton />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-8">
          <MessageSender />
          <MessageReceiver />
        </div>
      )}
    </div>
  );
};

export default Home;
