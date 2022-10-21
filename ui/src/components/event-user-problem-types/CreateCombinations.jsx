import React from 'react';
import { Form, redirect, useActionData } from "react-router-dom";
import { Box, Paper, Stack, Button } from '@mui/material';

import { TitledBox, EntityField } from '../common';

import EntityService from '../../services/EntityService';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    data.event = data.event?.split(';');
    data.user = data.user?.split(';');
    data.problem_type = data.problem_type?.split(';');
    
    const entities = data.event.map(e => 
        data.user.map(u => 
            data.problem_type.map(pt => 
                ({event: e, user: u, problem_type: pt})
            )
        ).flat()
    ).flat();

    // TODO: Тут могла бы быть валидация

    try {
        await EntityService.set('event-user-problem-types', entities);
    } catch (e) {
        return e.reason;
    }

    return redirect(`/event-user-problem-types`);
}

const CreateCombinations = () => {
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
                    name="event"
                    type="events"
                    optionLabel="name"
                    multiple
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
                    multiple
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
                    id="problem_type"
                    name="problem_type"
                    type="problem-types"
                    optionLabel="name"
                    multiple
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

export default CreateCombinations;