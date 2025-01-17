function castApp() {
    return {
        isConnected: false,
        connectToFireTV() {
            // Logic to connect to Fire TV
            // This is a placeholder for the actual connection logic
            console.log("Attempting to connect to Fire TV...");
            // Simulate successful connection
            this.isConnected = true;
            console.log("Connected to Fire TV");
        },
        disconnectFromFireTV() {
            // Logic to disconnect from Fire TV
            console.log("Disconnecting from Fire TV...");
            this.isConnected = false;
            console.log("Disconnected from Fire TV");
        }
    };
}