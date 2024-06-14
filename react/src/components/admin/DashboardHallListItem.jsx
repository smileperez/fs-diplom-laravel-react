import EButton from "../core/EButton.jsx";
import axiosClient from "../../axios.js";

export default function DashboardHallListItem({ hall, getHalls }) {

    const toggleActive = () => {
        if (hall.isActive === 0) {
            axiosClient
                .put(`/halls/${hall.id}`, { isActive: 1 })
                .then((response) => {
                    // Заново перезагружаем из БД
                    getHalls();
                })
        } else {
            axiosClient
                .put(`/halls/${hall.id}`, { isActive: 0 })
                .then((response) => {
                    // Заново перезагружаем из БД
                    getHalls();
                })
        }
    }

    return (
        <>
            {hall.isActive
                ?
                <EButton color="danger" onClick={toggleActive}>
                    Закрыть продажи
                </EButton>
                :
                <EButton color="green" onClick={toggleActive}>
                    Открыть продажи
                </EButton>
            }
        </>
    );
}
