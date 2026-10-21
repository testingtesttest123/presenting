import fs from 'node:fs/promises';
import { Presentation } from '@oai/artifact-tool';
import { buildPainDeck } from './build.mjs';
const data=JSON.parse(await fs.readFile(new URL('./content.json',import.meta.url),'utf8'));
const p=Presentation.create({slideSize:{width:1280,height:720}});
const result=buildPainDeck(p,data);
if(result.slides!==9)throw new Error('Slide count mismatch');
for(let i=0;i<9;i++)if(String(p.slides.getItem(i).speakerNotes.text)!==data[i].savedNotes)throw new Error('Notes mismatch');
console.log('Nine slides constructed. All saved notes match. No file exported.');
