using System;
using System.Collections.Generic;

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
        public bool? Aprovimi { get; set; }

        public virtual User MjekuMbikqyresNavigation { get; set; } = null!;
    }
}
