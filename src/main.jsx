import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Clock, ExternalLink, Image as ImageIcon, Lock, MapPin, Menu as MenuIcon, MessageCircle, Minus, Phone, Plus, Save, Settings, Sparkles, Trash2, Utensils, X } from "lucide-react";
import './styles.css';

const STORAGE_KEY = 'awesome-restaurant-site-v2';
const ADMIN_PASSWORD = 'Awesomeres126';

const img = (id, w=1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=82`;
const DEFAULT_DATA = {
  businessName: 'Awesome Restaurant',
  tagline: 'Good food. Great moments. Right around FUOYE.',
  intro: 'Freshly prepared meals, breakfast, lunch, takeaway and delivery for students, staff and the Oye community.',
  phone: '+234 813 344 5738',
  whatsapp: '2348133445738',
  address: 'Km 3, Awesome Building, Federal University, 15 Are Road, opposite FUOYE main gate, Oye, Ekiti, Nigeria',
  hours: 'Daily • 8:00 AM – 11:00 PM',
  heroImage: img('1517248135467-4c7edcad34c4'),
  aboutImage: img('1555396273-367ea4eb4db5'),
  template: 'classic',
  colors: { primary:'#8b4513', accent:'#d4a24c', dark:'#17120f', cream:'#fff9f2' },
  announcement: { enabled:false, message:'🎉 Celebration season is here — ask about our special packages!' },
  celebration: { enabled:false, title:'Special Celebration', text:'Planning a birthday, graduation or special occasion? Ask us about our celebration menu.', button:'WhatsApp Us' },
  seo: { title:'Awesome Restaurant | Oye, Ekiti', description:'Fresh meals near FUOYE main gate in Oye, Ekiti.' },
  services: [
    {id:'s1', title:'Breakfast', text:'Start your day with satisfying breakfast plates and quick bites.'},
    {id:'s2', title:'Lunch & Dinner', text:'Comforting meals prepared for students, families and groups.'},
    {id:'s3', title:'Takeaway', text:'Order ahead and collect your meal when it suits you.'},
    {id:'s4', title:'Delivery', text:'Ask about delivery availability around Oye and FUOYE.'}
  ],
  menu: [
    {id:'m1', name:'Signature Rice Bowl', category:'Rice', price:'Ask for price', description:'A filling rice meal with your choice of protein and sides.', image:img('1512058564366-18510be2db19')},
    {id:'m2', name:'Grilled Chicken', category:'Protein', price:'Ask for price', description:'Juicy grilled chicken served with your choice of sides.', image:img('1532550907401-a500c9a57435')},
    {id:'m3', name:'Breakfast Plate', category:'Breakfast', price:'Ask for price', description:'A hearty breakfast option for busy mornings.', image:img('1525351484163-7529414344d8')},
    {id:'m4', name:'Local Favourites', category:'Local', price:'Ask for price', description:'Popular local meals prepared fresh for the Oye community.', image:img('1547592180-85f173990554')}
  ],
  gallery: [img('1504674900247-0877df9cc836'), img('1540189549336-e6e99c3679fe'), img('1414235077428-338989a2e8c0'), img('1515003197210-e0cd71810b5f'), img('1512621776951-a57141f2eefd'), img('1498837167922-ddd27525d352')],
  socials: { instagram:'', facebook:'' },
  customSections: []
};


function loadData(){
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!raw) return DEFAULT_DATA;
    return {
      ...DEFAULT_DATA,
      ...raw,
      colors: {...DEFAULT_DATA.colors, ...(raw.colors || {})},
      announcement: {...DEFAULT_DATA.announcement, ...(raw.announcement || {})},
      celebration: {...DEFAULT_DATA.celebration, ...(raw.celebration || {})},
      seo: {...DEFAULT_DATA.seo, ...(raw.seo || {})},
      socials: {...DEFAULT_DATA.socials, ...(raw.socials || {})},
      services: Array.isArray(raw.services) ? raw.services : DEFAULT_DATA.services,
      menu: Array.isArray(raw.menu) ? raw.menu : DEFAULT_DATA.menu,
      gallery: Array.isArray(raw.gallery) ? raw.gallery : DEFAULT_DATA.gallery,
      customSections: Array.isArray(raw.customSections) ? raw.customSections : DEFAULT_DATA.customSections
    };
  } catch {
    return DEFAULT_DATA;
  }
}
function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function waLink(number, message='Hello Awesome Restaurant, I’d like to make an enquiry.') { const digits=(number||'').replace(/\D/g,''); return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`; }
function useSiteData(){ const [data,setData]=useState(loadData); useEffect(()=>saveData(data),[data]); return [data,setData]; }

