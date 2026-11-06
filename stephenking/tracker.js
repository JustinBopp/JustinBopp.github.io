/*
  STEPHEN KING COLLECTION TRACKER
  ===============================
  This file does three jobs:
  1. Stores the book list in one easy-to-edit place.
  2. Builds the checkbox table automatically.
  3. Loads and saves one shared collection using Firebase Realtime Database.

  CLOUD SETUP
  -----------
  The only value that belongs outside this file is the database URL in
  cloud-config.js. If that URL is blank, this script falls back to browser-local
  storage so the page still works while Firebase is being set up.

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

/* All shared data lives at this single, intentionally public Firebase path. */
const CLOUD_PATH = "stephenKingCollection.json";
const HISTORY_PATH = "stephenKingHistory.json";
const HISTORY_DISPLAY_LIMIT = 12;

const listElement = document.querySelector("#book-list");
const searchInput = document.querySelector("#book-search");
const saveButton = document.querySelector("#save-button");
const undoButton = document.querySelector("#undo-button");
const reloadButton = document.querySelector("#reload-button");
const saveStatus = document.querySelector("#save-status");
const cloudStatus = document.querySelector("#cloud-status");
const historyList = document.querySelector("#history-list");
const historyStatus = document.querySelector("#history-status");
const historyRefreshButton = document.querySelector("#history-refresh-button");
const ownedCount = document.querySelector("#owned-count");
const firstCount = document.querySelector("#first-count");
const readCount = document.querySelector("#read-count");
const totalCount = document.querySelector("#total-count");

let savedEntries = {};
let draftEntries = {};
let isDirty = false;
let storageMode = "loading";
let cloudEtag = null;
let cloudUpdatedAt = null;
let historySnapshots = [];

const databaseUrl = normalizeDatabaseUrl(
  window.STEPHEN_KING_CLOUD?.databaseUrl || ""
);

totalCount.textContent = BOOKS.length;
renderBooks();
updateInterface();
initializeTracker();

/*
  Load the shared ledger when configured. The local fallback preserves the original
  behavior while setup is incomplete, but clearly labels saves as device-only.
*/
async function initializeTracker() {
  if (!databaseUrl) {
    storageMode = "local";
    savedEntries = loadLocalEntries();
    draftEntries = cloneEntries(savedEntries);
    cloudStatus.className = "cloud-status is-local";
    cloudStatus.textContent = "Cloud setup is incomplete. Saves currently stay on this device.";
    historyStatus.textContent = "Saved-state history becomes available after cloud setup.";
    historyRefreshButton.disabled = true;
    renderBooks();
    updateInterface();
    return;
  }

  await loadSharedLedger(false);
}

function normalizeDatabaseUrl(url) {
  return url.trim().replace(/\/+$/, "");
}

function getCloudEndpoint() {
  return `${databaseUrl}/${CLOUD_PATH}`;
}

function getHistoryEndpoint() {
  return `${databaseUrl}/${HISTORY_PATH}`;
}

