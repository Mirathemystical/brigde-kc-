const resources = [
 {id:1,title:"Full Employment Council (FEC)",category:"Career",icon:"↗",description:"Kansas City, Missouri-area workforce services, including career guidance, job-search help, and training options for eligible participants.",tag:"Missouri workforce services",region:"Missouri-side counties; confirm service area and eligibility.",contact:"816-471-2330",url:"https://www.feckc.org/"},
 {id:2,title:"Workforce Partnership — Job Seeker Services",category:"Career",icon:"◎",description:"Job-search support for the Kansas-side workforce area, including resume help, interview preparation, and career services. Training funds may be available to eligible people.",tag:"Kansas workforce services",region:"Johnson, Leavenworth, and Wyandotte counties, Kansas.",contact:"Use the official website to find current contact options.",url:"https://workforcepartnership.com/job-seeker-services/"},
 {id:3,title:"FEC Youth Services",category:"Training",icon:"✳",description:"Workforce and career services for eligible young people, including training and work-based learning opportunities.",tag:"Youth ages 16–24",region:"Eligibility and service area apply; confirm details directly.",contact:"816-471-2330",url:"https://www.feckc.org/youth-services"},
 {id:4,title:"Literacy KC — Digital Literacy",category:"Digital skills",icon:"⌘",description:"Adult digital-literacy learning to build confidence using technology and everyday digital tools.",tag:"Adult digital skills",region:"Kansas City area; check current class availability and enrollment.",contact:"Use the official website for program details.",url:"https://literacykc.org/programs/digital-literacy/"},
 {id:5,title:"Kansas City, Kansas Public Library — Computers & Wi-Fi",category:"Digital skills",icon:"⌂",description:"Library computer access and Wi-Fi information for people who need a place to get online.",tag:"Computer and internet access",region:"Kansas City, Kansas Public Library branches; access rules and hours vary.",contact:"Check branch locations and hours on the official website.",url:"https://www.kckpl.org/computers-wifi"},
 {id:6,title:"KCK Public Library — One-on-One Sessions",category:"Digital skills",icon:"✦",description:"Ask about individual help with computers and related learning needs, including career or technology tasks.",tag:"Individual learning support",region:"Kansas City, Kansas Public Library; appointment and topic availability may vary.",contact:"Use the library website to check current sessions.",url:"https://www.kckpl.org/1-on-1-sessions"},
 {id:7,title:"United Way 211 — Community Resource Navigation",category:"Community",icon:"⌂",description:"Free, confidential resource navigation for food, housing, utilities, health care, childcare, employment, transportation, and other needs.",tag:"Help finding local services",region:"Kansas City region; ask about resources available in your ZIP code.",contact:"Dial 2-1-1 or use the official website. Service is described as available 24/7.",url:"https://211kc.org/"},
 {id:8,title:"Missouri SNAP Food Assistance",category:"Community",icon:"＋",description:"Official Missouri information about applying for food assistance and checking program requirements.",tag:"Food assistance",region:"Missouri residents; eligibility rules apply.",contact:"Application and contact information are on the official state website.",url:"https://mydss.mo.gov/food-assistance"},
 {id:9,title:"Missouri LIHEAP Utility Assistance",category:"Community",icon:"⌁",description:"State information about possible help with heating and cooling energy bills for eligible households.",tag:"Utility bill assistance",region:"Missouri residents; seasons, funding, and eligibility affect availability.",contact:"Review current application instructions on the official state website.",url:"https://mydss.mo.gov/utility-assistance/liheap"},
 {id:10,title:"Legal Aid of Western Missouri",category:"Community",icon:"§",description:"Civil legal aid information for people who may qualify for free legal assistance.",tag:"Civil legal help",region:"Service-area and income eligibility rules apply.",contact:"Kansas City office: 816-474-6750. Confirm current intake hours and eligibility.",url:"https://lawmo.org/"},
 {id:11,title:"Swope Health",category:"Community",icon:"✚",description:"Community health care provider. Visit the official site to explore services, locations, appointments, and payment options.",tag:"Community health care",region:"Kansas City area; services and eligibility vary by program.",contact:"Use the official website for current locations and contact details.",url:"https://swopehealth.org/"},
 {id:12,title:"Missouri WIC",category:"Community",icon:"♡",description:"Nutrition and food-support program for eligible pregnant or postpartum people, infants, and children under age five.",tag:"Family nutrition support",region:"Missouri residents; eligibility and enrollment requirements apply.",contact:"Use the official state website to find eligibility and local contacts.",url:"https://health.mo.gov/living/families/wic/"}
];
const plans = {
 job:{title:"A simple job-search plan",steps:[["Get clear on your target","Write down the kind of role, schedule, or workplace you want."],["Prepare one useful document","Gather your experience and update a resume or work history."],["Reach out to one resource","Try FEC for Missouri-side services or Workforce Partnership for its Kansas-side service area; confirm eligibility directly."]]},
 skills:{title:"A digital-skills starter plan",steps:[["Choose one skill to practice","Pick a task you want to feel more confident doing, like email or online forms."],["Find a learning option","Explore Literacy KC digital-literacy programs or ask a KCK Public Library branch about computer access and one-on-one help."],["Practice with a real task","Set aside 20 minutes to apply the skill and note what you want to learn next."]]},
 training:{title:"A training exploration plan",steps:[["Name your goal","Write down the role or skill you want training to help you reach."],["Compare two programs","Check total cost, time, prerequisites, format, and whether employers recognize it."],["Ask about funding first","Contact FEC or Workforce Partnership based on your area and ask whether you may qualify for training support before enrolling."]]},
 support:{title:"A community-support plan",steps:[["Decide what kind of help you need","You do not need to share sensitive personal details on this page."],["Start with 211","Ask United Way 211 about local food, housing, utility, health, childcare, or transportation resources."],["Confirm the next step","Check current eligibility, availability, costs, and what to bring directly with the provider."]]}
};
let activeCategory = "All";
const grid = document.querySelector("#resource-grid");
const search = document.querySelector("#search");
function renderResources(){
 const q = search.value.trim().toLowerCase();
 const filtered = resources.filter(r => (activeCategory==="All"||r.category===activeCategory) && (r.title+" "+r.description+" "+r.category+" "+r.tag+" "+r.region).toLowerCase().includes(q));
 document.querySelector("#result-count").textContent = filtered.length+" resource"+(filtered.length===1?"":"s");
 if(!filtered.length){grid.innerHTML='<div class="empty-state"><b>No matches just yet.</b><p>Try another phrase or reset the filters.</p></div>';return;}
 grid.innerHTML = filtered.map(r=>'<article class="resource-card"><div class="resource-top"><span class="resource-icon" aria-hidden="true">'+r.icon+'</span><span class="resource-category">'+r.category+'</span></div><h3>'+r.title+'</h3><p>'+r.description+'</p><p><b>Area:</b> '+r.region+'</p><p><b>Contact:</b> '+r.contact+'</p><div class="resource-footer"><span>'+r.tag+'</span><a href="'+r.url+'" target="_blank" rel="noopener noreferrer" aria-label="Visit official website for '+r.title+'">Official site ↗</a></div></article>').join("");
}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
 activeCategory=button.dataset.category;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
 renderResources();
}));
search.addEventListener("input",renderResources);
document.querySelector("#clear-filters").addEventListener("click",()=>{
 search.value="";activeCategory="All";
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));
 renderResources();
});
function renderPlan(){
 const plan=plans[document.querySelector("#goal").value];
 document.querySelector("#plan-title").textContent=plan.title;
 document.querySelector("#plan-steps").innerHTML=plan.steps.map((s,i)=>'<li><span>'+(i+1)+'</span><div><b>'+s[0]+'</b><p>'+s[1]+'</p></div></li>').join("");
 document.querySelector("#plan-steps").dataset.goal=document.querySelector("#goal").value;
 document.querySelector("#saved-message").textContent="";
 document.querySelector("#save-plan").textContent="□ Save steps on this device";
}
document.querySelector("#make-plan").addEventListener("click",renderPlan);
document.querySelector("#goal").addEventListener("change",renderPlan);
document.querySelector("#save-plan").addEventListener("click",()=>{
 const key="bridge-kc-saved-plan";
 const goal=document.querySelector("#goal").value;
 try{
  const existing=localStorage.getItem(key);
  if(existing===goal){localStorage.removeItem(key);document.querySelector("#saved-message").textContent="Plan removed from this device.";document.querySelector("#save-plan").textContent="□ Save steps on this device";}
  else{localStorage.setItem(key,goal);document.querySelector("#saved-message").textContent="Plan saved in this browser on this device.";document.querySelector("#save-plan").textContent="✓ Saved on this device";}
 }catch(e){document.querySelector("#saved-message").textContent="Local storage is unavailable in this browser session.";}
});
document.querySelector("#feedback-form").addEventListener("submit",e=>{
 e.preventDefault();
 document.querySelector("#feedback-message").textContent="Thanks—your choice is shown only in this demo. It has not been sent or stored.";
 document.querySelector("#feedback").value="";
});
renderResources();
try{if(localStorage.getItem("bridge-kc-saved-plan")){document.querySelector("#saved-message").textContent="A plan is saved in this browser.";document.querySelector("#save-plan").textContent="✓ Saved on this device";}}catch(e){}
