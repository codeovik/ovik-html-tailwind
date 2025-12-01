/*
Template Name: OVIK - Personal Portfolio HTML Tailwind Template

Table of contents:
01 - Dark mode
02 - Cursor follower
03 - Background cursor follower
04 - Smooth scroll
05 - Element scroll animation
06 - Go top with smooth scroll
07 - Youtube video pop up
08 - Navbar
09 - Hero sevtion
10 - Achivements section
11 - Partner section
12 - Exprience section
13 - Portfolio section
14 - Testimonial section
15 - Tech stack section
16 - Contact from submit with EmailJS
17 - FAQ section
18 - Footer
------------------------------------------------------------*/

// gsap plugin initialization
gsap.registerPlugin(SplitText, ScrollTrigger);

/* dark mode
------------------------------------------------------------*/
// check theme from local storage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
// when click to dark/light mode button
let themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark"); // toggle "dark" class in <html> tag
  document.documentElement.classList.contains("dark") ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light"); // save theme in local store
});

/* cursor follower
------------------------------------------------------------*/
let cursor = document.querySelector("#cursor");

// default
document.addEventListener("mousemove", (e) => {
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "back.out",
    });
    cursor.style.display = "flex"
  })
})

// in buttons and links
let butonAndLinks = document.querySelectorAll(".cursorEffectBtn");
butonAndLinks.forEach(e => {
  e.addEventListener("mouseenter", () => {
    gsap.killTweensOf(cursor);
    gsap.to(cursor, {
      // duration: 0,
      opacity: 0,
    });
  });
  e.addEventListener("mouseleave", () => {
    gsap.killTweensOf(cursor);
    gsap.to(cursor, {
      height: 16,
      opacity: 1,
    });
  });
});

// in portfolio images
let portfolioImages = document.querySelectorAll(".portfolioImage");
portfolioImages.forEach(e => {
  let timeoutId;
  e.addEventListener("mouseenter", () => {
    timeoutId = setTimeout(() => {
      cursor.innerHTML = "View<br>More";
    }, 200);
    gsap.to(cursor, {
      height: 110,
    });
  });
  e.addEventListener("mouseleave", () => {
    clearTimeout(timeoutId);
    cursor.innerHTML = "";
    gsap.to(cursor, {
      height: 16,
    });
  });
});

// in email copy inside form section
let copyElEmail = document.getElementById("copyEmail");
let timeoutId;
copyElEmail.addEventListener("mouseenter", () => {
  timeoutId = setTimeout(() => {
    cursor.innerHTML = "Copy Email";
  }, 200);
  gsap.to(cursor, {
    height: 110,
  });
});
copyElEmail.addEventListener("click", () => {
  cursor.innerHTML = "Email Copied";
});
copyElEmail.addEventListener("mouseleave", () => {
  clearTimeout(timeoutId)
  cursor.innerHTML = "";
  gsap.to(cursor, {
    height: 16,
  });
});

/* background cursor follower
------------------------------------------------------------*/
let bgCursor = document.querySelector("#bgCursor");
// only for gradient demo
if (bgCursor) {
  // rotate
  gsap.to(bgCursor, {
    rotate: 360,
    duration: 5,
    repeat: -1,
    ease: "linear",
  });
  // follow on mouse move
  document.addEventListener("mousemove", (e) => {
    gsap.to(bgCursor, {
      x: e.clientX - 400, // center in x axis
      y: e.clientY - 400, // center in y axis
      duration: 7, // speed
    })
  });
}

/* smooth scroll
------------------------------------------------------------*/
// lenis init
const lenis = new Lenis({
  duration: 1, // speed
  easing: (t) => t * (2 - t), // easing in graph
});
// GSAP sync
lenis.on('scroll', ScrollTrigger.update);
// lenis gsap track sync
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
// lag smoothing off
gsap.ticker.lagSmoothing(0);

// smooth scroll on button click
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      e.preventDefault()
      lenis.scrollTo(target, { duration: 1.5 })
    }
  })
})

