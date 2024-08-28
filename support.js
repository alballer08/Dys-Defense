document.getElementById('support-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;

    // Send the form data to your email
    emailjs.send("service_v0nolgl", "template_tvz6los", {
        from_email: email,
        message: issue
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your support ticket has been submitted!');
    }, function(error) {
        console.log('FAILED...', error);
        alert('There was an error submitting your ticket. Please try again.');
    });

    document.getElementById('support-form').reset();
});

