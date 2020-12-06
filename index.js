import { FormController } from "./app/Formcontroller.js";

let formController = new FormController('form', 'keyup');
formController.run()



document.querySelectorAll("form.broform").forEach(form => {
    let f = new FormController(form)
    formController.run()

})