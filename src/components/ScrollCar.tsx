'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { buildRoad, poseOnLap, roadPose, type RoadLap } from '@/lib/road-path';
import { Car } from './Scenery';

export default function ScrollCar({ trackRef, layoutKey }: { trackRef: RefObject<HTMLDivElement | null>; layoutKey: string }) {
  const carRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    const car = carRef.current;
    if (!track || !car) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let road: RoadLap[] = [];
    let trackTop = 0;
    let pageHeight = 0;
    let frame = 0;
    let dirty = true;
    let active = true;

    const draw = () => {
      frame = 0;
      if (dirty) {
        const origin = track.getBoundingClientRect();
        trackTop = origin.top + window.scrollY;
        pageHeight = document.documentElement.scrollHeight;
        road = buildRoad(Array.from(track.querySelectorAll<HTMLElement>(':scope > .lap')).map((lap) => {
          const rect = lap.getBoundingClientRect();
          const style = getComputedStyle(lap);
          const side = lap.classList.contains('right') ? 'right' : 'left';
          return {
            left: rect.left - origin.left, top: rect.top - origin.top, width: rect.width, height: rect.height,
            roadWidth: parseFloat(style.borderTopWidth),
            radius: parseFloat(side === 'right' ? style.borderTopRightRadius : style.borderTopLeftRadius), side,
          };
        }));
        dirty = false;
      }
      const pose = motion.matches && road.length ? poseOnLap(road[0], 0) : roadPose(road, window.scrollY, trackTop, window.innerHeight, pageHeight);
      if (!pose) return;
      car.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) translate(-50%, -50%) rotate(${pose.angle}deg)`;
      car.dataset.ready = 'true';
    };
    const schedule = (measure = false) => {
      if (!active) return;
      dirty ||= measure;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const scroll = () => { if (!motion.matches) schedule(); };
    const resize = () => schedule(true);
    const observer = new ResizeObserver(resize);
    observer.observe(track);
    observer.observe(track.closest('.home') ?? track);
    track.querySelectorAll('.lap').forEach((lap) => observer.observe(lap));
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize);
    motion.addEventListener('change', resize);
    document.fonts.ready.then(resize);
    schedule(true);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', resize);
      motion.removeEventListener('change', resize);
    };
  }, [trackRef, layoutKey]);
  return <div ref={carRef} className="scroll-car" aria-hidden="true"><Car /></div>;
}
