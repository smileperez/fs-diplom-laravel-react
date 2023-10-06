import { useState } from "react";
import ESeat from "../core/ESeat";

export default function MatrixComponent({ rows, seats }) {
    const makeMatrix = (rows, seats) => {
        const ans = [];
        for (let y = 0; y < rows; y++) {
            const row = Array.from({ length: seats }, (__, x) => {
                return { x, y };
            });
            ans.push(row);
        }
        return ans;
    };

    const matrix = makeMatrix(rows, seats);

    return (
        <div>
            {matrix.map((row, i) => (
                <div key={i}>
                    {row.map((item, j) => (
                        <ESeat key={j} />
                    ))}
                </div>
            ))}
        </div>
    );
}