/* element scroll animation
------------------------------------------------------------*/
// fade up global animation
let animUpElements = document.querySelectorAll(".animUp");
animUpElements.forEach((e=> {
  gsap.fromTo(e, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "linear"
  },
  {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: e,
      toggleActions: "play none none reverse"
    }
  })
}));
// fade up group global animation
let animUpGroupElements = document.querySelectorAll(".animUpGroup");
ScrollTrigger.batch(animUpGroupElements, {
  interval: 0.2,
  onEnter: e => gsap.fromTo(e,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, ease: "sine", stagger: 0.2 }
  ),
  onLeaveBack: e => gsap.fromTo(e,
    { y: 0, opacity: 1 },
    { y: 50, opacity: 0 }
  )
});
// text slide global animation
let textSlideElements = document.querySelectorAll(".text-slide");
document.fonts.ready.then(() => {
  textSlideElements.forEach(el => {
    gsap.from(new SplitText(el, { type: "words, chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        toggleActions: "play none none reverse"
      },
    });
  });
});
// text scrub opacity
let textScrubElements = document.querySelectorAll(".text-scrub");
document.fonts.ready.then(() => {
  textScrubElements.forEach(el => {
    gsap.from(new SplitText(el, { type: "words, chars" }).chars, {
      stagger: 0.05,
      opacity: 0.3,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });
  });
});

/* go top with smooth scroll
------------------------------------------------------------*/
const goTopBtn = document.getElementById("goTopBtn"); // get go top element

lenis.on("scroll", () => {
  const scrolled = lenis.scroll; // scrolled from y axis
  if (scrolled > 250) {
    goTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  }
  // when scroll less than 250px from top: hide
  else {
    goTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
  }
});
// when click to go top button
goTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.5, easing: (t) => t * (2 - t) }); // scroll with lenis smooth scroll
});

/* youtube video pop up
------------------------------------------------------------*/
let popUpVideoModal = document.getElementById("popUpVideoModal");
// video open
function openVideoModal(el) {
  popUpVideoModal.querySelector("iframe").src = el.getAttribute("data-youtube-video-embed"); // set youtube embed src to video pop up modal
  // visible
  popUpVideoModal.classList.remove("hidden");
  popUpVideoModal.classList.add("flex");
  // animation
  gsap.set(popUpVideoModal, {
    opacity: 0,
    backdropFilter: "blur(0px)"
  });
  gsap.to(popUpVideoModal, {
    opacity: 1,
    backdropFilter: "blur(20px)",
    duration: 0.5,
    ease: "power2.out"
  });
}
// video close
document.querySelector("#popUpVideoModal button").addEventListener("click", () => {
  // animtion
  gsap.to(popUpVideoModal, {
    opacity: 0,
    backdropFilter: "blur(0px)",
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      // invisible
      popUpVideoModal.classList.add("hidden");
      popUpVideoModal.classList.remove("flex");
      // default src
      popUpVideoModal.querySelector("iframe").src = "about:blank";
    }
  });
});

/* navbar
------------------------------------------------------------*/
let menuTimeLine = gsap.timeline(); // menu timeline init
// menucontainer: body blur and prepare for click
menuTimeLine.to("#menuContainer", {
  backdropFilter: "blur(10px)",
  duration: 0.3,
  onStart: () => {
    menuContainer.classList.add("pointer-events-auto"); // make clickable
    menuContainer.classList.remove("pointer-events-none");
  },
  onReverseComplete: () => {
    menuContainer.classList.remove("pointer-events-auto");
    menuContainer.classList.add("pointer-events-none");
  },
});
// menu slide and items animation
menuTimeLine.to("#menuBar", {
  right: 0,
  duration: 0.2,
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(1)", {
  rotation: 45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(2)", {
  rotation: -45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
gsap.set("#menuBar button", {
  y: 0,
  opacity: 0
})
menuTimeLine.to("#menuBar button", {
  y: -20,
  opacity: 1,
  duration: 0.05,
});
menuTimeLine.from("#manuListTitle", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#manuList li", {
  y: 30,
  stagger: 0.04,
  opacity: 0,
  duration: 0.5,
});
menuTimeLine.from("#manuSocialMediaTitle", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#manuSocialMedia a", {
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});
menuTimeLine.from("#menuContactTitle", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuContact a", {
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});

menuTimeLine.reverse();

// when click to menu toggle button
document.getElementById("toggleMenu").addEventListener("click", () => {
  // when toggle work as open nav bar
  if (menuTimeLine.reversed()) {
    menuTimeLine.play(); // play animation
  }
  // when toggle work as close nav bar
  else {
    menuTimeLine.reverse(); // reverse animation
  }
});

