"use client";

import { useState } from "react";
import { InputBase } from "./scaffold-eth";
import { useWriteContract } from "wagmi";
import { optimismSepolia, sepolia } from "wagmi/chains";
import { contracts } from "~~/contracts/contracts";

function useMessageSender() {
  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  const { Sender } = contracts[sepolia.id];
  const { Receiver } = contracts[optimismSepolia.id];

  const [message, setMessage] = useState("");

  function sendMessage() {
    const gasLimit = 10_000; // arbitrary gas limit that should be enough for this transaction

    writeContract({
      abi: Sender.abi,
      address: Sender.address,
      functionName: "send",
      args: [message, Receiver.address, gasLimit],
    });
  }

  const isSubmitDisabled = message.trim() === "" || isPending;

  return { message, setMessage, isSubmitDisabled, sendMessage, error: error?.message, isPending, isSuccess };
}

export function MessageSender() {
  const { message, setMessage, isSubmitDisabled, sendMessage, error, isSuccess, isPending } = useMessageSender();

  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="font-semibold text-lg">Send a message to L2</h2>
      <form className="flex flex-col space-y-4 w-96">
        <InputBase placeholder="Type your message" value={message} onChange={setMessage} />
        <button
          onClick={e => {
            e.preventDefault();
            sendMessage();
          }}
          disabled={isSubmitDisabled}
          className={`${
            isSubmitDisabled ? "bg-secondary" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded-full`}
          type="submit"
        >
          {isPending ? "Confirm in wallet" : "Send"}
        </button>
        <p className="text-green-500 flex flex-col items-center">{isSuccess && <span>Message sent!</span>}</p>
        {error && <p className="text-red-500 break-all">{error}</p>}
      </form>
    </div>
  );
}
