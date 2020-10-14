﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortalRandkowy.API.Data;

namespace PortalRandkowy.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20201014143830_AddedPublicId")]
    partial class AddedPublicId
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("PortalRandkowy.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMainPhoto");

                    b.Property<string>("Url");

                    b.Property<int>("UserId");

                    b.Property<string>("public_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("PortalRandkowy.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Children");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Description");

                    b.Property<string>("Education");

                    b.Property<string>("EyeColor");

                    b.Property<string>("FreeTime");

                    b.Property<string>("FriendWouldDescribeMe");

                    b.Property<string>("Gender");

                    b.Property<string>("Growth");

                    b.Property<string>("HairColor");

                    b.Property<string>("IDoNotLike");

                    b.Property<string>("ILike");

                    b.Property<string>("Interests");

                    b.Property<string>("ItFeelsBestIn");

                    b.Property<string>("Languages");

                    b.Property<DateTime>("LastActive");

                    b.Property<string>("LookingFor");

                    b.Property<string>("MakesMeLaugh");

                    b.Property<string>("MartialStatus");

                    b.Property<string>("Motto");

                    b.Property<string>("Movies");

                    b.Property<string>("Music");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Personality");

                    b.Property<string>("Profession");

                    b.Property<string>("Sport");

                    b.Property<string>("Username");

                    b.Property<string>("ZodiacSign");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PortalRandkowy.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("PortalRandkowy.API.Models.Photo", b =>
                {
                    b.HasOne("PortalRandkowy.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
