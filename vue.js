const VENUES = ["Training Fields", "Woodland Path", "Scorched Forest", "Sandswept Delta", "Blooming Grove", "Forgotten Cave"];
const FILEPATHS = ["trainingfields.csv", "woodlandpath.csv", "scorchedforest.csv", "delta.csv", "grove.csv", "forgottencave.csv"];

async function readFile(filePath) {
    let response = await fetch(filePath);
    if (response.ok) {
        return response.text();
    }
}

const App = new Vue ({
    el: "#app",
    data: {
        addType: "encounter",
        venues: VENUES,
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

        loadedMonsters: [],
    },
    methods: {
        async addDragon() {
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
        async deleteDragon(dragon) {
            let index = this.dragons.findIndex(d => d === dragon);
            this.dragons.splice(index, 1);
        },
        async addCustomMonster() {
            this.monsters.push({
                name: this.newMonster.name,
                quickness: parseInt(this.newMonster.quickness),
                initiative: 0,
            });
            this.newMonster.name = null;
            this.newMonster.quickness = null;
        },
        async addMonster(name, quickness) {
            this.monsters.push({
                name: name,
                quickness: parseInt(quickness),
                initiative: 0,
            });
        },
        async deleteMonster(monster) {
            let index = this.monsters.findIndex(m => m === monster);
            this.monsters.splice(index, 1);
        },
        async calculateTurns() {
            this.turns = [];

            for (let dragon of this.dragons) {
                if (dragon.ambush > 0) this.turns.push(dragon.name);
                if (dragon.ambush > 1) this.turns.push(dragon.name);
            }

            if (this.monsters.length === 0) return;

            let turncost = this.monsters[this.monsters.length - 1].quickness;

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
                    let c = combatants[0];
                    combatants.forEach(combatant => {
                        if (combatant.initiative > c.initiative) c = combatant;
                    });
                    maxBreath = c.initiative;
                    if (c.initiative >= turncost) {
                        this.turns.push(c.name);
                        c.initiative -= turncost;
                    }
                }
            }

            this.turnsCalculated = true;
        },
        async loadMonsters(venue) {
            let index = VENUES.findIndex(v => v === venue);
            let csv = await readFile("monsterdata/" + FILEPATHS[index]);
            this.loadedMonsters = await Papa.parse(csv, {header: true}).data;
        }
    }
});