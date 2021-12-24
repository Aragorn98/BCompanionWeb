import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios"
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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

const URL = "/hikeDescription";

const Groups = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [upcomingHikesByUser, setUpcomingHikesByUser] = useState([]);
    const [pastHikesByUser, setPastHikesByUser] = useState([]);

    const [loading, setLoading] = useState(false);
    const USER_TOKEN = localStorage.getItem('token').split('"').join('');
    const getUpcomingHikesByUser = async () => {
        try {
            const data = await axios.get("https://stormy-escarpment-89406.herokuapp.com/hikes/getUpcomingByUser",
                {headers: {Authorization: USER_TOKEN}}
            )
                .then(response => {
                    setUpcomingHikesByUser(response.data);
                });
            setLoading(true);
        } catch (e) {
            setLoading(true);
            console.log(e);
        }
    }
    const getPastHikesByUser = async () => {
        try {
            const data = await axios.get("https://stormy-escarpment-89406.herokuapp.com/hikes/getPastByUser",
                {headers: {Authorization: USER_TOKEN}}
            )
                .then(response => {
                    setPastHikesByUser(response.data);
                });
            setLoading(true);

        } catch (e) {
            setLoading(true);
            console.log(e);
        }
    }

    useEffect(() => {
        getUpcomingHikesByUser();
        getPastHikesByUser()
    }, []);

    return (
        <div>
            {
                loading ?
                    <TabContext value={value}>
                        <AppBar position="static">
                            <TabList onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Предстоящие" value="1"/>
                                <Tab label="Прошлые" value="2"/>
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                spacing={5}
                            >
                                {upcomingHikesByUser && upcomingHikesByUser.map((hike, index) =>
                                    <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                                        <Link to={`${URL}/${hike.hikeId}`} className={classes.link}>

                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={hike.hikePhoto}
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {hike.placeName}
                                                        </Typography>

                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>

                                    </Grid>)}
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                spacing={5}
                            >
                                {pastHikesByUser && pastHikesByUser.map((hike, index) =>
                                    <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="140"
                                                    image={hike.groupPhoto}
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {hike.placeName}
                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Link to={`${URL}/${hike.hikeId}`} className={classes.link}>
                                                    <Button variant="contained" color="primary" size="small">
                                                        Выбрать
                                                    </Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    </Grid>)}
                            </Grid>
                        </TabPanel>
                    </TabContext>
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


};
export default Groups;