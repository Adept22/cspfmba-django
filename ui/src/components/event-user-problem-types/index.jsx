import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { Divider, IconButton, Paper, Stack, Tooltip } from '@mui/material';

import TitledBox from '../common/TitledBox';

import { AddIcon } from '../../icon';
import EntityService from '../../services/EntityService';

import EventUserProblemTypeListItem from './list-item';

export const loader = async () => await EntityService.get('event-user-problem-types');

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
                        title="Пригласить" 
                        placement="top" 
                        arrow
                    >
                        <IconButton
                            component={Link}
                            id={`monitoring-entity-add-button`}
                            color="primary"
                            aria-label="Пригласить"
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
                {eventUserProblemTypes.map((eupt, i) => <EventUserProblemTypeListItem key={eupt?.id ?? i} index={i} {...eupt} />)}
            </Stack>
        </TitledBox>
    )
};

export default EventUserProblemTypes;