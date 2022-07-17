# Componente Angular HTTP

<img src="http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=orange&style=for-the-badge" />

> Versão 1.0.0 Componente node para requisições HTTP.

## Instalação

Instalar o componente **HTTP**

```typescript
npm i -D www
```

### Funcionalidades disponíveis

|HttpRequestClientServices|  |
|--|--|
| `execute<T>(method: HttpMethod, path: string, headerParams?: HttpParameters, queryParams?: HttpParameters, bodyParams?: object)` | Constrói uma solicação HTTP de acordo com o tipo informado e retorna a resposta como o tipo de objeto informado. |
|||

### Utilização

Para começar a usar o "Module HTTP" com Angular, siga as etapas abaixo:

1. Adicione o modulo `HttpModule` no `imports` no arquivo `src/app/app.module.ts`:

```typescript
import { AppComponent } from './app.component';
import { AuthorizeGard } from './guard/AuthorizeGuard';
import { HttpModule } from '@angular-module/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Injete a classe de serviço **HttpRequestClientServices** no construtor do componente que irá utilizar:

```typescript
import { HttpRequestClientServices } from '@angular-module/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ServiceClass {
  constructor(private httpRequestClientServices: HttpRequestClientServices) {}
}
```

3. Para realizar uma requisição, será necessário executar o método **execute** da classe **HttpRequestClientServices**. Esse método recebe alguns parâmetros, sendo os dois primeiros obrigatórios:

- **@param method (_[HTTPMethod]()_)**: Tipo de metodo utilizado na reqisição.

- **@param path (_string_)**: URL do endpoint para requisição.

```typescript
import { HttpRequestClientServices } from '@angular-module/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServiceClass {
  constructor(private httpRequestClientServices: RequestServices) {}

  todo(): Observable<any[]> {
    return this.httpRequestClientServices.execute<any[]>(HttpMethod.Get, `/url`);
  }
}
```
#
## Contribuidores
<a href="https://github.com/FlavioVissoto/angular-http/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FlavioVissoto/angular-http" />
</a>
