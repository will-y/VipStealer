require('jquery-ui-dist/jquery-ui')
const fs = require("fs");
let currentData

$.fn.animateRotate = function(angle, duration, easing, complete) {
    return this.each(function() {
        const $elem = $(this);

        $({deg: 0}).animate({deg: angle}, {
            duration: duration,
            easing: easing,
            step: function(now) {
                $elem.css({
                    transform: 'rotate(-' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

$(document).ready(function() {
    $(".add-segment").click(function() {
        currentData.push({
            "text": $("#name").val(),
            "color": $("#color").val()
        })
        reload()
        saveJSON()
    })
    $("#spin").click(function() {
        spin($(".circle"))
    })
})

function createHTML(dataPoint) {
    $(".circle").append(`<li><div class='text'><div class="actual-text">${dataPoint.text}</div></div></li>`)
}

function setCSS(i, dataPoint, offset) {
    $(`ul li:nth-child(${i+1}) .text`).css({"background-color": dataPoint.color})
    $(`ul li:nth-child(${i+1})`).css({"-webkit-transform": `rotate(${i*offset}deg) skewY(-60deg)`,
        "-ms-transform": `rotate(${i*offset}deg) skewY(-60deg)`,
        "transform": `rotate(${i*offset}deg) skewY(-60deg)`})
}

function reload() {
    const offset = 360 / currentData.length
    $(".circle").empty()
    for (let i = 0; i < currentData.length; i++) {
        createHTML(currentData[i])
        setCSS(i, currentData[i], offset);
    }
}

function spin(element) {
    element.css({"transform": "rotate(0)"})
    const rotations = Math.floor(Math.random() * 6) + 10
    const selection = Math.floor(Math.random() * currentData.length);
    console.log(selection)
    const selectionRotation = (360 / currentData.length) * selection
    const offset = (360 / currentData.length) / 2;
    element.animateRotate(360 * rotations + selectionRotation + offset, 2000 * rotations, "easeInOutQuart", function() {
        alert(currentData[selection].text)
    })
}

function saveJSON() {
    fs.writeFileSync('data/data.json', JSON.stringify(currentData))
}

$(function () {
    $.getJSON('data/data.json', function(data) {
        currentData = data
        reload()
    })
})
