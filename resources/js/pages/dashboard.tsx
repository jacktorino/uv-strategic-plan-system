import { Head, usePage } from '@inertiajs/react';
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
    AreaChart,
    Area,
} from 'recharts';

interface SubmissionStat {
    status: string;
    count: number;
}

interface KpiStat {
    name: string;
    progress: number;
}

interface KraStat {
    kra: string;
    progress: number;
}

interface DashboardProps {
    auth?: {
        user?: {
            name?: string;
        };
    };
    activeSubmissionsCount?: number;
    totalUsersCount?: number;
    submissionStats?: SubmissionStat[];
    kpiStats?: KpiStat[];
    kraStats?: KraStat[];
    overallProgressTrend?: { month: string; progress: number }[];
    [key: string]: any;
}

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#a855f7',
    '#ec4899',
];

export default function Dashboard() {
    const {
        auth,
        activeSubmissionsCount = 0,
        totalUsersCount = 0,
        submissionStats = [],
        kpiStats = [],
        kraStats = [],
        overallProgressTrend = [],
    } = usePage<DashboardProps>().props;

    const userName = auth?.user?.name || 'User';

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome, {userName}!
                </h1>

                <div className="grid gap-4 md:grid-cols-4">
                    {/* Active Submissions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Submissions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {activeSubmissionsCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total records currently logged
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI Status Chart / Summary */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Key Performance Indicators
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={kpiStats}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 100]}
                                    />
                                    <Tooltip />
                                    <Bar
                                        dataKey="progress"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KRA Progress Breakdown */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                KRA Progress Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={kraStats}
                                        dataKey="progress"
                                        nameKey="kra"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={45}
                                        innerRadius={25}
                                        label={false}
                                    >
                                        {kraStats.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Total Users */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsersCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Registered system accounts
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Overall Progress */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            Overall Strategic Plan Progress Trend
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={overallProgressTrend}>
                                <defs>
                                    <linearGradient
                                        id="colorProgress"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="progress"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorProgress)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
