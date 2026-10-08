import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const colors = {ink:'#dce8e5', muted:'#9db8b8', line:'#39616a', gold:'#d5ad61', paper:'#092f35'};
const routes = [
  [[105,218],[187,218],[247,310],[277,310]],
  [[105,336],[220,336],[277,336]],
  [[105,454],[187,454],[247,368],[277,368]],
  [[443,310],[478,310],[530,218],[608,218]],
  [[443,336],[506,336],[608,336]],
  [[443,368],[478,368],[530,454],[608,454]],
];
function pointOnRoute(points, progress) {
  const lengths = points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
  let remaining = lengths.reduce((sum,n)=>sum+n,0) * progress;
  for (let i=0;i<lengths.length;i++) {
    if (remaining<=lengths[i]) {
      const p=remaining/lengths[i];
      return [points[i][0]+(points[i+1][0]-points[i][0])*p,points[i][1]+(points[i+1][1]-points[i][1])*p];
    }
    remaining-=lengths[i];
  }
  return points[points.length-1];
}
export function AlgorithmScene({language='id',compact=false}) {
  const frame=useCurrentFrame();
  const en=language==='en';
  const inputs=en?['Information','Recommendations','Priorities']:['Informasi','Rekomendasi','Prioritas'];
  const outputs=en?['Access','Choices','Trust']:['Akses','Pilihan','Kepercayaan'];
  const activeCell=Math.floor(frame/10)%12;
  if (compact) {
    const blocks=en
      ? [['INFORMATION','Recommendations / priorities'],['ASSESSMENT','Bias / context / ethics'],['PUBLIC IMPACT','Access / choices / trust']]
      : [['INFORMASI','Rekomendasi / prioritas'],['PENILAIAN','Bias / konteks / etika'],['DAMPAK PUBLIK','Akses / pilihan / kepercayaan']];
    return <AbsoluteFill style={{background:colors.paper}}>
      <svg viewBox="0 0 480 600" width="100%" height="100%" data-composition-frame={frame} aria-hidden="true">
        <defs><pattern id="compact-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke={colors.line} strokeWidth=".6" opacity=".3" /></pattern></defs>
        <rect width="480" height="600" fill="url(#compact-grid)" />
        <g fontFamily="'IBM Plex Mono', ui-monospace, monospace">
          <text x="30" y="40" fill={colors.gold} fontSize="12" letterSpacing="1.2">CN / ALGORITHMIC SYSTEMS</text>
          <text x="30" y="81" fill={colors.ink} fontSize="25" fontWeight="500">{en?'Information → impact':'Informasi → dampak'}</text>
          {[0,1].map(i=>{
            const phase=((frame+i*35)%100)/100;
            const y=230+i*138;
            return <g key={i}><path d={`M240 ${y}v42`} stroke={colors.line} strokeWidth="1.5" /><rect x="237" y={y+phase*38} width="6" height="6" fill={colors.gold} /></g>;
          })}
          {blocks.map(([title,subtitle],i)=>{
            const y=126+i*138;
            const active=Math.floor(frame/40)%3===i;
            return <g key={i}>
              <rect x="30" y={y} width="420" height="104" fill={i===1?'#0d3b42':colors.paper} stroke={active?colors.gold:colors.line} strokeWidth="1.4" />
              <text x="49" y={y+32} fill={colors.gold} fontSize="12">0{i+1}</text>
              <text x="85" y={y+41} fill={colors.ink} fontSize="23" fontWeight="500">{title}</text>
              <text x="85" y={y+74} fill={colors.muted} fontSize="17">{subtitle}</text>
            </g>;
          })}
          <path d="M30 546H450" stroke={colors.line} />
          <text x="30" y="578" fill={colors.muted} fontSize="12" letterSpacing="1.1">{en?'CONCEPTUAL MODEL':'MODEL KONSEPTUAL'}</text>
          <text x="450" y="578" fill={colors.gold} fontSize="12" textAnchor="end">CAKRA NALA</text>
        </g>
      </svg>
    </AbsoluteFill>;
  }
  return <AbsoluteFill style={{background:colors.paper}}>
    <svg viewBox="0 0 720 620" width="100%" height="100%" data-composition-frame={frame} aria-hidden="true">
      <defs><pattern id="tech-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke={colors.line} strokeWidth=".6" opacity=".3" /></pattern></defs>
      <rect width="720" height="620" fill="url(#tech-grid)" />
      <g fill="none" stroke={colors.muted} strokeWidth="1" opacity=".6"><path d="M20 38V20H38M682 20H700V38M20 582V600H38M682 600H700V582" /></g>
      <g fontFamily="'IBM Plex Mono', ui-monospace, monospace">
        <text x="42" y="61" fill={colors.gold} fontSize="14" letterSpacing="2">CN / ALGORITHMIC SYSTEMS</text>
        <text x="42" y="107" fill={colors.ink} fontSize="30" fontWeight="500">{en?'From information to impact.':'Dari informasi ke dampak.'}</text>
        <text x="42" y="139" fill={colors.muted} fontSize="16">{en?'A model of influence. Human judgment matters.':'Model pengaruh. Nalar manusia tetap menentukan.'}</text>
        {routes.map((points,index)=>{
          const phase=((frame+index*17)%100)/100;
          const [x,y]=pointOnRoute(points,phase);
          const opacity=interpolate(phase,[0,.12,.88,1],[0,1,1,0]);
          return <g key={index}>
            <path d={points.map((p,i)=>`${i?'L':'M'}${p[0]} ${p[1]}`).join(' ')} fill="none" stroke={colors.line} strokeWidth="1.5" />
            <rect x={x-3.5} y={y-3.5} width="7" height="7" fill={colors.gold} opacity={opacity} />
          </g>;
        })}
        {[218,336,454].map((y,i)=><g key={y}>
          <rect x="91" y={y-7} width="14" height="14" fill={colors.paper} stroke={colors.muted} strokeWidth="1.5" />
          <text x="48" y={y-29} fill={colors.ink} fontSize="18">{inputs[i]}</text>
          <text x="48" y={y+36} fill={colors.muted} fontSize="12">{`INPUT / 0${i+1}`}</text>
          <rect x="608" y={y-7} width="14" height="14" fill={colors.gold} />
          <text x="520" y={y-29} fill={colors.ink} fontSize="18">{outputs[i]}</text>
          <text x="520" y={y+36} fill={colors.muted} fontSize="12">{`IMPACT / 0${i+1}`}</text>
        </g>)}
        <rect x="277" y="267" width="166" height="140" fill="#0d3b42" stroke={colors.gold} strokeWidth="1.3" />
        <path d="M267 283v-26h27M426 257h27v26M267 391v26h27M426 417h27v-26" fill="none" stroke={colors.line} />
        <text x="360" y="296" textAnchor="middle" fill={colors.ink} fontSize="18" fontWeight="500">{en?'ASSESSMENT':'PENILAIAN'}</text>
        {Array.from({length:12},(_,i)=><rect key={i} x={309+(i%4)*26} y={317+Math.floor(i/4)*18} width="18" height="10" fill={i===activeCell?colors.gold:'#39616a'} opacity={i===activeCell?1:.55} />)}
        <text x="360" y="390" textAnchor="middle" fill={colors.muted} fontSize="12">{en?'BIAS / CONTEXT / ETHICS':'BIAS / KONTEKS / ETIKA'}</text>
        <path d="M43 538H677" stroke={colors.line} />
        <text x="43" y="572" fill={colors.muted} fontSize="13" letterSpacing="1.2">{en?'CONCEPTUAL MODEL':'MODEL KONSEPTUAL'}</text>
        <text x="677" y="572" fill={colors.gold} fontSize="13" textAnchor="end">INSTITUT CAKRA NALA</text>
      </g>
    </svg>
  </AbsoluteFill>;
}
