// Character Selection
alert("Choose your character:\nKnight\nArcher\nMage");
let characterChoice = prompt("Enter your character name (Knight, Archer, or Mage):").toLowerCase();

// Set initial parameters based on character
let playerName;
let playerHealth;
let playerDamage;
let playerHealingPower;
let playerArmor;
let manaCost = 50;
let maxMana = 50;
let specialAbility;

if (characterChoice === "knight") {
    playerName = "Knight";
    playerHealth = 120;  // More health
    playerDamage = 15;   // Less damage
    playerArmor = 10;    // More armor
    playerHealingPower = 10;  // Lower healing power
    specialAbility = "Shield Bash";  // Special ability for Knight
    alert("You have chosen the Knight! You have more health and armor, but your attacks are weaker.");

} else if (characterChoice === "archer") {
    playerName = "Archer";
    playerHealth = 90;   // Normal health
    playerDamage = 20;   // Normal damage
    playerArmor = 5;     // Lower armor
    playerHealingPower = 15;  // Normal healing power
    specialAbility = "Flaming Arrow";  // Special ability for Archer
    alert("You have chosen the Archer! You deal normal damage, but have a chance for a Flaming Arrow.");

} else if (characterChoice === "mage") {
    playerName = "Mage";
    playerHealth = 80;   // Less health
    playerDamage = 25;   // More damage
    playerArmor = 3;     // Very low armor
    playerHealingPower = 20;  // Higher healing power
    specialAbility = "Fireball";  // Special ability for Mage
    maxMana = 80;   // Higher max mana
    manaCost = 60;  // Higher starting mana
    alert("You have chosen the Mage! You deal high damage and have a chance for a Critical Magic Hit.");

} else {
    alert("Invalid choice, starting game as Knight by default.");
    playerName = "Knight";
    playerHealth = 120;
    playerDamage = 15;
    playerArmor = 10;
    playerHealingPower = 10;
    specialAbility = "Shield Bash";
    alert("You have chosen the Knight! You have more health and armor, but your attacks are weaker.");
}

// Dragon parameters
const dragonName = "Dragon";
let dragonHealth = 150;
const dragonDamage = 25;

let gameOver = false;
let round = 1;

alert("=================================");
alert(`
    Welcome to the game! 
    You are ${playerName}. 
    Your goal is to defeat ${dragonName}.
`);
alert("=================================");

