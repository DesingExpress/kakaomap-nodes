import {
  styled,
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  typographyClasses,
  listItemClasses,
  Box,
  Divider,
  listClasses,
  Chip,
  chipClasses,
  dividerClasses,
  buttonBaseClasses,
} from "@mui/material";
import JSZip from "jszip";

const StyledIssue = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(8),
  // left: "calc(50% - 195.5px)",
  zIndex: 1,
  minWidth: "391px",
  width: "391px",
  maxHeight: "calc(100% - 130px)",
  // maxHeight: "30%",
  display: "flex",
  padding: theme.spacing(1),
  flexDirection: "column",
  alignSelf: "stretch",
  borderRadius: "4px",
  backgroundColor: "#94C2FF",
  boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  [`& .${typographyClasses.root}`]: {
    color: "#0C2340",
    fontFamily: `"pretendard", sans-serif`,
    fontSize: "1.0rem",
    fontWeight: 600,
    lineHeight: "137.5%",
    letterSpacing: "-0.2px",
  },
  [`& >.${listClasses.root}`]: {
    overflow: "auto",
    // padding: theme.spacing(2, 2.5, 2, 2.5),
    padding: theme.spacing(3, 2.5, 3, 2.5),
    borderRadius: "8px",
    backgroundColor: "#FFF",
    [`& .${listItemClasses.root}`]: {
      display: "flex",
      flexDirection: "column",
      [`& .MuiBox-root`]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        justifyContent: "start",
        width: "100%",
        heigth: "74px",
        borderRadius: "4px",
        padding: theme.spacing(1.5, 0),
        overflowWrap: "break-word",
        [`& .${chipClasses.root}`]: {
          background: "#0055F9",
          borderRadius: "100px",
          padding: theme.spacing(0.5, 1),
          margin: theme.spacing(0, 1.5, 0, 0),
          [`&[className="category-chip"]`]: {
            background: "#00897B",
          },
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

          [`& > .${typographyClasses.root}`]: {
            fontWeight: 400,
            lineHeight: "150%",
            fontFeatureSettings: "'clig' off, 'liga' off",
            // minWidth: 0,
          },
        },
        [`& .${buttonBaseClasses.root}`]: {
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
  [`& ::-webkit-scrollbar-thumb`]: {
    backgroundColor: "#0055F9",
  },
  [`& ::-webkit-scrollbar-track`]: {
    // backgroundColor: "#CCC",
    backgroundColor: "grey",
  },
}));

export function Issue({ ...props }) {
  const { issue } = props;
  const { categories, extra_data } = issue;

  function handleClickDownload(e) {
    const files = extra_data.media;
    downloadImagesAsZip(files);
  }

  return (
    <StyledIssue className="issue-overlay">
      <List>
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
          .filter((e) => e[0] !== "media")
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
        {extra_data.media.length > 0 && (
          <ListItem disablePadding>
            <Box>
              <Chip label={"media"} />
              <Button
                className="content"
                fullWidth
                variant="contained"
                onClick={handleClickDownload}
              >
                {`Download (${extra_data.media.length})`}
              </Button>
            </Box>
            <Divider></Divider>
          </ListItem>
        )}
      </List>
    </StyledIssue>
  );
}

function downloadImagesAsZip(imagesArray) {
  // JSZip 인스턴스 생성
  const zip = new JSZip();

  // 이미지 파일들을 압축파일에 추가
  imagesArray.forEach((dataURL, index) => {
    // 확장자 추정
    const extension = dataURL.startsWith("data:image/png")
      ? "png"
      : dataURL.startsWith("data:image/jpeg")
      ? "jpeg"
      : dataURL.startsWith("data:image/jpg")
      ? "jpg"
      : "png"; // 기본값

    const fileName = `image_${index + 1}.${extension}`;

    // JSZip에 파일 추가
    zip.file(fileName, dataURL.split(",")[1], { base64: true });
  });

  // 압축 파일 생성 및 다운로드
  zip.generateAsync({ type: "blob" }).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "media.zip"; // 다운로드할 파일명 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
