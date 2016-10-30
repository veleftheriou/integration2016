/**
 * Created by Alex on 11/10/2016.
 */

// fonctions utilitaires
function setElem(id, v){
    document.getElementById(id).innerHTML = v;
}
function addElem(id, v){
    document.getElementById(id).innerHTML += v;
}
function getElem(id){
    return document.getElementById(id).innerHTML;
}


var tmp = {}; //objet temporaire avec plat(ou boisson...) et commentaire
var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var table;
var garcon;
var element = 0; //pour incrémenter les elem (numero uniquement)

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
    addTmp(a,item,'ici le commentaire');
    drawCommand();
}

//fonction qui affiche le résumé de la commande
function drawCommand(){
    setElem('tempCom', '');
    var i = 0;
    var j = 0;
    for (var elem in plats) {
        i++;
        st = '<h4 class=\"pull-right\"><input id=\"'
            + elem
            +'Bouton'
            + i
            + '\" class=\"btn btn-default\" type=\"button\" value=\"-\" /></h4>'
            +'<div class=thumbnail id=\"'
            + elem
            +'Nom'
            + i
            + ' \"><div class=\"caption-full\"><h4><a href=\"#\">'
            + plats[elem].Nom;
            + '</a></h4></div></div>';
        addElem('tempCom',st);
    }
    for (var elem in boissons) {
        j++;
        st = '<h4 class=\"pull-right\"><input id=\"'
            + elem
            +'Bouton'
            + i
            + '\" class=\"btn btn-default\" type=\"button\" value=\"-\" /></h4>'
            +'<div class=thumbnail id=\"'
            + elem
            +'Nom'
            + i
            + ' \"><div class=\"caption-full\"><h4><a href=\"#\">'
            + boissons[elem].Nom;
            + '</a></h4></div></div>';
        addElem('tempCom',st);
    }
}

//fonction pour changer le garçon de salle
function setGarcon(nom){
    garcon = nom.textContent;
    setElem('garconCom', garcon);
}

//fonction pour changer la table
function setTable(nom){
    table = nom.textContent;
    setElem('tableCom', table);
}

//fonction pour push dans un tableau tmp
function addTmp(typeTemp, nom, comment){
    var type = typeTemp.substring(0,typeTemp.length-1);
    tmp['Nom'] = nom;
    tmp['Categorie'] = type;
    tmp['Detail'] = comment;
    if(type=='boisson'){
        tmp['Accompagnements'] = "acc";
        tmp['Supplements'] = "supp";
    }

    if(type=='boisson'){
        addToTab(boissons,tmp);
        console.log(boissons);
    }
    else{
        addToTab(plats,tmp);
        console.log(plats);
    }
}

function addToTab(tab,ajout){
    element++;
    var elem = "elem" + element;
    tab[elem] = ajout;
    tmp = {};
}

/*
function addQuant(val1,val2){
    tmp.push(val1);
    addCart(val2)
}
*/

function addCom(){
    com['boissons'] = boissons;
    com['plats'] = plats;
}

function addCart(val){
    addCom();
    cart['idCommande'] = 'à définir';
    cart['idTable'] = table;
    cart['idGarcon'] = garcon;
    cart['commande'] = com;
    console.log(cart);
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
    });
    raz();
}

function raz(){
    setElem('tempCom', '');
    setElem('garconCom', '');
    setElem('tableCom', '');
    tmp = {};
    cart = {};
}

function affiche(){
    $(document).ready(function(){
        $('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
    });
}





//fonctions pour les + et -

$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Désolé, la valeur minimal est atteinte');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Désolé, la valeur maximale est atteinte');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});













//fonction pour créer les éléments (entrées, plats...) de l'interface avec variables de la bdd mysql

/*
<div class="thumbnail" id="entree1">
    <div class="caption-full">
    <h4 class="pull-right" id="entree1Prix">$21</h4>
    <h4><a href="#" onmouseover="affiche()" class="link_ingredient" id="entree1Nom">HEIRLOOM TOMATO & WATERMELON GAZPACHO</a></h4>
<h4 class="pull-right">
    <input id="moinsEntree1" class="btn btn-default" type="button" value="-" />
    <input id ="resultEntree1" class="btn btn-default" type="texte" value="0" maxlength="2" />
    <input id="plusEntree1" class="btn btn-default" type="button" value="+" onclick="getItem('entree1')"/>
    </h4>
    <!-- <p id="entree1Desc">jumbo lump crab, avocado, herb oil.</p> -->
<textarea class="form-control" rows="2" id="commententree1" placeholder="Commentaires: "></textarea>
    </div>
    </div>
    */