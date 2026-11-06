/*
  STEPHEN KING COLLECTION TRACKER
  ===============================
  This file does three jobs:
  1. Stores the book list in one easy-to-edit place.
  2. Builds the checkbox table automatically.
  3. Saves a visitor's checks in that visitor's browser only.

  HOW TO ADD A FUTURE NOVEL
  -------------------------
  Add one new object at the bottom of BOOKS, before the closing ];

    { id: "short-unique-name", year: 2027, title: "New Book Title" },

  Optional labels:
    by: "Richard Bachman"
    note: "with Peter Straub"

  The id must be unique and should never be changed after people have saved data,
  because it is the name used to match that book to its saved checkboxes.
*/

const BOOKS = [
  { id: "carrie", year: 1974, title: "Carrie" },
  { id: "salems-lot", year: 1975, title: "'Salem's Lot" },
  { id: "the-shining", year: 1977, title: "The Shining" },
  { id: "rage", year: 1977, title: "Rage", by: "Richard Bachman" },
  { id: "the-stand", year: 1978, title: "The Stand" },
  { id: "the-long-walk", year: 1979, title: "The Long Walk", by: "Richard Bachman" },
  { id: "the-dead-zone", year: 1979, title: "The Dead Zone" },
  { id: "firestarter", year: 1980, title: "Firestarter" },
  { id: "roadwork", year: 1981, title: "Roadwork", by: "Richard Bachman" },
  { id: "cujo", year: 1981, title: "Cujo" },
  { id: "the-running-man", year: 1982, title: "The Running Man", by: "Richard Bachman" },
  { id: "the-gunslinger", year: 1982, title: "The Dark Tower I: The Gunslinger" },
  { id: "christine", year: 1983, title: "Christine" },
  { id: "pet-sematary", year: 1983, title: "Pet Sematary" },
  { id: "cycle-of-the-werewolf", year: 1983, title: "Cycle of the Werewolf" },
  { id: "the-talisman", year: 1984, title: "The Talisman", note: "with Peter Straub" },
  { id: "the-eyes-of-the-dragon", year: 1984, title: "The Eyes of the Dragon" },
  { id: "thinner", year: 1984, title: "Thinner", by: "Richard Bachman" },
  { id: "it", year: 1986, title: "It" },
  { id: "the-drawing-of-the-three", year: 1987, title: "The Dark Tower II: The Drawing of the Three" },
  { id: "misery", year: 1987, title: "Misery" },
  { id: "the-tommyknockers", year: 1987, title: "The Tommyknockers" },
  { id: "the-dark-half", year: 1989, title: "The Dark Half" },
  { id: "the-stand-complete", year: 1990, title: "The Stand: The Complete and Uncut Edition" },
  { id: "the-waste-lands", year: 1991, title: "The Dark Tower III: The Waste Lands" },
  { id: "needful-things", year: 1991, title: "Needful Things" },
  { id: "geralds-game", year: 1992, title: "Gerald's Game" },
  { id: "dolores-claiborne", year: 1992, title: "Dolores Claiborne" },
  { id: "insomnia", year: 1994, title: "Insomnia" },
  { id: "rose-madder", year: 1995, title: "Rose Madder" },
  { id: "the-green-mile", year: 1996, title: "The Green Mile", note: "original serial novel" },
  { id: "desperation", year: 1996, title: "Desperation" },
  { id: "the-regulators", year: 1996, title: "The Regulators", by: "Richard Bachman" },
  { id: "wizard-and-glass", year: 1997, title: "The Dark Tower IV: Wizard and Glass" },
  { id: "bag-of-bones", year: 1998, title: "Bag of Bones" },
  { id: "the-girl-who-loved-tom-gordon", year: 1999, title: "The Girl Who Loved Tom Gordon" },
  { id: "dreamcatcher", year: 2001, title: "Dreamcatcher" },
  { id: "black-house", year: 2001, title: "Black House", note: "with Peter Straub" },
  { id: "from-a-buick-8", year: 2002, title: "From a Buick 8" },
  { id: "wolves-of-the-calla", year: 2003, title: "The Dark Tower V: Wolves of the Calla" },
  { id: "song-of-susannah", year: 2004, title: "The Dark Tower VI: Song of Susannah" },
  { id: "the-dark-tower", year: 2004, title: "The Dark Tower VII: The Dark Tower" },
  { id: "the-colorado-kid", year: 2005, title: "The Colorado Kid" },
  { id: "cell", year: 2006, title: "Cell" },
  { id: "liseys-story", year: 2006, title: "Lisey's Story" },
  { id: "blaze", year: 2007, title: "Blaze", by: "Richard Bachman" },
  { id: "duma-key", year: 2008, title: "Duma Key" },
  { id: "under-the-dome", year: 2009, title: "Under the Dome" },
  { id: "11-22-63", year: 2011, title: "11/22/63" },
  { id: "the-wind-through-the-keyhole", year: 2012, title: "The Dark Tower: The Wind Through the Keyhole" },
  { id: "joyland", year: 2013, title: "Joyland" },
  { id: "doctor-sleep", year: 2013, title: "Doctor Sleep" },
  { id: "mr-mercedes", year: 2014, title: "Mr. Mercedes" },
  { id: "revival", year: 2014, title: "Revival" },
  { id: "finders-keepers", year: 2015, title: "Finders Keepers" },
  { id: "end-of-watch", year: 2016, title: "End of Watch" },
  { id: "gwendys-button-box", year: 2017, title: "Gwendy's Button Box", note: "with Richard Chizmar" },
  { id: "sleeping-beauties", year: 2017, title: "Sleeping Beauties", note: "with Owen King" },
  { id: "the-outsider", year: 2018, title: "The Outsider" },
  { id: "elevation", year: 2018, title: "Elevation" },
  { id: "the-institute", year: 2019, title: "The Institute" },
  { id: "later", year: 2021, title: "Later" },
  { id: "billy-summers", year: 2021, title: "Billy Summers" },
  { id: "gwendys-final-task", year: 2022, title: "Gwendy's Final Task", note: "with Richard Chizmar" },
  { id: "fairy-tale", year: 2022, title: "Fairy Tale" },
  { id: "holly", year: 2023, title: "Holly" },
  { id: "never-flinch", year: 2025, title: "Never Flinch" },
  { id: "other-worlds-than-these", year: 2026, title: "Other Worlds Than These", note: "with Peter Straub" },
];

