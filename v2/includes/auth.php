<?php
	function check_auth() {
		require_once("db.php");
		session_start();
		$_SESSION["logged"] = true;
		$_SESSION["id"] = "32182708-0547-11ef-a34e-c62f196bb7a8";
		if (isset($_SESSION["logged"]) && $_SESSION["logged"] == true) {
			// verificare l'utente e indirizzarlo alla pagina corretta

			// questo è il modo giusto ma è ancora da sviluppare
			//$result = query("select * from users where id=?", [$_SESSION["id"]]);
			$query = "SELECT * FROM users WHERE id_user='".$_SESSION["id"]."'";
			$result = query($query)[0];

			// verificare type dell'user per indirizzarlo a quello corretto
			
			$vartype = "student";

			switch($vartype) {
				case "student":
					//header("Location: student.php");
					break;
				case "delegate":
					header("Location: index.php");
					break;
				case "school":
					header("Location: index.php");
					break;
				default:
					header("Location: login.php");
					break;
			}
		} else {
			// utente non loggato
			//header("Location: login.php");
			echo "non funzia";
		}
	}
?>
