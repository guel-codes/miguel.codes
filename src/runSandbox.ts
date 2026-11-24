import frameSource from './sandbox-frame.html?raw'

export const sourceLimit = 12_000
export const runtimeLimitSeconds = 2

export async function compileSnippet(source: string) {
  const ts = await import('typescript')
  const { outputText, diagnostics } = ts.transpileModule(source, {
    fileName: 'sandbox.ts',
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Preserve,
      moduleDetection: ts.ModuleDetectionKind.Legacy,
    },
  })

  const errors = diagnostics?.filter(({ category }) => category === ts.DiagnosticCategory.Error)
  if (errors?.length) {
    throw new Error(errors.slice(0, 5).map((error) => {
      const message = ts.flattenDiagnosticMessageText(error.messageText, '\n')
      if (!error.file || error.start === undefined) return message
      const { line, character } = error.file.getLineAndCharacterOfPosition(error.start)
      return `Line ${line + 1}, column ${character + 1} · ${message}`
    }).join('\n'))
  }

  return outputText
}

export function executeSnippet(
  code: string,
  signal: AbortSignal,
  onOutput: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason)
      return
    }

    const frame = document.createElement('iframe')
    const { port1, port2 } = new MessageChannel()
    frame.hidden = true
    frame.title = 'TypeScript execution environment'
    frame.sandbox.add('allow-scripts')
    frame.srcdoc = frameSource

    let finished = false
    let timeout = window.setTimeout(
      () => finish(new Error('The sandbox could not start.')),
      5_000,
    )

    function finish(error?: unknown) {
      if (finished) return
      finished = true
      window.clearTimeout(timeout)
      signal.removeEventListener('abort', abort)
      port1.postMessage('stop')
      port1.close()
      frame.remove()
      if (error === undefined) resolve()
      else reject(error)
    }

    function abort() {
      finish(signal.reason)
    }

    signal.addEventListener('abort', abort, { once: true })
    port1.onmessage = ({ data }) => {
      if (data?.type === 'output' && typeof data.text === 'string') onOutput(data.text)
      else if (data?.type === 'done') finish()
      else if (data?.type === 'failed') finish(new Error(data.text))
    }
    frame.addEventListener('load', () => {
      window.clearTimeout(timeout)
      timeout = window.setTimeout(
        () => finish(new Error(`Stopped after ${runtimeLimitSeconds} seconds.`)),
        runtimeLimitSeconds * 1_000,
      )
      // A sandboxed frame has an opaque origin. The channel goes only to this frame.
      frame.contentWindow?.postMessage(code, '*', [port2])
    }, { once: true })
    document.body.append(frame)
  })
}
