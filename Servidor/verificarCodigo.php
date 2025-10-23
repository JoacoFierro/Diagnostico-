<?php
header('Content-Type: application/json');

// -------------- Configuración de conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

$codigo = $_GET['codigo'] ?? ''; 

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ----------- Consultar si esta el codigo en la tabla productos
    
    $stmt = $pdo->prepare("SELECT codigo FROM productos WHERE codigo = :codigo ");
    $stmt->execute(['codigo' => $codigo]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($res) {
    echo json_encode(['existe' => true, 'codigo' => $res['codigo']]);
} else {
    echo json_encode(['existe' => false]);
}

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'mensaje' => 'Error en la base de datos: ' . $e->getMessage()
    ]);
}

?>