if (typeof document === 'undefined') {
  console.warn('BRIDGE KC must run in a browser. Start it with: npm start');
  if (typeof process !== 'undefined') {
    process.exit(0);
  }
}

const navToggle = document.querySelector('.nav-toggle');
const siteHeader = document.querySelector('.site-header');
const quickNavSelect = document.querySelector('.quick-nav-select-menu');

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteHeader.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      siteHeader.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (quickNavSelect) {
  quickNavSelect.addEventListener('change', () => {
    if (quickNavSelect.value) {
      window.location.href = quickNavSelect.value;
    }
  });
}

const plans = {
 job:{title:"A simple job-search plan",steps:[["Get clear on your target","Write down the kind of role, schedule, or workplace you want."],["Prepare one useful document","Gather your experience and update a resume or work history."],["Reach out to one resource","Try FEC for Missouri-side services or Workforce Partnership for its Kansas-side service area; confirm eligibility directly."]]},
 skills:{title:"A digital-skills starter plan",steps:[["Choose one skill to practice","Pick a task you want to feel more confident doing, like email or online forms."],["Find a learning option","Explore Literacy KC digital-literacy programs or ask a KCK Public Library branch about computer access and one-on-one help."],["Practice with a real task","Set aside 20 minutes to apply the skill and note what you want to learn next."]]},
 training:{title:"A training exploration plan",steps:[["Name your goal","Write down the role or skill you want training to help you reach."],["Compare two programs","Check total cost, time, prerequisites, format, and whether employers recognize it."],["Ask about funding first","Contact FEC or Workforce Partnership based on your area and ask whether you may qualify for training support before enrolling."]]},
 support:{title:"A community-support plan",steps:[["Decide what kind of help you need","You do not need to share sensitive personal details on this page."],["Start with 211","Ask United Way 211 about local food, housing, utility, health, childcare, or transportation resources."],["Confirm the next step","Check current eligibility, availability, costs, and what to bring directly with the provider."]]}
};

if (typeof document !== "undefined" && document.body.dataset.categoryPage) {
 const categoryName = document.body.dataset.categoryPage;
 const grid = document.querySelector("#resource-grid");
 const search = document.querySelector("#search");
 const count = document.querySelector("#result-count");
 let activeCommunityFilter = "All";
 const renderCategoryResources = () => {
  const query = search.value.trim().toLowerCase();
  const includedCategories = categoryName === "Community"
   ? (activeCommunityFilter === "All" ? ["Community", "Housing", "Transportation", "Childcare"] : [activeCommunityFilter])
   : [categoryName];
  const filtered = resources.filter(resource => (categoryName === "All" || includedCategories.includes(resource.category)) && (resource.title+" "+resource.description+" "+resource.tag+" "+resource.region+" "+resource.contact).toLowerCase().includes(query));
  count.textContent = filtered.length+" resource"+(filtered.length===1?"":"s");
  if (!filtered.length) {
   grid.innerHTML = '<div class="empty-state"><b>No matches just yet.</b><p>Try another search phrase.</p></div>';
   return;
  }
  grid.innerHTML = filtered.map(resourceCard).join("");
 };
 document.querySelectorAll("[data-community-filter]").forEach(button => {
  button.addEventListener("click", () => {
   activeCommunityFilter = button.dataset.communityFilter;
   document.querySelectorAll("[data-community-filter]").forEach(item => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
   });
   renderCategoryResources();
  });
 });
 search.addEventListener("input",renderCategoryResources);
 document.querySelector("#clear-filters").addEventListener("click",()=>{search.value="";activeCommunityFilter="All";document.querySelectorAll("[data-community-filter]").forEach(b=>{b.classList.toggle("is-active",b.dataset.communityFilter==="All");b.setAttribute("aria-pressed",String(b.dataset.communityFilter==="All"));});renderCategoryResources();search.focus();});
 renderCategoryResources();
} else if (document.querySelector("#goal")) {

let activeCategory = "All";
const grid = document.querySelector("#resource-grid");
const search = document.querySelector("#search");
function renderResources(){
 const q = search.value.trim().toLowerCase();
 const filtered = resources.filter(r => (activeCategory==="All"||(activeCategory==="Community" ? ["Community","Housing","Transportation","Childcare"].includes(r.category) : r.category===activeCategory)) && (r.title+" "+r.description+" "+r.category+" "+r.tag+" "+r.region).toLowerCase().includes(q));
 document.querySelector("#result-count").textContent = filtered.length+" resource"+(filtered.length===1?"":"s");
 if(!filtered.length){grid.innerHTML='<div class="empty-state"><b>No matches just yet.</b><p>Try another phrase or reset the filters.</p></div>';return;}
 grid.innerHTML = filtered.map(resourceCard).join("");
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
renderResources();
try{const savedGoal=localStorage.getItem("bridge-kc-saved-plan");if(savedGoal && plans[savedGoal]){document.querySelector("#goal").value=savedGoal;renderPlan();document.querySelector("#saved-message").textContent="A plan is saved in this browser.";document.querySelector("#save-plan").textContent="✓ Saved on this device";}}catch(e){}

}

const careerQuiz = document.querySelector("#career-quiz");
if(careerQuiz) careerQuiz.addEventListener("submit",event=>{
 event.preventDefault();
 const answers=Object.fromEntries(["interest","style","time","barrier","location","format"].map(k=>[k,document.querySelector("#quiz-"+k).value]));
 const matches=matchResources(resources,answers);
 const result=document.querySelector("#quiz-results");
 result.innerHTML='<h3>Your pathway options</h3><p>Ranked by your interests and preferences. Eligibility and intake are decided by each provider. Unconfirmed details are shown below.</p>'+(matches.length?matches.slice(0,5).map(m=>'<article class="match-card"><h4><a href="'+escapeHTML(m.resource.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(m.resource.title)+' ↗</a></h4><p><b>Why this appears:</b> '+escapeHTML(m.reasons.join('; '))+'</p><p><b>Confirm before applying:</b> '+escapeHTML(m.cautions.join('; ')||'Current intake, eligibility and total costs')+'</p><p>'+escapeHTML(m.resource.duration)+' · '+escapeHTML(m.resource.cost)+'</p></article>').join(''):'<p>No listed program fits these constraints closely enough. Broaden the area or format, or ask a workforce adviser for alternatives.</p>')+'<h4>Your next steps</h4><ol><li>Today: compare the requirements and unconfirmed details above.</li><li>This week: contact one provider to confirm schedule, cost and eligibility.</li><li>Ask about transport, childcare, equipment and funding before enrolling.</li></ol><p><a href="'+(answers.location==='ks'?'https://workforcepartnership.com/job-seeker-services/':'https://www.feckc.org/')+'" target="_blank" rel="noopener noreferrer">Contact a workforce adviser ↗</a></p>';
 result.tabIndex=-1;result.focus();
});
