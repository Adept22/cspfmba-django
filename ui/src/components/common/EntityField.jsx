import React from "react";
import { TextField, Autocomplete, CircularProgress } from '@mui/material';

import EntityService from '../../services/EntityService';

const EntityField = ({ entity, id, optionLabel, TextFieldProps }) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                const entities = await EntityService.get(entity);

                setOptions([...entities]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, entity]);

    React.useEffect(() => {
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
            getOptionLabel={option => option[optionLabel]}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    {...params}
                    {...TextFieldProps}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default EntityField;
