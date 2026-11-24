import { printerProject } from './portfolio'

const mediaRoot = '/projects/printer-exhaust'

const clips = [
  { name: 'printing', caption: 'Printing the housing on the Bambu Lab P1S' },
  { name: 'fan-test', caption: 'Testing the fan and controller on the bench' },
]

export default function PrinterProject() {
  return (
    <>
      <p className="lead">An inline fan and a custom 3D-printed coupling for my Bambu Lab P1S exhaust.</p>
      <section className="document-section">
        <h2 className="markdown-heading"><span aria-hidden="true">##</span>Problem</h2>
        <p>The P1S’s built-in fan didn’t move enough air through the duct to vent the printer fumes outside.</p>
      </section>
      <section className="document-section">
        <h2 className="markdown-heading"><span aria-hidden="true">##</span>Solution</h2>
        <p>I 3D-printed a new duct coupling and designed a bracket in Tinkercad to hold a second fan inside it. After testing the assembly on the bench, I installed it in the exhaust line to boost airflow toward the outside vent.</p>
      </section>
      <section className="document-section">
        <h2 className="markdown-heading"><span aria-hidden="true">##</span>Finished installation</h2>
        <div className="project-gallery project-installation">
          <figure>
            <img
              src={`${mediaRoot}/installed-vent.webp`}
              alt="Exhaust coupling joined to the flexible duct beside the window, with the fan controller’s blue LEDs lit"
              width="1080"
              height="1440"
            />
            <figcaption>The inline fan coupling installed between the printer exhaust and the window duct.</figcaption>
          </figure>
        </div>
      </section>
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
