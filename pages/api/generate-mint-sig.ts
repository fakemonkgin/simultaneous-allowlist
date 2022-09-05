import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const GenerateMintSignature = async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = JSON.parse(req.body)

    const sdk = ThirdwebSDK.fromPrivateKey(
    "",
    "goerli"
    )

    const drop = sdk.getSignatureDrop("0x22fC4B8B825014267b03be1995Df41cf5Fb1B387")
 
    const teamMembers = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]
    const allowLists = ["0x28C8d6Ea640d454BBc72A400d3a678D96305b557"]

    const determinePrice = (address: string) => {
        if(teamMembers.includes(address)) {
            return 0;
        } 
        if(allowLists.includes(address)) {
            return 0.001;
        }
        return 0.01;
    };

    try {
        const signedPayload = await drop.signature.generate({
            to: address,
            price: determinePrice(address),
        })

        return res.status(200).json({
            signedPayload: signedPayload,
        })
    }

    catch(error) {
        console.log(error);
        
        return res.status(500).json({
            error,
        })
    }
};

export default GenerateMintSignature