const fs = require("fs");
const path = require("path");

const SCALE_ICONS = {
  scaleAP: "AP",
  scaleAD: "AD",
  scaleMR: "MR",
  scaleArmor: "Armor",
  scaleHP: "HP",
  scaleAS: "AS",
  scaleMana: "Mana",
  scaleCritChance: "Crit",
  scaleCritDamage: "Crit Dmg",
  scaleOmnivamp: "Omnivamp",
};

function cleanDescription(desc) {
  if (!desc) return desc;

  // Replace (%i:scaleXX%) or %i:scaleXX% with (XX)
  desc = desc.replace(/\(%i:(\w+)%\)/g, (_, key) => {
    const mapped = SCALE_ICONS[key];
    return mapped ? `(${mapped})` : "";
  });
  desc = desc.replace(/%i:(\w+)%/g, (_, key) => {
    const mapped = SCALE_ICONS[key];
    return mapped ? `(${mapped})` : "";
  });

  // Remove {{TFT_Keyword_X}} tokens
  desc = desc.replace(/\{\{[^}]+\}\}/g, "");

  // Replace @VarName@ placeholders with #
  desc = desc.replace(/@[^@]+@/g, "#");

  // Fix double opening/closing parens
  desc = desc.replace(/\(\(/g, "(").replace(/\)\)/g, ")");

  // Clean up double spaces
  desc = desc.replace(/  +/g, " ").trim();

  return desc;
}

const championsPath = path.join(__dirname, "../data/champions.json");
const champions = JSON.parse(fs.readFileSync(championsPath, "utf8"));

const updated = champions.map((c) => ({
  ...c,
  ability: {
    ...c.ability,
    description: cleanDescription(c.ability.description),
  },
}));

fs.writeFileSync(championsPath, JSON.stringify(updated, null, 2));
console.log(`Updated ${updated.length} champions.`);

// Show a few examples
updated.slice(0, 5).forEach((c) => {
  console.log(`\n${c.name}: ${c.ability.description.slice(0, 120)}`);
});
