import getSessionInMinutes from "../core/getSessionInMinutes";
import getBusyTime from "../core/getBusyTime";

// Вспомогательная функция для получения правильного формата времени окончания фильма
export default function checkBusyTimeline(sessions, session) {
    const busyTime = getBusyTime(sessions);

    const newSessionStart = getSessionInMinutes(session.sessionStart);
    const newSessionEnd = getSessionInMinutes(session.sessionEnd);

    let check = true;
    for (const element of busyTime) {

        if ((newSessionStart >= getSessionInMinutes(element.start)
            && newSessionStart <= getSessionInMinutes(element.end))
            || (newSessionEnd >= getSessionInMinutes(element.start) && newSessionEnd <= getSessionInMinutes(element.end))
            || (newSessionStart === getSessionInMinutes(element.start))
        ) {
            check = false;
            console.log('Занято!');
            break;
        }
    }
    return check;
};
