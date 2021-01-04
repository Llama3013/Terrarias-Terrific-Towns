import React, { useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  importText: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  newTownText: {
    margin: theme.spacing(1),
  },
  exportIcon: {
    display: "flex",
    marginLeft: "auto",
  },
  centerElement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  importFileDrag: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: "1350",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7e7e7",
    borderRadius: "12px",
    color: "#7f8e99",
    opacity: ".9",
  },
}));

/**
 * This is a Appbar with a Menu, Name of Website, Textfield and a Button which when clicked creates a new
 * town and pushes the town name inputted into TextField to App class. The menu will let the user change
 * their settings and has a link to the wiki on npc's
 * @param {*} props
 */
export default function TownAppBar(props) {
  const { settings } = props;
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importError, setImportError] = useState(false);
  const [town, setTown] = useState("New Town");
  const [importData, setimportData] = useState("");
  const [dragging, setDragging] = useState(false);
  const drag = React.useRef(null);

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  const handleInfoDialogOpen = () => {
    setAnchorEl(null);
    setInfoDialogOpen(true);
  };

  const handleMoreInfo = () => {
    window.open("https://terraria.gamepedia.com/NPCs#Happiness");
    handleInfoDialogClose();
  };

  const handleImportDialogClose = () => {
    setimportData("");
    setImportDialogOpen(false);
  };

  const handleImportDialogOpen = () => {
    setAnchorEl(null);
    setImportError(false);
    setImportDialogOpen(true);
  };

  /**
   * This checks if the json is in the correct format and then if successful it will go to app.js and
   * finish importing. If unsuccessful it will turn on importError which will show a red outline and
   * error text
   */
  const handleImport = () => {
    try {
      JSON.parse(importData);
      setImportError(false);
      props.importTownsState(importData);
      handleImportDialogClose();
      setimportData("");
    } catch {
      setImportError(true);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();

    if (e.target !== drag.current) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    if (e.target === drag.current) {
      setDragging(false);
    }
  };

  const handleImportDrop = (e) => {
    e.preventDefault();

    setDragging(false);
    handleImportFile(e.dataTransfer.files);
  };

  /**
   * This will change the importData to reflect the user's uploaded file.
   * @param {*} townsFile
   */
  const handleImportFile = (townsFile) => {
    try {
      const reader = new FileReader();
      reader.readAsText(townsFile[0]);

      reader.onload = () => {
        setimportData(reader.result);
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    } catch (error) {
      console.log(error);
      setImportError(true);
    }
  };

  const handleExportDialogClose = () => {
    setExportDialogOpen(false);
  };

  const handleExportDialogOpen = () => {
    setAnchorEl(null);
    setExportDialogOpen(true);
  };

  const handleExportClipboard = () => {
    try {
      props.exportClipboard();
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportFile = () => {
    try {
      props.exportFile();
    } catch (error) {
      console.log(error);
    }
  };

  const addTown = () => {
    return props.addTown(town);
  };

  const onOffSwitch = (onOff) => (onOff ? <ToggleOnIcon /> : <ToggleOffIcon />);

  const importErrorText = importError
    ? "towns data is incorrect or not in json format"
    : "";
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleImportDialogOpen}>Import towns</MenuItem>
          <Dialog
            open={importDialogOpen}
            onClose={handleImportDialogClose}
            aria-labelledby="import-dialog-title"
            aria-describedby="import-dialog-description"
          >
            <div
              onDrop={(e) => handleImportDrop(e)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragLeave={(e) => handleDragLeave(e)}
            >
              {dragging && (
                <div ref={drag} className={classes.importFileDrag}>
                  <Typography variant="h5">Drop towns file here</Typography>
                </div>
              )}
              <DialogTitle id="import-dialog-title">
                {"Would you like to import your towns?"}
              </DialogTitle>
              <DialogContent>
                <div>
                  <label htmlFor="select-towns-file">
                    <input
                      onChange={(e) => handleImportFile(e.currentTarget.files)}
                      id="select-towns-file"
                      style={{ display: "none" }}
                      type="file"
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                      className={classes.centerElement}
                    >
                      Drag or Select a towns file
                    </Button>
                  </label>
                </div>
                <Typography className={classes.centerElement}>
                  -- or paste it below --
                </Typography>
                <div>
                  <TextField
                    className={classes.importText}
                    error={importError}
                    id="import-towns-state"
                    label="Import"
                    helperText={importErrorText}
                    variant="outlined"
                    multiline
                    value={importData}
                    onChange={(e) => {
                      setimportData(e.currentTarget.value);
                    }}
                  />
                </div>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleImportDialogClose} color="secondary">
                  Disagree
                </Button>
                <Button onClick={handleImport} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <div>
            <MenuItem onClick={handleExportDialogOpen}>Export towns</MenuItem>
            <Dialog
              open={exportDialogOpen}
              onClose={handleExportDialogClose}
              aria-labelledby="export-dialog-title"
              aria-describedby="export-dialog-description"
            >
              <DialogTitle id="export-dialog-title">
                {"How would you like to export your towns?"}
              </DialogTitle>
              <DialogContent>
                <div className={classes.importText}>
                  <Typography variant="h6">Copy towns to Clipboard:</Typography>
                  <Tooltip title="Copy">
                    <IconButton
                      className={classes.exportIcon}
                      onClick={handleExportClipboard}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={classes.importText}>
                  <Typography variant="h6">Download towns:</Typography>
                  <Tooltip title="Download">
                    <IconButton
                      className={classes.exportIcon}
                      onClick={handleExportFile}
                    >
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleExportDialogClose}
                  color="primary"
                  autoFocus
                >
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <MenuItem
            onClick={() => props.multiBiomeSetting(!settings.multiBiome)}
          >
            Multi Biome {onOffSwitch(settings.multiBiome)}
          </MenuItem>
          <MenuItem onClick={() => props.notesSetting(!settings.notes)}>
            Notes {onOffSwitch(settings.notes)}
          </MenuItem>
          <MenuItem onClick={() => props.solitarySetting(!settings.solitary)}>
            Assume solitary {onOffSwitch(settings.solitary)}
          </MenuItem>
          <div>
            <MenuItem onClick={handleInfoDialogOpen}>More Info</MenuItem>
            <Dialog
              open={infoDialogOpen}
              onClose={handleInfoDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Would you like to access this third party website?"}
              </DialogTitle>
              <DialogContent>
                https://terraria.gamepedia.com/NPCs#Happiness
              </DialogContent>
              <DialogActions>
                <Button onClick={handleInfoDialogClose} color="secondary">
                  Disagree
                </Button>
                <Button onClick={handleMoreInfo} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Menu>
        <Typography variant="h4" className={classes.title}>
          Terrarias Terrific Towns
        </Typography>
        <div className={classes.centerElement}>
          <TextField
            className={classes.newTownText}
            id="new-town-name"
            size="small"
            label="New Town"
            value={town}
            onChange={(e) => setTown(e.currentTarget.value)}
            variant="outlined"
          />
          <Button variant="contained" size="small" onClick={() => addTown()}>
            Add Town
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
