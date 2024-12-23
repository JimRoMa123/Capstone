import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.page.html',
  styleUrls: ['./listar-clientes.page.scss'],
})
export class ListarClientesPage implements OnInit {
  clientes: any[] = [];
  productos: any[] = [];
  productosSeleccionados: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  clienteSeleccionado: any = null;
  impuesto: number = 19;
  metodoPago: string = 'Efectivo';
  estado: string = 'Pendiente';

  constructor(private clientesService: ClientesService, private http: HttpClient) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarProductos();
  }

  cargarClientes() {
    this.isLoading = true;
    this.clientesService.getClientes().subscribe(
      response => {
        this.clientes = response.data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener clientes:', error);
        this.isLoading = false;
      }
    );
  }

  cargarProductos() {
    this.http.get('http://localhost:3000/productos').subscribe(
      (response: any) => {
        this.productos = response.data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  abrirModal(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.isModalOpen = true;
    this.productosSeleccionados = [];
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.clienteSeleccionado = null;
  }

  agregarProductoSeleccionado(producto: any) {
    const productoExistente = this.productosSeleccionados.find((p) => p.id === producto.id);
    if (!productoExistente) {
      this.productosSeleccionados.push({
        ...producto,
        cantidadSeleccionada: 1, // Cantidad inicial
        descuento: 0, // Descuento inicial
      });
    }
  }
  
  eliminarProductoSeleccionado(productoId: number) {
    this.productosSeleccionados = this.productosSeleccionados.filter((p) => p.id !== productoId);
  }

  calcularTotal() {
    const subtotal = this.productosSeleccionados.reduce((sum, producto) => {
      const descuento = (producto.precio_venta * producto.descuento) / 100;
      const precioFinal = producto.precio_venta - descuento;
      return sum + precioFinal * producto.cantidadSeleccionada;
    }, 0);
  
    const totalConImpuesto = subtotal + (subtotal * this.impuesto) / 100; // Agregar el impuesto
    const cantidadProductos = this.productosSeleccionados.reduce((sum, producto) => {
      return sum + producto.cantidadSeleccionada;
    }, 0);
  
    return {
      total: totalConImpuesto.toFixed(2),
      cantidad: cantidadProductos,
    };
  }
  

  realizarVenta() {
    const venta = {
      impuesto: 19, // Fijo, no editable
      metodo_pago: this.metodoPago,
      estado: this.estado,
      cliente_id: this.clienteSeleccionado.id,
      user_id: 1, // Usuario fijo por ahora
      productos: this.productosSeleccionados.map((p) => ({
        producto_id: p.id,
        cantidad: p.cantidadSeleccionada,
        precio_unitario: p.precio_venta,
        descuento: p.descuento || 0, // Si no hay descuento, es 0
      })),
    };
  
    console.log('Venta enviada al backend:', venta);
  
    this.http.post('http://localhost:3000/add-venta', venta).subscribe(
      (response: any) => {
        alert('Venta realizada exitosamente.');
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al realizar la venta:', error);
        alert('Error al realizar la venta.');
      }
    );
  }
  
  
  
}
