import clsx from "clsx";
import {
  Button,
  buttonBaseClasses,
  styled,
  typographyClasses,
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Search } from "./search";
import { Filter } from "./filter/index.js";
import {
  onClickMap,
  onClickMarker,
  onLoadSiteInfo,
  useInfo,
  useSettings,
} from "./store";
import { Menu } from "./menu";
import { Issue } from "./issue/index.js";
import { ReactComponent as MenuIcon } from "./icons/MenuIcon.svg";
import { ReactComponent as FilterIcon } from "./icons/FilterIcon.svg";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  [`& > div.kakaomap_wrapper`]: {
    position: "relative",
    width: "100%",
    height: "calc(100% - 102px)",
  },
  [`& >.${buttonBaseClasses.root}`]: {
    top: theme.spacing(2),
    position: "absolute",
    zIndex: 1,
    padding: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
    minWidth: theme.spacing(4),
    minHeight: theme.spacing(4),
    background: "#0C2340",
    borderRadius: "4px",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`$:hover`]: {
      background: "#0C2340",
    },
    [`& >.MuiButton-startIcon`]: {
      display: "flex",
      padding: theme.spacing(0.75, 0.5, 0.75, 0.5),
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
    },
  },
  [`& >.active`]: {
    background: "#0055f9",
  },
  [`& .${typographyClasses.root}`]: {
    fontFamily: "Inter, NanumSquareNeo, Arial, sans-serif",
    fontWeight: 600,
    fontSize: "1.0rem",
  },
}));

export function UIWrapper({ kakaomap, force, ...props }) {
  const { info, onSearch } = props;
  const [isInit, setInit] = useState(true);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenIssue, setOpenIssue] = useState(false);
  const [issue, setIssue] = useState(undefined);
  const [setSettings] = useSettings((state) => [state.setSettings]);
  const [categories, setSiteInfo] = useInfo((state) => [
    state.categories,
    state.setSiteInfo,
  ]);

  function handleClickFilter() {
    setOpenFilter(!isOpenFilter);
    setOpenMenu(false);
    setOpenIssue(false);
  }

  function handleClickMenu() {
    setOpenMenu(!isOpenMenu);
    setOpenFilter(false);
    setOpenIssue(false);
  }

  function handleClickMap() {
    setOpenFilter(false);
    setOpenMenu(false);
    setOpenIssue(false);
  }

  function handleClickMarker(v) {
    setIssue(v.userData);
    setOpenIssue(true);
    setOpenFilter(false);
    setOpenMenu(false);
  }

  function handleLoadInfo(v) {
    setSiteInfo({ ...v });
  }

  useEffect(() => {
    // if (isInit) {
    //   const filtered = (info.categories ?? []).map((e) => {
    //     return [e.label, "-"];
    //   });
    //   setSettings({ filtered });
    //   setInit(false);
    // }
    // }, [isInit]);

    const filtered = categories.map((e) => {
      return [e.label, "-"];
    });
    setSettings({ filtered });
  }, [categories]);

  useLayoutEffect(() => {
    onClickMap.current = handleClickMap;
    onClickMarker.current = handleClickMarker;
    onLoadSiteInfo.current = handleLoadInfo;
    return () => {
      onClickMap.current = undefined;
      onClickMarker.current = undefined;
      onLoadSiteInfo.current = undefined;
    };
  }, []);

  return (
    <StyledDiv>
      <div className="kakaomap_wrapper">{kakaomap}</div>
      <Button
        className={clsx(isOpenFilter ? "active" : "filter-button")}
        sx={{ right: "16px" }}
        onClick={handleClickFilter}
      >
        <FilterIcon className="filter-icon" />
      </Button>
      {/* {isOpenFilter && <Filter info={info} />} */}
      {isOpenFilter && <Filter />}
      <Button
        className={clsx(isOpenMenu ? "active" : "menu-button")}
        sx={{ left: "16px" }}
        onClick={handleClickMenu}
      >
        <MenuIcon className="menu-icon" />
      </Button>
      {isOpenMenu && <Menu />}
      {/* <Search className="search" info={info} onSubmit={onSearch} /> */}
      <Search className="search" onSubmit={onSearch} />
      {isOpenIssue && issue && <Issue issue={issue} />}
    </StyledDiv>
  );
}
