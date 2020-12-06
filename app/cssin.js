export const formCss = [
    `input.right-border, input.wrong-border {transition: 0.5s ease;}`
    ,
    `input.right-border {
    border: 2px solid #30ee30;}`
    ,
    `input.right-border:focus {
    outline: 3px solid #308a30;}`
    ,
    `input.wrong-border {
    border: 2px solid #eb8c8c;}`
    ,
    `input.wrong-border:focus {
    outline: 3px solid #eb8c8c;}`
    ,
    `.d--none {
    display: none;}`
    ,
    `input[data-empty= "false"] + div span.empty ~ span {
    display: none;}`
    ,
    `[class^="alertbubble"] {
        border-radius: 5px;
        position: relative;
        padding: 0.5rem;
        position: "relative";
        margin: -0.5rem 0 0.5rem 0;
        left: "0";
        top: "100%";
        background-color: #eb8c8c;
    }`
    ,
    `[class^="alertbubble"]::before {
        content: "";
        display: block;
        position: absolute;
        left: 23%;
        bottom: 100%;
        border-bottom: 10px solid #eb8c8c;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;`
    ,
    `span.check::before {
        display: inline-block;
        position: absolute;
        width: 2rem;
        height: 2rem;
        color: #a4f130;
        transform: translate(-100%, -40%);
        opacity: 1;
        animation: comeIn 0.5s ease-in;}`
    ,
    `@keyframes comeIn {
        from {
            transform: translate(-300%, -40%);
            opacity: 0;
            border: 50%;
        }
        to {
            transform: translate(-100%, -40%);
            opacity: 1;
        }
    }`
]