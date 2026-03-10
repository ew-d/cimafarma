export interface Product {
  id: string
  name: string
  sku: string
  barcode: string
  price: number
  stock: number
  category: string
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
}

export const categories: Category[] = [
  { id: "todos", name: "Todos" },
  { id: "bebidas", name: "Bebidas" },
  { id: "snacks", name: "Snacks" },
  { id: "lacteos", name: "Lácteos" },
  { id: "limpieza", name: "Limpieza" },
  { id: "panaderia", name: "Panadería" },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Coca-Cola 500ml",
    sku: "BEB-001",
    barcode: "7501055300104",
    price: 18.50,
    stock: 45,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Pepsi 600ml",
    sku: "BEB-002",
    barcode: "7501031311309",
    price: 17.00,
    stock: 32,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Agua Mineral 1L",
    sku: "BEB-003",
    barcode: "7501055363100",
    price: 12.00,
    stock: 78,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Papas Sabritas",
    sku: "SNK-001",
    barcode: "7501011115019",
    price: 22.00,
    stock: 3,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "Doritos Nacho",
    sku: "SNK-002",
    barcode: "7501011117013",
    price: 25.00,
    stock: 18,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "Galletas Oreo",
    sku: "SNK-003",
    barcode: "7622210561176",
    price: 28.50,
    stock: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
  },
  {
    id: "7",
    name: "Leche Entera 1L",
    sku: "LAC-001",
    barcode: "7501055304201",
    price: 24.00,
    stock: 2,
    category: "lacteos",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
  },
  {
    id: "8",
    name: "Yogurt Natural",
    sku: "LAC-002",
    barcode: "7501000111015",
    price: 18.00,
    stock: 15,
    category: "lacteos",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop",
  },
  {
    id: "9",
    name: "Queso Oaxaca 250g",
    sku: "LAC-003",
    barcode: "7501055305215",
    price: 45.00,
    stock: 8,
    category: "lacteos",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop",
  },
  {
    id: "10",
    name: "Detergente 1kg",
    sku: "LIM-001",
    barcode: "7501199420109",
    price: 38.00,
    stock: 22,
    category: "limpieza",
    image: "https://images.unsplash.com/photo-1585441695325-21557f46d477?w=200&h=200&fit=crop",
  },
  {
    id: "11",
    name: "Jabón de Barra",
    sku: "LIM-002",
    barcode: "7501199420208",
    price: 15.00,
    stock: 35,
    category: "limpieza",
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=200&h=200&fit=crop",
  },
  {
    id: "12",
    name: "Pan de Caja",
    sku: "PAN-001",
    barcode: "7501030417019",
    price: 42.00,
    stock: 4,
    category: "panaderia",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
  },
]

export const customers = [
  { id: "1", name: "Cliente General" },
  { id: "2", name: "María García" },
  { id: "3", name: "Juan Pérez" },
  { id: "4", name: "Ana López" },
  { id: "5", name: "Carlos Rodríguez" },
]
