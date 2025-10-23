<?php
header('Content-Type: application/json');

// Configuración de conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consultar todas las monedas
    $stmt = $pdo->query("SELECT nombre FROM monedas ORDER BY nombre ASC");
    $monedas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($monedas);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
