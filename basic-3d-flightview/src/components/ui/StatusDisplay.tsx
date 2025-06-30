import React, { useState, useEffect, useRef } from 'react';
import { useGameServer, useRoomState } from '@agent8/gameserver';
import { useLocalPlayerStore } from '../../stores/localPlayerStore';

const StatusDisplay: React.FC = () => {
  const { server, connected } = useGameServer();
  const { roomId } = useRoomState();
  const [speedKmh, setSpeedKmh] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [hp, setHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [players, setPlayers] = useState(0);
  const animationId = useRef<number | null>(null);
  const { state } = useLocalPlayerStore();

  useEffect(() => {
    const updateStatus = () => {
      setSpeedKmh(parseFloat((state.speed * 3.6).toFixed(1)));
      setAltitude(parseFloat(state.position.y.toFixed(1)));

      animationId.current = requestAnimationFrame(updateStatus);
    };

    animationId.current = requestAnimationFrame(updateStatus);

    return () => {
      cancelAnimationFrame(animationId.current);
    };
  }, [state]);

  useEffect(() => {
    if (!server || !connected || !roomId) return;

    const unsubscribe = server.subscribeRoomState(roomId, (roomState) => {
      setPlayers(roomState.$users.length);
    });

    return () => {
      unsubscribe();
    };
  }, [server, connected, roomId]);

  useEffect(() => {
    if (!server || !connected || !roomId) return;

    const unsubscribe = server.subscribeRoomMyState(roomId, (roomMyState) => {
      if (roomMyState.stats) {
        setHp(roomMyState.stats.currentHp);
        setMaxHp(roomMyState.stats.maxHp);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [server, connected, roomId]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        left: '10px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        zIndex: 1, // Ensure UI is on top of the canvas
      }}
    >
      <div>Players: {players}</div>
      <div>Health: {hp ? ((hp / maxHp) * 100).toFixed(0) : 0}%</div>
      <div>Speed: {speedKmh.toFixed(1)} km/h</div>
      <div>Altitude: {altitude.toFixed(1)} m</div>
      <hr style={{ margin: '5px 0' }} />
      <div>Controls:</div>
      <div>W/S: Speed</div>
      <div>A/D: Yaw</div>
      <div>Arrows: Pitch/Roll</div>
      <hr style={{ margin: '5px 0' }} />
      <div>R: Reset</div>
    </div>
  );
};

export default StatusDisplay;
