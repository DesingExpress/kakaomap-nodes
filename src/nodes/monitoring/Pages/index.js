import clsx from "clsx";
import {
  Button,
  buttonBaseClasses,
  buttonClasses,
  styled,
  svgIconClasses,
  typographyClasses,
} from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search } from "./Sub/Search.js";
import { Filter } from "./Sub/Filter.js";
import {
  onClickMap,
  onClickMarker,
  onLoadSiteInfo,
  onAddMarkers,
  useInfo,
  useSettings,
} from "./store";
import { ReactComponent as FilterIcon } from "../Icons/FilterIcon.svg";
import { loadMarkerImage } from "./utils.js";
import { SideBar } from "./Sub/SideBar.js";
import MenuCollapse from "./Sub/Menu.js";
import MarkerList from "./Sub/MarkerList.js";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ContentPanel from "./Sub/Content.js";

const StyledDiv = styled("div")(({ theme, isOpen }) => ({
  // [`& > .container`]: {
  width: "100%",
  height: "100%",
  // display: "flex",
  // flexDirection: "row",
  // alignItems: "flex-end",
  [`& .kakaomap`]: {
    position: "absolute",
    width: "100%",
    height: "calc(100% - 102px)",
    zIndex: 0,
  },
  [`& >.${typographyClasses.root}`]: {
    fontFamily: "Inter, NanumSquareNeo, Arial, sans-serif",
    fontWeight: 600,
    fontSize: "1.0rem",
  },
  [`& >.${buttonBaseClasses.root}`]: {
    position: "absolute",
    top: theme.spacing(2),
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
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [`&:hover`]: {
      backgroundColor: "#0055f9",
      background: "#0055f9",
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
  [`& .collapse-button`]: {
    position: "absolute",
    top: "calc(50% - 50px - 24px)",
    left: isOpen ? "360px" : "60px",
    minWidth: "20px",
    maxWidth: "20px",
    height: "48px",
    padding: 0,
    borderRadius: "0px 10px 10px 0px",
    backgroundColor: "#FFF",
    border: "1px solid #CCC",
    // boxShadow: "3px 0px 2.5px -2px rgba(0, 0, 0, 0.20)",
    [`& .MuiButton-startIcon`]: {
      width: "20px",
      margin: 0,
      [`& .${svgIconClasses.root}`]: {
        fill: "grey",
      },
    },
    [`&:hover`]: {
      backgroundColor: "#CCC",
    },
    // [`&:active`]: {
    //   backgroundColor: "#CCC",
    // },
  },
  [`& .${buttonClasses.root}`]: {
    color: "#CCC",
  },
  // },
}));

export function UIWrapper({ kakaomap, force, ...props }) {
  const ref = useRef();
  const { onSubmit: onClick } = props;
  const panelTypes = ["filter", "menu", "content"];

  const [isOpenPanels, setOpenPanels] = useState(
    Object.fromEntries(panelTypes.map((e) => [e, false]))
  );
  const [isOpenList, setOpenList] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({
    prev: undefined,
    current: undefined,
    idx: undefined,
  });

  const [mode, setSettings] = useSettings((state) => [
    state.mode,
    state.setSettings,
  ]);

  const [categories, setSiteInfo] = useInfo((state) => [
    state.categories,
    state.setSiteInfo,
  ]);
  const isMarkers = useMemo(() => {
    setSelectedMarker({ prev: undefined, current: undefined });
    return markers.length > 0;
  }, [markers]);
  const loadedImgs = useMemo(() => {
    if (!!window.kakao) {
      return [
        loadMarkerImage("markerImage.png"),
        loadMarkerImage("markerImage_true.png"),
      ];
    } else return undefined;
  }, [markers]);

  function handleLoadInfo(v) {
    setSiteInfo({ ...v });
  }

  function handleClickMap() {
    setOpenPanels(Object.fromEntries(panelTypes.map((e) => [e, false])));
  }

  function handelClickIcon(e) {
    const id = e.currentTarget.id;
    const _isActive = Object.fromEntries(panelTypes.map((e) => [e, false]));
    _isActive[id] = !isOpenPanels[id];
    setOpenPanels(_isActive);
  }

  function handleMarkers(v) {
    setMarkers(v);
    if (!isOpenList) setOpenList(true);
  }

  function handleClickMarker(v) {
    const _result = { ...selectedMarker };
    _result.prev = selectedMarker.current;
    _result.current = v;
    _result.idx = markers.findIndex((e) => e.userData === v.userData);
    setSelectedMarker(_result);
  }

  function handleOpenList(e) {
    setOpenList(!isOpenList);
  }

  async function handleClickContent(e) {
    const idx = e.currentTarget.dataset.idx;
    const _result = { ...selectedMarker };
    _result.prev = selectedMarker.current;
    _result.current = markers[idx];
    _result.idx = Number(idx);
    setSelectedMarker(_result);
  }

  async function handleMouseOverContent(e) {
    if (!selectedMarker.current) {
      const idx = e.currentTarget.dataset.idx;
      const img = await loadedImgs[1];
      markers[idx].setImage(img);
    }
  }

  async function handleMouseOutContent(e) {
    if (!selectedMarker.current) {
      const idx = e.currentTarget.dataset.idx;
      const img = await loadedImgs[0];
      markers[idx].setImage(img);
    }
  }

  async function handleCloseContent() {
    const _result = { ...selectedMarker };
    _result.prev = selectedMarker.current;
    _result.current = undefined;
    _result.idx = undefined;
    setSelectedMarker(_result);
  }

  useEffect(() => {
    setSelectedMarkerImage(selectedMarker);
    async function setSelectedMarkerImage(obj) {
      const { prev, current } = obj;
      prev?.setImage(await loadedImgs[0]);
      current?.setImage(await loadedImgs[1]);
    }
  }, [selectedMarker]);

  useEffect(() => {
    const filtered = categories.map((e) => {
      return [e.label, "-"];
    });
    setSettings({ filtered });
  }, [categories]);

  useEffect(() => {
    let _isOpenPanels = { ...isOpenPanels };
    _isOpenPanels.menu = false;
    setOpenPanels(_isOpenPanels);
  }, [mode]);

  useLayoutEffect(() => {
    onClickMap.current = handleClickMap;
    onClickMarker.current = handleClickMarker;
    onLoadSiteInfo.current = handleLoadInfo;
    onAddMarkers.current = handleMarkers;
    return () => {
      onClickMap.current = undefined;
      onClickMarker.current = undefined;
      onLoadSiteInfo.current = undefined;
      onAddMarkers.current = undefined;
    };
  }, [selectedMarker, isOpenList]);

  return (
    <StyledDiv ref={ref} isOpen={isOpenList && markers.length > 0}>
      <div className="kakaomap">{kakaomap}</div>

      <SideBar
        onClick={handelClickIcon}
        isActivePanels={isOpenPanels}
      ></SideBar>
      {isOpenPanels.menu && (
        <MenuCollapse
          onClick={onClick}
          contents={markers.map((e) => e.userData)}
        />
      )}
      {isMarkers && isOpenList && (
        <MarkerList
          markers={markers}
          selected={selectedMarker}
          onSubmit={onClick}
          onClick={handleClickContent}
          onMouseOver={handleMouseOverContent}
          onMouseOut={handleMouseOutContent}
        ></MarkerList>
      )}
      {markers.length > 0 && (
        <Button
          className="collapse-button"
          variant="outlined"
          onClick={handleOpenList}
          startIcon={
            isOpenList ? (
              <ArrowBackIosRoundedIcon />
            ) : (
              <ArrowForwardIosRoundedIcon />
            )
          }
        ></Button>
      )}

      <Button
        className={clsx(isOpenPanels.filter ? "active" : "filter-button")}
        id="filter"
        sx={{ right: "16px" }}
        onClick={handelClickIcon}
      >
        <FilterIcon className="filter-icon" />
      </Button>
      {isOpenPanels.filter && <Filter />}

      <Search className="search" onSubmit={onClick} />
      {selectedMarker.current && (
        <ContentPanel
          marker={selectedMarker.current}
          isClosedList={!isOpenList}
          onClose={handleCloseContent}
        ></ContentPanel>
      )}
    </StyledDiv>
  );
}
