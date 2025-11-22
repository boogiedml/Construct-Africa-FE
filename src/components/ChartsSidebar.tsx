import React from 'react';
import Chart from 'react-apexcharts';
import CustomSelect from './CustomSelect';

interface ChartsSidebarProps {
    isOpen: boolean;
    onGroupBy?: (value: string) => void;
}

const ChartsSidebar: React.FC<ChartsSidebarProps> = ({ isOpen, onGroupBy }) => {
    const chartOptions = {
        series: [44, 28, 18, 15, 10],
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
        },
        labels: ['Central Africa', 'East Africa', 'North Africa', 'Southern Africa', 'West Africa'],
        colors: ['#000957', '#347FC8', '#32D583', '#FDB022', '#AE6A19'],
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Source Sans 3',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            markers: {
                width: 6,
                height: 6,
                radius: 4,
            },
            itemMargin: {
                horizontal: 8,
                vertical: 4,
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '55%',
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (value: number) {
                    return value + " projects"
                }
            }
        }
    };

    const groupByOptions = [
        { value: 'sector', label: 'By sector' },
        { value: 'region', label: 'By region' },
        { value: 'type', label: 'By type' }
    ];

    if (!isOpen) return null;

    return (
        <div className="w-[340px] bg-white rounded-lg border border-[#D5D7DA] border-t-8 border-t-[#F89822] overflow-hidden sticky top-5 self-start">
            <div className="p-4 space-y-6">
                <div>
                    <CustomSelect
                        options={groupByOptions}
                        value="sector"
                        onChange={(value) => onGroupBy && onGroupBy(value)}
                        placeholder="By sector"
                    />
                </div>

                {/* <div className='flex items-center gap-3 mb-3'>
                    <div className="text-sm text-[#717680]">Group by:</div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="group-by" className="accent-[#FDB022]" />
                            <span className="text-sm text-[#535862]">Subsector</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="group-by" className="accent-[#FDB022]" />
                            <span className="text-sm text-[#535862]">Type</span>
                        </label>
                    </div>
                </div> */}

                <div>
                    <div id="chart">
                        <Chart
                            options={chartOptions as ApexCharts.ApexOptions}
                            series={chartOptions.series}
                            type="donut"
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSidebar;

