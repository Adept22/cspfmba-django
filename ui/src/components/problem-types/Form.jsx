import React from 'react';
import { Form as RouterForm, redirect, useActionData, useLoaderData } from "react-router-dom";
import { Box, Paper, Stack, FormControl, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

import { TitledBox } from '../common';

import EntityService from '../../services/EntityService';

export const loader = async ({ params }) => await EntityService.get('problem-types', { id: params.id });

export const action = async ({ request, params }) => {
    const formData = await request.formData();

    // TODO: Тут могла бы быть валидация

    try {
        await EntityService.set('problem-types', Object.fromEntries(formData));
    } catch (e) {
        return e.reason;
    }

    return redirect(`/problem-types`);
}

const Form = () => {
    const problemType = useLoaderData() ?? {};
    const errors = useActionData() ?? {};

    return (
        <TitledBox
            component={Paper}
            title="Тип проблемы"
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
                <input type="hidden" name="id" value={problemType.id} />
                <FormControl fullWidth required error={'name' in errors}>
                    <InputLabel htmlFor="name">Название</InputLabel>
                    <OutlinedInput
                        required
                        id="name"
                        name="name"
                        label="Название"
                        aria-describedby="name-helper-text"
                        value={problemType.name}
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

export default Form;