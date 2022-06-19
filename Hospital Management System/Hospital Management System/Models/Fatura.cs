using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Fatura
    {
        public int IdUserRecepsionisti { get; set; }
        public int IdPacienti { get; set; }
        public int IdFatura { get; set; }
        public string Pershkrimi { get; set; } = null!;
        public DateTime Data { get; set; }
        public decimal PagesaTotale { get; set; }
        public string Statusi { get; set; } = null!;

        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
        public virtual User? IdUserRecepsionistiNavigation { get; set; }
    }
}
