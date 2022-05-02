using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class Pacienti
    {
        public Pacienti()
        {
            Faturas = new HashSet<Fatura>();
            Infuzionets = new HashSet<Infuzionet>();
            Kontrollas = new HashSet<Kontrolla>();
            Laboratoris = new HashSet<Laboratori>();
            Operacionis = new HashSet<Operacioni>();
            Terminets = new HashSet<Terminet>();
            TrajtimetMujores = new HashSet<TrajtimetMujore>();
        }

        public int IdPacienti { get; set; }
        public string Emri { get; set; } = null!;
        public string Mbiemri { get; set; } = null!;
        public DateTime Ditelindja { get; set; }
        public string Gjinia { get; set; } = null!;
        public string Shteti { get; set; } = null!;
        public string Qyteti { get; set; } = null!;
        public string? EmriRruges { get; set; }
        public string TipiGjakut { get; set; } = null!;
        public bool? Alergji { get; set; }
        public string Nrtelefonit { get; set; } = null!;

        public virtual ICollection<Fatura> Faturas { get; set; }
        public virtual ICollection<Infuzionet> Infuzionets { get; set; }
        public virtual ICollection<Kontrolla> Kontrollas { get; set; }
        public virtual ICollection<Laboratori> Laboratoris { get; set; }
        public virtual ICollection<Operacioni> Operacionis { get; set; }
        public virtual ICollection<Terminet> Terminets { get; set; }
        public virtual ICollection<TrajtimetMujore> TrajtimetMujores { get; set; }
    }
}
