const { createApp } = Vue;

createApp({
    data() {
        return {
            storeName: 'After-School Activities Hub',
            currentView: 'lessons',
            lessons: [
                { _id: '1', subject: 'Math Club', location: 'London', price: 15, availableSpaces: 5, icon: 'fa-solid fa-calculator' },
                { _id: '2', subject: 'Art & Craft', location: 'Manchester', price: 10, availableSpaces: 5, icon: 'fa-solid fa-palette' },
                { _id: '3', subject: 'Science Lab', location: 'Birmingham', price: 20, availableSpaces: 5, icon: 'fa-solid fa-flask' },
                { _id: '4', subject: 'Music & Piano', location: 'Leeds', price: 25, availableSpaces: 5, icon: 'fa-solid fa-music' },
                { _id: '5', subject: 'Coding for Kids', location: 'London', price: 30, availableSpaces: 5, icon: 'fa-solid fa-laptop-code' }
            ],
            cart: [],
            searchQuery: '',
            sortBy: 'subject',
            sortOrder: 'asc',
            order: {
                name: '',
                phone: ''
            }
        };
    },
    computed: {
        cartItemCount() {
            return this.cart.length;
        },
        sortedLessons() {
            let result = [...this.lessons];

            // Search Filter
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(lesson => 
                    lesson.subject.toLowerCase().includes(query) || 
                    lesson.location.toLowerCase().includes(query)
                );
            }

            // Sorting
            return result.sort((a, b) => {
                let modifier = this.sortOrder === 'asc' ? 1 : -1;
                if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
                if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
                return 0;
            });
        },
        isFormValid() {
            const nameRegex = /^[A-Za-z\s]+$/;
            const phoneRegex = /^\d+$/;
            return nameRegex.test(this.order.name) && phoneRegex.test(this.order.phone);
        }
    },
    methods: {
        toggleCheckout() {
            this.currentView = this.currentView === 'lessons' ? 'checkout' : 'lessons';
        },
        addToCart(lesson) {
            if (lesson.availableSpaces > 0) {
                lesson.availableSpaces--;
                this.cart.push({ ...lesson });
            }
        },
        removeFromCart(index) {
            const removedItem = this.cart.splice(index, 1)[0];
            const originalLesson = this.lessons.find(l => l._id === removedItem._id);
            if (originalLesson) {
                originalLesson.availableSpaces++;
            }
            if (this.cart.length === 0) {
                this.currentView = 'lessons';
            }
        },
        submitOrder() {
            alert('Order submitted successfully!');
            this.cart = [];
            this.order.name = '';
            this.order.phone = '';
            this.currentView = 'lessons';
        }
    }
}).mount('#app');