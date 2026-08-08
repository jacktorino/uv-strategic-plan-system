import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ChartColumnBig,
    FolderGit2,
    TableProperties,
    Layers,
    CheckCircle2,
    Building2,
    FlaskConical,
    GraduationCap,
    Users,
    UserCheck,
    BookOpenText,
    ClipboardList,
    FileText,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
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

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const role = auth.user.role;

    let dashboardNavItems: NavItem[] = [];
    let kraNavItems: NavItem[] = [];
    let adminNavItems: NavItem[] = [];

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */
    if (role === 'admin') {
        dashboardNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
        ];

        kraNavItems = [
            {
                title: 'KRA 1',
                href: '/kra/governance',
                icon: Building2,
            },
            {
                title: 'KRA 2',
                href: '/kra/research',
                icon: FlaskConical,
            },
            {
                title: 'KRA 3',
                href: '/kra/teaching',
                icon: GraduationCap,
            },
            {
                title: 'KRA 4',
                href: '/kra/community',
                icon: Users,
            },
            {
                title: 'KRA 5',
                href: '/kra/students',
                icon: BookOpenText,
            },
        ];

        adminNavItems = [
            {
                title: 'Responsible Units',
                href: '/responsible-units',
                icon: UserCheck,
            },
            {
                title: 'Accounts',
                href: '/accounts',
                icon: Users,
            },
            {
                title: 'KPIs',
                href: '/kpis',
                icon: Layers,
            },
            {
                title: 'Action Plans',
                href: '/action-plans',
                icon: CheckCircle2,
            },
            {
                title: 'Reports',
                href: '/reports',
                icon: FileText,
            },
            // {
            //     title: 'Unit Submissions',
            //     href: '/unit-assignments',
            //     icon: ClipboardList,
            // },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PLANNING OFFICER
    |--------------------------------------------------------------------------
    */
    if (role === 'planning_officer') {
        dashboardNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
            {
                title: 'Compliance by Unit',
                href: '/kra/evaluations',
                icon: TableProperties,
            },
        ];

        kraNavItems = [
            {
                title: 'KRA 1',
                href: '/kra/governance',
                icon: Building2,
            },
            {
                title: 'KRA 2',
                href: '/kra/research',
                icon: FlaskConical,
            },
            {
                title: 'KRA 3',
                href: '/kra/teaching',
                icon: GraduationCap,
            },
            {
                title: 'KRA 4',
                href: '/kra/community',
                icon: Users,
            },
            {
                title: 'KRA 5',
                href: '/kra/students',
                icon: BookOpenText,
            },
        ];

        adminNavItems = [
            {
                title: 'KPIs',
                href: '/kpis',
                icon: Layers,
            },
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
            {
                title: 'Reports',
                href: '/reports',
                icon: FileText,
            },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | KRA INCHARGE
    |--------------------------------------------------------------------------
    */
    if (role === 'kra_incharge') {
        dashboardNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
        ];

        kraNavItems = [
            {
                title: 'My KRAs',
                href: '/kra',
                icon: Building2,
            },
        ];

        adminNavItems = [
            {
                title: 'KPIs',
                href: '/kpis',
                icon: Layers,
            },
            {
                title: 'Action Plans',
                href: '/action-plans',
                icon: CheckCircle2,
            },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | SUB-KRA INCHARGE
    |--------------------------------------------------------------------------
    */
    if (role === 'subkra_incharge') {
        dashboardNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
        ];

        kraNavItems = [
            {
                title: 'My KRAs ',
                href: '/kra',
                icon: Building2,
            },
            {
                title: 'Reports',
                href: '/reports',
                icon: FileText,
            },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSIBLE UNIT
    |--------------------------------------------------------------------------
    */
    if (role === 'responsible_unit') {
        dashboardNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
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
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: ChartColumnBig,
            },
        ];

        kraNavItems = [
            {
                title: 'KRA 1',
                href: '/kra/governance',
                icon: Building2,
            },
            {
                title: 'KRA 2',
                href: '/kra/research',
                icon: FlaskConical,
            },
            {
                title: 'KRA 3',
                href: '/kra/teaching',
                icon: GraduationCap,
            },
            {
                title: 'KRA 4',
                href: '/kra/community',
                icon: Users,
            },
            {
                title: 'KRA 5',
                href: '/kra/students',
                icon: BookOpenText,
            },
        ];
    }

    // const footerNavItems: NavItem[] = [
    //     {
    //         title: 'Repository',
    //         href: 'https://github.com/laravel/react-starter-kit',
    //         icon: FolderGit2,
    //     },
    //     {
    //         title: 'Documentation',
    //         href: 'https://laravel.com/docs/starter-kits#react',
    //         icon: BookOpen,
    //     },
    // ];

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
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
