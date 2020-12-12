const App = new Vue ({
    el: "#app",
    data: {
        dragons: [],
        monsters: [],
        newDragon: {
            name: null,
            quickness: 0,
            numAmbush: 0,
        },
        newMonster: {
            name: null,
            quickness: 0,
        },
        turnsCalculated: false,
        numRounds: null,
        turns: [],
    },
    methods: {
        addDragon() {
            this.dragons.push({
                name: this.newDragon.name,
                quickness: parseInt(this.newDragon.quickness),
                ambush: parseInt(this.newDragon.numAmbush),
                initiative: 0,
            });
            this.newDragon.name = null;
            this.newDragon.quickness = null;
            this.newDragon.numAmbush = 0;
        },
        deleteDragon(dragon) {
            let index = this.dragons.findIndex(s => s === dragon);
            this.dragons.splice(index, 1);
        },
        addMonster() {
            this.monsters.push({
                name: this.newMonster.name,
                quickness: parseInt(this.newMonster.quickness),
                initiative: 0,
            });
            this.newMonster.name = null;
            this.newMonster.quickness = null;
        },
        deleteMonster(monster) {
            let index = this.monsters.findIndex(s => s === monster);
            this.monsters.splice(index, 1);
        },
        calculateTurns() {
            this.turns = [];

            for (let dragon of this.dragons) {
                if (dragon.ambush > 0) this.turns.push(dragon.name);
                if (dragon.ambush > 1) this.turns.push(dragon.name);
            }

            if (this.monsters.length === 0) return;

            let turncost = this.monsters[this.monsters.length - 1].quickness;
            console.log("Turn cost: " + turncost);

            let combatants = [];
            this.dragons.forEach(d => {
                d.initiative = 0;
                combatants.push(d);
            });
            this.monsters.forEach(m => {
                m.initiative = 0;
                combatants.push(m);
            });

            for (let i = 0; i < this.numRounds; i++) {
                combatants.forEach(c => c.initiative += c.quickness);

                let maxBreath = turncost;
                while (maxBreath >= turncost) {
                    combatants.sort((a,b) => b.initiative - a.initiative);
                    let c = combatants[0];
                    maxBreath = c.initiative;
                    console.log(c.name);
                    if (c.initiative >= turncost) {
                        this.turns.push(c.name);
                        c.initiative -= turncost;
                        console.log(c.initiative);
                    }
                }
            }

            this.turnsCalculated = true;
        }
    }
});