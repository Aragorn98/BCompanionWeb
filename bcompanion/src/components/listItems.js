import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HelpIcon from '@material-ui/icons/Help';
import {NavLink} from "react-router-dom";


export const mainListItems = (
    <div>
        <NavLink to="/places" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Места"/>
            </ListItem>
        </NavLink>
        <NavLink to="/groupsByUser" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Мои группы"/>
            </ListItem>
        </NavLink>
        <NavLink to="/groups" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Все группы"/>
            </ListItem>
        </NavLink>
        <NavLink to="/hikesByUser" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <FilterHdrIcon/>
                </ListItemIcon>
                <ListItemText primary="Мои походы"/>
            </ListItem>
        </NavLink>
        <NavLink to="/hikes" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <MapIcon/>
                </ListItemIcon>
                <ListItemText primary=" Все походы"/>
            </ListItem>
        </NavLink>
        <a href="https://www.kazatk.kz/support.html" style={{ textDecoration: 'none', color: 'black' }} activeStyle={{color: '#6DC068'}}>
            <ListItem button>
                <ListItemIcon>
                    <HelpIcon/>
                </ListItemIcon>
                <ListItemText primary="Поддержка"/>
            </ListItem>
        </a>

    </div>
);

