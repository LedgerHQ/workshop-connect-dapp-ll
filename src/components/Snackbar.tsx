import MuiSnackbar from "@mui/material/Snackbar";
import MuiSnackbarContent from "@mui/material/SnackbarContent";
import { Link } from "@ledgerhq/react-ui";
import useEtherscanURL from "../utils/useEtherscanURL";

const Snackbar = ({ onClose, txHash }) => {
  const etherscanURL = useEtherscanURL();

  const handleClose = (_, reason: string) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <MuiSnackbar
      open={!!txHash}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <MuiSnackbarContent
        style={{
          backgroundColor: "#b2dfdb",
        }}
        message={
          <span id="client-snackbar">
            <Link
              href={`${etherscanURL}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              color="white"
            >
              {`Transaction broadcasted! See it on Etherscan.`}
            </Link>
          </span>
        }
      />
    </MuiSnackbar>
  );
};

export default Snackbar;
