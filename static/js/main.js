var winW = $(window).width();
var isHelloVisible = false;
$(document).ready(function () {
    /* EXTRA WIDE CENTERING */
    if (winW > 1360) {
        $("#portfolio").css("left", (winW / 2) - 240 + "px");
        $("#philosophy").css("left", (winW / 2) - 420 + "px");
        $("#newsletter").css("left", (winW / 2) - 600 + "px");
        $("#archive").css("left", (winW / 2) - 640 + "px");
    } else {
        $("#philosophy").css("left", "");
        $("#portfolio").css("left", "");
        $("#newsletter").css("left", "");
        $("#archive").css("left", "");
    }
    /* ARCHIVE TOGGLE */
    $(".newsletter-top-right").click(function () {
        $("#newsletter").hide();
        $("#archive").show();
    });
    $(".archive-top-right").click(function () {
        $("#newsletter").show();
        $("#archive").hide();
    });
    $(".philosophy-circle").click(function () {
        $("#philosophy").addClass("philosophy_moved");
        $("#portfolio").addClass("portfolio_moved");
        $("#newsletter").addClass("newsletter_moved");
        $("#archive").addClass("archive_moved");
        event.stopPropagation();
        isHelloVisible = true;
    });
    $("#mobile_why").click(function () {
        $("#philosophy").addClass("philosophy_moved");
        $("#portfolio").addClass("portfolio_moved");
        $("#newsletter").addClass("newsletter_moved");
        $("#archive").addClass("archive_moved");
        event.stopPropagation();
        isHelloVisible = true;
    });
});

function unmovePanels() {
    $("#philosophy").removeClass("philosophy_moved");
    $("#portfolio").removeClass("portfolio_moved");
    $("#newsletter").removeClass("newsletter_moved");
    $("#archive").removeClass("archive_moved");
    isHelloVisible = false;
}

$(window).resize(function () {
    var winW = $(window).width();
    /* EXTRA WIDE CENTERING */
    if (winW > 1360) {
        $("#portfolio").css("left", (winW / 2) - 240 + "px");
        $("#philosophy").css("left", (winW / 2) - 420 + "px");
        $("#newsletter").css("left", (winW / 2) - 600 + "px");
        $("#archive").css("left", (winW / 2) - 640 + "px");
    } else {
        $("#philosophy").css("left", "");
        $("#portfolio").css("left", "");
        $("#newsletter").css("left", "");
        $("#archive").css("left", "");
    }
    /* ARCHIVE TOGGLE */
    if (winW > 1200) {
        $("#newsletter").show();
        $("#archive").show();
    }
});

/*/////////////////////////////////////////*/
/*//////////   Z-INDEX CONTROL   //////////*/
/*/////////////////////////////////////////*/
var zzz = 0;


var currTop = "#philosophy";
var currMiddle = "#portfolio";
$("#philosophy").data("pos", 0);
$("#portfolio").data("pos", 1);
$("#newsletter").data("pos", 2);

