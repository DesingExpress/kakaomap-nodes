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
  Divider,
  dividerClasses,
  paperClasses,
  Chip,
  chipClasses,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSettings } from "../store";

const StyledFilterMenu = styled(Paper)(({ theme, count }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(8),
  zIndex: 1,
  minWidth: "391px",
  display: "flex",
  padding: theme.spacing(1),
  flexDirection: "column",
  alignSelf: "stretch",
  borderRadius: "4px",
  backgroundColor: "#94C2FF",
  boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  // transition: "height 300ms ease-in-out",
  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 600,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },
  // [`& .${chipClasses.root}`]: {
  //   background: "#0055F9",
  //   borderRadius: "100px",
  //   padding: theme.spacing(0.5, 1),
  //   [`& .MuiChip-label`]: {
  //     color: "#FFF",
  //     fontFamily: `"pretendard", sans-serif`,
  //     fontSize: "1.0rem",
  //     fontWeight: 600,
  //     lineHeight: "137.5%",
  //     letterSpacing: "-0.2px",
  //   },
  // },
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
        // alignSelf: "stretch",
      },
      // [`& .center`]: {
      //   alignItems: "center",
      // },
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
  const { info } = props;
  const { categories } = info;
  const [filtered, setSettings] = useSettings((state) => [
    state.filtered,
    state.setSettings,
  ]);
  const [selected, setSelected] = useState(filtered.map((e) => e[1]));
  const [isOpen, setOpen] = useState(categories.map((e) => false));

  function handleOpen(e) {
    const { idx } = e.currentTarget.dataset;
    // let _isOpen = [...isOpen];
    // _isOpen[idx] = !_isOpen[idx];
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
    const storeFiltered = categories.map((e, i) => {
      if (i === Number(idx)) return [e.label, value];
      else return [e.label, filtered[i][1]];
    });
    setSettings({ filtered: storeFiltered });
    setSelected(_selected);
  }

  useEffect(() => {
    setOpen(isOpen.map((e) => false));
  }, [selected]);

  return (
    <StyledFilterMenu
      className={clsx(isOpen && "open")}
      count={categories.length}
    >
      <List>
        {categories.map(({ label, values }, i) => (
          <ListItem disablePadding disableGutters>
            <Typography className={"guide-text"}>
              {/* 항목을 선택해 주세요 */}
              {`${label}: `}
            </Typography>
            {/* <Chip label={label} /> */}
            <ButtonBase onClick={handleOpen} data-idx={i}>
              <Typography
                // className={clsx(!isOpen[i] ? "item-text" : "label-text")}
                className={"item-text"}
              >
                {/* {!isOpen[i] ? selected[i] : label} */}
                {selected[i]}
              </Typography>
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
