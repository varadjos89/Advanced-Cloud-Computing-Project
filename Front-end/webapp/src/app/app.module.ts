import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ApiService } from './shared/services/api.service';
import { ModalComponent } from './widgets/modal/modal.component';
import { FilterdataPipe } from './shared/pipes/filterdata.pipe';
import { CommentsComponent } from './widgets/comments/comments.component';
import { SocialComponent } from './widgets/social/social.component';
import { TeamComponent } from './widgets/team/team.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsWidgetComponent } from './widgets/products-widget/products-widget.component';
import { NewsletterComponent } from './footer/newsletter/newsletter.component';
import { InfosComponent } from './footer/infos/infos.component';
import { CarrousselComponent } from './widgets/carroussel/carroussel.component';
import { MobileNavComponent } from './header/mobile-nav/mobile-nav.component';
import { MarketingComponent } from './widgets/marketing/marketing.component';
import { FeaturedComponent } from './widgets/featured/featured.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './widgets/slider/slider.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ContactFormComponent } from './widgets/contact-form/contact-form.component';
import { NewsComponent } from './widgets/news/news.component';
import { PostsComponent } from './sidebar/posts/posts.component';
import { BannerComponent } from './widgets/banner/banner.component';
import { BreadcrumbComponent } from './widgets/breadcrumb/breadcrumb.component';
import { MainComponent } from './main/main.component';
import { HomestudentComponent } from './homestudent/homestudent.component';
import { HeaderstudentComponent } from './headerstudent/headerstudent.component';
import { ProductstudentComponent } from './productstudent/productstudent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxToastModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ModalComponent,
    FilterdataPipe,
    CommentsComponent,
    SocialComponent,
    TeamComponent,
    ContactComponent,
    SidebarComponent,
    ProductsWidgetComponent,
    NewsletterComponent,
    InfosComponent,
    CarrousselComponent,
    MobileNavComponent,
    MarketingComponent,
    FeaturedComponent,
    HomeComponent,
    SliderComponent,
    ContactFormComponent,
    NewsComponent,
    PostsComponent,
    BannerComponent,
    BreadcrumbComponent,
    MainComponent,
    HomestudentComponent,
    HeaderstudentComponent,
    ProductstudentComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    IgxToastModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ApiService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
