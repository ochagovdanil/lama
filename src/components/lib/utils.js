const { default: mongoose } = require('mongoose');

const connection = {};

// MongoDB connection setup
export const connectToDb = async () => {
	try {
		// Using the existing MongoDB connection
		if (connection.isConnected) {
			console.log('Using the existing MongoDB connection...');
			return;
		}

		// Create a new MongoDB connection
		const db = await mongoose.connect(process.env.MONGO);
		connection.isconnected = db.connections[0].readyState;
	} catch (error) {
		// Error occurred
		console.log(error);
		throw new Error('Error connecting to MongoDB database!');
	}
};
