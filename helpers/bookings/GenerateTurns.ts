import moment from "moment";

export const generateTurns = (date: string, except: number[] = []) => {
    const openingTime = "09:00";
    const sessionDurationMinutes = 60;
    const restDurationMinutes = 10;
    const closingTime = "22:00";
    let currentDate = moment(date + " " + openingTime);
    let turns = [];
    let index = 0;
    while (
        moment(currentDate).isBefore(
            moment(date + " " + closingTime).subtract(
                sessionDurationMinutes,
                "minutes"
            )
        )
    ) {
        let start = currentDate;
        let end = moment(currentDate).add(sessionDurationMinutes, "minutes");
        turns.push({
            start: start.format(),
            end: end.format(),
            available: true,
            turnId: index++,
        });
        currentDate = moment(end).add(restDurationMinutes, "minutes");
    }
    return turns;
};
