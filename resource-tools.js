function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function matchResources(records,answers){
 const maxWeeks={fast:13,mid:39,long:78}[answers.time]||78;
 return records.filter(r=>r.match && r.match.interests.includes(answers.interest) && r.id!==61).map(r=>{
  const m=r.match, reasons=['Relevant to your selected interest'],cautions=[];let score=10;
  if(answers.location!=='both' && m.side!=='both' && m.side!==answers.location)return null;
  reasons.push(m.side==='both'?'Serves the metro; confirm training location':'Provider on your preferred side of the metro');score+=3;
  if(answers.format!=='any' && m.formats.length && !m.formats.includes(answers.format))return null;
  if(answers.format!=='any'){if(m.formats.includes(answers.format)){score+=3;reasons.push('Lists your preferred attendance format')}else cautions.push('Attendance format unconfirmed');}
  if(m.styles.includes(answers.style)){score+=2;reasons.push('Offers your preferred learning approach')}else cautions.push('Ask about your preferred learning approach');
  if(m.weeks && m.weeks<=maxWeeks){score+=3;reasons.push('Published duration fits your timeline')}else if(m.weeks)cautions.push('Published duration exceeds your timeline');else cautions.push('Program duration unconfirmed');
  if(answers.barrier==='free'){if(m.cost==='free'){score+=4;reasons.push('No-cost training listed')}else if(m.cost==='funded'){score+=1;cautions.push('Funding requires eligibility and approval')}else cautions.push('Full training costs unconfirmed');}
  if(answers.barrier==='paid'){if(m.cost==='paid'){score+=5;reasons.push('Paid internship listed')}else cautions.push('Paid participation is not confirmed');}
  if(answers.barrier==='flex')cautions.push('Confirm actual class hours and attendance rules');
  if(['stable','growth'].includes(answers.barrier))cautions.push('Compare employer demand, benefits and advancement; these are not guaranteed');
  if(r.availability!=='Confirm current intake directly')cautions.push(r.availability);
  return {resource:r,score,reasons,cautions};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||a.resource.id-b.resource.id);
}
function resourceCard(r){
 const label=r.reviewStatus==='reviewed'?'Program facts reviewed '+r.lastChecked:r.reviewStatus==='source-located'?'Provider page located · confirm listing details':'Details need confirmation';
 return '<article class="resource-card"><div class="resource-top"><span class="resource-icon" aria-hidden="true">'+escapeHTML(r.icon)+'</span><span class="resource-category">'+escapeHTML(r.category)+'</span></div><h3>'+escapeHTML(r.title)+'</h3><p>'+escapeHTML(r.description)+'</p><p><b>Area:</b> '+escapeHTML(r.region)+'</p><p><b>Contact:</b> '+escapeHTML(r.contact)+'</p><details><summary>Cost, eligibility & source</summary><p><b>Cost:</b> '+escapeHTML(r.cost)+'</p><p><b>Eligibility:</b> '+escapeHTML(r.eligibility)+'</p><p><b>Duration:</b> '+escapeHTML(r.duration)+'</p><p><b>Format:</b> '+escapeHTML(r.format)+'</p><p><b>Availability:</b> '+escapeHTML(r.availability)+'</p><p>'+escapeHTML(label)+'</p><a href="'+escapeHTML(r.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Review source ↗</a></details><div class="resource-footer"><span>'+escapeHTML(r.tag)+'</span><a href="'+escapeHTML(r.url)+'" target="_blank" rel="noopener noreferrer">Official site ↗</a></div></article>';
}
if(typeof module!=='undefined')module.exports={matchResources,escapeHTML,resourceCard};
