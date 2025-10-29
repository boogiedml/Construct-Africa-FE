import React, { useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { AiFillStar } from 'react-icons/ai';
import Checkbox from './Checkbox';
import { ClipLoader } from 'react-spinners';

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => React.ReactNode;
    width?: string;
}

export interface DataTableProps<T extends Record<string, unknown> & { id: unknown }> {
    data: T[];
    columns: TableColumn<T>[];
    onRowSelect?: (selectedRows: T[]) => void;
    onToggleFavorite?: (row: T) => void;
    favoriteKey?: keyof T;
    className?: string;
    showCheckboxes?: boolean;
    showFavorites?: boolean;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    totalPages?: number;
    loading?: boolean;
    groupBy?: keyof T;
    valueColumn?: keyof T;
}

type SortDirection = 'asc' | 'desc' | null;

const DataTable = <T extends Record<string, unknown> & { id: unknown }>({
    data,
    columns,
    onRowSelect,
    onToggleFavorite,
    favoriteKey = 'isFavorite',
    className = '',
    showCheckboxes = true,
    showFavorites = true,
    pageSize = 10,
    currentPage = 1,
    onPageChange,
    totalPages,
    loading = false,
    groupBy,
    valueColumn
}: DataTableProps<T>) => {
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [selectedRows, setSelectedRows] = useState<Set<unknown>>(new Set());

    const handleSort = (columnKey: keyof T) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(data.map(row => row.id));
            setSelectedRows(allIds);
            onRowSelect?.(data);
        } else {
            setSelectedRows(new Set());
            onRowSelect?.([]);
        }
    };

    const handleRowSelect = (row: T, checked: boolean) => {
        const newSelectedRows = new Set(selectedRows);
        if (checked) {
            newSelectedRows.add(row.id);
        } else {
            newSelectedRows.delete(row.id);
        }
        setSelectedRows(newSelectedRows);

        const selectedData = data.filter(item => newSelectedRows.has(item.id));
        onRowSelect?.(selectedData);
    };

    const handleToggleFavorite = (row: T) => {
        onToggleFavorite?.(row);
    };

    const groupedData = React.useMemo(() => {
        if (!groupBy) return data;

        const groups = new Map<unknown, T[]>();
        data.forEach((row) => {
            const groupKey = row[groupBy];
            if (!groups.has(groupKey)) {
                groups.set(groupKey, []);
            }
            groups.get(groupKey)?.push(row);
        });

        return Array.from(groups.entries()).map(([groupKey, rows]) => ({
            groupKey,
            rows,
            isGroupRow: true,
            id: `group-${String(groupKey)}`,
            totalCount: rows.length,
            totalValue: valueColumn ? rows.reduce((sum, row) => {
                const val = row[valueColumn];
                return sum + (typeof val === 'number' ? val : 0);
            }, 0) : 0
        }));
    }, [data, groupBy, valueColumn]);

    const sortedData = React.useMemo(() => {
        if (groupBy && groupedData) {
            const sortedGroups = [...groupedData].sort((a, b) => {
                if (!sortColumn || !sortDirection) return 0;

                const aVal = String(a.groupKey);
                const bVal = String(b.groupKey);

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            const result: (T | typeof sortedGroups[0])[] = [];
            sortedGroups.forEach(group => {
                result.push(group);
                (group.rows as T[]).forEach((row: T) => result.push(row));
            });
            return result;
        }

        // Normal sorting without grouping
        if (!sortColumn || !sortDirection) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, groupedData, groupBy, sortColumn, sortDirection]);

    const paginatedData = React.useMemo(() => {
        if (onPageChange) return sortedData;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, pageSize, onPageChange]);

    const displayData = onPageChange ? paginatedData : sortedData;
    const allSelected = selectedRows.size === data.length && data.length > 0;

    return (
        <div className={`bg-white rounded-lg border border-[#D5D7DA] overflow-hidden ${className}`}>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-[#FAFAFA] border-b border-[#D5D7DA]">
                            {showCheckboxes && (
                                <th className="w-12 px-4 py-3 text-left flex items-center justify-center">
                                    <Checkbox
                                        checked={allSelected}
                                        onChange={handleSelectAll}
                                        size="lg"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                        }`}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2 text-[#535862] text-sm">
                                        <span>{column.label}</span>
                                        {column.sortable && (
                                            <div className="flex flex-col">
                                                {sortColumn === column.key && sortDirection === 'asc' ? (
                                                    <LuChevronUp size={12} className="text-gray-500" />
                                                ) : sortColumn === column.key && sortDirection === 'desc' ? (
                                                    <LuChevronDown size={12} className="text-gray-500" />
                                                ) : (
                                                    <LuChevronDown size={12} className="text-gray-300" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {showFavorites && (
                                <th className="w-12 px-4 py-3 text-left"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showFavorites ? 1 : 0)}
                                    className="px-4 py-8 text-center"
                                >
                                    <ClipLoader size={30} color="#535862" />
                                </td>
                            </tr>
                        ) : displayData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showFavorites ? 1 : 0)}
                                    className="px-4 py-8 text-center text-[#535862]"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row, index) => {
                                // Check if this is a group header row
                                const isGroupRow = 'isGroupRow' in row && row.isGroupRow;

                                if (isGroupRow) {
                                    const groupRow = row as any;
                                    return (
                                        <tr key={`group-${groupRow.groupKey}`} className="bg-[#FAFAFA]">
                                            <td colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showFavorites ? 1 : 0)} className="px-4 py-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-sm font-medium text-[#181D27]">
                                                            {String(groupRow.groupKey)}
                                                        </div>
                                                        <div className="text-sm text-[#535862]">
                                                            {groupRow.totalCount} projects
                                                        </div>
                                                    </div>
                                                    {valueColumn && (
                                                        <div className="text-sm font-medium text-[#181D27]">
                                                            {typeof groupRow.totalValue === 'number'
                                                                ? groupRow.totalValue.toLocaleString()
                                                                : groupRow.totalValue}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }

                                // Regular data row
                                return (
                                    <tr key={String(row.id) || index} className="group min-h-[70px] max-h-[100px] h-[70px]">
                                        {showCheckboxes && (
                                            <td className="px-4 py-3">
                                                <Checkbox
                                                    checked={selectedRows.has(row.id)}
                                                    onChange={(checked) => handleRowSelect(row as T, checked)}
                                                    size="lg"
                                                />
                                            </td>
                                        )}
                                        {columns.map((column) => (
                                            <td
                                                key={String(column.key)}
                                                className="px-4 py-3 text-sm text-[#181D27]"
                                            >
                                                {column.render
                                                    ? column.render((row as T)[column.key], row as T)
                                                    : String((row as T)[column.key] || '')}
                                            </td>
                                        ))}
                                        {showFavorites && (
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleToggleFavorite(row as T)}
                                                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                                                >
                                                    {(row as T)[favoriteKey] ? (
                                                        <AiFillStar size={18} className="text-[#FDB022]" />
                                                    ) : (
                                                        <AiFillStar size={18} className="text-[#D5D7DA] transition-colors opacity-0 group-hover:opacity-100" />
                                                    )}
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {displayData.length > 0 && onPageChange && totalPages && totalPages > 1 && (
                <div className="w-full flex items-center justify-center px-4 py-3 border-t border-[#D5D7DA]">
                    <div className="w-full flex items-center justify-between gap-2">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-[#535862] hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LuChevronUp size={14} className="rotate-[-90deg]" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange(page)}
                                            className={`px-3 py-1 text-sm w-[40px] h-[40px] flex items-center justify-center rounded-lg ${page === currentPage
                                                ? 'bg-[#FDF5E8] text-[#E0891E] font-medium'
                                                : 'text-[#717680] hover:bg-[#FAFAFA]'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className="px-1 text-[#717680]">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-[#535862] hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <LuChevronUp size={14} className="rotate-90" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
