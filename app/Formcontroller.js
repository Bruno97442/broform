import { Csscompiler } from "./Csscompiler.js";
import { Config } from "../config.js";
import { FormEntity } from "./Formentity.js";
import { InputAlert } from "./Inputalert.js";


/**
 * Assiste l'utilisateur dans le remplissage d'un formulaire
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
     * @member {Boolean} readyToSendForm
     */
    readyToSendForm = false;

    /**
     * @member {FormEntity} formObject instance du gestionnaire de formulaire
     */
    formObject

    /**
      * @constructor
      * @param {HTMLFormElement} form 
      * @param {Object.<{inputType : Object, regexObject : Object, alertMsg : Object}>} param1
      * @param {Config.<String>} param1.inputType
      * @param {Config.<RegExp>} param1.regexObject 
      * @param {Config.<Object>} param1.alert 
      * @param {Config.<Object>} param1.alert.message 
      * @param {Config.alert.<String>} param1.alert.style [alertMsgStyle : "yes"] {"yes" | "no"}
      * @param {String} event Eventlistener event, default : "keyup"
      */
    constructor(
        form,
        {
            inputType = {
                text: "empty name mi3",
                number: "empty num",
                password: "empty low upp num spe mi8",
                email: "empty email",
                address: "empty text mi8",
                date: "empty",
                time: "empty",
                month: "empty"
            },
            regexObject = {
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
            alert = {
                message: {
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
                },
                style: "yes"
            },
            event = "keyup",
        } = {}
    ) {

        this.config = Config

        // si l'utilisateur modifie la configuration dans le constructeur, ces valeurs écraseront la config ou la completera par défault
        if (arguments[1]) {
            Object.entries(arguments[1]).forEach(ele =>
                typeof ele[1] === "object"

                    ? Object.entries(ele[1]).forEach(underEle => {
                        typeof underEle[1] === "object" && ele[0] !== "regexObject"

                            ? Object.entries(underEle[1]).forEach(under2Ele =>
                                this.config[ele[0]][underEle[0]][under2Ele[0]] = under2Ele[1]
                            )

                            : this.config[ele[0]][underEle[0]] = underEle[1]
                    }
                    )
                    : this.config[ele[0]] = ele[1]
            )
        }


        this.form = form;
        this.event = event;
        this.inputs = Array.from(form.querySelectorAll("input[name]:not([type=radio]"))
        this.regexObject = this.config.regexObject
        this.inputType = this.config.inputType
        this.alertMsg = this.config.alert.message
        if (this.config.alert.style === "yes") {

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
            let match = !!input.value.match(this.regexObject[element])
            input.dataset[element] = match
            state.push(match)
        });

        input.alert.displayManager(delay)

        return state.every(x => x)
    }

}


