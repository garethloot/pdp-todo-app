import { useHistory } from "react-router-dom";
import { useAppContext } from "../AppContextProvider";
import { Button } from "@material-ui/core";

import { LinkButtonProps } from "./types";

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  to,
  authOnly,
}: LinkButtonProps) => {
  const appContext = useAppContext();
  const history = useHistory();
  const loginClickHandler = () => {
    history.push(to);
  };
  let show = true;
  if (authOnly && appContext.isAuthenticated) {
    show = appContext.isAuthenticated;
  }
  return show ? (
    <Button color="inherit" onClick={loginClickHandler}>
      {text}
    </Button>
  ) : (
    <></>
  );
};

export default LinkButton;
