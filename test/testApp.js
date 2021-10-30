async function getAllData() {
    let data = [];
    for(let i in VENUES) {
        let d = {venue: null, encounters: null, monsters: null};
        d.venue = VENUES[i];
        await App.loadEncounters(VENUES[i]);
        d.encounters = App.encounters;
        d.monsters = App.loadedMonsters.map((m) => m.name);
        data.push(d);
    }
    return data;
}

describe("App Test Suite", function() {

    describe("Tests for validity of each monster", function() {
        let data;
        beforeAll(async function() {
            data = await getAllData();
        });

        it("data should have been retrieved", function() {
            expect(data).not.toBeNull();
        });
        for (let i in VENUES) {
            describe(VENUES[i], function() {
                it("encounters and monsters exist", function() {
                    expect(data[i].encounters).not.toBeNull();
                    expect(data[i].monsters).not.toBeNull();
                });
                it("all encounters are valid", function() {
                    for (let encounter of data[i].encounters) {
                        for (let monster of encounter) {
                            expect(data[i].monsters).toContain(monster);
                        }
                    }
                });
            });

        }
    });
});
