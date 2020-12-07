import { FormController } from "./app/Formcontroller.js";

document.querySelectorAll("form.broform").forEach(form => {
    console.log(form)
    let f = new FormController(form)
    f.run()

})