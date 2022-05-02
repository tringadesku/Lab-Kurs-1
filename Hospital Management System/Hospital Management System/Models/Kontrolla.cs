using System;
using System.Collections.Generic;

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

        public virtual Pacienti IdPacientiNavigation { get; set; } = null!;
        public virtual User IdUserMjekuNavigation { get; set; } = null!;
    }
}
