/* table of contents:
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
document.getElementById("darkToggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark"); // toggle "dark" class in <html> tag
  document.documentElement.classList.contains("dark") ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light"); // save theme in local store
});

/* cursor follower
------------------------------------------------------------*/
let cursorFollower = document.querySelector("#cursorFollower");
let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(); // get primary color from css varriable

// follow on mouse move
document.addEventListener("mousemove", (e) => {
  // only for desktop devices
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    cursorFollower.style.display = "flex" // visible
    gsap.to(cursorFollower, {
      x: e.clientX - 8, // center in x axis
      y: e.clientY - 8, // center in y axis
      duration: 1, // speed
      ease: "power4.out",
    });
  })
});

// in button and links
document.querySelectorAll(".cursor-colorfull, .cursor-black-white").forEach(e => {
  // when mouse enter
  e.addEventListener("mouseenter", (e) => {
    gsap.to(cursorFollower, {
      scale: 4,
      opacity: 0.3,
      backgroundColor: e.currentTarget.classList.contains("cursor-colorfull") ? primaryColor: "", // if button class is "cursor-colorfull": cursor color is brand color. otherwise not change of cursor color
    });
  });
  // when mouse leave: default style
  e.addEventListener("mouseleave", (e) => {
    gsap.to(cursorFollower, {
      scale: 1,
      opacity: 1,
      backgroundColor: localStorage.getItem("theme") === "dark" ? "#ffffff" : "#000000", // background color based on theme
    });
  });
});

// in portfolio images
document.querySelectorAll("#portfolio article img").forEach(e => {
  // when mouse enter
  e.addEventListener("mouseenter", (e) => {
    cursorFollower.innerHTML = `<p class="text-[3px] text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">View More</p>`; // cursor text
    gsap.to(cursorFollower, {
      scale: 7,
      backdropFilter: "blur(2px)", // blur effect
      backgroundColor: "#00000050"
    });
  });
  // when mouse leave: default style
  e.addEventListener("mouseleave", (e) => {
    cursorFollower.innerHTML = ""; // default cursor text
    gsap.to(cursorFollower, {
      scale: 1,
      opacity: 1,
      backgroundColor: localStorage.getItem("theme") === "dark" ? "#ffffff" : "#000000", // default background color based on theme
    });
  });
});

// in email copy inside form section
let copyElEmail = document.getElementById("copyEmail");

// when mouse enter
copyElEmail.addEventListener("mouseenter", (e) => {
  cursorFollower.innerHTML = `<p class="text-[3px] text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Copy Email</p>`; // add "view more" text
  gsap.to(cursorFollower, {
    scale: 7, // scale up
    backdropFilter: "blur(3px)", // blur effect
    backgroundColor: "#00000050" // background
  });
});
// when mouse leave: default style
copyElEmail.addEventListener("mouseleave", (e) => {
  cursorFollower.innerHTML = "";
  gsap.to(cursorFollower, {
    scale: 1,
    backdropFilter: "blur(0px)",
    backgroundColor: localStorage.getItem("theme") === "dark" ? "#ffffff" : "#000000", // default background color based on theme
  });
});
copyElEmail.addEventListener("click", () => { // when click
  cursorFollower.innerHTML = `<p class="text-[3px] text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Email Copied!</p>`; // cursor text
});

/* background cursor follower
------------------------------------------------------------*/
let bgCursor = document.querySelector("#bgCursor");
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
    x: e.clientX - 200, // center in x axis
    y: e.clientY - 200, // center in y axis
    duration: 10, // speed
  })
});

