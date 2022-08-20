// LISTADO DE PEDIDOS
export interface PedidosResponse {
    data: Pedido[];
}

export interface Pedido {
    idPedido: number;
    pedido:   string;
    fecha:    Date;
    estado:   string;
    total:    number;
}

// LISTADO DE DETALLES DE PEDIDOS

export interface OrderDetails {
    data: Order;
}

export interface Order {
    idCompra:    number;
    fecha:       Date;
    estado:      string;
    facturacion: string;
    email:       string;
    telefono:    number;
    direccion:   string;
    nota:        null;
    articulos:   Articulo[];
}

export interface Articulo {
    urlImagen: string;
    nombre:    string;
    costo:     number;
    cantidad:  number;
    total:     string;
}

// CAMBIAR ESTADO

export interface StatusChange {
    idCompra:    number;
    nuevoEstado: string;
}

