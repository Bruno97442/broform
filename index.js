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

document.addEventListener('mouseenter', e =>{
        let form = e.path.find(ele => ele.localName === 'form' && ele.classList.contains('broform'))
    if(form){
        let f = new FormController(form)
        f.run()
    }
})
