import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {Link, useRouteMatch} from "react-router-dom";
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
    }
}));

const URL = "/placeDescription";

const PlacesByCity = (props) => {

    const match = useRouteMatch('/places/:cityName');

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPlaceFunction = async () => {
        try {
            const data = await axios
                .get(`https://stormy-escarpment-89406.herokuapp.com/places/byCity?city_name=${match.params.cityName}`)
                .then(response => {
                    setPlaces(response.data);
                })
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getPlaceFunction();
    }, [])
    /* useEffect( () => {
         axios.get(`https://stormy-escarpment-89406.herokuapp.com/places/byCity?city_name=${match.params.cityName}`)
             .then(response => {
                 setPlaces(response.data);
             })
     }, []);*/

    const classes = useStyles();
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
                        {places && places.map((place, index) =>
                            <Grid className={classes.grid} item xs={12} md={8} lg={5}>
                                <Link to={`${URL}/${place.placeName}`} className={classes.link}>

                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt={place.placeName}
                                                height="140"
                                                image={place.placePhoto}
                                                title={place.placeName}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {place.placeName}
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
                    </Grid>}
        </div>
    );
};
export default PlacesByCity;