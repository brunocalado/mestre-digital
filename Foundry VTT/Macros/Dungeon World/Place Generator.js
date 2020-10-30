const macroVersion = 'v0.1.0';
/* Place Generator
Features
- 
Source: 
Icon: 
*/
//

const tags_title_defense = ['None', 'Militia', 'Watch', 'Garrison', 'Battalion', 'Legion'];
const tags_defense = {
  'None': "Clubs, torches, farming tools.",
  'Militia': "There are able-bodied men and women with worn weapons ready to be called, but no standing force.",
  'Watch': "There are a few watchers posted who look out for trouble and settle small problems, but their main role is to summon the militia.",
  'Guard': "There are armed defenders at all times with a total pool of less than 100 (or equivalent). There is always at least one armed patrol about the steading.",
  'Garrison': "There are armed defenders at all times with a total pool of 100–300 (or equivalent). There are multiple armed patrols at all times.",
  'Battalion': "As many as 1,000 armed defenders (or equivalent). The steading has manned maintained defenses as well.",
  'Legion': "The steading is defended by thousands of armed soldiers (or equivalent). The steading’s defenses are intimidating."
};
const tags_title_population = ['Exodus', 'Shrinking', 'Steady', 'Growing', 'Booming'];
const tags_population = {
  'Exodus': "The steading has lost its population and is on the verge of collapse.",
  'Shrinking': "The population is less than it once was. Buildings stand empty.",
  'Steady': "The population is in line with the current size of the steading. Some slow growth.",
  'Growing': "More people than there are buildings.",
  'Booming': "Resources are stretched thin trying to keep up with the number of people."
};
const tags_title_prosperity = ['Dirt', 'Poor', 'Moderate', 'Wealthy', 'Rich'];
const tags_prosperity = {
  'Dirt': "Nothing for sale, nobody has more than they need (and they’re lucky if they have that). Unskilled labor is cheap.",
  'Poor': "Only the bare necessities for sale. Weapons are scarce unless the steading is heavily defended or militant. Unskilled labor is readily available.",
  'Moderate': "Most mundane items are available. Some types of skilled laborers.",
  'Wealthy': "Any mundane item can be found for sale. Most kinds of skilled laborers are available, but demand is high for their time.",
  'Rich': "Mundane items and more, if you know where to find them. Specialist labor available, but at high prices."
};
const tags_other = {
  'Safe': "Outside trouble doesn’t come here until the players bring it. Idyllic and often hidden, if the steading would lose or degrade another beneficial tag get rid of safe instead.",
  'Religion': "The listed deity is revered here.",
  'Exotic': "There are goods and services available here that aren’t available anywhere else nearby. List them.",
  'Resource': "The steading has easy access to the listed resource (e.g., a spice, a type of ore, fish, grapes). That resource is significantly cheaper.",
  'Need': "The steading has an acute or ongoing need for the listed resource. That resource sells for considerably more.",
  'Oath': "The steading has sworn oaths to the listed steadings. These oaths are generally of fealty or support, but may be more specific.",
  'Trade': "The steading regularly trades with the listed steadings.",
  'Market': "Everyone comes here to trade. On any given day the available items may be far beyond their prosperity. +1 to supply.",
  'Enmity': "The steading holds a grudge against the listed steadings.",
  'History': "Something important once happened here, choose one and detail or make up your own: battle, miracle, myth, romance, tragedy.",
  'Arcane': "Someone in town can cast arcane spells for a price. This tends to draw more arcane casters, +1 to recruit when you put out word you’re looking for an adept.",
  'Divine': "There is a major religious presence, maybe a cathedral or monastery. They can heal and maybe even raise the dead for a donation or resolution of a quest. Take +1 to recruit priests here.",
  'Guild': "The listed type of guild has a major presence (and usually a fair amount of influence). If the guild is closely associated with a type of hireling, +1 to recruit that type of hireling.",
  'Personage': "There’s a notable person who makes their home here. Give them a name and a short note on why they’re notable.",
  'Dwarven': "The steading is significantly or entirely dwarves. Dwarven goods are more common and less expensive than they typically are.",
  'Elven': "The steading is significantly or entirely elves. Elven goods are more common and less expensive than they typically are.",
  'Craft': "The steading is known for excellence in the listed craft. Items of their chosen craft are more readily available here or of higher quality than found elsewhere.",
  'Lawless': "Crime is rampant; authority is weak.",
  'Blight': "The steading has a recurring problem, usually a type of monster.",
  'Power': "The steading holds sway of some type. Typically political, divine, or arcane."
};