/*
  These five keys correspond to the five checkbox columns. Keep the keys stable
  after the page is published so older saved collections continue to load.
*/
const FIELDS = [
  { key: "hardcover", label: "Hardcover" },
  { key: "hardcoverFirst", label: "Hardcover 1st" },
  { key: "softcover", label: "Softcover" },
  { key: "softcoverFirst", label: "Softcover 1st" },
  { key: "read", label: "Read" },
];

const STORAGE_KEY = "justinbopp-stephen-king-collection-v1";

const listElement = document.querySelector("#book-list");
const searchInput = document.querySelector("#book-search");
const saveButton = document.querySelector("#save-button");
const undoButton = document.querySelector("#undo-button");
const saveStatus = document.querySelector("#save-status");
const ownedCount = document.querySelector("#owned-count");
const firstCount = document.querySelector("#first-count");
const readCount = document.querySelector("#read-count");
const totalCount = document.querySelector("#total-count");

let savedEntries = loadSavedEntries();
let draftEntries = cloneEntries(savedEntries);
let isDirty = false;

totalCount.textContent = BOOKS.length;
renderBooks();
updateInterface();

/* Read saved data. A broken or outdated save safely falls back to an empty ledger. */
function loadSavedEntries() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return {};

    const parsedValue = JSON.parse(storedValue);
    return parsedValue.entries && typeof parsedValue.entries === "object"
      ? parsedValue.entries
      : {};
  } catch (error) {
    showStorageError("Saved data could not be read in this browser.");
    return {};
  }
}

function cloneEntries(entries) {
  return JSON.parse(JSON.stringify(entries));
}

