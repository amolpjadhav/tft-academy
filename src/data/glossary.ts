export type GlossaryCategory =
  | "stats"
  | "mechanics"
  | "roles"
  | "economy"
  | "tft";

export interface GlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  emoji: string;
  simple: string;
  detail: string;
  example: string;
}

export const CATEGORY_META: Record<
  GlossaryCategory,
  { label: string; color: string; description: string }
> = {
  stats: {
    label: "Stats",
    color: "text-accent-gold",
    description: "Numbers that make your champions stronger",
  },
  mechanics: {
    label: "Mechanics",
    color: "text-blue-400",
    description: "Rules and effects that happen during a fight",
  },
  roles: {
    label: "Roles",
    color: "text-purple-400",
    description: "The job each champion does on your team",
  },
  economy: {
    label: "Economy",
    color: "text-green-400",
    description: "How gold and shopping work",
  },
  tft: {
    label: "TFT Basics",
    color: "text-red-400",
    description: "Core concepts unique to Teamfight Tactics",
  },
};

export const GLOSSARY: GlossaryTerm[] = [
  // ─── STATS ────────────────────────────────────────────────────────────────

  {
    id: "attack_damage",
    term: "Attack Damage (AD)",
    category: "stats",
    emoji: "⚔️",
    simple: "How hard a basic attack hits.",
    detail:
      "Attack Damage is the number that decides how much damage a champion deals when they punch or shoot someone normally — before any special move. A higher AD number means bigger hits every time they auto-attack. Most AD carry items like Infinity Edge boost this number.",
    example:
      "Infinity Edge gives +35 AD. If your champion was dealing 100 damage per hit, they now deal 135 — every single attack.",
  },
  {
    id: "ability_power",
    term: "Ability Power (AP)",
    category: "stats",
    emoji: "🔮",
    simple: "How hard a special move (spell) hits.",
    detail:
      "Ability Power is the number that makes a champion's special move stronger. Think of it like turning up the volume on their superpower. The more AP they have, the bigger the explosion, the harder the zap, the stronger the spell. AP items like Rabadon's Deathcap stack this number up.",
    example:
      "If a mage's fireball normally hits for 300 damage and you give them +80 AP, the fireball scales up — it might now deal 500 or more depending on how well that champion scales with AP.",
  },
  {
    id: "armor",
    term: "Armor",
    category: "stats",
    emoji: "🛡️",
    simple: "Protection against normal attacks.",
    detail:
      "Armor is like wearing a thick coat of metal. It reduces the damage your champion takes from physical hits — basic attacks and most AD abilities. More armor means enemy swords and bullets bounce off harder. Tanks want a lot of armor so they survive on the front line.",
    example:
      "Bramble Vest gives +60 Armor. A champion with 60 Armor takes roughly 37% less damage from physical hits compared to someone with 0 Armor.",
  },
  {
    id: "magic_resist",
    term: "Magic Resist (MR)",
    category: "stats",
    emoji: "💜",
    simple: "Protection against spells and magic damage.",
    detail:
      "Magic Resist is like a magical force field. It reduces how much damage your champion takes from spells and ability-based attacks. If the enemy team has a lot of mages, you want your tank to have high MR so their spells tickle instead of hurt. Dragon's Claw is the king of MR items.",
    example:
      "Dragon's Claw gives +50 MR. Against an Arcanist lobby, this can literally cut the magic damage your tank receives by almost half.",
  },
  {
    id: "health_points",
    term: "Health Points (HP)",
    category: "stats",
    emoji: "❤️",
    simple: "How much damage a champion can take before dying.",
    detail:
      "HP is your champion's life bar. When it reaches zero, they're knocked out. Tanks want as much HP as possible so they can soak up hits for the rest of the team. Warmog's Armor is the classic item for stacking HP high.",
    example:
      "Warmog's Armor gives +800 HP. That's like adding an extra medium-sized health bar on top of what the champion already had.",
  },
  {
    id: "mana",
    term: "Mana",
    category: "stats",
    emoji: "🔵",
    simple: "The fuel your champion uses to cast their ability.",
    detail:
      "Every champion has a mana bar. They fill it up by auto-attacking. When it's full — zoom! — they cast their special ability automatically. Items like Blue Buff give extra mana so the bar fills faster, meaning your champion spams their ability more often.",
    example:
      "If a champion needs 80 mana to cast, and Blue Buff gives +30 mana from the start, they only need to earn 50 more through auto-attacks — so they cast much sooner.",
  },
  {
    id: "attack_speed",
    term: "Attack Speed (AS)",
    category: "stats",
    emoji: "⚡",
    simple: "How fast a champion swings or shoots.",
    detail:
      "Attack Speed controls how many times per second your champion auto-attacks. More attack speed means more hits in the same amount of time — which also means filling up their mana bar faster and triggering on-hit effects more often. Rageblade is the ultimate attack speed item.",
    example:
      "A champion at 1.0 AS attacks once per second. At 2.0 AS they attack twice per second — dealing double the auto-attack damage in the same fight.",
  },
  {
    id: "crit_chance",
    term: "Critical Strike Chance (Crit %)",
    category: "stats",
    emoji: "🎯",
    simple: "The odds that your next hit will do double damage.",
    detail:
      "Critical Strike Chance is a percentage rolled on every attack. If you have 50% Crit Chance, roughly half your attacks will be critical strikes — hitting much harder than normal. Stack it high enough and almost every hit crits.",
    example:
      "Infinity Edge gives +35% Crit Chance. Combined with Sparring Gloves (+10%), you're already at 45% — nearly half your attacks deal critical damage.",
  },
  {
    id: "crit_damage",
    term: "Critical Strike Damage",
    category: "stats",
    emoji: "💥",
    simple: "How much harder a crit hits compared to a normal attack.",
    detail:
      "By default in TFT, a critical strike deals 140% of your normal damage — so 40% more. Items and passives can increase this percentage. Jeweled Gauntlet and Infinity Edge both increase crit damage, turning crits from a small bonus into a massive spike of pain.",
    example:
      "If a normal hit deals 200 damage, a default crit deals 280. With +40% crit damage stacked, that same crit now deals 360 — nearly double the original hit.",
  },
  {
    id: "omnivamp",
    term: "Omnivamp",
    category: "stats",
    emoji: "🩸",
    simple: "Heals you for a portion of every bit of damage you deal.",
    detail:
      "Omnivamp is like a vampire power. Every time your champion deals damage — from a basic attack or an ability — they heal back a percentage of it. The more damage they dish out, the more they heal. Slayer class champions naturally build Omnivamp, making them harder to kill the more they fight.",
    example:
      "With 15% Omnivamp, a champion who deals 1000 damage in a fight heals back 150 HP — automatically, with no items needed beyond their trait bonus.",
  },

  // ─── MECHANICS ────────────────────────────────────────────────────────────

  {
    id: "basic_attack",
    term: "Basic Attack (Auto-Attack)",
    category: "mechanics",
    emoji: "🗡️",
    simple: "The normal hit a champion does automatically.",
    detail:
      "Every champion in TFT automatically attacks the nearest enemy every second or so — no player input needed. This is called a basic attack or auto-attack. It uses the champion's Attack Damage stat, fills up their mana bar, and can trigger on-hit effects from items. Most of the fighting in TFT happens through basic attacks.",
    example:
      "A Gunslinger champion like Miss Fortune will automatically start shooting the closest enemy at the start of combat — you don't control this, it just happens.",
  },
  {
    id: "ability",
    term: "Ability (Spell / Ult)",
    category: "mechanics",
    emoji: "✨",
    simple: "A champion's powerful special move that fires automatically when they have enough mana.",
    detail:
      "Every champion has one unique ability — their signature superpower. They don't cast it right away; they have to fill up their mana bar first by auto-attacking. Once full, they cast automatically. Abilities are usually much stronger than basic attacks and scale with Ability Power for mage-type champions.",
    example:
      "Lux's ability fires a giant laser across the board that hits every enemy in a line. You can't aim it — she fires it automatically when she has enough mana.",
  },
  {
    id: "critical_strike",
    term: "Critical Strike (Crit)",
    category: "mechanics",
    emoji: "💫",
    simple: "A lucky hit that deals extra damage — like rolling a natural 20.",
    detail:
      "A critical strike is a special attack that deals more damage than normal. It activates randomly based on your Crit Chance percentage — think of it like rolling dice on every attack. Red numbers usually appear when a crit happens. By default, abilities can't crit — but Jeweled Gauntlet and Infinity Edge unlock that.",
    example:
      "If your crit chance is 35% and you make 100 attacks, roughly 35 of those attacks will deal critical damage instead of normal damage.",
  },
  {
    id: "true_damage",
    term: "True Damage",
    category: "mechanics",
    emoji: "🔴",
    simple: "Damage that ignores all armor and magic resist — it always hits full.",
    detail:
      "Normal damage gets reduced by Armor or Magic Resist. True damage skips all of that — it goes straight through every defense. Tanks hate true damage because their armor becomes useless against it. Infinity Edge's passive converts crit hits into partially true damage, which is why it's so powerful against tanky opponents.",
    example:
      "If a champion deals 100 true damage, the target takes exactly 100 — whether they have 10 armor or 100 armor. No reduction at all.",
  },
  {
    id: "shield",
    term: "Shield",
    category: "mechanics",
    emoji: "🫧",
    simple: "A temporary extra health bar that absorbs damage before your real HP.",
    detail:
      "A shield is a bubble of protection. It sits on top of your real HP and takes hits first. Once the shield is gone, then real HP starts going down. Shields last for a limited time and don't regenerate — once broken, they're gone. Locket of the Iron Solari and Bloodthirster both create shields.",
    example:
      "Bloodthirster gives a 300 HP shield when your champion drops below 40% HP. If an enemy was about to kill them, this shield absorbs up to 300 damage — giving the champion precious extra seconds.",
  },
  {
    id: "grievous_wounds",
    term: "Grievous Wounds (Wound)",
    category: "mechanics",
    emoji: "🩹",
    simple: "Makes the enemy heal much less — like putting a lid on their healing.",
    detail:
      "Wound is a debuff that reduces all healing the target receives by 33%. If an enemy would heal 300 HP, they only heal 200 instead. This is crucial against champions or comps that rely on healing to survive — like Slayer carries with Omnivamp or Bruisers with sustain augments. Sunfire Cape, Morellonomicon, and Bramble Vest all apply Wound.",
    example:
      "If a tanky Bruiser is supposed to heal 1000 HP across a long fight, applying Grievous Wounds cuts that to only 670 — making them much easier to kill.",
  },
  {
    id: "burn",
    term: "Burn",
    category: "mechanics",
    emoji: "🔥",
    simple: "Sets the enemy on fire — they take damage slowly over time.",
    detail:
      "Burn is a damage-over-time effect. Once applied, the target takes a percentage of their max HP as magic damage every second for several seconds. It's great for melting tanks who have tons of HP, because the damage scales with how much health they have. Sunfire Cape is the classic burn item.",
    example:
      "A Warmog's Armor tank might have 2000 HP. Sunfire Cape's 1% Burn deals 20 damage per second — even armor doesn't fully block it because it scales with their own HP.",
  },
  {
    id: "sunder",
    term: "Sunder (Armor Shred)",
    category: "mechanics",
    emoji: "⚡",
    simple: "Tears holes in the enemy's armor so everyone hits them harder.",
    detail:
      "Sunder is a debuff that reduces an enemy's Armor by a percentage. It doesn't just help the champion applying it — it helps your ENTIRE team deal more physical damage to that target. Last Whisper applies Sunder on every physical hit, making it a team multiplier disguised as a single item.",
    example:
      "An enemy tank has 80 Armor. Last Whisper Sunders them by 30%, reducing it to 56 effective Armor. Now every AD champion on your team deals more damage to that tank.",
  },
  {
    id: "mana_lock",
    term: "Mana Lock",
    category: "mechanics",
    emoji: "🔒",
    simple: "Forces an enemy to fill their mana bar more before casting.",
    detail:
      "Some effects increase an enemy's max mana, which means they need more mana to cast their ability — delaying their first cast. This is a form of crowd control that slows down how often enemies use their powerful abilities. Shroud of Stillness used to apply this effect.",
    example:
      "If an enemy normally needs 80 mana to cast and their max mana is increased by 40%, they now need 112 mana — that extra time is often the difference between winning and losing a fight.",
  },
  {
    id: "crowd_control",
    term: "Crowd Control (CC)",
    category: "mechanics",
    emoji: "🥶",
    simple: "Any effect that stops an enemy from acting normally.",
    detail:
      "Crowd control is an umbrella term for effects that disrupt enemies — slowing them, freezing them, knocking them back, or stopping them from attacking or casting. CC is extremely powerful in TFT because champions act automatically, so any interruption is time they're not dealing damage.",
    example:
      "A stun that lasts 2 seconds means the enemy carry doesn't auto-attack or cast for 2 full seconds — against a fast carry, that's potentially several missed hits and a delayed ability.",
  },

  // ─── ROLES ────────────────────────────────────────────────────────────────

  {
    id: "carry",
    term: "Carry",
    category: "roles",
    emoji: "🎯",
    simple: "The star player — the champion doing most of the damage.",
    detail:
      "A carry is the champion your whole team is built around to do the heavy lifting in combat. They get three items (the maximum), get leveled up to higher star levels, and the rest of your team protects them. If your carry dies, you usually lose the round. AD carries use Attack Damage items, AP carries use Ability Power items.",
    example:
      "In a Gunslinger comp, Jinx is the carry. She gets Infinity Edge, Giant Slayer, and Bloodthirster — three AD items — while your other champions are there mainly to protect her.",
  },
  {
    id: "tank",
    term: "Tank / Frontline",
    category: "roles",
    emoji: "🛡️",
    simple: "The tough guy who stands in front and takes hits for the team.",
    detail:
      "A tank is a champion designed to absorb as much damage as possible without dying. They have naturally high HP, Armor, and MR, and you make them even tougher with tank items. They stand at the front of your board (close to the enemy) and distract enemies while your carry safely attacks from the back.",
    example:
      "A Juggernaut like Darius sits in the front row with Warmog's Armor, Gargoyle Stoneplate, and Dragon's Claw — he might take 5000 damage across a fight and still be standing at the end.",
  },
  {
    id: "mage",
    term: "Mage",
    category: "roles",
    emoji: "🔮",
    simple: "A champion who deals damage through powerful spells rather than basic attacks.",
    detail:
      "A mage is an AP carry — their strength comes from their ability, not their auto-attacks. They build Ability Power items like Rabadon's Deathcap and Jeweled Gauntlet, and their goal is to cast their ability as fast and as often as possible. The Arcanist trait in Set 16 is built around boosting mages.",
    example:
      "Lux is a mage. Her basic attacks are weak, but her ability can one-shot entire rows of enemies with enough AP stacked on her.",
  },
  {
    id: "assassin",
    term: "Assassin",
    category: "roles",
    emoji: "🗡️",
    simple: "A sneaky champion who jumps to the back row to kill the enemy carry.",
    detail:
      "Assassins have a unique behavior: at the start of combat, they leap over the frontline to land next to the enemy's backline carry. Their goal is to kill the carry before the carry can do damage. They hit hard and fast but usually aren't very tanky themselves.",
    example:
      "When an enemy Akali jumps to your backline and kills your Jinx in 2 seconds, that's an assassin doing its job. Positioning your carry in a corner can sometimes make it harder for assassins to reach them.",
  },
  {
    id: "support",
    term: "Support",
    category: "roles",
    emoji: "💛",
    simple: "A champion who helps teammates survive or deal more damage instead of fighting themselves.",
    detail:
      "Support champions focus on buffing, healing, or shielding allies rather than dealing damage themselves. They might reduce enemy resistances (like Ionic Spark on a tank), heal teammates, or grant bonus stats. Invoker-trait champions in Set 16 often fill a support role by regenerating mana for the team.",
    example:
      "A tank holding Ionic Spark shreds enemy Magic Resist so your mages hit harder — that tank is playing a support role even though it's a tank item.",
  },
  {
    id: "backline",
    term: "Backline",
    category: "roles",
    emoji: "🏹",
    simple: "The rows furthest from the enemy — where your carries are safest.",
    detail:
      "In TFT, you place champions on a 4×7 hexagonal grid. The backline refers to the rows on your side that are furthest from enemies. Most carries, mages, and fragile champions should be placed here so they have time to deal damage before getting attacked. Assassins specifically target the backline.",
    example:
      "Caitlyn or Jinx should always be in your back row — ideally in a corner — so they can shoot safely without getting hit right away.",
  },
  {
    id: "frontline",
    term: "Frontline",
    category: "roles",
    emoji: "⚔️",
    simple: "The rows closest to the enemy — where your tanks stand.",
    detail:
      "The frontline is the first line of defense. Champions here get attacked first and need to be as durable as possible. Tanks, Bruisers, Juggernauts, Wardens, and Defenders all excel in the frontline. A strong frontline buys your backline carries the time they need to win the fight.",
    example:
      "A 3-tank frontline of Darius, Malphite, and Jarvan IV might survive for 15 seconds — long enough for your Jinx to shred the entire enemy team.",
  },

  // ─── ECONOMY ──────────────────────────────────────────────────────────────

  {
    id: "gold",
    term: "Gold",
    category: "economy",
    emoji: "🪙",
    simple: "The money you spend to buy champions and level up.",
    detail:
      "Gold is TFT's currency. You earn it at the end of each round — a base amount plus interest on your saved gold, plus win or loss streaks. You spend gold to buy champions from the shop, reroll the shop to see new champions, and level up your player level to field more champions.",
    example:
      "At the start of most rounds you earn 5 base gold. If you have 50 gold saved, you earn 5 more in interest — so 10 gold total for that round.",
  },
  {
    id: "interest",
    term: "Interest",
    category: "economy",
    emoji: "💰",
    simple: "Bonus gold you earn for saving money — like a bank account.",
    detail:
      "TFT rewards you for saving gold. Every 10 gold you have saved earns you 1 extra gold per round, up to a maximum of 5 bonus gold (at 50+ gold). This mechanic is called interest. Smart players save gold to maximize interest income, then spend it all at once to upgrade their team.",
    example:
      "If you save 50 gold, you earn 5 interest per round. Over 5 rounds that's 25 free gold — more than enough to upgrade a champion or reroll your shop several times.",
  },
  {
    id: "reroll",
    term: "Reroll",
    category: "economy",
    emoji: "🎲",
    simple: "Spending 2 gold to refresh the shop and see new champions.",
    detail:
      "The shop shows 5 champions to buy each round. If none are useful, you can spend 2 gold to reroll — getting a fresh set of 5. Rerolling is how you find duplicates of champions to star them up. How often you reroll depends on your strategy — some players save gold (econ), others spend it all chasing a specific champion.",
    example:
      "You want a 3-star Jinx. She's a 4-cost champion, so you keep rerolling at level 8 spending 2 gold each time until you find enough copies to upgrade her.",
  },
  {
    id: "econ",
    term: "Econ (Economy)",
    category: "economy",
    emoji: "📈",
    simple: "Managing your gold carefully to earn as much as possible.",
    detail:
      "Econ is short for economy — the strategy of saving and spending gold efficiently. Playing good econ means keeping gold above 50 for maximum interest, only spending when necessary, and timing your big buys at the right moment. Bad econ means spending freely and running out of gold when you need it most.",
    example:
      "A player with 'good econ' sits at 50 gold all game, earning 5 interest per round, then spends 30 gold in one turn to upgrade their team — while a player with bad econ has 0 gold and can't afford anything.",
  },
  {
    id: "leveling",
    term: "Player Level",
    category: "economy",
    emoji: "⬆️",
    simple: "Your level controls how many champions you can put on the board.",
    detail:
      "You start at level 1 and can go up to level 10 by spending XP. Each level lets you put one more champion on the board. Higher levels also increase your chances of finding rarer champions in the shop. Spending 4 gold gives 4 XP — you can buy XP manually each round, or it accumulates automatically.",
    example:
      "At level 7 you can field 7 champions. Pushing to level 8 unlocks your 8th slot — letting you add another key champion to complete a synergy or add more tankiness.",
  },

  // ─── TFT BASICS ───────────────────────────────────────────────────────────

  {
    id: "trait",
    term: "Trait (Synergy)",
    category: "tft",
    emoji: "🔗",
    simple: "Bonus powers you unlock by having enough champions of the same group.",
    detail:
      "Every champion belongs to one or more traits — like Arcanist, Bruiser, or Gunslinger. When you have enough champions sharing the same trait on your board, you unlock a bonus for the whole team. The more champions in the trait, the bigger the bonus. Building around strong trait bonuses is the heart of TFT strategy.",
    example:
      "3 Arcanists gives all your champions +20 AP. 6 Arcanists gives +60 AP. That extra 60 AP on your mage carry can double their damage output.",
  },
  {
    id: "star_level",
    term: "Star Level (1★ / 2★ / 3★)",
    category: "tft",
    emoji: "⭐",
    simple: "Upgrading a champion by combining 3 copies — makes them massively stronger.",
    detail:
      "Every champion starts at 1-star. Combine 3 copies to get a 2-star — which is significantly stronger (roughly double the stats). Combine 3 more 2-stars (9 total copies) to get a 3-star — which is extremely powerful. Three-starring your carry is often the key to winning.",
    example:
      "A 1-star Jinx has 700 HP and deals decent damage. A 2-star Jinx has ~1400 HP and hits nearly twice as hard. A 3-star Jinx is terrifying — she can sometimes 1v9 the enemy board by herself.",
  },
  {
    id: "augment",
    term: "Augment",
    category: "tft",
    emoji: "💎",
    simple: "A special power-up you pick once that changes how your whole game plays.",
    detail:
      "Three times per game, you're offered three Augments to choose from. Augments are unique abilities or bonuses that dramatically shape your strategy — things like 'Your Arcanists deal 20% more damage' or 'Your tanks heal 5% HP per second'. Choosing the right Augment for your comp is one of the most important decisions in TFT.",
    example:
      "If you're running an Arcanist comp and you're offered an Augment that gives all Arcanists +30 AP, that's a massive power spike — take it immediately.",
  },
  {
    id: "item_component",
    term: "Item Component",
    category: "tft",
    emoji: "🔩",
    simple: "A basic building block used to craft full items.",
    detail:
      "There are 8 base components in TFT: B.F. Sword, Needlessly Large Rod, Recurve Bow, Tear of the Goddess, Chain Vest, Negatron Cloak, Giant's Belt, and Sparring Gloves. Combine any two components (even two of the same kind) to make a complete, more powerful item. You get components from PvE rounds, carousels, and augments.",
    example:
      "B.F. Sword + Sparring Gloves = Infinity Edge. Needlessly Large Rod + Needlessly Large Rod = Rabadon's Deathcap. Every full item is just a recipe of two components.",
  },
  {
    id: "carousel",
    term: "Carousel",
    category: "tft",
    emoji: "🎠",
    simple: "A shared round where all players pick one item or champion for free.",
    detail:
      "The carousel is a special round that happens several times per game. Champions holding items spin around in a circle. All players pick one at the same time — lowest HP player gets first pick. You get the champion AND the item they're carrying. Carousels are your main source of item components.",
    example:
      "If you desperately need a Negatron Cloak for Dragon's Claw, you try to pick the carousel champion holding one — getting both a free champion and the component.",
  },
  {
    id: "bench",
    term: "Bench",
    category: "tft",
    emoji: "🪑",
    simple: "The storage area below the board where you keep extra champions.",
    detail:
      "The bench holds up to 9 champions that aren't on the active board. Champions on the bench don't fight — they're either waiting to be combined into a higher star level, or they're backups in case you want to swap your comp. You can drag champions from the bench to the board and back between rounds.",
    example:
      "You have 2 copies of Jinx on the board and a third one on the bench. Once you get a fourth, you can combine two 1-stars on the bench to make one 2-star, then combine that 2-star with your bench copy to push toward 3-star.",
  },
  {
    id: "hex",
    term: "Hex (Tile)",
    category: "tft",
    emoji: "🔷",
    simple: "One square on the board — where you place a champion.",
    detail:
      "The TFT board is made up of hexagonal tiles called hexes. Each hex holds one champion. Your side of the board has 28 hexes across 4 rows — the bottom 4 rows belong to you, the top belong to the enemy. Strategic positioning on hexes matters a lot: where your tank stands and where your carry hides can decide fights.",
    example:
      "Placing your carry in the corner hex at the back makes it harder for assassins to reach them, since they jump to the nearest backline target.",
  },
  {
    id: "contested",
    term: "Contested",
    category: "tft",
    emoji: "😰",
    simple: "When multiple players are all trying to buy the same champion.",
    detail:
      "Champions in TFT come from a shared pool — there are only a limited number of copies of each champion. If you and another player both want the same champion, you're 'contested'. This makes it harder to find copies to star up, because the other player is buying them too. Recognizing contested comps early and switching to uncontested ones is key to winning.",
    example:
      "If 3 players all want Jinx, the pool of 10 Jinx copies is split three ways. Nobody gets a 3-star Jinx — you all stay at 1-star and weak. Pivoting to a champion nobody else wants means you'll 3-star her easily.",
  },
  {
    id: "radiant_item",
    term: "Radiant Item",
    category: "tft",
    emoji: "✨",
    simple: "A supercharged version of a regular item — much more powerful.",
    detail:
      "Radiant items are the same items you know but upgraded to an extreme level. They glow with a golden aura and have stronger stats or better passives. You can't craft them — they're awarded through special augments, late-game events, or Radiant Blessing anvils. Having even one Radiant item can swing an entire game.",
    example:
      "Radiant Infinity Edge might give +50 AD and +50% Crit instead of the normal +35/+35 — plus an even stronger true damage passive. One Radiant item on your carry can feel like two normal items.",
  },
];
