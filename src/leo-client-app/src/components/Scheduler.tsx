"use client";

import React, { useEffect, useState } from "react";
import styles from '../pages/globals.css';

const Scheduler: React.FC = () => {

  // TODO: Dynamicall get satelliteId from somewhere
  const satelliteId = "655acd63d122507055d3d2ea";
  const [validCommands, setValidCommands] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState<string[]>([]);

  const fetchValidCommands = (satelliteId: string) => {
    fetch(`http://localhost:3001/satellite/getSatellite?satelliteId=${satelliteId}`)
      .then((response) => response.json())
      .then(data => {
        setValidCommands(data.satellite.validCommands);
      })
      .catch((error) => {
        console.error("Error fetching valid commands:", error);
      }); 
  };

  const addCommand = (command : string) => {
    setCurrentSchedule(prevCommands => [...prevCommands, command]);
  };

  const removeCommand = (index: number) => {
    setCurrentSchedule(currentSchedule => currentSchedule.filter((_, i) => i !== index));
  };

  // Function will load schedule somewhere, currently console log for POC demo
  const sendSchedule = () => {
    console.log(currentSchedule)
  }

  useEffect(() => {
    fetchValidCommands(satelliteId);
  }, [satelliteId]);

    return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      <div style={{
        minWidth: '200px',
        border: '2px solid white',
        borderRadius: '16px',
        padding: '10px'
      }}>
        <h2>Valid Commands</h2>
        <div>
          {validCommands && validCommands.length > 0 && validCommands.map((command, index) => (
            <button 
              key={index} 
              className="scheduleButton" 
              onClick={() => addCommand(command)}
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '50px' }}></div>

      <div style={{
        border: '2px solid white',
        borderRadius: '16px',
        padding: '10px',
        overflow: 'auto' 
      }}>
        <h2>Current Schedule</h2>
        {currentSchedule && currentSchedule.length > 0 && currentSchedule.map((command, index) => (
           <button 
            key={index} 
            className="removeButton scheduleButton" 
            onClick={() => removeCommand(index)}
          >
            <span className="buttonText">{command}</span>
            <span className="closeButton">X</span>
          </button>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => setCurrentSchedule([])}
            style={{ display: 'block', margin: '5px 0' }}>
            Clear Schedule
          </button>
          <button onClick={() => sendSchedule()}
            style={{ display: 'block', margin: '5px 0' }}>
            Send Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
