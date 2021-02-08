export const formCss = [
    `input.right-border, input.wrong-border {transition: 0.5s ease;}`
    ,
    `input.right-border {
    border: 2px solid #30ee30;}`
    ,
    `input.right-border:focus {
    box-shadow: 0px 0px 0 0.2rem rgb(48, 238, 48);}`
    ,
    `input.wrong-border {
    border: 2px solid #eb8c8c;}`
    ,
    `input.wrong-border:focus {
    box-shadow: 0px 0px 0 0.2rem #eb8c8c;}`
    ,
    `.d--none {
    display: none;}`
    ,
    `input[data-empty= "false"] + div span.empty ~ span {
    display: none;}`
    ,
    `[class^="alertbubble"] {
        border-radius: 5px;
        pointer-events: none;
        position: absolute;
        padding: 0.5rem;
        margin: -0.5rem 0 0.5rem 0;
        right: "0";
        top: "100%";
        color: #fff;
        background-color: rgb(235 140 140 / 40%);
        transition: 0.4s ease;
    }`
    ,
    `input:hover + [class^="alertbubble"], input:focus + [class^="alertbubble"] {
        background-color: rgb(235 140 140);
        margin: 0rem 0 0.5rem 0;
    }`
    ,
    `[class^="alertbubble"]::before {
        content: "";
        display: block;
        position: absolute;
        left: 50px;
        bottom: 100%;
        border-bottom: 10px solid rgb(235 140 140 / 40%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;}`
    ,
    `input:hover + [class^="alertbubble"]::before, input:focus + [class^="alertbubble"]::before {
        border-bottom: 10px solid rgb(235 140 140);
        }`
    ,
    `.warningSubmit{
        background-color: rgb(235 140 140) !important;
    }`
    ,
    `.warningSubmit::before{
        border-bottom : rgb(235 140 140) !important;
    }`
    ,
    `span.checkSign {
        position: relative;
        display: inline-block;
        border: 3px solid #fff;
        transition: 0.5s ease-in;
        border-radius: 50%;
        text-align: center;
        background: radial-gradient(rgb(255, 255, 255) 57%, rgb(22, 198, 12) 60%);
        transform: translate(-50%, -50%);
        color: #a4f130;
        opacity: 1;}`
        ,
        ` input:focus + div>span.checkSign {
            background: radial-gradient(rgb(255, 255, 255) 45%, rgb(22 198 12) 55%);
    }`
    ,
    `.checkSign-comeIn {
        animation: checkSignComeIn 0.5s ease-in;}`
    ,
    `@keyframes checkSignComeIn {
        from {
            transform: translate(-400%, -50%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }`
    ,
    `.boundComeIn{
        animation: boundComeInAnimate 0.5s ease-out;
    }`
    ,
    `.boundRemove{
        animation: boundRemoveAnimate 0.5s ease-out;
    }`
    ,
    `.checkSign-boundRemove{
        animation: signBoundRemoveAnimate 0.5s ease-in;
    }`
    ,
    `@keyframes signBoundRemoveAnimate{
        0% {transform: translate(-50%, -50%) scale(1); opacity: 1}
        10% {transform: translate(-50%, -50%) scale(1.1); opacity: 1}
        20% {transform: translate(-50%, -50%) scale(1);}
        100% {transform: translate(-50%, -50%) scale(0.5); opacity: 0}
    }`
    ,
    `@keyframes boundComeInAnimate{
        0% {transform: scale(0.5); opacity: 0}
        10% {transform: scale(1.1); opacity: 1}
        30% {transform: scale(0.9);}
        100% {transform: scale(1); opacity: 1}
    }`
    ,
    `@keyframes boundRemoveAnimate{
        0% {transform: scale(1); opacity: 1}
        10% {transform: scale(0.9);}
        30% {transform: scale(1.1); opacity: 1}
        100% {transform: scale(0.5); opacity: 0}
    }`
]