import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex w-full flex-col items-center text-center">
            <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-xl text-sidebar-primary-foreground">
                <AppLogoIcon className="h-14 w-14 fill-current text-white dark:text-black" />
            </div>

            <h2 className="text-sm leading-tight font-bold">
                UNIVERSITY OF THE VISAYAS
            </h2>

            <p className="text-xs text-muted-foreground">Strategic Plan</p>

            {/* <p className="text-xs text-muted-foreground">AY 2026–2027</p> */}
        </div>
    );
}
