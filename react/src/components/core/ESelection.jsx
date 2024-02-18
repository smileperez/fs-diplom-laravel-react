import { useEffect, useState } from "react";

export default function ESelection({ color, children }) {
    let classes = [
        "inline-block",
        "w-auto",
        "px-2",
        "py-1",
        "rounded",
        "text-xs",
        "border",
        "border-gray-500",
        "font-medium",
        "text-white",
    ];

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(true);

    // if (color) {
    //     classes = [...classes, selectedColor];
    // } else {
    //     classes = [...classes, 'bg-[#63536C]'];
    // }

    // if (!color) {
    //     setLoading(true);
    // } else {
    //     setLoading(false);
    // }

    useEffect(() => {
        if (color) {
            setLoading(false);
        }
    }, [color]);


    // return <div className={classes.join(" ")}>{children}</div>;
    return (
        <>

            {loading && (
                <></>
            )}

            {!loading && (
                < div className={`${!color && "ЛОЛ"}`}>{children}</div >
            )}

        </>
    )


    // <div className={`bg-[#${types[1].color}]`} >VIP</div>

}
