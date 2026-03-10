import './App.css'

const navItems = [
  { href: '#about', label: 'About', active: true },
  { href: '#research', label: 'Research' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const educationItems = [
  {
    period: '2026–Present',
    institution: 'University of Colorado Anschutz Medical Campus',
    program: 'Ph.D. in Computational Bioscience',
    logo: '/cuanschutz.png',
    logoAlt: 'CU Anschutz logo',
  },
  {
    period: '2022–2026',
    institution: 'University of Leeds',
    program: 'B.Sc. in Computer Science',
    logo: '/leeds_logo.png',
    logoAlt: 'University of Leeds logo',
  },
  {
    period: '2022–2026',
    institution: 'Southwest Jiaotong University',
    program: 'B.Eng. in Computer Science',
    logo: '/SWJTU_logo.png',
    logoAlt: 'Southwest Jiaotong University logo',
    advisorName: 'Prof. Zhipeng Luo',
    advisorUrl: 'https://faculty.swjtu.edu.cn/luozhipeng/en/index.htm',
  },
]

const researchItems = [
  {
    period: '2025–Present',
    institution: 'Brown University',
    title: 'Research Assistant',
    advisorName: 'Prof. Weihan Li',
    advisorUrl: 'https://www.weihan-li.com/',
    logo: '/brown.png',
    logoAlt: 'Brown University logo',
  },
]

const contactItems = [
  {
    label: 'Email',
    href: 'mailto:yonghao.zhao@cuanschutz.edu',
    icon: 'email',
  },
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
    label: 'X',
    href: 'https://x.com/Yonghao040521',
    icon: 'x',
  },
]

function Navigation() {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
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

function ResearchItem({ item }) {
  return (
    <article className="timeline-item">
      <div className="timeline-year">{item.period}</div>
      <div className="timeline-details">
        <img src={item.logo} alt={item.logoAlt} className="timeline-logo" />
        <div className="entry-title">{item.institution}</div>
        <div className="entry-bottom">
          <div className="entry-subtitle">{item.title}</div>
          <div className="advisor-line">
            Advised by{' '}
            <a href={item.advisorUrl} target="_blank" rel="noreferrer">
              {item.advisorName}
            </a>
            .
          </div>
        </div>
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

function ContactIcon({ icon }) {
  if (icon === 'x') return <XIcon />
  if (icon === 'email') return <EmailIcon />
  if (icon === 'linkedin') return <LinkedInIcon />
  if (icon === 'scholar') return <ScholarIcon />
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
  return (
    <>
      <div className="noise-overlay" />

      <div className="layout-grid">
        <header>
          <div className="profile-block">
            <img src="/avatar.png" alt="Yonghao Zhao avatar" className="profile-avatar" />
            <h1>Yonghao Zhao</h1>
            <div className="role">Ph.D. Student in Computational Bioscience</div>
          </div>

          <Navigation />
        </header>

        <main>
          <section id="about">
            <h2>About</h2>
            <p>
              I am an incoming Ph.D. student in Computational Bioscience at
              University of Colorado Anschutz Medical Campus. I received my B.Eng.
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
              . Previously, I was a research intern at Brown University, advised
              by{' '}
              <a
                href="https://www.weihan-li.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                Prof. Weihan Li
              </a>
              .
            </p>
          </section>

          <section id="research">
            <h2>Research</h2>
            <p>
              My research focuses on cancer survival prediction, microscopy image
              learning, and AI for scRNA-seq data. I&apos;m currently building&nbsp;
              <a
                href="https://clawbio.ai/"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                ClawBio
              </a>, a skill hub that turns AI agents into bioinformaticians.
            </p>
          </section>

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
              {researchItems.map((item) => (
                <ResearchItem key={item.institution} item={item} />
              ))}
            </div>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <div className="contact-icons">
              {contactItems.map((item) => (
                <ContactItem key={item.label} item={item} />
              ))}
            </div>
          </section>

          <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
        </main>
      </div>
    </>
  )
}

export default App
