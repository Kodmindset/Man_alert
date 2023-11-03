document.addEventListener('DOMContentLoaded', function () {
    const serverStatusElement = document.getElementById('serverStatus');
    const alertListElement = document.getElementById('alertList');
  
    // Function to update server status
    function updateServerStatus(status) {
      serverStatusElement.textContent = status;
    }
  
    // Function to add an alert to the alert list
    function addAlert(alertText) {
      const li = document.createElement('li');
      li.textContent = alertText;
      alertListElement.appendChild(li);
    }
  
    // Simulated email alert data (Replace with real data)
    const emailAlerts = [
      'HTTP Status Code: 200\nResponse Time: 1100 ms\nHigh Server Load Detected\nMessage sent at 11/3/2023, 7:46:02 AM',
      // Add more email alerts as needed
    ];
  
    // Extract and display the server status and recent alerts from email messages
    emailAlerts.forEach((emailAlert) => {
      const alertLines = emailAlert.split('\n');
      if (alertLines.length >= 3) {
        const statusLine = alertLines[0];
        const timeLine = alertLines[2];
        const statusMatch = /HTTP Status Code: (\d+)/.exec(statusLine);
        const timeMatch = /Message sent at (.+)/.exec(timeLine);
  
        if (statusMatch && timeMatch) {
          const statusCode = statusMatch[1];
          const timestamp = timeMatch[1];
          const alertText = `HTTP Status Code: ${statusCode}\nResponse Time: 1100 ms\nHigh Server Load Detected\nMessage sent at ${timestamp}`;
          addAlert(alertText);
        }
      }
    });
  
    // Example: Update server status (Replace with real status)
    updateServerStatus('Server is online');
  
    // You can update server status and add alerts dynamically as needed
  });
  