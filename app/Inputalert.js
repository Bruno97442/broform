import { alertMsg } from "../config.js";

export class InputAlert {


    displayState = {
        alertBubble: false,
        Check: false,
        info: {}
    }

    /**
     * 
     * @param {HTMLDivElement} alertBubble 
     */
    alertBubble
    /**
     * message unitaire de la bulle
     * @param {HTMLSpanElement{}} alertMsgElementSet 
     */
    alertMsgElementSet = {}

    alertMsgElementSetLast() {
        return this.alertMsgElementSet[this.alertMsgElementSet.length - 1]
    }

    /**
     * 
     * @param {HTMLDivElement} alertCheck 
     */
    alertCheck
    /**
     * 
     * @param {HTMLInputElement} input 
     */
    constructor(input) {
        this.input = input

        this.alertMsg = alertMsg

    }

    /**
     * transforme en tableau le dataset de l'input
     * @return {Array[]} liste de deux cellules [ key, value]
     */
    datasetArray() {
        let obj = this.input.dataset, dataArray = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                dataArray = [...dataArray, { "key": key, "value": obj[key] }];

            }
        }
        return dataArray
    }

    /**
     * 
     */
    displayManager() {
        let infoArray = this.datasetArray()

        // le champs est non valide
        if (!infoArray.every(x => x.value === "true")) {
            this.fieldPainter('wrong')
            if (this.displayState.check) this.alertCheck.remove()

            if (this.displayState.alertBubble === false) {
                this.displayState.alertBubble = true
                this.alertBubble = this.createBubble()
                infoArray.forEach(info => {
                    this.alertMsgElementSet[info.key] = this.createInfo(info.key, this.alertMsg[info.key])
                    this.alertBubble.appendChild(this.alertMsgElementSet[info.key])
                })
                this.input.after(this.alertBubble)
                this.personaMessage(infoArray)

            } else {
                this.personaMessage(infoArray)
                this.alertBubble.children
            }

            this.displayState.check = false

            // le champs est valide
        } else {
            this.fieldPainter('right')

            if (this.alertBubble !== undefined) this.alertBubble.remove() // à animer
            this.displayState.alertBubble = false

            if (!this.displayState.check) {
                this.alertCheck = this.createCheck()

                this.displayState.check = true

            }
        }
    }
    /**
     * Gére l'affichage des avertissement
     * @param {Array} datasetArray
     */
    personaMessage(datasetArray) {
        // vérifier
        datasetArray.forEach(ele => {


            if (this.input.dataset[ele.key] === "true") {

                if (this.alertMsgElementSet[ele.key].classList.containe !== "d--none")
                    this.alertMsgElementSet[ele.key].classList.add("d--none")
            } else {
                this.alertMsgElementSet[ele.key].classList.remove("d--none")

            }
        })
        // si oui display
    }

    createBubble() {
        let alertBubble = document.createElement('div')
        alertBubble.classList = `alertbubble-${this.input.name}`
  
        alertBubble.textContent = this.alertMsg.bubbleStart

        return alertBubble
    }

    createInfo(className, message) {
        let alertSpan = document.createElement('span')
        alertSpan.classList = className
        alertSpan.style.padding = "0.2rem"
        alertSpan.textContent = message

        return alertSpan
    }

    createCheck() {
        let checkMark = document.createElement('span'),
            inputPos = this.input.getBoundingClientRect()

        checkMark.classList = "check fas fa-check fa-lg"
        checkMark.style.position = "relative"

        this.input.after(checkMark)
        console.log(inputPos.height)




        return checkMark
    }

    /**
     * 
     * @param {string} coloring boolean "right" | "wrong"
     */
    fieldPainter(coloring = "") {
        let tab = ['right-border', 'wrong-border']

        switch (coloring) {
            case "right":

                if (!this.input.classList.contains(tab[0])) {
                    this.input.classList.add(tab[0])
                    this.input.classList.remove(tab[1])

                }
                break;

            case "wrong":

                if (!this.input.classList.contains(tab[1])) {
                    this.input.classList.add(tab[1])
                    this.input.classList.remove(tab[0])

                }
                break;

            default:
                tab.forEach(border => { if (this.input.classList.contains(border)) this.input.classList.remove(border) })
                break;
        }

    }

}