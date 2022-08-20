// TO GET PRODUCTOS
export interface ProductsResponse {
    current_page:   number;
    data:           Flower[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Flower {
    id:            number;
    nombre:        string;
    descripcion:   string;
    precioFinal:   number;
    descuento:     number;
    precioInicial: number;
    stock:         number;
    urlimagen:     string;
    categoria:     Categoria;
}

export enum Categoria {
    ArreglosExpress = "Arreglos express",
    Corazones = "Corazones",
    Coronas = "Coronas",
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}


// TO POST FLORES
export interface ArregloFloral{
    idVendedor: number;
    nombre: string;
    descripcion: string;
    detalles: string;
    precioFinal: number;
    descuento: number;
    precioInicial: number;
    stock: number;
    categorias: number[];
}


// TO GET CATEGORIES

export interface CategoriasResponse {
    data: Categorias[];
}

export interface Categorias {
    id:     number;
    nombre: string;
}
