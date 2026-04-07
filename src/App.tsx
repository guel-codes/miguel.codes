import { useQuery } from '@tanstack/react-query'
import './App.css'

type LinkItem = {
  label: string
  href: string
}

type ProjectItem = {
  title: string
  summary: string
  tags: string[]
  href: string
}

type Highlight = {
  label: string
  value: string
}

type DetailLinkItem = {
  label: string
  href: string
  note: string
}

type SiteContent = {
  name: string
  role: string
  title: string
  location: string
  intro: string
  currentProjectMission: string
  availability: string
  focusAreas: string[]
  highlights: Highlight[]
  primaryLinks: LinkItem[]
  featuredProjects: ProjectItem[]
  writingAndTalks: DetailLinkItem[]
}

const loadSiteContent = async (): Promise<SiteContent> => {
  await new Promise((resolve) => setTimeout(resolve, 120))

  return {
    name: 'Miguel Johnson',
    role: 'Data Engineer',
    title: 'Building data platforms for sentiment analysis, campaign measurement, and revenue-facing analytics.',
    location: '',
    intro:
      'I’m currently building real-time data platforms that ingest high-volume live signals, support brand and campaign measurement, and help teams make better decisions from messy data.',
    currentProjectMission:
      'A mutual-aid resource that helps neighbors share resources, provide support, and organize more easily.',
    availability:
      'Open to software engineering opportunities, product-minded teams, and high-trust environments where I can build, iterate, and grow fast.',
    focusAreas: [
      'Building sentiment analysis platforms',
      'Pipeline efficiency and platform reliability',
      'Teaching and mentoring newcomers to the field',
      'Machine Learning and AI Research'
    ],
    highlights: [
      { label: 'Focus', value: 'Real-time data platforms' },
      { label: 'Current energy', value: 'Shipping and learning in public' },
      { label: 'Style', value: 'High-throughput, cost-aware systems' },
    ],
    primaryLinks: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/miguelbjohnson/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/guel-codes',
      },
      {
        label: 'Medium',
        href: 'https://miguel-codes.medium.com/',
      },
      {
        label: 'Bluesky',
        href: 'https://bsky.app/profile/miguel-codes.bsky.social',
      },
    ],
    featuredProjects: [
      {
        title: 'Locust for PostgreSQL Stress Testing',
        summary:
        'A deeper look at load testing workflows using Python Locust, framed around realistic backend pressure, measurement, and system confidence.',
        tags: ['Python', 'Locust', 'Load Testing'],
        href: 'https://miguel-codes.medium.com/unconventional-load-testing-leveraging-python-locust-for-postgresql-stress-testing-d6e07d63714b',
      },
      {
        title: 'Database Indexing',
        summary:
          'How we increased our overall database performance by 30% by adding indexes to the right columns.',
        tags: ['Databases', 'Performance', 'Engineering'],
        href: 'https://miguel-codes.medium.com/database-indexing-how-we-increased-our-overall-database-performance-bb96bc160545',
      },
      {
        title: 'Deploying a Discord Bot on AWS EC2',
        summary:
          'An applied infrastructure project that shows how I approach deployment, cloud setup, and getting a working tool into a stable environment.',
        tags: ['AWS', 'Automation', 'Deployment'],
        href: 'https://miguel-codes.medium.com/deploying-a-discord-bot-using-aws-ec2-450d85f8e0af',
      },
    ],
    writingAndTalks: [
      {
        label: 'Distribute Aid',
        href: 'https://distributeaid.org/',
        note: '',
      },
      {
        label: 'Djangonaut Space Session 6',
        href: 'https://djangonaut.space/comms/2026/02/19/session-6-team-introductions/',
        note: '',
      },
      {
        label: 'PyOhio 2024 Talk',
        href: 'https://www.pyohio.org/2024/program/talks/stress-less-easy-database-load-testing-using-python-and-locust/',
        note: '',
      },
      {
        label: 'django-taggit',
        href: 'https://github.com/jazzband/django-taggit',
        note: '',
      },
    ],
  }
}

function App() {
  const { data } = useQuery({
    queryKey: ['site-content'],
    queryFn: loadSiteContent,
    staleTime: Infinity,
  })

  if (!data) {
    return (
      <main className="shell shell-loading">
        <div className="loading-card">
          <span className="eyebrow">Miguel Johnson</span>
          <p>Loading portfolio…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="hero-panel">
        <header className="topbar">
          <a className="brand" href="#top">
            {data.name}
          </a>
          <nav className="nav">
            <a href="#work">Work</a>
            <a href="#writing">Writing</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <span className="eyebrow">{data.role}</span>
            <h1>{data.title}</h1>
            <p className="lede">{data.intro}</p>

            <div className="cta-row">
              <a className="button button-primary" href="/miguel-johnson-resume.pdf">
                View Resume
              </a>
              <a className="button button-secondary" href="#work">
                Explore Work
              </a>
            </div>

            <ul className="highlight-grid" aria-label="Highlights">
              {data.highlights.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/miguel-johnson-profile.jpg"
                alt="Miguel Johnson"
                className="portrait"
              />
            </div>

            <div className="status-card">
              <span className="eyebrow">Current focus</span>
              <p>{data.availability}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel panel-intro">
          <span className="eyebrow">Currently Building 🏗️</span>
          <h2>Lichen.fyi</h2>
          <p>{data.currentProjectMission}</p>
          <p className="meta-line">{data.location}</p>
          <a
            className="build-card"
            href="https://lichen.fyi"
            target="_blank"
            rel="noreferrer"
          >
            <span className="build-label">Live project</span>
            <strong>lichen.fyi</strong>
            <p>
              A mutual-aid community resource board and map for sharing offers,
              requests, and local support.
            </p>
          </a>
        </article>

        <article className="panel panel-links">
          <span className="eyebrow">Connect</span>
          <div className="link-list">
            {data.primaryLinks.map((link) => (
              <a
                key={link.label}
                className="link-card"
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <strong>{link.label}</strong>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <span className="eyebrow">Selected Work</span>
          <h2>Technical Writing ✍🏽</h2>
        </div>

        <div className="project-grid">
          {data.featuredProjects.map((project) => (
            <a
              key={project.title}
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-topline">
                <span className="eyebrow">Featured</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul className="tag-row">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      <section className="section split-section" id="writing">
        <article className="panel">
          <span className="eyebrow">Writing + Talks</span>
          <h2>I like sharing what I learn while I build.</h2>
          <div className="stack-list">
            {data.writingAndTalks.map((item) => (
              <a
                key={item.label}
                className="stack-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </a>
            ))}
          </div>
        </article>

        <article className="panel" id="about">
          <span className="eyebrow">About</span>
          <h2>What I’m leaning into right now.</h2>
          <ul className="focus-list">
            {data.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="about-note">
            {/* This first version is intentionally focused: clear story, real links,
            and enough signal for a recruiter or hiring manager to quickly
            understand what I’m about. */}
          </p>
        </article>
      </section>
    </main>
  )
}

export default App
