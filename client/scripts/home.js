let monsters = await fetch("../../server/data/encounters/encounter0.json").then(
  (response) => {
    return response.json();
  }
);

// search functionality
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");

// Sample data for suggestions
let monsterNames = monsters.map((monster) => monster.name);

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsList.innerHTML = ""; // Clear previous suggestions

  if (query.length === 0) {
    return; // No suggestions if input is empty
  }

  const filteredSuggestions = monsterNames.filter((item) =>
    item.toLowerCase().startsWith(query)
  );

  filteredSuggestions.forEach((suggestion) => {
    const listItem = document.createElement("li");
    listItem.textContent = suggestion;
    listItem.addEventListener("click", function () {
      searchInput.value = this.textContent;
      suggestionsList.innerHTML = ""; // Clear suggestions after selection
    });
    suggestionsList.appendChild(listItem);
  });
});

// Close suggestions when clicking outside the search bar
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-container")) {
    suggestionsList.innerHTML = "";
  }
});

// Display monsters in cards
let monsterCardsContainer = document.getElementById("monster-cards"); // Clear existing content

monsters.forEach((monster) => {
  let monsterCard = document.createElement("div");
  monsterCard.className = "col-md-4 mb-4";
  monsterCard.style.borderRadius = "8px"; // Rounded corners
  //   green border for monsters with HP > 0, red for those with HP <= 0
  let monsterColor = "";
  if (monster.currentHP == monster.hp) {
    monsterColor = "bg-success"; // Green background for monsters with full HP
  } else if (monster.currentHP > monster.hp / 2) {
    monsterColor = "bg-warning"; // Yellow background for monsters with more than half HP
  } else if (monster.currentHP > 0) {
    monsterColor = "bg-danger"; // Red background for monsters with less than half HP
  } else {
    monsterColor = "bg-secondary"; // Grey background for monsters with 0 HP
  }
  // the img size will be 100% of the card width and height
  monsterCard.innerHTML = `
    <div class="card ${monsterColor} h-100">
      <img src="${monster.img}" class="card-img-top" alt="${monster.name}"
       style = "width: fit-content;
       height: 15vw;
       object-fit: cover;">
       
      <div class="card-body">
        <h5 class="card-title ">monster: ${monster.name}</h5>
        <h5 class="card-title ">name: ${monster.name}</h5>
        <p class="card-text">max HP: ${monster.hp}</p>
        <p class="card-text">AC: ${monster.ac}</p>
        <p class="card-text">current HP: ${monster.currentHP}</p>
        <button class="btn btn-danger" id="deleteMonsterBtn" data-monster-id="${monster.id}">Delete Monster</button>
        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#monsterModal" data-monster-id="${monster.id}">View Details and edit</a>
      </div>
    </div>
  `;
  monsterCardsContainer.appendChild(monsterCard);
});

// Add delete functionality
const deleteMonsterBtn = document.getElementById("deleteMonsterBtn");
deleteMonsterBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior
  const monsterId = this.getAttribute("data-monster-id");
  console.log(`Deleting monster with ID: ${monsterId}`);
  // Here you would typically send a request to the server to delete the monster
  // For example:
  // fetch(`/api/monsters/${monsterId}`, {
  //   method: 'DELETE',
  //   headers: { 'Content-Type': 'application/json' }
  // }).then(response => {
  //   if (response.ok) {
  //     console.log('Monster deleted successfully');
  //     // Optionally, you can remove the card from the DOM
  //     const card = this.closest('.card');
  //     card.remove();
  //   } else {
  //     console.error('Failed to delete monster');
  //   }
  // });
  // For now, just log the action
  console.log(`Monster with ID ${monsterId} would be deleted here.`);
});

// monsters selection functionality
const selectMonstersBtn = document.getElementById("selectMonstersBtn");
const damageButton = document.getElementById("damage-button");
const selectedMonsters = new Set();
let selectionMode = false;

