export const files = [
  { id: 'readme', name: 'README.md', type: 'md' },
  { id: 'experience', name: 'experience.md', type: 'md' },
  { id: 'projects', name: 'projects.md', type: 'md' },
  { id: 'writing', name: 'writing.md', type: 'md' },
  { id: 'open-source', name: 'open-source.md', type: 'md' },
  { id: 'electronics', name: 'electronics.md', type: 'lab' },
  { id: 'printer-exhaust', name: 'printer-exhaust.md', type: 'lab' },
] as const

export type FileId = (typeof files)[number]['id']

export const printerProject = {
  title: '3D Printer Exhaust Fan Refactor',
  href: '#printer-exhaust',
  benchPhoto: '/projects/printer-exhaust/bench-assembly.webp',
  benchAlt: 'Fan in a white 3D-printed housing, wired to a controller and battery on the workbench',
}

export const resume = '/miguel-johnson-resume.pdf'

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/guel-codes' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/miguelbjohnson/' },
  { label: 'Medium', href: 'https://miguel-codes.medium.com/' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/miguel-codes.bsky.social' },
]

export const experience = [
  {
    company: 'Wisp',
    role: 'Senior Data Engineer',
    dates: 'Aug 2026 – Present',
    contributions: [
      'Cut event batch processing time by 75%, making data available sooner for downstream analytics.',
      'Reduced Snowflake compute costs by 15% by moving resource-intensive dbt models to incremental processing.',
      'Designed a patient lifecycle data model to help the executive team understand customer behavior and acquisition trends.',
    ],
  },
  {
    company: 'eFuse',
    role: 'Data Engineer',
    dates: 'Jan 2022 – Aug 2026',
    contributions: [
      'Built a real-time analytics platform that ingested millions of livestream events daily. Modeled that data in dbt for sentiment analysis, campaign measurement, and revenue analytics.',
      'Consolidated overlapping ELT pipelines, cutting annual infrastructure spend by about $23,000 while maintaining service levels.',
      'Tuned slow database queries and indexes, reducing CPU utilization by about 60% and infrastructure costs by about 20%.',
    ],
  },
  {
    company: 'Good Soil LLC',
    role: 'Data & Analytics Consultant · Freelance',
    dates: 'Jun 2024 – Present',
    contributions: [
      'Improved dbt transformations in BigQuery and maintained production Airflow orchestration.',
      'Built Python ETL scripts for a production MongoDB-to-PostgreSQL migration on AWS, including incremental synchronization during dual writes.',
      'Taught full-stack JavaScript and open-source contribution workflows at Color Coded Labs.',
    ],
  },
]

export const writing = [
  {
    title: 'Unconventional Load Testing',
    detail: 'How to stress-test PostgreSQL with Python and Locust.',
    href: 'https://miguel-codes.medium.com/unconventional-load-testing-leveraging-python-locust-for-postgresql-stress-testing-d6e07d63714b',
    source: 'Medium',
  },
  {
    title: 'Database Indexing',
    detail: 'How targeted indexes improved overall database performance by 30%.',
    href: 'https://miguel-codes.medium.com/database-indexing-how-we-increased-our-overall-database-performance-bb96bc160545',
    source: 'Medium',
  },
  {
    title: 'Stress Less',
    detail: 'Easy database load testing using Python and Locust.',
    href: 'https://www.pyohio.org/2024/program/talks/stress-less-easy-database-load-testing-using-python-and-locust/',
    source: 'PyOhio 2024',
  },
  {
    title: 'Deploying a Discord Bot on AWS EC2',
    detail: 'A walkthrough of deploying and running a bot on EC2.',
    href: 'https://miguel-codes.medium.com/deploying-a-discord-bot-using-aws-ec2-450d85f8e0af',
    source: 'Medium',
  },
]

export const openSource = [
  {
    title: 'Locust',
    detail: 'Built a PostgreSQL user module that makes it easier to write database load tests.',
    href: 'https://github.com/locustio/locust',
    source: 'Contributor',
  },
  {
    title: 'django-taggit',
    detail: 'Added tag merging and a management command for cleaning up orphaned tags.',
    href: 'https://github.com/jazzband/django-taggit',
    source: 'Contributor',
  },
  {
    title: 'Djangonaut Space',
    detail: 'Coached contributors one-on-one and helped organize sessions in the Django community.',
    href: 'https://djangonaut.space/comms/2026/02/19/session-6-team-introductions/',
    source: 'Team captain & session organizer',
  },
  {
    title: 'Distribute Aid',
    detail: 'Reviewed code for internal tools and mentored newer contributors in weekly sessions.',
    href: 'https://distributeaid.org/',
    source: 'Maintainer & mentor',
  },
]
