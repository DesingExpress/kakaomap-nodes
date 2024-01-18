import {
  styled,
  Paper,
  Slider,
  Button,
  Typography,
  sliderClasses,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  typographyClasses,
  dividerClasses,
  buttonBaseClasses,
  ButtonBase,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSettings } from "../store";

const StyledMenu = styled(Paper)(({ theme, count }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(8),
  zIndex: 2,
  borderRadius: "unset",
  display: "flex",
  flexDirection: "column",
  border: `1px solid var(--dx-background-50)`,
  backgroundColor: "#F5F5F0",
  transition: "height 300ms ease-in-out",
  height: theme.spacing(7 * count),
  overflow: "hidden-auto",
  color: "black",
  [`&.mobile`]: {
    left: theme.spacing(2),
    top: theme.spacing(3),
  },
  [`& > .${buttonBaseClasses.root}`]: {
    minWidth: theme.spacing(15),
    minHeight: theme.spacing(5),
    padding: theme.spacing(1, 2.25),
    color: "var(--dx-text-08)",
    borderRadius: 0,
    justifyContent: "space-between",
    [`& > .${typographyClasses.button}`]: {
      color: "inherit",
      fontFamily: `"pretendard", sans-serif`,
      textAlign: "left",
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "171.429%" /* 171.429% */,
      letterSpacing: "0.16px",
      //   [`&.inactive`]: {
      //     color: "var(--dx-text-03)",
      //     // backgroundColor: "#E0E0E0",
      //   },
    },

    [`&:first-of-type`]: {
      color: "var(--dx-main)",
    },
  },
  [`& > .${dividerClasses.root}`]: {
    borderColor: "#32a852",
  },
}));

export function Menu({ ...props }) {
  const { info } = props;
  const items = ["export"];

  function handleClick(e) {
    console.log(e.currentTarget.dataset);
  }
  //   useEffect(() => {
  //     setOpen(isOpen.map((e) => false));
  //   }, [selected]);

  return (
    <StyledMenu>
      <List>
        {items.map((e) => (
          <ListItem>
            <ButtonBase onClick={handleClick} data-value={e}>
              <Typography>{e}</Typography>
            </ButtonBase>
          </ListItem>
        ))}
      </List>
    </StyledMenu>
  );
}
