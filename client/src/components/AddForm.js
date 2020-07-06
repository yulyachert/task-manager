import React, {useEffect} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import "./AddForm.css";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {makeStyles} from '@material-ui/core/styles';

import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "../actions/TasksActions";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
        width: 200,
        marginTop: 40
    },
    input: {
        width: '80%',
        marginTop: 20,
    }
}));

function filterTasksByName(tasks) {
    let filterTasks = [];
    for (const task of tasks) {
        if (!filterTasks.includes(task.user.name)) {
            filterTasks[task.user.id] = task.user.name;
        }
    }

    return filterTasks;
};

async function createTask(userId, taskName, status) {
    const response = await axios.post('http://localhost:3000/api/tasks/create',
        {
            userId: userId,
            title: taskName,
            completed: status
        });
    return response.data;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .max(30, 'Не должно превышать 30 символов')
        .required('Обязательное поле'),
    taskName: Yup.string()
        .max(30, 'Не должно превышать 30 символов')
        .required('Обязательное поле'),
    status: Yup.string()
        .required('Обязательное поле'),
});

export const AddForm = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const tasks = useSelector(
        state => state.TasksReducer
    );

    useEffect(() => {
        fetchTasks()(dispatch);
    }, []);

    return (
        <div>
            <h1>Добавить задачу</h1>
            <Formik
                initialValues={{
                    name: '',
                    taskName: '',
                    status: 'false',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await createTask(values.name, values.taskName, values.status)
                }}
            >
                {props => (
                    <Card>
                        <form onSubmit={props.handleSubmit}>
                            <CardContent className={'form_input'}>
                                <InputLabel id="name">Имя пользователя</InputLabel>
                                <Select
                                    className={classes.input}
                                    labelId="name"
                                    onChange={props.handleChange}
                                    input={<Input />}
                                    onBlur={props.handleBlur}
                                    name="name"
                                >{
                                    filterTasksByName(tasks).map((name) => (
                                    <MenuItem
                                        key={filterTasksByName(tasks).indexOf(name)}
                                        value={filterTasksByName(tasks).indexOf(name)}>
                                        {name}
                                    </MenuItem>
                                ))}
                                </Select>
                                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    label="Название задачи"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.taskName}
                                    name="taskName"
                                />
                                {props.errors.taskName && <div id="feedback">{props.errors.taskName}</div>}
                                <FormControlLabel
                                    className={classes.input}
                                    control={<Checkbox
                                        onChange={() => props.values.status = props.values.status === 'false' ? 'true' : 'false'}
                                        onBlur={props.handleBlur}
                                        value={props.values.status}
                                        name="status"
                                    />}
                                    label="Нажми, если задача сделана"
                                />
                                {props.errors.status && <div id="feedback">{props.errors.status}</div>}
                                <Button variant="contained" color="primary" className={classes.button} type="submit"
                                        startIcon={<SaveIcon/>}>Submit</Button>
                            </CardContent>
                        </form>
                    </Card>
                )}
            </Formik>
        </div>
    )
};