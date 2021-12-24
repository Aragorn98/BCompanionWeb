import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link, useRouteMatch} from "react-router-dom";
import Card from '@material-ui/core/Card';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios"
import IconButton from "@material-ui/core/IconButton";
import clsx from 'clsx';
import Collapse from "@material-ui/core/Collapse";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import {green} from '@material-ui/core/colors';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpIcon from '@material-ui/icons/Help';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import DirectionsIcon from '@material-ui/icons/Directions';
import InfoIcon from "@material-ui/icons/Info";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 250,
    },
    link: {
        textDecoration: "none",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const HikeDescription = (props) => {

    const match = useRouteMatch('/hikeDescription/:hikeId');

    const [hikeDescription, setHikeDescription] = useState([]);
    const [loading, setLoading] = useState(false);
    const [joined, setJoined] = useState(false);
    const USER_TOKEN = localStorage.getItem('token').split('"').join('');


    const getHikeDescription = async () => {
        const data = await axios
            .get(`https://stormy-escarpment-89406.herokuapp.com/hikes/getHike?hike_id=${match.params.hikeId}`)
            .then(response => {
                setHikeDescription(response.data);
                for (let i = 0; i < response.data.members.length; i++) {
                    let data = response.data.members[i].phoneNumber;
                    if (data === localStorage.getItem('phoneNum').split('%2B').join('+')) {
                        setJoined(true);
                        break;
                    }
                }
            })
        setLoading(true);
    }

    useEffect(() => {
        getHikeDescription();
    }, []);
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const leaveHike = async () => {
        try {
            const data = await axios.post(`https://stormy-escarpment-89406.herokuapp.com/hikes/leaveHike?hike_id=${match.params.hikeId}`,
                USER_TOKEN, {headers: {'Authorization': `${USER_TOKEN}`}}
            )
                .then(response => {
                    console.log(response.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }
    const joinHike = async () => {
        try {
            const data = await axios.post(`https://stormy-escarpment-89406.herokuapp.com/hikes/joinHike?hike_id=${match.params.hikeId}`,
                USER_TOKEN, {headers: {'Authorization': `${USER_TOKEN}`}}
            )
                .then(response => {
                    console.log(response.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }

    const handleJoinHike = () => {
        setOpenS(true);
        console.log(USER_TOKEN);
        joinHike();
    };
    const handleLeaveHike = () => {
        setOpenL(true);
        console.log(USER_TOKEN);
        leaveHike();
    };
    const [openS, setOpenS] = React.useState(false);
    const [openL, setOpenL] = React.useState(false);

    const handleClickS = () => {
        setOpenS(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenS(false);
        setOpenL(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (

        <div>
            {
                loading ?

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={5}
                    >
                        <Grid item xs={12} md={12} lg={12}>
                            <Card className={classes.root}>
                                <CardHeader
                                    title={`Поход на ${hikeDescription.placeName}`}
                                    subheader={`Организатор: ${hikeDescription.groupName}`}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={hikeDescription.hikePhoto}
                                    title={hikeDescription.hikeName}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {hikeDescription.hikeDescription}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {/*<a style={{color: "grey"}} href={`https://wa.me/${groupDescription.admins[0].split('+').join('')}`}>Связь с администратором</a>*/}
                                        Админ: {hikeDescription.admins[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/*<IconButton aria-label="add to favorites">*/}
                                    {/*    <FavoriteIcon/>*/}
                                    {/*</IconButton>*/}

                                    <Link to={`/placeDescription/${hikeDescription.placeName}`}>
                                        <IconButton aria-label="about place">
                                            <InfoIcon/>
                                        </IconButton>
                                    </Link>
                                    {
                                        joined ? <IconButton aria-label="leave">
                                                <ExitToAppIcon onClick={handleLeaveHike}/>
                                            </IconButton>
                                            :
                                            <IconButton aria-label="join">
                                                <AddCircleIcon onClick={handleJoinHike}/>
                                            </IconButton>
                                    }
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <EmojiPeopleOutlinedIcon style={{color: green[500]}}/>
                                                <Typography className={classes.heading}> Участники</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <List divider>
                                                    {hikeDescription && hikeDescription.members && hikeDescription.members
                                                        .map((member, index) =>

                                                            <ListItem divider alignItems="flex-start">
                                                                <ListItemAvatar>
                                                                    <Avatar alt={member.name} src={member.photo}/>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={member.name + " " + member.surname}
                                                                    secondary={member.phoneNumber}/>
                                                            </ListItem>
                                                        )}
                                                </List>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                            >
                                                <HelpIcon style={{color: green[500]}}/>
                                                <Typography className={classes.heading}> Полезная
                                                    информация</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <List divider>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <AccessTimeIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="Дата и время сбора"
                                                            secondary={hikeDescription.startDate + ", " + hikeDescription.startTime + " - " + hikeDescription.endDate + ", " + hikeDescription.endTime}/>
                                                    </ListItem>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <DirectionsIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="Место сбора"
                                                            secondary={hikeDescription.gatheringPlace}/>
                                                    </ListItem>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <DriveEtaIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="Поедем на машине?"
                                                            secondary={hikeDescription.hikeByCar ? 'Да' : 'Нет'}/>
                                                    </ListItem>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <NightsStayIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="С ночевкой?"
                                                            secondary={hikeDescription.withOvernightStay ? 'Да' : 'Нет'}/>
                                                    </ListItem>
                                                </List>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                            >
                                                <LoyaltyIcon style={{color: green[500]}}/>
                                                <Typography className={classes.heading}> Товары для туризма и
                                                    путешествий
                                                </Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <List divider>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <ShoppingBasketIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="Outdoor Center"
                                                            secondary="Туристическое снаряжение мировых брендов"/>
                                                    </ListItem>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <ShoppingBasketIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="RealSport"
                                                            secondary="Магазин RealSport предлагает любителям активного отдыха и походов туристические товары: палатки, спальники, кариматы, палки треккинговые, подушки под шею. Чтобы отдых был комфортным фирма Schreuders Sport International позаботилась о вашем комфорте и защите. Все товары отличаются отличным качеством, современными материалами и пользуются хорошим спросом."/>
                                                    </ListItem>
                                                    <ListItem divider alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <ShoppingBasketIcon/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary="Tomas.kz"
                                                            secondary="Маркетплейс товаров в Казахстане. Товары для туризма и путешествий"/>
                                                    </ListItem>
                                                </List>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>

                    </Grid>
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
            <Snackbar open={openS} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Вы стали участником похода.
                </Alert>
            </Snackbar>
            <Snackbar open={openL} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Вы больше не участник похода.
                </Alert>
            </Snackbar>
        </div>
    );
};
export default HikeDescription;