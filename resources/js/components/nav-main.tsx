import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

interface NavMainProps {
    dashboardItems?: NavItem[];
    kraItems?: NavItem[];
}

export function NavMain({ dashboardItems = [], kraItems = [] }: NavMainProps) {
    const { isCurrentUrl } = useCurrentUrl();

    // Helper class to override shadcn's default gray active state
    const activeClass =
        'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:data-[active=true]:bg-primary/90 hover:data-[active=true]:text-primary-foreground';

    return (
        <>
            {/* Dashboard Section */}
            {dashboardItems.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarMenu>
                        {dashboardItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                    className={activeClass}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* KRA Management Section */}
            {kraItems.length > 0 && (
                <SidebarGroup className="mt-4 px-2 py-0">
                    <SidebarGroupLabel>Key Result Areas</SidebarGroupLabel>
                    <SidebarMenu>
                        {kraItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                    className={activeClass}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}
        </>
    );
}
