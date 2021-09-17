import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface ContainerProps {
  top?: boolean;
  color?: string;
}

const useStyles = makeStyles<Theme, ContainerProps>((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "box-sizing": "border-box",
      padding: theme.spacing(2),
      paddingTop: ({ top }) => (top ? "100px" : theme.spacing(1)),
      backgroundColor: ({ color }) => (color ? color : undefined),
    },
  })
);

const Container: React.FC<ContainerProps> = ({ children, top, color }) => {
  const classes = useStyles({ top, color });
  return <div className={classes.root}>{children}</div>;
};

export default Container;
