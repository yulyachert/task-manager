import React from 'react';
import {Link} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
        width: '100%',
    },
    title: {
        marginTop: theme.spacing(2),
    },
    bar: {
        height: 100
    },
    icon: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        fontSize: 75,
        color: 'inherit'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} position="static">
                <Toolbar variant="dense">
                    <IconButton>
                        <Link className={classes.link} to={'/'}>
                            <ListAltIcon edge="start" className={classes.icon} color="inherit" aria-label="menu"/>
                        </Link>
                    </IconButton>
                    <Typography className={classes.title} variant="h3" color="inherit">
                        Список задач
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};