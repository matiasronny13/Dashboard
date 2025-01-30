using System;
using System.Collections.Generic;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public partial class DashboardContext : DbContext, IDashboardContext
{
    public DashboardContext(DbContextOptions<DashboardContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TopstepAccount> TopstepAccounts { get; set; }

    public virtual DbSet<TagKey> TagKeys { get; set; }

    public virtual DbSet<WebTag> WebTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<TopstepAccount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("topstep_accounts_pkey");

            entity.ToTable("topstep_accounts");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AccountType).HasColumnName("account_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<TagKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tag_key_pkey");

            entity.ToTable("tag_key");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
            entity.Property(e => e.Updated)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated");
        });

        modelBuilder.Entity<WebTag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("web_tag_pkey");

            entity.ToTable("web_tag");

            entity.Property(e => e.Id)
                .HasMaxLength(32)
                .HasColumnName("id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created");
            entity.Property(e => e.Note)
                .HasColumnType("character varying")
                .HasColumnName("note");
            entity.Property(e => e.Tags).HasColumnName("tags");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
            entity.Property(e => e.Updated)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated");
            entity.Property(e => e.Url)
                .HasColumnType("character varying")
                .HasColumnName("url");
        });
        modelBuilder.HasSequence("tag_key_id_seq");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
