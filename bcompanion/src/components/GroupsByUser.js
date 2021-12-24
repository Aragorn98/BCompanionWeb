import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link, Route, useRouteMatch, useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {WhereToVote} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 140,
    },
    grid: {
        padding: 10,
    },
    link: {
        textDecoration: "none",
        color: '#000'
    }
}));

const URL = "/groupDescription";

const Groups = (props) => {
    const [groupsByUser, setGroupsByUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const USER_TOKEN = localStorage.getItem('token').split('"').join('');
    const getGroupsByUser = async () => {
        try {
            const data = await axios.get("https://stormy-escarpment-89406.herokuapp.com/groups/getByUser",
                // { crossdomain: true },
                {headers: {'Authorization': USER_TOKEN}},
            )
                .then(response => {
                    setGroupsByUser(response.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getGroupsByUser()
    }, []);


    const classes = useStyles();
    if (!(groupsByUser)) {
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
                            <Typography variant='h6'>Вы не состоите в группах</Typography>
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
            </div>
        );
    } else {
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
                            {groupsByUser && groupsByUser.map((group, index) =>
                                <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                                    <Link to={`${URL}/${group.groupName}`} className={classes.link}>

                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="140"
                                                    image={group.groupPhoto}
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {group.groupName}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Количество участников: {group.numberOfMembers}
                                                        <Divider/>
                                                        Совершено походов: {group.numberOfHikes}
                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>

                                </Grid>)}
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
            </div>
        );
    }

};
export default Groups;