/**
 * créer un object avec les propriétés(key:value) sont les (name:value) des inputs du formulaire soumit
 */
export class FormEntity {


    /**
     * 
     * @param {HTMLFormElement} form 
     */
    constructor(form) {

        form.querySelectorAll('input[name]').forEach(input =>
            !!input.value ? this[input.name] = form[input.name].value : null
        )
    }

    toJson() {
        // let json =  Object.entries(this).forEach( )
        // console.log(json)
    }
}