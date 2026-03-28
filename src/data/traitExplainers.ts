/**
 * Beginner-friendly one-liner for each Set 16 trait.
 * Keyed by trait name exactly as it appears in traits.json.
 */
export const TRAIT_EXPLAINERS: Record<string, { beginner: string; tip: string }> = {
  // ── Origin traits ──────────────────────────────────────────────────────────
  Bilgewater: {
    beginner: "Earn Silver Serpents (bonus gold) to spend on powerful upgrades in your shop.",
    tip: "Great for economy-focused players — the extra gold lets you level up and roll faster.",
  },
  Demacia: {
    beginner: "When your team takes enough damage, Demacians rally together and regenerate HP — making them very hard to kill.",
    tip: "Stack Demacian champions to survive long fights and outlast bursty enemy comps.",
  },
  Freljord: {
    beginner: "Summons a Frozen Tower that heals nearby allies and slows enemy attacks.",
    tip: "Place your frontline in front of the tower to protect your backline from enemy attackers.",
  },
  Ionia: {
    beginner: "Ionians gain shields, AD, and AP. The more unique Ionian traits you activate, the bigger the bonus.",
    tip: "Mix Ionian champions with other origins — every new trait you activate makes the Ionians stronger.",
  },
  Noxus: {
    beginner: "Once the enemy team has taken enough damage, a powerful Atakhan warrior appears to fight for you.",
    tip: "The higher your Noxus count, the stronger Atakhan becomes — great for snowballing winning fights.",
  },
  Piltover: {
    beginner: "Builds an invention on your board. Win or lose fights to level it up and unlock powerful bonuses.",
    tip: "Piltover rewards consistency — even losing rounds help you power up the invention.",
  },
  Shurima: {
    beginner: "Shurimans ramp up Attack Speed and restore Health every second during combat.",
    tip: "The longer a fight lasts, the stronger your Shurimans get — pair with tanky champions to keep them alive.",
  },
  Targon: {
    beginner: "Targonians are traitless — they don't activate other traits. But they have bonus stats to compensate.",
    tip: "Use Targon champions as fillers when you need a specific stat but don't want to break a trait threshold.",
  },
  Void: {
    beginner: "Unlock Mutations — powerful bonus effects that only Void champions can equip.",
    tip: "Void at 4+ units unlocks multiple mutation slots, dramatically boosting your whole comp.",
  },
  Yordle: {
    beginner: "Each unique Yordle on your board gives ALL Yordles bonus HP and Attack Speed. More Yordles = more power.",
    tip: "Try to get as many different Yordle champions as possible — the scaling is exponential.",
  },
  Zaun: {
    beginner: "After a few seconds of combat, Zaunites become Shimmer-Fused and gain powerful stat bonuses.",
    tip: "Zaun rewards surviving the early seconds of a fight — items that keep your champions alive help a lot.",
  },
  Ixtal: {
    beginner: "Complete quests during combat to earn Sunshards and unlock escalating bonuses.",
    tip: "Ixtal champions get stronger as you complete more quests — the longer you play the comp, the more value you get.",
  },
  "Shadow Isles": {
    beginner: "Each time any champion dies, you gain Souls. Spend Souls on bonuses between combats.",
    tip: "Shadow Isles benefits from high-death rounds — great against aggressive enemy comps.",
  },

  // ── Class traits ───────────────────────────────────────────────────────────
  Arcanist: {
    beginner: "Gives your whole team bonus Ability Power. Arcanist champions themselves get even more AP.",
    tip: "Stack AP items on your Arcanist carry — the trait multiplies all that AP into huge damage.",
  },
  Bruiser: {
    beginner: "Gives your whole team bonus max Health. Great for making your frontline nearly unkillable.",
    tip: "Pair Bruisers with Warmog's Armor or Dragon's Claw — the extra HP scales with percentage items.",
  },
  Darkin: {
    beginner: "Darkin champions heal from damage they deal (Omnivamp), and share that healing with you.",
    tip: "The more Darkin you run, the more sustain your team gets — strong against poke-heavy comps.",
  },
  Defender: {
    beginner: "Gives your whole team bonus Armor and Magic Resist. Defenders get the most.",
    tip: "Use Defenders to absorb damage from strong enemy carries — they're the backbone of a tanky comp.",
  },
  Disruptor: {
    beginner: "Disruptors' abilities 'Dazzle' (briefly stun) enemies they hit, interrupting enemy casts.",
    tip: "Disruptors are great against AP-heavy comps — staggering enemy casts buys your team precious seconds.",
  },
  Gunslinger: {
    beginner: "Every few attacks, Gunslingers fire bonus projectiles at ALL enemies — like a mini AoE attack.",
    tip: "Gunslingers shred clustered enemy teams. Put them in the back row and watch them spray everything.",
  },
  Invoker: {
    beginner: "Your whole team regenerates Mana faster, so champions cast their abilities much more often.",
    tip: "Stack Invoker with AP items and Blue Buff — your mages will cast constantly.",
  },
  Juggernaut: {
    beginner: "Juggernauts are very hard to kill — they gain Durability (damage reduction) especially when healthy.",
    tip: "Use Juggernauts as your main frontline. They become more efficient at tanking the longer they stay alive.",
  },
  Longshot: {
    beginner: "Longshots deal more damage the farther away their target is — reward backline snipers.",
    tip: "Place Longshot carries in the back corners. The more distance between them and enemies, the more damage.",
  },
  Quickstriker: {
    beginner: "Your whole team gets bonus Attack Speed. Quickstrikers also gain bonus Attack Damage when they crit.",
    tip: "Stack crit items like Infinity Edge — Quickstrikers chain crit into explosive attack speed and damage.",
  },
  Slayer: {
    beginner: "Slayers heal from damage they deal (Omnivamp) and deal more damage as their HP gets lower.",
    tip: "Slayers snowball hard once they start healing — let them get hit, then watch them kill everything.",
  },
  Vanquisher: {
    beginner: "Vanquishers' abilities can critically strike, and they gain bonus Crit Damage.",
    tip: "Build Infinity Edge and Jeweled Gauntlet on Vanquisher carries to multiply their spell crits.",
  },
  Warden: {
    beginner: "When Wardens drop below 75% and 50% HP, they gain a powerful shield — giving them two second lives.",
    tip: "Wardens stall for your backline longer than almost any other frontline unit in the game.",
  },

  // ── Unique (1-champion) traits ─────────────────────────────────────────────
  Ascendant: {
    beginner: "After each combat, a special Ascendant charm appears in your shop with a bonus upgrade.",
    tip: "Always check the shop for the Ascendant charm — even small bonuses compound over a full game.",
  },
  Assimilator: {
    beginner: "Kai'Sa changes her ability based on her strongest stat — AD or AP — so she adapts to your items.",
    tip: "Build whichever damage type fits your comp. Kai'Sa automatically picks the right spell.",
  },
  Blacksmith: {
    beginner: "Ornn forges powerful Artifact items for your team after each combat — items not normally available.",
    tip: "Ornn's artifacts are some of the strongest items in the game. Protect him so he keeps forging.",
  },
  Caretaker: {
    beginner: "After winning player combat, gain a random unit from Runeterra — free champions to strengthen your board.",
    tip: "Win streaking with Caretaker lets you snowball a huge army of free champions.",
  },
  Chainbreaker: {
    beginner: "Sylas rotates between 3 different abilities, making him unpredictable and versatile.",
    tip: "Sylas adapts to whatever your team needs — he's a flexible carry that never feels stale.",
  },
  Chronokeeper: {
    beginner: "Zilean stores XP every few casts and can level up your bench or board automatically.",
    tip: "Keep Zilean alive and casting — his XP generation can give you free levels throughout the game.",
  },
  "Dark Child": {
    beginner: "Annie summons Tibbers (a giant fire bear) on your bench. Tibbers can fight on your board.",
    tip: "Tibbers is essentially a free bonus unit — put him in your comp for an extra body.",
  },
  Dragonborn: {
    beginner: "Shyvana replaces her normal ability with Flame Breath after casting a few times.",
    tip: "Shyvana's true power unlocks after a few casts — keep her healthy to see the transformation.",
  },
  Emperor: {
    beginner: "Azir deploys two Sand Soldier Guards that fight for you and can be placed anywhere on the board.",
    tip: "Position Azir's guards near your carry to protect them, or use them to block enemy assassins.",
  },
  Eternal: {
    beginner: "Every 3rd attack on the same target, Kindred deals massive bonus damage.",
    tip: "Focus Kindred's attacks on a single target — her every-3rd-hit damage gets devastating fast.",
  },
  Glutton: {
    beginner: "You can feed Tahm Kench a champion each round to grant him their stats.",
    tip: "Feed Tahm Kench a high-cost champion you don't need — he gains their power permanently.",
  },
  Harvester: {
    beginner: "Each time an enemy dies, gain Mana. When Fiddlesticks casts, restore 30% of that stored Mana.",
    tip: "Fiddlesticks gets stronger as the round goes on — he's best in long fights with many deaths.",
  },
  Heroic: {
    beginner: "Galio sits off the board but his traits still count. He cheers from the sidelines, boosting your active traits.",
    tip: "Galio is a free trait slot — put him on your bench and he'll activate his traits without taking a board spot.",
  },
  HexMech: {
    beginner: "A unit on your bench automatically pilots a mech that jumps into battle at the start of combat.",
    tip: "The mech is essentially a free frontline unit — use it to soak damage while your main units deal damage.",
  },
  Huntress: {
    beginner: "While Neeko is alive, Nidalee transforms into a more powerful form.",
    tip: "Keep both Neeko and Nidalee alive — Nidalee's transformed state is significantly stronger.",
  },
  Immortal: {
    beginner: "If Xin Zhao is not on your board, Zaahen gains Xin Zhao's traits — giving you bonus trait activations.",
    tip: "Run Zaahen when you don't have Xin Zhao — he inherits Xin's identity for free.",
  },
  Riftscourge: {
    beginner: "Baron Nashor is a massive unit that takes up 2 team slots but gives bonus Void trait stacks.",
    tip: "Baron boosts your Void count — if you're running Void, he's worth the 2-slot cost.",
  },
  "Rune Mage": {
    beginner: "Ryze benefits from ALL active region traits on your board — the more origins you run, the stronger he gets.",
    tip: "Build a wide roster of different origins, then put Ryze in the comp to amplify all of them.",
  },
  Soulbound: {
    beginner: "Lucian and Senna fight as a duo — they swap places when either casts, making them nearly impossible to burst down.",
    tip: "They share their destiny: if one dies, the other fights twice as hard. Keep them both alive.",
  },
  "Star Forger": {
    beginner: "Aurelion Sol gains Stardust for each other Aurelion Sol in your team (or stacked via Duplicators) — more copies = more power.",
    tip: "3-staring Aurelion Sol or using duplicators gives him massive Stardust and an insane power spike.",
  },
  "The Boss": {
    beginner: "When Sett first drops below 50% HP, he leaves the fight to recharge — then returns fully refreshed.",
    tip: "Don't panic when Sett leaves — he comes back much stronger. Keep enemies off him when he returns.",
  },
  "World Ender": {
    beginner: "Aatrox converts his Omnivamp into pure Attack Damage, making him a self-healing damage monster.",
    tip: "Stack Omnivamp and lifesteal items on Aatrox — his passive turns all that healing into raw damage.",
  },
  "Chosen Wolves": {
    beginner: "A special unique trait that changes each game — check the trait description in-game for the current effect.",
    tip: "This trait offers random bonuses — adapt your comp based on what it offers that game.",
  },
  Timewinders: {
    beginner: "A special unique trait that changes each game — check the trait description in-game for the current effect.",
    tip: "This trait offers random bonuses — adapt your comp based on what it offers that game.",
  },
};

/** Short category description for the filter tabs */
export const TYPE_META: Record<string, { label: string; color: string; icon: string; desc: string }> = {
  damage: {
    label: "Damage",
    color: "text-red-400",
    icon: "⚔️",
    desc: "Boost Attack Damage, Crit, or Omnivamp",
  },
  magic: {
    label: "Magic",
    color: "text-blue-400",
    icon: "🔮",
    desc: "Boost Ability Power and Mana",
  },
  tank: {
    label: "Tank",
    color: "text-green-400",
    icon: "🛡️",
    desc: "Boost Armor, Magic Resist, and HP",
  },
  economy: {
    label: "Economy",
    color: "text-accent-gold",
    icon: "💰",
    desc: "Generate gold, XP, or items",
  },
  utility: {
    label: "Utility",
    color: "text-purple-400",
    icon: "⚡",
    desc: "Crowd control, board effects, and more",
  },
};
