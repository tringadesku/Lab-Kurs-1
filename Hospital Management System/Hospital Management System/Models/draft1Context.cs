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

        public draft1Context(DbContextOptions<draft1Context> options)
            : base(options)
        {
        }

        public virtual DbSet<ActiveStaff> ActiveStaffs { get; set; } = null!;
        public virtual DbSet<ActivityLogUser> ActivityLogUsers { get; set; } = null!;
        public virtual DbSet<Ambulanca> Ambulancas { get; set; } = null!;
        public virtual DbSet<CovidLab> CovidLabs { get; set; } = null!;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActiveStaff>(entity =>
            {
                entity.ToTable("ActiveStaff");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CheckedInTime).HasColumnType("datetime");

                entity.Property(e => e.UseriId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UseriName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });


            modelBuilder.Entity<ActivityLogUser>(entity =>
            {
                entity.ToTable("ActivityLogUser");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Activity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ActivityOn)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ora).HasColumnType("smalldatetime");

                entity.Property(e => e.UseriLoggedId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UseriLoggedName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ambulanca>(entity =>
            {
                entity.HasKey(e => e.NrAuto)
                    .HasName("PK__Ambulanc__294DA7F3EB9571F0");

                entity.ToTable("Ambulanca");

                entity.Property(e => e.NrAuto)
                    .ValueGeneratedNever()
                    .HasColumnName("Nr_Auto");

                entity.Property(e => e.IdUserMjekuLider).HasColumnName("ID_UserMjekuLider");

                entity.Property(e => e.Lokacioni)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Statusi)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUserMjekuLiderNavigation)
                    .WithMany(p => p.Ambulancas)
                    .HasForeignKey(d => d.IdUserMjekuLider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ambulanca__ID_Us__6166761E");
            });

            modelBuilder.Entity<CovidLab>(entity =>
            {
                entity.HasKey(e => e.AnalizaId)
                    .HasName("PK__CovidLab__4EEC94E0AE6693EC");

                entity.ToTable("CovidLab");

                entity.Property(e => e.AnalizaId).HasColumnName("AnalizaID");

                entity.Property(e => e.DataAnalizes).HasColumnType("date");

                entity.Property(e => e.IdUserLaboranti).HasColumnName("ID_UserLaboranti");

                entity.Property(e => e.LlojiTestit)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Mostra)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PacientiId).HasColumnName("PacientiID");

                entity.Property(e => e.Rezultati)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUserLaborantiNavigation)
                    .WithMany(p => p.CovidLabs)
                    .HasForeignKey(d => d.IdUserLaboranti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CovidLab__ID_Use__5BE2A6F2");

                entity.HasOne(d => d.Pacienti)
                    .WithMany(p => p.CovidLabs)
                    .HasForeignKey(d => d.PacientiId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CovidLab__Pacien__5CD6CB2B");
            });

            modelBuilder.Entity<Dhoma>(entity =>
            {
                entity.HasKey(e => e.RoomNr)
                    .HasName("PK__Dhoma__19EF81817542FA08");

                entity.ToTable("Dhoma");

                entity.Property(e => e.RoomNr)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Room_Nr");

                entity.Property(e => e.NrPacientave).HasColumnName("Nr_Pacientave");
            });

            modelBuilder.Entity<Fatura>(entity =>
            {
                entity.HasKey(e => e.IdFatura)
                    .HasName("PK__Fatura__9F2CBCBD9D699575");

                entity.ToTable("Fatura");

                entity.Property(e => e.IdFatura).HasColumnName("ID_Fatura");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserRecepsionisti).HasColumnName("ID_UserRecepsionisti");

                entity.Property(e => e.PagesaTotale).HasColumnType("decimal(9, 2)");

                entity.Property(e => e.Pershkrimi)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Statusi)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Faturas)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Fatura__ID_Pacie__4D5F7D71");

                entity.HasOne(d => d.IdUserRecepsionistiNavigation)
                    .WithMany(p => p.Faturas)
                    .HasForeignKey(d => d.IdUserRecepsionisti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Fatura__ID_UserR__4C6B5938");
            });

            modelBuilder.Entity<Infuzionet>(entity =>
            {
                entity.ToTable("Infuzionet");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdInfermieri).HasColumnName("Id_Infermieri");

                entity.Property(e => e.IdPacienti).HasColumnName("Id_Pacienti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Ora)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdInfermieriNavigation)
                    .WithMany(p => p.Infuzionets)
                    .HasForeignKey(d => d.IdInfermieri)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Infuzione__Id_In__690797E6");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Infuzionets)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Infuzione__Id_Pa__69FBBC1F");
            });

            modelBuilder.Entity<Kontrolla>(entity =>
            {
                entity.HasKey(e => e.IdKontrolla)
                    .HasName("PK__Kontroll__0E75829855652BCD");

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
                    .HasConstraintName("FK__Kontrolla__ID_Pa__5E8A0973");

                entity.HasOne(d => d.IdUserMjekuNavigation)
                    .WithMany(p => p.Kontrollas)
                    .HasForeignKey(d => d.IdUserMjeku)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Kontrolla__ID_Us__5D95E53A");
            });

            modelBuilder.Entity<Laboratori>(entity =>
            {
                entity.HasKey(e => e.NrAnalizes)
                    .HasName("PK__Laborato__4EC6A610047D3AA7");

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
                    .HasConstraintName("FK__Laborator__ID_Pa__498EEC8D");

                entity.HasOne(d => d.IdUserLaborantiNavigation)
                    .WithMany(p => p.Laboratoris)
                    .HasForeignKey(d => d.IdUserLaboranti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Laborator__ID_Us__489AC854");
            });

            modelBuilder.Entity<Operacioni>(entity =>
            {
                entity.HasKey(e => e.IdOperacioni)
                    .HasName("PK__Operacio__34E81AD39890DFAE");

                entity.ToTable("Operacioni");

                entity.Property(e => e.IdOperacioni)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("ID_Operacioni");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.IdUserMjekuKryesor).HasColumnName("ID_UserMjekuKryesor");

                entity.Property(e => e.Ora)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.SallaNr)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Salla_Nr");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__ID_Pa__531856C7");

                entity.HasOne(d => d.IdUserMjekuKryesorNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.IdUserMjekuKryesor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__ID_Us__5224328E");

                entity.HasOne(d => d.SallaNrNavigation)
                    .WithMany(p => p.Operacionis)
                    .HasForeignKey(d => d.SallaNr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Operacion__Salla__540C7B00");
            });

            modelBuilder.Entity<Pacienti>(entity =>
            {
                entity.HasKey(e => e.IdPacienti)
                    .HasName("PK__Pacienti__5F3650658E42EE9E");

                entity.ToTable("Pacienti");

                entity.HasIndex(e => e.Nrtelefonit, "UQ__Pacienti__1E44B1BFE8D935B5")
                    .IsUnique();

                entity.Property(e => e.IdPacienti)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Pacienti");

                entity.Property(e => e.Alergji)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Ska')");

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
                    .HasName("PK__Praktika__36B5F1F926543CE0");

                entity.ToTable("Praktikanti");

                entity.Property(e => e.IdPraktikanti)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Praktikanti");

                entity.Property(e => e.Aprovimi)
                    .HasMaxLength(20)
                    .IsUnicode(false);

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
                    .HasConstraintName("FK__Praktikan__Mjeku__65370702");
            });

            modelBuilder.Entity<Terminet>(entity =>
            {
                entity.HasKey(e => e.IdTermini)
                    .HasName("PK__Terminet__E6AD23612ACDD937");

                entity.ToTable("Terminet");

                entity.Property(e => e.IdTermini)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("ID_Termini");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.IdMjeku).HasColumnName("ID_Mjeku");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Ora)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdMjekuNavigation)
                    .WithMany(p => p.Terminets)
                    .HasForeignKey(d => d.IdMjeku)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Terminet__ID_Mje__59C55456");

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.Terminets)
                    .HasForeignKey(d => d.IdPacienti)
                    .HasConstraintName("FK__Terminet__ID_Pac__5AB9788F");
            });

            modelBuilder.Entity<TrajtimetMujore>(entity =>
            {
                entity.HasKey(e => e.NrT)
                    .HasName("PK__Trajtime__7BE05B5A24B60458");

                entity.ToTable("Trajtimet_Mujore");

                entity.Property(e => e.NrT).HasColumnName("Nr_T");

                entity.Property(e => e.DataFillimit)
                    .HasColumnType("date")
                    .HasColumnName("Data_Fillimit");

                entity.Property(e => e.DataMbarimit)
                    .HasColumnType("date")
                    .HasColumnName("Data_Mbarimit");

                entity.Property(e => e.IdPacienti).HasColumnName("ID_Pacienti");

                entity.Property(e => e.Lloji)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPacientiNavigation)
                    .WithMany(p => p.TrajtimetMujores)
                    .HasForeignKey(d => d.IdPacienti)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Trajtimet__ID_Pa__0B5CAFEA");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__User__ED4DE442CF57B672");

                entity.ToTable("User");

                entity.HasIndex(e => e.Nrtelefonit, "UQ__User__1E44B1BF102F6856")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__User__A9D10534F0E6A616")
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

                entity.Property(e => e.Password).IsUnicode(false);

                entity.Property(e => e.Pozita)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
