import { useEffect, useRef, useState } from 'react'
import { compileSnippet, executeSnippet, runtimeLimitSeconds, sourceLimit } from './runSandbox'
import './Sandbox.css'

const example = `type EngineerProfile = {
  name: string
  specialty: string
  skills: string[]
}

type Project = { title: string; skills: string[] }

class Engineer {
  constructor(private readonly profile: EngineerProfile) {}

  get label() {
    return \`\${this.profile.name} · \${this.profile.specialty}\`
  }

  rankProjects(projects: Project[]) {
    return projects.map((project) => {
      const toLearn = project.skills.filter((skill) => !this.profile.skills.includes(skill))
      const required = project.skills.length
      const match = required ? Math.round(100 * (required - toLearn.length) / required) : 100
      return { title: project.title, match, toLearn }
    }).sort((a, b) => b.match - a.match)
  }
}

const miguel = new Engineer({
  name: 'Miguel Johnson',
  specialty: 'Data engineering',
  skills: ['SQL', 'dbt', 'Python', 'CAD', '3D printing', 'TypeScript'],
})

const projects: Project[] = [
  { title: 'ESP32 sensor logger', skills: ['Python', 'ESP32', 'MQTT'] },
  { title: '3D printer exhaust refactor', skills: ['CAD', '3D printing'] },
  { title: 'Live event analytics', skills: ['SQL', 'dbt', 'TypeScript'] },
]

console.log(\`Project matches for \${miguel.label}\`)
for (const { title, match, toLearn } of miguel.rankProjects(projects)) {
  const nextStep = toLearn.length ? \`Learn \${toLearn.join(', ')}\` : 'Ready to build'
  console.log(\`\${match}% · \${title} · \${nextStep}\`)
}`

type Status = 'Ready' | 'Compiling' | 'Running' | 'Finished' | 'Stopped' | 'Error'

export default function Sandbox() {
  const [source, setSource] = useState(example)
  const [status, setStatus] = useState<Status>('Ready')
  const [output, setOutput] = useState<string[]>([])
  const currentRun = useRef<AbortController | null>(null)
  const busy = status === 'Compiling' || status === 'Running'

  useEffect(() => () => {
    currentRun.current?.abort()
  }, [])

  async function run() {
    if (!source.trim() || currentRun.current) return

    const run = new AbortController()
    currentRun.current = run
    setOutput([])
    setStatus('Compiling')
    try {
      const code = await compileSnippet(source)
      if (run.signal.aborted) return
      setStatus('Running')
      await executeSnippet(code, run.signal, (line) => setOutput((lines) => [...lines, line]))
      setStatus('Finished')
    } catch (error) {
      if (run.signal.aborted) return
      setStatus('Error')
      setOutput((lines) => [...lines, error instanceof Error ? error.message : String(error)])
    } finally {
      if (currentRun.current === run) currentRun.current = null
    }
  }

  function stop() {
    currentRun.current?.abort()
    currentRun.current = null
    setStatus('Stopped')
  }

  function reset() {
    setSource(example)
    setOutput([])
    setStatus('Ready')
  }

  return (
    <div className="sandbox">
      <p id="sandbox-help">Run the TypeScript example, then change the engineer’s skills to see how the project rankings change. Each run has a {runtimeLimitSeconds}-second limit.</p>

      <div className="sandbox-editor">
        <div className="sandbox-toolbar">
          <label htmlFor="sandbox-source">TypeScript source</label>
          <button className="sandbox-reset" type="button" onClick={reset} disabled={busy}>Reset example</button>
        </div>
        <textarea
          id="sandbox-source"
          aria-describedby="sandbox-help"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault()
              void run()
            }
          }}
          maxLength={sourceLimit}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>

      <div className="sandbox-actions">
        <button className="primary-action" type="button" onClick={() => void run()} disabled={busy || !source.trim()}>
          <span aria-hidden="true">▶</span> Run
        </button>
        <button className="secondary-action" type="button" onClick={stop} disabled={!busy}>Stop</button>
      </div>

      <section className="sandbox-output" aria-labelledby="sandbox-output-label">
        <div className="sandbox-toolbar">
          <h2 id="sandbox-output-label">Output</h2>
          <span className="sandbox-status" data-status={status} role="status">{status}</span>
        </div>
        <pre role="log" aria-label="Execution output" tabIndex={0}>{output.join('\n') || (status === 'Finished' ? 'No output.' : 'Run the snippet to see output.')}</pre>
      </section>
    </div>
  )
}
