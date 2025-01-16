function searchApp() {
    return {
        query: '',
        results: [],
        allContent: [],
        showAll: false,
        performSearch() {
            this.results = []; // Clear previous results
            this.showAll = false; // Reset showAll flag
            const jsonFiles = [
                './ahoyApp/www/local_data/podcastCollection.json',
                './ahoyApp/www/local_data/radioPlay.json',
                './ahoyApp/www/local_data/mediaCollection.json',
                './ahoyApp/www/local_data/vintage-broadcast/tape_id_mapping.json',
                './ahoyApp/www/local_data/vintage-broadcast/schedule.json'
            ];

            jsonFiles.forEach(file => {
                fetch(file)
                    .then(response => response.json())
                    .then(data => {
                        const filteredResults = data.filter(item => 
                            item.title.toLowerCase().includes(this.query.toLowerCase()) ||
                            item.description.toLowerCase().includes(this.query.toLowerCase())
                        );
                        this.results.push(...filteredResults);
                        this.allContent.push(...data); // Store all content
                    })
                    .catch(error => console.error('Error fetching JSON:', error));
            });
        },
        showAllContent() {
            this.showAll = true;
        },
        navigateTo(url) {
            window.location.href = url;
        }
    }
}