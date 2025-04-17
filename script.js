document.addEventListener('DOMContentLoaded', () => {
    const heroes = [
        { name: 'Superman', power: 95, health: 100, special: 'Heat Vision' },
        { name: 'Batman', power: 85, health: 90, special: 'Smoke Bomb' },
        { name: 'Wonder Woman', power: 90, health: 95, special: 'Lasso of Truth' },
        { name: 'Flash', power: 88, health: 85, special: 'Speed Force' }
    ];

    let selectedHero = null;
    let opponent = null;
    
    const attackBtn = document.getElementById('attackBtn');
    const selectHeroBtn = document.getElementById('selectHeroBtn');

    // Disable attack button initially
    attackBtn.disabled = true;

    selectHeroBtn.addEventListener('click', () => {
        selectedHero = {...heroes[Math.floor(Math.random() * heroes.length)]};
        document.getElementById('heroStats').innerHTML = `
            <h3>${selectedHero.name}</h3>
            <p>Power: ${selectedHero.power}</p>
            <p>Health: ${selectedHero.health}</p>
            <p>Special: ${selectedHero.special}</p>
        `;
        attackBtn.disabled = false;
        addToBattleLog('🦸 Hero selected and ready for battle!');
    });

    attackBtn.addEventListener('click', () => {
        if (!selectedHero) return;

        if (!opponent || opponent.health <= 0) {
            opponent = {...heroes[Math.floor(Math.random() * heroes.length)]};
            while (opponent.name === selectedHero.name) {
                opponent = {...heroes[Math.floor(Math.random() * heroes.length)]};
            }
            addToBattleLog(`🆚 New challenger: ${opponent.name} appears!`);
        }

        const isSpecialAttack = Math.random() > 0.7;
        const damage = isSpecialAttack 
            ? Math.floor(Math.random() * selectedHero.power) 
            : Math.floor(Math.random() * selectedHero.power / 3);

        opponent.health -= damage;

        updateBattleZone();

        if (opponent.health > 0) {
            const counterDamage = Math.floor(Math.random() * opponent.power / 4);
            selectedHero.health -= counterDamage;
            addToBattleLog(`↪️ ${opponent.name} counter-attacks for ${counterDamage} damage!`);
            updateBattleZone();
        }

        if (selectedHero.health <= 0) {
            addToBattleLog(`💀 ${selectedHero.name} has been defeated!`);
            selectedHero = null;
            attackBtn.disabled = true;
        } else if (opponent.health <= 0) {
            addToBattleLog(`🏆 ${selectedHero.name} wins the battle!`);
            opponent = null;
        }
    });

    function updateBattleZone() {
        document.getElementById('battleZone').innerHTML = `
            <h3>⚔️ Battle Status</h3>
            ${selectedHero ? `<p>${selectedHero.name}'s Health: ${selectedHero.health}</p>` : ''}
            ${opponent ? `<p>${opponent.name}'s Health: ${opponent.health}</p>` : ''}
        `;
    }

    document.getElementById('clearLogBtn').addEventListener('click', () => {
        document.getElementById('battleLog').innerHTML = '';
    });

    function addToBattleLog(message) {
        const logEntry = document.createElement('div');
        logEntry.className = 'battle-log';
        logEntry.textContent = message;
        document.getElementById('battleLog').prepend(logEntry);
    }
});