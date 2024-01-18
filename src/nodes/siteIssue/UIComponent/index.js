import {
  Button,
  Collapse,
  TextField,
  Typography,
  buttonBaseClasses,
  buttonClasses,
  styled,
  touchRippleClasses,
  typographyClasses,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import { Search } from "./search";
import { Filter } from "./search/select_filter";
import { useSettings } from "./store";
import { Menu } from "./menu";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  [`& > div.kakaomap_wrapper`]: {
    position: "relative",
    width: "100%",
    height: "80%",
  },
  [`& >.${buttonBaseClasses.root}`]: {
    position: "absolute",
    top: theme.spacing(2),
    zIndex: 1,
    minWidth: theme.spacing(5),
    minHeight: theme.spacing(5),
    width: theme.spacing(5),
  },
  [`& .filter`]: {
    right: theme.spacing(2),
  },
  [`& .menu`]: {
    left: theme.spacing(2),
  },
  [`& .MuiButton-startIcon`]: {
    margin: 0,
  },
  [`& .${typographyClasses.root}`]: {
    fontFamily: "Inter, NanumSquareNeo, Arial, sans-serif",
    fontWeight: 600,
    fontSize: "1.0rem",
  },
}));

export function UIWrapper({ kakaomap, ...props }) {
  const ref = useRef();
  const { handleSearch, info } = props;
  const [isInit, setInit] = useState(true);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [setSettings] = useSettings((state) => [state.setSettings]);

  useEffect(() => {
    if (isInit) {
      // const filtered = Object.fromEntries(
      //   info.categories.map((e) => [e.label, "-"])
      // );
      const filtered = info.categories.map((e) => {
        return [e.label, "-"];
      });
      setSettings({ filtered });
      setInit(false);
    }
  }, []);

  function handleClickFilter() {
    setOpenFilter(!isOpenFilter);
  }

  function handleClickMenu() {
    setOpenMenu(!isOpenMenu);
  }

  return (
    <StyledDiv ref={ref}>
      <div className="kakaomap_wrapper">{kakaomap}</div>
      <Button
        className="filter"
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleClickFilter}
      ></Button>
      {isOpenFilter && <Filter info={info} />}
      <Button
        className="menu"
        variant="outlined"
        startIcon={<MenuIcon />}
        onClick={handleClickMenu}
      ></Button>
      {isOpenMenu && <Menu />}
      <Search info={info} onSubmit={handleSearch} />
    </StyledDiv>
  );
}
