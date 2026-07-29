import AppLogoIcon from '@/components/app-logo-icon';
import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <div className="flex w-full items-center gap-3 overflow-hidden">
         <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            
            <div className={`grid flex-1 text-left text-sm leading-tight transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                <span className="truncate font-bold">Strategic Plan</span>
                <span className="truncate text-xs text-muted-foreground">University of the Visayas</span>
            </div>
        </div>
    );
}