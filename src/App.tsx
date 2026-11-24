import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { experience, files, openSource, printerProject, resume, socialLinks, writing } from './portfolio'
import type { FileId } from './portfolio'
import PrinterProject from './PrinterProject'
import './App.css'

const legacyHashes: Record<string, FileId> = {
  '#top': 'readme',
  '#about': 'readme',
  '#work': 'writing',
}

const allFileIds = files.map(({ id }) => id)

function readHash(): FileId {
  const hash = window.location.hash
  return files.find(({ id }) => hash === `#${id}`)?.id ?? legacyHashes[hash] ?? 'readme'
}

function FileIcon({ type }: { type: 'md' | 'lab' | 'pdf' }) {
  return <span aria-hidden="true" className={`file-icon icon-${type}`}>{ { md: 'M↓', lab: 'µ', pdf: 'PDF' }[type] }</span>
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>
}

function Heading({ children, level = 2 }: { children: ReactNode; level?: 1 | 2 }) {
  const Tag = level === 1 ? 'h1' : 'h2'
  return <Tag className="markdown-heading"><span aria-hidden="true">{level === 1 ? '#' : '##'}</span>{children}</Tag>
}

function Readme() {
  return (
    <>
      <div className="intro">
        <div className="intro-copy">
          <p className="role">Senior Data Engineer <span aria-hidden="true">/</span> Columbus, OH</p>
          <Heading level={1}>Miguel Johnson</Heading>
          <p className="lead">I build data platforms that turn messy signals into reliable analytics.</p>
          <p>I’m a Senior Data Engineer at Wisp. I work across the data stack, from infrastructure and orchestration to dbt models and the analytics they power. I also teach, mentor open-source contributors, and explore machine learning and electronics.</p>
          <div className="actions">
            <a className="primary-action" href="#experience">View experience <span aria-hidden="true">→</span></a>
            <a className="secondary-action" href={resume}>Résumé <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="profile">
          <img src="/miguel-johnson-profile.jpg" alt="Miguel Johnson" width="543" height="777" fetchPriority="high" />
          <figcaption><span aria-hidden="true">▧</span> miguel-johnson-profile.jpg</figcaption>
        </figure>
      </div>
      <dl className="metrics">
        <div><dt>Event processing time at Wisp</dt><dd>−75%</dd></div>
        <div><dt>Snowflake compute cost at Wisp</dt><dd>−15%</dd></div>
        <div><dt>Livestream events per day at eFuse</dt><dd>Millions</dd></div>
      </dl>
      <section className="document-section">
        <Heading>What I’m working on</Heading>
        <div className="readme-links">
          <a href={printerProject.href}><FileIcon type="lab" /><span><strong>{printerProject.title}</strong><small>CAD, 3D printing, and a bench test.</small></span><span aria-hidden="true">→</span></a>
          <a href="#electronics"><FileIcon type="lab" /><span><strong>Electronics</strong><small>Learning circuits and firmware with Raspberry Pi and ESP32.</small></span><span aria-hidden="true">→</span></a>
        </div>
      </section>
    </>
  )
}

function ResourceList({ items }: { items: typeof writing }) {
  return (
    <ul className="resource-list">
      {items.map(({ title, detail, href, source }) => (
        <li key={href}>
          <h2><ExternalLink href={href}>{title}</ExternalLink></h2>
          <p className="entry-meta">{source}</p>
          <p>{detail}</p>
        </li>
      ))}
    </ul>
  )
}

