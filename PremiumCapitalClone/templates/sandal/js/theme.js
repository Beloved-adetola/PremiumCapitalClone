/* Copyright (C) arrowthemes, http://www.gnu.org/licenses/gpl.html GNU/GPL */

jQuery(function($) {

    "use strict";

    var config = $('html').data('config') || {}, preloader = $('.tm-preload');

    // Social buttons
    $('article[data-permalink]').socialButtons(config);

    // add modal data attribute
    $(".tm-modal-link").attr("data-uk-modal", "{center:true}");

    // Fix offcanvas top links
    $(".uk-offcanvas-bar .uk-parent").removeClass("uk-open").children("a").attr("href", "#");

    // smooth scroll for one page layout
    $('.uk-navbar-nav').each(function(i, element) {
        var obj = new $.UIkit["scrollspynav"](element, {smoothscroll: {closest: 'li', offset: 100}});  
    });

    // audio/video plyr initialize
     (function(d, p){
        var a = new XMLHttpRequest(),
            b = d.body;
        a.open('GET', p, true);
        a.send();
        a.onload = function() {
            var c = d.createElement('div');
            c.setAttribute('hidden', '');
            c.innerHTML = a.responseText;
            b.insertBefore(c, b.childNodes[0]);
        };
    })(document, 'https://cdn.plyr.io/1.5.20/sprite.svg');

    plyr.setup();

    // preloader
    $(window).on("load",function(){preloader.removeClass('loading').fadeOut(500,function(){})}),$(window).on("beforeunload",function(){preloader.addClass('loading').fadeIn(300,function(){})});

    // slideshow-panel
    var container  = $("[id^=wk-]"),
    slideshows = container.find('[data-uk-slideshow]');
    container.on('beforeshow.uk.slideshow', function(e, next) {
    slideshows.not(next.closest('[data-uk-slideshow]')[0]).data('slideshow').show(next.index());
    });

    // tm-float-box
    $('.tm-float-box').prev('.tm-block-hero').find('.uk-margin').addClass('tm-float-padding');  

    // Dropdown flip
        $(document).ready(function(){
        var browser_width = $(window).width(),
            navbar = $(".tm-navbar");
        
        navbar.find(".uk-dropdown-width-2, .uk-dropdown-width-3, .uk-dropdown-width-4").each(function(index){
            var xwidth_d = $(this).offset().left + $(this).width();
            if(xwidth_d >= browser_width){
                $(this).addClass("uk-dropdown-flip");
            }
        });

        navbar.find("li.uk-parent > ul").each(function(index){
            var xwidth_f = $(this).offset().left + $(this).width();
            if(xwidth_f >= browser_width){
                $(this).addClass("uk-dropdown-flip");
            }
        });        
    })

    $(window).resize(function() {
        var browser_width = $(window).width(),
            navbar = $(".tm-navbar");

        navbar.find("li.uk-parent > ul").removeClass("uk-dropdown-flip");
        navbar.find("li.uk-parent > ul").each(function(index){
            var xwidth = $(this).offset().left + $(this).width();       
            if(xwidth >= browser_width){
                $(this).addClass("uk-dropdown-flip");
            }
        });
    });

    // Ripple Effect
    // source: http://codepen.io/KrisOlszewski/pen/Dnktj
    !function(){var t,a,i,e;$(".uk-navbar-nav li > a, .uk-button, .uk-subnav-pill > li > a, .uk-nav-side > li > a, .tm-person-link").click(function(p){var n=$(this);0===n.find(".tm-ripple").length&&n.prepend("<span class='tm-ripple'></span>"),t=n.find(".tm-ripple"),t.removeClass("tm-animate-ripple"),t.height()||t.width()||(a=Math.max(n.outerWidth(),n.outerHeight()),t.css({height:a,width:a})),i=p.pageX-n.offset().left-t.width()/2,e=p.pageY-n.offset().top-t.height()/2,t.css({top:e+"px",left:i+"px"}).addClass("tm-animate-ripple")})}();

    // circle chart
    !function(t,e){var i=['<svg class="uk-circlechart" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">',"<path />",'<circle cx="90" cy="90" r="60"/>','<text x="50%" y="50%"></text>',"</svg>"].join(""),r=function(s,c){var n=this;if(this.element=t(s),this.options=t.extend({},r.defaults,c),!this.element.data("circle")){var a=t(i),l=this.options.size,h=l/2;if(this.element.replaceWith(a),navigator.userAgent.match(/AppleWebKit\/(.+?) Version\/(.+?) Safari\//))for(var o,p,d,m=0;m<document.styleSheets.length;m++)for(var u=document.styleSheets[m].cssRules,f=0;f<u.length;f++)if(u[f].type===CSSRule.STYLE_RULE&&u[f].selectorText.match(/uk-circlechart/)&&(d=u[f].cssText.replace(/\n/g,"").match(/(.+)\{(.+)\}/),d&&(p=d[2].split(";"),o=!1,-1!=d[1].indexOf(" path")&&a.is(t.trim(d[1]).replace(" path",""))&&(o="path"),-1!=d[1].indexOf(" circle")&&a.is(t.trim(d[1]).replace(" circle",""))&&(o="circle"),-1!=d[1].indexOf(" text")&&a.is(t.trim(d[1]).replace(" text",""))&&(o="text"),o))){var x=a.find(o);p.forEach(function(e){var i=e.split(":");2==i.length&&x.attr(t.trim(i[0]),t.trim(i[1]))})}this.element=a.attr({width:l,height:l,viewbox:"0 0 "+[l,l].join(" ")}),this.circle=this.element.find("circle").attr({cx:h,cy:h,r:h-this.options.border}),this.border=this.element.find("path").attr("transform","translate("+[h,h].join(",")+")"),this.text=this.element.find("text"),this.update(0),this.element.on("inview.uk.scrollspy",function(){{var t=0;!function e(){t>100||t>n.options.maxPercent||(n.update(t++),setTimeout(e,20))}()}}),this.scrollspy=new e.scrollspy(this.element),this.element.data("circle",this)}};t.extend(r.prototype,{update:function(t){var e=100==t?359.9999:360*(t/100),i=this.options.size/2;e%=360;var r=e*Math.PI/180,s=Math.sin(r)*i,c=Math.cos(r)*-i,n=e>180?1:0,a="M 0 0 v -"+i+" A "+i+" "+i+" 0 "+n+" 1 "+s+" "+c+" z";this.border.attr("d",a),this.text.text(Math.ceil(t)+"%")}}),r.defaults={timerSeconds:5,callback:function(){},timerCurrent:0,showPercentage:!0,maxPercent:100,size:180,border:10},t(document).ready(function(){t("[data-uk-circle-chart]").each(function(){var i,s=t(this);s.data("circle")||(i=new r(s,e.Utils.options(s.attr("data-uk-circle-chart"))))})})}(jQuery,jQuery.UIkit);

    // jQuery.appear
    // source: https://github.com/bas2k/jquery.appear/
    !function(e){e.fn.appear=function(a,r){var n=e.extend({data:void 0,one:!0,accX:0,accY:0},r);return this.each(function(){var r=e(this);if(r.appeared=!1,!a)return void r.trigger("appear",n.data);var p=e(window),t=function(){if(!r.is(":visible"))return void(r.appeared=!1);var e=p.scrollLeft(),a=p.scrollTop(),t=r.offset(),c=t.left,i=t.top,o=n.accX,f=n.accY,s=r.height(),u=p.height(),d=r.width(),l=p.width();i+s+f>=a&&a+u+f>=i&&c+d+o>=e&&e+l+o>=c?r.appeared||r.trigger("appear",n.data):r.appeared=!1},c=function(){if(r.appeared=!0,n.one){p.unbind("scroll",t);var c=e.inArray(t,e.fn.appear.checks);c>=0&&e.fn.appear.checks.splice(c,1)}a.apply(this,arguments)};n.one?r.one("appear",n.data,c):r.bind("appear",n.data,c),p.scroll(t),e.fn.appear.checks.push(t),t()})},e.extend(e.fn.appear,{checks:[],timeout:null,checkAll:function(){var a=e.fn.appear.checks.length;if(a>0)for(;a--;)e.fn.appear.checks[a]()},run:function(){e.fn.appear.timeout&&clearTimeout(e.fn.appear.timeout),e.fn.appear.timeout=setTimeout(e.fn.appear.checkAll,20)}}),e.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(a,r){var n=e.fn[r];n&&(e.fn[r]=function(){var a=n.apply(this,arguments);return e.fn.appear.run(),a})})}(jQuery);

    // Animated counter
    // source: http://codepen.io/jakubtursky/pen/vEwZop
    $.fn.jQuerySimpleCounter=function(t){var n=$.extend({start:0,end:100,easing:"swing",duration:400,complete:""},t),e=$(this);$({count:n.start}).animate({count:n.end},{duration:n.duration,easing:n.easing,step:function(){var t=Math.ceil(this.count);e.text(t)},complete:n.complete})},$(".tm-counter-number").each(function(t){$(this).appear(function(){$(this).jQuerySimpleCounter({end:$(this).data().end,duration:$(this).data().duration})})});

    // Rotating Text
    // source: http://codepen.io/rachsmith/pen/BNKJme
    function changeWord(){for(var r=wordArray[currentWord],t=currentWord==words.length-1?wordArray[0]:wordArray[currentWord+1],e=0;e<r.length;e++)animateLetterOut(r,e);for(var e=0;e<t.length;e++)t[e].className="tm-letter behind",t[0].parentElement.style.opacity=1,animateLetterIn(t,e);currentWord=currentWord==wordArray.length-1?0:currentWord+1}function animateLetterOut(r,t){setTimeout(function(){r[t].className="tm-letter out"},80*t)}function animateLetterIn(r,t){setTimeout(function(){r[t].className="tm-letter in"},340+80*t)}function splitLetters(r){var t=r.innerHTML;r.innerHTML="";for(var e=[],n=0;n<t.length;n++){var a=document.createElement("span");a.className="tm-letter",a.innerHTML=t.charAt(n),r.appendChild(a),e.push(a)}wordArray.push(e)}var words=document.getElementsByClassName("tm-word"),wordArray=[],currentWord=0;if(words.length>0){words[currentWord].style.opacity=1;for(var i=0;i<words.length;i++)splitLetters(words[i])}words.length>0&&(changeWord(),setInterval(changeWord,5e3));

    // Particles effect
    // source: http://codepen.io/dleatherman/pen/kAzgw
    (function(){setInterval(function(){var t,i;return i=new Date(1987,5,30),t=new Date,$("#time").text(((t-i)/1e3).toFixed(0))},1e3)}).call(this),$(window).on("resize",function(){$("#canvas.tm-particles").length&&reinit()}),$(function(){function t(){this.x=Math.random()*a.width,this.y=Math.random()*a.height,this.vx=-.5+Math.random(),this.vy=-.5+Math.random(),this.radius=Math.random()}function e(){for(n.clearRect(0,0,a.width,a.height),i=0;i<r.nb;i++)r.array.push(new t),dot=r.array[i],dot.create();dot.line(),dot.animate()}if($("#canvas.tm-particles").length){var a=document.querySelector("canvas.tm-particles"),n=a.getContext("2d"),o="#ffffff";a.width=window.innerWidth,a.height=window.innerHeight,a.style.display="block",n.fillStyle=o,n.lineWidth=.1,n.strokeStyle=o;var d={x:30*a.width/100,y:30*a.height/100},r={nb:150,distance:100,d_radius:150,array:[]};t.prototype={create:function(){n.beginPath(),n.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),n.fill()},animate:function(){for(i=0;i<r.nb;i++){var t=r.array[i];t.y<0||t.y>a.height?(t.vx=t.vx,t.vy=-t.vy):(t.x<0||t.x>a.width)&&(t.vx=-t.vx,t.vy=t.vy),t.x+=t.vx,t.y+=t.vy}},line:function(){for(i=0;i<r.nb;i++)for(j=0;j<r.nb;j++)i_dot=r.array[i],j_dot=r.array[j],i_dot.x-j_dot.x<r.distance&&i_dot.y-j_dot.y<r.distance&&i_dot.x-j_dot.x>-r.distance&&i_dot.y-j_dot.y>-r.distance&&i_dot.x-d.x<r.d_radius&&i_dot.y-d.y<r.d_radius&&i_dot.x-d.x>-r.d_radius&&i_dot.y-d.y>-r.d_radius&&(n.beginPath(),n.moveTo(i_dot.x,i_dot.y),n.lineTo(j_dot.x,j_dot.y),n.stroke(),n.closePath())}},$("canvas.tm-particles").on("mousemove mouseleave",function(t){"mousemove"==t.type&&(d.x=t.pageX,d.y=t.pageY),"mouseleave"==t.type&&(d.x=a.width/2,d.y=a.height/2)}),setInterval(e,1e3/30)}});

});