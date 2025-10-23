<?php

header('Content-Type: application/json');

// Configuración de conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

$codigo = htmlspecialchars($_POST['codigo']);
$nombre = htmlspecialchars($_POST['nombre']);
$bodega = htmlspecialchars($_POST['bodega']);
$sucursal = htmlspecialchars($_POST['sucursal']);
$moneda = htmlspecialchars($_POST['moneda']);
$precio = htmlspecialchars($_POST['precio']);       
$materiales = htmlspecialchars($_POST['materiales']);
$descripcion = htmlspecialchars($_POST['descripcion']);

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname",$user,$password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); // PARA QUE SIRVE ESTE CODIGO

    $stmt = $pdo->prepare("
        INSERT INTO productos (codigo, nombre, bodega, sucursal, moneda, precio, materiales, descripcion)
        VALUES (:codigo, :nombre, :bodega, :sucursal, :moneda, :precio , :materiales, :descripcion)
    ");
    $stmt->execute(['codigo'=>$codigo, 
                    'nombre'=>$nombre, 
                    'bodega'=>$bodega, 
                    'sucursal'=>$sucursal, 
                    'moneda'=>$moneda, 
                    'precio'=>$precio, 
                    'materiales'=>$materiales, 
                    'descripcion'=>$descripcion
                    ]);

    $sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sucursales);

} catch (PDOException $e) {
    echo json_encode(['error'=>$e->getMessage()]);
}

?>