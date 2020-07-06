import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {useDispatch} from "react-redux";
import {useSelector} from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';

import "./Table.css";
import {createSelector} from 'reselect'
import {deleteTask, fetchTasks, filterTaskByStatus, filterTaskByUserName} from "../actions/TasksActions";

const useStyles = makeStyles({
    root: {
        width: '80%'
    },
    container: {
        maxHeight: 600,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
    },
    checkboxes: {
        paddingLeft: 40,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 40,
        width: '100%'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        fontSize: 50,
    }
});

function getSortedByNameTasks(name, tasks) {
    if (name === '') {
        return tasks;
    }
    return tasks.filter((task) => task.user.name.toLowerCase().includes(name.toLowerCase()));
}

function getSortedByCompeteTasks(done, undone, tasks) {
    if (done && undone || !(done || undone)) {
        return tasks;
    } else if (done && !undone) {
        return tasks.filter((task) => task.completed === 'true');
    } else if (!done && undone) {
        return tasks.filter((task) => task.completed === 'false');
    }

}

export const CurrentTable = () => {
    const classes = useStyles();

    const doneChecked = useSelector(
        state => state.TasksFilterByStatus
    );

    const userName = useSelector(
        state => state.TasksFilterByUserName
    );

    const selectTasks = createSelector(
        state => state.TasksReducer,
        tasks => {
            tasks = getSortedByCompeteTasks(doneChecked.done, doneChecked.undone, tasks);
            return getSortedByNameTasks(userName, tasks)
        }
    );

    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchTasks()(dispatch);
    }, []);

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{`${tasks.length} tasks`}</title>
            </Helmet>
            <div className={'tasks_title'}>
                <FormGroup row className={classes.checkboxes}>
                    <FormControlLabel
                        control={<Checkbox
                            checked={doneChecked.done}
                            onChange={() => {
                                dispatch(filterTaskByStatus({
                                    done: !doneChecked.done,
                                    undone: doneChecked.undone
                                }));
                            }}
                            name="done"
                            color="primary"
                        />
                        }
                        label="Выполненные задачи"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={doneChecked.undone}
                                onChange={() => {
                                    dispatch(filterTaskByStatus({
                                        done: doneChecked.done,
                                        undone: !doneChecked.undone
                                    }));
                                }}
                                name="undone"
                                color="primary"
                            />
                        }
                        label="Невыполненные задачи"
                    />
                </FormGroup>
                <TextField id="standard-basic" label="Исполнитель"
                           value={userName}
                           onChange={(e) => {
                               const value = e.target.value.toLowerCase();
                               dispatch(filterTaskByUserName(value));
                           }}/>
                <IconButton>
                    <Link to={'/create'} className={classes.link}>
                        <AddBoxIcon className={classes.icon}/>
                    </Link>
                </IconButton>
            </div>
            <Paper>
                <TableContainer className={classes.container} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right" className={classes.title}> </TableCell>
                                <TableCell align="right" className={classes.title}> </TableCell>
                                <TableCell align="right" className={classes.title}>Статус задачи</TableCell>
                                <TableCell align="right" className={classes.title}>Исполнитель</TableCell>
                                <TableCell align="right" className={classes.title}>Название задачи</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell align="center">
                                        <IconButton>
                                            <Link to={`/edit/${task.id}`} className={classes.link}>
                                                <EditIcon/>
                                            </Link>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => deleteTask(task.id)(dispatch)} aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">{
                                        task.completed === 'true' ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link to={`/user/${task.user.id}`} className={classes.link}>
                                            {task.user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{task.title}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};