import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area,
} from 'recharts';

const monthlyData = [
    { month: 'Jan', value: 62 },
    { month: 'Feb', value: 68 },
    { month: 'Mar', value: 74 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 79 },
    { month: 'Jun', value: 90 },
];

const statusData = [
    { name: 'Completed', value: 42 },
    { name: 'Ongoing', value: 31 },
    { name: 'Pending', value: 17 },
];

const kraData = [
    { name: 'KRA 1', value: 82 },
    { name: 'KRA 2', value: 75 },
    { name: 'KRA 3', value: 90 },
    { name: 'KRA 4', value: 68 },
    { name: 'KRA 5', value: 88 },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Monthly KPI Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly KPI Progress</CardTitle>
                        </CardHeader>

                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="var(--chart-1)"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KPI Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>KPI Status</CardTitle>
                        </CardHeader>

                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={90}
                                        label
                                    >
                                        {statusData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={`var(--chart-${index + 1})`}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KRA Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>KRA Progress</CardTitle>
                        </CardHeader>

                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={kraData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="value"
                                        fill="var(--chart-2)"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Overall Progress */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Overall Strategic Plan Progress</CardTitle>
                    </CardHeader>

                    <CardContent className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient
                                        id="progressGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--chart-1)"
                                            stopOpacity={0.35}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--chart-1)"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="var(--chart-1)"
                                    fill="url(#progressGradient)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
