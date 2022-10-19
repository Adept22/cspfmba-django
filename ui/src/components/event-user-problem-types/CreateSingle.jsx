import React from 'react';
import { Form, redirect, useActionData } from "react-router-dom";
import { Box, Paper, Stack, FormControl, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

import TitledBox from '../common/TitledBox';

import EntityService from '../../services/EntityService';
import EntityField from '../common/EntityField';

export const action = async ({ request, params }) => {
    const formData = await request.formData();

    // TODO: Тут могла бы быть валидация

    try {
        const newEventUserProblemType = await EntityService.set('event-user-problem-types', Object.fromEntries(formData));

        return redirect(`/event-user-problem-types/${newEventUserProblemType.id}`);
    } catch (e) {
        return e.reason;
    }
}

const CreateSingle = () => {
    const errors = useActionData() ?? {};

    return (
        <TitledBox
            component={Paper}
            title="Новая связь"
            sx={{ px: 2, width: '100%', height: '100%' }}
            contentProps={{
                component: Stack,
                sx: {
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }
            }}
        >
            <Box
                component={Form}
                method="post"
                sx={{ width: '600px', py: 2 }}
            >
                <EntityField
                    id="event"
                    entity="events"
                    optionLabel="name"
                    TextFieldProps={{
                        required: true,
                        name: "event",
                        label: "Событие",
                        error: 'event' in errors,
                        helperText: errors?.['event'],
                        sx: { mb: 2 }
                    }}
                    ControlProps={{
                        fullWidth: true,
                        required: true
                    }}
                />
                <EntityField
                    id="user"
                    entity="users"
                    optionLabel="email"
                    TextFieldProps={{
                        required: true,
                        name: "user",
                        label: "Пользователь",
                        error: 'user' in errors,
                        helperText: errors?.['user'],
                        sx: { mb: 2 }
                    }}
                    ControlProps={{
                        fullWidth: true,
                        required: true
                    }}
                />
                <EntityField
                    id="problem-type"
                    entity="problem-types"
                    optionLabel="name"
                    TextFieldProps={{
                        required: true,
                        name: "problem-type",
                        label: "Тип проблемы",
                        error: 'problem-type' in errors,
                        helperText: errors?.['problem-type'],
                        sx: { mb: 2 }
                    }}
                    ControlProps={{
                        fullWidth: true,
                        required: true
                    }}
                />
                <Button
                    type="submit"
                    margin="normal"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ py: 2, my: 2 }}
                >
                    Сохранить
                </Button>
            </Box>
        </TitledBox>
    );
};

export default CreateSingle;