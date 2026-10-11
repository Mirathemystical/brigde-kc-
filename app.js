const resources = [
 {id:1,title:"Resume & job-search basics",category:"Career",icon:"↗",description:"Explore ways to organize experience, prepare applications, and plan a job search.",tag:"Career planning"},
 {id:2,title:"Career coaching",category:"Career",icon:"◎",description:"A starting point for learning about career exploration, job-search support, and interview practice.",tag:"Job readiness"},
 {id:3,title:"Workforce training pathways",category:"Training",icon:"✳",description:"Compare training formats and questions to ask before choosing a program.",tag:"Training options"},
 {id:4,title:"Computer skills practice",category:"Digital skills",icon:"⌘",description:"Build confidence with everyday computer, email, and online-work tasks.",tag:"Digital confidence"},
 {id:5,title:"Community resource navigation",category:"Community",icon:"⌂",description:"Find out how local organizations may help you identify services and next steps.",tag:"Community support"},
 {id:6,title:"Certification exploration",category:"Training",icon:"◇",description:"Learn what to check about certification costs, time, prerequisites, and recognition.",tag:"Career growth"}
];
const plans = {
 job:{title:"A simple job-search plan",steps:[["Get clear on your target","Write down the kind of role, schedule, or workplace you want."],["Prepare one useful document","Gather your experience and update a resume or work history."],["Reach out to one resource","Choose a relevant career-support organization and ask about its services."]]},
 skills:{title:"A digital-skills starter plan",steps:[["Choose one skill to practice","Pick a task you want to feel more confident doing, like email or online forms."],["Find a learning option","Compare beginner-friendly classes, practice tools, or library programs."],["Practice with a real task","Set aside 20 minutes to apply the skill and note what you want to learn next."]]},
 training:{title:"A training exploration plan",steps:[["Name your goal","Write down the role or skill you want training to help you reach."],["Compare two programs","Check total cost, time, prerequisites, format, and whether employers recognize it."],["Ask before you enroll","Contact the provider to confirm current details and support options."]]},
 support:{title:"A community-support plan",steps:[["Decide what kind of help you need","Describe the practical goal without sharing sensitive information here."],["Find a trusted organization","Look for a provider with clear contact details and services that match your goal."],["Ask about the first step","Confirm eligibility, availability, costs, and what to bring before visiting."]]}
};
let activeCategory = "All";
const grid = document.querySelector("#resource-grid");
const search = document.querySelector("#search");
function renderResources(){
 const q = search.value.trim().toLowerCase();
 const filtered = resources.filter(r => (activeCategory==="All"||r.category===activeCategory) && (r.title+" "+r.description+" "+r.category+" "+r.tag).toLowerCase().includes(q));
 document.querySelector("#result-count").textContent = filtered.length+" example"+(filtered.length===1?"":"s");
 if(!filtered.length){grid.innerHTML='<div class="empty-state"><b>No matches just yet.</b><p>Try another phrase or reset the filters.</p></div>';return;}
 grid.innerHTML = filtered.map(r=>'<article class="resource-card"><div class="resource-top"><span class="resource-icon" aria-hidden="true">'+r.icon+'</span><span class="resource-category">'+r.category+'</span></div><h3>'+r.title+'</h3><p>'+r.description+'</p><div class="resource-footer"><span>'+r.tag+'</span><button type="button" data-resource="'+r.id+'">Explore idea ↗</button></div></article>').join("");
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
