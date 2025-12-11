# Configuración de Google Apps Script para el Formulario

## Paso 1: Crear una Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja de cálculo
2. Ponle un nombre, por ejemplo: "Confirmaciones Boda S&E"
3. En la primera fila, añade estos encabezados:
   - A1: `Fecha/Hora`
   - B1: `Nombre`
   - C1: `Email`
   - D1: `Teléfono`
   - E1: `Dieta Celiaca`
   - F1: `Dieta Vegetariana`

## Paso 2: Crear el Google Apps Script

1. En la hoja de cálculo, ve a **Extensiones** → **Apps Script**
2. Borra todo el código que aparece por defecto
3. Copia y pega el siguiente código:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Crear una nueva fila con los datos
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.celiac ? 'Sí' : 'No',
      data.vegetarian ? 'Sí' : 'No'
    ]);
    
    // Retornar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Datos guardados correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retornar error
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Haz clic en el icono del **disquete** (💾) para guardar
5. Ponle un nombre al proyecto, por ejemplo: "Formulario Boda"

## Paso 3: Desplegar el Script

1. Haz clic en el botón **"Implementar"** → **"Nueva implementación"**
2. Haz clic en el icono de **engranaje** (⚙️) junto a "Seleccionar tipo"
3. Selecciona **"Aplicación web"**
4. Configura:
   - **Descripción**: "API Formulario Boda" (opcional)
   - **Ejecutar como**: "Yo" (tu cuenta de Google)
   - **Quién tiene acceso**: "Cualquier persona"
5. Haz clic en **"Implementar"**
6. Es posible que te pida autorización:
   - Haz clic en **"Autorizar acceso"**
   - Selecciona tu cuenta de Google
   - Haz clic en **"Avanzado"** → **"Ir a [nombre del proyecto] (no seguro)"**
   - Haz clic en **"Permitir"**

## Paso 4: Copiar la URL

1. Una vez implementado, aparecerá un cuadro con la **URL de implementación web**
2. Copia esa URL completa (será algo como: `https://script.google.com/macros/s/AKfycby...../exec`)
3. Ve al archivo `/App.tsx` en tu proyecto
4. En la línea 14, reemplaza `"YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"` con tu URL:

```typescript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/TU_URL_AQUI/exec";
```

## Paso 5: Probar el Formulario

1. Guarda todos los cambios en tu proyecto
2. Prueba el formulario en tu sitio web
3. Verifica que los datos aparezcan en tu Google Sheet

## Notas Importantes

- Cada vez que modifiques el código de Apps Script, debes crear una **nueva implementación** para que los cambios surtan efecto
- Los datos se guardarán automáticamente en la hoja de cálculo
- Puedes exportar los datos a Excel o CSV desde Google Sheets cuando lo necesites
- Si quieres enviar emails automáticos a los usuarios, puedes modificar el código de Apps Script para incluir la función `MailApp.sendEmail()`

## Opcional: Enviar Email de Confirmación Automático

Si quieres que se envíe un email de confirmación automático al usuario, reemplaza el código de Apps Script con este:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Guardar en la hoja
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.celiac ? 'Sí' : 'No',
      data.vegetarian ? 'Sí' : 'No'
    ]);
    
    // Enviar email de confirmación
    var subject = "Confirmación de asistencia - Boda S&E";
    var body = "Hola " + data.name + ",\n\n" +
               "¡Gracias por confirmar tu asistencia a nuestra boda!\n\n" +
               "Datos confirmados:\n" +
               "- Nombre: " + data.name + "\n" +
               "- Email: " + data.email + "\n" +
               "- Teléfono: " + data.phone + "\n" +
               "- Dieta Celiaca: " + (data.celiac ? 'Sí' : 'No') + "\n" +
               "- Dieta Vegetariana: " + (data.vegetarian ? 'Sí' : 'No') + "\n\n" +
               "¡Nos vemos el 12 de abril de 2025!\n\n" +
               "Santiago & Elena";
    
    MailApp.sendEmail(data.email, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Datos guardados y email enviado'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```
