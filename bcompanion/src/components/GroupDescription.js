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


const GroupDescription = (props) => {

    const match = useRouteMatch('/groupDescription/:groupName');

    const [groupDescription, setGroupDescription] = useState([]);
    const [loading, setLoading] = useState(false);
    const [joined, setJoined] = useState(false);

    const getGroupDescription = async () => {
        const data = await axios
            .get(`https://stormy-escarpment-89406.herokuapp.com/groups/getGroup?group_name=${match.params.groupName}`)
            .then(response => {
                setGroupDescription(response.data);
                for (let i = 0; i < response.data.members.length; i++) {
                    let data = response.data.members[i].phoneNumber;
                    if (data === localStorage.getItem('phoneNum').split('%2B').join('+')) {
                        setJoined(true);
                        break;
                    }
                }
                console.log(joined);
            })
        setLoading(true);
    }

    useEffect(() => {
        getGroupDescription();
    }, []);
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const USER_TOKEN = localStorage.getItem('token').split('"').join('');

    const leaveGroup = async () => {
        try {
            const data = await axios.post(`https://stormy-escarpment-89406.herokuapp.com/groups/leaveGroup?group_name=${match.params.groupName}`,
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
    const joinGroup = async () => {
        try {
            const data = await axios.post(`https://stormy-escarpment-89406.herokuapp.com/groups/joinGroup?group_name=${match.params.groupName}`,
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

    const handleJoinGroup = () => {
        setOpenS(true);
        console.log(USER_TOKEN);
        joinGroup();
    };
    const handleLeaveGroup = () => {
        setOpenL(true);
        console.log(USER_TOKEN);
        leaveGroup();
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
                                    title={groupDescription.groupName}
                                    subheader={`Количество походов: ${groupDescription.numberOfHikes}`}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={groupDescription.groupPhoto}
                                    title={groupDescription.groupName}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {groupDescription.groupDescription}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <a style={{color: "grey"}}
                                           href={`https://${groupDescription.groupLinks}`}>Instagram</a>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {/*<a style={{color: "grey"}} href={`https://wa.me/${groupDescription.admins[0].split('+').join('')}`}>Связь с администратором</a>*/}
                                        Админ: {groupDescription.admins[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/*<IconButton aria-label="add to favorites">*/}
                                    {/*    <FavoriteIcon/>*/}
                                    {/*</IconButton>*/}


                                    {
                                        joined ? <IconButton aria-label="leave">
                                                <ExitToAppIcon onClick={handleLeaveGroup}/>
                                            </IconButton>
                                            :
                                            <IconButton aria-label="join">
                                                <AddCircleIcon onClick={handleJoinGroup}/>
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
                                                    {groupDescription && groupDescription.members && groupDescription.members
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
                                                <DirectionsWalkIcon style={{color: green[500]}}/>
                                                <Typography className={classes.heading}> История походов</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="flex-start"
                                                    spacing={5}
                                                >
                                                    {groupDescription && groupDescription.hikesHistory && groupDescription.hikesHistory.map((hike, index) =>

                                                        <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                                                            <Link to={`/hikeDescription/${hike.hikeId}`}
                                                                  className={classes.link}>
                                                                <Card>
                                                                    <CardActionArea>
                                                                        <CardMedia
                                                                            component="img"
                                                                            alt="Contemplative Reptile"
                                                                            height="140"
                                                                            image={hike.hikePhoto}
                                                                            title="Contemplative Reptile"
                                                                        />
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5"
                                                                                        component="h2">
                                                                                {hike.placeName}
                                                                            </Typography>
                                                                            <Typography variant="body2"
                                                                                        color="textSecondary"
                                                                                        component="p">
                                                                                {hike.startDate + " - " + hike.endDate}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </CardActionArea>
                                                                </Card>
                                                            </Link>
                                                        </Grid>
                                                    )}
                                                </Grid>
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
                    Вы вступили в группу!
                </Alert>
            </Snackbar>
            <Snackbar open={openL} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Вы покинули группу!
                </Alert>
            </Snackbar>
        </div>
    );
};
export default GroupDescription;