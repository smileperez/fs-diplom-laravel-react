export default function ESeat({ color = "regular" }) {

    let classes = [
        "inline-block",
        "cursor-pointer",
        "w-[26px]",
        "h-[26px]",
        "border-2",
        "rounded",
        "ml-[10px]"
    ];


    switch (color) {
        case "regular":
            classes = [
                ...classes,
                "bg-[#C4C4C4]",
                "border-[#393939]",
            ]
    }

    return <span className={classes.join(" ")}></span>;
}
