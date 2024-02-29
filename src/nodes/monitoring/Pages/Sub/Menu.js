import {
  Divider,
  List,
  ListItemButton,
  Paper,
  Typography,
  buttonBaseClasses,
  dividerClasses,
  listClasses,
  styled,
  svgIconClasses,
  typographyClasses,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useSettings } from "../store";

const StyledMenu = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: 0,
  left: "60px",
  width: "320px",
  height: "calc(100% - 100px)",
  padding: theme.spacing(5, 0.5, 5, 0.5),
  backgroundColor: "#FFF",
  boxShadow: "3px 0px 2.5px -2px rgba(0, 0, 0, 0.20)",
  zIndex: 2,
  [`& .${buttonBaseClasses.root}`]: {
    padding: theme.spacing(1, 2, 1, 0),
    borderRadius: "3px",
    [`& .${svgIconClasses.root}`]: {
      fill: "#0C2340",
      margin: theme.spacing(0, 2),
    },
    [`& .${typographyClasses.root}`]: {},
    [`&:hover`]: {
      // color: "#3c52b2",
      // background: "blue",
      backgroundColor: "#f5f5f5",
    },
  },

  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 400,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },
  [`& .${dividerClasses.root}`]: {
    margin: theme.spacing(0.0, 0),
    borderColor: "#CCC",
    width: "100%",
  },
  [`& > .${listClasses.root}`]: {},
}));

function MenuCollapse({ ...props }) {
  const { onClick, contents } = props;
  const [mode, setMode] = useSettings((state) => [
    state.mode,
    state.setSettings,
  ]);

  function handleClickLog(e) {
    onClick("LOG", contents);
  }
  function handleClickPhoto(e) {
    setMode({ mode: 1 });
  }

  return (
    <StyledMenu>
      <Divider />
      <List>
        <ListItemButton
          onClick={handleClickLog}
          data-value={"Log"}
          data-last="0"
        >
          <ListAltIcon />
          <Typography>{"Log"}</Typography>
        </ListItemButton>
        <ListItemButton
          onClick={handleClickPhoto}
          data-value={"Photo"}
          data-last="1"
        >
          <ImageOutlinedIcon />
          <Typography>{"Photo"}</Typography>
        </ListItemButton>
      </List>
      {/* <Divider /> */}
    </StyledMenu>
  );
}

export default MenuCollapse;
