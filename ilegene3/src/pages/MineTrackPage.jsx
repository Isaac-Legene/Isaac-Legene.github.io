import { useEffect, useState } from 'react'

const bibliographyDatabase = {
  scaramuzza2011:
    'D. Scaramuzza and F. Fraundorfer, "Visual Odometry [Tutorial]," IEEE Robotics & Automation Magazine, vol. 18, no. 4, pp. 80-92, Dec. 2011. doi: 10.1109/MRA.2011.943233.',
  nister2004:
    'D. Nister, O. Naroditsky, and J. Bergen, "Visual odometry," in Proceedings of the 2004 IEEE Computer Society Conference on Computer Vision and Pattern Recognition, 2004, vol. 1, pp. I-652-I-659. doi: 10.1109/CVPR.2004.1315094.',
  orbslam2015:
    'R. Mur-Artal, J. M. M. Montiel, and D. Tardos, "ORB-SLAM: A Versatile and Accurate Monocular SLAM System," IEEE Transactions on Robotics, vol. 31, no. 5, pp. 1147-1163, Oct. 2015. doi: 10.1109/TRO.2015.2463671.',
  minecraft2011: 'Mojang Studios, "Minecraft", 2011. [Video game].',
  wang2018:
    'S. Wang, R. Clark, H. Wen, and N. Trigoni, "End-to-end, sequence-to-sequence probabilistic visual odometry through deep neural networks," The International Journal of Robotics Research, vol. 37, no. 4-5, pp. 513-542, Apr. 2018. doi: 10.1177/0278364917734298.',
  deepvo2017:
    'S. Wang, R. Clark, H. Wen, and N. Trigoni, "DeepVO: Towards End-to-End Visual Odometry with Deep Recurrent Convolutional Neural Networks," in 2017 IEEE International Conference on Robotics and Automation (ICRA), 2017, pp. 2043-2050. doi: 10.1109/ICRA.2017.7989236.',
  modality2023:
    'M. Memmel, R. Bachmann, and A. Zamir, "Modality-Invariant Visual Odometry for Embodied Vision," presented at the Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2023, pp. 21549-21559. Accessed: Feb. 25, 2026. [Online]. Available: https://openaccess.thecvf.com/content/CVPR2023/html/Memmel_Modality-Invariant_Visual_Odometry_for_Embodied_Vision_CVPR_2023_paper.html',
  endtoend2025:
    'A. O. Francani and M. R. O. A. Maximo, "Transformer-Based Model for Monocular Visual Odometry: A Video Understanding Approach," IEEE Access, vol. 13, pp. 13959-13971, 2025. doi: 10.1109/ACCESS.2025.3531667.',
  metrics2014:
    'T. Ciarfuglia, G. Costante, P. Valigi, and E. Ricci, "Evaluation for non-geometric methods for visual odometry," Robotics and Autonomous Systems, vol. 62, issue 12, p. 1717, August 2014. Available: https://doi.org/10.1016/j.robot.2014.08.001',
  kitti:
    'A. Geiger, P. Lenz, and R. Urtasun, "Are we ready for autonomous driving? The KITTI vision benchmark suite," in 2012 IEEE Conference on Computer Vision and Pattern Recognition, Jun. 2012, pp. 3354-3361. doi: 10.1109/CVPR.2012.6248074.',
  pose:
    'J. Sturm, N. Engelhard, F. Endres, W. Burgard, and D. Cremers, "A benchmark for the evaluation of RGB-D SLAM systems," in 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, Oct. 2012, pp. 573-580. doi: 10.1109/IROS.2012.6385773.',
  moratuwage2016:
    'A. M. Moratuwage, D. Wang, and S. Wang, "Review of visual odometry types, approaches, challenges and applications," SpringerPlus, vol. 5, no. 1, 2016.',
  monocularsurvey2023:
    'E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, "Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey," SSRN, 2023. doi: 10.2139/ssrn.4546921.',
  monocularsurvey2024:
    'E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, "Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey," Heliyon, vol. 10, no. 18, e37356, Sep. 2024. doi: 10.1016/j.heliyon.2024.e37356.',
  nnsvg: 'A. LeNail, "NN-SVG: Publication-Ready Neural Network Architecture Schematics," 2019. [Online]. Available: https://alexlenail.me/NN-SVG/'
}

