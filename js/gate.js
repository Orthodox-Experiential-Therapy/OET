/* ============================================================
   Passcode gate (reputational privacy, not real security).
   Anyone who views this file's source can find the hash and,
   with effort, brute-force a short passcode — this only keeps
   the site off search engines and away from casual visitors.

   TO CHANGE THE PASSCODE:
   1. Open this site in a browser, open the developer console
      (F12), and run:
        crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPasscode'))
          .then(buf => console.log(Array.from(new Uint8Array(buf))
            .map(b => b.toString(16).padStart(2,'0')).join('')));
   2. Copy the printed hex string.
   3. Paste it in place of GATE_HASH below.
   ============================================================ */

const GATE_HASH = "818c2207ce1667f813ccffb175672bb944b9b9a39d6c89b5211530404bee29c5";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const gateForm = document.getElementById("gate-form");
const gateInput = document.getElementById("gate-input");
const gateError = document.getElementById("gate-error");

if (gateForm) {
  gateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = gateInput.value.trim();
    if (!value) return;

    let hash;
    try {
      hash = await sha256Hex(value);
    } catch (err) {
      // crypto.subtle requires HTTPS (or localhost). GitHub Pages serves
      // over HTTPS by default, so this should only happen in odd setups.
      gateError.textContent = "Couldn't verify the passcode in this browser context.";
      gateError.hidden = false;
      return;
    }

    if (hash === GATE_HASH) {
      try { localStorage.setItem("oet_unlocked", "1"); } catch (e) {}
      document.documentElement.classList.add("oet-unlocked");
      gateError.hidden = true;
    } else {
      gateError.hidden = false;
      gateError.classList.remove("shake");
      // restart animation
      void gateError.offsetWidth;
      gateError.classList.add("shake");
      gateInput.value = "";
      gateInput.focus();
    }
  });
}
