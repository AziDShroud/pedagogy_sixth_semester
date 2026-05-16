window.currentProblemType = 0;
window.currentValues = {};
window.solutions = {

    case0: {

        generate: function(A, B, C, D) {

            window.currentProblemType = 0;

            window.currentValues = {A, B, C, D};

            return `
                ΠΡΟΓΡΑΜΜΑ ΕΜΦΑΝΙΣΗ_ΑΡΙΘΜΩΝ
                ΜΕΤΑΒΛΗΤΕΣ
                ΑΚΕΡΑΙΕΣ: i,j
                ΑΡΧΗ

                i <- ${A}

                ΟΣΟ i <= ${B} ΕΠΑΝΑΛΑΒΕ

                    j <- ${C}

                    ΟΣΟ j <= ${D} ΕΠΑΝΑΛΑΒΕ

                        ΓΡΑΨΕ j

                        j <- j + 1

                    ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

                    i <- i + 1

                ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

                ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ`;
                        },

                        requiredLoops: ["ΟΣΟ"],

                        nested: true,

                        requiredKeywords: [
                            "ΑΡΧΗ",
                            "ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ",
                            "ΟΣΟ",
                            "ΕΠΑΝΑΛΑΒΕ",
                            "ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ",
                            "<-"
                        ]

    },



    // =========================================
    // CASE 1 - Nested UNTIL
    // =========================================
    case1: {

        generate: function(N, M) {

            window.currentProblemType = 1;

            window.currentValues = {N, M};

            return `
                ΠΡΟΓΡΑΜΜΑ ΑΘΡΟΙΣΜΑ_ΟΜΑΔΩΝ
                ΜΕΤΑΒΛΗΤΕΣ
                ΑΚΕΡΑΙΕΣ: i, j, x, ΑΘΡ
                ΑΡΧΗ

                ΑΘΡ <- 0
                i <- 0

                ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ

                    i <- i + 1

                    j <- 0

                    ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ

                        j <- j + 1

                        ΔΙΑΒΑΣΕ x

                        ΑΘΡ <- ΑΘΡ + x

                    ΜΕΧΡΙΣ_ΟΤΟΥ j > ${M}

                ΜΕΧΡΙΣ_ΟΤΟΥ i > ${N}

                ΓΡΑΨΕ ΑΘΡ

                ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ`;
                        },

                        requiredLoops: ["ΜΕΧΡΙΣ_ΟΤΟΥ"],

                        nested: true,

                        requiredKeywords: [
                            "ΑΡΧΗ",
                            "ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ",
                            "ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ",
                            "ΜΕΧΡΙΣ_ΟΤΟΥ",
                            "<-",
                            "ΑΘΡ"
                        ]

    },



    // =========================================
    // CASE 2 - Nested FOR
    // =========================================
    case2: {

        generate: function(X, Z, F, G, Y) {

            window.currentProblemType = 2;

            window.currentValues = {X, Z, F, G, Y};

            return `
                ΠΡΟΓΡΑΜΜΑ ΑΘΡΟΙΣΜΑ_ΜΕ_ΓΙΑ
                ΜΕΤΑΒΛΗΤΕΣ
                ΑΚΕΡΑΙΕΣ: i, j, sum
                ΑΡΧΗ

                ΓΙΑ i ΑΠΟ ${X} ΜΕΧΡΙ ${Z}

                    sum <- 0

                    ΓΙΑ j ΑΠΟ ${F} ΜΕΧΡΙ ${G} ΜΕ_ΒΗΜΑ ${Y}

                        sum <- sum + j

                    ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

                    ΓΡΑΨΕ sum

                ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

                ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ`;
                        },

                        requiredLoops: ["ΓΙΑ"],

                        nested: true,

                        requiredKeywords: [
                            "ΑΡΧΗ",
                            "ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ",
                            "ΓΙΑ",
                            "ΑΠΟ",
                            "ΜΕΧΡΙ",
                            "ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ",
                            
                            "ΜΕ_ΒΗΜΑ",
                            "ΓΡΑΨΕ"
                            
                        ]

        }

};