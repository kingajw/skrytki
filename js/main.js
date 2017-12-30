'use strict';
class Skrytka {
    constructor(id,pass,item) {
        this.id = id;
        this.pass = pass;
        this.item = item;
    }
}

var skrytki = [];
var otwarta = new Skrytka();

//dodawanie i otwieranie skrytek

function dodajSkrytke() {
    let temp = new Skrytka();
    temp.id = $("#id").val();
    temp.pass = $("#password").val();
    let itemki = $("#items").val();
    temp.item = itemki.split(",");
    if (!temp.id) {
        alert("Podaj numer skrytki");
    }
    else if (!testID(temp.id)){
        alert("Numer skrytki musi zawierać tylko cyfry");
    }
    else if (!testPassword(temp.pass)) {
        alert("Nieprawidłowe hasło");
        //document.getElementById("info").style.color='red';
    }
    else if (!itemki) {
        alert("Skrytka nie może być pusta");
    }
    else {
        let skrytka = skrytki.find(function (obj) {
            return obj.id===temp.id;
        })
        if (skrytka !== undefined) {
            alert("Skrytka o takim numerze już istnieje");
        }
        else {
            skrytki.push(temp);
            document.getElementById("alert").style.display='block';
            $("#dodano").text("Dodano skrytkę nr "+temp.id);
            setTimeout(function() {$("#alert").hide('blind', {}, 500)}, 3000);
            $("#id").val('');
            $("#password").val('');
            $("#items").val('');
        }
    }
}

function wypiszZawartosc() {
    otwarta.id = $("#id_search").val();
    otwarta.pass = $("#password_search").val();
    let skrytka = skrytki.find(function (obj) {
        return obj.id === otwarta.id;
    });
    if (skrytka === undefined) {
        alert("Nie ma takiej skrytki :(")
    }
    else if (skrytka.pass === otwarta.pass) {
        $("#wynik").text(skrytka.item);
    }
    else
    {
        alert("Nieprawidłowe hasło!");
    }
}

//funkcje pomocnicze

function testPassword(pass) {
    if(pass.length>7){
        let pattern = new RegExp("[a-zA-Z\d\W]+");
        return pattern.test(pass);
    }
}

function testID(id) {
    let pattern = new RegExp("^[0-9]+$");
    return pattern.test(id);
}

function dodajItem() {
    let nowyItem = $("#newItem").val();
    $.each(skrytki,function () {
        if (this.id === otwarta.id) {
            this.item.push(nowyItem);
            $("#wynik").text(this.item);
        }
    });
}

function usunItem() {
    let nowyItem = $("#newItem").val();
    $.each(skrytki,function () {
        if (this.id === otwarta.id && this.item.indexOf(nowyItem)>=0) {
            let index = this.item.indexOf(nowyItem);
            this.item.splice(index,1);
            $("#wynik").text(this.item);
        }
        else {
            alert("Nie ma takiego elementu w skrytce");
        }
    })
}

// pokaz odpowiednia sekcje po kliknieciu utworz/otworz
function pokazNowa(elem) {
    let utworz=document.getElementById("utworzNowa");
    let otworz=document.getElementById("otworzIstniejaca");
    if (elem.id==="utworz") {
        utworz.style.display = 'block';
        otworz.style.display = 'none';
    }
    else if (elem.id==="otworz") {
        otworz.style.display = 'block';
        utworz.style.display = 'none';
    }
}
