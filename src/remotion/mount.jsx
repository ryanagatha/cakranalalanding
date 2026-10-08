import React, {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {AlgorithmScene} from './AlgorithmScene.jsx';

function AlgorithmPlayer({host}) {
  const player=useRef(null);
  const [playerReady,setPlayerReady]=useState(false);
  const connectPlayer=useCallback(value=>{player.current=value;setPlayerReady(Boolean(value));},[]);
  const [language,setLanguage]=useState(document.documentElement.lang);
  const [compact,setCompact]=useState(host.clientWidth<500);
  const [inView,setInView]=useState(false);
  const [hidden,setHidden]=useState(document.hidden);
  const [globalPaused,setGlobalPaused]=useState(document.body.classList.contains('motion-paused'));
  const [localPaused,setLocalPaused]=useState(false);
  const paused=localPaused||globalPaused;
  const props=useMemo(()=>({language,compact}),[language,compact]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>setInView(entries[0].isIntersecting),{threshold:.12});
    observer.observe(host);
    const resizeObserver=new ResizeObserver(entries=>setCompact(entries[0].contentRect.width<500));
    resizeObserver.observe(host);
    const languageObserver=new MutationObserver(()=>setLanguage(document.documentElement.lang));
    languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    const onMotion=()=>setGlobalPaused(document.body.classList.contains('motion-paused'));
    const onVisibility=()=>setHidden(document.hidden);
    window.addEventListener('site-motion-change',onMotion);
    document.addEventListener('visibilitychange',onVisibility);
    return ()=>{resizeObserver.disconnect();observer.disconnect();languageObserver.disconnect();window.removeEventListener('site-motion-change',onMotion);document.removeEventListener('visibilitychange',onVisibility);};
  },[host]);
  useEffect(()=>{
    if (!player.current) return;
    if (inView&&!hidden&&!paused) player.current.play();
    else player.current.pause();
    host.dataset.playing=String(inView&&!hidden&&!paused);
  },[inView,hidden,paused,host,playerReady]);
  function toggle() {
    if(globalPaused){document.querySelector('.motion-toggle').click();setLocalPaused(false);}
    else setLocalPaused(value=>!value);
  }
  const en=language==='en';
  return <div className="algorithm-player">
    <div className="algorithm-player-header"><span><i aria-hidden="true" />{en?'ALGORITHM & SOCIETY':'ALGORITMA & MASYARAKAT'}</span><span>CN—01</span></div>
    <div className="algorithm-player-stage" style={{aspectRatio:compact?'480 / 600':'720 / 620'}} aria-hidden="true">
      <Player ref={connectPlayer} component={AlgorithmScene} inputProps={props} durationInFrames={300} compositionWidth={compact?480:720} compositionHeight={compact?600:620} fps={30} loop controls={false} clickToPlay={false} numberOfSharedAudioTags={0} style={{width:'100%'}} />
    </div>
    <p className="sr-only">{en?'Animated conceptual diagram: information, recommendations and priorities pass through assessment of bias, context and ethics, influencing access, choices and trust.':'Diagram konseptual animasi: informasi, rekomendasi, dan prioritas melewati penilaian bias, konteks, dan etika, lalu memengaruhi akses, pilihan, dan kepercayaan.'}</p>
    <div className="algorithm-player-footer"><span>{en?'A conceptual view of algorithmic influence.':'Cara membaca pengaruh algoritma.'}</span><button className="algorithm-player-toggle" type="button" onClick={toggle} aria-pressed={paused} aria-label={en?(paused?'Play diagram':'Pause diagram'):(paused?'Putar diagram':'Jeda diagram')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d={paused?'M7 4l8 6-8 6Z':'M7 5v10M13 5v10'} /></svg><span>{en?(paused?'Play':'Pause'):(paused?'Putar':'Jeda')}</span></button></div>
  </div>;
}
const host=document.querySelector('#algorithm-motion');
if(host) createRoot(host).render(<AlgorithmPlayer host={host} />);
