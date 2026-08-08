import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { FileText, Users, Target, CheckCircle2 } from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
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
    totalKPICount?: number;
    totalActionPlanCount?: number;
    submissionStats?: SubmissionStat[];
    kpiStats?: KpiStat[];
    kraStats?: KraStat[];
    overallProgressTrend?: { month: string; progress: number }[];
    [key: string]: any;
}

export default function Dashboard() {
    const {
        activeSubmissionsCount = 0,
        totalUsersCount = 0,
        totalKPICount = 0,
        totalActionPlanCount = 0,
        kpiStats = [],
        overallProgressTrend = [],
    } = usePage<DashboardProps>().props;

    const monthLabel = format(new Date(), 'MMMM yyyy');

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
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
                        <CardContent className="flex items-center justify-between p-6">
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

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total KPI
                                </p>
                                <p className="text-3xl font-semibold">
                                    {totalKPICount}
                                </p>
                            </div>
                            <Target className="h-8 w-8 text-muted-foreground" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Action Plan
                                </p>
                                <p className="text-3xl font-semibold">
                                    {totalActionPlanCount}
                                </p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                        </CardContent>
                    </Card>
                </div>

                {/* KPI Bar Chart */}
                <div className="grid grid-cols-1 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Performance Indicators</CardTitle>
                            <CardDescription>
                                Progress by indicator, current period (
                                {monthLabel})
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={kpiStats}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="var(--border)"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            stroke="var(--muted-foreground)"
                                        />
                                        <YAxis
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0, 100]}
                                            stroke="var(--muted-foreground)"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--card)',
                                                borderColor: 'var(--border)',
                                                borderRadius: 'var(--radius)',
                                                color: 'var(--card-foreground)',
                                            }}
                                        />
                                        <Bar
                                            dataKey="progress"
                                            fill="var(--chart-1)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Strategic Plan Area Chart */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Overall Strategic Plan Progress</CardTitle>
                        <CardDescription>
                            Trend across reporting periods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[320px] w-full">
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
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0.4}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="month"
                                        fontSize={12}
                                        tickLine={false}
                                        stroke="var(--muted-foreground)"
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        stroke="var(--muted-foreground)"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            borderColor: 'var(--border)',
                                            borderRadius: 'var(--radius)',
                                            color: 'var(--card-foreground)',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="progress"
                                        stroke="var(--chart-2)"
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

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '#',
        },
    ],
};
