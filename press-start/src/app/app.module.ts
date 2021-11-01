import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AlterarCadastroComponent } from './components/alterar-cadastro/alterar-cadastro.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { BoletoComponent } from './components/pagamento/boleto/boleto.component';
import { NgxPrintModule } from 'ngx-print';
=======
import { HttpClientModule } from '@angular/common/http';
import { JogoListaComponent } from './components/jogo-lista/jogo-lista.component';
>>>>>>> 5ba2668f9de16141345de1268a5d9a8a20852fe3

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'alterar-cadastro', component: AlterarCadastroComponent },
<<<<<<< HEAD
  { path: 'pagamento', component: PagamentoComponent},
  { path: 'pagamento/boleto', component: BoletoComponent}
=======
  { path: 'jogos', component: JogoListaComponent },
  { path: 'jogos/:id', component: JogoComponent }
>>>>>>> 5ba2668f9de16141345de1268a5d9a8a20852fe3
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    AlterarCadastroComponent,
    MenuComponent,
    JogoComponent,
<<<<<<< HEAD
    PagamentoComponent,
    BoletoComponent
=======
    JogoListaComponent
>>>>>>> 5ba2668f9de16141345de1268a5d9a8a20852fe3
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    NgxPrintModule
=======
    HttpClientModule
>>>>>>> 5ba2668f9de16141345de1268a5d9a8a20852fe3
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
