// 1. FUNCTION TO SWITCH BETWEEN PAGES
function showPage(pageId, element) {
    // Hisha sections zose
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(s => s.classList.remove('active-section'));

    // Garagaza section ukanzeho
    document.getElementById(pageId).classList.add('active-section');

    // Hindura title iri hejuru hagati mu mbuga
    const titles = {
        'dashboard': 'Clinic Dashboard',
        'register': 'Register New Patient',
        'appointments': 'Appointments List',
        'settings': 'System Settings'
    };
    
    const pageTitleElement = document.getElementById('main-page-title');
    if (pageTitleElement) {
        pageTitleElement.innerText = titles[pageId];
    }

    // Manage sidebar active status (Guhindura ibara rya buto ukanzeho)
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

// 2. FUNCTION TO REGISTER PATIENT AND SAVE TO APPOINTMENTS
function registerAndSave() {
    const nameInput = document.getElementById('reg-name');
    const phoneInput = document.getElementById('reg-phone');
    const appointmentList = document.getElementById('appointment-list');

    // Reba niba amakuru yuzuye
    if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Fata isaha y'ubu
    const now = new Date();
    const timeString = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    // Kora Row nshya ifite n'ama-buttons y'umuganga (Complete & Delete)
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${nameInput.value}</td>
        <td>${phoneInput.value}</td>
        <td>${timeString}</td>
        <td><span class="status waiting">Waiting</span></td>
        <td>
            <button class="btn-status" onclick="completeStatus(this)" style="background:#27ae60; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">Complete</button>
            <button class="btn-delete" onclick="deletePatient(this)" style="background:#e74c3c; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">Delete</button>
        </td>
    `;

    // Yongere kuri table
    appointmentList.appendChild(tr);

    // Hanagura input fields
    const nameValue = nameInput.value;
    nameInput.value = "";
    phoneInput.value = "";

    alert("Patient " + nameValue + " registered successfully!");
    
    // Jyana umukoresha kuri paji y'appointments (Buto ya 3 kuri list)
    const appointmentBtn = document.querySelectorAll('.menu-item')[2];
    showPage('appointments', appointmentBtn);
}

// 3. DOCTOR ACTIONS: COMPLETE STATUS
function completeStatus(button) {
    const row = button.parentElement.parentElement;
    const statusSpan = row.querySelector('.status');
    
    statusSpan.innerText = "Completed";
    statusSpan.className = "status completed"; // Iri bara rirahinduka muri CSS rikaba icyatsi
    
    // Hisha buto ya "Complete" kuko umurimo urangiye
    button.style.display = "none";
}

// 4. DOCTOR ACTIONS: DELETE PATIENT
function deletePatient(button) {
    if (confirm("Are you sure you want to remove this patient from the list?")) {
        const row = button.parentElement.parentElement;
        row.remove();
    }
}

// 5. SETTINGS: UPDATE CLINIC NAME
function updateClinicName() {
    const input = document.getElementById('clinic-name-input');
    const headerDisplay = document.getElementById('header-clinic-name');

    if (input.value.trim() !== "") {
        headerDisplay.innerText = input.value.toUpperCase();
        alert("Settings updated! New Clinic Name: " + input.value);
        input.value = ""; 
    } else {
        alert("Please enter a name first.");
    }
}