<?php

header('Content-Type: application/json');

// Configuración de conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

$bodega = $_GET['bodega'] ?? '';  // bodega enviada desde JS

if (!$bodega) {
    echo json_encode(['error' => 'No se recibió bodega']);
    exit;
}

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        SELECT nombreSucursal as nombre 
        FROM bodega_sucursal
        WHERE nombreBodega = :bodega
        ORDER BY nombre ASC
    ");
    $stmt->execute(['bodega' => $bodega]);

    $sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sucursales);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>