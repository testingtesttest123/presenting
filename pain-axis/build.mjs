/** Populate a new 1280x720 Artifact Tool presentation. */
export function buildPainDeck(presentation,data) {
 if(data.length!==9)throw new Error('Expected nine slides');
 if(presentation.slides.items.length>1)throw new Error('Use an empty presentation');
 function txt(s,name,value,x,y,w,h,size,color='#17283D',bold=false){const q=s.shapes.add({name,geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}});q.text=value;q.text.style={fontSize:size,typeface:'Arial',color,bold,verticalAlignment:'top',insets:0};}
 for(let i=0;i<data.length;i++){
  const d=data[i],s=i===0&&presentation.slides.items.length===1?presentation.slides.getItem(0):presentation.slides.add();s.background.fill='#F8F9F6';
  txt(s,'title',d.title,64,i===0?105:48,1152,i===0?90:112,i===0?58:43,'#17283D',true);
  if(d.type==='cover')txt(s,'body',d.body,64,250,1110,260,32);
  else if(d.equation){txt(s,'body',d.body,64,180,1152,190,27);txt(s,'equation',d.equation,64,395,1152,65,43);txt(s,'labels',d.labels,64,466,1152,42,23);txt(s,'bottom',d.bottom,64,545,1152,82,27);}
  else if(d.table){const top=184,h=i===3?330:250,widths=d.table[0].length===4?[570,190,190,190]:[570,570];const t=s.tables.add({rows:d.table.length,columns:d.table[0].length,left:64,top,width:1140,height:h,columnWidths:widths,values:d.table});for(let r=0;r<d.table.length;r++)for(let c=0;c<d.table[0].length;c++){const q=t.getCell(r,c);q.fill=r===0?'#DEE8F0':'#F8F9F6';q.text.style={fontSize:24,typeface:'Arial',color:'#17283D',bold:r===0,insets:12,verticalAlignment:'middle'};}t.borders.assign({style:'solid',fill:'#CDD6DD',width:1});if(d.body)txt(s,'body',d.body,64,top+h+34,1140,155,26);}
  else txt(s,'body',d.body,64,190,1140,420,29);
  txt(s,'footer',i===0?'arXiv:2609.16247v2. Technical briefing. 21 October 2026.':`${i+1} / 9`,64,668,1140,25,17,i===2?'#17283D':'#536577');
  s.speakerNotes.text=d.savedNotes??d.notes+'\n\nSources\n'+d.sources.join('\n');
 }
 return {slides:presentation.slides.items.length};
}
