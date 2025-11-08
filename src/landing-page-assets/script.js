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
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        toggleActions: "play none none reverse"
      },
    });
  });
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
      height: 80,
      opacity: 0.3,
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
let demoImages = document.querySelectorAll(".demoImage");
demoImages.forEach(e => {
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