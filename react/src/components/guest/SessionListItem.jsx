import { useNavigate } from "react-router-dom";

export default function SessionListItem({ session }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='mr-3 bg-white py-1 px-6 rounded cursor-pointer shadow-md text-base font-medium' onClick={() => (navigate(`/session/${session.id}`))}>
                {session.sessionStart.slice(0, 5)}
            </div>
        </>
    )
}
