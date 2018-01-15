import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColorOptionsDirective } from './directives/coloroptions.directive';
import { ColorpickerComponent } from './components/colorpicker/colorpicker.component';



@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    AutocompleteComponent,
    ColorOptionsDirective,
    ColorpickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    A11yModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
