using System.Collections.Generic;

namespace PortalRandkowy.API.Dtos
{
    public class UserForUpdateDto
    {
        // Informacje na zakładce Info
        public string Growth { get; set; }
        public string EyeColor { get; set; }
        public string HairColor { get; set; }
        public string MartialStatus { get; set; }
        public string Education { get; set; }
        public string Profession { get; set; }
        public string Children { get; set; }
        public string Languages { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        //Zakładka o mnie
        public string Motto { get; set; }
        public string Description { get; set; }
        public string Personality { get; set; }
        public string LookingFor { get; set; }

        //Zakładka Pasje, Zainteresowania

        public string Interests { get; set; }
        public string FreeTime { get; set; }
        public string Sport  { get; set; }
        public string Movies { get; set; }
        public string Music { get; set; }

        // Zakładka preferencje

        public string ILike { get; set; }
        public string IDoNotLike { get; set; }
        public string MakesMeLaugh { get; set; }
        public string ItFeelsBestIn { get; set; }
        public string FriendWouldDescribeMe { get; set; }

        //Zakładka zdjęcia
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
        public string PhotoUrl { get; set; } 
    }
}