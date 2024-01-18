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
  Autocomplete,
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

export function Keywords({ ...props }) {
  const { info } = props;
  const { fields } = info;
  const [filtered, setSettings] = useSettings((state) => [
    state.filtered,
    state.setSettings,
  ]);
  const [selected, setSelected] = useState(Object.values(filtered));
  const [isOpen, setOpen] = useState(fields.map((e) => false));

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
    const storeFiltered = Object.fromEntries(
      fields.map((e, i) => {
        if (i === Number(idx)) return [e.key, value];
        else return [e.key, filtered[e.key]];
      })
    );
    setSettings({ filtered: storeFiltered });
    setSelected(_selected);
  }

  useEffect(() => {
    setOpen(isOpen.map((e) => false));
  }, [selected]);

  return (
    <StyledPaper className={clsx(isOpen && "open")} count={fields.length}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[13].title]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />
    </StyledPaper>
  );
}
