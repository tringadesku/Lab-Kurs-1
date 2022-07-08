using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Terminet
    {
        public int IdMjeku { get; set; }
        public string IdTermini { get; set; } = null!;
        public int? IdPacienti { get; set; }
        public DateTime Data { get; set; }
        public string Ora { get; set; } = null!;
        public string Lloji { get; set; } = null!;

        [JsonIgnore]
        public virtual User? IdMjekuNavigation { get; set; }
        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
    }
}
