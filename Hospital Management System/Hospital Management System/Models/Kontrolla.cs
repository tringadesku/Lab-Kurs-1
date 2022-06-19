using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Kontrolla
    {
        public int IdUserMjeku { get; set; }
        public int IdPacienti { get; set; }
        public string IdKontrolla { get; set; } = null!;
        public string Diagnoza { get; set; } = null!;
        public string? Pershkrimi { get; set; }
        public string? Receta { get; set; }

        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
        [JsonIgnore]
        public virtual User? IdUserMjekuNavigation { get; set; }
    }
}
