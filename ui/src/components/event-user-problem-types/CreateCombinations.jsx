import React from 'react';
import { Form, redirect, useActionData } from "react-router-dom";
import { Box, Paper, Stack, FormControl, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

import { TitledBox, EntityField } from '../common';

import EntityService from '../../services/EntityService';

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
                    required
                    id="event"
                    entity="events"
                    optionLabel="name"
                    aria-describedby="event-helper-text"
                    TextFieldProps={{
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
                <FormControl fullWidth required error={'name' in errors}>
                    <InputLabel htmlFor="name">Название</InputLabel>
                    <OutlinedInput
                        required
                        id="name"
                        name="name"
                        label="Название"
                        aria-describedby="name-helper-text"
                    />
                    <FormHelperText id="name-helper-text">{errors?.['name']}</FormHelperText>
                </FormControl>
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