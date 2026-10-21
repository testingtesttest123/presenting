import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require=createRequire(import.meta.url);
const {Presentation,PresentationFile}=await import(pathToFileURL(process.env.ARTIFACT_TOOL_MODULE||require.resolve('@oai/artifact-tool')).href);
const content=JSON.parse(await fs.readFile(new URL('./content.json',import.meta.url),'utf8'));
const presentation=Presentation.create({slideSize:{width:1280,height:720}});
// Native editable shapes and attached connectors. No artifact edits occur here.
function label(slide,name,value,x,y,w,h,size=26,color='#142334') {
 const s=slide.shapes.add({geometry:'textbox',name,position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}});
 s.text=value;s.text.style={fontSize:size,typeface:'Arial',color,insets:0,verticalAlignment:'top'};return s;
}
function node(slide,name,value,x,y,w=220,h=96,color='#E5EEF3') {
 const s=slide.shapes.add({geometry:'rect',name,position:{left:x,top:y,width:w,height:h},fill:color,line:{style:'solid',fill:'#567083',width:1.5}});
 s.text=value;s.text.style={fontSize:26,typeface:'Arial',color:'#142334',insets:14,alignment:'center',verticalAlignment:'middle'};return s;
}
function link(slide,a,b,fromSide='right',toSide='left',color='#245D83') {
 return slide.shapes.connect(a,b,{kind:'straight',fromSide,toSide,line:{style:'solid',fill:color,width:2.5},tail:{type:'triangle',width:'med',length:'med'}});
}
function diagram(sl,d,n){
sl.background.fill="#F7F9FA";label(sl,"title",d.title,64,45,1152,90,44);
if(d.diagram==="vscode"){
const host=sl.shapes.add({geometry:"rect",name:"host-boundary",position:{left:64,top:160,width:470,height:440},fill:"#EEF3F5",line:{style:"solid",fill:"#A5B9C6",width:1.5}});
label(sl,"host-label","VS Code host / harness",88,180,420,45,28);
const m=node(sl,"model","Model interaction",105,250,350,90),c=node(sl,"client","Orchestration + MCP client",105,440,350,90);
sl.shapes.add({geometry:"downArrow",position:{left:420,top:350,width:24,height:75},fill:"#245D83",line:{style:"solid",fill:"#245D83",width:1}});label(sl,"request-label","Tool request and arguments",120,365,280,65,23);
const local=node(sl,"local","Command-launched MCP server",760,230,420,110),remote=node(sl,"remote","Remote MCP endpoint",760,440,420,110);
sl.shapes.connect(c,local,{kind:"elbow",fromSide:"right",toSide:"left",line:{style:"solid",fill:"#245D83",width:2.5},tail:{type:"triangle"}});
link(sl,c,remote);label(sl,"stdio","stdio",570,230,150,40,25);label(sl,"http","HTTPS",570,440,150,40,25);
label(sl,"host-note","The execution host can be a local machine or a remote workspace.",64,620,1152,36,23);
}else if(d.diagram==="toolflow"){
const labels=["User request\nand context","Model requests\nan enabled tool","Host checks\npermissions","MCP client\ndispatches call","Server executes\nand returns result"];
const ns=labels.map((s,i)=>node(sl,"step-"+i,s,64+i*232,225,200,140));for(let i=0;i<4;i++)link(sl,ns[i],ns[i+1]);
label(sl,"approval","User approval when required by the current permission mode.",64,430,1150,60,28);
label(sl,"result","The host includes tool output in the model's next-step context.",64,520,1150,60,28);
}else{
const client=node(sl,"client","MCP client",64,300,230,100),server=node(sl,"server","MCP server",500,300,250,100),api=node(sl,"api","Backing API",986,300,230,100);
link(sl,client,server);link(sl,server,api);
label(sl,"token-a","Token A\naudience: MCP",315,215,180,80,25);
label(sl,"token-b",d.diagram==="service"?"Service credential":"Token B\naudience: API",780,215,200,80,25);
if(d.diagram==="boundaries"){
label(sl,"scope-a","MCP scopes",315,425,180,50,24);label(sl,"scope-b","API scopes",780,425,180,50,24);
label(sl,"boundary-note","OAuth protects the MCP endpoint. Downstream authorization is separate.",64,540,1152,80,29);
}else if(d.diagram==="vault"){
const vault=node(sl,"vault","Provider token store",500,505,250,90,"#E8F0E6");link(sl,vault,server,"top","bottom");
label(sl,"lookup","Authorized connection lookup\nreturns provider token B",780,490,425,90,24);
label(sl,"consent","Separate provider consent\nlinks the user's external account",64,500,380,90,24);
}else if(d.diagram==="exchange"){
const as=node(sl,"as","Authorization server",500,505,250,90,"#E8F0E6");
sl.shapes.connect(server,as,{kind:"straight",fromSide:"bottom",toSide:"top",line:{style:"solid",fill:"#245D83",width:2.5},head:{type:"triangle"},tail:{type:"triangle"}});
label(sl,"exchange","Authenticated exchange at token endpoint:\nA as assertion/subject token; B returned",780,485,425,110,24);
label(sl,"no-pass","A is not forwarded\nto the backing API.",64,505,360,70,26);
}else if(d.diagram==="service"){
const identity=node(sl,"identity","Credential provider",500,505,250,100,"#E8F0E6");link(sl,identity,server,"top","bottom");
label(sl,"authority","The API sees service authority,\nnot automatic user delegation.",780,495,425,90,26);
label(sl,"policy","Existing application policy\nconstrains caller operations.",64,505,380,90,24);
}
}
label(sl,"footer",(d.diagram==="vscode"||d.diagram==="toolflow"?"Product illustration; deployed protocol support varies":"Implementation pattern; separate authorization boundaries")+" · "+n,64,674,1152,26,16);
sl.speakerNotes.text=d.notes+"\n\nSources:\n"+d.sources.join("\n");
}
function draw(sl,d,n){
sl.background.fill="#F7F9FA";label(sl,"title",d.title,64,48,1152,90,d.type==="cover"?58:44);
if(d.type==="cover")label(sl,"subtitle",d.body,64,220,1100,300,32);
else if(d.type==="code"){const q=label(sl,"code",d.body,64,165,1152,450,26);q.text.typeface="Courier New";}
else if(d.type==="table"){
const rows=d.body.length,cols=d.body[0].length;
const t=sl.tables.add({rows,columns:cols,left:64,top:170,width:1152,height:410,columnWidths:cols===2?[450,702]:[260,446,446],values:d.body});
for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const q=t.getCell(r,c);q.fill=r===0?"#DCE7ED":r%2?"#FFFFFF":"#EEF3F5";q.text.style={fontSize:25,typeface:"Arial",color:"#142334",insets:12};}t.borders.assign({style:"solid",fill:"#CBD6DD",width:1});
}else d.body.forEach((b,i)=>label(sl,"point-"+i,b,64,178+i*86,1130,74,30));
label(sl,"footer","MCP 2026-07-28 · "+n,64,666,1152,24,17);
sl.speakerNotes.text=d.notes+"\n\nSources:\n"+d.sources.join("\n");
}
for(const [i,d] of content.entries()){const s=presentation.slides.add();if(d.type==="diagram")diagram(s,d,i+1);else draw(s,d,i+1);}
const out=process.argv[2]||'mcp-servers.pptx';await(await PresentationFile.exportPptx(presentation)).save(out);console.log(JSON.stringify({slides:content.length,output:out}));