const steading_names = ["Graybark", "Nook’s Crossing", "Tanner’s Ford", "Goldenfield", "Barrowbridge", "Rum River", "Brindenburg", "Shambles", "Covaner", "Enfield", "Crystal Falls", "Castle Daunting", "Nulty’s Harbor", "Castonshire", "Cornwood", "Irongate", "Mayhill", "Pigton", "Crosses", "Battlemoore", "Torsea", "Curland", "Snowcalm", "Seawall", "Varlosh", "Terminum", "Avonia", "Bucksburg", "Settledown", "Goblinjaw", "Hammerford", "Pit", "The Gray Fast", "Ennet Bend", "Harrison’s Hold", "Fortress Andwynne", "Blackstone"];

const steading_types = ['Village', 'Town', 'Keep', 'City'];

main();

function main() {
  let steading_types_list = [];
  for (let type of steading_types) {
    steading_types_list += `<option value=${type}>${type}`
  }

  let dialogTemplate = `
  <h1>Place</h1>
  <p style="text-align:center; vertical-align:center"><select id="steading_types_list" style=" width:250px;">${steading_types_list}</select></p>

  `;

  new Dialog({
    title: `Place Generator - ${macroVersion}`,
    content: dialogTemplate,
    buttons: {
      Attack: {
        label: "Create",
        callback: async (html) => {
          rollDamage(html);
        }
      },
      Cancel: {
        label: "Cancel"
      }
    }
  }).render(true);  
}

// ==============================
// Main
// ==============================
async function rollDamage(html) {
  let type = html.find("#steading_types_list")[0].value;    
  
  if (type=='Village') {
    dialogVillage();
  }
}

// ==============================
// Common Functions 
// ==============================
function dialogVillage() {
  
  const option1 = [
  "The village is somewhere naturally defended: Safe, -Defenses",
  "The village has abundant resources that sustain it: +Prosperity, Resource (your choice), Enmity (your choice)",
  "The village is under the protection of another steading: Oath (that steading), +Defenses",
  "The village is on a major road: Trade (your choice), +Prosperity",
  "The village is built around a wizard’s tower: Personage (the wizard), Blight (arcane creatures)",
  "The village was built on the site of religious significance: Divine, History (your choice)"
  ];
  const option2 = [
  "The village is in arid or uncultivable land: Need (Food)",
  "The village is dedicated to a deity: Religious (that deity), Enmity (a settlement of another deity)",
  "The village has recently fought a battle: -Population, -Prosperity if they fought to the end, -Defenses if they lost.",
  "The village has a monster problem: Blight (that monster), Need (adventurers)",
  "The village has absorbed another village: +Population, Lawless",
  "The village is remote or unwelcoming: -Prosperity, Dwarven or Elven"
  ];
  
  let option1_list = [];
  for (let type of option1) {
    option1_list += `<option value=${type}>${type}`
  };
  let option2_list = [];
  for (let type of option2) {
    option2_list += `<option value=${type}>${type}`
  };


  let dialogTemplate = `
  <h1>Village</h1>
  <p>By default a village is <b style="color:red">Poor, Steady, Militia, Resource (your choice) and has an Oath to another steading of your choice</b>.</p> 
  <p>If the village is part of a kingdom or empire choose one:</p>
  <p style="text-align:center; vertical-align:center"><select id="steading_types_list" style=" width:350px;">${option1_list}</select></p>
  <p>Choose one problem:</p>
  <p style="text-align:center; vertical-align:center"><select id="steading_types_list" style=" width:350px;">${option2_list}</select></p>  
  `;

  new Dialog({
    title: `Place Generator - Village`,
    content: dialogTemplate,
    buttons: {
      Attack: {
        label: "Create",
        callback: async (html) => {
          villageCreator(html);
        }
      },
      Cancel: {
        label: "Cancel"
      }
    }
  }).render(true);
  
}

async function villageCreator(html) {
  return false;
}

