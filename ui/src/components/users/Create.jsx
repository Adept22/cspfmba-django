import React from 'react';
import { Form, redirect, useActionData } from "react-router-dom";
import { Box, Paper, Stack, FormControl, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

import TitledBox from '../common/TitledBox';

import EntityService from '../../services/EntityService';

export const action = async ({ request, params }) => {
    const formData = await request.formData();

    // TODO: Тут могла бы быть валидация

    try {
        const newUser = await EntityService.set('users', Object.fromEntries(formData));

        return redirect(`/users/${newUser.id}`);
    } catch (e) {
        return e.reason;
    }
}

const Create = () => {
    const errors = useActionData() ?? {};

    return (
        <TitledBox
            component={Paper}
            title="Новый пользователь"
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
                <FormControl fullWidth required error={'email' in errors}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        required
                        id="email"
                        name="email"
                        label="Email"
                        aria-describedby="email-helper-text"
                    />
                    <FormHelperText id="email-helper-text">{errors?.['email']}</FormHelperText>
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

export default Create;