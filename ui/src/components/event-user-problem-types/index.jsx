import React from 'react';
import { Form, Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { Avatar, ButtonBase, Card, CardHeader, Divider, MenuItem, Paper, Skeleton, Stack, Tooltip } from '@mui/material';

import TitledBox from '../common/TitledBox';
import OptionsButton from '../common/OptionsButton';

import EntityService from '../../services/EntityService';

import { AddIcon } from '../../icon';
import { stringAvatar } from '../../utils'

export const loader = async () => await EntityService.get('event-user-problem-types');

const ListItem = ({ id, index, name }) => {
    name = name ?? `Связь ${index + 1}`;

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    name
                        ? <Avatar {...stringAvatar(name)} />
                        : <Skeleton variant="circular" animation="wave" width="40px" height="40px" />
                }
                action={
                    <OptionsButton id={`event-user-problem-type-${id}`}>
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

const EventUserProblemTypes = () => {
    const eventUserProblemTypes = useLoaderData();

    return (
        <TitledBox 
            component={Paper}
            title="Связи"
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
                        <OptionsButton
                            id="eupt-add-button"
                            icon={<AddIcon />}
                            IconButtonProps={{
                                "aria-label": "Добавить"
                            }}
                        >
                            <MenuItem component={Link} to="create-single">Одиночные</MenuItem>
                            <MenuItem component={Link} to="create-combinations">Комбинации</MenuItem>
                        </OptionsButton>
                    </Tooltip>
                </Stack>
            }
        >
            <Stack direction="column" spacing={1}>
                {eventUserProblemTypes.map((eupt, i) => <ListItem key={eupt?.id ?? i} index={i} {...eupt} />)}
            </Stack>
        </TitledBox>
    )
};

export default EventUserProblemTypes;