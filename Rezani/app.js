document.getElementById("calculatorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let sirkaFormatu = parseInt(document.getElementById("sirkaFormatu").value);
    let vyskaFormatu = parseInt(document.getElementById("vyskaFormatu").value);
    let sirkaTiskoviny = parseInt(document.getElementById("sirkaTiskoviny").value);
    let vyskaTiskoviny = parseInt(document.getElementById("vyskaTiskoviny").value);
    let okrajLevy = parseInt(document.getElementById("okrajLevy").value);
    let okrajHorni = parseInt(document.getElementById("okrajHorni").value);
    let spadavka = parseInt(document.getElementById("spadavka").value);

    let levy = levyRezy(sirkaFormatu, sirkaTiskoviny, okrajLevy, spadavka);
    vypisRezy(levy, 'levy_rezy');
    document.getElementById('levy_info').innerHTML = `
        <md-list-item>Otočit</md-list-item>
        <md-divider></md-divider>
        <md-list-item>Poslední řez: ${sirkaTiskoviny}</md-list-item>
    `;
    
    let horni = horniRezy(vyskaFormatu, vyskaTiskoviny, okrajHorni, spadavka);
    vypisRezy(horni, 'horni_rezy');
    document.getElementById('horni_info').innerHTML = `
        <md-list-item>Otočit</md-list-item>
        <md-divider></md-divider>
        <md-list-item>Poslední řez: ${vyskaTiskoviny}</md-list-item>
    `;
});

function levyRezy(sirkaFormatu, sirkaTiskoviny, okrajLevy, spadavka) {
    let rezy = [];
    let poziceRezu = sirkaFormatu - okrajLevy;

    while (poziceRezu >= sirkaTiskoviny) {
        rezy.push(poziceRezu);
        poziceRezu -= sirkaTiskoviny;
        if (poziceRezu >= sirkaTiskoviny) {
            rezy.push(poziceRezu);
        }
        poziceRezu -= spadavka;
    }

    return rezy;
}

function horniRezy(vyskaFormatu, vyskaTiskoviny, okrajHorni, spadavka) {
    let rezy = [];
    let poziceRezu = vyskaFormatu - okrajHorni;

    while (poziceRezu >= vyskaTiskoviny) {
        rezy.push(poziceRezu);
        poziceRezu -= vyskaTiskoviny;
        if (poziceRezu >= vyskaTiskoviny) {
            rezy.push(poziceRezu);
        }
        poziceRezu -= spadavka;
    }

    return rezy;
}

function vypisRezy(rezy, idElementu) {
    let element = document.getElementById(idElementu);
    element.innerHTML = '';

    rezy.forEach((rez, index) => {
        let listItem = document.createElement('md-list-item');
        let listItemText = document.createTextNode(`${index + 1}. Řez: ${rez}`);
        listItem.appendChild(listItemText);
        element.appendChild(listItem);
    });
}

