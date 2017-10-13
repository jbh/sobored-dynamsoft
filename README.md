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

#### Current Components

- [ContainerComponent](container)
- [ScanButtonComponent](scan-button)
