# SoBored Dynamsoft

SoBored Dynamsoft is a module for Angular + Angular Material. More frontend frameworks may be supported in the future.

### Setup

```typescript
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DynamsoftModule } from '@sobored/dynamsoft';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

const dynamsoft_confg = {
  dynamsoft_key: environment.dynamsoft_key
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamsoftModule.forRoot(dynamsoft_confg)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Example app.component.html

```angular2html
<mat-toolbar color="primary">
  <span>Dynamsoft Angular Example</span>
</mat-toolbar>

<sb-dynamsoft-container width="100%" height="500"></sb-dynamsoft-container>

<div id="DynamsoftControls">
  <button mat-raised-button sb-dynamsoft-scan-button>Scan</button>

  <button mat-raised-button sb-dynamsoft-first-page-button>First</button>
  <button mat-raised-button sb-dynamsoft-previous-page-button>Previous</button>
  <sb-dynamsoft-current-page></sb-dynamsoft-current-page>
  /
  <sb-dynamsoft-total-pages></sb-dynamsoft-total-pages>
  <button mat-raised-button sb-dynamsoft-next-page-button>Next</button>
  <button mat-raised-button sb-dynamsoft-last-page-button>Last</button>
</div>
```

#### Documentation

- [ContainerComponent](container)
- [Scanning Directives](scan-button)
- [Pagination Directives and Components](pagination)
- [Save Button Directives](save)


