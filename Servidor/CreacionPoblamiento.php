<?php
// Configuración de la conexión
$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = '1234';

try {
    // Conexión a PostgreSQL
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Carpeta con archivos SQL
    $sqlFolder = __DIR__ . '/SQL';

    // Definir el orden manual de ejecución
    $filesInOrder = [
        $sqlFolder . 'SQL/CrearTablas.SQL',
        $sqlFolder . 'SQL/PoblarTablas.SQL'
        
    ];

    foreach ($filesInOrder as $file) {
        if (!file_exists($file)) {
            echo "⚠️ El archivo $file no existe, se omite.\n";
            continue;
        }

        echo "📄 Ejecutando: " . basename($file) . "...\n";

        // Leer contenido del archivo
        $sql = file_get_contents($file);

        // Separar las consultas por ';' y limpiar espacios
        $queries = array_filter(array_map('trim', explode(';', $sql)));


        foreach ($queries as $query) {
            if (!empty($query)) {
                $pdo->exec($query);
            }
        }

        echo "✅ Archivo " . basename($file) . " ejecutado correctamente.\n\n";
    }

    echo "🎉 Todos los archivos SQL fueron ejecutados correctamente.\n";

} catch (PDOException $e) {
    echo "❌ Error en la conexión o ejecución: " . $e->getMessage() . "\n";
}
