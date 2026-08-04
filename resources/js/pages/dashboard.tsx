import { Head, usePage } from '@inertiajs/react';
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



export default function Dashboard() {
    // 1. Get the authenticated user from Inertia page props
    const { auth } = usePage<{ auth?: { user?: { name?: string } } }>().props;
    const userName = auth?.user?.name || 'User';

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* 2. Inject the user's name */}
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome, {userName}!
                </h1>

                <div className="grid gap-4 md:grid-cols-4">
                    {/* Monthly KPI Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Submissions</CardTitle>
                        </CardHeader>

                        <CardContent className="h-42">
                            <ResponsiveContainer width="100%" height="100%">
                                

                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KPI Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Performance Indicators</CardTitle>
                        </CardHeader>

                        <CardContent className="h-42">
                            <ResponsiveContainer width="100%" height="100%">
                               
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* KRA Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>KRA Progress</CardTitle>
                        </CardHeader>

                        <CardContent className="h-42">
                            <ResponsiveContainer width="100%" height="100%">
                              
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                              {/* KRA Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Users</CardTitle>
                        </CardHeader>

                        <CardContent className="h-42">
                            <ResponsiveContainer width="100%" height="100%">
                               
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
                           
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                
            </div>
        </>
    );
}