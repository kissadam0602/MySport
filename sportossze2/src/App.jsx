import { useState } from "react";

const SPORTS = [
  { id: "football", label: "Foci", icon: "⚽" },{ id: "basketball", label: "Kosár", icon: "🏀" },
  { id: "tennis", label: "Tenisz", icon: "🎾" },{ id: "volleyball", label: "Röplabda", icon: "🏐" },
  { id: "running", label: "Futás", icon: "🏃" },{ id: "cycling", label: "Kerékpár", icon: "🚴" },
  { id: "swimming", label: "Úszás", icon: "🏊" },{ id: "hiking", label: "Túrázás", icon: "🥾" },
  { id: "padel", label: "Padel", icon: "🏓" },{ id: "other", label: "Egyéb", icon: "🏅" },
];
const DAYS_HU = ["H","K","Sze","Cs","P","Szo","V"];
const DAYS_FULL = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];
const ALL_CITIES = ["Budapest","Debrecen","Miskolc","Pécs","Győr","Nyíregyháza","Kecskemét","Székesfehérvár","Szombathely","Szolnok","Eger","Veszprém","Sopron","Kaposvár","Zalaegerszeg"];
const MOCK_USER = { name: "Kovács Péter", avatar: "KP" };
const SC = { yes: "#22c55e", no: "#ef4444" };
const SL = { yes: "Megyek ✓", no: "Nem megyek ✗" };

const MOCK_EVENTS = [
  { id:1, title:'Heti foci', sport:"football", date:"2026-05-29", time:"18:00", location:"Városligeti pálya", city:"Budapest", min:10, max:14, deadline:"2026-05-28T18:00", organizer:"Kovács Péter", recurrence:"weekly", recurrenceDays:[4], isPublic:false, myStatus:"yes",
    responses:[{name:"Kovács Péter",avatar:"KP",status:"yes"},{name:"Nagy Balázs",avatar:"NB",status:"yes"},{name:"Tóth Dávid",avatar:"TD",status:"yes"},{name:"Horváth Gábor",avatar:"HG",status:"yes"},{name:"Szabó Ádám",avatar:"SÁ",status:"yes"},{name:"Varga Péter",avatar:"VP",status:"yes"},{name:"Molnár Zoli",avatar:"MZ",status:"no"},{name:"Kiss Bence",avatar:"KB",status:"no"},{name:"Fekete Norbi",avatar:"FN",status:"no"}]},
  { id:2, title:'Reggeli futás', sport:"running", date:"2026-05-25", time:"07:00", location:"Margit-sziget", city:"Budapest", min:3, max:8, deadline:"2026-05-24T20:00", organizer:"Nagy Balázs", recurrence:"weekly", recurrenceDays:[], isPublic:true, myStatus:"yes",
    responses:[{name:"Nagy Balázs",avatar:"NB",status:"yes"},{name:"Kovács Péter",avatar:"KP",status:"yes"}]},
  { id:3, title:'Padel mérkőzés', sport:"padel", date:"2026-05-30", time:"10:00", location:"Padel Arena Budapest", city:"Budapest", min:4, max:4, deadline:"2026-05-29T12:00", organizer:"Tóth Dávid", recurrence:"none", recurrenceDays:[], isPublic:false, myStatus:null,
    responses:[{name:"Tóth Dávid",avatar:"TD",status:"yes"},{name:"Horváth Gábor",avatar:"HG",status:"yes"}]},
];

const DISCOVER_EVENTS = [
  {id:101,title:'Heti foci',sport:"football",city:"Győr",location:"Győri Sportpálya",date:"2026-05-26",time:"17:00",day:1,min:10,max:14,current:8,isOpen:true,organizer:"Szabó Péter",recurrence:"weekly"},
  {id:102,title:"Kedd esti foci",sport:"football",city:"Győr",location:"ETO Park",date:"2026-05-26",time:"18:30",day:1,min:8,max:12,current:12,isOpen:false,organizer:"Kovács Bence",recurrence:"weekly"},
  {id:103,title:"Futókör Győr",sport:"running",city:"Győr",location:"Rába-part",date:"2026-05-26",time:"07:00",day:1,min:3,max:10,current:4,isOpen:true,organizer:"Nagy Réka",recurrence:"weekly"},
  {id:104,title:"Kosárlabda edzés",sport:"basketball",city:"Győr",location:"Győri Aréna",date:"2026-05-27",time:"19:00",day:2,min:6,max:10,current:5,isOpen:true,organizer:"Tóth Gábor",recurrence:"none"},
  {id:105,title:"Városi foci",sport:"football",city:"Budapest",location:"Városligeti pálya",date:"2026-05-26",time:"16:00",day:1,min:10,max:16,current:14,isOpen:true,organizer:"Kiss Ádám",recurrence:"none"},
  {id:106,title:"Tenisz páros",sport:"tennis",city:"Pécs",location:"Pécs Teniszklub",date:"2026-05-28",time:"10:00",day:3,min:4,max:4,current:2,isOpen:true,organizer:"Horváth Lili",recurrence:"biweekly"},
  {id:107,title:"Padel bajnokság",sport:"padel",city:"Budapest",location:"Padel Arena",date:"2026-05-27",time:"15:00",day:2,min:4,max:8,current:6,isOpen:true,organizer:"Fekete Norbi",recurrence:"none"},
  {id:108,title:'Reggeli futás',sport:"running",city:"Debrecen",location:"Nagyerdei Park",date:"2026-05-26",time:"06:30",day:1,min:2,max:8,current:3,isOpen:true,organizer:"Varga Eszter",recurrence:"weekly"},
  {id:109,title:"Esti foci",sport:"football",city:"Győr",location:"Kossuth Sporttelep",date:"2026-05-26",time:"16:30",day:1,min:8,max:14,current:5,isOpen:true,organizer:"Molnár Attila",recurrence:"weekly"},
  {id:110,title:'Röplabda szabadtéri',sport:"volleyball",city:"Győr",location:"Dunakapu tér",date:"2026-05-26",time:"17:30",day:1,min:6,max:12,current:4,isOpen:true,organizer:"Papp Kinga",recurrence:"weekly"},
  {id:111,title:"Péntek esti foci",sport:"football",city:"Miskolc",location:"DVTK Stadion",date:"2026-05-29",time:"17:00",day:4,min:10,max:14,current:9,isOpen:true,organizer:"Balogh Tamás",recurrence:"weekly"},
  {id:112,title:"Szombati kerékpár",sport:"cycling",city:"Eger",location:"Egri Vár",date:"2026-05-30",time:"09:00",day:5,min:4,max:12,current:7,isOpen:true,organizer:"Simon Péter",recurrence:"biweekly"},
];

