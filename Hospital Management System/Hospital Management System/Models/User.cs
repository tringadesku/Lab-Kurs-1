using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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


        [JsonIgnore]
        public virtual ICollection<ActivityLogDhomaSalla> ActivityLogDhomaSallas { get; set; }

        [JsonIgnore]
        public virtual ICollection<ActivityLogUser> ActivityLogUsers { get; set; }

        [JsonIgnore]
        public virtual ICollection<Ambulanca> Ambulancas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Fatura> Faturas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Infuzionet> Infuzionets { get; set; }
        [JsonIgnore]
        public virtual ICollection<Kontrolla> Kontrollas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Laboratori> Laboratoris { get; set; }
        [JsonIgnore]
        public virtual ICollection<Operacioni> Operacionis { get; set; }
        [JsonIgnore]
        public virtual ICollection<Praktikanti> Praktikantis { get; set; }
        [JsonIgnore]
        public virtual ICollection<Terminet> Terminets { get; set; }
    }
}
