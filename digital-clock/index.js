const refreshRate = 1000;
const clock = document.getElementById('clock');

setInterval(() => {
    const date = new Date();
    
    let timeToString = `${date.getHours().toString().padStart(2, '0')}:
                        ${date.getMinutes().toString().padStart(2, '0')}:
                        ${date.getSeconds().toString().padStart(2, '0')}`;
    
    clock.textContent = timeToString;
}, refreshRate);
