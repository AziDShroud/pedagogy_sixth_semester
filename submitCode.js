function submitCode() {
    console.clear();
   const code = document.getElementById("codeArea").value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

    let feedback = [];

    let forCount = (code.match(/ΓΙΑ/g) || []).length;
    let whileCount = (code.match(/ΟΣΟ/g) || []).length;
    let untilCount = (code.match(/ΜΕΧΡΙΣ_ΟΤΟΥ/g) || []).length;
    

    let hasStart = code.includes("ΑΡΧΗ");
    let hasEnd = code.includes("ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ");

    
    if (!(hasStart && hasEnd)) {
        feedback.push("Λείπει βασική δομή Αλγορίθμου (ΑΡΧΗ / ΤΕΛΟΣ).");
    }


    if (forCount >= 2 ){
        syntaxcheckerforForloop(code, feedback, forCount);
    }else if( whileCount >= 2 ){
        syntaxforWhileloop(code, feedback);
    }else if(untilCount >= 2 ){
        syntaxforUntilloop(code, feedback);
    }else if(forCount >= 1 && whileCount >= 1) {
        syntaxcheckerforForloop(code, feedback, forCount);
        syntaxforWhileloop(code, feedback);
    }else if(forCount >= 1 && untilCount >= 1){
        syntaxcheckerforForloop(code, feedback, forCount);
        syntaxforUntilloop(code, feedback);
    }else if(whileCount >= 1 && untilCount >= 1) {
        syntaxforWhileloop(code, feedback);
        syntaxforUntilloop(code, feedback);
    } else {
        feedback.push("Δεν χρησιμοποιείς εμφωλευμένες δομές επανάληψης.");
    }

    const initialized = [...code.matchAll(/([a-zα-ω_]+)\s*<-\s*-?\d+/gi)]
        .map(m => m[1]);

    const updated = [...code.matchAll(/([a-zα-ω_]+)\s*<-\s*\1\s*\+\s*1/gi)]
        .map(m => m[1]);

   

    let missingUpdates = initialized.filter(v => !updated.includes(v));

    if (missingUpdates.length > 0) {
        feedback.push("Κάποιες μεταβλητές αρχικοποιούνται αλλά δεν ενημερώνονται σωστά.");
    }
    
    // --- General success feedback ---

    let hasNegative = feedback.some(msg => {
        let text = msg.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

        return (
            text.includes("δεν") ||
            text.includes("λειπει") || 
            text.includes("λειπουν")||
            text.includes("ελλιπης")
        );
    });

    if (!hasNegative) {
        feedback.push("Πολύ καλή δουλειά! Η λύση σου φαίνεται σωστή και ολοκληρωμένη.");
    }



 // --- Output as spoilers ---
    const outputArea = document.getElementById("outputArea");
    outputArea.innerHTML = "<b>Ανατροφοδότηση (πάτησε για εμφάνιση):</b><br><br>";

    feedback.forEach(item => {
    let div = document.createElement("div");
    div.textContent = "• " + item;
    outputArea.appendChild(div);
    if (item.toLowerCase().includes("λείπει") || item.toLowerCase().includes("λειπουν") || item.toLowerCase().includes("δεν")) {
        div.style.color = "red";
    } else {
        div.style.color = "green";
    }
    });

}



function syntaxcheckerforForloop(code, feedback, forCount){

    let forLines = code.match(/ΓΙΑ[^\n\r]*/g) || [];
    let closeCount = (code.match(/ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ/g) || []).length;

    let wrongLines = 0;

    forLines.forEach(line => {

        let parts = line.trim().split(/\s+/);

        if (parts.length < 6) {
            wrongLines++;
            return;
        }
     });

    if (closeCount < forCount) {
        wrongLines++;
        feedback.push("Λείπουν κάποια ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ.");
    }

    if  (wrongLines==1){
         feedback.push("Ελλιπής σύνταξη σε μία δομή ΓΙΑ.");
    }else if(wrongLines>1){
         feedback.push("Ελλιπής σύνταξη στις δομές ΓΙΑ.");
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


