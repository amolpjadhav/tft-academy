import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

const SECTIONS = [
  {
    id: "what-is-tft",
    title: "What Is Teamfight Tactics?",
    content: `
Teamfight Tactics (TFT) is a free-to-play auto-battler strategy game made by Riot Games. It's set in the League of Legends universe and is available on PC, Mac, iOS, and Android. You don't need to know anything about League of Legends to play — TFT is its own independent game with its own rules and meta.

The basic idea is simple: eight players compete in the same lobby, building teams of champions on a hexagonal board. Before each round, your champions fight automatically — you don't control their individual actions during combat. Your job is everything that happens between fights: choosing which champions to buy, deciding how to position them on the board, picking which items to build, and figuring out which team composition gives you the best chance of winning.

Every player starts with full health (typically 100 HP in standard mode). When you lose a round, you lose some HP. The last player standing wins. A full game usually takes 30–45 minutes.

TFT is updated every two weeks with balance patches, and every few months Riot releases an entirely new "Set" with new champions, items, and mechanics. This guide covers Set 17: Space Gods.
    `.trim(),
  },
  {
    id: "the-board",
    title: "The Board & Hexes",
    content: `
Your board is a grid of hexagonal tiles (hexes). You have two rows in the bottom half of the screen — that's your territory. You can place up to a certain number of champions on those hexes at any time, determined by your current level.

Positioning matters enormously. Champions with short attack range (Melee champions like Briar, Blitzcrank, or Darius) need to be in the front row facing the enemy. Champions with long attack range (like Caitlyn, Kog'Maw, or Ziggs) should sit in the back rows so they can safely shoot while your frontline soaks the damage.

Each hex your champion stands on determines which enemies they target first — they'll almost always attack the nearest enemy. So if you put your carry (your main damage dealer) in the corner, they'll often be the last champion enemies reach.

Enemies approach from the top half of your screen. Their positioning mirrors yours — you can't see their board during planning, but you can hover over another player to scout their composition and adjust before the round begins.
    `.trim(),
  },
  {
    id: "gold-and-economy",
    title: "Gold & Economy — The Heart of TFT",
    content: `
Gold is the currency of TFT. You earn gold at the start of each round, and you spend it to buy champions, level up, and refresh your shop. Managing your gold well is what separates good players from great ones.

Here's how you earn gold each round:
- **Base income**: 5 gold per round, every round.
- **Interest**: You earn 1 bonus gold for every 10 gold you have saved up (up to +5 gold at 50g). This is called "interest," just like a savings account. If you save money, you earn more money.
- **Win/Loss streaks**: Winning multiple rounds in a row earns you bonus gold. Losing multiple rounds in a row also earns you bonus gold. This is called "streaking." Yes — losing on purpose early to get bonus gold is a legitimate strategy called "loss streaking."
- **Selling champions**: If you buy a champion and change your mind, you can sell them for the same gold you paid.

The shop shows 5 random champions each round. Refreshing (rerolling) the shop costs 2 gold. You can lock your shop so it doesn't refresh between rounds.

**Experience (EXP) and leveling up** determines your maximum team size. You start at Level 1 (1 champion slot) and can reach Level 10 (10 champion slots). You automatically gain 2 EXP per round, or you can spend 4 gold to buy 4 EXP manually.

Higher levels also unlock higher-cost champions in your shop — at Level 5 you start seeing 3-cost champions regularly; at Level 8+ you see 4-cost and 5-cost champions.
    `.trim(),
  },
  {
    id: "champion-costs",
    title: "Champion Costs & Rarity",
    content: `
Champions in TFT cost between 1 and 5 gold. Cost reflects both the power level of the champion and how rare they are in the shared pool.

- **1-cost champions** (e.g., Anivia, Caitlyn, Shen): Weakest individually, most common. Great for filling trait bonuses early.
- **2-cost champions** (e.g., Bard, Ekko, Tristana): A step up in power. Often form the core of early and mid-game compositions.
- **3-cost champions** (e.g., Ahri, Jinx, Vayne): Significantly stronger. Popular carries (main damage dealers) in many compositions.
- **4-cost champions** (e.g., Ambessa, Diana, Warwick): Very powerful. Finding these in your shop is a turning point in most games.
- **5-cost champions** (e.g., Aurelion Sol, Zilean, Tahm Kench): Legendary units. Rare, expensive, and game-changing. Often called "5-costs" or "legendaries."

The total number of each champion in the shared pool is fixed. That means if four other players are all trying to buy Jinx, the copies available to you decrease. This is why scouting other players' boards matters — if someone else is playing the same composition, you're competing for the same champions.
    `.trim(),
  },
  {
    id: "three-starring",
    title: "3-Starring Champions",
    content: `
Champions can be upgraded to 2-star and 3-star versions by combining copies of the same champion together. Three copies of the same 1-star champion combine into one 2-star champion. Three copies of the same 2-star champion (nine total copies) combine into one 3-star champion.

A 3-star champion is dramatically more powerful than its 1-star version — roughly 4–5 times as strong, with higher HP, higher damage, and often enhanced ability effects.

- **3-starring 1-costs** is achievable most games. Aim for this with champions central to your composition.
- **3-starring 2-costs and 3-costs** requires dedicated rerolling (spending 2 gold repeatedly to refresh your shop and find more copies).
- **3-starring 4-costs and 5-costs** is extremely rare and usually game-winning.

When multiple copies of a champion are in your hand or on the board, they automatically combine when you collect the third copy. You don't need to do anything manually.
    `.trim(),
  },
  {
    id: "traits",
    title: "Traits — Building Synergies",
    content: `
Every champion has one to three traits printed on their profile. When you field enough champions sharing the same trait, you activate a trait bonus that boosts your entire team.

Traits come in two flavors:

**Origin traits** are based on where champions come from in the League of Legends lore — Noxus, Demacia, Freljord, Ionia, Bilgewater, Piltover, Zaun, Void, Ixtal, Shadow Isles, Targon, Shurima, and Yordle. Fielding enough champions from the same region gives powerful bonuses.

**Class traits** are based on what role champions play in a fight — Slayer, Juggernaut, Arcanist, Invoker, Quickstriker, Bruiser, Defender, Gunslinger, Warden, Longshot, Disruptor, Vanquisher, and more.

Most traits have multiple breakpoints. For example, Noxus might give a small bonus at 3 champions, a medium bonus at 5, and a huge bonus at 8. The more champions you have, the stronger the bonus.

Building your team around 2–3 strong traits that complement each other is the foundation of every successful composition. You'll often hear players talk about "Noxus reroll" (a composition focused on Noxus champions), "Freljord carry" (a composition using Freljord trait bonuses to power up a carry), and similar shorthands.
    `.trim(),
  },
  {
    id: "items",
    title: "Items — Equipping Your Champions",
    content: `
Items are equipment you attach to champions to make them stronger. Each champion can hold up to 3 items. Items are built from 8 basic components, combined in pairs to create 36 completed items.

The 8 basic components are:
- **B.F. Sword** (+10 Attack Damage)
- **Needlessly Large Rod** (+10 Ability Power)
- **Recurve Bow** (+15% Attack Speed)
- **Tear of the Goddess** (+15 Mana)
- **Chain Vest** (+20 Armor)
- **Negatron Cloak** (+20 Magic Resist)
- **Giant's Belt** (+150 HP)
- **Sparring Gloves** (+10% Crit Chance)

You get components from carousel rounds (where all players pick from a rotating ring of items), from PvE rounds (fighting neutral monsters), and from augments. You pick two components and drag them onto a champion to build the combined item.

**Item efficiency** is crucial. Always give items to the champion who benefits most from them. Attack Damage items go on AD carries, Ability Power items go on AP mages, defensive items go on tanks. Never put a tank item on your main damage dealer — it's wasted.

Good item management can win or lose games. A well-itemized 3-cost carry beats a poorly itemized 5-cost every time.
    `.trim(),
  },
  {
    id: "roles",
    title: "Roles: What Each Champion Type Does",
    content: `
In TFT School, champions are categorized into four roles:

**AD Carry (Attack Damage Carry)**: Champions who deal physical damage through basic attacks and abilities. They typically have high attack range and attack speed. Examples: Caitlyn, Jinx, Miss Fortune, Kai'Sa. Best items: Infinity Edge, Last Whisper, Bloodthirster.

**AP Carry (Ability Power Carry)**: Champions whose abilities deal magic damage that scales with Ability Power. They cast spells frequently for burst damage. Examples: Anivia, LeBlanc, Lissandra, Veigar. Best items: Rabadon's Deathcap, Jeweled Gauntlet, Blue Buff.

**Melee Carry**: Champions who deal damage in close combat — either physical or mixed. They often have self-sustain and high damage output at close range. Examples: Briar, Yasuo, Yone, Warwick. Best items: Titan's Resolve, Rageblade, Hand of Justice.

**Tank**: Champions whose primary job is to absorb damage and keep enemies occupied. They have high HP, armor, and magic resist. Examples: Braum, Nautilus, Skarner, Thresh. Best items: Gargoyle Stoneplate, Warmog's Armor, Bramble Vest.

The key to a good composition is balance: 2–3 tanks to survive the early fight, 1–2 main carries to deal damage, and support champions that activate strong trait bonuses. Stacking four carries with no tanks means your carries die before they can deal their damage.
    `.trim(),
  },
  {
    id: "augments",
    title: "Augments — Game-Changing Power-Ups",
    content: `
Three times per game (at specific rounds), you're offered a choice of three Augments. Augments are permanent power-ups unique to you — other players don't get the same ones. They range from minor stat bonuses to radical game-changers.

Augments come in three tiers:
- **Silver** (earliest, least powerful)
- **Gold** (mid-game, significantly powerful)
- **Prismatic** (late-game, game-defining)

Examples of what augments can do:
- Give you extra gold at the start of rounds
- Make all champions of a certain cost cost 1 less gold
- Duplicate every component item you find
- Add a 4th item slot to one champion
- Give your whole team bonus attack speed after each kill
- Summon additional companion units to fight with you

Choosing the right augment for your current composition is one of the most skill-expressive decisions in TFT. A Gold augment that boosts your core trait can be more valuable than a Prismatic augment for a trait you're not playing.
    `.trim(),
  },
  {
    id: "getting-started",
    title: "Tips for Your First Games",
    content: `
If you're completely new to TFT, here's the most important advice for your first few games:

**Don't force a composition.** In your first games, just play strong champions that you're being offered frequently. If you keep seeing 2-cost Zaun champions, build around Zaun. Don't try to force a strategy you read online if the game isn't giving you the right pieces.

**Always level up at stage 2-1 and 3-2.** Spending 4 gold to level up at the start of these stages is almost always correct. More levels = more champions on board = more trait activations.

**Save gold when possible.** Try to hover at 50 gold in the mid-game to maximize interest income. Only spend gold on rerolling when you're committed to completing a specific composition.

**Give items to your strongest unit.** Don't spread items thin across five champions. Three items on one strong carry is almost always better than one item each on three champions.

**Position your carries safely.** Put your carry in a corner of the back row where enemies take the longest to reach them. Losing your carry early in a fight usually means losing the round.

**Scout other players.** Before each round starts, click on other players' boards to see what they're building. If two others are playing the same carry as you, you're competing for the same champion copies. Consider pivoting to something else.

**Don't panic.** TFT rewards patience and adaptation. Falling behind in health mid-game is normal and recoverable. Focus on building toward your win condition one step at a time.

The best way to learn TFT is to play games, make mistakes, and think about why you lost each round. TFT School's tools — flashcards, quizzes, the item simulator — are here to help you learn the content so you can focus on strategy during your actual games.
    `.trim(),
  },
];

