window.currentProblemType = 0;
window.currentValues = {};
function randomNum(min = -1000, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newProblem() {

    let type = Math.floor(Math.random() * 3); 

    let problemText = "";
    let hints = [];

    // --- Random bounds ---
    let A = randomNum();
    let B = randomNum();
    let C = randomNum();
    let D = randomNum();

    // Ensure correct order
    if (A > B) [A, B] = [B, A];
    if (C > D) [C, D] = [D, C];

    // Avoid equal bounds (important)
    if (A === B) B = A + 3;
    if (C === D) D = C + 3;

    // --- Random counts for until ---
    let N = randomNum(1, 1000);
    let M = randomNum(1, 1000);
    let X = Math.min(N,M);
    let Z = Math.max(N,M);
   
    let F = randomNum(X+1,Z-1);
    let G = randomNum(X+1,Z-1);
    while (G === F) {
        G = randomNum(X+1,Z-1);
    }
    if (F > G) {
        [F, G] = [G, F];
    }
    let Y = randomNum(1,G-F);

    
    switch(type) {

      
        case 0:
            window.currentProblemType = 0;
            window.currentValues = {A, B, C, D};
            problemText = `Να αναπτύξετε αλγόριθμο που:
                Για κάθε αριθμό από το ${A} έως το ${B}
                εμφανίζει όλους τους αριθμούς από το ${C} έως το ${D}.

                Χρησιμοποιώντας εμφωλευμένες επαναλήψεις ΟΣΟ.`;

            hints = [
                "Η εξωτερική επανάληψη ελέγχει το διάστημα από το " + A + " έως " + B + ".",
                "Η εσωτερική επανάληψη εμφανίζει αριθμούς από το " + C + " έως " + D + ".",
                "Οι μετρητές για τις επαναλήψεις αρχικοποιόυνται στο αντίστοιχο κατώτατο όριο και τοποθετούνται πριν τις αντίστοιχες επαναλήψεις."
            ];
            break;

       
        case 1:
            window.currentProblemType = 1;
            window.currentValues = {N, M};
            problemText = `Να αναπτύξετε αλγόριθμο που:
                Διαβάζει ${N} ομάδες αριθμών,
                όπου κάθε ομάδα περιέχει ${M} αριθμούς,
                και υπολογίζει το συνολικό άθροισμα.

                Χρησιμοποιώντας εμφωλευμένες επαναλήψεις ΜΕΧΡΙΣ_ΟΤΟΥ.`;

            hints = [
                "Η εξωτερική επανάληψη επαναλαμβάνεται " + N + " φορές (ομάδες).",
                "Η εσωτερική επανάληψη διαβάζει " + M + " αριθμούς και ενημερώνει το άθροισμα.",
                "Οι μετρητές για τις επαναλήψεις αρχικοποιόυνται στο μηδεν και τοποθετούνται πριν τις αντίστοιχες επαναλήψεις."
            ];
            break;

        case 2:
            window.currentProblemType = 2;
            window.currentValues = {X, Z, F, G, Y};
            problemText = `Να αναπτύξετε αλγόριθμο που:
                Για κάθε αριθμό από το από το ${X} εώς το ${Z}
                υπολογίζει και εμφανίζει το αθροισμα των αριθμών από το ${F} εώς το ${G} κατά ${Y}.`;

            hints = [
                "Χρησιμοποίησε δύο εμφωλευμένες επαναλήψεις ΓΙΑ.",
                "Η εξωτερική επανάληψη πηγαίνει από το " + X + " έως το " + Z + ".",
                "Στην εσωτερική επανάληψη, υπολόγισε το άθροισμα από το " + F + " έως το " + G + " αυξάνοντας κατά " + Y + "."
            ];
    }

    // --- Display problem ---
    document.getElementById("problemText").innerText = problemText;

    // --- Hints with progressive unlock ---
    const hintsList = document.getElementById("hintsList");
    hintsList.innerHTML = "";

    hints.forEach((hint, index) => {

        let div = document.createElement("div");
        div.className = "spoiler locked";
        div.textContent = "Hint " + (index + 1);

        if (index === 0) {
            div.classList.remove("locked");
        }

        div.onclick = function () {

            if (div.classList.contains("locked")) return;

            div.textContent = hint;
            div.classList.add("revealed");

            let next = hintsList.children[index + 1];
            if (next) {
                next.classList.remove("locked");
            }
        };

        hintsList.appendChild(div);
    });
}