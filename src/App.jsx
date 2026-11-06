import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import LiquidGlass from 'liquid-glass-react'
import './App.css'
import Blog, { postPath } from './Blog'

const topNavItems = [
  { href: './', label: 'Home', page: 'home' },
  { href: '#/experience', label: 'Experience', page: 'experience' },
  { href: '#/blog', label: 'Blog', page: 'blog' },
  { href: '#/misc', label: 'Misc', page: 'misc' },
]

const leedsHonoursCertificateUrl =
  '/201691031_Yonghao%20Zhao_Digital_Certificate.pdf'

const hirsScholarshipUrl = '/hirs-scholarship.pdf'

const educationItems = [
  {
    period: 'Aug 2026 – Present',
    institution: 'University of Colorado Anschutz Medical Campus',
    program: 'Ph.D. in Computational Bioscience',
    logo: '/cuanschutz.png',
    logoAlt: 'CU Anschutz logo',
  },
  {
    period: 'Sep 2022 – Jun 2026',
    institution: 'University of Leeds',
    programPrefix: 'B.Sc. in Computer Science, ',
    programHonours: 'First-Class Honours',
    honoursUrl: leedsHonoursCertificateUrl,
    logo: '/leeds_logo.png',
    logoAlt: 'University of Leeds logo',
  },
  {
    period: 'Sep 2022 – Jun 2026',
    institution: 'Southwest Jiaotong University',
    program: 'B.Eng. in Computer Science',
    logo: '/SWJTU_logo.png',
    logoAlt: 'Southwest Jiaotong University logo',
    achievement: 'Graduated with Best Bachelor Thesis',
    advisorName: 'Zhipeng Luo',
    advisorUrl: 'https://luolab-swjtu.github.io/',
  },
]

const experienceItems = [
  {
    period: 'Apr 2026 – Aug 2026',
    institution: 'Westlake University',
    title: 'Research Assistant',
    detailPrefix: 'Advised by',
    detailName: 'Haoyang Li',
    detailUrl: 'https://hy-li.com/',
    logo: '/westlake.png',
    logoAlt: 'Westlake University logo',
  },
  {
    period: 'Mar 2025 – Sep 2025',
    institution: 'Brown University',
    title: 'Research Collaborator',
    detailName: 'Weihan Li Lab',
    detailUrl: 'https://www.weihan-li.com/',
    logo: '/brown.png',
    logoAlt: 'Brown University logo',
  },
]

const newsItems = [
  {
    month: 'June',
    year: '2026',
    type: 'graduation',
  },
  {
    month: 'April',
    year: '2026',
    type: 'scholarship',
  },
  {
    month: 'April',
    year: '2026',
    type: 'yeastsam',
  },
  {
    month: 'April',
    year: '2026',
    type: 'paper',
  },
  {
    month: 'March',
    year: '2026',
    type: 'cu',
  },
]

