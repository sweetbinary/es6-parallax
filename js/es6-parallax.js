//es6 parallax - Sweet Binary

class es6Plax {

    constructor(minPlaxWidth){
        this.windowWidth = window.innerWidth;
        this.minPlaxWidth = minPlaxWidth;
        this.plaxElements = [];
        this.init_plax();
    }

    init_plax() {  
        const t = this;        

        window.addEventListener("scroll", () => {
            t.fancy_scrollEL();
        });

        window.addEventListener("resize", () => {            
            t.fancy_resizeEL();
        });

        t.fancy_resizeEL();  
    }

    //resize event listener, get offset tops of plax elements so the scroll event listener will know when to trigger animations
    fancy_resizeEL() {        
        const t = this;

        //getting the offset top of parallax elements every time the window is resized, a delay is added to avoid taking the offset top during the animation
        t.windowWidth = window.innerWidth;

        //only run if deskop
        if (t.windowWidth >= t.minPlaxWidth) {

            t.plaxElements = [];
            setTimeout(function () {
     
                document.querySelectorAll('.plax-effect').forEach( (plaxElement) => {    
                    const offsetTopValue = Math.ceil(plaxElement.getBoundingClientRect().top) + window.scrollY;                    
                    t.plaxElements.push({ div: plaxElement, divScrollTop: offsetTopValue });                    
                });

                t.fancy_scrollEL();
            }, 750);

        }
        else {
            t.fancy_scrollEL();
        }
    }

    fancy_scrollEL() {
        const t = this;
        const windowScrollTop = window.scrollY;
        const windowHeight = window.innerHeight;                
    
        //parallax checking, if element is in range add class
        if (t.windowWidth >= t.minPlaxWidth) {
            const tempVar = (windowScrollTop + windowHeight - 50);                    
            t.plaxElements.forEach(function(plaxElement) {
    
                if (tempVar > plaxElement.divScrollTop) {
                    if (plaxElement.div.classList.contains('show') == false) {                        
                        plaxElement.div.classList.add('show');
                    }
                }
                else {
                    if (plaxElement.div.classList.contains('show') == true) {
                        plaxElement.div.classList.remove('show');
                    }
                }
            });
        }
    }
}

window.onload = () => {    
    const thisPagePlax = new es6Plax(1025);
}