/* Build one row per book and one checkbox per collection field. */
function renderBooks() {
  const fragment = document.createDocumentFragment();

  BOOKS.forEach((book) => {
    const row = document.createElement("tr");
    row.dataset.bookId = book.id;
    row.dataset.searchText = `${book.title} ${book.year} ${book.by || ""} ${book.note || ""}`.toLowerCase();

    const bookCell = document.createElement("td");
    bookCell.className = "book-cell";

    const title = document.createElement("span");
    title.className = "book-title";
    title.textContent = book.title;
    bookCell.appendChild(title);

    const details = document.createElement("span");
    details.className = "book-details";

    const year = document.createElement("span");
    year.textContent = book.year;
    details.appendChild(year);

    if (book.by) {
      const byline = document.createElement("span");
      byline.className = "bachman-mark";
      byline.textContent = `as ${book.by}`;
      details.appendChild(byline);
    }

    if (book.note) {
      const note = document.createElement("span");
      note.textContent = book.note;
      details.appendChild(note);
    }

    bookCell.appendChild(details);
    row.appendChild(bookCell);

    FIELDS.forEach((field) => {
      const cell = document.createElement("td");
      cell.dataset.label = field.label;

      const checkbox = document.createElement("input");
      checkbox.className = "collection-check";
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(draftEntries[book.id]?.[field.key]);
      checkbox.setAttribute("aria-label", `${book.title}: ${field.label}`);
      checkbox.dataset.bookId = book.id;
      checkbox.dataset.field = field.key;
      checkbox.addEventListener("change", handleCheckboxChange);

      cell.appendChild(checkbox);
      row.appendChild(cell);
    });

    fragment.appendChild(row);
  });

  listElement.replaceChildren(fragment);
}

function handleCheckboxChange(event) {
  const checkbox = event.currentTarget;
  const bookId = checkbox.dataset.bookId;
  const field = checkbox.dataset.field;

  if (!draftEntries[bookId]) draftEntries[bookId] = {};
  draftEntries[bookId][field] = checkbox.checked;

  /* Remove empty book records to keep the browser save small and readable. */
  const hasAnyCheck = Object.values(draftEntries[bookId]).some(Boolean);
  if (!hasAnyCheck) delete draftEntries[bookId];

  isDirty = JSON.stringify(draftEntries) !== JSON.stringify(savedEntries);
  updateInterface();
}

function updateInterface() {
  updateStats();
  saveButton.disabled = !isDirty;
  undoButton.disabled = !isDirty;

  saveStatus.className = `save-status${isDirty ? " is-dirty" : ""}`;
  saveStatus.textContent = isDirty
    ? "Unsaved changes. Save before leaving this page."
    : "No unsaved changes.";
}

function updateStats() {
  let owned = 0;
  let firstEditions = 0;
  let read = 0;

  BOOKS.forEach((book) => {
    const entry = draftEntries[book.id] || {};
    if (entry.hardcover || entry.softcover) owned += 1;
    if (entry.hardcoverFirst || entry.softcoverFirst) firstEditions += 1;
    if (entry.read) read += 1;
  });

  ownedCount.textContent = owned;
  firstCount.textContent = firstEditions;
  readCount.textContent = read;
}

saveButton.addEventListener("click", () => {
  try {
    const savePayload = {
      version: 1,
      savedAt: new Date().toISOString(),
      entries: draftEntries,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savePayload));
    savedEntries = cloneEntries(draftEntries);
    isDirty = false;
    updateInterface();
    saveStatus.className = "save-status is-saved";
    saveStatus.textContent = `Saved on ${new Date().toLocaleString()}.`;
  } catch (error) {
    showStorageError("This browser blocked the save. Check its privacy or storage settings.");
  }
});

/* Undo restores the most recent saved state without deleting that saved state. */
undoButton.addEventListener("click", () => {
  draftEntries = cloneEntries(savedEntries);
  isDirty = false;
  renderBooks();
  updateInterface();
  filterBooks();
});

searchInput.addEventListener("input", filterBooks);

function filterBooks() {
  const query = searchInput.value.trim().toLowerCase();
  document.querySelectorAll("#book-list tr").forEach((row) => {
    row.hidden = query !== "" && !row.dataset.searchText.includes(query);
  });
}

function showStorageError(message) {
  saveStatus.className = "save-status is-error";
  saveStatus.textContent = message;
}

/* Most browsers show their own warning text when a visitor leaves with unsaved work. */
window.addEventListener("beforeunload", (event) => {
  if (!isDirty) return;
  event.preventDefault();
  event.returnValue = "";
});
