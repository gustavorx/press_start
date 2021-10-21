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
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { BoletoComponent } from './components/pagamento/boleto/boleto.component';
import { NgxPrintModule } from 'ngx-print';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'alterar-cadastro', component: AlterarCadastroComponent },
  { path: 'pagamento', component: PagamentoComponent},
  { path: 'pagamento/boleto', component: BoletoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    AlterarCadastroComponent,
    MenuComponent,
    JogoComponent,
    PagamentoComponent,
    BoletoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
