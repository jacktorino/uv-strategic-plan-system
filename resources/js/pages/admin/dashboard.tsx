import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    FileText,
    BarChart3,
    PieChart as PieChartIcon,
    Users,
} from 'lucide-react';

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

// Light red, light blue, and complementary pastel shades for pie/bar distribution
const COLORS = [
    '#60a5fa', // Light Blue
    '#f87171', // Light Red
    '#93c5fd', // Lighter Blue
    '#fca5a5', // Lighter Red
    '#38bdf8', // Sky Blue
    '#fb7185', // Rose Red
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
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shadow-2xs">
                            <CardTitle className="text-sm font-medium">
                                Active Submissions
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
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
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Key Performance Indicators
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
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
                                    {/* Light Blue styled Bar */}
                                    <Bar
                                        dataKey="progress"
                                        fill="#60a5fa"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KRA Progress Breakdown */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                KRA Progress Distribution
                            </CardTitle>
                            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
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
                            <Users className="h-4 w-4 text-muted-foreground" />
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
                                    {/* Light Red / Light Blue Gradient configuration */}
                                    <linearGradient
                                        id="colorProgressBlue"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#60a5fa"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#60a5fa"
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
                                    stroke="#60a5fa"
                                    fillOpacity={1}
                                    fill="url(#colorProgressBlue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
