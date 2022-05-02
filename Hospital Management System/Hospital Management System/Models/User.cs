using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class User
    {
        public User()
        {
            ActivityLogDhomaSallas = new HashSet<ActivityLogDhomaSalla>();
            ActivityLogUsers = new HashSet<ActivityLogUser>();
            Ambulancas = new HashSet<Ambulanca>();
            Faturas = new HashSet<Fatura>();
            Infuzionets = new HashSet<Infuzionet>();
            Kontrollas = new HashSet<Kontrolla>();
            Laboratoris = new HashSet<Laboratori>();
            Operacionis = new HashSet<Operacioni>();
            Praktikantis = new HashSet<Praktikanti>();
            Terminets = new HashSet<Terminet>();
        }

        public int IdUser { get; set; }
        public string Emri { get; set; } = null!;
        public string Mbiemri { get; set; } = null!;
        public string Pozita { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Password { get; set; }
        public string Nrtelefonit { get; set; } = null!;

        
        public virtual ICollection<ActivityLogDhomaSalla> ActivityLogDhomaSallas { get; set; }
        public virtual ICollection<ActivityLogUser> ActivityLogUsers { get; set; }
        public virtual ICollection<Ambulanca> Ambulancas { get; set; }
        public virtual ICollection<Fatura> Faturas { get; set; }
        public virtual ICollection<Infuzionet> Infuzionets { get; set; }
        public virtual ICollection<Kontrolla> Kontrollas { get; set; }
        public virtual ICollection<Laboratori> Laboratoris { get; set; }
        public virtual ICollection<Operacioni> Operacionis { get; set; }
        public virtual ICollection<Praktikanti> Praktikantis { get; set; }
        public virtual ICollection<Terminet> Terminets { get; set; }
    }
}
