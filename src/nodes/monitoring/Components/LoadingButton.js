import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

function LoadingButton({
  onClick = () => {},
  onError = () => {},
  onSuccess = () => {},
  children,
  ...props
}) {
  const [isLoading, setLoading] = useState(false);

  function handleClick(e) {
    setLoading(true);
    Promise.resolve()
      .then(() => onClick(e))
      .then(onSuccess)
      .catch((e) => {
        console.error(e);
        onError(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Button onClick={handleClick} {...props}>
      {isLoading ? <CircularProgress /> : children}
    </Button>
  );
}

export default LoadingButton;
