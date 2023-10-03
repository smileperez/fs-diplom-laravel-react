export default function ESelection({ color = "regular", children }) {
    let classes = [
        "inline-block",
        "w-auto",
        "px-2",
        "py-1",
        "rounded",
        "text-xs",
    ];

    switch (color) {
        case "gold":
            classes = [...classes, "bg-[#b89e14]", "text-black", "font-semibold"];
            break;
        case "regular":
            classes = [...classes, "bg-[#63536C]", "text-white", "font-normal"];
            break;
    }

    return <span className={classes.join(" ")}>{children}</span>;
}
