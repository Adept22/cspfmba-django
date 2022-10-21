import React from 'react';
import { Form as RouterForm, redirect, useActionData, useLoaderData } from "react-router-dom";
import { Box, Paper, Stack, Button } from '@mui/material';

import { TitledBox, EntityField } from '../common';

import EntityService from '../../services/EntityService';

export const loader = async ({ params }) => await EntityService.get('event-user-problem-types', { id: params.id });

export const action = async ({ request }) => {
    const formData = await request.formData();

    // TODO: Тут могла бы быть валидация

    try {
        await EntityService.set('event-user-problem-types', Object.fromEntries(formData));
    } catch (e) {
        return e.reason;
    }

    return redirect(`/event-user-problem-types`);
}

const Form = () => {
    const eupt = useLoaderData() ?? {};
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
                component={RouterForm}
                method="post"
                sx={{ width: '600px', py: 2 }}
            >
                <input type="hidden" name="id" value={eupt.id} />
                <EntityField
                    id="event"
                    name="event"
                    type="events"
                    optionLabel="name"
                    value={eupt.event}
                    TextFieldProps={{
                        required: true,
                        label: "Событие",
                        error: 'event' in errors,
                        helperText: errors?.['event'],
                        sx: { mb: 2 },
                    }}
                    ControlProps={{
                        fullWidth: true,
                        required: true
                    }}
                />
                <EntityField
                    id="user"
                    name="user"
                    type="users"
                    optionLabel="email"
                    value={eupt.user}
                    TextFieldProps={{
                        required: true,
                        label: "Пользователь",
                        error: 'user' in errors,
                        helperText: errors?.['user'],
                        sx: { mb: 2 },
                    }}
                    ControlProps={{
                        fullWidth: true,
                        required: true
                    }}
                />
                <EntityField
                    id="problem-type"
                    name="problem_type"
                    type="problem-types"
                    optionLabel="name"
                    value={eupt.problem_type}
                    TextFieldProps={{
                        required: true,
                        label: "Тип проблемы",
                        error: 'problem_type' in errors,
                        helperText: errors?.['problem_type'],
                        sx: { mb: 2 },
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

export default Form;