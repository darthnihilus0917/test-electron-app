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
    const input = event.target;
    const file = input.files[0];
    const extension = file.name.split(".")[1];
    const allValid = validate();
    onProcessButton.disabled = (extension !== 'xlsx' || !allValid) ? true : false;
});

const selectFields = [selectMeatCategory, selectProcess];
selectFields.forEach((selectField) => {
    selectField.addEventListener('change', (event) => {
        const allValid = validate();
        onProcessButton.disabled = (!allValid) ? true : false;
    });
});

onProcessButton.addEventListener('click', (event) => {
    const endpont = (selectProcess.value === "COPY SOTC DATA") ? "sotc" : "generate";
    const payload = JSON.stringify({ 
        "sapFile": sapInputFile.value,
        "meat": selectMeatCategory.value,
        "action": selectProcess.value
    })
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: payload,
        redirect: "follow"
    };

    fetch(`http://localhost:5555/${endpont}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
});

onExitButton.addEventListener('click', () => {
    console.log('Closing App...')
});