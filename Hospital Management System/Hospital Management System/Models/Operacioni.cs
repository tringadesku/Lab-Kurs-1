using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class Operacioni
    {
        public int IdUserMjekuKryesor { get; set; }
        public int IdPacienti { get; set; }
        public string SallaNr { get; set; } = null!;
        public string IdOperacioni { get; set; } = null!;
        public DateTime Data { get; set; }
        public bool? Statusi { get; set; }

        public virtual Pacienti IdPacientiNavigation { get; set; } = null!;
        public virtual User IdUserMjekuKryesorNavigation { get; set; } = null!;
        public virtual Dhoma SallaNrNavigation { get; set; } = null!;
    }
}
