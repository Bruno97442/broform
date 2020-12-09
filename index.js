import { Config } from "./config.js";
import { FormController } from "./app/Formcontroller.js";

document.querySelectorAll("form.broform").forEach(form => {
    const f = new FormController(form)
    f.run()
})

