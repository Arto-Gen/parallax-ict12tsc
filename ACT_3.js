/**
 * FOUNDATION TEMPORAL SERVICES
 * Regional Site-14 (Philippines)
 */

function updateTerminal() {
    const now = new Date();

    // Force Philippine Standard Time (PHT)
    const timeOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const dateOptions = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    // Format strings
    const timeString = now.toLocaleTimeString('en-GB', timeOptions);
    const dateString = now.toLocaleDateString('en-CA', dateOptions); // YYYY-MM-DD

    // Update the DOM
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date-display');

    if (clockElement) {
        clockElement.textContent = timeString;
    }
    
    if (dateElement) {
        dateElement.textContent = dateString;
    }

    // Console log for "debug" feel (Optional)
    if (now.getSeconds() % 10 === 0) {
        console.log(`[SYSTEM] Temporal Sync: ${timeString} PHT`);
    }
}

// Initial Call
updateTerminal();

// Refresh every second
setInterval(updateTerminal, 1000);