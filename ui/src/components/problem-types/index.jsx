import React from 'react';
import { Form, Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { Avatar, ButtonBase, Card, CardHeader, Divider, IconButton, MenuItem, Paper, Skeleton, Stack, Tooltip } from '@mui/material';

import TitledBox from '../common/TitledBox';
import OptionsButton from '../common/OptionsButton';

import EntityService from '../../services/EntityService';

import { AddIcon } from '../../icon';
import { stringAvatar } from '../../utils'

export const loader = async () => await EntityService.get('problem-types');

const ListItem = ({ id, index, name }) => {
    name = name ?? `Тип проблемы ${index + 1}`;

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    name
                        ? <Avatar {...stringAvatar(name)} />
                        : <Skeleton variant="circular" animation="wave" width="40px" height="40px" />
                }
                action={
                    <OptionsButton id={`problem-type-${id}`}>
                        <MenuItem>
                            Изменить
                        </MenuItem>
                        <Form
                            method="post"
                            action={`${id}/delete`}
                            onSubmit={e => e.preventDefault()}
                        >
                            <MenuItem component={ButtonBase} type="submit" sx={{ width: '100%' }}>
                                Удалить
                            </MenuItem>
                        </Form>
                    </OptionsButton>
                }
                title={name ?? <Skeleton variant="text" animation="wave" width="200px" height="100%" />}
                subheader={<Skeleton variant="text" animation="wave" width="130px" height="100%" />}
            />
        </Card>
    )
}

const ProblemTypes = () => {
    const problemTypes = useLoaderData();

    return (
        <TitledBox 
            component={Paper}
            title="Типы проблем"
            sx={{ height: "100%" }}
            toolbar={
                <Stack
                    spacing={2}
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: '100%' }}
                >
                    <Tooltip 
                        title="Добавить" 
                        placement="top" 
                        arrow
                    >
                        <IconButton
                            component={Link}
                            id={`problem-types-add-button`}
                            color="primary"
                            aria-label="Добавить"
                            aria-haspopup="true"
                            to="create"
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            }
        >
            <Stack direction="column" spacing={1}>
                {problemTypes.map((problemType, i) => <ListItem key={problemType?.id ?? i} index={i} {...problemType} />)}
            </Stack>
        </TitledBox>
    )
};

export default ProblemTypes;