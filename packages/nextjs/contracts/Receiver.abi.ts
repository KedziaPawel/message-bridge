export const abi = [
  {
    inputs: [
      { internalType: "contract ICrossDomainMessenger", name: "_messenger", type: "address" },
      { internalType: "address", name: "_sender", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "string", name: "message", type: "string" }],
    name: "MessageReceived",
    type: "event",
  },
  {
    inputs: [],
    name: "MESSENGER",
    outputs: [{ internalType: "contract ICrossDomainMessenger", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SENDER",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_message", type: "string" }],
    name: "receiveMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
