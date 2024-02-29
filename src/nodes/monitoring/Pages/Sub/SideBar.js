import clsx from "clsx";
import {
  styled,
  Paper,
  buttonBaseClasses,
  ListItemButton,
  List,
  svgIconClasses,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const StyledSideBar = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "60px",
  height: "calc(100% - 100px)",
  zIndex: 3,
  backgroundColor: "#FFF",
  borderRadius: "0px",
  boxShadow: "3px 0px 2.5px -2px rgba(0, 0, 0, 0.20)",
  [`& .${buttonBaseClasses.root}`]: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1.5, 0, 1.5, 0),
    [`&:hover`]: {
      background: "#CCC",
    },
    [`& .${svgIconClasses.root}`]: {
      fill: "#70757a",
    },
    [`& .active-icon`]: {
      fill: "#1a73e8",
    },
  },
  //   [`& .svg.path`]: {
  //     fill: "red",
  //   },
}));
export function SideBar({ ...props }) {
  const { onClick, isActivePanels } = props;

  return (
    <StyledSideBar>
      <List>
        <ListItemButton id="menu" onClick={onClick}>
          <MenuIcon
            className={clsx(isActivePanels.menu ? "active-icon" : "menu-icon")}
          />
        </ListItemButton>
      </List>
    </StyledSideBar>
  );
}
