# CodelabGoogleAnalytics

### 1 Add google code in index.html

cambiar xxxxx por id asigando

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=xxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
```

### 2 Observer navigation ends (registro de navegación de url)

importar libs

```
    import { NavigationEnd, Router } from '@angular/router';
    declare var gtag;
```

inyectar libs

```
constructor(private router: Router)
```

cambiar xxxxx por id asigando

```
const navEndEvents$ = this.router.events
.pipe(
  filter(event => event instanceof NavigationEnd)
);

navEndEvents$.subscribe((event: NavigationEnd) => {
  gtag('config', 'xxxxxx', {
    'page_path': event.urlAfterRedirects
  });
});
```

### 3 Cutom events

importar lib

```
    declare var gtag;
```

función para registro de eventos

```
  generateEvent(eventName: string, eventData: object): void {
    gtag('event', eventName, eventData);
  }
```

### 4 error metrics

para usarce en el interceptor o en cathError, en caso de tener un objeto en el error se guarda como string

en caso de que den una categoria especifica para verlo en analytics cambiar sefundo parametro de la función gtag y event_category del objeto

```
generateEventError(error) {
    gtag('event', 'error', {
      event_category: 'error',
      event_label: error?.message ?? '',
      value: error?.status ?? '',
      ...Object.keys(error).reduce((acc, key) => {
        acc[key] =
          typeof error[key] !== 'object'
            ? error[key]
            : JSON.stringify(error[key]);
        return acc;
      }, {}),
    });
  }
```


