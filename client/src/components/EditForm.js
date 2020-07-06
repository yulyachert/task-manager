import React from 'react';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField/TextField";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '25ch',
    },
    button: {
        margin: theme.spacing(1),
        width: 200,
        marginTop: 40
    },
    input: {
        width: '80%',
        marginTop: 20,
    },
}));

async function editTask(taskName, status, id) {
    const response = await axios.patch(`http://localhost:3000/api/tasks/edit/${id}`,
        {
            title: taskName,
            completed: status
        });
    return response.data;
}

const validationSchema = Yup.object({
    taskName: Yup.string()
        .max(30, 'Не должно превышать 30 символов')
        .required('Обязательное поле'),
    status: Yup.string()
        .required('Обязательное поле'),
});

export const EditForm = (props) => {
    const classes = useStyles();

    return (
        <div>
            <h1>Изменить задачу</h1>
            <Formik
                initialValues={{
                    taskName: '',
                    status: 'false',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await editTask(values.taskName, values.status, props.match.params.id)
                }}
            >
                {props => (
                    <Card>
                        <form onSubmit={props.handleSubmit}>
                            <CardContent className={'form_input'}>
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
                                        startIcon={<SaveIcon/>}>Изменить</Button>
                            </CardContent>
                        </form>

                    </Card>
                )}
            </Formik>
        </div>
    )
};