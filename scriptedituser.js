document.getElementById('loadButton').addEventListener('click', loadJSON);
document.getElementById('addButton').addEventListener('click', addData);
document.getElementById('downloadButton').addEventListener('click', downloadJSON);

let jsonData = [];
let fileName = '';

function loadJSON() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function(event) {
            jsonData = JSON.parse(event.target.result);
            fileName = file.name;
            displayData();
            document.getElementById('formContainer').classList.remove('hidden');
            document.getElementById('downloadButton').classList.remove('hidden');
            document.getElementById('uploadToGithubButton').classList.remove('hidden');
        };
        reader.readAsText(file);
    } else {
        alert('Silakan pilih file JSON yang valid.');
    }
}

function displayData() {
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
}

function addData() {
    const name = document.getElementById('name').value;
    const rank = document.getElementById('rank').value;
    const division = document.getElementById('division').value;

    if (name && rank && division) {
        jsonData.push({ name, rank, division });
        displayData();
        document.getElementById('name').value = '';
        document.getElementById('rank').value = '';
        document.getElementById('division').value = '';
    } else {
        alert('Silakan isi semua field.');
    }
}

function downloadJSON() {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Fungsi untuk mengupload ke GitHub (perlu backend)
document.getElementById('uploadToGithubButton').addEventListener('click', function() {
    alert('Fitur ini memerlukan backend untuk mengupload ke GitHub.');
});