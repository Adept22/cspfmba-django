import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from '@mui/material';

import EntityService from '../../services/EntityService';

const EntityField = ({ type, id, name, optionLabel, value, TextFieldProps }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [entity, setEntity] = useState(value);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                const entities = await EntityService.get(type);

                setOptions([...entities.results]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, type]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id={id}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={option => option[optionLabel] ?? ''}
            options={options}
            loading={loading}
            value={entity}
            onChange={(event, newValue) => setEntity(newValue)}
            renderInput={params => {
                console.log(params)
                return (
                    <>
                        <input type="hidden" name={name} value={entity.id} />
                        <TextField
                            {...params}
                            {...TextFieldProps}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    </>
                )
            }}
        />
    );
}

export default EntityField;