selectMonstersBtn.addEventListener("click", function () {
  selectionMode = !selectionMode;

  const monsterCards = document.querySelectorAll(".card");

  if (selectionMode) {
    this.innerText = "Stop selecting Monsters";
    damageButton.style.display = "block";

    monsterCards.forEach((card) => {
      card.classList.add("selectable");
      card.addEventListener("click", handleCardSelection);
    });
    damageButton.addEventListener("click", function () {
      if (selectedMonsters.size != 0) {
        const monsterIds = [...selectedMonsters];
        console.log("Adding damage to monsters:", monsterIds);
        // Here you would typically send the selected monster IDs to the server
        // to apply damage or perform some action.
        // For example:
        // fetch('/api/monsters/damage', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ monsterIds })
      }
      this.innerText = "Select Monsters";
      damageButton.style.display = "none";
      selectedMonsters.clear();

      monsterCards.forEach((card) => {
        card.classList.remove("selectable", "selected");
        card.removeEventListener("click", handleCardSelection);
      });
      window.location.reload(); // Reload the page to reflect changes
    });
  } else {
    this.innerText = "Select Monsters";
    damageButton.style.display = "none";
    selectedMonsters.clear();

    monsterCards.forEach((card) => {
      card.classList.remove("selectable", "selected");
      card.removeEventListener("click", handleCardSelection);
    });
  }
});

function handleCardSelection(event) {
  if (!selectionMode) return;

  // Prevent clicking inner elements (like links) from bubbling up
  if (event.target.tagName === "A") return;

  const card = event.currentTarget;
  const monsterId = card.querySelector("a").getAttribute("data-monster-id");

  if (selectedMonsters.has(monsterId)) {
    selectedMonsters.delete(monsterId);
    card.classList.remove("selected");
  } else {
    selectedMonsters.add(monsterId);
    card.classList.add("selected");
  }
}

// Modal functionality
const monsterModal = document.getElementById("monsterModal");
monsterModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget; // Button that triggered the modal
  const monsterId = button.getAttribute("data-monster-id"); // Extract info from data-* attributes

  // Find the monster by ID
  const monster = monsters.find((m) => m.id === monsterId);
  if (!monster) return;

  // Update the modal's content
  const modalTitle = monsterModal.querySelector(".modal-title");
  const modalBody = monsterModal.querySelector(".modal-body");

  modalTitle.textContent = `Details for ${monster.name}`;
  modalBody.innerHTML = `
    <label for="monsterName">Monster Name:</label>
    <input id="monsterName" type="text" class="form-control mb-2" value="${
      monster.name
    }" placeholder="Monster Name">
    <label for="monsterMaxHP">Max HP:</label>
    <input id="monsterMaxHP" type="number" class="form-control mb-2" value="${
      monster.hp
    }" placeholder="Max HP">
    <label for="monsterAC">Armor Class:</label>
    <input id="monsterAC" type="number" class="form-control mb-2" value="${
      monster.ac
    }" placeholder="Armor Class">
    <label for="monsterCurrentHP">Current HP:</label>
    <input id="monsterCurrentHP" type="number" class="form-control mb-2" value="${
      monster.currentHP
    }" placeholder="Current HP">
    <p>      <strong>Type:</strong> ${monster.type} <br>
    <strong>Size:</strong> ${monster.size} <br>
    <strong>Challenge Rating:</strong> ${monster.cr} <br>
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

    <img src="${monster.img}" class="img-fluid" alt="${monster.name}">
    <button class="btn btn-primary mt-3" id="editMonsterBtn">Edit Monster</button>
  `;

  // Add edit functionality
  const editMonsterBtn = document.getElementById("editMonsterBtn");
  editMonsterBtn.onclick = function () {
    console.log(`Editing monster with ID: ${monsterId}`);
    // Here you would typically open an edit form or redirect to an edit page
    // For example:
    // window.location.href = `/edit-monster/${monsterId}`;
    // Or you could open a modal with an edit form
  };
});
