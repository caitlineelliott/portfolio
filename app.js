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

// PIE

// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {

//     var data = new google.visualization.DataTable();

//     data.addColumn('string', 'Role');
//     data.addColumn('number', 'Hours');
//     data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

//     data.addRows([
//         ['Developer', 60,`
        
        

//         <div class="expandable" id="developer-tooltip-body">
//         <p>I've never got over the magic of bringing a design to life via lines of code, and I hope I never do.</p>

//         <p>I've worked on projects at a variety of scales, from marketing websites for small businesses to enterprise-level web tools and mobile apps.
//         </p>


//     </div>

//     <div class="tooltip-header">
//         <div class="tooltip-title designer-tooltip"><span class="material-symbols-outlined tooltip-icon">devices</span> 60% Developer</div>
//         <button onclick="expand('developer')" class="expand-btn"><span class="material-symbols-outlined">expand_content</span></button>
//         </div>

//         `],
//         ['Designer', 40,
//         `
//         <div class="tooltip-header">
//         <div class="tooltip-title dev-tooltip"><span class="material-symbols-outlined tooltip-icon">format_color_fill</span>40% Designer</div>
//         <button onclick="expand('designer')" class="expand-btn"><span class="material-symbols-outlined">expand_content</span></button>
//         </div>




//     </div>

//         `],
//       ]);    
//     var options = {
//         title: '',
//         legend: 'none',
//         backgroundColor: 'transparent',
//         chartArea: {
//             height: '100%',
//             width: '100%',
//             top: 10,
//             left: 0,
//             bottom: 10,
//             right: 0
//         },
//         colors: ['#29303a', '#566b57'],
//         pieSliceBorderColor: '#29303A',
//         pieSliceText: 'none',
//         width: '100%',
//         height: '100%',
//         enableInteractivity: false,
//         selectionMode: 'multiple',
//         tooltip: {
//           trigger: 'selection',
//           isHtml: true,
//           text: 'percentage',
//           ignoreBounds: true,
//         },
//         pieStartAngle: 110
//     }
//     var chart = new google.visualization.PieChart(document.getElementById('piechart'));


//     google.visualization.events.addListener(chart, 'ready', function(e) {
//         var selected_rows = [];
//         for (var i = 0; i < 3 - 1; i++) {
//           selected_rows.push({row: i, column: null});
//         }
//         chart.setSelection(selected_rows);
//       });

//     chart.draw(data, options);
// }

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

// swipe left & right for mobile
carousel.addEventListener("touchstart", () => {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
})

carousel.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX < touchstartX) {
        handleSwipeForward();
    }
    if (touchendX > touchstartX) {
        handleSwipeBackward();
    } else {
      return;  
    }
}