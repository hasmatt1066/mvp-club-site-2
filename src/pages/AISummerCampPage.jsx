import React from 'react';
import AnimatedSection from '../components/shared/AnimatedSection';
import '../styles/ai-summer-camp.css';

const COMMUNITY_URL = 'https://mvp-club.mn.co/';

const AISummerCampPage = () => {
  return (
    <div className="asc" style={{ backgroundColor: 'var(--asc-page-bg, #c9dce6)' }}>
      {/* ============== HERO ============== */}
      <section className="asc-hero">
        <div className="asc-topbar">
          <div className="mark"><span className="star" /> MVP CLUB</div>
          <div>Issue No. 01 · June 2026</div>
        </div>

        <div className="asc-nameplate">
          <div className="asc-wordmark">AI Summer Camp</div>
          <div className="asc-wordmark-tag">COHORT 01 · JUNE 2026</div>
        </div>
        <div className="asc-nameplate-sub">
          a guided 4-week program for working professionals. During your workday — not on top of&nbsp;it.
        </div>

        <div className="asc-lede">
          <div className="asc-lede-main">
            <h1>
              <span className="line">Stop reading about&nbsp;AI.</span>
              <span className="line">Spend four Fridays <em>being the&nbsp;one</em></span>
              <span className="line"><em>your team turns&nbsp;to.</em></span>
            </h1>
          </div>

          <aside className="asc-deal">
            <div className="asc-deal-eyebrow">The Deal</div>
            <div className="asc-deal-promise">Become <em>the AI person</em> at work.</div>
            <div className="asc-deal-promise-sub">
              In four Fridays, with people who'll keep building with&nbsp;you.
            </div>

            <div className="asc-deal-specs">
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Dates</div>
                <div className="asc-deal-spec-value">Fri Jun 5, 12, 19, 26</div>
              </div>
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Time</div>
                <div className="asc-deal-spec-value">2–3 PM ET <span className="sub">/ 12–1 MT</span></div>
              </div>
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Office Hrs</div>
                <div className="asc-deal-spec-value">Tue 1–2 PM ET <span className="sub">/ office hours, optional</span></div>
              </div>
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Tools</div>
                <div className="asc-deal-spec-value">Claude &amp; Claude Code</div>
              </div>
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Format</div>
                <div className="asc-deal-spec-value">Live on Google Meet</div>
              </div>
              <div className="asc-deal-spec">
                <div className="asc-deal-spec-label">Includes</div>
                <div className="asc-deal-spec-value">1st month of the MVP Club community</div>
              </div>
            </div>

            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="asc-deal-button"
            >
              Join the community →
            </a>
            <div className="asc-deal-finepoint">
              Registration for Cohort 01 is closed. Join the MVP&nbsp;Club community to be first to hear about the next&nbsp;cohort.
            </div>
          </aside>
        </div>
      </section>

      {/* ============== WHO IT'S FOR ============== */}
      <AnimatedSection>
        <section className="asc-who">
          <div className="asc-who-grid">
            <div>
              <div className="asc-mini-label">This is for you if</div>
              <h2 className="asc-who-h2">
                You're good at your job. AI still feels like <em>someone else's&nbsp;thing.</em>
              </h2>
            </div>
            <div className="asc-who-list">
              <div className="asc-who-item">
                <div className="asc-who-num">01</div>
                <div>You've used Claude or ChatGPT a few times but never built anything you actually use.</div>
              </div>
              <div className="asc-who-item">
                <div className="asc-who-num">02</div>
                <div>You want to be the person on your team people ask about AI — not the one trying to keep up.</div>
              </div>
              <div className="asc-who-item">
                <div className="asc-who-num">03</div>
                <div>You do your best work alongside other people, not alone with a tutorial.</div>
              </div>
              <div className="asc-who-item">
                <div className="asc-who-num">04</div>
                <div>You can carve out one Friday hour per week in June.</div>
              </div>
            </div>
          </div>

          <div className="asc-nametag-wrap">
            <div className="asc-nametag">
              <div className="asc-nametag-label">For Members &amp; Newcomers</div>
              <div className="asc-nametag-body">
                <strong>Already in the MVP Club community?</strong> AI Summer Camp is the structured, deepening version of what you've been doing in the weekly sessions — same coaches, smaller cohort, four weeks of focused progression.{' '}
                <span className="teal">New here?</span> Camp graduates step right into the MVP Club community — a group that keeps practicing together every week, and where the next cohort gets announced&nbsp;first.
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============== PROGRAM ============== */}
      <AnimatedSection>
        <section className="asc-program">
          <div className="asc-program-head">
            <div className="label">The Program</div>
            <h2>In four weeks, you'll build <em>one real thing — for your real&nbsp;work.</em></h2>
            <div className="sub">
              No slides. No theory. Each Friday is one phase: think, plan, build, show. By Week 4 you have something you actually use — and the muscle to keep building on your own.
            </div>
          </div>

          <div className="asc-friday">
            <div className="asc-friday-num">01</div>
            <div className="asc-friday-main">
              <div className="asc-friday-title">Think it through with AI</div>
              <div className="asc-friday-desc">
                Pick a real problem from your actual work. Have your first real thinking conversation with Claude — the kind that gets you somewhere unexpected.
              </div>
            </div>
            <div className="asc-friday-date">Friday<span className="big">June 5</span></div>
          </div>

          <div className="asc-friday">
            <div className="asc-friday-num">02</div>
            <div className="asc-friday-main">
              <div className="asc-friday-title">Write the plan</div>
              <div className="asc-friday-desc">
                See what Claude can actually build with you. Document what you want to make. Leave with a plan you'd hand to a teammate.
              </div>
            </div>
            <div className="asc-friday-date">Friday<span className="big">June 12</span></div>
          </div>

          <div className="asc-friday">
            <div className="asc-friday-num">03</div>
            <div className="asc-friday-main">
              <div className="asc-friday-title">Build it</div>
              <div className="asc-friday-desc">
                Turn your plan into a real, working thing using Claude Code. Your job is to direct and review — not write code. Rough is fine. Broken-at-first is fine.
              </div>
            </div>
            <div className="asc-friday-date">Friday<span className="big">June 19</span></div>
          </div>

          <div className="asc-friday">
            <div className="asc-friday-num">04</div>
            <div className="asc-friday-main">
              <div className="asc-friday-title">Show what you made</div>
              <div className="asc-friday-desc">
                Two-minute demo. Show your screen, tell us the problem, show us the thing. Then meet the community that keeps it going.
              </div>
            </div>
            <div className="asc-friday-date">Friday<span className="big">June 26</span></div>
          </div>

          <div className="asc-dispatch">
            <div className="asc-dispatch-tag">Tuesday Office Hours</div>
            <div className="asc-dispatch-text">
              <strong>Mid-week, 1–2 PM ET.</strong> An hour of open office hours — drop in with whatever you're working on, get unstuck, leave with it working. Optional, but the people who show up get the most out of the program.
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============== TRAIL ============== */}
      <AnimatedSection>
        <section className="asc-trail">
          <div className="asc-trail-inner">
            <div className="asc-manifesto">
              <div className="label">Why we're doing this</div>
              <h2>This is for <em>us</em>.</h2>
              <p>
                AI is going to change all of our lives and careers, and we're a group figuring it out together &mdash; in real time, with real work, and having fun along the way.
              </p>
              <p>
                <strong>Summer Camp is the on-ramp.</strong> Four Fridays gets you building. The community keeps you practicing. Whatever's next, you'll have people building it with you.
              </p>
              <div className="signoff">We're keeping a seat for you. It's yours if you want&nbsp;it.</div>
            </div>

            <div className="asc-trail-map">
              <svg className="asc-trail-svg" viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true">
                {/* Single monotonically rising curve — solid through Camp + Campfire, dashed to the open Horizon */}
                <path d="M 125 138 Q 250 130, 375 105 Q 500 95, 625 65"
                      fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 625 65 Q 750 60, 875 22"
                      fill="none" stroke="var(--color-secondary)" strokeWidth="2.5"
                      strokeDasharray="8 6" strokeLinecap="round" />
                {/* Footprint dots along the curve */}
                <circle cx="200" cy="132" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="270" cy="122" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="335" cy="112" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="440" cy="100" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="510" cy="92" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="580" cy="78" r="2.5" fill="var(--color-accent)" opacity="0.55" />
                <circle cx="690" cy="60" r="2.5" fill="var(--color-secondary)" opacity="0.55" />
                <circle cx="760" cy="52" r="2.5" fill="var(--color-secondary)" opacity="0.55" />
                <circle cx="830" cy="38" r="2.5" fill="var(--color-secondary)" opacity="0.55" />
              </svg>

              <div className="asc-station asc-station-1">
                <div className="asc-station-marker">
                  <div style={{ fontSize: 22, color: 'var(--color-primary)', lineHeight: 0 }}>●</div>
                </div>
                <div className="asc-station-label">Today</div>
                <div className="asc-station-title">You, right now</div>
                <div className="asc-station-sub">Curious. A few prompts in. Nothing built yet.</div>
              </div>

              <div className="asc-station asc-station-2">
                <div className="asc-station-here">you start here</div>
                <div className="asc-station-marker">
                  <div className="asc-icon-star" />
                </div>
                <div className="asc-station-label">Step 1 · The Program</div>
                <div className="asc-station-title">Four Fridays in June</div>
                <div className="asc-station-sub">Build one real thing across four sessions.</div>
              </div>

              <div className="asc-station asc-station-3">
                <div className="asc-fire-members">
                  <div className="asc-fire-stack">
                    <div>T</div><div>P</div><div>A</div><div>+</div>
                  </div>
                  <div className="asc-fire-text">already here</div>
                </div>
                <div className="asc-station-marker">
                  <div style={{ color: 'var(--color-accent-lifted)', fontSize: 22, lineHeight: 0 }}>✦</div>
                </div>
                <div className="asc-station-label">Step 2 · The Community</div>
                <div className="asc-station-title">Practice with people</div>
                <div className="asc-station-sub">Where it keeps going. Weekly. With us.</div>
              </div>

              <div className="asc-station asc-station-4">
                <div className="asc-station-marker">
                  <div style={{ fontSize: 18, color: 'rgba(26,54,93,0.5)', lineHeight: 0 }}>→</div>
                </div>
                <div className="asc-station-label">What's Next</div>
                <div className="asc-station-title">Whatever you build&nbsp;next</div>
                <div className="asc-station-sub">We don't know yet. We're figuring it out together.</div>
              </div>
            </div>

            <div className="asc-invitation">
              <div className="line">
                This is the future we're exploring. <em>It's for us.</em> We want you with&nbsp;us.
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============== SCHEDULE / CALENDAR ============== */}
      <AnimatedSection>
        <section className="asc-schedule">
          <div className="asc-sched-grid">
            <div>
              <div className="asc-mini-label">When we meet</div>
              <h2 className="asc-sched-h2">Built around your <em>real&nbsp;schedule.</em></h2>
              <p className="asc-sched-p">
                All sessions are live on Google Meet. Block the Fridays. Tuesday office hours are optional but they're where the magic happens for most people.
              </p>
              <div className="asc-sched-legend">
                <div className="asc-legend-item"><span className="asc-legend-dot fri" /> Friday main hour</div>
                <div className="asc-legend-item"><span className="asc-legend-dot tue" /> Tuesday office hours</div>
              </div>
            </div>

            <div className="asc-cal">
              <div className="asc-cal-title">June 2026</div>
              <div className="asc-cal-sub">Cohort 01</div>
              <div className="asc-cal-grid">
                <div className="asc-cal-dow">S</div>
                <div className="asc-cal-dow">M</div>
                <div className="asc-cal-dow">T</div>
                <div className="asc-cal-dow">W</div>
                <div className="asc-cal-dow">T</div>
                <div className="asc-cal-dow">F</div>
                <div className="asc-cal-dow">S</div>
                <div className="asc-cal-day empty">31</div>
                <div className="asc-cal-day">1</div>
                <div className="asc-cal-day">2</div>
                <div className="asc-cal-day">3</div>
                <div className="asc-cal-day">4</div>
                <div className="asc-cal-day fri">5</div>
                <div className="asc-cal-day">6</div>
                <div className="asc-cal-day">7</div>
                <div className="asc-cal-day">8</div>
                <div className="asc-cal-day tue">9</div>
                <div className="asc-cal-day">10</div>
                <div className="asc-cal-day">11</div>
                <div className="asc-cal-day fri">12</div>
                <div className="asc-cal-day">13</div>
                <div className="asc-cal-day">14</div>
                <div className="asc-cal-day">15</div>
                <div className="asc-cal-day tue">16</div>
                <div className="asc-cal-day">17</div>
                <div className="asc-cal-day">18</div>
                <div className="asc-cal-day fri">19</div>
                <div className="asc-cal-day">20</div>
                <div className="asc-cal-day">21</div>
                <div className="asc-cal-day">22</div>
                <div className="asc-cal-day tue">23</div>
                <div className="asc-cal-day">24</div>
                <div className="asc-cal-day">25</div>
                <div className="asc-cal-day fri">26</div>
                <div className="asc-cal-day">27</div>
                <div className="asc-cal-day">28</div>
                <div className="asc-cal-day">29</div>
                <div className="asc-cal-day tue">30</div>
                <div className="asc-cal-day empty">1</div>
                <div className="asc-cal-day empty">2</div>
                <div className="asc-cal-day empty">3</div>
                <div className="asc-cal-day empty">4</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============== CLOSING POSTCARD ============== */}
      <AnimatedSection>
        <section className="asc-closing">
          <div className="asc-postcard">
            <div className="asc-postcard-left">
              <div className="asc-postcard-eyebrow">Registration Closed</div>
              <h3>Four Fridays. A new identity at&nbsp;work.</h3>
              <p>
                Cohort 01 is underway and registration is closed. The next cohort gets announced in the MVP Club community — join us there to be first in&nbsp;line.
              </p>
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="asc-postcard-cta"
              >
                Join the community →
              </a>
            </div>
            <div className="asc-postcard-right">
              <div className="asc-stamp">
                <div className="star" />
                <div>AI</div>
                <div className="num">99</div>
                <div>SUMMER</div>
              </div>
              <div className="asc-postmark">FIRST<br />SESSION<br />JUN 5</div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default AISummerCampPage;
