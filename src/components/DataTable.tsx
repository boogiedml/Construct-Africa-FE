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
    onRowClick?: (row: T) => void;
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
    onRowClick,
    favoriteKey = 'is_favourited',
    className = '',
    showCheckboxes = false,
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

    // Check if data is already grouped (has isGroupRow markers)
    const isPreGrouped = data.some((row) => 'isGroupRow' in row && (row as any).isGroupRow === true);

    // Reset internal state when data structure changes (grouped vs ungrouped)
    React.useEffect(() => {
        setSortColumn(null);
        setSortDirection(null);
        setSelectedRows(new Set());
    }, [isPreGrouped, groupBy]);

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
        // If data is already grouped from API, don't group again
        if (isPreGrouped) return null;
        
        if (!groupBy) return null;

        const groups = new Map<unknown, T[]>();
        data.forEach((row) => {
            // Skip group rows when grouping
            if ('isGroupRow' in row && (row as any).isGroupRow) return;
            
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
    }, [data, groupBy, valueColumn, isPreGrouped]);

    const sortedData = React.useMemo(() => {
        // If data is pre-grouped, preserve the group structure
        if (isPreGrouped) {
            if (!sortColumn || !sortDirection) return data;

            // Sort groups and their children
            const groups: any[] = [];
            const groupMap = new Map<string, any[]>();
            let currentGroup: any = null;

            data.forEach((row) => {
                if ('isGroupRow' in row && (row as any).isGroupRow) {
                    if (currentGroup) {
                        groupMap.set(currentGroup.id, currentGroup.children);
                    }
                    currentGroup = { ...row, children: [] };
                    groups.push(currentGroup);
                } else if (currentGroup) {
                    currentGroup.children.push(row);
                }
            });

            if (currentGroup) {
                groupMap.set(currentGroup.id, currentGroup.children);
            }

            // Sort groups
            const sortedGroups = [...groups].sort((a, b) => {
                const aVal = String(a.groupKey || '');
                const bVal = String(b.groupKey || '');

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            // Rebuild data with sorted groups
            const result: any[] = [];
            sortedGroups.forEach(group => {
                result.push(group);
                group.children.forEach((row: T) => result.push(row));
            });
            return result;
        }

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

        if (!sortColumn || !sortDirection) return data;

        return [...data].sort((a, b) => {
            // Skip group rows when sorting
            if ('isGroupRow' in a && (a as any).isGroupRow) return -1;
            if ('isGroupRow' in b && (b as any).isGroupRow) return 1;

            const aVal = a[sortColumn];
            const bVal = b[sortColumn];

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, groupedData, groupBy, sortColumn, sortDirection, isPreGrouped]);

    const paginatedData = React.useMemo(() => {
        if (onPageChange) return sortedData;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, pageSize, onPageChange]);

    const displayData = onPageChange ? paginatedData : sortedData;
    const allSelected = selectedRows.size === data.length && data.length > 0;

    return (
        <div className={`bg-white rounded-lg border border-[#D5D7DA] overflow-hidden h-[600px] flex flex-col ${className}`}>
            <div className="flex-1 overflow-y-auto overflow-x-auto hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
                <table className="w-full min-w-[1400px]">
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr className="bg-[#FAFAFA] border-b border-[#D5D7DA]">
                            {showCheckboxes && (
                                <th className="w-12 px-4 py-3 text-left">
                                    <div className="flex items-center justify-center">
                                        <Checkbox
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                            size="lg"
                                        />
                                    </div>
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
                            Array.from({ length: 9 }).map((_, index) => (
                                <tr key={`skeleton-${index}`} className="h-[70px]">
                                    {showCheckboxes && (
                                        <td className="px-4 py-3">
                                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                        </td>
                                    ))}
                                    {showFavorites && (
                                        <td className="px-4 py-3">
                                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : displayData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showFavorites ? 1 : 0)}
                                    className="px-4 py-16"
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-medium text-[#181D27] mb-1">No data available</h3>
                                        <p className="text-sm text-[#535862]">There are no items to display at the moment.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row, index) => {
                                const isGroupRow = 'isGroupRow' in row && row.isGroupRow;

                                if (isGroupRow) {
                                    const groupRow = row as { groupKey: unknown; totalCount: number; totalValue: number; isGroupRow: boolean; id: string };
                                    return (
                                        <tr key={`group-${groupRow.id || groupRow.groupKey}`} className="bg-[#FAFAFA] border-b-2 border-[#D5D7DA]">
                                            <td colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showFavorites ? 1 : 0)} className="px-4 py-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-sm font-semibold text-[#181D27]">
                                                            {String(groupRow.groupKey || '')}
                                                        </div>
                                                        <div className="text-sm text-[#535862]">
                                                            {groupRow.totalCount} {groupRow.totalCount === 1 ? 'project' : 'projects'}
                                                        </div>
                                                    </div>
                                                    {valueColumn && groupRow.totalValue > 0 && (
                                                        <div className="text-sm font-semibold text-[#181D27]">
                                                            ${typeof groupRow.totalValue === 'number'
                                                                ? groupRow.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })
                                                                : groupRow.totalValue}M
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }

                                // Skip rendering if this is a group row (shouldn't happen, but safety check)
                                if ('isGroupRow' in row && (row as any).isGroupRow) {
                                    return null;
                                }

                                return (
                                    <tr
                                        key={String(row.id) || index}
                                        className="group min-h-[70px] max-h-[100px] h-[70px] cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => onRowClick?.(row as T)}
                                    >
                                        {showCheckboxes && (
                                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
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
                                        {showFavorites && onToggleFavorite && (
                                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleFavorite(row as T)
                                                    }}
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

            {displayData.length > 0 && onPageChange && totalPages && totalPages > 1 && (
                <div className="sticky bottom-0 z-10 bg-white border-t border-[#D5D7DA] w-full flex items-center justify-center px-4 py-3">
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
