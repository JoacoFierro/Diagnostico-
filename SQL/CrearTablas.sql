
CREATE TABLE IF NOT EXISTS bodegas (
    nombre VARCHAR(20) NOT NULL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS sucursales (
    nombre VARCHAR(20) NOT NULL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS monedas (
    nombre VARCHAR(15) NOT NULL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS bodega_sucursal (
    nombreSucursal VARCHAR(20) NOT NULL REFERENCES sucursales(nombre),
    nombreBodega VARCHAR(20) NOT NULL REFERENCES bodegas(nombre),
    PRIMARY KEY (nombreSucursal, nombreBodega)
);


CREATE TABLE IF NOT EXISTS productos (
    codigo VARCHAR(15) NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    bodega VARCHAR(20) NOT NULL REFERENCES bodegas(nombre),
    sucursal VARCHAR(20) NOT NULL REFERENCES sucursales(nombre),
    moneda VARCHAR(15) NOT NULL REFERENCES monedas(nombre),
    precio NUMERIC(20,2) NOT NULL,
    materiales VARCHAR(255) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL
);
