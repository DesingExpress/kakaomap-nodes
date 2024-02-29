import {
  styled,
  Paper,
  Typography,
  List,
  ListItem,
  ButtonBase,
  listClasses,
  listItemClasses,
  buttonBaseClasses,
  typographyClasses,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useInfo, useSettings } from "../store";

const StyledFilterMenu = styled(Paper)(({ theme, count }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(8),
  zIndex: 2,
  minWidth: "391px",
  display: "flex",
  padding: theme.spacing(1),
  flexDirection: "column",
  alignSelf: "stretch",
  borderRadius: "4px",
  backgroundColor: "#94C2FF",
  boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",

  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 600,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },

  [`& >.${listClasses.root}`]: {
    padding: theme.spacing(2, 2.5, 2, 2.5),
    borderRadius: "8px",
    backgroundColor: "#FFF",
    [`& .${listItemClasses.root}`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      heigth: "74px",
      minWidth: "335px",
      borderRadius: "4px",
      [`& > .${buttonBaseClasses.root}`]: {
        color: "#0C2340",
        width: "100%",
        height: "40px",
        padding: theme.spacing(1.5),
        margin: theme.spacing(1.5, 0, 2, 0),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        border: "1px solid #CCC",
        borderRadius: "4px",
      },

      [`& .label-text`]: {
        color: "#0055F9",
        fontWeight: 600,
        lineHeight: "112.5%",
        fontFeatureSettings: "`clig off, `liga` off",
      },
      [`& .item-text`]: {
        fontWeight: 400,
        lineHeight: "112.5%",
        fontFeatureSettings: "`clig off, `liga` off",
      },
      [`& svg`]: {
        position: "absolute",
        right: "-0.5px",
      },
    },
  },
}));

const StyledItems = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "73px",
  zIndex: 2,
  width: "100%",
  display: "flex",
  padding: theme.spacing(1, 0, 1, 0),
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  border: "1px solid #CCC",
  borderTop: "2px solid #94C2FF",
  borderRadius: "4px",
  backgroundColor: "#FFF",
  boxShadow:
    "0px 5px 5px -3px rgba(0, 0, 0, 0.20), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  [`& > .${buttonBaseClasses.root}`]: {
    color: "#0C2340",
    width: "100%",
    height: "40px",
    padding: theme.spacing(0.75, 2, 0.75, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    [`&:hover`]: {
      backgroundColor: "#2196F30A",
    },
  },
}));

export function Filter({ ...props }) {
  const [categories] = useInfo((state) => [state.categories]);
  const [filtered, setStore] = useSettings((state) => [
    state.filtered,
    state.setSettings,
  ]);
  const [selected, setSelected] = useState(filtered.map((e) => e[1]));
  const [isOpen, setOpen] = useState(filtered.map((e) => false));

  useEffect(() => {
    setSelected(filtered.map((e) => e[1]));
    setOpen(filtered.map((e) => false));
  }, [filtered]);

  useEffect(() => {
    setOpen(isOpen.map((e) => false));
  }, [selected]);

  function handleOpen(e) {
    const { idx } = e.currentTarget.dataset;

    let _isOpen = isOpen.map((e, i) => {
      if (i === Number(idx)) {
        return !e;
      } else {
        return false;
      }
    });
    setOpen(_isOpen);
  }

  function handleChange(e) {
    const { idx, value } = e.currentTarget.dataset;
    let _selected = [...selected];
    _selected[idx] = value;

    const storeFiltered = filtered.map((e, i) => {
      if (i === Number(idx)) return [e[0], value];
      else return [e[0], filtered[i][1]];
    });
    setStore({ filtered: storeFiltered });
    setSelected(_selected);
  }

  return (
    <StyledFilterMenu
      className={clsx(isOpen && "open")}
      count={filtered.length}
    >
      <List>
        {categories.map(({ label, values }, i) => (
          <ListItem disablePadding disableGutters>
            <Typography className={"guide-text"}>{`${label}: `}</Typography>
            <ButtonBase onClick={handleOpen} data-idx={i}>
              <Typography className={"item-text"}>{selected[i]}</Typography>
              {isOpen[i] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ButtonBase>
            {isOpen[i] && (
              <StyledItems>
                {["-", ...values]
                  .filter((e) => e !== selected[i])
                  .map((v) => (
                    <Button
                      className={`children-item`}
                      data-idx={i}
                      data-value={v}
                      onClick={handleChange}
                    >
                      <Typography className="item-text" variant="button">
                        {v}
                      </Typography>
                    </Button>
                  ))}
              </StyledItems>
            )}
          </ListItem>
        ))}
      </List>
    </StyledFilterMenu>
  );
}
