import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { NavigationBar } from "../components";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "box-sizing": "border-box",
      padding: theme.spacing(2),
      paddingTop: "100px",
    },
  })
);

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  const classes = useStyles();
  return (
    <>
      <NavigationBar />
      <div className={classes.root}>{children}</div>
    </>
  );
};

export default PrivateLayout;
