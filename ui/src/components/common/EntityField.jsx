import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from '@mui/material';

import EntityService from '../../services/EntityService';

const EntityField = ({ type, id, name, optionLabel, value, multiple, TextFieldProps }) => {
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
            isOptionEqualToValue={(o, v) => o.id === v.id}
            getOptionLabel={option => option[optionLabel] ?? ''}
            options={options}
            loading={loading}
            multiple={multiple}
            value={entity}
            disableCloseOnSelect={multiple}
            onChange={(event, newValue) => setEntity(newValue)}
            renderInput={params => (
                <>
                    <input type="hidden" name={name} value={[].concat(entity).map(e => e?.id).join(';')} />
                    <TextField
                        {...params}
                        {...TextFieldProps}
                        required={!multiple}
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
            )}
        />
    );
}

export default EntityField;
