import { useState } from "react";

const makeMatrix = (rows, seats) => {
    const ans = [];
    for (let y = 0; y < rows; y++) {
        const row = Array.from({ length: seats }, (__, x) => {
            return { y, x };
        });
        ans.push(row);
    }
    return ans;
};

export default function MatrixComponent({ rows, seats }) {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const matrix = makeMatrix(rows, seats);

    function onMouseEnter(event, x, y) {
        setCoords({ x, y });
    }

    return (
        <div>
            {matrix.map((row, i) => (
                <div key={i}>
                    {row.map((item, j) => (
                        <div
                            className="inline-block cursor-pointer w-[20px] h-[20px] border border-gray-400 rounded ml-[8px] bg-[#63536C]"
                            key={j}
                            onClick={(event) =>
                                onMouseEnter(event, item.x, item.y)
                            }
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
