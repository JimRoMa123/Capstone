import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/main-dashboar', 
    pathMatch: 'full'
  },
  {
    path: 'folder/main-dashboar',
    loadChildren: () => import('./folder/main-dashboar/main-dashboar.module').then(m => m.MainDashboarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/crear-producto',
    loadChildren: () => import('./folder/crear-producto/crear-producto.module').then(m => m.CrearProductoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/listar-ventas',
    loadChildren: () => import('./folder/listar-ventas/listar-ventas.module').then(m => m.ListarVentasPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'folder/proveedor-ubicacion',
    loadChildren: () => import('./folder/proveedor-ubicacion/proveedor-ubicacion.module').then(m => m.ProveedorUbicacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/crear-categoria',
    loadChildren: () => import('./folder/crear-categoria/crear-categoria.module').then(m => m.CrearCategoriaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/listar-clientes',
    loadChildren: () => import('./folder/listar-clientes/listar-clientes.module').then(m => m.ListarClientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/clientes',
    loadChildren: () => import('./folder/clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/listar-proveedores',
    loadChildren: () => import('./folder/listar-proveedores/listar-proveedores.module').then(m => m.ListarProveedoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/proveedores',
    loadChildren: () => import('./folder/proveedores/proveedores.module').then(m => m.ProveedoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/listar-ordenes',
    loadChildren: () => import('./folder/listar-ordenes/listar-ordenes.module').then(m => m.ListarOrdenesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./folder/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
