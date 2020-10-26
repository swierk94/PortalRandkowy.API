using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalRandkowy.API.Helpers;
using PortalRandkowy.API.Models;

namespace PortalRandkowy.API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly new DataContext _context; //zmiana new

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }



        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.UserLikes)
            {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.UserLikes);
                users = users.Where(u => userLikes.Contains(u.Id));
            }

            if(userParams.UserIsLiked)
            {
                 var userIsLiked = await GetUserLikes(userParams.UserId, userParams.UserLikes); 
                 users = users.Where(u => userIsLiked.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDate = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDate = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDate && u.DateOfBirth <= maxDate);
            }

            if (userParams.ZodiacSign != "Wszystkie")
            {
                users = users.Where(u => u.ZodiacSign == userParams.ZodiacSign);
            }

            if  (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            return await PagedList<User>.CreateListAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMainPhoto);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.UserLikesId == userId && u.UserIsLikedId == recipientId);
        }

        private async Task<IEnumerable<int>> GetUserLikes (int id, bool userLikes)
        {
            var user = await _context.Users
                                     .Include(x => x.UserLikes)
                                     .Include(x => x.UserIsLiked)
                                     .FirstOrDefaultAsync(x => x.Id == id);
            if(userLikes)
            {
              return  user.UserLikes.Where(x => x.UserIsLikedId == id).Select(i => i.UserLikesId);
            }
            else
            {
              return   user.UserIsLiked.Where(u => u.UserLikesId == id).Select(i => i.UserIsLikedId);
            }
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos)
                                            .Include(r => r.Recipient).ThenInclude(p => p.Photos).AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox" :
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId);
                    break;
                case "Outbox" :
                    messages = messages.Where(u => u.SenderId == messageParams.UserId);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.IsRead ==false );
                    break;
            }

            messages = messages.OrderByDescending(d => d.DateSend);

            return await PagedList<Message>.CreateListAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
                  var messages = await _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos)
                                                  .Include(r => r.Recipient).ThenInclude(p => p.Photos).AsQueryable()
                                                  .Where(m => m.RecipientId == userId && m.SenderId == m.RecipientId && m.RecipientDeleted == false ||
                                                  m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                                                  .OrderByDescending(m => m.DateSend)
                                                  .ToListAsync();

                    return messages;
        }
    }
}