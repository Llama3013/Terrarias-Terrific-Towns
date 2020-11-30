import React from "react";
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

/**
 * This is a Appbar with a Menu, Name of Website, Textfield and a Button which when clicked creates a new
 * town and pushes the town name inputted into TextField to App class.
 * @param {*} props
 */

export default function TownAppBar(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Import towns</MenuItem>
          <MenuItem onClick={handleClose}>Export towns</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
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
