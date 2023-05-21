let appointments = [];

// Get all input elements
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');


const appointmentList = document.getElementById('appointment-list');


function addAppointment() {

    const name = nameInput.value;
    const number = numberInput.value;
    const date = dateInput.value;
    const time = timeInput.value;


    const appointment = {
        id: appointments.length + 1,
        doctorName: "Dr. John Doe",
        status: "Pending",
        date: date,
        time: time,

        patientName: name,
        patientNumber: number
    };


    appointments.push(appointment);
    if (name === "") {
        alert("please fill the form");
        return false;
    }
    if (number === "" && number.length !== 10) {
        alert("please fill the form");
        return false;
    }

    nameInput.value = "";
    numberInput.value = "";
    dateInput.value = "";
    timeInput.value = "";


    updateAppointmentList();
}


function deleteAppointment(id) {

    const index = appointments.findIndex(appointment => appointment.id === id);


    appointments.splice(index, 1);


    updateAppointmentList();
}


function updateAppointmentStatus(id, status) {

    const appointment = appointments.find(appointment => appointment.id === id);

  
    appointment.status = status;


    updateAppointmentList();

    // Alert the user if the status has changed to "Confirmed"
    if (status === "Confirmed") {
        alert(`Appointment ${id} has been confirmed!`);
    }
}

// Function to update the appointment list
function updateAppointmentList() {
    // Clear the appointment list
    appointmentList.innerHTML = "";

    
    for (const appointment of appointments) {
        const listItem = document.createElement('li');

        
        const data = `${appointment.id} - ${appointment.doctorName} - ${appointment.patientName} - (${appointment.patientNumber}) - ${appointment.status}`;
        listItem.innerText = data;

        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', () => {
            deleteAppointment(appointment.id);
        });

        const confirmButton = document.createElement('button');
        confirmButton.innerText = "Confirm";
        confirmButton.addEventListener('click', () => {

            updateAppointmentStatus(appointment.id, "Confirmed");
        });

        const cancelButton = document.createElement('button');
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener('click', () => {
            updateAppointmentStatus(appointment.id, "Canceled");
        });

        
        listItem.appendChild(deleteButton);
        listItem.appendChild(confirmButton);
        listItem.appendChild(cancelButton);

        
        appointmentList.appendChild(listItem);
    }
}


const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addAppointment);