const places=resources.filter(r=>r.address);
const picker=document.querySelector('#map-place');
places.forEach(r=>{const option=document.createElement('option');option.value=r.id;option.textContent=r.title;picker.append(option)});
function selectPlace(){
 const r=places.find(r=>String(r.id)===picker.value);if(!r)return;
 document.querySelector('#map-address').textContent=r.address;
 document.querySelector('#map-source').href=r.additionalSource||r.sourceUrl;
 document.querySelector('#map-directions').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.address);
 document.querySelector('#map-frame').replaceChildren();
 document.querySelector('#map-status').textContent='Address ready. Load the interactive map or open directions.';
}
picker.addEventListener('change',selectPlace);
document.querySelector('#load-map').addEventListener('click',()=>{
 const r=places.find(r=>String(r.id)===picker.value);if(!r)return;
 const frame=document.createElement('iframe');frame.title='Map for '+r.title;frame.referrerPolicy='no-referrer-when-downgrade';frame.src='https://maps.google.com/maps?q='+encodeURIComponent(r.address)+'&output=embed';frame.loading='lazy';
 document.querySelector('#map-frame').replaceChildren(frame);
 document.querySelector('#map-status').textContent='If the map is blocked or blank, use Open directions below. Confirm the visit location with the provider.';
});
selectPlace();
