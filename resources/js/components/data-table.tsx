import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

// Columns that participate in row-merging. Their cell fn returns null
// for non-first rows, and we translate that into a real <td rowSpan>.
const MERGE_COLUMN_IDS = ['kra', 'kpi'] as const;

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const original = row.original as unknown as {
                                isFirstKra: boolean;
                                kraRowSpan: number;
                                isFirstKpi: boolean;
                                kpiRowSpan: number;
                            };

                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        const columnId = cell.column.id;

                                        if (
                                            columnId === 'kra' ||
                                            columnId === 'kpi'
                                        ) {
                                            const isFirst =
                                                columnId === 'kra'
                                                    ? original.isFirstKra
                                                    : original.isFirstKpi;

                                            const span =
                                                columnId === 'kra'
                                                    ? original.kraRowSpan
                                                    : original.kpiRowSpan;

                                            // Skip rendering the cell entirely
                                            // for merged-away rows.
                                            if (!isFirst) return null;

                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    rowSpan={span}
                                                    className="align-top"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            );
                                        }

                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