const MOCK_GROUPS = [
  {id:1,name:"Vasárnapi FC",sport:"football",city:"Budapest",isAdmin:true,members:[{name:"Kovács Péter",avatar:"KP",role:"admin"},{name:"Nagy Balázs",avatar:"NB",role:"member"},{name:"Tóth Dávid",avatar:"TD",role:"member"},{name:"Horváth Gábor",avatar:"HG",role:"member"}]},
  {id:2,name:"Futókör",sport:"running",city:"Budapest",isAdmin:false,members:[{name:"Nagy Balázs",avatar:"NB",role:"admin"},{name:"Kovács Péter",avatar:"KP",role:"member"},{name:"Varga Eszter",avatar:"VE",role:"member"}]},
  {id:3,name:"Padel Crew",sport:"padel",city:"Budapest",isAdmin:false,members:[{name:"Tóth Dávid",avatar:"TD",role:"admin"},{name:"Kovács Péter",avatar:"KP",role:"member"},{name:"Kiss Bence",avatar:"KB",role:"member"}]},
];

const MOCK_NOTIFS = [
  {id:1,type:"invite",text:"Tóth Dávid meghívott a 'Padel mérkőzés' eseményre",time:"2 perce",read:false,icon:"📩"},
  {id:2,type:"deadline",text:"Holnap 20:00-ig kell visszajelezned: 'Reggeli futás'",time:"1 órája",read:false,icon:"⏰"},
  {id:3,type:"full",text:"A 'Heti foci' elérte a minimum létszámot – megtartásra kerül!",time:"3 órája",read:true,icon:"✅"},
  {id:4,type:"cancel",text:"Nagy Balázs lemondta a 'Kedd esti kosár' eseményt – Ünnepnap",time:"1 napja",read:true,icon:"🚫"},
  {id:5,type:"invite",text:"Szabó Ádám meghívott a 'Röplabda szabadtéri' eseményre",time:"2 napja",read:true,icon:"📩"},
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const s = (base, extra = {}) => ({ ...base, ...extra });
const inp = { width:"100%", padding:"10px 14px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, background:"#f8fafc", boxSizing:"border-box", outline:"none" };
const sportOf = (id) => SPORTS.find((x) => x.id === id);
const recLabel = (r) => r === "weekly" ? "Hetente" : r === "biweekly" ? "Kéthetente" : r === "monthly" ? "Havonta" : "";

function Av({ initials, size=36, color="#16a34a" }) {
  return <div style={{ width:size, height:size, borderRadius:"50%", background:color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*0.36, flexShrink:0 }}>{initials}</div>;
}

function Toggle({ value, onChange }) {
  return <div onClick={() => onChange(!value)} style={{ width:44, height:24, borderRadius:99, background:value?"#16a34a":"#cbd5e1", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
    <div style={{ position:"absolute", top:2, left:value?22:2, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
  </div>;
}

function StatusBar({ yes, min, max }) {
  const ok = yes >= min;
  return <div style={{ marginTop:8 }}>
    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#64748b", marginBottom:4 }}>
      <span><b style={{ color:ok?"#16a34a":"#ef4444" }}>{yes}</b> / {max} fő</span>
      <span>min. {min} fő</span>
    </div>
    <div style={{ height:8, borderRadius:99, background:"#e2e8f0", position:"relative" }}>
      <div style={{ height:"100%", borderRadius:99, background:ok?"#16a34a":"#ef4444", width:`${Math.min((yes/max)*100,100)}%`, transition:"width 0.4s" }} />
      <div style={{ position:"absolute", left:`${(min/max)*100}%`, top:-3, width:2, height:14, background:"#334155", borderRadius:2 }} />
    </div>
    {!ok && <div style={{ fontSize:11, color:"#ef4444", marginTop:4 }}>⚠ Még {min-yes} fő kell a minimumhoz</div>}
  </div>;
}

// ── EVENT CARD ────────────────────────────────────────────────────────────────
function EventCard({ event, onOpen, onRespond }) {
  const sp = sportOf(event.sport);
  const yes = event.responses.filter(r => r.status==="yes").length;
  const ok = yes >= event.min;
  const deadlinePassed = new Date(event.deadline) < new Date();
  return (
    <div onClick={() => onOpen(event)} style={{ background:"#fff", borderRadius:16, padding:"16px 18px", marginBottom:12, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", cursor:"pointer", border:"1.5px solid #f1f5f9" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        <div style={{ width:48, height:48, borderRadius:12, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{sp?.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:700, fontSize:15, color:event.cancelled?"#94a3b8":"#0f172a" }}>{event.title}</div>
            {event.cancelled
              ? <div style={{ fontSize:11, fontWeight:700, color:"#ef4444", background:"#fef2f2", borderRadius:99, padding:"2px 8px" }}>🚫 Lemondva</div>
              : event.myStatus
                ? <div style={{ fontSize:11, fontWeight:600, color:SC[event.myStatus], background:SC[event.myStatus]+"18", borderRadius:99, padding:"2px 8px" }}>{SL[event.myStatus]}</div>
                : null}
          </div>
          <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{sp?.label}</div>
          <div style={{ fontSize:12, color:"#475569", marginTop:4 }}>📅 {event.date} {event.time} · 📍 {[event.city,event.location].filter(Boolean).join(", ")}</div>
          {event.recurrence && event.recurrence!=="none" && <div style={{ fontSize:11, color:"#7c3aed", marginTop:3, fontWeight:600 }}>🔁 {recLabel(event.recurrence)} ismétlődő</div>}
        </div>
      </div>
      <StatusBar yes={yes} min={event.min} max={event.max} />
      {!event.myStatus && !deadlinePassed && !event.cancelled && (
        <div onClick={e => e.stopPropagation()} style={{ marginTop:12, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
          <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, marginBottom:8 }}>Részt veszel a következő fordulón?</div>
          <div style={{ display:"flex", gap:8 }}>
            {["yes","no"].map(st => (
              <button key={st} onClick={() => onRespond(event.id, st)} style={{ flex:1, padding:"9px 0", borderRadius:10, border:`2px solid ${SC[st]}`, background:"#fff", color:SC[st], fontWeight:700, fontSize:13, cursor:"pointer" }}>
                {st==="yes"?"✓ Megyek":"✗ Nem megyek"}
              </button>
            ))}
          </div>
        </div>
      )}
      {!ok && event.isPublic && !event.cancelled && <div style={{ marginTop:8, fontSize:12, color:"#7c3aed", fontWeight:600 }}>🌐 Nyilvános meghívó aktív</div>}
    </div>
  );
}

// ── EVENT DETAIL ──────────────────────────────────────────────────────────────
function EventDetail({ event, onBack, onRespond, allEvents, onCancelEvent, onEdit }) {
  const sp = sportOf(event.sport);
  const yes = event.responses.filter(r => r.status==="yes").length;
  const ok = yes >= event.min;
  const isOrganizer = event.organizer === MOCK_USER.name;
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedList, setInvitedList] = useState([]);
  const [inviteMsg, setInviteMsg] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importSource, setImportSource] = useState(null);
  const [selectedImportees, setSelectedImportees] = useState([]);
  const [importSent, setImportSent] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const CANCEL_REASONS = ["Ünnepnap / munkaszüneti nap","Nincs meg a minimum létszám","Pálya / helyszín nem elérhető","Időjárási körülmények","Egyéb ok"];
  const otherEvents = allEvents.filter(e => e.id !== event.id);

  const handleInvite = () => {
    if (!inviteEmail.includes("@")) { setInviteMsg("❌ Érvényes email cím szükséges!"); return; }
    if (invitedList.includes(inviteEmail)) { setInviteMsg("⚠️ Ez a cím már meg van hívva."); return; }
    setInvitedList(l => [...l, inviteEmail]); setInviteEmail("");
    setInviteMsg(`✅ Meghívó elküldve: ${inviteEmail}`); setTimeout(() => setInviteMsg(""), 3000);
  };

  const infoItems = [
    { label:"Dátum", value:event.date+" "+event.time },
    { label:"Helyszín", value:[event.city,event.location].filter(Boolean).join(", ")||"–" },
    { label:"Visszajelzés határideje", value:event.deadline?.replace("T"," ") },
    { label:"Szervező", value:event.organizer },
  ];

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0 12px 0" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#334155" }}>← Vissza</button>
        {isOrganizer && !event.cancelled && (
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={onEdit} style={{ background:"none", border:"1.5px solid #bfdbfe", borderRadius:10, padding:"6px 12px", color:"#3b82f6", fontWeight:700, fontSize:13, cursor:"pointer" }}>✏️</button>
            <button onClick={() => setShowCancelModal(true)} style={{ background:"none", border:"1.5px solid #fca5a5", borderRadius:10, padding:"6px 12px", color:"#ef4444", fontWeight:700, fontSize:13, cursor:"pointer" }}>🚫</button>
          </div>
        )}
      </div>

      {/* Cancel modal */}
      {showCancelModal && (
        <div onClick={() => setShowCancelModal(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:24, width:"100%", maxWidth:430, boxSizing:"border-box" }}>
            <div style={{ fontWeight:800, fontSize:17, color:"#0f172a", marginBottom:4 }}>🚫 Esemény lemondása</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:16 }}>A résztvevők értesítést kapnak.</div>
            <div style={{ fontSize:12, fontWeight:700, color:"#64748b", marginBottom:8 }}>Lemondás oka:</div>
            {CANCEL_REASONS.map(r => (
              <div key={r} onClick={() => setCancelReason(r)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:10, marginBottom:6, cursor:"pointer", border:`1.5px solid ${cancelReason===r?"#ef4444":"#e2e8f0"}`, background:cancelReason===r?"#fef2f2":"#f8fafc" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", flexShrink:0, border:`2px solid ${cancelReason===r?"#ef4444":"#cbd5e1"}`, background:cancelReason===r?"#ef4444":"#fff" }} />
                <span style={{ fontSize:13, fontWeight:600, color:cancelReason===r?"#ef4444":"#334155" }}>{r}</span>
              </div>
            ))}
            {cancelReason==="Egyéb ok" && <input placeholder="Írd le az okot..." value={customReason} onChange={e => setCustomReason(e.target.value)} style={{ ...inp, marginTop:4, marginBottom:4 }} />}
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              <button onClick={() => setShowCancelModal(false)} style={{ flex:1, padding:"12px 0", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#f8fafc", color:"#475569", fontWeight:700, fontSize:14, cursor:"pointer" }}>Mégsem</button>
              <button onClick={() => { if(!cancelReason) return; onCancelEvent(event.id, cancelReason==="Egyéb ok"?(customReason||"Egyéb ok"):cancelReason); setShowCancelModal(false); }} disabled={!cancelReason}
                style={{ flex:1, padding:"12px 0", borderRadius:12, border:"none", background:cancelReason?"#ef4444":"#e2e8f0", color:cancelReason?"#fff":"#94a3b8", fontWeight:800, fontSize:14, cursor:cancelReason?"pointer":"default" }}>
                Lemondás
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancelled banner */}
      {event.cancelled && <div style={{ background:"#fef2f2", border:"1.5px solid #fca5a5", borderRadius:14, padding:16, marginBottom:16, textAlign:"center" }}>
        <div style={{ fontWeight:800, color:"#ef4444", fontSize:16, marginBottom:4 }}>🚫 Esemény lemondva</div>
        {event.cancelReason && <div style={{ fontSize:13, color:"#b91c1c" }}>Ok: {event.cancelReason}</div>}
      </div>}

      {/* Event info card */}
      <div style={{ background:"#fff", borderRadius:20, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", marginBottom:16 }}>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ width:56, height:56, borderRadius:14, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>{sp?.icon}</div>
          <div>
            <div style={{ fontWeight:800, fontSize:18, color:"#0f172a" }}>{event.title}</div>
            <div style={{ color:"#64748b", fontSize:13 }}>{sp?.label}</div>
          </div>
        </div>
        <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {infoItems.map(item => (
            <div key={item.label} style={{ background:"#f8fafc", borderRadius:10, padding:"8px 12px" }}>
              <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600 }}>{item.label}</div>
              <div style={{ fontSize:13, color:"#1e293b", fontWeight:600 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:16 }}><StatusBar yes={yes} min={event.min} max={event.max} /></div>
        {!event.cancelled && (
          <div style={{ display:"flex", gap:8, marginTop:16, justifyContent:"center" }}>
            {["yes","no"].map(st => (
              <button key={st} onClick={() => onRespond(event.id, st)} style={{ flex:1, padding:"10px 0", borderRadius:12, border:`2px solid ${event.myStatus===st?SC[st]:"#e2e8f0"}`, background:event.myStatus===st?SC[st]+"15":"#fff", color:event.myStatus===st?SC[st]:"#64748b", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                {st==="yes"?"✓ Megyek":"✗ Nem megyek"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responses */}
      <div style={{ background:"#fff", borderRadius:16, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginBottom:12 }}>
        <div style={{ fontWeight:700, color:"#0f172a", marginBottom:12, fontSize:15 }}>Visszajelzések</div>
        <div style={{ display:"flex", gap:16, marginBottom:14 }}>
          {[{label:"Jön",count:yes,color:"#22c55e"},{label:"Nem jön",count:event.responses.filter(r=>r.status==="no").length,color:"#ef4444"}].map(g => (
            <div key={g.label} style={{ textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize:22, color:g.color }}>{g.count}</div>
              <div style={{ fontSize:11, color:"#94a3b8" }}>{g.label}</div>
            </div>
          ))}
        </div>
        {event.responses.map((r,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid #f1f5f9" }}>
            <Av initials={r.avatar} color={SC[r.status]+"cc"} />
            <div style={{ flex:1, fontWeight:500, fontSize:14 }}>{r.name}</div>
            <div style={{ fontSize:12, color:SC[r.status], fontWeight:700 }}>{SL[r.status]}</div>
          </div>
        ))}
      </div>

      {/* Import from other event */}
      <div style={{ background:"#fff", borderRadius:16, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginBottom:12 }}>
        <div style={{ fontWeight:700, color:"#0f172a", marginBottom:12, fontSize:15 }}>👥 Meghívás másik eseményről</div>
        {!importSent ? (
          <>
            <div style={{ fontSize:12, color:"#64748b", marginBottom:8, fontWeight:600 }}>1. Válassz eseményt:</div>
            {otherEvents.map(e => {
              const es = sportOf(e.sport);
              const sel = importSource?.id === e.id;
              return (
                <div key={e.id} onClick={() => { setImportSource(e); setSelectedImportees([]); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:sel?"#faf5ff":"#f8fafc", borderRadius:10, marginBottom:6, cursor:"pointer", border:`1.5px solid ${sel?"#7c3aed":"#e2e8f0"}` }}>
                  <span style={{ fontSize:22 }}>{es?.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>{e.title}</div>
                    <div style={{ fontSize:11, color:"#94a3b8" }}>{e.date} · {e.responses.filter(r=>r.status==="yes").length} résztvevő</div>
                  </div>
                  {sel && <span style={{ fontSize:16, color:"#7c3aed" }}>✓</span>}
                </div>
              );
            })}
            {importSource && (
              <>
                <div style={{ fontSize:12, color:"#64748b", margin:"14px 0 8px", fontWeight:600 }}>2. Kiket hívj meg?</div>
                {importSource.responses.filter(r=>r.status==="yes").map((r,i) => {
                  const picked = selectedImportees.includes(r.name);
                  return (
                    <div key={i} onClick={() => setSelectedImportees(prev => picked?prev.filter(n=>n!==r.name):[...prev,r.name])} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", background:picked?"#f0fdf4":"#f8fafc", borderRadius:10, marginBottom:6, cursor:"pointer", border:`1.5px solid ${picked?"#16a34a":"#e2e8f0"}` }}>
                      <Av initials={r.avatar} size={32} color={picked?"#16a34a":"#94a3b8"} />
                      <div style={{ flex:1, fontWeight:600, fontSize:14 }}>{r.name}</div>
                      <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${picked?"#16a34a":"#cbd5e1"}`, background:picked?"#16a34a":"#fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700 }}>{picked?"✓":""}</div>
                    </div>
                  );
                })}
                <div style={{ display:"flex", gap:8, marginTop:12 }}>
                  <button onClick={() => { const all=importSource.responses.filter(r=>r.status==="yes").map(r=>r.name); setSelectedImportees(selectedImportees.length===all.length?[]:all); }} style={{ flex:1, padding:"9px 0", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", color:"#475569", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                    {selectedImportees.length===importSource.responses.filter(r=>r.status==="yes").length?"Kijelölés törlése":"Mindenki"}
                  </button>
                  <button onClick={() => setImportSent(true)} disabled={selectedImportees.length===0} style={{ flex:1, padding:"9px 0", borderRadius:10, border:"none", background:selectedImportees.length>0?"#16a34a":"#e2e8f0", color:selectedImportees.length>0?"#fff":"#94a3b8", fontWeight:700, fontSize:13, cursor:selectedImportees.length>0?"pointer":"default" }}>
                    Meghívás ({selectedImportees.length})
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div style={{ background:"#f0fdf4", borderRadius:12, padding:14 }}>
            <div style={{ fontWeight:700, color:"#16a34a", marginBottom:8 }}>✅ Meghívók elküldve – forrás: {importSource?.title}</div>
            {selectedImportees.map((name,i) => <div key={i} style={{ fontSize:13, color:"#166534", padding:"3px 0" }}>👤 {name}</div>)}
            <button onClick={() => { setImportSent(false); setImportSource(null); setSelectedImportees([]); }} style={{ marginTop:10, background:"none", border:"1.5px solid #86efac", borderRadius:8, padding:"6px 14px", color:"#16a34a", fontWeight:700, fontSize:12, cursor:"pointer" }}>+ Újabb meghívás</button>
          </div>
        )}
      </div>

      {/* Email invite */}
      <div style={{ background:"#fff", borderRadius:16, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginBottom:12 }}>
        <div style={{ fontWeight:700, color:"#0f172a", marginBottom:12, fontSize:15 }}>✉️ Emberek meghívása</div>
        <div style={{ display:"flex", gap:8 }}>
          <input type="email" placeholder="email@example.com" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleInvite()} style={{ ...inp, flex:1 }} />
          <button onClick={handleInvite} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", fontWeight:700, fontSize:14, cursor:"pointer", flexShrink:0 }}>Küldés</button>
        </div>
        {inviteMsg && <div style={{ fontSize:12, marginTop:8, color:"#475569" }}>{inviteMsg}</div>}
        {invitedList.length > 0 && <div style={{ marginTop:12 }}>
          {invitedList.map((email,i) => <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 10px", background:"#f0fdf4", borderRadius:8, marginBottom:4, fontSize:13, color:"#16a34a" }}><span>📧 {email}</span><span style={{ fontSize:11 }}>Elküldve ✓</span></div>)}
        </div>}
      </div>

      {/* Public invite */}
      {!ok && !event.cancelled && (
        <div style={{ background:"#faf5ff", border:"1.5px solid #e9d5ff", borderRadius:16, padding:16 }}>
          <div style={{ fontWeight:700, color:"#7c3aed", marginBottom:6 }}>🌐 Nincs meg a minimum létszám</div>
          <div style={{ fontSize:13, color:"#6d28d9" }}>Csoporton kívüli résztvevők is csatlakozhatnak.</div>
          <button style={{ marginTop:10, background:"#7c3aed", color:"#fff", border:"none", borderRadius:10, padding:"8px 16px", fontWeight:700, fontSize:13, cursor:"pointer", width:"100%" }}>🔗 Meghívó link másolása</button>
        </div>
      )}
    </div>
  );
}

// ── CREATE / EDIT EVENT ───────────────────────────────────────────────────────
function EventForm({ initial, onSave, onCancel, title }) {
  const [form, setForm] = useState(initial);
  const [cityList, setCityList] = useState(ALL_CITIES);
  const [customCity, setCustomCity] = useState("");
  const [showAddCity, setShowAddCity] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const toggleDay = d => setForm(f => ({...f,recurrenceDays:f.recurrenceDays.includes(d)?f.recurrenceDays.filter(x=>x!==d):[...f.recurrenceDays,d]}));

  return (
    <div style={{ paddingBottom:100 }}>
      <button onClick={onCancel} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", padding:"4px 0 12px 0", color:"#334155" }}>← Vissza</button>
      <div style={{ fontWeight:800, fontSize:20, color:"#0f172a", marginBottom:20 }}>{title}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Esemény neve</label>
          <input style={inp} placeholder="pl. Heti foci" value={form.title} onChange={e=>set("title",e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:6 }}>Sportág</label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {SPORTS.map(s => <button key={s.id} onClick={() => set("sport",s.id)} style={{ padding:"6px 12px", borderRadius:99, border:`2px solid ${form.sport===s.id?"#16a34a":"#e2e8f0"}`, background:form.sport===s.id?"#f0fdf4":"#fff", color:form.sport===s.id?"#16a34a":"#475569", fontWeight:600, fontSize:13, cursor:"pointer" }}>{s.icon} {s.label}</button>)}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <div><label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Dátum</label><input type="date" style={inp} value={form.date} onChange={e=>set("date",e.target.value)} /></div>
          <div><label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Időpont</label><input type="time" style={inp} value={form.time} onChange={e=>set("time",e.target.value)} /></div>
        </div>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Város</label>
          <select value={form.city} onChange={e => { if(e.target.value==="__add__"){setShowAddCity(true);}else{set("city",e.target.value);setShowAddCity(false);} }} style={{ ...inp, color:form.city?"#0f172a":"#94a3b8" }}>
            <option value="">Válassz várost...</option>
            {cityList.map(c => <option key={c} value={c}>{c}</option>)}
            <option value="__add__">+ Új város hozzáadása</option>
          </select>
          {showAddCity && (
            <div style={{ display:"flex", gap:8, marginTop:8 }}>
              <input style={inp} placeholder="Város neve..." value={customCity} onChange={e=>setCustomCity(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&customCity.trim()){setCityList(l=>[...l,customCity.trim()]);set("city",customCity.trim());setCustomCity("");setShowAddCity(false);}}} autoFocus />
              <button onClick={() => { if(customCity.trim()){setCityList(l=>[...l,customCity.trim()]);set("city",customCity.trim());setCustomCity("");setShowAddCity(false);}}} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:10, padding:"0 14px", fontWeight:700, fontSize:13, cursor:"pointer", flexShrink:0 }}>Hozzáad</button>
            </div>
          )}
        </div>
        <div><label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Helyszín</label><input style={inp} placeholder="pl. Városligeti pálya" value={form.location} onChange={e=>set("location",e.target.value)} /></div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <div><label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Min: <b style={{ color:"#ef4444" }}>{form.min} fő</b></label><input type="range" min={2} max={form.max} value={form.min} onChange={e=>set("min",+e.target.value)} style={{ width:"100%" }} /></div>
          <div><label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Max: <b style={{ color:"#16a34a" }}>{form.max} fő</b></label><input type="range" min={form.min} max={50} value={form.max} onChange={e=>set("max",+e.target.value)} style={{ width:"100%" }} /></div>
        </div>
        {"deadlineHours" in form && (
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Visszajelzési határidő: <b style={{ color:"#0f172a" }}>{form.deadlineHours} órával előtte</b></label>
            <input type="range" min={1} max={72} value={form.deadlineHours} onChange={e=>set("deadlineHours",+e.target.value)} style={{ width:"100%" }} />
          </div>
        )}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:6 }}>Ismétlődés</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[{id:"none",label:"Egyszer"},{id:"weekly",label:"Hetente"},{id:"biweekly",label:"Kéthetente"},{id:"monthly",label:"Havonta"}].map(r => (
              <button key={r.id} onClick={() => set("recurrence",r.id)} style={{ padding:"7px 14px", borderRadius:99, border:`2px solid ${form.recurrence===r.id?"#7c3aed":"#e2e8f0"}`, background:form.recurrence===r.id?"#faf5ff":"#fff", color:form.recurrence===r.id?"#7c3aed":"#475569", fontWeight:600, fontSize:13, cursor:"pointer" }}>{r.label}</button>
            ))}
          </div>
          {(form.recurrence==="weekly"||form.recurrence==="biweekly") && (
            <div style={{ display:"flex", gap:6, marginTop:10 }}>
              {DAYS_HU.map((d,i) => <button key={i} onClick={() => toggleDay(i)} style={{ width:38, height:38, borderRadius:"50%", border:`2px solid ${form.recurrenceDays.includes(i)?"#7c3aed":"#e2e8f0"}`, background:form.recurrenceDays.includes(i)?"#7c3aed":"#fff", color:form.recurrenceDays.includes(i)?"#fff":"#475569", fontWeight:700, fontSize:12, cursor:"pointer" }}>{d}</button>)}
            </div>
          )}
          {form.recurrence!=="none" && <div style={{ marginTop:8, fontSize:12, color:"#7c3aed", background:"#faf5ff", borderRadius:8, padding:"6px 10px" }}>🔁 {recLabel(form.recurrence)} ismétlődő{form.recurrenceDays.length>0?` · ${form.recurrenceDays.map(d=>DAYS_HU[d]).join(", ")}`:"" }</div>}
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc", borderRadius:12, padding:"12px 16px" }}>
          <div>
            <div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>🌐 Nyilvános meghívó</div>
            <div style={{ fontSize:12, color:"#64748b" }}>Ha nincs meg a min. létszám, külsők is csatlakozhatnak</div>
          </div>
          <Toggle value={form.isPublic} onChange={v=>set("isPublic",v)} />
        </div>
        <button onClick={() => onSave(form)} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:14, padding:"14px 0", fontWeight:800, fontSize:16, cursor:"pointer", width:"100%", marginTop:4 }}>✓ Mentés</button>
      </div>
    </div>
  );
}

// ── DISCOVER ──────────────────────────────────────────────────────────────────
function DiscoverModule() {
  const [filters, setFilters] = useState({ city:"", sport:"", day:"", timeFrom:"", onlyOpen:false });
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const setF = (k,v) => setFilters(f => ({...f,[k]:v}));
  const ss = { width:"100%", padding:"10px 14px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, background:"#f8fafc", boxSizing:"border-box", outline:"none", color:"#0f172a" };

  const handleSearch = () => {
    let res = DISCOVER_EVENTS;
    if(filters.city) res=res.filter(e=>e.city===filters.city);
    if(filters.sport) res=res.filter(e=>e.sport===filters.sport);
    if(filters.day!=="") res=res.filter(e=>e.day===parseInt(filters.day));
    if(filters.timeFrom) res=res.filter(e=>e.time>=filters.timeFrom);
    if(filters.onlyOpen) res=res.filter(e=>e.isOpen&&e.current<e.max);
    setResults(res); setSearched(true);
  };

  return (
    <div style={{ paddingBottom:20 }}>
      <div style={{ fontWeight:800, fontSize:18, color:"#0f172a", marginBottom:16 }}>🔍 Esemény keresés</div>
      <div style={{ background:"#fff", borderRadius:16, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", marginBottom:16 }}>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Város</label>
          <select style={ss} value={filters.city} onChange={e=>setF("city",e.target.value)}>
            <option value="">Összes város</option>
            {ALL_CITIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:6 }}>Sportág</label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            <button onClick={() => setF("sport","")} style={{ padding:"6px 12px", borderRadius:99, border:`2px solid ${!filters.sport?"#16a34a":"#e2e8f0"}`, background:!filters.sport?"#f0fdf4":"#fff", color:!filters.sport?"#16a34a":"#475569", fontWeight:600, fontSize:12, cursor:"pointer" }}>Mind</button>
            {SPORTS.map(s=><button key={s.id} onClick={() => setF("sport",s.id)} style={{ padding:"6px 12px", borderRadius:99, border:`2px solid ${filters.sport===s.id?"#16a34a":"#e2e8f0"}`, background:filters.sport===s.id?"#f0fdf4":"#fff", color:filters.sport===s.id?"#16a34a":"#475569", fontWeight:600, fontSize:12, cursor:"pointer" }}>{s.icon} {s.label}</button>)}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Nap</label>
            <select style={ss} value={filters.day} onChange={e=>setF("day",e.target.value)}>
              <option value="">Bármely nap</option>
              {DAYS_FULL.map((d,i)=><option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#64748b", display:"block", marginBottom:4 }}>Időpont (ettől)</label>
            <input type="time" style={ss} value={filters.timeFrom} onChange={e=>setF("timeFrom",e.target.value)} />
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
          <div>
            <div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>Csak csatlakozható</div>
            <div style={{ fontSize:11, color:"#94a3b8" }}>Ahol még van szabad hely</div>
          </div>
          <Toggle value={filters.onlyOpen} onChange={v=>setF("onlyOpen",v)} />
        </div>
        <button onClick={handleSearch} style={{ width:"100%", padding:"13px 0", background:"#16a34a", color:"#fff", border:"none", borderRadius:12, fontWeight:800, fontSize:15, cursor:"pointer" }}>🔍 Keresés</button>
      </div>
      {searched && (
        <div>
          <div style={{ fontSize:13, color:"#64748b", marginBottom:10, fontWeight:600 }}>{results.length===0?"Nincs találat.":`${results.length} esemény található`}</div>
          {results.length===0 && <div style={{ background:"#fff", borderRadius:16, padding:24, textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🔎</div>
            <div style={{ fontWeight:700, color:"#0f172a", marginBottom:6 }}>Nincs ilyen esemény</div>
            <div style={{ fontSize:13, color:"#94a3b8" }}>Próbálj más szűrőfeltételekkel, vagy hozz létre te egy eseményt!</div>
          </div>}
          {results.map(e => {
            const es = sportOf(e.sport);
            const full = e.current >= e.max;
            const joined = joinedIds.includes(e.id);
            return (
              <div key={e.id} style={{ background:"#fff", borderRadius:16, padding:16, marginBottom:10, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", border:"1.5px solid #f1f5f9" }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{es?.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:15, color:"#0f172a" }}>{e.title}</div>
                    <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{es?.label}</div>
                    <div style={{ fontSize:12, color:"#475569", marginTop:4 }}>📅 {DAYS_FULL[e.day]}, {e.time} · 📍 {e.city}, {e.location}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>Szervező: {e.organizer}</div>
                  </div>
                </div>
                <div style={{ marginTop:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#64748b", marginBottom:3 }}>
                    <span><b style={{ color:full?"#ef4444":"#16a34a" }}>{e.current}</b> / {e.max} fő</span>
                    <span>{full?"Betelt":`${e.max-e.current} hely maradt`}</span>
                  </div>
                  <div style={{ height:6, borderRadius:99, background:"#e2e8f0" }}>
                    <div style={{ height:"100%", borderRadius:99, background:full?"#ef4444":"#16a34a", width:`${Math.min((e.current/e.max)*100,100)}%` }} />
                  </div>
                </div>
                <button onClick={() => !full && setJoinedIds(prev=>joined?prev.filter(x=>x!==e.id):[...prev,e.id])} style={{ marginTop:12, width:"100%", padding:"10px 0", borderRadius:10, border:joined?"1.5px solid #86efac":"none", fontWeight:700, fontSize:13, cursor:full&&!joined?"default":"pointer", background:joined?"#f0fdf4":full?"#f1f5f9":"#16a34a", color:joined?"#16a34a":full?"#94a3b8":"#fff" }}>
                  {joined?"✓ Csatlakoztál":full?"Betelt":"Csatlakozás"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
function NotificationsModule() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const unread = notifs.filter(n=>!n.read).length;
  const typeColors = { invite:"#7c3aed", deadline:"#f59e0b", full:"#16a34a", cancel:"#ef4444" };
  return (
    <div style={{ paddingBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontWeight:800, fontSize:18, color:"#0f172a" }}>🔔 Értesítések</div>
          {unread > 0 && <div style={{ background:"#ef4444", color:"#fff", borderRadius:99, fontSize:11, fontWeight:800, padding:"2px 8px" }}>{unread} új</div>}
        </div>
        {unread > 0 && <button onClick={() => setNotifs(ns=>ns.map(n=>({...n,read:true})))} style={{ background:"none", border:"none", fontSize:12, color:"#16a34a", fontWeight:700, cursor:"pointer" }}>Mind olvasott</button>}
      </div>
      {notifs.map(n => (
        <div key={n.id} onClick={() => setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))} style={{ background:n.read?"#fff":"#f0fdf4", borderRadius:14, padding:"14px 16px", marginBottom:8, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:`1.5px solid ${n.read?"#f1f5f9":"#86efac"}`, cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start" }}>
          <div style={{ width:40, height:40, borderRadius:12, background:(typeColors[n.type]||"#64748b")+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{n.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, color:"#0f172a", fontWeight:n.read?500:700, lineHeight:1.4 }}>{n.text}</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>{n.time}</div>
          </div>
          {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#16a34a", flexShrink:0, marginTop:4 }} />}
        </div>
      ))}
    </div>
  );
}

// ── GROUPS ────────────────────────────────────────────────────────────────────
function GroupsModule() {
  const [groups, setGroups] = useState(MOCK_GROUPS);
  const [sel, setSel] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMsg, setInviteMsg] = useState("");
  const [newGroup, setNewGroup] = useState({ name:"", sport:"", city:"" });

  if (sel) {
    const g = groups.find(x=>x.id===sel.id)||sel;
    return (
      <div style={{ paddingBottom:20 }}>
        <button onClick={() => setSel(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#334155", padding:"4px 0 12px 0" }}>← Vissza</button>
        <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", marginBottom:14 }}>
          <div style={{ display:"flex", gap:14, alignItems:"center" }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>{sportOf(g.sport)?.icon}</div>
            <div><div style={{ fontWeight:800, fontSize:17, color:"#0f172a" }}>{g.name}</div><div style={{ fontSize:13, color:"#64748b" }}>{sportOf(g.sport)?.label} · {g.city} · {g.members.length} tag</div></div>
          </div>
        </div>
        <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>👥 Tagok ({g.members.length})</div>
          {g.members.map(m => (
            <div key={m.name} style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:10, marginBottom:10, borderBottom:"1px solid #f1f5f9" }}>
              <Av initials={m.avatar} size={36} color={m.role==="admin"?"#7c3aed":"#16a34a"} />
              <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:14 }}>{m.name}</div><div style={{ fontSize:11, color:m.role==="admin"?"#7c3aed":"#94a3b8" }}>{m.role==="admin"?"👑 Admin":"Tag"}</div></div>
          {g.isAdmin && m.role!=="admin" && <button onClick={() => setGroups(gs=>gs.map(x=>x.id===g.id?{...x,members:x.members.filter(mm=>mm.name!==m.name)}:x))} style={{ background:"#fef2f2", border:"none", borderRadius:8, padding:"5px 10px", color:"#ef4444", fontSize:12, fontWeight:700, cursor:"pointer" }}>Eltávolít</button>}
            </div>
          ))}
          {true && (
            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#64748b", marginBottom:6 }}>Új tag meghívása</div>
              <div style={{ display:"flex", gap:8 }}>
                <input type="email" placeholder="email@example.com" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} style={{ flex:1, padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:13, background:"#f8fafc", outline:"none" }} />
                <button onClick={() => { if(!inviteEmail.includes("@")){setInviteMsg("❌ Érvényes email szükséges");return;} setInviteMsg(`✅ Elküldve: ${inviteEmail}`);setInviteEmail("");setTimeout(()=>setInviteMsg(""),3000); }} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:9, padding:"0 14px", fontWeight:700, fontSize:13, cursor:"pointer" }}>Küldés</button>
              </div>
              {inviteMsg && <div style={{ fontSize:12, marginTop:6, color:"#475569" }}>{inviteMsg}</div>}
            </div>
          )}
        </div>
        <button onClick={() => { setGroups(gs=>gs.filter(x=>x.id!==g.id)); setSel(null); }} style={{ width:"100%", padding:"12px 0", borderRadius:12, border:"1.5px solid #fca5a5", background:"#fff", color:"#ef4444", fontWeight:700, fontSize:14, cursor:"pointer" }}>
          {g.isAdmin?"🗑 Csoport törlése":"🚪 Kilépés a csoportból"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ fontWeight:800, fontSize:18, color:"#0f172a" }}>👥 Csoportok</div>
        <button onClick={() => setShowCreate(true)} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Új csoport</button>
      </div>
      {showCreate && (
        <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", marginBottom:14, border:"1.5px solid #86efac" }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>Új csoport</div>
          <input placeholder="Csoport neve" value={newGroup.name} onChange={e=>setNewGroup(g=>({...g,name:e.target.value}))} style={{ ...inp, marginBottom:10 }} />
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
            {SPORTS.map(s=><button key={s.id} onClick={() => setNewGroup(g=>({...g,sport:s.id}))} style={{ padding:"5px 11px", borderRadius:99, border:`2px solid ${newGroup.sport===s.id?"#16a34a":"#e2e8f0"}`, background:newGroup.sport===s.id?"#f0fdf4":"#fff", color:newGroup.sport===s.id?"#16a34a":"#475569", fontWeight:600, fontSize:12, cursor:"pointer" }}>{s.icon} {s.label}</button>)}
          </div>
          <input placeholder="Város" value={newGroup.city} onChange={e=>setNewGroup(g=>({...g,city:e.target.value}))} style={{ ...inp, marginBottom:12 }} />
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => setShowCreate(false)} style={{ flex:1, padding:"10px 0", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", color:"#475569", fontWeight:700, fontSize:13, cursor:"pointer" }}>Mégse</button>
            <button onClick={() => { if(!newGroup.name||!newGroup.sport)return; setGroups(gs=>[{id:Date.now(),...newGroup,isAdmin:true,members:[{name:MOCK_USER.name,avatar:MOCK_USER.avatar,role:"admin"}]},...gs]); setShowCreate(false); setNewGroup({name:"",sport:"",city:""}); }} style={{ flex:1, padding:"10px 0", borderRadius:10, border:"none", background:"#16a34a", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Létrehozás</button>
          </div>
        </div>
      )}
      {groups.map(g => (
        <div key={g.id} onClick={() => setSel(g)} style={{ background:"#fff", borderRadius:16, padding:16, marginBottom:10, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", border:"1.5px solid #f1f5f9", cursor:"pointer" }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ width:46, height:46, borderRadius:12, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{sportOf(g.sport)?.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ fontWeight:700, fontSize:15, color:"#0f172a" }}>{g.name}</div>
                {g.isAdmin && <div style={{ fontSize:10, fontWeight:700, color:"#7c3aed", background:"#faf5ff", borderRadius:99, padding:"1px 7px" }}>Admin</div>}
              </div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{sportOf(g.sport)?.label} · {g.city}</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>👥 {g.members.length} tag</div>
            </div>
            <div style={{ fontSize:18, color:"#cbd5e1" }}>›</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PROFILE ───────────────────────────────────────────────────────────────────
function ProfileModule({ user, onUpdateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleSport = id => { const curr=form.favoriteSports||["football","running"]; set("favoriteSports",curr.includes(id)?curr.filter(s=>s!==id):[...curr,id]); };
  const fields = [{label:"Teljes név",key:"name",ph:"Kovács Péter"},{label:"Email",key:"email",ph:"kovacs@email.com"},{label:"Telefon",key:"phone",ph:"+36 30 123 4567"},{label:"Város",key:"city",ph:"Budapest"}];

  return (
    <div style={{ paddingBottom:20 }}>
      <div style={{ fontWeight:800, fontSize:18, color:"#0f172a", marginBottom:16 }}>👤 Profil</div>
      <div style={{ background:"#fff", borderRadius:20, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", marginBottom:14, textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"#16a34a", color:"#fff", fontSize:28, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>{user.avatar}</div>
        <div style={{ fontWeight:800, fontSize:20, color:"#0f172a" }}>{form.name||user.name}</div>
        <div style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>{form.email||"email@example.com"}</div>
        <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>📍 {form.city||"Budapest"}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:16 }}>
          {[{label:"Esemény",val:12},{label:"Csoport",val:3},{label:"Sport",val:(form.favoriteSports||["football","running"]).length}].map(s=>(
            <div key={s.label} style={{ textAlign:"center" }}><div style={{ fontWeight:800, fontSize:20, color:"#0f172a" }}>{s.val}</div><div style={{ fontSize:11, color:"#94a3b8" }}>{s.label}</div></div>
          ))}
        </div>
      </div>
      <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#0f172a" }}>Személyes adatok</div>
          <button onClick={() => { if(editing)onUpdateUser(form); setEditing(!editing); }} style={{ background:editing?"#16a34a":"#f0fdf4", color:editing?"#fff":"#16a34a", border:"none", borderRadius:8, padding:"6px 14px", fontWeight:700, fontSize:13, cursor:"pointer" }}>{editing?"✓ Mentés":"✏️ Szerkesztés"}</button>
        </div>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", marginBottom:4 }}>{f.label}</div>
            {editing ? <input value={form[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.ph} style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #e2e8f0", fontSize:14, background:"#f8fafc", outline:"none", boxSizing:"border-box" }} />
              : <div style={{ fontSize:14, color:form[f.key]?"#0f172a":"#cbd5e1", fontWeight:500 }}>{form[f.key]||f.ph}</div>}
          </div>
        ))}
      </div>
      <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", marginBottom:14 }}>
        <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>🏅 Sport preferenciák</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {SPORTS.map(s => { const sel=(form.favoriteSports||["football","running"]).includes(s.id); return <button key={s.id} onClick={() => editing&&toggleSport(s.id)} style={{ padding:"7px 13px", borderRadius:99, border:`2px solid ${sel?"#16a34a":"#e2e8f0"}`, background:sel?"#f0fdf4":"#fff", color:sel?"#16a34a":"#94a3b8", fontWeight:600, fontSize:13, cursor:editing?"pointer":"default", opacity:!editing&&!sel?0.45:1 }}>{s.icon} {s.label}</button>; })}
        </div>
        {!editing && <div style={{ fontSize:11, color:"#94a3b8", marginTop:8 }}>Szerkesztés módban módosítható</div>}
      </div>
      <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>🔔 Értesítési beállítások</div>
        {[{label:"Visszajelzési határidő",sub:"24 órával előtte",key:"notifDeadline"},{label:"Esemény lemondása",sub:"Azonnali értesítés",key:"notifCancel"},{label:"Új meghívó",sub:"Azonnali értesítés",key:"notifInvite"},{label:"Létszám feltöltődött",sub:"Ha eléri a minimumot",key:"notifFull"}].map((n,i,arr) => (
          <div key={n.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:i<arr.length-1?12:0, marginBottom:i<arr.length-1?12:0, borderBottom:i<arr.length-1?"1px solid #f1f5f9":"none" }}>
            <div><div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{n.label}</div><div style={{ fontSize:11, color:"#94a3b8" }}>{n.sub}</div></div>
            <Toggle value={form[n.key]!==false} onChange={v=>set(n.key,v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [activeTab, setActiveTab] = useState("events");
  const [userProfile, setUserProfile] = useState({ ...MOCK_USER, favoriteSports:["football","running"] });

  const INITIAL_FORM = { title:"", sport:"", date:"", time:"", location:"", city:"", min:6, max:12, deadlineHours:24, isPublic:false, recurrence:"none", recurrenceDays:[] };

  const handleRespond = (eventId, status) => {
    const update = evs => evs.map(e => e.id===eventId ? { ...e, myStatus:status, responses:e.responses.map(r=>r.name===MOCK_USER.name?{...r,status}:r) } : e);
    setEvents(update);
    setSelectedEvent(ev => ev ? update([ev])[0] : ev);
  };

  const handleCancelEvent = (eventId, reason) => {
    const update = evs => evs.map(e => e.id===eventId ? {...e,cancelled:true,cancelReason:reason} : e);
    setEvents(update);
    setSelectedEvent(ev => ev ? update([ev])[0] : ev);
  };

  const handleSave = (form) => {
    const h = parseInt(form.time.split(":")[0]||"12");
    const newEvent = { id:Date.now(), ...form, deadline:`${form.date}T${String(Math.max(0,h-Math.floor(form.deadlineHours))).padStart(2,"0")}:${form.time.split(":")[1]||"00"}`, organizer:MOCK_USER.name, responses:[{name:MOCK_USER.name,avatar:"KP",status:"yes"}], myStatus:"yes" };
    setEvents(e => [newEvent,...e]); setScreen("events"); setActiveTab("events");
  };

  const handleEditSave = (updatedEvent) => {
    setEvents(evs => evs.map(e => e.id===updatedEvent.id ? updatedEvent : e));
    setSelectedEvent(updatedEvent); setScreen("detail");
  };

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date+"T"+e.time) >= now);

  const NAV = [
    {id:"events",icon:"📅",label:"Események"},
    {id:"discover",icon:"🔍",label:"Felfedezés"},
    {id:"groups",icon:"👥",label:"Csoportok"},
    {id:"notifications",icon:"🔔",label:"Értesítések",badge:2},
    {id:"profile",icon:"👤",label:"Profil"},
  ];

  return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#f1f5f9", fontFamily:"'DM Sans','Segoe UI',sans-serif", position:"relative" }}>
      {/* Header */}
      <div style={{ background:"#fff", padding:"16px 20px 12px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:24 }}>🏃</div>
          <div>
            <div style={{ fontWeight:800, fontSize:17, color:"#0f172a", lineHeight:1.1 }}>SportÖssze</div>
            <div style={{ fontSize:11, color:"#94a3b8" }}>Sporteseményszervező</div>
          </div>
        </div>
        <Av initials={MOCK_USER.avatar} size={36} />
      </div>

      {/* Content */}
      <div style={{ padding:"16px 16px 80px" }}>
        {screen==="events" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontWeight:800, fontSize:18, color:"#0f172a" }}>Közelgő események</div>
              <button onClick={() => setScreen("create")} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Új esemény</button>
            </div>
            {upcoming.length===0
              ? <div style={{ background:"#fff", borderRadius:16, padding:28, textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
                  <div style={{ fontWeight:700, color:"#0f172a", marginBottom:6 }}>Nincs közelgő esemény</div>
                  <div style={{ fontSize:13, color:"#94a3b8" }}>Hozz létre egy új eseményt, vagy keress a Felfedezés fülön!</div>
                </div>
              : upcoming.map(e => <EventCard key={e.id} event={e} onOpen={ev=>{setSelectedEvent(ev);setScreen("detail");}} onRespond={handleRespond} />)
            }
          </>
        )}
        {screen==="detail" && selectedEvent && <EventDetail event={selectedEvent} onBack={() => setScreen("events")} onRespond={handleRespond} allEvents={events} onCancelEvent={handleCancelEvent} onEdit={() => setScreen("edit")} />}
        {screen==="create" && <EventForm title="✨ Új esemény" initial={INITIAL_FORM} onSave={handleSave} onCancel={() => setScreen("events")} />}
        {screen==="edit" && selectedEvent && <EventForm title="✏️ Esemény szerkesztése" initial={{ title:selectedEvent.title, sport:selectedEvent.sport, date:selectedEvent.date, time:selectedEvent.time, location:selectedEvent.location||"", city:selectedEvent.city||"", min:selectedEvent.min, max:selectedEvent.max, recurrence:selectedEvent.recurrence||"none", recurrenceDays:selectedEvent.recurrenceDays||[], isPublic:selectedEvent.isPublic||false }} onSave={handleEditSave} onCancel={() => setScreen("detail")} />}
        {screen==="discover" && <DiscoverModule />}
        {screen==="notifications" && <NotificationsModule />}
        {screen==="groups" && <GroupsModule />}
        {screen==="profile" && <ProfileModule user={userProfile} onUpdateUser={setUserProfile} />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid #f1f5f9", display:"flex", boxShadow:"0 -2px 10px rgba(0,0,0,0.06)" }}>
        {NAV.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setScreen(tab.id==="events"?"events":tab.id); }} style={{ flex:1, padding:"10px 0 12px", border:"none", background:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, position:"relative" }}>
            <div style={{ fontSize:20, position:"relative" }}>
              {tab.icon}
              {!!tab.badge && activeTab!==tab.id && <div style={{ position:"absolute", top:-4, right:-6, width:16, height:16, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{tab.badge}</div>}
            </div>
            <div style={{ fontSize:9, fontWeight:700, color:activeTab===tab.id?"#16a34a":"#94a3b8" }}>{tab.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