const documents: Record<FileId, ReactNode> = {
  readme: <Readme />,
  experience: (
    <>
      <Heading level={1}>Experience</Heading>
      <p className="lead">Five years and counting building and operating data platforms.</p>
      <ol className="timeline">
        {experience.map(({ company, role, dates, contributions }) => (
          <li key={company}>
            <p className="entry-meta">{dates}</p>
            <h2>{company}</h2>
            <p className="entry-role">{role}</p>
            <ul>{contributions.map((item) => <li key={item}>{item}</li>)}</ul>
          </li>
        ))}
      </ol>
      <section className="document-section">
        <Heading>Tools I work with</Heading>
        <ul className="tags">
          {['SQL', 'Python', 'TypeScript', 'dbt', 'Dagster', 'Airflow', 'Snowflake', 'MotherDuck', 'BigQuery', 'PostgreSQL', 'Terraform', 'Docker', 'AWS', 'GCP'].map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>
      <a className="secondary-action" href={resume}>View full résumé <span aria-hidden="true">↗</span></a>
    </>
  ),
  projects: (
    <>
      <Heading level={1}>Projects</Heading>
      <a className="project-preview" href={printerProject.href}>
        <img src={printerProject.benchPhoto} alt="" width="900" height="1200" />
        <div>
          <h2>{printerProject.title}</h2>
          <p>A custom printed housing and a bench-tested fan assembly.</p>
          <span>Open project <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </>
  ),
  writing: (
    <>
      <Heading level={1}>Writing & talks</Heading>
      <ResourceList items={writing} />
    </>
  ),
  'open-source': (
    <>
      <Heading level={1}>Open source & community</Heading>
      <ResourceList items={openSource} />
    </>
  ),
  electronics: (
    <>
      <Heading level={1}>Electronics</Heading>
      <p className="lead">I’m learning how to build circuits and write the firmware that runs on them.</p>
      <dl className="learning-list">
        <div><dt>Raspberry Pi</dt><dd>Getting comfortable with single-board computers and how they connect to external components.</dd></div>
        <div><dt>ESP32 & firmware</dt><dd>Learning how to program microcontrollers and interact with hardware through code.</dd></div>
        <div><dt>Circuits</dt><dd>Learning circuit fundamentals by building and troubleshooting on a breadboard.</dd></div>
      </dl>
      <section className="document-section">
        <Heading>From the workbench</Heading>
        <a className="project-preview" href={printerProject.href}>
          <img src={printerProject.benchPhoto} alt={printerProject.benchAlt} width="900" height="1200" loading="lazy" />
          <div>
            <h3>{printerProject.title}</h3>
            <p>I tried my hand at CAD, printed a housing, and wired up a fan to see it run.</p>
            <span>See photos and videos <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </section>
    </>
  ),
  'printer-exhaust': (
    <>
      <Heading level={1}>{printerProject.title}</Heading>
      <PrinterProject />
    </>
  ),
}

function App() {
  const [{ activeFile, openFiles }, setWorkspace] = useState<{
    activeFile: FileId | null
    openFiles: FileId[]
  }>(() => ({ activeFile: readHash(), openFiles: allFileIds }))
  const [explorerOpen, setExplorerOpen] = useState(false)
  const editorRef = useRef<HTMLElement>(null)
  const activeTabRef = useRef<HTMLDivElement>(null)
  const file = files.find(({ id }) => id === activeFile)

  useEffect(() => {
    function navigate() {
      if (editorRef.current?.contains(document.activeElement)) {
        editorRef.current.focus({ preventScroll: true })
      }
      const nextFile = readHash()
      setWorkspace((workspace) => ({
        activeFile: nextFile,
        openFiles: workspace.openFiles.includes(nextFile)
          ? workspace.openFiles
          : [...workspace.openFiles, nextFile],
      }))
    }

    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  useEffect(() => {
    editorRef.current?.scrollTo({ top: 0 })
    activeTabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [activeFile])

  function closeTab(id: FileId, tab: HTMLElement | null) {
    const index = openFiles.indexOf(id)
    const neighbor = openFiles[index + 1] ?? openFiles[index - 1] ?? null
    const nextFile = activeFile === id ? neighbor : activeFile

    if (activeFile === id) {
      const url = new URL(window.location.href)
      url.hash = nextFile ?? ''
      window.history.replaceState(window.history.state, '', url)
    }

    const neighborTab = openFiles[index + 1] ? tab?.nextElementSibling : tab?.previousElementSibling
    const neighborLink = neighborTab?.querySelector('a')
    if (neighborLink) {
      neighborLink.focus()
    } else {
      editorRef.current?.focus()
    }

    setWorkspace({ activeFile: nextFile, openFiles: openFiles.filter((fileId) => fileId !== id) })
  }

  return (
    <div className="workspace">
      <a className="skip-link" href="#editor" onClick={(event) => {
        event.preventDefault()
        editorRef.current?.focus()
      }}>Skip to content</a>
      <header className="workspace-header">
        <a className="brand" href="#readme"><span aria-hidden="true">&gt;_</span> miguel.codes</a>
        <button className="explorer-toggle" type="button" aria-controls="explorer" aria-expanded={explorerOpen} onClick={() => setExplorerOpen(!explorerOpen)}>
          <span aria-hidden="true">{explorerOpen ? '▾' : '▸'}</span> Explorer
        </button>
        <a className="header-resume" href={resume}>View résumé <span aria-hidden="true">↗</span></a>
      </header>

      <aside id="explorer" className={`explorer${explorerOpen ? ' is-open' : ''}`}>
        <p className="explorer-label">Explorer</p>
        <p className="folder-label"><span aria-hidden="true">▾</span> miguel.codes</p>
        <nav className="file-tree" aria-label="Explorer files">
          {files.map(({ id, name, type }) => (
            <a key={id} href={`#${id}`} aria-current={activeFile === id ? 'page' : undefined} onClick={() => {
              if (explorerOpen) {
                setExplorerOpen(false)
                editorRef.current?.focus()
              }
            }}><FileIcon type={type} />{name}</a>
          ))}
          <a href={resume}><FileIcon type="pdf" />resume.pdf <span className="outbound" aria-hidden="true">↗</span></a>
        </nav>
        <nav className="socials" aria-label="Social profiles">
          <p className="explorer-label">Elsewhere</p>
          {socialLinks.map(({ label, href }) => <ExternalLink key={label} href={href}>{label}</ExternalLink>)}
        </nav>
      </aside>

      <div className="editor">
        <nav className="tab-strip" aria-label="Editor tabs">
          {openFiles.map((id) => {
            const { name, type } = files.find((item) => item.id === id)!
            const isActive = activeFile === id
            return (
              <div key={id} ref={isActive ? activeTabRef : undefined} className={`editor-tab${isActive ? ' is-active' : ''}`}>
                <a href={`#${id}`} aria-current={isActive ? 'page' : undefined}><FileIcon type={type} />{name}</a>
                <button type="button" aria-label={`Close ${name}`} onClick={(event) => closeTab(id, event.currentTarget.parentElement)}>×</button>
              </div>
            )
          })}
        </nav>
        <div className="breadcrumb">
          <span>miguel.codes</span>
          {file && <><span aria-hidden="true">›</span><FileIcon type={file.type} /><span>{file.name}</span></>}
        </div>
        <main className="editor-scroll" id="editor" tabIndex={-1} ref={editorRef}>
          {activeFile ? (
            <article className="document" key={activeFile}>{documents[activeFile]}</article>
          ) : (
            <div className="document">
              <Heading level={1}>No files open</Heading>
              <p className="lead">Choose a file from the explorer to get back to the portfolio.</p>
              <a className="secondary-action" href="#readme">Open README.md <span aria-hidden="true">→</span></a>
            </div>
          )}
        </main>
      </div>

      <footer className="status-bar">
        <span><span className="status-dot" aria-hidden="true" /> Columbus, OH</span>
        <a className="footer-contact" href="mailto:miguelbjohnson@gmail.com">Email <span aria-hidden="true">↗</span></a>
        {file && <span className="status-file"><FileIcon type={file.type} /> {file.name}</span>}
      </footer>
    </div>
  )
}

export default App
