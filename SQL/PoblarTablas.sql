INSERT INTO monedas (nombre)
VALUES ('Dólar'),
       ('Euro'),
       ('Peso Colombiano'),
       ('Yen Japonés'),
       ('Libra Esterlina');


INSERT INTO bodegas (nombre)
VALUES ('Bodega Central'),
       ('Bodega Norte'),
       ('Bodega Sur'),
       ('Bodega Este'),
       ('Bodega Oeste');

INSERT INTO sucursales (nombre)
VALUES ('Sucursal A'),
       ('Sucursal B'),
       ('Sucursal C'),
       ('Sucursal D'),
       ('Sucursal E');

INSERT INTO bodega_sucursal (nombreSucursal, nombreBodega)
VALUES  ('Sucursal A', 'Bodega Central'),    
        ('Sucursal A', 'Bodega Norte'),      
        ('Sucursal A', 'Bodega Sur'),             
        ('Sucursal B', 'Bodega Central'),
        ('Sucursal B', 'Bodega Norte'),      
        ('Sucursal C', 'Bodega Sur'),        
        ('Sucursal D', 'Bodega Este'),       
        ('Sucursal E', 'Bodega Oeste');

INSERT INTO productos (codigo, nombre, bodega, sucursal, moneda, precio, materiales, descripcion)
VALUES ('P001', 'Producto 1', 'Bodega Central', 'Sucursal A', 'Dólar', 19.99, 'Plástico,Metal', 'Descripción del Producto 1'),
       ('P002', 'Producto 2', 'Bodega Norte', 'Sucursal B', 'Euro', 29.99, 'Madera,Cuero', 'Descripción del Producto 2'),
       ('P003', 'Producto 3', 'Bodega Sur', 'Sucursal C', 'Peso Colombiano', 39.99, 'Vidrio,Plástico', 'Descripción del Producto 3'),
       ('P004', 'Producto 4', 'Bodega Este', 'Sucursal D', 'Yen Japonés', 49.99, 'Metal,Madera', 'Descripción del Producto 4'),
       ('P005', 'Producto 5', 'Bodega Oeste', 'Sucursal E', 'Libra Esterlina', 59.99, 'Cuero,Vidrio', 'Descripción del Producto 5');