const publicationItems = [
  {
    title:
      'DeSCENT: Deconvolutional Single-Cell RNA-seq Enhances Transcriptome-based Cancer Survival Analysis',
    titleUrl: 'https://www.biorxiv.org/content/10.64898/2026.03.15.711877v1.abstract',
    authors: [
      'Yonghao Zhao',
      'Zeyu You',
      'Yu Shen',
      'Jielei Chu',
      'Xun Gong',
      'Tianrui Li',
      'Ziqiang Wang',
      'Chuan Xu',
      'Zhipeng Luo',
      'Yazhou He',
    ],
    venue: 'Bioinformatics',
    year: '2026',
    image: '/descent-source-16x9.svg',
    imageAlt: 'DeSCENT framework: scRNA-seq deconvolution, alignment and inference',
    links: [
      {
        type: 'paper',
        label: 'Paper',
        href: 'https://www.biorxiv.org/content/10.64898/2026.03.15.711877v1.abstract',
      },
      {
        type: 'code',
        label: 'Code',
        href: 'https://github.com/YonghaoZhao722/DeSCENT',
      },
    ],
  },
  {
    title: 'YeastSAM: A Deep Learning Model for Accurate Segmentation of Budding Yeast Cells',
    titleUrl: 'https://www.molbiolcell.org/doi/10.1091/mbc.E25-09-0454',
    authors: ['Yonghao Zhao', 'Zhouyuan Zhu', 'Sen Yang', 'Weihan Li'],
    venue: 'Molecular Biology of the Cell',
    year: '2026',
    featured: 'ASCB News featured',
    image: '/yeast-mascot-banner.svg',
    imageAlt: 'YeastSAM budding-yeast segmentation',
    links: [
      {
        type: 'paper',
        label: 'Paper',
        href: 'https://www.molbiolcell.org/doi/10.1091/mbc.E25-09-0454',
      },
      {
        type: 'code',
        label: 'Code',
        href: 'https://github.com/YonghaoZhao722/YeastSAM',
      },
      {
        type: 'doc',
        label: 'Docs',
        href: 'https://yeastsamdoc.readthedocs.io/en/latest/',
      },
    ],
  },
  {
    title:
      'Tackling small sample survival analysis via transfer learning: A study of colorectal cancer prognosis',
    titleUrl: 'https://www.sciencedirect.com/science/article/pii/S0933365726000783',
    authors: [
      'Yonghao Zhao',
      'Changtao Li',
      'Chi Shu',
      'Qingbin Wu',
      'Hong Li',
      'Chuan Xu',
      'Tianrui Li',
      'Ziqiang Wang',
      'Zhipeng Luo',
      'Yazhou He',
    ],
    venue: 'Artificial Intelligence in Medicine',
    year: '2026',
    image: '/aim-source-16x9.svg',
    imageAlt: 'Source forest training and transfer to target forest fine-tuning',
    links: [
      {
        type: 'paper',
        label: 'Paper',
        href: 'https://www.sciencedirect.com/science/article/pii/S0933365726000783',
      },
      {
        type: 'code',
        label: 'Code',
        href: 'https://github.com/YonghaoZhao722/TSF',
      },
    ],
  },
]

const projectItems = [
  {
    title: 'Clawbio: The First Bioinformatics Harness for Agentic AI',
    titleUrl: 'https://clawbio.ai/',
    role: 'Core Contributor',
    image: '/clawbio.png',
    imageAlt: 'ClawBio',
    description:
      'An open, reproducible collection of domain-expert genomics pipelines packaged as agent skills, built by a global community of contributors.',
    links: [
      {
        type: 'site',
        label: 'Website',
        href: 'https://clawbio.ai/',
      },
      {
        type: 'code',
        label: 'Code',
        href: 'https://github.com/ClawBio/ClawBio',
      },
      {
        type: 'doc',
        label: 'Docs',
        href: 'https://docs.clawbio.ai/',
      },
    ],
  },
]

const honorItems = [
  {
    name: 'First-class Honours',
    detail: 'University of Leeds, 2026',
    url: leedsHonoursCertificateUrl,
  },
  {
    name: 'Best Bachelor Thesis',
    detail: 'Southwest Jiaotong University, 2026',
  },
  {
    name: 'Hirs Scholarship',
    detail: 'CU School of Medicine, 2026',
    url: hirsScholarshipUrl,
  },
]

const emailContact = {
  label: 'Email',
  href: 'mailto:yonghao.zhao@cuanschutz.edu',
  address: 'yonghao.zhao@cuanschutz.edu',
  icon: 'email',
}

const socialItems = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yonghao-zhao-261329377/',
    icon: 'linkedin',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=CkujI4gAAAAJ&hl=en',
    icon: 'scholar',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/YonghaoZhao722',
    icon: 'github',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0007-3180-596X',
    icon: 'orcid',
  },
]

