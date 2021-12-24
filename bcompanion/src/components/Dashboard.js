import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems} from './listItems';
import {Route, useRouteMatch} from "react-router-dom"
import Places from "./Places";
import Groups from "./Groups";
import Hikes from "./Hikes";
import PlacesByCity from "./PlacesByCity";
import PlaceDescription from "./PlaceDescription";
import GroupDescription from "./GroupDescription";
import GroupsByUser from "./GroupsByUser";
import HikeDescription from "./HikeDescription";
import HikesByUser from "./HikesByUser";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import MainPage from "./MainPage";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.bcompanion.kz/">
                BCompanion
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Dashboard(props) {

    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserInfo = async () => {
        try {
            const data = await axios.get(`https://stormy-escarpment-89406.herokuapp.com/users/getUser?phone_number=${localStorage.getItem('phoneNum')}`
            )
            .then(response => {
                setUserInfo(response.data);
            });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('phoneNum')=== null){
            console.log('phone num doesnt exist');
        } else {
            getUserInfo();
        }
    }, []);

    function logOut() {
        localStorage.clear();
        setUserInfo(null);
        window.location.href='https://www.kazatk.kz/bcompanion/index.html?logOut=true';
    }

    const classes = useStyles();
    const [openM, setOpenM] = React.useState(false);

    const handleOpen = () => {
        setOpenM(true);
    };

    const handleClose = () => {
        setOpenM(false);
    };
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar style={{background: '#6DC068'}} position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        BCompanion
                    </Typography>
                    { loading ?
                    <div>


                        <Avatar onClick={handleOpen} alt="Avatar"
                                src="https://i.ibb.co/VqncVzX/avatar.png"/>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openM}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openM}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">{userInfo ? userInfo.name : <a href='https://www.kazatk.kz/bcompanion/index.html?logOut=true'>Login</a>} {userInfo ? userInfo.surname : ''}</h2>
                                    <p id="transition-modal-description">{userInfo ? userInfo.phoneNumber : ''}</p>
                                    {userInfo ? <Button onClick={logOut} variant='contained' color='secondary'>
                                        Выйти
                                    </Button> : ''}
                                </div>
                            </Fade>
                        </Modal>

                    </div>
                            :
                            <CircularProgress/>
                            }

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={12}>
                            <Paper>
                                {loading ?
                                    <Route path='/' exact render={() => <MainPage name={ userInfo ? userInfo.name : ''} surname = {userInfo ?userInfo.surname: ''}/>}/>
                                    :
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start"
                                        spacing={5}
                                    >
                                        <CircularProgress/>
                                    </Grid>
                                }
                                <Route path='/places' exact render={() => <Places/>}/>
                                <Route path='/places/:cityName'
                                       render={() => <PlacesByCity/>}/>
                                <Route path='/groups' exact render={() => <Groups/>}/>
                                <Route path='/groupsByUser' userToken={props.userToken} exact
                                       render={() => <GroupsByUser/>}/>
                                <Route path='/groupDescription/:groupName'
                                       render={() => <GroupDescription/>}/>
                                <Route path='/hikes' render={() => <Hikes/>}/>

                                <Route path='/placeDescription/:placeName'
                                       render={() => <PlaceDescription/>}/>
                                <Route path='/hikeDescription/:hikeId'
                                       render={() => <HikeDescription/>}/>
                                <Route path='/hikesByUser'
                                       render={() => <HikesByUser/>}/>

                                {/*
                                <Redirect from='/' to='/places'/>
*/}

                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}