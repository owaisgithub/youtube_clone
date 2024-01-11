const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format the time as HH:MM:SS
    let formattedTime = "";
    if (seconds >= 3600) {
        formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    } else {
        formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }

    return formattedTime;
}

const padZero = (number) => {
    return number < 10 ? `0${number}` : number;
}

export {
    secondsToTime,
}