function App(){
  const [data,setData]=useSiteData();
  const [admin,setAdmin]=useState(window.location.pathname.startsWith('/admin'));
  useEffect(()=>{ document.title=data.seo?.title || data.businessName; document.documentElement.style.setProperty('--primary',data.colors.primary); document.documentElement.style.setProperty('--accent',data.colors.accent); document.documentElement.style.setProperty('--dark',data.colors.dark); document.documentElement.style.setProperty('--cream',data.colors.cream); },[data]);
  return admin ? <Admin data={data} setData={setData} goSite={()=>{history.pushState({},'', '/');setAdmin(false)}}/> : <Site data={data} openAdmin={()=>{history.pushState({},'', '/admin');setAdmin(true)}}/>;
}

function Site({data,openAdmin}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [activeCat,setActiveCat]=useState('All');
  const categories=['All',...new Set(data.menu.map(x=>x.category).filter(Boolean))];
  const filtered=data.menu.filter(x=>activeCat==='All'||x.category===activeCat);
  const template=data.template||'classic';
  const message='Hello Awesome Restaurant, I’d like to make an enquiry.';
  return <div className={`site template-${template}`}>
    {data.announcement?.enabled && <div className="announcement"><Sparkles size={16}/>{data.announcement.message}</div>}
    <header className="nav"><a className="brand" href="#top"><span className="brand-mark">AR</span><span>{data.businessName}</span></a><button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<MenuIcon/>}</button><nav className={menuOpen?'open':''}>{['about','services','menu','gallery','contact'].map(x=><a key={x} href={`#${x}`} onClick={()=>setMenuOpen(false)}>{x}</a>)}<a className="nav-cta" href={waLink(data.whatsapp,message)} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a></nav></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><span className="eyebrow">FRESH • LOCAL • MADE WITH CARE</span><h1>{data.tagline}</h1><p>{data.intro}</p><div className="actions"><a className="btn primary" href={waLink(data.whatsapp,message)} target="_blank" rel="noreferrer">Order / Enquire <ArrowRight size={17}/></a><a className="btn secondary" href="#menu">Explore Menu</a></div><div className="hero-facts"><span><MapPin size={15}/>{data.address.split(',').slice(-3,-1).join(', ')}</span><span><Clock size={15}/>{data.hours}</span></div></div><div className="hero-image"><img src={data.heroImage} alt={data.businessName}/><div className="image-badge"><Utensils size={18}/><span>Made fresh</span></div></div></section>
      <section className="quick-grid"><Quick icon={<MapPin/>} label="Location" value="Near FUOYE main gate"/><Quick icon={<Clock/>} label="Hours" value={data.hours}/><Quick icon={<Phone/>} label="Call" value={data.phone}/><Quick icon={<MessageCircle/>} label="WhatsApp" value="Fast enquiries"/></section>
      <section id="about" className="section split"><div className="section-image"><img src={data.aboutImage} alt="Food at the restaurant"/></div><div><span className="eyebrow">ABOUT US</span><h2>Good food should feel easy.</h2><p>{data.intro}</p><p>We’re positioned close to the Federal University Oye-Ekiti community, making it simple to find a meal, place an order or ask about what’s available today.</p><a className="text-link" href={waLink(data.whatsapp,'Hello Awesome Restaurant, what meals are available today?')} target="_blank" rel="noreferrer">Ask what’s available <ArrowRight size={16}/></a></div></section>
      <section id="services" className="section"><div className="section-head"><div><span className="eyebrow">WHAT WE OFFER</span><h2>Built around your day.</h2></div></div><div className="service-grid">{data.services.map(s=><article className="service-card" key={s.id}><div className="service-icon"><Utensils size={19}/></div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
      <section id="menu" className="section menu-section"><div className="section-head"><div><span className="eyebrow">OUR MENU</span><h2>Something for every appetite.</h2></div><div className="filters">{categories.map(c=><button className={activeCat===c?'active':''} key={c} onClick={()=>setActiveCat(c)}>{c}</button>)}</div></div><div className="menu-grid">{filtered.map(item=><article className="menu-card" key={item.id}><img src={item.image} alt={item.name}/><div className="menu-info"><div className="menu-meta"><span>{item.category}</span><strong>{item.price}</strong></div><h3>{item.name}</h3><p>{item.description}</p><a href={waLink(data.whatsapp,`Hello Awesome Restaurant, I’m interested in the ${item.name}. Please send me the current price/availability.`)} target="_blank" rel="noreferrer">Enquire <ArrowRight size={15}/></a></div></article>)}</div></section>
      {data.celebration?.enabled && <section className="celebration"><div><span className="eyebrow">{data.celebration.title}</span><h2>{data.celebration.text}</h2></div><a className="btn primary" href={waLink(data.whatsapp,'Hello Awesome Restaurant, I’d like to ask about your celebration packages.')} target="_blank" rel="noreferrer">{data.celebration.button}<ArrowRight size={17}/></a></section>}
      {data.customSections?.map(s=><section className="section custom" key={s.id}><div className="custom-copy"><span className="eyebrow">{s.label||'MORE'}</span><h2>{s.title}</h2><p>{s.text}</p>{s.buttonText&&<a className="btn secondary" href={s.buttonUrl||'#'} target={s.buttonUrl?.startsWith('http')?'_blank':undefined} rel="noreferrer">{s.buttonText}<ArrowRight size={16}/></a>}</div>{s.image&&<div className="section-image"><img src={s.image} alt={s.title}/></div>}</section>)}
      <section id="gallery" className="section"><div className="section-head"><div><span className="eyebrow">GALLERY</span><h2>A taste of the experience.</h2></div></div><div className="gallery">{data.gallery.map((g,i)=><img src={g} key={i} alt={`Gallery ${i+1}`}/>)}</div></section>
      <section id="contact" className="contact"><div><span className="eyebrow">COME BY OR MESSAGE US</span><h2>Ready when you are.</h2><p>{data.address}</p><div className="contact-list"><span><Phone size={16}/>{data.phone}</span><span><Clock size={16}/>{data.hours}</span></div></div><div className="contact-actions"><a className="btn primary" href={waLink(data.whatsapp,message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp Us</a><a className="btn secondary" href={`tel:${data.phone.replace(/\s/g,'')}`}><Phone size={17}/> Call</a></div></section>
    </main>
    <footer><div><strong>{data.businessName}</strong><p>Good food. Great moments.</p></div><div className="footer-links">{data.socials?.instagram&&<a href={data.socials.instagram} target="_blank" rel="noreferrer"><Instagram/></a>}{data.socials?.facebook&&<a href={data.socials.facebook} target="_blank" rel="noreferrer"><Facebook/></a>}<button className="admin-small" onClick={openAdmin}><Settings size={14}/> Owner</button></div></footer>
  </div>
}
function Quick({icon,label,value}){return <div className="quick"><div>{icon}</div><span><small>{label}</small><strong>{value}</strong></span></div>}

function Admin({data,setData,goSite}){
  const [logged,setLogged]=useState(sessionStorage.getItem('ar-admin')==='1');
  const [password,setPassword]=useState('');
  const [tab,setTab]=useState('Business');
  if(!logged) return <div className="admin-login"><div className="login-card"><div className="brand-mark">AR</div><h1>Owner Dashboard</h1><p>Manage the restaurant website from this device.</p><form onSubmit={e=>{e.preventDefault();if(password===ADMIN_PASSWORD){sessionStorage.setItem('ar-admin','1');setLogged(true)}else alert('Incorrect password.')}}><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus/></label><button className="btn primary"><Lock size={16}/> Sign in</button></form><button className="back-link" onClick={goSite}>← View website</button><small className="warning">Change ADMIN_PASSWORD in src/main.jsx before deployment.</small></div></div>;
  const tabs=['Business','Menu','Services','Gallery','Appearance','Celebration','Custom Sections'];
  const update=(patch)=>setData(d=>({...d,...patch}));
  return <div className="admin-shell"><aside className="admin-side"><div className="admin-logo"><span className="brand-mark">AR</span><strong>Owner</strong></div>{tabs.map(t=><button className={tab===t?'active':''} key={t} onClick={()=>setTab(t)}>{t}</button>)}<div className="admin-bottom"><button onClick={goSite}>View site <ExternalLink size={15}/></button><button onClick={()=>{sessionStorage.removeItem('ar-admin');setLogged(false)}}>Log out</button></div></aside><section className="admin-main"><div className="admin-top"><div><span className="eyebrow">CONTROL PANEL</span><h1>{tab}</h1></div><button className="btn primary" onClick={()=>saveData(data)}><Save size={16}/> Saved locally</button></div>{tab==='Business'&&<Business data={data} update={update}/>} {tab==='Menu'&&<MenuAdmin data={data} setData={setData}/>} {tab==='Services'&&<ServicesAdmin data={data} setData={setData}/>} {tab==='Gallery'&&<GalleryAdmin data={data} setData={setData}/>} {tab==='Appearance'&&<Appearance data={data} update={update}/>} {tab==='Celebration'&&<CelebrationAdmin data={data} update={update}/>} {tab==='Custom Sections'&&<CustomAdmin data={data} setData={setData}/>}</section></div>
}
function Field({label,value,onChange,textarea=false,placeholder}){return <label className="field"><span>{label}</span>{textarea?<textarea value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>:<input value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>}</label>}
function Business({data,update}){return <div className="admin-card"><div className="form-grid"><Field label="Business name" value={data.businessName} onChange={v=>update({businessName:v})}/><Field label="Tagline" value={data.tagline} onChange={v=>update({tagline:v})}/><Field label="Phone" value={data.phone} onChange={v=>update({phone:v})}/><Field label="WhatsApp number" value={data.whatsapp} onChange={v=>update({whatsapp:v})}/><Field label="Hours" value={data.hours} onChange={v=>update({hours:v})}/><Field label="Address" value={data.address} onChange={v=>update({address:v})}/><Field label="Intro" value={data.intro} onChange={v=>update({intro:v})} textarea/><Field label="Hero image URL" value={data.heroImage} onChange={v=>update({heroImage:v})}/><Field label="About image URL" value={data.aboutImage} onChange={v=>update({aboutImage:v})}/><Field label="SEO title" value={data.seo?.title} onChange={v=>update({seo:{...data.seo,title:v}})}/><Field label="SEO description" value={data.seo?.description} onChange={v=>update({seo:{...data.seo,description:v}})} textarea/></div><div className="admin-card"><h3>Social links</h3><div className="form-grid"><Field label="Instagram URL" value={data.socials?.instagram} onChange={v=>update({socials:{...data.socials,instagram:v}})}/><Field label="Facebook URL" value={data.socials?.facebook} onChange={v=>update({socials:{...data.socials,facebook:v}})}/></div></div></div>}
function MenuAdmin({data,setData}){const blank={id:'',name:'',category:'',price:'Ask for price',description:'',image:''}; const [editing,setEditing]=useState(null); const items=data.menu; const save=item=>setData(d=>({...d,menu:item.id?d.menu.map(x=>x.id===item.id?item:x):[...d.menu,{...item,id:crypto.randomUUID()}]})); return <div className="admin-card"><button className="btn primary" onClick={()=>setEditing({...blank})}><Plus size={16}/> Add menu item</button><div className="admin-list">{items.map(item=><div className="list-row" key={item.id}><img src={item.image} alt=""/><div><strong>{item.name}</strong><small>{item.category} • {item.price}</small></div><button onClick={()=>setEditing({...item})}>Edit</button><button className="danger" onClick={()=>setData(d=>({...d,menu:d.menu.filter(x=>x.id!==item.id)}))}><Trash2 size={15}/></button></div>)}</div>{editing&&<Modal title={editing.id?'Edit menu item':'New menu item'} onClose={()=>setEditing(null)}><div className="form-grid"><Field label="Name" value={editing.name} onChange={v=>setEditing({...editing,name:v})}/><Field label="Category" value={editing.category} onChange={v=>setEditing({...editing,category:v})}/><Field label="Price" value={editing.price} onChange={v=>setEditing({...editing,price:v})}/><Field label="Image URL" value={editing.image} onChange={v=>setEditing({...editing,image:v})}/><Field label="Description" value={editing.description} onChange={v=>setEditing({...editing,description:v})} textarea/></div><button className="btn primary" onClick={()=>{save(editing);setEditing(null)}}><Save size={16}/> Save item</button></Modal>}</div>}
function ServicesAdmin({data,setData}){const [editing,setEditing]=useState(null);return <div className="admin-card"><button className="btn primary" onClick={()=>setEditing({id:'',title:'',text:''})}><Plus size={16}/> Add service</button><div className="admin-list">{data.services.map(s=><div className="list-row" key={s.id}><div><strong>{s.title}</strong><small>{s.text}</small></div><button onClick={()=>setEditing({...s})}>Edit</button><button className="danger" onClick={()=>setData(d=>({...d,services:d.services.filter(x=>x.id!==s.id)}))}><Trash2 size={15}/></button></div>)}</div>{editing&&<Modal title="Service" onClose={()=>setEditing(null)}><Field label="Title" value={editing.title} onChange={v=>setEditing({...editing,title:v})}/><Field label="Text" value={editing.text} onChange={v=>setEditing({...editing,text:v})} textarea/><button className="btn primary" onClick={()=>{setData(d=>({...d,services:editing.id?d.services.map(x=>x.id===editing.id?editing:x):[...d.services,{...editing,id:crypto.randomUUID()}]}));setEditing(null)}}>Save service</button></Modal>}</div>}
function GalleryAdmin({data,setData}){const [url,setUrl]=useState('');return <div className="admin-card"><div className="inline-form"><input placeholder="Paste image URL" value={url} onChange={e=>setUrl(e.target.value)}/><button className="btn primary" onClick={()=>{if(url.trim()){setData(d=>({...d,gallery:[...d.gallery,url.trim()]}));setUrl('')}}}><Plus size={16}/> Add</button></div><div className="admin-gallery">{data.gallery.map((g,i)=><div key={i}><img src={g} alt=""/><button className="danger" onClick={()=>setData(d=>({...d,gallery:d.gallery.filter((_,idx)=>idx!==i)}))}><Trash2 size={15}/></button></div>)}</div></div>}
function Appearance({data,update}){const templates=[['classic','Classic','Warm premium restaurant'],['editorial','Editorial','Bold magazine feel'],['celebration','Celebration','Festive special-event look']];return <div className="admin-card"><h3>Template</h3><div className="template-grid">{templates.map(([id,title,desc])=><button className={data.template===id?'selected':''} key={id} onClick={()=>update({template:id})}><Sparkles size={20}/><strong>{title}</strong><small>{desc}</small>{data.template===id&&<Check size={17}/>}</button>)}</div><h3>Brand colors</h3><div className="color-grid"><ColorField label="Primary" value={data.colors.primary} onChange={v=>update({colors:{...data.colors,primary:v}})}/><ColorField label="Accent" value={data.colors.accent} onChange={v=>update({colors:{...data.colors,accent:v}})}/><ColorField label="Dark" value={data.colors.dark} onChange={v=>update({colors:{...data.colors,dark:v}})}/><ColorField label="Cream" value={data.colors.cream} onChange={v=>update({colors:{...data.colors,cream:v}})}/></div><h3>Announcement bar</h3><label className="check"><input type="checkbox" checked={data.announcement.enabled} onChange={e=>update({announcement:{...data.announcement,enabled:e.target.checked}})}/> Show announcement</label><Field label="Message" value={data.announcement.message} onChange={v=>update({announcement:{...data.announcement,message:v}})}/></div>}
function ColorField({label,value,onChange}){return <label className="color-field"><span>{label}</span><input type="color" value={value} onChange={e=>onChange(e.target.value)}/><code>{value}</code></label>}
function CelebrationAdmin({data,update}){return <div className="admin-card"><label className="check"><input type="checkbox" checked={data.celebration.enabled} onChange={e=>update({celebration:{...data.celebration,enabled:e.target.checked}})}/> Show celebration section</label><Field label="Title" value={data.celebration.title} onChange={v=>update({celebration:{...data.celebration,title:v}})}/><Field label="Message" value={data.celebration.text} onChange={v=>update({celebration:{...data.celebration,text:v}})} textarea/><Field label="Button" value={data.celebration.button} onChange={v=>update({celebration:{...data.celebration,button:v}})}/></div>}
function CustomAdmin({data,setData}){const [editing,setEditing]=useState(null);return <div className="admin-card"><button className="btn primary" onClick={()=>setEditing({id:'',label:'CUSTOM SECTION',title:'',text:'',image:'',buttonText:'',buttonUrl:''})}><Plus size={16}/> Add custom section</button><p className="muted">Use this for announcements, promotions, private dining, testimonials, new services or any extra content you want on the page.</p><div className="admin-list">{data.customSections.map(s=><div className="list-row" key={s.id}><div><strong>{s.title}</strong><small>{s.label}</small></div><button onClick={()=>setEditing({...s})}>Edit</button><button className="danger" onClick={()=>setData(d=>({...d,customSections:d.customSections.filter(x=>x.id!==s.id)}))}><Trash2 size={15}/></button></div>)}</div>{editing&&<Modal title="Custom section" onClose={()=>setEditing(null)}><div className="form-grid"><Field label="Small label" value={editing.label} onChange={v=>setEditing({...editing,label:v})}/><Field label="Title" value={editing.title} onChange={v=>setEditing({...editing,title:v})}/><Field label="Text" value={editing.text} onChange={v=>setEditing({...editing,text:v})} textarea/><Field label="Image URL (optional)" value={editing.image} onChange={v=>setEditing({...editing,image:v})}/><Field label="Button text (optional)" value={editing.buttonText} onChange={v=>setEditing({...editing,buttonText:v})}/><Field label="Button URL (optional)" value={editing.buttonUrl} onChange={v=>setEditing({...editing,buttonUrl:v})}/></div><button className="btn primary" onClick={()=>{setData(d=>({...d,customSections:editing.id?d.customSections.map(x=>x.id===editing.id?editing:x):[...d.customSections,{...editing,id:crypto.randomUUID()}]}));setEditing(null)}}>Save section</button></Modal>}</div>}
function Modal({title,onClose,children}){return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={onClose}><X/></button></div>{children}</div></div>}

createRoot(document.getElementById('root')).render(<App/>);
