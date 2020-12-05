import React from "react";
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [importDialogOpen, setImportDialogOpen] = React.useState(false);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [importError, setImportError] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    setImportDialogOpen(false);
  };

  const handleImportDialogOpen = () => {
    setAnchorEl(null);
    setImportDialogOpen(true);
  };

  const handleImport = () => {
    try {
      props.importTownsState(townsData);
      handleImportDialogClose();
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

  const multiBiomeToggle = () => {
    props.multiBiomeSetting(!settings.multiBiome);
    setAnchorEl(null);
  };

  const notesToggle = () => {
    props.notesSetting(!settings.notes);
    setAnchorEl(null);
  };

  const [town, setTown] = React.useState("New Town");
  const [townsData, setTownsData] = React.useState("");

  const addTown = () => {
    return props.addTown(town);
  };

  const importErrorText = importError
    ? "towns data is incorrect or formatted"
    : "";
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <div>
            <MenuItem onClick={handleImportDialogOpen}>Import towns</MenuItem>
            <Dialog
              open={importDialogOpen}
              onClose={handleImportDialogClose}
              aria-labelledby="import-dialog-title"
              aria-describedby="import-dialog-description"
            >
              <DialogTitle id="import-dialog-title">
                {"Would you like to import your towns?"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  error={importError}
                  id="import-towns-state"
                  label="Import"
                  helperText={importErrorText}
                  variant="outlined"
                  multiline
                  value={townsData}
                  onChange={(e) => setTownsData(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleImportDialogClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleImport} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <MenuItem onClick={handleExportDialogOpen}>Export towns</MenuItem>
            <Dialog
              open={exportDialogOpen}
              onClose={handleExportDialogClose}
              aria-labelledby="export-dialog-title"
              aria-describedby="export-dialog-description"
            >
              <DialogTitle id="export-dialog-title">
                {"Would you like to Export your towns?"}
              </DialogTitle>
              <DialogContent>
                <Tooltip title="Copy">
                  <IconButton onClick={handleExportClipboard}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton onClick={handleExportFile}>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
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
          <MenuItem onClick={multiBiomeToggle}>Multi Biome</MenuItem>
          <MenuItem onClick={notesToggle}>Notes</MenuItem>
          <div>
            <MenuItem onClick={handleInfoDialogOpen}>More Info</MenuItem>
            <Dialog
              open={infoDialogOpen}
              onClose={handleInfoDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Would you like to access a third party website?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleInfoDialogClose} color="primary">
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
        <TextField
          id="new-town-name"
          size="small"
          label="New Town"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" size="small" onClick={() => addTown()}>
          Add Town
        </Button>
      </Toolbar>
    </AppBar>
  );
}
