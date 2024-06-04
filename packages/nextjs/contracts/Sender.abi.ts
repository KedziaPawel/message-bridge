export const abi = [
  {
    inputs: [{ internalType: "contract ICrossDomainMessenger", name: "_messenger", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "MESSENGER",
    outputs: [{ internalType: "contract ICrossDomainMessenger", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_message", type: "string" },
      { internalType: "address", name: "_target", type: "address" },
      { internalType: "uint32", name: "_gasLimit", type: "uint32" },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
