export const stringAvatar = name => ({
    children: `${name.split(' ')?.[0]?.[0] ?? ''}${name.split(' ')?.[1]?.[0] ?? ''}`,
    alt: name,
    title: name
});

const utils = {
    stringAvatar
};

export default utils;
