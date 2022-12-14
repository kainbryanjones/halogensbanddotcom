export const formatTimeFromSeconds = (numSeconds) => {
    if (numSeconds > 60 * 60)
        return new Date(numSeconds * 1000).toISOString().substring(11, 8);

    return new Date(numSeconds * 1000).toISOString().substring(14, 19)
}