async function loadSharedLedger(isManualReload) {
  storageMode = "loading";
  saveButton.disabled = true;
  undoButton.disabled = true;
  reloadButton.disabled = true;
  cloudStatus.className = "cloud-status";
  cloudStatus.textContent = "Loading the shared ledger...";

  try {
    const response = await fetch(getCloudEndpoint(), {
      headers: { "X-Firebase-ETag": "true" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Shared ledger returned ${response.status}.`);

    const payload = await response.json();
    cloudEtag = response.headers.get("ETag");
    cloudUpdatedAt = payload?.updatedAt || null;
    savedEntries = sanitizeEntries(payload?.entries || {});
    draftEntries = cloneEntries(savedEntries);
    storageMode = "cloud";

    /* A new database has no document yet, so its first explicit Save initializes it. */
    isDirty = payload === null;
    cloudStatus.className = "cloud-status";
    cloudStatus.textContent = payload
      ? `Shared ledger connected${formatUpdatedAt(payload.updatedAt)}.`
      : "Shared ledger connected and ready to be initialized.";

    renderBooks();
    updateInterface();
    filterBooks();

    if (isManualReload) {
      saveStatus.className = "save-status is-saved";
      saveStatus.textContent = "Latest shared collection loaded.";
    }

    await loadHistory();
  } catch (error) {
    storageMode = "error";
    cloudStatus.className = "cloud-status is-error";
    cloudStatus.textContent = "The shared ledger could not be reached. Saving is disabled.";
    showStorageError("Check the Firebase URL and rules, then reload the shared ledger.");
    updateInterface();
  } finally {
    reloadButton.disabled = false;
  }
}

function formatUpdatedAt(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : `; last saved ${date.toLocaleString()}`;
}

/* Ignore unexpected cloud keys and accept only the five boolean checkbox fields. */
function sanitizeEntries(entries) {
  const cleanEntries = {};

  BOOKS.forEach((book) => {
    const sourceEntry = entries[book.id];
    if (!sourceEntry || typeof sourceEntry !== "object") return;

    FIELDS.forEach((field) => {
      if (typeof sourceEntry[field.key] !== "boolean") return;
      if (!cleanEntries[book.id]) cleanEntries[book.id] = {};
      cleanEntries[book.id][field.key] = sourceEntry[field.key];
    });
  });

  return cleanEntries;
}

/* Read the legacy local save used only until the shared database is configured. */
function loadLocalEntries() {
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
  const savingIsAvailable = storageMode === "cloud" || storageMode === "local";
  saveButton.disabled = !isDirty || !savingIsAvailable;
  undoButton.disabled = !isDirty || !savingIsAvailable;

  if (storageMode === "loading" || storageMode === "error" || storageMode === "conflict") return;

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

function getEntryStats(entries) {
  let owned = 0;
  let firstEditions = 0;
  let read = 0;

  BOOKS.forEach((book) => {
    const entry = entries[book.id] || {};
    if (entry.hardcover || entry.softcover) owned += 1;
    if (entry.hardcoverFirst || entry.softcoverFirst) firstEditions += 1;
    if (entry.read) read += 1;
  });

  return { owned, firstEditions, read };
}

/* Fetch recovery points and show the newest twelve without deleting older states. */
async function loadHistory() {
  if (!databaseUrl) return;

  historyRefreshButton.disabled = true;
  historyStatus.className = "history-status";
  historyStatus.textContent = "Loading saved states...";

  try {
    const response = await fetch(getHistoryEndpoint(), { cache: "no-store" });
    if (!response.ok) throw new Error(`History returned ${response.status}.`);

    const payload = (await response.json()) || {};
    historySnapshots = Object.entries(payload)
      .map(([key, snapshot]) => ({
        key,
        savedAt: snapshot?.savedAt || "",
        entries: sanitizeEntries(snapshot?.entries || {}),
      }))
      .filter((snapshot) => snapshot.savedAt)
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    renderHistory();
  } catch (error) {
    historyStatus.className = "history-status is-error";
    historyStatus.textContent = "Saved states could not be loaded. Check the Firebase history rules.";
  } finally {
    historyRefreshButton.disabled = false;
  }
}

function renderHistory() {
  historyList.replaceChildren();

  if (historySnapshots.length === 0) {
    historyStatus.textContent = "No recovery points yet. The first global save will create one.";
    return;
  }

  const visibleSnapshots = historySnapshots.slice(0, HISTORY_DISPLAY_LIMIT);
  const fragment = document.createDocumentFragment();

  visibleSnapshots.forEach((snapshot) => {
    const item = document.createElement("li");
    item.className = "history-item";

    const identity = document.createElement("div");
    const date = document.createElement("time");
    const parsedDate = new Date(snapshot.savedAt);
    date.className = "history-date";
    date.dateTime = snapshot.savedAt;
    date.textContent = Number.isNaN(parsedDate.getTime())
      ? snapshot.savedAt
      : parsedDate.toLocaleString();

    const key = document.createElement("span");
    key.className = "history-key";
    key.textContent = `State ${snapshot.key.slice(-8)}`;
    identity.append(date, key);

    const stats = getEntryStats(snapshot.entries);
    const summary = document.createElement("p");
    summary.className = "history-summary";
    summary.textContent = `${stats.owned} owned / ${stats.firstEditions} first editions / ${stats.read} read`;

    const restoreButton = document.createElement("button");
    restoreButton.className = "button button-secondary";
    restoreButton.type = "button";
    restoreButton.textContent = "Restore this state";
    restoreButton.addEventListener("click", () => restoreSnapshot(snapshot));

    item.append(identity, summary, restoreButton);
    fragment.appendChild(item);
  });

  historyList.appendChild(fragment);
  historyStatus.className = "history-status";
  historyStatus.textContent = historySnapshots.length > HISTORY_DISPLAY_LIMIT
    ? `Showing the ${HISTORY_DISPLAY_LIMIT} newest of ${historySnapshots.length} saved states.`
    : `${historySnapshots.length} saved state${historySnapshots.length === 1 ? "" : "s"} available.`;
}

function restoreSnapshot(snapshot) {
  draftEntries = cloneEntries(snapshot.entries);
  isDirty = JSON.stringify(draftEntries) !== JSON.stringify(savedEntries);
  renderBooks();
  updateInterface();
  filterBooks();

  saveStatus.className = isDirty ? "save-status is-dirty" : "save-status is-saved";
  saveStatus.textContent = isDirty
    ? "Older state loaded. Press Save changes to restore it globally."
    : "That saved state already matches the current shared collection.";

  document.querySelector("#ledger-heading").scrollIntoView({ behavior: "smooth" });
}

function entriesFingerprint(entries) {
  return JSON.stringify(entries);
}

/* Append-only snapshots cannot be changed or deleted under the supplied rules. */
async function createHistorySnapshot(entries, savedAt) {
  const fingerprint = entriesFingerprint(entries);
  const alreadySaved = historySnapshots.some(
    (snapshot) => entriesFingerprint(snapshot.entries) === fingerprint
  );
  if (alreadySaved) return true;

  const snapshotPayload = {
    version: 1,
    savedAt: savedAt || new Date().toISOString(),
    entries,
  };

  const response = await fetch(getHistoryEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshotPayload),
  });
  if (!response.ok) return false;

  const result = await response.json();
  historySnapshots.unshift({
    key: result.name,
    savedAt: snapshotPayload.savedAt,
    entries: cloneEntries(entries),
  });
  return true;
}

saveButton.addEventListener("click", async () => {
  if (storageMode === "cloud") {
    await saveSharedLedger();
    return;
  }

  saveLocalLedger();
});

async function saveSharedLedger() {
  saveButton.disabled = true;
  undoButton.disabled = true;
  reloadButton.disabled = true;
  saveStatus.className = "save-status";
  saveStatus.textContent = "Saving the shared collection...";

  try {
    /* Preserve the currently shared state before replacing it. */
    const previousStateBackedUp = await createHistorySnapshot(
      savedEntries,
      cloudUpdatedAt || new Date().toISOString()
    );

    const savePayload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      entries: draftEntries,
    };

    const response = await fetch(getCloudEndpoint(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "If-Match": cloudEtag || "null_etag",
      },
      body: JSON.stringify(savePayload),
    });

    if (response.status === 412) {
      storageMode = "conflict";
      saveStatus.className = "save-status is-error";
      saveStatus.textContent = "Someone else saved first. Reload the shared ledger before editing again.";
      cloudStatus.className = "cloud-status is-error";
      cloudStatus.textContent = "A newer shared version is available; your changes were not overwritten.";
      return;
    }

    if (!response.ok) throw new Error(`Shared save returned ${response.status}.`);

    savedEntries = cloneEntries(draftEntries);
    isDirty = false;
    cloudUpdatedAt = savePayload.updatedAt;
    await refreshCloudEtag();
    storageMode = "cloud";
    const newStateBackedUp = await createHistorySnapshot(
      savedEntries,
      savePayload.updatedAt
    );
    renderHistory();
    updateInterface();
    saveStatus.className = "save-status is-saved";
    saveStatus.textContent = previousStateBackedUp && newStateBackedUp
      ? `Saved globally with a recovery point on ${new Date().toLocaleString()}.`
      : `Saved globally on ${new Date().toLocaleString()}, but history could not record this state.`;
    cloudStatus.className = "cloud-status";
    cloudStatus.textContent = "Shared ledger connected; this saved collection is now visible to everyone.";
  } catch (error) {
    storageMode = "error";
    showStorageError("The global save failed. Your unsaved checks are still visible on this page.");
  } finally {
    reloadButton.disabled = false;
    saveButton.disabled = !isDirty || storageMode !== "cloud";
    undoButton.disabled = !isDirty || storageMode !== "cloud";
  }
}

/* Fetch only the current ETag after saving so the next edit has collision protection. */
async function refreshCloudEtag() {
  const response = await fetch(getCloudEndpoint(), {
    headers: { "X-Firebase-ETag": "true" },
    cache: "no-store",
  });
  if (response.ok) cloudEtag = response.headers.get("ETag");
}

function saveLocalLedger() {
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
    saveStatus.textContent = `Saved on this device at ${new Date().toLocaleString()}.`;
  } catch (error) {
    showStorageError("This browser blocked the save. Check its privacy or storage settings.");
  }
}

/* Undo restores the most recent saved state without deleting that saved state. */
undoButton.addEventListener("click", () => {
  draftEntries = cloneEntries(savedEntries);
  isDirty = false;
  renderBooks();
  updateInterface();
  filterBooks();
});

/* Reload intentionally discards unsaved browser changes and fetches the global version. */
reloadButton.addEventListener("click", async () => {
  if (storageMode === "local") {
    savedEntries = loadLocalEntries();
    draftEntries = cloneEntries(savedEntries);
    isDirty = false;
    renderBooks();
    updateInterface();
    filterBooks();
    return;
  }

  await loadSharedLedger(true);
});

historyRefreshButton.addEventListener("click", loadHistory);

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
