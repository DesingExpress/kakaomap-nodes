import {
  styled,
  Paper,
  Typography,
  List,
  ListItem,
  typographyClasses,
  buttonBaseClasses,
  ButtonBase,
  listClasses,
  listItemClasses,
} from "@mui/material";

const StyledMenu = styled(Paper)(({ theme, count }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(8),
  zIndex: 1,
  minWidth: "160px",
  display: "flex",
  padding: theme.spacing(1),
  flexDirection: "column",
  alignSelf: "stretch",
  borderRadius: "4px",
  backgroundColor: "#94C2FF",
  boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  // transition: "height 300ms ease-in-out",
  [`& > .${listClasses.root}`]: {
    padding: theme.spacing(2),
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    [`& .${listItemClasses.root}`]: {
      heigth: "30px",
      padding: theme.spacing(0.75, 1.25),
      margin: theme.spacing(0, 0, 1.5, 0),
      background: "#2196F3",
      borderRadius: "4px",
      justifyContent: "space-between",
      boxShadow:
        "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
      [`&[data-last="1"]`]: {
        margin: theme.spacing(1.5, 0, 0, 0),
      },
      [`& .${buttonBaseClasses.root}`]: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        [`& > .${typographyClasses.root}`]: {
          color: "#FFF",
          fontFamily: `"pretendard", sans-serif`,
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: "128.571%",
          letterSpacing: "-0.2px",
          fontFeatureSettings: "'clig' off, 'liga' off",
          textTransform: "uppercase",
        },
      },
    },
  },
}));

export function Menu({ ...props }) {
  const { info } = props;
  const items = ["export", "button", "button"];

  function handleClick(e) {
    console.log(e.currentTarget.dataset);
  }
  //   useEffect(() => {
  //     setOpen(isOpen.map((e) => false));
  //   }, [selected]);

  return (
    <StyledMenu>
      <List>
        {items.map((e, i) => (
          <ListItem data-last={i === items.length - 1 ? "1" : "0"}>
            <ButtonBase onClick={handleClick} data-value={e}>
              <Typography>{e}</Typography>
            </ButtonBase>
          </ListItem>
        ))}
      </List>
    </StyledMenu>
  );
}
