import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const drop = useSignatureDrop("0x22fC4B8B825014267b03be1995Df41cf5Fb1B387");

  const mint = async() => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({address}),
    })

    const signedPayload = await signedPayloadReq.json();

    try {
      const nft = await drop?.signature.mint(signedPayload.signedPayload);
      return nft;
    }

    catch(err) {
      console.error(err);
      return null;
    } 
  }

  return (
    <div>
      {address ? (
        <button onClick={mint}>Mint</button>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;