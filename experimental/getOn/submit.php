<?php
// Check for POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST["name"]) ? $_POST["name"] : 'N/A';
    $location = isset($_POST["location"]) ? $_POST["location"] : 'N/A';
    // ... Gather other form fields here ...

    $to = "ellen@ahoy.ooo, alex@ahoy.ooo";
    $subject = "New Artist Submission";
    $message = "Name: " . $name . "\nLocation: " . $location; // You can format this as desired
    $headers = "From: webmaster@yourdomain.com"; // replace with your domain

    if(mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request method.";
}
?>
