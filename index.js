// import { config } from "./config";
import { FormController } from "./app/Formcontroller.js";

document.querySelectorAll("form.broform").forEach(form => {
    let f = new FormController(form)
    f.run()

})