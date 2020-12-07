import { inputType, regexObject } from "../config.js";
import { Csscompiler } from "./Csscompiler.js";

import { FormEntity } from "./Formentity.js";
import { InputAlert } from "./Inputalert.js";


/**
  * @class FormController
  */
export class FormController {

    /**
     * @var {HTMLFormElement} form 
     */
    _form;
    get form() {
        return this._form;
    }
    set form(value) {
        this._form = value;
    }

    /**
     * @var {string} formSelector
     */
    _formSelector;
    get formSelector() {
        return this._formSelector;
    }
    set formSelector(value) {
        this._formSelector = value;
    }

    readyToSendForm = [];

    formObject

    /**
      * @constructor
      * @param {HTMLFormElement} form 
      * @param {string} event Eventlistener event default : "keyup"
      * @param {boolean} alertMsgStyle "yes" | "no" default : "yes"
      */
    constructor(form, event = 'keyup', alertMsgStyle = "yes") {
        this.form = form;
        this.event = event;
        this.inputs = Array.from(this.form.querySelectorAll('input[name]'))
        this.regexObject = regexObject
        this.inputType = inputType
        if (alertMsgStyle === "yes") {
            this.cssStyle = new Csscompiler()
            this.cssStyle.createStyleSheet()
        }
    }

    /**
     * enclenche le controle
     */
    run() {

        // gestion de la soumission
        this.form.addEventListener("submit", e => {
            this.readyToSendForm = this.formController()

            if (this.readyToSendForm) {
                this.formObject = new FormEntity(document.querySelector('form'))
            }else{
                e.preventDefault();
            }
        })

        // gestion des controle
        this.inputs.forEach(input => {
            input.alert = new InputAlert(input)
            input.addEventListener(this.event, e => {
                e.stopPropagation();
                this.fieldController(input)
            })
        })
    }

    /**
     * 
     * @return {boolean} formulaire bien rempli
     */
    formController() {
        let formState = []
        this.inputs.forEach(input => formState.push(this.fieldController(input)))

        return formState.every(x => x)
    }

    /**
     * 
     * @param {HTMLInputElement} input 
     * @return {boolean} champs bien rempli
     */
    fieldController(input) {

        // récupère le tableau de directive des filtres regex
        let infoArray = this.inputType[input.getAttribute('type')].split(' '),
            state = []

        // pour chaque filtre ecrit l'état de validation du champs dans le dataset
        infoArray.forEach((element) => {
            let match = !!input.value.match(this.regexObject[element][0])
            input.dataset[element] = match
            state.push(match)
        });
        input.alert.displayManager()

        return state.every(x => x)
    }

}


