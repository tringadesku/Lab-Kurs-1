using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Infuzionet
    {
        public int Id { get; set; }
        public int IdInfermieri { get; set; }
        public int IdPacienti { get; set; }
        public string Lloji { get; set; } = null!;
        public DateTime? Ora { get; set; }

        [JsonIgnore]
        public virtual User? IdInfermieriNavigation { get; set; }

        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
    }
}
