export interface Role {
    roleName: string;
    roleId: string;
}

export const primaryRoles: Role[] = [
    {
        roleName: 'Portfolio Manager',
        roleId: 'C9F323D4-EF97-4C2A-B748-11DB5B8589D0'
    },
    {
        roleName: 'Team Member',
        roleId: 'F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'
    },
    {
        roleName: 'Project Manager',
        roleId: '9E695295-DC5F-44A8-95F1-A329CD475203'
    },
    {
        roleName: 'Business Administrator',
        roleId: '0E83F6BE-79BE-426A-A316-F523FFAECC4F'
    }
];
export const secondaryRoles: Role[] = [
    {
        roleName: 'Budget Administrator',
        roleId: '500ee862-3878-43d9-9378-53feb1832cef'
    },
    {
        roleName: 'Confidential Manager',
        roleId: 'C005FB71-C1FF-44D3-8779-5CA37643D794'
    },
    {
        roleName: 'Resource Manager',
        roleId: '06CDEA21-EB7C-402B-9FB3-CBE507CEE364'
    }
];

