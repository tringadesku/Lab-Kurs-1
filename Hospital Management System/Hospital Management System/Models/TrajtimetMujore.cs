using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class TrajtimetMujore
    {
        public int IdPacienti { get; set; }
        public int NrT { get; set; }
        public DateTime DataFillimit { get; set; }
        public DateTime DataMbarimit { get; set; }
        public string Lloji { get; set; } = null!;

        public virtual Pacienti IdPacientiNavigation { get; set; } = null!;
    }
}
