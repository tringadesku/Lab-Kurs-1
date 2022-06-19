using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Ambulanca
    {

        public int NrAuto { get; set; }
        public int IdUserMjekuLider { get; set; }
        public string Lokacioni { get; set; } = null!;
        public string Statusi { get; set; } = null!;

        [JsonIgnore]
        public virtual User? IdUserMjekuLiderNavigation { get; set; }
    }
}