while (!gameOver) {
    alert(`----- Round ${round} -----`);

    // Player choice prompt
    const playerChoice = prompt(
        `========== Menu ==========
        Your Stats: 
        Health: ${playerHealth} HP
        Mana: ${manaCost} MP
        
        Dragon's Stats: 
        Health: ${dragonHealth} HP
        
        1 - Attack⚔️
        2 - Heal❤️
        3 - Defend🛡️
        4 - Escape🏃
        5 - Use✋ - ${specialAbility}
        `
    );

    // Attack
    if (playerChoice === "1") {
        let playerHit = Math.floor(Math.random() * playerDamage) + 1;

        // Flaming Arrow chance for Archer
        if (playerName === "Archer") {
            const fireArrowChance = Math.floor(Math.random() * 101);
            if (fireArrowChance <= 20) {
                playerHit += 10;
                alert("Flaming Arrow! You deal extra damage.");
            }
        }

        // Critical hit for Mage
        if (playerName === "Mage") {
            const critChance = Math.floor(Math.random() * 101);
            if (critChance <= 20) {
                playerHit *= 2;
                alert("Critical Magic Hit!");
            }
        }
        // Critical hit for Knight
        if (playerName === "Knight") {
            const critChance = Math.floor(Math.random() * 101);
            if (critChance <= 20) {
                playerHit += 8;
                alert("Critical Attack Hit!");
            }
        }

        dragonHealth -= playerHit;
        alert(`${playerName} deals ${playerHit} damage. ${dragonName} has ${dragonHealth} HP left.`);

        if (dragonHealth <= 0) {
            alert(`${dragonName} is defeated! You win!`);
            gameOver = true;
        } else {
            let dragonHit = Math.floor(Math.random() * dragonDamage) + 1;
            playerHealth -= dragonHit;
            alert(`${dragonName} deals ${dragonHit} damage. ${playerName} has ${playerHealth} HP left.`);

            if (playerHealth <= 0) {
                alert(`${playerName} is defeated! You lose.`);
                gameOver = true;
            }
        }
    }

    // Heal
    else if (playerChoice === "2") {
        const heal = Math.floor(Math.random() * playerHealingPower) + 10;
        playerHealth += heal;
        if (playerHealth > 100) playerHealth = 100;
        alert(`${playerName} heals for ${heal} HP. Now you have ${playerHealth} HP.`);

        if (!gameOver) {
            let dragonHit = Math.floor(Math.random() * dragonDamage) + 1;
            playerHealth -= dragonHit;
            alert(`${dragonName} deals ${dragonHit} damage. ${playerName} has ${playerHealth} HP left.`);

            if (playerHealth <= 0) {
                alert(`${playerName} is defeated! You lose.`);
                gameOver = true;
            }
        }
    }

    // Defend
    else if (playerChoice === "3") {
        alert(`${playerName} chooses to defend.`);
        let dragonHit = Math.floor(Math.random() * dragonDamage) + 1;
        let reducedDamage = dragonHit - playerArmor;

        // Armor weakens by 1 point 
        playerArmor--;
        if (playerArmor < 0) playerArmor = 0;

        if (reducedDamage < 0) reducedDamage = 0;
        playerHealth -= reducedDamage;
        alert(`${dragonName} deals ${dragonHit} damage, but with defense you take only ${reducedDamage} damage. You have ${playerHealth} HP left.`);

        if (playerHealth <= 0) {
            alert(`${playerName} is defeated! You lose.`);
            gameOver = true;
        }
    }

    // Escape
    else if (playerChoice === "4") {
        const escapeChance = Math.round(Math.random() * 99);
        if (escapeChance < 50) {
            alert(`${playerName} tried to escape, but ${dragonName} caught up with you!`);
            let dragonHit = Math.floor(Math.random() * dragonDamage) + 1;
            playerHealth -= dragonHit;
            alert(`${dragonName} deals ${dragonHit} damage. You have ${playerHealth} HP left.`);

            if (playerHealth <= 0) {
                alert(`${playerName} is defeated! You lose.`);
                gameOver = true;
            }
        } else {
            alert(`${playerName} successfully escaped! The game is over.`);
            gameOver = true;
        }
    }

    // Special Attack
    else if (playerChoice === "5") {
        let requiredMana = playerName === "Mage" ? 40 : 20;

        if (manaCost >= requiredMana) {
            let specialHit = Math.floor(Math.random() * (playerDamage + 10)) + 1;
            manaCost -= requiredMana;

            // Special ability for Knight
            if (playerName === "Knight") {
                specialHit += 10;
                alert("You use Shield Bash and deal extra damage.");
            // Special ability for Archer
            } else if (playerName === "Archer") {
                specialHit += 15;
                alert("You use Flaming Arrow and deal massive damage.");
            // Special ability for Mage
            } else if (playerName === "Mage") {
                specialHit *= 2;
                alert("You use Fireball and double the damage!");
            }

            dragonHealth -= specialHit;
            alert(`${playerName} uses ${specialAbility} and deals ${specialHit} damage! ${dragonName} has ${dragonHealth} HP left.`);

            if (dragonHealth <= 0) {
                alert(`${dragonName} is defeated! You win!`);
                gameOver = true;
            } else {
                let dragonHit = Math.floor(Math.random() * dragonDamage) + 1;
                playerHealth -= dragonHit;
                alert(`${dragonName} deals ${dragonHit} damage. ${playerName} has ${playerHealth} HP left.`);

                if (playerHealth <= 0) {
                    alert(`${playerName} is defeated! You lose.`);
                    gameOver = true;
                }
            }
        } else {
            alert("Not enough Mana to perform a special attack.");
        }
    }

    // Invalid choice
    else {
        alert("Invalid choice. Please try again.");
    }

    // Dragon regenerates health
    if (!gameOver) {
        const dragonRegen = Math.floor(Math.random() * 10) + 1;
        dragonHealth += dragonRegen;
        if (dragonHealth > 150) dragonHealth = 150;
        alert(`${dragonName} regenerates ${dragonRegen} HP. Now it has ${dragonHealth} HP.`);

        // Dragon attack becomes stronger after every 5 rounds
        if (round % 5 === 0) {
            dragonDamage += 5;
            alert(`${dragonName} becomes stronger! Its damage increases to ${dragonDamage}.`);
        }

        // Mana regeneration
        const manaRegen = 10;
        manaCost += manaRegen;
        if (manaCost > maxMana) manaCost = maxMana;
        alert(`${playerName} regenerates ${manaRegen} Mana. Now you have ${manaCost} Mana.`);

        round++;
    }
}

alert("Game over.");