// menu close on body click
document.getElementById("menuContainer").addEventListener("click", () => {
  menuTimeLine.reverse(); // reverse timeline
});

// off lenis smooth scroll on menubar scrolling
document.getElementById("menuBar").addEventListener("wheel", (e) => {
  e.stopPropagation();
  document.getElementById("menuBar").scrollTop += e.deltaY;
});

let links = document.querySelectorAll("nav ul li a"); // get all nav links
const sections = document.querySelectorAll("section, header"); // get all sections

// active link
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 150; // current scroll position with offset
  sections.forEach((section, index) => {
    if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      links.forEach(link => link.classList.remove('text-primary'));
      links[index].classList.add('text-primary');
    }
  });
});

// when nav link e click, reverse animation
links.forEach(link => {
  link.addEventListener("click", (e) => {
    menuTimeLine.reverse();
  });
});

/* hero section
------------------------------------------------------------*/
// typewriter effect
var typed = new Typed('#typewriter', { // typd.js init
  stringsElement: '#typedStrings', // get typewriter content
  typeSpeed: 50, // type speed
  backSpeed: 50, // type speed in back
  backDelay: 1500, // typewriter stable time
  loop: true, // infinite
  showCursor: true, // enable cursor
  cursorChar: '_', // cusor icon
});

/* achievements section
------------------------------------------------------------*/
// odometer animation
document.querySelectorAll('[data-target-achivements]').forEach(function (el) {
  var targetStr = (el.getAttribute('data-target-achivements') || '').trim(); // get target number string
  if (!targetStr) return; // if empty, return
  var numOnly = targetStr.replace(/[^0-9.\-]/g, ''); // get only number from string
  var targetVal = parseFloat(numOnly || '0'); // convert to float
  var prefixMatch = targetStr.match(/^[^\d\-\.]+/); // get prefix if any (+$, -$, etc)
  var prefix = prefixMatch ? prefixMatch[0] : ''; // if no prefix, set empty
  var suffix = targetStr.replace(/^[^\d\-\.]*/, '').replace(/-?\d[\d,]*(?:\.\d+)?/, ''); // get suffix if any (k, M, etc)
  var startNum = (el.textContent || '').trim().replace(/[^0-9.\-]/g, ''); // get start number from element text
  if (startNum === '') startNum = '0'; // if no start number, set 0
  el.textContent = ''; // clear element text
  if (prefix) { // if prefix, add prefix span
    var pre = document.createElement('span'); // create prefix span
    pre.className = 'odo-prefix'; // set class
    pre.textContent = prefix; // set text
    el.appendChild(pre); // append to element
  }
  var numSpan = document.createElement('span'); // create number span
  numSpan.className = 'odometer'; // set class
  numSpan.textContent = startNum; // set start number
  el.appendChild(numSpan); // append to element
  if (suffix) { // if suffix, add suffix span
    var suf = document.createElement('span'); // create suffix span
    suf.className = 'odo-suffix'; // set class
    suf.textContent = suffix; // set text
    el.appendChild(suf); // append to element
  }
  var odo = new Odometer({ // odometer init
    el: numSpan, // element
    value: parseFloat(startNum), // start number
    format: el.getAttribute('data-format') || '(,ddd).dd' // number format
  });

  // animate when visible
  ScrollTrigger.create({
    trigger: el, // when element visible
    toggleActions: "play none reset none", // play animation when enter, reset when leave back
    onEnter: function () { // when enter
      odo.update(targetVal); // animate to target value
    },
    onLeaveBack: function () { // when leave back
      odo.update(startNum); // reset to start number
    }
  });
});

/* partner section
------------------------------------------------------------*/
// logo slide
var swiper = new Swiper(".logoSlide", { // swiper js init
  slidesPerView: "auto", // automatic number of slider item visible by their width
  loop: true, // infinite slide
  spaceBetween: 48, // slide item space
  speed: 1000,
  grabCursor: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
});

/* exprience section
------------------------------------------------------------*/
// scroll pin with text and content
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#exprienceCardContainer",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#exprienceHeadingConatiner",
    pinSpacing: false
  })
})

/* portfolio section
------------------------------------------------------------*/
// scroll pin with text and content
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#portfolioCardContainer",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#portfolioHeadingContainer",
    pinSpacing: false
  })
})

