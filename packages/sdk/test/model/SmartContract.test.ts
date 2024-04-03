import { createPublicClient, http } from 'viem';
import { ChainId } from '../../src';
import { createSdk } from '../test.utils';
import { testEnv } from '../testEnv';

describe('SmartContract', () => {
  it('can deploy, estimate and read smart contract', async () => {
    const sdk = createSdk();

    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const smartContract = await sdk.smartContract.createFromStandardJson({
      data: {
        title: 'test',
        chainId: wallet.chain.id,
        contractFile: 'Contract.sol',
        contractName: 'Counter',
        contractStandardJson: JSON.stringify(standardJson),
      },
      wallet,
    });

    const estimation = await smartContract.estimateDeploy();
    expect(estimation).toBeGreaterThan(100_000n);

    const deployment = await smartContract.deploy();
    console.log('deployment', deployment.address, deployment.hash);

    await smartContract.deployed();
    expect(smartContract.deployment).toBeDefined();

    const result = await smartContract.read('getCount');
    expect(result).toBe(0n);
  });

  it('can deploy, estimate and write smart contract', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const smartContract = await sdk.smartContract.createFromStandardJson({
      data: {
        title: 'test',
        chainId: wallet.chain.id,
        contractFile: 'Contract.sol',
        contractName: 'Counter',
        contractStandardJson: JSON.stringify(standardJson),
      },
      wallet,
    });

    const deployEstimation = await smartContract.estimateDeploy();
    expect(deployEstimation).toBeGreaterThan(100_000n);

    const deployment = await smartContract.deploy();
    console.log('deployment', deployment.address, deployment.hash);

    await smartContract.deployed();
    expect(smartContract.deployment).toBeDefined();

    const writeEstimation = await smartContract.estimate('increaseCount', {
      params: [10n],
    });
    expect(writeEstimation).toBeGreaterThan(100_000n);

    const writeResult = await smartContract.write('increaseCount', {
      params: [10n],
    });

    const client = createPublicClient({
      transport: http(wallet.rpcUrl),
      chain: wallet.chain,
    });
    await client.waitForTransactionReceipt({ hash: writeResult });

    const readResult = await smartContract.read('getCount');
    expect(readResult).toBe(10n);
  });
});

const standardJson = Object.freeze({
  language: 'Solidity',
  sources: {
    'Contract.sol': {
      content:
        '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Counter {\n    uint private count = 0;\n\n    // Function to increase the count by a certain number\n    function increaseCount(uint _number) public {\n        count += _number;\n    }\n\n    // Function to get the current count\n    function getCount() public view returns (uint) {\n        return count;\n    }\n}\n',
      keccak256:
        '0xedcc55d96b07421363d7c4a2b73c5cb1824b189eedce3615a27bd9f5180f5fc0',
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
