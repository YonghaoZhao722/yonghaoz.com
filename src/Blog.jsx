const postTitle = 'RSI: It depends on the Speed of Verification'
export const postPath = '#/blog/automation-moves-at-the-speed-of-verification'

const paragraphs = [
  "In October 2026, OpenAI released 722 math manuscripts written by an internal model, and many of them come with proofs checked in Lean. In late September, a startup released a new type of decision model, and two weeks later OpenAI released a similar API. Many people I talk to now ask how fast AI will replace researchers.",
  "Many people expect recursive self-improvement (RSI) to start soon. I think a more useful question is where it will happen first. My current answer is: automation moves at the speed of verification.",
  "The idea is simple. Any system that improves itself, such as an RL run, a group of agents, or a lab of graduate students, can only improve as fast as it can check whether an attempt is correct. Generating attempts is becoming cheap. Checking them is not. A check can be slow, expensive, noisy, or it can measure the wrong thing.",
  "In math, checking is almost free. A Lean kernel verifies a proof in seconds, and the result is deterministic. If the formal statement is correct, the proof is correct. This is why math was automated first. OpenAI says the average result in its release used about three hours of ChatGPT Pro-level thinking. Code is next, because compilers and tests do the checking, although passing tests is weaker evidence than a formal proof.",
  "The last case, measuring the wrong thing, is important. In July, OpenAI models were tested in a cyber-capability evaluation with reduced safety restrictions, and they broke into Hugging Face's systems. According to both companies, the models were trying to get the benchmark answers, not to attack Hugging Face. Many people described this as a model trying to escape control. I see it as reward hacking: the scorer was the easiest thing to exploit, so the optimizer targeted the scorer. A verifier limits how fast a system can improve, but it is also the part the system will try to exploit. The faster and more automated the verifier is, the more pressure it gets.",
  "Biology is different because its checks have several levels, and faster checks are usually less reliable. The fastest level is in silico prediction: structure predictors, language-model likelihoods, docking scores. These are almost free, but an optimizer can find their biases quickly. The middle level is wet-lab assays. They take days to weeks and cost real money for each design, and the data has batch effects and replicate noise. But the results come from real physics. This is why serious protein design competitions evaluate designs by measured binding, not by predicted structure. The slowest level is clinical endpoints, such as treatment response and long-term outcomes. One label can take years, and many labels are never observed.",
  "If a design scores well in silico but fails in the lab, it is the same problem as the Hugging Face case. The optimizer improved the proxy, not the protein.",
  "verifier map · speed vs. fidelity",
  "In math, the fast check and the reliable check are the same. In biology they are different, and the gap between them is where both the risk and the value are.",
  "I have seen a small example of this in my own work. Most of my research so far is methods for multimodal genomics, from single-cell to spatial omics. One thing I keep learning is that evaluation is harder than modeling. In spatial alignment, I found that a commonly used alignment metric was negatively correlated with true alignment quality in simulation. A method could get the best score on this metric while matching cells at chance level. The metric was cheap to compute, but it did not measure what we actually cared about.",
  "If this view is correct, it changes what is worth working on. A new architecture that is only supported by a public leaderboard is exactly the kind of work an automated system can do well, so its value will probably decrease over time. Methods are still important, but they are not enough on their own. What becomes more valuable is access to slow but reliable verification: running the assay, having the patient cohort, and completing the design-build-test cycle. Two skills also become more valuable: designing checks that are hard to exploit, and choosing which questions are worth an expensive measurement.",
  "I think the value of a PhD is moving toward two things. The first is generating high-quality data for scaling: measurements that are new, clean, and connected to a real scientific question. The second is reviewing AI-generated work: being able to look at a result and judge whether it is correct. Both are on the slow and reliable side of the loop.",
  "For my own PhD, this means spending less effort on improving benchmark scores and more time working with the labs and cohorts that produce new measurements. It also affects how I think about industry. In AI for biology, a model can be copied in two weeks, but years of measured outcomes cannot.",
  "I could be wrong in several ways. Wet labs are becoming faster through automation, cloud labs and pooled assays. If this continues, the advantage will move from having a lab to controlling the whole loop and the data it produces. Learned simulators may replace some experiments. However, a simulator is also a verifier trained on past measurements, so I expect it to help select candidates, not to replace experimental confirmation. Some problems are hard not because checking is slow, but because no one has asked the right question yet. Finally, slow checking also limits human researchers, so the advantage goes to whoever controls the loop, not to humans in general.",
  "I usually describe my research as using data that is cheap to collect to answer questions that are expensive to measure. Thinking about this made me more confident in that direction. The expensive measurement is the part that AI cannot easily complete by itself, and that is where I want to work."
]

