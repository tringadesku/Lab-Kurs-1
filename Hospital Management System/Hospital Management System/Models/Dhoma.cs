﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospital_Management_System.Models
{
    public partial class Dhoma
    {
        public Dhoma()
        {
            Operacionis = new HashSet<Operacioni>();
        }

        public string RoomNr { get; set; } = null!;
        public int? NrPacientave { get; set; }

        [JsonIgnore]
        public virtual ICollection<Operacioni> Operacionis { get; set; }
    }
}
