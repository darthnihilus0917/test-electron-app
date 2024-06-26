// FIELDS
const sapInputFile = document.getElementById('sap-file');
const selectMeatCategory = document.getElementById('select-meat');
const selectProcess = document.getElementById('select-process');

// BUTTONS
const onProcessButton = document.getElementById('app-process');
onProcessButton.disabled = true;

const onExitButton = document.getElementById('app-exit');
const createFileButton = document.getElementById('createFileButton');

// ALERT
const alertSection = document.getElementById('validation-alert');

const validate = () => {    
    const fields = [
        sapInputFile.value.length,
        selectMeatCategory.value.length,
        selectProcess.value.length
    ];    
    return fields.map((field) => { return (field > 1) ? true : false; }).every(f => f === true);
}

sapInputFile.addEventListener('change', (event) => {
    try {
        alertSection.classList.add("d-none");

        const input = event.target;
        const file = input.files[0];
        const extension = file.name.split(".")[1];
        const allValid = validate();
        onProcessButton.disabled = (extension !== 'xlsx' || !allValid) ? true : false;
        
        if (extension !== 'xlsx') {
            alertSection.classList.remove("d-none");
            alertSection.classList.add("bg-danger");
            alertSection.innerText = "ERROR: Invalid spreadsheet file.";
        } else {
            alertSection.classList.add("d-none");
            alertSection.innerText = "";
        }
    } catch(error) {
        onProcessButton.disabled = true;
    }
});

const selectFields = [selectMeatCategory, selectProcess];
selectFields.forEach((selectField) => {
    selectField.addEventListener('change', (event) => {
        alertSection.classList.add("d-none");
        const allValid = validate();
        onProcessButton.disabled = (!allValid) ? true : false;
    });
});

onProcessButton.addEventListener('click', async(event) => {
    try {
        alertSection.classList.add("d-none");

        onExitButton.disabled = true;
        event.target.disabled = true;
        event.target.innerHTML = `<div class="spinner-border spinner-border-sm text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div> Processing...`;

        const endpont = (selectProcess.value === "COPY SOTC DATA") ? "sotc" : "generate";
        const payload = JSON.stringify({ 
            "sapFile": sapInputFile.value,
            "meat": selectMeatCategory.value,
            "action": selectProcess.value
        });        
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
    
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload,
            redirect: "follow"
        };

        const response = await fetch(`http://localhost:5555/${endpont}`, requestOptions);
        // console.log(response)
        // console.log(response.json())
        const { msg } = await response.json();
        console.log(msg)

        alertSection.classList.remove("d-none");
        alertSection.classList.remove("bg-danger");

        const alertCss = (response.statusText === "OK" && msg.isProcessed) ? "bg-success" : "bg-danger";
        alertSection.classList.add(alertCss);
        alertSection.innerText = msg.statusMsg;

        event.target.innerHTML = `Process`;
        event.target.disabled = false;
        onExitButton.disabled = false;
        
    } catch(error) {

        alertSection.classList.remove("d-none");
        alertSection.classList.add("bg-danger");
        alertSection.innerText = `ERROR: ${error}`;
    }
});

onExitButton.addEventListener('click', () => {
    console.log('Closing App...');
    window.electronAPI.closeWindow();
});