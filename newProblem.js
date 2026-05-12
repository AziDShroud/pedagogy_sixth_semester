function randomNum(min = -1000, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newProblem() {

    let type = Math.floor(Math.random() * 2); // only 2 exercises now

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
    let X = min(N,M);

    switch(type) {

      
        case 0:
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
            problemText = `Να αναπτύξετε αλγόριθμο που:
                Για κάθε αριθμό από το ${M} έως το ${N}
                υπολογίζει και εμφανίζει το άθροισμα των αριθμών από το ${X} έως αυτόν τον αριθμό.

                Χρησιμοποιώντας εμφωλευμένες επαναλήψεις ΓΙΑ.`;

            hints = [
                "Χρησιμοποίησε δύο εμφωλευμένες επαναλήψεις ΓΙΑ.",
                "Η εξωτερική επανάληψη πηγαίνει από το 1 έως το " + N + ".",
                "Σε κάθε επανάληψη, υπολόγισε το άθροισμα από το 1 έως τον τρέχοντα αριθμό."
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