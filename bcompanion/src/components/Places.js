import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {Link, Route, useRouteMatch} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios"
import CircularProgress from "@material-ui/core/CircularProgress";


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
        color: '#000',
    },
}));

const URL = "/places";

const Places = (props) => {

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPlacesFunction = async () => {
        try {
            const data = await axios
                .get("https://stormy-escarpment-89406.herokuapp.com/cities")
                .then(response => {
                    setCities(response.data);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getPlacesFunction();
    }, [])

    /*useEffect( () => {
        axios.get("https://stormy-escarpment-89406.herokuapp.com/cities")
            .then(response => {
                setCities(response.data);
            })
    }, []);*/

    const classes = useStyles();
    return (

        <div>
            {loading ?
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={5}
                >
                    {cities && cities.map((city, index) =>
                        <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                            <Link to={`${URL}/${city.cityName}`} className={classes.link}>

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={city.cityPhoto}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {city.cityName}
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
                    <CircularProgress className={classes.loader}/>
                </Grid>
            }


        </div>
    );
};
export default Places;