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

const StyledPaper = styled(Paper)(({ theme, count }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(8),
  zIndex: 2,
  borderRadius: "unset",
  display: "flex",
  flexDirection: "column",
  border: `1px solid var(--dx-background-50)`,
  backgroundColor: "#F5F5F5",
  overflow: "hidden-auto",
  color: "black",
}));

const StyledSelect = styled(Paper)(({ theme, count }) => ({
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
  [`&.open`]: {
    height: theme.spacing(count * 5),
  },
  [`& > .${buttonBaseClasses.root}`]: {
    minWidth: theme.spacing(15),
    minHeight: theme.spacing(5),
    padding: theme.spacing(1, 2.25),
    color: "var(--dx-text-08)",
    borderRadius: 0,
    justifyContent: "space-between",
    [`& > .${typographyClasses.button}`]: {
      // color: "inherit",
      fontFamily: `"pretendard", sans-serif`,
      textAlign: "left",
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "171.429%" /* 171.429% */,
      letterSpacing: "0.16px",
      [`&.inactive`]: {
        color: "var(--dx-text-03)",
        // backgroundColor: "#E0E0E0",
      },
    },

    [`&:first-of-type`]: {
      color: "var(--dx-main)",
    },
  },
  [`& > .${dividerClasses.root}`]: {
    borderColor: "#32a852",
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
    let _isOpen = [...isOpen];
    _isOpen[idx] = !_isOpen[idx];
    setOpen(_isOpen);
  }

  function handleChange(e) {
    const { idx, value } = e.currentTarget.dataset;
    let _selected = [...selected];
    _selected[idx] = value;
    const storeFiltered = categories.map((e, i) => {
      if (i === Number(idx)) return [e.label, value];
      else return [e.label, filtered[e.label]];
    });
    setSettings({ filtered: storeFiltered });
    setSelected(_selected);
  }

  useEffect(() => {
    setOpen(isOpen.map((e) => false));
  }, [selected]);

  return (
    <StyledPaper className={clsx(isOpen && "open")} count={categories.length}>
      {categories.map(({ label, values }, i) => (
        <List className="filter-item">
          <ListItem>
            <Typography>{label}</Typography>
            <Divider orientation="vertical" />
            <StyledSelect>
              {selected && (
                <ButtonBase onClick={handleOpen} data-idx={i}>
                  <Typography variant="button">{selected[i]}</Typography>
                  {isOpen[i] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ButtonBase>
              )}
              {isOpen[i] &&
                ["all", ...values]
                  .filter((e) => e !== selected[i])
                  .map((v) => (
                    <ButtonBase
                      className={`filetered-item`}
                      data-idx={i}
                      data-value={v}
                      onClick={handleChange}
                    >
                      <Typography
                        // className={clsx(
                        //   !fields[fields.findIndex((e) => e.label === _label)]
                        //     .isExecuted && "inactive"
                        // )}
                        variant="button"
                      >
                        {v}
                      </Typography>
                    </ButtonBase>
                  ))}
            </StyledSelect>
          </ListItem>
        </List>
      ))}
    </StyledPaper>
  );
}
