
const howToDiv = document.getElementById("how_to");
var howToText;

function loadHowToContent() {
    fetch('how_to_content.html') 
    .then(response => response.text())
    .then(html => {
        howToDiv.innerHTML = html;
        howToText = document.getElementById("how_to_text");
    })
    .catch(error => {
        console.error('Error loading external HTML:', error);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadHowToContent();
});

function openHowTo() {
    howToDiv.style.display = 'block';
    const rect = howToText.getBoundingClientRect();
    howToText.style.height = (parseInt(window.getComputedStyle(howToDiv).height)-rect.top)+'px';
}

function closeHowTo() {
    howToDiv.style.display = 'none';
}