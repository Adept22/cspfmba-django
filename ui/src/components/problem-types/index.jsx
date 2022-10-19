import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { Divider, IconButton, Paper, Stack, Tooltip } from '@mui/material';

import TitledBox from '../common/TitledBox';

import { AddIcon } from '../../icon';
import EntityService from '../../services/EntityService';

import ProblemTypeListItem from './list-item';

export const loader = async () => await EntityService.get('problem-types');

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
                            id={`problem-type-add-button`}
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
                {problemTypes.map((problemType, i) => <ProblemTypeListItem key={problemType?.id ?? i} index={i} {...problemType} />)}
            </Stack>
        </TitledBox>
    )
};

export default ProblemTypes;