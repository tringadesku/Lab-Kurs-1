using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class ActivityLogDhomaSalla
    {
        public int IdUserAdmin { get; set; }
        public string RoomNr { get; set; } = null!;
        public int Id { get; set; }
        public string Activity { get; set; } = null!;
        public DateTime Ora { get; set; }

        public virtual User IdUserAdminNavigation { get; set; } = null!;
        public virtual Dhoma RoomNrNavigation { get; set; } = null!;
    }
}
