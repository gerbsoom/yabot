<html>
	<head>
		<title>YaBot Game</title>
		<meta http-equiv="content-type" content="text/html; charset=iso-8859-1"/>
		<link rel="stylesheet" type="text/css" href="css/botgame.css"/>
		<link rel="stylesheet" type="text/css" href="css/toolbar-tries.css"/>
<?php
    // toDo: Add generating entries for CSS files and init/startup functions
    // toDo: Parse the available session values to re-apply the login state
    // toDo: Setup all parameters accordingly to the stored session values
    // generate all JavaScript includes
    foreach (file(__DIR__."/js/includes.txt") as $jsInclude)
    {
        echo "<script type='text/javascript' src=$jsInclude></script>";
    }
?>
	</head>
	<body>
		<script>
            setupUI();
            loadAllImages();
        </script>
	</body>
</html>
