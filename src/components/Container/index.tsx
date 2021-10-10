import { ContainerProps } from "./types";
import { useStyles } from "./style";

const Container: React.FC<ContainerProps> = ({ children, top, color }) => {
  const classes = useStyles({ top, color });
  return <div className={classes.root}>{children}</div>;
};

export default Container;