const ganttSchedule = [
  { title: 'Project Team Composition', owner: 'All', start: '2026-02-02', due: '2026-02-06', phase: 'proposal' },
  { title: 'Introduction & Background', owner: 'Ojas', start: '2026-02-09', due: '2026-02-27', phase: 'proposal' },
  { title: 'Problem Definition', owner: 'Isaac & Edmond', start: '2026-02-09', due: '2026-02-27', phase: 'proposal' },
  { title: 'Methods', owner: 'Aaron, Auryn, Edmond', start: '2026-02-16', due: '2026-02-27', phase: 'proposal' },
  { title: 'Potential Dataset', owner: 'Aaron & Auryn', start: '2026-02-14', due: '2026-02-27', phase: 'proposal' },
  { title: 'Potential Results & Discussion', owner: 'Aaron & Auryn', start: '2026-02-23', due: '2026-02-27', phase: 'proposal' },
  { title: 'Dataset Collection', owner: 'All', start: '2026-02-14', due: '2026-02-27', phase: 'proposal' },
  { title: 'Video Creation & Recording', owner: 'All', start: '2026-02-09', due: '2026-02-27', phase: 'proposal' },
  { title: 'GitHub Page', owner: 'Ojas & Isaac', start: '2026-02-09', due: '2026-02-27', phase: 'proposal' },
  { title: 'Model 1 (M1) Design & Selection', owner: 'Aaron & Auryn and Ojas', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M1 Data Cleaning', owner: 'Isaac', start: '2026-02-28', due: '2026-03-16', phase: 'midterm' },
  { title: 'M1 Data Visualization', owner: 'Isaac & Edmond', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M1 Feature Reduction', owner: 'Edmond', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M1 Implementation & Coding', owner: 'All', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M1 Results Evaluation', owner: 'All', start: '2026-03-17', due: '2026-03-20', phase: 'midterm' },
  { title: 'Model 2 (M2) Design & Selection', owner: 'Aaron & Auryn and Ojas', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M2 Data Cleaning', owner: 'Isaac', start: '2026-02-28', due: '2026-03-16', phase: 'midterm' },
  { title: 'M2 Data Visualization', owner: 'Isaac & Edmond', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M2 Feature Reduction', owner: 'Edmond', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M2 Coding & Implementation', owner: 'All', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'M2 Results Evaluation', owner: 'All', start: '2026-03-17', due: '2026-03-20', phase: 'midterm' },
  { title: 'Midterm Report', owner: 'All', start: '2026-02-28', due: '2026-03-20', phase: 'midterm' },
  { title: 'Model 3 (M3) Design & Selection', owner: 'Aaron & Auryn and Ojas', start: '2026-03-21', due: '2026-03-30', phase: 'final' },
  { title: 'M3 Data Cleaning', owner: 'Isaac', start: '2026-03-21', due: '2026-03-30', phase: 'final' },
  { title: 'M3 Data Visualization', owner: 'Isaac & Edmond', start: '2026-03-30', due: '2026-04-10', phase: 'final' },
  { title: 'M3 Feature Reduction', owner: 'Edmond', start: '2026-03-21', due: '2026-04-10', phase: 'final' },
  { title: 'M3 Implementation & Coding', owner: 'All', start: '2026-03-21', due: '2026-04-10', phase: 'final' },
  { title: 'M3 Results Evaluation', owner: 'All', start: '2026-04-11', due: '2026-04-28', phase: 'final' },
  { title: 'M1-M3 Comparison', owner: 'All', start: '2026-04-13', due: '2026-04-28', phase: 'final' },
  { title: 'Video Creation & Recording', owner: 'All', start: '2026-04-14', due: '2026-04-28', phase: 'final' },
  { title: 'Final Report', owner: 'All', start: '2026-04-14', due: '2026-04-28', phase: 'final' }
]

function buildGanttTableHtml() {
  const rows = ganttSchedule
    .map(
      (task) => `
        <tr>
          <td>${task.title}</td>
          <td>${task.owner}</td>
          <td>${task.start}</td>
          <td>${task.due}</td>
          <td>${task.phase}</td>
        </tr>
      `
    )
    .join('')

  return `
    <div class="gantt-table-wrap">
      <table class="gantt-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Owner</th>
            <th>Start</th>
            <th>Due</th>
            <th>Phase</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `
}

function rewriteLegacyUrls(root) {
  root.querySelectorAll('[src]').forEach((element) => {
    const src = element.getAttribute('src')
    if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) {
      return
    }

    element.setAttribute('src', `/legacy/class-projects/cs7641-ml/${src}`)
    if (element.tagName && element.tagName.toLowerCase() === 'img') element.setAttribute('loading', 'lazy')
    if (element.tagName && element.tagName.toLowerCase() === 'video') element.setAttribute('preload', 'metadata')
  })

  root.querySelectorAll('[href]').forEach((element) => {
    const href = element.getAttribute('href')
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('/')) {
      return
    }

    if (href === 'overview.html') {
      element.setAttribute('href', '/projects/minetrack/overview')
      return
    }

    if (href === 'index.html') {
      element.setAttribute('href', '/projects/minetrack')
      return
    }

    element.setAttribute('href', `/legacy/class-projects/cs7641-ml/${href}`)
  })
}

function enhanceLegacyContent(root) {
  const clone = root.cloneNode(true)
  rewriteLegacyUrls(clone)
  const assignedNumbers = {}
  let currentCiteNumber = 1

  clone.querySelectorAll('.cite').forEach((element) => {
    const refId = element.getAttribute('data-ref')
    if (!refId) {
      return
    }

    if (!assignedNumbers[refId]) {
      assignedNumbers[refId] = currentCiteNumber++

      const bibliographySection = clone.querySelector('#bibliography-list')
      if (bibliographySection) {
        const listItem = document.createElement('li')
        listItem.id = `ref-${refId}`
        listItem.innerHTML = `[${assignedNumbers[refId]}] ${bibliographyDatabase[refId] || `Citation missing for: ${refId}`}`
        bibliographySection.appendChild(listItem)
      }
    }

    element.innerHTML = `<a href="#ref-${refId}">[${assignedNumbers[refId]}]</a>`
  })

  const ganttRoot = clone.querySelector('[data-gantt-root]')
  if (ganttRoot) {
    ganttRoot.innerHTML = buildGanttTableHtml()
  }

  // Reuse the same scroll container style as the Gantt table for long table/reference sections.
  const wrapInGanttScroll = (section) => {
    if (!section || section.querySelector(':scope > .gantt-table-wrap')) return
    const wrapper = document.createElement('div')
    wrapper.className = 'gantt-table-wrap'
    while (section.firstChild) {
      wrapper.appendChild(section.firstChild)
    }
    section.appendChild(wrapper)
  }

  wrapInGanttScroll(clone.querySelector('#contribution-table'))
  wrapInGanttScroll(clone.querySelector('#bibliography'))

  return clone.outerHTML
}

export default function MineTrackPage() {
  const [heroHtml, setHeroHtml] = useState('')
  const [reportHtml, setReportHtml] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLegacyContent() {
      const [indexResponse, overviewResponse] = await Promise.all([
        fetch('/legacy/class-projects/cs7641-ml/index.html'),
        fetch('/legacy/class-projects/cs7641-ml/overview.html')
      ])

      const [indexHtml, overviewHtml] = await Promise.all([indexResponse.text(), overviewResponse.text()])
      const parser = new DOMParser()
      const indexDocument = parser.parseFromString(indexHtml, 'text/html')
      const overviewDocument = parser.parseFromString(overviewHtml, 'text/html')

      const legacyHero = indexDocument.querySelector('.hero-landing')
      const legacyReport = overviewDocument.querySelector('[data-report-content]')

      if (cancelled) {
        return
      }

      if (legacyHero) {
        const heroClone = legacyHero.cloneNode(true)
        rewriteLegacyUrls(heroClone)
        setHeroHtml(heroClone.outerHTML)
      } else {
        setHeroHtml('')
      }
      setReportHtml(legacyReport ? enhanceLegacyContent(legacyReport) : '')
    }

    loadLegacyContent().catch(() => {
      if (!cancelled) {
        setHeroHtml('')
        setReportHtml('')
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="page mine-track-page">
      <section className="content-section reveal">
        <p className="eyebrow">MineTrack</p>
        <h1>Machine Learning CS 7641</h1>
        <p className="lede">
          The old project content is now rendered inside React, including the original hero, all report text,
          captions, citations, and the project plan.
        </p>
      </section>

      <section className="mine-track-panel reveal delay-1">
        {heroHtml ? (
          <div className="mine-track-legacy-html" dangerouslySetInnerHTML={{ __html: heroHtml }} />
        ) : (
          <p className="mine-track-loading">Loading the legacy MineTrack content...</p>
        )}
      </section>

      <section className="mine-track-panel mine-track-report-panel reveal delay-2">
        {reportHtml ? (
          <div className="mine-track-report" dangerouslySetInnerHTML={{ __html: reportHtml }} />
        ) : null}
      </section>
    </main>
  )
}