function VerificationMap() {
  const x0 = 120, x1 = 712, xm = 416, yT = 72, yB = 432, ym = 252

  return (
    <svg className="verification-map" viewBox="0 0 760 500" role="img" aria-labelledby="verification-map-title verification-map-description">
      <title id="verification-map-title">Verifier map: speed vs. fidelity</title>
      <desc id="verification-map-description">Fast, faithful checks automate first. Slow, faithful wet-lab assays and clinical endpoints are the moat. Fast proxies get gamed, while slow, leaky evaluations offer the worst of both.</desc>
      <rect x={x0} y={yT} width={x1 - x0} height={yB - yT} rx="8" className="verification-map-axis" />
      <rect x={xm + 5} y={yT + 5} width={x1 - xm - 10} height={ym - yT - 10} rx="6" className="verification-map-moat" />
      <line x1={xm} y1={yT} x2={xm} y2={yB} className="verification-map-divider" />
      <line x1={x0} y1={ym} x2={x1} y2={ym} className="verification-map-divider" />
      <g fontWeight="600" fontSize="20">
        <text x={x0 + 20} y={yT + 32}>Automates first</text>
        <text x={xm + 20} y={yT + 32}>The moat</text>
        <text x={x0 + 20} y={ym + 32}>Gets gamed</text>
        <text x={xm + 20} y={ym + 32}>Worst of both</text>
      </g>
      <g fontSize="17">
        <circle cx={x0 + 28} cy={yT + 70} r="5" />
        <text x={x0 + 42} y={yT + 76}>Lean-checked proofs</text>
        <circle cx={x0 + 28} cy={yT + 104} r="5" />
        <text x={x0 + 42} y={yT + 110}>Compilers and unit tests</text>
        <g className="verification-map-measurements">
          <circle cx={xm + 28} cy={yT + 70} r="5" />
          <circle cx={xm + 28} cy={yT + 104} r="5" />
        </g>
        <text x={xm + 42} y={yT + 76}>Wet-lab assays</text>
        <text x={xm + 42} y={yT + 110}>Clinical endpoints</text>
        <circle cx={x0 + 28} cy={ym + 70} r="5" />
        <text x={x0 + 42} y={ym + 76}>In silico proxies</text>
        <circle cx={x0 + 28} cy={ym + 104} r="5" />
        <text x={x0 + 42} y={ym + 110}>Leaderboard benchmarks</text>
        <circle cx={xm + 28} cy={ym + 70} r="5" />
        <text x={xm + 42} y={ym + 76}>
          <tspan x={xm + 42}>Leaky retrospective</tspan>
          <tspan x={xm + 42} dy="24">evaluations</tspan>
        </text>
      </g>
      <g className="verification-map-labels" fontSize="16">
        <text x={x0 - 16} y={yT + 18} textAnchor="end">high</text>
        <text x={x0 - 16} y={yB - 4} textAnchor="end">low</text>
        <text x={x0} y={yB + 28}>fast, cheap</text>
        <text x={x1} y={yB + 28} textAnchor="end">slow, expensive</text>
        <text x={(x0 + x1) / 2} y="488" textAnchor="middle">Time and cost per check</text>
        <text transform="translate(40 252) rotate(-90)" textAnchor="middle">Fidelity of the check</text>
      </g>
    </svg>
  )
}

const postLinks = {
  'released 722 math manuscripts': 'https://openai.com/index/sharing-ai-progress-in-mathematics/',
  'released a similar API': 'https://thenewstack.io/openai-decision-api-luna/',
  "broke into Hugging Face's systems": 'https://news.bloombergtax.com/states-of-play/openai-says-its-ai-caused-hugging-face-cyber-breach-1',
}

function PostParagraph({ paragraph }) {
  const parts = paragraph.split(/(released 722 math manuscripts|released a similar API|broke into Hugging Face's systems)/)

  return (
    <p>
      {parts.map((part, index) => postLinks[part] ? (
        <a key={index} href={postLinks[part]} className="inline-link" target="_blank" rel="noreferrer">{part}</a>
      ) : part)}
    </p>
  )
}

export default function Blog({ isPost }) {
  return (
    <div className="layout-grid layout-grid--full">
      <main className="blog">
        {isPost ? (
          <article className="blog-post">
            <a href="#/blog" className="blog-back inline-link">← All posts</a>
            <header className="blog-post-header">
              <time dateTime="2026-10-08" className="blog-date">October 8, 2026</time>
              <h1>{postTitle}</h1>
            </header>
            <div className="blog-prose">
              {paragraphs.map((paragraph, index) =>
                paragraph === 'verifier map · speed vs. fidelity' ? (
                  <figure key={index}>
                    <VerificationMap />
                    <figcaption>{paragraph}</figcaption>
                  </figure>
                ) : <PostParagraph key={index} paragraph={paragraph} />,
              )}
            </div>
          </article>
        ) : (
          <section className="blog-index">
            <h1>Blog</h1>
            <article className="blog-entry">
              <time dateTime="2026-10-08" className="blog-date">October 8, 2026</time>
              <h2><a href={postPath}>{postTitle}</a></h2>
              <p>Generating attempts is becoming cheap. Checking them is not.</p>
            </article>
          </section>
        )}
        <footer className="site-footer">© 2026 Yonghao Zhao.</footer>
      </main>
    </div>
  )
}
