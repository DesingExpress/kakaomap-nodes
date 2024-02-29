import clsx from "clsx";
import {
  styled,
  Paper,
  typographyClasses,
  ListItemButton,
  ListItemText,
  svgIconClasses,
  buttonBaseClasses,
  Divider,
  dividerClasses,
  listItemTextClasses,
  Typography,
  Button,
  checkboxClasses,
  touchRippleClasses,
} from "@mui/material";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox } from "@mui/material";
import { useSettings } from "../store";

// const StyledList = styled(Paper)(({ theme, width, height }) => ({
const StyledMarkersPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: theme.spacing(7.5),
  // left: theme.spacing(9),
  zIndex: 1,
  width: "300px",
  height: "calc(100% - 100px)",
  // padding: theme.spacing(0.1),
  display: "flex",
  flexDirection: "column",
  borderRadius: "4px",
  backgroundColor: "#FFF",
  boxShadow: "3px 0px 2.5px -2px rgba(0, 0, 0, 0.20)",
  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 400,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },
  [`& .${svgIconClasses.root}`]: {
    fill: "#0C2340",
  },
  [`& div.header`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2, 2),
    [`& >.${typographyClasses.root}`]: {
      color: "#0C2340",
      fontFamily: `"pretendard", sans-serif`,
      fontSize: "1.0rem",
      fontWeight: 800,
      lineHeight: "137.5%",
      letterSpacing: "-0.2px",
    },
    [`& >.action`]: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      right: theme.spacing(2.5),
      alignItems: "center",
      [`& .${buttonBaseClasses.root}`]: {
        width: 0,
        minWidth: "unset",
        minHeight: "unset",
        borderRadius: "100px",
        margin: theme.spacing(0.5),
        [`& .MuiButton-endIcon`]: {
          margin: 0,
        },
      },
    },
  },
  [`& .List`]: {
    overflow: "auto",
    padding: theme.spacing(3, 2.5, 3, 2.5),
    borderRadius: "2px",
    backgroundColor: "rgba(255,255,255,0.5)",
    scrollbarColor: "#CCC #FFF",
    [`& .${buttonBaseClasses.root}`]: {
      display: "flex",
      flexDirection: "row",
      minHeight: "unset",
      alignItems: "flex-start",
      [`& >.checkbox`]: {
        flex: 0.2,
      },
      [`& >.contents`]: {
        height: "100%",
        width: "0",
        flex: 1,
        padding: theme.spacing(0, 1, 0, 0),
        [`& >.${listItemTextClasses.root}`]: {
          overflow: "hidden",
          // overflowWrap: "break-word",
          // textOverflow: "ellipsis",
          // whiteSpace: "nowrap",
        },
        [`& >.categories`]: {
          [`& >.${typographyClasses.root}`]: {
            fontWeight: 200,
          },
        },
      },
      [`& >.media`]: {
        flex: 0.5,
        height: "80%",
        border: "1px solid #CCC",
        borderRadius: "5px",
        [`& img`]: {
          width: "100%",
          height: "100%",
        },
      },
      [`&:hover`]: {
        background: "var(--dx-background-10)",
        [`&:hover#spandiv`]: { width: "10%" },
      },
      [`& >.${dividerClasses.root}`]: {
        position: "absolute",
        bottom: theme.spacing(1),
        width: "100%",
        borderColor: "#CCC",
      },
    },
    [`& .active`]: {
      background: "var(--dx-background-10)",
    },
  },
}));

function MarkerList({ ...props }) {
  const { markers, selected, onSubmit, onClick, onMouseOver, onMouseOut } =
    props;
  const [mode, setMode] = useSettings((state) => [
    state.mode,
    state.setSettings,
  ]);
  const [checked, setChecked] = useState({});

  function handleClickDone(e) {
    setMode({ mode: 0 });
    const _data = markers
      .filter((e, i) =>
        Object.entries(checked)
          .filter((c) => c[1] === true)
          .map((m) => Number(m[0]))
          .includes(i)
      )
      .map((e) => e.userData);

    onSubmit("PHOTO", _data);
  }

  function handleClickCancel(e) {
    setMode({ mode: 0 });
  }

  useEffect(() => {
    if (mode === 0) setChecked({});
  }, [mode]);

  function handleClickCheckBox(e) {
    e.stopPropagation();
    const idx = e.currentTarget.dataset.idx;
    setChecked((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
  }

  const isItemLoaded = useCallback((index) => !!markers[index], [markers]);
  const label = { inputProps: { "aria-label": "controlled" } };

  const Row = useMemo(() => {
    return memo(
      function Row({ index, style }) {
        const data = markers[index].userData;
        return (
          <ListItemButton
            className={clsx(index === selected.idx && "active")}
            style={style}
            data-idx={index}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            // disableRipple
          >
            {mode === 1 && (
              <div className="checkbox">
                <Checkbox
                  {...label}
                  data-idx={index}
                  checked={checked[index] || false}
                  onClick={handleClickCheckBox}
                ></Checkbox>
              </div>
            )}
            <div className="contents">
              <ListItemText primary={data.extra_data.제목} />
              <ListItemText primary={data.extra_data.내용} />
              <ListItemText
                className="categories"
                primary={data.categories.map((e) => `#${e[1]}`).join("  ")}
              />
            </div>
            <div className="media">
              <img
                src={data.extra_data.previewImg}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            <Divider />
          </ListItemButton>
        );
      },
      () => true
    );
  }, [markers, checked, mode]);

  useEffect(() => {
    markers.forEach((e) => {
      let file = new Blob([e.userData.extra_data._media], {
        type: "image/png",
      });
      let url = URL.createObjectURL(file);
      e.userData.extra_data.previewImg = url;
    });
  }, [markers]);

  return (
    <Fragment>
      <StyledMarkersPaper>
        <div className="header">
          <Typography>검색 결과</Typography>
          {mode === 1 && (
            <div className="action">
              <Button
                variant="contained"
                color="success"
                endIcon={<DoneIcon />}
                onClick={handleClickDone}
              />
              <Button
                variant="contained"
                color="error"
                endIcon={<CloseIcon />}
                onClick={handleClickCancel}
              />
            </div>
          )}
        </div>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              className="infinite-loader"
              isItemLoaded={isItemLoaded}
              // itemCount={markers.length + (_hasNext ? 1 : 0)}
              itemCount={markers.length}
              loadMoreItems={() => false}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  className="List"
                  height={height - 64}
                  width={width}
                  itemCount={markers.length}
                  itemSize={120}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {Row}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </StyledMarkersPaper>
    </Fragment>
  );
}

export default MarkerList;
