import { printerProject } from './portfolio'

const mediaRoot = '/projects/printer-exhaust'

const clips = [
  { name: 'printing', caption: 'Printing the housing on the Bambu Lab P1S' },
  { name: 'fan-test', caption: 'Testing the fan and controller on the bench' },
]

export default function PrinterProject() {
  return (
    <>
      <p className="lead">A hands-on build that brought CAD, 3D printing, and a little hardware tinkering together.</p>
      <p>I modeled and printed a housing for a 3D printer exhaust fan, then wired up the fan and tested the assembly on the bench.</p>
      <section className="document-section">
        <h2 className="markdown-heading"><span aria-hidden="true">##</span>Build photos</h2>
        <div className="project-gallery">
          <figure>
            <img src={printerProject.benchPhoto} alt={printerProject.benchAlt} width="900" height="1200" />
            <figcaption>Printed housing, fan, and controller</figcaption>
          </figure>
          <figure>
            <img src={`${mediaRoot}/printer-setup.webp`} alt="Bambu Lab P1S and filament spools on an aluminum-frame workbench" width="900" height="1200" />
            <figcaption>The printer setup</figcaption>
          </figure>
        </div>
      </section>
      <section className="document-section">
        <h2 className="markdown-heading"><span aria-hidden="true">##</span>Print and bench test</h2>
        <div className="project-gallery project-clips">
          {clips.map(({ name, caption }) => (
            <figure key={name}>
              <video
                aria-label={caption}
                poster={`${mediaRoot}/${name}-poster.webp`}
                width="540"
                height="960"
                controls
                playsInline
                preload="none"
              >
                <source src={`${mediaRoot}/${name}.webm`} type="video/webm" />
                <source src={`${mediaRoot}/${name}.mp4`} type="video/mp4" />
                <a href={`${mediaRoot}/${name}.mp4`}>Download the video</a>
              </video>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <a className="secondary-action" href="#projects"><span aria-hidden="true">←</span> Back to projects</a>
    </>
  )
}
