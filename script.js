const boutonhamburger = document.querySelector('.bx-menu-alt-right');
const menu = document.querySelector('nav');
const menuMobile = document.querySelector('.menu-mobile')
const lien = document.querySelectorAll('nav a'); //selectionner tous les a dans nav
const head = document.querySelector('header');
const section = document.querySelectorAll('section');
const monnom = document.querySelector('.monnom');
const bienvenu = document.querySelector('.bienvenu');
const cv = document.querySelector('.cv1');
const lang = document.querySelector('.lang');
const iconreseau = document.querySelector('.iconhome');
const bouton = document.querySelector('.bouton');
const hireme = document.querySelector('.hirenavbouton');
const itemProject = document.querySelectorAll(".item-project");



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


function supprimerajouter() {

    boutonhamburger.classList.toggle('bx-x'); //changer le bouton hamburger en croix
    menu.classList.toggle('active');
    cv.classList.toggle('active'); //cacher le menu
    lang.classList.toggle('active');
    iconreseau.classList.toggle('active');
    bouton.classList.toggle('active');
    hireme.classList.toggle('active');

}


function cachermenu() {
    menu.classList.remove('active');
    cv.classList.remove('active');
    lang.classList.remove('active');
    iconreseau.classList.remove('active');
    bouton.classList.remove('active');
    hireme.classList.add('active');
}


//pour parcourir les "lien" via "unlien"
lien.forEach(function(unlien) {

    unlien.addEventListener("click",cachermenu);

})

//cacher le menu apres chargement de la page
if (menu.classList.contains('active')) {
    cachermenu();
}

//ajouter le click au menu hamburger
boutonhamburger.addEventListener("click",supprimerajouter);


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
               
                console.log("baisser");

                currentmove = lastmove;

                head.classList.add('unactive');
                head.classList.remove('active-link');
                
                


                
            } else {
                // console.log("monter");
                
                currentmove = lastmove;
                console.log("Monter");
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
                        console.log("titre non actif : ",s.id);                      
                                            
                    }  else if ((bottomsection>=window.innerHeight/2)|| (topsection<window.innerHeight/2) ) {
                       console.log("titre actif : ",s.id);                       
                       
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



// changer langue

let traduction = {};
let langactuelle = 'angl';

async function chargertraductions() {
    //await : il met en pause la fonction le temps que la donnée soit prête (ici fetch)
    //fetch() sert à aller chercher des données sur un serveur (par exemple un 
    // fichier JSON ou une page web).
    //then() sert à dire ce qu’on veut faire quand une promesse est réussie (resolved).
    //promesse : c’est quelque chose qu’on attend

    const fr = await fetch('lang/fr.json') .then(res => res.json());
    const angl = await fetch ('lang/angl.json') .then(res => res.json());
    traduction ={fr,angl};
    updatelanguage(langactuelle);
}

chargertraductions();

document.getElementById('lang-switcher').addEventListener('click',() =>

    {
        //if fr alors angla sinon fr
        langactuelle=langactuelle==='fr'?'angl':'fr';
        updatelanguage(langactuelle);
    }

    
);

function updatelanguage(lang) {
    const data = traduction[lang];
    // dataset.key lit la valeur de l’attribut data-key.
    // `split()` sert à **couper une chaîne de caractères** selon un **séparateur** et à **renvoyer un tableau** des morceaux obtenus.

    document.querySelectorAll('[data-key]').forEach(el=> {
        const keys = el.dataset.key.split('.') //ici (ex. "header.title") et on la coupe au niveau du point . pour obtenir : ["header", "title"]
        let value = data;
        keys.forEach(k=> value = value [k]);
        if (value) el.textContent=value;

    });            
}




// fin changer langue