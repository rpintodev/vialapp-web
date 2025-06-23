export interface IUsuario {
    Id:            string;
    Usuario:       string;
    Nombre:        string;
    Apellido:      string;
    Telefono:      string;
    Password:      string;
    Imagen:        string;
    IdRol:         number;
    IdTurno:       number;
    Turno:         number;
    Via:           number;
    Firma:         string;
    NombreRol:     string;
    NombrePeaje:   string;
    IdPeaje:       number;
    Estado:        number;
    Grupo:         number;
    session_token: string;
}
