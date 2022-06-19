export class  Validacion{

// Variables para las validaciones
soloLetrasEspacio: RegExp
= /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/;
soloLetras: RegExp
= /^[a-zA-ZÁÉÍÓÚáéíóúÑñ´]/;
soloNumLetras = '^[0-9a-zA-ZÁÉÍÓÚáéíóúÑñ]*$';
soloCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';
soloNumerosSinEspacio: RegExp
=
/[^a-zA-ZÁÉÍÓÚáéíóúÑñ<>*|"´´@ñ#$%&/\[\]\{¨}~^`()=?¡'/*-+,;:_.¿°-\s]/;
soloDireccion: RegExp
= /^[#.0-9a-zA-ZÁÉÍÓÚáéíóúÑñ\s.,]+$/;
soloFecha: RegExp
= /[^a-zA-Z<>*!|"´´@ñÑ#$%&[\]\{¨}~^`()=?¡'*-+,;:_.¿°-\s]/;
soloAlphaNumeerico: RegExp = /^[^[<>*!|"#$%&/(\]\{})=?¡'/_:,;*-+.¿°-]+$/;
soloNumeros: RegExp = /^[0-9\s]/;
soloNumerosDecimales: RegExp = /^[0-9.\s]/;
}
