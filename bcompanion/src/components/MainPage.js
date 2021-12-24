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
    },
}));

const MainPage = (props) => {

    const classes = useStyles();
    return (

        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={5}
            >
                <Grid className={classes.grid}>
                    <Typography variant="h6">
                        {props.name ? "Добро пожаловать: " + props.name + ' ' + props.surname : 'Вы не авторизованы'}
                    </Typography>
                </Grid>

            </Grid>


        </div>
    );
};
export default MainPage;