import ESeat from "../core/ESeat";

export default function ConfigItem({ hall }) {

    return (
        <div>
            {seats.map((item, idx) => (
                <div key={idx}>
                    <ESeat></ESeat>
                </div>
            ))}
        </div>
    );
}
