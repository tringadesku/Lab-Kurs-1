using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class ActivityLogUser
    {
        public int Id { get; set; }
        public int IdUserAdmin { get; set; }
        public string Activity { get; set; } = null!;
        public DateTime Ora { get; set; }

        [JsonIgnore]
        public virtual User? IdUserAdminNavigation { get; set; } 
    }
}
