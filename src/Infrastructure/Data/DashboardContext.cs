﻿using System;
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

    public virtual DbSet<RssFeed> RssFeeds { get; set; }

    public virtual DbSet<RssGroup> RssGroups { get; set; }

    public virtual DbSet<RssItem> RssItems { get; set; }

    public virtual DbSet<TagKey> TagKeys { get; set; }

    public virtual DbSet<UserProfile> UserProfiles { get; set; }

    public virtual DbSet<WebTag> WebTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<RssFeed>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("rss_feed_pkey");

            entity.ToTable("rss_feed");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_date");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.RssGroupId).HasColumnName("rss_group_id");
            entity.Property(e => e.Url)
                .HasMaxLength(300)
                .HasColumnName("url");

            entity.HasOne(d => d.RssGroup).WithMany(p => p.RssFeeds)
                .HasForeignKey(d => d.RssGroupId)
                .HasConstraintName("fk_feed_group");
        });

        modelBuilder.Entity<RssGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("rss_group_pkey");

            entity.ToTable("rss_group");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_date");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");
            entity.Property(e => e.SeqId).HasColumnName("seq_id");
            entity.Property(e => e.UserProfileId).HasColumnName("user_profile_id");

            entity.HasOne(d => d.UserProfile).WithMany(p => p.RssGroups)
                .HasForeignKey(d => d.UserProfileId)
                .HasConstraintName("fk_group_profile");
        });

        modelBuilder.Entity<RssItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("rss_item_pkey");

            entity.ToTable("rss_item");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_date");
            entity.Property(e => e.Detail)
                .HasMaxLength(500)
                .HasColumnName("detail");
            entity.Property(e => e.IsRead).HasColumnName("is_read");
            entity.Property(e => e.PublishDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("publish_date");
            entity.Property(e => e.RssFeedId).HasColumnName("rss_feed_id");
            entity.Property(e => e.Title)
                .HasMaxLength(300)
                .HasColumnName("title");

            entity.HasOne(d => d.RssFeed).WithMany(p => p.RssItems)
                .HasForeignKey(d => d.RssFeedId)
                .HasConstraintName("fk_item_feed");
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

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_profile_pkey");

            entity.ToTable("user_profile");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_date");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<WebTag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("web_tag_pkey");

            entity.ToTable("web_tag");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created");
            entity.Property(e => e.Tags).HasColumnName("tags");
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
