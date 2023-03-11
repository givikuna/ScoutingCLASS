// import React from 'react';
// import ReactDOM from 'react-dom/client';

var currentPage;
const maxPage = 6;
const minPage = 1;

var page1;
var page2;
var page3;
var page4;
var page5;
var page6;

var backButton;
var nextButton;
var submitButton;

var pageTitle;
var pitScoutingh1;
var partName;

//

function launch(file) {
    if (file == "index") {
        currentPage = 1;
    }
    setUpVals();
    backButton.display = "none";
    submitButton.display = "none";
    namer();
}

function setUpVals() {
    page1 = document.getElementById('page1');
    page2 = document.getElementById('page2');
    page3 = document.getElementById('page3');
    page4 = document.getElementById('page4');
    page5 = document.getElementById('page5');
    page6 = document.getElementById('page6');

    backButton = document.getElementById('backButton');
    nextButton = document.getElementById('nextButton');
    submitButton = document.getElementById('submitButton');

    pageTitle = document.getElementById('pageTitle');
    pitScoutingh1 = document.getElementById('pitScouting');
    partName = document.getElementById("partName");
}

function namer() {
    switch(currentPage) {
        case 1:
            partName.innerHTML = "PRE-MATCH";
            break;
        case 2:
            partName.innerHTML = "AUTON";
            break;
        case 3:
            partName.innerHTML = "TELEOP";
            break;
        case 4:
            partName.innerHTML = "ENDGAME";
            break;
        case 5:
            partName.innerHTML = "MISCELLANEOUS";
            break;
        case 6:
            partName.innerHTML = "";
            break;
    }
}

function next() {
    setUpVals();
    currentPage += 1;

    if (currentPage === 1) {
        backButton.display = "none";
        submitButton.display = "none";
        nextButton.display = "block";
    } else if (currentPage === 6) {
        backButton.display = "block";
        submitButton.display = "block";
        nextButton.display = "none";
    } else {
        backButton.display = "block";
        submitButton.display = "none";
        nextButton.display = "block";
    }

    namer();
    catchInfo();
}

function catchInfo() {
    //
}

function back() {
    //
}

function submit() {
    //
}

function isDisplayed(id) {
    if (document.getElementById(id).display == "none") {
        return false;
    }
    return true;
}

function hide(id) {
    if (document.getElementById(id).display != "block") {
        document.getElementById(id).display = "none";
    }
}

function show(id) {
    if (document.getElementById(id).display != "none") {
        document.getElementById(id).display = "block";
    }
}