// image parallax only for desktop
gsap.matchMedia().add("(min-width: 1024px)", () => {
  let portfolioItems = document.querySelectorAll(".portfolioItem");
  gsap.utils.toArray(portfolioItems).forEach(article => { // paramer is all portfolio card
    let img = article.querySelector(".portfolioImage"); // get portfolio image
    let container = article.querySelector(".portfolioImageContainer"); // get portfolio image container that makes overfollow and rounded to image
    gsap.to(img, {
      y: -(img.offsetHeight - container.offsetHeight), // parallax: image height - conatiner height
      ease: "none",
      scrollTrigger: {
        trigger: article,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
});

/* testimonial section
------------------------------------------------------------*/
// slide
var swiper = new Swiper(".reviewSlide", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  speed: 1000,
  grabCursor: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

/* tech stack section
------------------------------------------------------------*/
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#stackCardContainer",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#stackHeadingContainer",
    pinSpacing: false
  })
})

// skill inear progress bar
const skillProgressBar = document.querySelectorAll(".skillProgressBar");
  skillProgressBar.forEach((bar) => {
    gsap.fromTo(bar, {
      width: "0%"
    },
    {
      width: bar.dataset.skillProgressBarTarget + "%",
      duration: 3,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 100%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// skill number percentage
const skillPercentageTarget = document.querySelectorAll("[data-skill-percentage-target]"); // get all skill percentage numbers
  skillPercentageTarget.forEach(el => {
    const target = +el.getAttribute("data-skill-percentage-target");
    gsap.fromTo(el, {
      innerText: 0
    }, 
    {
      innerText: target,
      duration: 3,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        toggleActions: "play none none reverse",
      },
      snap: {
        innerText: 1, // 1 unit increment
      },
      onUpdate: function() {
        el.innerText = Math.round(el.innerText) + "%";
      }
    }
  );
});

/* contact section
------------------------------------------------------------*/
// save draft data to local storage
let formSaveDraft = document.querySelector("#formSaveDraft")
// when click "save draft" button
formSaveDraft.addEventListener("click", function (e) {
  e.preventDefault(); // off page load
  const inputs = document.querySelectorAll("textarea, input"); // get all input
  const data = {}; // initial data array for send to local storage
  inputs.forEach((field, i) => {
    const key = field.placeholder || `field${i}`; // get array key from input placeholder or index number like: 0, 1, 2..
    data[key] = field.value; //get array value
  });
  let formDraftPopUp = document.querySelector("#formDraftPopUp"); // pop up modal
  localStorage.setItem("contactDraft", JSON.stringify(data)); // save data as "contactDraft" varriable name in localstorage
  // open popup
  formDraftPopUp.classList.remove("hidden");
  formDraftPopUp.classList.add("flex");
  // animation
    gsap.set(formDraftPopUp, {
    opacity: 0,
    backdropFilter: "blur(0px)"
  });
  gsap.to(formDraftPopUp, {
    opacity: 1,
    backdropFilter: "blur(20px)",
    duration: 0.5,
    ease: "power2.out"
  });
});
// when close popup
document.querySelector("#formDraftPopUp button").addEventListener("click", () => {
  // animtion
  gsap.to(formDraftPopUp, {
    opacity: 0,
    backdropFilter: "blur(0px)",
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      // invisible
      formDraftPopUp.classList.add("hidden");
      formDraftPopUp.classList.remove("flex");
    }
  });
});

// get draft data from local storage
const isFormDataSaved = localStorage.getItem("contactDraft");
if (isFormDataSaved) {
  const data = JSON.parse(isFormDataSaved); // import data
  const inputs = document.querySelectorAll("form input, form textarea"); // get input fields
  inputs.forEach((field, i) => {
    const key = field.placeholder || `field${i}`; // match array jey
    if (data[key]) field.value = data[key]; // match array value
  });
}

// form send to emailjs
// config
const emailjsPublicKey = "EMAIL_JS_PUBLIC_KEY_HERE";
const emailjsServiceId = "EMAIL_JS_SERVICE_ID_HERE";
const emailjsTemplateId = "EMAIL_JS_TEMPLATE_ID_HERE";

// initialize
(function () {
  emailjs.init(emailjsPublicKey)
})();

const formSubmit = document.querySelector("#formSubmit"); // get submit btn
// when click to submit button
formSubmit.addEventListener('click', function (e) {
  formSubmit.disabled = true; // not clickable
  formSubmit.style.opacity = "0.5"; // opacity styling
  formSubmit.style.cursor = "not-allowed"; // cursor styling
  formSubmit.querySelector("span:nth-of-type(1)").textContent = "Sending..."; // button text when submit processing

  e.preventDefault(); // off page load

  // make array for get input fields data from html
  const formData = {
    to_name: "Admin",
    user_name: document.getElementById('formName').value,
    user_company: document.getElementById('formCompany').value,
    user_email: document.getElementById('formEmail').value,
    user_phone: document.getElementById('formPhone').value,
    user_message: document.getElementById('formMessage').value,
  };
  // send to emailjs
  emailjs.send(emailjsServiceId, emailjsTemplateId, formData).then(function (res) {
    // success responce
    let formSuccessPopUp = document.querySelector("#formSuccessPopUp");
    // pop up modal open
    // visible
    formSuccessPopUp.classList.remove("hidden");
    formSuccessPopUp.classList.add("flex");
    // animation
    gsap.set(formSuccessPopUp, {
      opacity: 0,
      backdropFilter: "blur(0px)"
    });
    gsap.to(formSuccessPopUp, {
      opacity: 1,
      backdropFilter: "blur(20px)",
      duration: 0.5,
      ease: "power2.out"
    });
    // close popup
    formSuccessPopUp.querySelector("button").addEventListener("click", () => {
      // animtion
      gsap.to(formSuccessPopUp, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // invisible
          formSuccessPopUp.classList.add("hidden");
          formSuccessPopUp.classList.remove("flex");
          // default src
          formSuccessPopUp.querySelector("iframe").src = "about:blank";
        }
      });
    });
    document.querySelector("form").reset(); // input fields reset in client side
    // button style: default
    formSubmit.disabled = false;
    formSubmit.style.opacity = "1";
    formSubmit.style.cursor = "pointer";
    formSubmit.querySelector("span:nth-of-type(1)").textContent = "Send Another";
  })
  // error responce
  .catch(function (error) {
    console.log("Error to send mesage: " + error);
    // button style
    formSubmit.disabled = false;
    formSubmit.style.opacity = "1";
    formSubmit.style.cursor = "pointer";
    formSubmit.querySelector("span:nth-of-type(1)").textContent = "Try Again";
    // pop up modal
    let formErrorPopUp = document.querySelector("#formErrorPopUp");
    // visible
    formErrorPopUp.classList.remove("hidden");
    formErrorPopUp.classList.add("flex");
    // animation
    gsap.set(formErrorPopUp, {
      opacity: 0,
      backdropFilter: "blur(0px)"
    });
    gsap.to(formErrorPopUp, {
      opacity: 1,
      backdropFilter: "blur(20px)",
      duration: 0.5,
      ease: "power2.out"
    });
    // close popup
    formErrorPopUp.querySelector("button").addEventListener("click", () => {
    // animtion
    gsap.to(formErrorPopUp, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // invisible
        formErrorPopUp.classList.add("hidden");
        formErrorPopUp.classList.remove("flex");
        // default src
      }});
    });
  });
});

// copy email
copyElEmail.addEventListener("click", () => { // when click
  const textToCopy = copyElEmail.textContent.trim(); // get email from html
  navigator.clipboard.writeText(textToCopy); // make copy
});

/* faq section
------------------------------------------------------------*/
let faqQuestions = document.querySelectorAll(".faqQuestion");
let faqAnswers = document.querySelectorAll(".faqAnswer");
// faq toggle
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => { // when click to any faq
    const answer = question.nextElementSibling; // get corresponding answer
    const icon = question.querySelector(".icon"); // get icon
    // show answer
    if (answer.classList.contains("max-h-[200px]")) {
      answer.classList.remove("max-h-[200px]", "py-4"); // remove height amd padding
      icon.textContent = "+"; // set + icon
      return;
    }
    // hide all other answers
    faqAnswers.forEach((e) => {
      e.classList.remove("max-h-[200px]", "py-4");
      e.previousElementSibling.querySelector(".icon").textContent = "+";
    });
    // default
    answer.classList.add("max-h-[200px]", "py-4");
    icon.textContent = "–";
  });
});

/* footer
------------------------------------------------------------*/
// dynamic year
let currentYear = document.querySelector("#currentYear");
currentYear.innerHTML = new Date().getFullYear();