const hamburgerIconMenu = document.querySelector('.hamburger');
const crossMarkIcon = document.querySelector('.bx-x');
const menu = document.querySelector('nav');
const menuMobile = document.querySelector('.container-menu-mobile')
const lien = document.querySelectorAll('nav a'); //selectionner tous les a dans nav
const head = document.querySelector('header');
const section = document.querySelectorAll('section');
const monnom = document.querySelector('.monnom');
const bienvenu = document.querySelector('.bienvenu');
const cv = document.querySelector('.cv1');
const language = document.querySelectorAll('.lang');
const iconreseau = document.querySelector('.iconhome');
const bouton = document.querySelector('.bouton');
const hireme = document.querySelector('.hirenavbouton');
const itemProject = document.querySelectorAll(".item-project");
const body = document.querySelector("body")
const dataKey = document.querySelectorAll('[data-key]')
const placeholderDataKey = document.querySelectorAll("[data-placeholder-key]")





// changer langue

let activeLang = "ANG"

language.forEach((lang)=>{    

    lang.addEventListener("click",()=>{
        
        console.log("lang cliqué")
        setLanguage()     
        // alert (activeLang)   
        // alert(setLanguage)

    })
})



function setLanguage () {

    if (activeLang==="FR") {
       activeLang = "ANG"       
    } else {
        activeLang = "FR"
    }


    fetch(`lang/${activeLang}.json`)
    .then (        
        (res)=>
            
            {
                // console.log(res)
               alert("fetch ok" + res.status)
                return res.json()

                
            }
    )
    .then((res)=>
        
        {
            dataKey.forEach(datakey=>{

                let key = datakey.getAttribute("data-key")

                let parts = key.split(".")           

                

                if (datakey.tagName === "INPUT" || datakey.tagName==="TEXTAREA" ) {
                    datakey.placeholder = res[parts[0]][parts[1]]
                    // console.log("last debug",parts[0], parts[1], res[parts[0]])
                }

                else {
                     datakey.textContent = res[parts[0]][parts[1]]
                }



                // console.log("last debug",parts[0], parts[1], res[parts[0]])

                // console.log("getAttribute : ", key, "parts" , parts , "datakey.textContent : ", datakey.textContent)
        

            })

        }

    )
    .catch(error => {
        console.log("error" , error)
    } )

}





// fin changer langue
















//menu mobile : hamburger et crossMark

function toggleMenu() {
    body.classList.toggle("menu-active")

}

function closeMenu() {
    body.classList.remove("menu-active")
}


hamburgerIconMenu.addEventListener("click",toggleMenu)

lien.forEach(unLien => {
    unLien.addEventListener("click",closeMenu)
})





hamburgerIconMenu.addEventListener("click",()=>{
    
    console.log("hamburger menu icon cliqué")
})

crossMarkIcon.addEventListener("click",()=>{
    closeMenu()
    console.log("cross mark cliqued")
})


















//les item projet 
itemProject.forEach(item=>

    {

        const titre = item.querySelector(".titre-projet");

            item.addEventListener("mouseenter",()=>{
            
            titre.classList.add("hovering")
       
        })


        item.addEventListener("mouseleave",()=>{
           
            titre.classList.remove("hovering")

        })

        item.addEventListener("click",()=>{
            
            if(item.dataset.link) {
                window.open(item.dataset.link, "_blank")
            }

        })

    }

)























//gestion des item menu sur desktop
if (window.innerWidth >= 768) {

    //changer le style des éléments nav ouvert avec le desktop

        // quand on clique
            lien.forEach(function(unlien) { 

                function navouvert() {

                    lien.forEach(function(l)
                {
                    l.classList.remove('active-link');
                });

                unlien.classList.add('active-link');

                }

                unlien.addEventListener("click",navouvert);
            
                }); 
        //fin de quand on clique   


        //faire apparaitre le nav quand on scroll vers le bas
        const head = document.querySelector('header');
        
        let currentmove = 0;
        let lastmove ;      
        
        window.addEventListener("scroll", () => {

            lastmove=window.scrollY;

            let houb = lastmove-currentmove;          
            

            if (houb>0 ) {
               
                // console.log("baisser");

                currentmove = lastmove;

                head.classList.add('unactive');
                head.classList.remove('active-link');
                
                


                
            } else {
                // console.log("monter");
                
                currentmove = lastmove;
                // console.log("Monter");
                head.classList.add('active-link');
                head.classList.remove('unactive');

                if (window.scrollY===0) {

                    
                    console.log("sommet");

                    head.classList.remove('unactive');
                    head.classList.remove('active-link');
                    
                    }


                section.forEach(function(s) { //pour detecter le navitem acitve.

                    let bottomsection = s.getBoundingClientRect().bottom;
                    let topsection = s.getBoundingClientRect().top;
                   

                    if ((bottomsection < window.innerHeight/2) || (topsection>=window.innerHeight/2) ) {                        
                        // console.log("titre non actif : ",s.id);                      
                                            
                    }  else if ((bottomsection>=window.innerHeight/2)|| (topsection<window.innerHeight/2) ) {
                    //    console.log("titre actif : ",s.id);                       
                       
                       lien.forEach((item) => {
                            
                            if (item.getAttribute('href')===`#${s.id}`) {
                                                          
                                item.classList.add('active-link');
                                
                            } 

                            else {
                                item.classList.remove('active-link');
                            }
                            
                       });
                       
                    }
                    
                } )

            }

        })       
        
             


        
}



