import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { FileText, Users } from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

// Chart colors pulled from the app's existing shadcn chart theme
// (defined as CSS variables in your theme file) rather than
// hardcoded hex values.
const CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];

export default function Dashboard() {
    const {
        auth,
        activeSubmissionsCount = 0,
        totalUsersCount = 0,
        kpiStats = [],
        kraStats = [],
        overallProgressTrend = [],
    } = usePage<DashboardProps>().props;

    const userName = auth?.user?.name || 'User';
    const monthLabel = format(new Date(), 'MMMM yyyy');

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Welcome back, {userName}
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Institutional overview for {monthLabel}.
                        </p>
                    </div>

                    <Badge variant="secondary" className="w-fit">
                        On-going
                    </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="flex items-center justify-between pt-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Active Submissions
                                </p>
                                <p className="text-3xl font-semibold">
                                    {activeSubmissionsCount}
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between pt-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Users
                                </p>
                                <p className="text-3xl font-semibold">
                                    {totalUsersCount}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-muted-foreground" />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Performance Indicators</CardTitle>
                            <CardDescription>
                                Progress by indicator, current period
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={kpiStats}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="name"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0, 100]}
                                        />
                                        <Tooltip />
                                        <Bar
                                            dataKey="progress"
                                            fill={CHART_COLORS[0]}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>KRA Progress Distribution</CardTitle>
                            <CardDescription>
                                Share of progress by key result area
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-40 flex-shrink-0 sm:w-40">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={kraStats}
                                                dataKey="progress"
                                                nameKey="kra"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={65}
                                                innerRadius={38}
                                                label={false}
                                            >
                                                {kraStats.map((_, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            CHART_COLORS[
                                                                index %
                                                                    CHART_COLORS.length
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <ul className="min-w-0 flex-1 space-y-1.5">
                                    {kraStats.length === 0 && (
                                        <li className="text-sm text-muted-foreground">
                                            No KRA data yet.
                                        </li>
                                    )}
                                    {kraStats.map((stat, index) => (
                                        <li
                                            key={stat.kra}
                                            className="flex items-center justify-between gap-2 text-sm"
                                        >
                                            <span className="flex min-w-0 items-center gap-2">
                                                <span
                                                    className="h-2 w-2 flex-shrink-0 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            CHART_COLORS[
                                                                index %
                                                                    CHART_COLORS.length
                                                            ],
                                                    }}
                                                />
                                                <span className="truncate">
                                                    {stat.kra}
                                                </span>
                                            </span>
                                            <span className="flex-shrink-0 font-semibold">
                                                {stat.progress}%
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Overall Strategic Plan Progress</CardTitle>
                        <CardDescription>
                            Trend across reporting periods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[320px]">
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
                                                stopColor={CHART_COLORS[0]}
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor={CHART_COLORS[0]}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        fontSize={12}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="progress"
                                        stroke={CHART_COLORS[0]}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorProgress)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
