import fs from 'node:fs/promises';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import { buildPainDeck } from './build.mjs';
const data=JSON.parse(await fs.readFile(new URL('./content.json',import.meta.url),'utf8'));
const presentation=Presentation.create({slideSize:{width:1280,height:720}});
buildPainDeck(presentation,data);
const output=process.argv[2];
if(!output)throw new Error('Usage: node export.mjs NEW_OUTPUT.pptx');
try{await fs.access(output);throw new Error('Refusing overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
const pptx=await PresentationFile.exportPptx(presentation);await pptx.save(output);
console.log('Saved nine slides. Render and inspect before distributing.');
