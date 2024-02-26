import { useNavigate } from "react-router-dom";

export default function SessionListItem({ session }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='mr-2 bg-white p-2 rounded cursor-pointer shadow-md' onClick={() => (navigate(`/session/${session.id}`))}>
                {session.sessionStart}
            </div>
        </>
    )
}
