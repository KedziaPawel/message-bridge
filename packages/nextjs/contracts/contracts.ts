import { abi as receiverAbi } from "./Receiver.abi";
import { abi as senderAbi } from "./Sender.abi";
import { optimismSepolia, sepolia } from "wagmi/chains";

export const contracts = {
  [sepolia.id]: {
    Sender: {
      address: "0x93de600d3a94121501be3e19b9693c1d796f20df",
      abi: senderAbi,
    },
  },
  [optimismSepolia.id]: {
    Receiver: {
      address: "0x93de600d3a94121501be3e19b9693c1d796f20df",
      abi: receiverAbi,
    },
  },
} as const;
