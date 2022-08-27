/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Hodl, HodlInterface } from "../Hodl";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lockedBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "releaseTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610315806100206000396000f3fe6080604052600436106100435760003560e01c806334265c48146100595780633ccfd60b146100985780639ae697bf146100ad578063b6b55f25146100da57600080fd5b366100545761005260006100e8565b005b600080fd5b34801561006557600080fd5b5061008661007436600461026f565b60016020526000908152604090205481565b60405190815260200160405180910390f35b3480156100a457600080fd5b50610052610197565b3480156100b957600080fd5b506100866100c836600461026f565b60006020819052908152604090205481565b6100526100e836600461029f565b3360009081526001602052604090205461010282426102b8565b10156101555760405162461bcd60e51b815260206004820181905260248201527f63616e6e6f74206d6f76652072656c656173652074696d65206561726c69657260448201526064015b60405180910390fd5b33600090815260208190526040812080543492906101749084906102b8565b90915550610184905081426102b8565b3360009081526001602052604090205550565b3360009081526001602052604090205442116102065760405162461bcd60e51b815260206004820152602860248201527f596f752063616e206f6e6c792077697468647261772061667465722072656c656044820152676173652074696d6560c01b606482015260840161014c565b33600081815260208190526040812080549082905590918280808085855af192508261026a5760405162461bcd60e51b815260206004820152601360248201527211551217d514905394d1915497d19052531151606a1b604482015260640161014c565b505050565b60006020828403121561028157600080fd5b81356001600160a01b038116811461029857600080fd5b9392505050565b6000602082840312156102b157600080fd5b5035919050565b808201808211156102d957634e487b7160e01b600052601160045260246000fd5b9291505056fea2646970667358221220e104d6d339128be44183391d1d6cefaa7ed3a7cbb9d979d933705add0fae505564736f6c63430008100033";

type HodlConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HodlConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Hodl__factory extends ContractFactory {
  constructor(...args: HodlConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Hodl> {
    return super.deploy(overrides || {}) as Promise<Hodl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Hodl {
    return super.attach(address) as Hodl;
  }
  override connect(signer: Signer): Hodl__factory {
    return super.connect(signer) as Hodl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HodlInterface {
    return new utils.Interface(_abi) as HodlInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Hodl {
    return new Contract(address, _abi, signerOrProvider) as Hodl;
  }
}
