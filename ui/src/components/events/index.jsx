import React from 'react';
import { useLoaderData } from 'react-router';
import { Form, Link, useSearchParams } from 'react-router-dom';
import { Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import { TitledBox } from '../common';

import EntityService from '../../services/EntityService';

import { AddIcon, EditIcon, CloseIcon } from '../../icon';

export const loader = async ({ request }) => {
    const url = new URL(request.url);

    const rowsPerPage = +url.searchParams.get('rowsPerPage') ?? 15;
    const page = +url.searchParams.get('page') ?? 0;

    return await EntityService.get('events', undefined, { limit: rowsPerPage, offset: rowsPerPage * page })
};

const Toolbar = () => (
    <Stack
        spacing={2}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%' }}
    >
        <IconButton
            component={Link}
            id={`events-add-button`}
            color="primary"
            aria-label="Добавить"
            aria-haspopup="true"
            to="create"
        >
            <AddIcon />
        </IconButton>
    </Stack>
);

const Row = ({ id, index, name }) => {
    name = name ?? `Событие ${index + 1}`;

    return (
        <TableRow
            sx={{
                '&:nth-of-type(odd)': {
                    backgroundColor: theme => theme.palette.action.hover,
                },
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
            }}
        >
            <TableCell>{index + 1}</TableCell>
            <TableCell width="100%">{name}</TableCell>
            <TableCell align="center">
                <IconButton
                    component={Link}
                    id={`edit-button-${id}`}
                    color="primary"
                    aria-label="Редактировать"
                    aria-haspopup="true"
                    to={`${id}/edit`}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <Form method="post" action={`${id}/delete`}>
                    <IconButton
                        id={`delete-button-${id}`}
                        color="primary"
                        aria-label="Удалить"
                        aria-haspopup="true"
                        type="submit"
                    >
                        <CloseIcon />
                    </IconButton>
                </Form>
            </TableCell>
        </TableRow>
    )
};

const Events = () => {
    const { results: events, count } = useLoaderData();

    let [searchParams, setSearchParams] = useSearchParams({ rowsPerPage: 15, page: 0 });

    return (
        <TitledBox
            component={Paper}
            title="События"
            sx={{ height: "100%" }}
            toolbar={<Toolbar />}
        >
            <TableContainer>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">№</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="center" colSpan={2}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            events.map((event, i) => (
                                <Row
                                    key={event.id ?? i}
                                    index={i}
                                    {...event}
                                />
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                showFirstButton
                                showLastButton
                                rowsPerPageOptions={[15, 30, 50]}
                                colSpan={4}
                                count={count}
                                rowsPerPage={+searchParams.get('rowsPerPage') ?? 15}
                                page={+searchParams.get('page') ?? 0}
                                labelRowsPerPage="Элементов на странице"
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'Элементов на странице',
                                    },
                                    native: true,
                                }}
                                onPageChange={(e, newPage) => setSearchParams({ ...Object.fromEntries(searchParams), page: newPage })}
                                onRowsPerPageChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), rowsPerPage: +e.target.value })}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TitledBox >
    )
};

export default Events;