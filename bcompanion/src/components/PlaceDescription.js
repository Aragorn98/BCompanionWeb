import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link, Route, useRouteMatch, useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios"
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CircularProgress from "@material-ui/core/CircularProgress";
import DescriptionIcon from '@material-ui/icons/Description';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {green} from "@material-ui/core/colors";
import CommuteIcon from '@material-ui/icons/Commute';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import CloudIcon from '@material-ui/icons/Cloud';
import CardMedia from "@material-ui/core/CardMedia";
import InfoIcon from '@material-ui/icons/Info';

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
    link: {
        textDecoration: "none",
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: "white",
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    cover: {
        width: 151,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
}));


const PlaceDescription = (props) => {
    const match = useRouteMatch('/placeDescription/:placeName');

    const [placeDescription, setPlaceDescription] = useState([]);
    const [loading, setLoading] = useState(false);
    const [placeExtraDescription, setExtraPlaceDescription] = useState([]);
    const [placeWeatherForWeek, setPlaceWeatherForWeek] = useState([]);

    const getPlaceDescription = async () => {
        try {
            const data = await axios
                .get(`https://stormy-escarpment-89406.herokuapp.com/placeDescription?place_name=${match.params.placeName}`)
                .then(response => {
                    setPlaceDescription(response.data);
                })
                .catch(function (error) {
                    console.log('No place description');
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }
    const getExtraPlaceDescription = async () => {
        try {
            const data = await axios
                .get(`https://stormy-escarpment-89406.herokuapp.com/placeRoute?place_name=${match.params.placeName}`)
                .then(response => {
                    setExtraPlaceDescription(response.data);
                })
                .catch(function (error) {
                    console.log('No Extra place description');
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }
    const getPlaceWeatherForWeek = async () => {
        try {
            const data = await axios
                .get(`https://stormy-escarpment-89406.herokuapp.com/weather/week?place_name=${match.params.placeName}`)
                .then(response => {
                    setPlaceWeatherForWeek(response.data);
                })
                .catch(function (error) {
                    console.log('No weather info for place');
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPlaceDescription();
        getExtraPlaceDescription();
        getPlaceWeatherForWeek();
    }, []);
    /* useEffect(() => {
         axios.get(`https://stormy-escarpment-89406.herokuapp.com/placeDescription?place_name=${match.params.placeName}`)
             .then(response => {
                 setPlaceDescription(response.data);
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
                        <Grid item xs={12} md={12} lg={12}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <GridList className={classes.gridList} cols={2.5}>

                                        {
                                            placeDescription && placeDescription.placePhotos && placeDescription.placePhotos.split(',').map((url, index) =>

                                                <GridListTile>
                                                    <img src={url} alt={match.params.placeName}/>
                                                </GridListTile>
                                            )
                                        }
                                    </GridList>


                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {match.params.placeName}
                                        </Typography>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <DescriptionIcon style={{color: green[500], marginRight: 10}}/>
                                                <Typography className={classes.heading}> Описание места</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    {placeDescription.placeDescription}
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <CommuteIcon style={{color: green[500], marginRight: 10}}/>
                                                <Typography className={classes.heading}> Как доехать на
                                                    транспорте</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    {placeExtraDescription ? placeExtraDescription.routeByCarText : 'Информация отсутствует'}
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <DirectionsWalkIcon style={{color: green[500], marginRight: 10}}/>
                                                <Typography className={classes.heading}> Как дойти пешком</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    {placeExtraDescription ? placeExtraDescription.routeByWalkingText : 'Информация отсутствует'}

                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <CloudIcon style={{color: green[500], marginRight: 10}}/>
                                                <Typography className={classes.heading}> Погода на ближайшую
                                                    неделю</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="flex-start"
                                                    spacing={2}
                                                >
                                                    {placeWeatherForWeek && placeWeatherForWeek.map((weather,) =>
                                                        <Grid item xs={6} md={3} lg={3}>
                                                            <Card className={classes.root}>
                                                                <CardActionArea>
                                                                    <CardMedia
                                                                        component="img"
                                                                        alt={weather.placeName}
                                                                        style={{height: 50, width: 50, marginLeft: 15, marginTop: 5}}
                                                                        image={weather.image}
                                                                        title={weather.placeName}
                                                                    />
                                                                    <CardContent style={{backgroundColor: '#6DC068'}}>
                                                                        <Typography variant="body2" component="p">
                                                                        {weather.date} | {weather.day}
                                                                        </Typography>
                                                                        <Typography variant="body2" style={{color: '#fff'}} component="p">
                                                                            Днем: {weather.dayDegree}
                                                                        </Typography>
                                                                        <Typography variant="body2" style={{color: '#fff'}} component="p">
                                                                            Ночью: {weather.nightDegree}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </CardActionArea>

                                                            </Card>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <InfoIcon style={{color: green[500], marginRight: 10}}/>
                                                <Typography className={classes.heading}> Советы</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    <b>Правила похода:</b> <br/>
                                                    Быть ВО время;<br/>
                                                    Не обгонять проводника, есть риск пойти не туда и потеряться;<br/>
                                                    Не забудьте море горячего чая и рюкзаки с вкусной едой<br/>
                                                    Держаться рядом с группой, не отходить от группы в одиночку;<br/>
                                                    Придерживаться предложенного плана;<br/>
                                                    Быть вовремя на месте встречи<br/>
                                                    <br/><b>Как одеваться:</b><br/>
                                                    Если на улице зима то одевайтесь потеплее: теплая куртка, зимние ботинки, теплые штанишки, шапка, перчатки, свитер.
                                                    обувь желательно иметь приспособленную к горам, т.е. не промокающую и с плотной подошвой, зимнюю обувь (трекинговые ботинки)
                                                    теплая куртка и штаны;<br/>
                                                    головной убор и перчатки;<br/>
                                                    Гамаши (фонарики/бахилы), солнцезащитные очки;<br/>
                                                    А если погода теплая то:<br/>
                                                    +Легкая толстовка;<br/>
                                                    + кроссовки или ботинки<br/>
                                                    + Обязательно ГОЛОВНОЙ убор;
                                                    <br/>
                                                    <br/><b>Варианты по питанию:</b><br/>
                                                    Термос с чаем;<br/>
                                                    1 л. питьевой воды;<br/>
                                                    Бутерброды, по возможности – любые другие вкусности.<br/>
                                                    <br/><b>По медикаментам:</b><br/>
                                                    Обезболивающие средства; необходимое именно Вам лекарство (например, от аллергии);<br/>
                                                    <br/><b>Дополнительно</b><br/>
                                                    +крем от загара;<br/>
                                                    +СПРЕЙ ОТ КЛЕЩЕЙ;<br/>
                                                    +солнцезащитные очки;<br/>
                                                    +запасные носки и кофта;<br/>
                                                    Не забывай что мы идём тусить в Горы<br/>
                                                    <b>По питанию🌭:</b><br/>
                                                    +термос с чаем;<br/>
                                                    +вода;<br/>
                                                    +бутерброды;<br/>
                                                    +шоколад и фрукты, и все что душе угодно;<br/>
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </CardContent>
                                </CardActionArea>
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
                        <CircularProgress className={classes.loader}/>
                    </Grid>
            }
        </div>
    );
};
export default PlaceDescription;