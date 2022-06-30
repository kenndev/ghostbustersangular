import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { HomeComponent } from './home/home.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { FooterComponent } from './footer/footer.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthlayoutComponent,
    LoginComponent,
    RegisterComponent,
    PasswordresetComponent,
    HomeComponent,
    MoviedetailComponent,
    FooterComponent,
    SubscribeComponent,
    ProfileComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