/* smooth scroll
------------------------------------------------------------*/
// lenis init
const lenis = new Lenis({
  duration: 0.7, // speed
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

/* element scroll animation
------------------------------------------------------------*/
// fade in up
document.querySelectorAll(".anim-in-up").forEach((e=> {
  // initial 
  gsap.fromTo(e, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "linear"
  },
  // final
  {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: e,
      toggleActions: "play none none reverse"
    }
  })
}));
// fade in up for multiple element element in a row to delay effect
ScrollTrigger.batch(".anim-in-up-group", {
  interval: 0.2, // check scroll everytime dealy
  onEnter: e => gsap.fromTo(e, // in viewport
    { y: 50, opacity: 0 }, // initial style
    { y: 0, opacity: 1, ease: "sine", stagger: 0.2 } // final style
  ),
  onLeaveBack: e => gsap.fromTo(e, // out viewport
    { y: 0, opacity: 1 }, // initial style
    { y: 50, opacity: 0 } // final style
  )
});
// text slide
document.fonts.ready.then(() => {
  document.querySelectorAll(".text-slide").forEach(el => {
    gsap.from(new SplitText(el, { type: "words, chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
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
document.querySelectorAll(".text-scrub").forEach(el => {
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

/* go top with smooth scroll
------------------------------------------------------------*/
const goTopBtn = document.getElementById("goTopBtn"); // get go top element
const scrollProgress = document.getElementById("scrollProgress"); // get scroll progress
lenis.on("scroll", () => {
  const scrolled = lenis.scroll; // scrolled from y axis
  // when scroll greater than 250px from top: hide
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
menuTimeLine.to("#menuBar", { // menu bar: go right
  right: 0,
  duration: 0.2,
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(1)", { // menu toggle button first stick: rotate and go center
  rotation: 45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(2)", { // menu toggle button last stick: rotate and go center
  rotation: -45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
gsap.set("#menuBar button", { // dark/ligh toggle button: initial style: opacity and position
  y: 0,
  opacity: 0
})
menuTimeLine.to("#menuBar button", { // dark/light mode toggle button final styling: final style: opacity and position
  y: -20,
  opacity: 1,
  duration: 0.05,
});
menuTimeLine.from("#manuListTitle", { // menu links title: opacity and position
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#manuList li", { // menu links: opacity and position
  y: 30,
  stagger: 0.04,
  opacity: 0,
  duration: 0.5,
});
menuTimeLine.from("#manuSocialMediaTitle", { // secial media title: opacity and position
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#manuSocialMedia a", { // social media: opacity and position
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});
menuTimeLine.from("#menuContactTitle", { // contact title: opacity and position
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuContact a", { // contact items: opacity and position
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});

menuTimeLine.reverse(); // reverse timeline by default

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

// off lenis smooth scroll on menubar scroll
document.getElementById("menuBar").addEventListener("wheel", (e) => {
  e.stopPropagation();
  document.getElementById("menuBar").scrollTop += e.deltaY;
});

// active link
let links = document.querySelectorAll("nav ul li a"); // get all nav links
const sections = document.querySelectorAll("section, header"); // get all sections

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 150;
  sections.forEach((section, index) => {
    if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      // remove 'text-primary' from all links
      links.forEach(link => link.classList.remove('text-primary'));
      // add 'text-primary' to current link
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
setTimeout(() => {
  var typed = new Typed('#typewriter', { // typd.js init
    stringsElement: '#typed-strings', // get typewriter content
    typeSpeed: 100, // type speed
    backSpeed: 50, // type speed in back
    backDelay: 1000, // typewriter stable time
    loop: true, // infinite
    showCursor: true, // enable cursor
    cursorChar: '|', // cusor icon
  })
}, 2500); // delay

// name animation
gsap.from(new SplitText("#heroTitle", { type: "chars" }).chars, {
  x: 100,
  opacity: 0,
  stagger: 0.05,
  delay: 1,
  duration: 2,
  ease: "power4.out",
});
// skill animation
gsap.from(new SplitText("#typewriterContainer", { type: "chars" }).chars, {
  x: 100,
  opacity: 0,
  stagger: 0.05,
  delay: 1.7,
  duration: 2,
  ease: "power4.out",
});
// description animation
gsap.from(new SplitText("#heroDescription", { type: "lines" }).lines, {
  x: 100,
  opacity: 0,
  stagger: 0.05,
  duration: 2,
  delay: 2.4,
  ease: "power4.out",
});
// social icons animation
gsap.from("#heroSocial a", {
  x: 100,
  opacity: 0,
  delay: 2.9,
  stagger: 0.05,
  duration: 1,
  ease: "power4.out",
})
// button animation
gsap.set(".heroBtn", {
  x: 100,
  opacity: 0,
})
gsap.to(".heroBtn", {
  opacity: 1,
  delay: 3.2,
  stagger: 0.1,
  duration: 1,
  ease: "power4.out",
  x: 0,
})

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
var swiper = new Swiper(".logo-slide", { // swiper js init
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
// scroll pin
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
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#portfolioCardContainer",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#portfolioHeadingContainer",
    pinSpacing: false
  })
})

// image parallax
gsap.utils.toArray("#portfolio article").forEach(article => { // paramer is all portfolio card
  let img = article.querySelector("img"); // get all portfolio image
  let container = article.querySelector("div"); // get all portfolio image container that makes overfollow and rounded to image
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

/* testimonial section
------------------------------------------------------------*/
// slide
var swiper = new Swiper(".review-slide", {
  slidesPerView: "auto",
  spaceBetween: 1,
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
const bars = document.querySelectorAll(".skill-bar");
  bars.forEach((bar) => {
    gsap.fromTo(bar, {
      width: "0%"
    },
    {
      width: bar.dataset.skillBarTarget + "%",
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

// skill percentage
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
let saveDraft = document.querySelector("#saveDraft")
// when click "save draft" button
saveDraft.addEventListener("click", function (e) {
  e.preventDefault(); // off page load
  const inputs = document.querySelectorAll("form input, form textarea"); // get all input
  const data = {}; // initial data array
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

const submitBtn = document.querySelector("form button[type='submit']"); // get submit btn
// when click to submit button
submitBtn.addEventListener('click', function (e) {
  submitBtn.disabled = true; // not clickable
  submitBtn.style.opacity = "0.5"; // opacity styling
  submitBtn.style.cursor = "not-allowed"; // cursor styling
  submitBtn.querySelector("span:nth-of-type(1)").textContent = "Sending..."; // button text when submit processing

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
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
    submitBtn.querySelector("span:nth-of-type(1)").textContent = "Send Another";
  })
  // error responce
  .catch(function (error) {
    console.log("Error to send mesage: " + error);
    // button style
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
    submitBtn.querySelector("span:nth-of-type(1)").textContent = "Try Again";
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
// faq toggle
document.querySelectorAll(".faq-question").forEach((question) => {
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
    document.querySelectorAll(".faq-answer").forEach((e) => {
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
document.querySelector("#year").innerHTML = new Date().getFullYear();