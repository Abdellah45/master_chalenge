const doneBtn = document.querySelector(".btn label");
const theSpan = document.querySelector(".progress .outline span");
const wall_timer = document.querySelector(".wall_timer");
let unice = Math.floor(((new Date).getTime() + 3600000) / 86400000);
if (localStorage.getItem("unic") !== null){
    if (unice > localStorage.getItem("unic")){
        if (localStorage.getItem("pers")>=localStorage.getItem("ver")){
            console.log("0");
        }else{
            if(localStorage.getItem("pers")!== null){
                localStorage.setItem("pers",parseInt(localStorage.getItem("pers")) + 1);
            }else{
                localStorage.setItem("pers",1);
            }
        }
        localStorage.removeItem("check");
        checkWid();
    }
}
checkWid();

 if (localStorage.getItem("check") !== null){
    document.querySelector(".not_clicked .btn").classList.add("hid");
    document.querySelector(".clicked").classList.remove("hid");
    document.querySelector(".time").animate([
      { height: 0 },
      { height: `${((100 / 86400000) * (86400000 - (((((new Date).getTime() + 3600000) / 86400000) - (Math.floor(((new Date).getTime() + 3600000) / 86400000))) * 86400000)))}%` }
            ], 2000);
 }
 function checkWid(){
    if(localStorage.getItem("pers") !== null){
        let dpers = `${(parseInt(localStorage.getItem("pers")) * (100/90))}`;
        theSpan.dataset.pers = dpers.substring(0,3) + "%";
        document.querySelector(".outline").dataset.day = `Day ${localStorage.getItem("pers")}`;
     }else{
        theSpan.dataset.pers = 0 + "%";
        document.querySelector(".outline").dataset.day = `Day ${0}`;
     }
 }

 window.onload = function (){
    document.querySelector(".progress .outline span").animate([
        {width:0},
        {width:theSpan.dataset.pers}
    ],1000)
 }

 theSpan.style.width = theSpan.dataset.pers;




 doneBtn.onclick = function (){
    setTimeout(()=>{
        if (document.querySelector(".btn input").checked === true){
                document.querySelector(".not_clicked .btn").classList.add("hid");
                document.querySelector(".clicked").classList.remove("hid");
                localStorage.setItem("check","");
                if(localStorage.getItem("ver")!== null){
                    localStorage.setItem("ver",parseInt(localStorage.getItem("ver")) + 1);
                }else{
                    localStorage.setItem("ver",1);
                }
                localStorage.setItem("unic",Math.floor(((new Date).getTime() + 3600000) / 86400000))
            }
            timeSet(86400000);
            document.querySelector(".progress .outline span").animate([
                {width:0},
                {width:theSpan.dataset.pers}
            ],1000);
            document.querySelector(".time").animate([
              { height: 0 },
              { height: `${((100 / 86400000) * (86400000 - (((((new Date).getTime() + 3600000) / 86400000) - (Math.floor(((new Date).getTime() + 3600000) / 86400000))) * 86400000)))}%` }
                            ], 2000);
            theSpan.style.width = theSpan.dataset.pers;
    },300)
 }

//  localStorage.clear();
// localStorage.setItem("day",Math.floor((new Date).getTime() / 86400000));
// localStorage.setItem("day",19376)



function timeSet(Mday){
    let dMind = ((new Date).getTime() + 3600000);
    let Deday = Math.floor(dMind / Mday);
    let Neday = (dMind / Mday);
    let ImpThing = Mday - ((Neday - Deday) * Mday);
    let hou = Math.floor(ImpThing / 3600000);
    let min = Math.floor((ImpThing - (hou * 3600000)) / 60000);
    let sec = Math.floor((ImpThing - ((min * 60000) + (hou * 3600000))) / 1000);
    let StrDate = `<span>${hou}</span> : <span>${min}</span> : <span>${sec}</span>`;

    wall_timer.querySelector(".time_cont").innerHTML = StrDate;

    wall_timer.querySelectorAll(".time_cont span").forEach(span =>{
        if(((span.innerHTML.split("")).length) === 1){
            span.innerHTML = `0${span.innerHTML}`;
        }
    });

    let persHei =  (100 / Mday) * ImpThing;
    
    document.querySelector(".time").style.height = `${persHei}%`;
   
    if(((Math.floor(dMind / 1000)) / 86400) === Deday){
      window.location.reload();
    }
}

setInterval(()=>{
    timeSet(86400000);
},1000)