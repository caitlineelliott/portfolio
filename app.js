// document.onreadystatechange = function () {
//     const loadingContainer = document.querySelector('.loading')

//     if (document.readyState !== "complete") {
//        document.querySelector("body").style.visibility = "hidden";
//        loadingContainer.style.visibility = "visible";
//     } else {
//        setTimeout(() => {
//           loadingContainer.style.display ="none";
//           document.querySelector("body").style.visibility = "visible";
//        }, 300)
//     }
//  };

const navIcon = document.querySelector('#navIcon');
const navIconBars = document.querySelectorAll('#navIcon > span');
const navAnchorTags = document.querySelectorAll('.links > a');
const navLinksContainer = document.querySelector('.links');
const sections = document.querySelectorAll('.section');
const aboutHeading = document.querySelector('#about h2');

navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navLinksContainer.classList.toggle('show');
})

// On mobile, collapse nav bar on link click
navAnchorTags.forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth <= 480) {
        navIcon.classList.toggle('open');
        navLinksContainer.classList.remove('show');
    } 
}))

navIcon.addEventListener('keydown', (e) => {
    if (e.keyCode === 9) {
        navIcon.classList.toggle('open');
        navLinksContainer.classList.toggle('show');
    }
})

navAnchorTags[navAnchorTags.length - 1].addEventListener('keydown', (e) => {
    if (e.shiftKey) {
        return;
    } else if (e.keyCode === 9) {
        navIcon.classList.toggle('open');
        navLinksContainer.classList.toggle('show');
    }
})

aboutHeading.addEventListener('keydown', (e) => {
    if(e.shiftKey && e.keyCode == 9) { 
        navIcon.classList.toggle('open');
        navLinksContainer.classList.toggle('show');
    }
})

// Nav links intersection observer
let options = {
    rootMargin: "0px",
    threshold: 0.5,
  };


const onIntersect = (entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
        let link = document.querySelector(`[href="#${entries[i].target.id}"]`)
        if (entries[i].isIntersecting) {
            link.children[0].classList.add('active-section-btn');
        } else {
            link.children[0].classList.remove('active-section-btn')
        }
    }
} 

let observer = new IntersectionObserver(onIntersect, options);

sections.forEach(section => {
    observer.observe(section)
})

const expand = (type) => {
    if (type === 'designer') {
        const tooltip = document.querySelector('#designer-tooltip');
        if (tooltip.classList.contains('big')) {
            tooltip.classList.toggle('big');
            setTimeout(() => {
                tooltip.classList.toggle('expand-up');

            }, 500)
        } else {
            tooltip.classList.toggle('expand-up');
            tooltip.classList.toggle('big');
        }

    } else if (type === 'developer') {
        const tooltip = document.querySelector('#developer-tooltip');
        tooltip.classList.toggle('big');
    } else {
        const projectInfo = document.querySelector('#card-tooltip');
        projectInfo.classList.toggle('big');
    }
}

// Carousel
const carousel = document.querySelector(".cards");
const card = carousel.querySelector(".card");
const cards = carousel.querySelectorAll(".card");
const leftButton = document.querySelector(".left-slide");
const rightButton = document.querySelector(".right-slide");
const mobileLeftButton = document.querySelector(".mobile-left-btn");
const mobileRightButton = document.querySelector(".mobile-right-btn");
const dotsContainer = document.querySelector('.dots');
const cardCount = carousel.querySelectorAll(".card").length;
let offset = 0;
let currentIndex = 0;
let prevIndex;

for (let i = 0; i < cardCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');
dotsContainer.firstChild.classList.add('active-dot');

const handleSwipeForward = () => {
    carousel.classList.add("sliding-transition");

    prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % cardCount;
  
    carousel.style.transform = `translateX(-${card.offsetWidth}px)`;

    dots[prevIndex].classList.remove('active-dot');
    dots[currentIndex].classList.add('active-dot');

    setTimeout(() => {
      carousel.appendChild(cards[prevIndex]);
      carousel.classList.remove("sliding-transition");
      carousel.style.transform = "";
    }, 700);

    const projectInfo = document.querySelectorAll('#card-tooltip');
    projectInfo.forEach(card => {
        if (card.classList.contains('big')) {
            card.classList.remove('big')
        }
    })
}

const handleSwipeBackward = () => {
    prevIndex = currentIndex;
    currentIndex = (currentIndex - 1 + cardCount) % cardCount;
    carousel.style.transform = `translateX(-${card.offsetWidth}px)`;
    carousel.insertBefore(cards[currentIndex], carousel.firstChild);

    dots[prevIndex].classList.remove('active-dot');
    dots[currentIndex].classList.add('active-dot');

  
    setTimeout(() => {
      carousel.style.transform = "";
      carousel.classList.add("sliding-transition");
    }, 10);
  
    setTimeout(() => {
      carousel.classList.remove("sliding-transition");
    }, 690);
    
    const projectInfo = document.querySelectorAll('#card-tooltip')

    projectInfo.forEach(card => {
        if (card.classList.contains('big')) {
            card.classList.remove('big')
        }
    })
}

// Add the click events
leftButton.addEventListener("click", handleSwipeBackward)
rightButton.addEventListener("click", handleSwipeForward)
mobileLeftButton.addEventListener("click", handleSwipeBackward)
mobileRightButton.addEventListener("click", handleSwipeForward)

window.onload = () => {
    const loadingContainer = document.querySelector('.loading')
    console.log('test')
    setTimeout(() => {
        loadingContainer.style.display = "none"
    }, 500)
}