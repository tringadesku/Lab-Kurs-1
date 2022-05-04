using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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
        public string Nrtelefonit { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Fatura> Faturas { get; set; }

        [JsonIgnore]
        public virtual ICollection<Infuzionet> Infuzionets { get; set; }

        [JsonIgnore]
        public virtual ICollection<Kontrolla> Kontrollas { get; set; }

        [JsonIgnore]
        public virtual ICollection<Laboratori> Laboratoris { get; set; }

        [JsonIgnore]
        public virtual ICollection<Operacioni> Operacionis { get; set; }

        [JsonIgnore]
        public virtual ICollection<Terminet> Terminets { get; set; }

        [JsonIgnore]
        public virtual ICollection<TrajtimetMujore> TrajtimetMujores { get; set; }
    }
}
