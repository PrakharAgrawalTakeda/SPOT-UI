/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'portfolio-center',
        title: 'Portfolio Center',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/portfolio-center'
    },
    {
        // id   : 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
            {
                title: 'Create a Strategic Initiative/Program',
                type: 'basic',
                link: '/create-project/create-strategic-initiative-project'
            },
            {
                title: 'Create a Standard/Simple Project/Program',
                type: 'basic',
                link: '/create-project/create-new-project'
            },
            {
                title: 'Copy an existing Project',
                type: 'basic',
                link: '/create-project/copy-project'
            }
        ],
    },
    {
        id   : 'spot-documents',
        title: 'SPOT Supporting Documents',
        type : 'basic',
        icon : 'heroicons_outline:document-text',
        link : '/spot-documents'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'portfolio-center',
        title: 'Portfolio Center',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/portfolio-center'
    },
    {
        // id   : 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
            {
                title: 'Create a Strategic Initiative/Program',
                type: 'basic',
                link: '/create-project/create-strategic-initiative-project'
            },
            {
                title: 'Create a Standard/Simple Project/Program',
                type: 'basic',
                link: '/create-project/create-new-project'
            },
            {
                title: 'Copy an existing Project',
                type: 'basic',
                link: '/create-project/copy-project'
            }
        ],
    },
    {
        id   : 'spot-documents',
        title: 'SPOT Documents',
        type : 'basic',
        icon : 'heroicons_outline:document-text',
        link : '/spot-documents'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'portfolio-center',
        title: 'Portfolio Center',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/portfolio-center'
    },
    {
        // id   : 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
            {
                title: 'Create a Strategic Initiative/Program',
                type: 'basic',
                link: '/create-project/create-strategic-initiative-project'
            },
            {
                title: 'Create a Standard/Simple Project/Program',
                type: 'basic',
                link: '/create-project/create-new-project'
            },
            {
                title: 'Copy an existing Project',
                type: 'basic',
                link: '/create-project/copy-project'
            }
        ],
    },
    {
        id   : 'spot-documents',
        title: 'SPOT Documents',
        type : 'basic',
        icon : 'heroicons_outline:document-text',
        link : '/spot-documents'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'portfolio-center',
        title: 'Portfolio Center',
        type : 'basic',
        link : '/portfolio-center'
    },
    {
        // id   : 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
            {
                title: 'Create a Strategic Initiative/Program',
                type: 'basic',
                link: '/create-project/create-strategic-initiative-project'
            },
            {
                title: 'Create a Standard/Simple Project/Program',
                type: 'basic',
                link: '/create-project/create-new-project'
            },
            {
                title: 'Copy an existing Project',
                type: 'basic',
                link: '/create-project/copy-project'
            }
        ],
    },
    {
        id   : 'spot-documents',
        title: 'SPOT Supporting Documents',
        type : 'basic',
        externalLink : true,
        link : 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
        target: '_blank'
    },
    {
        id   : 'report-navigator',
        title: 'Report Navigator',
        type : 'basic',
        link : 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
        externalLink: true,
        target: "_blank"

    }

];