using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Operacioni
    {
        public int IdUserMjekuKryesor { get; set; }
        public int IdPacienti { get; set; }
        public string SallaNr { get; set; } = null!;
        public string IdOperacioni { get; set; } = null!;
        public DateTime Data { get; set; }
        public string Ora { get; set; } = null!;

        [JsonIgnore]
        public virtual Pacienti? IdPacientiNavigation { get; set; }
        [JsonIgnore]
        public virtual User? IdUserMjekuKryesorNavigation { get; set; }
        [JsonIgnore]
        public virtual Dhoma? SallaNrNavigation { get; set; }
    }
}
