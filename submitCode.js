function submitCode() {

    const code = document.getElementById("codeArea").value
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    let normalizedStudent = code
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    let feedback = [];


    let currentSolution =
        solutions["case" + window.currentProblemType];

    

    let forCount =
        (code.match(/ΓΙΑ/g) || []).length;

    let whileCount =
        (code.match(/ΟΣΟ/g) || []).length;

    let untilCount =
        (code.match(/ΜΕΧΡΙΣ_ΟΤΟΥ/g) || []).length;


    let hasStart =
        normalizedStudent.includes("ΑΡΧΗ");

    let hasEnd =
        normalizedStudent.includes("ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ") ||
        normalizedStudent.includes("ΤΕΛΟΣ ΠΡΟΓΡΑΜΜΑΤΟΣ");

    if (!(hasStart && hasEnd)) {

        feedback.push(
            "Λείπει βασική δομή Αλγορίθμου (ΑΡΧΗ / ΤΕΛΟΣ)."
        );

    }

    if(normalizedStudent.length > 0){
        currentSolution.requiredKeywords.forEach(keyword => {

            let normalizedKeyword = keyword
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            
            
            if (!normalizedStudent.includes(normalizedKeyword)) {

                feedback.push(
                    "Λείπει το στοιχείο: " + keyword
                );

            }

        });
    }else{
        feedback.push(
            "Ο κώδικας είναι κενός. Παρακαλώ γράψε το πρόγραμμα σου."
        );
    }

    currentSolution.requiredLoops.forEach(loopType => {

        if (loopType === "ΓΙΑ") {

            if (forCount < 2) {

                feedback.push(
                    "Χρειάζονται δύο εμφωλευμένες επαναλήψεις ΓΙΑ."
                );
            

            } else {

                syntaxcheckerforForloop(
                    code,
                    feedback,
                    forCount
                );

            }

        }

        else if (loopType === "ΟΣΟ") {

            if (whileCount < 2) {

                feedback.push(
                    "Χρειάζονται δύο εμφωλευμένες επαναλήψεις ΟΣΟ."
                );

            } else {

                syntaxforWhileloop(
                    code,
                    feedback
                );

            }

        }

        else if (loopType === "ΜΕΧΡΙΣ_ΟΤΟΥ") {

            if (untilCount < 2) {

                feedback.push(
                    "Χρειάζονται δύο εμφωλευμένες επαναλήψεις ΜΕΧΡΙΣ_ΟΤΟΥ."
                );

            } else {

                syntaxforUntilloop(
                    code,
                    feedback
                );

            }

        }

    });


    const initialized =
        [...code.matchAll(/([A-ZΑ-Ω_]+)\s*<-\s*-?\d+/gi)]
        .map(m => m[1]);

    const updated =
        [...code.matchAll(/([A-ZΑ-Ω_]+)\s*<-\s*\1\s*\+\s*1/gi)]
        .map(m => m[1]);

    let missingUpdates =
        initialized.filter(v => !updated.includes(v));


    if (initialized.length === 0) {

        feedback.push(
            "Δεν αρχικοποιείται κάποια/ες μεταβλητή/ές."
        );

    }

    if (missingUpdates.length > 0) {

        feedback.push(
            "Κάποιες μεταβλητές αρχικοποιούνται αλλά δεν ενημερώνονται σωστά."
        );

    }



    let hasNegative = feedback.some(msg => {

        let text = msg
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        return (
            text.includes("δεν") ||
            text.includes("λειπει") ||
            text.includes("λειπουν") ||
            text.includes("χρειαζονται") ||
            text.includes("πρεπει") ||
            text.includes("λαθος") ||
            text.includes("ελλιπ")||
            text.includes("κενος")
        );

    });

    if (!hasNegative) {

        feedback.push(
            "Πολύ καλή δουλειά! Η λύση σου φαίνεται σωστή και ολοκληρωμένη."
        );

    }



 // --- Output as spoilers ---
    const outputArea = document.getElementById("outputArea");
    outputArea.innerHTML = "<b>Ανατροφοδότηση για τον κώδικα σου:</b><br>";

    feedback.forEach(item => {
        let div = document.createElement("div");
        div.textContent = "• " + item;
        outputArea.appendChild(div);
        let text = item
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        if (text.includes("λειπει") ||text.includes("κενος")|| text.includes("λειπουν") || text.includes("χρειαζονται")|| text.includes("πρεπει")|| text.includes("δεν") || text.includes("λαθος") || text.includes("ελλιπ")) {
            div.style.color = "red";
        } else {
            div.style.color = "green";
        }
    });
   
}



