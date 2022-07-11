using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class CovidLab
    {
        public int AnalizaId { get; set; }
        public int IdUserLaboranti { get; set; }
        public int PacientiId { get; set; }
        public string LlojiTestit { get; set; } = null!;
        public string Mostra { get; set; } = null!;
        public DateTime DataAnalizes { get; set; }
        public string Rezultati { get; set; } = null!;

        [JsonIgnore]
        public virtual User? IdUserLaborantiNavigation { get; set; }
        [JsonIgnore]
        public virtual Pacienti? Pacienti { get; set; }
    }
}