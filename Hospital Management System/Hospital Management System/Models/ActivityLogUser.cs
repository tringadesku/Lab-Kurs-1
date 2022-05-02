using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class ActivityLogUser
    {
        public int IdUserAdmin { get; set; }
        public int Id { get; set; }
        public string Activity { get; set; } = null!;
        public DateTime Ora { get; set; }

        public virtual User IdUserAdminNavigation { get; set; } = null!;
    }
}
