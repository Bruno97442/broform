import { FormController } from "./app/Formcontroller.js";

document.querySelectorAll("form.broform").forEach(form => {
    const f = new FormController(form,
        // {
        //     alert: {
        //         message: {
        //             text: 'a',
        //             upp: "..b",
        //             hyp: "..c",
        //             num: "..d",
        //         }
        //     }
        // }
        )
    f.run()
})

