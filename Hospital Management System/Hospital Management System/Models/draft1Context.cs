using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Hospital_Management_System.Models
{
    public partial class draft1Context : DbContext
    {
        public draft1Context()
        {
        }

        public draft1Context(DbContextOptions<draft1Context> options) : base(options)
        {
        }

        public virtual DbSet<ActivityLogDhomaSalla> ActivityLogDhomaSallas { get; set; } = null!;
        public virtual DbSet<ActivityLogUser> ActivityLogUsers { get; set; } = null!;
        public virtual DbSet<Ambulanca> Ambulancas { get; set; } = null!;
        public virtual DbSet<Dhoma> Dhomas { get; set; } = null!;
        public virtual DbSet<Fatura> Faturas { get; set; } = null!;
        public virtual DbSet<Infuzionet> Infuzionets { get; set; } = null!;
        public virtual DbSet<Kontrolla> Kontrollas { get; set; } = null!;
        public virtual DbSet<Laboratori> Laboratoris { get; set; } = null!;
        public virtual DbSet<Operacioni> Operacionis { get; set; } = null!;
        public virtual DbSet<Pacienti> Pacientis { get; set; } = null!;
        public virtual DbSet<Praktikanti> Praktikantis { get; set; } = null!;
        public virtual DbSet<Terminet> Terminets { get; set; } = null!;
        public virtual DbSet<TrajtimetMujore> TrajtimetMujores { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=draft1;Trusted_Connection=True;");
            }
        }
        //We override the OnModelCreating method from out derived context and use ModelBuilder API to configure our models
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityLogDhomaSalla>(entity =>
            {
                entity.ToTable("ActivityLogDhoma_Salla");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Activity)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IdUserAdmin).HasColumnName("ID_UserAdmin");

                entity.Property(e => e.Ora).HasColumnType("datetime");

                entity.Property(e => e.RoomNr)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Room_Nr");

                entity.HasOne(d => d.IdUserAdminNavigation)
                    .WithMany(p => p.ActivityLogDhomaSallas)
                    .HasForeignKey(d => d.IdUserAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ActivityL__ID_Us__29221CFB");

                entity.HasOne(d => d.RoomNrNavigation)
                    .WithMany(p => p.ActivityLogDhomaSallas)
                    .HasForeignKey(d => d.RoomNr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ActivityL__Room___2A164134");
            });

            modelBuilder.Entity<ActivityLogUser>(entity =>
            {
                entity.ToTable("ActivityLogUSER");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Activity)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IdUserAdmin).HasColumnName("ID_UserAdmin");

                entity.Property(e => e.Ora).HasColumnType("datetime");

                entity.HasOne(d => d.IdUserAdminNavigation)
                    .WithMany(p => p.ActivityLogUsers)
                    .HasForeignKey(d => d.IdUserAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ActivityL__ID_Us__2645B050");
            });

            modelBuilder.Entity<Ambulanca>(entity =>
            {
                entity.HasKey(e => e.NrAuto)
                    .HasName("PK__Ambulanc__294DA7F3C22847EE");

                entity.ToTable("Ambulanca");

                entity.Property(e => e.NrAuto)
                    .ValueGeneratedNever()
                    .HasColumnName("Nr_Auto");

                entity.Property(e => e.IdUserMjekuLider).HasColumnName("ID_UserMjekuLider");

                entity.Property(e => e.Lokacioni)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Statusi).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdUserMjekuLiderNavigation)
                    .WithMany(p => p.Ambulancas)
                    .HasForeignKey(d => d.IdUserMjekuLider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ambulanca__ID_Us__1AD3FDA4");
            });

            modelBuilder.Entity<Dhoma>(entity =>
            {
                entity.HasKey(e => e.RoomNr)
                    .HasName("PK__Dhoma__19EF8181212A546A");

                entity.ToTable("Dhoma");

                entity.Property(e => e.RoomNr)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Room_Nr");

                entity.Property(e => e.NrPacientave)
                    .HasColumnName("Nr_Pacientave")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Fatura>(entity =>
            {
                entity.HasKey(e => e.IdFatura)
                    .HasName("PK__Fatura__9F2CBCBD494B861C");

                entity.ToTable("Fatura");

                entity.Property(e => e.IdFatura).HasColumnName("ID_Fatura");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserRecepsionisti).HasColumnName("ID_UserRecepsionisti");

                entity.Property(e => e.PagesaTotale).HasColumnType("decimal(9, 2)");

                entity.Property(e => e.Paguar).HasDefaultValueSql("((1))");

                entity.Property(e => e.Pershkrimi)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Faturas)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Fatura__ID_Pacie__02FC7413");

                entity.HasOne(d => d.IdUserRecepsionistiNavigation)
                    .WithMany(p => p.Faturas)
                    .HasForeignKey(d => d.IdUserRecepsionisti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Fatura__ID_UserR__02084FDA");
            });


            modelBuilder.Entity<Infuzionet>(entity =>
            {
                entity.ToTable("Infuzionet");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.IdInfermieri).HasColumnName("Id_Infermieri");

                entity.Property(e => e.IdPacienti).HasColumnName("Id_Pacienti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Ora).HasColumnType("smalldatetime");

                entity.HasOne(d => d.IdInfermieriNavigation)
                    .WithMany(p => p.Infuzionets)
                    .HasForeignKey(d => d.IdInfermieri)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Infuzione__Id_In__22751F6C");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Infuzionets)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Infuzione__Id_Pa__236943A5");
            });

            modelBuilder.Entity<Kontrolla>(entity =>
            {
                entity.HasKey(e => e.IdKontrolla)
                    .HasName("PK__Kontroll__0E7582983119F0B7");

                entity.ToTable("Kontrolla");

                entity.Property(e => e.IdKontrolla)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("ID_Kontrolla");

                entity.Property(e => e.Diagnoza)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserMjeku).HasColumnName("ID_UserMjeku");

                entity.Property(e => e.Pershkrimi)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Receta)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Kontrollas)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Kontrolla__ID_Pa__17F790F9");

                entity.HasOne(d => d.IdUserMjekuNavigation)
                    .WithMany(p => p.Kontrollas)
                    .HasForeignKey(d => d.IdUserMjeku)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Kontrolla__ID_Us__17036CC0");
            });

            modelBuilder.Entity<Laboratori>(entity =>
            {
                entity.HasKey(e => e.NrAnalizes)
                    .HasName("PK__Laborato__4EC6A610E7ACD69E");

                entity.ToTable("Laboratori");

                entity.Property(e => e.NrAnalizes).HasColumnName("Nr_analizes");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserLaboranti).HasColumnName("ID_UserLaboranti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Laboratoris)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Laborator__ID_Pa__7F2BE32F");

                entity.HasOne(d => d.IdUserLaborantiNavigation)
                    .WithMany(p => p.Laboratoris)
                    .HasForeignKey(d => d.IdUserLaboranti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Laborator__ID_Us__7E37BEF6");
            });

            modelBuilder.Entity<Operacioni>(entity =>
            {
                entity.HasKey(e => e.IdOperacioni)
                    .HasName("PK__Operacio__34E81AD3CA2D939F");

                entity.ToTable("Operacioni");

                entity.Property(e => e.IdOperacioni)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("ID_Operacioni");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserMjekuKryesor).HasColumnName("ID_UserMjekuKryesor");

                entity.Property(e => e.SallaNr)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Salla_Nr");

                entity.Property(e => e.Statusi).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__ID_Pa__08B54D69");

                entity.HasOne(d => d.IdUserMjekuKryesorNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.IdUserMjekuKryesor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__ID_Us__07C12930");

                entity.HasOne(d => d.SallaNrNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.SallaNr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__Salla__09A971A2");
            });

            modelBuilder.Entity<Pacienti>(entity =>
            {
                entity.HasKey(e => e.IdPacienti)
                    .HasName("PK__Pacienti__5F365065C3438894");

                entity.ToTable("Pacienti");

                entity.HasIndex(e => e.Nrtelefonit, "UQ__Pacienti__1E44B1BF50E06411")
                    .IsUnique();

                entity.Property(e => e.IdPacienti)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Pacienti");

                entity.Property(e => e.Ditelindja).HasColumnType("date");

                entity.Property(e => e.Emri)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmriRruges)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Gjinia)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Mbiemri)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nrtelefonit)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Qyteti)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Shteti)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.TipiGjakut)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Praktikanti>(entity =>
            {
                entity.HasKey(e => e.IdPraktikanti)
                    .HasName("PK__Praktika__36B5F1F937E5AAC5");

                entity.ToTable("Praktikanti");

                entity.Property(e => e.IdPraktikanti)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Praktikanti");

                entity.Property(e => e.Aprovimi).HasDefaultValueSql("((1))");

                entity.Property(e => e.DataFillimit).HasColumnType("date");

                entity.Property(e => e.DataPerfundimit).HasColumnType("date");

                entity.Property(e => e.EmriPr)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Emri_Pr");

                entity.Property(e => e.MbiemriPr)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Mbiemri_Pr");

                entity.Property(e => e.MjekuMbikqyres).HasColumnName("Mjeku_Mbikqyres");

                entity.HasOne(d => d.MjekuMbikqyresNavigation)
                    .WithMany(p => p.Praktikantis)
                    .HasForeignKey(d => d.MjekuMbikqyres)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Praktikan__Mjeku__1EA48E88");
            });

            modelBuilder.Entity<Terminet>(entity =>
            {
                entity.HasKey(e => e.IdTermini)
                    .HasName("PK__Terminet__E6AD236167A70DE3");

                entity.ToTable("Terminet");

                entity.Property(e => e.IdTermini)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("ID_Termini");

                entity.Property(e => e.Data).HasColumnType("smalldatetime");

                entity.Property(e => e.IdMjeku).HasColumnName("ID_Mjeku");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdMjekuNavigation)
                    .WithMany(p => p.Terminets)
                    .HasForeignKey(d => d.IdMjeku)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Terminet__ID_Mje__1332DBDC");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Terminets)
                    .HasForeignKey(d => d.IdPacienti)
                    .HasConstraintName("FK__Terminet__ID_Pac__14270015");
            });

            modelBuilder.Entity<TrajtimetMujore>(entity =>
            {
                entity.HasKey(e => new { e.NrT, e.IdPacienti })
                    .HasName("PK__Trajtime__3E133E5CDFAA51CC");

                entity.ToTable("Trajtimet_Mujore");

                entity.Property(e => e.NrT)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Nr_T");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.DataFillimit)
                    .HasColumnType("date")
                    .HasColumnName("Data_Fillimit");

                entity.Property(e => e.DataMbarimit)
                    .HasColumnType("date")
                    .HasColumnName("Data_Mbarimit");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.TrajtimetMujores)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Trajtimet__ID_Pa__0D7A0286");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__User__ED4DE442655A82B7");

                entity.ToTable("User");

                entity.HasIndex(e => e.Nrtelefonit, "UQ__User__1E44B1BF9F206E58")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__User__A9D10534C832299B")
                    .IsUnique();

                entity.Property(e => e.IdUser).HasColumnName("ID_User");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Emri)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Mbiemri)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nrtelefonit)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Pozita)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
