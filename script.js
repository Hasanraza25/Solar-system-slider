document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const bgOverlay = document.getElementById("bg-overlay"); // Correct Background Overlay
  
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
  
    // 🌟 Define Background Effects for Each Planet
    const planetEffects = {
      sun: {
        gradient: "radial-gradient(circle, rgba(255, 200, 0, 0.3) 0%, rgb(0, 0, 5) 100%)",
        filter: "brightness(1.2) contrast(0.9) saturate(1.1)",
        blend: "overlay",
      },
      mercury: {
        gradient: "radial-gradient(circle, rgba(180, 180, 180, 0.3) 0%, rgb(2, 15, 23) 100%)",
        filter: "contrast(1.2) brightness(0.95) saturate(0.8)",
        blend: "soft-light",
      },
      venus: {
        gradient: "radial-gradient(circle, rgba(255, 180, 90, 0.3) 0%, rgb(16, 7, 11) 100%)",
        filter: "sepia(0.3) contrast(1.1) brightness(1.05)",
        blend: "overlay",
      },
      earth: {
        gradient: "radial-gradient(circle, rgba(26, 214, 253, 0.3) 0%, rgb(0, 4, 12) 100%)",
        filter: "brightness(1.1) contrast(1.05)",
        blend: "soft-light",
      },
      mars: {
        gradient: "radial-gradient(circle, rgba(255, 80, 80, 0.3) 0%, rgb(10, 5, 5) 100%)",
        filter: "contrast(1.3) brightness(1.1) saturate(1.2)",
        blend: "multiply",
      },
      jupiter: {
        gradient: "radial-gradient(circle, rgba(255, 200, 150, 0.3) 0%, rgb(8, 6, 3) 100%)",
        filter: "contrast(1.1) saturate(1.1)",
        blend: "overlay",
      },
      saturn: {
        gradient: "radial-gradient(circle, rgba(220, 190, 140, 0.3) 0%, rgb(10, 8, 5) 100%)",
        filter: "brightness(1.2) contrast(0.9)",
        blend: "soft-light",
      },
      uranus: {
        gradient: "radial-gradient(circle, rgba(120, 200, 255, 0.3) 0%, rgb(0, 10, 15) 100%)",
        filter: "brightness(1.2) contrast(0.95) saturate(1.1)",
        blend: "overlay",
      },
      neptune: {
        gradient: "radial-gradient(circle, rgba(50, 100, 255, 0.3) 0%, rgb(0, 8, 18) 100%)",
        filter: "brightness(1.1) contrast(1.05)",
        blend: "darken",
      },
    };
  
    // Apply Initial Active Slide
    slides[currentIndex].classList.add("active");
    gsap.set(slides[currentIndex].querySelector(".content"), {
      opacity: 1,
      filter: "blur(0px)",
    });
  
    // 🌍 **Make All Planets Rotate Slowly Continuously**
    slides.forEach((slide) => {
      const planet = slide.querySelector(".planet");
      gsap.to(planet, {
        rotation: "+=360",
        duration: 60,
        repeat: -1,
        ease: "linear",
      });
    });
  
    function changeSlide(next = true) {
      if (isAnimating) return;
      isAnimating = true;
  
      let currentSlide = slides[currentIndex];
      let nextIndex = next
        ? (currentIndex + 1) % slides.length
        : (currentIndex - 1 + slides.length) % slides.length;
      let nextSlide = slides[nextIndex];
  
      let currentPlanet = currentSlide.querySelector(".planet");
      let nextPlanet = nextSlide.querySelector(".planet");
  
      let currentText = currentSlide.querySelector(".content");
      let nextText = nextSlide.querySelector(".content");
  
      // 🌫 **Blur the Current Text Quickly**
      gsap.to(currentText, {
        filter: "blur(8px)",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
  
      // 🚀 **Rotate & Unblur New Planet**
      gsap.set(nextPlanet, { opacity: 1, filter: "blur(8px)", rotation: 0 });
      gsap.to(nextPlanet, {
        rotation: "+=1440",
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.inOut",
      });
  
      // 🆕 **New Text Appears Blurred First, Then Clears Up**
      gsap.set(nextText, { opacity: 0, duration: 1, filter: "blur(8px)" });
      gsap.to(nextText, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.out",
      });
  
      // 🌟 **Change Background Gradient (Fixed)**
      let planetName = nextSlide.id;
      let effect = planetEffects[planetName] || planetEffects.earth;
  
      gsap.to(bgOverlay, {
        duration: 1.5,
        ease: "power2.out",
        backgroundImage: effect.gradient,
        filter: effect.filter,
        mixBlendMode: effect.blend,
      });
  
      // Activate New Slide
      nextSlide.classList.add("active");
      currentSlide.classList.remove("active");
  
      currentIndex = nextIndex;
      isAnimating = false;
    }
  
    // Auto Slide Change Every 5 Seconds
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        changeSlide(true);
      }, 5000);
    }
  
    startAutoSlide();
  
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      changeSlide(true);
      startAutoSlide();
    });
  
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      changeSlide(false);
      startAutoSlide();
    });
  });
  