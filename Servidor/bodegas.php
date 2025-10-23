<?php

header('Content-Type: application/json');

// ------------- Configuración de conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ---------  Consultar todas las bodegas
    $stmt = $pdo->query("SELECT nombre FROM bodegas ORDER BY nombre ASC");
    $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bodegas);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>