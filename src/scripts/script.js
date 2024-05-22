// FIELDS
const sapInputFile = document.getElementById('sap-file');
const selectMeatCategory = document.getElementById('select-meat');
const selectProcess = document.getElementById('select-process');

// BUTTONS
const onProcessButton = document.getElementById('app-process');
const onExitButton = document.getElementById('app-exit');

const createFileButton = document.getElementById('createFileButton');

createFileButton.addEventListener('click', () => {
    console.log('Button clicked');
    const text = 'Hello, this is a text file!';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.txt';
    a.textContent = 'Download example.txt';

    document.body.appendChild(a);
});

onProcessButton.addEventListener('click', () => {
    console.log('Processing...')
});

onExitButton.addEventListener('click', () => {
    console.log('Closing App...')
});