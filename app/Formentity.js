
export class FormEntity {

    /**
     * 
     * @param {HTMLFormElement} form 
     */
    constructor(form) {

        form.querySelectorAll('input[name]').forEach(input => 
            this[input.name] = input.value ?? null
        )
    }
}