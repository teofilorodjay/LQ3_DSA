// User authentication data for TICKET PERSON
const users = [
    { username: 'ticketmaster', password: 'password123' } // Example user
];

// Bus data structure with names and seat availability (null means available)
const buses = [
    { name: 'Vigan', seats: Array(30).fill(null) }, // Array of 30 seats initialized as available
    { name: 'Baguio', seats: Array(30).fill(null) },
    { name: 'San Fernando La Union', seats: Array(30).fill(null) }
];

// Function to authenticate the ticket person using username and password
function authenticate(username, password) {
    // Check if the provided username and password match any in the users array
    return users.some(user => user.username === username && user.password === password);
}

// Function to display available seats in a bus
function displaySeats(bus) {
    console.log(`Bus Name: ${bus.name}`);
    bus.seats.forEach((seat, index) => {
        // Display seat number and status (either customer name or 'AVAILABLE')
        console.log(`Seat ${index + 1}: ${seat ? seat : 'AVAILABLE'}`);
    });
}

// Function to reserve a seat for a customer
function reserveSeat(bus, customerName, seatNumber) {
    // Check if the requested seat is available (null)
    if (bus.seats[seatNumber - 1] === null) {
        bus.seats[seatNumber - 1] = customerName; // Assign the customer's name to the seat
        console.log(`Reservation successful for ${customerName} on ${bus.name}, Seat ${seatNumber}.`);
    } else {
        console.log('Seat is already taken.'); // Inform the user if the seat is not available
    }
}

// Function to cancel a reservation for a customer
function cancelReservation(bus, customerName) {
    // Find the index of the customer's reservation in the bus seats
    const seatIndex = bus.seats.indexOf(customerName);
    if (seatIndex !== -1) {
        bus.seats[seatIndex] = null; // Remove the reservation by setting the seat back to null
        console.log(`Reservation for ${customerName} on ${bus.name} has been canceled.`);
    } else {
        console.log('No reservation found for this customer.'); // Inform if no reservation exists
    }
}

// Main program loop to handle user interactions
function main() {
    // Prompt user to choose their role
    let role = prompt("Are you a TICKET PERSON or CUSTOMER?").toUpperCase();
    
    if (role === 'TICKET PERSON') {
        // Ticket person flow
        const username = prompt("Enter username:");
        const password = prompt("Enter password:");
        
        // Authenticate the ticket person
        if (authenticate(username, password)) {
            let ticketPersonActive = true; // Flag to keep the ticket person session active
            while (ticketPersonActive) {
                // Prompt for action: LOGOUT, VIEW, or MANAGE
                let action = prompt("Choose an action: LOGOUT, VIEW, MANAGE").toUpperCase();
                
                switch (action) {
                    case 'VIEW':
                        // Display all buses and their seat availability
                        buses.forEach(displaySeats);
                        break;
                    case 'MANAGE':
                        // Prompt for which bus to manage
                        let busChoice = prompt("Which bus to manage? (Cubao, Baguio, Pasay)").toLowerCase();
                        const bus = buses.find(b => b.name.toLowerCase() === busChoice);
                        
                        if (bus) {
                            // Prompt for adding or removing a reservation
                            let manageAction = prompt("Choose to ADD or REMOVE a reservation").toUpperCase();
                            
                            if (manageAction === 'ADD') {
                                // Get seat number and customer name to reserve
                                let seatNumber = parseInt(prompt("Enter seat number to reserve (1-30):"));
                                let customerName = prompt("Enter customer's name:");
                                reserveSeat(bus, customerName, seatNumber); // Reserve the seat
                            } else if (manageAction === 'REMOVE') {
                                // Get customer name to cancel reservation
                                let customerName = prompt("Enter customer's name:");
                                cancelReservation(bus, customerName); // Cancel the reservation
                            }
                        } else {
                            console.log('Bus not found.'); // Inform if the bus does not exist
                        }
                        break;
                    case 'LOGOUT':
                        // End the ticket person session
                        ticketPersonActive = false;
                        break;
                    default:
                        console.log('Invalid action.'); // Handle invalid action
                }
            }
        } else {
            console.log('Authentication failed.'); // Inform if authentication fails
        }
    } else if (role === 'CUSTOMER') {
        // Customer flow
        let customerActive = true; // Flag to keep the customer session active
        while (customerActive) {
            // Display available buses
            console.log("Available Buses:");
            buses.forEach(bus => console.log(bus.name));
            // Prompt for action: RESERVE, CANCEL RESERVATION, or CANCEL
            let action = prompt("Choose an action: RESERVE, CANCEL RESERVATION, CANCEL").toUpperCase();
            
            switch (action) {
                case 'RESERVE':
                    // Prompt for which bus to reserve
                    let busChoice = prompt("Choose a bus (Cubao, Baguio, Pasay)").toLowerCase();
                    const bus = buses.find(b => b.name.toLowerCase() === busChoice);
                    
                    if (bus) {
                        displaySeats(bus); // Show available seats in the chosen bus
                        let seatNumber = parseInt(prompt("Enter seat number to reserve (1-30):"));
                        let customerName = prompt("Enter your name:");
                        reserveSeat(bus, customerName, seatNumber); // Reserve the seat
                    } else {
                        console.log('Bus not found.'); // Inform if the bus does not exist
                    }
                    break;
                case 'CANCEL RESERVATION':
                    // Prompt for which bus to cancel reservation
                    let cancelBusChoice = prompt("Which bus did you reserve? (Cubao, Baguio, Pasay)").toLowerCase();
                    const cancelBus = buses.find(b => b.name.toLowerCase() === cancelBusChoice);
                    
                    if (cancelBus) {
                        let customerName = prompt("Enter your name:");
                        cancelReservation(cancelBus, customerName); // Cancel the reservation
                    } else {
                        console.log('Bus not found.'); // Inform if the bus does not exist
                    }
                    break;
                case 'CANCEL':
                    // End the customer session
                    customerActive = false;
                    break;
                default:
                    console.log('Invalid action.'); // Handle invalid action
            }
        }
    } else {
        console.log('Invalid role.'); // Inform if the role is invalid
    }
}

// Start the program
main();