function syntaxcheckerforForloop(code, feedback, forCount) {

    let forLines = code.match(/ΓΙΑ[^\n\r]*/gi) || [];

    let closeCount =
        (code.match(/ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ/gi) || []).length;

    let wrongLines = 0;

    forLines.forEach(line => {

        let cleanLine = line
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();

        let parts = cleanLine.split(/\s+/);

        // Example:
        // ΓΙΑ Ι ΑΠΟ 1 ΜΕΧΡΙ 5

        let hasVariable =
            parts.length > 1 &&
            parts[1] !== "ΑΠΟ";

        let apoIndex =
            parts.indexOf("ΑΠΟ");

        let mexriIndex =
            parts.indexOf("ΜΕΧΡΙ");

        let hasAPO = apoIndex !== -1;
        let hasMEXRI = mexriIndex !== -1;

        let hasStartNumber =
            hasAPO &&
            apoIndex + 1 < parts.length &&
            !isNaN(parseInt(parts[apoIndex + 1]));

        let hasEndNumber =
            hasMEXRI &&
            mexriIndex + 1 < parts.length &&
            !isNaN(parseInt(parts[mexriIndex + 1]));

        let lineHasError = false;

        if (!hasVariable) {
            feedback.push("Σε μία δομή ΓΙΑ λείπει μεταβλητή μετά το ΓΙΑ.");
            lineHasError = true;
        }

        if (!hasAPO) {
            feedback.push("Σε μία δομή ΓΙΑ λείπει το ΑΠΟ.");
            lineHasError = true;
        }

        if (!hasStartNumber) {
            feedback.push("Σε μία δομή ΓΙΑ λείπει αριθμός μετά το ΑΠΟ.");
            lineHasError = true;
        }

        if (!hasMEXRI) {
            feedback.push("Σε μία δομή ΓΙΑ λείπει το ΜΕΧΡΙ.");
            lineHasError = true;
        }

        if (!hasEndNumber) {
            feedback.push("Σε μία δομή ΓΙΑ λείπει αριθμός μετά το ΜΕΧΡΙ.");
            lineHasError = true;
        }

        if (lineHasError) {
            wrongLines++;
        }

    });

    if (closeCount < forCount) {
        wrongLines++;
        feedback.push("Λείπουν κάποια ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ.");
    }

    if (wrongLines === 0) {
        feedback.push("Όλες οι δομές ΓΙΑ έχουν σωστή μορφή.");
    }
}
    

function syntaxforWhileloop(code, feedback){
   
    let whileLines = code.match(/ΟΣΟ[^\n\r]*ΕΠΑΝΑΛΑΒΕ[^\n\r]*/g) || [];

    let startCount = (code.match(/ΟΣΟ[\s\S]*?ΕΠΑΝΑΛΑΒΕ/g) || []).length;
    let untilCount = (code.match(/ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ/g) || []).length;
    let noCondition = 0;

    if (startCount < untilCount) {
        feedback.push("Λείπουν κάποιες ΟΣΟ.");
    }else 
        if(startCount> untilCount){
            feedback.push("Λειπουν καποια/ο ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ")
        }

    whileLines.forEach(line => {
        let hasCondition =
            /ΟΣΟ\s+.+(<=|>=|<>|=|<|>).+/i.test(line);

        if (!hasCondition) {
            noCondition++
        }
    });

    if (noCondition==1){
         feedback.push("Ελλιπής σύνταξη σε μία δομή ΟΣΟ.");
    }else if(noCondition > 1){
         feedback.push("Ελλιπής σύνταξη στις δομές ΟΣΟ.");
    }

   }


function syntaxforUntilloop(code, feedback){
    let untilLines = code.match(/ΜΕΧΡΙΣ_ΟΤΟΥ[^\n\r]*/g) || [];

    let startCount = (code.match(/ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ/g) || []).length;
    let untilCount = (code.match(/ΜΕΧΡΙΣ_ΟΤΟΥ/g) || []).length;
    let noCondition = 0;

    if (startCount < untilCount) {
        feedback.push("Λείπουν κάποιες ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ.");
    }

    untilLines.forEach(line => {
        let hasCondition =
            /ΜΕΧΡΙΣ_ΟΤΟΥ\s+.+(<=|>=|<>|=|<|>).+/i.test(line);
        if (!hasCondition) {
            noCondition++
        }
    });

     if (noCondition==1){
         feedback.push("Ελλιπής σύνταξη σε μία δομή Μεχρις_Οτου.");
    }else if(noCondition > 1){
         feedback.push("Ελλιπής σύνταξη στις δομές Μεχρις_Οτου.");
    }
}
