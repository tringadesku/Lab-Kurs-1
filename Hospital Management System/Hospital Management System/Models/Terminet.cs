using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class Terminet
    {
        public int IdMjeku { get; set; }
        public string IdTermini { get; set; } = null!;
        public int? IdPacienti { get; set; }
        public DateTime Data { get; set; }
        public string Lloji { get; set; } = null!;

        public virtual User IdMjekuNavigation { get; set; } = null!;
        public virtual Pacienti? IdPacientiNavigation { get; set; }
    }
}
