﻿using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class Laboratori
    {
        public int IdUserLaboranti { get; set; }
        public int IdPacienti { get; set; }
        public int NrAnalizes { get; set; }
        public DateTime Data { get; set; }
        public string Lloji { get; set; } = null!;

        public virtual Pacienti IdPacientiNavigation { get; set; } = null!;
        public virtual User IdUserLaborantiNavigation { get; set; } = null!;
    }
}
