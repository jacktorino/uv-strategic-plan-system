export type Kra = {
    id: number;
    code: string;
    name?: string;
};

export type SubKra = {
    id: number;
    code: string;
    name?: string;
    kra_id: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;

    role:
        | 'admin'
        | 'planning_officer'
        | 'kra_incharge'
        | 'subkra_incharge'
        | 'responsible_unit'
        | 'viewer';

    // KRA relationship and ID fields
    kra_id?: number | null;
    kra?: Kra | null;

    // SubKRA relationship and ID fields
    subkra_id?: number | null;
    subkra?: SubKra | null;

    created_at: string;
    updated_at: string;

    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    demoUsers: User[];
};

/* @chisel-passkeys */
export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};
/* @end-chisel-passkeys */

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
