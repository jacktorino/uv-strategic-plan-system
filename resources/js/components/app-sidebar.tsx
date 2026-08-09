import { Link, usePage } from '@inertiajs/react';
import {
    ChartColumnBig,
    Building2,
    FlaskConical,
    GraduationCap,
    Users,
    BookOpenText,
    Layers,
    CheckCircle2,
    TableProperties,
    UserCheck,
    ClipboardList,
    FileText,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';

const KRA_ROUTE_MAP: Record<number, NavItem> = {
    1: {
        title: 'Governance (KRA 1)',
        href: '/kra/governance',
        icon: Building2,
    },
    2: { title: 'Research (KRA 2)', href: '/kra/research', icon: FlaskConical },
    3: {
        title: 'Teaching (KRA 3)',
        href: '/kra/teaching',
        icon: GraduationCap,
    },
    4: { title: 'Community (KRA 4)', href: '/kra/community', icon: Users },
    5: { title: 'Students (KRA 5)', href: '/kra/students', icon: BookOpenText },
};

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const role = auth?.user?.role;
    const userKra = auth?.user?.kra;

    let dashboardNavItems: NavItem[] = [];
    let kraNavItems: NavItem[] = [];
    let adminNavItems: NavItem[] = [];

    const allKraItems: NavItem[] = Object.values(KRA_ROUTE_MAP);

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */
    if (role === 'admin') {
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
        ];
        kraNavItems = allKraItems;
        adminNavItems = [
            {
                title: 'Responsible Units',
                href: '/responsible-units',
                icon: UserCheck,
            },
            { title: 'Users', href: '/accounts', icon: Users },
            { title: 'KPIs', href: '/kpis', icon: Layers },
            {
                title: 'Action Plans',
                href: '/action-plans',
                icon: CheckCircle2,
            },
            { title: 'Reports', href: '/reports', icon: FileText },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | KRA INCHARGE
    |--------------------------------------------------------------------------
    */
    if (role === 'kra_incharge') {
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
        ];
        if (userKra?.id && KRA_ROUTE_MAP[userKra.id]) {
            kraNavItems = [KRA_ROUTE_MAP[userKra.id]];
        }
        adminNavItems = [
            { title: 'KPIs', href: '/kpis', icon: Layers },
            {
                title: 'Action Plans',
                href: '/action-plans',
                icon: CheckCircle2,
            },
            { title: 'Reports', href: '/reports', icon: FileText },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | SUB-KRA INCHARGE
    |--------------------------------------------------------------------------
    */
    if (role === 'subkra_incharge') {
        // Re-added Dashboard navigation item
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
        ];

        const rawUser = auth?.user as any;

        // 1. Try to read explicit code properties from user object
        let userCode =
            rawUser?.subkra_code ||
            rawUser?.sub_kra_code ||
            rawUser?.code ||
            rawUser?.subkra?.code ||
            rawUser?.sub_kra?.code;

        // 2. Smart Fallback: Extract code from User Name (e.g., "Sub-KRA 1.6 In-Charge" -> "1.6")
        if (!userCode && rawUser?.name) {
            const match = rawUser.name.match(/\d+\.\d+/);
            if (match) {
                userCode = match[0];
            }
        }

        const userSubKra = rawUser?.subkra || rawUser?.sub_kra;

        const subKraList =
            Array.isArray(userSubKra) && userSubKra.length > 0
                ? userSubKra
                : userSubKra && typeof userSubKra === 'object'
                  ? [userSubKra]
                  : [{ code: userCode, name: rawUser?.subkra_name }];

        kraNavItems = subKraList.map((subKra: any) => {
            const code = subKra?.code || userCode;
            const kraId =
                subKra?.kra_id ||
                subKra?.kra?.id ||
                (code ? parseInt(code.split('.')[0], 10) : 1);

            const parentKra = KRA_ROUTE_MAP[kraId];

            return {
                title: subKra?.name
                    ? `Sub-KRA ${code}: ${subKra.name}`
                    : `Sub-KRA ${code}`,
                href: `/subkra/${code}`,
                icon: parentKra?.icon || Building2,
            };
        });

        adminNavItems = [
            { title: 'Reports', href: '/reports', icon: FileText },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PLANNING OFFICER
    |--------------------------------------------------------------------------
    */
    if (role === 'planning_officer') {
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
            {
                title: 'Compliance by Unit',
                href: '/kra/evaluations',
                icon: TableProperties,
            },
        ];
        kraNavItems = allKraItems;
        adminNavItems = [
            { title: 'KPIs', href: '/kpis', icon: Layers },
            {
                title: 'Action Plans',
                href: '/action-plans',
                icon: CheckCircle2,
            },
            {
                title: 'Unit Submissions',
                href: '/unit-assignments',
                icon: ClipboardList,
            },
            { title: 'Reports', href: '/reports', icon: FileText },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSIBLE UNIT
    |--------------------------------------------------------------------------
    */
    if (role === 'responsible_unit') {
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
        ];
        adminNavItems = [
            {
                title: 'My Assignments',
                href: '/unit-assignments',
                icon: ClipboardList,
            },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | VIEWER
    |--------------------------------------------------------------------------
    */
    if (role === 'viewer') {
        dashboardNavItems = [
            { title: 'Dashboard', href: dashboard(), icon: ChartColumnBig },
        ];
        kraNavItems = allKraItems;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    dashboardItems={dashboardNavItems}
                    kraItems={kraNavItems}
                    adminItems={adminNavItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
