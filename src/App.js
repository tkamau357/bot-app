import React, { useState, useEffect } from 'react';

function App() {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [army, setArmy] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/bots')
      .then(response => response.json())
      .then(data => setRobots(data))
      .catch(error => console.error(error));
  }, []);

  const enlistRobot = (robot) => {
    setArmy([...army, robot]);
  };

  const dischargeRobot = (robot) => {
    setArmy(army.filter(r => r.id !== robot.id));
    fetch(`http://localhost:8002/bots/${robot.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleRobotClick = (robot) => {
    setSelectedRobot(robot);
  };

  return (
    <div className="App">
      {selectedRobot && (
        <div className="robot-details">
          <img src={selectedRobot.image} alt={selectedRobot.name} />
          <h2>{selectedRobot.name}</h2>
          <button onClick={() => enlistRobot(selectedRobot)}>Enlist</button>
        </div>
      )}

      <div className="army-list">
        <h2>Your Army</h2>
        {army.map(robot => (
          <div key={robot.id}>
            <img src={robot.image} alt={robot.name} />
            <h3>{robot.name}</h3>
            <h2>{robot.health}</h2>
            <h2>{robot.damage}</h2>
            <h2>{robot.armor}</h2>
            <button onClick={() => dischargeRobot(robot)}>x</button>
          </div>
        ))}
      </div>
      <h1>Robot Army</h1>
      <div className="robot-list">
        {robots.map(robot => (
          <div key={robot.id} onClick={() => handleRobotClick(robot)}>
            <img src={robot.image} alt={robot.name} />
            <h2>{robot.name}</h2>
            <h2>Health:{robot.health}</h2>
            <h2>Damage:{robot.damage}</h2>
            <h2>Armor:{robot.armor}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
