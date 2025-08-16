import "./App.css";
import { useState } from "react";

function App() {
     let initialHealth = 100;
     let initialGameState = "ongoing";

     const [playerHealth, setPlayerHealth] = useState(initialHealth);
     const [enemyHealth, setEnemyHealth] = useState(initialHealth);
     const [gameState, setGameState] = useState(initialGameState);

     function generateHealth(health) {
          let emoji = "";
          // set emoji based on health
          if (health === 100) {
               emoji = "❤️";
          } else if (health < 100 && health > 0) {
               emoji = "❤️‍🩹";
          } else {
               emoji = "💀";
          }
          // return health data and emoji
          return `${health} ${emoji}`;
     }

     function fire() {
          // randomize damage done
          let playerFire = Math.floor(Math.random() * 20) + 1;
          let enemyFire = Math.floor(Math.random() * 20) + 1;
          // calculate new health for player and enemy
          const currentPlayerHealth = Math.max(playerHealth - enemyFire, 0);
          const currentEnemyHealth = Math.max(enemyHealth - playerFire, 0);
          // set player and enemy to new health value
          setPlayerHealth(currentPlayerHealth);
          setEnemyHealth(currentEnemyHealth);
          // set game state based on health values
          let newState;
          if (currentEnemyHealth === 0 && currentPlayerHealth === 0) {
               newState = "tie";
          } else if (currentPlayerHealth === 0 && currentEnemyHealth > 0) {
               newState = "lose";
          } else if (currentEnemyHealth === 0 && currentPlayerHealth > 0) {
               newState = "win";
          } else {
               newState = "ongoing";
          }

          return setGameState(newState);
     }

     function generateMessages({ gameState }) {
          // generate message based on current game state
          let currentMessage = "";
          if (gameState === "ongoing") {
               currentMessage = "Engage the enemy! Fire!! ☄️🔥";
          }
          if (gameState === "tie") {
               currentMessage = "It's a tie! Both spacecrafts have been neutralized! 🤝";
          }
          if (gameState === "win") {
               currentMessage = "Congratulations! You successfully defended your spacecraft!!! 🚀";
          }
          if (gameState === "lose") {
               currentMessage = "Mission failed. 😞 You're spacecraft was destroyed...";
          }
          return <div>{currentMessage}</div>;
     }

     function restartGame() {
          setGameState(initialGameState);
          setPlayerHealth(initialHealth);
          setEnemyHealth(initialHealth);
     }

     return (
          <main>
               <h1>Space Battle Simulator</h1>
               <div className="game">
                    <div className="player">Player Health: {generateHealth(playerHealth)}</div>
                    {gameState === "ongoing" ? (
                         <button className="fire-button" onClick={fire}>
                              Fire!
                         </button>
                    ) : (
                         <button className="restart-button" onClick={restartGame}>
                              Restart?
                         </button>
                    )}
                    <div className="enemy">Enemy Health: {generateHealth(enemyHealth)}</div>
               </div>
               <div className="game-message">{generateMessages({ gameState })}</div>
          </main>
     );
}

export default App;
