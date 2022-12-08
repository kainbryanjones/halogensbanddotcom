export const decibelsToGain = (db) => {
    return Math.pow(10, (db * 0.05));
}

export const gainToDecibels = (gain) => {
    return Math.log10(gain, 20);
}