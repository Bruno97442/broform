/**
 * @name InputAlert
 * @classdesc gère l'affichage d'alert d'un input
 */
export class InputAlert {

    /**
     * @member {boolean{}}
     */
    displayState = {
        alertBubble: false,
        CheckSign: false
    }

    /**
     * 
     * @member {HTMLDivElement} alertBubble
     * @description message unitaire de la bulle
     */
    alertBubble

    /**
     * @member {HTMLSpanElement{}} alertMsgElementSet 
     * @description objet de la bulle
     */
    alertMsgElementSet = {}

    /**
     * @member {HTMLSpanElement} alertCheckElement
     * @description block de message d'info d'un input
     */
    alertCheckElement

    /**
     * @constructor
     * @param {HTMLInputElement} input 
     * @param {Object} config.alertMsg 
     */
    constructor(input, alertMsg) {
        this.input = input

        this.alertMsg = alertMsg

    }

    /**
     * @method
     * @description transforme en tableau le dataset de l'input
     * @return {Array{key, value}} liste de deux cellules [ key, value]
     */
    datasetArray() {
        let obj = this.input.dataset, dataArray = []

        // variant du for in
        Object.entries(obj).forEach(ele => dataArray = [...dataArray, {key: ele[0] , value: ele[1]}])

        return dataArray
    }

    /**
     * @method
     * @description gère l'affichage des alerts
     * @param {Number} delay avant animation
     */
    displayManager(delay = 0) {
        let infoArray = this.datasetArray(),
            action = () => {

                // le champs est non valide
                if (!infoArray.every(x => x.value === "true")) {
                    this.fieldPainter('wrong')

                    if (this.displayState.CheckSign) this.spanBoundRemove(this.alertCheckElement)

                    if (this.displayState.alertBubble === false) {
                        this.displayState.alertBubble = true
                        this.alertBubble = this.createBubbleDiv(delay)
                        infoArray.forEach(info => {
                            this.alertMsgElementSet[info.key] = this.createInfo(info.key, this.alertMsg[info.key])
                            this.alertBubble.appendChild(this.alertMsgElementSet[info.key])
                        })
                        this.input.after(this.alertBubble)
                        this.personalizeMessage(infoArray)

                    } else {
                        this.personalizeMessage(infoArray)
                    }

                    this.displayState.CheckSign = false

                    // le champs est valide
                } else {
                    this.fieldPainter('right')

                    if (this.alertBubble !== undefined) this.boundRemove(this.alertBubble) // à animer

                    this.displayState.alertBubble = false

                    if (!this.displayState.CheckSign) {
                        this.alertCheckElement = this.createCheckSpan()

                        this.displayState.CheckSign = true

                    }
                }
            }
            // condition pour l'animation du submit
        delay == 0 ? action() :
            setTimeout(() => action(), delay);
    }
    /**
     * @method personalizeMessage 
     * @description Gére l'affichage des conseils
     * @param {Array} datasetArray
     */
    personalizeMessage(datasetArray) {
        // vérifier
        datasetArray.forEach(ele => {


            if (this.input.dataset[ele.key] === "true") {

                if (this.alertMsgElementSet[ele.key].classList.contains !== "d--none")
                    this.alertMsgElementSet[ele.key].classList.add("d--none")
            } else {
                this.alertMsgElementSet[ele.key].classList.remove("d--none")

            }
        })
    }

    /**
     * @method createBubble
     * @param {Number} signalOnSubmit variable delay acheminer pour formValidation
     * @returns {HTMLDivElement}
     */
    createBubbleDiv(signalOnSubmit = 0) {
        let alertBubble = document.createElement('div')

        alertBubble.classList = `alertbubble-${this.input.name} boundComeIn${signalOnSubmit > 0 ? ' warningSubmit' : ""}`

        alertBubble.textContent = this.alertMsg.bubbleStart
        // pour le formvalidation
        if (signalOnSubmit > 0) {
            setTimeout(() => {
                alertBubble.classList.remove('warningSubmit')
            }, 3000);
        }
        return alertBubble
    }

    /**
    * @method createInfo
    * @returns {HTMLSpanElement}
    */
    createInfo(className, message) {
        let alertSpan = document.createElement('span')
        alertSpan.classList = className
        alertSpan.style.padding = "0.2rem"
        alertSpan.textContent = message

        return alertSpan
    }
    /**
    * @method createCheckSpan
    * @returns {HTMLSpanElement}
    */
    createCheckSpan() {
        let container = document.createElement('div'),
            checkMark = document.createElement('span'),
            { x: inputX, y: inputY, width: inputW, height: inputH } = this.input.getBoundingClientRect(),
            spanDim = inputH * 0.9
        container.style.height = 0
        container.append(checkMark)
        this.input.after(container)
        let { x: posX, y: posY } = checkMark.getBoundingClientRect()
        checkMark.classList = "checkSign checkSign-comeIn"
        checkMark.innerText = "✔️"
        checkMark.style.backgroundColor = getComputedStyle(this.input).backgroundColor
        checkMark.style.borderColor = getComputedStyle(this.input).backgroundColor
        checkMark.style.left = Math.floor(posX - inputX + inputW) + "px"
        checkMark.style.top = Math.floor(inputY - posY) + "px"
        checkMark.style.margin = Math.floor(-inputH / 2) + "px 0"
        checkMark.style.width = Math.floor(spanDim) + "px"
        checkMark.style.height = Math.floor(spanDim) + "px"
        checkMark.style.lineHeight = Math.floor(spanDim) * 0.8 + "px"
        checkMark.style.fontSize = Math.floor(spanDim) * 0.4 + "px"

        return container
    }


    /**
     * @method fieldPainter
     * @description insert les classes de bordure ou les enleve
     * @param {string} coloring boolean "right" | "wrong" | any
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

    /**
     * @method spanBoundRemove
     * @description retire un élèment délicatement
     * @param {HTMLElement} HTMLelement 
     */
    spanBoundRemove(HTMLelement) {
        HTMLelement.firstChild.classList.remove("checkSign-comeIn")
        HTMLelement.firstChild.classList.add("checkSign-boundRemove")
        setTimeout(() => {
            HTMLelement.remove()
        }, 500);
    }

    /**
     * @method boundRemove
     * @description retire un élèment délicatement
     * @param {HTMLElement} HTMLelement 
     */
    boundRemove(HTMLelement) {
        HTMLelement.classList.remove("boundComeIn")
        HTMLelement.classList.add("boundRemove")
        setTimeout(() => {
            HTMLelement.remove()
        }, 500);
    }

}