import {useRef} from "react";
import styles from "./StickyDualTable.module.css";

interface RightCell {
    component: React.ReactNode;
    data: any; // позже можно типизировать красиво
}

interface StickyDualTableProps {
    leftHeaders: React.ReactNode[]
    leftRows: React.ReactNode[][]
    rightHeaders: React.ReactNode[];
    rightRows: RightCell[][];

    currentColumnIndex?: number;
    fullWidth?: boolean;
    onPrev?: () => void;
    onNext?: () => void;

    getCellClass?: (rowIndex: number, colIndex: number, cell: RightCell) => string;
}

export const StickyDualTable = ({
    leftHeaders,
    leftRows,
    rightHeaders,
    rightRows,
    currentColumnIndex,
    onPrev,
    onNext,
    getCellClass
  }: StickyDualTableProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className={styles.tableWrapper}>

                {/* Левая фиксированная колонка */}
                <div className={styles.leftColumn}>
                    <table>
                        <thead>
                        <tr>
                            {leftHeaders.map((h, i) => (
                                <th key={i} className={styles.teamHeader}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {leftRows?.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map((cell, colIdx) => (
                                    <td key={colIdx} className={styles.teamCell}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Правая часть */}
                <div className={styles.rightScroll} ref={scrollRef}>
                    <table>
                        <thead>
                        <tr>
                            {rightHeaders.map((h, i) => (
                                <th
                                    key={i}
                                    className={
                                        i === currentColumnIndex ? styles.currentTour : ""
                                    }
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {rightRows?.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row?.map((cell, colIdx) => {
                                    const userClass = getCellClass?.(rowIdx, colIdx, cell) || "";

                                    return (
                                        <td
                                            key={colIdx}
                                            className={[
                                                styles.fixture,
                                                userClass,
                                                colIdx === currentColumnIndex ? styles.currentTour : ""
                                            ].join(" ")}
                                        >
                                            {cell?.component}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Кнопки */}
            {
                <div className={styles.controls}>
                    <button onClick={onPrev}>&lt;</button>
                    <button onClick={onNext}>&gt;</button>
                </div>
            }
        </>
    );
};