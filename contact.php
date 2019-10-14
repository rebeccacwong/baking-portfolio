<?php
if($_POST["message"]) {
    mail("rebeccacwong25@gmail.com", "Form to email message", $_POST["message"], "From:", $_POST["name"], $_POST["email"]);
}
?>