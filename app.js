const navIcon = document.querySelector('#navIcon');
const navIconBars = document.querySelectorAll('#navIcon > span');
const navAnchorTags = document.querySelectorAll('.links > a');
const navLinksContainer = document.querySelector('.links');
const sections = document.querySelectorAll('.section');

navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navLinksContainer.classList.toggle('show');
})

// On mobile, collapse nav bar on link click
navAnchorTags.forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth <= 480) {
        navLinksContainer.classList.remove('show');
    } 
}))

// Nav bars intersection observer
let navBarsOptions = {
    rootMargin: "-50px 0px -90% 0px",
    threshold: 0,
  };

const onNavBarsIntersect = (entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            if (entries[i].target.classList.contains('dark')) {
                navIconBars.forEach(bar => bar.classList.add('light-nav'))
            } else {
                navIconBars.forEach(bar => bar.classList.remove('light-nav'))
            }
        }
    }
} 

let navBarsObserver = new IntersectionObserver(onNavBarsIntersect, navBarsOptions);

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
    navBarsObserver.observe(section);
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

document.addEventListener("DOMContentLoaded", (event) => {
    const loadingContainer = document.querySelector('.loading')

    setTimeout(() => {
        loadingContainer.style.display = "none"
    }, 500)
});