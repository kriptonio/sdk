import { ChainId, KriptonioSdk } from '@kriptonio/sdk';
import { Button, Frog } from 'frog';

const chainId = ChainId.PolygonMumbai;
const baseUrl = 'http://localhost:5173';
const smartContractId = process.env.SMART_CONTRACT_ID!;
const privateKey = process.env.PRIVATE_KEY!;
const accessToken = process.env.ACCESS_TOKEN!;

export const app = new Frog();
const sdk = new KriptonioSdk({ accessToken });

const wallet = await sdk.wallet.from({
  kernel: {
    privateKey,
  }
}, {
  chainId,
});

const smartContract = await sdk.smartContract.get({
  id: smartContractId,
  wallet,
});

if (!await smartContract.deployed()) {
  await smartContract.deploy({
    params: [wallet.address],
  });
}

app.frame('/', async (c) => {
  const { buttonValue, frameData } = c;
  const isMint = buttonValue === 'mint';
  let account: Account | null = null;
  let alreadyMinted = false;

  if (frameData) {
    account = await fetch(`https://fnames.farcaster.xyz/transfers?fid=${c.frameData.fid}`)
      .then((r) => r.json())
      .then((r) => r.transfers[0]);

    const tokenId = frameData.timestamp;
    const balance = await smartContract.read<bigint>('balanceOf', {
      params: [account?.owner]
    });
    alreadyMinted = balance > 0;

    if (account && isMint && !alreadyMinted) {
      console.log('minting nft...');

      smartContract.write('safeMint', {
        params: [account.owner, tokenId],
      })
        .then((tx) => console.log('minted', tx))
        .catch((e) => console.error('minting error', e.message));
    }
  }

  return c.res({
    image: (
      <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, #432889, #17101F)' }}>
        <span style={{ color: 'white', fontSize: '50px' }}>
          {alreadyMinted ? 'NFT Already Minted' : isMint ? `NFT Minted to ${account?.username} 🏆` : 'Click Mint to mint a free NFT 🖼'}
        </span>
      </div>
    ),
    intents: isMint || alreadyMinted ? [
      <Button.Redirect location={`${baseUrl}/show-article`}>Learn How To Create This</Button.Redirect>,
    ] : [
      <Button value="mint">Mint</Button>,
      <Button.Redirect location={`${baseUrl}/show-article`}>Learn How To Create This</Button.Redirect>,
    ],
  })
});

app.post('/show-article', (c) => {
  console.log('show article load');
  return c.redirect('https://docs.kriptonio.com');
});

type Account = {
  owner: string;
  username: string;
};