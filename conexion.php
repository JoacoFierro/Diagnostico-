<?php
$host = "localhost";
$port = "5432";
$db   = "postgres";
$user = "postgres";
$pass = "1234";

// Conectar a PostgreSQL
$conn = pg_connect("host=$host port=$port dbname=$db user=$user password=$pass");

if (!$conn) {
    die("Error de conexión a PostgreSQL.");
}

//---------------------------------Comprobacion de tablas ---------------------------


//---------------------------------Comprobacion de datos ----------------------------

//---------------------------------Insertar datos------------------------------------



// Leer archivo .sql
$sql = file_get_contents('SQL/conexion.sql');

if (!$sql) {
    die("No se pudo leer el archivo SQL.");
}

// Ejecutar las sentencias
$result = pg_query($conn, $sql);

if ($result) {
    echo "Tablas creadas correctamente.";
} else {
    echo "Error al ejecutar SQL: " . pg_last_error($conn);
}

pg_close($conn);
?>
