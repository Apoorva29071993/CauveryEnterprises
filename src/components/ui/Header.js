import React, {useState , useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../assets/logo.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ElevationScroll(props) {
  const {children} = props;
  //trigger is a constant and useScrollTrigger is a hook used and this is
  //event listener when a user scrolls
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

//Using the default values from default theme object for Inline Styling passed
// by ThemeProvider in App.js file
 const useStyles = makeStyles(theme => ({
   toolbarMargin : {
     ...theme.mixins.toolbar,
     marginBottom : "3em",
     [theme.breakpoints.down("md")] : {
        marginBottom : "2em"
     },
     [theme.breakpoints.down("xs")] : {
        marginBottom : "1.25em"
     }
   } ,
   logo : {
     height : "8em",
     //Css Media query to reduce size for medium screen and below that
     [theme.breakpoints.down("md")] : {
        height : "7em"
     },
     [theme.breakpoints.down("xs")] : {
        height : "5.5em"
     }
   },
   logocontainer : {
     padding : 0,
     "&:hover" : {
       backgroundColor : "transparent"
     }
   },
   tabContainer : {
     marginLeft : "auto"
   },
   tab : {
     ...theme.typography.tab,
     minWidth : 10,
     marginLeft : "25px"
   },
   button : {
     ...theme.typography.estimate ,
     borderRadius : "50px",
     marginLeft : "50px" ,
     maringRight : "25px",
     height : "45px",
     "&:hover" : {
       backgroundColor : theme.palette.secondary.light
     }
   },
   menu : {
     backgroundColor : theme.palette.common.blue,
     color : "white",
     borderRadius : "0px"
   },
   menuItem : {
     ...theme.typography.tab,
     color : "yellow",
     opacity : 0.5,
     "&:hover" : {
       opacity : 1
     }
   },
   drawerIcon : {
     height : "50px",
     width : "50px"
   },
   drawerIconContainer : {
     marginLeft : "auto" ,
     "&:hover" : {
       backgroundColor : "transparent"
     }
   },
   drawer : {
     backgroundColor : theme.palette.common.blue
   },
   drawerItem : {
     ...theme.typography.tab,
     color : "white",
     opacity : 0.7
   },
   drawerItemEstimate : {
    backgroundColor : theme.palette.common.orange
  },
  drawerItemSelected : {
    "& .MuiListItemText-root" : {
      opacity : 1
    }
  },
  appbar : {
    zIndex : theme.zIndex.modal + 1
  }
 }));

export default function Header(props) {

  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer , setOpenDrawer] = useState(false);
   //Css Media query to reduce size for medium screen and below that
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //Here it stores whichever component we click on and where we want menu
  //to be rendered
  const [anchorEl , setAnchorEl] = useState(null);
  //Determine the visibility of the menu
  const [openMenu , setOpenMenu] = useState(false);

  const handleChange = (event , newValue) => {
    props.setValue(newValue);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  }

  const handleMenuItemClick = (event , index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(index);
  }

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  //Active Index is the main tab
  //Selected index is the options index under services tab
  const menuOptions = [{name:"Services",link : "/services" , activeIndex : 1 , selectedIndex : 0},
                       {name:"Custom Software Development",link : "/customsoftware",activeIndex : 1 , selectedIndex : 1},
                       {name:"iOS/Android App Development",link : "/mobileapps",activeIndex : 1 , selectedIndex : 2},
                       {name:"Website Development",link : "/websites",activeIndex : 1 , selectedIndex : 3}]

        const routes = [{name : "Home" , link : "/" , activeIndex : 0} ,
                        {name : "Services" , link : "/services" , activeIndex : 1,
                                ariaOwns  : anchorEl ? "simple-menu" : undefined,
                                ariaPopUp : anchorEl ? "true" : undefined ,
                                mouseOver : event => handleClick(event)},
                        {name : "The Revolution" , link : "/revolution" , activeIndex : 2},
                        {name : "About Us" , link : "/about", activeIndex : 3},
                        {name : "Contact Us" , link : "/contact" , activeIndex : 4}];

//ComponentDidMount and this runs when a component is updated
//Here it is used to set proper url when page is refreshed
  useEffect(() => {
    [...menuOptions , ...routes].forEach(route => {
        switch (window.location.pathname){
          case `${route.link}` : if (props.value !== route.activeIndex) {
                                props.setValue(route.activeIndex);
                                if (route.selectedIndex && route.selectedIndex!==props.selectedIndex) {
                                  props.setSelectedIndex(route.selectedIndex)
                                    }
                                }
                                  break;
          case '/estimate'    : props.setValue(5);
                                break;
                      default : break ;
              }
            });

  }, [props.value , menuOptions , props.selectedIndex , routes])//This is dependancies within Square brackets
  //By passing value as 2nd argument in useEffect function so if this values is
  //not changed we dont want to run this function
  //So it should not run infinitely

  const tabs = (
    <React.Fragment>
    <Tabs value={props.value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
        {routes.map((route , index) => (
          <Tab key={`${route}${index}`} className={classes.tab} component={Link} to={route.link} label={route.name}
          aria-owns={route.ariaOwns} aria-haspopup={route.ariaPopUp} onMouseOver={route.mouseOver}/>

        ))}
    </Tabs>
    {/*Tabs and Tab Component End*/}
    <Button component={Link} to="/estimate" onClick={() => props.setValue(5)} variant="contained" color="secondary" className={classes.button}> Free Estimate</Button>

    <Menu id="simple-menu"
    anchorEl={anchorEl} open={openMenu}
    onClose={handleClose}
    MenuListProps={{onMouseLeave : handleClose }}
    classes={{paper: classes.menu}}
    elevation={0}
    style={{zIndex : 1302}}
    keepMounted>

    {menuOptions.map((option , index ) => (
      <MenuItem key={`${option}${index}`} component={Link} to={option.link}
      classes={{root : classes.menuItem}}
      onClick={(event) => {handleMenuItemClick(event,index); props.setValue(1); handleClose()}}
      selected={index===props.selectedIndex && props.value=== 1}>{option.name}</MenuItem>
    ))}

    </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
    <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
    open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}
    classes={{paper:classes.drawer}}>
    <div className={classes.toolbarMargin}></div>
    <List disablePadding>
      {routes.map(route => (
        <ListItem key={`${route}${route.activeIndex}`} divider button component={Link} to={route.link}
        selected={props.value===route.activeIndex}
        classes={{selected : classes.drawerItemSelected}}
        onClick={() => {setOpenDrawer(false); props.setValue(route.activeIndex)}}>
        <ListItemText
        className={ classes.drawerItem }
        disableTypography>{route.name}</ListItemText>
        </ListItem>
      ))}

      <ListItem className={{root : classes.drawerItemEstimate , selected : classes.drawerItemSelected}}
      onClick={() => {setOpenDrawer(false); props.setValue(5)}} divider button component={Link}
      to="/estimate" selected={props.value === 5}>
      <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
      </ListItem>
    </List>
    </SwipeableDrawer>
    <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
    <MenuIcon className={classes.drawerIcon}/>
    </IconButton>
    </React.Fragment>
  );


  return (
    <React.Fragment>
    <ElevationScroll>
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar disableGutters>
      <Button component={Link} to="/" className={classes.logocontainer} onClick={() => props.setValue(0)} disableRipple>
      <img src={logo} alt="company logo" className={classes.logo}/>
      </Button>
         {/*Css Media query to reduce size for medium screen and below that*/}
      {matches ? drawer : tabs}
      </Toolbar>
    </AppBar>
    </ElevationScroll>
    <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}
