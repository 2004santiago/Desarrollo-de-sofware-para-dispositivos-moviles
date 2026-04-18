import { createContext, useState, useContext } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const MissionContext = createContext(null);

const INITIAL_MISSIONS = [
  { id: 1, title: 'Tomar una foto', description: 'Toma una foto con tu dispositivo', points: 40, completed: false },
  { id: 2, title: 'Moverse 50 metros', description: 'Desplázate al menos 50m', points: 50, completed: false },
  { id: 3, title: 'Permanecer quieto 10 segundos', description: 'Esta inmóvil durante 10 segundos', points: 30, completed: false },
];

export const MissionProvider = ({ children }) => {
  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [points, setPoints] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const loadProgress = async (uid) => {
    try {
      const ref = doc(db, 'progress', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setPoints(data.points || 0);
        setTotalDistance(data.totalDistance || 0);
        if (data.missions) {
          setMissions(prev =>
            prev.map(m => {
              const saved = data.missions.find(s => s.id === m.id);
              return saved ? { ...m, completed: saved.completed } : m;
            })
          );
        }
      }
    } catch (e) {
      console.error('Error cargando progreso:', e);
    }
  };
  const saveProgress = async (uid, updatedMissions, updatedPoints, updatedDistance) => {
    try {
      const ref = doc(db, 'progress', uid);
      await setDoc(ref, {
        points: updatedPoints,
        totalDistance: updatedDistance,
        missions: updatedMissions.map(m => ({ id: m.id, completed: m.completed })),
      });
      localStorage.setItem('progress', JSON.stringify({
        points: updatedPoints,
        totalDistance: updatedDistance,
        missions: updatedMissions.map(m => ({ id: m.id, completed: m.completed })),
      }));
    } catch (e) {
      console.error('Error guardando progreso:', e);
    }
  };
  const completeMission = (uid, missionId, notify, extraDistance = 0) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;
    const updatedMissions = missions.map(m =>
      m.id === missionId ? { ...m, completed: true } : m
    );
    const updatedPoints = points + mission.points;
    const updatedDistance = totalDistance + extraDistance;
    setMissions(updatedMissions);
    setPoints(updatedPoints);
    setTotalDistance(updatedDistance);
    saveProgress(uid, updatedMissions, updatedPoints, updatedDistance);
    const remaining = updatedMissions.filter(m => !m.completed).length;
    if (remaining === 0) {
      notify?.({ id: 10, title: '¡Felicitaciones!', body: 'Has completado todas las misiones' });
    } else if (remaining === 1) {
      notify?.({ id: 11, title: 'Casi terminas', body: 'Te falta 1 misión para completar' });
    } else {
      notify?.({ id: missionId, title: 'Misión completada', body: `Has completado: ${mission.title}` });
    }
  };
  const addDistance = (uid, extra) => {
    const updatedDistance = totalDistance + extra;
    setTotalDistance(updatedDistance);
    const saved = JSON.parse(localStorage.getItem('progress') || '{}');
    localStorage.setItem('progress', JSON.stringify({ ...saved, totalDistance: updatedDistance }));
  };
  const resetMissions = () => {
    setMissions(INITIAL_MISSIONS);
    setPoints(0);
    setTotalDistance(0);
  };
  return (
    <MissionContext.Provider value={{ missions, points, totalDistance, loadProgress, completeMission, addDistance, resetMissions }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => useContext(MissionContext);