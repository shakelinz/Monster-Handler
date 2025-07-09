// modal functionality
// Get the modal
const modal = document.getElementById("monsterModal");
const monsterModal = document.getElementById("monsterModal");
monsterModal.addEventListener("show.bs.modal", function (event) {
  // Update the modal's content
  const modalBody = monsterModal.querySelector(".modal-body");

  modalBody.innerHTML = `
    <input id="monsterName" type="text" class="form-control mb-2" placeholder="Monster Name">
    <input id="monsterMaxHP" type="number" class="form-control mb-2" placeholder="Max HP">
    <input id="monsterAC" type="number" class="form-control mb-2" placeholder="Armor Class">
    <input id="monsterCurrentHP" type="number" class="form-control mb-2" placeholder="Current HP">
    <input id="monsterType" type="text" class="form-control mb-2" placeholder="Type">
    <input id="monsterSize" type="text" class="form-control mb-2" placeholder="Size">
    <input id="monsterAlignment" type="text" class="form-control mb-2" placeholder="Alignment">
    <input id="monsterCR" type="text" class="form-control mb-2" placeholder="Challenge Rating">
    <input id="monsterSpeed" type="text" class="form-control mb-2" placeholder="Speed">
    <input id="monsterStats" type="text" class="form-control mb-2" placeholder="Stats (JSON)">
    <input id="monsterSavingThrows" type="text" class="form-control mb-2" placeholder="Saving Throws (JSON)">
    <input id="monsterSkills" type="text" class="form-control mb-2" placeholder="Skills (JSON)">
    <input id="monsterDamageResistances" type="text" class="form-control mb-2" placeholder="Damage Resistances">
    <input id="monsterDamageImmunities" type="text" class="form-control mb-2" placeholder="Damage Immunities">
    <input id="monsterDamageVulnerabilities" type="text" class="form-control mb-2" placeholder="Damage Vulnerabilities">
    <input id="monsterConditionImmunities" type="text" class="form-control mb-2" placeholder="Condition Immunities">
    <input id="monsterSenses" type="text" class="form-control mb-2" placeholder="Senses">  
    <input id="monsterPassivePerception" type="text" class="form-control mb-2" placeholder="Passive Perception">
    <input id="monsterLanguages" type="text" class="form-control mb-2" placeholder="Languages">
    <textarea id="monsterActions" class="form-control mb-2" placeholder="Actions (JSON)"></textarea>
    <textarea id="monsterAbilities" class="form-control mb-2" placeholder="Abilities (JSON)"></textarea>
    <input id="monsterImg" type="text" class="form-control mb-2" placeholder="Image URL">
    
    <button class="btn btn-primary" id="saveMonsterBtn">Save Monster</button>

  `;

  // Add edit functionality
  const saveMonsterBtn = document.getElementById("saveMonsterBtn");
  saveMonsterBtn.onclick = function () {
    console.log(`Editing monster with ID: ${monsterId}`);
    // Here you would typically open an edit form or redirect to an edit page
    // For example:
    // window.location.href = `/edit-monster/${monsterId}`;
    // Or you could open a modal with an edit form
  };
});

let monsters = await fetch("../../server/data/monsters.json").then(
  (response) => {
    return response.json();
  }
);
// Display monsters in an accordion format
const monsterAccordion = document.getElementById("monsterAccordion");
monsters.forEach((monster) => {
  const monsterCard = document.createElement("div");
  //   accordion closed by default
  monsterCard.classList.add("accordion-item");
  monsterCard.innerHTML = `
    <h2 class="accordion-header" id="heading-${monster.id}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${
        monster.id
      }" aria-expanded="false" aria-controls="collapse-${monster.id}">
        ${monster.name} (${monster.size} ${monster.type})
      </button>
    </h2>
    <div id="collapse-${
      monster.id
    }" class="accordion-collapse collapse" aria-labelledby="heading-${
    monster.id
  }" data-bs-parent="#monsterAccordion">
      <div class="accordion-body">
      <img src="${monster.img}" alt="${monster.name}" class="img-fluid">
        <p><strong>Alignment:</strong> ${monster.alignment}</p>
        <p><strong>Armor Class:</strong> ${monster.armorClass}</p>
        <p><strong>Hit Points:</strong> ${monster.hitPoints}</p>
        <p><strong>Speed:</strong> ${monster.speed}</p>
        <p><strong>Challenge Rating:</strong> ${monster.challengeRating}</p>
        <strong>Alignment:</strong> ${monster.alignment} <br>
    <strong>speed:</strong> ${monster.speed} <br>
    <strong>stats:</strong> ${JSON.stringify(monster.stats)} <br>
    <strong>Saving Throws:</strong> ${
      monster.savingThrows ? JSON.stringify(monster.savingThrows) : "None"
    } <br>
    <strong>Skills:</strong> ${
      monster.skills ? JSON.stringify(monster.skills) : "None"
    } <br>
    <strong>Damage Resistances:</strong> ${
      monster.damageResistances || "None"
    } <br>
    <strong>Damage Immunities:</strong> ${
      monster.damageImmunities || "None"
    } <br>
    <strong>Damage Vulnerabilities:</strong> ${
      monster.damageVulnerabilities || "None"
    } <br>
    <strong>Condition Immunities:</strong> ${
      monster.conditionImmunities || "None"
    } <br>
    <strong>Senses:</strong> ${monster.senses || "None"} <br>
    <strong>Passive Perception:</strong> ${
      monster.passivePerception || "None"
    } <br>
    <strong>Languages:</strong> ${monster.languages || "None"} <br>
    <strong>Actions:</strong> ${
      monster.actions
        ? monster.actions
            .map((action) => `<div>${action.name}: ${action.description}</div>`)
            .join("")
        : "None"
    } <br>
    <strong>Abilities:</strong> ${
      monster.abilities
        ? monster.abilities
            .map(
              (ability) => `<div>${ability.name}: ${ability.description}</div>`
            )
            .join("")
        : "None"
    } <br>
      </div>
    </div>`;
  monsterAccordion.appendChild(monsterCard);
});
