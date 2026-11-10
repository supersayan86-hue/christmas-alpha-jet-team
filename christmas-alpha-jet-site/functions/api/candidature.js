// Cloudflare Pages Function : le webhook reste dans une variable secrète.
const allowedRoles = ['Pilote Athos 1 à 8','Pilote remplaçant','Réalisation / Caméras','Communication / Live','Support technique','Organisation / Staff'];
const allowedExperience = ['Débutant','Intermédiaire','Expérimenté'];
const allowedAvailability = ['Samedi','Dimanche','Les deux'];
const allowedParticipation = ['Oui','Non','À confirmer selon les dates'];
const json = (data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
const clean = (value,max=900)=>typeof value==='string'?value.trim().slice(0,max).replace(/@/g,'＠'):'';
export async function onRequestPost({request,env}) {
  if(!env.DISCORD_WEBHOOK_URL) return json({error:'Le serveur n’est pas encore configuré. Contacte le staff.'},503);
  const origin=request.headers.get('Origin');
  if(origin && origin!==new URL(request.url).origin) return json({error:'Origine non autorisée.'},403);
  if(Number(request.headers.get('content-length')||0)>10000) return json({error:'Formulaire trop volumineux.'},413);
  let d;try{d=await request.json()}catch{return json({error:'Données invalides.'},400)}
  if(d.website) return json({ok:true}); // champ piège anti-robots
  const pseudo=clean(d.pseudo,60),motivation=clean(d.motivation,900);
  if(pseudo.length<2||motivation.length<5||!allowedExperience.includes(d.experience)||!['Oui','Non'].includes(d.alpha)||!allowedAvailability.includes(d.availability)||!allowedParticipation.includes(d.participation)||!Array.isArray(d.roles)||!d.roles.length||d.roles.length>6||!d.roles.every(r=>allowedRoles.includes(r)))return json({error:'Vérifie les champs du formulaire.'},400);
  const fields=[{name:'👤 Pseudo Discord',value:pseudo},{name:'🎮 Expérience',value:d.experience,inline:true},{name:'✈️ Alpha Jet Virga Studio',value:d.alpha,inline:true},{name:'📅 Disponibilités',value:d.availability,inline:true},{name:'🎯 Poste(s) souhaité(s)',value:d.roles.join('\n')},{name:'💬 Motivation',value:motivation},{name:'🎥 Répétitions et lives',value:d.participation}];
  try {const resp=await fetch(env.DISCORD_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'Christmas Alpha Jet • Recrutement',allowed_mentions:{parse:[]},embeds:[{title:'📨 Nouvelle candidature',color:2447606,fields,footer:{text:'Christmas Alpha Jet Team • MSFS 2024'},timestamp:new Date().toISOString()}]})});if(!resp.ok)throw Error('Discord '+resp.status);return json({ok:true});}catch{return json({error:'Impossible de transmettre la candidature pour le moment. Réessaie plus tard.'},502)}
}
export function onRequestGet(){return json({error:'Méthode non autorisée.'},405)}
