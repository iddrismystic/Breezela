//animations
//fadding

const fadein = ()=>{$('.fade-in').fadeIn()};fadein()
const fadeout = ()=>{$('.fade-out').fadeOut()};fadeout()
//sidebar
$('.sidebar-trigger').on('click',()=>{
    const sidebar = $('.sidebar');
    const sidebarcontent = $('.sidebar-content');
    if(sidebar.css('width') > 0 +'px'){
    sidebar.css({width:'0px'})
    sidebarcontent.css('display','none')
    }else{
        const display = ()=>{
        sidebar.css({width:'300px'})
        sidebarcontent.css('display','block')
        }
     display()
 

    }
})
const halftop = $('halfway-top');
const height = halftop.css('height')
halftop.css('margin-top', '- '+height)
//tabs
function opentab(tabId) {
    var i;
    var x = $(".tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
  const tabs =  $('#'+tabId)
  tabs.show() 
  }
$('.dark-mode').on('click',(e)=>{
 e.preventDefault()
 const back = $('body').css('background-color')
 if(back == 'rgba(0, 0, 0, 0)'){
  $('body').css({background:'rgba(0, 0, 0,0.9)'})
  $('body').css('color','#f1f1f1')
 }else{
  $('body').css({background:'rgb(255, 255, 255)'})
  $('body').css('color','black')
 }

})

//slide show
  var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide-show");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//scroll effects
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
  
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el)
      }
    })
  }
  
  window.addEventListener("scroll", () => { 
    handleScrollAnimation();
  });



