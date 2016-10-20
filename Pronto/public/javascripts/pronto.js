/**
 * Created by Alex on 11/10/2016.
 */


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
    temp = document.getElementById("temp");
    temp.textContent = tmp;
}


//fonction pour push dans un tableau tmp
function add(val1, val2){
    tmp.push(val2,val1);
}

function addQuant(val1,val2){
    tmp.push(val1);

}

function addCart(){
    cart.push({ commande : tmp});
    tmp = [];
}

function submit() {
    addCart();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(cart),
        contentType: 'application/json',
        url: '/process_post'
    });
    location.reload();
    return false;
}