class Combatant {
    constructor(name, quickness, ambushes) {
        this.name = name;
        this.quickness = quickness;
        this.ambushes = ambushes;
        this.initiative = 0;
        console.log(this);
    }

    do_action(turncost) {
        if (this.ambushes > 0) {
            this.ambushes--;
            return true;
        }
        else if (this.initiative >= turncost) {
            this.initiative -= turncost;
            return true
        }
        else {
            return false;
        }
    }

    refresh() {
        this.initiative += this.quickness;
    }

    reset() {
        this.initiative = 0;
    }

    get out() {
        return this.name + ": " + this.ambushes + "/" + this.initiative;
    }
}