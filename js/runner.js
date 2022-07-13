class Runner {
    constructor(combatants) { //passed an array of Combatants in coliseum order
        this.turn = 0;
        this.combatants = combatants.filter(c => {
            return new Combatant(c.name, c.quickness, c.ambushes);
        });
        this.turncost = this.combatants[this.combatants.length - 1].quickness;
        this.turns = [];
    }

    get_next_combatant() {
        let max = this.combatants[0];
        for (let i = 0; i < this.combatants.length; i++) {
            let combatant = this.combatants[i];
            if (combatant.ambushes > 0) return combatant;
            else if (combatant.initiative > max.initiative) {
                max = combatant;
                console.log(max.out);
            }
        }
        return max;
    }

    refresh() {
        this.combatants.forEach(c => c.refresh());
    }

    reset() {
        this.combatants.forEach( c => c.reset());
    }

    run(num_turns) {
        //this.reset();
        this.refresh();
        while (this.turn < num_turns) {
            if (this.do_turn()) {
                this.turn++;
            }
            else this.refresh();
        }
    }

    do_turn() {
        let combatant = this.get_next_combatant();
        if (combatant.do_action(this.turncost)) {
            //console.log(combatant.out);
            this.turns.push(combatant);
            return true;
        }
        return false;
    }

    get_result() {
        return (this.turns.map(c => c.name));
    }
}