<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $location = $_POST["location"];
    // ... Gather other form fields here ...

    $to = "ellen@ahoy.ooo, alex@ahoy.ooo";
    $subject = "New Artist Submission";
    $message = "Name: " . $name . "\nLocation: " . $location; // You can format this as desired
    $headers = "From: webmaster@yourdomain.com"; // replace with your domain

    mail($to, $subject, $message, $headers);
}
?>