export default function GuidePage() {
  return (
    <>
      <Head>
        <title>TFT Beginner's Guide — Learn Teamfight Tactics | TFT School</title>
        <meta
          name="description"
          content="Complete beginner's guide to Teamfight Tactics (TFT) Set 17: Space Gods. Learn how the game works, understand gold and economy, champions, items, traits, augments, and tips for your first games."
        />
      </Head>
      <PageShell
        title="TFT Beginner's Guide"
        subtitle="Everything you need to know to go from zero to playing confidently"
      >
        <div className="max-w-2xl mx-auto">

          {/* Table of contents */}
          <nav className="bg-bg-surface rounded-2xl border border-white/8 p-5 mb-8">
            <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold mb-3">
              Table of Contents
            </p>
            <ol className="space-y-1.5">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-text-secondary hover:text-accent-gold text-sm transition-colors group"
                  >
                    <span className="text-[11px] text-text-muted font-mono w-5 shrink-0">{i + 1}.</span>
                    <span className="group-hover:underline">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Guide sections */}
          <div className="space-y-6">
            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="bg-bg-surface rounded-2xl border border-white/8 p-6 scroll-mt-20"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-heading text-accent-gold/50 text-lg leading-none mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-lg text-text-primary tracking-wide leading-snug">
                    {s.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {s.content.split("\n\n").map((para, j) => {
                    // Handle bullet-style bold lines
                    if (para.startsWith("- **")) {
                      return (
                        <ul key={j} className="space-y-2 ml-1">
                          {para.split("\n").map((line, k) => {
                            const match = line.match(/^- \*\*(.+?)\*\*:(.+)$/);
                            if (match) {
                              return (
                                <li key={k} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                                  <span className="text-accent-gold mt-0.5 shrink-0">·</span>
                                  <span>
                                    <strong className="text-text-primary">{match[1]}</strong>:{match[2]}
                                  </span>
                                </li>
                              );
                            }
                            return <li key={k} className="text-sm text-text-secondary leading-relaxed ml-4">{line.replace(/^- /, "")}</li>;
                          })}
                        </ul>
                      );
                    }
                    // Inline bold handling for regular paragraphs
                    const parts = para.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <p key={j} className="text-text-secondary text-sm leading-relaxed">
                        {parts.map((part, k) =>
                          part.startsWith("**") ? (
                            <strong key={k} className="text-text-primary font-semibold">
                              {part.replace(/\*\*/g, "")}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div className="mt-8 p-6 bg-bg-surface rounded-2xl border border-accent-purple/20 text-center space-y-3">
            <p className="text-text-primary text-sm font-semibold">
              Ready to test your knowledge?
            </p>
            <p className="text-text-muted text-xs">
              Use TFT School's interactive tools to lock in what you just learned.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Link
                href="/flashcards"
                className="inline-flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-glow"
              >
                🃏 Champion Flashcards
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/5"
              >
                🧠 Take the Quiz
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/5"
              >
                📖 TFT Glossary
              </Link>
            </div>
          </div>

        </div>
      </PageShell>
    </>
  );
}
