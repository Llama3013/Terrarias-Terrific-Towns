import React from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleMoreInfo = () => {
    window.open("https://terraria.gamepedia.com/NPCs#Happiness");
    handleDialogClose();
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

  const addTown = () => {
    return props.addTown(town);
  };

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
          <MenuItem onClick={handleMenuClose}>Import towns</MenuItem>
          <MenuItem onClick={handleMenuClose}>Export towns</MenuItem>
          <MenuItem onClick={multiBiomeToggle}>Multi Biome</MenuItem>
          <MenuItem onClick={notesToggle}>Notes</MenuItem>
          <div>
            <MenuItem onClick={handleDialogOpen}>More Info</MenuItem>
            <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Would you like to access a third party website"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
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
