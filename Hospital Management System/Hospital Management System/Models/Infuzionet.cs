using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Infuzionet
    {
        public int Id { get; set; }
        public int IdInfermieri { get; set; }
        public int IdPacienti { get; set; }
        public string Lloji { get; set; } = null!;
        public DateTime Data { get; set; }
        public string Ora { get; set; } = null!;

        [JsonIgnore]
        public virtual User? IdInfermieriNavigation { get; set; }
        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
    }
}
