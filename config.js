export const Config = {
    inputType : {
        text: "empty name mi3",
        number: "empty num",
        password: "empty low upp num spe mi8",
        email: "empty email",
        address: "empty text mi8",
        date: "empty",
        time: "empty",
        month: "empty"
    },
    regexObject : {
        low: /[a-z]+/,
        upp: /[A-Z]+/,
        name: /^[a-z A-Z-éè^éôîûñ]+$/,
        text: /^[a-z A-Z0-9-éè^éôîùûñà.()?'*&#+:;ç!]+$/,
        hyp: /-/,
        num: /\d+/,
        alu: /[\w-]+/,
        spe: /\W+/,
        mi3: /.{3}/,
        mi8: /.{8}/,
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /^[\w]$/,
        empty: /^\S+/
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
    ,
    event : "keyup",
    alertMsgStyle : "yes"
}
