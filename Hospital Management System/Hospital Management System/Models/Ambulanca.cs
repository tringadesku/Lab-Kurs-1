using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class Ambulanca
    {
        public int IdUserMjekuLider { get; set; }
        public int NrAuto { get; set; }
        public string Lokacioni { get; set; } = null!;
        public bool? Statusi { get; set; }

        public virtual User IdUserMjekuLiderNavigation { get; set; } = null!;
    }
}
