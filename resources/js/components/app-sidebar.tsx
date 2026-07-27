import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ChartColumnBig,
    FolderGit2,
    TableProperties,
    Layers, // Example icon for KRA
    CheckCircle2,
    Building2,
    FlaskConical,
    GraduationCap,
    Users,
    UserCheck,
    BookOpenText, // Example icon for KRA
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
import type { NavItem } from '@/types';

// Grouped Navigation Items
const dashboardNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: ChartColumnBig,
    },
    {
        title: 'Compliance by Unit',
        href: '/kra/evaluations', // Replace with actual route when ready
        icon: TableProperties,
    },
];

const kraNavItems: NavItem[] = [
    {
        title: 'KRA 1 · Governance',
        href: '/kra/governance',
        icon: Building2,
    },
    {
        title: 'KRA 2 · Research',
        href: '/kra/research',
        icon: FlaskConical,
    },
    {
        title: 'KRA 3 · Teaching',
        href: '/kra/teaching',
        icon: GraduationCap,
    },
    {
        title: 'KRA 4 · Community',
        href: '/kra/community',
        icon: Users,
    },
    {
        title: 'KRA 5 · Students',
        href: '/kra/students',
        icon: BookOpenText,
    },
];

const adminNavItems: NavItem[] = [
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
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="h-auto justify-center py-4"
                        >
                            <Link
                                href={dashboard()}
                                prefetch
                                className="w-full justify-center"
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Pass grouped sections into NavMain */}
                <NavMain
                    dashboardItems={dashboardNavItems}
                    kraItems={kraNavItems}
                    adminItems={adminNavItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
