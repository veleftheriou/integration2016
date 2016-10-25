/**
 * Created by Alex on 11/10/2016.
 */

// fonctions utilitaires
function setElem(id, v){
    // place la valeur v dand l'élément d'identifiant id
    document.getElementById(id).innerHTML = v;
}
function addElem(id, v){
    // ajoute la valeur v à l'élément d'identifiant id
    document.getElementById(id).innerHTML += v;
}
function getElem(id){
    // renvoie le contenu de l'élément d'identifiant id
    return document.getElementById(id).innerHTML;
}



var cart = [];
var tmp = [];

//fonction pour montrer l'onglet selectionné
function showBox(n) {

    hide('menu');
    hide('entrees');
    hide('plats');
    hide('desserts');
    hide('boissons');
    hide('commande');

    document.getElementById(n).style.display='block';
}

//fonction qui cache les autres onglets
function hide(id) {
    document.getElementById(id).style.display='none';
}


//fonction pour récupérer les données d'un "item" (entrée, plat...)
function getItem(a) {
    item = document.getElementById(a + 'Nom').textContent;
    add(a,item);
    console.log(tmp);
    drawCommand();
}


//fonction pour push dans un tableau tmp
function add(val1, val2){
    tmp.push(val2,val1);
}

function addQuant(val1,val2){
    tmp.push(val1);
    addCart(val2)
}

function addCart(val){
    cart.push({ val : tmp});
    tmp = [];
}

function onSubmit() {
        addCart();
        $.ajax({
            type: 'POST',
            data: JSON.stringify(cart),
            contentType: 'application/json',
            url: '/process_post'
        });

    $(document).ready(function(){
        $('.btn-success').popover({trigger: "focus", content: "commande envoyée", placement: "bottom"});
    })
}

//fonction qui affiche le résumé de la commande
function drawCommand(){
     setElem('temp', '');
     for (var i = 0, c = tmp.length; i < c; i+=2) {
         st = '<div class=thumbnail id=\"'
             + tmp[i+1]
             + ' \"><div class=\"caption-full\"><h4><a href=\"#\">'
             + tmp[i]
             + '</a></h4></div></div>';
         addElem('temp',st);
     }
}

function affiche(){
    $(document).ready(function(){
        $('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
    });
}

 //rajouter dans ma fonction submit

//partie js pour incrémenter et décrémenter la quantité
var res = document.getElementById('result');
result = parseInt(res.value,10);

var plus = document.getElementById('plus');
var moins = document.getElementById('moins');

// prendre en compte la modification du nombre au clavier
res.addEventListener('blur', function() {
    result = document.getElementById('result');
    result = parseInt(result.value,10);
});

// boutton +
plus.addEventListener('click', function() {
    if(result >= 0 && result < 99){
        result++;
        document.getElementById('result').value= result;
    }
});

// boutton -
moins.addEventListener('click', function() {
    if(result > 0 && result <= 99){
        result--;
        document.getElementById('result').value= result;
    }
});