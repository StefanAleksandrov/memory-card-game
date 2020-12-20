let vm = new Vue({
    el: "#app",

    data: {
        time: 30,
        start: false,
        end: false,
        card: {},
        counter: 0,
        flippedCards: [],
        countDown: null,

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
            { image: "img/css3.svg", alt: "React", flipped: false, foundPair: false },
            { image: "img/css3.svg", alt: "React", flipped: false, foundPair: false },
            { image: "img/html-5.svg", alt: "React", flipped: false, foundPair: false },
            { image: "img/html-5.svg", alt: "React", flipped: false, foundPair: false },
        ]
    },

    methods: {
        flipCard(index) {
            this.counter++;

            if (!this.start) {
                this.start = true;
            }

            this.cards[index].flipped = true;
            this.card = Object.assign({}, this.cards[index], { index });
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
            location.reload();
        },

    },

    watch: {
        card: function (newVal, oldVal) {
            if (this.counter % 2 == 0) {
                if (newVal.image == oldVal.image) {
                    this.cards[oldVal.index].foundPair = true;
                    this.cards[newVal.index].foundPair = true;
                    this.flippedCards = this.cards.filter(x => x.flipped);

                    if (this.flippedCards.length == 12) {
                        setTimeout(() => {
                            this.end = true;
                            clearInterval(this.countDown);
                            alert("Congratulations! You win!");
                        }, 600);
                        return;
                    }

                    this.flipAllCards();
                } else {
                    this.flipAllCards();
                }
            }

        },

        start: function () {
            this.countDown = setInterval(() => {
                this.time--;

                if (this.time <= 0) {
                    alert("Game Over!");
                    this.end = true;
                    clearInterval(this.countDown);
                }
            }, 1000);
        },

        time: function (newVal, oldVal) {
            if (newVal == 0) {
                setTimeout(() => {
                }, 5000);
            }
        },
    },

    created() {
        this.cards.sort((a, b) => (Math.random() - 0.5));
    },
})