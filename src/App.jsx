import { useEffect, useState } from 'react'
import './App.css'

const homeNavItems = [
  { href: '#about', label: 'About', active: true },
  { href: '#news', label: 'News' },
  { href: '#/cv', label: 'CV' },
]

const cvNavItems = [
  { href: './', label: 'About' },
  { href: './#news', label: 'News' },
  { href: '#education', label: 'Education', active: true },
  { href: '#experience', label: 'Experience' },
]

const educationItems = [
  {
    period: '2026 – Present',
    institution: 'University of Colorado Anschutz Medical Campus',
    program: 'Ph.D. in Computational Bioscience',
    logo: '/cuanschutz.png',
    logoAlt: 'CU Anschutz logo',
  },
  {
    period: '2022 – 2026',
    institution: 'University of Leeds',
    program: 'B.Sc. in Computer Science',
    logo: '/leeds_logo.png',
    logoAlt: 'University of Leeds logo',
  },
  {
    period: '2022 – 2026',
    institution: 'Southwest Jiaotong University',
    program: 'B.Eng. in Computer Science',
    logo: '/SWJTU_logo.png',
    logoAlt: 'Southwest Jiaotong University logo',
    advisorName: 'Prof. Zhipeng Luo',
    advisorUrl: 'https://faculty.swjtu.edu.cn/luozhipeng/en/index.htm',
  },
]

const experienceItems = [
  {
    period: 'April 2026 – Present',
    institution: 'Westlake University',
    title: 'Research Assistant',
    detailPrefix: 'Advised by',
    detailName: 'Prof. Haoyang Li',
    detailUrl: 'https://hy-li.com/',
    logo: '/westlake.png',
    logoAlt: 'Westlake University logo',
  },
  {
    period: 'March 2025 – Present',
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
  return window.location.hash === '#/cv' ? 'cv' : 'home'
}

function Navigation({ items }) {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className={item.active ? 'active' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ContactLinks() {
  return (
    <div className="contact-block" aria-label="Contact links">
      <a href={emailContact.href} className="email-link">
        <span className="email-link__icon" aria-hidden="true">
          <ContactIcon icon={emailContact.icon} />
        </span>
        <span className="email-link__label">{emailContact.address}</span>
      </a>

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
          <div className="entry-subtitle">{item.program}</div>
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
                href="https://medschool.cuanschutz.edu/docs/officeofresearcheducationlibraries/default-document-library/a-and-hirs-nominations-2024.pdf?sfvrsn=2bbf6bb_0"
                target="_blank"
                rel="noreferrer"
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
        </p>
      </div>
    </article>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5C20.216 5 21 5.784 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.98-.25L12 11.564 19.02 6.5H4.98Z" />
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
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.943 13.5V6.169H2.542V13.5h2.401zm-1.2-8.333c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.358.54-1.358 1.248 0 .694.521 1.248 1.327 1.248h.015zm4.908 8.333V9.359c0-.222.016-.444.082-.603.178-.444.584-.904 1.264-.904.892 0 1.248.682 1.248 1.682V13.5h2.401V9.257c0-2.273-1.212-3.33-2.83-3.33-1.304 0-1.886.722-2.211 1.23h.03V6.169H6.232c.03.65 0 7.331 0 7.331h2.401z" />
    </svg>
  )
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8.211.5a.5.5 0 0 0-.422 0L.246 4.043a.5.5 0 0 0 0 .914l1.706.797L8 8.547l6.048-2.793 1.706-.797a.5.5 0 0 0 0-.914L8.21.5zM1.35 6.43l.28.13.001.001 2.59 1.197-.463 2.31a.5.5 0 0 0 .244.518l3.5 2.1a.5.5 0 0 0 .514 0l3.5-2.1a.5.5 0 0 0 .244-.518l-.463-2.31 2.59-1.197.001-.001.28-.13v4.576a.5.5 0 0 0 1 0V5.98L8 9.453 1.35 5.98v.45z" />
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
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <circle cx="7.2" cy="7.15" r="1.35" fill="var(--bg-color)" />
      <rect x="6.1" y="9.1" width="2.15" height="8.9" rx="0.45" fill="var(--bg-color)" />
      <path
        d="M11.05 9.25h4.15c1.47 0 2.69.42 3.58 1.25.99.9 1.52 2.18 1.52 3.66 0 1.63-.58 2.97-1.69 3.9-.94.77-2.11 1.14-3.61 1.14h-3.95V9.25Zm2.2 1.93v5.96h1.69c1.91 0 3.16-1.15 3.16-2.94 0-1.93-1.18-3.02-3.26-3.02h-1.59Z"
        fill="var(--bg-color)"
      />
    </svg>
  )
}

function ContactIcon({ icon }) {
  if (icon === 'x') return <XIcon />
  if (icon === 'email') return <EmailIcon />
  if (icon === 'linkedin') return <LinkedInIcon />
  if (icon === 'scholar') return <ScholarIcon />
  if (icon === 'orcid') return <OrcidIcon />
  return <GitHubIcon />
}

function ContactItem({ item }) {
  const isEmail = item.href.startsWith('mailto:')

  return (
    <a
      href={item.href}
      className="contact-icon-link"
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
  const isCvPage = page === 'cv'

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <div className="noise-overlay" />

      <div className="layout-grid">
        <header>
          <div className="profile-block">
            <img src="/avatar.png" alt="Yonghao Zhao avatar" className="profile-avatar" />
            <h1>Yonghao Zhao</h1>
            <div className="role">
              University of Colorado
              <br />
              Anschutz Medical Campus
            </div>
            <ContactLinks />
          </div>

          <Navigation items={isCvPage ? cvNavItems : homeNavItems} />
        </header>

        <main>
          {isCvPage ? (
            <>
              <section id="education">
                <h2>Education</h2>
                <div className="timeline-list">
                  {educationItems.map((item) => (
                    <EducationItem key={item.institution} item={item} />
                  ))}
                </div>
              </section>

              <section id="experience">
                <h2>Experience</h2>
                <div className="timeline-list">
                  {experienceItems.map((item) => (
                    <ExperienceItem key={item.institution} item={item} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <section id="about">
                <h2>About</h2>
                <p>
                  I am a Ph.D. student in Computational Bioscience at
                  CU Anschutz. I received my B.Eng.
                  from Southwest Jiaotong University and B.Sc. from University of
                  Leeds where I worked with{' '}
                  <a
                    href="https://faculty.swjtu.edu.cn/luozhipeng/en/index.htm"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-link"
                  >
                    Prof. Zhipeng Luo
                  </a>
                  . Previously, I worked with{' '}
                  <a
                    href="https://www.weihan-li.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-link"
                  >
                    Prof. Weihan Li{' '}
                  </a>
                  on microscopy image segmentation and was also involved in
                  spatial-omics multi-slice alignment with{' '}
                  <a
                    href="https://hy-li.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-link"
                  >
                    Prof. Haoyang Li{' '}
                  </a>
                  .
                </p>
              </section>

              <section id="news">
                <h2>News</h2>
                <div className="news-list">
                  {newsItems.map((item) => (
                    <NewsItem key={`${item.month}-${item.year}-${item.type}`} item={item} />
                  ))}
                </div>
              </section>
            </>
          )}

          <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
        </main>
      </div>
    </>
  )
}

export default App
