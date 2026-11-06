# Shared Ledger Setup

GitHub Pages can display the tracker but cannot store visitors' edits. The page
is already wired to use a Firebase Realtime Database for one shared collection.
Only the database itself and its URL still need to be supplied.

## One-Time Setup

1. Open [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In the project, open **Build > Realtime Database** and choose **Create Database**.
3. Choose a nearby database location and start in **Locked mode**.
4. Open the database's **Rules** tab.
5. Replace the rules there with the contents of `firebase-rules.json`, then publish them.
6. Copy the database URL shown at the top of the **Data** tab. It usually resembles
   `https://PROJECT-NAME-default-rtdb.firebaseio.com`.
7. Paste that URL into `cloud-config.js` as the value of `databaseUrl`.
8. Commit and push the `StephenKing` folder.
9. Open the live page once and press **Save changes** to initialize the shared ledger.

## Important Behavior

- Every visitor reads and edits the same collection.
- The database URL is intentionally visible in the website source; it is not a secret.
- The included rules deny access to every other database path, validate the five
  supported checkbox values, and make saved-state history append-only.
- Because writes are public, anyone who finds the hidden page can change the ledger.
- Conditional saves prevent a visitor from silently overwriting a newer save. If two
  people edit at once, the second visitor will be asked to reload the shared version.
- Every successful global save creates a recovery point. Existing recovery points can
  be read and restored through the page, but they cannot be changed or deleted.
