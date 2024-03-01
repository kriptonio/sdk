import { createSdk } from '../test.utils';
import { testEnv } from '../testEnv';

describe('SmartContractService', () => {
  it('can create a smart contract from standard json', async () => {
    const sdk = createSdk();
    const smartContract = await sdk.smartContract.createFromStandardJson({
      data: {
        title: 'test',
        chainId: testEnv.kernel.chainId,
        contractFile: 'Contract.sol',
        contractName: 'ExampleContract',
        contractStandardJson: JSON.stringify(standardJson),
      },
    });

    expect(smartContract.title).toBe('test');
  });

  it('can get smart contract by id', async () => {
    const sdk = createSdk();
    const newSmartContract = await sdk.smartContract.createFromStandardJson({
      data: {
        title: 'test',
        chainId: testEnv.kernel.chainId,
        contractFile: 'Contract.sol',
        contractName: 'ExampleContract',
        contractStandardJson: JSON.stringify(standardJson),
      },
    });

    const smartContract = await sdk.smartContract.get({
      id: newSmartContract.id,
    });
    expect(smartContract.id).toBeDefined();
    expect(smartContract.id).toBe(newSmartContract.id);
  });
});

const standardJson = Object.freeze({
  language: 'Solidity',
  sources: {
    'Contract.sol': {
      content:
        '// SPDX-License-Identifier: MIT\ncontract ExampleContract {\n  function sayHello() public pure returns (string memory) {\n    return "Hello There!";\n  }\n}\n',
      keccak256:
        '0x107289125a963a2357b48fd26fe10bd45de87f46877efbd193f052fe2f84c87d',
    },
  },
  settings: {
    optimizer: { enabled: true, runs: 200 },
    evmVersion: 'paris',
    outputSelection: {
      '*': {
        '*': ['metadata', 'abi', 'evm.bytecode', 'evm.bytecode.sourceMap'],
      },
    },
  },
});
