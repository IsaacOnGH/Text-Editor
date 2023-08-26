const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default behavior
  deferredPrompt = event; // Store the event for later use
  butInstall.style.display = 'block'; // Display the install button
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the installation prompt
    const choiceResult = await deferredPrompt.userChoice; // Wait for user choice
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }
    deferredPrompt = null; // Reset the deferred prompt
    butInstall.style.display = 'none'; // Hide the install button
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed', event);
  // You can perform additional actions here if needed
});
