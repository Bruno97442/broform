export const config = {
    inputType : {
        text: 'empty name mi3',
        number: 'empty num',
        password: 'empty low upp spe mi8',
        email: "empty email",
        address: "empty text mi8",
        date: "empty"

    },
    regexObject : {
        lowRegex: [/[a-z]+/, /[^a-z]+/],
        uppRegex: [/[A-Z]+/, /[^A-Z]+/],
        nameRegex: [/^[a-z A-Z-éè^éôîûñ]+$/],
        textRegex: [/^[a-z A-Z0-9-éè^éôîùûñà.()?'*&#+:;ç!]+$/],
        hypRegex: [/-/],
        numRegex: [/\d+/, /\D+/],
        aluRegex: [/[\w-]+/],
        speRegex: [/[&#\\\-çà@$£%*µ,?;.~:\/!§]+/],
        mi3Regex: [/.{3}/],
        mi8Regex: [/.{8}/],
        emailRegex: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
        passwordRegex: [/^[\w]$/],
        emptyRegex: [/^\w+/]
    },
    alertMsg : {
        bubbleStart: "Il faut au moins :",
        low: "..une minuscule",
        upp: "..une majuscule",
        hyp: "..tiret",
        num: "..un chiffre",
        alu: "..alfa-numérique uniquement",
        spe: "..un caractère spéciaux",
        mi3: "..3 caractères minimum",
        mi8: "..8 caractères minimum",
        email: "..heu incorrecte",
        name: "..des caractères alphabétiques",
        text: "..alfa-numérique et ponctuation",
        empty: "..l'absence de vide"
    }
}
