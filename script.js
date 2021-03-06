let vm = new Vue({
    el: "#app",

    data: {
        time: 0,
        start: false,
        end: false,
        card: {},
        counter: 0,
        flippedCards: 0,
        countDown: null,
        active: true,

        cards: [
            { image: "img/aurelia.svg", alt: "Aurelia", flipped: false, foundPair: false },
            { image: "img/aurelia.svg", alt: "Aurelia", flipped: false, foundPair: false },
            { image: "img/vue.svg", alt: "Vue", flipped: false, foundPair: false },
            { image: "img/vue.svg", alt: "Vue", flipped: false, foundPair: false },
            { image: "img/angular.svg", alt: "Angular", flipped: false, foundPair: false },
            { image: "img/angular.svg", alt: "Angular", flipped: false, foundPair: false },
            { image: "img/ember.svg", alt: "Ember", flipped: false, foundPair: false },
            { image: "img/ember.svg", alt: "Ember", flipped: false, foundPair: false },
            { image: "img/backbone.svg", alt: "Backbone", flipped: false, foundPair: false },
            { image: "img/backbone.svg", alt: "Backbone", flipped: false, foundPair: false },
            { image: "img/react.svg", alt: "React", flipped: false, foundPair: false },
            { image: "img/react.svg", alt: "React", flipped: false, foundPair: false },
            { image: "img/css-3.svg", alt: "CSS-3", flipped: false, foundPair: false },
            { image: "img/css-3.svg", alt: "CSS-3", flipped: false, foundPair: false },
            { image: "img/html-5.svg", alt: "HTML-5", flipped: false, foundPair: false },
            { image: "img/html-5.svg", alt: "HTML-5", flipped: false, foundPair: false },
            { image: "img/c-sharp.svg", alt: "C#", flipped: false, foundPair: false },
            { image: "img/c-sharp.svg", alt: "C#", flipped: false, foundPair: false },
            { image: "img/python.svg", alt: "Python", flipped: false, foundPair: false },
            { image: "img/python.svg", alt: "Python", flipped: false, foundPair: false },
            { image: "img/xampp.svg", alt: "Xampp", flipped: false, foundPair: false },
            { image: "img/xampp.svg", alt: "Xampp", flipped: false, foundPair: false },
            { image: "img/mocha.svg", alt: "Mocha", flipped: false, foundPair: false },
            { image: "img/mocha.svg", alt: "Mocha", flipped: false, foundPair: false },
        ]
    },

    methods: {
        flipCard(index) {
            if (!this.active) {
                return;
            } else {
                if (!this.start) {
                    this.start = true;
                }

                this.counter++;
                this.cards[index].flipped = true;
                this.card = Object.assign({}, this.cards[index], { index });
            }
        },

        flipAllCards() {
            this.cards.forEach(x => {
                if (x.foundPair == false) {
                    setTimeout(() => {
                        x.flipped = false;
                    }, 500);
                }
            });
        },

        restart() {
            this.time = 0;
            this.start = false;
            this.end = false;
            this.card = {};
            this.counter = 0;
            this.flippedCards = 0;
            this.countDown = null;
            this.active = true;
            this.cards.map(x => x.foundPair = false)
            this.cards.sort((a, b) => (Math.random() - 0.5));
        },

    },

    watch: {
        card: function (newVal, oldVal) {
            if (this.counter % 2 == 0) {
                this.active = false;

                setTimeout(() => {
                    this.active = true;
                }, 500);

                if ((newVal.alt == oldVal.alt) && (newVal.index !== oldVal.index)) {
                    this.cards[oldVal.index].foundPair = true;
                    this.cards[newVal.index].foundPair = true;
                    this.flippedCards++;

                    if (this.flippedCards == (this.cards.length / 2)) {
                        setTimeout(() => {
                            this.end = true;
                            clearInterval(this.countDown);
                            return;
                        }, 500)
                    } else {
                        this.flipAllCards();
                    }
                } else {
                    this.flipAllCards();
                }
            }
        },

        start: function () {
            this.countDown = setInterval(() => {
                this.time++;
            }, 1000);
        },
    },

    created() {
        this.cards.sort((a, b) => (Math.random() - 0.5));
    },
})