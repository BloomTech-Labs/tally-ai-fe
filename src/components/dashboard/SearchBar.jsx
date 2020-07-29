import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
    marginTop: 120,
    borderRadius: 15
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    width: 100,
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [cuisine, setCuisine] = React.useState('All');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ backgroundColor: 'gray', height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Paper component="form" className={classes.root}>
        <FormControl className={classes.iconButton}>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={cuisine}
            onChange={handleChange}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Divider className={classes.divider} orientation="vertical" />

        <InputBase
          className={classes.input}
          placeholder="Search for a business"
          inputProps={{ 'aria-label': 'search for a business' }}
        />
        <IconButton type="submit" className={{ ...classes.iconButton, paddingRight: 0 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
