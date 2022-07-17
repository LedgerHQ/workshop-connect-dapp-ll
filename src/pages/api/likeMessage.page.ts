import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, ContractTransaction } from "ethers";
import { verifyMessage } from "ethers/lib/utils";
import contract from "../../utils/contract";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    message: string;
    signature: string;
    signer: string;
    id: string;
  };
}
type BurnAPIResponse =
  | { ok: true; error: null; data: ContractTransaction }
  | { ok: false; error: string; data: null };

// @dev: check if the signature is valid
//       If the signature is correct, the function returns nothing
//       If not, the request is rejected (status code 401 or 500)
const checkSignature: (
  { message, signature, signer }: ExtendedNextApiRequest["body"],
  res: NextApiResponse<BurnAPIResponse>
) => void = ({ message, signature, signer }, res) => {
  try {
    const address = verifyMessage(message, signature);

    // @dev: return 401 HTTP status code if the signer is not the owner of the token
    //       otherwise return nothing and continue the request processing
    if (address !== signer)
      return res.status(401).send({
        ok: false,
        error: "signer doesn't match the signer",
        data: null,
      });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, error: "failed to verify data", data: null });
  }
};

const route = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<BurnAPIResponse>
) => {
  try {
    if (req.method !== "POST") return res.status(404);

    // check if the value and the signature are provided. If not, return 422 HTTP status code
    if (
      !(
        req.body.message &&
        req.body.signature &&
        req.body.signer &&
        req.body.id
      )
    )
      return res.status(422);

    // check if the signature is correct. If not, the request is rejected.
    checkSignature(req.body, res);

    // like the message
    const tx = await contract.likeMessage(req.body.id, {
      maxFeePerGas: ethers.BigNumber.from(45000000000),
      maxPriorityFeePerGas: ethers.BigNumber.from(45000000000),
      gasLimit: 250000,
    });

    // if everything is okay, return the transaction struct from Alchemy
    res.status(200).json({ ok: true, error: null, data: tx });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: e.message, data: null });
  }
};

export default route;
