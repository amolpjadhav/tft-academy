/**
 * Beginner-friendly one-liner for each Set 17: Space Gods trait.
 * Keyed by trait name exactly as it appears in traits.json.
 */
export const TRAIT_EXPLAINERS: Record<string, { beginner: string; tip: string }> = {
  // ── Origin traits ──────────────────────────────────────────────────────────
  Anima: {
    beginner: "After every loss, your Anima units gain 15 Tech + 5 more per loss-streak length. Anima takedowns give 2 Tech each. Hit 100 Tech to prototype Anima Weapons — grab them now or save up for something stronger.",
    tip: "Loss-streak hard to get 6 Anima online. The longer your streak, the more Tech you bank per fight. At 6 units you get a loot orb on wins too, giving you value from both outcomes.",
  },
  Arcana: {
    beginner: "Unique to Tahm Kench — every 3 rounds he gifts you a reward. Just keep him alive and he'll keep paying out.",
    tip: "Tahm Kench is already a strong frontline Brawler. Arcana is a free bonus on top — no extra cost, just don't let him die before the 3-round mark.",
  },
  Arbiter: {
    beginner: "Arbiters let you write your own divine law — pick a cause (something that happens in combat) and an effect (a bonus that triggers). At 2 units your law activates; at 3 it hits harder.",
    tip: "You only need 3 units for max power. Mix Arbiter into almost any comp as a flex 2-3 unit splash since you design the law to fit your win condition.",
  },
  "Dark Star": {
    beginner: "Dark Stars summon a black hole that executes enemies at 10% HP. At 4 they gain 30% AD & AP. At 6 the strongest Dark Star goes supermassive — double effectiveness and 2 extra black holes. At 9, all are supermassive, and at level 10 they consume EVERYONE.",
    tip: "6 Dark Star is the sweet spot — supermassive plus the AD/AP boost. The 9-unit payoff is a high-roll late-game fantasy but devastating if you hit it.",
  },
  Mecha: {
    beginner: "Innate: Mechas can transform into their Ultimate form mid-combat — their ability upgrades and they gain 60% Health. A transformed Mecha takes up 2 team slots but counts twice for the trait. At 6 Mecha, you get +1 max team size.",
    tip: "Transformed Mechas counting twice means 3 Mechas can reach 4-unit bonus thresholds. At 6 Mecha the +1 team size is huge — you effectively run an 8-unit board.",
  },
  Meeple: {
    beginner: "Meeps empower Astronaut abilities in wacky ways. They also gain bonus Health (up to +1000 at 10 units). At 7, a Cloning Slot lets you clone a champion — time equals their cost in rounds. At 10, SUMMON THE FOUR MEEPLORDS!",
    tip: "The Cloning Slot at 7 Meeple is a massive tempo tool — clone your 5-cost carry for a free copy over time. The Four Meeplords at 10 units is one of the most powerful board states in the game.",
  },
  "N.O.V.A.": {
    beginner: "6 seconds into combat, N.O.V.A. triggers a power surge for all allies. The surge effect depends on which N.O.V.A. champions you have: Caitlyn gives 20% AS, Aatrox shreds/sunders, Maokai heals, Kindred shields your tank, Akali gives Precision. At 5 units, you pick a Striker to activate during the surge.",
    tip: "Mix N.O.V.A. champions to stack multiple surge effects simultaneously. At 5 units the Striker selector lets you double up on your most needed surge effect — pick Caitlyn for attack speed or Aatrox for shred.",
  },
  Primordian: {
    beginner: "Dealing damage spawns Swarmlings based on star level — tiny creatures that fight for you. Primordians also convert 8% of all damage they take into bonus damage dealt. At 3 units, you gain a free 1 or 2-cost champion every round.",
    tip: "The free champion every round at 3 Primordians is huge econ. Higher star-level Primordians spawn more Swarmlings — prioritize 2-starring them for swarm volume.",
  },
  Psionic: {
    beginner: "Psionic units craft special Psionic items you can equip on any ally. At 4 units you get a second item, and both gain extra effects when equipped on Psionic champions.",
    tip: "Put Psionic items on your strongest Psionic champion to get the bonus effects. Viktor and Master Yi benefit most — they're already strong and the extra Psionic effects push them over the top.",
  },
  "Space Groove": {
    beginner: "Groovians can enter 'the Groove' gaining Attack Speed and Health Regen. At 3, all Groovians start combat in the Groove for free. At 5, every second in the Groove stacks 3% more AD and AP. At 7, all effects are 20% stronger.",
    tip: "The stacking AD/AP at 5 Space Groove snowballs hard in long fights. Position Groove champions to survive as long as possible — each second in the Groove compounds. Blitzcrank's Party Animal makes him naturally re-enter the Groove.",
  },
  Stargazer: {
    beginner: "Every game a different constellation is charted, revealing special hexes on your board that buff units inside them. The bonuses scale with Stargazer count — up to +40% AD/AP and more gold at 6 units. More hexes unlock as your player level increases.",
    tip: "Place your most important carries and tanks in the empowered hexes. The constellation changes each game so adapt your positioning every match. Higher Stargazer counts reveal more hexes at lower levels.",
  },
  Timebreaker: {
    beginner: "On loss, gain free rerolls to find better champions. On win, store XP in a Temporal Core for free leveling. At 3 units your whole team gets +15% Attack Speed. At 4 units, Timebreakers themselves gain an extra +50% Attack Speed.",
    tip: "Timebreaker rewards you for both winning and losing, making it perfect for flexible early-game strategies. The +50% AS at 4 units on top of the team 15% makes Timebreaker carries attack extremely fast.",
  },

  // ── Class traits ───────────────────────────────────────────────────────────
  Bastion: {
    beginner: "Your whole team gets 12 Armor & Magic Resist for free. Bastions themselves get 16/35/55 at each breakpoint, and all those values double in the first 10 seconds of combat. At 6, even non-Bastions gain an extra 20 Armor & MR.",
    tip: "The first-10s doubling is huge — enemies with burst damage or early casters will bounce off your board. At 6 Bastion, your entire team becomes tanky, so you can run squishy carries without fear.",
  },
  Brawler: {
    beginner: "Everyone on your team gets a free 7% Health bump. Brawlers themselves get much more — up to +65% max HP at 6 units. They become massive health sponges that soak damage for your carries.",
    tip: "Stack Brawler with HP-scaling items like Warmog's Armor — a +65% HP Brawler heals enormous amounts. At 4 Brawlers the 45% bonus already makes them hard to kill; 6 is a serious commitment but turns your frontline into a wall.",
  },
  Challenger: {
    beginner: "Your whole team gets 10% Attack Speed for free. Challengers themselves get up to 40% AS at 5 units. On top of that, every time a Challenger kills their target, they dash to a new enemy and get a 50% AS burst for 2.5 seconds.",
    tip: "Challengers chain kills — each takedown refreshes the 50% AS burst. They shred through teams with lots of units. At 5 Challengers the 40% base AS plus the kill burst makes them extremely fast.",
  },
  Channeler: {
    beginner: "Channelers innately gain 20% more Mana from all sources, so they cast faster. On top of that, the trait gives your whole team Mana Regen (up to 2%/s) and Channelers themselves get up to 7%/s — they barely stop casting.",
    tip: "Mana Regen stacks with Blue Buff and Tear items. At 4-5 Channelers, high-mana casters like Aurelion Sol and Viktor cast almost on cooldown. Pair with Channeler-friendly carries for maximum uptime.",
  },
  Fateweaver: {
    beginner: "Innate: all Fateweavers have Precision (abilities can crit). At 2 units, chance effects on abilities are Lucky. At 4, they gain +20% Crit Chance and +10% Crit Damage — and critical strikes themselves become Lucky too.",
    tip: "Lucky effects roll twice and take the better result. Stacking Lucky crits at 4 Fateweavers makes every crit hit even harder. Jeweled Gauntlet pairs perfectly here.",
  },
  Marauder: {
    beginner: "Your whole team gets 5% free Omnivamp (heal from damage). Marauders themselves get up to 10% Omnivamp and 40% bonus AD. Best of all, any overheal converts into a shield — capped at 25% max HP — making them self-sustaining tanks.",
    tip: "At 6 Marauders the 40% AD bonus is enormous for physical carries like Fiora and Master Yi. The overheal shield makes them nearly immortal in sustained fights.",
  },
  Replicator: {
    beginner: "Replicators fire their ability a second time automatically — for free. At 2 units the echo deals 25% strength; at 4 units it deals 50%. Every cast is effectively 1.25x or 1.5x value.",
    tip: "AoE casters like Nami and Lulu hit the most targets with both casts. At 4 Replicators the 50% echo is nearly a full second ability — one of the strongest damage multipliers in the game.",
  },
  Rogue: {
    beginner: "Rogues gain up to 60% bonus AD and AP at 5 units. The first time any Rogue drops below 50% HP, they slip into shadows — all enemies targeting them get redirected to a nearby unit (preferring tanks) instead.",
    tip: "The shadow dodge can save your carry from a focused burst combo. At 5 Rogues the 60% AD/AP is massive — pair with carries who can exploit both stats like Kai'Sa or Akali.",
  },
  Shepherd: {
    beginner: "Shepherds summon Bia (at 3 units) and Bayin (at 5 units) — powerful ally creatures that fight for you. At 7 units their bond grows deeper. Both get stronger the higher the combined star levels of your Shepherd champions.",
    tip: "3-starring your Shepherd units scales Bia and Bayin dramatically. Prioritize 3-starring cheap Shepherds like Teemo first for strong summon power at low investment.",
  },
  Sniper: {
    beginner: "Snipers deal bonus Damage Amp that increases per hex of distance to their target. At 5 units they get 32% base amp plus 5% extra per hex — from the back row against a frontline enemy that's over 50% bonus damage.",
    tip: "Place Snipers in the farthest back row and let enemies come to them. At 4-5 Snipers, every additional hex of distance massively amplifies their output. Jhin, Xayah, and Ezreal are all devastating in backline positions.",
  },
  Vanguard: {
    beginner: "Vanguards gain 5% Durability while shielded and get a big max HP Shield twice per combat — at the start and again at 50% HP. At 6 units the shield is 40% max HP and they get 10% damage reduction while it's active.",
    tip: "The double-proc shield (combat start + 50% HP) means Vanguards have two big defensive windows every fight. At 6 units that 10% DR stacked with shield makes them the tankiest frontline possible.",
  },
  Voyager: {
    beginner: "At combat start, tanks and fighters get a shield (up to 700 HP at 6 units) and other allies get Damage Amp (up to 27%). Voyagers themselves get double both benefits — making them excellent in hybrid tank/carry roles.",
    tip: "Voyager scales hard into 5-6 units. At 6, tanks get a 700 HP shield and carries get 27% DA — both doubled for Voyagers themselves. Great for mixed comps with strong frontlines and backline carries.",
  },

  // ── Unique (1-champion) traits ─────────────────────────────────────────────
  Bulwark: {
    beginner: "Unique to Shen — he summons a placeable relic you position on the board. When combat starts, it gives all adjacent allies an 18% max HP shield and 20% Attack Speed.",
    tip: "Position the relic between your frontline tanks and your carries to spread the shield across the most important units. The 20% Attack Speed buff makes it excellent next to fast-attacking carries too.",
  },
  Commander: {
    beginner: "Unique to Sona — every 2 rounds she hands you a random Command Mod you can equip on any ally to change how they fight in combat. Mods persist for 2 combats even if you don't equip them.",
    tip: "Bank mods if the current one doesn't fit your comp — they last 2 combats unequipped. Best used on your carry or a key frontline unit to surprise opponents.",
  },
  "Dark Lady": {
    beginner: "Unique to Morgana — your whole team takes 5% less damage from abilities. When Morgana shifts into her Dark Form during combat, that doubles to 10% for everyone.",
    tip: "Morgana is already a strong 5-cost caster. The 10% ability DR in Dark Form effectively makes your whole team tankier against AP-heavy comps — great insurance against mages.",
  },
  "Divine Duelist": {
    beginner: "Unique to Fiora — you heal for 15% of all player combat damage you deal. And Fiora herself always wins a one-on-one duel against any single enemy, no matter what.",
    tip: "The player healing makes Fiora a great HP sustain unit in close lobbies. Her guaranteed 1v1 win makes her nearly unkillable in small fights — stack AD and crit to maximize her output.",
  },
  Doomer: {
    beginner: "Unique to Vex — at the start of combat, every enemy is marked with Doom. The first time each enemy takes any damage, their Doom is consumed — stealing 8% of their AD and AP and giving it all to Vex.",
    tip: "Against a full 8-unit board, Vex steals from all 8 enemies at once on the first hit. She snowballs harder the bigger the enemy team is — great against high-cost comps.",
  },
  Eradicator: {
    beginner: "Unique to Jhin — while he's on your board, every single enemy has 14% less Armor and Magic Resist. Your whole team hits harder through this debuff.",
    tip: "Eradicator is a passive team buff — every physical and magic damage source benefits. Pair Jhin with other strong carries to amplify the whole board's damage output.",
  },
  "Factory New": {
    beginner: "Unique to Graves — after each combat he participated in, an armory opens where you buy a permanent upgrade for him. He gets stronger every round. Every 3 upgrades, future ones take an extra round to arrive.",
    tip: "Prioritize upgrades that fit your comp early. The pacing slows after every 3 upgrades, so make sure early picks are impactful.",
  },
  "Galaxy Hunter": {
    beginner: "Unique to Zed — only obtainable via the 'Invader Zed' augment. While at least one of his clones is alive, Zed gains 40% bonus Attack Damage. His clones both protect him and buff him.",
    tip: "Protect Zed's clones to keep the 40% AD bonus active as long as possible. Stack AD items on him — the bonus multiplies with every item he carries.",
  },
  "Gun Goddess": {
    beginner: "Unique to Miss Fortune — before combat you choose her mode: Channeler (more mana/casts), Challenger (more attack speed + on-kill dash), or Replicator (abilities fire twice). She gains that trait's bonuses and a unique ability for that mode.",
    tip: "Choose based on your comp's needs. Channeler mode fills trait breakpoints. Challenger mode makes her an attack-speed machine. Replicator mode doubles her ability impact — great for her AoE ults.",
  },
  Oracle: {
    beginner: "Every 3 rounds, Tahm Kench gives you a surprise random reward — could be gold, items, or champions. He's your team's lucky cat!",
    tip: "Oracle rewards are random but consistent. Running Tahm Kench for 10 rounds can generate significant bonus value. His 4-cost Brawler/tank stats also make him a natural frontline anchor.",
  },
  "Party Animal": {
    beginner: "Unique to Blitzcrank — once per combat, when he drops below 45% HP, he becomes untargetable and repairs 15% max HP per second. If he fully heals, he enters The Groove for the rest of the fight and his Party Crasher passive fires bolts 4x as fast.",
    tip: "Getting Blitzcrank to full health from the repair triggers both Groove (massive speed boost) and quadruple bolt speed. Stack HP and shields to help him survive to the 45% threshold and maximize the proc.",
  },
  Redeemer: {
    beginner: "Unique to Rhaast — your whole team gains Attack Speed, Armor, and MR for each non-unique trait you have active. The more diverse your board, the bigger the buff.",
    tip: "Rhaast rewards 'wide' comps. Running many 2-unit trait splashes stacks his bonus fast — at 8+ active non-unique traits the team-wide stats are significant.",
  },
};

export const TYPE_META: Record<string, { label: string; icon: string; color: string; description: string }> = {
  damage: {
    label: "Damage",
    icon: "⚔️",
    color: "text-red-400",
    description: "Boosts attack damage, ability power, or crit for your champions.",
  },
  magic: {
    label: "Magic",
    icon: "✨",
    color: "text-blue-400",
    description: "Enhances mana, spell frequency, or ability effects.",
  },
  tank: {
    label: "Tank",
    icon: "🛡️",
    color: "text-slate-300",
    description: "Increases armor, magic resist, health, or shields.",
  },
  economy: {
    label: "Economy",
    icon: "💰",
    color: "text-yellow-400",
    description: "Generates gold, XP, rerolls, or item advantages.",
  },
  utility: {
    label: "Utility",
    icon: "⚙️",
    color: "text-purple-300",
    description: "Provides summons, flexibility, or unique board mechanics.",
  },
};