currTop = "#philosophy";
function updateMobile(clicked) {
    var mq = window.matchMedia("(max-width: 700px)");
    if (mq.matches && currTop != clicked) {

        $(currTop).data("pos", 1);
        $(currMiddle).data("pos", 2);
        $(clicked).data("pos", 0);
        currMiddle = currTop;
        currTop = clicked;

        /*
            if(clicked == "#philosophy") {
              $("#philosophy").data("pos", 0);          
              $("#portfolio").data("pos", 1);              
              $("#newsletter").data("pos", 2);
            } else if(clicked == "#newsletter") {
              $("#philosophy").data("pos", 1);          
              $("#portfolio").data("pos", 2);              
              $("#newsletter").data("pos", 0);
            } else if(clicked == "#portfolio") {
              $("#philosophy").data("pos", 2);          
              $("#portfolio").data("pos", 0);              
              $("#newsletter").data("pos", 1);
         
          }
          
          if(currTop == "#philosophy" && $(clicked).data("pos") == 2)  {
              (clicked == "#portfolio") ? $("#newsletter").data("pos", 2) : $("#portfolio").data("pos",2);
              $("#philosophy").data("pos", 1);          
           } else {
             $(currTop).data("pos", $(clicked ).data("pos"));
           }
    
          if($("#portfolio").data("pos") == 0 || $("#portfolio").data("pos") == 1) {
              $("#portfolio").css("transform", "translate(0px,0px)");
            } else {
             $("#portfolio").css("transform", "translate(40px,-40px)");
            }
            if($("#newsletter").data("pos") == 0 || $("#newsletter").data("pos") == 1) {
              $("#newsletter, #archive").css("transform", "translate(-40px,40px)");
            } else {
             $("#newsletter, #archive").css("transform", "translate(0px,0px)");
            }
    */
        /*
                $("#philosophy").css("transform", "translate(" + $("#philosophy").data("pos") * 40 + "px," + $("#philosophy").data("pos") * -40 + "px)");
                $("#portfolio").css("transform", "translate(" + (1 - $("#portfolio").data("pos")) * -40 + "px," + (1 - $("#portfolio").data("pos")) * 40 + "px)");    
                $("#newsletter").css("transform", "translate(" + (2 - $("#newsletter").data("pos")) * -40 + "px," + (2 - $("#newsletter").data("pos")) * 40 + "px)");
                $("#archive").css("transform", "translate(" + (2 - $("#newsletter").data("pos")) * -40 + "px," + (2 - $("#newsletter").data("pos")) * 40 + "px)");    
        */
        $("#philosophy").css("z-index", 2 - $("#philosophy").data("pos"));
        $("#portfolio").css("z-index", 2 - $("#portfolio").data("pos"));
        $("#newsletter").css("z-index", 2 - $("#newsletter").data("pos"));
        $("#archive").css("z-index", 2 - $("#newsletter").data("pos"));
    }
}
$(".company").click(function (event) {
    const url = $(this).data('url')
    const openURL = url.match(/https?\:/) ? url : "https://" + url
    window.open(openURL, "_blank");
});

$("#philosophy").click(function (event) {
    if(isHelloVisible) {
        unmovePanels(); 
    } else {
        updateMobile("#philosophy");
    }
    event.stopPropagation();
});
$("#portfolio").click(function (event) {
    if(isHelloVisible) {
        unmovePanels();
    } else {
        updateMobile("#portfolio");
    }
    event.stopPropagation();
});
$("#newsletter, #archive").click(function (event) {
    if(isHelloVisible) {
        unmovePanels();
    } else {
        updateMobile("#newsletter");
    }
    event.stopPropagation();
});

// Timer is used to make sure the hover effect takes place with a delay 
$("#portfolio, #philosophy").hover(function () {
    if(isHelloVisible) return;
    zzz = zzz + 10;
    var thiswindow = $(this);
    timer = setTimeout(function(){ thiswindow.css('z-index', zzz);}, 150);
}, function() {
    // on mouse out, cancel the timer
    clearTimeout(timer);
});

$("#newsletter, #archive").hover(function () {
    if(isHelloVisible) return;
    zzz = zzz + 10;
    var thiswindow = $(this);
    timer = setTimeout(function(){$("#archive").css('z-index', zzz - 5);$("#newsletter").css('z-index', zzz); }, 150);
}, function() {
    // on mouse out, cancel the timer
    clearTimeout(timer);
});
$("#archive").click(function () {
    if(isHelloVisible) return;
    $(this).removeClass("clickable");
    $(this).css('z-index', zzz + 2);
    $("#newsletter").css('z-index', zzz);
});


/*/////////////////////////////////////////*/
/*/////////   PORTFOLIO FILTERS   /////////*/
/*/////////////////////////////////////////*/
filters_list = ["ai", "ecommerce", "opensource", "supplychain", "proptech", "fintech", "healthcare", "saas", "consumer", "marketplace", "infrastructure"]
$("#all").click(function () {
    if ($(this).is(':checked')) {
        for (let i = 0; i < filters_list.length; i++) {
            $(".filter-" + filters_list[i]).show();
        }
    }
});
// Iterate through all the filters.  When one is clicked, hide all and show it
for (let i = 0; i < filters_list.length; i++) {
    $("#" + filters_list[i]).click(function () {
        if ($(this).is(':checked')) {
            for (let j = 0; j < filters_list.length; j++) {
                $(".filter-" + filters_list[j]).hide();
            }
            $(".filter-" + filters_list[i]).show();
        }
    });
}

