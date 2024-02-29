import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
  buttonBaseClasses,
  buttonClasses,
  chipClasses,
  dividerClasses,
  listClasses,
  listItemClasses,
  styled,
  typographyClasses,
} from "@mui/material";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "../../Components/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const StyledPaper = styled(Paper)(({ theme, bool }) => ({
  position: "absolute",
  top: "20px",
  left: bool ? "90px" : "390px",
  height: "calc(100% - 140px)",
  width: "350px",
  padding: theme.spacing(1),
  backgroundColor: "#FFF",
  borderRadius: "40px",
  boxShadow:
    "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
  zIndex: 1,
  overflow: "auto",
  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 600,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },
  [`& >.${dividerClasses.root}`]: {
    margin: theme.spacing(1, 0),
  },
  [`& >.${listClasses.root}`]: {
    overflow: "auto",
    // padding: theme.spacing(3, 2.5, 3, 2.5),
    padding: theme.spacing(0, 1),
    // borderRadius: "8px",
    backgroundColor: "#FFF",
    [`& >.media`]: {
      width: "100%",
      height: "200px",
      border: "1px solid #CCC",
      borderRadius: "5px",
      [`& img`]: {
        width: "100%",
        height: "100%",
      },
    },
    [`& >.${listItemClasses.root}`]: {
      display: "flex",
      flexDirection: "column",
      [`& >.MuiBox-root`]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        justifyContent: "start",
        width: "100%",
        heigth: "74px",
        // borderRadius: "4px",
        padding: theme.spacing(1.5, 0),
        overflowWrap: "break-word",
        [`& >.${chipClasses.root}`]: {
          background: "#0055F9",
          borderRadius: "100px",
          padding: theme.spacing(0.5, 1),
          margin: theme.spacing(0, 1.5, 0, 0),
          [`& .MuiChip-label`]: {
            color: "#FFF",
            fontFamily: `"pretendard", sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 600,
            lineHeight: "128.571%",
            letterSpacing: "-0.2px",
            fontFeatureSettings: "`clig off, `liga` off",
            padding: theme.spacing(0.375, 0.75),
          },
        },
        [`& .content`]: {
          display: "flex",
          alignItems: "center",
          overflowWrap: "anywhere",
          [`& >.${typographyClasses.root}`]: {
            fontWeight: 400,
            lineHeight: "150%",
            fontFeatureSettings: "'clig' off, 'liga' off",
          },
        },
        [`& >.${buttonBaseClasses.root}`]: {
          background: "#2196F3",
          color: "#FFF",
          fontFamily: `"pretendard", sans-serif`,
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: "128.571%",
          letterSpacing: "-0.2px",
          fontFeatureSettings: "'clig' off, 'liga' off",
          textTransform: "uppercase",
        },
      },
      [`& .${dividerClasses.root}`]: {
        width: "100%",
        heigth: "1px",
        borderColor: "#CCC",
      },
    },
  },
  [`& > div.actions`]: {
    display: "inline-flex",
    justifyContent: "flex-end",
    padding: theme.spacing(1),
    [`& >.${buttonBaseClasses.root}`]: {
      position: "relative",
      width: 0,
      minWidth: "unset",
      minHeight: "unset",
      color: "#0C2340",
      backgroundColor: "#CCC",
      borderRadius: "100px",
      margin: theme.spacing(0.5),
      [`& >.MuiButton-endIcon`]: {
        margin: 0,
      },
    },
  },
  //   [`& ::-webkit-scrollbar-thumb`]: {
  //     backgroundColor: "#0055F9",
  //   },
  //   [`& ::-webkit-scrollbar-track`]: {
  //     // backgroundColor: "#CCC",
  //     backgroundColor: "grey",
  //   },
  //   },
}));

function ContentPanel({ ...props }) {
  const { marker, onClose, isClosedList } = props;
  const { categories, extra_data } = marker?.userData ?? {};

  const isUser = false;
  // const isUser = useMemo(() => {
  //   return false;
  // }, [marker]);

  // const isMedia = useMemo(() => {
  //   return !!extra_data.media
  //     ? Array.isArray(extra_data.media) && extra_data.media.length > 0
  //     : false;
  // }, [marker]);

  const [isEdit, setEdit] = useState(false);

  function handleClickSubmit() {
    // _buttonRef.current.click();
    console.log("update");
  }

  function handleClickEdit() {
    setEdit(true);
  }

  // useEffect(() => {
  //   console.log("asdf");
  //   if (!marker) setEdit(false);
  // }, [marker]);

  // useEffect(() => {
  //   console.log(ref.current.getBoundingClientRect());
  // }, [marker]);

  return (
    <StyledPaper bool={isClosedList}>
      <Fragment>
        {!isUser && (
          <div className="actions">
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              onClick={handleClickEdit}
            >
              {/* 수정 */}
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
              // onClick={handlClickDelete}
            >
              {/* 삭제 */}
            </Button>
            <Button
              style={{ position: "absolute", top: "13px", right: "12px" }}
              endIcon={<CloseIcon />}
              variant="contained"
              onClick={onClose}
            >
              {/* 취소 */}
            </Button>
          </div>
        )}
        {/* <Divider middle orientation="horizontal" /> */}
        <List>
          {/* {isMedia && (
              <ListItem disablePadding>
                <Box>
                  <Chip label={"media"} />
                  <Button
                    className="content"
                    fullWidth
                    variant="contained"
                    onClick={handleClickDownload}
                  >
                    {`Download`}
                  </Button>
                </Box>
                <Divider></Divider>
              </ListItem>
            )} */}
          {
            <div className="media">
              <img
                src={extra_data.previewImg}
                alt="thumbnail"
                loading="lazy"
              ></img>
            </div>
          }
          {categories.map(([label, value]) => (
            <ListItem disablePadding>
              <Box>
                <Chip className="category-chip" label={label} />
                <div className="content">
                  <Typography>{value}</Typography>
                  {/* {value} */}
                </div>
              </Box>
              <Divider></Divider>
            </ListItem>
          ))}
          {Object.entries(extra_data)
            .filter((e) => !["media", "_media", "previewImg"].includes(e[0]))
            .map(([label, value]) => (
              <ListItem disablePadding>
                <Box>
                  <Chip label={label} />
                  <div className="content">
                    <Typography>{value}</Typography>
                  </div>
                </Box>
                <Divider></Divider>
              </ListItem>
            ))}
        </List>
        {/* <Divider middle orientation="horizontal" /> */}
        <div className="actions" style={{ position: "absolute", right: "4px" }}>
          {isEdit && (
            <LoadingButton
              variant="contained"
              onClick={handleClickSubmit}
              endIcon={<DoneIcon />}
            >
              {/* 업데이트 */}
            </LoadingButton>
          )}
        </div>
      </Fragment>
    </StyledPaper>
  );
}

export default ContentPanel;
