import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface PageContainerProps {
  top?: boolean;
  color?: string;
}

const useStyles = makeStyles<Theme, PageContainerProps>((theme: Theme) =>
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

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  top,
  color,
}) => {
  const classes = useStyles({ top, color });
  return <div className={classes.root}>{children}</div>;
};

export default PageContainer;
