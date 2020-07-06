import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '80%',
        marginTop: 20,
        height: 600

    },
    title: {
        fontSize: 20
    }
});

async function getTasksOfUser(id) {
    const response = await axios.get(`http://localhost:3000/api/tasks/user/${id}`);
    return response.data;
}

export const UserTasksList = (props) => {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        getTasksOfUser(props.match.params.id)
            .then(tasks => setTasks(tasks));
    }, []);

    return (
        <TableContainer className={classes.root} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.title} align="left">Задача</TableCell>
                        <TableCell className={classes.title} align="left">Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell align="left">{task.title}</TableCell>
                            <TableCell align="left">{
                                task.completed === 'true' ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};