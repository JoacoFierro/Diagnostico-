INSERT INTO monedas (nombre)
VALUES ('Dólar'),
       ('Euro'),
       ('Peso Colombiano'),
       ('Yen Japonés'),
       ('Libra Esterlina');


INSERT INTO bodegas (nombre)
VALUES ('Bodega 1'),
       ('Bodega 2'),
       ('Bodega 3'),
       ('Bodega 4'),
       ('Bodega 5');

INSERT INTO sucursales (nombre)
VALUES ('Sucursal 1'),
       ('Sucursal 2'),
       ('Sucursal 3'),
       ('Sucursal 4'),
       ('Sucursal 5');

INSERT INTO bodega_sucursal (nombreSucursal, nombreBodega)
VALUES  ('Sucursal 1', 'Bodega 1'),    
        ('Sucursal 1', 'Bodega 2'),      
        ('Sucursal 1', 'Bodega 3'),             
        ('Sucursal 2', 'Bodega 1'),
        ('Sucursal 2', 'Bodega 2'),      
        ('Sucursal 3', 'Bodega 3'),        
        ('Sucursal 4', 'Bodega 4'),       
        ('Sucursal 5', 'Bodega 5');

INSERT INTO productos (codigo, nombre, bodega, sucursal, moneda, precio, materiales, descripcion)
VALUES ('P001S', 'Producto 1', 'Bodega 1', 'Sucursal 1', 'Dólar', 19.99, 'Plástico,Metal', 'Descripción del Producto 1'),
       ('P002S', 'Producto 2', 'Bodega 2', 'Sucursal 2', 'Euro', 29.99, 'Madera,Cuero', 'Descripción del Producto 2'),
       ('P003S', 'Producto 3', 'Bodega 3', 'Sucursal 3', 'Peso Colombiano', 39.99, 'Vidrio,Plástico', 'Descripción del Producto 3'),
       ('P004S', 'Producto 4', 'Bodega 4', 'Sucursal 4', 'Yen Japonés', 49.99, 'Metal,Madera', 'Descripción del Producto 4'),
       ('P005S', 'Producto 5', 'Bodega 5', 'Sucursal 5', 'Libra Esterlina', 59.99, 'Cuero,Vidrio', 'Descripción del Producto 5');