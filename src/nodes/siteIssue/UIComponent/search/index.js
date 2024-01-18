import {
  styled,
  Paper,
  Slider,
  Button,
  Typography,
  sliderClasses,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRef, useState } from "react";
import { useSettings } from "../store";

const StyledSearch = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "calc(80%)",
  height: "20%",
  width: "100%",
  zIndex: 0,
  padding: theme.spacing(0, 1, 0, 5),
  borderRadius: "unset",
  display: "flex",
  flexDirection: "row",
  border: `1px solid var(--dx-background-50)`,
  backgroundColor: "#F5F5F5",
  overflow: "hidden",
  [`& > .${sliderClasses.root}`]: {
    position: "relative",
    top: "calc(35%)",
  },
  [`& > .settings`]: {
    position: "absolute",
    top: 0,
  },
}));
export function Search({ ...props }) {
  const { info, onSubmit } = props;
  const { start_date, end_date } = info;
  const [min, max] = [
    new Date(start_date).getTime(),
    new Date(end_date).getTime(),
  ];
  const [date, setDate] = useState([min, max]);
  const [filtered] = useSettings((state) => [state.filtered]);
  const [condition, setCondition] = useState(1);

  function timeToDate(v) {
    let enus = new Date(v).toLocaleDateString("en-US");
    let [m, d, y] = enus.split("/");
    return `${y}-${m}-${d}`;
  }

  function handleSlider(e, newValue) {
    setDate(newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const data = { categories: filtered };
    const iterData = new FormData(e.target).entries();
    for (let [k, v] of iterData) {
      let _v = v;
      if (k.toLowerCase().includes("date")) _v = timeToDate(Number(v));
      data[k] = !isNaN(_v) ? Number(_v) : _v;
    }

    // TODO: delete (only test)
    const _condition = condition >= 1 ? 0 : condition + 1;
    setCondition(_condition);
    data.idx = _condition;

    onSubmit(data);
  }
  return (
    <StyledSearch component="form" onSubmit={handleSubmit}>
      <Slider
        marks
        min={new Date(start_date).getTime()}
        max={new Date(end_date).getTime()}
        step={86400000 * 7}
        value={date}
        valueLabelFormat={timeToDate}
        valueLabelDisplay="auto"
        onChange={handleSlider}
      />
      <Input sx={{ width: 0 }} name="start_date" value={date[0]} />
      <Input sx={{ width: 0 }} name="end_date" value={date[1]} />
      <Button type="submit" startIcon={<SearchIcon />}></Button>
    </StyledSearch>
  );
}
