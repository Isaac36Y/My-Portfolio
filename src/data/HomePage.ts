import { IconBrandGithub, IconPhone, IconMail, IconBrandLinkedin } from '@tabler/icons-react';

export const skillLists = [
    {
        label: '<frontend>',
        id: 'frontend',
        skills: ['Semantic HTML','Accessibility', 'CSS', 'SCSS', 'Responsive Design', 'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Animations', 'Canvas API', 'AI Integration']
    },
    {
        label: '{ backend }',
        id: 'backend',
        skills: ['Node.js', 'Express', 'Server Side Rendering', 'PostgreSQL', 'Supabase', 'REST APIs', 'Auth / OAuth']
    },
    {
        label: '~/tools',
        id: 'tools',
        skills: ['Git', 'GitHub', 'VS Code', 'npm', 'Claude Code', 'Railway', 'Vercel', 'DevTools']
    }
]

export const cardData = [
    {
        id: 'homebase',
        color: 'var(--color-homebase-accent)',
        type: '// SaaS • Full-Stack',
        name: 'HomeBase',
        icon: '/images/icon-192.png',
        hook: 'A real estate platform where agents log properties and buyers using local-first forms, on and offline, without losing a single input. Every detail is reviewable and buyer relationships are managed in one place.',
        tags: [ 'Node', 'Supabase', 'PWA', 'Claude API' ]
    },
    {
        id: 'bullseye-ledger',
        color: 'var(--color-bullseye-accent)',
        type: '// WebApp • Vanilla JS',
        name: 'Bullseye Ledger',
        icon: '/images/bullseye-ledger-icon.png',
        hook: 'A mobile-first scorecard app for 3D archery shoots that tracks players, computes distance-multiplied scores, and survives a page reload mid-round.',
        tags: [ 'JavaScript', 'localStorage', 'State Persistence' ]
    },
]

export const sideNavAnchors = [
    {
        id: 'github',
        img: IconBrandGithub,
    },
    {
        id: 'phone',
        img: IconPhone,
    },
    {
        id: 'email',
        img: IconMail,
    },
    {
        id: 'email',
        img: IconBrandLinkedin,
    }
]

export const particleColors = {
    darkMode: {
        expanded : {
            r: 31,
            g: 31,
            b: 60,
            a: 1
        },
        tight: {
            r: 59,
            g: 59,
            b: 90,
            a: 1
        }
    },
    lightMode: {
        expanded: {
            r: 213,
            g: 217,
            b: 225,
            a: 1 
        },
        tight: {
            r: 60,
            g: 75,
            b: 110,
            a: 1 
        }
    }
}
export const lineColors = {
    darkMode: {
        expanded: {
            r: 148,
            g: 172,
            b: 190,
            a: 0.1
        },
        tight: {
            r: 148,
            g: 172,
            b: 190,
            a: 0.2
        }
    },
    lightMode: {
        expanded: {
            r: 92,
            g: 136,
            b: 138,
            a: 0.08
        },
        tight: {
            r: 60,
            g: 75,
            b: 110,
            a: 0.2
        }
        
    }
}