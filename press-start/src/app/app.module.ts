import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AlterarCadastroComponent } from './components/alterar-cadastro/alterar-cadastro.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { HttpClientModule } from '@angular/common/http';
import { BoletoComponent } from './components/pagamento/boleto/boleto.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { JogoListaComponent } from './components/jogo-lista/jogo-lista.component';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ResumoPedidoComponent } from './components/pagamento/resumoPedido/resumoPedido.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LoggedInAuthGuard } from './components/guards/loggedInAuth.guard';
import { AuthGuard } from './components/guards/auth.guard';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdmJogosComponent } from './components/adm-jogos/adm-jogos.component';
import { JogoService } from './components/services/jogo.service';
import { ResumoPedidoComponentCartao } from './components/pagamento/resumoPedidoCartao/resumoPedidoCartao.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'alterar-cadastro', component: AlterarCadastroComponent, canActivate: [AuthGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [AuthGuard] },
  { path: 'pagamento/boleto/:cpf/:nomeCompleto', component: BoletoComponent },
  { path: 'jogos', component: JogoListaComponent },
  { path: 'jogos/:id', component: JogoComponent },
  { path: 'jogos', component: JogoListaComponent },
  { path: 'jogos/:id', component: JogoComponent },
  { path: '', component: HomeComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'jogo/adm/:id', component: AdmJogosComponent, canActivate: [AuthGuard] },
  { path: 'jogo/adm', component: AdmJogosComponent, canActivate: [AuthGuard] },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarrinhoComponent,
    CadastroComponent,
    AlterarCadastroComponent,
    MenuComponent,
    JogoComponent,
    JogoListaComponent,
    PagamentoComponent,
    BoletoComponent,
    ResumoPedidoComponent,
    PedidosComponent,
    HomeComponent,
    ResumoPedidoComponentCartao,
    AdmJogosComponent,
    UsuarioComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard, LoggedInAuthGuard, JogoService],
  bootstrap: [AppComponent],
})
export class AppModule { }