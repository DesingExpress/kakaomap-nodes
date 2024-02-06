import {
  styled,
  Paper,
  Slider,
  Button,
  sliderClasses,
  Input,
  Box,
  Typography,
  typographyClasses,
  buttonClasses,
  buttonBaseClasses,
} from "@mui/material";
import { ReactComponent as LogoIcon } from "../icons/LogoIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import { useInfo, useSettings } from "../store";

const StyledSearch = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% - 102px)",
  zIndex: 0,
  display: "flex",
  height: "100px",
  width: "100%",
  padding: theme.spacing(0, 2, 0, 2),
  alignItems: "fixed-end",
  flexDirection: "row",
  flexShrink: 0,
  backgroundColor: "#FFF",
  borderRadius: "0px",
  [`& div.container`]: {
    display: "flex",
    padding: theme.spacing(1.75, 0, 1.75, 0),
    justifyContent: "center",
    alignItems: "center",
    // margin: theme.spacing(0, 2, 0, 2),
    flex: "1 0 0",
    [`& .info`]: {
      display: "flex",
      alignItems: "center",
      [`& .${typographyClasses.root}`]: {
        margin: theme.spacing(0, 0, 0, 2),
        color: "#0C2340",
        fontFamily: `"pretendard", sans-serif`,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "1.625rem",
        letterSpacing: "-0.2px",
        lineHeight: "123.077%",
      },
      marginRight: theme.spacing(2),
    },
    [`& > .${sliderClasses.root}`]: {
      display: "flex",
      height: "74px",
      padding: theme.spacing(0, 0, 0, 0),
      margin: theme.spacing(2.25, 0, 0, 0),
      flex: "1 0 0",
      [`& .MuiSlider-rail`]: {
        height: "4px",
        borderRadius: "100px",
        opacity: "0.38",
        background: "#8D9093",
      },
      [`& .MuiSlider-track`]: {
        height: "6px",
      },
      [`& .MuiSlider-thumb`]: {
        height: "20px",
        width: "20px",
        backgroundColor: "#FFF",
        border: "3.5px solid #0055F9",
        [`&:hover`]: {
          boxShadow: "inherit",
        },
        [`& .MuiSlider-valueLabel`]: {
          width: "97px",
          height: "36px",
          padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
          borderRadius: "4px",
          background: "unset",
          backgroundColor: "#0055f9",
          fontFamily: "Roboto",
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: "157%",
          letterSpacing: "0.1px",
        },
        [`&[data-index="0"]`]: {
          [`& .MuiSlider-valueLabel`]: {
            background: "unset",
            backgroundColor: "#2196F3",
          },
        },
      },

      [`& .MuiSlider-mark`]: {
        color: "#000",
        heigth: "2px",
        width: "2px",
        flexShrink: 0,
      },
      [`& .MuiSlider-markLabel`]: {
        color: "#8D9093",
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: "128.571%",
        letterSpacing: "-0.2px",
        transform: "translateX(-100%)",
        margin: theme.spacing(2.5, 0, 0, 0),
        [`&[data-index="0"]`]: {
          transform: "none",
        },
      },
    },
    [`& > .${buttonBaseClasses.root}`]: {
      marginLeft: theme.spacing(2),
      height: "39px",
      width: "73px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(0.75, 2.5, 0.75, 2.5),
      borderRadius: "3.84px",
      background: "#0055F9",
      boxShadow:
        "0px 2.88px 0.96px -1.92px rgba(0, 0, 0, 0.20), 0px 1.92px 1.92px 0px rgba(0, 0, 0, 0.14), 0px 0.96px 4.8px 0px rgba(0, 0, 0, 0.12)",
      [`& .${typographyClasses.root}`]: {
        color: "#FFF",
        fontFamily: `"pretendard", sans-serif`,
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "1.2rem",
        letterSpacing: "-0.192px",
        lineHeight: "140%",
        textTransform: "uppercase",
        fontFeatureSettings: "'clig' off, 'liga' off",
      },
    },
  },
}));
export function Search({ ...props }) {
  const { onSubmit } = props;
  // const { peer_id, start_date, end_date } = info;
  // const { peer_id } = info;
  // const end_date = info.start_date ?? new Date();
  // const start_date =
  //   info.start_date ??
  //   new Date(
  //     end_date.getFullYear() - 1,
  //     end_date.getMonth(),
  //     end_date.getDay()
  //   );
  // const [min, max] = [
  //   new Date(start_date).getTime(),
  //   new Date(end_date).getTime(),
  // ];

  const [peer_id, start_date, end_date] = useInfo((state) => [
    state.peer_id,
    state.start_date,
    state.end_date,
  ]);
  const [marks, min, max, initDate] = useMemo(() => {
    let numMarker = 7;
    let num = numMarker - 1;
    let _date = [new Date(start_date).getTime(), new Date(end_date).getTime()];
    let [m, M] = _date;

    let step = (M - m) / num;
    const _marks = [];
    for (let i = 0; i < numMarker; i++) {
      let time = m + step * i;
      let label = [0, numMarker - 1].includes(i) ? timeToDate(time) : "";
      _marks.push({ value: time, label });
    }
    return [_marks, m, M, _date];
  }, [start_date]);

  const [date, setDate] = useState(initDate);
  const [filtered] = useSettings((state) => [state.filtered]);
  const [condition, setCondition] = useState(1);

  function timeToDate(v) {
    let enus = new Date(v).toLocaleDateString("en-US");
    let [m, d, y] = enus.split("/");
    return `${y}.${m.length < 2 ? `0${m}` : m}.${d.length < 2 ? `0${d}` : d}`;
    // let enus = new Date(v);
    // // let [m, d, y] = enus.split("/");
    // return enus;
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
      if (k.toLowerCase().includes("date")) {
        _v = timeToDate(Number(v));
        _v = new Date(_v);
      }
      // data[k] = !isNaN(_v) ? Number(_v) : _v;
      data[k] = _v;
    }

    // TODO: delete (only test)
    const _condition = condition >= 1 ? 0 : condition + 1;
    setCondition(_condition);
    data.idx = _condition;
    data.peer_id = peer_id;

    onSubmit(data);
  }

  useEffect(() => {
    setDate(initDate);
  }, [start_date]);
  return (
    <StyledSearch component="form" onSubmit={handleSubmit}>
      <div className="container">
        <Box className="info">
          <LogoIcon />
          <Typography>현장이슈관리</Typography>
        </Box>
        <Slider
          sx={{ color: "#0055F9" }}
          className="slider"
          min={min}
          max={max}
          marks={marks}
          step={86400000}
          value={date}
          valueLabelFormat={timeToDate}
          // valueLabelDisplay="auto"
          valueLabelDisplay="on"
          onChange={handleSlider}
        />
        <Input sx={{ width: 0 }} name="start_date" value={date[0]} />
        <Input sx={{ width: 0 }} name="end_date" value={date[1]} />
        <Button className="search-button" type="submit">
          <Typography>검색</Typography>
        </Button>
      </div>
    </StyledSearch>
  );
}
