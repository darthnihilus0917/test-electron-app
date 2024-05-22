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
