import { Csscompiler } from "./Csscompiler.js";
// import { config } from "../config";
import { FormEntity } from "./Formentity.js";
import { InputAlert } from "./Inputalert.js";


/**
  * @class FormController
  */
export class FormController {

    /**
     * @member {HTMLFormElement} form 
     */
    _form;
    get form() {
        return this._form;
    }
    set form(value) {
        this._form = value;
    }

    /**
     * @member {HTMLFormElement} form
     */
    _form;
    get form() {
        return this._form;
    }
    set form(value) {
        this._form = value;
    }

    readyToSendForm = [];

    formObject

    /**
      * @constructor
      * @param {HTMLFormElement} form 
      * @param {String{}} param1.inputType 
      * @param {Object{}} param1.regexObject 
      * @param {Object{}} param1.alertMsg 
      * @param {string} event Eventlistener event default : "keyup"
      * @param {boolean} alertMsgStyle "yes" | "no" default : "yes"
      */
    constructor(
        form,
        {
            inputType = {
                text: "empty name mi3",
                number: "empty num",
                password: "empty low upp spe mi8",
                email: "empty email",
                address: "empty text mi8",
                date: "empty"
            },
            regexObject = {
                low: [/[a-z]+/, /[^a-z]+/],
                upp: [/[A-Z]+/, /[^A-Z]+/],
                name: [/^[a-z A-Z-éè^éôîûñ]+$/],
                text: [/^[a-z A-Z0-9-éè^éôîùûñà.()?'*&#+:;ç!]+$/],
                hyp: [/-/],
                num: [/\d+/, /\D+/],
                alu: [/[\w-]+/],
                spe: [/[&#\\\-çà@$£%*µ,?^¨"';.~:\/!§]+/],
                mi3: [/.{3}/],
                mi8: [/.{8}/],
                email: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
                password: [/^[\w]$/],
                empty: [/^\w+/]
            },
            alertMsg = {
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
            event = "keyup",
            alertMsgStyle = "yes"
        }={}
    ) {

        this.form = form;
        this.event = event;

        this.inputs = Array.from(form.querySelectorAll("input[name]"))

        this.regexObject = regexObject
        this.inputType = inputType
        this.alertMsg = alertMsg
        if (alertMsgStyle === "yes") {

            this.cssStyle = new Csscompiler()
            this.cssStyle.createStyleSheet()
        }
    }

    /**
     * @method
     * @description enclenche le controle
     */
    run() {

        // gestion de la soumission
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.readyToSendForm = this.formValidate()

            if (this.readyToSendForm) {
                this.formObject = new FormEntity(document.querySelector("form"))
                this.form.submit()
            }
        })

        // gestion des controles
        this.inputs.forEach(input => {
      
            input.alert = new InputAlert(input, this.alertMsg)
            input.addEventListener(this.event, e => {
                e.stopPropagation();
                this.fieldValidate(input)
            })
        })
    }

    /**
     * @method
     * @description vérifie tous les champs du formulaire
     * @return {boolean} formulaire bien rempli
     */
    formValidate() {
        let formState = []
        this.inputs.forEach((input, i) => formState.push(this.fieldValidate(input, 200 * i + 1)))

        return formState.every(x => x)
    }

    /**
     * @method
     * @description vérifie un champs
     * @param {HTMLInputElement} input 
     * @param {Number} delay avant animation
     * @return {boolean} champs bien rempli
     */
    fieldValidate(input, delay = 0) {

        // récupère le tableau de directive des filtres regex
        let infoArray = this.inputType[input.getAttribute("type")].split(" "),
            state = []

        // pour chaque filtre ecrit l'état de validation du champs dans le dataset
        infoArray.forEach((element) => {
            let match = !!input.value.match(this.regexObject[element][0])
            input.dataset[element] = match
            state.push(match)
        });

        input.alert.displayManager(delay)

        return state.every(x => x)
    }

}


