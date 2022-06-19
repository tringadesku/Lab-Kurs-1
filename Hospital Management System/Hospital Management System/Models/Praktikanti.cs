using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Praktikanti
    {
        public int IdPraktikanti { get; set; }
        public string EmriPr { get; set; } = null!;
        public string MbiemriPr { get; set; } = null!;
        public int MjekuMbikqyres { get; set; }
        public DateTime DataFillimit { get; set; }
        public DateTime DataPerfundimit { get; set; }
        public int Oret { get; set; }
        public string Aprovimi { get; set; } = null!;
    
        [JsonIgnore]
        public virtual User? MjekuMbikqyresNavigation { get; set; }
    }
}
