import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { Divider, IconButton, Paper, Stack, Tooltip } from '@mui/material';

import TitledBox from '../../components/common/TitledBox';

import { AddIcon } from '../../icon';
import EntityService from '../../services/EntityService';

import EventsListItem from './list-item';

export const loader = async () => await EntityService.get('events');

const Events = () => {
    const events = useLoaderData();

    return (
        <TitledBox
            component={Paper}
            title="События"
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
                            id={`event-add-button`}
                            color="primary"
                            aria-label="Добавить"
                            aria-haspopup="true"
                            to="new"
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            }
        >
            <Stack direction="column" spacing={1}>
                {events.map((event, i) => <EventsListItem key={event?.id ?? i} index={i} {...event} />)}
            </Stack>
        </TitledBox>
    )
};

export default Events;