function getPageFromHash() {
  if (window.location.hash === postPath) return 'post'
  if (window.location.hash === '#/blog') return 'blog'
  if (window.location.hash === '#/misc') return 'misc'
  if (window.location.hash === '#/experience') return 'experience'
  if (window.location.hash === '#education') return 'experience'
  if (window.location.hash === '#experience') return 'experience'
  return 'home'
}

function updateGlassReflection(event) {
  if (event.pointerType === 'touch') return
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--glass-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
  event.currentTarget.style.setProperty('--glass-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
}

function TopNavigation({ currentPage }) {
  const listRef = useRef(null)
  const pillRef = useRef(null)
  const gestureRef = useRef(null)
  const suppressClick = useRef(false)
  const [mode, setMode] = useState('idle')

  const placePill = useCallback((link) => {
    if (!link || !pillRef.current || !listRef.current) return
    const box = link.getBoundingClientRect()
    const listBox = listRef.current.getBoundingClientRect()
    const style = pillRef.current.style
    style.width = `${box.width}px`
    style.height = `${box.height}px`
    style.setProperty('--pill-x', `${box.left - listBox.left}px`)
    style.setProperty('--pill-y', `${box.top - listBox.top}px`)
  }, [])

  const alignSelected = useCallback(() => {
    placePill(listRef.current?.querySelector('[aria-current="page"]'))
  }, [placePill])

  useLayoutEffect(() => {
    let disposed = false
    const align = () => {
      if (!disposed && !gestureRef.current?.dragging) alignSelected()
    }
    align()
    const observer = new ResizeObserver(align)
    observer.observe(listRef.current)
    document.fonts.ready.then(align)
    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [currentPage, alignSelected])

  function navigate(item) {
    window.location.assign(item.page === 'home' ? '#' : item.href)
  }

  function cancelGesture() {
    if (gestureRef.current) suppressClick.current = true
    gestureRef.current = null
    setMode('idle')
    requestAnimationFrame(alignSelected)
  }

  function startPress(event) {
    if (gestureRef.current || event.button !== 0 || !event.isPrimary || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    suppressClick.current = false
    const link = event.target.closest('a')
    if (!link) return
    const gesture = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      link,
      left: link.offsetLeft,
      width: link.getBoundingClientRect().width,
      dragging: false,
    }
    gestureRef.current = gesture
    setMode('press')
  }

  function movePress(event) {
    const gesture = gestureRef.current
    if (!gesture || gesture.id !== event.pointerId) return
    const dx = event.clientX - gesture.startX
    if (!gesture.dragging) {
      if (Math.abs(event.clientY - gesture.startY) > 8 && Math.abs(dx) < 8) {
        cancelGesture()
        return
      }
      if (dx === 0) return
      gesture.dragging = true
      placePill(gesture.link)
      listRef.current.setPointerCapture(gesture.id)
      setMode('drag')
    }
    event.preventDefault()
    const left = Math.max(0, Math.min(listRef.current.clientWidth - gesture.width, gesture.left + dx))
    gesture.center = left + gesture.width / 2
    pillRef.current.style.setProperty('--pill-x', `${left}px`)
  }

  function endPress(event) {
    const gesture = gestureRef.current
    if (!gesture || gesture.id !== event.pointerId) return
    gestureRef.current = null
    setMode('idle')
    if (!gesture.dragging) return
    suppressClick.current = true
    const links = [...listRef.current.querySelectorAll('a')]
    const center = gesture.center ?? gesture.left + gesture.width / 2
    const target = links.reduce((closest, link) =>
      Math.abs(link.offsetLeft + link.offsetWidth / 2 - center) <
      Math.abs(closest.offsetLeft + closest.offsetWidth / 2 - center) ? link : closest)
    navigate(topNavItems[links.indexOf(target)])
    // The old page stays selected until its fade-out finishes.
    requestAnimationFrame(() => placePill(target))
  }

  return (
    <nav
      className="top-nav"
      aria-label="Primary navigation"
      onPointerEnter={updateGlassReflection}
      onPointerMove={updateGlassReflection}
    >
      <LiquidGlass
        displacementScale={24}
        blurAmount={0.12}
        saturation={110}
        aberrationIntensity={0.3}
        elasticity={0}
        cornerRadius={999}
        padding="6px"
        overLight
        className="top-nav__glass"
      >
        <ul
          ref={listRef}
          className={`top-nav__items top-nav__items--${mode}`}
          onPointerDown={startPress}
          onPointerMove={movePress}
          onPointerUp={endPress}
          onPointerCancel={cancelGesture}
          onPointerLeave={() => { if (gestureRef.current && !gestureRef.current.dragging) cancelGesture() }}
          onLostPointerCapture={(event) => {
            // Touch capture transfers from the link; its loss bubbles here.
            if (event.target === event.currentTarget && gestureRef.current?.id === event.pointerId) {
              cancelGesture()
            }
          }}
          onDragStart={(event) => event.preventDefault()}
          onContextMenu={(event) => { if (gestureRef.current) event.preventDefault() }}
          onClickCapture={(event) => {
            if (event.detail && suppressClick.current && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
              suppressClick.current = false
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') cancelGesture()
            const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
            if (!step) return
            event.preventDefault()
            const links = [...listRef.current.querySelectorAll('a')]
            const index = links.indexOf(event.target)
            links[(index + step + links.length) % links.length].focus()
          }}
        >
          <li ref={pillRef} className="top-nav__selection" aria-hidden="true" />
          {topNavItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                draggable="false"
                className={currentPage === item.page ? 'active' : undefined}
                aria-current={currentPage === item.page ? 'page' : undefined}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                  event.preventDefault()
                  placePill(event.currentTarget)
                  navigate(item)
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </LiquidGlass>
    </nav>
  )
}

function ContactLinks() {
  const [copyStatus, setCopyStatus] = useState('')

  useEffect(() => {
    if (!copyStatus) return
    const timeout = setTimeout(() => setCopyStatus(''), 3000)
    return () => clearTimeout(timeout)
  }, [copyStatus])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(emailContact.address)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy failed. Please use the email link instead.')
    }
  }

  return (
    <div className="contact-block" aria-label="Contact links">
      <div className="email-row">
        <a
          href={emailContact.href}
          className="email-link"
          aria-label={`Email ${emailContact.address}`}
          title={emailContact.address}
          onPointerEnter={updateGlassReflection}
          onPointerMove={updateGlassReflection}
        >
          <span className="email-link__icon" aria-hidden="true">
            <ContactIcon icon={emailContact.icon} />
          </span>
          <span className="email-link__label">@cuanschutz.edu</span>
        </a>
        <button
          type="button"
          className="contact-icon-link email-copy-button"
          aria-label="Copy email address"
          title={copyStatus || 'Copy email address'}
          onClick={copyEmail}
          onPointerEnter={updateGlassReflection}
          onPointerMove={updateGlassReflection}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {copyStatus === 'Copied' ? (
              <path d="m5 12 4 4L19 6" />
            ) : (
              <>
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M15 4H6a2 2 0 0 0-2 2v9" />
              </>
            )}
          </svg>
        </button>
      </div>
      <span className="email-copy-status" role="status">{copyStatus}</span>

      <div className="profile-links" aria-label="Social media links">
        {socialItems.map((item) => (
          <ContactItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

function EducationItem({ item }) {
  return (
    <article className="timeline-item">
      <div className="timeline-year">{item.period}</div>
      <div className="timeline-details">
        <img src={item.logo} alt={item.logoAlt} className="timeline-logo" />
        <div className="entry-title">{item.institution}</div>
        <div className="entry-bottom">
          <div className="entry-subtitle">
            {item.honoursUrl ? (
              <>
                {item.programPrefix}
                <a href={item.honoursUrl} className="inline-link">
                  {item.programHonours}
                </a>
              </>
            ) : (
              item.program
            )}
          </div>
          {item.achievement ? <div className="advisor-line">{item.achievement}</div> : null}
          {item.advisorName ? (
            <div className="advisor-line">
              Advised by{' '}
              <a href={item.advisorUrl} target="_blank" rel="noreferrer">
                {item.advisorName}
              </a>
              .
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function ExperienceItem({ item }) {
  return (
    <article className="timeline-item">
      <div className="timeline-year">{item.period}</div>
      <div className="timeline-details">
        <img src={item.logo} alt={item.logoAlt} className="timeline-logo" />
        <div className="entry-title">{item.institution}</div>
        <div className="entry-bottom">
          <div className="entry-subtitle">{item.title}</div>
          {item.detailName ? (
            <div className="advisor-line">
              {item.detailPrefix ? `${item.detailPrefix} ` : null}
              <a href={item.detailUrl} target="_blank" rel="noreferrer">
                {item.detailName}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function NewsItem({ item }) {
  return (
    <article className="news-item">
      <div className="news-date" aria-label={`${item.month} ${item.year}`}>
        <span>{item.month}</span>
        <span>{item.year}</span>
      </div>
      <div className="news-content">
        <p>
          {item.type === 'scholarship' ? (
            <>
              Received CU School of Medicine {' '}
              <a
                href={hirsScholarshipUrl}
                className="inline-link"
              >
                <strong>Hirs Scholarship</strong>
              </a>
              . Thanks, CU!
            </>
          ) : null}
          {item.type === 'paper' ? (
            <>
              My paper{' '}
              <a
                href="https://www.sciencedirect.com/science/article/pii/S0933365726000783"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                <strong>
                  Tackling small sample survival analysis via transfer learning:
                  A study of colorectal cancer prognosis
                </strong>
              </a>{' '}
              has been accepted by <strong>AIM</strong>!
            </>
          ) : null}
          {item.type === 'yeastsam' ? (
            <>
              Our project{' '}
              <img
                src="/yeastsam_icon.png"
                alt="YeastSAM logo"
                className="inline-news-icon yeastsam-inline-icon"
              />{' '}
              <a
                href="https://www.molbiolcell.org/doi/10.1091/mbc.E25-09-0454"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                <strong>YeastSAM</strong>
              </a>{' '}
              has been accepted by <strong>MBoC</strong>! View {' '}
              <a
                href="https://yeastsamdoc.readthedocs.io/en/latest/"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                <strong>project page</strong>
              </a>{' '}
              for more details.
            </>
          ) : null}
          {item.type === 'cu' ? (
            <>
              I will join{' '}
              <img
                src="/cuanschutz.png"
                alt="CU Anschutz logo"
                className="inline-news-icon"
              />{' '}
              <strong>CU Anschutz</strong> as a Ph.D. student!
            </>
          ) : null}
          {item.type === 'graduation' ? (
            <>
              Graduated from SWJTU with <strong>Best Bachelor Thesis</strong>, and University of Leeds with{' '}
              <a href={leedsHonoursCertificateUrl} className="inline-link">
                <strong>First-class Honours</strong>
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </article>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="x-icon">
      <path d="M9.522 6.774 15.48 0h-1.411L8.895 5.883 4.764 0H0l6.247 8.895L0 16h1.411l5.463-6.217L11.236 16H16L9.522 6.774z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="5" r="1.5" />
      <path d="M3.5 9h3v11h-3zM11 20V9h3v1.5c1-2.5 6-2.5 6 2V20h-3v-6.5c0-2-3-2-3 0V20z" />
    </svg>
  )
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m2 9 10-5 10 5-10 5zM6 11v6c3 3 9 3 12 0v-6M22 9v8" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.074.55-.17.55-.38 0-.19-.007-.693-.01-1.36-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.001 8.001 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function OrcidIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="8" r=".7" fill="currentColor" stroke="none" />
      <path d="M8 11v6m4-9v9h2a4.5 4.5 0 0 0 0-9z" />
    </svg>
  )
}

function PaperIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
      <path d="M4.5 7.5A.5.5 0 0 1 5 7h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0 2A.5.5 0 0 1 5 9h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0 2A.5.5 0 0 1 5 11h4a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
    </svg>
  )
}

function SiteIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.08 1.9A6.98 6.98 0 0 0 1.5 5h2.06c.27-1.12.66-2.09 1.14-2.83.13-.2.26-.38.38-.54v.27zm2.42-.4c.4.36.83 1.02 1.17 1.97.12.33.23.69.32 1.08H6.51c.09-.39.2-.75.32-1.08.34-.95.77-1.61 1.17-1.97v.27-.27zm3.42.4v-.27c.12.16.25.34.38.54.48.74.87 1.71 1.14 2.83H14.5a6.98 6.98 0 0 0-3.58-3.1zM14.93 6h-2.19c.1.63.16 1.3.17 2h2.38a6.96 6.96 0 0 0-.36-2zm-.36 5h-2.19c-.27 1.12-.66 2.09-1.14 2.83-.13.2-.26.38-.38.54v-.27A6.98 6.98 0 0 0 14.5 11zM8 14.5c-.4-.36-.83-1.02-1.17-1.97-.12-.33-.23-.69-.32-1.08h2.98c-.09.39-.2.75-.32 1.08-.34.95-.77 1.61-1.17 1.97zM6.28 10a13.3 13.3 0 0 1 0-4h3.44a13.3 13.3 0 0 1 0 4H6.28zM1.07 10A6.96 6.96 0 0 1 .71 8h2.38c.01.7.07 1.37.17 2H1.07zm.43-5h2.06A12.4 12.4 0 0 0 3.39 7H1.07c.06-.7.21-1.37.43-2zm-.43 6h2.19c.27 1.12.66 2.09 1.14 2.83.13.2.26.38.38.54v-.27A6.98 6.98 0 0 1 1.5 11zm11.11-4h2.32a6.96 6.96 0 0 0-.43-2h-2.06c.1.63.16 1.3.17 2z" />
    </svg>
  )
}

function PubButtonIcon({ type }) {
  if (type === 'code') return <GitHubIcon />
  if (type === 'doc') return <DocIcon />
  if (type === 'site') return <SiteIcon />
  return <PaperIcon />
}

function AuthorList({ authors }) {
  return (
    <>
      {authors.map((name, index) => (
        <span key={name}>
          {name === 'Yonghao Zhao' ? <strong>{name}</strong> : name}
          {index < authors.length - 1 ? ', ' : ''}
        </span>
      ))}
    </>
  )
}

function PublicationItem({ item }) {
  return (
    <article className={`pub-item${item.image ? ' pub-item--with-figure' : ''}`}>
      {item.image ? (
        <a
          href={item.titleUrl ?? item.links[0]?.href}
          target="_blank"
          rel="noreferrer"
          className="pub-figure"
        >
          <img src={item.image} alt={item.imageAlt ?? item.title} />
        </a>
      ) : null}
      <div className="pub-content">
        <h3 className="pub-title">
          {item.titleUrl ? (
            <a href={item.titleUrl} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        <div className="pub-authors">
          <AuthorList authors={item.authors} />
        </div>
        <div className="pub-venue">
          {item.venue}
          {item.year ? `, ${item.year}` : ''}
          {item.featured && (
            <span style={{ color: '#e06060', marginLeft: '0.4em', fontSize: '0.92em' }}>
              ({item.featured})
            </span>
          )}
        </div>
        {item.links.length > 0 ? (
          <div className="pub-links">
            {item.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`pub-button pub-button--${link.type}`}
                onPointerEnter={updateGlassReflection}
                onPointerMove={updateGlassReflection}
              >
                {link.logo ? (
                  <img src={link.logo} alt="" aria-hidden="true" className="pub-button__logo" />
                ) : (
                  <span className="pub-button__icon" aria-hidden="true">
                    <PubButtonIcon type={link.type} />
                  </span>
                )}
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ProjectItem({ item }) {
  return (
    <article
      className={`pub-item project-item${item.image ? ' pub-item--with-figure' : ''}`}
    >
      {item.image ? (
        <a href={item.titleUrl} target="_blank" rel="noreferrer" className="pub-figure">
          <img
            src={item.image}
            alt={item.imageAlt ?? item.title}
          />
        </a>
      ) : null}
      <div className="pub-content">
        <h3 className="pub-title">
          <a href={item.titleUrl} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </h3>
        <div className="pub-venue">{item.role}</div>
        {item.description ? <p className="project-description">{item.description}</p> : null}
        <div className="pub-links">
          {item.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`pub-button pub-button--${link.type}`}
              onPointerEnter={updateGlassReflection}
              onPointerMove={updateGlassReflection}
            >
              <span className="pub-button__icon" aria-hidden="true">
                <PubButtonIcon type={link.type} />
              </span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function HonorItem({ item }) {
  return (
    <p className="misc-item">
      {item.url ? (
        <a href={item.url} target="_blank" rel="noreferrer" className="inline-link">
          <strong>{item.name}</strong>
        </a>
      ) : (
        <strong>{item.name}</strong>
      )}
      {item.detail ? <span className="misc-item__detail">{item.detail}</span> : null}
    </p>
  )
}

function ContactIcon({ icon }) {
  if (icon === 'x') return <XIcon />
  if (icon === 'email') return <EmailIcon />
  if (icon === 'linkedin') return <LinkedInIcon />
  if (icon === 'scholar') return <ScholarIcon />
  if (icon === 'orcid') return <OrcidIcon />
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21v-3.5c0-1 .3-1.7.8-2.2-3.8-.4-6-1.7-6-5.1 0-1.1.4-2.1 1.1-2.9-.3-1-.3-2.1.2-3.1 1.3-.1 2.5.5 3.4 1.2a12 12 0 0 1 7 0c.9-.7 2.1-1.3 3.4-1.2.5 1 .5 2.1.2 3.1.7.8 1.1 1.8 1.1 2.9 0 3.4-2.2 4.7-6 5.1.5.5.8 1.2.8 2.2V21M9 19c-3 1-4-1-5-2" />
    </svg>
  )
}

function ContactItem({ item }) {
  const isEmail = item.href.startsWith('mailto:')

  return (
    <a
      href={item.href}
      className="contact-icon-link"
      onPointerEnter={updateGlassReflection}
      onPointerMove={updateGlassReflection}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noreferrer'}
      aria-label={item.label}
      title={item.label}
    >
      <ContactIcon icon={item.icon} />
    </a>
  )
}

function App() {
  const [page, setPage] = useState(getPageFromHash)
  const contentRef = useRef(null)
  const isExperiencePage = page === 'experience'
  const isMiscPage = page === 'misc'

  useEffect(() => {
    let currentPage = getPageFromHash()
    let animation

    const handleHashChange = async () => {
      const nextPage = getPageFromHash()
      if (nextPage === currentPage && !animation) return

      const content = contentRef.current
      const { opacity, transform } = getComputedStyle(content)
      animation?.cancel()

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reducedMotion) {
        animation = content.animate([{ opacity, transform }, { opacity: 0, transform }], {
          duration: 220,
          easing: 'ease-out',
          fill: 'forwards',
        })
        try {
          await animation.finished
        } catch {
          return
        }
      }

      flushSync(() => setPage(nextPage))
      currentPage = nextPage
      window.scrollTo({ top: 0, behavior: 'instant' })
      animation?.cancel()
      if (reducedMotion) {
        animation = undefined
        return
      }

      animation = content.animate([
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        duration: 220,
        easing: 'ease-in-out',
      })
      try {
        await animation.finished
        animation = undefined
      } catch {
        // A newer navigation cancels this animation and takes over.
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      animation?.cancel()
    }
  }, [])

  return (
    <>
      <div className="noise-overlay" />

      <div className="site-shell">
        <TopNavigation currentPage={page === 'post' ? 'blog' : page} />

        <div ref={contentRef}>
        {page === 'blog' || page === 'post' ? (
          <Blog isPost={page === 'post'} />
        ) : isMiscPage ? (
          <div className="layout-grid layout-grid--full">
            <main>
              <section id="honors">
                <h2>Honors &amp; Awards</h2>
                <div className="misc-list">
                  {honorItems.map((item) => (
                    <HonorItem key={item.name} item={item} />
                  ))}
                </div>
              </section>

              <section id="service">
                <h2>Academic Service</h2>
                <p className="misc-item">Reviewer: ICLR'27, ACM WWW'27</p>
              </section>

              <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
            </main>
          </div>
        ) : isExperiencePage ? (
          <div className="layout-grid layout-grid--full">
            <main>
              <section id="experience">
                <h2>Research Experience</h2>
                <div className="timeline-list">
                  {experienceItems.map((item) => (
                    <ExperienceItem key={item.institution} item={item} />
                  ))}
                </div>
              </section>

              <hr className="section-divider" />

              <section id="education">
                <h2>Education</h2>
                <div className="timeline-list">
                  {educationItems.map((item) => (
                    <EducationItem key={item.institution} item={item} />
                  ))}
                </div>
              </section>

              <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
            </main>
          </div>
        ) : (
          <div className="home">
            <div className="home-top">
              <aside className="profile-block">
                <img src="/avatar.png" alt="Yonghao Zhao avatar" className="profile-avatar" />
                <h1>Yonghao Zhao</h1>
                <ContactLinks />
              </aside>

              <div className="home-intro">
                <section id="about">
                  <h2>About</h2>
                  <p>
                    I am a Ph.D. student in Computational Bioscience at{' '}
                    <a
                      href="https://www.cuanschutz.edu/about"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      CU Anschutz
                    </a>
                    .
                  </p>
                  <p>
                    I received my B.Eng. from{' '}
                    <a
                      href="https://en.swjtu.edu.cn/index.jsp"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Southwest Jiaotong University
                    </a>{' '}
                    and B.Sc. from the{' '}
                    <a
                      href="https://www.leeds.ac.uk/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      University of Leeds
                    </a>
                    , where I worked with{' '}
                    <a
                      href="https://luolab-swjtu.github.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Zhipeng Luo
                    </a>
                    . Previously, I was a research assistant at{' '}
                    <a
                      href="https://www.brown.edu/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Brown University
                    </a>{' '}
                    where I worked with{' '}
                    <a
                      href="https://www.weihan-li.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Weihan Li
                    </a>{' '}
                    on microscopy image segmentation. I was also involved in
                    cross-omics multi-slice spatial alignment with{' '}
                    <a
                      href="https://hy-li.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Haoyang Li
                    </a>
                    .
                  </p>
                  <p className="about-subhead">Research Interest:</p>
                  <ul className="about-interests">
                      How can we overcome current and future limitations in biotechnology
                      through machine learning? How to make biological processes
                       computable by building systems that can represent, predict,
                        and reason over complex biological scenarios?
                  </ul>
                </section>
              </div>
            </div>

            <section id="news" className="home-section">
              <h2>News</h2>
              <div className="news-list">
                {newsItems.map((item) => (
                  <NewsItem key={`${item.month}-${item.year}-${item.type}`} item={item} />
                ))}
              </div>
            </section>

            <section id="research" className="home-section research-section">
              <h2>Research</h2>
              <div className="pub-list">
                {publicationItems.map((item) => (
                  <PublicationItem key={item.title} item={item} />
                ))}
              </div>
            </section>

            <section id="project" className="home-section">
              <h2>Project</h2>
              <div className="pub-list">
                {projectItems.map((item) => (
                  <ProjectItem key={item.title} item={item} />
                ))}
              </div>
            </section>

            <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
          </div>
        )}
        </div>
      </div>
    </>
  )
}

export default App
