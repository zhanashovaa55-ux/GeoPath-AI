const respond=(code,obj)=>({statusCode:code,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(obj)});
exports.handler=async event=>{
 if(event.httpMethod!=='POST')return respond(405,{error:'Use POST'});
 let d;try{d=JSON.parse(event.body||'{}')}catch{return respond(400,{error:'Invalid JSON'})}
 if(!d.question||typeof d.question!=='string'||d.question.length>600)return respond(400,{error:'Enter a question (max 600 characters).'});
 const key=process.env.GEMINI_API_KEY;
 if(!key)return respond(503,{error:'GEMINI_API_KEY is missing in Netlify. Add it under Environment variables and redeploy.'});
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),23000);
 try{
  const list=await fetch('https://generativelanguage.googleapis.com/v1beta/models',{headers:{'x-goog-api-key':key},signal:controller.signal});
  const catalog=await list.json().catch(()=>({}));
  if(!list.ok)return respond(502,{error:'Gemini model list HTTP '+list.status+': '+(catalog.error?.message||'Check key permissions')});
  const preferred=['gemini-2.5-flash','gemini-2.5-flash-lite','gemini-2.0-flash'];
  const models=(catalog.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')&&/gemini.*flash/i.test(m.name)&&!/tts|image|live/i.test(m.name)).sort((a,b)=>{const rank=m=>{let i=preferred.indexOf(m.name.replace('models/',''));return i<0?99:i};return rank(a)-rank(b)});
  if(!models.length)return respond(503,{error:'No text Gemini Flash model available for this key.'});
  const prompt=`You are a helpful mathematics teacher. Current level: ${d.level}. Problem: ${d.problem}. Verified solution: ${d.verifiedSolution}. Student asks: ${d.question}. Answer the actual question accurately, in the student's language, step by step when requested. Preserve exercise numbers. Give a hint instead of the answer only when they ask for a hint.`;
  let last='';
  for(const model of models.slice(0,4)){
   const r=await fetch('https://generativelanguage.googleapis.com/v1beta/'+model.name+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{maxOutputTokens:700,temperature:0.2}}),signal:controller.signal});
   const j=await r.json().catch(()=>({}));
   if(r.ok){const answer=(j.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('\n').trim();if(answer)return respond(200,{mode:'live',model:model.name,answer});last='Empty response from '+model.name;continue}
   last='HTTP '+r.status+' '+model.name+': '+(j.error?.message||'Model request failed').slice(0,200);
   console.error(last);
   if([401,403,429].includes(r.status))break;
  }
  return respond(502,{error:'Gemini unavailable. '+last+'. Check API quota and model access.'});
 }catch(e){return respond(502,{error:e.name==='AbortError'?'Gemini timed out. Try again.':'Gemini connection failed: '+e.message})}finally{clearTimeout(timer)}
};
