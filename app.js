const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        health: 100,
        level: 1
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        health: 50,
        level: 1
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

let bossesDefeated = 0
let heroGold = 500

function attackBoss() {
    // add the hero damage together
    //subtract from boss health
    let slateDamage = heroes[0].damage
    let flintDamage = heroes[1].damage
    let slateHealth = heroes[0].health
    let flintHealth = heroes[1].health
    let totalDamage = 0

    // make sure health is > 0 if it is add their damage to total
    if (slateHealth != 0) {
        totalDamage += slateDamage
    }
    if (flintHealth != 0) {
        totalDamage += flintDamage
    }

    boss.health -= totalDamage
    if (boss.health < 0) {
        newBoss()
    }
    draw()
    console.log(boss.health)
}

function attackHero() {
    // loop over array
    // subtract boss damage from hero health
    //if health is zero then dont attack
    heroes.forEach((hero) => {
        hero.health -= boss.damage
        if (hero.health < 0) hero.health = 0
        //console.log(hero.health)
        draw()
    })
}

function healHero(heroName) {
    // access health for each hero
    // if they have enough gold
    // add health and minus gold
    let currentHero = heroes.find((hero) => heroName == hero.name)
    if (heroGold >= 50) {
        heroGold -= 50
        currentHero.health += 50
        draw()
    }
}

function newBoss() {
    heroGold += boss.maxHealth
    bossesDefeated++
    boss.level++
    boss.maxHealth += 50
    boss.health = boss.maxHealth
    console.log(boss.level, boss.maxHealth, boss.health)
}

function levelHero(heroName) {
    //find the right hero, add 1 their level -100 gold then draw
    debugger
    let currentHero = heroes.find((hero) => hero.name == heroName)
    if (heroGold >= 100) {
        currentHero.level++
        heroGold -= 100
        let flintLvl = document.getElementById("Flint Lvl")
        if (currentHero.name == 'Flint Ironstag') {
            flintLvl.innerText = `Level: ${currentHero.level}`
        }

        let slateLvl = document.getElementById("Slate Lvl")
        if (currentHero.name == 'Slate Slabrock') {
            slateLvl.innerText = `Level: ${currentHero.level}`
        }
        draw()
    }
}

function draw() {
    //acses the health of boss and then change it on the page
    // loop through the heros
    // get their health change it on the page
    let slateHealth = heroes[0].health
    let flintHealth = heroes[1].health

    let bossElem = document.getElementById('Boss')
    bossElem.innerText = `Health: ${boss.health.toString()}   Lvl: ${boss.level} Dragon's slain: ${bossesDefeated}`

    let goldElem = document.getElementById("Gold")
    goldElem.innerText = `Gold: ${heroGold}`

    let slateElem = document.getElementById("Slate")
    slateElem.innerText = `Health: ${slateHealth}`

    let flintElem = document.getElementById("Flint")
    flintElem.innerText = `Health: ${flintHealth}`
}

draw()

setInterval(attackHero, 500)