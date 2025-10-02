import React, { useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { AiFillStar } from 'react-icons/ai';
import Checkbox from './Checkbox';

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
    totalPages
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

    const sortedData = React.useMemo(() => {
        if (!sortColumn || !sortDirection) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortDirection]);

    const paginatedData = React.useMemo(() => {
        if (!onPageChange) return sortedData;

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
                        {displayData.map((row, index) => {
                            return (
                                <tr key={String(row.id) || index} className="group min-h-[70px] max-h-[100px] h-[70px]">
                                    {showCheckboxes && (
                                        <td className="px-4 py-3">
                                            <Checkbox
                                                checked={selectedRows.has(row.id)}
                                                onChange={(checked) => handleRowSelect(row, checked)}
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
                                                ? column.render(row[column.key], row)
                                                : String(row[column.key] || '')}
                                        </td>
                                    ))}
                                    {showFavorites && (
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleToggleFavorite(row)}
                                                className="p-1 rounded hover:bg-gray-100 transition-colors"
                                            >
                                                {row[favoriteKey] ? (
                                                    <AiFillStar size={18} className="text-[#FDB022]" />
                                                ) : (
                                                    <AiFillStar size={18} className="text-[#D5D7DA] transition-colors opacity-0 group-hover:opacity-100" />
                                                )}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {onPageChange && totalPages && totalPages > 1 && (
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
